import { IHotel } from "../../interfaces/HotelInterface";
import { IUser } from "../../interfaces/UserInterface";

export interface BaseState {
    hotels: IHotel[] | null;
    theme: string;
}

export interface UserState {
    user: IUser | null;
    accessToken: string | null;
}