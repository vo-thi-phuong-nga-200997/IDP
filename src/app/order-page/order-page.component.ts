import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  username: string;
  phone: number;
  address: string;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private _location: Location,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }
  ngOnInit(): void {
    
    JSON.parse(localStorage.getItem('brand'));
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(2500)
    ).subscribe(() => this.successMessage = '');

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required]],
  });
  }

  get f() {
    return this.registerForm.controls;
  }

  backClicked() {
    this._location.back();
  }
  order(){
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    if(this.username && this.phone && this.address){
      this.router.navigate([`/notification-page`]);
    }
    if(!this.username || !this.phone || !this.address){
      this._success.next(`Please complete all information!`);
      }
  }
}
