

<script setup>
import { ref, onMounted, defineProps } from 'vue';
const ApiKey = 'mlwN4BpfAUNKQdXZDOxu0f0R_4TC8iV6dzj8yIC6zA0';
const baseURL = 'https://api.unsplash.com/';


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
      <h2>{{ imageId }}</h2>
      <img :src="imageUrl.urls.small" :alt="imageUrl.alt_description" />
    </div>
  </div>
</template>
