<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import VideoPlayer from '../ui/VideoPlayer.vue';
import ProjectInfo from '../sections/projects/ProjectInfo.vue';

const { slides } = useProjectsData()

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const modal = ref(false)
const currentIndex = ref(0)
const modalSwiperRef = ref(null)
const isBeginning = ref(true)
const isEnd = ref(false)

watch(modal, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : ''
})

function onModalSwiper(swiper) {
    modalSwiperRef.value = swiper
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
    swiper.on('slideChange', () => {
        isBeginning.value = swiper.isBeginning
        isEnd.value = swiper.isEnd
    })
}

function openModal(index) {
    currentIndex.value = index
    modal.value = true
    if (modalSwiperRef.value) {
        modalSwiperRef.value.slideTo(index, 0)
    }
}

function goNext() {
    if (modalSwiperRef.value && !isEnd.value) {
        modalSwiperRef.value.slideNext(500)
    }
}

function goPrev() {
    if (modalSwiperRef.value && !isBeginning.value) {
        modalSwiperRef.value.slidePrev(500)
    }
}

function handleKeydown(event) {
    if (!modal.value) return
    if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goNext()
    } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goPrev()
    } else if (event.key === 'Escape') {
        modal.value = false
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <section class="mt-5 sm:mt-20">
        <div class="hidden sm:block">
            <client-only>
                <Swiper dir="rtl" :rtl="true" :modules="[Autoplay]" :centered-slides="true" :loop="true"
                    :autoplay="{ delay: 4000, disableOnInteraction: false }" :breakpoints="{
                        0: { slidesPerView: 1.8, spaceBetween: 17 },
                        750: { slidesPerView: 2.1, spaceBetween: 17 },
                        1000: { slidesPerView: 2.5, spaceBetween: 17 },
                        1350: { slidesPerView: 2.9, spaceBetween: 17 },
                        1650: { slidesPerView: 3.3, spaceBetween: 17 }
                    }">
                    <SwiperSlide class="size-full" v-for="(item, idx) in slides" :key="item.id">
                        <div class="w-full h-100 lg:h-120 2xl:h-140 cursor-pointer relative overflow-hidden group"
                            @click="openModal(idx)">
                            <nuxt-img class="size-full object-cover" :src="item.url" :alt="item.alt" />
                            <div
                                class="bg-thblack/50 opacity-0 absolute inset-0 size-full center group-hover:opacity-100 transition-all duration-300">
                                <svg id="_x38_6-seen" xmlns="http://www.w3.org/2000/svg" width="77.046" height="56.487"
                                    viewBox="0 0 77.046 56.487">
                                    <path id="Path_29663" data-name="Path 29663"
                                        d="M59.008,29.8A21.836,21.836,0,1,1,39.52,17.838a3.386,3.386,0,0,1,1.078.154,2.539,2.539,0,0,1,1.695,1.926,11.26,11.26,0,0,0,10.964,8.935A10.308,10.308,0,0,0,56,28.494,2.6,2.6,0,0,1,59.008,29.8ZM39.52,5C21.957,5,3.958,20.406,1.031,37.942a2.564,2.564,0,0,0,5.058.847C8.374,25.258,23.138,10.135,39.52,10.135s31.145,15.123,33.4,28.654a2.586,2.586,0,0,0,2.542,2.157,2.64,2.64,0,0,0,.436-.026,2.578,2.578,0,0,0,2.105-2.953C75.081,20.406,57.082,5,39.52,5Z"
                                        transform="translate(-0.997 -5)" fill="#fff" />
                                </svg>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </client-only>
        </div>

        <div class="grid sm:hidden grid-cols-2 gap-2 container">
            <div class="w-full h-37 overflow-hidden relative" v-for="(item, idx) in slides.slice(0, 6)" :key="item.id"
                @click="openModal(idx)">
                <nuxt-img class="size-full object-cover" :src="item.url" :alt="item.alt" />
                <div v-if="idx === 5" class="bg-thblack/70 absolute inset-0 size-full center text-2xl text-thwhite">
                    +{{ slides.length - 6 }}
                </div>
            </div>
        </div>
    </section>

    <section class="mt-13 sm:mt-22 xl:mt-32.5 grid xl:grid-cols-2 gap-y-8 xl:gap-16 container">
        <div class="sm:hidden">
            <h2 class="text-2xl font-medium font-kamand">Amiran Cafe Restaurant #Reels</h2>
            <p class="text-xl xl:text-lg 2xl:text-xl font-light mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
            </p>
        </div>
        <div class="my-auto relative lg:h-120 bg-thblack flex flex-col justify-center">
            <client-only>
                <VideoPlayer video-src="/images/video_test.mp4" thumbnail-src="/images/video.png"
                    timeline-height="6px" />
            </client-only>
        </div>
        <div class="my-auto">
            <div class="hidden sm:block">
                <h2 class="text-2xl font-medium font-kamand">Amiran Cafe Restaurant #Reels</h2>
                <p class="text-xl xl:text-lg 2xl:text-xl font-light mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                </p>
            </div>
            <div class="w-full h-px bg-thgray-50/50 my-10 xl:my-8 2xl:my-10 hidden sm:block"></div>
            <ProjectInfo :data="data?.projectInfo" />
        </div>
    </section>

    <div :class="modal ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
        class="fixed inset-0 size-full z-200 bg-thwhite transition-all duration-200">
        <div class="size-full relative center">
            <button @click="modal = false"
                class="absolute left-6 top-6 sm:left-8 sm:top-8 hover:bg-thblack/15 p-2 rounded-full transition-all duration-200 z-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="container relative">
                <button @click="goNext" :disabled="isEnd"
                    :class="['absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 hover:bg-thblack/15 p-2 rounded-full transition-all duration-200 z-50', isEnd ? 'opacity-50 cursor-not-allowed! select-none!' : '']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 -rotate-90">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>

                <client-only>
                    <Swiper :modules="[Navigation]" dir="rtl" :rtl="true" :slides-per-view="1"
                        :initial-slide="currentIndex" @swiper="onModalSwiper">
                        <SwiperSlide class="size-full" v-for="item in slides" :key="item.id">
                            <div class="flex justify-center items-center h-[80vh]">
                                <nuxt-img class="max-w-[65vw] sm:max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
                                    :src="item.url" :alt="item.alt" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </client-only>

                <button @click="goPrev" :disabled="isBeginning"
                    :class="['absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 hover:bg-thblack/15 p-2 rounded-full transition-all duration-200 z-50', isBeginning ? 'opacity-50 cursor-not-allowed! select-none!' : '']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 rotate-90">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>