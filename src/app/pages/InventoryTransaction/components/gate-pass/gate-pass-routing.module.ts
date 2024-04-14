import { Routes, RouterModule } from '@angular/router';
import { GatePassComponent } from './gate-pass.component';
import { GatepassChecklistComponent } from './components/gatepass-checklist/gatepass-checklist.component';
import { GatepassGateoutComponent } from './components/gatepass-gateout/gatepass-gateout.component';
import { GatepassGateoutAComponent } from './components/gatepass-gateout-a/gatepass-gateout-a.component';
import { GatepassGetinComponent } from './components/gatepass-getin/gatepass-getin.component';
//import { VisitorMasterComponent } from './components/visitor-master/visitor-master.component';


const childRoutes: Routes = [
    {
        path: '',
        component: GatePassComponent,
        children: [
            { path: '', redirectTo: 'gatepass_checklist', pathMatch: 'full' },
            { path: 'gatepass_checklist', component: GatepassChecklistComponent },
            { path: 'gatepass-geteout', component: GatepassGateoutComponent },
            { path: 'gatepass-gateout-a', component: GatepassGateoutAComponent },
            { path: 'gatepass-gatin', component: GatepassGetinComponent },
          //  { path: 'visitor-master', component: VisitorMasterComponent }
           
        ]
    }
];


export const routing = RouterModule.forChild(childRoutes);