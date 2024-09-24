<template>

    <div v-if="user" class="wrapper">
        <div class="add-hotel-form">
            <h1 class="title">Добавить отель</h1>
            <v-sheet class="mx-auto" style="border-radius: 20px;" width="300">
                <v-form fast-fail @submit.prevent class="add-hotel-form-fields">
                    <v-text-field
                        v-model="addHotelForm.name"
                        label="Name"
                        :rules="nameRules"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="addHotelForm.location"
                        label="Location"
                        :rules="locationRules"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="addHotelForm.roomsQuantity"
                        label="Rooms quantity"
                        :rules="roomsQuantityRules"
                        required
                    ></v-text-field>

                    <v-select
                        v-model="addHotelForm.services"
                        :items="items"
                        label="Services"
                        chips
                        multiple
                    ></v-select>

                    <v-file-input
                        v-model="imageFile"
                        variant="underlined"
                        accept="image/png, image/jpeg, image/jpg, image/bmp"
                        label="Image"
                        :rules="imageIdRules"
                        required
                    ></v-file-input>

                    <v-btn class="mt-2 mb-4" type="submit" @click="addHotel" color="green" block>Создать</v-btn>

                </v-form>
            </v-sheet>
        </div>
    </div>
    <UnauthPage v-else></UnauthPage>

</template>

<script setup lang="ts">

    import { onMounted, ref } from 'vue';
    import { IAddHotel } from '../interfaces/HotelInterface';
    import { useBaseStore } from "../store/modules/base";
    import { useUserStore } from '../store/modules/user';
    import { v4 as uuidv4 } from 'uuid';

    import { storeToRefs } from 'pinia';
    import { nameRules, locationRules, roomsQuantityRules, imageIdRules } from '../utils/rules';
    import UnauthPage from '../components/UnauthPage.vue';

    const baseStore = useBaseStore();
    const userStore = useUserStore();

    const { user } = storeToRefs(userStore);

    const addHotelForm = ref<IAddHotel>({
        name: null,
        location: null,
        roomsQuantity: null,
        services: null,
        image: null,
    })

    const imageFile = ref<File | null>(null)

    const items: Array<string> = [
        'Wi-Fi',
        'Бассейн',
        'Кондиционер в номере',
        'Парковка',
        'Тренажёрный зал'
    ]

    const addHotel = async () => {        

        const uuidImage = uuidv4();

        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('image', imageFile.value, uuidImage);

        xhr.open('POST', 'http://127.0.0.1:8000/hotels/upload/image')
        xhr.send(formData);

        addHotelForm.value.image = uuidImage;
        await baseStore.addHotel(addHotelForm.value);

        addHotelForm.value = {
            name: null,
            location: null,
            roomsQuantity: null,
            services: null,
            image: null,
        }
        alert('Отель успешно добавлен!');
    }

    onMounted(async () => {
        await userStore.getCurrentUser();
    })

</script>

<style scoped>

    .wrapper {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        padding: 40px 50px;
    }
    
    .add-hotel-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }

    .title {
        text-align: center;
        margin-bottom: 40px;
    }

</style>