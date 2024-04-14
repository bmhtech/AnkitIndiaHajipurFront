import { Routes, RouterModule } from '@angular/router';
import { OtherMasterComponent } from './OtherMaster.component';
import { AcceptanceNormsMasterComponent } from './components/acceptance-norms-master/acceptance-norms-master.component';
import { PaymentModeMasterComponent } from './components/payment-mode-master/payment-mode-master.component';
import { PaymentTermMasterComponent } from './components/payment-term-master/payment-term-master.component';
import { QCRulesSetupComponent } from './components/qcrules-setup/qcrules-setup.component';
import { TDSMasterComponent } from './components/tdsmaster/tdsmaster.component';
import { ChargesMasterComponent } from './components/charges-master/charges-master.component';
import { ZoneMasterComponent } from './components/zone-master/zone-master.component';
import { ChannelCustomerMasterComponent } from './components/channel-customer-master/channel-customer-master.component';
import { LoadingPointComponent } from './components/loading-point/loading-point.component';
import { WeighmentChargesMasterComponent } from './components/weighment-charges-master/weighment-charges-master.component';
import { ShopFloorMasterComponent } from './components/shop-floor-master/shop-floor-master.component';
import { OtherPartyMasterComponent } from './components/other-party-master/other-party-master.component';
import { OtherItemMasterComponent } from './components/other-item-master/other-item-master.component';
import { StoreInventoryChargesComponent } from './components/store-inventory-charges/store-inventory-charges.component';

const childRoutes: Routes = [
    {
        path: '',
        component: OtherMasterComponent,
        children: [
            { path: '', redirectTo: 'AccNorms', pathMatch: 'full' },
            { path: 'AccNorms', component: AcceptanceNormsMasterComponent },
            { path: 'PaymentMode', component: PaymentModeMasterComponent },
            { path: 'PaymentTerm', component: PaymentTermMasterComponent },
            { path: 'qcrulessetup', component: QCRulesSetupComponent },
            { path: 'tds-master', component: TDSMasterComponent },
            { path: 'charges-master', component: ChargesMasterComponent },
            { path: 'zone-master', component: ZoneMasterComponent },
            { path: 'ChannelCustomerMasterComponent', component: ChannelCustomerMasterComponent },
            { path: 'WeighmentChargesMaster', component: WeighmentChargesMasterComponent },
            { path: 'loadingPoint', component: LoadingPointComponent },
            { path: 'shop-floor-master', component: ShopFloorMasterComponent },
            { path: 'otherPartyMaster', component: OtherPartyMasterComponent },
            { path: 'otherItemMaster', component: OtherItemMasterComponent },
            { path: 'storeInventoryCharges', component: StoreInventoryChargesComponent },
         /*   { path: 'IndentOrder', component: IndentOrderComponent },
            { path: 'purchase-enquiry', component: PurchaseEnquiryComponent },
            { path: 'purchase-quotation', component: PurchaseQuotationComponent },
            { path: 'purchase-order', component: PurchaseOrderComponent },
            { path: 'quality-check', component: QualityCheckComponent },
            { path: 'grn', component: GrnComponent },
            { path: 'l1-selection', component: L1SelectionComponent },
*/
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);