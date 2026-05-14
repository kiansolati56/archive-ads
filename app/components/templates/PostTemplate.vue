<script setup>
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
    <div class="container grid xl:grid-cols-2 gap-y-8 xl:gap-16">
        <div class="my-auto relative h-63 sm:h-120 md:h-142 bg-thblack flex flex-col justify-center">
            <client-only>
                <VideoPlayer :video-src="data?.videoUrl" :thumbnail-src="data?.thumbnailUrl" timeline-height="6px" />
            </client-only>
        </div>
        <div class="my-auto">
            <h2 class="text-xl sm:text-2xl font-medium font-kamand">
                {{ data?.title }}
            </h2>
            <p class="sm:text-xl xl:text-lg 2xl:text-xl font-light mt-3">
                {{ data?.description }}
            </p>
            <div class="w-full h-px bg-thgray-50/50 my-10 xl:my-8 2xl:my-10 hidden sm:block"></div>
            <ProjectInfo :data="data?.projectInfo" />
        </div>
    </div>
</template>