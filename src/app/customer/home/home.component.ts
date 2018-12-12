import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { OrderService } from '../order.service';
import { AuthService } from 'src/app/core/auth.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchItems;
  loadSpinner = true;
  orderList;
  recipeList;
  currentBarId;

  constructor(public router: Router,
    private recipeService: RecipeService,
    private orderService: OrderService,
    public auth: AuthService) {

    this.orderList = this.orderService.getPublishedOrders();

  }

  ngOnInit() {
  }

  getRecipe(id) {
    this.currentBarId = id;
    this.recipeService.getRecipe(id).subscribe((item) => {
      this.recipeList = Object.assign([], item);
    });
  }

  viewAllRecipes() {
    // this.router.navigate(['order'], { queryParams: { display: 'recipes' } });
    this.router.navigate(['recipe-list']);
  }

  placeOrder() {
    // console.log(this.currentBarId);
    this.auth.user.subscribe(user => {
      if (user) {
        this.router.navigate(['cart'], { queryParams: { barId: this.currentBarId } });
      } else {
        $('#login_2').modal('show');
      }
    });
  }

  search(term) {
    // console.log(term);
    this.orderService.getOrdersWithQuery(term).subscribe(item => {
      // console.log(item);
      this.searchItems = item;

      console.log(this.searchItems);

    });
  }


}
