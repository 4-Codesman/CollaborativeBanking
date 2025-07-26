import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://4codesmanwebappbe-drbresg4h5cpcjdm.canadacentral-01.azurewebsites.net'; 

  constructor(private http: HttpClient) {}

 postUserLogin(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users/login`, user);
  }
}