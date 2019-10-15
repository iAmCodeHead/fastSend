import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { AdmobFreeService } from '../admobfree.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {
  // tslint:disable-next-line:variable-name
  user_id: any;
  fieldList = [];
  titleList = [];
  title: string;
  titleChecker = false;

  constructor(private authService: AuthService,
              private storage: Storage,
              private loadingController: LoadingController,
              private admobFreeService: AdmobFreeService,
              private alertController: AlertController) {
   }
   async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

   addField(form) {
    this.admobFreeService.InterstitialAd();
    this.authService.present();
      if (this.fieldList.length < 4) {
          // tslint:disable-next-line:max-line-length
          this.fieldList.push(form.value.mobile_no);
          this.title = form.value.list_name;
          if (this.title !== null) {
            this.titleList.push(this.title);
            this.titleChecker = true;
          }
          form.reset();
          this.authService.dismiss();
      } else {
        this.presentAlert('Maximum of 5 recipients in a group');
      }
   }


  addRecipient(form) {
    this.admobFreeService.RewardVideoAd();
    this.authService.present();
    if (this.fieldList.length < 5) {
      this.fieldList.push(form.value.mobile_no);
      this.title = form.value.list_name;
      if (this.title !== null) {
        this.titleList.push(this.title);
        this.titleChecker = true;
      }
    }
    const data = {
      sender_id: this.user_id,
      list_name: this.titleList[0],
      recipient: this.fieldList
    };
    this.authService.addRecipient(data).subscribe((resp) => {
      this.authService.dismiss();
      this.presentAlert('A new recipient list has been created successfully');
    });
  }

  ngOnInit() {
    this.authService.present();
    this.storage.get('USER_ID').then((resp) => {
      this.user_id = resp;
    this.authService.dismiss();
    });
  }

}
