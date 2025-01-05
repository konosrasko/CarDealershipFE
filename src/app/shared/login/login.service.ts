import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private dealershipUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(afm?: string, password?: string): Observable<any> {
   return this.http.post<any>(
      `${this.dealershipUrl}?afm=${afm}&password=${password}`, { responseType: 'text' as 'json' },
      {}
    );
  }

}
