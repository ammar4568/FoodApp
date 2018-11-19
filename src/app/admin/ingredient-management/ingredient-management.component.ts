import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IngredientService } from '../ingredient.service';
import { CategoryService } from '../category.service';

import { Category } from '../../models/category';
import { Ingredient } from '../../models/ingredient';

declare var $: any;


@Component({
  selector: 'app-ingredient-management',
  templateUrl: './ingredient-management.component.html',
  styleUrls: ['./ingredient-management.component.css']
})
export class IngredientManagementComponent implements OnInit {

  ingredientForm: FormGroup;
  categoryForm: FormGroup;
  categories;
  ingredients;
  loadingCategory = false;
  loadingIngredient = false;
  edit = false;
  ingredientToEdit;
  ingredientToDelete;
  ingredientStartIndex;
  ingredientLimit;

  constructor(private fb: FormBuilder,
    private ingredientService: IngredientService,
    private categoryService: CategoryService) {

    this.ingredientStartIndex = 0;
    this.ingredientLimit = 5;

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
    this.ingredients = this.ingredientService.getIngredients(this.ingredientStartIndex, this.ingredientLimit);

  }

  ngOnInit() {
  }

  addIngredient() {
    if (this.edit) {
      this.updateIngredient();
    } else {
      this.loadingIngredient = true;
      // TODO: For testing remove afterwards
      // this.ingredientForm = this.fb.group({
      //   name: 'Test',
      //   servingSize: 10,
      //   portionSize: 1,
      //   portionFlag: '',
      //   calories: 100,
      //   carbCalorie: 30,
      //   fatCalorie: 50,
      //   proteinCalorie: 20,
      //   rda: '',
      //   bitternessFlat: '',
      //   category: 'Test Category'
      // });
      this.ingredientService.addIngredient(this.ingredientForm.value)
        .then((response) => {
          // console.log(response);
          this.loadingIngredient = false;
          $('#ingredientModal').modal('hide');
        })
        .catch((err) => {
          console.log(err);
          this.loadingIngredient = false;
          $('#ingredientModal').modal('hide');
        });
    }
  }

  addCategory() {
    this.loadingCategory = true;
    this.categoryService.addCategory(this.categoryForm.value)
      .then((response) => {
        this.loadingCategory = false;
        $('#categoryModal').modal('hide');
        // console.log(response);
      })
      .catch((err) => {
        this.loadingCategory = false;
        $('#categoryModal').modal('hide');
        // console.log(err);
      });
  }

  /* addIngredient() {
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
  } */

  editIngredient(ingredient) {
    this.ingredientForm = this.fb.group(ingredient);
    // console.log(ingredient);
    this.edit = true;
    this.ingredientToEdit = ingredient.name;
    /* this.ingredientService.getIngredient(ingredient.name).subscribe((item) => {
          console.log(item);
        }); */
  }

  updateIngredient() {
    this.ingredientService.getIngredient(this.ingredientToEdit).subscribe(item => {
      // console.log(item);
      item.map(i => {
        const id = i.payload.doc.id;
        this.ingredientService.editIngredient(id, this.ingredientForm.value)
          .then((res) => {
            // console.log(res + ' then');
            $('#ingredientModal').modal('hide');
          })
          .catch((err) => {
            // console.log(err + ' catch');
            $('#ingredientModal').modal('hide');
          });
      });
    });
  }


  add() {
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
    this.edit = false;
  }

  deleteIngredient(ingredient) {
    this.ingredientToDelete = ingredient.name;
  }

  delete() {
    this.ingredientService.getIngredient(this.ingredientToDelete).subscribe(item => {
      item.map(i => {
        const id = i.payload.doc.id;
        console.log(this.ingredientService.deleteIngredient(id));
      });
    });
  }
}
