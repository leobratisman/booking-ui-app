<template>
    <div class="register-form-wrapper">
        <div class="title">
            <h1>Создать учетную запись</h1>
        </div>

        <RegisterForm style="height: auto;"></RegisterForm>
    </div>
</template>

<script setup lang="ts">
    import RegisterForm from '../components/auth/RegisterForm.vue'
</script>

<style scoped>
    .register-block {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .register-img {
        transition: 0.5s;
        margin-right: 100px;
    }

    .register-img:hover {
        transform: scale(1.1);
    }

    .register-form-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .title {
        text-align: center;
        padding: 30px 20px;
    }
</style>