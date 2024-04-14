import { Component, OnInit, Inject} from '@angular/core';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Enquiry, EnquiryServiceDetails} from '../../../../../../models/transaction/PurchaseTransaction/PurchaseEnquiry';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

  @Component({
    selector: 'app-purchase-enq-pop-up-modal',
    templateUrl: './purchase-enq-pop-up-modal.component.html',
    styleUrls: ['./purchase-enq-pop-up-modal.component.scss']})

  export class PurchaseEnqPopUpModalComponent implements OnInit 
  {
    public userForm:FormGroup;
    reference_value:any;
    supplierId:any;
    purEnqList:any=[];
    status=false;
    itemtype:any;
  
    constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PurchaseEnqPopUpModalComponent>,
      @Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm=fb.group
      ({ 
         EnquiryServiceDetails: this.fb.array([this.fb.group({
          checkbox:'',
          enquiry_id:'',
          item_code:'',
          packing_item:'',
          packing_uom:'',
          packing_qty:'',
          item_uom:'',
          item_qty:'',
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
          required_date:'',
          purpose:'',
          to_be_used:'',
          remarks:'',
          packing_list_req:'',
          packing_list:'', })])
      });
      this.reference_value = data["ref_type"];
      this.supplierId = data["supplier_id"];
      this.itemtype = data["item_type"];
    }
  
    get EnquiryServiceDetails() { return this.userForm.get('EnquiryServiceDetails') as FormArray;}
  
    ngOnInit()
    {
      this.status = false;
      this.DropDownListService.getPurEnquiryDDCSuppList(this.reference_value, this.supplierId, this.itemtype).subscribe(data=>
      {
        this.purEnqList  = data; 
        this.status = true;
      });
      
    }
  
    enqId:any;
    check1(index)
    {
      this.enqId = index.enquiry_id;
      this.status = false;
      this.EnquiryServiceDetails.removeAt(0);
      this.DropDownListService.getPurEnquiryCNQUPList(this.enqId).subscribe(data=>
      { 
        for(let data1 of data){this.add();}
        this.EnquiryServiceDetails.patchValue(data);
        this.status = true;
      });
    }
  
    add()
    {
      this.EnquiryServiceDetails.push(this.fb.group({
        checkbox:'',
        enquiry_id:'',
        item_code:'',
        packing_item:'',
        packing_uom:'',
        packing_qty:'',
        item_uom:'',
        item_qty:'',
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
        required_date:'',
        purpose:'',
        to_be_used:'',
        remarks:'',
        packing_list_req:'',
        packing_list:'',}));
    }
  
    SendDataToDifferentComponenet()
    {
      this.dialogRef.close(this.EnquiryServiceDetails.value);  
    }
  }
  
  
  
  
  
