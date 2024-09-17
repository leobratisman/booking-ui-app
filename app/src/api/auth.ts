import { IUser } from '../interfaces/UserInterface';
import { IRegisterForm } from '../interfaces/AuthInterface';
import { ILoginForm } from '../interfaces/AuthInterface';
import axios from '../lib/axios';
import { apiUrl } from '../lib/axios';

export const AuthApi = {
    async registerUser(user_data: IRegisterForm) {
        return await axios.post<IUser>(`${apiUrl}/register`, user_data);
    },
    async loginUser(userData: ILoginForm) {
        return await axios.post<IUser>(`${apiUrl}/login`, userData);
    },
    async logoutUser() {
        return await axios.post(`${apiUrl}/logout`);
    },
};