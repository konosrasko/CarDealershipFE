import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface CarDTO {
  brand: string;
  model: string;
  fuelType: string;
  engineCapacity: string;
  seats: number | null;
  price: number | null;
  quantity: number | null;
  additionalInfo: string;
  dealership: number; // dealership as a number
}

@Injectable({
  providedIn: 'root'
})
export class AddCarModalService {
  private url = 'http://localhost:8080/api/car/add';

  constructor(private http: HttpClient) {}

  // Method to add a car
  addCar(carDTO: CarDTO): Observable<CarDTO> {
    return this.http.post<CarDTO>(this.url, carDTO);
  }
}
