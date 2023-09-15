<script setup>

import { ref, onMounted } from 'vue'; // Импортируем ref и onMounted

const ApiKey = 'mlwN4BpfAUNKQdXZDOxu0f0R_4TC8iV6dzj8yIC6zA0';
const baseURL = 'https://api.unsplash.com/';

// Реактивная переменная для хранения загруженных фотографий
const photos = ref([]);
const searchTerm = ref('');

// Метод для загрузки фотографий с использованием fetch
const fetchPhotos = async () => {
  try {
    const response = await fetch(`${baseURL}/photos?client_id=${ApiKey}&orientation=squarish&per_page=9`);
    console.log(import.meta.env.VITE_SOME_KEY)
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

    <div class="container">
      <div class="photos-list">
        <router-link class="photo" v-for="photo in photos" :key="photo.id"
          :to="{ name: 'PhotoDetail', params: { id: photo.id } }">
          <img :src="photo.urls.small" :alt="photo.alt_description">
        </router-link>
      </div>
    </div>
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

  .photos-list {
    padding: 45px 20px 43px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 16px;

    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) {
      // padding: 107px 0 71px;
      
      
      grid-template-rows: auto ;
    }

    // Medium devices (tablets, 768px and up)
@media (min-width: 768px) { 
  grid-template-columns: auto auto ;
    grid-template-rows: auto;
 }
    // Large devices (desktops, 992px and up)
@media (min-width: 992px) { 
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  padding: 107px 20px 71px; }
   
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