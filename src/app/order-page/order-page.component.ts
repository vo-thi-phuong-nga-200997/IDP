import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  username: string;
  phone: string;
  address: string;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  constructor(
    private _location: Location,
    private router: Router,
    ) { }
  ngOnInit(): void {
    JSON.parse(localStorage.getItem('brand'));
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(2500)
    ).subscribe(() => this.successMessage = '');
  }
  backClicked() {
    this._location.back();
  }
  order(){
    if(this.username && this.phone && this.address){
      this.router.navigate([`/notification-page`]);
    }
    if(!this.username || !this.phone || !this.address){
      this._success.next(`Please complete all information!`);
      }
  }
}
