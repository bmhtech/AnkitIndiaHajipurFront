import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { fork } from 'cluster';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
// E:\Angular Project\AnkitIndia\AnkitIndia-FrontEnd\src\app\Models\NavDynamicChanges.ts
import { MENU_ITEM1} from '../../../../../../Models/NavDynamicChanges';
import { UserRoles} from '../../../../../../Models/user-roles';
import {MatDialogRef} from '@angular/material/dialog';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-navdynamic',
  templateUrl: './navdynamic.component.html',
  styleUrls: ['./navdynamic.component.scss']
})
export class NavdynamicComponent implements OnInit 
{
  submitted = false;
  UserList:any = [];
  RoleList:any=[];
  listRole:UserRoles[];
 // public userForm:FormGroup;
 activeIsChecked: any;
 activeIsChecked1:any;
 activeIsChecked2:any;
 user:String="";
 role:string="";
 Parent_Role_ID="0";
 form: FormGroup;
 UserForm:FormGroup;
model: MENU_ITEM1 = new MENU_ITEM1();
model1: UserRoles = new UserRoles();

constructor(public fb:FormBuilder,private router: Router,
  private Service: Master, private dialog: MatDialog,private DropDownListService: DropdownServiceService)  
  { 

    this.UserForm=this.fb.group({
     // user_id:[''],
      role_id:[''],
      roleaccessjson:[''],
      parent_role_id:[''],

    })
      this.form=this.fb.group({
        'MENU_ITEM': this.fb.array([
         
          this.fb.group(
            {
            //  ---------------------forms fields on x level ------------------------
            'path': 'index',
            'title':'Dashboard',
            'icon':'dashboard',

            'children': this.fb.array([
         
              this.fb.group({
                'path': '',
                'title': '',

                'children': this.fb.array([
                      this.fb.group({
                        'path': '',
                        'title': '',
                        'icon':'',
                      })
                ])
              })
            ])
      
           },
          )
          //this.initX()
        ])
      });
    
    }

    get MENU_ITEM() { return this.form.get('MENU_ITEM') as FormArray;}

    //get user_id(){ return this.UserForm.get("user_id") as FormControl }
    get role_id(){ return this.UserForm.get("role_id") as FormControl }
    get parent_role_id(){ return this.UserForm.get("parent_role_id") as FormControl }  
    get roleaccessjson(){ return this.UserForm.get("roleaccessjson") as FormControl }
    //get children() { return this.form.controls['MENU_ITEM'].get('children') as FormArray;}
    //get children() { return this.form.get('children') as FormArray;}

