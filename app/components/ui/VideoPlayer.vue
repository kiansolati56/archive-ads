<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
    videoSrc: {
        type: String,
        required: true,
    },
    thumbnailSrc: {
        type: String,
        required: true,
    },
    playButtonSize: {
        type: String,
        default: '2.5rem',
    },
    fullscreenButtonSize: {
        type: String,
        default: '2rem',
    },
    timelineHeight: {
        type: String,
        default: '14px',
    },
})

const containerRef = ref(null)
const videoRef = ref(null)
const progressBarRef = ref(null)

const isVideoActive = ref(false)
const isLoading = ref(false)
const isPlaying = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const isFullscreen = ref(false)
const controlsVisible = ref(true)
const progressPercent = ref(0)
const videoDuration = ref(0)

let idleTimer = null
let fullscreenChangeHandler = null
let loadingStartTime = 0

const formatTime = (seconds) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const updateProgress = () => {
    if (duration.value > 0) {
        progressPercent.value = (currentTime.value / duration.value) * 100
    }
}

const onTimeUpdate = () => {
    if (videoRef.value) {
        currentTime.value = videoRef.value.currentTime
        updateProgress()
    }
}

const onLoadedMetadata = () => {
    if (videoRef.value) {
        duration.value = videoRef.value.duration
        currentTime.value = 0
        updateProgress()
    }
}

const onCanPlay = () => {
    const elapsed = Date.now() - loadingStartTime
    const remaining = Math.max(0, 2000 - elapsed)
    if (remaining > 0) {
        setTimeout(() => {
            isLoading.value = false
        }, remaining)
    } else {
        isLoading.value = false
    }
    if (videoRef.value && !isPlaying.value) {
        videoRef.value.play().catch((e) => console.warn('Autoplay prevented:', e))
    }
}

const onPlay = () => {
    isPlaying.value = true
    resetIdleTimer()
}

const onPause = () => {
    isPlaying.value = false
    showControls()
    resetIdleTimer()
}

const onEnded = () => {
    isPlaying.value = false
    showControls()
}

const preloadDuration = () => {
    const tempVideo = document.createElement('video')
    tempVideo.preload = 'metadata'
    tempVideo.src = props.videoSrc
    tempVideo.addEventListener('loadedmetadata', () => {
        videoDuration.value = tempVideo.duration
        tempVideo.remove()
    })
    tempVideo.addEventListener('error', () => {
        tempVideo.remove()
    })
}

const activateVideo = async () => {
    if (isVideoActive.value) return
    isVideoActive.value = true
    isLoading.value = true
    loadingStartTime = Date.now()

    await nextTick()

    if (videoRef.value) {
        videoRef.value.src = props.videoSrc
        videoRef.value.load()

        const playPromise = videoRef.value.play()
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isPlaying.value = true
                })
                .catch((err) => {
                    console.error('Playback failed:', err)
                    isLoading.value = false
                    isPlaying.value = false
                })
        }
    }
}

const togglePlayPause = () => {
    if (!isVideoActive.value) {
        activateVideo()
        return
    }
    if (!videoRef.value) return
    if (isPlaying.value) {
        videoRef.value.pause()
    } else {
        videoRef.value.play().catch((e) => console.warn('Play failed:', e))
    }
}

const toggleFullscreen = async () => {
    if (!containerRef.value) return
    if (!isFullscreen.value) {
        await containerRef.value.requestFullscreen()
    } else {
        await document.exitFullscreen()
    }
}

const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement
}

const showControls = () => {
    controlsVisible.value = true
    resetIdleTimer()
}

const hideControls = () => {
    if (isPlaying.value) {
        controlsVisible.value = false
    }
}

const resetIdleTimer = () => {
    if (!isPlaying.value) {
        controlsVisible.value = true
        return
    }
    controlsVisible.value = true
    if (idleTimer) clearTimeout(idleTimer)
    idleTimer = setTimeout(() => {
        if (isPlaying.value) {
            controlsVisible.value = false
        }
    }, 2000)
}

const handleMouseEnter = () => {
    showControls()
}

const handleMouseLeave = () => {
    if (isPlaying.value) {
        if (idleTimer) clearTimeout(idleTimer)
        idleTimer = setTimeout(() => {
            if (isPlaying.value) controlsVisible.value = false
        }, 2000)
    }
}

const handleKeydown = (e) => {
    if (!isVideoActive.value) return
    switch (e.key) {
        case ' ':
        case 'Space':
            e.preventDefault()
            togglePlayPause()
            break
        case 'f':
        case 'F':
            e.preventDefault()
            toggleFullscreen()
            break
        case 'ArrowLeft':
            e.preventDefault()
            if (videoRef.value) videoRef.value.currentTime -= 5
            break
        case 'ArrowRight':
            e.preventDefault()
            if (videoRef.value) videoRef.value.currentTime += 5
            break
    }
}

