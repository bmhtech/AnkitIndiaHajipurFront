import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './Purchase.component';
import { IndentOrderComponent } from './components/IndentOrder/IndentOrder.component';
import { PurchaseEnquiryComponent } from './components/purchase-enquiry/purchase-enquiry.component';
import { PurchaseQuotationComponent } from './components/purchase-quotation/purchase-quotation.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { QualityCheckComponent } from './components/quality-check/quality-check.component';
import { GrnComponent } from './components/grn/grn.component';
import { L1SelectionComponent } from './components/l1-selection/l1-selection.component';
import { PurchaseBillComponent } from './components/purchase-bill/purchase-bill.component';
import { PurReturnApprovalNoteComponent } from './components/pur-return-approval-note/pur-return-approval-note.component';
import { PurReturnNoteComponent } from './components/pur-return-note/pur-return-note.component';
import { DebitNoteComponent } from './components/debit-note/debit-note.component';
import { PeripheralQualityCheckComponent } from './components/peripheral-quality-check/peripheral-quality-check.component';
import { PaymentApprovalComponent } from './components/payment-approval/payment-approval.component';
import { PurchaseBillApprovalComponent } from './components/purchase-bill-approval/purchase-bill-approval.component';
import { StackMaintainComponent } from './components/stack-maintain/stack-maintain.component';

const childRoutes: Routes = [
    {
        path: '',
        component: PurchaseComponent,
        children: [
            { path: '', redirectTo: 'IndentOrder', pathMatch: 'full' },
            /*{ path: 'IndentOrder', component: IndentOrderComponent },
            { path: 'purchase-enquiry', component: PurchaseEnquiryComponent },
            { path: 'purchase-quotation', component: PurchaseQuotationComponent },
            { path: 'purchase-order', component: PurchaseOrderComponent },
            { path: 'quality-check', component: QualityCheckComponent },
            { path: 'grn', component: GrnComponent },
            { path: 'l1-selection', component: L1SelectionComponent },
            { path: 'purchase-bill', component: PurchaseBillComponent },
            { path: 'stack-maintain', component: StackMaintainComponent },
            { path: 'pur-return-approval-note', component: PurReturnApprovalNoteComponent },
            { path: 'pur-return-note', component: PurReturnNoteComponent },
            { path: 'debit-note', component: DebitNoteComponent },
            { path: 'PeripheralQualityCheck', component: PeripheralQualityCheckComponent },
            { path: 'payment-approval', component: PaymentApprovalComponent },
            { path: 'purchase-bill-approval', component: PurchaseBillApprovalComponent },*/
            { path: 'IndentOrder', component: IndentOrderComponent, data: { title: 'Indent Order' }},
            { path: 'purchase-enquiry', component: PurchaseEnquiryComponent, data: { title: 'Purchase Enquiry' }},
            { path: 'purchase-quotation', component: PurchaseQuotationComponent, data: { title: 'Purchase Quotation' } },
            { path: 'purchase-order', component: PurchaseOrderComponent, data: { title: 'Purchase Order' } },
            { path: 'quality-check', component: QualityCheckComponent, data: { title: 'Quality Check' } },
            { path: 'grn', component: GrnComponent, data: { title: 'GRN' } },
            { path: 'l1-selection', component: L1SelectionComponent, data: { title: 'L1 Selection' } },
            { path: 'purchase-bill', component: PurchaseBillComponent, data: { title: 'Purchase Bill' } },
            { path: 'stack-maintain', component: StackMaintainComponent, data: { title: 'Stack Maintain' } },
            { path: 'pur-return-approval-note', component: PurReturnApprovalNoteComponent, data: { title: 'Pur Return Approval Note' } },
            { path: 'pur-return-note', component: PurReturnNoteComponent, data: { title: 'Pur Return Note' } },
            { path: 'debit-note', component: DebitNoteComponent, data: { title: 'Debit Note' } },
            { path: 'PeripheralQualityCheck', component: PeripheralQualityCheckComponent, data: { title: 'Peripheral Quality Check' } },
            { path: 'payment-approval', component: PaymentApprovalComponent, data: { title: 'Payment Approval' } },
            { path: 'purchase-bill-approval', component: PurchaseBillApprovalComponent, data: { title: 'Purchase Bill Approval' } },
           
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);