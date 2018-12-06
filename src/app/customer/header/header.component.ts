import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() queryEmitter = new EventEmitter<string>();

  showSearch;
  user;
  loadSpinner;
  notLoggedIn;

  constructor(public router: Router,
    public auth: AuthService) {
    $('html,body').scrollTop(0);

    auth.user.subscribe(user => {
      this.user = user;
    });
    if (this.router.url === '/') {
      this.showSearch = true;
    } else {
      this.showSearch = false;
    }
  }

  ngOnInit() {
  }

  navigate(link) {
    if ((this.router.url === '/' || this.router.url === '/aboutus' || this.router.url === '/contactus') && (link === 'order')) {
      if (!this.user) {
        $('#login_2').modal('show');
      } else {
        this.router.navigate([`${link}`]);
      }
    } else {
      this.router.navigate([`${link}`]);
    }
  }

  toggle(action) {
    console.log(action);
    if (action === 'open') {
      $('#main').addClass('show');
    } else {
      $('#main').removeClass('show');
    }
    // alert('clicked');
    // $('#header_menu').css('display', 'block');
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

  viewOrders() {
    this.router.navigate(['my-orders']);
  }
}
