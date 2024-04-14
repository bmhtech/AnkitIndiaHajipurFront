import { AuthGaurdService } from '../service/auth-gaurd.service';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { CompanyFinancialComponent } from './company-financial/company-financial.component';

// import { NavDynamicComponent } from './nav-dynamic/nav-dynamic.component';

export const childRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },

    {
        path: 'companyFinancial',
        component: CompanyFinancialComponent,
    },

    {
        path: 'pages',
        component: PagesComponent,
        
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full',canActivate:[AuthGaurdService]  },
            { path: 'index', loadChildren: './index/index.module#IndexModule',canActivate:[AuthGaurdService]  },        
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule',canActivate:[AuthGaurdService]  },
            // { path: 'master', loadChildren: './ui/ui.module#UIModule',canActivate:[AuthGaurdService]  },
            //{ path: 'purchase-transaction', loadChildren: './table/table.module#TableModule' },
            { path: 'Masters', loadChildren: './Master/Masters.module#MastersModule' ,canActivate:[AuthGaurdService] },
            { path: 'invTrans', loadChildren: './InventoryTransaction/Inventory.module#InventoryModule' ,canActivate:[AuthGaurdService] },
            { path: 'taskManager', loadChildren: './task-manager/task-manager.module#TaskManagerModule',canActivate:[AuthGaurdService] },
            { path: 'stock-transaction', loadChildren: './stock-transaction/stock-transaction.module#StockTransactionModule',canActivate:[AuthGaurdService] },
            { path: 'report', loadChildren: './Report/Report.module#ReportModule',canActivate:[AuthGaurdService]  },
            { path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule',canActivate:[AuthGaurdService]  },
            { path: 'accountsmaster', loadChildren: './accountsmaster/accountsmaster.module#AccountsmasterModule' }
            
        ]
    },

  
];

export const routing = RouterModule.forChild(childRoutes);
