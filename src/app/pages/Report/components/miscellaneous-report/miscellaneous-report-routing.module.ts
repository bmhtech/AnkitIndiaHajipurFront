import { Routes, RouterModule } from '@angular/router';
import { DailygetwheatreportComponent } from './dailygetwheatreport/dailygetwheatreport.component';
import { DailypowerreportComponent } from './dailypowerreport/dailypowerreport.component';
import { DailystockfinishgoodComponent } from './dailystockfinishgood/dailystockfinishgood.component';
import { DieselusedimportreportComponent } from './dieselusedimportreport/dieselusedimportreport.component';
import { GrnregisterComponent } from './grnregister/grnregister.component';
import { MiscellaneousReportComponent } from './miscellaneous-report.component';
import { PowerCutReportComponent } from './power-cut-report/power-cut-report.component';
import { WheatreceivingreportComponent } from './wheatreceivingreport/wheatreceivingreport.component';
import { WheatstackcardreportComponent } from './wheatstackcardreport/wheatstackcardreport.component'; 
import { GateinandoutregisterComponent } from './gateinandoutregister/gateinandoutregister.component';
import { GrnregisterreportpopupComponent } from './grnregisterreportpopup/grnregisterreportpopup.component';
import { GatepassregisterComponent } from './gatepassregister/gatepassregister.component';
import { DailyproductionreportComponent } from './dailyproductionreport/dailyproductionreport.component';
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


const childRoutes: Routes = [
  {
      path: '',
      component: MiscellaneousReportComponent,
      children: [
          { path: '', redirectTo: 'powercutreport', pathMatch: 'full' },
          { path: 'powercutreport', component: PowerCutReportComponent },
          { path: 'dailystockfinishgood', component: DailystockfinishgoodComponent },
          { path: 'grnregister', component: GrnregisterComponent },
          { path: 'dailypowerreport', component: DailypowerreportComponent },
          { path: 'dieselusedimportreport', component: DieselusedimportreportComponent },
          { path: 'dailygetwheatreport', component: DailygetwheatreportComponent },
          { path: 'wheatreceivingreport', component: WheatreceivingreportComponent },
          { path: 'wheatstackcardreport', component: WheatstackcardreportComponent },
          { path: 'gateinandoutregister', component: GateinandoutregisterComponent },
          { path: 'grnregisterreportpopup', component: GrnregisterreportpopupComponent },
          { path: 'gatepassregister', component: GatepassregisterComponent },
          { path: 'dailyproductionreport', component: DailyproductionreportComponent },
          { path: 'misclabreportfg', component: MisclabreportfgComponent },
          { path: 'otherparameterreport', component: OtherparameterreportComponent },
          { path: 'granulationreport', component: GranulationreportComponent },
          { path: 'dailyitemwiseloadingreport', component: DailyitemwiseloadingreportComponent },
          { path: 'misclabreportfgprintpopup', component: MisclabreportfgprintpopupComponent },
          { path: 'granulationreportprintpopup', component: GranulationreportprintpopupComponent },
          { path: 'otherparameterreportprintpopup', component: OtherparameterreportprintpopupComponent },
          { path: 'wheatacceptancereport', component: WheatacceptancereportComponent },
          { path: 'wheatacceptanceprintpopup', component: WheatacceptanceprintpopupComponent },
          { path: 'transcationreport', component: TransactionreportComponent },
          { path: 'stocktracking', component: StocktrackingComponent },
          { path: 'binreport', loadChildren: './binreport/binreport.module#BinreportModule' }
          

      ]
  }
];


export const routing = RouterModule.forChild(childRoutes);