import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {
  recipeList;
  contactInfo;
  user;
  constructor(private orderService: OrderService,
    private router: Router,
    public auth: AuthService) {
    auth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.orderService.currentOrderContact.subscribe(contactinfo => this.contactInfo = contactinfo);
    this.orderService.currentOrderList.subscribe(list => this.recipeList = list);
    if (this.recipeList === '') {
      this.router.navigate(['order']);
    }
  }

  navigate(link) {
    // console.log('show');
    if (link !== 'thankyou') {
      this.router.navigate([`${link}`]);
    }
  }

  logout() {
    this.auth.signOut();
  }

  viewDashboard() {
    this.router.navigate(['admin']);
  }

}
