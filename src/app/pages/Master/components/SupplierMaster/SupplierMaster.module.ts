import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { routing } from './SupplierMaster.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatDialogModule,MatInputModule,MatAutocompleteModule  } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SupplierMasterComponent } from './SupplierMaster.component';
import { SupplierGroupmasterComponent } from './components/SupplierGroupMaster/SupplierGroupMaster.component';
import { SuppliersMasterComponent } from './components/SuppliersMaster/SuppliersMaster.component';
import { TransportergroupComponent } from './components/transportergroup/transportergroup.component';
import { TransportermasterComponent } from './components/transportermaster/transportermaster.component';
import { MastermodalComponent } from './components/mastermodal/mastermodal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TransMasterPopUpModalComponent } from './components/trans-master-pop-up-modal/trans-master-pop-up-modal.component';



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
        HttpModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        SelectAutocompleteModule,
        MatInputModule,
        MatAutocompleteModule
      
        
    ],
    entryComponents:[MastermodalComponent, TransMasterPopUpModalComponent],
    declarations: [
        SupplierMasterComponent,
      
        SupplierGroupmasterComponent,
        SuppliersMasterComponent,
       
        TransportergroupComponent,
       
        TransportermasterComponent,
        MastermodalComponent,
        TransMasterPopUpModalComponent
     
       
       
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



export class SupplierMasterModule { }
