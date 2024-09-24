<template>

    <div class="booking-wrapper">
        <div class="booking-info" v-if="room">
            <h2>{{ room.name }}</h2>
            <p>От: <span class="booking-info-attribute">{{ bookingInfo.dateFrom }}</span></p>
            <p>До: <span class="booking-info-attribute">{{ bookingInfo.dateTo }}</span></p>
        </div>
        <div class="delete-btn">
            <v-btn block color="red" @click="deleteBooking">Удалить</v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { IBooking } from '../interfaces/BookingInterface';
    import { IRoom } from '../interfaces/RoomInterface';
    import { useBaseStore } from '../store/modules/base';

    const baseStore = useBaseStore();

    const props = defineProps<{
        bookingInfo: IBooking
    }>()

    const room = ref<IRoom>();

    const deleteBooking = async () => {
        await baseStore.deleteBooking(props.bookingInfo.id);
    }

    onMounted(async () => {
        room.value = await baseStore.fetchRoomById(props.bookingInfo.roomId)
    })

</script>

<style scoped>

    .booking-wrapper {
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    }

    .delete-btn {
        margin-top: 20px;
    }

    .booking-info-attribute {
        font-style: italic;
    }

</style>