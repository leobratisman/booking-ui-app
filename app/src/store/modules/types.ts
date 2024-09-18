import { IHotel } from "../../interfaces/HotelInterface";
import { IUser } from "../../interfaces/UserInterface";
import { IRoom } from "../../interfaces/RoomInterface";
import { IBooking } from "../../interfaces/BookingInterface";

export interface BaseState {
    hotels: IHotel[] | null;
    rooms: IRoom[] | null;
    bookings: IBooking[] | null;
    theme: string;
}

export interface UserState {
    user: IUser | null;
    accessToken: string | null;
}