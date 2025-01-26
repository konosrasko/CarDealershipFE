import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ContactComponent } from './contact/contact.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CarComponent } from './car/car.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {BreadcrumbComponent, BreadcrumbItemDirective} from 'xng-breadcrumb';
import {UsersComponent} from './users/users.component';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import { DealershipComponent } from './dealership/dealership.component';
import { AddCarModalComponent } from './add-car-modal/add-car-modal.component';
import { DateTimePickerModalComponent } from './date-time-picker-modal/date-time-picker-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translates/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    CarComponent,
    UsersComponent,
    DealershipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    FormsModule,
    MatToolbar,
    MatIconModule,
    MatTab,
    MatTabGroup,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MatStep,
    MatStepperPrevious,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    AddCarModalComponent,
    DateTimePickerModalComponent
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
