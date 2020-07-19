import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {AuthenticateService} from './authenticate/authenticate.service'
import {DatabaseService} from './database/database.service'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AuthguardGuard} from '../app/services/authguard.guard';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule ,ReactiveFormsModule,
   
    FormsModule,IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    HttpClient,
    SplashScreen,
    AuthenticateService,
    File,
    EmailComposer,
    AuthguardGuard,
    DatabaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
