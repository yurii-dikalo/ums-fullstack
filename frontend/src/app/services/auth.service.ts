import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {tap} from 'rxjs/operators';

const API_URL = environment.apiUrl;
const LOGIN_ENDPOINT = '/login';
const LOGOUT_ENDPOINT = '/logout';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + LOGIN_ENDPOINT, {username, password}, httpOptions)
      .pipe(
        tap((response: any) => {
          const token = response.token;
          this.cookieService.set('jwtToken', token);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.get(API_URL + LOGOUT_ENDPOINT);
  }

  getToken(): string {
    return this.cookieService.get('jwtToken');
  }
}
