import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userId;

  constructor(private auth: AuthService,
    private af: AngularFirestore) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }


  processPayment(token: any, amount, orderId) {
    const payment = {
      token, amount, uid: this.userId
    };
    return this.af.doc(`payments/${orderId}`).set(payment);
  }
}
