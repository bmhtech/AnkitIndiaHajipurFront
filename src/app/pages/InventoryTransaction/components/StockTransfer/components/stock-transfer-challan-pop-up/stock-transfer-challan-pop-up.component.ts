import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { StockTransferChallan, stk_challan__Item_Dtls} from '../../../../../../models/StockTransfer/stock-transfer-challan';

  @Component({
    selector: 'app-stock-transfer-challan-pop-up',
    templateUrl: './stock-transfer-challan-pop-up.component.html',
    styleUrls: ['./stock-transfer-challan-pop-up.component.scss']})

  export class StockTransferChallanPopUpComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    bussinessUnitId:any;
    challan_id = "0";
    callingFileName:any;
    status = false;
    date:any;
    company_name:any;
    fin_year:any;
    Id:any;
    recieving_bu:any;
    showbutton:boolean=true;
    staticArray:any = [];

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<StockTransferChallanPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        stk_challan_id: [''],
        recieving_bu: [''],
        stk_challan__Item_Dtls: this.fb.array([this.fb.group({
          checkbox: '',
          item_code:'',
          item_name: '',
          packing:'',
          packing_name: '',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt:'',
          price:'',
          price_based_on:'',
          amount:'',
          tax_code:'',
          tax_rate: '',
          tax_amt:'',
          total_amt:'',
          acc_norms:''})]),
        });
        this.bussinessUnitId = data["bussinessUnit_id"];
        this.callingFileName = data["file_name"];
        this.date = data['date'];
        this.Id=data["id"];
    }
     
     get stk_challan__Item_Dtls(){{ return this.userForm1.get('stk_challan__Item_Dtls') as FormArray;}}
  
     ngOnInit() 
     {
        this.company_name = localStorage.getItem("company_name");
        this.fin_year = localStorage.getItem("financial_year");
        if( this.callingFileName == "stock_transfer_invoice")
        {
          this.status = false;
          this.DropDownListService.getStkTransChallanThruBUnit(this.bussinessUnitId).subscribe(data=>
          {
            this.list  = data; 
            this.status = true;
          });
        }

        if( this.callingFileName == "stock_transfer_sales_invoice")
        {
          if(this.Id == 0)//on first time 
          {
            this.showbutton=true;
            this.status = false;
            this.DropDownListService.getStkTransChallans("bunit="+this.bussinessUnitId+"&invdate="+this.date+"&comp="+this.company_name+"&finyear="+this.fin_year).subscribe(data=>
            {
              this.list  = data; 
              this.status = true;
            });
          }
          else
          {
            this.showbutton=false;
            this.Service.stkSalesInv(this.Id).subscribe(data=>
              {
                //console.log("chkdata:"+JSON.stringify(data))
                this.staticArray.push(data);
                
                this.list  =  this.staticArray;
                
                this.Service.getStkTransSalesInvItemDtls(data["saleinvoice_status"]).subscribe(itemdata=>
                  {
                   // console.log("bid here:"+JSON.stringify(itemdata))
                    while (this.stk_challan__Item_Dtls.length ) 
                    {
                      this.stk_challan__Item_Dtls.removeAt(0);
                    }
                    for(let i=0;i<itemdata.length;i++)
                    {
                      this.add();
                      this.stk_challan__Item_Dtls.at(i).patchValue({item_name:itemdata[i]["item_name"],packing_name:itemdata[i]["packing_name"],
                      squantity:itemdata[i]["squantity"],suom:itemdata[i]["suom"],quantity:itemdata[i]["quantity"],uom:itemdata[i]["uom"],mat_wt:itemdata[i]["mat_wt"],
                      price:itemdata[i]["price"],price_based_on:itemdata[i]["price_based_on"],amount:itemdata[i]["amount"],
                      tax_code:itemdata[i]["tax_code"],tax_rate:itemdata[i]["tax_rate"],tax_amt:itemdata[i]["tax_amt"],
                      total_amt:itemdata[i]["total_amt"],acc_norms:itemdata[i]["acc_norms"],checkbox:true})
                    
                    }
  
                  this.status = true;
                 
                  });
              });
          }
        }
        
     }
     
     add()
     {
       this.stk_challan__Item_Dtls.push(this.fb.group({
        checkbox: '',
        item_code:'',
        item_name: '',
        packing:'',
        packing_name:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        tax_code:'',
        tax_rate: '',
        tax_amt:'',
        total_amt:'',
        acc_norms:''}));
    }
    
    check1(challanList:StockTransferChallan)
    {
      this.status = false;
      this.challan_id = challanList.stk_challan_id;
      this.recieving_bu=challanList.delivery_business_unit;
      this.DropDownListService.getStkTransChallanItemDlts(this.challan_id).subscribe(data=>{
       while (this.stk_challan__Item_Dtls.length ) {this.stk_challan__Item_Dtls.removeAt(0);}
       for(let i=0;i<data.length;i++){this.add(); }
       this.stk_challan__Item_Dtls.patchValue(data);
       this.status = true;
       for(let k=0;k<this.stk_challan__Item_Dtls.length;k++)
        {
         this.stk_challan__Item_Dtls.at(k).patchValue({checkbox:true});
        }
      });
    }
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({stk_challan_id: this.challan_id,recieving_bu:this.recieving_bu});
      this.userForm1.patchValue(this.stk_challan__Item_Dtls.value);
      this.dialogRef.close(this.userForm1.value);  
    }
  }
