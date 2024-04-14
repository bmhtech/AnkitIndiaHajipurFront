import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './purchase-report.routing'
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatAutocompleteModule,MatInputModule} from '@angular/material';
import { PurchaseReportComponent } from './purchase-report.component';
import {NgxPrintModule} from 'ngx-print';
import { PurchasereportComponent } from './components/purchasereport/purchasereport.component';

// import{ SearchPipe} from '../../../../search/search.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PurchaseReportFieldsComponent } from './components/purchase-report-fields/purchase-report-fields.component';
import { PurchaseDynamicReportComponent } from './components/purchase-dynamic-report/purchase-dynamic-report.component';



/* components 
import { PurchaseComponent } from './ItemMaster.component';
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
        NgxPrintModule,
        NgMultiSelectDropDownModule,
    ],

    exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],
    
    entryComponents:[
         
    ],

    declarations: [
        PurchaseReportComponent,
        PurchasereportComponent,
        PurchaseReportFieldsComponent,
        PurchaseDynamicReportComponent,
        // SearchPipe,
        // GroupMasterComponent,
        // SubGroupComponent,
        // LedgerMasterComponent,
        // NarrationMasterComponent,
        // ItemTypeMasterComponent,
        // MaintainControlAccPopupComponent,
     
       
       
    ]
})
export class PurchaseReportModule {

    
 }
