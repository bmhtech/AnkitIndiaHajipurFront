import { Component, Inject, OnInit } from '@angular/core';
import { SalesOrder, Sales_Order_Item_Dtls_for_jobwork } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-salesorderjobworkpopup',
  templateUrl: './salesorderjobworkpopup.component.html',
  styleUrls: ['./salesorderjobworkpopup.component.scss']
})
export class SalesorderjobworkpopupComponent implements OnInit {
      public userForm:FormGroup;
      salesOrderList:{};
      model:Sales_Order_Item_Dtls_for_jobwork=new Sales_Order_Item_Dtls_for_jobwork();
      check:any;
      _order_id = "0";
      status = false;
      item_codes:any = [];
      packingItem:any = [];
      advice_date:any;
      BUnit:any;
      Party:any;
      sales_ord_id = "0";
      checkSubmit:any= [];
      Uom:any;
      invType:any;
      statusmsg:any;
      Trans_borne_by_chgs:any;
      Id:any;
      showbutton:boolean=true;
      statusNoMsg:any="";

   constructor( private fb: FormBuilder,private Service: Master,
        private DropDownListService: DropdownServiceService,
        private dialogRef: MatDialogRef<SalesorderjobworkpopupComponent>, @Inject(MAT_DIALOG_DATA)data)
      {
        this.userForm=fb.group(
        {
          order_id:[''],
          salesuom:[''],
          inv_type:[''],
          trans_borne_by_chgs:[''],
          sales_Order_Item_Dtls_for_jobwork: this.fb.array([this.fb.group({
          order_id:'',
          job_item:'',
          job_packing:'',
          job_item_name:'',
          job_packing_name:'',
          job_hsn:'',
          pack_qty:'',
          pack_uom:'',
          price_based_on:'',
          item_qty:'',
          item_uom:'',
          tolerance:'',
          allostatus:'',
          checkbox:''
          })]),
        });
      
        this.advice_date = data.advice_date;
        this.BUnit = data.BUnit;
        this.Party = data.Party;
        this.Id=data["id"];
       
      }
       get sales_Order_Item_Dtls_for_jobwork(){{ return this.userForm.get('sales_Order_Item_Dtls_for_jobwork') as FormArray;}}
  
       company_name:any;
       ngOnInit() 
       {
         this.company_name = localStorage.getItem("company_name");
         this.status = false;
         
          this.showbutton=true;
          forkJoin(
            this.DropDownListService.findJobSalesOrders(this.BUnit,this.Party,this.advice_date)
          ).subscribe(([saleOrdData])=>
            {
              //console.log("Bidhan here"+JSON.stringify(saleOrdData))
              this.salesOrderList  = saleOrdData;
              this.status = true;
            });
       
        
       }
   
       add()
       {
          this.sales_Order_Item_Dtls_for_jobwork.push(this.fb.group({
           order_id:'',
           job_item:'',
            job_packing:'',
           job_item_name:'',
            job_packing_name:'',
            job_hsn:'',
            pack_qty:'',
            pack_uom:'',
            price_based_on:'',
            item_qty:'',
            item_uom:'',
            tolerance:'',
            allostatus:'',
           checkbox:'true'
         }));
       }

       check1(salesOrdList:SalesOrder)
       {
      //  console.log("uom::"+JSON.stringify(salesOrdList))
         this.sales_ord_id = salesOrdList.order_id;
         this.Uom=salesOrdList.we_uom;
         this.status = false;
         //this.Service.getSalesOrdJobItemDtls(this.sales_ord_id).subscribe(salesOrderItemData=>
        //HERE  

        this.Service.getSalesOrdItemDtlsJobwork(this.sales_ord_id).subscribe(salesOrderItemData=>
         {
          
          console.log("salesOrderItemData:"+JSON.stringify(salesOrderItemData));
          let k=0;
           while (this.sales_Order_Item_Dtls_for_jobwork.length ) 
           this.sales_Order_Item_Dtls_for_jobwork.removeAt(0);
           for(let data1 of salesOrderItemData)
           {
           this.add();

           //API STARTS(data1["ITEMID"],data1["ITEMQTY"],PARTY)
            this.DropDownListService.getLoadingRestWeightJobWorkAllocation(data1["job_item"],this.Party,data1["item_qty"]).subscribe(data=>
            {
              console.log("CHECK : : "+data["status"])
             /* if(data["status"] == 'Yes')
              {
              //DATA STATUS Yes
                //
               }
              else
              {
                this.statusNoMsg="Please Contact Jitesh Sir for JobWork Item Allocation Update.";
                //// No means NOTHING
              }
              */
              this.sales_Order_Item_Dtls_for_jobwork.patchValue(salesOrderItemData);
              //this.sales_Order_Item_Dtls_for_jobwork.at(k).patchValue({pack_qty:this.round(data1["pack_qty"],0),allostatus:data["status"]})
              //this.sales_Order_Item_Dtls_for_jobwork.at(k).patchValue({pack_qty:data1["pack_qty"],allostatus:data["status"]})
              this.sales_Order_Item_Dtls_for_jobwork.at(k).patchValue({pack_qty:Math.ceil(data1["pack_qty"]),allostatus:data["status"]})
              k++;
            })
           
          
          }
           this.status = true;
         });
       }
   
     SendDataToDifferentComponenet()
     {
       this.userForm.patchValue({order_id: this.sales_ord_id,salesuom:this.Uom});
       this.userForm.patchValue(this.sales_Order_Item_Dtls_for_jobwork.value);
       this.dialogRef.close(this.userForm.value);  
     }

     
     round(num, decimalPlaces = 0) {
      var p = Math.pow(10, decimalPlaces);
      var n = (num * p) * (1 + Number.EPSILON);
      return Math.round(n) / p;
  }
}
