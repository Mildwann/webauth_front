import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonButton} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';  // เพิ่ม import นี้
import { WebauthService } from '../services/webauth.service';
import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],

})
export class HomePage {
  username = '';
  message = '';

  constructor(private webAuthn: WebauthService) {}

  async register() {
    this.message = '';
    try {
      const challenge: any = await this.webAuthn.registerStart(this.username).toPromise();
      const attResp = await startRegistration(challenge);
      const verification: any = await this.webAuthn.registerComplete(attResp).toPromise();

      this.message = verification.verified ? '✅ Register Success' : '❌ Register Failed';
    } catch (err) {
      this.message = `❌ ${err}`;
    }
  }

  async login() {
    this.message = '';
    try {
      const challenge: any = await this.webAuthn.loginStart(this.username).toPromise();
      const authResp = await startAuthentication(challenge);
      const verification: any = await this.webAuthn.loginComplete(authResp).toPromise();

      this.message = verification.verified ? '✅ Login Success' : '❌ Login Failed';
    } catch (err) {
      this.message = `❌ ${err}`;
    }
  }
}
