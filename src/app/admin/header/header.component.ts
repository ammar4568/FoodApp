import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;

  constructor(public auth: AuthService, private router: Router) {
    auth.user.subscribe(user => {
      this.user = user;
      // console.log(this.user.isAdmin);
      if (!this.user.isAdmin) {
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['admin/login']);
  }

  navigate(link) {
    this.router.navigate([`${link}`]);
  }

}
