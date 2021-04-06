export type CardType = 'visa' | 'mastercard';

export interface Card {
    type: CardType;
    name: string;
    number: number;
    expiry: string;
    cvv: number;
}