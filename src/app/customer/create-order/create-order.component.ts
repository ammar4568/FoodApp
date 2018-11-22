import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../admin/ingredient.service';
import { CategoryService } from '../../admin/category.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { RecipeService } from 'src/app/customer/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
declare var $: any;

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
  barWeight = 0;
  bulkWeight = 0;
  bulkIngredients: any[] = [];
  notLoggedIn;


  constructor(private ingredientService: IngredientService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private router: Router,
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private auth: AuthService) {

    this.auth.user.subscribe(user => {
      if (!user) {
        this.notLoggedIn = true;
        $('#loginModal').modal('show');
      } else {
        $('#loginModal').modal('hide');
      }
    });

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
    this.ingredientService.getBulkIngredients().subscribe(ingredients => {
      ingredients.map((ingredient: any) => {
        this.bulkIngredients.push(ingredient);
        // this.bulkIngredients.push(ingredient.name);
        // console.log(ingredient.name);
      });
    });
    // this.ingredients = this.ingredientService.getAllIngredients();
    this.orders = this.orderService.getOrders();
  }

  ngOnInit() {
  }

  changeCategory(category) {
    if (this.type === 'bar') {
      this.ingredientOrderList = [];
      this.barWeight = 0;
      this.bulkWeight = 0;
    }
    this.type = 'cat';
    this.currentCategory = category.name;
    this.currentIngredients = this.ingredientService.getIngredientByCategory(this.currentCategory);
  }

  changeBar(order) {
    this.ingredientOrderList = [];
    this.type = 'bar';
    this.barWeight = 0;
    this.bulkWeight = 0;
    this.currentCategory = order.barName;
    this.recipeService.getRecipe(order.id).subscribe((item) => {
      const itemArr = Object.assign([], item);
      this.currentRecipes = itemArr;
      itemArr.map(i => {
        this.ingredientOrderList.push(i);
        // console.log(i);
        if (this.checkBulk(i.name)) {
          this.bulkWeight += (i.portionSize * i.quantity);
          this.barWeight += (i.portionSize * i.quantity);
        } else {
          this.barWeight += (i.portionSize * i.quantity);

        }
      });
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

  getId(ingredientName) {
    return 'check' + ingredientName.replace(/\s/g, '');
  }

  addToList(event, ingredient) {
    if (event.target.checked) {
      ingredient.quantity = 1;
      if ((this.barWeight + ingredient.portionSize) > 70) {
        swal({
          type: 'error',
          text: 'Bar weight cannot be greater than 70gm'
        });
        const name = ingredient.name.replace(/\s/g, '');
        const x = <HTMLInputElement>document.getElementById(`check${name}`);
        x.checked = false;
        // $(`#check${ingredient.name}`).attr('checked', false);
        return;
      } else if (this.checkBulk(ingredient.name)) {
        this.bulkWeight += ingredient.portionSize;
        this.barWeight += ingredient.portionSize;
      } else if (!this.checkBulk(ingredient.name)) {
        // console.log(ingredient);
        this.barWeight += ingredient.portionSize;
      }
      // Check if this is a bulk ingredient

      // yes?? add it total and bulk weight

      // no?? add it to total only

      // also check if total weight is greater than 70 gram

      this.ingredientOrderList.push(ingredient);
    } else {
      if (this.checkBulk(ingredient.name)) {
        this.bulkWeight -= (ingredient.portionSize * ingredient.quantity);
        this.barWeight -= (ingredient.portionSize * ingredient.quantity);
      } else {
        this.barWeight -= (ingredient.portionSize * ingredient.quantity);
      }
      this.ingredientOrderList = this.ingredientOrderList.filter(i => {
        return (i.name !== ingredient.name);
      });
    }
  }

  checkBulk(name) {
    for (let index = 0; index < this.bulkIngredients.length; index++) {
      if (this.bulkIngredients[index].name === name) {
        return true;
      }
    }
    return false;
  }

  changeQuantity(ingredient, action) {
    if (action === 'minus') {
      if (ingredient.quantity > 1) {
        ingredient.quantity--;
        if (this.checkBulk(ingredient.name)) {
          this.bulkWeight -= ingredient.portionSize;
          this.barWeight -= ingredient.portionSize;
        } else {
          this.barWeight -= ingredient.portionSize;
        }
        if (ingredient.quantity < 7) {
          ingredient.plus = false;
        }
      }
    } else if (action === 'plus') {
      // console.log(this.barWeight);
      if (ingredient.quantity === 10) {
        return;
      }
      if ((this.barWeight + ingredient.portionSize) > 70) {
        // alert('Cannot be greater than 70gm');
        swal({
          type: 'error',
          text: 'Bar weight cannot be greater than 70gm'
        });
        return;
      }
      ingredient.quantity++;
      if (this.checkBulk(ingredient.name)) {
        this.bulkWeight += ingredient.portionSize;
        this.barWeight += ingredient.portionSize;
      } else {
        this.barWeight += ingredient.portionSize;
      }
      const quantity = ingredient.portionFlag ? ingredient.portionFlag : 7;
      if (ingredient.quantity === quantity) {

        const swalWithBootstrapButtons = swal.mixin({
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
        });

        swalWithBootstrapButtons({
          title: 'Bitterness level reached?',
          // text: `Adding more of this ingredient can make the Bar ${ingredient.bitternessFlag}`,
          html: `Adding more of this ingredient can make the Bar<b> ${ingredient.bitternessFlag}</b>`,
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
    if (this.checkBulk(item.name)) {
      this.bulkWeight -= (item.portionSize * item.quantity);
      this.barWeight -= (item.portionSize * item.quantity);
    } else {
      this.barWeight -= (item.portionSize * item.quantity);
    }
    this.ingredientOrderList = this.ingredientOrderList.filter(i => {
      return (i.name !== item.name);
    });
  }

  placeOrder() {
    if (this.bulkWeight < 28) {
      // alert('Bulk weight must be greater than 28gm');
      swal({
        type: 'error',
        text: 'Bulk weight must be greater than 28gm'
      });
      return;
    }
    if (this.barWeight < 55) {
      // alert('Bar weight must be greater than 55gm');
      swal({
        type: 'error',
        text: 'Bar weight must be greater than 55gm'
      });
      return;
    }
    if (this.barWeight > 75) {
      // alert('Bar weight must be less than 55gm');
      swal({
        type: 'error',
        text: 'Bar weight must be less than 55gm'
      });
      return;
    }
    if (this.ingredientOrderList.length === 0) {
      return;
    }
    this.orderService.setRecipeList(this.ingredientOrderList);
    this.router.navigate(['cart']);
  }


}
