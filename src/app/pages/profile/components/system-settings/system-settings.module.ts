import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './system-settings.routing';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule,MatProgressSpinnerModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavdynamicComponent } from './components/navdynamic/navdynamic.component';
import { SystemSettingsComponent } from './system-settings.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NewUserRoleComponent } from './components/new-user-role/new-user-role.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
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
        MatTreeModule,
        MatIconModule,
        NgMultiSelectDropDownModule,
    ],
    declarations: [
        SystemSettingsComponent,
        NavdynamicComponent,
        UserProfileComponent,
        SettingsComponent,
        NewUserRoleComponent,
      
    ]
    //exports: [SelectAutocompleteModule],
})

export class SystemSettingsModule { }
