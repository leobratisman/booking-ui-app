import { IHotel } from '../interfaces/HotelInterface';
import axios from '../lib/axios';
import { apiUrl } from '../lib/axios';

export const hotelApi = {
    async getHotels(filters: any) {
        return await axios.post<IHotel[]>(`${apiUrl}/hotels/list`, filters);
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
