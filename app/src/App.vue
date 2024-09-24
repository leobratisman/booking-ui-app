<template>
	<v-app>
		<v-btn v-if="theme.global.name.value=='light'" class="theme-switcher" @click="toggleTheme" icon="mdi-weather-sunny"></v-btn>
		<v-btn v-else class="theme-switcher" @click="toggleTheme" icon="mdi-weather-night"></v-btn>
		<v-card>
			<v-layout>
				<v-navigation-drawer
					style="position: fixed;"
					:image="navImage"
					expand-on-hover
					rail
					class="screen-drawer"
				>
					<v-list>
						<v-list-item
							v-if="user"
							prepend-icon="mdi-account-circle"
							:subtitle="user.email"
							:title="user.username"
						></v-list-item>
						<v-list-item
							v-else
							prepend-icon="mdi-login"
							class="login-btn"
							to="/login"
							title="Войти"
							link
						></v-list-item>
					</v-list>

					<v-divider></v-divider>

					<v-list density="compact" nav>
						<v-list-item prepend-icon="mdi-account" to="/me" title="Мой профиль" value="Профиль"></v-list-item>
						<v-list-item prepend-icon="mdi-home-search" to="/hotels" title="Отели" value="Отели"></v-list-item>
						<v-list-item prepend-icon="mdi-book-edit" to="/bookings" title="Мои бронирования" value="Бронирования"></v-list-item>
						<v-list-item prepend-icon="mdi-home-plus" to="/hotel/add" title="Добавить отель" value="Добавить отель"></v-list-item>
					</v-list>

					<template v-slot:append>
						<div style="padding-bottom: 10px;">
							<v-list density="compact">
								<v-list-item style="color: red;" prepend-icon="mdi-logout" @click="logoutUser" title="Выйти"></v-list-item>
							</v-list>
						</div>
					</template>

				</v-navigation-drawer>

				<v-navigation-drawer
					class="phone-drawer"
					v-model="drawer"
					style="position: fixed;"
					:image="navImage"
				>
					<v-list>
						<v-list-item
							v-if="user"
							prepend-icon="mdi-account-circle"
							:subtitle="user.email"
							:title="user.username"
						></v-list-item>
						<v-list-item
							v-else
							prepend-icon="mdi-login"
							class="login-btn"
							to="/login"
							title="Войти"
							link
						></v-list-item>
					</v-list>

					<v-divider></v-divider>

					<v-list density="compact" nav>
						<v-list-item prepend-icon="mdi-account" to="/me" title="Мой профиль" value="Профиль"></v-list-item>
						<v-list-item prepend-icon="mdi-home-search" to="/hotels" title="Отели" value="Отели"></v-list-item>
						<v-list-item prepend-icon="mdi-book-edit" to="/bookings" title="Мои бронирования" value="Бронирования"></v-list-item>
						<v-list-item prepend-icon="mdi-home-plus" to="/hotel/add" title="Добавить отель" value="Добавить отель"></v-list-item>
					</v-list>

					<template v-slot:append>
						<div style="padding-bottom: 10px;">
							<v-list density="compact">
								<v-list-item style="color: red;" prepend-icon="mdi-logout" @click="logoutUser" title="Выйти"></v-list-item>
							</v-list>
						</div>
					</template>

				</v-navigation-drawer>
				<v-main style="min-height: 100vh;">
					<div class="phone-drawer-toggle" style="position: fixed;">
						<v-btn
							icon="mdi-menu"
							variant="text"
							@click.stop="drawer = !drawer"
						>
						</v-btn>
					</div>
					<router-view></router-view>
				</v-main>
			</v-layout>
    	</v-card>
	</v-app>
</template>

<script setup lang="ts">
	import { computed, onMounted, ref } from 'vue';
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

	const drawer = ref(false);

    const toggleTheme = () => {
        baseStore.toggleTheme();
		theme.global.name.value = baseStore.theme;
    };

	const navImage = computed(() => {
		return theme.global.name.value == "light" ? "https://i.pinimg.com/originals/df/22/0b/df220bd928d4a9ce53defb9f665191c6.png" : "https://i.pinimg.com/originals/b3/85/78/b38578854caa86d9af41a092e13a93c1.png"
	})

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

	.login-btn:active {
		background-color: inherit;
	}

	@media (max-width: 600px) {
		.phone-drawer {
			display: flex;
		}

		.phone-drawer-toggle {
			display: flex;
		}

		.screen-drawer {
			display: none;
		}
	}

	@media (min-width: 600px) {
		.phone-drawer {
			display: none;
		}

		.phone-drawer-toggle {
			display: none;
		}


		.screen-drawer {
			display: flex;
		}
	}

</style>
