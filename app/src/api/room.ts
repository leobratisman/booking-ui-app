import { IRoom } from '../interfaces/RoomInterface';
import axios from '../lib/axios';
import { apiUrl } from '../lib/axios';

export const roomApi = {
    async getRoomById(roomId: number | undefined) {
        return await axios.get<IRoom>(`${apiUrl}/rooms/${roomId}`);
    },

    async addRoom(item: IRoom) {
        await axios.post(`${apiUrl}/rooms/`, item);
    },

    async updateRoom(item: IRoom) {
        await axios.patch(`${apiUrl}/rooms/${item.id}/`, item);
    },

    async deleteRoom(itemId: number) {
        await axios.delete(`${apiUrl}/rooms/${itemId}/`);
    },
};