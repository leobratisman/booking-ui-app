<template>
    <div>
        <v-sheet class="mx-auto" style="border-radius: 20px;" width="300">
            <v-form v-model="isValid" fast-fail @submit.prevent class="login-form">
                <v-text-field
                    v-model="loginForm.email"
                    label="Email"
                    :rules="emailRules"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="loginForm.password"
                    label="Password"
                    :rules="passwordRules"
                    type="password"
                    required
                ></v-text-field>

                <v-btn class="mt-2 mb-4" type="submit" color="primary" @click="loginUser" block>Войти</v-btn>

                <p class="having-account"><router-link to="/register" class="to-register-href">Создать аккаунт</router-link></p>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    
    import { ILoginForm } from '../../interfaces/AuthInterface';
    import { useUserStore } from '../../store/modules/user';

    const userStore = useUserStore();

    const loginForm = ref<ILoginForm>({
        email: null,
        password: null
    })

    const emailRules = [
        value => {
          if (value) return true

          return 'E-mail is requred.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
    ]

    const passwordRules = [
        value => {
          if (value) return true

          return 'Password is required.'
        },
        value => {
          if (value?.length >= 1) return true

          return 'Password must be greater than 0 characters.'
        },
    ]

    const isValid = ref(false);

    const loginUser = async() => {
        await userStore.loginUser(loginForm.value);
    }

</script>

<style scoped>
    .having-account {
        text-align: center;
    }

    .login-form {
        padding: 30px 20px;
    }

    .to-register-href {
        cursor: pointer;
        text-decoration: none;
        padding: 5px 10px;
        transition: 0.2s;
        border-radius: 20px;
    }

    .to-register-href:hover {
        background-color: rgb(214, 237, 217);
    }
</style>