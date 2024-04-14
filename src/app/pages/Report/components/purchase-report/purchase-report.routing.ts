import { Routes, RouterModule } from '@angular/router';


// import { GroupMasterComponent } from './components/GroupMaster/GroupMaster.component';
// import { SubGroupComponent } from './components/sub-group/sub-group.component';
// import { LedgerMasterComponent } from './components/ledger-master/ledger-master.component';
// import { NarrationMasterComponent } from './components/narration-master/narration-master.component';
// import { ItemTypeMasterComponent } from './components/item-type-master/item-type-master.component';
import { PurchaseReportComponent } from './purchase-report.component';
import { PurchasereportComponent } from './components/purchasereport/purchasereport.component';
import { PurchaseReportFieldsComponent } from './components/purchase-report-fields/purchase-report-fields.component';
import { PurchaseDynamicReportComponent } from './components/purchase-dynamic-report/purchase-dynamic-report.component';


const childRoutes: Routes = [
    {  path: '', component: PurchaseReportComponent,
        children: [
            { path: '', redirectTo: 'purchasereport', pathMatch: 'full' },
            { path: 'purchasereport', component: PurchasereportComponent },
            { path: 'purchasereportfield', component: PurchaseReportFieldsComponent },
            { path: 'purchaseDynamicReport', component: PurchaseDynamicReportComponent },
            // { path: 'SubGroup', component: SubGroupComponent },
            // { path: 'LedgerMaster', component: LedgerMasterComponent },
            // { path: 'NarrationMaster', component: NarrationMasterComponent },
            // { path: 'ItemTypeMaster', component: ItemTypeMasterComponent },
    
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);