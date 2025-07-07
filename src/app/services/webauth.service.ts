import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebauthService {
  BASE_URL = 'https://07bc-2403-6200-88a1-1a8c-692e-bfdb-bd83-c648.ngrok-free.app'; 

  constructor(private http: HttpClient) {}
  
  //	เริ่มต้นสมัครด้วย Passkey (ขอ challenge)
  registerStart(username: string) {
    return this.http.post(`${this.BASE_URL}/register`, { username }, { withCredentials: true });
  }
  //ส่งข้อมูลลายนิ้วมือที่สแกนเสร็จไปให้ backend ยืนยัน
  registerComplete(credential: any) {
    return this.http.post(`${this.BASE_URL}/register/complete`, credential, { withCredentials: true });
  }
//เริ่มล็อกอินด้วย Passkey (ขอ challenge)
  loginStart(username: string) {
    return this.http.post(`${this.BASE_URL}/login`, { username }, { withCredentials: true });
  }
//ส่งข้อมูลยืนยันตัวตนไป backend ตรวจสอบว่า login ได้ไหม
  loginComplete(credential: any) {
    return this.http.post(`${this.BASE_URL}/login/complete`, credential, { withCredentials: true });
  }
  registerUser(username: string, password: string) {
  return this.http.post(
    `${this.BASE_URL}/register-user`,
    { username, password },
    { withCredentials: true }
  );
}

loginPassword(username: string, password: string) {
  return this.http.post(
    `${this.BASE_URL}/login/password`,
    { username, password },
    { withCredentials: true }
  );
}

}
