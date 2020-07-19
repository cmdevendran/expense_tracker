import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {DatabaseService} from '../../database/database.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import { ExpensePage } from '../../expense/expense/expense.page';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

loginForm : FormGroup;
username: AbstractControl;
password: AbstractControl;
firstname: AbstractControl;
lastname: AbstractControl;
developer = {};
developers = [];

  constructor(public navCtrl: NavController, private formBuilder : FormBuilder, 
    private auth : AuthenticateService, 
    private router: Router,
    private databaseprovider: DatabaseService, 
    private platform: Platform,
    public toastCtrl : ToastController,
    private loadingCtrl : LoadingController) {
    /* this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
    
        this.loadSessionData();
      }
    })  commented in ionic 5 */
  
    this.loginForm = this.formBuilder.group({
      'username': [''],
      'password': [''],
      'firstname': [''],
      'lastname': ['']
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.firstname = this.loginForm.controls['firstname'];
    this.lastname = this.loginForm.controls['lastname'];
    

  }

  ngOnInit() {
    
  }

  login(){

    console.log("form clicked");
    if(this.loginForm.valid){
      console.log("form valid");
      var credentials = ({username : this.username.value, 
      password : this.password.value,firstname : this.firstname.value,
      lastname : this.lastname.value});
      console.log(credentials)
      this.auth.registerNewUser(credentials).subscribe(
        (data)=>{
          console.log("msg from : "+ data);
       
          this.loginToast("Registration Successful");
              this.databaseprovider.setSession("session",data).then((val)=>{
               // this.loadSessionData();
              
          })
 
          
        },
        (error)=>{
          console.log(error);
        },
        ()=>{
          console.log("call completed");
        }

      
      );
     

    }
  }

 


  loadSessionData(){
    this.databaseprovider.getSession("session").then(data => {
      this.developers = data;
    })
  }

  addSession() {
    this.databaseprovider.setSession("session",this.developer['session'])
    .then(data => {
      this.loadSessionData();
    });
    this.developer = {};
  }

  goToSignup(){
    this.router.navigate(['/SignupPage'])
    
  }

  async loginToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present()
    
  }


}