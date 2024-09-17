import { IUser } from '../interfaces/UserInterface';
import axios from '../lib/axios';
import { apiUrl } from '../lib/axios';


export const UserApi = {
    async getCurrentUser() {
        return await axios.get<IUser>(`${apiUrl}/users/me`);
    }
};