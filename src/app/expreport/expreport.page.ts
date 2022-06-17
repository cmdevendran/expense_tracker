import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { DatabaseService} from '../database/database.service';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { analyzeAndValidateNgModules, IfStmt } from '@angular/compiler';
import * as _ from 'underscore'
import { ModalController } from '@ionic/angular';
import { ShowitemsPage } from '../showitems/showitems.page';

@Component({
  selector: 'app-expreport',
  templateUrl: './expreport.page.html',
  styleUrls: ['./expreport.page.scss'],
})
export class ExpreportPage implements OnInit {



  ngOnInit() {
  }


  expenses = [];
  expense : any;
  formexpense = {};
  startDate: any;
  endDate: any;
  sessions :any;
  totalamount : [];
  total: any;
  cshowme : boolean =true;
  detail : boolean =true;

  iholder : any;

  

  

  constructor(
    private auth: AuthenticateService, 
    private databaseprovider: DatabaseService,
    private file : File,
    private emailComposer: EmailComposer,
    public modalController: ModalController
    ) {
    console.log("inside shhow expenses");

   

    this.databaseprovider.getSession("session").then(val=>{
      console.log("Expense Page + session  :"+val)
      this.sessions = val;
        this.auth.getExpenseCategories(val).subscribe(data=>{
          this.expense = data
          
        }) 

      })
  }

  async presentModal(listdata) {

    const modal = await this.modalController.create({
      component: ShowitemsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        expense : JSON.stringify(listdata),
        session : this.sessions
        
      }
    });
    return await modal.present();
  }

  getExpenses() {


    console.log("Method get expenses");
    console.log(this.formexpense);
    console.log("toggle status : "+this.detail)
    let credential = {
      startDate: this.formexpense['StartDate'],
      endDate: this.formexpense['EndDate']
    }
    console.log("st date : "+this.startDate)
    
let amount = 0
this.getExpensesthroughSegment(credential.startDate, credential.endDate)

  }


  getExpensesthroughSegment(startdate, enddate) {

    if(this.detail){

      console.log("Method get expenses");
    console.log(this.formexpense);
    let credential = {
      startDate: startdate,
      endDate: enddate
    }
let amount = 0
    this.databaseprovider.getSession('session').then(sess => {
      this.auth.getExpenses(sess, credential).subscribe((data) => {
          this.expense = data;
          this.expenses = JSON.parse(JSON.stringify(data));
          console.log("Expenses : Report : "+JSON.stringify(this.expense))
          data.forEach(function(item){
            amount += item.expamount
    
    
          });
          console.log (" this total "+amount)
          this.total = amount.toFixed(2);
          let holder = {}

          this.expenses.forEach(function(d) {
            if (holder.hasOwnProperty(d.expcat.toUpperCase())) {
              holder[d.expcat.toUpperCase()] = holder[d.expcat.toUpperCase()] + d.expamount;
            } else {
              holder[d.expcat.toUpperCase()] = d.expamount;
            }
          });
          var obj2 = [];

          for (var prop in holder) {
            obj2.push({ expcat: prop, totalexpamount: holder[prop].toFixed(2) });
          }
          
          this.iholder = obj2

          
          
      })})
    }

    

  }


 getDateOf(ndate) {
        let vdate = new Date(ndate);
        return  vdate.toISOString().slice(0, 10);

      }



  ionViewDidLoad() {
        console.log('ionViewDidLoad ShowExpensesPage');
      }


  deleteExp(id) {
      var credential = {
        _id: id
      }

        this.auth.deleteExp(this.sessions, credential).subscribe((data) => {
  
        });
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
          body: 'Your expense tracker',
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

    details(){
      if(this.detail){
        console.log(this.detail)
      }
      else{
        console.log(this.detail)
      }

 
   }

    segmentChanged(ev: any) {
      
      console.log('Segment changed', ev.detail.value);
      var d = new Date();

      if(ev.detail.value=="custom"){
        this.cshowme = true
        console.log('Segment changed custom', ev.detail.value);

      }
      else if(ev.detail.value=="cmonth"){
        this.cshowme = false
        console.log('Segment changed', ev.detail.value);
        let startdate = new Date(d.getFullYear(),d.getMonth(),1);
        let enddate = new Date()
        console.log("start date : "+startdate)
        console.log("end date : "+new Date())

        this.getExpensesthroughSegment(startdate.toISOString(),enddate.toISOString())

      }
      else if(ev.detail.value=="lmonth"){
        this.cshowme = false
        console.log('Segment changed', ev.detail.value + " "+d.getMonth);
        let startdate = new Date(d.getFullYear(),d.getMonth()-1,1);
        let enddate = new Date(d.getFullYear(),d.getMonth(),1 -1);



        console.log("start date : "+startdate)
        console.log("end date : "+new Date())

        this.getExpensesthroughSegment(startdate.toISOString(),enddate.toISOString())

      }
      else{
        this.cshowme = false
       // console.log('Segment changed', ev.detail.value);
        let startdate = new Date(d.getFullYear(),d.getMonth()-1,1);
        let enddate = new Date(d.getFullYear(),d.getMonth(),1,0)


        console.log("start date : "+startdate.toISOString)
        console.log("end date : "+enddate.toISOString)

        this.getExpensesthroughSegment(startdate.toISOString(),enddate.toISOString())

      }

    }

    async getItemOfExpCat(expcat1){ 
      console.log("category clicked "+expcat1)
      console.log("this"+this.expenses)
      console.log(this.expenses.filter(obj =>
        obj.expcat.toLowerCase().indexOf(expcat1.toLowerCase()) >= 0));
      //var obj2 = _.where(this.expenses,{expcat: expcat1.toUpperCase()})
      var obj2 = this.expenses.filter(obj =>
        obj.expcat.toLowerCase().indexOf(expcat1.toLowerCase()) >= 0)

      this.presentModal(obj2)

    }


}