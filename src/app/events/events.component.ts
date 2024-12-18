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
