<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
// import { useSettingStore } from '~/stores/useSettingStore';
// const settingStore = useSettingStore();

// await settingStore.getToken();
// await settingStore.getSetting();

// const now = Date.now()
// if (settingStore.frontPage?.length != 0 && settingStore.frontPageUpdatedAt) {
//     const diffHours = (now - settingStore.frontPageUpdatedAt) / 1000 / 60 / 60
//     if (diffHours > 6) {
//         const { data, error } = await useWpApi().getFrontPage();
//         if (!error.value) {
//             await settingStore.setFrontPage(data.value);
//         }
//     }
// }
// else {
//     const { data, error } = await useWpApi().getFrontPage();
//     if (!error.value) {
//         await settingStore.setFrontPage(data.value);
//     }
// }

useHead({
    bodyAttrs: {
        class: 'relative min-h-screen bg-thwhite font-roboto overflow-x-hidden'
    }
})

function processHashtags() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
                if (parent.classList?.contains('no-hash')) return NodeFilter.FILTER_REJECT;
                if (parent.classList?.contains('hash-tag')) return NodeFilter.FILTER_REJECT;
                if (node.textContent && /#\w+/.test(node.textContent)) return NodeFilter.FILTER_ACCEPT;
                return NodeFilter.FILTER_REJECT;
            }
        }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
        nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach(node => {
        const parent = node.parentElement;
        if (!parent) return;
        const span = document.createElement('span');
        span.innerHTML = node.textContent.replace(/#(\w+)/g, '<span class="hash-tag">#$1</span>');
        parent.replaceChild(span, node);
    });
}

let observer = null;

onMounted(() => {
    nextTick(() => {
        processHashtags();
    });

    observer = new MutationObserver((mutations) => {
        let shouldProcess = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldProcess = true;
                break;
            }
        }
        if (shouldProcess) {
            processHashtags();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<template>
    <header class="grid grid-cols-12 container pt-15 lg:pt-16.5 gap-y-11 sm:gap-0">
        <AppHeader />
    </header>

    <main class="mt-18 sm:mt-30">
        <slot />
    </main>

    <footer class="bg-thprimary pb-12.5 pt-23 sm:py-23 md:py-30 sm:flex flex-col justify-center items-center mt-50">
        <AppFooter />
    </footer>
</template>

<style>
.hash-tag {
    color: #055178;
    cursor: pointer;
}
</style>