import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './OtherPartnerMaster.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule  } from '@angular/material';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { OtherPartnerMasterComponent } from './OtherPartnerMaster.component';
import { OtherPartnerGroupMasterComponent } from './components/OtherPartnerGroupMaster/OtherPartnerGroupMaster.component';
import { OtherPartnersComponent } from './components/other-partners/other-partners.component';
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
        MatProgressSpinnerModule,
    ],
    declarations: [
        OtherPartnerMasterComponent,
        OtherPartnerGroupMasterComponent,
        OtherPartnersComponent,
     
       
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
export class OtherPartnerMasterModule { }
