import { Routes, RouterModule } from '@angular/router';
import { OtherPartnerMasterComponent } from './OtherPartnerMaster.component';

import { OtherPartnerGroupMasterComponent } from './components/OtherPartnerGroupMaster/OtherPartnerGroupMaster.component';
import { OtherPartnersComponent } from './components/other-partners/other-partners.component';



const childRoutes: Routes = [
    {
        path: '',
        component: OtherPartnerMasterComponent,
        children: [
            { path: '', redirectTo: 'OtherPartnerGroup', pathMatch: 'full' },
            { path: 'OtherPartnerGroup', component: OtherPartnerGroupMasterComponent },
            { path: 'OtherPartners', component: OtherPartnersComponent },
         
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);