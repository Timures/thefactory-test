<script setup>
import { ref, onMounted, defineProps } from 'vue';

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

onMounted(() => {
  fetchPhotoByID();
  // Добавляем обработчик события на документ
});

</script>

<template>
  <div class="container">
    <div v-if="imageUrl">
      <router-link class="photo" target="_self"
          :to="{ name: 'PhotoDetail', params: { id: props.imageId } }">
          <img :src="imageUrl.urls.small" :alt="imageUrl.alt_description" />
        </router-link>
      
    </div>
  </div>
</template>

<style lang="scss">
.photo {
  img {
    width: 100%;
    height: 312px;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (min-width: 576px) {
    img {
      height: 440px;
    }
  }
}
</style>