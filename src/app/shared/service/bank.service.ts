import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getBanks(
    pageNumber: number = 0,
    pageSize: number = 10,
    sort: string = 'id',
    direction: 'asc' | 'desc' = 'asc',
    searchTerm: string = '',
    status: string = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sort)
      .set('direction', direction);

    if (searchTerm) {
      params = params.set('descricao', searchTerm);
    }

    if (status) {
      params = params.set('status', status);
    }

    const headers = this.getAuthHeaders();

    return this.http.get<any>(environment.apiUrl, { headers, params });
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
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    });
  }
}
