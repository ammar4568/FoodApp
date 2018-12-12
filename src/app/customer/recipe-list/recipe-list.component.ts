import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { OrderService } from '../order.service';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList;
  orderList: any[] = [];
  orderToDisplay = [];
  currentBarId;
  start;
  end;

  constructor(private recipeService: RecipeService,
    private orderService: OrderService,
    public auth: AuthService,
    public router: Router) {

    this.orderService.getOrderData().subscribe(
      (item) => {
        item.docs.map(i => {
          this.orderList.push(i.data());
        });
      },
      (err) => { },
      () => {
        if (this.orderList.length > 2) {
          this.start = 0;
          this.end = 2;
          this.orderToDisplay = this.orderList.slice(this.start, this.end);
        }
      });
  }

  ngOnInit() {
  }

  next() {
    if (this.start + 2 < this.orderList.length) {
      this.start += 2;
      this.end = this.start + 2;
      this.orderToDisplay = [];
      this.orderToDisplay = this.orderList.slice(this.start, this.end);
    }
  }

  prev() {
    if (this.start - 2 >= 0) {
      this.start -= 2;
      this.end = this.start + 2;
      this.orderToDisplay = [];
      this.orderToDisplay = this.orderList.slice(this.start, this.end);
    }
  }

  getRecipe(id) {
    this.currentBarId = id;
    this.recipeService.getRecipe(id).subscribe((item) => {
      this.recipeList = Object.assign([], item);
    });
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

}
