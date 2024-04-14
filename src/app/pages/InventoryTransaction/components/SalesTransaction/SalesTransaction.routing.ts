import { Routes, RouterModule } from '@angular/router';
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
import { ReturnApprovalNoteComponent } from './components/return-approval-note/return-approval-note.component';
import { PartyBillPaymentComponent } from './components/party-bill-payment/party-bill-payment.component';
// import { StockIndentOrderComponent } from './components/stock-indent-order/stock-indent-order.component';
// import { StockTransferComponent } from './components/stock-transfer/stock-transfer.component';
import { PartyBillPaymentToComponent } from './components/party-bill-payment-to/party-bill-payment-to.component';
import { RatechartComponent } from './components/ratechart/ratechart.component';
import { EffectiveSalesOrderComponent } from './components/effective-sales-order/effective-sales-order.component';
const childRoutes: Routes = [
    {
        path: '',
        component: SalesTransactionComponent,
        children: [
            { path: '', redirectTo: 'salesenquiry', pathMatch: 'full' },
            { path: 'salesenquiry', component: SalesEnquiryComponent },
            { path: 'SalesQuotation', component: SalesQuotationComponent },
            { path: 'EffectiveSalesOrder', component: EffectiveSalesOrderComponent },
            { path: 'SalesOrder', component: SalesOrderComponent },
            { path: 'DeliveryChallan', component: DeliveryChallanComponent },
            { path: 'SalesInvoice', component: SalesInvoiceComponent },
            { path: 'ReturnApprovalNote', component: ReturnApprovalNoteComponent },
            { path: 'SalesReturnNote', component: SalesReturnNoteComponent },
            { path: 'CreditNote', component: CreditNoteComponent },
            { path: 'GatePass', component: GatepassComponent },
            { path: 'MonthlyPrice', component: MonthlyPriceListComponent },
            { path: 'DailyPriceList', component: DailyPriceListComponent },
            { path: 'PartyBillPayment', component: PartyBillPaymentComponent },
            { path: 'PartyBillPaymentTo', component: PartyBillPaymentToComponent },
            { path: 'ratechart', component: RatechartComponent }
            // { path: 'StockIndentOrder', component: StockIndentOrderComponent },
            // { path: 'StockTransfer', component: StockTransferComponent },
            
           
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);