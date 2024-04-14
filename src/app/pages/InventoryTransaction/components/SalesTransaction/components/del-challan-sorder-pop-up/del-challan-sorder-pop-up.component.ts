// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { SalesOrder, sales_Order_Item_Dtls } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

 @Component({
  selector: 'app-del-challan-sorder-pop-up',
  templateUrl: './del-challan-sorder-pop-up.component.html',
  styleUrls: ['./del-challan-sorder-pop-up.component.scss']
})

  export class DelChallanSOrderPopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    salesOrderList:{};
    check:any;
    sales_ord_id = "0";
    party_id:any; 
    status = false;
    Challan_Date:any;
    Company:any;
    selectedSalesOrderId:any;
    selectedItemDtls:any = [];
    Id:any;
    showbutton:boolean=true;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<DelChallanSOrderPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        order_id:[''],
        sales_Order_Item_Dtls: this.fb.array([this.fb.group({
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
          price:'',
          price_based_on:'',
          amount:'',
          discount_type:'',
          discount_rate:'',
          tolerance:'',
          tax_code:'',
          tax_rate: '',
          tax_amt: '',
          total_amt: '',
          acc_norms:'',
          discount_amt:'',
          checkbox:''})]),
      });
      this.party_id = data["partyid"];
      this.Challan_Date = data["Challan_Date"];
      this.Company = data["Company"];
      this.Id=data["id"];
    }

     get sales_Order_Item_Dtls(){{ return this.userForm.get('sales_Order_Item_Dtls') as FormArray;}}

    ngOnInit() 
    {
      this.status = false;
      //console.log("check"+this.Id)
      if(this.Id == 0)//on first time 
      {
        this.showbutton=true;
        this.DropDownListService.getDeliverySalesOrder("party="+this.party_id+"&invdate="+this.Challan_Date+"&comp="+this.Company).subscribe(salesOrderData=>
          {
            this.salesOrderList  = salesOrderData;
            this.status = true;
          });
      }
      else{
        this.showbutton=false;
        //alert(this.Id);
        this.DropDownListService.getDeliverySalesOrderUpdate(this.Id).subscribe
        (salesOrderData =>
          {
            this.salesOrderList  = salesOrderData;
            this.DropDownListService.getSalesOrdItemDtlsUpdate(this.Id).subscribe(salesOrderItemData=>
              {
                while (this.sales_Order_Item_Dtls.length ) 
                this.sales_Order_Item_Dtls.removeAt(0);
                for(let data1 of salesOrderItemData)
                this.add();
                this.sales_Order_Item_Dtls.patchValue(salesOrderItemData);
                this.status = true;
              });
          });
      }
     
    }

    add()
    {
      this.sales_Order_Item_Dtls.push(this.fb.group({
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
        price:'',
        price_based_on:'',
        amount:'',
        discount_type:'',
        discount_rate:'',
        tolerance:'',
        tax_code:'',
        tax_rate: '',
        tax_amt: '',
        total_amt: '',
        acc_norms:'',
        discount_amt:'',
        checkbox:''}))
    }

    check1(salesOrdList:SalesOrder)
    {
      this.sales_ord_id = salesOrdList.order_id;
      this.status = false;
      this.DropDownListService.getSalesOrdItemDtls(this.sales_ord_id).subscribe(salesOrderItemData=>
      {
        while (this.sales_Order_Item_Dtls.length ) 
        this.sales_Order_Item_Dtls.removeAt(0);
        for(let data1 of salesOrderItemData)
        this.add();
        this.sales_Order_Item_Dtls.patchValue(salesOrderItemData);
        this.status = true;
      });
    }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({order_id: this.sales_ord_id});
    this.userForm.patchValue(this.sales_Order_Item_Dtls.value);
    this.dialogRef.close(this.userForm.value);  
  }

}
    





