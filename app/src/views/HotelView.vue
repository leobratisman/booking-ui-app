<template>

    <div class="wrapper">
        <div class="open-panel-btn" v-if="!isPanelOpened">
            <v-btn @click="openPanel" variant="text" color="primary" prepend-icon="mdi-text-search-variant">Открыть параметры поиска</v-btn>
        </div>

        <div class="search-panel" v-if="isPanelOpened">
            <SearchPanel @closed-panel="closePanel"></SearchPanel>
        </div>

        <div class="hotel-list">
            <HotelCard v-for="hotel in hotels" :hotel-info="hotel" :key="hotel.id"></HotelCard>
        </div>

        <div class="pagination" v-if="hotels.length > 0">
            <v-pagination :length="2"></v-pagination>
        </div>

    </div>

</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { storeToRefs } from "pinia";

    import HotelCard from "../components/HotelCard.vue"
    import SearchPanel from "../components/SearchPanel.vue";
    import { useBaseStore } from "../store/modules/base";

    const baseStore = useBaseStore();

    const { hotels } = storeToRefs(baseStore);
    const isPanelOpened = ref(false);

    const closePanel = () => {
        isPanelOpened.value = false;
    };

    const openPanel = () => {
        isPanelOpened.value = true;
    };

    // onMounted (async () => {
    //     await baseStore.fetchHotels({})
    // })

</script>

<style scoped>

    @keyframes show{
        0%{
            opacity:0;
        }
        100% {
            opacity:1;
            transform: translateY(10px);
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .search-panel {
        padding-top: 50px;
        height: auto;
    }

    .open-panel-btn {
        padding: 20px;
        transform: translateY(-30px);
        opacity: 0;
        transition: 1s;
        animation: show 0.8s 1;
        animation-fill-mode: forwards;
    }

</style>