import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {New} from './new.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsUrl = 'assets/dataSource/news.json';

  constructor(
    private http: HttpClient
  ) {}

  getNews(): Observable<New[]> {
    return this.http.get<New[]>(this.newsUrl);
  }
}
