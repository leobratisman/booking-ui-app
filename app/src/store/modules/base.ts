import { defineStore } from 'pinia';

import { BaseState } from './types';
import { ITerm } from '../../interfaces/TermInterface';
import { hotelApi } from '../../api/hotel';
import { bookingApi } from '../../api/booking';
import { roomApi } from '../../api/room';
import { IHotel, IAddHotel } from '../../interfaces/HotelInterface';

const defaultState: BaseState = {
    hotels: [],
    rooms: [],
    bookings: [],
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
        async addHotel(hotelData: IAddHotel) {
            try {
                await hotelApi.addHotel(hotelData);
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
        async fetchRoomById(roomId: number | undefined) {
            try {
                const response = await roomApi.getRoomById(roomId);
                return response.data;
            } catch (err) {
                // console.log(err);
            }
        },
        async fetchBookings() {
            try {
                const response = await bookingApi.getBookings();
                this.bookings = response.data;
            } catch (err) {
                // console.log(err);
            }
        },
        async addBooking(roomId: number | undefined, termParams: ITerm) {
            try {
                await bookingApi.addBooking(roomId, termParams);
                await this.fetchBookings();
            } catch (err) {
                // console.log(err);
            }
        },
        async deleteBooking(bookingId: number) {
            try {
                await bookingApi.deleteBooking(bookingId);
                await this.fetchBookings();
            } catch (err) {
                // console.log(err);
            }
        },
        async fetchHotelImage(uuid: string) {
            try {
                return await hotelApi.getHotelImage(uuid);
            } catch (err) {
                // console.log(err);
            }
        },
    }
})

