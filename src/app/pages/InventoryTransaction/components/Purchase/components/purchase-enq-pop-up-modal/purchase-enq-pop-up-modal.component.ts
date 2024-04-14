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
    quotationType:any;
    purEnqList:any = [];
    itemtype:any;
    enqId = "0";
    status=false;
  
    constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PurchaseEnqPopUpModalComponent>,
      @Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm=fb.group
      ({ 
          enquiry_id: [''],
          EnquiryServiceDetails: this.fb.array([this.fb.group({
            checkbox:'',
            item_code:'',
            packing_item:'',
            item_name:'',
            packing_item_name:'',
            packing_uom:'',
            packing_qty:'',
            item_uom:'',
            item_qty:'',
            mat_weight:'',
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
      this.quotationType = data["quotation_type"];
      this.itemtype = data["item_type"];
    }
  
    get EnquiryServiceDetails() { return this.userForm.get('EnquiryServiceDetails') as FormArray;}
  
    ngOnInit()
    {
      this.status = false;
      // if(this.quotationType == 'Formal')
      // {
        this.DropDownListService.getPurEnquiryDDCSuppList(this.reference_value, this.supplierId, this.itemtype).subscribe(data=>
        {
          this.purEnqList  = data; 
          this.status = true;
        });
    //   }
    //  else
    //  {
    //   this.DropDownListService.getPurEnquiryInformal(this.reference_value).subscribe(data=>
    //   {
    //     this.purEnqList  = data; 
    //     this.status = true;
    //   });
    //  }   
    }
  
    check1(index)
    {
      this.enqId = index.enquiry_id;
      this.status = false;
      while( this.EnquiryServiceDetails.length)
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
        item_code:'',
        item_name:'',
        packing_item_name:'',
        packing_item:'',
        packing_uom:'',
        packing_qty:'',
        item_uom:'',
        item_qty:'',
        mat_weight: '',
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
      this.userForm.patchValue({enquiry_id: this.enqId});
      this.userForm.patchValue(this.EnquiryServiceDetails.value);
      this.dialogRef.close(this.userForm.value);  
    }
  }
  
  
  
  
  
