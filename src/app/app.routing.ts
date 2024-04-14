import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
}
 ,  {
  path: '',
  component: LoginComponent,
},
{
  path: '**',
  component: LoginComponent,
},

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  } 
];

export const routing = RouterModule.forRoot(appRoutes);
