import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { OfficeTripsPage } from '../office-trips/office-trips';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { DatabaseProvider } from '../../providers/database/database';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';



/**
 * Generated class for the TripReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-report',
  templateUrl: 'trip-report.html',
})
export class TripReportPage {
  trip = {}
  trips = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthenticateProvider,
    private databaseprovider: DatabaseProvider,
    private emailComposer: EmailComposer,
    private file: File,

    public appCtrl: App) {
    //this.getRecent5Trips();

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TripReportPage');
    // this.getRecent5Trips();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ');
    this.getRecent5Trips();
  }

  getRecent5Trips() {
   // var sess = '5a4c50b645e2964054e516c8'

    this.databaseprovider.getSession().then((sess)=>{
      // this.loadSessionData();
      this.auth.getRecentTrips(sess[0].session).subscribe((data) => {
        console.log(JSON.stringify(data));
        this.trips = JSON.parse(JSON.stringify(data));
      });
      
 }) 
 
  }

  createTrip() {
    this.navCtrl.push(OfficeTripsPage)
  }



  deleteTrip(id) {
   // var sess = '5a4c50b645e2964054e516c8'
    var credential = {
      _id: id
    }

    this.databaseprovider.getSession().then((sess)=>{
      this.auth.deleteTrip(sess[0].session, credential).subscribe((data) => {
 
      });
      
 }) 
 

  }

  refreshpage() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(TripReportPage);
  }

  getDateOf(ndate) {
    let vdate = new Date(ndate);
    return vdate.toISOString().slice(0, 10);

  }

  download() {
    const items = this.trips;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    var csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','))
    let goodcsv = csv.join('\r\n')

    console.log(goodcsv);
   this.testEmail(goodcsv);
  }

  testEmail(csv) {
  this.file.checkDir(this.file.externalDataDirectory, 'expensedir')
  .then(_ => 
    this.file.writeFile(this.file.externalDataDirectory, 'expensetracker.csv', csv, { replace: true })
    .then(() => {
      let email = {
        to: '',
        attachments: [
          this.file.externalDataDirectory + 'expensetracker.csv'
        ],

        subject: 'expense Tracker',
        body: 'Yout expense tracker',
        isHtml: true
      };
     this.emailComposer.open(email);

    })
    .catch((err) => {
      console.error(err);
    })

  
  ).catch(err => 
    this.file.createDir(this.file.externalDataDirectory, 'expensedir', false));
    this.file.writeFile(this.file.externalDataDirectory, 'expensetracker.csv', csv, { replace: true })
    .then(() => {
      let email = {
        to: 'cmdevendran@gmail.com',
        attachments: [
          this.file.externalDataDirectory + 'expensetracker.csv'
        ],

        subject: 'expense Tracker',
        body: 'Yout expense tracker',
        isHtml: true
      };
     this.emailComposer.open(email);

    })
    .catch((err) => {
      console.error(err);
    })

  }

  
}



