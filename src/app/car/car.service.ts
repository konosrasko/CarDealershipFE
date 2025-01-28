import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';  // URL of Spring Boot API

  private apiOnly = 'http://localhost:8080/api';

  private apiUrlForDelears = 'http://localhost:8080/api/carsForDelearship';


  constructor(private http: HttpClient) {}

  getIdByAfm(afm: string): Observable<number> {
    return this.http.get<number>(`${this.apiOnly}/get-id`, { params: { afm } });
  }
  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCarsForDealers(dealerId: number | null): Observable<any[]> {
    const url = `${this.apiUrlForDelears}?dealerID=${(dealerId)}`;
    return this.http.get<any[]>(url);
  }

  deleteCar(carId: number | null): Observable<any> {
    if (!carId) {
      throw new Error('Car ID is required');
    }
    const deleteUrl = `${this.apiOnly}/delete?carId=${carId}`;
    return this.http.delete<any>(deleteUrl); // Use DELETE instead of POST
  }

  purchaseCar(carId: number | null, options?: { headers?: HttpHeaders }): Observable<any> {
    if (!carId) {
      throw new Error('Car ID is required');
    }

    const purchaseUrl = `${this.apiOnly}/purchase?carId=${carId}`;

    // Make a POST request with the carId and headers
    return this.http.post<any>(purchaseUrl, {}, options);
  }

}
