import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { QuantitySelectComponent } from './components/quantity-select/quantity-select.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { FormsModule } from '@angular/forms';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    QuantitySelectComponent,
    CartListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzSkeletonModule,
    NzCheckboxModule,
    NzSelectModule,
    NzEmptyModule,
    NzButtonModule,
  ],
  exports: [
    QuantitySelectComponent,
    CartListComponent,
  ],
  providers: [
    DecimalPipe
  ]
})
export class SharedModule { }
