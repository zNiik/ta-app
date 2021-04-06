import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nmo-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
}
