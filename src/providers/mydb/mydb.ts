import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the MydbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MydbProvider {
db : SQLiteObject;

  constructor( public http: HttpClient,public sq : SQLite) {
    console.log('Hello MydbProvider Provider');
  }

   CreateSqlDatabase(){
    let sqldb = new SQLite();
    //this.db.create({

   // })
    sqldb.create({
        name: "data.db",
        location: "default"
    }).then((db:SQLiteObject) => {
      
        db.executeSql("CREATE TABLE IF NOT EXISTS sessiontable (id INTEGER PRIMARY KEY AUTOINCREMENT, usersession TEXT)", {}).then((data) => {
            console.log("TABLE CREATED: ", data);
        }, (error) => {
            console.error("Unable to execute sql", error);
        })
    }, (error) => {
        console.error("Unable to open database", error);
    });

  }

  addsession(session) {
    let data = session;
    
    return this.db.executeSql("INSERT INTO sessiontable (usersession) VALUES ("+session+")", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
mysession : any;
    getsession(){
      console.log(" from getsession : started ");
      this.db.executeSql('SELECT usersession FROM session', {})
      .then(res => {
        if(res.rows.length>0) {
          this.mysession = res.rows.item(0).usersession;
          //this.balance = this.totalIncome-this.totalExpense;
          console.log(" from getsession : "+ this.mysession);
        }
      })
      .catch(e => console.log(e));
    }
    







}
