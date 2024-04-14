
import { Routes, RouterModule } from '@angular/router';
import { TaskManagerComponent } from './task-manager.component';
import { TaskAllocationComponent } from './component/task-allocation/task-allocation.component';
import { TaskprogressComponent } from './component/taskprogress/taskprogress.component';
import { ProgressReportComponent } from './component/progress-report/progress-report.component';
const childRoutes: Routes = [
{
      path: '',
      component: TaskManagerComponent,
      children: [
        { path: '', redirectTo: 'task-allocation', pathMatch: 'full' },
        { path: 'task-allocation', component: TaskAllocationComponent },
        { path: 'taskprogress', component: TaskprogressComponent },
        { path: 'progress-report', component: ProgressReportComponent }
      ]
    }];
    export const routing = RouterModule.forChild(childRoutes);
