import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Favorites from '../pages/Favorites.vue'; // Импортируйте новую страницу

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites, // Добавьте маршрут для страницы "favorites"
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
