import { IHotel } from "../../interfaces/HotelInterface";
import { IUser } from "../../interfaces/UserInterface";
import { IRoom } from "../../interfaces/RoomInterface";

export interface BaseState {
    hotels: IHotel[] | null;
    rooms: IRoom[] | null;
    theme: string;
}

export interface UserState {
    user: IUser | null;
    accessToken: string | null;
}