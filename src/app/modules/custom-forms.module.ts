import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxMaskModule } from 'ngx-mask'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
    imports: [
        NgxMaskModule.forRoot(),
    ],
    exports: [
        NgxMaskModule,
        ReactiveFormsModule,
        NzFormModule,
        NzButtonModule,
        NzCheckboxModule,
        NzInputModule,
        NzSelectModule
    ]
})
export class CustomFormsModule { }