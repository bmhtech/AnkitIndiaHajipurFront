import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomListboxComponent } from './custom-listbox/custom-listbox.component';
import { CustomListboxModule } from './custom-listbox/custom-listbox.module';
import { MatAutocompleteModule,MatInputModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { SalesreportSortingComponent } from './salesreport-sorting.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule } from '@angular/material';


@NgModule({
  declarations: [SalesreportSortingComponent],
  imports: [
    CommonModule,
    CustomListboxModule,
    CustomListboxModule,
		ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
   
  ]
  ,exports: [
		SalesreportSortingComponent
	]
})
export class SalesreportSortingModule { }