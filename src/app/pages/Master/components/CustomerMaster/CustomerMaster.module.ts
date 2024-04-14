import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './CustomerMaster.routing';

import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatDialogModule  } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CustomerMasterComponent } from './CustomerMaster.component';
import { CustomerGroupMasterComponent } from './components/CustomerGroupMaster/CustomerGroupMaster.component';
import { CustomersMasterComponent } from './components/CustomersMaster/CustomersMaster.component';
import { MastermodalComponent} from './components/mastermodal/mastermodal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


/* components 
import { PurchaseComponent } from './ItemMaster.component';
import { IndentOrderComponent } from './components/IndentOrder/IndentOrder.component';
import { PurchaseEnquiryComponent } from './components/purchase-enquiry/purchase-enquiry.component';
import { PurchaseQuotationComponent } from './components/purchase-quotation/purchase-quotation.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { QualityCheckComponent } from './components/quality-check/quality-check.component';
import { GrnComponent } from './components/grn/grn.component';
import { L1SelectionComponent } from './components/l1-selection/l1-selection.component';
*/

@NgModule({
    imports: [
        CommonModule,
        routing,
        MatTabsModule,
        MatButtonModule ,
        MatCheckboxModule ,
        MatSelectModule,
         FormsModule,
         ReactiveFormsModule,
         SelectAutocompleteModule,
         MatDialogModule,
         MatProgressSpinnerModule,
    ],
    entryComponents:[MastermodalComponent],

    declarations: [
        CustomerMasterComponent,
      
        CustomerGroupMasterComponent,
        CustomersMasterComponent,
        MastermodalComponent,
       
       
      /*  PurchaseComponent,
        IndentOrderComponent,
        PurchaseEnquiryComponent,
        PurchaseQuotationComponent,
        PurchaseOrderComponent,
        QualityCheckComponent,
        GrnComponent,
        L1SelectionComponent, */
       
    ]
})
export class CustomerMasterModule { }
