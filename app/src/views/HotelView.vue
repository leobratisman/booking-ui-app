<template>

    <div class="wrapper">
        <div class="open-panel-btn" v-if="!isPanelOpened">
            <v-btn @click="openPanel" variant="text" color="primary" prepend-icon="mdi-text-search-variant">Открыть параметры поиска</v-btn>
        </div>

        <div class="search-panel" v-if="isPanelOpened">
            <SearchPanel @closed-panel="closePanel"></SearchPanel>
        </div>

        <div v-if="hotels.length > 0" class="hotel-block">
            <div class="hotel-list">
                <HotelCard v-for="hotel in hotels" :hotel-info="hotel" :key="hotel.id"></HotelCard>
            </div>

            <div class="pagination" v-if="hotels.length > 0">
                <v-pagination :length="2"></v-pagination>
            </div>
        </div>
        <div v-else class="none-hotels">
            <h2>Ничего не найдено...</h2>
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

    const location = 'Алтай'
    const termData = {
        dateFrom: '2024-09-12',
        dateTo: '2024-09-12'
    }

    onMounted (async () => {
        await baseStore.fetchHotelsByFilters(location, termData);
    })

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
        gap: 20px;
    }

    .none-hotels {
        display: flex;
        align-items: center;
    }

    .search-panel {
        display: flex;
        padding-top: 50px;
        height: auto;
    }

    .open-panel-btn {
        display: flex;
        padding: 20px;
        transform: translateY(30px);
        opacity: 0;
        transition: 1s;
        animation: show 0.8s 1;
        animation-fill-mode: forwards;
    }

</style>