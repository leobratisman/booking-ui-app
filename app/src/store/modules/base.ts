import { defineStore } from 'pinia';

import { BaseState } from './types';
import { hotelApi } from '../../api/hotel';
import { IHotelFilterForm } from '../../interfaces/HotelFilterFormInterface';


const defaultState: BaseState = {
    hotels: [],
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
        async fetchHotels() {
            try {
                const response = await hotelApi.getHotels({});
                this.hotels = response.data;
            } catch (err) {
                // console.log(err);
            }
        },
        async fetchHotelsByFilters(filters: any) {
            try {
                const response = await hotelApi.getHotels(filters);
                this.hotels = response.data;
            } catch (err) {
                // console.log(err);
            }
        }
    }
})

