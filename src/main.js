import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/scss/main.scss'
import router from '@/routers/index'
import App from './App.vue'

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
