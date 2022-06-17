import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthguardGuard} from './services/authguard.guard';
const routes: Routes = [

  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
   },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthguardGuard],
  },

  {
    path: 'login',
    loadChildren: () => import('./public/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'expense',
    loadChildren: () => import('./expense/expense/expense.module').then( m => m.ExpensePageModule),
    canActivate: [AuthguardGuard],
  },

  {
    path: 'trip',
    loadChildren: () => import('./trip/trip.module').then( m => m.TripPageModule),
    canActivate: [AuthguardGuard],
  },

  {
    path: 'signin',
    loadChildren: () => import('./public/signin/signin.module').then( m => m.SigninPageModule)
  },

  {
    path: 'expreport',
    loadChildren: () => import('./expreport/expreport.module').then( m => m.ExpreportPageModule),
    canActivate: [AuthguardGuard]

  },
  {
    path: 'showitems',
    loadChildren: () => import('./showitems/showitems.module').then( m => m.ShowitemsPageModule),
    canActivate: [AuthguardGuard]

  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then( m => m.AnalyticsPageModule)
  },
  {
    path: 'stocks-tickers',
    loadChildren: () => import('./settings/stocks-tickers/stocks-tickers.module').then( m => m.StocksTickersPageModule)
  },
  {
    path: 'managestock',
    loadChildren: () => import('./stocks/managestock/managestock.module').then( m => m.ManagestockPageModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./stocks/portfolio/portfolio.module').then( m => m.PortfolioPageModule)
  },
]



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
