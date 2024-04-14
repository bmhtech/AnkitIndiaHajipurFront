import { Routes, RouterModule } from '@angular/router';
import { ItemMasterComponent } from './ItemMaster.component';
import { ItemTypeComponent } from './components/ItemTypeMaster/ItemType.component';
import { ItemGroupMasterComponent } from './components/ItemGroupMaster/ItemGroupMaster.component';
import { ItemcategorymasterComponent } from './components/ItemCategoryMaster/ItemCategoryMaster.component';
import { ItemsMasterComponent } from './components/ItemsMaster/ItemsMaster.component'; 
import { ItemOpeningStockComponent } from './components/item-opening-stock/item-opening-stock.component';
import { ItemStockComponent } from './components/item-stock/item-stock.component';
import { ItemServiceMasterComponent } from './components/item-service-master/item-service-master.component';
import { JobworkitemallocationComponent } from './components/jobworkitemallocation/jobworkitemallocation.component';
import { ItemallocationgrntaggingComponent } from './components/itemallocationgrntagging/itemallocationgrntagging.component';
import { ItemallocationpotaggingComponent } from './components/itemallocationpotagging/itemallocationpotagging.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ItemMasterComponent,
        children: [
            { path: '', redirectTo: 'ItemType', pathMatch: 'full' },
            { path: 'ItemType', component: ItemTypeComponent },
            { path: 'ItemGroup', component: ItemGroupMasterComponent },
            { path: 'ItemCategory', component: ItemcategorymasterComponent },
            { path: 'itemsmaster', component: ItemsMasterComponent },
            { path: 'ItemOpeningStock', component: ItemOpeningStockComponent },
            { path: 'item-stock', component: ItemStockComponent },
            { path: 'item-service-master', component: ItemServiceMasterComponent },
            { path: 'JobWorkItemAllocation', component: JobworkitemallocationComponent },
            { path: 'JobWorkItemAllocationGrn', component: ItemallocationgrntaggingComponent },
            { path: 'JobWorkItemAllocationGrnnew', component: ItemallocationpotaggingComponent },
        ]
    }
];


export const routing = RouterModule.forChild(childRoutes);