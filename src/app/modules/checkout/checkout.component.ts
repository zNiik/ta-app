import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDirectionType } from 'ng-zorro-antd/steps';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointService } from 'src/app/core/services/breakpoint.service';
import { AddressesComponent } from './components/addresses/addresses.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { PaymentComponent } from './components/payment/payment.component';

@Component({
  selector: 'nmo-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit {
  stepDirection!: NzDirectionType;
  stepIndex!: number;

  factory!: ComponentFactory<any>;
  componentRef!: ComponentRef<any>;
  
  @ViewChild('stepContent', { read: ViewContainerRef }) stepContent!: ViewContainerRef;
  @ViewChild('modalFooter') modalFooter!: TemplateRef<any>;

  orderId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef, 
    private breakpointSvs: BreakpointService,
    private cfr: ComponentFactoryResolver,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.breakpointSvs.screenSizeObserver.subscribe((state: Breakpoints[]) => {
      if (state.indexOf(Breakpoints.MD) > -1) {
        this.stepDirection = 'horizontal';
      } else {
        this.stepDirection = 'vertical';
      }
      this.cd.detectChanges();
    });

    this.route.queryParams.subscribe(params => {
      const { step, orderId } = params;

      this.orderId = null;
      this.cd.detectChanges();

      if (step) {
        this.stepIndex = +step - 1;

        if (this.stepContent) {
          this.changeContent();
        }
      }

      if (orderId) {
        const storageOrderId = localStorage.getItem('orderId') || null;
        if (storageOrderId) {
          this.orderId = orderId;
          
          localStorage.removeItem('orderId');
          localStorage.removeItem('address');
          localStorage.removeItem('card'); 

          of(true)
            .pipe(delay(5000))
            .pipe(tap(() => {
              this.modal.create({
                nzContent: 'Do you want to continue shopping?',
                nzFooter: this.modalFooter,
                nzMaskClosable: false,
              })
            })).subscribe();
        }
      }

      this.cd.detectChanges();
    });
  }

  closeModal() {
    this.modal.closeAll();
  }

  goToCart() {
    this.closeModal();
    this.router.navigate(['/cart']);
  }

  onIndexChange(index: number) {
    this.router.navigate(['/checkout'], { queryParams: { step: index + 1 }});
    this.changeContent();
  }

  changeContent() {
    this.stepContent.clear();
    
    switch (this.stepIndex) {
      case 1:
        this.factory = this.cfr.resolveComponentFactory(PaymentComponent);
        break;
      case 2:
        this.factory = this.cfr.resolveComponentFactory(OrderReviewComponent);
        break;
      default:
        this.factory = this.cfr.resolveComponentFactory(AddressesComponent)
    }

    this.componentRef = this.stepContent.createComponent(this.factory);
  }
}