const handleProgressClick = (e) => {
    if (!videoRef.value || !progressBarRef.value || duration.value === 0) return
    const rect = progressBarRef.value.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.min(1, Math.max(0, clickX / rect.width))
    videoRef.value.currentTime = percent * duration.value
}

onMounted(() => {
    preloadDuration()
    fullscreenChangeHandler = handleFullscreenChange
    document.addEventListener('fullscreenchange', fullscreenChangeHandler)
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    if (idleTimer) clearTimeout(idleTimer)
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <client-only>
        <div ref="containerRef" class="relative h-full w-full overflow-hidden bg-thblack" @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave" @mousemove="resetIdleTimer" @dblclick="toggleFullscreen">
            <div v-if="!isVideoActive" class="absolute inset-0 z-10 cursor-pointer" @click="activateVideo">
                <img :src="thumbnailSrc" alt="Video thumbnail" class="h-full w-full object-cover" />
                <button
                    class="size-15 lg:size-25 absolute inset-0 m-auto bg-thblack/44 border-2 border-thwhite rounded-full center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-7 text-thwhite">
                        <path
                            d="M18.54 9.148a2.25 2.25 0 0 1 0 3.704l-8.25 5.034a2.25 2.25 0 0 1-3.54-1.852V6.966a2.25 2.25 0 0 1 3.54-1.852l8.25 5.034Z" />
                    </svg>
                </button>

                <div
                    class="text-thwhite text-xs sm:text-base absolute left-2 bottom-2 sm:left-4 sm:bottom-4.5 lg:left-7 lg:bottom-7">
                    {{ formatTime(videoDuration) }}
                </div>
                <button @click.stop="toggleFullscreen"
                    class="size-3 sm:size-3.5 lg:size-5 absolute right-2 bottom-3 sm:right-4 sm:bottom-4.5 lg:right-7 lg:bottom-7">
                    <nuxt-img class="size-full object-contain" src="/images/big-btn.png" alt="test" />
                </button>
            </div>
            <div v-if="isVideoActive" class="relative h-full w-full">
                <video ref="videoRef" class="h-full w-full object-contain" @loadedmetadata="onLoadedMetadata"
                    @canplay="onCanPlay" @timeupdate="onTimeUpdate" @play="onPlay" @pause="onPause" @ended="onEnded" />
                <button v-if="!isLoading" @click.stop="togglePlayPause"
                    class="size-15 lg:size-25 absolute inset-0 m-auto bg-thblack/44 border-2 border-thwhite rounded-full center z-20 transition-opacity duration-300"
                    :class="{ 'opacity-100': controlsVisible, 'opacity-0 pointer-events-none': !controlsVisible }">
                    <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-7 text-thwhite">
                        <path
                            d="M18.54 9.148a2.25 2.25 0 0 1 0 3.704l-8.25 5.034a2.25 2.25 0 0 1-3.54-1.852V6.966a2.25 2.25 0 0 1 3.54-1.852l8.25 5.034Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-7 text-thwhite">
                        <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                    </svg>
                </button>

                <div v-if="isLoading"
                    class="absolute inset-0 flex items-center justify-center bg-thblack/60 backdrop-blur-sm">
                    <div
                        class="spinner h-12 w-12 animate-spin rounded-full border-4 border-thwhite/30 border-t-thwhite" />
                </div>

                <transition name="fade-up">
                    <div v-show="controlsVisible"
                        class="absolute bottom-0 left-0 right-0 z-30 flex flex-col-reverse bg-linear-to-t from-thblack/90 via-thblack/60 to-transparent">
                        <div ref="progressBarRef" class="relative w-full cursor-pointer bg-thwhite/30"
                            :style="{ height: props.timelineHeight }" @click="handleProgressClick">
                            <div class="absolute h-full bg-thred-100 transition-all duration-100 ease-linear"
                                :style="{ width: progressPercent + '%' }" />
                        </div>
                        <div class="flex items-center justify-between px-7 py-4">
                            <div class="text-thwhite text-xs sm:text-base">
                                {{ formatTime(duration - currentTime) }}
                            </div>

                            <button @click.stop="toggleFullscreen" class="size-3 sm:size-3.5 lg:size-5">
                                <nuxt-img class="size-full object-contain" src="/images/big-btn.png" alt="test" />
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </client-only>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 0.25s ease-out;
}

.fade-up-enter-from,
.fade-up-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

.spinner {
    border-top-color: white;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>