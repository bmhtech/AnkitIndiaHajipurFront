import { Routes, RouterModule } from '@angular/router';
import { StoreTransactionComponent } from './store-transaction.component';
import { StoreIssueNoteComponent } from './components/store-issue-note/store-issue-note.component';
import { WarehouseToWarehouseStoreTransferComponent } from './components/warehouse-to-warehouse-store-transfer/warehouse-to-warehouse-store-transfer.component';

const childRoutes: Routes = [
  {
      path: '',
      component: StoreTransactionComponent,
      children: [
          { path: '', redirectTo: 'store-issue-note', pathMatch: 'full' },
          { path: 'store-issue-note', component: StoreIssueNoteComponent },
          { path: 'warehouse-to-warehouse-store-transfer', component: WarehouseToWarehouseStoreTransferComponent }
      ]
  }
];
export const routing = RouterModule.forChild(childRoutes);
