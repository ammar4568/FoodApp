import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../admin/ingredient.service';
import { CategoryService } from '../../admin/category.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { RecipeService } from 'src/app/customer/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  type;
  categories;
  ingredients;
  recipes;
  orders;
  currentCategory;
  currentIngredients;
  currentRecipes;
  ingredientOrderList: any[] = [];

  constructor(private ingredientService: IngredientService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private router: Router,
    public recipeService: RecipeService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const param = Object.assign({}, params);
      if (param.display) {
        this.type = 'bar';
        this.orderService.getOrders().subscribe(item => {
          item.slice(0, 1).map((i: any) => {
            this.currentCategory = i.barName;
            this.recipeService.getRecipe(i.id).subscribe((item1) => {
              const itemArr = Object.assign([], item1);
              this.currentRecipes = itemArr;
            });
          });
        });
      } else {
        this.type = 'cat';
        this.categoryService.getCategories().subscribe(item => {
          item.slice(0, 1).map((i: any) => {
            this.currentCategory = i.name;
            this.currentIngredients = this.ingredientService.getIngredientByCategory(this.currentCategory);
          });
        });
      }
    });
    this.categories = this.categoryService.getCategories();

    // this.ingredients = this.ingredientService.getAllIngredients();
    this.orders = this.orderService.getOrders();

  }

  ngOnInit() {
  }

  changeCategory(category) {
    this.type = 'cat';
    this.currentCategory = category.name;
    this.currentIngredients = this.ingredientService.getIngredientByCategory(this.currentCategory);
  }

  changeBar(order) {
    this.type = 'bar';
    this.currentCategory = order.barName;
    this.recipeService.getRecipe(order.id).subscribe((item) => {
      const itemArr = Object.assign([], item);
      this.currentRecipes = itemArr;
    });
  }


  check(ingredient) {
    let isPresent = false;
    this.ingredientOrderList.filter(i => {
      if (i.name === ingredient.name) {
        isPresent = true;
      }
    });
    return isPresent;
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
        if (ingredient.quantity < 7) {
          ingredient.plus = false;
        }
      }
    } else if (action === 'plus') {
      ingredient.quantity++;
      if (ingredient.quantity === 7) {

        const swalWithBootstrapButtons = swal.mixin({
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
        });

        swalWithBootstrapButtons({
          title: 'Bitterness level reached?',
          text: 'Adding more of this ingredient can make the bar bitter',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, dont\'t add more!',
          cancelButtonText: 'Ignore!',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            ingredient.plus = true;
          } else if (result.dismiss === swal.DismissReason.cancel) {

          }
        });
      }
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
    this.orderService.setRecipeList(this.ingredientOrderList);
    this.router.navigate(['cart']);
  }


}
