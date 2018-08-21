import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(id, token?): Observable<User> {
    const httpOptions2 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
    if (token) {
      return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions2);
    }
    return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
  }
}
