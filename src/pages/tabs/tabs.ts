import { Component } from '@angular/core';


import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ExpensePage } from '../expense/expense';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExpensePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
