<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { slides } = useProjectsData()
const maxItems = ref(4)

const updateMaxItems = () => {
    const w = window.innerWidth
    if (w < 640) maxItems.value = 2
    else if (w < 768) maxItems.value = 3
    else maxItems.value = 4
}

onMounted(() => {
    updateMaxItems()
    window.addEventListener('resize', updateMaxItems)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateMaxItems)
})
</script>

<template>
    <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
        <nuxt-link to="/" class="w-full h-auto block group overflow-hidden" v-for="item in slides.slice(0, maxItems)"
            :key="item.id">
            <nuxt-img class="size-full object-cover group-hover:scale-110 transition-all duration-200" :src="item.url"
                :alt="item.alt" />
        </nuxt-link>
    </div>
</template>