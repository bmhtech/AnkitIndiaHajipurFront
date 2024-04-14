import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnujsirrportsComponent } from './anujsirrports.component';
import { PendingporeportComponent } from './pendingporeport/pendingporeport.component';
import { SalesdispatchreportComponent } from './salesdispatchreport/salesdispatchreport.component';
import { WheatunloadingmasterreportComponent } from './wheatunloadingmasterreport/wheatunloadingmasterreport.component';
import { DailyweigherreportComponent } from './dailyweigherreport/dailyweigherreport.component';
import { SaleorderreportComponent } from './saleorderreport/saleorderreport.component';

const childRoutes: Routes = [
  {
      path: '',
      component: AnujsirrportsComponent,
      children: [
          { path: '', redirectTo: 'pendingporeport', pathMatch: 'full' },
          { path: 'pendingporeport', component: PendingporeportComponent },
          { path: 'salesorderreport', component: SaleorderreportComponent },
          { path: 'salesdispatchreport', component: SalesdispatchreportComponent },
          { path: 'wheatunloadingmasterreport', component: WheatunloadingmasterreportComponent },
          { path: 'dailyweigherreport', component: DailyweigherreportComponent }

      ]
  }
];


export const routing = RouterModule.forChild(childRoutes);