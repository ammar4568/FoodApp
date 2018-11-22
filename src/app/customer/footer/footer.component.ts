import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year;
  constructor(private router: Router) {
    const d = new Date();
    this.year = d.getFullYear();
  }

  ngOnInit() {
  }

  navigate(link) {
    this.router.navigate([link]);
  }

}
