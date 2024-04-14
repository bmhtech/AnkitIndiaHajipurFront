import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { AccountsmastercategoryComponent } from './components/accountsmastercategory/accountsmastercategory.component';
import { AccountsmasterComponent } from './accountsmaster.component';
import { routing } from './accountsmaster-routing.module';
import { AccountsmastergroupComponent } from './components/accountsmastergroup/accountsmastergroup.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { AccountsmastertypeComponent } from './components/accountsmastertype/accountsmastertype.component';
import { AccountsmasterledgerComponent } from './components/accountsmasterledger/accountsmasterledger.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    routing,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    SelectAutocompleteModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  declarations: 
  [
    AccountsmasterComponent,
    AccountsmastercategoryComponent,
    AccountsmastergroupComponent,
    AccountsmastertypeComponent,
    AccountsmasterledgerComponent
  ]
})
export class AccountsmasterModule 
{ 
  
}
