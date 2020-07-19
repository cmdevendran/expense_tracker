import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
authstate = false;
  constructor(private dbservice : DatabaseService, private router : Router) {}
  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        this.dbservice.getSession("session").then(user => {
          //resolve(true)
           if (user) {
            console.log('User is logged in');
            resolve(true);
          } else {
            console.log('User is not logged in');
            resolve(false);
          } 
        });
      });
    }
  
  
}
