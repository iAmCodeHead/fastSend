import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AdmobFreeService } from '../admobfree.service';

@Component({
  selector: 'app-recipient-list',
  templateUrl: './recipient-list.page.html',
  styleUrls: ['./recipient-list.page.scss'],
})
export class RecipientListPage implements OnInit {

  recipientList: any;
  // tslint:disable-next-line:variable-name
  user_id: any;

  constructor(public actionSheetController: ActionSheetController,
              public alertController: AlertController,
              public authService: AuthService,
              private storage: Storage,
              private admobFreeService: AdmobFreeService,
              private router: Router) { }



  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentActionSheet(each) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
         this.deleteList(each);
        }
      }, {
        text: 'Send SMS',
        icon: 'send',
        handler: () => {
          this.sendToList(each);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  deleteList(each) {
    this.authService.present();
    const listName = {
      list_name: each.recipientList_name,
      sender_id: this.user_id
    };
    this.admobFreeService.InterstitialAd();
    this.authService.deleteRecipientList(listName).subscribe((resp) => {
      // console.log(resp);
      this.authService.dismiss();
      this.presentAlert('Deleted!');
      this.authService.present();
      this.router.navigate(['/recipient-list'])
    });
  }

  sendToList(each) {
    this.admobFreeService.RewardVideoAd();    
    this.authService.present();
    // this.router.navigateByUrl('/list-send');
    this.router.navigate(['/list-send', {list_name: each.recipientList_name, sender_id: this.user_id, recipient_list: each.recipients}]);
    this.authService.dismiss();
  }


  ngOnInit() {
    this.authService.present();
    this.storage.get('USER_ID').then((resp) => {
      this.user_id = resp;
      const data = {
        user_id: resp
      };
      this.authService.getRecipientList(data).subscribe((response) => {
        this.recipientList = response;
        this.authService.dismiss();
      });
    });

  }

}
