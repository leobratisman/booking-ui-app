<template>

    <div class="wrapper">
        <div class="search-form">
            <h2 style="margin-bottom: 20px; text-align: center;">Фильтры</h2>
            <FilterForm></FilterForm>
        </div>

        <div class="hotel-list">
            <HotelCard v-for="hotel in hotels" :hotel-info="hotel"></HotelCard>
        </div>
    </div>

</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { storeToRefs } from "pinia";

    import HotelCard from "../components/HotelCard.vue"
    import FilterForm from "../components/FilterForm.vue";
    import { useBaseStore } from "../store/modules/base";

    const baseStore = useBaseStore();

    const { hotels } = storeToRefs(baseStore);

    onMounted (async () => {
        await baseStore.fetchHotels({})
    })

</script>

<style scoped>

    .wrapper {
        display: flex;
    }

    .hotel-list {
        margin-left: 500px;

    }

    .search-form {
        height: 100vh;
        border-right: 1px solid rgb(210, 210, 210);
        display: flex;
        flex-direction: column;
        justify-items: center;
        justify-content: center;
        position: fixed;
    }

</style>