<template>

    <div class="wrapper">
        <v-container class="hotel-info">
            <img style="height: 200px;" src="../images/1.jpg" alt="">
            <div class="hotel-info-text">
                <h2>{{ hotelInfo.name }}</h2>
                <p>{{ hotelInfo.location }} <span>(Комнат свободно: {{ hotelInfo.roomsLeft }})</span></p>
                <div class="services">
                    <span v-for="service in hotelInfo.services">{{ service }}</span>
                </div>
                <v-btn @click="toHotel(hotelInfo.id)" variant="tonal" style="align-self: flex-end;" block color="green">Перейти</v-btn>
            </div>
        </v-container>
    </div>

</template>

<script setup lang="ts">
    import { defineProps } from 'vue';

    import { IHotel } from '../interfaces/HotelInterface';
    import router from '../router/index';

    defineProps<{
        hotelInfo: IHotel
    }>()

    const toHotel = (hotelId: number) => {
        router.push({path: `hotels/${hotelId}/rooms`});
    }
</script>

<style scoped>
    .wrapper {
        border: 1px solid rgb(235, 231, 231);
        border-radius: 10px;
        margin-bottom: 10px;
        max-width: 700px;
    }

    .hotel-info {
        padding: 20px;
        display: flex;
        gap: 20px;
    }

    .hotel-info-text {
        display: flex;
        flex-wrap: wrap;
    }

    .services {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 10px;
        border-radius: 10px;
        margin: 10px 0;
        border: 1px solid black;
        font-style: italic;
    }
</style>