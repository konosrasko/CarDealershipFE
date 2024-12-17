import {Component, HostListener} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-scroll-up-button',
  templateUrl: './scroll-up-button.component.html',
  styleUrls: ['./scroll-up-button.component.css'],
  imports: [
    NgIf,
    MatIcon
  ],
  standalone: true
})
export class ScrollUpButtonComponent {
  showButton = false;


  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 100;
  }


}
