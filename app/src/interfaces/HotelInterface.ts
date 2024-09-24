export interface IHotel {
    id: number;
    name: String;
    location: String;
    roomsQuantity: number;
    services: Array<string>;
    image: string;
    roomsLeft: number;
}

export interface IAddHotel {
    name: String | null;
    location: String | null;
    roomsQuantity: number | null;
    services: Array<string> | null;
    image: File | null;
}
