<template>
    <div v-if="isAuthorized" class="wrapper-info">
        <div class="user-info-block">
            <h1 style="margin-bottom: 50px;">Мой профиль</h1>
            <div class="user-info">
                <h2 class="info-attribute" style="margin-bottom: 20px;">{{ user?.username }}</h2>
                <p>email: <span class="info-attribute">{{ user?.email }}</span></p>
                <p>age: <span class="info-attribute">{{ user?.age }}</span></p>
                <p>role: <span class="info-attribute">{{ user?.role }}</span></p>
            </div>
        </div>
    </div>
    <UnauthPage v-else></UnauthPage>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '../store/modules/user';

    import UnauthPage from '../components/UnauthPage.vue'

    const userStore = useUserStore();

    const { user } = storeToRefs(userStore);

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
    .wrapper-info {
        height: 100vh;
        display: flex;
        align-items: center;
    }

    .user-info {
        color: rgb(161, 161, 162);
        border-right: 2px solid black;
        padding: 30px 0;
    }

    .user-info-block {
        margin-left: 50px;
    }

    .info-attribute {
        font-size: 20px;
    }
</style>