import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatDialogTitle} from '@angular/material/dialog';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {TranslatePipe} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from '@angular/material/tooltip';
import {ScrollUpButtonComponent} from './scroll-up-button/scroll-up-button.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIcon} from '@angular/material/icon';
import {DropDownMenuComponent} from './drop-down-menu/drop-down-menu.component';
import {BreadcrumbComponent, BreadcrumbItemDirective} from 'xng-breadcrumb';

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
    TranslatePipe,
    MatMenu,
    MatTooltip,
    MatMenuTrigger,
    MatMenuItem,
    ScrollUpButtonComponent,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIcon,
    DropDownMenuComponent,
    RouterLinkActive,
    BreadcrumbComponent,
    BreadcrumbItemDirective
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    ScrollUpButtonComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ]
})

export class SharedModule {}
