<script setup>
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
</script>

<template>
    <div class="container">
        <section class="mt-15 h-42.5 sm:h-87.5 lg:h-140 relative bg-thblack">
            <client-only>
                <VideoPlayer video-src="/images/video_test.mp4" thumbnail-src="/images/video1.png"
                    timeline-height="10px" />
            </client-only>
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