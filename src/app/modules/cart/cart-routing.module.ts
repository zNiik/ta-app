import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellService } from 'src/app/shell/shell.service';
import { CartComponent } from './cart.component';

const routes: Routes = [
  ShellService.childRoutes([
    { path: '', component: CartComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
