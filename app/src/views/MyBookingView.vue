<template>
    <div class="user-info-wrapper">
        <div v-if="isAuthorized" class="bookings-info-block">
            <h1 style="margin-bottom: 50px;">Мои бронирования</h1>
            <div class="booking-info" v-if="bookings">
                <div v-for="booking in bookings" class="booking-info-block">
                    <BookingCard :booking-info="booking"></BookingCard>
                </div>
            </div>
            <div v-else>
                <p>У вас нет бронирований</p>
            </div>
        </div>
        <div v-else>
            <h2>Вы не авторизованы</h2>
            <p>
                <router-link to="/login">
                Войти в учетную запись
                </router-link>
            </p>
            <p>
                <router-link to="/register">
                Создать аккаунт
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '../store/modules/user';
    import { useBaseStore } from '../store/modules/base';
    import { useRouter } from 'vue-router';

    import BookingCard from '../components/BookingCard.vue';
    import { IRoom } from '../interfaces/RoomInterface';

    const userStore = useUserStore();
    const baseStore = useBaseStore();

    const { user } = storeToRefs(userStore);
    const { bookings } = storeToRefs(baseStore);
    const router = useRouter();

    const isAuthorized = ref(false);

    onMounted(async () => {
        await userStore.getCurrentUser();
        if (user.value) {
            isAuthorized.value = true;
            await baseStore.fetchBookings();
        } else {
            isAuthorized.value = false;
        }
    })

</script>

<style scoped>
    .user-info-wrapper {
        height: 100vh;
        display: flex;
        margin-left: 50px;
        align-items: center;
    }


    .user-info {
        color: rgb(161, 161, 162);
        border-right: 2px solid black;
        padding: 30px 0;
    }

    .info-attribute {
        font-size: 20px;
    }
</style>