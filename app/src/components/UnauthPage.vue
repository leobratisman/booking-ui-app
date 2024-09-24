<template>
    <div class="wrapper-info">
        <h2>Вы не авторизованы</h2>
        <v-btn color="primary" class="button" to="/login">
            Войти в учетную запись
        </v-btn>
        <v-btn variant="tonal" color="green" class="button" to="register">
            Создать аккаунт
        </v-btn>
    </div>
</template>

<script setup>

</script>

<style scoped>

    .wrapper-info {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        height: 100vh;
    }

    .button {
        width: 300px;
    }

</style>