    initX() {
      return this.fb.group(
        {
        //  ---------------------forms fields on x level ------------------------
        'path': 'index',
        'title':'Dashboard',
        'icon':'dashboard',
       },
       {
        'path': 'Masters',
        'title':'Masters',
        'icon':'sitemap'
       },

      
      );
    }

    
  ngOnInit() {
    this.activeIsChecked = true;
    this.activeIsChecked1 = true;
    this.activeIsChecked2 = true;
    this.status = true;
    
    this.DropDownListService.getroles().subscribe(data=>{this.RoleList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
   
    this.DropDownListService.getRoleList().subscribe(data=>{this.listRole = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    // this.DropDownListService.getUsers().subscribe(data=>{this.UserList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    // this.ngOnInit()});
   
     const control = <FormArray>this.form.controls['MENU_ITEM'];
     control.push(this.fb.group({
      'path': 'Masters',
      'title':'Masters',
      'icon':'sitemap',
      'children': this.fb.array([ 
         
        
      ])
    }));
    const control1 = (<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray;
    control1.push(this.fb.group({
      'path': 'ItemMaster',
      'title': 'Item Master',
      'children': this.fb.array([      
        
      ])
      
    }));
  
    const control2 = ((<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray).at(0).get('children') as FormArray;
    control2.push(this.fb.group(
      {
      'path': 'ItemType',
      'title': 'Item Type',
      'icon': 'angle-right',
    }, 
    ));

    control2.push(this.fb.group(
      {
        
         'path': 'ItemCategory',
          'title': 'Item Category',
          'icon': 'angle-right',      
    },   
    ));

    control2.push(this.fb.group(
      {
        
         'path': 'ItemGroup',
          'title': 'Item Group',
          'icon': 'angle-right',     
    },  
    ));

    control2.push(this.fb.group(
      {
        
         'path': 'itemsmaster',
          'title': 'Items Master',
          'icon': 'angle-right',      
    },    
    ));

    control2.push(this.fb.group(
      {
        
         'path': 'ItemOpeningStock',
          'title': 'Item Opening Stock',
          'icon': 'angle-right',      
     },    
    ));

    //const control3 = (<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray;
    control1.push(this.fb.group({'path': 'Masters/SupplierMaster','title': 'Supplier Master','children': this.fb.array([ ])  }));
    const control3 = ((<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray).at(1).get('children') as FormArray;
    control3.push(this.fb.group(
      {
        'path': 'SupplierGroup',
        'title': 'Supplier Group',
        'icon': 'angle-right',
    },
    ));

    control3.push(this.fb.group(
      {
        'path': 'SuppliersMaster',
        'title': 'Suppliers Master',
        'icon': 'angle-right',
    },
    ));
  
    control3.push(this.fb.group(
      {
        'path': 'Transportergroup',
        'title': 'Transporter group',
        'icon': 'angle-right',
    },
    ));

    control3.push(this.fb.group(
      {
        'path': 'TransporterMaster',
        'title': 'Transporter master',
        'icon': 'angle-right',
    },
    ));

control1.push(this.fb.group({'path': 'Masters/CustomerMaster','title': 'Customer Master','children': this.fb.array([ ])  }));
const control5 = ((<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray).at(2).get('children') as FormArray;
control5.push(this.fb.group(
  {
    'path': 'CustomerGroup',
    'title': 'Customer Group',
    'icon': 'angle-right',
},
));

control5.push(this.fb.group(
  {
    'path': 'CustomersMaster',
    'title': 'Customer Master',
    'icon': 'angle-right',
},
));


control1.push(this.fb.group({'path': 'Masters/BrokerMaster','title': 'Broker Master','children': this.fb.array([ ])  }));
const control6 = ((<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray).at(3).get('children') as FormArray;
control6.push(this.fb.group(
  {
    'path': 'BrokerGroup',
    'title': 'Broker Group',
    'icon': 'angle-right',
},
));

control6.push(this.fb.group(
  {
    'path': 'BrokersMaster',
    'title': 'Broker Master',
    'icon': 'angle-right',
},
));

 control1.push(this.fb.group({'path': 'Masters/OtherPartnerMaster','title': 'Other Partner Master','children': this.fb.array([ ])  }));
 const control8 = ((<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray).at(4).get('children') as FormArray;
 control8.push(this.fb.group(
   {
     'path': 'OtherPartnerGroup',
     'title': 'Other Partner Group',
     'icon': 'angle-right',
 },
 ));
 
 control8.push(this.fb.group(
   {
     'path': 'OtherPartners',
     'title': 'Other Partner Master',
     'icon': 'angle-right',
 },
 ));

 control1.push(this.fb.group({'path': 'Masters/OtherMasters','title': 'Other Masters','children': this.fb.array([ ])  }));
 const control9 = ((<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray).at(5).get('children') as FormArray;
 control9.push(this.fb.group(
   {
     'path': 'shop-floor-master',
     'title': 'Shop Floor Master',
     'icon': 'angle-right',
 },
 ));
 
 control9.push(this.fb.group(
   {
     'path': 'PaymentTerm',
     'title': 'Payment Term Master',
     'icon': 'angle-right',
 },
 ));

 control9.push(this.fb.group(
  {
    'path': 'qcrulessetup',
    'title': 'QC Rules Setup',
    'icon': 'angle-right',
},
));

control9.push(this.fb.group(
  {
    'path': 'tds-master',
    'title': 'TDS Master',
    'icon': 'angle-right',
},
));

control9.push(this.fb.group(
  {
    'path': 'charges-master',
    'title': 'Charges Master',
    'icon': 'angle-right',
},
));

control9.push(this.fb.group(
  {
    'path': 'zone-master',
    'title': 'Zone Master',
    'icon': 'angle-right',
},
));

control9.push(this.fb.group(
  {
    'path': 'ChannelCustomerMasterComponent',
    'title': 'Channel Customer Master',
    'icon': 'angle-right',
},
));

control9.push(this.fb.group(
  {
    'path': 'WeighmentChargesMaster',
    'title': 'Weighment Charges Master',
    'icon': 'angle-right',
},
));

control9.push(this.fb.group(
  {
    'path': 'loadingPoint',
    'title': 'Loading Point',
    'icon': 'angle-right',
},
));


//new


control1.push(this.fb.group({'path': 'Masters/MisMaster','title': 'Mislenious Master','children': this.fb.array([ ])  }));
 const control10 = ((<FormArray>this.form.controls['MENU_ITEM']).at(1).get('children') as FormArray).at(6).get('children') as FormArray;
 control10.push(this.fb.group(
   {
     'path': 'company',
     'title': 'Company Master',
     'icon': 'angle-right',
 },
 ));
 
 control10.push(this.fb.group(
   {
     'path': 'company-business-unit-master',
     'title': 'Company Business Unit  Master',
     'icon': 'angle-right',
 },
 ));

 control10.push(this.fb.group(
  {
    'path': 'warehouse-master',
    'title': 'WareHouse Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'bin-master',
    'title': 'Bin Master',
    'icon': 'angle-right',
},
));

// control10.push(this.fb.group(
//   {
//     'path': 'employee-master',
//     'title': 'Employee Master',
//     'icon': 'angle-right',
// },
// ));

control10.push(this.fb.group(
  {
    'path': 'department-master',
    'title': 'Department Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'custom-uom-master',
    'title': 'Custom UOM Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'misc-master',
    'title': 'Miscellaneous Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'tax-type-master',
    'title': 'Tax Type Master',
    'icon': 'angle-right',
},
));


control10.push(this.fb.group(
  {
    'path': 'vehicle-type-master',
    'title': 'Vehicle Type Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'vehicle-master',
    'title': 'Vehicle Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'transportation-charges-matrix-master',
    'title': 'Transportation Charges Matrix Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'tax-code-master',
    'title': 'Tax Code Master',
    'icon': 'angle-right',
},
));

//

control10.push(this.fb.group(
  {
    'path': 'designation-master',
    'title': 'Designation Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'district-master',
    'title': 'District Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'city-master',
    'title': 'City Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'PostOffice',
    'title': 'Post Office Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'area-master',
    'title': 'Area Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'reason-master',
    'title': 'Reason Master',
    'icon': 'angle-right',
},
));



control10.push(this.fb.group(
  {
    'path': 'screen-master',
    'title': 'Screen Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'purpose-master',
    'title': 'Purpose Master',
    'icon': 'angle-right',
},
));

control10.push(this.fb.group(
  {
    'path': 'invoice-type-master',
    'title': 'Invoice Type',
    'icon': 'angle-right',
},
));


//PUR
const control22 = <FormArray>this.form.controls['MENU_ITEM'];
control22.push(this.fb.group({
  'path': 'invTrans',
  'title':'Inventory Transaction',
  'icon':'sitemap',
  'children': this.fb.array([ 
     
    
  ])
}));

const control11 = (<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray;
control11.push(this.fb.group({
  'path': 'purchase',
  'title': 'Purchase Inventory',
  'children': this.fb.array([      
    
  ])
  
}));

const control21 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
  control21.push(this.fb.group(
      {
      'path': 'IndentOrder',
      'title': 'Indent Order',
      'icon': 'angle-right',
    },
    ));

    const control23 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control23.push(this.fb.group(
      {
      'path': 'purchase-enquiry',
      'title': 'Purchase Enquiry',
      'icon': 'angle-right',
    },
    ));

    const control24 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control24.push(this.fb.group(
      {
      'path': 'purchase-quotation',
      'title': 'Purchase Quotation',
      'icon': 'angle-right',
    },
    ));

    const control25 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control25.push(this.fb.group(
      {
      'path': 'purchase-order',
      'title': 'Purchase Order',
      'icon': 'angle-right',
    },
    ));

    const control26 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control26.push(this.fb.group(
      {
      'path': 'quality-check',
      'title': 'Quality Check',
      'icon': 'angle-right',
    },
    ));

    const control27 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control27.push(this.fb.group(
      {
      'path': 'PeripheralQualityCheck',
      'title': 'Peripheral Quality Check',
      'icon': 'angle-right',
    },
    ));

    const control28 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control28.push(this.fb.group(
      {
      'path': 'grn',
      'title': 'GRN',
      'icon': 'angle-right',
    },
    ));

    const control29 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control29.push(this.fb.group(
      {
      'path': 'l1-selection',
      'title': 'l1-selection',
      'icon': 'angle-right',
    },
    ));

    const control30 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control30.push(this.fb.group(
      {
      'path': 'purchase-bill',
      'title': 'Purchase Bill',
      'icon': 'angle-right',
    },
    ));

    const control31 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control31.push(this.fb.group(
      {
      'path': 'pur-return-approval-note',
      'title': 'Purchase Return Approval Note',
      'icon': 'angle-right',
    },
    ));

    const control32 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control32.push(this.fb.group(
      {
      'path': 'pur-return-note',
      'title': 'pur-return-note',
      'icon': 'angle-right',
    },
    ));

    const control33 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control33.push(this.fb.group(
      {
      'path': 'debit-note',
      'title': 'Debit Note',
      'icon': 'angle-right',
    },
    ));

    const control34 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(0).get('children') as FormArray;
    control34.push(this.fb.group(
      {
      'path': 'payment-approval',
      'title': 'Payment Approval',
      'icon': 'angle-right',
    },
    ));

    //Weight

    const control12 = (<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray;
    control12.push(this.fb.group({
      'path': 'invTrans/weighment',
      'title': 'Weighment',
      'children': this.fb.array([      
        
      ])
      
    }));

    const control60 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(1).get('children') as FormArray;
    control60.push(this.fb.group(
      {
      'path': 'TagAdviceWithPo',
      'title': 'Tag Advice With PO',
      'icon': 'angle-right',
    },
    ));

    const control61 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(1).get('children') as FormArray;
    control61.push(this.fb.group(
      {
      'path': 'unloadAdvice',
      'title': 'Unload Advice',
      'icon': 'angle-right',
    },
    ));

    const control62 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(1).get('children') as FormArray;
    control62.push(this.fb.group(
      {
      'path': 'unloadWeightment',
      'title': 'Weightment',
      'icon': 'angle-right',
    },
    ));

    const control63 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(1).get('children') as FormArray;
    control63.push(this.fb.group(
      {
      'path': 'loadingAdvice',
      'title': 'Loading Advice',
      'icon': 'angle-right',
    },
    ));

    //sales

    const control50 = (<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray;
    control50.push(this.fb.group({
      'path': 'invTrans/salestransaction',
      'title': 'Sales Transaction',
      'children': this.fb.array([            
      ])  
    }));

    const control09 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control09.push(this.fb.group(
      {
      'path': 'salesenquiry',
      'title': 'Sales Enquiry',
      'icon': 'angle-right',
    },
    ));

    const control010 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control010.push(this.fb.group(
      {
      'path': 'SalesQuotation',
      'title': 'Sales Quotation',
      'icon': 'angle-right',
    },
    ));

    const control011 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control011.push(this.fb.group(
      {
      'path': 'SalesOrder',
      'title': 'Sales Order',
      'icon': 'angle-right',
    },
    ));

    const control012 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control012.push(this.fb.group(
      {
      'path': 'DeliveryChallan',
      'title': 'Delivery Challan',
      'icon': 'angle-right',
    },
    ));

    const control013 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control013.push(this.fb.group(
      {
      'path': 'SalesInvoice',
      'title': 'Sales Invoice',
      'icon': 'angle-right',
    },
    ));

    const control0121 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control0121.push(this.fb.group(
      {
      'path': 'PartyBillPayment',
      'title': 'Party Bill Payment From',
      'icon': 'angle-right',
      },
    ));

    const control014 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control014.push(this.fb.group(
      {
      'path': 'ReturnApprovalNote',
      'title': 'Return Approval Note',
      'icon': 'angle-right',
    },
    ));

    const control015 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control015.push(this.fb.group(
      {
      'path': 'SalesReturnNote',
      'title': 'Sales Return Note',
      'icon': 'angle-right',
    },
    ));

    const control016 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control016.push(this.fb.group(
      {
      'path': 'CreditNote',
      'title': 'Credit Note',
      'icon': 'angle-right',
    },
    ));
    
    const control0122 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control0122.push(this.fb.group(
      {
      'path': 'PartyBillPaymentTo',
      'title': 'Party Bill Payment To',
      'icon': 'angle-right',
      },
    ));

    const control017 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(2).get('children') as FormArray;
    control017.push(this.fb.group(
      {
      'path': 'GatePass',
      'title': 'Gate Pass',
      'icon': 'angle-right',
    },
    ));

    //production
    const control51 = (<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray;
    control51.push(this.fb.group({
      'path': 'invTrans/production',
      'title': 'Production Module',
      'children': this.fb.array([            
      ])  
    }));

    const control031 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(3).get('children') as FormArray;
    control031.push(this.fb.group(
      {
      'path': 'process-master',
      'title': 'ProcessMaster',
      'icon': 'angle-right',
    },
    ));

    const control032 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(3).get('children') as FormArray;
    control032.push(this.fb.group(
      {
      'path': 'bom-master',
      'title': 'Bom Master',
      'icon': 'angle-right',
    },
    ));

    const control033 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(3).get('children') as FormArray;
    control033.push(this.fb.group(
      {
      'path': 'production-planning',
      'title': 'Production Planning',
      'icon': 'angle-right',
    },
    ));

    const control034 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(3).get('children') as FormArray;
    control034.push(this.fb.group(
      {
      'path': 'production-transaction',
      'title': 'Production Transaction(Reg)',
      'icon': 'angle-right',
    },
    ));

    const control035 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(3).get('children') as FormArray;
    control035.push(this.fb.group(
      {
      'path': 'production-transaction-special',
      'title': 'Production Transaction(Spc)',
      'icon': 'angle-right',
    },
    ));

    const control45 = (<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray;
    control45.push(this.fb.group({
      'path': 'invTrans/stocktransfer',
      'title': 'Stock Transfer',
      'children': this.fb.array([            
      ])  
    }));

    const control431 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(4).get('children') as FormArray;
    control431.push(this.fb.group(
      {
      'path': 'indentorder',
      'title': 'StockTransfer Indent',
      'icon': 'angle-right',
    },
    ));

    const control432 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(4).get('children') as FormArray;
    control432.push(this.fb.group(
      {
      'path': 'StockTransfers',
      'title': 'Stock Transfer Order',
      'icon': 'angle-right',
    },
    ));

    const control433 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(4).get('children') as FormArray;
    control433.push(this.fb.group(
      {
      'path': 'StockTransferChallan',
      'title': 'Stock Transfer Challan',
      'icon': 'angle-right',
    },
    ));

    const control434 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(4).get('children') as FormArray;
    control434.push(this.fb.group(
      {
      'path': 'StockTransferPurchaseInvoiceComponent',
      'title': 'Stock Transfer Pur Inv',
      'icon': 'angle-right',
    },
    ));

    const control435 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(4).get('children') as FormArray;
    control435.push(this.fb.group(
      {
      'path': 'StockTransferSalesInvoiceComponent',
      'title': 'Stock Transfer Sales Inv',
      'icon': 'angle-right',
    },
    ));

    const control436 = ((<FormArray>this.form.controls['MENU_ITEM']).at(2).get('children') as FormArray).at(4).get('children') as FormArray;
    control436.push(this.fb.group(
      {
      'path': 'StockTransferGrnComponent',
      'title': 'Stock Transfer GRN',
      'icon': 'angle-right',
    },
    ));



    //System settings

    const control19 = <FormArray>this.form.controls['MENU_ITEM'];
    control19.push(this.fb.group({
    'path': 'profile',
    'title':'System Settings',
    'icon':'user',
    'children': this.fb.array([ 
     
    
  ])
}));

const control666 = (<FormArray>this.form.controls['MENU_ITEM']).at(3).get('children') as FormArray;
control666.push(this.fb.group({
      'path': 'systemsettings',
      'title': 'Administrator',
      'children': this.fb.array([      
        
      ])
      
    }));

    const control201 = ((<FormArray>this.form.controls['MENU_ITEM']).at(3).get('children') as FormArray).at(0).get('children') as FormArray;
    control201.push(this.fb.group(
      {
      'path': 'userprofile',
      'title': 'User Profile',
      'icon': 'angle-right',
    }, 
    ));

    const control202 = ((<FormArray>this.form.controls['MENU_ITEM']).at(3).get('children') as FormArray).at(0).get('children') as FormArray;
    control202.push(this.fb.group(
      {
      'path': 'NavbarSetting',
      'title': 'Role Creation',
      'icon': 'angle-right',
    }, 
    ));

    const control203 = ((<FormArray>this.form.controls['MENU_ITEM']).at(3).get('children') as FormArray).at(0).get('children') as FormArray;
    control203.push(this.fb.group(
      {
      'path': 'Settings',
      'title': 'Settings',
      'icon': 'angle-right',
      }
    ));



    const control191 = <FormArray>this.form.controls['MENU_ITEM'];
    control191.push(this.fb.group({
    'path': 'report',
    'title':'Report',
    'icon':'angle-right',
    'children': this.fb.array([        
  ])
}));

const control6666 = (<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray;
control6666.push(this.fb.group({
      'path': 'salesreport',
      'title': 'Sales Report',
      'children': this.fb.array([      
        
      ])
      
    }));

    const control2021 = ((<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray).at(0).get('children') as FormArray;
    control2021.push(this.fb.group(
      {
      'path': 'partyledger',
      'title': 'Party Ledger',
      'icon': 'angle-right',
    }, 
    ));

    const control2022 = ((<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray).at(0).get('children') as FormArray;
    control2022.push(this.fb.group(
      {
      'path': 'controlaccount',
      'title': 'Control Account',
      'icon': 'angle-right',
    }, 
    ));

    const control2023 = ((<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray).at(0).get('children') as FormArray;
    control2023.push(this.fb.group(
      {
      'path': 'SalesReportDynamic',
      'title': 'Sales/Purchase-Report',
      'icon': 'angle-right',
    }, 
    ));


    const control2024 = ((<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray).at(0).get('children') as FormArray;
    control2024.push(this.fb.group(
      {
      'path': 'Salesreportsorting',
      'title': 'Report-Sorting',
      'icon': 'angle-right',
    }, 
    ));
    const control2025 = ((<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray).at(0).get('children') as FormArray;
    control2025.push(this.fb.group(
      {
      'path': 'SalesReportDynamicView',
      'title': 'View-Reports',
      'icon': 'angle-right',
    }, 
    ));
    
   
    // const control66667 = (<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray;
    // control66667.push(this.fb.group({
    //   'path': 'report/purchase_report',
    //   'title': 'Purchase Report',
    //   'children': this.fb.array([      
        
    //   ])
      
    // }));

    // const control2024 = ((<FormArray>this.form.controls['MENU_ITEM']).at(4).get('children') as FormArray).at(1).get('children') as FormArray;
    // control2024.push(this.fb.group(
    //   {
    //   'path': 'purchasereport',
    //   'title': 'Purchase-Register',
    //   'icon': 'angle-right',
    // }, 
    // ));

}


Refresh()
{
  this.status = false;
  if(confirm("Are you sure to reset role ?"))
  { 
    window.location.reload();
    this.status = true;
  }
  this.status = true;
}

onChanges(user:string)
{
 // alert(this.user);

//alert(user);
    this.role=user;
   // alert(this.role);
}

  DelParentNavItem(event,index) 
      {
        //alert("event:"+event+"Index:"+index);
        this.MENU_ITEM.removeAt(index);
      }

      DelChild(event,parentindex,childIndex) 
    {
    
     //  alert("DelChild: "+parentindex+","+childIndex);
       const control50 = (<FormArray>this.form.controls['MENU_ITEM']).at(parentindex).get('children') as FormArray;
       //this.children.removeAt(index);
       control50.removeAt(childIndex);
    }

    DelChild1(event,parentindex,childIndex1,childIndex12) 
    {
     // alert("DelChild: "+parentindex+","+childIndex1+","+childIndex12);
      const control436 = ((<FormArray>this.form.controls['MENU_ITEM']).at(parentindex).get('children') as FormArray).at(childIndex1).get('children') as FormArray;
     // alert("event:"+event+"Index:"+index);
     control436.removeAt(childIndex12);
    
    //window.location.reload();
    }


status = false;

send()
{
  let StrJsonData:string =JSON.stringify(this.form.value);
  this.submitted = true;
  if(!this.form.valid) 
  {
    alert('Please fill all fields!')
    return false;
  } 
  else 
    {
      this.UserForm.patchValue({roleaccessjson:StrJsonData});
          this.status = false;
          //alert("user="+this.user+"&role="+this.role+"&accjson="+StrJsonData);
          this.Service.updateUserRoles(this.UserForm.getRawValue()).subscribe(data => 
          {
            //console.log(this.form.getRawValue());
            alert("Updated successfully.");
            this.ngOnInit();
            this.UserForm.reset();
            //this.form.reset();
            this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
      
    }
}

}