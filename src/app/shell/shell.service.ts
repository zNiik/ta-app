import { Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { ShellComponent } from './shell.component';

@Injectable()
export class ShellService {
  constructor() { }

  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard]
    };
  }
}
