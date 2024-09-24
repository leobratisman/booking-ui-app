import { defineStore } from 'pinia';

import { UserState } from './types';
import { UserApi } from '../../api/user';
import { AuthApi } from '../../api/auth';
import { IRegisterForm, ILoginForm } from '../../interfaces/AuthInterface';
import router from '../../router/index';

const defaultState: UserState = {
    user: null,
    accessToken: null,
};

export const useUserStore = defineStore('user-store', {
    state: (): UserState => defaultState,
    actions: {
        async getCurrentUser() {
            try {
                const response = await UserApi.getCurrentUser();
                this.user = response.data;
            } catch (err) {
                // console.log(err);
            }
        },
        async registerUser(userData: IRegisterForm) {
            try {
                await AuthApi.registerUser(userData).then(() => this.loginUser(userData));
            } catch (err: any) {
                alert(err.response.data.detail);
            }
        },
        async loginUser(userData: ILoginForm) {
            try {
                const response = await AuthApi.loginUser(userData);
                document.cookie =  `booking_access_token=${response.data.access_token}`;

                await this.getCurrentUser();
                router.push({path: '/me'});
            } catch (err: any) {
                alert(err.response.data.detail);
            }
        },
        async logoutUser() {
            try {
                await AuthApi.logoutUser();
                this.user = null;
            } catch (err) {
                // console.log(err);
            }
        }
    }
})