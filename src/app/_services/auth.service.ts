import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginbs = new BehaviorSubject<boolean>(false);
  currentLoginbs = this.loginbs.asObservable();
  baseUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient, private router: Router, private alertify: AlertifyService) {}

  changeloginbs() {
    console.log('Changing login bs');
    this.loginbs.next(!this.loginbs.getValue());
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.changeloginbs();
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }
}
