import { Routes, RouterModule } from '@angular/router';
import { SalesspecialComponent } from './salesspecial.component';
import { SalessummaryreportsComponent } from './salessummaryreports/salessummaryreports.component';
import { SalesordermiscleaneousreportComponent } from './salesordermiscleaneousreport/salesordermiscleaneousreport.component';
import { SalesinvoicesummaryreportComponent } from './salesinvoicesummaryreport/salesinvoicesummaryreport.component';
import { SalesinvoiceMiscellaneousreportComponent } from './salesinvoice-miscellaneousreport/salesinvoice-miscellaneousreport.component';
import { PurchaseordermiscleaneousreportComponent } from './purchaseordermiscleaneousreport/purchaseordermiscleaneousreport.component';
import { PurchasebillmiscleaneousreportComponent } from './purchasebillmiscleaneousreport/purchasebillmiscleaneousreport.component';
import { ProductionreportComponent } from './productionreport/productionreport.component';
import { SpecialproductionreportComponent } from './specialproductionreport/specialproductionreport.component';
import { SolarpowergenerationComponent } from './solarpowergeneration/solarpowergeneration.component';
import { InverterwisesolarpowergenerationComponent } from './inverterwisesolarpowergeneration/inverterwisesolarpowergeneration.component';
import { SolarpowergenerationwithpowercutComponent } from './solarpowergenerationwithpowercut/solarpowergenerationwithpowercut.component';
import { SolarpowergenerationwithpowercutreportComponent } from './solarpowergenerationwithpowercutreport/solarpowergenerationwithpowercutreport.component';

const childRoutes: Routes = [
  {
    path: '',
    component: SalesspecialComponent,
    children: [
        { path: '', redirectTo: 'salessummaryreports', pathMatch: 'full' },
        { path: 'salessummaryreports', component: SalessummaryreportsComponent },
        { path: 'salesordermiscleaneousreport', component: SalesordermiscleaneousreportComponent },
        { path: 'salesinvoicesummaryreport', component: SalesinvoicesummaryreportComponent },
        { path: 'salesinvoice-miscellaneousreport', component: SalesinvoiceMiscellaneousreportComponent },
        { path: 'purchaseordermiscleaneousreport', component: PurchaseordermiscleaneousreportComponent },
        { path: 'purchasebillmiscleaneousreport', component: PurchasebillmiscleaneousreportComponent },
        { path: 'productionreport', component: ProductionreportComponent },
        { path: 'specialproductionreport', component: SpecialproductionreportComponent },
        { path: 'solarpowergeneration', component: SolarpowergenerationComponent },
        { path: 'inverterwisesolarpowergeneration', component: InverterwisesolarpowergenerationComponent },
        { path: 'solarpowergenerationwithpowercut', component: SolarpowergenerationwithpowercutComponent },
        { path: 'solarpowergenerationwithpowercutreport', component: SolarpowergenerationwithpowercutreportComponent }
    ]
}
];

export const routing = RouterModule.forChild(childRoutes);
