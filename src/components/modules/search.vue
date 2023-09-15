<template>
    <div class="search">
      <input v-model="searchTerm" @input="search" placeholder="Поиск..." />
      <ul>
        <li v-for="result in searchResults" :key="result.id">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, watch } from "vue";
  
  export default {
    setup() {
      const searchTerm = ref("");
      const searchResults = ref([]);
  
      const search = () => {
        // Здесь ты можешь добавить логику поиска, например, отправку запроса на сервер или фильтрацию данных.
        // В этом примере пусто, но ты можешь настроить его в соответствии с твоими потребностями.
      };
  
      // Следим за изменениями searchTerm и вызываем функцию поиска
      watch(searchTerm, () => {
        search();
      });
  
      return {
        searchTerm,
        searchResults,
        search,
      };
    },
  };
  </script>
  
  <style scoped>
  .search {
    margin: 20px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  </style>
  