import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './ItemMaster.routing';
import {MatRadioModule} from '@angular/material/radio';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';

import { ItemMasterComponent } from './ItemMaster.component';
import { ItemTypeComponent } from './components/ItemTypeMaster/ItemType.component';
import { ItemGroupMasterComponent } from './components/ItemGroupMaster/ItemGroupMaster.component';
import { ItemcategorymasterComponent } from './components/ItemCategoryMaster/ItemCategoryMaster.component';
import { ItemsMasterComponent } from './components/ItemsMaster/ItemsMaster.component';
import { ItemmodalComponent } from './components/itemmodal/itemmodal.component';
import { Itemmodal1Component } from './components/itemmodal1/itemmodal1.component';
import { ItemMasterTaxCodeModalComponent } from './components/item-master-tax-code-modal/item-master-tax-code-modal.component';
import { ItemOpeningStockComponent } from './components/item-opening-stock/item-opening-stock.component';
import { PackingItemDetailsPopupComponent } from './components/packing-item-details-popup/packing-item-details-popup.component';

 //import{SearchPipe} from '../../../../search/search.pipe';
 import {MatSortModule} from '@angular/material/sort';
import { ItemStockComponent } from './components/item-stock/item-stock.component';
import { ItemServiceMasterComponent } from './components/item-service-master/item-service-master.component';
import { JobworkitemallocationComponent } from './components/jobworkitemallocation/jobworkitemallocation.component';
import { ItemallocationgrntaggingComponent } from './components/itemallocationgrntagging/itemallocationgrntagging.component';
import { ItemallocationpartytaggingComponent } from './components/itemallocationpartytagging/itemallocationpartytagging.component';
import { ItemallocationpotaggingComponent } from './components/itemallocationpotagging/itemallocationpotagging.component';
import { ItemallocationpoitemtaggingComponent } from './components/itemallocationpoitemtagging/itemallocationpoitemtagging.component';







/* components 
import { PurchaseComponent } from './ItemMaster.component';
import { IndentOrderComponent } from './components/IndentOrder/IndentOrder.component';
import { PurchaseEnquiryComponent } from './components/purchase-enquiry/purchase-enquiry.component';
import { PurchaseQuotationComponent } from './components/purchase-quotation/purchase-quotation.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { QualityCheckComponent } from './components/quality-check/quality-check.component';
import { GrnComponent } from './components/grn/grn.component';
import { L1SelectionComponent } from './components/l1-selection/l1-selection.component';
*/

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
        MatDialogModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        SelectAutocompleteModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSortModule
       
    ],

    exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],
    
    entryComponents:[ItemmodalComponent,
        Itemmodal1Component, 
        ItemMasterTaxCodeModalComponent,
        PackingItemDetailsPopupComponent,
        ItemallocationpartytaggingComponent,
        ItemallocationpoitemtaggingComponent],

    declarations: [
        ItemMasterComponent,
        ItemTypeComponent,
        ItemGroupMasterComponent,
        ItemcategorymasterComponent,
        ItemsMasterComponent,
        ItemmodalComponent,
        Itemmodal1Component,
        ItemMasterTaxCodeModalComponent,
        ItemOpeningStockComponent,
        PackingItemDetailsPopupComponent,
        ItemStockComponent,
        ItemServiceMasterComponent,
        JobworkitemallocationComponent,
        ItemallocationgrntaggingComponent,
        ItemallocationpartytaggingComponent,
        ItemallocationpotaggingComponent,
        ItemallocationpoitemtaggingComponent,
        // SearchPipe
       
      
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
export class ItemMasterModule {

    
 }
