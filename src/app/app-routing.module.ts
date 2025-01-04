import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {CarComponent} from './car/car.component';
import {LoginComponent} from './shared/login/login.component';
import {UsersComponent} from './users/users.component';
import {DealershipComponent} from './dealership/dealership.component';

const routes: Routes = [
  { path: '', component: LoginComponent , data: { breadcrumb: 'login' }},
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'login' } },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'home' } },
  { path: 'contact', component: ContactComponent, data: { breadcrumb: 'contact' } },
  { path: 'car', component: CarComponent, data: { breadcrumb: 'car' } },
  { path: 'citizen/signup', component: UsersComponent, data: { breadcrumb: 'signup' } },
  { path: 'dealership/signup', component: DealershipComponent, data: { breadcrumb: 'signup' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' , data: { breadcrumb: 'login' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
