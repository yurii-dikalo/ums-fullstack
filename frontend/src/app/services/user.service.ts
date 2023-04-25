import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user';
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;
const API_URL_USER = '/users';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = API_URL + API_URL_USER;
    return this.http.get<User[]>(url)
      .pipe(
        catchError(error => {
          console.error('Error getting users:', error);
          return throwError(error);
        })
      );
  }
}
