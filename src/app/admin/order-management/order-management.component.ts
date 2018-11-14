import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../customer/order.service';
import { RecipeService } from '../../customer/recipe.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  orderList;
  recipeList;

  constructor(private orderService: OrderService,
    private recipeService: RecipeService) {
    this.orderList = this.orderService.getOrders();
  }

  ngOnInit() {
  }

  getRecipe(id) {
    this.recipeService.getRecipe(id).subscribe((item) => {
      this.recipeList = Object.assign([], item);
    });
  }

}
