import { Routes, RouterModule } from '@angular/router';
import { MisMasterComponent } from './MisMaster.component';

/* children components */
import {CompanyComponent} from './components/company/company.component';
// import {DepartmentMasterComponent} from './components/department-master/department-master.component';

import { CompanyBusinessUnitMasterComponent } from './components/company-business-unit-master/company-business-unit-master.component';
import { WareHouseMasterComponent } from './components/ware-house-master/ware-house-master.component';
import { BinMasterComponent } from './components/bin-master/bin-master.component';
import { CustomUomMasterComponent } from './components/custom-uom-master/custom-uom-master.component';

import { MiscMasterComponent } from './components/misc-master/misc-master.component';
import { TaxTypeMasterComponent } from './components/tax-type-master/tax-type-master.component';
import { VehicleTypeMasterComponent } from './components/vehicle-type-master/vehicle-type-master.component';
import { VehicleMasterComponent } from './components/vehicle-master/vehicle-master.component';
import { TransportationChargesMatrixMasterComponent } from './components/transportation-charges-matrix-master/transportation-charges-matrix-master.component';
import { TaxCodeMasterComponent } from './components/tax-code-master/tax-code-master.component';
import { InvoiceTypeComponent } from './components/invoice-type/invoice-type.component';
import { DesignationMasterComponent } from './components/designation-master/designation-master.component';
import { DistrictMasterComponent } from './components/district-master/district-master.component';
import { CityMasterComponent } from './components/city-master/city-master.component';
import { AreaMasterComponent } from './components/area-master/area-master.component';
import { ReasonMasterComponent } from './components/reason-master/reason-master.component';
import { ScreenMasterComponent } from './components/screen-master/screen-master.component';
import { PurposeMasterComponent } from './components/purpose-master/purpose-master.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { PostOfficeComponent } from './components/post-office/post-office.component';
import { DriverMasterComponent } from './components/driver-master/driver-master.component';
import { GodownmasterComponent } from './components/godownmaster/godownmaster.component';
import { HubmasterComponent } from './components/hubmaster/hubmaster.component';
import { SeivesmasterComponent } from './components/seivesmaster/seivesmaster.component';
import { BingroupComponent } from './components/bingroup/bingroup.component';
const childRoutes: Routes = [
    {
        path: '',
        component: MisMasterComponent,
        children: [
            { path: '', redirectTo: 'buttons', pathMatch: 'full' },
            { path: 'company', component: CompanyComponent },
            // { path: 'department', component: DepartmentMasterComponent },
            
            { path: 'company-business-unit-master', component: CompanyBusinessUnitMasterComponent },
            { path: 'warehouse-master', component: WareHouseMasterComponent },
            { path: 'bin-master', component: BinMasterComponent },
            { path: 'custom-uom-master', component: CustomUomMasterComponent },
            { path: 'department-master', component: DepartmentComponent },

            { path: 'misc-master', component: MiscMasterComponent },
            { path: 'tax-type-master', component: TaxTypeMasterComponent },
            { path: 'vehicle-type-master', component: VehicleTypeMasterComponent },
            { path: 'vehicle-master', component: VehicleMasterComponent },
            { path: 'transportation-charges-matrix-master', component: TransportationChargesMatrixMasterComponent },
            { path: 'tax-code-master', component: TaxCodeMasterComponent },
           
           
            { path: 'designation-master', component: DesignationMasterComponent },
            { path: 'district-master', component: DistrictMasterComponent },
            { path: 'city-master', component: CityMasterComponent },
         
            { path: 'PostOffice', component: PostOfficeComponent },

            { path: 'area-master', component: AreaMasterComponent },
            { path: 'reason-master', component: ReasonMasterComponent },
            { path: 'screen-master', component: ScreenMasterComponent },
            { path: 'purpose-master', component: PurposeMasterComponent },
            { path: 'employee-master', component: EmployeeComponent },
          
            { path: 'invoice-type-master', component: InvoiceTypeComponent },
            { path: 'driver-master', component: DriverMasterComponent },
            { path: 'godownmaster', component: GodownmasterComponent },
            { path: 'hubmaster', component: HubmasterComponent },
            { path: 'seivesmaster', component: SeivesmasterComponent },
            { path: 'bingroup', component: BingroupComponent },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
