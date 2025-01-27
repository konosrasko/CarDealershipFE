import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private dealershipUrl = 'http://localhost:8080/auth/login';
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(afm?: string, password?: string): Observable<any> {
   return this.http.post<any>(
      `${this.dealershipUrl}?afm=${afm}&password=${password}`, { responseType: 'text' as 'json' },
      {}
    );
  }

  getIdByAfm(afm: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-id`, { params: { afm } });
  }


}
