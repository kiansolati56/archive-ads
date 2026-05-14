<script setup>
import CustomerIcon from '~/components/ui/icons/CustomerIcon.vue';
import InstagramIcon from '~/components/ui/icons/InstagramIcon.vue';
import WebsiteIcon from '~/components/ui/icons/WebsiteIcon.vue';
import CalendarIcon from '~/components/ui/icons/CalendarIcon.vue';

const props = defineProps({
    layout: {
        type: String,
        default: 'single',
        validator: (value) => ['single', 'split'].includes(value)
    },
    data: {
        type: Object,
        default: () => ({
            customer: 'Eurasia language institute',
            instagram: 'eurasiainstitu',
            instagramUrl: '#',
            website: 'www.eurasiainstitu.com',
            websiteUrl: '#',
            duration: 'Start in 2024 & 5 Days'
        })
    }
})
</script>

<template>
    <div v-if="layout === 'single'" class="flex flex-col gap-y-6 xl:gap-y-3 2xl:gap-y-6 mt-6 xl:mt-3 2xl:mt-6">
        <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
            <div class="flex items-center gap-3 sm:gap-6">
                <CustomerIcon />
                <span class="sm:text-xl">{{ $t('customer') }}:</span>
            </div>
            <p class="sm:text-xl font-light">{{ data?.customer }}</p>
        </div>

        <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
            <div class="flex items-center gap-3 sm:gap-6">
                <InstagramIcon />
                <span class="sm:text-xl">{{ $t('instagram') }}:</span>
            </div>
            <a :href="data?.instagramUrl" target="_blank" class="sm:text-xl">{{ data?.instagram }}</a>
        </div>

        <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
            <div class="flex items-center gap-3 sm:gap-6">
                <WebsiteIcon />
                <span class="sm:text-xl">{{ $t('website') }}:</span>
            </div>
            <a :href="data?.websiteUrl" target="_blank" class="sm:text-xl">{{ data?.website }}</a>
        </div>

        <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
            <div class="flex items-center gap-3 sm:gap-6">
                <CalendarIcon />
                <span class="sm:text-xl">{{ $t('date_and_Running_time') }}:</span>
            </div>
            <p class="sm:text-xl font-light">{{ data?.duration }}</p>
        </div>
    </div>

    <section v-else class="mt-13 sm:mt-22 xl:mt-32.5 grid xl:grid-cols-2">
        <div class="xl:border-r border-thgray-50/50 flex flex-col gap-y-6 xl:gap-y-3 2xl:gap-y-6">
            <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
                <div class="flex items-center gap-3 sm:gap-6">
                    <CustomerIcon />
                    <span class="sm:text-xl">{{ $t('customer') }}:</span>
                </div>
                <p class="sm:text-xl font-light">{{ data?.customer }}</p>
            </div>

            <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
                <div class="flex items-center gap-3 sm:gap-6">
                    <InstagramIcon />
                    <span class="sm:text-xl">{{ $t('instagram') }}:</span>
                </div>
                <a :href="data?.instagramUrl" target="_blank" class="sm:text-xl">{{ data?.instagram }}</a>
            </div>
        </div>

        <div class="flex xl:justify-end mt-6 xl:mt-0">
            <div class="flex flex-col gap-y-6 xl:gap-y-3 2xl:gap-y-6">
                <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
                    <div class="flex items-center gap-3 sm:gap-6">
                        <WebsiteIcon />
                        <span class="sm:text-xl">{{ $t('website') }}:</span>
                    </div>
                    <a :href="data?.websiteUrl" target="_blank" class="sm:text-xl">{{ data?.website }}</a>
                </div>

                <div class="flex flex-col sm:flex-row xl:items-center gap-2 sm:gap-4">
                    <div class="flex items-center gap-3 sm:gap-6">
                        <CalendarIcon />
                        <span class="sm:text-xl">{{ $t('date_and_Running_time') }}:</span>
                    </div>
                    <p class="sm:text-xl font-light">{{ data?.duration }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
a {
    font-weight: 300;
    color: #00559F;
}
</style>