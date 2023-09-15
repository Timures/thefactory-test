<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/store/index.js'; // Подставьте путь к вашему хранилищу

const favoritesStore = useFavoritesStore();

// Геттер для получения избранных ID
const favoriteIds = computed(() => favoritesStore.getFavoriteIds);
</script>
В





<template>
    <h1>Избранное</h1>
    <ul>
      <li v-for="id in favoriteIds" :key="id">{{ id }}</li>
    </ul>
</template>