import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList;
  orderList: any[] = [];
  orderToDisplay = [];

  constructor(private recipeService: RecipeService,
    private orderService: OrderService) {

    this.orderService.getPublishedOrders().subscribe(item => {
      // console.log(item);
      this.orderList.push(Object.assign({}, item));
      console.log(this.orderList);
    }, (err) => { }, () => {
      console.log('compelte');
    });

    // this.orderService.getFirstLimitedPublishedOrders();
  }

  ngOnInit() {
  }

  next() {

  }

}
