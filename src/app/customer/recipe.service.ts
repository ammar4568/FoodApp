import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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

  getRecipes() {
    return this.afs.collection('recipe').snapshotChanges();
  }

  getRecipesDoc() {
    return this.afs.collection('recipe').snapshotChanges().pipe(
      map(x => x.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  deleteRecipe(recipeId) {
    return this.afs.collection('recipe').doc(recipeId).delete();
  }
}
