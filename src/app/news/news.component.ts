import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: false,

  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  categories: string[] = ['All', 'Technology', 'Health', 'Business', 'Education'];
  areasOfInterest: string[] = ['All', 'Health', 'Innovation', 'Marketing', 'Lifestyle'];
  selectedCategory: string = 'All';
  selectedAreaOfInterest: string = 'All';
  searchText: string = '';


  news = [
    { title: 'First STEP Seal Projects Now Online', description: 'The STEP Seal (Sovereignty Seal under Regulation EU - 2024/795) provides projects with...', date: '2024-12-15', category: 'Technology', areaOfInterest: 'Innovation', url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/support/news/30248?pageNumber=1&pageSize=5' },
    { title: '11 New Projects to Advance on a more Competitive, Efficient, and Inclusive European Research Area', description: 'The EU will invest €23.5 million in 11 new projects that are expected to advance a more competitive, efficient...', date: '2024-12-14', category: 'Technology', areaOfInterest: 'Innovation', url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/support/news/30276?pageNumber=1&pageSize=5' },
    { title: 'Info Session – Erasmus+ Capacity Building in the Field of Youth 2025 - Sub-Saharan Africa', description: 'The European Education and Culture Executive Agency (EACEA) is hosting an online Info Session on 13 January 2025 on Erasmus+ Capacity building in the field of Youth 2025 ...', date: '2024-11-11', category: 'Education', areaOfInterest: 'Lifestyle', url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/support/news/30271?pageNumber=2&pageSize=5' },
    { title: 'EU4Health Projects Working on Diabetes Prevention', description: 'Over 33 million people in the EU suffer from diabetes, a disease characterised by abnormal blood sugar levels that represents a growing threat to human...', data: '2024-12-14', category: 'Health', areaOfInterest: 'Health', url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/support/news/30255?pageNumber=4&pageSize=5' }
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

  readMoreAboutNews(url: string){
    open(url);
  }
}
