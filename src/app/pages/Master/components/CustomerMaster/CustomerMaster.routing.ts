import { Routes, RouterModule } from '@angular/router';
import { CustomerMasterComponent } from './CustomerMaster.component';

import { CustomerGroupMasterComponent } from './components/CustomerGroupMaster/CustomerGroupMaster.component';
import { CustomersMasterComponent } from './components/CustomersMaster/CustomersMaster.component';

/*import { ItemTypeComponent } from './components/IndentOrder/IndentOrder.component';
import { PurchaseEnquiryComponent } from './components/purchase-enquiry/purchase-enquiry.component';
import { PurchaseQuotationComponent } from './components/purchase-quotation/purchase-quotation.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { QualityCheckComponent } from './components/quality-check/quality-check.component';
import { GrnComponent } from './components/grn/grn.component';
import { L1SelectionComponent } from './components/l1-selection/l1-selection.component';
*/

const childRoutes: Routes = [
    {
        path: '',
        component: CustomerMasterComponent,
        children: [
            { path: '', redirectTo: 'CustomerGroup', pathMatch: 'full' },
            { path: 'CustomerGroup', component: CustomerGroupMasterComponent },
            { path: 'CustomersMaster', component: CustomersMasterComponent },
         
     //   { path: 'itemsmaster', component: ItemsMasterComponent },
            
         /*   { path: 'IndentOrder', component: IndentOrderComponent },
            { path: 'purchase-enquiry', component: PurchaseEnquiryComponent },
            { path: 'purchase-quotation', component: PurchaseQuotationComponent },
            { path: 'purchase-order', component: PurchaseOrderComponent },
            { path: 'quality-check', component: QualityCheckComponent },
            { path: 'grn', component: GrnComponent },
            { path: 'l1-selection', component: L1SelectionComponent },
*/
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);