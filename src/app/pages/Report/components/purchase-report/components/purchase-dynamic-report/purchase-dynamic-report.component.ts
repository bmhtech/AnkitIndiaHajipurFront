import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material';
import { forkJoin } from 'rxjs';
import { PurchaseDynReport } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseDynReport';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

interface VehicleNode {
  name: string;text?:string;
  id?: number;
  children?: VehicleNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: VehicleNode;
}


const TREE_DATA: VehicleNode[] = [
  {
    name: "Sales Invoice",
    text:"sales_invoice",
    children: [
          { name: "Invoice Type", id: 1 ,text:"invoice_type"},
          { name: "Business Unit", id: 2 ,text:"business_unit"},
          { name: "Invoice No.", id: 3 ,text:"invoice_no"}, 
          { name: "Invoice Date", id: 4 ,text:"invoice_date"},
          { name: "Party Name", id: 5 ,text:"partyname"},
          { name: "Challan", id: 6 ,text:"challan"},
          { name: "E-Invoice No.", id: 7 ,text:"e_invoice_no"}, 
          { name: "Sales Order No", id: 8 ,text:"salesorderno"},
          { name: "Sales Order Date", id: 9 ,text:"salesorderdate"},
          { name: "Ref Challan No", id: 10 ,text:"refchallanno"},
          { name: "Ref Challan Date", id: 11 ,text:"refchallandate"}
         
        ],  
  },{
    name: "Item Details",
    text:"sales_invoice_item_dtls",
    children: [
          { name: "Item Name", id: 12 ,text:"item_name"},
          { name: "Item Group", id: 13 ,text:"item_group"},
          { name: "Packing Item", id: 14 ,text:"packing_name"}, 
          { name: "HSN Code", id: 15 ,text:"hsn_code"},
          { name: "Packing Qty.", id: 16 ,text:"squantity"},
          { name: "Packing UOM", id: 17 ,text:"suom"},
          { name: "Item Qty.", id: 18 ,text:"quantity"}, 
          { name: "Item UOM", id: 19 ,text:"uom"},
          { name: "Mat Wt.", id: 20 ,text:"mat_wt"},
          { name: "Price", id: 21 ,text:"price"},
          { name: "Price Based on", id: 22 ,text:"price_based_on"},
          { name: "Amount", id: 23 ,text:"amount"},
          { name: "Discount", id: 24 ,text:"discount_rate"},
          { name: "Discount Based on", id: 25 ,text:"discount_type"}, 
          { name: "Discount Amt", id: 26 ,text:"discount_amt"},
          { name: "Tax Code", id: 27 ,text:"tax_code"},
          { name: "Tax Rate(%)", id: 28 ,text:"tax_rate"},
          { name: "Tax Amt.", id: 29 ,text:"tax_amt"},
          { name: "Total Amt.", id: 30 ,text:"total_amt"}, 
          { name: "Quality Norms", id: 31 ,text:"acc_norms"}
        ],  
      },
      {
            name: "Tax Information",
            text:"sales_invoice_tax_info",
            children: [
                  { name: "PAN No", id: 32 ,text:"panno"},
                  { name: "GST No", id: 33 ,text:"gstno"},
                  { name: "CIN No", id: 34 ,text:"cinno"}, 
                  { name: "TAN No", id: 35 ,text:"tanno"}
         
        ],  
  },
  {
    name: "Broker Details",
    text:"sales_invoice_broker_dtls",
    children: [
          { name: "Broker Name", id: 36 ,text:"brokercode"},
          { name: "Basis", id: 37 ,text:"basis"},
          { name: "Rate", id: 38 ,text:"rate"}
 
          ],  
    },
    {
      name: "Transporter Details",
      text:"sales_invoice_trans_dtls",
      children: [
            { name: "Transporter Name", id: 39 ,text:"transname"},
            { name: "Vehicle Type", id: 40 ,text:"vehicletype"},
            { name: "Vehicle No", id: 41 ,text:"vehicleno"},
            { name: "E-Way Bill No", id: 42 ,text:"ewaybillno"},
            { name: "E-Way Bill Date", id: 43 ,text:"ewaybilldate"}
   
            ],  
      },
      {
        name: "Delivery Information",
        text:"sales_invoice_shipment_dtls",
        children: [
              { name: "Shipment Address", id: 39 ,text:"shipaddr"},
              { name: "Shipment Details", id: 40 ,text:"shipdtls"},
              { name: "Pay To Address", id: 41 ,text:"paytoaddr"},
              { name: "Pay To Details", id: 43 ,text:"paytodtls"}
     
              ], 
        }
];


@Component({
  selector: 'app-purchase-dynamic-report',
  templateUrl: './purchase-dynamic-report.component.html',
  styleUrls: ['./purchase-dynamic-report.component.scss']
})
export class PurchaseDynamicReportComponent implements OnInit {

  model:PurchaseDynReport =new PurchaseDynReport();
  public userForm: FormGroup;
  status:any;
 
