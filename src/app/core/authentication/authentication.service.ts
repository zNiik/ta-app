import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from './user.service';

export interface LoginContext {
  username: string;
  password: string;
}

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private cookieSvc: CookieService, private userSvc: UserService) { }

  login(context: LoginContext) {
    return this.http.post('/auth', context)
      .pipe(map((data: any) => {
        this.cookieSvc.set('token', data.token);
        return data;
      }))
  }

  logout() {
    this.userSvc.setUser(null);
    this.cookieSvc.delete('token');
    return of(true);
  }

  isAuthenticated() {
    const token = this.cookieSvc.get('token');
    const isAuthenticated = token === 'fake-jwt-token';

    if (!this.userSvc.getUser() && isAuthenticated) {
      this.userSvc.setUser(JSON.parse(localStorage.getItem('users') as string)[0]);
    }

    return isAuthenticated;
  }
}
