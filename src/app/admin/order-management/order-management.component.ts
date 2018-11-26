import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../customer/order.service';
import { RecipeService } from '../../customer/recipe.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  orderList;
  recipeList;
  currentOrder;
  dispatched;

  constructor(private orderService: OrderService,
    private recipeService: RecipeService) {
    this.dispatched = false;
    this.orderList = this.orderService.getUndispatchedOrders();
  }

  ngOnInit() {
  }

  getRecipe(id) {
    this.recipeService.getRecipe(id).subscribe((item) => {
      this.recipeList = Object.assign([], item);
    });
  }

  setCurrentOrder(order) {
    this.currentOrder = order;
  }

  dispatchOrder(order) {
    order.status = 'dispatched';
    this.orderService.getOrderId(order.id).subscribe(item => {
      item.map(a => {
        const id = a.payload.doc.id;
        this.orderService.dispatchOrder(id, order)
          .then(() => {
            // console.log('Dispatched');
          })
          .catch(() => {
            // console.log('Error');
          });
      });
    });
  }

  showDispatched() {
    this.dispatched = true;
    this.orderList = this.orderService.getDispatchedOrders();
  }

  showUndispatched() {
    this.dispatched = false;
    this.orderList = this.orderService.getUndispatchedOrders();
  }

}
