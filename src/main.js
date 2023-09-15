import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useFavoritesStore } from './store'; // Импорт вашего хранилища
import './assets/scss/main.scss'
import router from '@/routers/index'
import App from './App.vue'


const pinia = createPinia()
const store = useFavoritesStore(pinia); // Замените на ваше хранилище

// Проверяем наличие сохраненного состояния в localStorage
const storedState = localStorage.getItem('storeState');
if (storedState) {
  store.$state = JSON.parse(storedState);
}

// Подписываемся на изменения состояния и сохраняем его в localStorage при обновлениях
store.$subscribe(() => {
  localStorage.setItem('storeState', JSON.stringify(store.$state));
});

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
