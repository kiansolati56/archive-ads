<script setup>
const { projectData } = useProjectsData()

const template_type = 'reels'

const templateComponents = {
    slide: defineAsyncComponent(() => import('~/components/templates/SlideTemplate.vue')),
    video: defineAsyncComponent(() => import('~/components/templates/VideoTemplate.vue')),
    post: defineAsyncComponent(() => import('~/components/templates/PostTemplate.vue')),
    slide_with_preview: defineAsyncComponent(() => import('~/components/templates/SlideWithPreviewTemplate.vue')),
    reels: defineAsyncComponent(() => import('~/components/templates/ReelsTemplate.vue'))
}

const currentTemplate = computed(() => templateComponents[template_type] || null)

const showHeader = computed(() => ['slide', 'video', 'reels'].includes(template_type))
</script>

<template>
    <section v-if="showHeader" class="container">
        <h1 class="text-start sm:text-center text-2xl font-medium font-kamand">
            Gregory Hayes - CEO of photoin.id
        </h1>
        <p class="text-xl text-start sm:text-center font-light mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore.
        </p>
    </section>

    <component :is="currentTemplate" :data="projectData" />

    <LazyTestimonials class="mt-13 sm:mt-22 xl:mt-32.5 container" />
    <LazySimilarProjects class="mt-13 sm:mt-22 xl:mt-32.5 container" />
</template>