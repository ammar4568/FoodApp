import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = true;
  currentUser: User;

  constructor(public auth: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
  }

}
