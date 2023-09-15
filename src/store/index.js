import { defineStore } from "pinia";

export const useFavoritesStore = defineStore({
  id: "favorites",
  state: () => ({
    favoriteIds: [], // Список ID избранных картинок
  }),

  getters: {
    // Геттер для получения списка избранных ID
    getFavoriteIds: (state) => state.favoriteIds,
  },

  actions: {
    // Добавить ID в избранное
    addToFavorites(id) {
      if (!this.favoriteIds.includes(id)) {
        this.favoriteIds.push(id);
      }
    },

    // Удалить ID из избранного
    removeFromFavorites(id) {
      const index = this.favoriteIds.indexOf(id);
      if (index !== -1) {
        this.favoriteIds.splice(index, 1);
      }
    },
  },
});