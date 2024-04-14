import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurchaseBill, PurchaseBillItem} from '../../../../../../models/transaction/PurchaseTransaction/purchase-bill';

  @Component({
    selector: 'app-purchase-bill-pop-up',
    templateUrl: './purchase-bill-pop-up.component.html',
    styleUrls: ['./purchase-bill-pop-up.component.scss']})

  export class PurchaseBillPopUpComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    purBillId = "0";
    item_type:any;
    item_sub_type:any;
    b_unit:any;
    supplierId:any;
    date:any;
    fin_year:any;
    companyId:any;
    status = false;
    showbutton:boolean=true;
    checkboxcheck:boolean=false;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PurchaseBillPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        pur_bill_id: [''],
        PurchaseBillItem: this.fb.array([this.fb.group({
          checkbox: '',
          adv_item_code:'',	
          adv_item_name: '',
          adv_packing_item:'',
          adv_packing_item_name: '',
          passed_packing_qty:'',	
          passed_packing_uom:'',	
          passed_item_qty:'',	
          passed_mat_weight:'',	
          passed_item_uom:'',	
          unit_rate:'',	
          price_based_on:'',
          amount:'',	
          discount:'',	
          discount_basedon:'',	
          discount_amount:'',	 
          net_amount:'',	
          qc_deduction :'',
          net_amt_after_qc :'',
          tax_code:'',	
          tax_rate:'',
          tax_amt:'',	     
          gross_amt:'',	
          gl_acc:''
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
     
     get PurchaseBillItem(){{ return this.userForm1.get('PurchaseBillItem') as FormArray;}}
  
     ngOnInit() 
     {
        this.status = false;
        this.showbutton=true;
       // this.item_type="Material";
       // this.DropDownListService.getPurBillRtnApp("supplier="+this.supplierId+"&tdate="
       //  +this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data=>
       this.DropDownListService.getReturnApprovalPopupData(this.date,this.b_unit,this.supplierId,"Purchase Bill",this.fin_year,this.companyId).subscribe(data=>
        {
          this.list  = data;
          this.status = true;
        });
     }
     
     add()
     {
       this.PurchaseBillItem.push(this.fb.group({
        checkbox: '',
        adv_item_code:'',	
        adv_item_name: '',
        adv_packing_item:'',
        adv_packing_item_name: '',
        passed_packing_qty:'',	
        passed_packing_uom:'',	
        passed_item_qty:'',	
        passed_mat_weight:'',	
        passed_item_uom:'',	
        unit_rate:'',	
        price_based_on:'',
        amount:'',	
        discount:'',	
        discount_basedon:'',	
        discount_amount:'',	 
        net_amount:'',	
        qc_deduction :'',
        net_amt_after_qc :'',
        tax_code:'',	
        tax_rate:'',
        tax_amt:'',	     
        gross_amt:'',	
        gl_acc:''}));
    }
    
    

  check1(purBillList:PurchaseBill)
  {
    this.status = false;
    this.purBillId = purBillList.pur_bill_id;
    this.DropDownListService.purBillItemRetriveList(this.purBillId).subscribe(data=>
    {
      while (this.PurchaseBillItem.length ) 
      {this.PurchaseBillItem.removeAt(0);}
      for(let g=0;g<data.length;g++)
      {
        this.add(); 
        this.PurchaseBillItem.patchValue(data);
        this.PurchaseBillItem.at(g).patchValue({checkbox:true});
        this.PurchaseBillItem.at(g).get("checkbox").disable();
      }
     
      this.status = true;
    });
  }

  SendDataToDifferentComponenet()
  {
    this.userForm1.patchValue({pur_bill_id: this.purBillId})
    this.userForm1.patchValue(this.PurchaseBillItem.value)
    this.dialogRef.close(this.userForm1.value); 
    
     
     for(let j=0;j<this.PurchaseBillItem.length;j++)
     {
     
       if(this.PurchaseBillItem.at(j).get("checkbox").value==true || this.PurchaseBillItem.at(j).get("checkbox").value=='true')
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

