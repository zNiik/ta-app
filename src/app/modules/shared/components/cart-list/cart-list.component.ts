import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteProducts, GetCart, UpdateProductQuantity } from 'src/app/redux/cart.actions';
import { CartState, CartStateModel } from 'src/app/redux/cart.state';
import { Product } from 'src/app/shared/interfaces/products.interface';
import mockProducts from '../../../../core/interceptors/mocks/products.json';

@Component({
  selector: 'nmo-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent implements OnInit {
  @Select(CartState.getCart) cart!: Observable<CartStateModel>;
  @Input() withActions: boolean = true;
  
  allChecked = false;
  indeterminate = false;
  checkboxes: boolean[] = [];
  products: Product[] = [];

  constructor(private store: Store, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.cart.subscribe(cart => {
      if (cart.products.length > 0) {
        this.checkboxes = new Array(cart.products.length).fill(false);
        this.products = cart.products;
      } else {
        this.allChecked = false;
        this.indeterminate = false;
      }
    });
  }

  onQuantityChange(productId: number, quantity: number) {
    this.store.dispatch(new UpdateProductQuantity(productId, quantity));
  }

  resetProducts() {
    localStorage.setItem('products', JSON.stringify(mockProducts));
    this.store.dispatch(new GetCart());
  }

  removeProduct(productId: number) {
    this.store.dispatch(new DeleteProducts([productId]));
  }

  removeSelectedProducts() {
    const productIds = this.products.filter((_p, i) => this.checkboxes[i]).map(p => p.id);
    this.store.dispatch(new DeleteProducts(productIds));
  }

  updateAllChecked() {
    this.indeterminate = false;
    this.checkboxes = this.checkboxes.map(() => {
      return this.allChecked ? true : false;
    });
  }

  updateSingleChecked() {
    if (this.checkboxes.every(b => !b)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkboxes.every(b => b)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
}
