import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CartState, CartStateModel } from 'src/app/redux/cart.state';
import { UserService } from 'src/app/core/authentication/user.service';
import { CheckoutService } from '../../services/checkout.service';
import { Address } from 'src/app/shared/interfaces/address.interface';
import { Card } from 'src/app/shared/interfaces/card.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { OrderDetail } from 'src/app/shared/interfaces/order-detail.interface';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'nmo-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReviewComponent implements OnInit {
  @Select(CartState.getCart) cart!: Observable<CartStateModel>;
  address: Address = localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address') as string) : {};
  card: Card = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card') as string) : {};
  products: Product[] = [];
  user!: User;
  loading: boolean = false;

  constructor(private userSvc: UserService, private router: Router, private checkoutSvc: CheckoutService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = this.userSvc.getUser();

    this.cart.subscribe(cart => {
      this.products = cart.products;
    })
  }

  maskCard(cardNumber: number) {
    return cardNumber.toString().replace(/\s/g,'').replace(/\d(?=\d{4})/g, "*").match(/.{1,4}/g)?.join(' ');
  }

  back() {
    this.router.navigate(['/checkout'], { queryParams: { step: 2 } } );
  }

  placeOrder() {
    this.loading = true;

    const orderDetail: OrderDetail = {
      user: {
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username
      },
      products: this.products,
      card: this.card
    }
    
    this.checkoutSvc.placeOrder(orderDetail)
      .pipe(finalize(() => {
        this.loading = false;
        this.cd.detectChanges();
      }))
      .subscribe((data: any) => {
        localStorage.setItem('orderId', data.order_id);
        this.router.navigate(['/checkout'], { queryParams: { orderId: data.order_id } } );
      });
  }
}
