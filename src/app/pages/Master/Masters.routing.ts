import { Routes, RouterModule } from '@angular/router';
import { MasterComponents } from './Masters.component';
import { ChannelMasterComponent } from './components/ChannelMaster/ChannelMaster.component';

const childRoutes: Routes = [
    {
        
        path: '',
        component: MasterComponents,
        children: [ 
            { path: '', redirectTo: 'ItemMaster', pathMatch: 'full' },
            { path: 'ItemMaster', loadChildren: './components/ItemMaster/ItemMaster.module#ItemMasterModule' },
            { path: 'SupplierMaster', loadChildren: './components/SupplierMaster/SupplierMaster.module#SupplierMasterModule' },
            { path: 'CustomerMaster', loadChildren: './components/CustomerMaster/CustomerMaster.module#CustomerMasterModule' },
            { path: 'BrokerMaster', loadChildren: './components/BrokerMaster/BrokerMaster.module#BrokerModule' },
            { path: 'OtherPartnerMaster', loadChildren: './components/OtherPartnerMaster/OtherPartnerMaster.module#OtherPartnerMasterModule' },
            { path: 'ChannelMaster', component: ChannelMasterComponent },
            { path: 'OtherMasters', loadChildren: './components/OtherMaster/OtherMaster.module#OtherMasterModule' },
            { path: 'AccountMaster', loadChildren: './components/AccountMaster/AccountMaster.module#AcoountMasterModule' },
            { path: 'MisMaster', loadChildren: './components/MisMaster/MisMaster.module#MisMasterModule' },
            { path: 'ServiceItemMaster', loadChildren: './components/servicemaster/servicemaster.module#ServicemasterModule' },
            //{ path: 'AccountMaster', loadChildren: './components/OtherMaster/OtherMaster.module#OtherMasterModule' },
         // { path: 'MisleniousMaster', loadChildren: './components/OtherMaster/OtherMaster.module#OtherMasterModule' },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);