import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { DatabaseProvider } from '../../providers/database/database';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import {File} from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the ShowExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-expenses',
  templateUrl: 'show-expenses.html',
})
export class ShowExpensesPage {
  @ViewChild(Nav) nav: Nav;
  expenses = [];
  expense = {};
  formexpense = {};
  startDate: any;
  endDate: any;
  sessions = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthenticateProvider, 
    private databaseprovider: DatabaseProvider,
    private file : File,
    private emailComposer: EmailComposer,
    private viewCtrl: ViewController) {
    console.log("inside shhow expenses");

    // this.getExpenses(this.startDate, this.endDate);
  }

  getExpenses() {


    console.log("Method get expenses");
    console.log(this.formexpense);
    // this.startDate =  this.formexpense.['StartDate'],
    let credential = {
      startDate: this.formexpense['StartDate'],
      endDate: this.formexpense['EndDate']
    }
    //   let sess : '5a4c50b645e2964054e516c8';
    //  var sess = '5a4c50b645e2964054e516c8'

    this.databaseprovider.getSession().then(sess => {
      this.sessions = sess;
      this.auth.getExpenses(this.sessions[0].session, credential).subscribe((data) => {
       // this.auth.getExpenses(sess, credential).subscribe((data) => {
        //  console.log("getex : " + data);
          //this.expense = JSON.parse(JSON.stringify(data));
          this.expense = data;
          this.expenses = JSON.parse(JSON.stringify(data));
          // console.log(this.expense);


        })

      })





    }




  generateArray(obj){
        // return Object.keys(obj).map((key)=>{ return obj[key]});

        return Object.keys(obj).map((key) => { return { key: key, value: obj[key] } });
      }

 getDateOf(ndate) {
        let vdate = new Date(ndate);
        return  vdate.toISOString().slice(0, 10);

      }



  ionViewDidLoad() {
        console.log('ionViewDidLoad ShowExpensesPage');
      }


      deleteExp(id) {
        // var sess = '5a4c50b645e2964054e516c8'
         var credential = {
           _id: id
         }
     
         this.databaseprovider.getSession().then((sess)=>{
           this.auth.deleteExp(sess[0].session, credential).subscribe((data) => {
      
           });
           
      }) 
      
     
       }

       download() {
        const items = this.expenses;
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
        this.file.writeFile(this.file.externalDataDirectory, 'expensedetails.csv', csv, { replace: true })
        .then(() => {
          let email = {
            to: '',
            attachments: [
              this.file.externalDataDirectory + 'expensedetails.csv'
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
        this.file.writeFile(this.file.externalDataDirectory, 'expensedetails.csv', csv, { replace: true })
        .then(() => {
          let email = {
            to: 'cmdevendran@gmail.com',
            attachments: [
              this.file.externalDataDirectory + 'expensedetails.csv'
            ],
    
            subject: 'expense Tracker',
            body: 'Your expense tracker',
            isHtml: true
          };
         this.emailComposer.open(email);
    
        })
        .catch((err) => {
          console.error(err);
        })
    
      }

}
