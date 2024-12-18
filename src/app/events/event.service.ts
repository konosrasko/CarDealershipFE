import { Injectable } from '@angular/core';
import {Event} from './event.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() {}

    getEvents(): Observable<Event[]> {
    const events: Event[] = [
      {
        id: 1,
        day: '3',
        month: 'APR',
        year: '2025',
        title: 'Horizon Implementation Day: Grant Management in Horizon Europe',
        category: 'Technology',
        areaOfInterest: 'Innovation',
        description: 'Join us for the 2025 edition of the Horizon Implementation Days! This is the third part about Grant Management in Horizon Europe.',
        time: '09:30 - 13:00',
        url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250403.htm'
      },
      {
        id: 2,
        day: '27',
        month: 'MAR',
        year: '2025',
        title: 'Lump Sum Funding in Horizon Europe: How does it work?',
        category: 'Technology',
        areaOfInterest: 'Innovation',
        description: 'Learn everything you need to know about applying to a lump sum call for proposals in Horizon Europe.',
        time: '10:00 - 12:00',
        url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250327.htm'
      },
      {
        id: 3,
        day: '20',
        month: 'MAR',
        year: '2025',
        title: 'Horizon Implementation Day: Grant Agreement Preparation in Horizon Europe',
        category: 'Technology',
        areaOfInterest: 'Innovation',
        description: 'Join us for the 2025 edition of the Horizon Implementation Days! This is the second part about Grant Agreement Preparation.',
        time: '09:30 - 12:45',
        url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250320.htm'
      },
      {
        id: 4,
        day: '13',
        month: 'MAR',
        year: '2025',
        title: 'Horizon Implementation Day: Finding opportunities and submitting a proposal',
        category: 'Technology',
        areaOfInterest: 'Innovation',
        description: 'This is the first part about finding opportunities and submitting a proposal in Horizon Europe.',
        time: '09:30 - 13:00',
        url: 'https://ec.europa.eu/research/participants/docs/h2020-funding-guide/other/event250313.htm'
      },
      {
        id: 5,
        day: '14',
        month: 'JAN',
        year: '2025',
        title: 'Info Session – Erasmus+ European Youth Together 2025',
        category: 'Health',
        areaOfInterest: 'Lifestyle',
        description: 'Join this info session to discover funding opportunities to help your youth organisation reach more young people.',
        time: '09:00 - 12:00',
        url: 'https://www.eacea.ec.europa.eu/news-events/events/info-session-erasmus-european-youth-together-2025-2025-01-14_en'
      },
    ];
      return of(events);
  }
}
