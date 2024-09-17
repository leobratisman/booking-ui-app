<template>
    <div class="user-info-wrapper">
        <div v-if="isAuthorized" class="user-info-block">
            <h1>Мой профиль</h1>
            <p>{{ user?.email }}</p>
            <p>{{ user?.role }}</p>
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
    import { useRouter } from 'vue-router';

    const userStore = useUserStore();

    const { user } = storeToRefs(userStore);
    const router = useRouter();

    const isAuthorized = ref(false);

    onMounted(async () => {
        await userStore.getCurrentUser();
        if (user.value) {
            isAuthorized.value = true;
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
</style>