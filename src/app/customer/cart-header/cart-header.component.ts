import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent implements OnInit {
  user;

  constructor(public router: Router,
    public auth: AuthService) {
    auth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  navigate(link) {
    this.router.navigate([`${link}`]);
  }



  logout() {
    this.auth.signOut();
  }

  viewDashboard() {
    this.router.navigate(['admin']);
  }
}

