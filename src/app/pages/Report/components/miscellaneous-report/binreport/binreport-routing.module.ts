import { Routes, RouterModule } from '@angular/router';
import { BinreportsComponent } from './binreports/binreports.component';
import { WeigherredingsreportComponent } from './weigherredingsreport/weigherredingsreport.component';
import { MillbreakdownreportComponent } from './millbreakdownreport/millbreakdownreport.component';
import { BinreportComponent } from './binreport.component';
const childRoutes: Routes = [
  {
      path: '',
      component: BinreportComponent,
      children: [
          { path: '', redirectTo: 'binreports', pathMatch: 'full' },
          { path: 'binreports', component: BinreportsComponent },
          { path: 'weigherredingsreport', component: WeigherredingsreportComponent },
          { path: 'millbreakdownreport', component: MillbreakdownreportComponent },
            

      ]
  }
];


export const routing = RouterModule.forChild(childRoutes);
