import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private authUrl = 'https://auth-dev.princeton-lemitar.com.br/realms/princeton-lemitar/protocol/openid-connect/token';

  // constructor(private http: HttpClient, private router: Router) {}

  // login(username: string, password: string): Observable<any> {
  //   const body = new URLSearchParams();
  //   body.set('username', username);
  //   body.set('password', password);
  //   body.set('grant_type', 'password');
  //   body.set('client_id', 'your-client-id');

  //   return this.http.post<any>(this.authUrl, body.toString(), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   });
  // }

  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('access_token');
  // }

  // logout() {
  //   localStorage.removeItem('access_token');
  //   this.router.navigate(['/login']);
  // }
}
