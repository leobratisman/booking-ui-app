import { IBooking } from '../interfaces/BookingInterface';
import { ITerm } from '../interfaces/TermInterface';
import axios from '../lib/axios';
import { apiUrl } from '../lib/axios';

export const bookingApi = {
    async getBookings() {
        return await axios.get<IBooking[]>(`${apiUrl}/bookings/list`);
    },

    async addBooking(roomId: number | undefined, termParams: ITerm) {
        await axios.post(`${apiUrl}/bookings/${roomId}`, termParams);
    },

    async updateBooking(item: IBooking) {
        await axios.patch(`${apiUrl}/bookings/${item.id}/`, item);
    },

    async deleteBooking(itemId: number) {
        await axios.delete(`${apiUrl}/bookings/${itemId}/`);
    },
};