import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users;
  customers;

  constructor(private userService: UserService) {
    this.customers = true;
    this.users = this.userService.getCustomers();
  }

  ngOnInit() {
  }

  changeType(user, event) {
    // console.log(user); // Get the user
    // console.log(event.target); // check if
    this.userService.changeType(user, event.target.checked);
    // document.getElementById('onoffswitch').checked;
  }

  showCustomers() {
    this.customers = true;
    this.users = this.userService.getCustomers();
  }

  showStaff() {
    this.customers = false;
    this.users = this.userService.getStaff();

  }
}
