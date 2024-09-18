export interface IRoom {
    id: number;
    hotelId: number;
    name: string;
    price: number;
    quantity: number;
    description: string | null;
    services: Array<String>;
    imageId: number;
    roomsLeft: number;
}
