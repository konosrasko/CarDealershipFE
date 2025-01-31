import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded() {
    return this.refreshNeeded$.asObservable();
  }

  requestRefresh() {
    this.refreshNeeded$.next();
  }

}
