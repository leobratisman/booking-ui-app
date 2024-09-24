<template>

    <div class="wrapper">
        <div>
            <v-btn @click="backToHotels" color="green" prepend-icon="mdi-keyboard-backspace" class="to-hotels-btn" variant="tonal">Отели</v-btn>
        </div>
        <div class="room-list">
            <RoomCard v-for="room in pageItems" :RoomInfo="room" :key="room.id"></RoomCard>
        </div>
        <v-bottom-navigation style="position: fixed;" class="pagination-wrapper" v-if="rooms.length > 2">
            <div class="pagination-block">
                <v-pagination class="pagination" v-model="page" :length="paginationLength"></v-pagination>
            </div>
        </v-bottom-navigation>
    </div>

</template>

<script setup>
    import { onMounted, ref, defineProps, computed } from "vue";
    import { storeToRefs } from "pinia";
    import { useRoute } from "vue-router";
    import RoomCard from "../components/RoomCard.vue";

    import FilterForm from "../components/FilterForm.vue";
    import { useBaseStore } from "../store/modules/base";
    import router from "../router/index";

    const baseStore = useBaseStore();
    const route = useRoute();

    const { rooms } = storeToRefs(baseStore);

    const maxCountOfPaginateItems = 2;
    const page = ref(1);

    const paginationLength = computed(() => {
        return (rooms.value.length / maxCountOfPaginateItems).toFixed()
    })

    const pageItems = computed(() => {
        return rooms.value.slice(((page.value - 1) * maxCountOfPaginateItems), ((page.value - 1) * maxCountOfPaginateItems) + maxCountOfPaginateItems)
    })

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

    .wrapper {
        margin-left: 20px;
    }

    @media (max-width: 700px) {
        .wrapper {
            margin-left: 0px;
        }
    }

    .room-list {
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-height: 100vh;
        padding-top: 80px;
    }

    .to-hotels-btn {
        position: fixed;
        margin-top: 20px;
        margin-left: 20px;
    }

    @media (max-width: 700px) {
        .to-hotels-btn {
            margin-left: 40px;
        }
    }

</style>