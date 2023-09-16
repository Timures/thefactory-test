<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useFavoritesStore } from '@/store/index.js';

const ApiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_API_URL;


const props = defineProps({
  imageId: String,
});

const imageUrl = ref('');

const fetchPhotoByID = async () => {
  try {
    const response = await fetch(`${baseURL}/photos/${props.imageId}?client_id=${ApiKey}`); // Замените URL на ваш
    if (!response.ok) {
      throw new Error('Ошибка загрузки фотографий');
    }
    const data = await response.json();
    imageUrl.value = data; // Присваиваем полученные данные переменной photos
  } catch (error) {
    console.error('Ошибка при загрузке фотографии:', error);
  }
};

/** FAVORITES REMOVE */
const favoritesStore = useFavoritesStore();
const removeFromFavorites = (id) => {
    favoritesStore.removeFromFavorites(id);
};

onMounted(() => {
  fetchPhotoByID();
  // Добавляем обработчик события на документ
});

</script>

<template>
  <div class="container">
    <div v-if="imageUrl" class="favorite-photo">
      <router-link class="photo" target="_self"
          :to="{ name: 'PhotoDetail', params: { id: props.imageId } }">
          <img :src="imageUrl.urls.small" :alt="imageUrl.alt_description" />
          
        </router-link>
        <button class="favorite-photo-btn" @click="removeFromFavorites(props.imageId)">x</button>
    </div>
  </div>
</template>

<style lang="scss">
.favorite-photo {
  position: relative;
  &-btn {
    position: absolute;
    bottom: 12px;
    right: 12px;
    z-index: 1;
  }
}

</style>