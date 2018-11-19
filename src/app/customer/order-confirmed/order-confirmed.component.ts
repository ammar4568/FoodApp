import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {
  recipeList;
  contactInfo;

  constructor(private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.orderService.currentOrderContact.subscribe(contactinfo => this.contactInfo = contactinfo);
    this.orderService.currentOrderList.subscribe(list => this.recipeList = list);
    if (this.recipeList === '') {
      this.router.navigate(['order']);
    }
  }

}
