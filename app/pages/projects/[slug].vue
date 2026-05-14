<script setup>
const route = useRoute()

const { projectData } = useProjectsData()

const templateComponents = {
    slide: defineAsyncComponent(() => import('~/components/templates/SlideTemplate.vue')),
    video: defineAsyncComponent(() => import('~/components/templates/VideoTemplate.vue')),
    post: defineAsyncComponent(() => import('~/components/templates/PostTemplate.vue')),
    with_preview: defineAsyncComponent(() => import('~/components/templates/SlideWithPreviewTemplate.vue')),
    reels: defineAsyncComponent(() => import('~/components/templates/ReelsTemplate.vue'))
}

const template_type = computed(() => {
    const path = route.path.toLowerCase()

    return Object.keys(templateComponents).find(type => {
        const normalizedType = type.replaceAll('_', '-')

        return path.includes(normalizedType)
    }) || 'reels'
})

const currentTemplate = computed(() => {
    return templateComponents[template_type.value] || null
})

const showHeader = computed(() => {
    return ['slide', 'video', 'reels'].includes(template_type.value)
})
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