import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAllocationComponent } from './component/task-allocation/task-allocation.component';
import { TaskManagerComponent } from './task-manager.component';
import { routing } from './task-manager-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule, MatButtonModule, MatCheckboxModule  } from '@angular/material';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material';
import { TaskprogressComponent } from './component/taskprogress/taskprogress.component';
import { ProgressReportComponent } from './component/progress-report/progress-report.component';

@NgModule({
  declarations: [
    TaskManagerComponent,
    TaskAllocationComponent,
    TaskprogressComponent,
    ProgressReportComponent
  ],
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    SelectAutocompleteModule,
  ]
})
export class TaskManagerModule { }
