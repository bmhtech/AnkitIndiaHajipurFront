import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './StockTransfer.routing';
import { StockTransferComponent } from './StockTransfer.component';

import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatRadioModule,MatDialogModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';

import { IndentOrderComponent } from './components/indent-order/indent-order.component';
import { StockTransfersComponent } from './components/stock-transfers/stock-transfers.component';
import { StockQcPopupComponent } from './components/stock-qc-popup/stock-qc-popup.component';
import { StockItemPopupComponent } from './components/stock-item-popup/stock-item-popup.component';
import { StockTaxPopupComponent } from './components/stock-tax-popup/stock-tax-popup.component';
import { StockTransferChallanComponent } from './components/stock-transfer-challan/stock-transfer-challan.component';
import { StockTransferInvoiceComponent } from './components/stock-transfer-invoice/stock-transfer-invoice.component';

import { StockTransferChallanPopUpComponent } from './components/stock-transfer-challan-pop-up/stock-transfer-challan-pop-up.component';

import { StkChallanStkTransferPopupComponent } from './components/stk-challan-stk-transfer-popup/stk-challan-stk-transfer-popup.component';
import { StockTransferLoadingAdvicePopupComponent } from './components/stock-transfer-loading-advice-popup/stock-transfer-loading-advice-popup.component';
import { StockTransferPurchaseInvoiceComponent } from './components/stock-transfer-purchase-invoice/stock-transfer-purchase-invoice.component';
import { StockTransferSalesInvoiceComponent } from './components/stock-transfer-sales-invoice/stock-transfer-sales-invoice.component';
import { StockTransferGrnComponent } from './components/stock-transfer-grn/stock-transfer-grn.component';
import { StkGrnPurchasePopupComponent } from './components/stk-grn-purchase-popup/stk-grn-purchase-popup.component';
import { StockTransferPurchaseInvoiceAccountpostingComponent } from './components/stock-transfer-purchase-invoice-accountposting/stock-transfer-purchase-invoice-accountposting.component';
import { StockTransferSalesInvoiceAccountpostingComponent } from './components/stock-transfer-sales-invoice-accountposting/stock-transfer-sales-invoice-accountposting.component';
import { StocktransfersalesinvoicemultiplechallanComponent } from './components/stocktransfersalesinvoicemultiplechallan/stocktransfersalesinvoicemultiplechallan.component';
import { StockTransferGrnPrintPopUpComponent } from './components/stock-transfer-grn-print-pop-up/stock-transfer-grn-print-pop-up.component';
import { StockTransferChallanPrintPopUpComponent } from './components/stock-transfer-challan-print-pop-up/stock-transfer-challan-print-pop-up.component';
import { StockTransferSaleInvoicePrintoptionComponent } from './components/stock-transfer-sale-invoice-printoption/stock-transfer-sale-invoice-printoption.component';
import { StockTransferSaleInvoicePrintComponent } from './components/stock-transfer-sale-invoice-print/stock-transfer-sale-invoice-print.component';
import {NgxPrintModule} from 'ngx-print';
import { StockTransferOrderPopupComponent } from './components/stock-transfer-order-popup/stock-transfer-order-popup.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MatTabsModule,
    MatButtonModule ,
    MatCheckboxModule ,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SelectAutocompleteModule,
    MatAutocompleteModule, 
    MatInputModule,
    NgxPrintModule,
  ],
  exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],
  
  entryComponents:[
    StockQcPopupComponent,
    StockItemPopupComponent,
    StockTaxPopupComponent,
    StockTransferChallanPopUpComponent,
    StkChallanStkTransferPopupComponent,
    StockTransferLoadingAdvicePopupComponent,
    StkGrnPurchasePopupComponent,
    StockTransferPurchaseInvoiceAccountpostingComponent,
    StockTransferSalesInvoiceAccountpostingComponent,
    StocktransfersalesinvoicemultiplechallanComponent,
    StockTransferGrnPrintPopUpComponent,
    StockTransferChallanPrintPopUpComponent,
    StockTransferSaleInvoicePrintoptionComponent,
    StockTransferSaleInvoicePrintComponent,
    StockTransferOrderPopupComponent
],

  declarations: [
    StockTransferComponent,
    IndentOrderComponent,
    StockTransfersComponent,
    StockQcPopupComponent,
    StockItemPopupComponent,
    StockTaxPopupComponent,
    StockTransferChallanComponent,
    StockTransferInvoiceComponent,
    StockTransferChallanPopUpComponent,
    StkChallanStkTransferPopupComponent,
    StockTransferLoadingAdvicePopupComponent,
    StockTransferPurchaseInvoiceComponent,
    StockTransferSalesInvoiceComponent,
    StockTransferGrnComponent,
    StkGrnPurchasePopupComponent,
    StockTransferPurchaseInvoiceAccountpostingComponent,
    StockTransferSalesInvoiceAccountpostingComponent,
    StocktransfersalesinvoicemultiplechallanComponent,
    StockTransferGrnPrintPopUpComponent,
    StockTransferChallanPrintPopUpComponent,
    StockTransferSaleInvoicePrintoptionComponent,
    StockTransferSaleInvoicePrintComponent,
    StockTransferOrderPopupComponent,
  ]
})
export class StockTransferModule { }
