<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
defineProps({
    show: Boolean
})
</script>

<template>
    <Transition enter-active-class="transition-opacity duration-100 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-400 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="show" class="fixed inset-0 h-screen z-99999 bg-thwhite" aria-live="assertive" role="status">
        </div>
    </Transition>
</template>