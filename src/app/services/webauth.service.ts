import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebauthService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerStart(username: string) {
    return this.http.post(`${this.BASE_URL}/register`, { username }, { withCredentials: true });
  }

  registerComplete(credential: any) {
    return this.http.post(`${this.BASE_URL}/register/complete`, credential, { withCredentials: true });
  }

  loginStart(username: string) {
    return this.http.post(`${this.BASE_URL}/login`, { username }, { withCredentials: true });
  }

  loginComplete(credential: any) {
    return this.http.post(`${this.BASE_URL}/login/complete`, credential, { withCredentials: true });
  }
}
