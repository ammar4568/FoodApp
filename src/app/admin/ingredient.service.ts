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

  getIngredients() {
    return this.afs.collection('ingredients').valueChanges();
  }

  getIngredient(name) {
    // return this.afs.collection('ingredients', ref => ref.where('name', '==', name)).valueChanges();
    // return this.afs.doc('ingredients').valueChanges();
    /*
        this.shirtCollection = afs.collection<Shirt>('shirts');
        // .snapshotChanges() returns a DocumentChangeAction[], which contains
        // a lot of information about "what happened" with each change. If you want to
        // get the data and the id use the map operator.
        this.shirts = this.shirtCollection.snapshotChanges().map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Shirt;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
     */
    return this.afs.collection('ingredients', ref => ref.where('name', '==', name)).snapshotChanges();
  }

  async editIngredient(name, values) {
    this.afs.doc(`ingredients/${name}`)
      .update(values).then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    /* .then((res) => {
    return res;
  })
    .catch((err) => {
      return err;
    }); */
  }
}
