import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './Weighment.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatRadioModule,MatDialogModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import {NgxPrintModule} from 'ngx-print';
/* components */
import { WeighmentComponent } from './Weighment.component';
import { LoadingAdviceComponent } from './components/loading-advice/loading-advice.component';
import { LoadingWeighmentComponent } from './components/loading-weighment/loading-weighment.component';
import { UnloadAdviceComponent } from './components/unload-advice/unload-advice.component';
import { UnloadWeighmentComponent } from './components/unload-weighment/unload-weighment.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UnloadAdviceDrivingPopupComponent } from './components/unload-advice-driving-popup/unload-advice-driving-popup.component';
import { SalesOrderPopUpModalComponent } from './components/sales-order-pop-up-modal/sales-order-pop-up-modal.component';
import { AddNewVechilePopUpComponent } from './components/add-new-vechile-pop-up/add-new-vechile-pop-up.component';
import { IndentOrderPopUpModalComponent } from './components/indent-order-pop-up-modal/indent-order-pop-up-modal.component';
import { PurchaseEnqPopUpModalComponent } from './components/purchase-enq-pop-up-modal/purchase-enq-pop-up-modal.component';
import { PurchaseQNPopUpModalComponent } from './components/purchase-qnpop-up-modal/purchase-qnpop-up-modal.component';
import { PurchaseOrdPopUpModalComponent } from './components/purchase-ord-pop-up-modal/purchase-ord-pop-up-modal.component';
import { UnloadAdviceItemListPopUpComponent } from './components/unload-advice-item-list-pop-up/unload-advice-item-list-pop-up.component';
import { StockTransferPopUpModalComponent } from './components/stock-transfer-pop-up-modal/stock-transfer-pop-up-modal.component';
import { LoadingAdviceItemListPopUpComponent } from './components/loading-advice-item-list-pop-up/loading-advice-item-list-pop-up.component';
import { TagAdviceWithPoComponent } from './components/tag-advice-with-po/tag-advice-with-po.component';
import { PurchageOrderItemDtlsPopUpComponent } from './components/purchage-order-item-dtls-pop-up/purchage-order-item-dtls-pop-up.component';
import { PurReturnApprovalNotePopUpComponent } from './components/pur-return-approval-note-pop-up/pur-return-approval-note-pop-up.component';
import { SalesReturnApprovalNotePopUpComponent } from './components/sales-return-approval-note-pop-up/sales-return-approval-note-pop-up.component';
import { UnloadBillPrintComponent } from './components/unload-bill-print/unload-bill-print.component';
import { WeightmentBillPrintComponent } from './components/weightment-bill-print/weightment-bill-print.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DriverprintpopupComponent } from './components/driverprintpopup/driverprintpopup.component';
import { LoadingAdvicePrintComponent } from './components/loading-advice-print/loading-advice-print.component';
import { StockTransferUnloadingAfterInvoiceComponent } from './components/stock-transfer-unloading-after-invoice/stock-transfer-unloading-after-invoice.component';
// import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';

import {  MatPaginatorModule  } from '@angular/material/paginator';
import { OtherWeighmentComponent } from './components/other-weighment/other-weighment.component';
import { OtherWeighmentBillPrintComponent } from './components/other-weighment-bill-print/other-weighment-bill-print.component';
import { SalesorderjobworkpopupComponent } from './components/salesorderjobworkpopup/salesorderjobworkpopup.component';
import { UnloadAdviceJobworkComponent } from './components/unload-advice-jobwork/unload-advice-jobwork.component';
import { WeighmentterminatepopupComponent } from './components/weighmentterminatepopup/weighmentterminatepopup.component';
import { WeightmentKata1BillPrintComponent } from './components/weightment-kata1-bill-print/weightment-kata1-bill-print.component';
import { ImageViewModalComponent } from './components/image-view-modal/image-view-modal.component';
import { UnloadItcBillPrintComponent } from './components/unload-itc-bill-print/unload-itc-bill-print.component';
import { UpdateItcItemQtyComponent } from './components/update-itc-item-qty/update-itc-item-qty.component';

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
        NgxPrintModule,
        MatAutocompleteModule,
        MatPaginatorModule,
       // NgImageFullscreenViewModule
    ],

    entryComponents:[
        UnloadAdviceDrivingPopupComponent,
        SalesOrderPopUpModalComponent,
        AddNewVechilePopUpComponent,
        IndentOrderPopUpModalComponent,
        PurchaseEnqPopUpModalComponent,
        PurchaseQNPopUpModalComponent,
        PurchaseOrdPopUpModalComponent,
        UnloadAdviceItemListPopUpComponent,
        StockTransferPopUpModalComponent,
        LoadingAdviceItemListPopUpComponent,
        PurchageOrderItemDtlsPopUpComponent,
        PurReturnApprovalNotePopUpComponent,
        SalesReturnApprovalNotePopUpComponent,
        UnloadBillPrintComponent,
        WeightmentBillPrintComponent,
        DriverprintpopupComponent,
        LoadingAdvicePrintComponent,
        StockTransferUnloadingAfterInvoiceComponent,
        OtherWeighmentBillPrintComponent,
        SalesorderjobworkpopupComponent,
        UnloadAdviceJobworkComponent,
        WeighmentterminatepopupComponent,
        WeightmentKata1BillPrintComponent,
        ImageViewModalComponent,
        UnloadItcBillPrintComponent,
        UpdateItcItemQtyComponent
       ],

    declarations: [
        WeighmentComponent,
        LoadingAdviceComponent,
        LoadingWeighmentComponent,
        UnloadAdviceComponent,
        UnloadWeighmentComponent,
        UnloadAdviceDrivingPopupComponent,
        SalesOrderPopUpModalComponent,
        AddNewVechilePopUpComponent,
        IndentOrderPopUpModalComponent,      
        PurchaseEnqPopUpModalComponent,
        PurchaseQNPopUpModalComponent,
        PurchaseOrdPopUpModalComponent,
        UnloadAdviceItemListPopUpComponent,
        StockTransferPopUpModalComponent,
        LoadingAdviceItemListPopUpComponent,
        TagAdviceWithPoComponent,
        PurchageOrderItemDtlsPopUpComponent,
        PurReturnApprovalNotePopUpComponent,
        SalesReturnApprovalNotePopUpComponent,
        UnloadBillPrintComponent,
        WeightmentBillPrintComponent,
        DriverprintpopupComponent,
        LoadingAdvicePrintComponent,
        StockTransferUnloadingAfterInvoiceComponent,
        OtherWeighmentComponent,
        OtherWeighmentBillPrintComponent,
        SalesorderjobworkpopupComponent,
        UnloadAdviceJobworkComponent,
        WeighmentterminatepopupComponent,
        WeightmentKata1BillPrintComponent,
        ImageViewModalComponent,
        UnloadItcBillPrintComponent,
        UpdateItcItemQtyComponent,
    ]
})
export class weighmentModule { }
