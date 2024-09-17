<template>
    <div class="login-form-warpper">
        <div class="title">
            <h1>Войти в учетную запись</h1>
        </div>

        <LoginForm style="height: auto;"></LoginForm>
    </div> 
</template>

<script setup lang="ts">
    import LoginForm from '../components/auth/LoginForm.vue'
</script>

<style scoped>
    .login-block {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-img {
        transition: 0.5s;
        margin-right: 100px;
    }

    .login-img:hover {
        transform: scale(1.1);
        transform: translateX(50px);
    }

    .login-form-warpper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .title {
        display: flex;
        text-align: center;
        padding: 30px 20px;
    }
</style>