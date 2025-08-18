import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './transport.component';
import { SalesTransportComponent } from './components/sales-transport/sales-transport/sales-transport.component';
import { PurchaseTransportComponent } from './components/sales-transport/purchase-transport/purchase-transport.component';

const childRoutes: Routes = [
  {
      path: '',
      component: TransportComponent,
      children: [
          { path: '', redirectTo: 'sales-transport', pathMatch: 'full' },
          /*{ path: 'sales-transport', component: SalesTransportComponent },
          { path: 'purchase-transport', component: PurchaseTransportComponent },*/
          { path: 'sales-transport', component: SalesTransportComponent, data: { title: 'Sales Transport' } },
          { path: 'purchase-transport', component: PurchaseTransportComponent, data: { title: 'Purchase Transport' } },
      ]
  }
];
export const routing = RouterModule.forChild(childRoutes);

