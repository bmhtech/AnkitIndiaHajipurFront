import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Quotation, QuotationDetails} from '../../../../../../models/transaction/PurchaseTransaction/PurchaseQuotation';

  @Component({
    selector: 'app-purchase-qnpop-up-modal',
    templateUrl: './purchase-qnpop-up-modal.component.html',
    styleUrls: ['./purchase-qnpop-up-modal.component.scss']})

  export class PurchaseQNPopUpModalComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    reference_value:any;
    supplierId:any;
    itemtype:any;
    _quotation_id = '0';
    status = false;
  
    constructor( private fb: FormBuilder,private Service: Master,
     private DropDownListService: DropdownServiceService,
     private dialogRef: MatDialogRef<PurchaseQNPopUpModalComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        quotation_id: [''],
        QuotationDetails: this.fb.array([this.fb.group({
          checkbox: '',
          item_code:'',	
          item_name:'',
          packing_item_name:'',
          packing_item:'',	
          packing_uom:'',	
          packing_qty:'',	
          stock_uom:'',	
          stock_qty:'',	
          mat_weight:'',
          price:'',	
          price_based_on:'',	
          amount:'',
          taxable_amount: '',	
          discount:'',	
          discount_basedon:'',	
          discount_amount:'',	
          net_amount:'',	
          tax_code:'',	
          tax_amount:'',	
          total_amount:'',	
          qc_norms:'',	
          priority:'',	
          delivery_date:'',	
          purpose:'',	
          to_be_used:'',	
          remarks:'',
          tax_rate:'',	
          packing_list_req:'',
          packing_list:'',
          })]),
        });
        this.reference_value = data["ref_type"];
        this.supplierId = data["supplier_id"];
        this.itemtype = data["item_type"];
    }
     
     get QuotationDetails(){{ return this.userForm1.get('QuotationDetails') as FormArray;}}
  
     ngOnInit() 
     {
       this.status = false;
       if(this.reference_value != "Previous Quotation")
       this.DropDownListService.getPurQuotThruSuppList(this.reference_value, this.supplierId, this.itemtype).subscribe(data=>{this.list  = data; this.status = true;});
       else
       this.DropDownListService.getPurQuotPrevList().subscribe(data=>{this.list  = data; this.status = true;});
     }
     
     add()
     {
       this.QuotationDetails.push(this.fb.group({
        checkbox: '',
        item_code:'',	
        packing_item:'',
        item_name:'',
        packing_item_name:'',	
        packing_uom:'',	
        packing_qty:'',	
        stock_uom:'',	
        stock_qty:'',	
        mat_weight:'',
        price:'',	
        price_based_on:'',	
        amount:'',	
        taxable_amount: '',
        discount:'',	
        discount_basedon:'',	
        discount_amount:'',	
        net_amount:'',	
        tax_code:'',	
        tax_amount:'',	
        total_amount:'',	
        qc_norms:'',	
        priority:'',	
        delivery_date:'',	
        purpose:'',	
        to_be_used:'',	
        remarks:'',
        tax_rate:'',	
        packing_list_req:'',
        packing_list:''}));
    }
    
    check1(purOrderList:Quotation)
    {
      this.status = false;
      this._quotation_id = purOrderList.quotation_id;
      this.DropDownListService.getPurQtyCNQUPList(this._quotation_id).subscribe(data=>{
       while (this.QuotationDetails.length ) {this.QuotationDetails.removeAt(0);}
       for(let i=0;i<data.length;i++){this.add(); }
       this.QuotationDetails.patchValue(data);
       this.status = true;
      });
    }
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({quotation_id: this._quotation_id});
      this.userForm1.patchValue(this.QuotationDetails.value);
      this.dialogRef.close(this.userForm1.value);  
    }
  }
