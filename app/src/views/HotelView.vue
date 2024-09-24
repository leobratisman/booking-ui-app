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
                <HotelCard v-for="hotel in pageItems" :hotel-info="hotel" :key="hotel.id"></HotelCard>
            </div>
            <div class="divider"></div>
            <v-bottom-navigation style="position: fixed;" class="pagination-wrapper" v-if="hotels.length > 2">
                <div class="pagination-block">
                    <v-pagination class="pagination" v-model="page" :length="paginationLength"></v-pagination>
                </div>
            </v-bottom-navigation>
        </div>
        <div v-else class="none-hotels">
            <h2>Ничего не найдено...</h2>
        </div>
    </div>

</template>

<script setup>
    import { computed, onMounted, ref, watch } from "vue";
    import { storeToRefs } from "pinia";

    import HotelCard from "../components/HotelCard.vue"
    import SearchPanel from "../components/SearchPanel.vue";
    import { useBaseStore } from "../store/modules/base";

    const baseStore = useBaseStore();

    const { hotels } = storeToRefs(baseStore);
    const isPanelOpened = ref(false);

    const maxCountOfPaginateItems = 2;
    const page = ref(1);

    const paginationLength = computed(() => {
        return (hotels.value.length / maxCountOfPaginateItems).toFixed()
    })

    const pageItems = computed(() => {
        return hotels.value.slice(((page.value - 1) * maxCountOfPaginateItems), ((page.value - 1) * maxCountOfPaginateItems) + maxCountOfPaginateItems)
    })

    const closePanel = () => {
        isPanelOpened.value = false;
    };

    const openPanel = () => {
        isPanelOpened.value = true;
    };

    const location = 'Москва'
    const termData = {
        date_from: '2024-09-12',
        date_to: '2024-09-12'
    }

    onMounted (async () => {
        await baseStore.fetchHotelsByFilters(location, termData);
    })

    watch (page, (newPage) => {
        console.log(page);
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

    .hotel-list {
        display: flex;
        flex-direction: column;
    }

</style>