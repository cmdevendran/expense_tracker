import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, HttpModule, RequestOptions } from '@angular/http';
//import {HttpHeaders} from '@angular/http/http'
import { Injectable } from '@angular/core';
import { nodeserver } from '../../env/environment'
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { MethodCall } from '@angular/compiler';
import { DatabaseProvider } from '../database/database';



/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
.map(res => res.results as Order[] || []);
*/

@Injectable()
export class AuthenticateProvider {
  userId: any;

  mysession: '5a4c50b645e2964054e516c8';

  results: string[];
  constructor(public http1: HttpClient, private http: Http, private storage: Storage,
    private databaseprovider: DatabaseProvider) {
    console.log('Hello AuthenticateProvider Provider');
  }

  loginMongoDB(logindata) {
    //console.log("data calling : "+JSON.stringify(logindata));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(nodeserver + '/authenticate/rest/login/', JSON.stringify(logindata), { headers: headers })
      //  return this.http.post(nodeserver+'/authenticate/rest/login/', JSON.stringify(logindata))
      .map(res => res.json());
  }

  registerNewUser(logindata){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(nodeserver + '/authenticate/rest/userregister/', JSON.stringify(logindata), { headers: headers })
      //  return this.http.post(nodeserver+'/authenticate/rest/login/', JSON.stringify(logindata))
      .map(res => res.json());
  }


  getExpenseCategories() {
    var headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('session', this.userId);
    return this.http.post(nodeserver + '/expense/getcat/', JSON.stringify(''), { headers: headers })
      .map(res => res.json());

  }





  // setExpenseItem(data){}

  setSessionStorage(data) {
    //console.log("from sess storage : "+JSON.stringify(data._id));
    this.userId = data;
    this.storage.set('userId', data);
  }


  uid: any;
  /**
   * USED FOR EXPENSE CLAIMS ONLY (expense.js)
   * 
   * START
   * 
   * 
   * 
   */
    // Get the categories for Expenses
    getcats(value): Observable<any> {


      return this.http1.post(nodeserver + '/expense/getcat/', JSON.stringify(''),
        // {headers : new HttpHeaders().set('Authorization', '5a4c50b645e2964054e516c8')}
        //new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
        {
          headers: new HttpHeaders({
            'session': value
          })
        });
    }

    // Save Expenses item to mongodb
    setExpenseItem(data, session): Observable<any> {
      console.log("session from setExpenseItem" + session);
      console.log("session from setExpenseItem" + data);
      return this.http1.post(nodeserver + '/expense/postexp/', JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'session': session,
            'Content-Type': 'application/json'
          })
        });
    }

    // get the expense items from mongodb
    getExpenses(session, credentials): Observable<any> {

      console.log("Auth provider Method get expenses" + session);
      return this.http1.post(nodeserver + '/expense/getexpenses/', JSON.stringify(credentials),

        {
          headers: new HttpHeaders({
            'session': session,
            'Content-Type': 'application/json'

          })

        })
      // return this.expenses;
    }

    deleteExp(session, data): Observable<any>{
      return this.http1.post(nodeserver + '/expense/deleteexp/', JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'session': session,
          'Content-Type': 'application/json'
        })
      });
  
    }

  /**
  * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  USED FOR EXPENSE CLAIMS ONLY 
  * 
  * *****************   END ****************************
  *  
  * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  */



  /**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   * 
   *          TRIPS FORM DETAILS
   * 
   * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   */

  setTrips(session,data): Observable<any> {
    console.log("session from setExpenseItem" + session);
    console.log("session from setExpenseItem" + data);
    return this.http1.post(nodeserver + '/trip/recordtrip/', JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'session': session,
          'Content-Type': 'application/json'
        })
      });
  }



  getRecentTrips(session) : Observable<any>{
    console.log("session from setExpenseItem" + session);
   // console.log("session from setExpenseItem" + data);
    return this.http1.post(nodeserver + '/trip/getrecenttrips/', JSON.stringify(''),
      {
        headers: new HttpHeaders({
          'session': session,
          //'Content-Type': 'application/json'
        })
      });
  }

  deleteTrip(session, data): Observable<any>{
    return this.http1.post(nodeserver + '/trip/deletetrip/', JSON.stringify(data),
    {
      headers: new HttpHeaders({
        'session': session,
        'Content-Type': 'application/json'
      })
    });

  }



}
