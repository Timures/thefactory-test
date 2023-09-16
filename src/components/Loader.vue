<script setup>
const props = defineProps({
  isLoading: Boolean,
});
</script>

<template>
    <div v-show="isLoading" class="loader">
      <img src="@/assets/icons/loader.svg" alt="loader icon">
    </div>
</template>

<style lang="scss">
.loader {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 70px auto 20px;

    img {
        width: 100%;
    }

    @media (min-width: 576px) {
        width: 28px;
        height: 28px;
        margin: 100px auto 20px;
    }
}
</style>