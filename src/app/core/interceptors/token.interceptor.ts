import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor (private cookieSvc: CookieService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = this.cookieSvc.get('token');

        const modifiedReq = req.clone({ 
            headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });

        return next.handle(modifiedReq);
    }
}