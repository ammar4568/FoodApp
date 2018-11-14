import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent implements OnInit {

  constructor(public router: Router,
    public auth: AuthService) { }

  ngOnInit() {
  }

  navigate(link) {
    this.router.navigate([`${link}`]);
  }
}

