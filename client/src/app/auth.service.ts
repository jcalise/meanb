import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private cookieService: CookieService,
  private http: Http) { }

  login(username: string) {
    return this.http.get(`/login/${username}`)
    .map(response => response.json());
  }

  logout(): Promise<boolean> {
    return this.http.delete('logout')
    .map(response => response.json())
    .toPromise();
  }

  getUser() {
    const user = this.cookieService.get('user');
    return user;
  }

}
