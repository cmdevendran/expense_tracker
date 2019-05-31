import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { DatabaseProvider } from '../../providers/database/database';
import { FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    
signupForm : FormGroup;
username: AbstractControl;
password: AbstractControl;
developer = {};
developers = [];
error : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private formBuilder :FormBuilder,
  private auth : AuthenticateProvider,
  private databaseprovider : DatabaseProvider,
  private viewCtrl : ViewController,
  private appCtrl : App) {

    this.signupForm = this.formBuilder.group({
      'username': new FormControl([''],Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl([''],
      Validators.compose([
       
        Validators.minLength(8),
       
        Validators.required
      ])) 
    })
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  SignUp(){
    console.log("form clicked");
    if(this.signupForm.valid){
      console.log("form valid");
      this.username = this.signupForm.controls['username'];
      this.password = this.signupForm.controls['password'];
      var credentials = ({username : this.username.value, 
      password : this.password.value});
      this.auth.registerNewUser(credentials).subscribe(
        (data)=>{
          console.log("msg from : "+ data);
              this.databaseprovider.addSession(data).then((val)=>{
               // this.loadSessionData();
               
          }) 
          //this.gotoHome();
          
        },
        (error)=>{
        //  this.error = error;
          console.log("error : " + error);
        },
        ()=>{
          console.log("call completed");
        }
        

      
      );
      this.gotoHome();

    }
  }

  loadSessionData(){
    this.databaseprovider.getSession().then(data => {
      this.developers = data;
    })
  }

  gotoHome(){
    this.viewCtrl.dismiss();
   // this.appCtrl.getRootNav().push(HomePage);
  }

  validation_messages = {
    'username': [
        { type: 'required', message: 'Username is required.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      'password': [
        { type: 'required', message: 'password required' },
        { type: 'minlength', message: 'Username must be at least 8 characters long.' }
      ],
    

    }

}