  Id:any;
  Concat_multi:any; //for parent.child list
  Concat_multi_static:any; //for only child list
  Concat_multi_parenttable:any; //for only child list
  listPurRegistration:PurchaseDynReport[];
  constructor(fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,) 
  { 
      this.userForm=fb.group({ 
      company_id:[''],
      fin_year:[''],
      username:[''],
      purchase_report:[''],
      id: [''], 
      reportname:[''],
      static_report:[''],
      table_name:[''],

       });
      this.dataSource.data = TREE_DATA;
      Object.keys(this.dataSource.data).forEach((x) => {
      this.setParent(this.dataSource.data[x], null);
      
    });
  }


  
  get id(){ return this.userForm.get("id") as FormControl }
  get sales_report(){return this.userForm.get("sales_report") as FormControl }
  get reportname(){return this.userForm.get("reportname") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
 

  ngOnInit() {
    this.status =true;
    
     forkJoin(
      this.Service.getPurchaseRegDynamicList(),
    
      ).subscribe(([PurchaseRegisterList])=>
        {
          this.listPurRegistration=PurchaseRegisterList
        this.status = true; 
        });
    
  };
       
       public treeControl = new NestedTreeControl<VehicleNode>(node => node.children);
    
    
    
       public dataSource = new MatTreeNestedDataSource<VehicleNode>();
       @ViewChild('outputDiv', {read: ElementRef}) 
       public outputDivRef: ElementRef<HTMLParagraphElement>;
       
     
  
    
  
        public hasChild = (_: number, node: VehicleNode) =>
        !!node.children && node.children.length > 0;
    
      private setParent(node: VehicleNode, parent: VehicleNode) {
        
        node.parent = parent;
        if (node.children) {
          node.children.forEach(childNode => {
            this.setParent(childNode, node);
          
          });
        }
        
      }
    
      private checkAllParents(node: VehicleNode) {
       
        if (node.parent) {
          const descendants = this.treeControl.getDescendants(node.parent);
          
          node.parent.selected = 
            descendants.every(child => child.selected);
          node.parent.indeterminate = 
            descendants.some(child => child.selected);
          this.checkAllParents(node.parent);
  
          //alert(node.parent.text);
        }
  
       
      }
    
      public itemToggle(checked: boolean, node: VehicleNode) {
        node.selected = checked;
      
        if (node.children) {
          node.children.forEach(child => {
            this.itemToggle(checked, child);
          });
        
        
        }
        this.checkAllParents(node);
        
        
      }
  
      public submit() {
    
       let checkreportName=this.userForm.get("reportname").value
       if(checkreportName=="" || checkreportName==null)
       {
         alert(" Please Enter Report Name");
       }
       else
       {
    
        this.Id= this.userForm.get("id").value as FormControl;
        this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      
   
                  //for 1st time submit
                   let result = [];
                   this.dataSource.data.forEach((node) => {
                     result = result.concat(
                       this.treeControl
                         .getDescendants(node)
                         .filter((x) => x.selected && x.name)
                         .map((x) => x.parent.text+ '.' + x.text)
                     );
                   });
                   let result2 = this.dataSource.data.reduce(
                     (acc: string[], node: VehicleNode) => 
                       acc.concat(this.treeControl
                                   .getDescendants(node)
                                   .filter(descendant => descendant.selected)
                                   .map(descendant => descendant.text))
                     , [] as string[]);
                   let Concat_multi_static=result2
                   this.userForm.patchValue({static_report:Concat_multi_static.toString()});
             
                 let Concat_multi = result;
                 this.userForm.patchValue({purchase_report:Concat_multi.toString()});
          
                 let result3 = [];
                 this.dataSource.data.forEach((node) => {
                   result3 = result3.concat(
                     this.treeControl
                       .getDescendants(node)
                       .filter((x) => x.selected && x.parent.name)
                       .map((x) => x.parent.name)
                       
                   );
                 });
   
                 let Concat_multi_parenttable=result3
   
                 this.userForm.patchValue({table_name:Concat_multi_parenttable.toString()});
            
                   this.Service.createPurchaseRegDynamic(this.userForm.getRawValue()).subscribe(data => 
                 {
                        alert("New Purchase Report Master created successfully.");
                   this.userForm.reset();
                        this.status = true;
                        this.ngOnInit();
                     
                      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                    this.ngOnInit()});
               }
          }
  
    
      onDelete(id:any)
      {
        this.status = false;
        if(confirm("Are you sure to delete this Purchase Registration ?"))
        { 
          this.userForm.patchValue({fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
        this.Service.deletePurchaseRegDynamic(this.userForm.getRawValue(),id).subscribe(data=> 
          {     
            
            if(data.reportname=='' || data.reportname==null)
            {
              alert("Opps!!! Can't delete this Purchase Registration !!!");
            }else{
              alert("Purchase Registration deleted successfully.");
            }
            this.status = true;
            this.ngOnInit()
          }); 
        }  
        else{
          alert("Opps!!! Can't delete this Purchase Registration !!!");
        }
        this.status = true;
      }
      
     
  }
  