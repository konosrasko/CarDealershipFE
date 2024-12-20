import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'el');
    }
    this.translate.setDefaultLang(localStorage.getItem('language') || 'el');
  }
}
