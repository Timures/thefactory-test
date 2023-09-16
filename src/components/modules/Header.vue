<script setup>

import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = ref(null);

const isHomePage = computed(() => {
    if (!route.value) return false;
    return route.value.path === '/';
});
onMounted(() => {
    route.value = useRoute();
})
</script>

<template>
    <header class="app-header">
        <div class="container">
            <nav class="app-header__content">
                <router-link to="/" class="link logo-link">
                    <img src="@/assets/icons/logo.svg" alt="Логотип" class="app-logo" />
                </router-link>
                <ul class="app-header__nav">
                    <li v-show="!isHomePage">
                        <router-link to="/" class="link search-link ">
                            <img src="@/assets/icons/search.svg" alt="Поиск" class="app-link" />
                            <span>
                                Поиск
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/favorites" class="link app-link">
                            <img src="@/assets/icons/heart.svg" alt="Логотип" class="app-link" />
                            <span>
                                Избранное
                            </span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
  
  
<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    background-color: black;
    height: 70px;

    @media (min-width: 576px) {
        height: 148px;
    }

    &__content {
        padding: 0 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__nav {
        display: flex;
        column-gap: 22px;
    }
}

.link {
    text-decoration: none;
}

.app-logo {
    width: 84px;
    height: 33px;

    @media (min-width: 576px) {
        width: 185px;
        height: 73px;
    }
}

.search-link {
    img {
        filter: invert(100%);
    }
}

.app-link,
.search-link {
    color: white;
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;

    img {
        width: 100%;
        max-width: 22px;
    }

    span {
        display: none;
    }

    &:hover {
        cursor: pointer;
    }

    @media (min-width: 576px) {
        span {
            display: inline-block;
        }
    }

}
</style>
  