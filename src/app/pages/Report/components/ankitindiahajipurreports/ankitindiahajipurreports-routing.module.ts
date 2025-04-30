import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnkitindiahajipurreportsComponent } from './ankitindiahajipurreports.component';
import { AisalesreportComponent } from './aisalesreport/aisalesreport.component';

const childRoutes: Routes = [
  {
      path: '',
      component: AnkitindiahajipurreportsComponent,
      children: [
          { path: '', redirectTo: 'aisales', pathMatch: 'full' },
          //{ path: 'aapurchase', component: AapurchasereportComponent },
          { path: 'aisales', component: AisalesreportComponent },
          //{ path: 'aawgt', component: AawgtreportComponent },
         // { path: 'aastockreport', component: StockReportsComponent },
          //{ path: 'aaqc', component: AaqcreportComponent },
         // { path: 'aayogproductionreports', component: AayogProductionReportsComponent },
      ]
  }
];


export const routing = RouterModule.forChild(childRoutes);
