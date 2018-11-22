import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() queryEmitter = new EventEmitter<string>();

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

  viewDashboard() {
    this.router.navigate(['admin']);
  }

  search() {
    const query = (<HTMLInputElement>document.getElementById('search-bar')).value;
    this.queryEmitter.emit(query);
  }
}
