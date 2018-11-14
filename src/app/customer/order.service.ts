import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderSource = new BehaviorSubject('');
  private contactSource = new BehaviorSubject('');
  currentOrderList = this.orderSource.asObservable();
  currentOrderContact = this.contactSource.asObservable();

  constructor(private afs: AngularFirestore) { }

  /*  async placeOrder(list) {
     return this.afs.collection('orders').add(Object.assign({}, list));
   } */

  getOrders() {
    return this.afs.collection('orders').valueChanges();
  }

  addCustomerDetails(customerInfo) {
    return this.afs.collection('orders').add(customerInfo);
  }

  setRecipeList(recipe) {
    this.orderSource.next(recipe);
  }

  setOrderContact(contactInfo) {
    this.contactSource.next(contactInfo);
  }
}
