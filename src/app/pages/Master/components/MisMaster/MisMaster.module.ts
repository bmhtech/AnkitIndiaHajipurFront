import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './MisMaster.routing';
import { SharedModule } from '../../../../shared/shared.module';
import { ModalModule } from 'ngx-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatCheckboxModule,MatSelectModule, MatDialogModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';

//import { Master } from './service/master.service';
/* components */
import { MisMasterComponent } from './MisMaster.component';
import { CompanyComponent } from './components/company/company.component';
//import { DepartmentMasterComponent } from './components/department-master/department-master.component';

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
import { DesignationMasterComponent } from './components/designation-master/designation-master.component';
import { DistrictMasterComponent } from './components/district-master/district-master.component';
import { CityMasterComponent } from './components/city-master/city-master.component';
import { AreaMasterComponent } from './components/area-master/area-master.component';
import { ReasonMasterComponent } from './components/reason-master/reason-master.component';
import { ScreenMasterComponent } from './components/screen-master/screen-master.component';
import { PurposeMasterComponent } from './components/purpose-master/purpose-master.component';
import { DepartmentComponent } from './components/department/department.component';
import { TransportationpopupmodalComponent } from './components/transportationpopupmodal/transportationpopupmodal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EmployeeComponent } from './components/employee/employee.component';
import { InvoiceTypeComponent } from './components/invoice-type/invoice-type.component';
import { PostOfficeComponent } from './components/post-office/post-office.component';
import { DriverMasterComponent } from './components/driver-master/driver-master.component';
//import { DriverprintpopupComponent } from '../../../InventoryTransaction/components/Weighment/components/driverprintpopup/driverprintpopup.component';
import {NgxPrintModule} from 'ngx-print';
import { DriverprintpopupmisComponent } from './components/driverprintpopupmis/driverprintpopupmis.component';
import { GodownmasterComponent } from './components/godownmaster/godownmaster.component';
import { HubmasterComponent } from './components/hubmaster/hubmaster.component';
import { SeivesmasterComponent } from './components/seivesmaster/seivesmaster.component';
import { BingroupComponent } from './components/bingroup/bingroup.component';

//import { DistrictMasterComponent } from './PlaceMaster/components/district-master/district-master.component';





@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ModalModule,
        routing,
        FormsModule,
        MatTabsModule,
        MatButtonModule ,
        MatCheckboxModule , 
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatProgressSpinnerModule,
        SelectAutocompleteModule,
        NgxPrintModule,

        
    ],
    entryComponents:[TransportationpopupmodalComponent,
     // DriverprintpopupComponent,
      DriverprintpopupmisComponent],
    declarations: [
        MisMasterComponent,
        CompanyComponent,       
        CompanyBusinessUnitMasterComponent,
        WareHouseMasterComponent,
        BinMasterComponent,
        CustomUomMasterComponent,
        MiscMasterComponent,
        TaxTypeMasterComponent,
        VehicleTypeMasterComponent,
        VehicleMasterComponent,
        TransportationChargesMatrixMasterComponent,
       
        TaxCodeMasterComponent,
        DesignationMasterComponent,
        DistrictMasterComponent,
        CityMasterComponent,
        AreaMasterComponent,
        ReasonMasterComponent,
        ScreenMasterComponent,
        PurposeMasterComponent,
        DepartmentComponent,
        TransportationpopupmodalComponent,
        EmployeeComponent,
        InvoiceTypeComponent,
        PostOfficeComponent,
        DriverMasterComponent,
      //  DriverprintpopupComponent,
        DriverprintpopupmisComponent,
        GodownmasterComponent,
        HubmasterComponent,
        SeivesmasterComponent,
        BingroupComponent,
       
       
       
       // DistrictMasterComponent,
    ],
    providers: [],
  bootstrap: []
})
export class MisMasterModule { }
