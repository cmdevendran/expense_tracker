import { Injectable } from '@angular/core';
/*********************************** */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

authenticationState = new BehaviorSubject(false);


  constructor(  private storage : Storage,
   ) {

   }

  public setSession(settingName,value){
    return this.storage.set(`${ settingName }`,value);

  }
  public async getSession(settingName){
    return await this.storage.get(`${ settingName }`);
  }
  public async removeSession(settingName){
    return await this.storage.remove(`${ settingName }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  public setAuthState(){
   
    this.authenticationState.next(true);
    console.log("Authstate  : " +this.isAuthenticated())
  }

  public isAuthenticated() {
    return this.authenticationState.value;
  }

}