import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './SalesTransaction.routing';
//import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatRadioModule  } from '@angular/material';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatRadioModule,MatDialogModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
/* components */
import { SalesTransactionComponent } from './SalesTransaction.component';
import { SalesEnquiryComponent } from './components/sales-enquiry/sales-enquiry.component';
import { SalesQuotationComponent } from './components/sales-quotation/sales-quotation.component';
import { SalesOrderComponent } from './components/sales-order/sales-order.component';
import { DeliveryChallanComponent } from './components/delivery-challan/delivery-challan.component';
import { SalesInvoiceComponent } from './components/sales-invoice/sales-invoice.component';
import { SalesReturnNoteComponent } from './components/sales-return-note/sales-return-note.component';
import { CreditNoteComponent } from './components/credit-note/credit-note.component';
import { GatepassComponent } from './components/gatepass/gatepass.component';
import { MonthlyPriceListComponent } from './components/monthly-price-list/monthly-price-list.component';
import { DailyPriceListComponent } from './components/daily-price-list/daily-price-list.component';
import { SalesEnqCusPopUpComponent } from './components/sales-enq-cus-pop-up/sales-enq-cus-pop-up.component';
import { SalesEnquiryPopUpModalComponent } from './components/sales-enquiry-pop-up-modal/sales-enquiry-pop-up-modal.component';
import { SalesQuoTaxModalComponent } from './components/sales-quo-tax-modal/sales-quo-tax-modal.component';
import { SalesQuoPopUpModalComponent } from './components/sales-quo-pop-up-modal/sales-quo-pop-up-modal.component';
import { SalesQuoTypePopUpModalComponent } from './components/sales-quo-type-pop-up-modal/sales-quo-type-pop-up-modal.component';
import { DelChallanSOrderPopUpComponent } from './components/del-challan-sorder-pop-up/del-challan-sorder-pop-up.component';
import { DelChallanLoadingAdvPopUpComponent } from './components/del-challan-loading-adv-pop-up/del-challan-loading-adv-pop-up.component';
import { ChargeCodePopUpComponent } from './components/charge-code-pop-up/charge-code-pop-up.component';
//import {MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';
import { QcNormsPopUpComponent } from './components/qc-norms-pop-up/qc-norms-pop-up.component';
import { PackingListPopUpComponent } from './components/packing-list-pop-up/packing-list-pop-up.component';
import { TransporterListPopUpComponent } from './components/transporter-list-pop-up/transporter-list-pop-up.component';
//import { PurchagepopupmodelComponent } from '../Purchase/components/purchagepopupmodel/purchagepopupmodel.component';
import { SalesQcPopupComponent } from './components/sales-qc-popup/sales-qc-popup.component';
import { ReturnApprovalNoteComponent } from './components/return-approval-note/return-approval-note.component';
import { DeliveryChallanPopUpComponent } from './components/delivery-challan-pop-up/delivery-challan-pop-up.component';
import { SalesOrderPopUpComponent } from './components/sales-order-pop-up/sales-order-pop-up.component';
import { SalesInvoicePopUpComponent } from './components/sales-invoice-pop-up/sales-invoice-pop-up.component';
import { ReturnApprovalNotePopUpComponent } from './components/return-approval-note-pop-up/return-approval-note-pop-up.component';
import { SalesReturnNotePopUpComponent } from './components/sales-return-note-pop-up/sales-return-note-pop-up.component';
import { SalesBillPrintPopupComponent } from './components/sales-bill-print-popup/sales-bill-print-popup.component';
import {NgxPrintModule} from 'ngx-print';
import { BillofSupplyPrintPopupComponent } from './components/billof-supply-print-popup/billof-supply-print-popup.component';
import { SalesBillPrintOptionsPopupComponent } from './components/sales-bill-print-options-popup/sales-bill-print-options-popup.component';
import { PartyBillPaymentComponent } from './components/party-bill-payment/party-bill-payment.component';
import { PartyBillPaymentToComponent } from './components/party-bill-payment-to/party-bill-payment-to.component';
import { DeliveryChallanPrintPopupComponent } from './components/delivery-challan-print-popup/delivery-challan-print-popup.component';
import { SalesOrderPrintComponent } from './components/sales-order-print/sales-order-print.component';
import { SalesInvoiceAccountPostingComponent } from './components/sales-invoice-account-posting/sales-invoice-account-posting.component';
import { SalesOrderReturnapprovalPopupComponent } from './components/sales-order-returnapproval-popup/sales-order-returnapproval-popup.component';
import { MultiplediliverychallanComponent } from './components/multiplediliverychallan/multiplediliverychallan.component';
import { MultipleSalesReturnPopupComponent } from './components/multiple-sales-return-popup/multiple-sales-return-popup.component';
import { MultipleReturnApprovalPopupComponent } from './components/multiple-return-approval-popup/multiple-return-approval-popup.component';
import { CreditnoteaccountpostingComponent } from './components/creditnoteaccountposting/creditnoteaccountposting.component';
import { LiewSaleorderPopupComponent } from './components/liew-saleorder-popup/liew-saleorder-popup.component';
import {  MatPaginatorModule  } from '@angular/material/paginator';
import { RatechartComponent } from './components/ratechart/ratechart.component';
import { SaleorderproformaprintComponent } from './components/saleorderproformaprint/saleorderproformaprint.component';
import { TransporterChargesPopupComponent } from './components/transporter-charges-popup/transporter-charges-popup.component';
import { EffectiveSalesOrderComponent } from './components/effective-sales-order/effective-sales-order.component';
import { DeliveryChallanJobworkPopupComponent } from './components/delivery-challan-jobwork-popup/delivery-challan-jobwork-popup.component';
import { SalesInvoiceJobworkPopupComponent } from './components/sales-invoice-jobwork-popup/sales-invoice-jobwork-popup.component';
import { SaleinvoicejobworkprintComponent } from './components/saleinvoicejobworkprint/saleinvoicejobworkprint.component';
import { ReturnApprovalJobworkPopupComponent } from './components/return-approval-jobwork-popup/return-approval-jobwork-popup.component';
import { SalereturnjobworkComponent } from './components/salereturnjobwork/salereturnjobwork.component';
import { CreditnotejobworkComponent } from './components/creditnotejobwork/creditnotejobwork.component';
import { DelChallanDistancePopUpComponent } from './components/del-challan-distance-pop-up/del-challan-distance-pop-up.component';
import { SalesInvoiceEinvoiceCancelComponent } from './components/sales-invoice-einvoice-cancel/sales-invoice-einvoice-cancel.component';
import { SaleinvoicereviseprintComponent } from './components/saleinvoicereviseprint/saleinvoicereviseprint.component';
import { CreditnoteEinvoiceCancelComponent } from './components/creditnote-einvoice-cancel/creditnote-einvoice-cancel.component';
import { CreditnoteEwaybillCancelComponent } from './components/creditnote-ewaybill-cancel/creditnote-ewaybill-cancel.component';
// import { StockIndentOrderComponent } from './components/stock-indent-order/stock-indent-order.component';
// import { StockTransferComponent } from './components/stock-transfer/stock-transfer.component';
import { ExportAsModule } from 'ngx-export-as';
import { UpdateArnNoComponent } from './components/update-arn-no/update-arn-no.component';
import { DelChallanSalesOrdByGrnPopupComponent } from './components/del-challan-sales-ord-by-grn-popup/del-challan-sales-ord-by-grn-popup.component';


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
        MatPaginatorModule,
        ExportAsModule
       // MatDialogConfig,
       // MatDialogRef
    ],

    exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],

    entryComponents:[
        SalesEnqCusPopUpComponent,
        SalesEnquiryPopUpModalComponent,
        SalesQuoTaxModalComponent,
        SalesQuoPopUpModalComponent,
        SalesQuoTypePopUpModalComponent,
        DelChallanSOrderPopUpComponent,
        DelChallanLoadingAdvPopUpComponent,
        ChargeCodePopUpComponent,
        QcNormsPopUpComponent,
        PackingListPopUpComponent,
        TransporterListPopUpComponent,
       // PurchagepopupmodelComponent,
        SalesQcPopupComponent,
        DeliveryChallanPopUpComponent,
        SalesOrderPopUpComponent,
        SalesInvoicePopUpComponent,
        ReturnApprovalNotePopUpComponent,
        SalesReturnNotePopUpComponent,
        SalesBillPrintPopupComponent,
        BillofSupplyPrintPopupComponent,
        SalesBillPrintOptionsPopupComponent,
        DeliveryChallanPrintPopupComponent,
        SalesOrderPrintComponent,
        SalesInvoiceAccountPostingComponent,
        SalesOrderReturnapprovalPopupComponent,
        MultiplediliverychallanComponent,
        MultipleSalesReturnPopupComponent,
        MultipleReturnApprovalPopupComponent,
        CreditnoteaccountpostingComponent,
        LiewSaleorderPopupComponent,
        SaleorderproformaprintComponent,
        TransporterChargesPopupComponent,
        DeliveryChallanJobworkPopupComponent,
        SalesInvoiceJobworkPopupComponent,
        SaleinvoicejobworkprintComponent,
        ReturnApprovalJobworkPopupComponent,
        SalereturnjobworkComponent,
        CreditnotejobworkComponent,
        DelChallanDistancePopUpComponent,
        SalesInvoiceEinvoiceCancelComponent,
        SaleinvoicereviseprintComponent,
        CreditnoteEinvoiceCancelComponent,
        CreditnoteEwaybillCancelComponent,
        UpdateArnNoComponent,
        DelChallanSalesOrdByGrnPopupComponent,
    ],


    
    declarations: [
        SalesTransactionComponent,
        SalesEnquiryComponent,
        SalesQuotationComponent,
        SalesOrderComponent,
        DeliveryChallanComponent,
        SalesInvoiceComponent,
        SalesReturnNoteComponent,
        CreditNoteComponent,
        GatepassComponent,
        MonthlyPriceListComponent,
        DailyPriceListComponent,
        SalesEnqCusPopUpComponent,
        SalesEnquiryPopUpModalComponent,
        SalesQuoTaxModalComponent,
        SalesQuoPopUpModalComponent,
        SalesQuoTypePopUpModalComponent,
        DelChallanSOrderPopUpComponent,
        DelChallanLoadingAdvPopUpComponent,
        ChargeCodePopUpComponent,
        QcNormsPopUpComponent,
        PackingListPopUpComponent,
        TransporterListPopUpComponent,
       // PurchagepopupmodelComponent,
       SalesQcPopupComponent,
       ReturnApprovalNoteComponent,
       DeliveryChallanPopUpComponent,
       SalesOrderPopUpComponent,
       SalesInvoicePopUpComponent,
       ReturnApprovalNotePopUpComponent,
       SalesReturnNotePopUpComponent,
       SalesBillPrintPopupComponent,
       BillofSupplyPrintPopupComponent,
       SalesBillPrintOptionsPopupComponent,
       PartyBillPaymentComponent,
       PartyBillPaymentToComponent,
       DeliveryChallanPrintPopupComponent,
       SalesOrderPrintComponent,
       SalesInvoiceAccountPostingComponent,
       SalesOrderReturnapprovalPopupComponent,
       MultiplediliverychallanComponent,
       MultipleSalesReturnPopupComponent,
       MultipleReturnApprovalPopupComponent,
       CreditnoteaccountpostingComponent,
       LiewSaleorderPopupComponent,
       RatechartComponent,
       SaleorderproformaprintComponent,
       TransporterChargesPopupComponent,
       EffectiveSalesOrderComponent,
       DeliveryChallanJobworkPopupComponent,
       SalesInvoiceJobworkPopupComponent,
       SaleinvoicejobworkprintComponent,
       ReturnApprovalJobworkPopupComponent,
       SalereturnjobworkComponent,
       CreditnotejobworkComponent,
       DelChallanDistancePopUpComponent,
       SalesInvoiceEinvoiceCancelComponent,
       SaleinvoicereviseprintComponent,
       CreditnoteEinvoiceCancelComponent,
       CreditnoteEwaybillCancelComponent,
       UpdateArnNoComponent,
       DelChallanSalesOrdByGrnPopupComponent,
       
       
      
        // StockIndentOrderComponent,
        // StockTransferComponent,
      
 
    ]
})
export class SalesTransactionModule { }
