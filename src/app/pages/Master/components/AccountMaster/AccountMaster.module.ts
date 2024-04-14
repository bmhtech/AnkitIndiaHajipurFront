import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './AccountMaster.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule, MatSelectModule  } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AccountMasterComponent } from './AccountMaster.component';
import { AccountGroupMasterComponent } from './components/account-group-master/account-group-master.component';
import { AccountSubgroupMasterComponent } from './components/account-subgroup-master/account-subgroup-master.component';
import { CostCategoryMasterComponent } from './components/cost-category-master/cost-category-master.component';
import { GeneralAccountLedgerMasterComponent } from './components/general-account-ledger-master/general-account-ledger-master.component';
import { NarrationMasterComponent } from './components/narration-master/narration-master.component';
import { CostCentreMasterComponent } from './components/cost-centre-master/cost-centre-master.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



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
        MatProgressSpinnerModule
    ],
    declarations: [
        AccountMasterComponent,
        AccountGroupMasterComponent,
        AccountSubgroupMasterComponent,
        CostCategoryMasterComponent,
        GeneralAccountLedgerMasterComponent,
        NarrationMasterComponent,
        CostCentreMasterComponent,
        
       
       
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
export class AcoountMasterModule { }
