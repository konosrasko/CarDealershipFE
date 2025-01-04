import {Injectable} from '@angular/core';
import {User} from './user.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://localhost:8080/api/citizen/signup';

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }
}
