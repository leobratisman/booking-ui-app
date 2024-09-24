<template>
    <div>
        <v-btn @click="backToRoom" color="primary" prepend-icon="mdi-keyboard-backspace" class="to-rooms-btn" variant="outlined">Номера</v-btn>
    </div>
    <div class="wrapper" v-if="room">
        <v-container class="room-info">
            <img style="height: 200px;" src="../images/1.jpg" alt="">
            <div class="room-info-text">
                <div>
                    <h2>{{ room.name }}</h2>
                    <p>{{ room.description }}</p>
                    <div v-if="room.services?.length > 0" class="services">
                        <span v-for="service in room.services">{{ service }}</span>
                    </div>
                    <p>Цена за ночь: {{ room.price }}р</p>
                </div>                
            </div>
        </v-container>
        <div class="book-panel">
            <v-sheet style="min-width: 400px;">
                <v-form fast-fail @submit.prevent class="search-form">
                    <div class="search-form-fields">
                        <v-text-field
                            type="date"
                            v-model="termForm.dateFrom"
                            label="От"
                            :rules="dateRules"
                            required
                        ></v-text-field>

                        <v-text-field
                            type="date"
                            v-model="termForm.dateTo"
                            label="До"
                            :rules="dateRules"
                            required
                        ></v-text-field>
                    </div>

                    <div class="divider"></div>

                    <v-btn block color="green" type="submit" @click="submitBook">
                        Забронировать
                    </v-btn>

                </v-form>
            </v-sheet>
        </div>
    </div>  
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    
    import { useBaseStore } from '../store/modules/base';
    import { IRoom } from '../interfaces/RoomInterface';
    import { useUserStore } from '../store/modules/user';
    import { storeToRefs } from 'pinia';
    import router from '../router/index';
    import { ITerm } from '../interfaces/TermInterface';
    import { dateRules } from '../utils/rules';

    const baseStore = useBaseStore();
    const userStore = useUserStore();

    const props = defineProps({
        roomId: Number
    })

    const room = ref<IRoom>();

    const { user } = storeToRefs(userStore);

    const termForm = ref<ITerm>({
        dateFrom: null,
        dateTo: null
    });

    const submitBook = async () => {
        await baseStore.addBooking(props.roomId, termForm.value);
        router.push({path: "/bookings"});
    }

    const backToRoom = () => {
        router.push({path: `/hotels/${room.value?.hotelId}/rooms`});
    }

    onMounted(async () => {
        await userStore.getCurrentUser();
        if (!user.value) {
            router.push({path: "/login"});
        }
        room.value = await baseStore.fetchRoomById(props.roomId);
    })

</script>

<style scoped>

    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        gap: 40px;
        padding: 80px 40px;
    }

    .room-info {
        text-align: center;
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

    .to-rooms-btn {
        position: fixed;
        margin-top: 20px;
        margin-left: 20px;
    }

    @media (max-width: 700px) {
        .to-rooms-btn {
            margin-left: 40px;
        }
    }
</style>