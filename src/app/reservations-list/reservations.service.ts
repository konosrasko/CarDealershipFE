import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
  carId: number | null;
  brand: string | null;
  model: string | null;
  fuel_type: string | null;
  engine_capacity: string | null;
  seats: string | null;
  price: string | null;
  additionalInfo: string | null;
  quantity: string | null;
  dealeship_id: number | null;
}

export interface Citizen {
  citizenId: number;
  afm: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Reservation {
  reservationId: number;
  citizen: Citizen;
  car: Car;
  reservationDate: string;
  reservationTime: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private apiUrl = 'http://localhost:8080/api/reservations'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getReservations(citizenID: number): Observable<Reservation[]> {
    const params = new HttpParams().set('citizenID', citizenID);
    return this.http.get<Reservation[]>(this.apiUrl, { params });
  }
}
