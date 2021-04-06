import { Quantity } from "./quantity.interface";

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    loading: boolean;
    price: {
        discount: number | null;
        value: number;
    };
    quantity: Quantity;
}