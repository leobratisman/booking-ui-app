<template>
    <v-sheet class="mx-auto search-form" width="400">

        <h1 class="greeting" style="text-align: center; margin-bottom: 20px;">Найди свой отель</h1>

        <v-form>
            <v-text-field
                class="greeting"
                v-model="location"
                label="Локация"
            ></v-text-field>

            <v-container v-if="location != null && location != ''" class="date-block">
                <p>Дата бронирования</p>

                <div class="date">
                    <v-text-field
                        type="date"
                        v-model="filterForm.date_from"
                        label="От"
                    ></v-text-field>

                    <v-text-field
                        type="date"
                        v-model="filterForm.date_to"
                        label="До"
                    ></v-text-field>
                </div>
            </v-container>
        </v-form>
        <v-btn
            v-if="
            (location != null && location != '') &&
            (filterForm.date_from != null && filterForm.date_from != '') &&
            (filterForm.date_to != null && filterForm.date_to != '')
            "
            block
            color="green"
            class="me-4 submit-btn"
            @click="submitFilters"
            >
            Найти
        </v-btn>
        <div class="divider"></div>
  </v-sheet>
</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    
    import { useBaseStore } from '../store/modules/base';
    import router from '../router/index';

    const baseStore = useBaseStore();
    const { hotels } = storeToRefs(baseStore);

    const location = ref(null);

    const filterForm = ref({
        date_from: null,
        date_to: null
    });

    const submitFilters = async () => {
        await baseStore.fetchHotelsByFilters(location.value, filterForm.value);
        if (hotels.value.length > 0) {
            router.push({path: "/hotels"});
        } else {
            alert('По вашему запросу ничего не найдено!')
        }
    }

</script>

<style scoped>
    @keyframes show{
        0%{
            opacity:0;
        }
        100% {
            opacity:1;
            transform: translateX(0px);
        }
    }

    @keyframes appear{
        0%{
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }

    .date {
        display: flex;
        gap: 10px;
    }

    .date-block {
        transform: translateX(-30px);
        opacity: 0;
        transition: 1s;
        animation: show 0.8s 1;
        animation-fill-mode: forwards;
    }

    .submit-btn {
        transform: translateX(-30px);
        opacity: 0;
        transition: 1s;
        animation: show 0.8s 1;
        animation-fill-mode: forwards;
    }

    .search-form {
        height: 100vh;
        display: flex;
        flex-direction: column;
        padding-top: 100px;
    }

    .divider {
        display: flex;
        height: 100vh;
    }

    .greeting {
        opacity: 0;
        transition: 1s;
        animation: appear 2s 1;
        animation-fill-mode: forwards;
    }

</style>