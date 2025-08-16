import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent, data: { title: 'LogIn - Ankit India Hajipur' }
}
 ,  {
  path: '',
  component: LoginComponent, data: { title: 'LogIn - Ankit India Hajipur' }
},
{
  path: '**',
  component: LoginComponent, data: { title: 'LogIn - Ankit India Hajipur' }
},

  {
    path: '',
    component: LoginComponent, data: { title: 'LogIn - Ankit India Hajipur' }
  },
  {
    path: '**',
    component: LoginComponent, data: { title: 'LogIn - Ankit India Hajipur' }
  } 
];

export const routing = RouterModule.forRoot(appRoutes);
