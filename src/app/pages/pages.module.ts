import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CompanyFinancialComponent } from './company-financial/company-financial.component';
import { MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


// import { FormsModule } from '@angular/forms/src/forms';



@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        routing,
        FormsModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        
        
    ],
    
    declarations: [
        PagesComponent,
        LoginComponent,
        CompanyFinancialComponent,
       
       
      
        
        
        
    ]
})
export class PagesModule { }
