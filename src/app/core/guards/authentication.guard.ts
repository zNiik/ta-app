import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router, private route: ActivatedRoute, private authSvc: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authSvc.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
        return false;
    }
}