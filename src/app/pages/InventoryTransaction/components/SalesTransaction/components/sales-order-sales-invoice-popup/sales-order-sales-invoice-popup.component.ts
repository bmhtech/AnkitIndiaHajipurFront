import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesOrder } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-sales-order-sales-invoice-popup',
  templateUrl: './sales-order-sales-invoice-popup.component.html',
  styleUrls: ['./sales-order-sales-invoice-popup.component.scss']
})
export class SalesOrderSalesInvoicePopupComponent implements OnInit {
public userForm:FormGroup;
  salesDocsList:any = [];
  _order_id:any;
  _order_no:any;
 
  check : any;
  status=false;
  Id:any;
  showbutton:boolean=true;
  staticArray:any = [];

  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService, private Service : Master,
    private dialogRef: MatDialogRef<SalesOrderSalesInvoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data)
     {
      this.userForm=fb.group
      ({  

        order_id:[''],
        order_no:[''],
        SoDetail: this.fb.array([this.fb.group({
          order_id:'',
          order_no:'',
          packing_name:'',
          item_name:'',
          item_code:'',
          packing: '',
          quantity: '',
          uom:'',
          squantity:'',
          mat_wt:'',
          suom:'',
          price: '',
          checkbox:''
      })])
      });
      this.Id=data["id"];
      }
      get order_id(){return this.userForm.get("order_id") as FormControl};
      get order_no(){return this.userForm.get("order_no") as FormControl};
      
      
      get SoDetail(){ return this.userForm.get('SoDetail') as FormArray;}
      
  add()
  {
    this.SoDetail.push(this.fb.group({
      order_id:'',
      order_no:'',
      packing_name:'',
      item_name:'',
      item_code:'',
      packing: '',
      quantity: '',
      mat_wt:'',
      uom:'',
      squantity:'',
      suom:'',
      price: '',
      checkbox:'',}));
  }

  ngOnInit() 
  {
    this.status = false;
    if(this.Id == 0)//on first time 
    {
      this.showbutton=true;
      this.DropDownListService.getSoSiList().subscribe(data=>
        {
          this.salesDocsList  = data;
          console.log("order list print",JSON.stringify(this.salesDocsList))
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        }); 
    }
    else
    {
     /* this.showbutton=false;
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
        });*/
    }

  }

  check1(solist:SalesOrder)
  {
    this._order_id = solist.order_id;
    this._order_no = solist.order_no;
    
    this.status = false;
    this.DropDownListService.getSOItemDltsArmy(this._order_id).subscribe(data=>
    {
      console.log("ARMY ST ITEM:: ",JSON.stringify(data));
      while (this.SoDetail.length ) {this.SoDetail.removeAt(0);}
      for(let i=0;i<data.length;i++){
        this.add(); 
        this.SoDetail.at(i).patchValue({item_name:data[i]["item_name"],packing_name:data[i]["packing_name"],
                item_code:data[i]["item_code"],packing:data[i]["packing"],quantity:data[i]["rest_wt"],
                uom:data[i]["uom"],squantity:data[i]["rest_bag"],suom:data[i]["suom"],
                mat_wt:data[i]["rest_wt"],price:data[i]["price"],
                order_id:data[i]["order_id"],order_no:data[i]["order_no"]
        });
      }
      //this.SoDetail.patchValue(data);

      this.status = true;
      for(let k=0;k<this.SoDetail.length;k++)
      {
        this.SoDetail.at(k).patchValue({checkbox:true});
      }

    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
  }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({order_id:this._order_id,order_no:this._order_no});
    this.userForm.patchValue(this.SoDetail.value);
    console.log("POPUP STO:: ",JSON.stringify(this.userForm.getRawValue()))
    this.dialogRef.close(this.userForm.getRawValue());  
  }
   
}

