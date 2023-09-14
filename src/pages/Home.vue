<script setup>
import { ref, onMounted } from 'vue'; // Импортируем ref и onMounted

const ApiKey = 'mlwN4BpfAUNKQdXZDOxu0f0R_4TC8iV6dzj8yIC6zA0';
const baseURL = 'https://api.unsplash.com/';

// Реактивная переменная для хранения загруженных фотографий
const photos = ref([]);

// Метод для загрузки фотографий с использованием fetch
const fetchPhotos = async () => {
  try {
    const response = await fetch(`${baseURL}/photos?client_id=${ApiKey}&orientation=squarish&per_page=9`); // Замените URL на ваш
    if (!response.ok) {
      throw new Error('Ошибка загрузки фотографий');
    }
    const data = await response.json();
    photos.value = data; // Присваиваем полученные данные переменной photos
    console.log(photos.value.id)
  } catch (error) {
    console.error('Ошибка при загрузке фотографий:', error);
  }
};

// Вызываем метод fetchPhotos при открытии страницы
onMounted(() => {
  fetchPhotos();
});
</script>

<template>
    <div class="container">
    <div class="photos-list">
      <div class="photo" v-for="(photo, index) in photos" :key="photo.id">
        <img :src="photo.urls.small" :alt="photo.alt_description">
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.photos-list {
  padding: 45px 20px 43px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: 16px;

  @media (min-width: 576px) {
    padding: 107px 0 71px;
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto auto;
  }
}

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