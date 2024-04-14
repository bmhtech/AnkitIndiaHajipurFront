import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './jobwork-routing.module';
import { MatTabsModule,MatSelectModule ,MatDialogModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JobworkComponent } from './jobwork.component';
import { JoborderComponent } from './components/joborder/joborder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material';

import { NongoodstypemasterComponent } from './components/nongoodstypemaster/nongoodstypemaster.component';
import { NongoodssubtypemasterComponent } from './components/nongoodssubtypemaster/nongoodssubtypemaster.component';
import { NongoodsserviceComponent } from './components/nongoodsservice/nongoodsservice.component';
import { ExitclausemasterComponent } from './components/exitclausemaster/exitclausemaster.component';
import { TermasserviceComponent } from './components/termasservice/termasservice.component';
import { NongoodsservicepopupComponent } from './components/nongoodsservicepopup/nongoodsservicepopup.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NongoodssrnComponent } from './components/nongoodssrn/nongoodssrn.component';
import { NongoodssrnpopupComponent } from './components/nongoodssrnpopup/nongoodssrnpopup.component';
import { MatRadioModule} from '@angular/material/radio';
import { NongoodsservicebillComponent } from './components/nongoodsservicebill/nongoodsservicebill.component';

@NgModule({
  declarations: [
    JobworkComponent,
    JoborderComponent,
    NongoodstypemasterComponent,
    NongoodssubtypemasterComponent,
    NongoodsserviceComponent,
    ExitclausemasterComponent,
    TermasserviceComponent,
    NongoodsservicepopupComponent,
    NongoodssrnComponent,
    NongoodssrnpopupComponent,
    NongoodsservicebillComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MatSelectModule,

    MatTabsModule,
    MatDialogModule,
    MatCheckboxModule,

    MatProgressSpinnerModule,
    SelectAutocompleteModule,
    MatRadioModule

  ],
  entryComponents:[
    NongoodsservicepopupComponent,
    NongoodssrnpopupComponent
  ]
})
export class JobworkModule { }
