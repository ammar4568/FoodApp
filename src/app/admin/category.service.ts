import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore) { }

  async addCategory(formValue) {
    return this.afs.collection('categories').add(formValue);
  }

  getCategories() {
    return this.afs.collection('categories').valueChanges();
    // return this.afs.collection('categories', ref => ref.where('name', '==', 'Bulk')).valueChanges();
  }

  getCategory(name) {
    return this.afs.collection('categories', ref => ref.where('name', '==', name)).valueChanges();
  }
}
