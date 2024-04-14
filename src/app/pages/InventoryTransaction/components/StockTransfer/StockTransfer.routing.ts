import { Routes, RouterModule } from '@angular/router';

import { StockTransferComponent } from './StockTransfer.component';
import { IndentOrderComponent } from './components/indent-order/indent-order.component';
import { StockTransfersComponent } from './components/stock-transfers/stock-transfers.component';
import { StockTransferChallanComponent } from './components/stock-transfer-challan/stock-transfer-challan.component';
import { StockTransferInvoiceComponent } from './components/stock-transfer-invoice/stock-transfer-invoice.component';
import { StockTransferPurchaseInvoiceComponent } from './components/stock-transfer-purchase-invoice/stock-transfer-purchase-invoice.component';
import { StockTransferSalesInvoiceComponent } from './components/stock-transfer-sales-invoice/stock-transfer-sales-invoice.component';
import { StockTransferGrnComponent } from './components/stock-transfer-grn/stock-transfer-grn.component';

const childRoutes: Routes = [
    {
        path: '',
        component: StockTransferComponent,
        children: [
            { path: '', redirectTo: 'indentorder', pathMatch: 'full' },
            { path: 'indentorder', component: IndentOrderComponent },
            { path: 'StockTransfers', component: StockTransfersComponent },
            { path: 'StockTransferChallan', component: StockTransferChallanComponent },
            { path: 'StockTransferInvoice', component: StockTransferInvoiceComponent },
            { path: 'StockTransferPurchaseInvoiceComponent', component: StockTransferPurchaseInvoiceComponent },
            { path: 'StockTransferSalesInvoiceComponent', component: StockTransferSalesInvoiceComponent },
            { path: 'StockTransferGrnComponent', component: StockTransferGrnComponent },
           
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);