<template>
    <header class="app-header">
        <div class="container">
            <div class="app-header__content">
                <router-link to="/" class="link logo-link">
                    <img src="@/assets/icons/logo.svg" alt="Логотип" class="app-logo" />
                </router-link>

                <router-link to="/favorites" class="link app-link">
                    <img src="@/assets/icons/heart.svg" alt="Логотип" class="app-link" />
                    <span>
                        Избранное
                    </span>
                </router-link>
            </div>
        </div>
    </header>
</template>
  
<script>
export default {
    name: 'AppHeader',
};
</script>
  
<style lang="scss" scoped>
/* Стили для компонента заголовка (header) */
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
}

.link {
    text-decoration: none;
}

.app-logo {
    width: 84px;
    height: 33px;

    /* Укажите желаемую ширину логотипа */
    @media (min-width: 576px) {
        width: 185px;
        height: 73px;
    }
}

.app-link {
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
  