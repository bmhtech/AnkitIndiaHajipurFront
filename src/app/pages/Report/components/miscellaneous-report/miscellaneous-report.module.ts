import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './miscellaneous-report-routing.module';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule ,MatDialogModule, MatProgressSpinnerModule, ThemePalette } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatAutocompleteModule,MatInputModule} from '@angular/material';
import { MiscellaneousReportComponent } from './miscellaneous-report.component';
import { PowerCutReportComponent } from './power-cut-report/power-cut-report.component';
import {  MatPaginatorModule  } from '@angular/material/paginator';
import { DailystockfinishgoodComponent } from './dailystockfinishgood/dailystockfinishgood.component';
import { DailystockfinishgoodpopupComponent } from './dailystockfinishgoodpopup/dailystockfinishgoodpopup.component';
import { GrnregisterComponent } from './grnregister/grnregister.component';
import { DailypowerreportComponent } from './dailypowerreport/dailypowerreport.component';
import { DieselusedimportreportComponent } from './dieselusedimportreport/dieselusedimportreport.component';
import { DailygetwheatreportComponent } from './dailygetwheatreport/dailygetwheatreport.component';
import {NgxPrintModule} from 'ngx-print';
import { WheatreceivingreportComponent } from './wheatreceivingreport/wheatreceivingreport.component';
import { WheatstackcardreportComponent } from './wheatstackcardreport/wheatstackcardreport.component';
import { GateinandoutregisterComponent } from './gateinandoutregister/gateinandoutregister.component';
import { GrnregisterreportpopupComponent } from './grnregisterreportpopup/grnregisterreportpopup.component';
import { GatepassregisterComponent } from './gatepassregister/gatepassregister.component';
import { DailyproductionreportComponent } from './dailyproductionreport/dailyproductionreport.component';
import { WheatstackcardreportpopupComponent } from './wheatstackcardreportpopup/wheatstackcardreportpopup.component';
import { DailyproductionreportprintComponent } from './dailyproductionreportprint/dailyproductionreportprint.component';
import { WheatreceivingreportprintpopupComponent } from './wheatreceivingreportprintpopup/wheatreceivingreportprintpopup.component';
import { MisclabreportfgComponent } from './misclabreportfg/misclabreportfg.component';
import { OtherparameterreportComponent } from './otherparameterreport/otherparameterreport.component';
import { GranulationreportComponent } from './granulationreport/granulationreport.component';
import { DailyitemwiseloadingreportComponent } from './dailyitemwiseloadingreport/dailyitemwiseloadingreport.component';
import { MisclabreportfgprintpopupComponent } from './misclabreportfgprintpopup/misclabreportfgprintpopup.component';
import { GranulationreportprintpopupComponent } from './granulationreportprintpopup/granulationreportprintpopup.component';
import { OtherparameterreportprintpopupComponent } from './otherparameterreportprintpopup/otherparameterreportprintpopup.component';
import { WheatacceptancereportComponent } from './wheatacceptancereport/wheatacceptancereport.component';
import { WheatacceptanceprintpopupComponent } from './wheatacceptanceprintpopup/wheatacceptanceprintpopup.component';
import { TransactionreportComponent } from './transactionreport/transactionreport.component';
import { StocktrackingComponent } from './stocktracking/stocktracking.component';

@NgModule({
  declarations: [PowerCutReportComponent,
            MiscellaneousReportComponent, 
            DailystockfinishgoodComponent, 
            DailystockfinishgoodpopupComponent, 
            GrnregisterComponent, 
            DailypowerreportComponent, 
            DieselusedimportreportComponent, 
            DailygetwheatreportComponent, 
            WheatreceivingreportComponent, 
            WheatstackcardreportComponent, 
            GateinandoutregisterComponent, 
            GrnregisterreportpopupComponent, 
            GatepassregisterComponent, 
            DailyproductionreportComponent, 
            WheatstackcardreportpopupComponent, 
            DailyproductionreportprintComponent, 
            WheatreceivingreportprintpopupComponent, 
            MisclabreportfgComponent, 
            OtherparameterreportComponent, 
            GranulationreportComponent, 
            DailyitemwiseloadingreportComponent, 
            MisclabreportfgprintpopupComponent, 
            GranulationreportprintpopupComponent, 
            OtherparameterreportprintpopupComponent, 
            WheatacceptancereportComponent, 
            WheatacceptanceprintpopupComponent, TransactionreportComponent, StocktrackingComponent],
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
  entryComponents:[DailystockfinishgoodpopupComponent,WheatstackcardreportpopupComponent,DailyproductionreportprintComponent,WheatreceivingreportprintpopupComponent,MisclabreportfgprintpopupComponent,GranulationreportprintpopupComponent,OtherparameterreportprintpopupComponent,WheatacceptanceprintpopupComponent]
  //dailystockfinishgoodpopup
})
export class MiscellaneousReportModule { }
