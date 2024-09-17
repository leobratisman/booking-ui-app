<template>
    <div class="wrapper">
        <div class="search-panel">
            <v-sheet style="max-width: 700px;">
                <v-form class="search-form">
                    <div class="search-form-fields">
                        <v-text-field
                            v-model="location"
                            label="Локация"
                            width="200"
                            color="primary"
                        ></v-text-field>

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

                    <div class="divider"></div>

                    <v-btn block color="green">
                        Найти
                    </v-btn>

                </v-form>
            </v-sheet>
        </div>
        <div class="close-btn">
            <v-btn variant="text" @click="closePanel" icon="mdi-close" color="red"</v-btn>
        </div>
    </div>
    
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    
    import { useBaseStore } from '../store/modules/base';
    import router from '../router/index';

    const baseStore = useBaseStore();
    const { hotels } = storeToRefs(baseStore);

    const emit = defineEmits(['closedPanel'])

    const location = ref(null);

    const filterForm = ref({
        dateFrom: null,
        dateTo: null
    });

    const submitFilters = async () => {
        await baseStore.fetchHotelsByFilters(location.value, filterForm.value);
        if (hotels.value.length > 0) {
            router.push({path: "/hotels"});
        } else {
            alert('По вашему запросу ничего не найдено!')
        }
    }

    const closePanel = () => {
        emit('closedPanel');
    }
</script>

<style scoped>
    @keyframes show{
        0%{
            opacity:0;
        }
        100% {
            opacity:1;
            transform: translateY(0px);
        }
    }

    .search-panel {
        position: relative;
    }

    .search-form-fields {
        display: flex;
        gap: 20px;
    }

    .wrapper {
        position: relative;
        transform: translateY(-50px);
        opacity: 0;
        transition: 1s;
        animation: show 0.8s 1;
        animation-fill-mode: forwards;
    }

    .close-btn {
        display: flex;
    }
</style>