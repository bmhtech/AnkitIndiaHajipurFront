import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './OtherMaster.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { OtherMasterComponent } from './OtherMaster.component';
import { AcceptanceNormsMasterComponent } from './components/acceptance-norms-master/acceptance-norms-master.component';
import { PaymentModeMasterComponent } from './components/payment-mode-master/payment-mode-master.component';
import { PaymentTermMasterComponent } from './components/payment-term-master/payment-term-master.component';
import { QCRulesSetupComponent } from './components/qcrules-setup/qcrules-setup.component';
import { TDSMasterComponent } from './components/tdsmaster/tdsmaster.component';
import { ChargesMasterComponent } from './components/charges-master/charges-master.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TaxModalComponent } from './components/tax-modal/tax-modal.component';
import {MatRadioModule} from '@angular/material/radio';
import { ZoneMasterComponent } from './components/zone-master/zone-master.component';
import { ChannelCustomerMasterComponent } from './components/channel-customer-master/channel-customer-master.component';
import { LoadingPointComponent } from './components/loading-point/loading-point.component';
import { WeighmentChargesMasterComponent } from './components/weighment-charges-master/weighment-charges-master.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { OthermasterTaxPopupComponent } from './components/othermaster-tax-popup/othermaster-tax-popup.component';
import { ShopFloorMasterComponent } from './components/shop-floor-master/shop-floor-master.component';
import { OtherPartyMasterComponent } from './components/other-party-master/other-party-master.component';
import { OtherItemMasterComponent } from './components/other-item-master/other-item-master.component';
import { StoreInventoryChargesComponent } from './components/store-inventory-charges/store-inventory-charges.component';


@NgModule({
    imports: [
        CommonModule,
        routing,
        MatTabsModule,
        MatButtonModule ,
        MatCheckboxModule ,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        SelectAutocompleteModule,
        MatDialogModule,
        MatAutocompleteModule, 
        MatInputModule,
        MatRadioModule,
    ],
    exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],
    entryComponents:[TaxModalComponent, OthermasterTaxPopupComponent],
    declarations: [
        OtherMasterComponent,
        AcceptanceNormsMasterComponent,
        PaymentModeMasterComponent,
        PaymentTermMasterComponent,
        QCRulesSetupComponent,
        TDSMasterComponent,
        ChargesMasterComponent,
        TaxModalComponent,
        ZoneMasterComponent,
        ChannelCustomerMasterComponent,
        LoadingPointComponent,
        WeighmentChargesMasterComponent,
        OthermasterTaxPopupComponent,
        ShopFloorMasterComponent,
        OtherPartyMasterComponent,
        OtherItemMasterComponent,
        StoreInventoryChargesComponent,
  

       
       
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
export class OtherMasterModule { }
