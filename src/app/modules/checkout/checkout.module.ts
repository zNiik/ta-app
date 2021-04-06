import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CheckoutGuard } from './guards/checkout.guard';
import { CheckoutService } from './services/checkout.service';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CustomFormsModule } from '../custom-forms.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { OrderSummaryModule } from '../order-summary/order-summary.module';
import { CheckoutComponent } from './checkout.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CardComponent } from './components/card/card.component';
import { NumberInputDirective } from './directives/number-input.directive';
import { CardInputDirective } from './directives/card-input.directive';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CheckoutComponent,
    AddressesComponent,
    PaymentComponent,
    CardComponent,
    NumberInputDirective,
    CardInputDirective,
    OrderReviewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CheckoutRoutingModule,
    CustomFormsModule,
    NzModalModule,
    NzStepsModule,
    NzResultModule,
    OrderSummaryModule,
    SharedModule
  ],
  providers: [
    CheckoutGuard,
    CheckoutService,
  ]
})
export class CheckoutModule { }
