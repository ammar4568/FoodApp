import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private afs: AngularFirestore) { }

  async addIngredient(formValue) {
    return this.afs.collection('ingredients').add(formValue);
  }

  /* getIngredients() {
    return this.afs.collection('ingredients').valueChanges();
    // return this.afs.collection('ingredients', ref => ref.limit(5)).valueChanges();
    // return this.afs.collection('ingredients', ref => ref.startAt(ref)).valueChanges();
  } */

  getIngredients(startIndex, resultLimit) {
    // return this.afs.collection('ingredients', ref => ref.limit(5)).valueChanges();
    return this.afs
      .collection('ingredients', ref => ref.orderBy('name')).valueChanges();
  }

  getAllIngredients() {
    return this.afs.collection('ingredients').valueChanges();
  }



  getIngredient(name) {
    return this.afs.collection('ingredients', ref => ref.where('name', '==', name)).snapshotChanges();
  }

  async editIngredient(id, values) {
    this.afs.doc(`ingredients/${id}`)
      .update(values).then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async deleteIngredient(id) {
    this.afs.doc(`ingredients/${id}`)
      .delete()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  getIngredientByCategory(name) {
    return this.afs.collection('ingredients', ref => ref.where('category', '==', name)).valueChanges();
  }
}
