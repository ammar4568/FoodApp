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

  getUndispatchedOrders() {
    return this.afs.collection('orders', ref => ref.where('status', '==', '')).valueChanges();
  }

  getDispatchedOrders() {
    return this.afs.collection('orders', ref => ref.where('status', '==', 'dispatched')).valueChanges();
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

  getOrdersWithQuery(query) {
    return this.afs.collection('orders', ref => ref.where('barName', '==', query)).valueChanges();
  }


  getOrderId(orderId) {
    return this.afs.collection('orders', ref => ref.where('id', '==', orderId)).snapshotChanges();
  }

  dispatchOrder(orderId, order) {
    return this.afs.collection('orders').doc(orderId).update(order);
  }

  getUsersOrder(userId) {
    return this.afs.collection('orders', ref => ref.where('uid', '==', userId)).valueChanges();
  }

  deleteOrder(orderId) {
    return this.afs.collection('orders').doc(orderId).delete();
  }

  getRecipeId(orderId) {
    return this.afs.collection('orders').doc(orderId).valueChanges();
  }
}
