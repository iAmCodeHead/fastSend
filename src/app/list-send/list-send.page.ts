import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-send',
  templateUrl: './list-send.page.html',
  styleUrls: ['./list-send.page.scss'],
})
export class ListSendPage implements OnInit {

  listName: any;
  sender: any;
  recipients: any;
  user_id: any;
  recipients_array: [];

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
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
    let res = this.recipients.split(',');
    const smsData = {
      msg: form.value.msg,
      recipient: res,
      sender: this.user_id
    };
    // console.log(smsData);
    this.authService.sendSms(smsData).subscribe((res) => {
      form.reset();
      if (res) {
        // console.log(res);
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
    this.listName = this.route.snapshot.paramMap.get('list_name');
    this.sender = this.route.snapshot.paramMap.get('sender_id');
    this.recipients = this.route.snapshot.paramMap.get('recipient_list');
    this.storage.get('SENDER').then((resp) => {
      this.user_id = resp;
    this.authService.dismiss();
    });
  }

}
