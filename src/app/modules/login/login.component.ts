import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'nmo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private authSvc: AuthenticationService, 
    private route: ActivatedRoute, 
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.form.valid) {
      this.loading = true;
      this.form.disable();

      const { username, password } = this.form.controls;

      this.authSvc.login({ username: username.value, password: password.value })
        .pipe(
          first(),
          finalize(() => {
            this.loading = false;
            this.form.enable();
          }),
        )
        .subscribe(
          () => {
            this.router.navigateByUrl(this.route.snapshot.queryParams.redirect ?? '/cart');
          },
          (err) => {
            this.message.error(err.message);
          }
        );
    }
  }
}
