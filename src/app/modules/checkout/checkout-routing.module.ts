import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellService } from 'src/app/shell/shell.service';
import { CheckoutComponent } from './checkout.component';
import { CheckoutGuard } from './guards/checkout.guard';

const routes: Routes = [
  ShellService.childRoutes([
    { path: '', component: CheckoutComponent, canActivate: [CheckoutGuard], runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
