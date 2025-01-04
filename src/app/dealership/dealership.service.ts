import {Injectable} from '@angular/core';
import {Dealership} from './dealership.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealershipService {
  private dealershipUrl = 'http://localhost:8080/api/dealership/signup';

  constructor(private http: HttpClient) {}

  signUp(dealership: Dealership): Observable<any> {
    return this.http.post(this.dealershipUrl, dealership);
  }
}
