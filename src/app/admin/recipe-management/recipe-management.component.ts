import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../customer/recipe.service';

@Component({
  selector: 'app-recipe-management',
  templateUrl: './recipe-management.component.html',
  styleUrls: ['./recipe-management.component.css']
})
export class RecipeManagementComponent implements OnInit {

  recipes;

  constructor(private recipeService: RecipeService) {
    recipeService.getRecipes().subscribe(recipe => {
      // this.recipes = Object.assign([], recipe);
      // console.log(this.recipes);
    });

    recipeService.getRecipesDoc().subscribe(recipe => {
      // console.log(recipe);
      this.recipes = Object.assign([], recipe);

    });
    // recipeService.getRecipesDoc().subscribe(recipe => {
    //   this.recipes = Object.assign([], recipe.)
    // })
  }

  ngOnInit() {
  }

  getRecipe(recipe) {
    const r = Object.assign([], recipe);
    console.log(recipe.id);
    return r.map(i => {
      return i;
    });
  }

}
