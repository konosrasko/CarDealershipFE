import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

//Base URL for all URLs
var baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

  /**
   * Returns User's id with the use of AFM.
   * @param afm
   */
  private getIdByAfmURL= baseUrl + '/get-id';

  getIdByAfm(afm: string): Observable<number> {
    return this.http.get<number>(this.getIdByAfmURL, { params: { afm } });
  }

  /**
   * Returns all cars.
   */
  private getCarsURL = baseUrl + '/cars';

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.getCarsURL);
  }

  /**
   * Returns all cars for a specific Dealer.
   * @param dealerID
   */
  private getCarsForDealersURL = baseUrl + '/carsForDelearship';

  getCarsForDealers(dealerID: string): Observable<any[]> {
    return this.http.get<any[]>(this.getCarsForDealersURL,{ params: { dealerID } });
  }

  /**
   * Delete the selected Car.
   * @param carId
   */
  private deleteCarURL = baseUrl + '/delete';

  deleteCar(carId: string): Observable<any> {
    return this.http.delete<any>(this.deleteCarURL, { params: { carId } });
  }

  /**
   * Purchase the selected car.
   * @param carId
   * @param options
   */
  private purchaseCarURL = baseUrl + '/purchase';
  purchaseCar(carId: string): Observable<any> {
    return this.http.post<any>(`${this.purchaseCarURL}?carId=${carId}`,{});
  }
}
