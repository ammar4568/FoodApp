import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { OrderService } from '../order.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  user;
  myOrders;
  recipeList;

  constructor(public auth: AuthService,
    public orderService: OrderService,
    public recipeService: RecipeService) {
    auth.user.subscribe(user => {
      this.user = user;
      this.myOrders = this.orderService.getUsersOrder(this.user.uid);
    });
  }

  ngOnInit() {
  }

  getRecipe(id) {
    this.recipeService.getRecipe(id).subscribe((item) => {
      this.recipeList = Object.assign([], item);
    });
  }

}
