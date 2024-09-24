import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../components/FilterForm.vue'),
    },
    {
        path: '/hotels',
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
        component: () => import('../views/MyBookingView.vue'),
    },
    {
        path: '/hotels/:hotelId/rooms',
        props: true,
        component: () => import('../views/RoomView.vue'),
    },
    {
        path: '/rooms/:roomId/book',
        props: true,
        component: () => import('../views/BookRoomView.vue')
    },
    {
        path: '/hotel/add',
        component: () => import('../views/AddHotelPanel.vue')
    },
];

export default routes;