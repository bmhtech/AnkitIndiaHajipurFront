import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { StockTransfer } from '../../../../../../Models/StockTransfer/stock-transfer';

@Component({
  selector: 'app-stock-transfer-order-popup',
  templateUrl: './stock-transfer-order-popup.component.html',
  styleUrls: ['./stock-transfer-order-popup.component.scss']
})
export class StockTransferOrderPopupComponent implements OnInit {
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
    private dialogRef: MatDialogRef<StockTransferOrderPopupComponent>,
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
      //this.DropDownListService.getStkTrans().subscribe(data=>
      this.DropDownListService.getStkTranswtoutVch().subscribe(data=>
        {
          this.stockDocsList  = data;
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()}); 
    }
    else
    {
      this.showbutton=false;
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
    this.DropDownListService.getStockTransItemDltsArmy(this._order_id).subscribe(data=>
    {
      console.log("ARMY ST ITEM:: ",JSON.stringify(data));
      while (this.StkTransferDetail.length ) {this.StkTransferDetail.removeAt(0);}
      for(let i=0;i<data.length;i++){
        this.add(); 
        this.StkTransferDetail.at(i).patchValue({item_name:data[i]["item_name"],packing_name:data[i]["packing_name"],
                item_code:data[i]["item_code"],packing:data[i]["packing"],quantity:data[i]["st_rest_wt"],
                uom:data[i]["uom"],squantity:data[i]["st_rest_bag"],suom:data[i]["suom"],mat_wt:data[i]["st_rest_wt"],
                price:data[i]["price"],price_based_on:data[i]["price_based_on"],
                tax_id:data[i]["tax_id"],tax_rate:data[i]["tax_rate"],
                //gross_amt:data[i]["gross_amt"],tax_amt:data[i]["tax_amt"],
                //amount:data[i]["amount"],net_amt:data[i]["net_amt"],
                acc_norms:data[i]["acc_norms"],order_id:data[i]["order_id"],order_no:data[i]["order_no"]
        });
      if(data[i]["price_based_on"]=="Item"){
        this.StkTransferDetail.at(i).patchValue({
          amount:data[i]["st_rest_wt"]*data[i]["price"],
          gross_amt:data[i]["st_rest_wt"]*data[i]["price"],
          tax_amt:((data[i]["st_rest_wt"]*data[i]["price"])*data[i]["tax_rate"])/100,
          net_amt:data[i]["st_rest_wt"]*data[i]["price"]
        });
      }
      else{
        this.StkTransferDetail.at(i).patchValue({
          amount:data[i]["st_rest_bag"]*data[i]["price"],
          gross_amt:data[i]["st_rest_bag"]*data[i]["price"],
          tax_amt:((data[i]["st_rest_bag"]*data[i]["price"])*data[i]["tax_rate"])/100,
          net_amt:data[i]["st_rest_bag"]*data[i]["price"]
        });
      }
      }
      //this.StkTransferDetail.patchValue(data);

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
    console.log("POPUP STO:: ",JSON.stringify(this.userForm.getRawValue()))
    this.dialogRef.close(this.userForm.getRawValue());  
  }
   
}
