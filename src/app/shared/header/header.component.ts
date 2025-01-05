import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  currentLanguage:any = '';
  isHidden = true;
  router;

  constructor(router: Router, public translate: TranslateService){
    this.router = router;
    this.currentLanguage = this.translate.currentLang;
  }

  changeLanguage(newLanguage: any) {
    if (newLanguage !== this.currentLanguage) {
      this.translate.use(newLanguage).subscribe(() => {
        localStorage.setItem('language', newLanguage);
      });
    }
  }
  protected readonly localStorage = localStorage;

  showHideMenu() {
     this.isHidden = !this.isHidden;
  }

  tokenInLocalStorage(): boolean {
    const isToken = localStorage.getItem('token');
    if(isToken) {
      return true;
    }return false;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out successfully');
    this.router?.navigate(['/login']);
  }
}
