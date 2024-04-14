import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AccountsmasterComponent } from './accountsmaster.component';
import { AccountsmastercategoryComponent } from './components/accountsmastercategory/accountsmastercategory.component';
import { AccountsmastergroupComponent } from './components/accountsmastergroup/accountsmastergroup.component';
import { AccountsmastertypeComponent } from './components/accountsmastertype/accountsmastertype.component';
import { AccountsmasterledgerComponent } from './components/accountsmasterledger/accountsmasterledger.component';

const childRoutes: Routes = 
[
{
  path: '',
  component: AccountsmasterComponent,
  children: 
      [
      { path: '', redirectTo: 'accountsmastercategory', pathMatch: 'full' },
      { path: 'accountsmastercategory', component: AccountsmastercategoryComponent},
      { path: 'accountsmastergroup', component: AccountsmastergroupComponent},
      { path: 'accountsmastertype', component: AccountsmastertypeComponent},
      { path: 'accountsmasterledger', component: AccountsmasterledgerComponent}
      ]
}
];

export const routing = RouterModule.forChild(childRoutes);



