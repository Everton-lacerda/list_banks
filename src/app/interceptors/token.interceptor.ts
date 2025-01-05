import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../shared/service/auth.service';

export const TokenInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const oauthService = inject(OAuthService);
  const authService = inject(AuthService);
  const userToken = oauthService.getAccessToken();

  if (!userToken) {
    return next(req);
  }

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${userToken}`
    }
  });

  return next(modifiedReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = oauthService.getAccessToken();
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(newReq);
          })
        );
      }
      return throwError(error);
    })
  );
};
