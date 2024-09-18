<template>

    <div class="wrapper">
        <v-container class="hotel-info">
            <img style="height: 200px;" src="../images/1.jpg" alt="">
            <div class="hotel-info-text">
                <div>
                    <h2>{{ RoomInfo.name }}</h2>
                    <p>{{ RoomInfo.description }}</p>
                    <div v-if="RoomInfo.services?.length > 0" class="services">
                        <span v-for="service in RoomInfo.services">{{ service }}</span>
                    </div>
                    <p>Количество номеров: {{ RoomInfo.roomsLeft }}</p>
                    <p>Цена за ночь: {{ RoomInfo.price }}р</p>
                </div>
                
                <v-btn @click="bookRoom" variant="tonal" style="align-self: flex-end; margin-top: 20px;" block color="primary">Забронировать</v-btn>
            </div>
        </v-container>
    </div>

</template>

<script setup lang="ts">
    import { defineProps } from 'vue';

    import { IRoom } from '../interfaces/RoomInterface';
    import router from '../router/index';

    const props = defineProps<{
        RoomInfo: IRoom
    }>()

    const bookRoom = () => {
        router.push({path: `/rooms/${props.RoomInfo.id}/book`})
    }
</script>

<style scoped>
    .wrapper {
        border: 1px solid rgb(235, 231, 231);
        border-radius: 10px;
        margin-bottom: 10px;
        max-width: 900px;
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