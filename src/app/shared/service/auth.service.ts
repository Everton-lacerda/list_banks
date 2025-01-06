import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oauthService = inject(OAuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('client_id', environment.clientId)
      .set('client_secret', environment.clientSecret)
      .set('scope', environment.scope);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<any>(environment.accessTokenURL, params, { headers })
      .pipe(
        switchMap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          return of(response);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }

    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp - currentTime <= 60) {
      this.refreshToken().subscribe({
        next: () => console.log('Token renovado automaticamente'),
        error: () => console.error('Erro ao renovar o token automaticamente'),
      });
    }

    return decodedToken.exp > currentTime;
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserRoles(): string[] {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.authorities) {
      return decodedToken.authorities;
    }
    return [];
  }

  getUserName(): string {
    const user = this.getDecodedToken();
    return user.name;
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return of(() => new Error('Refresh token not found.'));
    }

    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken)
      .set('client_id', environment.clientId)
      .set('client_secret', environment.clientSecret);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<any>(environment.accessTokenURL, params, { headers })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        }),
        catchError((error) => {
          this.logout();
          return of(error);
        })
      );
  }

  autoRefreshToken(): Observable<any> {
    if (this.isAuthenticated()) {
      return new Observable((observer) => {
        observer.next(null);
        observer.complete();
      });
    } else {
      return this.refreshToken().pipe(
        tap(() => {
          console.log('Token renovado com sucesso');
        })
      );
    }
  }
}
