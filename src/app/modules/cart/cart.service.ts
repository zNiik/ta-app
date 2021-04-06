import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/shared/interfaces/products.interface";

@Injectable()
export class CartService {
    constructor(private http: HttpClient) {}

    getProducts() {
       return this.http.get<Product[]>('/products');
    }

    deleteProducts(ids: number[]) {
        return this.http.request('DELETE', '/products', {
            body: { ids }
        });
    }

    updateQuantityByProductId(id: number, quantity: number) {
        return this.http.put<Product>(`/products/${id}`, { quantity });
    }
}