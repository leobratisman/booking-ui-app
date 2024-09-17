import { IHotel } from '../interfaces/HotelInterface';
import { IRoom } from '../interfaces/RoomInterface';
import { ITerm } from '../interfaces/TermInterface';
import axios from '../lib/axios';
import { apiUrl } from '../lib/axios';

export const hotelApi = {
    async getHotels(location: string, filters: ITerm) {
        console.log(location, filters);
        return await axios.post<IHotel[]>(`${apiUrl}/hotels/${location}`, filters);
    },

    async getRoomsByHotel(hotelId: number, termParams: ITerm) {
        return await axios.post<IRoom[]>(`${apiUrl}/hotels/${hotelId}/rooms`, termParams);
    },

    async addHotel(item: IHotel) {
        await axios.post(`${apiUrl}/hotels/`, item);
    },

    async updateHotel(item: IHotel) {
        await axios.patch(`${apiUrl}/hotels/${item.id}/`, item);
    },

    async deleteHotel(itemId: number) {
        await axios.delete(`${apiUrl}/hotels/${itemId}/`);
    },
};
