<template>

    <div class="wrapper">
        <div class="hotel-info">
            <img src="../images/1.jpg" alt="">
            <h2>{{ hotelInfo.name }}</h2>
            <p>{{ hotelInfo.location }}</p>
            <span v-for="service in hotelInfo.services">{{ service }}</span>
            <p>{{ hotelInfo.rooms_quantity }}</p>
            <p>{{ hotelInfo.rooms_left }}</p>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { defineProps } from 'vue';

    import { IHotel } from '../interfaces/HotelInterface';

    defineProps<{
        hotelInfo: IHotel
    }>()
</script>

<style scoped>
    .wrapper {
        border: 1px solid rgb(235, 231, 231);
        border-radius: 10px;
        margin-bottom: 10px;
    }

    .hotel-info {
        padding: 20px;
    }
</style>