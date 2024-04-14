import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './salesspecial-routing.module';
import { SalesspecialComponent } from './salesspecial.component';
import {NgxPrintModule} from 'ngx-print';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule, ThemePalette } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatAutocompleteModule,MatInputModule} from '@angular/material';
import {  MatPaginatorModule  } from '@angular/material/paginator';
import { SalessummaryreportsComponent } from './salessummaryreports/salessummaryreports.component';
import { SalesordermiscleaneousreportComponent } from './salesordermiscleaneousreport/salesordermiscleaneousreport.component';
import { SalesinvoicesummaryreportComponent } from './salesinvoicesummaryreport/salesinvoicesummaryreport.component';
import { SalesinvoiceMiscellaneousreportComponent } from './salesinvoice-miscellaneousreport/salesinvoice-miscellaneousreport.component';
import { PurchaseordermiscleaneousreportComponent } from './purchaseordermiscleaneousreport/purchaseordermiscleaneousreport.component';
import { PurchasebillmiscleaneousreportComponent } from './purchasebillmiscleaneousreport/purchasebillmiscleaneousreport.component';
import { ProductionreportComponent } from './productionreport/productionreport.component';
import { PurOrderMiscRepPopupComponent } from './pur-order-misc-rep-popup/pur-order-misc-rep-popup.component';
import { SpecialproductionreportComponent } from './specialproductionreport/specialproductionreport.component';
import { PurchaseordertrackdownpopupComponent } from './purchaseordertrackdownpopup/purchaseordertrackdownpopup.component';
import { SalesOrderMiscRepPopUpComponent } from './sales-order-misc-rep-pop-up/sales-order-misc-rep-pop-up.component';
import { SolarpowergenerationComponent } from './solarpowergeneration/solarpowergeneration.component';
import { InverterwisesolarpowergenerationComponent } from './inverterwisesolarpowergeneration/inverterwisesolarpowergeneration.component';
import { SolarpowergenerationwithpowercutComponent } from './solarpowergenerationwithpowercut/solarpowergenerationwithpowercut.component';
import { SolarpowergenerationwithpowercutreportComponent } from './solarpowergenerationwithpowercutreport/solarpowergenerationwithpowercutreport.component';

@NgModule({
  declarations: [
    SalesspecialComponent,
    SalessummaryreportsComponent,
    SalesordermiscleaneousreportComponent,
    SalesinvoicesummaryreportComponent,
    SalesinvoiceMiscellaneousreportComponent,
    PurchaseordermiscleaneousreportComponent,
    PurchasebillmiscleaneousreportComponent,
    ProductionreportComponent,
    PurOrderMiscRepPopupComponent,
    SpecialproductionreportComponent,
    PurchaseordertrackdownpopupComponent,
    SalesOrderMiscRepPopUpComponent,
    SolarpowergenerationComponent,
    InverterwisesolarpowergenerationComponent,
    SolarpowergenerationwithpowercutComponent,
    SolarpowergenerationwithpowercutreportComponent,
  ],
  imports: [
    CommonModule,
    routing,
    MatRadioModule,
    MatTabsModule, 
     MatCheckboxModule,
     MatSelectModule ,
     MatDialogModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      SelectAutocompleteModule,
      MatAutocompleteModule,
      MatInputModule,
      MatPaginatorModule,
      NgxPrintModule
  ],
  entryComponents:[
        PurOrderMiscRepPopupComponent,
        PurchaseordertrackdownpopupComponent,
        SalesOrderMiscRepPopUpComponent
      ]
})
export class SalesspecialModule { }
