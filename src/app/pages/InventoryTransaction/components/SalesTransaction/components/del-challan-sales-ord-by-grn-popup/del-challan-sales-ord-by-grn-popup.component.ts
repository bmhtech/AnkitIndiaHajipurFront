import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { SalesOrder } from '../../../../../../Models/SalesTransaction/SalesOrder';

@Component({
  selector: 'app-del-challan-sales-ord-by-grn-popup',
  templateUrl: './del-challan-sales-ord-by-grn-popup.component.html',
  styleUrls: ['./del-challan-sales-ord-by-grn-popup.component.scss']
})
export class DelChallanSalesOrdByGrnPopupComponent implements OnInit {
 public userForm:FormGroup;
    salesOrderList:{};
    check:any;
    sale_order_id:any;
    bunit:any;
    invtype:any;
    grn_id:any; 
    status = false;
    selectedSalesOrderId:any;
    selectedItemDtls:any = [];
    Id:any;
    showbutton:boolean=true;
    fin_year:any;
    showsubmitbutton: boolean = true;
    showsubmitbutton1: boolean = false;
    checkSubmit: any = [];

    constructor( private fb: FormBuilder,private Service: Master,
          private DropDownListService: DropdownServiceService,
          private dialogRef: MatDialogRef<DelChallanSalesOrdByGrnPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
        {
          this.userForm=fb.group(
          {
            order_id:[''],
            b_unit:[''],
            inv_type:[''],
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
          this.grn_id = data["grn_id"];
          this.sale_order_id = data["sale_order_id"];
          this.Id=data["id"];
        }
    
         get sales_Order_Item_Dtls(){{ return this.userForm.get('sales_Order_Item_Dtls') as FormArray;}}
    
        ngOnInit() 
        {
          this.status = false;
          this.fin_year=localStorage.getItem("financial_year");
          //console.log("check"+this.Id)
          if(this.Id == 0)//on first time 
          {
            this.showbutton=true;
            this.DropDownListService.getDelvChallanByOrder(this.sale_order_id,this.fin_year).subscribe(salesOrderData=>
              {
                this.salesOrderList  = salesOrderData;
                this.status = true;
              });
          }
          else{
            this.showbutton=false;
            //alert(this.Id);
            /*this.DropDownListService.getDeliverySalesOrderUpdate(this.Id).subscribe
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
              });*/
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
            checkbox:'true'}))
        }
    
        check1(salesOrdList:SalesOrder)
        {
          this.sale_order_id = salesOrdList.order_id;
          this.bunit = salesOrdList.business_unit;
          this.invtype = salesOrdList.inv_type;

          this.status = false;
          this.DropDownListService.getSaleOrderItemThroughGrn(this.sale_order_id,this.grn_id).subscribe(salesOrderItemData=>
          {
            while (this.sales_Order_Item_Dtls.length ) 
            this.sales_Order_Item_Dtls.removeAt(0);
            for(let data1 of salesOrderItemData)
            this.add();
            this.sales_Order_Item_Dtls.patchValue(salesOrderItemData);
            this.status = true;
          });
        }
    
      SendDataToDifferentComponenet() {

        this.userForm.patchValue({ order_id: this.sale_order_id })
        this.userForm.patchValue(this.sales_Order_Item_Dtls.value)
    
        this.submitstatus();
        if (this.showsubmitbutton == true && this.showsubmitbutton1 == true) {
    
          this.dialogRef.close(this.userForm.value);
        }
        else {
          alert("Please tick on checkbox!!!!");
        }
    
      }
    
      submitstatus() {
        this.checkSubmit = [];
        for (let i = 0; i < this.sales_Order_Item_Dtls.length; i++) {
    
          if (this.sales_Order_Item_Dtls.at(i).get("checkbox").value == true || this.sales_Order_Item_Dtls.at(i).get("checkbox").value == "true") {
            this.checkSubmit.push("true");
    
          }
        }
    
        if (this.checkSubmit.includes("true")) {
    
          this.showsubmitbutton1 = true;
    
        }
      }

}
