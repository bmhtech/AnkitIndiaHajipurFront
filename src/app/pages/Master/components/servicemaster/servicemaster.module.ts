import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './servicemaster-routing.module';

import {ServicemasterComponent} from './servicemaster.component';
import { SubservicemasterComponent } from './components/subservicemaster/subservicemaster.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { ServicetaxcodepopupComponent } from './servicetaxcodepopup/servicetaxcodepopup.component';

@NgModule({
  declarations: [ServicemasterComponent, SubservicemasterComponent, ServicetaxcodepopupComponent],
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatDialogModule,
    MatCheckboxModule,

    MatProgressSpinnerModule
  ],
  entryComponents:[
    ServicetaxcodepopupComponent
  ]
})
export class ServicemasterModule { }
