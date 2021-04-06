import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Card } from "src/app/shared/interfaces/card.interface";
import { SetCard } from "./checkout.actions";

export interface CheckoutStateModel {
    card: Card | null;
}

@State<CheckoutStateModel>({
    name: 'checkout',
    defaults: {
        card: null
    }
})
@Injectable()
export class CheckoutState {
    @Selector()
    static getCard(state: CheckoutStateModel) {
        return state.card;
    }

    @Action(SetCard)
    setCard({ setState }: StateContext<CheckoutStateModel>, { payload }: SetCard) {
        setState({
            ...state,
            card: payload
        });
    }
}