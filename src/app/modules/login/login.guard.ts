import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication/authentication.service";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private router: Router, private authSvc: AuthenticationService) { }

    canActivate(): boolean {
        if (this.authSvc.isAuthenticated()) {
            this.router.navigateByUrl('/cart');
            return false;
        }

        return true;
    }
}