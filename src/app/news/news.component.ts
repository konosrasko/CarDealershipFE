import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  categories: string[] = ['All', 'Technology', 'Health', 'Business'];
  selectedCategory: string = 'All';
  searchText: string = '';

  news = [
    { title: 'Tech Update', description: 'Latest updates in tech world.', date: '2024-12-15', category: 'Technology' },
    { title: 'Health News', description: 'Important health tips for the season.', date: '2024-12-14', category: 'Health' },
    { title: 'Business Growth', description: 'Insights on business strategies.', date: '2024-12-13', category: 'Business' },
    { title: 'New App Release', description: 'A new mobile app is released.', date: '2024-12-12', category: 'Technology' }
  ];

  get filteredNews() {
    return this.news.filter(newsItem => {
      const matchesCategory = this.selectedCategory === 'All' || newsItem.category === this.selectedCategory;
      const matchesSearch = newsItem.title.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  clearFilters() {
    this.selectedCategory = 'All';
    this.searchText = '';
  }

}
