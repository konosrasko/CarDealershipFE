import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  categories: string[] = ['All', 'Technology', 'Health', 'Business', 'Education'];
  areasOfInterest: string[] = ['All', 'Health', 'Innovation', 'Marketing', 'Lifestyle'];
  selectedCategory: string = 'All';
  selectedAreaOfInterest: string = 'All';
  searchText: string = '';

  events = [
    {
      day: '3',
      month: 'APR',
      year: '2025',
      title: 'Horizon Implementation Day: Grant Management in Horizon Europe',
      category: 'Business',
      areaOfInterest: 'Innovation',
      description:
        'Join us for the 2025 edition of the Horizon Implementation Days! This is the third part about Grant Management in Horizon Europe.',
      time: '09:30 - 13:00',
      url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250403.htm'
    },
    {
      day: '27',
      month: 'MAR',
      year: '2025',
      title: 'Lump Sum Funding in Horizon Europe: How does it work?',
      category: 'Technology',
      areaOfInterest: 'Innovation',
      description:
        'Learn everything you need to know about applying to a lump sum call for proposals in Horizon Europe.',
      time: '10:00 - 12:00',
      url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250327.htm'
    },
    {
      day: '20',
      month: 'MAR',
      year: '2025',
      title:
        'Horizon Implementation Day: Grant Agreement Preparation in Horizon Europe',
      description:
        'Join us for the 2025 edition of the Horizon Implementation Days! This is the second part about Grant Agreement Preparation.',
      time: '09:30 - 12:45',
      category: 'Technology',
      areaOfInterest: 'Innovation',
      url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250320.htm'
    },
    {
      day: '13',
      month: 'MAR',
      year: '2025',
      title:
        'Horizon Implementation Day: Finding opportunities and submitting a proposal',
      description:
        'This is the first part about finding opportunities and submitting a proposal in Horizon Europe.',
      time: '09:30 - 13:00',
      category: 'Technology',
      areaOfInterest: 'Innovation',
      url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250313.htm'
    },
    {
      day: '14',
      month: 'JAN',
      year: '2025',
      title: 'Info Session – Erasmus+ European Youth Together 2025',
      description:
        'Join this info session to discover funding opportunities to help your youth organisation reach more young people.',
      time: '09:00 - 12:00',
      category: 'Technology',
      areaOfInterest: 'Lifestyle',
      url: 'https://www.eacea.ec.europa.eu/news-events/events/info-session-erasmus-european-youth-together-2025-2025-01-14_en'
    },
  ];



  get filteredEvents() {
    return this.events.filter(event => {
      const matchesCategory = this.selectedCategory === 'All' || event.category === this.selectedCategory;
      const matchesAreaOfInterest = this.selectedAreaOfInterest === 'All' || event.areaOfInterest === this.selectedAreaOfInterest;
      const matchesSearch = event.title.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesCategory && matchesAreaOfInterest && matchesSearch;
    });
  }

  clearFilters() {
    this.selectedCategory = 'All';
    this.selectedAreaOfInterest = 'All';
    this.searchText = '';
  }

  navigateToEvent(url: string, event: Event): void {
    event.preventDefault();
    window.open(url, '_blank');
  }
}
