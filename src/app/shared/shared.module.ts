import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink} from '@angular/router';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatDialogTitle} from '@angular/material/dialog';
import {MatTab, MatTabGroup} from '@angular/material/tabs';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatCardTitle,
    MatCard,
    MatDialogTitle,
    MatTabGroup,
    MatTab,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ]
})

export class SharedModule {}
