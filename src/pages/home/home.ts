import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ExpensePage } from '../expense/expense';
import {DatabaseProvider} from '../../providers/database/database';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  
loginForm : FormGroup;
username: AbstractControl;
password: AbstractControl;
developer = {};
developers = [];

  constructor(public navCtrl: NavController, private formBuilder : FormBuilder, 
    private auth : AuthenticateProvider, 
    private databaseprovider: DatabaseProvider, 
    private platform: Platform,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController) {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
    
        this.loadSessionData();
      }
    })
  
   
    this.loginForm = this.formBuilder.group({
      'username': [''],
      'password': ['']
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];

  }

  login(){

    console.log("form clicked");
    if(this.loginForm.valid){
      console.log("form valid");
      var credentials = ({username : this.username.value, 
      password : this.password.value});
      this.auth.loginMongoDB(credentials).subscribe(
        (data)=>{
          console.log("msg from : "+ data);
          this.presentLoadingDefault();
          this.loginToast("Login Successful");
              this.databaseprovider.addSession(data).then((val)=>{
               // this.loadSessionData();
               this.dismissLoading();

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
    this.databaseprovider.getSession().then(data => {
      this.developers = data;
    })
  }

  addSession() {
    this.databaseprovider.addSession(this.developer['session'])
    .then(data => {
      this.loadSessionData();
    });
    this.developer = {};
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  loginToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

loading : any;
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Login in progress...'
    });
  
    this.loading.present();
  
   
  }
  
  dismissLoading(){
  
   
   this.loading.dismiss();
  
   
  }
}
