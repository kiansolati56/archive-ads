<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import VideoPlayer from '../ui/VideoPlayer.vue';
import ProjectInfo from '../sections/projects/ProjectInfo.vue';

const { reelsData } = useProjectsData()

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="container">
        <section class="mt-15 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-10 xl:gap-15 2xl:gap-18">
            <div class="h-137 sm:h-86.5 lg:h-150 xl:h-175 w-full relative flex flex-col justify-center bg-thblack"
                v-for="item in reelsData" :key="item.id">
                <client-only>
                    <VideoPlayer :video-src="item.video_url" :thumbnail-src="item.thumbnail_url"
                        timeline-height="6px" />
                </client-only>
            </div>
        </section>

        <ProjectInfo :data="data?.projectInfo" layout="split" />

        <div class="w-full h-px bg-thgray-50/50 my-13 sm:my-22 xl:hidden"></div>

        <section class="xl:mt-32.5">
            <p class="text-xl font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
                rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis.
                Morbi tristique senectus et netus.
            </p>
        </section>
    </div>
</template>