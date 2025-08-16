import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';

const childRoutes: Routes = [
    {
        path: '',
        //component: IndexComponent
        component: IndexComponent, data: { title: 'Dashboard - Ankit India Hajipur' },
    }
];

export const routing = RouterModule.forChild(childRoutes);
