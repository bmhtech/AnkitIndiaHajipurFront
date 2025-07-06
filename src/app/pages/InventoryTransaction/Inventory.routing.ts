import { Routes, RouterModule } from '@angular/router';
import { InventoryComponents } from './Inventory.component';


const childRoutes: Routes = [
    {
        path: '',
        component: InventoryComponents,
        children: [
            { path: '', redirectTo: 'purchase', pathMatch: 'full' },
            { path: 'purchase', loadChildren: './components/Purchase/Purchase.module#PurchaseModule' },
            { path: 'weighment', loadChildren: './components/Weighment/Weighment.module#weighmentModule' },
            { path: 'salestransaction', loadChildren: './components/SalesTransaction/SalesTransaction.module#SalesTransactionModule' },
            { path: 'stocktransfer', loadChildren: './components/StockTransfer/StockTransfer.module#StockTransferModule' },
            { path: 'production', loadChildren: './components/Production/Production.module#ProductionModule' },
            { path: 'gatepass', loadChildren: './components/gate-pass/gate-pass.module#GatePassModule' },
            { path: 'jobwork', loadChildren: './components/jobwork/jobwork.module#JobworkModule' },
            { path: 'transport', loadChildren: './components/transport/transport.module#TransportModule' },
            { path: 'storetransaction', loadChildren: './components/store-transaction/store-transaction.module#StoreTransactionModule' },
            { path: 'fumigation-record', loadChildren: './components/fumigation-record/fumigation-record.module#FumigationRecordModule'},
            
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);