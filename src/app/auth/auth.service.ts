import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS  =  'https://fastsend.herokuapp.com';
  // AUTH_SERVER_ADDRESS  =  'http://localhost:3000';
  authSubject  =  new  BehaviorSubject(false);
  loggedIn: boolean;
  userData: any;
  studentName: any;
  studentDept: any;
  studentLevel: any;
  mobileNo: any;
  isLoading = false;

  constructor(private  httpClient: HttpClient,
              private  storage: Storage,
              private loadingController: LoadingController,
              private admobFree: AdMobFree,
              public platform: Platform) {}



  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res: AuthResponse ) => {

        if (res) {
          await this.storage.set('ACCESS_TOKEN', JSON.stringify(res.access_token));
          await this.storage.set('EXPIRES_IN', JSON.stringify(res.expires_in));
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set('ACCESS_TOKEN', res.access_token);
          await this.storage.set('EXPIRES_IN', res.expires_in);
          await this.storage.set('USER_ID', res.user._id);
          await this.storage.set('SENDER', res.user.student_name);
          this.authSubject.next(true);
          this.loggedIn = true;
          this.userData = res.user;
        }
      })
    );
  }

  addRecipient(data) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/new-recipient`, data);
  }

  getRecipientList(userId) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/get-recipient`, userId);
  }

  deleteRecipientList(listName) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/delete-recipient`, listName);
  }

  async profile() {
    const token = this.storage.get('ACCESS_TOKEN');
    const expiry = this.storage.get('EXPIRES_IN');
    this.userData = {
      token,
      expiry
    };
    return await this.userData;
  }


  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    await this.storage.remove('STUDENT_NAME');
    await this.storage.remove('STUDENT_DEPT');
    await this.storage.remove('STUDENT_LEVEL');
    await this.storage.remove('MOBILE_NO');
    this.authSubject.next(false);
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  sendSms(data) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/send-sms`, data);
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        // console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => {});
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {});
  }


}
