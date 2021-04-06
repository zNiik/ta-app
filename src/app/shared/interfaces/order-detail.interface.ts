import { Card } from "./card.interface";
import { Product } from "./products.interface";
import { User } from "./user.interface";

export interface OrderDetail {
    user: Pick<User, 'id' | 'firstName' | 'lastName' |'username'>;
    card: Card;
    products: Product[];
}