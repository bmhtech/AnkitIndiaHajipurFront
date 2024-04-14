import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseOrder';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';

@Component({
  selector: 'app-store-purchase-popup',
  templateUrl: './store-purchase-popup.component.html',
  styleUrls: ['./store-purchase-popup.component.scss']
})
export class StorePurchasePopupComponent implements OnInit {


  public userForm1: FormGroup;
  list:any = [];
  reference_value:any;
  supplierId:any;
  businessUnit:any;
  weightment_req:any;
  order_id = "0";
  status = false;
  //changes on 14-04-2022
  totalqty:any;
  uom:any;
  showsubmitbutton:boolean=true;
  staticArray:any = [];

  checked_totalqty = "0";
  checked_uom = "0";
  showsubmitbutton1:boolean=false;
  checkSubmit:any= [];
  supplier:any;
  itemtype:any;
  purtype:any;
  pursubtype:any;
  orderdate:any;
  Id:any;
  showbutton:boolean=true;
  purchasedate:any;
  //uomglobal:any;

  constructor(private fb: FormBuilder,private Service: PurchaseModuleServiceService,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StorePurchasePopupComponent>, @Inject(MAT_DIALOG_DATA)data) 
    {

      this.userForm1=fb.group
      ({
          pur_orderid: [''],
          date:[''],
         // global_uom:[''],

          pur_good_receipt_item_details: this.fb.array([this.fb.group({
          checkbox: '',
          item_code: '',	
          item_name: '',
          classified_item_name:'',
          packing_item: '',	
          packing_item_name: '',
          packing_uom: '',	
          packing_qty: '',	
          stock_uom: '',
          stock_qty: '',	
          price: '',
          con_factor:'',
          mat_weight: '',
          price_based_on: '',	
          amount: '',
          discount: '',	
          discount_basedon: '',	
          discount_amount: '',	
          net_amount: '',
          tax_code: '',
          tax_rate: '',	
          tax_amount: '',	
          total_amount: '',	
          qc_norms:  '',
          priority:  '',
          delivery_date:  '',	
          purpose:  '',
          to_be_used: '',
          remarks: '',
          
          final_mat_wt: '',
          no_advice_cal: '',
          id: '',
          packing_item_code: '',
          packing_size : '',     
           packing_type : '',     
           packing_weight : ''
  
          })]),
          weightment_req:[''],
          total_qty_copy: [''],
          staticuom: [''],
  
        });
        this.businessUnit = data["b_unit"];
        this.purtype=data["pur_type"];
        this.orderdate=data["order_date"];
        this.Id=data["id"];
  
     }


     get pur_good_receipt_item_details(){{ return this.userForm1.get('pur_good_receipt_item_details') as FormArray;}}
    
     add()
     {
       this.pur_good_receipt_item_details.push(this.fb.group({
        checkbox: 'true',
        item_code: '',
        item_name: '',	
        classified_item_name:'',
        packing_item: '',	
        packing_item_name: '',
        packing_uom: '',	
        packing_qty: '',	
        stock_uom: '',
        stock_qty: '',	
        price: '',
        con_factor:'',
        mat_weight: '',
        price_based_on: '',	
        amount: '',
        discount: '',	
        discount_basedon: '',	
        discount_amount: '',	
        net_amount: '',
        tax_code: '',
        tax_rate: '',	
        tax_amount: '',	
        total_amount: '',	
        qc_norms:  '',
        priority:  '',
        delivery_date:  '',	
        purpose:  '',
        to_be_used: '',
        remarks: '',
        
        final_mat_wt: '',
        no_advice_cal: '',
        id: '',
        packing_item_code: '',
        packing_size : '',     
         packing_type : '',     
         packing_weight : ''
      
  
      }));
    }

