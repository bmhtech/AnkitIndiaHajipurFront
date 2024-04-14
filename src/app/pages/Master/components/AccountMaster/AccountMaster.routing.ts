import { Routes, RouterModule } from '@angular/router';
import { AccountMasterComponent } from './AccountMaster.component';
import { AccountGroupMasterComponent } from './components/account-group-master/account-group-master.component';
import { AccountSubgroupMasterComponent } from './components/account-subgroup-master/account-subgroup-master.component';
import { CostCategoryMasterComponent } from './components/cost-category-master/cost-category-master.component';
import { GeneralAccountLedgerMasterComponent } from './components/general-account-ledger-master/general-account-ledger-master.component';
import { NarrationMasterComponent } from './components/narration-master/narration-master.component';
import { CostCentreMasterComponent } from './components/cost-centre-master/cost-centre-master.component';






const childRoutes: Routes = [
    {
        path: '',
        component: AccountMasterComponent,
        children: [
            { path: '', redirectTo: 'accountgroup', pathMatch: 'full' },
            { path: 'accountgroup', component: AccountGroupMasterComponent },
            { path: 'accountsubgroup', component: AccountSubgroupMasterComponent },
            { path: 'accountledger', component: GeneralAccountLedgerMasterComponent },
            { path: 'categorymaster', component: CostCategoryMasterComponent },
            { path: 'costcentre', component: CostCentreMasterComponent },
            { path: 'narrationmaster', component: NarrationMasterComponent },
            
   
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);