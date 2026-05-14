import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxt/image', 'nuxt-aos', '@pinia/nuxt', '@nuxtjs/i18n'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: 'ARCHIVEADS' }
      ],
    }
  },

  i18n: {
    locales: [
      {
        code: 'fa',
        name: 'فارسی',
        iso: 'fa-IR',
        dir: 'rtl',
        file: 'fa.json'
      },
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        dir: 'ltr',
        file: 'en.json'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',

    // baseUrl: process.env.BASE_URI,
    detectBrowserLanguage: false,
  },

  // runtimeConfig: {
  //   wpUsername: process.env.WP_USERNAME,
  //   wpPassword: process.env.WP_PASSWORD,
  //   public: {
  //     wpUri: process.env.WP_URI,
  //     wpApiCache: process.env.NUXT_PUBLIC_WP_API_CACHE || 'false'
  //   },
  // },
})