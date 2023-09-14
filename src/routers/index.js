import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Favorites from '@/pages/Favorites.vue'; 
import PhotoDetail from '@/pages/PhotoDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites, 
  },
  {
    path: '/photo/:id',
    name: 'PhotoDetail',
    component: PhotoDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
