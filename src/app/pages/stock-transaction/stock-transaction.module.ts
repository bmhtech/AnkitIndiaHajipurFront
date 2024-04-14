import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './stock-transaction-routing.module';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatRadioModule,MatDialogModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StoredashboardComponent } from './components/storedashboard/storedashboard.component';
import { ShopflooraccessComponent } from './components/shopflooraccess/shopflooraccess.component';
import { StockTransactionComponent } from './stock-transaction.component';
import { RequisitionComponent } from './components/requisition/requisition.component';
import { ViewstoreComponent } from './components/viewstore/viewstore.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';
import { RequisitionpopupComponent } from './components/requisitionpopup/requisitionpopup.component';
import { IssuestockComponent } from './components/issuestock/issuestock.component';
import { IsssuestockitempopupComponent } from './components/isssuestockitempopup/isssuestockitempopup.component';
@NgModule({
  declarations: 
  [
    StoredashboardComponent,
    ShopflooraccessComponent,
    StockTransactionComponent,
    RequisitionComponent,
    ViewstoreComponent,
    RequisitionpopupComponent,
    IssuestockComponent,
    IsssuestockitempopupComponent
  ],

  imports: [
    CommonModule,
    routing,
    MatTabsModule,
    MatButtonModule ,
    MatCheckboxModule ,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SelectAutocompleteModule,
    MatAutocompleteModule, 
    MatInputModule
    
  ],
  entryComponents:[RequisitionpopupComponent,IsssuestockitempopupComponent]
})
export class StockTransactionModule { }
