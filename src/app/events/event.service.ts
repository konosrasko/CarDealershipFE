import { Injectable } from '@angular/core';
import {Event} from './event.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = '/assets/dataSource/events.json';

  constructor(
    private http: HttpClient
  ) {}

    getEvents(): Observable<Event[]> {
      return this.http.get<Event[]>(this.eventsUrl);

    }
}
