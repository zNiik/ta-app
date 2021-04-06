import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { fakeBackendProvider } from './interceptors/fake-backend.interceptor';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UserService } from './authentication/user.service';
import { BreakpointService } from './services/breakpoint.service';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AccessDirective } from '../shared/directives/access.directive';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import en from '@angular/common/locales/en';
registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  message: { nzMaxStack: 1 }
};

@NgModule({
  declarations: [
    HeaderComponent,
    AccessDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    NzLayoutModule,
    NzDropDownModule,
    NzButtonModule,
  ],
  exports: [
    NzLayoutModule,
    HeaderComponent,
    AccessDirective,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    fakeBackendProvider,
    AuthenticationService,
    AuthenticationGuard,
    UserService,
    BreakpointService,
  ],
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import core module in the AppModule only.`);
    }
  }
}
