import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { AccountComponent } from './components/account/account.component';
import { AccountledgerpostingComponent } from './components/accountledgerposting/accountledgerposting.component';


const childRoutes: Routes = [
  {
      path: '',
      component: AccountsComponent,
      children: [
          
        { path: '', redirectTo: 'account', pathMatch: 'full' },
        { path: 'account', component: AccountComponent },
        { path: 'accountledgerposting', component: AccountledgerpostingComponent },
        
               
      ]
  }
];



export const routing = RouterModule.forChild(childRoutes);