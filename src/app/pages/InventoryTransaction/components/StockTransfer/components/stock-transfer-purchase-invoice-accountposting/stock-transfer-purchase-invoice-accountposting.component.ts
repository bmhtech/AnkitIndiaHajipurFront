import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-stock-transfer-purchase-invoice-accountposting',
  templateUrl: './stock-transfer-purchase-invoice-accountposting.component.html',
  styleUrls: ['./stock-transfer-purchase-invoice-accountposting.component.scss']
})

export class StockTransferPurchaseInvoiceAccountpostingComponent implements OnInit {

  Id:any;
  stk_trans_pur_inv_id:any;
  status:any;
  businessUnit:any;
  company_name:any;
  customer_name:any;
  customer_amount:any;
  roundoff:any;
  roundoff_amount_dr:any;
  roundoff_amount_cr:any;
  item_name:any;
  item_amount:any;
  charge_matrix_list:any=[];
  listSalesItem:any = [];

  addplus:boolean=false;
  addminus:boolean=false;
  addplusac:any;
  addplusamount:any;
  addminusac:any;
  addminusamount:any;
  totalglobalamount_dr:number=0;
  totalglobalamount_cr:number=0;
  businessunitklist:any=[];
  billPosting:boolean=false;
  sLNumber:number=1;
  customerSlNo:number=0;
  statename:any;
  TaxSummAllData:any=[];
  taxNumber:number=0;
  rounldoffslno:number=0;
  ledgernames:any=[];
  send_business_unit:any;
  roundoff_gl_acstatus:boolean=false;




  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StockTransferPurchaseInvoiceAccountpostingComponent>, @Inject(MAT_DIALOG_DATA)data) { 

      this.Id=data["id"];
      this.stk_trans_pur_inv_id=data["stk_trans_pur_inv_id"];

    }


  ngOnInit() {

    this.status=false;
    this.company_name = localStorage.getItem("company_name");

    forkJoin(
      
    this.Service.stkPurInvRetriveList(this.Id),
    this.Service.stkPurInvItemRetriveList(this.stk_trans_pur_inv_id),
    this.DropDownListService.getCompanyBUMNCList(this.company_name),
    this.DropDownListService.ledgerNameList(),
   

   // this.Service.salesInvCharMatrixposting(this.invoiceid),
    
    
    ).subscribe(([staticData,itemData,business,ledgerdata])=>
    {
      this.ledgernames=ledgerdata;
      if(staticData["export"]==0)
      {
        this.billPosting=true;
      }

      let unitarray:any=[];
      unitarray=business;

      unitarray.forEach(element => {
        if(element.businessunit_id == staticData["business_unit"])
        {
          this.businessUnit=element.businessunit_name;
        }

        if(element.businessunit_id == staticData["send_business_unit"])
        {
          this.send_business_unit=element.businessunit_name;
        }

      });

      this.customer_name=this.send_business_unit;
      this.customer_amount=Number(staticData["payable_amt"]).toFixed(2);
      
      this.totalglobalamount_dr+=Number(this.customer_amount);
      this.listSalesItem = itemData;

     console.log("itemData::"+JSON.stringify(itemData))
     
      this.item_name = itemData[0]["item_name"];
      this.item_amount = Number(itemData[0]["amount"]).toFixed(2);
      for(let idata of itemData)
      {
        this.totalglobalamount_cr+=Number(idata["amount"]);
      }
      this.customerSlNo=this.sLNumber;

    
      itemData.forEach(element=>
        {
          this.sLNumber=this.sLNumber+1;
          element.slno=this.sLNumber;
         
        });
      
        
      
     
       
      if(staticData["roundoff_gl_ac"] =='0')
      {
        this.roundoff_gl_acstatus=false;
      }
      else
      {
        this.roundoff_gl_acstatus=true;
      }
      

      let roundoff:any=[];
      roundoff.push(staticData["roundoff_amt"]);
      if(roundoff.includes("-"))
      {
        

        this.roundoff_amount_dr=Number(staticData["roundoff_amt"]).toFixed(2);
        this.totalglobalamount_dr+=Number(this.roundoff_amount_dr);
      }
      else{
        this.roundoff_amount_cr=Number(staticData["roundoff_amt"]).toFixed(2);
        this.totalglobalamount_cr+=Number(this.roundoff_amount_cr);
        
      }
      let ledger:any=[];
      ledger=ledgerdata;
      ledger.forEach(element=>{

       // console.log(element.ledgerid +" / "+ staticData["add2_gl_ac"] + " / "+ staticData["add1_gl_ac"] +" / " + staticData["roundoff_gl_ac"])
        if(element.ledgerid==staticData["add2_gl_ac"])
        {
          this.addminusac=element.ledgername;
        }
        if(element.ledgerid==staticData["add1_gl_ac"])
        {
          this.addplusac=element.ledgername;
        }
        if(element.ledgerid==staticData["roundoff_gl_ac"])
        {
          this.roundoff=element.ledgername;
        }
      })

      //this.rounldoffslno=this.sLNumber+1;
      if(this.roundoff_gl_acstatus==true)
      {
        this.rounldoffslno=this.sLNumber+1;
      }
      this.sLNumber=this.sLNumber+1;


    let finalop=this.totalglobalamount_cr.toFixed(2);
    let finalopdr=this.totalglobalamount_dr.toFixed(2);
    this.totalglobalamount_cr= Number(finalop);
    this.totalglobalamount_dr= Number(finalopdr);
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()}); 
  }

  accountpostingFinal()
  {
this.status=false;
    this.DropDownListService.accountpostingSalesInvoice(this.Id).subscribe(data=>
      {
        if(data["export"] == 1)
        {
          alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
        }
        else
        {
          alert("Data Didn't Exported  !!!!!!!!!!!!! ");
        }
        
        this.ngOnInit();
       // this.isHidden = false;
        this.status = true;
      });
  }

}


