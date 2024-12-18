import {Component, OnInit} from '@angular/core';
import {EventService} from './event.service';
import {Event} from './event.model';
import {ToasterService} from '../shared/toaster/toaster.service';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: Event[] = [];

  constructor(private eventService: EventService, private toaster: ToasterService,) {}


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
  ngOnInit(): void {
       this.eventService.getEvents().subscribe({
         next: (value: Event[]) => {
           this.events = this.events.concat(value);
         },
         error: () => {
           this.toaster.showError('Error! Something went wrong.');
         }
       })
    }

}
