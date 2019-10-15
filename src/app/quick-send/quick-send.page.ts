import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-quick-send',
  templateUrl: './quick-send.page.html',
  styleUrls: ['./quick-send.page.scss'],
})
export class QuickSendPage implements OnInit {

  user_id: any;

  constructor(public authService: AuthService,
              private storage: Storage,
              public alertController: AlertController) { }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Message',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  sendSms(form) {
    this.authService.present();
    const smsData = {
      msg: form.value.msg,
      recipient: [form.value.mobile_no],
      sender: this.user_id
    };
    this.authService.sendSms(smsData).subscribe((res) => {
      form.reset();
      if (res) {
        this.authService.dismiss();
        this.presentAlert('SMS Sent!');
      }
    }, (err) => {
      this.authService.dismiss();
      this.presentAlert("Failed to Send");
    });
  }

  ngOnInit() {
    this.authService.present();
        this.storage.get('SENDER').then((resp) => {
      this.user_id = resp;
      this.authService.dismiss();
    });
  }

}
