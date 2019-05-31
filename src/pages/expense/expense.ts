import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { DatabaseProvider } from '../../providers/database/database';


/**
 * Generated class for the ExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',

})
export class ExpensePage {

  expenseForm: FormGroup;

  expcat: AbstractControl;
  expdate: AbstractControl;
  expamount: AbstractControl;
  expremark: AbstractControl;
  categories: any[];
  userId: string;
  cats: any[];
  developer = {};
  developers = [];
  doubleclick: boolean;
  loading : any;
  //myObj : string;





  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private auth: AuthenticateProvider,
    private databaseprovider: DatabaseProvider,
    public loadingCtrl: LoadingController

  ) {
    console.log("Opening Expense Page");
/**
    this.doubleclick = true;
    this.databaseprovider.getSession().then((dev) => {
      this.presentLoadingDefault();
      this.developers = dev;
      this.auth.getcats(this.developers[0].session).subscribe(data => {
        console.log("test " + data);
        console.log("test " + data.categories);
        this.cats = data.categories;
       
      })

    

    })*/




    this.expenseForm = this.formBuilder.group({
      'expcat': [''],
      'expdate': [''],
      'expamount': [''],
      'expremark': ['']


    });


    this.expcat = this.expenseForm.controls['expcat'];
    this.expdate = this.expenseForm.controls['expdate'];
    this.expamount = this.expenseForm.controls['expamount'];
    this.expremark = this.expenseForm.controls['expremark'];
   // this.dismissLoading();
  }



 getConnection():Promise<any> {
  return new Promise (resolve=>{

    this.databaseprovider.getSession()
       
      })
    


  

async function doAll():Promise<void>{
  this.developers = await(this.getConnection());


}

  
}

/* 

  getCategories() {


    this.auth.getExpenseCategories().subscribe(
      (data) => {
        this.categories = data.categories
        console.log("data : " + JSON.stringify(data));
        console.log("categories : " + this.categories);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("call completed");
      }

    );
  }
 */

presentLoadingDefault() {
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  this.loading.present();

  
}

dismissLoading(){
  this.loading.dismiss();

 
}


  submit() {

    if (this.expenseForm.valid) {
      var credentials = {};
      credentials = {
        expcat: this.expenseForm.controls['expcat'].value,
        expdate: this.expenseForm.controls['expdate'].value,
        expamount: this.expenseForm.controls['expamount'].value,
        expremark: this.expenseForm.controls['expremark'].value

      }
      console.log(credentials);
     
      this.databaseprovider.getSession().then((dev) => {
        this.developers = dev;
        this.auth.setExpenseItem(credentials, this.developers[0].session).subscribe(
          (data) => {
            this.doubleclick = true;
            this.expenseForm = this.formBuilder.group({
              'expcat': [''],
              'expdate': [''],
              'expamount': [''],
              'expremark': ['']


            });
           
            if (data.status == 200) {
              this.navCtrl.push(ExpensePage);
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

   /*  if (this.doubleclick) {
      this.doubleclick = false;
      if (this.expenseForm.valid) {
        var credentials = {};
        credentials = {
          expcat: this.expenseForm.controls['expcat'].value,
          expdate: this.expenseForm.controls['expdate'].value,
          expamount: this.expenseForm.controls['expamount'].value,
          expremark: this.expenseForm.controls['expremark'].value

        }
        console.log(credentials);
       
        this.databaseprovider.getSession().then((dev) => {
          this.developers = dev;
          this.auth.setExpenseItem(credentials, this.developers[0].session).subscribe(
            (data) => {
              this.doubleclick = true;
              this.expenseForm = this.formBuilder.group({
                'expcat': [''],
                'expdate': [''],
                'expamount': [''],
                'expremark': ['']


              });
             
              if (data.status == 200) {
                this.navCtrl.push(ExpensePage);
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
 */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePage');
  }

}
