import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate/authenticate.service'
import { DatabaseService } from '../database/database.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
cats : any[]
re : any;


  constructor(private databaseprovider : DatabaseService, private auth : AuthenticateService) {



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
    }
  
  }
