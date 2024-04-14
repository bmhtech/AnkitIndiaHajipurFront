import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Console } from 'console';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';


@Component({
  selector: 'app-sales-invoice-account-posting',
  templateUrl: './sales-invoice-account-posting.component.html',
  styleUrls: ['./sales-invoice-account-posting.component.scss']
})
export class SalesInvoiceAccountPostingComponent implements OnInit {
  
  Id:any;
  invoiceid:any;
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
  invoice_type:any;

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
  
  addplus_slno:number=0;
  addminus_slno:number=0;

  rounldoffslno:number=0;
  roundoff_gl_acstatus:boolean=false;
  ledgernames:any=[];
  round_statby:boolean=true;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SalesInvoiceAccountPostingComponent>, @Inject(MAT_DIALOG_DATA)data) 
    { 
      this.Id=data["id"];
      this.invoiceid=data["invoiceid"];
      this.invoice_type=data["invoice_type"];
       console.log(this.invoice_type)  
      //alert("this.Id :"+ this.Id +" / " + this.invoiceid);
    }

  ngOnInit() {

    this.status=false;

    //if(this.invoice_type=="JOB WORK INVOICE")
    if(this.invoice_type=="INV00003")
    {
      this.company_name = localStorage.getItem("company_name");
      forkJoin
      (
        this.Service.retriveSalesInv(this.Id),
        this.Service.retriveinvoicejobworkprice(this.invoiceid),
        this.DropDownListService.ledgerNameList(),
        this.Service.getInvTaxSum(this.invoiceid)
      ) .subscribe(([staticData,itemData,ledgerdata,invoiceTaxSum])=>
      {

          if(staticData["export"]==0)
          {
            this.billPosting=true;
          }
          this.customer_name=staticData["partyname"];
          this.customer_amount=Number(staticData["payable_amt"]).toFixed(2);
          this.totalglobalamount_dr+=Number(this.customer_amount);
          this.listSalesItem = itemData;

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
          
          this.Service.custAddRetriveList(staticData["party"]).subscribe(stateName=>{this.statename=stateName["state"];});
          if(Number(staticData["roundoff_amt"]) ==0)
          {
            this.roundoff_gl_acstatus=false;
           
          }
          else 
          {
            this.roundoff_gl_acstatus=true;
          }
          let roundoff:number=0;
          roundoff=staticData["roundoff_amt"];
          if(roundoff<0)//debit 
          {
             this.roundoff_amount_dr=Number(staticData["roundoff_amt"]).toFixed(2);
             this.roundoff_amount_dr=this.roundoff_amount_dr.substring(1, this.roundoff_amount_dr.length);
             this.totalglobalamount_dr+=Number(this.roundoff_amount_dr);
             this.round_statby=true;
          }
          else//credit
          {
             this.roundoff_amount_cr=Number(staticData["roundoff_amt"]).toFixed(2);
             this.totalglobalamount_cr+=Number(this.roundoff_amount_cr);
             this.round_statby=false;
          }
          let ledger:any=[];
          ledger=ledgerdata;
          ledger.forEach(element=>{
    
           // console.log(element.ledgerid +" / "+ staticData["add2_gl_ac"] + " / "+ staticData["add1_gl_ac"] +" / " + staticData["roundoff_gl_ac"])
            if(element.ledgerid==staticData["adj2_gl_ac"])
            {
              this.addminusac=element.ledgername;
            }
            if(element.ledgerid==staticData["adj1_gl_ac"])
            {
              this.addplusac=element.ledgername;
            }
            if(element.ledgerid==staticData["roundoff_gl_ac"])
            {
              this.roundoff=element.ledgername;
            }
          })

          if(Number(staticData["adj1_amt"])>0)
          {
            this.addplus=true;
            this.addplusamount=staticData["adj1_amt"];
            this.totalglobalamount_cr+=Number(this.addplusamount);

            this.addplus_slno=this.sLNumber;
          }
          if(Number(staticData["adj2_amt"])>0)
          {
            this.addminus=true;
            this.addminusamount = staticData["adj2_amt"];
            this.totalglobalamount_dr+=Number(this.addminusamount);
            this.addminus_slno=this.sLNumber;
          }
          if(this.roundoff_gl_acstatus==true)
          {
            console.log(" im here ");
            this.rounldoffslno=this.sLNumber+1;
          }
          this.sLNumber=this.sLNumber+1;
   
          for(let gstTaxData of invoiceTaxSum)
          {
            this.sLNumber=this.sLNumber+1;
            gstTaxData["inserted_by"]=this.sLNumber;
            gstTaxData["id"]=this.sLNumber;
            console.log( gstTaxData["inserted_by"])
           

            ledger.forEach(ledger=>
            {
              if(gstTaxData["cgstledgerid"] == ledger["ledgerid"])
              {
                gstTaxData["cgstledgerid"] =ledger["ledgername"];
                this.totalglobalamount_cr+=Number(gstTaxData["cgst"]);
              }
              if(gstTaxData["sgstledgerid"]== ledger["ledgerid"])
              {
                gstTaxData["sgstledgerid"] =ledger["ledgername"];
                this.totalglobalamount_cr+=Number(gstTaxData["sgst"]);
              }
              if(gstTaxData["igstledgerid"]== ledger["ledgerid"])
              {
                gstTaxData["igstledgerid"] =ledger["ledgername"];
                this.totalglobalamount_cr+=Number(gstTaxData["igst"]);
              }
            })

          }
          this.TaxSummAllData = invoiceTaxSum;
          let finalop=this.totalglobalamount_cr.toFixed(2);
          let finalopdr=this.totalglobalamount_dr.toFixed(2);
          this.totalglobalamount_cr= Number(finalop);
          this.totalglobalamount_dr= Number(finalopdr);

      });

    }
    else
    {

      this.company_name = localStorage.getItem("company_name");

    forkJoin(
    this.Service.retriveSalesInv(this.Id),
    //this.Service.getSalesInvItmDtls(this.invoiceid),
    this.Service.getSalesInvItmDtls1(this.invoiceid),
    this.DropDownListService.getCompanyBUMNCList(this.company_name),
    this.DropDownListService.ledgerNameList(),
    this.Service.getInvTaxSum(this.invoiceid)

    ).subscribe(([staticData,itemData,business,ledgerdata,invoiceTaxSum])=>
    {
      console.log("invoiceTaxSum ::" +JSON.stringify(invoiceTaxSum))
      this.ledgernames=ledgerdata;
      if(staticData["export"]==0)
      {
        this.billPosting=true;
      }
      this.customer_name=staticData["partyname"];
      this.customer_amount=Number(staticData["payable_amt"]).toFixed(2);
      
      this.totalglobalamount_dr+=Number(this.customer_amount);
      this.listSalesItem = itemData;

      this.item_name = itemData[0]["item_name"];
      this.item_amount = Number(itemData[0]["amount"]).toFixed(2);
      for(let idata of itemData)
      {
        this.totalglobalamount_cr+=Number(idata["amount"]);
        if(Number(idata["discount_amt"])>0)
        {
          this.totalglobalamount_dr+=Number(idata["discount_amt"]);
        }
      }
      this.customerSlNo=this.sLNumber;

    
      itemData.forEach(element=>
        {
          this.sLNumber=this.sLNumber+1;
          element.slno=this.sLNumber;
         
        });
      
        itemData.forEach(element=>
          {
            if(element.discount_amt>0)
            {
              this.sLNumber=this.sLNumber+1;
              element.squantity=this.sLNumber;
             
            }
           
          });
       


      let unitarray:any=[];
      unitarray=business;

      unitarray.forEach(element => {
        if(element.businessunit_id == staticData["business_unit"])
        {
          this.businessUnit=element.businessunit_name;
        }

      });
      
      this.Service.custAddRetriveList(staticData["party"]).subscribe(stateName=>{
      this.statename=stateName["state"];
      //console.log(" this.statename :: " + JSON.stringify(stateName)+"/ststename/"+this.statename);
      });

      if(Number(staticData["roundoff_amt"]) ==0)
      {
        this.roundoff_gl_acstatus=false;
       
      }
      else 
      {
        this.roundoff_gl_acstatus=true;
      }
      //console.log("tuhin watch here " + staticData["roundoff_gl_ac"] + " / " + this.roundoff_gl_acstatus )
        //let roundoff:any=[];
        let roundoff:number=0;
     // roundoff.push(staticData["roundoff_amt"]);
     roundoff=staticData["roundoff_amt"];
     // console.log( "get amount "+staticData["roundoff_amt"])
      //if(roundoff.includes("-"))//debit 
      if(roundoff<0)//debit 
      {
        
        console.log("check here dr")
        this.roundoff_amount_dr=Number(staticData["roundoff_amt"]).toFixed(2);
        this.roundoff_amount_dr=this.roundoff_amount_dr.substring(1, this.roundoff_amount_dr.length);
        this.totalglobalamount_dr+=Number(this.roundoff_amount_dr);
        this.round_statby=true;
      }
      else//credit
      {
        console.log("check here cr")
        this.roundoff_amount_cr=Number(staticData["roundoff_amt"]).toFixed(2);
        this.totalglobalamount_cr+=Number(this.roundoff_amount_cr);
       
        this.round_statby=false;
      }
      let ledger:any=[];
      ledger=ledgerdata;
      ledger.forEach(element=>{

       // console.log(element.ledgerid +" / "+ staticData["add2_gl_ac"] + " / "+ staticData["add1_gl_ac"] +" / " + staticData["roundoff_gl_ac"])
        if(element.ledgerid==staticData["adj2_gl_ac"])
        {
          this.addminusac=element.ledgername;
        }
        if(element.ledgerid==staticData["adj1_gl_ac"])
        {
          this.addplusac=element.ledgername;
        }
        if(element.ledgerid==staticData["roundoff_gl_ac"])
        {
          this.roundoff=element.ledgername;
        }
      })
      
      if(Number(staticData["adj1_amt"])>0)
      {
        this.addplus=true;
       // this.addplusac=staticData["add1_gl_ac"];
        this.addplusamount=staticData["adj1_amt"];
        this.totalglobalamount_cr+=Number(this.addplusamount);

        this.addplus_slno=this.sLNumber;
 

      }
      if(Number(staticData["adj2_amt"])>0)
      {
        this.addminus=true;
       // this.addminusac=staticData["add2_gl_ac"];
        this.addminusamount = staticData["adj2_amt"];
        this.totalglobalamount_dr+=Number(this.addminusamount);
        this.addminus_slno=this.sLNumber;
      }


      if(this.roundoff_gl_acstatus==true)
      {
        console.log(" im here ");
        this.rounldoffslno=this.sLNumber+1;
      }




      this.sLNumber=this.sLNumber+1;






     console.log("GST CHECKING :: "+JSON.stringify(invoiceTaxSum))
      this.taxNumber=this.sLNumber;
      for(let gstTaxData of invoiceTaxSum)
      {
        if(Number(gstTaxData["cgst"]) == 0.0)
        {

        }
        else
        {
          this.taxNumber=this.taxNumber+1;
          gstTaxData["id"]=this.taxNumber;
        }
        
        if(Number(gstTaxData["igst"]) == 0.0)
        {
          
           this.taxNumber=this.taxNumber+1;
      
           gstTaxData["inserted_by"]=this.taxNumber;
           console.log(" hello  :: "+this.taxNumber);
        }
        else
        {
         // console.log("hello 123 :: "+this.taxNumber);
        }

        this.ledgernames.forEach(ledger=>{

          if(gstTaxData["cgstledgerid"] == ledger["ledgerid"])
          {
            gstTaxData["cgstledgerid"] =ledger["ledgername"];
            this.totalglobalamount_cr+=Number(gstTaxData["cgst"]);
          }
          if(gstTaxData["sgstledgerid"]== ledger["ledgerid"])
          {
           // console.log("here check  " + ledger["ledgername"] )
            gstTaxData["sgstledgerid"] =ledger["ledgername"];
            this.totalglobalamount_cr+=Number(gstTaxData["sgst"]);
          }
          if(gstTaxData["igstledgerid"]== ledger["ledgerid"])
          {
            gstTaxData["igstledgerid"] =ledger["ledgername"];
            this.totalglobalamount_cr+=Number(gstTaxData["igst"]);
          }
        })

      }
      this.TaxSummAllData = invoiceTaxSum;
      
    let finalop=this.totalglobalamount_cr.toFixed(2);
    let finalopdr=this.totalglobalamount_dr.toFixed(2);
    this.totalglobalamount_cr= Number(finalop);
    this.totalglobalamount_dr= Number(finalopdr);
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()}); 
      
    } 
  }

  accountpostingFinal()
  {
this.status=false;
    this.DropDownListService.accountpostingSalesInvoice(this.Id).subscribe(data=>
      {
       // console.log("data "+JSON.stringify(data["response"]))
      
        if(data["export"] == 1)
        {
          alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
        }
        else
        {
          let responsestring=data["response"];

          let split=responsestring.split("LINEERROR>");
         console.log("array "+split[1] );
          let mssg=split[1];
          let finalmssg=mssg.toString().substring(13,mssg.length-24);
          console.log("finalmssg " + finalmssg)

          alert("Data Didn't Exported  !!!!!!!!!!!!! " + finalmssg + " LEDGER missing");
        }
        
        this.ngOnInit();
       // this.isHidden = false;
        this.status = true;
      });
  }
}
