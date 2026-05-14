import {
    defineStore
} from 'pinia';
import {
    ref
} from 'vue';

export const useSettingStore = defineStore('setting', () => {
    const token = ref('');
    const setting = ref(null);
    const frontPage = ref({});
    const frontPageUpdatedAt = ref(null);

    const getToken = async () => {
        if (token.value) return token.value
        const config = useRuntimeConfig();
        const data = await $fetch(`/api/token`, {
            method: 'post',
        });
        token.value = data.token;
    };

    const getSetting = async () => {
        if (setting.value) return setting.value
        const config = useRuntimeConfig();
        setting.value = await $fetch(`${config.public.wpUri}/wp-json/wp/v2/settings`, { headers: { Authorization: `Bearer ${token.value}` } });
    };

    const setFrontPage = async (front) => {
        frontPage.value = front;
        frontPageUpdatedAt.value = Date.now();
    };


    return {
        token,
        setting,
        frontPage,
        frontPageUpdatedAt,
        setFrontPage,
        getSetting,
        getToken
    };
}, {
    persist: true,
});