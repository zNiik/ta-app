import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderSummaryComponent } from './order-summary.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@NgModule({
  declarations: [OrderSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzSkeletonModule,
    NzEmptyModule
  ],
  exports: [OrderSummaryComponent]
})
export class OrderSummaryModule { }
