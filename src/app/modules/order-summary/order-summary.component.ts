import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { CartState, CartStateModel } from '../../redux/cart.state';

@Component({
  selector: 'nmo-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent implements OnInit {
  @Select(CartState.getCart) cart!: Observable<CartStateModel>;
  subTotal!: number;
  deliveryCharge = 20;
  currPage!: string;
  products: Product[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.cart.subscribe(({ products }) => {
      if (products.length) {
        this.products = products;
        this.getSubtotal();
      }
    });

    this.currPage = this.router.url.replace('/', '').split('?')[0];
  }

  getSubtotal() {
    this.subTotal = 0;

    this.products.forEach(product => {
      const { price: { discount, value }, quantity: { selected, min } } = product;
      this.subTotal += (discount ? discount : value) * (selected ? selected : min);
    });
  }

  getTotalPrice() {
    return this.subTotal + this.deliveryCharge;
  }
}
