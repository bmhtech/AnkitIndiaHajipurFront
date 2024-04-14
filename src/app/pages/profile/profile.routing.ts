import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { NavdynamicComponent } from './components/system-settings/components/navdynamic/navdynamic.component';
//import { RoleMasterComponent } from './components/system-settings/components/role-master/role-master.component';

const childRoutes: Routes = [
    // { path: 'systemsettings', component:NavdynamicComponent},
    { path: '', redirectTo: 'systemsettings', pathMatch: 'full' },
    { path: 'systemsettings', loadChildren: './components/system-settings/system-settings.module#SystemSettingsModule' },
    // { path: 'navdynamic', component:NavdynamicComponent},
    // { path: 'rolemaster', component:RoleMasterComponent},
    // // { path: 'editor', loadChildren: './editor/editor.module#EditorModule',canActivate:[AuthGaurdService]  },
];

export const routing = RouterModule.forChild(childRoutes);
