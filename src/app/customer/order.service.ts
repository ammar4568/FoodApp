import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { merge, map } from 'rxjs/operators';

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

  getPublishedOrders() {
    return this.afs.collection('orders', ref => ref.where('privacy', '==', 'publish')).valueChanges();
  }

  getFirstLimitedPublishedOrders() {
    const first = this.afs.collection('orders', ref => ref.where('privacy', '==', 'publish').limit(2));
    // .orderBy('population')
    // .limit(25);
    first.get().subscribe(item => {
      const lastVisible = item.docs[item.docs.length - 1];
      item.docs.map(i => {
        console.log('i', i.data());
      });
      const next = this.afs.collection('orders', ref => ref.where('privacy', '==', 'publish')
        .startAfter(lastVisible).limit(2));

      next.get().subscribe(item2 => {
        item2.docs.map(i2 => {
          console.log('i2', i2.data());
        });
      });
    });
    // return this.afs.collection('orders', ref => ref.where('privacy', '==', 'publish').limit(2)).valueChanges();
  }

  getLimitedPublishedOrders(data) {
    return this.afs.collection('orders', ref => ref.where('privacy', '==', 'publish').limit(2)).valueChanges();
  }

  getUndispatchedOrders() {
    return this.afs.collection('orders', ref => ref.where('status', '==', '')).valueChanges();
  }

  getUndispatchedOrdersSnap() {
    return this.afs.collection('orders', ref => ref.where('status', '==', '')).snapshotChanges();
  }

  getDispatchedOrders() {
    return this.afs.collection('orders', ref => ref.where('status', '==', 'dispatched')).valueChanges();
  }

  getDispatchedOrdersSnap() {
    return this.afs.collection('orders', ref => ref.where('status', '==', 'dispatched')).snapshotChanges();
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


  getOrderId(id) {
    return this.afs.collection('orders', ref => ref.where('id', '==', id)).snapshotChanges();
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

  makeOrderPrivate(orderId) {
    return this.afs.collection('orders').doc(orderId).set({ 'privacy': 'private' }, { merge: true });
  }

  getRecipeId(orderId) {
    return this.afs.collection('orders').doc(orderId).valueChanges();
  }

  changePaymentStatus(orderId, paymentStatus) {
    return this.afs.collection('orders').doc(orderId).set({ 'paymentStatus': paymentStatus }, { merge: true });
  }
}
