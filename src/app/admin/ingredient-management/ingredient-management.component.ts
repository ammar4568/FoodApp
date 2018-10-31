import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IngredientService } from '../ingredient.service';
import { CategoryService } from '../category.service';

import { Category } from '../../models/category';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-ingredient-management',
  templateUrl: './ingredient-management.component.html',
  styleUrls: ['./ingredient-management.component.css']
})
export class IngredientManagementComponent implements OnInit {

  ingredientForm: FormGroup;
  categoryForm: FormGroup;
  categories;
  loadingCategory = true;
  loadingIngredient = false;

  constructor(private fb: FormBuilder,
    private ingredientService: IngredientService,
    private categoryService: CategoryService) {
    this.ingredientForm = this.fb.group({
      name: '',
      servingSize: '',
      portionSize: '',
      portionFlag: '',
      calories: '',
      carbCalorie: '',
      fatCalorie: '',
      proteinCalorie: '',
      rda: '',
      bitternessFlat: '',
      category: ''
    });

    this.categoryForm = this.fb.group({
      name: ''
    });

    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
  }

  addIngredient() {
    this.loadingIngredient = true;
    this.ingredientService.addIngredient(this.ingredientForm.value)
      .then((response) => {
        console.log(response);
        this.loadingIngredient = false;
      })
      .catch((err) => {
        console.log(err);
        this.loadingIngredient = false;
      });
  }

  addCategory() {
    this.loadingCategory = true;
    this.categoryService.addCategory(this.categoryForm.value)
      .then((response) => {
        this.loadingCategory = false;
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        this.loadingCategory = false;
      });
  }
}
