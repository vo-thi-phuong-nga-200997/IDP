import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit {
  constructor( private router: Router,) { }
  ngOnInit(): void {
    if(!JSON.parse(localStorage.getItem('orderItem'))){
        this.router.navigate([`/home-page`]);
    }
  }
  backHome() {
    localStorage.removeItem('orderQuantity');
    localStorage.removeItem('brand');
    localStorage.removeItem('orderItem');
    this.router.navigate([`/home-page`]);
  }
}
