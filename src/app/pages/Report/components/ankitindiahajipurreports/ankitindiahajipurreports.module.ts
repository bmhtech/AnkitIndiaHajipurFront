import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './ankitindiahajipurreports-routing.module';
import { AnkitindiahajipurreportsComponent } from './ankitindiahajipurreports.component';
import { MatAutocompleteModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NgxPrintModule } from 'ngx-print';
import { AisalesreportComponent } from './aisalesreport/aisalesreport.component';

@NgModule({
  declarations: [
    AnkitindiahajipurreportsComponent,
    AisalesreportComponent
  ],
  imports: [
    CommonModule,
    routing,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectAutocompleteModule,
    MatAutocompleteModule,
    NgxPrintModule,
    MatDialogModule,
  ]
})
export class AnkitindiahajipurreportsModule { }
