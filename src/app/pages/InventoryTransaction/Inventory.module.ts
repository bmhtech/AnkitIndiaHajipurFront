import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { routing } from './Inventory.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule, MatButtonModule, MatCheckboxModule, MatDialogModule  } from '@angular/material';
import { MatRadioModule} from '@angular/material/radio';

/* components */
import { InventoryComponents } from './Inventory.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




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
        MatRadioModule,
        MatProgressSpinnerModule,
        MomentModule,
        MatDialogModule,

    ],
    declarations: [
        InventoryComponents,
    ]
})
export class InventoryModule { }
