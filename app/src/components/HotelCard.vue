<template>

    <div class="wrapper">
        <v-container class="hotel-info">
            <v-img v-if="hotelImageUrl" style="width: 300px; height: 300px" :src="hotelImageUrl" alt=""></v-img>
            <div class="hotel-info-text">
                <div>
                    <h2>{{ hotelInfo.name }}</h2>
                    <p>{{ hotelInfo.location }} <span>(Комнат свободно: {{ hotelInfo.rooms_left }})</span></p>
                    <div class="services" v-if="hotelInfo.services?.length > 0">
                        <span v-for="service in hotelInfo.services">{{ service }}</span>
                    </div>
                </div>
                <v-btn @click="toHotel(hotelInfo.id)" variant="tonal" style="align-self: flex-end;" block color="green">Перейти</v-btn>
            </div>
        </v-container>
    </div>

</template>

<script setup lang="ts">
    import { defineProps, onMounted, ref } from 'vue';

    import { IHotel } from '../interfaces/HotelInterface';
    import { useBaseStore } from '../store/modules/base';
    import router from '../router/index';

    const props = defineProps<{
        hotelInfo: IHotel
    }>()

    const baseStore = useBaseStore();
    const hotelImageUrl = ref<string | null>(null);

    const toHotel = (hotelId: number) => {
        router.push({path: `hotels/${hotelId}/rooms`});
    }

    onMounted (async() => {
        const imageObj = await baseStore.fetchHotelImage(props.hotelInfo.image);
        if (imageObj) {
            const blob = new Blob([imageObj.data], { type: 'image/webp' });
            hotelImageUrl.value = URL.createObjectURL(blob);
        }
    })
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

    @media (max-width: 700px) {
        .hotel-info {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
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