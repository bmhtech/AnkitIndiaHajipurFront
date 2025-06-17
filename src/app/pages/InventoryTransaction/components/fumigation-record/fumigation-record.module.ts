import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FumigationRecordComponent } from './fumigation-record.component';
import { WheatFumigationRecordComponent } from './components/wheat-fumigation-record/wheat-fumigation-record.component';
import { FumigationStkOpnDateComponent } from './components/fumigation-stk-opn-date/fumigation-stk-opn-date.component';
import { UpdateFumiOpenDatePopUpComponent } from './components/update-fumi-open-date-pop-up/update-fumi-open-date-pop-up.component';

import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NgxPrintModule } from 'ngx-print';
import { routing } from './fumigation-record-routing.module';

@NgModule({
  declarations: [FumigationRecordComponent, WheatFumigationRecordComponent, FumigationStkOpnDateComponent, UpdateFumiOpenDatePopUpComponent],

  imports: [
    CommonModule,
    routing,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
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

  entryComponents:[UpdateFumiOpenDatePopUpComponent]

})
export class FumigationRecordModule { }
