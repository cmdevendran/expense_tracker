import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthenticateService } from '../../authenticate/authenticate.service';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../../database/database.service';
import { StocksService } from '../../services/stocks.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {


  stockForm: FormGroup;
  date: AbstractControl;
  price: AbstractControl;
  commission: AbstractControl;
  ticker : AbstractControl;
  exchange : AbstractControl;
  buyorsell : AbstractControl;
  qty: AbstractControl;
  categories: any[];
  userId: string;
  cats: any[];
  re : any;
  developer = {};
  developers = [];
  doubleclick: boolean;
  loading : any;
  ex : any[];
  //myObj : string;

  ngOnInit() {
  }

  constructor(public navCtrl: NavController, 
    private formBuilder: FormBuilder, private auth: AuthenticateService,
    private stocks : StocksService,
    private databaseprovider: DatabaseService,
    public loadingCtrl: LoadingController,
    private router: Router

  ) {
    console.log("Opening Expense Page");



    this.databaseprovider.getSession("session").then(val=>{
      console.log("portfolio Page + session  :"+val)
        this.stocks.getticker(val).subscribe(data=>{
          console.log("portfolio Page + data  :"+JSON.stringify(data));
          this.re = data;
          this.cats = this.re
         
 // to get unique value of exchange


this.ex = [...new Set(this.re.map(item => item.exchange))];
console.log(this.ex);
    

/* 
           this.re.forEach((item) => {

            console.log('ID: ' + item.id);
            console.log('MSG: ' + item.ticker);
            console.log('TID: ' + item.exchange);
            this.cats.push(item.ticker)
          }); */
        }) 

      })
  
  
    
  

    this.stockForm = this.formBuilder.group({
      'ticker': [''],
      'exchange': [''],
      'date': [''],
      'price': [''],
      'qty' : [''],
      'buyorsell': [''],
      'commission':['']


    });


    this.ticker = this.stockForm.controls['ticker'];
    this.exchange = this.stockForm.controls['exchange'];
    this.date = this.stockForm.controls['date'];
    this.price = this.stockForm.controls['price'];
    this.qty = this.stockForm.controls['qty'];
    this.buyorsell = this.stockForm.controls['buyorsell'];

    this.commission = this.stockForm.controls['commission'];
   // this.dismissLoading();
  }

 getConnection():Promise<any> {
  return new Promise (resolve=>{

    this.databaseprovider.getSession('session')
       
      })
   
async function doAll():Promise<void>{
  this.developers = await(this.getConnection());


}

  
}

  submit() {

    if (this.stockForm.valid) {
      var credentials = {};
      credentials = {
        ticker : this.stockForm.controls['ticker'].value,
        exchange : this.stockForm.controls['exchange'].value,
        date : this.stockForm.controls['date'].value,
        price : this.stockForm.controls['price'].value,
        qty : this.stockForm.controls['qty'].value,
        buyorsell : this.stockForm.controls['buyorsell'].value,
        commission : this.stockForm.controls['commission'].value,

      }
      console.log(credentials);
     
      this.databaseprovider.getSession('session').then((sess) => {
        this.stocks.setStocks(credentials, sess).subscribe(
          (data) => {
            this.doubleclick = true;
            this.stockForm = this.formBuilder.group({
              'ticker': [''],
              'date': [''],
              'exchange': [''],
              'price': [''],
              'qty' : [''],
              'buyorsell': [''],
              'commission':['']


            });
           
            if (data.status == 200) {
              this.router.navigate(['portfolio]']);
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            console.log("call completed");
          }

        )



      })

    }

  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ExpensePage');
  }

  showSpinner(){
    
  }

}
