import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../admin/ingredient.service';
import { CategoryService } from '../../admin/category.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  categories;
  ingredients;
  currentCategory;
  currentIngredients;
  ingredientOrderList: any[] = [];

  constructor(private ingredientService: IngredientService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private router: Router) {
    this.categories = this.categoryService.getCategories();
    this.categoryService.getCategories().subscribe(item => {
      item.slice(0, 1).map(i => {
        this.currentCategory = i;
        this.currentIngredients = this.ingredientService.getIngredientByCategory(this.currentCategory.name);
      });
    });
    this.ingredients = this.ingredientService.getAllIngredients();
  }

  ngOnInit() {
  }

  changeCategory(category) {
    this.currentCategory = category;
    this.currentIngredients = this.ingredientService.getIngredientByCategory(this.currentCategory.name);
  }

  addToList(event, ingredient) {
    ingredient.quantity = 1;
    if (event.target.checked) {
      this.ingredientOrderList.push(ingredient);
    } else {
      this.ingredientOrderList = this.ingredientOrderList.filter(i => {
        return (i.name !== ingredient.name);
      });
    }
  }

  changeQuantity(ingredient, action) {
    if (action === 'minus') {
      if (ingredient.quantity > 1) {
        ingredient.quantity--;
      }
    } else if (action === 'plus') {
      ingredient.quantity++;
    }
  }

  removeItem(item) {
    this.ingredientOrderList = this.ingredientOrderList.filter(i => {
      return (i.name !== item.name);
    });
  }

  placeOrder() {
    if (this.ingredientOrderList.length === 0) {
      return;
    }
    // console.log('Place');
    this.orderService.setRecipeList(this.ingredientOrderList);
    this.router.navigate(['cart']);

    /* this.orderService.placeOrder(this.ingredientOrderList)
      .then((res) => {
        // console.log(res);
        alert('Placed \nOrder Id:  ' + res.id);
      })
      .catch(err => {
        console.log(err);
      }); */
  }


}
