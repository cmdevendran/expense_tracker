import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {BehaviorSubject} from 'rxjs/Rx';
import {Storage} from '@ionic/storage';
import { Platform } from 'ionic-angular/platform/platform';
import {SQLitePorter} from '@ionic-native/sqlite-porter';







/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database : SQLiteObject;
  private databaseReady : BehaviorSubject <boolean>;

  constructor(public http: Http, private sqlitePorter : SQLitePorter, private storage : Storage,
  private sqlite : SQLite, private platform : Platform ) {


        console.log('Hello DatabaseProvider Provider');

    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name : 'session.db',
        location : 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;
        const createTable = "CREATE TABLE IF NOT EXISTS sessiontable(id INTEGER PRIMARY KEY AUTOINCREMENT,session TEXT";
        // this.database.executeSql(createTable,{})
        // .then((val)=>
        //   {
        //       console.log(val);
        //   });
        this.databaseReady.next(true);
        this.storage.get('database_filled').then((val)=>{
          if(val){
              this.databaseReady.next(true);
          }else{
              this.fillDatabase();
          }
        })

      })

    });
  }

  fillDatabase(){
    this.http.get('assets/mysql.sql')
    .map(res=> res.text())
    .subscribe(sql=>{
      this.sqlitePorter.importSqlToDb(this.database,sql)
      .then((data)=>{
        this.databaseReady.next(true);
        this.storage.set('database_filed', true);
      })
      .catch((err)=>{
        console.log(err);
      })
    })
    

  }

  getDatabaseState(){
    return this.databaseReady.asObservable();
  }

  addSession(session){
    let data = [session]
    return this.database.executeSql("DELETE FROM sessiontable",[])
    .then((val=>{
       this.database.executeSql("INSERT INTO sessiontable (session) VALUES (?)", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        return err;
      })
    }))
 
  }

  
  getSession() {
    return this.database.executeSql("SELECT * FROM sessiontable", []).then((data) => {
      let developers = [];
      console.log("data row leng : "+data.rows.length);
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          developers.push({ session: data.rows.item(i).session });
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  // addDeveloper(name, skill, years) {
  //   let data = [name, skill, years]
  //   return this.database.executeSql("INSERT INTO developer (name, skill, yearsOfExperience) VALUES (?, ?, ?)", data).then(data => {
  //     return data;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  // }


 
  // getAllDevelopers() {
  //   return this.database.executeSql("SELECT * FROM developer", []).then((data) => {
  //     let developers = [];
  //     if (data.rows.length > 0) {
  //       for (var i = 0; i < data.rows.length; i++) {
  //         developers.push({ name: data.rows.item(i).name, skill: data.rows.item(i).skill, yearsOfExperience: data.rows.item(i).yearsOfExperience });
  //       }
  //     }
  //     return developers;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return [];
  //   });
  // }

}
