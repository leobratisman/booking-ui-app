<template>
    <div class="user-info-wrapper">
        <div v-if="isAuthorized" class="user-info-block">
            <h1 style="margin-bottom: 50px;">Мой профиль</h1>
            <div class="user-info">
                <h2 class="info-attribute" style="margin-bottom: 20px;">{{ user?.username }}</h2>
                <p>email: <span class="info-attribute">{{ user?.email }}</span></p>
                <p>age: <span class="info-attribute">{{ user?.age }}</span></p>
                <p>role: <span class="info-attribute">{{ user?.role }}</span></p>
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


    .user-info {
        color: rgb(161, 161, 162);
        border-right: 2px solid black;
        padding: 30px 0;
    }

    .info-attribute {
        font-size: 20px;
    }
</style>