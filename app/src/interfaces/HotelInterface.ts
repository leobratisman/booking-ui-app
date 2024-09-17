export interface IHotel {
    id: number;
    name: String;
    location: String;
    rooms_quantity: number;
    services: JSON | null;
    image_id: number | null;
    rooms_left: number | null;
}
