import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './BrokerMaster.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule  } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrokerMasterComponent } from './BrokerMaster.component';
import { BrokerGroupMasterComponent } from './components/BrokerGroupMaster/BrokerGroupMaster.component';
import { BrokersMasterComponent } from './components/brokers-master/brokers-master.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';


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
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatInputModule,
        SelectAutocompleteModule
    ],
    declarations: [
        BrokerMasterComponent,
      
        BrokerGroupMasterComponent,
      
        BrokersMasterComponent,
      
       
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
export class BrokerModule { }
