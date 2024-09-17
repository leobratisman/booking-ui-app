<template>
    <v-app-bar :elevation="2">
        <v-app-bar-title>TRAVELSTAR</v-app-bar-title>

        <v-switch class="switcher-theme" @click="toggleTheme" :label="theme.global.name.value"></v-switch>
    </v-app-bar>
</template>

<script setup lang="ts">
    import { VAppBar, VAppBarTitle, VIcon } from 'vuetify/components';
    import { useTheme } from 'vuetify';

    const theme = useTheme();

    const toggleTheme = () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

</script>

<style scoped>

    .switcher-theme {
        position: fixed;
    }

</style>