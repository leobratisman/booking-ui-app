export interface IRoom {
    id: number;
    hotelId: number;
    name: string;
    price: number;
    quantity: number;
    description: string | null;
    services: Array<String>;
    image_id: number | null;
    rooms_left: number | null;
}
