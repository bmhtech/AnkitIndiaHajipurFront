import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportComponent } from './transport.component';
import { routing } from './transport-routing.module';
import { PurchaseTransportComponent } from './components/sales-transport/purchase-transport/purchase-transport.component';
import { SalesTransportComponent } from './components/sales-transport/sales-transport/sales-transport.component';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NgxPrintModule } from 'ngx-print';
import { TransportjvpostingComponent } from './components/transportjvposting/transportjvposting.component';
import { SalestransportimagepopupComponent } from './components/salestransportimagepopup/salestransportimagepopup.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { DeletesalestransportremarkpopupComponent } from './components/sales-transport/deletesalestransportremarkpopup/deletesalestransportremarkpopup.component';

@NgModule({
  declarations: [
    TransportComponent,
    SalesTransportComponent,
    PurchaseTransportComponent,
    TransportjvpostingComponent,
    SalestransportimagepopupComponent,
    DeletesalestransportremarkpopupComponent
  ],
  imports: [
    CommonModule,
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
    MatPaginatorModule,
    NgxImageZoomModule.forRoot(),
    routing
  ],
  entryComponents:[TransportjvpostingComponent,SalestransportimagepopupComponent,DeletesalestransportremarkpopupComponent],
  exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule],
  bootstrap:    [ SalestransportimagepopupComponent ],
})
export class TransportModule { }
