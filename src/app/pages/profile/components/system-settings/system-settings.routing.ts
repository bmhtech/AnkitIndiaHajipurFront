import { Routes, RouterModule } from '@angular/router';
import { NavdynamicComponent } from './components/navdynamic/navdynamic.component';

import { SystemSettingsComponent } from './system-settings.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NewUserRoleComponent } from './components/new-user-role/new-user-role.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SystemSettingsComponent,
        children: [
            
             { path: '', redirectTo: 'NavbarSettings', pathMatch: 'full' },
             { path: 'NavbarSetting', component: NavdynamicComponent },
             { path: 'userprofile', component: UserProfileComponent },
             { path: 'Settings', component: SettingsComponent },
             { path: 'User-Role-Access', component: NewUserRoleComponent }
             
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);