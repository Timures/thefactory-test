<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router'; // Импортируем useRoute
import { useFavoritesStore } from '@/store/index.js';

const ApiKey = 'mlwN4BpfAUNKQdXZDOxu0f0R_4TC8iV6dzj8yIC6zA0';
const baseURL = 'https://api.unsplash.com/';

// Получение ID фотографии из параметров маршрута с помощью useRoute
const route = useRoute();
const photoId = ref(route.params.id);

// Метод загрузки фото по ID
const photo = ref(null);

const isFullScreen = ref(false);

const openFullScreen = () => {
    isFullScreen.value = true;
};

const closeFullScreen = () => {
    isFullScreen.value = false;
};

const closeFullScreenOutside = (event) => {
    // Проверяем, был ли клик вне изображения
    if (event.target.classList.contains('full-screen-container')) {
        closeFullScreen();
    }
};


const fetchPhotoByID = async () => {
    try {
        const response = await fetch(`${baseURL}/photos/${photoId.value}?client_id=${ApiKey}`); // Замените URL на ваш
        if (!response.ok) {
            throw new Error('Ошибка загрузки фотографий');
        }
        const data = await response.json();
        photo.value = data; // Присваиваем полученные данные переменной photos

        console.log(photo)
    } catch (error) {
        console.error('Ошибка при загрузке фотографии:', error);
    }
};

/*** FAVORITES */
const favoritesStore = useFavoritesStore();
const addToFavorites = (id) => {
    favoritesStore.addToFavorites(id);
};

onMounted(() => {
    fetchPhotoByID();
    // Добавляем обработчик события на документ
});

</script>


<template>
    <main class="photo-detail">
        <div class="photo-detail-bg"></div>
        <div class="container">
            <div v-if="photo">
                <div class="photo-info">
                    <div class="user">
                        <div class="user-ava">
                            <img :src="photo.user.profile_image.small" :alt="photo.user.username">
                        </div>
                        <div class="user-content">
                            <div class="user-name">{{ photo.user.username }}</div>
                            <div class="user-social">
                                <a :href="photo.user.twitter_username">@{{ photo.user.twitter_username }}</a>
                            </div>
                        </div>
                    </div>
                    <div class="photo-actions">
                        <button @click="addToFavorites(photo.id)">
                            <img class="icon-heart" src="@/assets/icons/heart.svg" alt="">
                        </button>

                        <a :href="photo.links.download" download>
                            <img class="icon-download" src="@/assets/icons/download.svg" alt="">
                            <span>Download</span>
                        </a>
                    </div>
                </div>
                <div class="photo-image">
                    <transition name="fade" mode="out-in">
                        <div :key="isFullScreen">
                            <!-- Если не в полноэкранным режиме, отображаем изображение -->
                            <div v-if="!isFullScreen" class="normal-screen-container">
                                <img :src="photo.urls.small" :alt="photo.alt_description" />
                                <!-- Кнопка для перехода в полноэкранный режим -->
                                <button class="fullscreen-button" @click="openFullScreen">
                                    <img src="@/assets/icons/fullscreen.svg" alt="fullscreen icon">
                                </button>
                            </div>
                            <!-- Если в полноэкранным режиме, отображаем только изображение -->
                            <div v-else>
                                <div class="full-screen-container" @click="closeFullScreenOutside">
                                    <div class="full-screen-image">
                                        <img :src="photo.urls.small" :alt="photo.alt_description" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
            <div v-else>
                Loading...
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.photo-detail {
    padding: 40px 20px;
    position: relative;

    @media (min-width: 576px) {
        padding: 43px 0;
    }

    img {
        width: 100%;
    }


}

.photo-detail-bg {
    display: none;

    @media (min-width: 576px) {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        background: url('@/assets/img/bg-photo-details.png') rgba(0, 0, 0, 0.50);
        background-position: 0 0;
        background-size: cover;
        height: 77vh;
        backdrop-filter: blur(4px);
        z-index: -1;
    }
}

.photo-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 576px) {
        padding: 0 20px;
    }

    // X-Large devices (large desktops, 1200px and up)
   // XX-Large devices (larger desktops, 1400px and up)
   @media (min-width: 1441px) {
    padding: 0;
    }

}

.user {
    display: flex;
    align-items: center;
    column-gap: 11px;


    &-ava {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        background: lightgray 50% / cover no-repeat;

        @media (min-width: 576px) {
            width: 55px;
            height: 55px;
        }

        img {
            width: 100%;
            border: 1px solid #FFF;
            border-radius: 8px;
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    &-name {
        // color: var(--Gray-6, #F2F2F2);
        color: #000;
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        @media (min-width: 576px) {
            color: #F2F2F2;
            font-size: 30px;
        }

    }

    &-social {
        a {
            color: #bdbdbd;
            font-family: Roboto;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-decoration: none;

            @media (min-width: 576px) {
                color: #F2F2F2;
                font-size: 18px;
            }
        }
    }
}

.photo-image {
    margin-top: 32px;

    @media (min-width: 576px) {
        margin-top: 40px;
    }

}

.photo-actions {
    display: flex;
    align-items: center;
    column-gap: 12px;

    button,
    a {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border: none;
        border-radius: 8px;
        width: 42px;
        height: 42px;
        /* shadow_bt */
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

        @media (min-width: 576px) {
            height: 50px;
            width: 50px;
        }
    }

    .icon-heart {

        max-width: 21px;
        width: 100%;
        filter: invert(100%);

        @media (min-width: 576px) {
            max-width: 26px;

        }
    }

    .icon-download {
        max-width: 21px;
        width: 100%;

        @media (min-width: 576px) {
            max-width: 26px;
        }
    }

    a {
        border: none;
        background: #FFF200;
        color: #000;
        font-family: Roboto;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-decoration: none;

        span {
            display: none;
        }

        @media (min-width: 576px) {
            width: auto;
            padding: 0px 23px;
            height: 50px;

            span {
                margin-left: 16px;
                display: inline-block;
            }
        }
    }
}

/* Стили для изображения на весь экран */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 3;
}

.full-screen-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    /* Полупрозрачный фон для подсветки изображения */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    /* Поместите полноэкранный контейнер наверх всех элементов */
}

.normal-screen-container {
    margin: 0 auto;
    //   cursor: pointer;
    max-width: 100%;
    max-height: 100%;
    /* Добавьте другие стили, если необходимо */
    position: relative;
    border-radius: 8px;
    background: lightgray 50% / cover no-repeat, linear-gradient(0deg, rgba(40, 36, 22, 0.08) 0%, rgba(40, 36, 22, 0.08) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat, url(<path-to-image>), lightgray 50% / cover no-repeat, #FFF;

    img {
        width: 100%;
        // max-height: 77vh;
        border-radius: 8px;


    }

    @media (min-width: 576px) {
        max-width: 90%;
        max-height: 90%;
        box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.50);
    }

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1441px) {
        max-width: 100%;
    }
}

.fullscreen-button {
    position: absolute;
    bottom: 8px;
    right: 9px;
    background: transparent;
    border: none;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
    }
}

.full-screen-image {
    cursor: pointer;
    max-width: 100%;
    max-height: 100%;
    /* Добавьте другие стили, если необходимо */
}</style>