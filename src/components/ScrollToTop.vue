<template>
    <button class="scroll-to-top" @click="scrollToTop" v-if="showButton">
      <img src="@/assets/icons/arrow-top.svg" alt="arrow top icon">
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const showButton = ref(false);
  
  // Функция для прокрутки страницы вверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  // Обработчик события scroll для отображения/скрытия кнопки
  const handleScroll = () => {
    showButton.value = window.scrollY > 300; // Измените значение, чтобы кнопка появлялась при определенной прокрутке
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: transparent;
    color: #fff;
    border: none;
    border-radius: 50%;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    cursor: pointer;
  }

  </style>
  