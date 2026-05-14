<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import VideoPlayer from '../ui/VideoPlayer.vue';
import ProjectInfo from '../sections/projects/ProjectInfo.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const { slideWithPreviewData } = useProjectsData()

const swiperInstance = ref(null)
const activePreviewIndex = ref(0)
const previewKey = ref(0)

const onSwiper = (swiper) => {
    swiperInstance.value = swiper
    activePreviewIndex.value = swiper.realIndex
    previewKey.value = swiper.realIndex
}

const onSlideChange = (swiper) => {
    const newIndex = swiper.realIndex
    activePreviewIndex.value = newIndex
    previewKey.value = newIndex
}
</script>

<template>
    <div class="container grid xl:grid-cols-2 gap-y-8 xl:gap-16">
        <div class="my-auto relative h-63 sm:h-120 md:h-125 flex gap-2 sm:gap-3.5">
            <div class="h-full w-11 sm:w-20 lg:w-22.5 shrink-0 flex flex-col justify-between gap-y-2 sm:gap-y-3.5">
                <button
                    class="w-full h-7 sm:h-10 lg:h-11 bg-thgray-150 hover:bg-thgray-50/60 transition-all duration-300 center shrink-0"
                    @click="swiperInstance?.slidePrev()">
                    <svg class="w-2.5 h-1 sm:w-5 sm:h-2" xmlns="http://www.w3.org/2000/svg" width="19.21" height="7.965"
                        viewBox="0 0 19.21 7.965">
                        <path id="Path_56226" data-name="Path 56226" d="M-8577.583-2198.282l9.176-6.435,9.173,6.435"
                            transform="translate(8578.014 2205.633)" fill="none" stroke="#db0021" stroke-width="1.5" />
                    </svg>
                </button>

                <Swiper class="grow min-h-0 w-full" :direction="'vertical'" :slides-per-view="3.5" :space-between="14"
                    :loop="true" :allow-touch-move="false" :simulate-touch="false" :speed="300" :modules="[]"
                    @swiper="onSwiper" @slide-change="onSlideChange">
                    <SwiperSlide v-for="item in slideWithPreviewData" :key="item.id"
                        class="size-full pointer-events-none relative">
                        <nuxt-img v-if="item.type === 'image'" class="size-full object-cover" :src="item.url"
                            :alt="item.alt" />
                        <nuxt-img v-else class="size-full object-cover" :src="item.thumbnail_url"
                            :alt="item.thumbnail_alt" />
                        <div v-if="item.type === 'video'"
                            class="size-6 sm:size-10 rounded-full bg-thwhite/10 backdrop-blur-md absolute inset-0 m-auto border border-thwhite/50 center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-2.5 sm:size-5 text-thwhite">
                                <path
                                    d="M18.54 9.148a2.25 2.25 0 0 1 0 3.704l-8.25 5.034a2.25 2.25 0 0 1-3.54-1.852V6.966a2.25 2.25 0 0 1 3.54-1.852l8.25 5.034Z" />
                            </svg>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <button
                    class="w-full h-7 sm:h-10 lg:h-11 bg-thgray-150 hover:bg-thgray-50/60 transition-all duration-300 center shrink-0"
                    @click="swiperInstance?.slideNext()">
                    <svg class="w-2.5 h-1 sm:w-5 sm:h-2 rotate-180" xmlns="http://www.w3.org/2000/svg" width="19.21"
                        height="7.965" viewBox="0 0 19.21 7.965">
                        <path id="Path_56226" data-name="Path 56226" d="M-8577.583-2198.282l9.176-6.435,9.173,6.435"
                            transform="translate(8578.014 2205.633)" fill="none" stroke="#db0021" stroke-width="1.5" />
                    </svg>
                </button>
            </div>

            <div class="grow size-full relative">
                <Transition name="fade" mode="out-in">
                    <div v-if="slideWithPreviewData[activePreviewIndex]?.type === 'video'" :key="'video-' + previewKey"
                        class="size-full bg-thblack flex flex-col justify-center">
                        <client-only>
                            <VideoPlayer :video-src="slideWithPreviewData[activePreviewIndex]?.video_url"
                                :thumbnail-src="slideWithPreviewData[activePreviewIndex]?.thumbnail_url"
                                timeline-height="6px" />
                        </client-only>
                    </div>
                    <nuxt-img v-else :key="'image-' + previewKey" class="size-full object-cover"
                        :src="slideWithPreviewData[activePreviewIndex]?.url"
                        :alt="slideWithPreviewData[activePreviewIndex]?.alt" />
                </Transition>
            </div>
        </div>

        <div class="my-auto">
            <h2 class="text-xl sm:text-2xl font-medium font-kamand">
                Amiran Cafe Restaurant #Reels
            </h2>
            <p class="sm:text-xl xl:text-lg 2xl:text-xl font-light mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
                rhoncus aenean vel elit scelerisque In egestas.
            </p>
            <div class="w-full h-px bg-thgray-50/50 my-10 xl:my-8 2xl:my-10 hidden sm:block"></div>
            <ProjectInfo :data="data?.projectInfo" />
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>