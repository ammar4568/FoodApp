import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userId;
  userEmail;
  checkoutId = 'https://stripe-checkout-token.herokuapp.com/stripe';

  constructor(private auth: AuthService,
    private af: AngularFirestore,
    public http: HttpClient) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userEmail = user.email;
      }
    });
  }


  processPayment(token: any, amount, orderId) {
    const body = { token: token.id, amount: amount, orderId: orderId, email: this.userEmail };
    return this.http.post(this.checkoutId, body);
  }

  addPayment(token: any, amount, orderId, status, charge) {
    if (status === 'unpaid') {
      const payment = {
        token, amount, uid: this.userId, status: 'unpaid'
      };
      return this.af.doc(`payments/${orderId}`).set(payment);
    } else {
      const payment = {
        token, amount, uid: this.userId, status: 'paid', charge: charge
      };
      return this.af.doc(`payments/${orderId}`).set(payment);
    }
  }

  getPaymentStatus(orderId) {
    return this.af.doc(`payments/${orderId}`).valueChanges();
  }
}
