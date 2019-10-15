import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  studentName: any;
  studentDept: any;
  studentLevel: any;
  mobileNo: any;
  token: any;
  expiry: any;

  constructor(public alertController: AlertController,
              private authApi: AuthService,
              private storage: Storage,
              private router: Router,
              private platform: Platform) { }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  logout() {
    this.authApi.logout().then((res) => {
    this.router.navigateByUrl('');
    });
  }

  sendSms(form) {
    const formData = {
      msg: form.value,
      dept: this.studentDept,
      level: this.studentLevel,
      mobile_no: this.mobileNo
    };
    console.log(formData);
    this.authApi.sendSms(formData).subscribe((res) => {
      form.reset();
      if (res) {
        this.presentAlert('Sent!');
      }
    }, (error) => {
      if (error) {
        this.presentAlert('Failed!');
      }
    });
  }

  //   ionViewDidLoad() {
  //   this.admob.onAdDismiss()
  //     .subscribe(() => { console.log('User dismissed ad'); });
  // }

  // onClick() {
  //   let adId;
  //   if(this.platform.is('android')) {
  //     adId = 'ca-app-pub-3380705355111875~6221717283';
  //   } else if (this.platform.is('ios')) {
  //     adId = 'ca-app-pub-3380705355111875~6221717283';
  //   }
  //   this.admob.prepareInterstitial({adId: adId})
  //     .then(() => { this.admob.showInterstitial(); });
  // }

  ngOnInit() {
    // this.authApi.profile().then((res) => {
    //   // this.studentName = res.name;
    //   // this.studentLevel = res.level;
    //   // this.studentDept = res.dept;
    //   // this.mobileNo = res.mobile_no;
    //   console.log(res);
    // });
    this.storage.get('STUDENT_NAME').then((res) => {
      this.studentName = res;
    });
    this.storage.get('STUDENT_DEPT').then((res) => {
      this.studentDept = res;
    });
    this.storage.get('STUDENT_LEVEL').then((res) => {
      this.studentLevel = res;
    });
    this.storage.get('MOBILE_NO').then((res) => {
      this.mobileNo = res;
    });
  }

}
