import { Routes, RouterModule } from '@angular/router';
import { ReportComponents } from './Report.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ReportComponents,
        children: [
            { path: '', redirectTo: 'salesreport', pathMatch: 'full' },
            { path: 'salesreport', loadChildren: './components/SalesReport/SalesReport.module#SalesReportModule'},
            { path: 'miscellaneousreport', loadChildren: './components/miscellaneous-report/miscellaneous-report.module#MiscellaneousReportModule' },
            { path: 'specialreports', loadChildren: './components/specialreports/specialreports.module#SpecialreportsModule' },
            { path: 'anujsirrports', loadChildren: './components/anujsirrports/anujsirrports.module#AnujsirrportsModule' },
            { path: 'ankitindiareports', loadChildren: './components/ankitindiahajipurreports/ankitindiahajipurreports.module#AnkitindiahajipurreportsModule' },
            
            // { path: 'purchase_report', loadChildren: './components/purchase-report/purchase-report.module#PurchaseReportModule' },
               
        ]
    }
];



export const routing = RouterModule.forChild(childRoutes);