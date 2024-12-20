import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {NewsComponent} from './news/news.component';
import {EventsComponent} from './events/events.component';

const routes: Routes = [
  { path: '', component: HomeComponent , data: { breadcrumb: 'Home' }},
  { path: 'contact', component: ContactComponent, data: { breadcrumb: 'contact' } },
  { path: 'news', component: NewsComponent, data: { breadcrumb: 'news' } },
  { path: 'events', component: EventsComponent, data: { breadcrumb: 'events' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' , data: { breadcrumb: 'home' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
