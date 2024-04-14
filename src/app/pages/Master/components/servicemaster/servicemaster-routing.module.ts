import { Routes, RouterModule } from '@angular/router';
import { SubservicemasterComponent } from './components/subservicemaster/subservicemaster.component';

import { ServicemasterComponent } from './servicemaster.component';

const childRoutes: Routes = [
  {
      path: '',
      component: ServicemasterComponent,
      children: [
          { path: '', redirectTo: 'servicemaster', pathMatch: 'full' },
          { path: 'servicemaster', component: SubservicemasterComponent },
       
      ]
  }
];

export const routing = RouterModule.forChild(childRoutes);