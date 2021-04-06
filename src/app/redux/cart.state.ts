import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Product } from "src/app/shared/interfaces/products.interface";
import { CartService } from "../modules/cart/cart.service";
import { DeleteProducts, GetCart, SetCartLoading, SetProductLoading, UpdateProductQuantity } from "./cart.actions";

export interface CartStateModel {
    products: Product[];
    loading: boolean;
}

@State<CartStateModel>({
    name: 'cart',
    defaults: {
        products: [],
        loading: false
    }
})
@Injectable()
export class CartState {
    constructor(private cartSvc: CartService, private store: Store) {}

    @Selector()
    static getCart(state: CartStateModel) {
        return state;
    }

    @Action(SetCartLoading)
    setCartLoading({ getState, setState }: StateContext<CartStateModel>, { payload }: SetCartLoading) {
        const state = getState();
        setState({
            ...state,
            loading: payload
        });
    }

    @Action(GetCart)
    getCart({ getState, setState }: StateContext<CartStateModel>) {
        this.store.dispatch(new SetCartLoading(true));

        return this.cartSvc.getProducts().pipe(tap(result => {
            const state = getState();

            setState({
                ...state,
                products: result,
                loading: false
            });
        }))
    }

    @Action(SetProductLoading)
    setProductLoading({ getState, setState }: StateContext<CartStateModel>, { id, payload }: SetProductLoading) {
        const state = getState();
        const products = [...state.products];
        const productIndex = products.findIndex(product => product.id === id);

        products[productIndex] = {
            ...products[productIndex],
            loading: payload
        }
        
        setState({
            ...state,
            products
        })
    }

    @Action(UpdateProductQuantity)
    updateProductQuantity({ getState, setState }: StateContext<CartStateModel>, { id, quantity }: UpdateProductQuantity) {
        this.store.dispatch(new SetProductLoading(id, true));

        return this.cartSvc.updateQuantityByProductId(id, quantity).pipe(tap(() => {
            const state = getState();
            const products = [...state.products];
            const productIndex = products.findIndex(product => product.id === id);
            
            products[productIndex] = {
                ...products[productIndex],
                quantity: {
                    ...products[productIndex].quantity,
                    selected: quantity,
                },
                loading: false
            }

            setState({
                ...state,
                products
            });
        }));
    }

    @Action(DeleteProducts)
    deleteProducts({ getState, setState }: StateContext<CartStateModel>, { ids }: DeleteProducts) {
        this.store.dispatch(new SetCartLoading(true));

        return this.cartSvc.deleteProducts(ids)
            .pipe(tap(() => {
                const state = getState();
                const products = [...state.products].filter((p: Product) => ids.indexOf(p.id) < 0);

                setState({
                    ...state,
                    products,
                    loading: false
                });
            }));
    }
}