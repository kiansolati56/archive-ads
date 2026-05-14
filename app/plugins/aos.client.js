// plugins/aos.client.js
import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        AOS.init({
            offset: 200,
            duration: 700,
            easing: 'ease',
            once: false,
            mirror: true,
        })
    })
})
