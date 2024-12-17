import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  currentLanguage:any = '';

  constructor(public translate: TranslateService){
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
}
