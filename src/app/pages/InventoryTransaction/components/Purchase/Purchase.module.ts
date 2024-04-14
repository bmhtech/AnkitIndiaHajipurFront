import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './Purchase.routing';
import { MatTabsModule,MatSelectModule ,MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';

/* components */
import { PurchaseComponent } from './Purchase.component';
import { IndentOrderComponent } from './components/IndentOrder/IndentOrder.component';
import { PurchaseEnquiryComponent } from './components/purchase-enquiry/purchase-enquiry.component';
import { PurchaseQuotationComponent } from './components/purchase-quotation/purchase-quotation.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { QualityCheckComponent } from './components/quality-check/quality-check.component';
import { GrnComponent } from './components/grn/grn.component';
import { L1SelectionComponent } from './components/l1-selection/l1-selection.component';
import { TransmodalComponent } from './components/transmodal/transmodal.component';
import { PurchaseEnqPopUpModalComponent } from './components/purchase-enq-pop-up-modal/purchase-enq-pop-up-modal.component';
import { PurchaseBillComponent } from './components/purchase-bill/purchase-bill.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PurchaseQNPopUpModalComponent } from './components/purchase-qnpop-up-modal/purchase-qnpop-up-modal.component';
import { PeripheralQualityCheckComponent } from './components/peripheral-quality-check/peripheral-quality-check.component';
import { GrnPopUpComponent } from './components/grn-pop-up/grn-pop-up.component';
import { HomeComponent } from './components/home/home.component';
import { PackingListPopUpComponent } from './components/packing-list-pop-up/packing-list-pop-up.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { TaxPopUpModalComponent } from './components/tax-pop-up-modal/tax-pop-up-modal.component';
import { QcNormPopUpModalComponent } from './components/qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';
import { SupplierPopUpModalComponent } from './components/supplier-pop-up-modal/supplier-pop-up-modal.component';
import { IndentOrderPopUpModalComponent } from './components/indent-order-pop-up-modal/indent-order-pop-up-modal.component';
import { UnloadAdviceWithpoPopupComponent } from './components/unload-advice-withpo-popup/unload-advice-withpo-popup.component';
import { UnloadAdviceWithoutpoPopupComponent } from './components/unload-advice-withoutpo-popup/unload-advice-withoutpo-popup.component';
import { QualityCheckQCPopUpComponent } from './components/quality-check-qcpop-up/quality-check-qcpop-up.component';
import { PurReturnApprovalNoteComponent } from './components/pur-return-approval-note/pur-return-approval-note.component';
import { PurReturnNoteComponent } from './components/pur-return-note/pur-return-note.component';
import { DebitNoteComponent } from './components/debit-note/debit-note.component';
import { PurchaseOrderPopUpComponent } from './components/purchase-order-pop-up/purchase-order-pop-up.component';
import { PurchaseBillPopUpComponent } from './components/purchase-bill-pop-up/purchase-bill-pop-up.component';
import { UnloadAdvicePopUpComponent } from './components/unload-advice-pop-up/unload-advice-pop-up.component';
import { PurReturnApprovalNotePopUpComponent } from './components/pur-return-approval-note-pop-up/pur-return-approval-note-pop-up.component';
import { PurReturnNotePopUpComponent } from './components/pur-return-note-pop-up/pur-return-note-pop-up.component';
import { GrnReturnPopupComponent } from './components/grn-return-popup/grn-return-popup.component';
import { PaymentApprovalComponent } from './components/payment-approval/payment-approval.component';
import { PurchaseBillApprovalComponent } from './components/purchase-bill-approval/purchase-bill-approval.component';
import { MultiunloadadvicepopupComponent } from './components/multiunloadadvicepopup/multiunloadadvicepopup/multiunloadadvicepopup.component';
import { GrnBillPrintComponent } from './components/grn-bill-print/grn-bill-print.component';
import { PurchaseorderprintComponent } from './components/purchaseorderprint/purchaseorderprint.component';
import { PurBillAccountpostingComponent } from './components/pur-bill-accountposting/pur-bill-accountposting.component';
import { PurchaseOrderGrnPopUpComponent } from './components/purchase-order-grn-pop-up/purchase-order-grn-pop-up.component';
import { MultiunloadadvicepopupreviseComponent } from './components/multiunloadadvicepopup/multiunloadadvicepopuprevise/multiunloadadvicepopuprevise.component';
import { StorePurchasePopupComponent } from './components/store-purchase-popup/store-purchase-popup.component';
import {  MatPaginatorModule  } from '@angular/material/paginator';
import { PurchasegrndriverComponent } from './components/purchasegrndriver/purchasegrndriver.component';
import { AddNewVechilePopUpComponentGrnComponent } from './components/add-new-vechile-pop-up-component-gr/add-new-vechile-pop-up-component-gr.component';
import { PurorderReturnapprovalPopupComponent } from './components/purorder-returnapproval-popup/purorder-returnapproval-popup.component';
import { PurchasechannelpopupComponent } from './components/purchasechannelpopup/purchasechannelpopup.component';
import { PurorderjwupdateComponent } from './components/purorderjwupdate/purorderjwupdate.component'; 
@NgModule({
    imports: [
        CommonModule,
        routing,
        MatTabsModule,
        MatButtonModule ,
        MatCheckboxModule ,
        MatSelectModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        SelectAutocompleteModule,
        NgxPrintModule,
        MatPaginatorModule,
    ],

    exports: [SelectAutocompleteModule],

    entryComponents:[TransmodalComponent,
                     GrnPopUpComponent,
                     PackingListPopUpComponent,
                     TaxPopUpModalComponent,
                     QcNormPopUpModalComponent,
                     SupplierPopUpModalComponent,
                     IndentOrderPopUpModalComponent,
                     PurchaseEnqPopUpModalComponent,
                     PurchaseQNPopUpModalComponent,
                     UnloadAdviceWithpoPopupComponent,
                     UnloadAdviceWithoutpoPopupComponent,
                     QualityCheckQCPopUpComponent,
                     PurchaseOrderPopUpComponent,
                     PurchaseBillPopUpComponent,
                     UnloadAdvicePopUpComponent,
                     PurReturnApprovalNotePopUpComponent, 
                     PurReturnNotePopUpComponent,
                     PurchaseBillApprovalComponent,
                     MultiunloadadvicepopupComponent,
                     GrnBillPrintComponent,
                     PurchaseorderprintComponent,
                     PurBillAccountpostingComponent,
                     PurchaseOrderGrnPopUpComponent,
                     MultiunloadadvicepopupreviseComponent,
                     StorePurchasePopupComponent,
                     PurchasegrndriverComponent,
                     AddNewVechilePopUpComponentGrnComponent,
                     PurorderReturnapprovalPopupComponent,
                     PurchasechannelpopupComponent,
                     PurorderjwupdateComponent
                    ],
                    
    declarations: [
        PurchaseComponent,
        IndentOrderComponent,
        PurchaseEnquiryComponent,
        PurchaseQuotationComponent,
        PurchaseOrderComponent,
        QualityCheckComponent,
        GrnComponent,
        L1SelectionComponent,
        TransmodalComponent,
        SupplierPopUpModalComponent,
        PurchaseBillComponent,
        PeripheralQualityCheckComponent,
        GrnPopUpComponent,
        HomeComponent,
        PackingListPopUpComponent,
        TaxPopUpModalComponent,
        QcNormPopUpModalComponent,
        SupplierPopUpModalComponent,
        IndentOrderPopUpModalComponent, 
        PurchaseEnqPopUpModalComponent,   
        PurchaseQNPopUpModalComponent, 
        UnloadAdviceWithpoPopupComponent, 
        UnloadAdviceWithoutpoPopupComponent, 
        QualityCheckQCPopUpComponent, 
        PurReturnApprovalNoteComponent, 
        PurReturnNoteComponent,  
        DebitNoteComponent, 
        PurchaseOrderPopUpComponent, 
        PurchaseBillPopUpComponent, 
        UnloadAdvicePopUpComponent, 
        PurReturnApprovalNotePopUpComponent, 
        PurReturnNotePopUpComponent, GrnReturnPopupComponent,
         PaymentApprovalComponent, PurchaseBillApprovalComponent, 
         MultiunloadadvicepopupComponent, GrnBillPrintComponent,
          PurchaseorderprintComponent, PurBillAccountpostingComponent,
           PurchaseOrderGrnPopUpComponent, MultiunloadadvicepopupreviseComponent,
            StorePurchasePopupComponent, PurchasegrndriverComponent,AddNewVechilePopUpComponentGrnComponent, PurorderReturnapprovalPopupComponent, PurchasechannelpopupComponent, PurorderjwupdateComponent
       
    ]
})
export class PurchaseModule { }
