import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  {
    path: 'home-page',
    component: HomePageComponent
  },
  {
    path: 'order-page',
    component: OrderPageComponent
  },
  {
    path: 'notification-page',
    component: NotificationPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
