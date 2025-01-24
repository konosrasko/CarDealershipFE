import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';  // URL of Spring Boot API

  private apiOnly = 'http://localhost:8080/api';


  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
