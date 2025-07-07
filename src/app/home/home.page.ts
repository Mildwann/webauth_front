import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule} from '@ionic/angular'; // Import AlertController
import { IonHeader, IonToolbar, IonTitle, IonContent ,IonButton ,IonInput, IonItem, AlertController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { WebauthService } from '../services/webauth.service';
import { CommonModule } from '@angular/common';
import {
  startRegistration,
  startAuthentication,
} from '@simplewebauthn/browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule,IonHeader,IonToolbar,IonTitle,IonContent,IonButton,IonInput,IonItem]

})
export class HomePage {
  username = '';
  password = '';
  message = '';
  loggedIn = false;
  hasPasskey = false;

  // Inject AlertController into the constructor
  constructor(
    private webAuthn: WebauthService,
    private alertController: AlertController // Inject AlertController here
  ) {}

  async registerUser() {
    this.message = '';
    if (!this.username || !this.password) {
      this.message = 'Please enter username and password';
      return;
    }
    try {
      const res: any = await this.webAuthn.registerUser(this.username, this.password).toPromise();
      this.message = 'User registered successfully. Now you can register Passkey.';

      // Call the new function to prompt for Passkey registration
      await this.presentPasskeyRegistrationPrompt();

    } catch (err: any) {
      this.message = `❌ Register user failed: ${err.error?.error || err.message || err}`;
    }
  }

  /**
   * Presents an Ionic alert to ask the user if they want to register a Passkey.
   */
  async presentPasskeyRegistrationPrompt() {
    const alert = await this.alertController.create({
      header: 'ลงทะเบียน Passkey',
      message: 'เพื่อความปลอดภัยที่ดียิ่งขึ้นและการเข้าสู่ระบบที่ง่ายขึ้น คุณต้องการลงทะเบียน Passkey',
      buttons: [
      
        {
          text: 'ลงทะเบียน',
          handler: () => {
            console.log('ผู้ใช้ต้องการลงทะเบียน Passkey.');
            this.registerPasskey(); // Call your registerPasskey() function
          },
        },
      ],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }

  async registerPasskey() {
    this.message = '';
    if (!this.username) {
      this.message = 'Please enter username';
      return;
    }
    try {
      const challenge: any = await this.webAuthn.registerStart(this.username).toPromise();
      const attResp = await startRegistration(challenge);
      const verification: any = await this.webAuthn.registerComplete(attResp).toPromise();

      this.message = verification.verified ? 'Passkey registered successfully' : 'Passkey registration failed';
      if (verification.verified) {
        this.hasPasskey = true;
      }
    } catch (err: any) {
      this.message = `❌ Register passkey failed: ${err.error?.error || err.message || err}`;
    }
  }

  async loginPassword() {
    this.message = '';
    if (!this.username || !this.password) {
      this.message = 'Please enter username and password';
      return;
    }
    try {
      const res: any = await this.webAuthn.loginPassword(this.username, this.password).toPromise();
      if (res.success) {
        this.message = 'Login with password success';
        this.loggedIn = true;
        this.hasPasskey = res.hasPasskey || false;
      } else {
        this.message = 'Login with password failed';
      }
    } catch (err: any) {
      this.message = `❌ Login password failed: ${err.error?.error || err.message || err}`;
    }
  }


  async loginPasskey() {
    this.message = '';
    if (!this.username) {
      this.message = 'Please enter username';
      return;
    }
    try {
      const challenge: any = await this.webAuthn.loginStart(this.username).toPromise();
      const authResp = await startAuthentication(challenge);
      const verification: any = await this.webAuthn.loginComplete(authResp).toPromise();

      this.message = verification.verified ? 'Login with passkey success' : 'Login with passkey failed';
      if (verification.verified) {
        this.loggedIn = true;
        this.hasPasskey = true;
      }
    } catch (err: any) {
      this.message = `❌ Login passkey failed: ${err.error?.error || err.message || err}`;
    }
  }

  async addPasskey() {
    this.message = '';
    if (!this.loggedIn) {
      this.message = 'Please login first';
      return;
    }
    try {
      const challenge: any = await this.webAuthn.registerStart(this.username).toPromise();
      const attResp = await startRegistration(challenge);
      const verification: any = await this.webAuthn.registerComplete(attResp).toPromise();

      this.message = verification.verified ? 'Passkey added successfully' : 'Add passkey failed';
      if (verification.verified) {
        this.hasPasskey = true;
      }
    } catch (err: any) {
      this.message = `❌ Add passkey failed: ${err.error?.error || err.message || err}`;
    }
  }
}