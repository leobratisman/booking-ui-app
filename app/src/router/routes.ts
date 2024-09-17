import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../views/HotelView.vue'),
    },
    {
        path: '/login',
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/register',
        component: () => import('../views/RegisterView.vue'),
    },
    {
        path: '/me',
        component: () => import('../views/ProfileView.vue'),
    },
    {
        path: '/bookings',
        component: () => import('../views/BookingView.vue'),
    },
];

export default routes;