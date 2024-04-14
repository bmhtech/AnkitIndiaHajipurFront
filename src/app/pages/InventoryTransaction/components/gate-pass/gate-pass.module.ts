import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatDialogModule, MatRadioModule, MatProgressSpinnerModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { routing } from './gate-pass-routing.module';
import { GatePassComponent } from './gate-pass.component';
import { GatepassChecklistComponent } from './components/gatepass-checklist/gatepass-checklist.component';
import { GatepassGetinComponent } from './components/gatepass-getin/gatepass-getin.component';
import { GatepassGateoutAComponent } from './components/gatepass-gateout-a/gatepass-gateout-a.component';
import { GatepassGateoutComponent } from './components/gatepass-gateout/gatepass-gateout.component';
//import { VisitorMasterComponent } from './components/visitor-master/visitor-master.component';
//import { VisitorprintpopupComponent } from './components/visitorprintpopup/visitorprintpopup.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  
  declarations: [
    GatePassComponent,
    GatepassChecklistComponent,
    GatepassGetinComponent,
    GatepassGateoutAComponent,
    GatepassGateoutComponent,
   // VisitorMasterComponent
    ],

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
  ],
  entryComponents:[
   // VisitorprintpopupComponent
  ]

})
export class GatePassModule { }
