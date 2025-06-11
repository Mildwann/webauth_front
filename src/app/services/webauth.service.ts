//เรียก backend API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebauthService {
  
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerStart(username: string) {
    return this.http.post(`${this.BASE_URL}/register`, { username });
  }

  registerComplete(credential: any) {
    return this.http.post(`${this.BASE_URL}/register/complete`, credential);
  }

  loginStart(username: string) {
    return this.http.post(`${this.BASE_URL}/login`, { username });
  }

  loginComplete(credential: any) {
    return this.http.post(`${this.BASE_URL}/login/complete`, credential);
  }
}
