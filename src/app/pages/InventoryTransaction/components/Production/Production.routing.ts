import { Routes, RouterModule } from '@angular/router';
import { ProductionComponent } from './Production.components';
import { ProcessMasterComponent } from './components/process-master/process-master.component';
import { BomMasterComponent } from './components/bom-master/bom-master.component';
import { ProductionPlanningComponent } from './components/production-planning/production-planning.component';
import { ProductionTransactionComponent } from './components/production-transaction/production-transaction.component';
import { ProductionTransactionSpecialComponent } from './components/production-transaction-special/production-transaction-special.component';
import { ProductionSummaryComponent } from './components/production-summary/production-summary.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ProductionComponent,
        children: [
            { path: '', redirectTo: 'process-master', pathMatch: 'full' },
            /*{ path: 'process-master', component: ProcessMasterComponent },
            { path: 'bom-master', component: BomMasterComponent },
            { path: 'production-planning', component: ProductionPlanningComponent },
            { path: 'production-transaction', component: ProductionTransactionComponent },
            { path: 'production-transaction-special', component: ProductionTransactionSpecialComponent },
            { path: 'production-summary', component: ProductionSummaryComponent }*/
            { path: 'process-master', component: ProcessMasterComponent, data: { title: 'Process Master' } },
            { path: 'bom-master', component: BomMasterComponent, data: { title: 'BOM Master' } },
            { path: 'production-planning', component: ProductionPlanningComponent, data: { title: 'Production Planning' } },
            { path: 'production-transaction', component: ProductionTransactionComponent, data: { title: 'Production Transaction' } },
            { path: 'production-transaction-special', component: ProductionTransactionSpecialComponent, data: { title: 'Production Transaction Special' } },
            { path: 'production-summary', component: ProductionSummaryComponent, data: { title: 'Production Summary' } }

            // { path: 'purchase-order', component: PurchaseOrderComponent },
            // { path: 'quality-check', component: QualityCheckComponent },
            // { path: 'grn', component: GrnComponent },
            // { path: 'l1-selection', component: L1SelectionComponent },
            // { path: 'purchase-bill', component: PurchaseBillComponent },
            // { path: 'loading-advice', component: LoadingAdviceComponent },
            // { path: 'unload-advice', component: UnloadAdviceComponent },
            // { path: 'unload-weighment', component: UnloadWeighmentComponent },
            // { path: 'pur-return-approval-note', component: PurReturnApprovalNoteComponent },
            // { path: 'pur-return-note', component: PurReturnNoteComponent },
            // { path: 'debit-note', component: DebitNoteComponent },
            
            // { path: 'loading-weighment', component: LoadingWeighmentComponent },
              //{ path: 'PeripheralQualityCheck', component: PeripheralQualityCheckComponent },
           
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);