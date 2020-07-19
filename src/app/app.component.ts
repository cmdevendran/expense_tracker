import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Expense',
      url: '/expense',
      icon: 'mail'
    },
    {
      title: 'Expense Report',
      url: '/expreport',
      icon: 'paper-plane'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'heart'
    }
  
  ];
/*   public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
 */


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
}
