import { Routes, RouterModule } from '@angular/router';
import { SalesReportComponent } from './SalesReport.component';
import { PartyLedgerComponent } from './components/party-ledger/party-ledger.component';
import { ControlAccountComponent } from './components/control-account/control-account.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesRegistrationFieldsComponent } from './components/sales-registration-fields/sales-registration-fields.component';
import { Sales2Component } from './components/sales2/sales2.component';
import { SalesDynamicReportViewComponent } from './components/sales-dynamic-report-view/sales-dynamic-report-view.component';
import { SalesDynamicSortComponent } from './components/sales-dynamic-sort/sales-dynamic-sort.component';
import { SalesreportSortingComponent } from './components/salesreport-sorting/salesreport-sorting.component';


const childRoutes: Routes = [
    {
        path: '',
        component: SalesReportComponent,
        children: [
            { path: '', redirectTo: 'partyledger', pathMatch: 'full' },
            { path: 'partyledger', component: PartyLedgerComponent },
            { path: 'controlaccount', component: ControlAccountComponent },
            // { path: 'Sales', component: SalesComponent },
            // { path: 'SalesFields', component: SalesRegistrationFieldsComponent }, 
            { path: 'SalesReportDynamic', component: Sales2Component },
            { path: 'SalesReportDynamicView', component: SalesDynamicReportViewComponent },
            // { path: 'SalesInvoiceSort', component: SalesDynamicSortComponent },
            { path: 'Salesreportsorting', component: SalesreportSortingComponent },
            //SalesreportSortingComponent
        ]
    }
];


export const routing = RouterModule.forChild(childRoutes);