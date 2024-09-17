import { defineStore } from 'pinia';

import { BaseState } from './types';
import { ITerm } from '../../interfaces/TermInterface';
import { hotelApi } from '../../api/hotel';

const defaultState: BaseState = {
    hotels: [],
    rooms: [],
    theme: 'dark',
};

export const useBaseStore = defineStore('base-store', {
    state: (): BaseState => defaultState,
    actions: {
        toggleTheme() {
            if (this.theme == 'light') {
                this.theme = 'dark';
            } else {
                this.theme = 'light';
            }
        },

        // Hotels
        // async fetchHotels() {
        //     try {
        //         const response = await hotelApi.getHotels({});
        //         this.hotels = response.data;
        //     } catch (err) {
        //         // console.log(err);
        //     }
        // },
        async fetchHotelsByFilters(location: string, filters: ITerm) {
            try {
                const response = await hotelApi.getHotels(location, filters);
                this.hotels = response.data;
            } catch (err) {
                // console.log(err);
            }
        },
        async fetchRoomsByHotel(hotelId: number, termParams: ITerm) {
            try {
                const response = await hotelApi.getRoomsByHotel(hotelId, termParams);
                this.rooms = response.data;
            } catch (err) {
                // console.log(err);
            }
        },
    }
})

