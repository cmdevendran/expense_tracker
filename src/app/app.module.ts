import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from '../pages/signup/signup';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import {nodeserver} from '../env/environment';
import {HttpModule, Http} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { ExpensePage } from '../pages/expense/expense';
import { MydbProvider } from '../providers/mydb/mydb';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { ShowExpensesPage } from '../pages/show-expenses/show-expenses';
import { OfficeTripsPage } from '../pages/office-trips/office-trips';
import { TripReportPage } from '../pages/trip-report/trip-report';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ExpensePage,
    SignupPage,
    ShowExpensesPage,
    OfficeTripsPage,
    TripReportPage,
 
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ExpensePage,
    ShowExpensesPage,
    SignupPage,
    OfficeTripsPage,
    TripReportPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    {provide: ErrorHandler, useClass: IonicErrorHandler,
      },
    EmailComposer, 
    File,    
    AuthenticateProvider,
    MydbProvider,
    DatabaseProvider,
    SQLite,
    SQLitePorter
  ]
})
export class AppModule {


}

