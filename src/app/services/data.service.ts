import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://4codesmanwebappbe-drbresg4h5cpcjdm.canadacentral-01.azurewebsites.net'; 
  //private apiUrl = 'http://localhost:3000'; // Local development URL

  constructor(private http: HttpClient) {}

  postUserLogin(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users/login`, user);
  }

  addFriend(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/friends/add`, { code });
  }

  getFriendRequests(uid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/friends/requests/${uid}`);
  }

  respondToRequest(uid: string, friendId: string, accepted: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/friends/respond`, { uid, friendId, accepted });
  }

  getFriendsList(uid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/friends/list/${uid}`);
  }

  removeFriend(uid: string, friendId: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/friends/remove`, { uid, friendId });
    }

  getPairFriend(uid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/friends/PairFriend/${uid}`);
  }

}