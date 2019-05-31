import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { TripReportPage } from '../trip-report/trip-report';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the OfficeTripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-office-trips',
  templateUrl: 'office-trips.html',
})
export class OfficeTripsPage {

  trips = {};
  trip = [];
  sessions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private databaseprovider: DatabaseProvider,
    private auth: AuthenticateProvider,
    private viewCtrl: ViewController,

  ) {

  }

  submit() {
    /*   this.trips ={
         valid : true
       } */

    let credential = {
      tripdate: this.trips['TripDate'],
      tripclient: this.trips['TripClient'],
      tripfrom: this.trips['TripFrom'],
      tripto: this.trips['TripTo'],
      tripfare: this.trips['TripFare'],
      tripremark: this.trips['TripRemark'],

    }

    //  this.databaseprovider.getSession().then(sess => {
    //   this.sessions = sess;
    // this.auth.setTrips(this.sessions[0].session, credential).subscribe((data) => {
    //  var sess = '5a4c50b645e2964054e516c8';
    this.databaseprovider.getSession().then((sess) =>
      this.auth.setTrips(sess[0].session, credential).subscribe((data) => {
        this.trips = data;
        this.trip = JSON.parse(JSON.stringify(data));
        // console.log(this.expense);


      })

    )
    this.viewCtrl.dismiss();





  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficeTripsPage');
  }

}
