import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { SalesEnq } from '../../../../../../Models/SalesTransaction/sales-enq';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-sales-enquiry-pop-up-modal',
    templateUrl: './sales-enquiry-pop-up-modal.component.html',
    styleUrls: ['./sales-enquiry-pop-up-modal.component.scss']
  })

  export class SalesEnquiryPopUpModalComponent implements OnInit 
  {
    public userForm:FormGroup;
    salesOrderList:{};
    check:any;
    sales_enq_id = "0";
    status:any;
    salesDate:any;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<SalesEnquiryPopUpModalComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        enquiry_id:[''],
        sales_Enquiry_Item_Dtls: this.fb.array([this.fb.group({
          item_code:'',
          item_name:'',
          quantity:'',
          uom: '',
          packing_item: '',
          packing_item_name: '',
          packing_quantity: '',
          packing_uom: '',
          remarks:'',
          qc_norms:'',
          mat_wt:'',
          price: '',
          tax_code: '',
          tax_rate: '',
          checkbox:'',
         })]),
      });
      this.salesDate = data["sales_date"];
    }

     get sales_Enquiry_Item_Dtls(){{ return this.userForm.get('sales_Enquiry_Item_Dtls') as FormArray;}}

    ngOnInit() 
    {
      this.status = false;
      this.DropDownListService.getSalesEnquiriesOpen(this.salesDate).subscribe(data=>
      {
        this.salesOrderList  = data;
        this.status = true;
      });
    }

    add()
    {
       this.sales_Enquiry_Item_Dtls.push(this.fb.group({
        item_code:'',
        item_name:'',
        quantity:'',
        uom: '',
        packing_item: '',
        packing_item_name: '',
        packing_quantity: '',
        packing_uom: '',
        remarks:'',
        qc_norms:'',
        mat_wt:'',
        price: '',
        tax_code: '',
        tax_rate: '',
        checkbox:'',
       }));
    }

    check1(salesEnqList:SalesEnq)
    {
      this.status = false;
      this.sales_enq_id = salesEnqList.enquiry_id;
      this.DropDownListService.getSalesEnqItemDtls(this.sales_enq_id).subscribe(data=>
      {
        while (this.sales_Enquiry_Item_Dtls.length) 
        this.sales_Enquiry_Item_Dtls.removeAt(0);
        for(let i=0;i<data.length;i++)
        this.add();
        this.sales_Enquiry_Item_Dtls.patchValue(data);
        this.status = true;
      });
    }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({enquiry_id:this.sales_enq_id});
    this.userForm.patchValue(this.sales_Enquiry_Item_Dtls.value)
    this.dialogRef.close(this.userForm.value);  
  }

}
    




