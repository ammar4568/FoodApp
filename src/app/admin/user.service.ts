import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  x: Subscription;
  constructor(private afs: AngularFirestore) { }

  getUsers() {
    return this.afs.collection('users').valueChanges();
  }

  getCustomers() {
    return this.afs.collection('users', ref => ref.where('isAdmin', '==', false)).valueChanges();
  }

  getStaff() {
    return this.afs.collection('users', ref => ref.where('isAdmin', '==', true)).valueChanges();
  }

  changeType(user, isAdmin) {
    if (isAdmin) {
      this.x = this.getUser(user).subscribe(item => {
        item.map(i => {
          console.log(i.payload.doc.data(), 'IsAdmin');
          const id = i.payload.doc.id;
          user.isAdmin = true;
          this.afs.doc(`users/${id}`).set(user);
          this.x.unsubscribe();
        });
      });
    } else {
      this.x = this.getUser(user).subscribe(item => {
        item.map(i => {
          console.log(i.payload.doc.data(), 'NotIsAdmin');
          const id = i.payload.doc.id;
          user.isAdmin = false;
          this.afs.doc(`users/${id}`).set(user);
          this.x.unsubscribe();
        });
      });
    }
  }

  getUser(user) {
    return this.afs.collection('users', ref => ref.where('uid', '==', user.uid)).snapshotChanges();
  }
}
