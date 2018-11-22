import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../customer/order.service';

@Component({
  selector: 'app-recipe-management',
  templateUrl: './recipe-management.component.html',
  styleUrls: ['./recipe-management.component.css']
})
export class RecipeManagementComponent implements OnInit {

  orderList;

  constructor(private orderService: OrderService) {
    this.orderList = this.orderService.getDispatchedOrders();
  }

  ngOnInit() {
  }
}
