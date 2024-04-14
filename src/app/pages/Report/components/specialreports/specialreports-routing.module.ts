import { Routes, RouterModule } from '@angular/router';
import { SpecialreportsComponent } from './specialreports.component';

const childRoutes: Routes = [
  {
  path: '',
  component: SpecialreportsComponent,
  children: [
      { path: '', redirectTo: 'salesspecial', pathMatch: 'full' },
      { path: 'salesspecial', loadChildren: './salesspecial/salesspecial.module#SalesspecialModule' },
     
  ]
  }
];


export const routing = RouterModule.forChild(childRoutes);
