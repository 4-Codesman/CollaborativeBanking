import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 postUserLogin(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, user);
  }

  getEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/users/emails`);
  }

  createStokvel(stokvelData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/stokvels/create`, stokvelData);
  }

  getUserIdsByEmail(emails: string[]): Observable<{ email: string, userID: string }[]> {
    return this.http.post<{ email: string, userID: string }[]>(`${this.apiUrl}/users/getUserIdsByEmail`, { emails });
  }
}