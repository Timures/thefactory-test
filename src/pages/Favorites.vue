<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/store'; 
import FavoritePhoto from '@/components/FavoritePhoto.vue';
import PhotoList from '@/components/PhotoList.vue'

const favoritesStore = useFavoritesStore();

const favoriteIds = computed(() => favoritesStore.getFavoriteIds);
</script>

<template>
  <h1>Избранное</h1>
  <PhotoList>
    <div v-for="imageId in favoriteIds" :key="imageId">
      <FavoritePhoto :imageId="imageId" />
    </div>
  </PhotoList>
</template>