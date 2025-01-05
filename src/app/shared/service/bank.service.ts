import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank.model';
import { environment } from '../../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getBanks(): Observable<Bank[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Bank[]>(environment.apiUrl, { headers });
  }

  getBank(id: number): Observable<Bank> {
    const headers = this.getAuthHeaders();
    return this.http.get<Bank>(`${environment.apiUrl}/${id}`, { headers });
  }

  addBank(bank: Bank): Observable<Bank> {
    const headers = this.getAuthHeaders();
    return this.http.post<Bank>(environment.apiUrl, bank, { headers });
  }

  updateBank(id: number, bank: Bank): Observable<Bank> {
    const headers = this.getAuthHeaders();
    return this.http.put<Bank>(`${environment.apiUrl}/${id}`, bank, { headers });
  }

  deleteBank(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${environment.apiUrl}/${id}`, { headers });
  }

  deleteBanks(ids: number[]): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${environment.apiUrl}/listIds`, {
      headers,
      body: { listIds: ids }
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
