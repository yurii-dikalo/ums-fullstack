import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private cookieService: CookieService) { }

  saveToken(token: string): void {
    this.cookieService.set(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  getToken(): string | null {
    return this.cookieService.get(TOKEN_KEY);
  }

  saveUser(user: any): void {
    this.cookieService.set(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = this.cookieService.get(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
}
