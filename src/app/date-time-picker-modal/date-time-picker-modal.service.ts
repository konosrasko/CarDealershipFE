import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

interface ResponseDTO {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DateTimePickerModalService {
  private apiUrl = 'http://localhost:8080/api/reservation/test-drive';

  constructor(private http: HttpClient) {}

  createReservation(data: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400 && error.error?.message) {
      return throwError(() => new Error(error.error.message));
    }
    return throwError(() => new Error('An unexpected error occurred.'));
  }
}
