import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class CheckoutGuard implements CanActivate {
    constructor(private router: Router, private route: ActivatedRoute) { }

    navigateToStepOne() {
        this.router.navigate(['/checkout'], { queryParams: { step: 1 }, relativeTo: this.route });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const { step, orderId } = route.queryParams;
        const address = localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address') as string) : null;
        const card = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card') as string) : null;
        const products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products') as string) : null;

        if (products.length > 0) {
            if (!step && !orderId) {
                this.navigateToStepOne();
            } else if (step) {
                switch (step) {
                    case '2':
                        if (!address) this.navigateToStepOne();
                        break;
                    case '3':
                        if (!address && !card) {
                            this.navigateToStepOne();
                        } else if (address && !card) {
                            this.router.navigate(['/checkout'], { queryParams: { step: 2 }, relativeTo: this.route })
                        }
                        break;
                }
            } else if (orderId) {
                if (!localStorage.getItem('orderId')) {
                    this.navigateToStepOne();
                }
            }
        } else {
            this.router.navigate(['/cart']);
        }

        return true;
    }
}