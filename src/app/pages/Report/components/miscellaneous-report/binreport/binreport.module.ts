import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPrintModule} from 'ngx-print';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule, ThemePalette } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatAutocompleteModule,MatInputModule} from '@angular/material';
import { routing } from './binreport-routing.module';
import { BinreportsComponent } from './binreports/binreports.component';
import { WeigherredingsreportComponent } from './weigherredingsreport/weigherredingsreport.component';
import { MillbreakdownreportComponent } from './millbreakdownreport/millbreakdownreport.component';
import { BinreportComponent } from './binreport.component';
import {  MatPaginatorModule  } from '@angular/material/paginator';
import { BinreportspopupComponent } from './binreportspopup/binreportspopup.component';
@NgModule({
  declarations: [BinreportComponent,BinreportsComponent, WeigherredingsreportComponent, MillbreakdownreportComponent, BinreportspopupComponent],
  imports: [
    CommonModule,
    routing,
    MatRadioModule,
    MatTabsModule, 
     MatCheckboxModule,
     MatSelectModule ,
     MatDialogModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      SelectAutocompleteModule,
      MatAutocompleteModule,
      MatInputModule,
      MatPaginatorModule,
      NgxPrintModule
    
  ],
  entryComponents:[BinreportspopupComponent]

})
export class BinreportModule { }
