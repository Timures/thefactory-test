import { defineStore } from "pinia";

export const useFavoritesStore = defineStore({
  id: "favorites",
  state: () => ({
    favoriteIds: [],
  }),

  getters: {
    getFavoriteIds: (state) => state.favoriteIds,

    isImageInFavorites: (state) => (imageId) => {
      return state.favoriteIds.includes(imageId);
    },
  },

  actions: {
    addToFavorites(id) {
      if (!this.favoriteIds.includes(id)) {
        this.favoriteIds.push(id);
      }
    },

    removeFromFavorites(id) {
      const index = this.favoriteIds.indexOf(id);
      if (index !== -1) {
        this.favoriteIds.splice(index, 1);
      }
    },
  },
});
