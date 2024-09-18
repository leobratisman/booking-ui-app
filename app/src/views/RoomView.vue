<template>

    <div class="wrapper">
        <div>
            <v-btn @click="backToHotels" color="green" prepend-icon="mdi-keyboard-backspace" class="to-hotels-btn" variant="tonal">Отели</v-btn>
        </div>
        <div class="room-list">
            <RoomCard v-for="room in rooms" :RoomInfo="room" :key="room.id"></RoomCard>
        </div>
    </div>

</template>

<script setup>
    import { onMounted, ref, defineProps } from "vue";
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    import RoomCard from "../components/RoomCard.vue";

    import FilterForm from "../components/FilterForm.vue";
    import { useBaseStore } from "../store/modules/base";
    import router from "../router/index";

    const baseStore = useBaseStore();
    const route = useRoute();

    const { rooms } = storeToRefs(baseStore);

    const termParams = ref({
        dateFrom: "2024-09-12",
        dateTo: "2024-09-12",
    })

    onMounted (async () => {
        await baseStore.fetchRoomsByHotel(route.params.hotelId, termParams.value);
    })

    const backToHotels = () => {
        router.push({path: '/hotels'});
    }
</script>

<style scoped>

    .room-list {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
    }

    .to-hotels-btn {
        position: fixed;
        margin-top: 20px;
        margin-left: 20px;
    }

</style>