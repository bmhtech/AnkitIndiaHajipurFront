import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { StockTransfer, stock_transfer_Item_Dtls} from '../../../../../../models/StockTransfer/stock-transfer';
import { Master } from '../../../../../../service/master.service';
@Component({
  selector: 'app-stk-challan-stk-transfer-popup',
  templateUrl: './stk-challan-stk-transfer-popup.component.html',
  styleUrls: ['./stk-challan-stk-transfer-popup.component.scss']
})

export class StkChallanStkTransferPopupComponent implements OnInit
 {
  public userForm:FormGroup;
  stockDocsList:any = [];
  _order_id:any;
  _order_no:any;
  _rcv_bu:any;
 

  check : any;
  status=false;
  Id:any;
  showbutton:boolean=true;
  staticArray:any = [];

  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService, private Service : Master,
    private dialogRef: MatDialogRef<StkChallanStkTransferPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data)
     {
      this.userForm=fb.group
      ({   
        order_id:[''],  
        order_no:[''],
        rcv_bu:[''],
        StkTransferDetail: this.fb.array([this.fb.group({
          order_id:'',
          order_no:'',
          packing_name:'',
            item_name:'',
          item_code:'',
          packing: '',
          quantity: '',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt: '',
          price: '',
          price_based_on:'',
          amount: '',
          gross_amt: '',
          tax_id:'',
          tax_rate:'',
          tax_amt:'',
          net_amt:'',
          acc_norms:'',
          checkbox:''
      })])
      });
      this.Id=data["id"];
      }
      get order_id(){return this.userForm.get("order_id") as FormControl};
      get order_no(){return this.userForm.get("order_no") as FormControl};
      
      get rcv_bu(){return this.userForm.get("rcv_bu") as FormControl};
      
      get StkTransferDetail(){ return this.userForm.get('StkTransferDetail') as FormArray;}
      
      add()
      {
        this.StkTransferDetail.push(this.fb.group({
            order_id:'',
            order_no:'',
            packing_name:'',
            item_name:'',
            item_code:'',
            packing: '',
            quantity: '',
            uom:'',
            squantity:'',
            suom:'',
            mat_wt: '',
            price: '',
            price_based_on:'',
            amount: '',
            gross_amt: '',
            tax_id:'',
            tax_rate:'',
            tax_amt:'',
            net_amt:'',
            acc_norms:'',
            checkbox:'',}));
      }

      ngOnInit() 
      {
        this.status = false;
        if(this.Id == 0)//on first time 
        {
          this.showbutton=true;
          this.DropDownListService.getStkTrans().subscribe(data=>
            {
              this.stockDocsList  = data;
              this.status = true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()}); 
        }
        else
        {
          this.showbutton=false;
          //this.Service.getStockTransChlnById(this.Id).subscribe(data=>
          this.Service.findOneChallan(this.Id).subscribe(data=>
            {
              //this.stockDocsList  = data;
              this.staticArray.push(data);
              this.stockDocsList  =  this.staticArray;

             
              this.Service.getStkTransChallanItemDlts(data["service_item"]).subscribe(itemdata=>
                {
                  while (this.StkTransferDetail.length ) {this.StkTransferDetail.removeAt(0);}
                  for(let i=0;i<itemdata.length;i++){this.add(); }
                  this.StkTransferDetail.patchValue(itemdata);
                  this.status = true;
                  //console.log("chk data:"+JSON.stringify(itemdata))
                  for(let k=0;k<this.StkTransferDetail.length;k++)
                  {
                   this.StkTransferDetail.at(k).patchValue({checkbox:true,item_code:itemdata[k]["item_name"],packing:itemdata[k]["packing_name"],quantity:itemdata[k]["quantity"],
                   uom:itemdata[k]["uom"],squantity:itemdata[k]["squantity"],suom:itemdata[k]["suom"],mat_wt:itemdata[k]["mat_wt"],
                   price:itemdata[k]["price"],price_based_on:itemdata[k]["price_based_on"],amount:itemdata[k]["amount"],gross_amt:itemdata[k][""],tax_id:itemdata[k]["tax_code"],
                   tax_rate:itemdata[k]["tax_rate"],tax_amt:itemdata[k]["tax_amt"],net_amt:itemdata[k]["total_amt"],acc_norms:itemdata[k]["acc_norms"]});


                  }
                });
            });
        }
    
      }

      check1(stockList:StockTransfer)
    {
      this._order_id = stockList.order_id;
      this._order_no = stockList.order_no;
     
      this._rcv_bu = stockList.delivery_business_unit;
      this.status = false;
      this.DropDownListService.getStockTransItemDlts(this._order_id).subscribe(data=>
      {
        while (this.StkTransferDetail.length ) {this.StkTransferDetail.removeAt(0);}
        for(let i=0;i<data.length;i++){this.add(); }
        this.StkTransferDetail.patchValue(data);
        this.status = true;
        for(let k=0;k<this.StkTransferDetail.length;k++)
        {
         this.StkTransferDetail.at(k).patchValue({checkbox:true});
        }

      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
    }

      SendDataToDifferentComponenet()
      {
        this.userForm.patchValue({order_id:this._order_id,order_no:this._order_no,rcv_bu:this._rcv_bu});
        this.userForm.patchValue(this.StkTransferDetail.value);
        this.dialogRef.close(this.userForm.getRawValue());  
      }
   
}
