import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnujsirrportsComponent } from './anujsirrports.component'; 
import { routing } from './anujsirrports-routing.module';

import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule, ThemePalette } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatAutocompleteModule,MatInputModule} from '@angular/material';
import {NgxPrintModule} from 'ngx-print';
import { PendingporeportComponent } from './pendingporeport/pendingporeport.component';
import { WheatunloadingmasterreportComponent } from './wheatunloadingmasterreport/wheatunloadingmasterreport.component';
import { SalesdispatchreportComponent } from './salesdispatchreport/salesdispatchreport.component';
import { DailyweigherreportComponent } from './dailyweigherreport/dailyweigherreport.component';
import { DailyweigherreportpopupComponent } from './dailyweigherreportpopup/dailyweigherreportpopup.component';
import { SaleorderreportComponent } from './saleorderreport/saleorderreport.component';

@NgModule({
  declarations: [
    AnujsirrportsComponent,
    PendingporeportComponent,
    WheatunloadingmasterreportComponent,
    SalesdispatchreportComponent,
    DailyweigherreportComponent,
    DailyweigherreportpopupComponent,
    SaleorderreportComponent
  ],
  imports: [
    CommonModule,
    routing,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SelectAutocompleteModule,
    MatAutocompleteModule,
    MatInputModule,
    NgxPrintModule
  ],
  entryComponents:[
    DailyweigherreportpopupComponent
  ]
})
export class AnujsirrportsModule { }
