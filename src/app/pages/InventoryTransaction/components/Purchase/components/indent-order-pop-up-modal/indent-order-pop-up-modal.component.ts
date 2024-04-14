
import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Indent,IndentorderDetails } from '../../../../../../Models/transaction/PurchaseTransaction/IndentOrder' ;

  @Component({
    selector: 'app-indent-order-pop-up-modal',
    templateUrl: './indent-order-pop-up-modal.component.html',
    styleUrls: ['./indent-order-pop-up-modal.component.scss']})

  export class IndentOrderPopUpModalComponent implements OnInit 
  {
    public userForm:FormGroup;
    inderntOrderLists:any = [];
    ref_type:any;
    itemType:any;
    indentId = "0";
    status=false;
  
    constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<IndentOrderPopUpModalComponent>,
      @Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm=fb.group
      ({    
          indent_id: [''], 
          pur_Indent_Details: this.fb.array([this.fb.group({
            item_code:'',
            item_name:'',
            req_date:'',
            packing_item:'',
            packing_item_name:'',
            indent_item_qty:'',
            indent_pack_qty:'',
            stock_pack_uom:'',
            stock_item_uom:'',
            item_qty:'',
            indicative_price:'',
            mrp:'',
            price_based_on:'',
            amount:'',  
            net_amount:'',	
            tax_code:'',	
            tax_rate:'',
            tax_amount:'',
            total_amount:'',       
            qc_norms:'',
            priority:'',
            delivery_date:'',
            purpose:'',
            to_be_used:'',
            remarks:'',
            checkbox:''})])
      });
      this.ref_type = data["ref_type"];
      this.itemType = data["item_type"];
    }
   
    get pur_Indent_Details() { return this.userForm.get('pur_Indent_Details') as FormArray;}
  
    ngOnInit()
    {
      this.status = false;
      this.DropDownListService.getPurIndentDDCList(this.ref_type, this.itemType).subscribe(data=>
      {
        this.inderntOrderLists  = data;
        this.status = true;
      });
    }
  
    add()
    {
      this.pur_Indent_Details.push(this.fb.group({
        item_code:'',
        item_name:'',
        req_date:'',
        packing_item:'',
        packing_item_name:'',
        indent_item_qty:'',
        indent_pack_qty:'',
        stock_pack_uom:'',
        stock_item_uom:'',
        item_qty:'',
        indicative_price:'',
        mrp:'',
        price_based_on:'',
        amount:'', 
        net_amount:'',	
        tax_code:'',	
        tax_rate:'',
        tax_amount:'',
        total_amount:'',        
        qc_norms:'',
        priority:'',
        delivery_date:'',
        purpose:'',
        to_be_used:'',
        remarks:'',
        checkbox:''}));
    }
    
    check1(IndentList:Indent)
    {
      this.status = false;
      this.indentId = IndentList.indent_id;
      this.pur_Indent_Details.removeAt(0);
       this.DropDownListService.getPurIndentDetailList(this.indentId).subscribe(data=>
       {
          for(let i=0;i<data.length;i++){this.add(); }
          this.pur_Indent_Details.patchValue(data);
          this.status = true;
      });
   }
   
   SendDataToDifferentComponenet()
   {
     this.userForm.patchValue({indent_id: this.indentId});
     this.userForm.patchValue(this.pur_Indent_Details.value);
     this.dialogRef.close(this.userForm.value);  
    }
  }
   
