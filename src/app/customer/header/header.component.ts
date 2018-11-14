import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user;
  loadSpinner;

  constructor(public router: Router,
    public auth: AuthService) {
    auth.user.subscribe(user => {
      this.user = user;
    });

  }

  ngOnInit() {
  }

  navigate(link) {
    // console.log('show');
    this.router.navigate([`${link}`]);
  }


  logout() {
    this.auth.signOut();
  }
}
