import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  categories: string[] = ['All', 'Technology', 'Health', 'Business'];
  areasOfInterest: string[] = ['All', 'Health', 'Innovation', 'Marketing', 'Lifestyle'];
  selectedCategory: string = 'All';
  selectedAreaOfInterest: string = 'All';  // New selected area of interest
  searchText: string = '';


  news = [
    { title: 'Tech Update', description: 'Latest updates in tech world.', date: '2024-12-15', category: 'Technology', areaOfInterest: 'Innovation' },
    { title: 'Health News', description: 'Important health tips for the season.', date: '2024-12-14', category: 'Health', areaOfInterest: 'Health' },
    { title: 'Business Growth', description: 'Insights on business strategies.', date: '2024-12-13', category: 'Business', areaOfInterest: 'Marketing' },
    { title: 'New App Release', description: 'A new mobile app is released.', date: '2024-12-12', category: 'Technology', areaOfInterest: 'Innovation' }
  ];


  get filteredNews() {
    return this.news.filter(newsItem => {
      const matchesCategory = this.selectedCategory === 'All' || newsItem.category === this.selectedCategory;
      const matchesAreaOfInterest = this.selectedAreaOfInterest === 'All' || newsItem.areaOfInterest === this.selectedAreaOfInterest;
      const matchesSearch = newsItem.title.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesCategory && matchesAreaOfInterest && matchesSearch;
    });
  }

  clearFilters() {
    this.selectedCategory = 'All';
    this.selectedAreaOfInterest = 'All';  // Reset area of interest filter
    this.searchText = '';
  }
}
