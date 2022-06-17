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

import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient) { }

/*   getticker(value): Observable<any> {


    return this.http.post(nodeserver + '/stocks/getTicker', JSON.stringify(''),
      // {headers : new HttpHeaders().set('Authorization', '5a4c50b645e2964054e516c8')}
      //new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
      {
        headers: new HttpHeaders({
          'session': value
        })
      });
  }
 */
  req: HttpRequest<any>
  getticker(value) {
    

  return this.http.post(nodeserver + '/stocks/getTicker', JSON.stringify(''),{
    headers: new HttpHeaders({
      'session': value
    })
  }).pipe(map(res =>res ));

  }

  setStocks(data, session): Observable<any> {
    console.log("session from set Stocks" + data);

  
    return this.http.post(nodeserver + '/stocks/adStock/', JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'session': session,
          'Content-Type': 'application/json'
        })
      });
  }
}
