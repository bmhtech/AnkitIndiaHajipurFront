import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './SalesReport.routing';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule, ThemePalette } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatAutocompleteModule,MatInputModule} from '@angular/material';
import { SalesReportComponent } from './SalesReport.component';
import {NgxPrintModule} from 'ngx-print';

// import{ SearchPipe} from '../../../../search/search.pipe';

import { PartyLedgerComponent } from './components/party-ledger/party-ledger.component';
import { PartyLedgerPopupComponent } from './components/party-ledger-popup/party-ledger-popup.component';
import { ControlAccountComponent } from './components/control-account/control-account.component';
import { ControlAccountPopupComponent } from './components/control-account-popup/control-account-popup.component';
import { SalesComponent } from './components/sales/sales.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SalesRegistrationFieldsComponent } from './components/sales-registration-fields/sales-registration-fields.component';
import { Sales2Component } from './components/sales2/sales2.component';


import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { SalesDynamicReportViewComponent } from './components/sales-dynamic-report-view/sales-dynamic-report-view.component';
import { SalesDynamicSortComponent } from './components/sales-dynamic-sort/sales-dynamic-sort.component';
import {MatDatepickerModule} from '@angular/material';
import { SalesreportSortingComponent } from './components/salesreport-sorting/salesreport-sorting.component';

import { SalesreportSortingModule } from './components/salesreport-sorting/salesreport-sorting.module';
import { Salesreportsorting2Component } from './components/salesreportsorting2/salesreportsorting2.component';



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
        MatTreeModule,
        MatIconModule,
        MatDatepickerModule,
        SalesreportSortingModule,
        
    ],

    exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],
    
    entryComponents:[
         PartyLedgerPopupComponent, 
         ControlAccountPopupComponent
    ],

    declarations: [
        SalesReportComponent,
       
        PartyLedgerComponent,
        PartyLedgerPopupComponent,
        ControlAccountComponent,
        ControlAccountPopupComponent,
        SalesComponent,
        SalesRegistrationFieldsComponent,
        Sales2Component,
        SalesDynamicReportViewComponent,
        SalesDynamicSortComponent,
        Salesreportsorting2Component,
    
      
     
       
       
    ]
})
export class SalesReportModule {

    
 }