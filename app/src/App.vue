<template>
	<v-app>
		<v-btn v-if="theme.global.name.value=='light'" class="theme-switcher" @click="toggleTheme" icon="mdi-weather-sunny"></v-btn>
		<v-btn v-else class="theme-switcher" @click="toggleTheme" icon="mdi-weather-night"></v-btn>
		<v-card>
			<v-layout>
				<v-navigation-drawer
					style="position: fixed;"
					expand-on-hover
					rail
				>
					<v-list>
						<v-list-item
							v-if="user"
							prepend-icon="mdi-account-circle"
							:subtitle="user.role"
							:title="user.email"
						></v-list-item>
						<v-list-item
							v-else
							prepend-icon="mdi-login"
							to="/login"
							title="Войти"
						></v-list-item>
					</v-list>

					<v-divider></v-divider>

					<v-list density="compact" nav>
						<v-list-item prepend-icon="mdi-account" to="/me" title="Мой профиль" value="starred"></v-list-item>
						<v-list-item prepend-icon="mdi-home-search" to="/" title="Отели" value="Отели"></v-list-item>
						<v-list-item prepend-icon="mdi-book-edit" to="/bookings" title="Мои бронирования" value="shared"></v-list-item>
					</v-list>

					<template v-slot:append>
						<div style="padding-bottom: 10px;">
							<v-list density="compact">
								<v-list-item style="color: red;" prepend-icon="mdi-logout" @click="logoutUser" title="Выйти"></v-list-item>
							</v-list>
						</div>
					</template>

				</v-navigation-drawer>
				<v-main>
					<router-view></router-view>
				</v-main>
			</v-layout>
    	</v-card>
	</v-app>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useTheme } from 'vuetify';
	import { storeToRefs } from 'pinia';

	import { useBaseStore } from './store/modules/base';
	import { useUserStore } from './store/modules/user';
	import router from './router/index';

	const baseStore = useBaseStore();
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);

	const isAuthorized = ref(false);

	const theme = useTheme();

    const toggleTheme = () => {
        baseStore.toggleTheme();
		theme.global.name.value = baseStore.theme;
    };

	const logoutUser = async () => {
		await userStore.logoutUser();
		router.push({path: '/login'});
		document.cookie = `booking_access_token=`;
	}

	onMounted ( async () => {
        theme.global.name.value = baseStore.theme;
		await userStore.getCurrentUser();
		if (user.value) {
			isAuthorized.value = true;
		} else {
			isAuthorized.value = false;
		}
    });
</script>

<style scoped>
	.theme-switcher {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 100;
    }
</style>
