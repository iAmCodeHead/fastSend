import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  constructor(public alertController: AlertController,
              private  authService: AuthService,
              private  router: Router,
              public loadingController: LoadingController,
              private platform: Platform) { }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    this.loading.present();
    this.dismissLoader();
  }

  async dismissLoader() {
    await this.loadingController.dismiss();
  }

  login(form) {
    this.authService.present();
    this.authService.login(form.value).subscribe((res) => {
      if (res) {
        // this.dismissLoader();
        form.reset();
        this.router.navigateByUrl('tabs');
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
          return false;
      };
      this.authService.dismiss();
    }
     }, (error) => {
      this.authService.dismiss();
      if (error.status === 404) {
        this.presentAlert('Incorrect username and password combination');
      } else if (error.status === 500) {
        this.presentAlert('Internal server error');
      } else if (error.status === 401) {
        this.presentAlert('Password not valid');
      }
     });
  }

  ngOnInit() {
    // this.authService.profile().then((resp) => {
    //   console.log(JSON.stringify(resp));
    // });

    this.authService.isLoggedIn().subscribe((resp) => {
      if (resp) {
        this.router.navigateByUrl('tabs');
      }
    });
  }

}
