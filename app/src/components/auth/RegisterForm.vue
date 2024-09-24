<template>
    <div>
        <v-sheet class="mx-auto" style="border-radius: 20px;" width="300">
            <v-form fast-fail @submit.prevent class="register-form">
                <v-text-field
                    v-model="registerForm.email"
                    label="Email"
                    :rules="emailRules"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="registerForm.username"
                    label="Username"
                    :rules="usernameRules"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="registerForm.age"
                    label="Age"
                    :rules="ageRules"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="registerForm.password"
                    label="Password"
                    :rules="passwordRules"
                    type="password"
                    required
                ></v-text-field>

                <v-btn class="mt-2 mb-4" type="submit" @click="registerUser" color="green" block>Создать</v-btn>

                <p class="having-account">Уже есть аккаунт? <router-link to="/login" class="to-login-href">Войти</router-link></p>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    import { IRegisterForm } from '../../interfaces/AuthInterface';
    import { useUserStore } from '../../store/modules/user';
    import { emailRules, passwordRules, usernameRules, ageRules } from '../../utils/rules';

    const registerForm = ref<IRegisterForm>({
        email: null,
        password: null,
        age: null,
        username: null
    })    

    const userStore = useUserStore();

    const registerUser = async () => {
        await userStore.registerUser(registerForm.value);
    }

</script>

<style scoped>
    .having-account {
        text-align: center;
    }

    .register-form {
        padding: 30px 20px;
    }

    .to-login-href {
        cursor: pointer;
        color: rgb(28, 52, 232);
        text-decoration: none;
    }

    .to-login-href:hover {
        text-decoration: underline;
    }
</style>