<template>
    <v-sheet class="mx-auto" width="400">
        <v-form>

            <v-text-field
                v-model="filterForm.location"
                label="Локация"
            ></v-text-field>

            <div class="date-block">
                <p>Дата бронирования</p>

                <div class="date">
                    <v-text-field
                        type="date"
                        v-model="filterForm.dateFrom"
                        label="От"
                    ></v-text-field>

                    <v-text-field
                        type="date"
                        v-model="filterForm.dateTo"
                        label="До"
                    ></v-text-field>
                </div>
            </div>
        </v-form>
        <v-btn
            block
            color="green"
            class="me-4"
            @click="submitFilters"
            >
            Применить
        </v-btn>
  </v-sheet>
</template>

<script setup>
    import { ref } from 'vue';
    
    import { useBaseStore } from '../store/modules/base';

    // import { IHotelFilterForm } from '../interfaces/HotelFilterFormInterface'

    const baseStore = useBaseStore();

    const filterForm = ref({
        location: null,
        dateFrom: null,
        dateTo: null
    });

    const submitFilters = async () => {
        const cleanedFilters = {};
  
        if (filterForm.value.location !== null) {
            cleanedFilters.location = filterForm.value.location;
        }
        if (filterForm.value.dateFrom !== null) {
            cleanedFilters.dateFrom = filterForm.value.dateFrom;
        }
        if (filterForm.value.dateTo !== null) {
            cleanedFilters.dateTo = filterForm.value.dateTo;
        }
        console.log(cleanedFilters);
        await baseStore.fetchHotelsByFilters(cleanedFilters);
    }

</script>

<style scoped>
    .date {
        display: flex;
        gap: 10px;
    }
</style>