import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './Report.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule, MatButtonModule, MatCheckboxModule  } from '@angular/material';




/* components */
 import { ReportComponents } from './Report.component';

// import { ChannelMasterComponent } from './components/ChannelMaster/ChannelMaster.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material';

//import { SpecialreportsComponent } from './components/specialreports/specialreports.component';


//import { PurchaseReportComponent } from './components/purchase-report/purchase-report.component';



 

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
        MatProgressSpinnerModule,
        MatSelectModule,
       
       

    ],
   
    declarations: [
        
        // ChannelMasterComponent,
      
        
        ReportComponents,
        
       // SpecialreportsComponent,
        
       // PurchaseReportComponent,
       
       // Levels2Component
    ]
})
export class ReportModule { }
