import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private afs: AngularFirestore) { }

  createRecipe(recipeList) {
    return this.afs.collection('recipe').add(Object.assign({}, recipeList));
  }

  getRecipe(id) {
    return this.afs.doc(`recipe/${id}`).valueChanges();
  }
}
