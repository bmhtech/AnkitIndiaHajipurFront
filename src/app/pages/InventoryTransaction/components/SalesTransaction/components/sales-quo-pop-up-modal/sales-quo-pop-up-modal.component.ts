import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Sales_Quotation, sales_Quotation_Item_Dtls } from '../../../../../../Models/SalesTransaction/Sales_Quotation';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-sales-quo-pop-up-modal',
    templateUrl: './sales-quo-pop-up-modal.component.html',
    styleUrls: ['./sales-quo-pop-up-modal.component.scss']
  })

  export class SalesQuoPopUpModalComponent implements OnInit 
  {
    public userForm:FormGroup;
    salesQuotationList:{};
    quotation_type:any;
    check:any;
    sales_quo_id = "0";
    Popupchecked:any=[];
    status = false;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<SalesQuoPopUpModalComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        quotation_id: [''],
        sales_Quotation_Item_Dtls: this.fb.array([this.fb.group({
          slno:'',
          item_code:'',
          item_name:'',
          packing:'',
          packing_name:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          con_factor:'',
          mat_wt:'',
          hsn_code:'',
          price:'',
          price_based_on:'',
          amount:'',
          discount_type:'',
          discount_rate:'',
          discount_amt: '',
          tolerance:'',
          tax_code:'',
          tax_rate: '',
          tax_amt:'',
          total_amt:'',
          acc_norms:'',
          packing_list_req:'',
          packing_list:'',
          checkbox:'',})]),
      });
      this.quotation_type = data["qu_type"];
    }

     get sales_Quotation_Item_Dtls(){{ return this.userForm.get('sales_Quotation_Item_Dtls') as FormArray;}}

    ngOnInit() 
    {
      this.status = false;
      console.log(this.quotation_type )
      if(this.quotation_type == "finalize")
      {
        this.DropDownListService.salesQuotationFinalise().subscribe(data=>
        {
          this.salesQuotationList  = data;
          this.status = true;
        });
      }

      if(this.quotation_type == "previous Quotation")
      {
        this.DropDownListService.salesQuotationPrevList().subscribe(data=>
        {
          this.salesQuotationList  = data;
          this.status = true;
        });
      }
      
    }

    add()
    {
      this.sales_Quotation_Item_Dtls.push(this.fb.group({
        slno:'',
        item_code:'',
        item_name:'',
        packing:'',
        packing_name:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        con_factor:'',
        mat_wt:'',
        hsn_code:'',
        price:'',
        price_based_on:'',
        amount:'',
        discount_type:'',
        discount_rate:'',
        discount_amt:'',
        tolerance:'',
        tax_code:'',
        tax_rate:'',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        packing_list_req:'',
        packing_list:'',
        checkbox:''}))
    }

    check1(salesQuoList:Sales_Quotation)
    {
      this.sales_quo_id = salesQuoList.quotation_id;
      this.status = false;
      this.DropDownListService.getSalesQuotItemDtls(this.sales_quo_id).subscribe(data=>
      {
        console.log("POPUP : : "+JSON.stringify(data))
        while (this.sales_Quotation_Item_Dtls.length ) 
        {this.sales_Quotation_Item_Dtls.removeAt(0);}
        for(let i=0;i<data.length;i++){this.add(); this.Popupchecked[i]=true;}
        this.sales_Quotation_Item_Dtls.patchValue(data);
        this.status = true;
      });
    }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({quotation_id:  this.sales_quo_id});
    this.userForm.patchValue(this.sales_Quotation_Item_Dtls.value)
    this.dialogRef.close(this.userForm.value);  
  }

}
    




