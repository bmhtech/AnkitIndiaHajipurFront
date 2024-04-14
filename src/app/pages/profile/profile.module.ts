import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './profile.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';

import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule,MatDialogModule, MatProgressSpinnerModule  } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';



import {MatRadioModule} from '@angular/material/radio';



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing,
        FormsModule,
        ReactiveFormsModule,

        MatProgressSpinnerModule,

        MatTabsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDialogModule,
        MatRadioModule,
        SelectAutocompleteModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        ProfileComponent,
   
    ]
})
export class ProfileModule { }
