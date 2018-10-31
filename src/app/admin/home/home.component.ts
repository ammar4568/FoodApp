import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IngredientService } from '../ingredient.service';
import { CategoryService } from '../category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ingredientForm: FormGroup;
  categoryForm: FormGroup;
  categories;
  ingredients;
  loadingCategory = false;
  loadingIngredient = false;
  edit = false;
  ingredientToEdit;

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
    this.ingredients = this.ingredientService.getIngredients();
    /* this.categoryService.getCategories().subscribe((res) =>
      console.log(res)); */
  }

  ngOnInit() {
  }

  addIngredient() {
    if (this.edit) {
      this.updateIngredient();
    } else {
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
      item.map(i => {
        const id = i.payload.doc.id;

        this.ingredientService.editIngredient(id, this.ingredientForm.value);
        /* .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        }); */
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

}
