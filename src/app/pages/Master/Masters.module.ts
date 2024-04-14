import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './Masters.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule, MatButtonModule, MatCheckboxModule  } from '@angular/material';




/* components */
 import { MasterComponents } from './Masters.component';

import { ChannelMasterComponent } from './components/ChannelMaster/ChannelMaster.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material';



 

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
        
        ChannelMasterComponent,
      
        
        MasterComponents,
      
        
      
       
       // Levels2Component
    ]
})
export class MastersModule { }
