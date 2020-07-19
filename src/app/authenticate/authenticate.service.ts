import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { nodeserver } from '../../environments/environment'

import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpRequest} from '@angular/common/http';
//import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { MethodCall } from '@angular/compiler';
import { DatabaseService } from '../database/database.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  userId: any;


  mysession: '5a4c50b645e2964054e516c8';

  results: string[];
  constructor(public http: HttpClient, private storage: Storage
//    private databaseprovider: DatabaseProvider) {
  ) {
    console.log('Hello AuthenticateProvider Provider');
  }

  loginMongoDB(logindata) {
    //console.log("data calling : "+JSON.stringify(logindata));
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(nodeserver + '/authenticate/rest/login/', logindata, { headers: headers }).pipe(map(res => res));
      //  return this.http.post(nodeserver+'/authenticate/rest/login/', JSON.stringify(logindata))
     // 
  }

  registerNewUser(registerdetails){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(nodeserver + '/authenticate/rest/userregister/', registerdetails, { headers: headers });
      
  }

  req: HttpRequest<any>
  getExpenseCategories(userid) {
    
  console.log("get Exo cat L "+ userid)

  return this.http.post(nodeserver + '/expense/getcat/', JSON.stringify(''),{
    headers: new HttpHeaders({
      'session': userid
    })
  }).pipe(map(res =>res ));
   // .pipe(map(res => res));

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


      return this.http.post(nodeserver + '/expense/getcat/', JSON.stringify(''),
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

    
      return this.http.post(nodeserver + '/expense/postexp/', JSON.stringify(data),
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
      return this.http.post(nodeserver + '/expense/getexpenses/', JSON.stringify(credentials),

        {
          headers: new HttpHeaders({
            'session': session,
            'Content-Type': 'application/json'

          })

        })
      // return this.expenses;
    }

    deleteExp(session, data): Observable<any>{
      return this.http.post(nodeserver + '/expense/deleteexp/', JSON.stringify(data),
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
    return this.http.post(nodeserver + '/trip/recordtrip/', JSON.stringify(data),
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
    return this.http.post(nodeserver + '/trip/getrecenttrips/', JSON.stringify(''),
      {
        headers: new HttpHeaders({
          'session': session,
          //'Content-Type': 'application/json'
        })
      });
  }

  deleteTrip(session, data): Observable<any>{
    return this.http.post(nodeserver + '/trip/deletetrip/', JSON.stringify(data),
    {
      headers: new HttpHeaders({
        'session': session,
        'Content-Type': 'application/json'
      })
    });

  }



}
