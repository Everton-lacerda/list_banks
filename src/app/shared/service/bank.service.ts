import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'https://api-dev.princeton-lemitar.com.br/v1/bancos';

  constructor(private http: HttpClient) {}

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.apiUrl);
  }

  getBank(id: number): Observable<Bank> {
    return this.http.get<Bank>(`${this.apiUrl}/${id}`);
  }

  addBank(bank: Bank): Observable<Bank> {
    return this.http.post<Bank>(this.apiUrl, bank);
  }

  updateBank(id: number, bank: Bank): Observable<Bank> {
    return this.http.put<Bank>(`${this.apiUrl}/${id}`, bank);
  }

  deleteBank(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteBanks(ids: number[]): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listIds`, {
      body: { listIds: ids }
    });
  }
}
