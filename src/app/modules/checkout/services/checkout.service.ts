import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrderDetail } from "src/app/shared/interfaces/order-detail.interface";

@Injectable()
export class CheckoutService {
    baseUrl = 'https://orderdetails.free.beeceptor.com';

    constructor(private http: HttpClient) {}

    placeOrder(orderDetail: OrderDetail) {
        return this.http.post(this.baseUrl, { orderDetail });
    }
}