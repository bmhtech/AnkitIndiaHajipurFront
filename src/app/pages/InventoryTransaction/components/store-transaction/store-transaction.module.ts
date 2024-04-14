import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreTransactionComponent } from './store-transaction.component';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NgxPrintModule } from 'ngx-print';

import { StoreIssueNoteComponent } from './components/store-issue-note/store-issue-note.component';
import { routing } from './store-transaction-routing.module';
import { WarehouseToWarehouseStoreTransferComponent } from './components/warehouse-to-warehouse-store-transfer/warehouse-to-warehouse-store-transfer.component';

@NgModule({
  declarations: [
    StoreTransactionComponent,
    StoreIssueNoteComponent,
    WarehouseToWarehouseStoreTransferComponent,
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
    routing
  ],
  entryComponents:[],
  exports: [MatAutocompleteModule,MatInputModule, SelectAutocompleteModule]
})
export class StoreTransactionModule { }
