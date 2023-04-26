import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { User } from '../model/user';
import {environment} from "../../environments/environment";
import {MessageService} from "./message.service";

const API_URL = environment.apiUrl;
const API_URL_USER = '/users';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    const url = API_URL + API_URL_USER;
    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = API_URL + API_URL_USER + '/' + id;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user by id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user: User): Observable<User> {
    const url = API_URL + API_URL_USER;
    return this.http.post<User>(url, user, httpOptions)
      .pipe(
        tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
      );
  }

  updateUser(user: User): Observable<any> {
    const url = API_URL + API_URL_USER + '/' + user.id;
    return this.http.put(url, user, httpOptions)
      .pipe(
        tap(_ => this.log(`updated user id=${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  lockUser(id: number): Observable<User> {
    const url = API_URL + API_URL_USER + '/' + id + '/lock';
    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log(`locked user by id=${id}`)),
        catchError(this.handleError<User>(`lockUser id=${id}`))
      );
  }

  unlockUser(id: number): Observable<User> {
    const url = API_URL + API_URL_USER + '/' + id + '/unlock';
    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log(`unlocked user by id=${id}`)),
        catchError(this.handleError<User>(`unlockUser id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
