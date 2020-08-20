import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InputQuantityComponent } from './base-component/input-quantity/input-quantity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FrameItemComponent } from './base-component/frame-item/frame-item.component';
import { InputSearchComponent } from './base-component/input-search/input-search.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    InputQuantityComponent,
    FrameItemComponent,
    InputSearchComponent,
    OrderPageComponent,
    NotificationPageComponent,
  ],
  exports: [
    InputQuantityComponent,
    FrameItemComponent,
    InputSearchComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbAlertModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'VND',
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
