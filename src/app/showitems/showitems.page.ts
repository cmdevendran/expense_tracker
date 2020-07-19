import { Component, OnInit } from '@angular/core';
import {  Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-showitems',
  templateUrl: './showitems.page.html',
  styleUrls: ['./showitems.page.scss'],
})
export class ShowitemsPage implements OnInit {
  @Input() expense: any;
  @Input() session : any;
  items= []
  constructor(public navParams: NavParams,
    private modalCtrl:ModalController,private Auth : AuthenticateService) {
    this.expense = navParams.get("expense")
    this.session = navParams.get("session")
    this.items = JSON.parse(this.expense)

   }

   getDateOf(ndate) {
    let vdate = new Date(ndate);
    return  vdate.toISOString().slice(0, 10);

  }

  deleteExp(id) {
    var credential = {
      _id: id
    }

      this.Auth.deleteExp(this.session, credential).subscribe((data) => {

      });
}

  ngOnInit() {
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}


