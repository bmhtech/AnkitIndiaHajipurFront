
import { Routes, RouterModule } from '@angular/router';
import { ExitclausemasterComponent } from './components/exitclausemaster/exitclausemaster.component';
import { JoborderComponent } from './components/joborder/joborder.component';
import { NongoodsserviceComponent } from './components/nongoodsservice/nongoodsservice.component';
import { NongoodssubtypemasterComponent } from './components/nongoodssubtypemaster/nongoodssubtypemaster.component';
import { NongoodstypemasterComponent } from './components/nongoodstypemaster/nongoodstypemaster.component';
import { TermasserviceComponent } from './components/termasservice/termasservice.component';
import { JobworkComponent } from './jobwork.component';
import { NongoodssrnComponent } from './components/nongoodssrn/nongoodssrn.component';
import { NongoodsservicebillComponent } from './components/nongoodsservicebill/nongoodsservicebill.component';

const childRoutes: Routes = [
  {
      path: '',
      component: JobworkComponent,
      children: [
        { path: '', redirectTo: 'joborder', pathMatch: 'full' },
        { path: 'joborder', component: JoborderComponent },
        { path: 'nongoodsservice', component: NongoodsserviceComponent },
        { path: 'nongoodssubtypemaster', component: NongoodssubtypemasterComponent },
        { path: 'nongoodstypemaster', component: NongoodstypemasterComponent },
        { path: 'exitclausemaster', component: ExitclausemasterComponent },
        { path: 'termasservice', component: TermasserviceComponent },
        { path: 'nongoodssrn', component: NongoodssrnComponent },
        { path: 'nongoodsservicebill', component: NongoodsservicebillComponent }

      ]
  }
];


export const routing = RouterModule.forChild(childRoutes);
