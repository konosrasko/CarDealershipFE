import {Component, OnInit} from '@angular/core';
import {NewsService} from './news.service';
import {New} from './new.model';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  categories: string[] = ['All', 'Technology', 'Health', 'Business', 'Education'];
  areasOfInterest: string[] = ['All', 'Health', 'Innovation', 'Marketing', 'Lifestyle'];
  selectedCategory: string = 'All';
  selectedAreaOfInterest: string = 'All';
  searchText: string = '';
  news: New[] = [];

  constructor(
    private newsService: NewsService,
  ) {
  }

  ngOnInit() {
    this.newsService.getNews().subscribe({
      next: (data: New[]) => {
        this.news = this.news.concat(data);
      },
      error: (err) => console.error('Error loading news:', err),
    });
  }


  get filteredNews() {
    return this.news.filter(news => {
      const matchesCategory = this.selectedCategory === 'All' || news.category === this.selectedCategory;
      const matchesAreaOfInterest = this.selectedAreaOfInterest === 'All' || news.areaOfInterest === this.selectedAreaOfInterest;
      const matchesSearch = news.title?.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesCategory && matchesAreaOfInterest && matchesSearch;
    });
  }

  clearFilters() {
    this.selectedCategory = 'All';
    this.selectedAreaOfInterest = 'All';
    this.searchText = '';
  }
}
