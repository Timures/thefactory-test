<script setup>

import { ref, onMounted } from 'vue'; // Импортируем ref и onMounted

import PhotoList from '@/components/PhotoList.vue'

const ApiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_API_URL;

// Реактивная переменная для хранения загруженных фотографий
const photos = ref([]);
const searchTerm = ref('');

// подгрузка
const loading = ref(false); // Флаг загрузки
const currentPage = ref(1); // Текущая страница
const itemsPerPage = 9; // Количество элементов на странице

// Метод для загрузки фотографий с использованием fetch
const fetchPhotos = async () => {
  try {
    const response = await fetch(`${baseURL}/photos?client_id=${ApiKey}&orientation=squarish&per_page=9`);
    // console.log(import.meta.env.VITE_SOME_KEY)
    if (!response.ok) {
      throw new Error('Ошибка загрузки фотографий');
    }
    const data = await response.json();
    photos.value = data; // Присваиваем полученные данные переменной photos
    // console.log(photos.value.id)
  } catch (error) {
    console.error('Ошибка при загрузке фотографий:', error);
  }
};

const loadNextPage = async () => {
  if (loading.value) return; // Проверка, чтобы избежать параллельных запросов

  try {
    loading.value = true; // Устанавливаем флаг загрузки
    // Отправляем запрос к API для загрузки следующей порции изображений
    const response = await fetch(`${baseURL}/photos?client_id=${ApiKey}&orientation=squarish&page=${currentPage.value + 1}&per_page=${itemsPerPage}`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки изображений');
    }
    const data = await response.json();
    // Добавляем новые изображения к существующему массиву
    photos.value = photos.value.concat(data);
    currentPage.value += 1; // Увеличиваем текущую страницу
  } catch (error) {
    console.error('Ошибка при загрузке изображений:', error);
  } finally {
    loading.value = false; // Снимаем флаг загрузки
  }
};

const performSearch = async () => {
  try {
    const response = await fetch(`${baseURL}search/photos?client_id=${ApiKey}&query=${searchTerm.value}&orientation=squarish&per_page=9`);
    console.log('Выполняем поиск с запросом:', searchTerm.value);
    if (!response.ok) {
      throw new Error('Ошибка загрузки фотографий');
    }
    const data = await response.json();
    photos.value = data.results; // Присваиваем полученные данные переменной photos
    // console.log(photos.value.id)
  } catch (error) {
    console.error('Ошибка при загрузке фотографий:', error);
  }

};

// Вызываем метод fetchPhotos при открытии страницы
onMounted(() => {
  fetchPhotos();
  // Добавляем обработчик события scroll
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY; // Заменяем pageYOffset на scrollY
    const clientHeight = document.documentElement.clientHeight;
    
    // Проверяем, достиг ли скролл конца страницы (и добавьте дополнительный порог по желанию)
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadNextPage();
    }
  });
});
</script>

<template>
  <main>
    <div class="photos-search">
      <div class="container">
        <div class="search-input">
          <input v-model="searchTerm" placeholder="Поиск..." type="text" />
          <button @click="performSearch">
            <img src="@/assets/icons/search.svg" alt="search icon"></button>
        </div>
      </div>
    </div>

    <PhotoList>
      <router-link class="photo" v-for="photo in photos" :key="photo.id"
          :to="{ name: 'PhotoDetail', params: { id: photo.id } }">
          <img :src="photo.urls.small" :alt="photo.alt_description">
        </router-link>
    </PhotoList>

    <!-- Отображение loader'а, пока идет загрузка -->
    <div v-if="loading" class="loader">Loading...</div>
        
 
  </main>
</template>


<style lang="scss" scoped>
.photos-search {
  background-image: url('@/assets/img/vgog.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 80px 22px;

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    padding: 90px 22px;

  }
}

.search-input {
  position: relative;
  display: flex;
  max-width: 866px;
  margin: 0 auto;

  input[type="text"] {
    height: 70px;
    width: 100%;

    background-color: #fff;
    padding: 0 25px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;

    color: #000;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    position: absolute;
    right: 25px;
    top: calc(50% - 12px);
    width: 24px;

    img {
      width: 100%;
    }
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
}</style>