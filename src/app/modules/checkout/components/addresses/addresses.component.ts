import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, phoneValidator } from 'src/app/core/validators';

@Component({
  selector: 'nmo-addresses',
  templateUrl: './addresses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const {
      email = null,
      phone = null,
      street = null,
      building = null,
      city = null,
      area = null,
      landmark = null
    } = localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address') as string) : {};

    this.form = this.fb.group({
      email: [email, [Validators.required, emailValidator()]],
      phone: [phone, [Validators.required, phoneValidator()]],
      street: [street, [Validators.required]],
      building: [building, [Validators.required]],
      city: [city, [Validators.required]],
      area: [area, [Validators.required]],
      landmark: [landmark]
    })
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.form.valid) {
      localStorage.setItem('address', JSON.stringify(this.form.value));
      this.router.navigate(['/checkout'], { queryParams: { step: 2 }});
    }
  }
}
