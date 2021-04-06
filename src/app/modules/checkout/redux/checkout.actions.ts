import { Card } from "src/app/shared/interfaces/card.interface";

export class SetCard {
    static readonly type = '[Checkout] Set Card';
    constructor(public payload: Card) {}
}