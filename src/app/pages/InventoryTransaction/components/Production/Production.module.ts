import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './Production.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatDialogModule, MatRadioModule, MatProgressSpinnerModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { ProductionComponent } from './Production.components';

import { ProcessMasterComponent } from './components/process-master/process-master.component';
import { BomMasterComponent } from './components/bom-master/bom-master.component';
import { ProductionPlanningComponent } from './components/production-planning/production-planning.component';
//import { PackingListPopUpComponent } from '../SalesTransaction/components/packing-list-pop-up/packing-list-pop-up.component';
import { PeriodicDatePopupComponent } from './components/periodic-date-popup/periodic-date-popup.component';
import { ProductionTransactionComponent } from './components/production-transaction/production-transaction.component';
import { InputItemPopupComponent } from './components/input-item-popup/input-item-popup.component';
import { OutputItemPopupComponent } from './components/output-item-popup/output-item-popup.component';
import { ScrapPackingListPopupComponent } from './components/scrap-packing-list-popup/scrap-packing-list-popup.component';
import { SpecialDatePopupComponent } from './components/special-date-popup/special-date-popup.component';
import { ProductionTransactionSpecialComponent } from './components/production-transaction-special/production-transaction-special.component';
import { ProductionSummaryComponent } from './components/production-summary/production-summary.component';




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
    ],


    exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],


     entryComponents:[PeriodicDatePopupComponent,
        
        InputItemPopupComponent,
        OutputItemPopupComponent,
        ScrapPackingListPopupComponent,
        SpecialDatePopupComponent

                    ],
                    
    declarations: [
        ProductionComponent,
        ProcessMasterComponent,
        BomMasterComponent,
        ProductionPlanningComponent,
        PeriodicDatePopupComponent,
        ProductionTransactionComponent,
        InputItemPopupComponent,
        OutputItemPopupComponent,
        ScrapPackingListPopupComponent,
        SpecialDatePopupComponent,
        ProductionTransactionSpecialComponent,
        ProductionSummaryComponent

       
    ]
})
export class ProductionModule { }