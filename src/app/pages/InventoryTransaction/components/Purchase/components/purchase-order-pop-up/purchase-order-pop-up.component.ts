import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurchaseOrder, PurchaseOrderItem } from '../../../../../../models/transaction/PurchaseTransaction/PurchaseOrder';

  @Component({
    selector: 'app-purchase-order-pop-up',
    templateUrl: './purchase-order-pop-up.component.html',
    styleUrls: ['./purchase-order-pop-up.component.scss']})

  export class PurchaseOrderPopUpComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    item_type:any;
    item_sub_type:any;
    b_unit:any;
    supplierId:any;
    date:any;
    fin_year:any;
    companyId:any;
    order_id = "0";
    status = false;
    showbutton:boolean=true;
    checkboxcheck:boolean=true;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PurchaseOrderPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        pur_orderid: [''],
        PurchaseOrderItem: this.fb.array([this.fb.group({
          checkbox: '',
          item_code: '',	
          item_name: '',
          packing_item: '',	
          packing_item_name: '',
          packing_uom: '',	
          packing_qty: '',	
          stock_uom: '',
          stock_qty: '',	
          price: '',
          mat_weight: '',
          price_based_on: '',	
          amount: '',
          discount: '',	
          discount_basedon: '',	
          discount_amount: '',	
          net_amount: '',
          tax_code: '',
          tax_rate: '',	
          tax_amount: '',	
          total_amount: '',	
          qc_norms:  '',
          priority:  '',
          delivery_date:  '',	
          purpose:  '',
          to_be_used: '',
          remarks: '',	
          })]),
        });
        this.item_type = data["item_type"];
        this.item_sub_type = data["item_sub_type"];
        this.b_unit = data["bunit"];
        this.supplierId = data["supplier_id"];
        this.date = data["date"];
        this.fin_year = data["fin_year"];
        this.companyId = data["company_id"];
    }
     
    get PurchaseOrderItem(){{ return this.userForm1.get('PurchaseOrderItem') as FormArray;}}
  
    ngOnInit() 
    {
      this.status = false;
      this.showbutton=true;
      //this.DropDownListService.getPurOrdRtnApp("bunit="+this.b_unit+"&supplier="+this.supplierId+"&tdate="
      // +this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data=>
      this.DropDownListService.getReturnApprovalPopupData(this.date,this.b_unit,this.supplierId,"Purchase Order",this.fin_year,this.companyId).subscribe(data=>
      {
        this.list  = data;
        this.status = true;
      });
    }
     
    add()
    {
      this.PurchaseOrderItem.push(this.fb.group({
        checkbox: '',
        item_code: '',
        item_name: '',	
        packing_item: '',	
        packing_item_name: '',
        packing_uom: '',	
        packing_qty: '',	
        stock_uom: '',
        stock_qty: '',	
        price: '',
        mat_weight: '',
        price_based_on: '',	
        amount: '',
        discount: '',	
        discount_basedon: '',	
        discount_amount: '',	
        net_amount: '',
        tax_code: '',
        tax_rate: '',	
        tax_amount: '',	
        total_amount: '',	
        qc_norms:  '',
        priority:  '',
        delivery_date:  '',	
        purpose:  '',
        to_be_used: '',
        remarks: '',}));
    }
    
    check1(purOrderList:PurchaseOrder)
    {
      this.status = false;
      this.order_id = purOrderList.pur_orderid;
      this.DropDownListService.getPurOrdCNQUPList(this.order_id).subscribe(data=>
      {
        while (this.PurchaseOrderItem.length ) 
        {this.PurchaseOrderItem.removeAt(0);}
        for(let i=0;i<data.length;i++)
        {
          this.add(); 
          this.PurchaseOrderItem.at(i).patchValue({checkbox:true});
          this.PurchaseOrderItem.at(i).get("checkbox").disable();
        }
        this.PurchaseOrderItem.patchValue(data);
        this.status = true;
      });
    }
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({pur_orderid: this.order_id})
      this.userForm1.patchValue(this.PurchaseOrderItem.value)
      this.dialogRef.close(this.userForm1.value); 
      
       
       for(let j=0;j<this.PurchaseOrderItem.length;j++)
       {
         if(this.PurchaseOrderItem.at(j).get("checkbox").value==true || this.PurchaseOrderItem.at(j).get("checkbox").value=='true')
         {
           this.checkboxcheck=true;
         }
       }
       if(this.checkboxcheck==true)
       {
         this.dialogRef.close(this.userForm1.getRawValue());  
       }
       else
       {
         alert("Please tick on checkbox!!!!");
       }
     } 
    
  }

