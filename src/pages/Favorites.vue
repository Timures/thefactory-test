<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/store'; // Подставьте путь к вашему хранилищу
import FavoritePhoto from '@/components/modules/FavoritePhoto.vue';
const favoritesStore = useFavoritesStore();

// Геттер для получения избранных ID
const favoriteIds = computed(() => favoritesStore.getFavoriteIds);
</script>
В





<template>
    <h1>Избранное</h1>
    <div v-for="imageId in favoriteIds" :key="imageId">
      {{ imageId }}
      <FavoritePhoto :imageId="imageId" />
    </div>
</template>