import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CustomFormsModule } from '../custom-forms.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    LoginRoutingModule,
    NzLayoutModule,
    NzMessageModule,
  ]
})
export class LoginModule { }
