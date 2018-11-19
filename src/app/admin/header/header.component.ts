import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;

  constructor(public auth: AuthService) {
    auth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }

}
