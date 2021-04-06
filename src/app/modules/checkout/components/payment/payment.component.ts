import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cardExpiryDateValidator, cardNumberValidator } from 'src/app/core/validators';
import { Card } from 'src/app/shared/interfaces/card.interface';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'nmo-payment',
  templateUrl: './payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  cardValue!: Card;
  @ViewChild('card') card!: CardComponent;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    localStorage.removeItem('card');
    
    this.form = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      number: this.fb.control(null, [Validators.required, cardNumberValidator()]),
      expiry: this.fb.control(null, [Validators.required, cardExpiryDateValidator()]),
      cvv: this.fb.control(null, [Validators.required])
    });
  }

  ngAfterViewInit() {
    this.form.addControl('type', this.card.form.get('type') as FormControl);
  }

  back() {
    this.router.navigate(['/checkout'], { queryParams: { step: 1 } });
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.form.valid) {
      localStorage.setItem('card', JSON.stringify(this.form.value));
      this.router.navigate(['/checkout'], { queryParams: { step: 3 }});
    }
  }
}
