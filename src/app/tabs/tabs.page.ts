import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private storage: Storage) { }

  ngOnInit() {
    // this.authService.isLoggedIn().subscribe((resp) => {
    //   if (!resp) {
    //     this.router.navigateByUrl('login');
    //   }
    // });
  }

}
