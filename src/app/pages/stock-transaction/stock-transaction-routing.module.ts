
import { Routes, RouterModule } from '@angular/router';
import { StoredashboardComponent } from './components/storedashboard/storedashboard.component';
import { ShopflooraccessComponent } from './components/shopflooraccess/shopflooraccess.component';
import { StockTransactionComponent } from './stock-transaction.component';
import { ViewstoreComponent } from './components/viewstore/viewstore.component';
import { RequisitionComponent } from './components/requisition/requisition.component';
import { IssuestockComponent } from './components/issuestock/issuestock.component';


const childRoutes: Routes = [
  {
    path: '',
        component: StockTransactionComponent,
        children: [
          { path: '', redirectTo: 'storeflooraccess', pathMatch: 'full' },
          { path: 'storeflooraccess', component: ShopflooraccessComponent},
          { path: 'storedashboard', component: StoredashboardComponent },
          { path: 'requisition', component: RequisitionComponent },
          { path: 'issuestock', component: IssuestockComponent },
          { path: 'viewstore', component: ViewstoreComponent },
         
        ]
  }];

export const routing = RouterModule.forChild(childRoutes);