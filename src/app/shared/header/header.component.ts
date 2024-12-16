import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeTabIndex = 0;
  routeToTabMapping: { [key: string]: number } = {
    '/home': 0,
    '/about': 1,
    '/contact': 2
  };
  currentLanguage:any = '';

  constructor(private router: Router,
              public translate: TranslateService
  ){
    this.router.events.subscribe(() => {
      const activeRoute = this.router.url;
      this.activeTabIndex = this.routeToTabMapping[activeRoute] || 0;
    });
    this.currentLanguage = this.translate.currentLang;
  }

  onTabChange(event: any) {
    const tabToRouteMapping = Object.keys(this.routeToTabMapping).find(
      (key) => this.routeToTabMapping[key] === event
    );
    if (tabToRouteMapping) {
      this.router.navigate([tabToRouteMapping]);
    }
  }

  changeLanguage(newLanguage: any) {
    if (newLanguage !== this.currentLanguage) {
      this.translate.use(newLanguage).subscribe(() => {
        localStorage.setItem('language', newLanguage);
      });
    }
  }

  protected readonly localStorage = localStorage;
}
