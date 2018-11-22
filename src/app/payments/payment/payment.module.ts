import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from '../payment.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