  ngOnInit() 
  {
        if(this.Id == 0)//on first time 
        {
        this.showbutton=true;
        this.status = false;
        console.log(" check here :: "+ this.purtype)
        if(this.purtype=='ITMT00004')
        {
          this.DropDownListService.getGrnThroughPurOrdstore(this.businessUnit,this.purtype).subscribe(data=>{
             console.log("data:"+JSON.stringify(data))
             this.list  = data; 
             this.status = true;
             this.businessUnit= data["business_unit"];
   
         });
        }
        else if(this.purtype=='ITMT00002')
        {
          this.DropDownListService.getGrnThroughPurOrdpacking(this.businessUnit,this.purtype).subscribe(data=>{
            console.log("data:"+JSON.stringify(data))
            this.list  = data; 
            this.status = true;
            this.businessUnit= data["business_unit"];
  
        });
        }
        else
        {
          this.DropDownListService.getGrnThroughPurOrd(this.businessUnit,this.purtype).subscribe(data=>{
            // console.log("data:"+JSON.stringify(data))
             this.list  = data; 
             this.status = true;
             this.businessUnit= data["business_unit"];
   
         });
        }
       
      }
      else
      {
      this.showbutton=false;
      this.status = false;
      this.Service.retrivePurchaseGoodReceiptPopup(this.Id).subscribe(data=>
        {
         // console.log("chkdata1:"+JSON.stringify(data))
          this.staticArray.push(data);
          
          this.list  =  this.staticArray;
          
          this.Service.grnItemDtlsRetriveList(data["approved"]).subscribe(itemdata=>
            {
             // console.log("bid here:"+JSON.stringify(itemdata))
              while (this.pur_good_receipt_item_details.length ) 
              {
                this.pur_good_receipt_item_details.removeAt(0);
              }
              for(let i=0;i<itemdata.length;i++)
              {
                this.add();
                this.pur_good_receipt_item_details.at(i).patchValue({item_name:itemdata[i]["adv_item_name"],packing_item_name:itemdata[i]["adv_packing_name"],
                packing_uom:itemdata[i]["adv_pack_uom"],packing_qty:itemdata[i]["adv_pack_qty"],stock_uom:itemdata[i]["adv_item_uom"],stock_qty:itemdata[i]["uadv_item_qtym"],price:itemdata[i]["unit_rate"],
                mat_weight:itemdata[i]["adv_mat_wt"],price_based_on:itemdata[i]["price_based_on"],discount:itemdata[i]["discount"],
                discount_basedon:itemdata[i]["discount_based_on"],discount_amount:itemdata[i]["discount_amt"],net_amount:itemdata[i]["net_amt"],
                amount:itemdata[i]["amount"],tax_code:itemdata[i]["tax_code"],checkbox:true,tax_rate:itemdata[i]["tax_rate"],tax_amount:itemdata[i]["tax_amt"],
                qc_norms:itemdata[i]["qc_norms"],con_factor:itemdata[i]["con_factor"],classified_item_name:itemdata[i]["classified_item_name"]})

                
              }
            this.status = true;
          
            });
        });
      }
  }

  check1(purOrderList:PurchaseOrder)
  {
        this.status = false;
        this.showsubmitbutton=true;
        this.order_id = purOrderList.pur_orderid;
        this.totalqty = purOrderList.total_qty;
        //this.uom = purOrderList.staticuom;
        this.weightment_req = purOrderList.weightment_req;
        if(this.purtype=='ITMT00004')
        {
          this.DropDownListService.getpurorderstorepurchase(this.order_id).subscribe(data=>
            {
              while (this.pur_good_receipt_item_details.length ) 
              {this.pur_good_receipt_item_details.removeAt(0);}
              for(let i=0;i<data.length;i++)
              {this.add(); 
                this.uom=data[i]["stock_uom"];}
              this.pur_good_receipt_item_details.patchValue(data);
              this.status = true;
            });
    
        }
        else if(this.purtype=='ITMT00002')
        {
          this.DropDownListService.getpurorderpacking(this.order_id).subscribe(data=>
            {
              while (this.pur_good_receipt_item_details.length ) 
              {this.pur_good_receipt_item_details.removeAt(0);}
              for(let i=0;i<data.length;i++)
              {this.add(); 
                this.uom=data[i]["stock_uom"];}
              this.pur_good_receipt_item_details.patchValue(data);
              this.status = true;
            });
        }
        else
        
        {
          this.DropDownListService.getPurOrdCNQUPList(this.order_id).subscribe(data=>
            {
              while (this.pur_good_receipt_item_details.length ) 
              {this.pur_good_receipt_item_details.removeAt(0);}
              for(let i=0;i<data.length;i++)
              {this.add(); 
                this.uom=data[i]["stock_uom"];}
              this.pur_good_receipt_item_details.patchValue(data);
              this.status = true;
            });
    
        }

      
        this.purchasedate=purOrderList.ord_date;
  }

  SendDataToDifferentComponenet()
  {
    this.userForm1.patchValue({pur_orderid: this.order_id})
    this.userForm1.patchValue(this.pur_good_receipt_item_details.value)
    this.userForm1.patchValue({weightment_req: this.weightment_req})
    this.userForm1.patchValue({total_qty_copy: this.totalqty})

    //date:[''],
   // global_uom:[''],
    this.userForm1.patchValue({staticuom: this.uom,purchasedate:this.purchasedate})
    this.submitstatus();
    if(this.showsubmitbutton == true && this.showsubmitbutton1 == true)
    {
      this.dialogRef.close(this.userForm1.value);
    }
    else
    {
       alert("Please tick on checkbox!!!!");
    }
     
  }

  submitstatus()
  {
    this.checkSubmit=[];
    for(let i=0;i<this.pur_good_receipt_item_details.length;i++)
    {
      
      if(this.pur_good_receipt_item_details.at(i).get("checkbox").value == true || this.pur_good_receipt_item_details.at(i).get("checkbox").value == "true")
      {
        this.checkSubmit.push("true");
      }
    }
    
    if(this.checkSubmit.includes("true"))
    {
      this.showsubmitbutton1=true; 
    }
  }
 
}
