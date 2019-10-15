import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSendPipe } from './list-send.pipe';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobFreeService } from './admobfree.service';

@NgModule({
  declarations: [AppComponent, ListSendPipe],
  entryComponents: [],
  imports: [BrowserModule,
     FormsModule,
     ReactiveFormsModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     AuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdmobFreeService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
