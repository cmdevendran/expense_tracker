import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthenticateService } from '../../authenticate/authenticate.service';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../../database/database.service';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})

export class ExpensePage implements OnInit {

  ngOnInit() {
  }

  expenseForm: FormGroup;

  expcat: AbstractControl;
  expdate: AbstractControl;
  expamount: AbstractControl;
  expremark: AbstractControl;
  exppaymentmode : AbstractControl;
  categories: any[];
  userId: string;
  cats: any[];
  re : any;
  developer = {};
  developers = [];
  doubleclick: boolean;
  loading : any;
  //myObj : string;


  constructor(public navCtrl: NavController, 
    private formBuilder: FormBuilder, private auth: AuthenticateService,
    private databaseprovider: DatabaseService,
    public loadingCtrl: LoadingController,
    private router: Router

  ) {
    console.log("Opening Expense Page");



    this.databaseprovider.getSession("session").then(val=>{
      console.log("Expense Page + session  :"+val)
        this.auth.getExpenseCategories(val).subscribe(data=>{
          console.log("Expense Page + data  :"+JSON.stringify(data));
          this.re = data
          this.cats = this.re.categories
          console.log(this.cats)
          
        }) 
/*         this.auth.getcats(val).subscribe(data=>{
          console.log(data)
        }) */
      })
  
  
    
  

    this.expenseForm = this.formBuilder.group({
      'expcat': [''],
      'expdate': [''],
      'expamount': [''],
      'exppaymentmode' : [''],
      'expremark': ['']


    });


    this.expcat = this.expenseForm.controls['expcat'];
    this.expdate = this.expenseForm.controls['expdate'];
    this.expamount = this.expenseForm.controls['expamount'];
    this.exppaymentmode = this.expenseForm.controls['exppaymentmode'];

    this.expremark = this.expenseForm.controls['expremark'];
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

    if (this.expenseForm.valid) {
      var credentials = {};
      credentials = {
        expcat: this.expenseForm.controls['expcat'].value,
        expdate: this.expenseForm.controls['expdate'].value,
        expamount: this.expenseForm.controls['expamount'].value,
        exppaymentmode: this.expenseForm.controls['exppaymentmode'].value,

        expremark: this.expenseForm.controls['expremark'].value

      }
      console.log(credentials);
     
      this.databaseprovider.getSession('session').then((sess) => {
        this.auth.setExpenseItem(credentials, sess).subscribe(
          (data) => {
            this.doubleclick = true;
            this.expenseForm = this.formBuilder.group({
              'expcat': [''],
              'expdate': [''],
              'expamount': [''],
              'expremark': [''],
              'exppaymentmode': ['']


            });
           
            if (data.status == 200) {
              this.router.navigate(['expense]']);
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

}

