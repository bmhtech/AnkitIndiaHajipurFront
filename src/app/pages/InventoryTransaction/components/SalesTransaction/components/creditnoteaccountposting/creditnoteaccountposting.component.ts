import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-creditnoteaccountposting',
  templateUrl: './creditnoteaccountposting.component.html',
  styleUrls: ['./creditnoteaccountposting.component.scss']
})
export class CreditnoteaccountpostingComponent implements OnInit {
  
  Id:any;
  creditnoteid:any;
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
  rounldoffslno:number=0;
  customerSlNo:number=0;
  statename:any;
  TaxSummAllData:any=[];
  taxNumber:number=0;
  roundoff_gl_acstatus:boolean=false;
  ledgernames:any=[];
  company_name1:any;
  cin_no:any;
  work_address:any;
  pin_no:any;
  state_name:any;
  city_name:any;

  addplus_slno:number=0;
  addminus_slno:number=0;
  inv_type:any;
  

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<CreditnoteaccountpostingComponent>, @Inject(MAT_DIALOG_DATA)data) 
    { 
      this.Id=data["id"];
      this.creditnoteid=data["creditnoteid"];
      this.inv_type=data["inv_type"];
         
      //alert("this.Id :"+ this.Id +" / " + this.invoiceid);
    }

  ngOnInit() {
    if(this.inv_type=="INV00003")
    {
      this.company_name = localStorage.getItem("company_name");
      forkJoin
      (
        this.Service.retriveSalesCreditNoteposting(this.Id),
        this.Service.getSalesCreditNoteJobworkPrice(this.creditnoteid),
        this.DropDownListService.ledgerNameList(), 
          this.Service.getcreditnotetaxcodes(this.creditnoteid),
          this.DropDownListService.getCompanyDetails(this.company_name)
        
      ) .subscribe(([staticData,itemData,ledgerdata,invoiceTaxSum,compdetails])=>
      {
        //console.log(compdetails.company_name+"Company type ::"+JSON.stringify(compdetails))
        this.company_name1=compdetails.company_name;
        this.cin_no=compdetails.tin_no;

        this.DropDownListService.getCBUdetailsById(staticData["business_unit"]).subscribe((cbudata)=>
              { 
                //console.log("cbudata:"+JSON.stringify(cbudata))
                this.businessUnit=cbudata.businessunit_name;
                this.work_address=cbudata.work_address;
                this.pin_no=cbudata.pin_code;
                this.state_name=cbudata.state_name;
                this.city_name=cbudata.city_name;
              });
          this.ledgernames=ledgerdata;
          if(staticData["export"]==0)//need to create column in db 
          {
            this.billPosting=true;
          }    
          
          this.customer_name=staticData["partyname"];
          this.customer_amount=Number(staticData["payable_amt"]).toFixed(2);
          
          this.totalglobalamount_cr+=Number(this.customer_amount);//change dr
          this.listSalesItem = itemData;
          

          this.item_name = itemData[0]["item_name"];//need to change
          this.item_amount = Number(itemData[0]["amount"]).toFixed(2);//need to change
          for(let idata of itemData)
          {
            this.totalglobalamount_dr+=Number(idata["amount"]);//make cr
          }
          this.customerSlNo=this.sLNumber;
          itemData.forEach(element=>
            {
              this.sLNumber=this.sLNumber+1;
              element.slno=this.sLNumber;
            
            });


          
            this.Service.custAddRetriveList(staticData["party"]).subscribe(stateName=>{
              this.statename=stateName["state"];
             // console.log(" this.statename :: " + JSON.stringify(stateName)+"/ststename/"+this.statename);
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
                this.roundoff_amount_cr=Number(staticData["roundoff_amt"]).toFixed(2);
                this.totalglobalamount_cr+=Number(this.roundoff_amount_cr);
              }
              else{
                this.roundoff_amount_dr=Number(staticData["roundoff_amt"]).toFixed(2);
                this.totalglobalamount_dr+=Number(this.roundoff_amount_dr);
                
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
    
    
              if(this.roundoff_gl_acstatus==true)
              {
                this.rounldoffslno=this.sLNumber+1;
    
              }
              this.sLNumber=this.sLNumber+1;
              //console.log("hello her :: "+JSON.stringify(invoiceTaxSum))
                this.taxNumber=this.sLNumber;
                for(let gstTaxData of invoiceTaxSum)
                {
                  this.taxNumber=this.taxNumber+1;
                  gstTaxData["id"]=this.taxNumber;
                
                  if(Number(gstTaxData["igst"]) == 0.0)
                  {
                    this.taxNumber=this.taxNumber+1;
                  // console.log("hello"+this.taxNumber);
                    gstTaxData["inserted_by"]=this.taxNumber;
                  
      
                  }
                  else
                  {
                  // console.log("hello 123 :: "+this.taxNumber);
                  }
      
                  this.ledgernames.forEach(ledger=>{
      
                    if(gstTaxData["cgstledgerid"] == ledger["ledgerid"])
                    {
                      gstTaxData["cgstledgerid"] =ledger["ledgername"];
                      this.totalglobalamount_dr+=Number(gstTaxData["cgst"]);
                    }
                    if(gstTaxData["sgstledgerid"]== ledger["ledgerid"])
                    {
                      gstTaxData["sgstledgerid"] =ledger["ledgername"];
                      this.totalglobalamount_dr+=Number(gstTaxData["sgst"]);
                    }
                    if(gstTaxData["igstledgerid"]== ledger["ledgerid"])
                    {
                      gstTaxData["igstledgerid"] =ledger["ledgername"];
                      this.totalglobalamount_dr+=Number(gstTaxData["igst"]);
                    }
                  })
      
                }
                this.TaxSummAllData = invoiceTaxSum;
                if(Number(staticData["adj1_amt"])>0)
                {
                  this.addplus=true;
                // this.addplusac=staticData["add1_gl_ac"];
                  this.addplusamount=staticData["adj1_amt"];
                  this.totalglobalamount_dr+=Number(this.addplusamount);
      
                  this.addplus_slno=this.sLNumber;
          
      
                }
                if(Number(staticData["adj2_amt"])>0)
                {
                  this.addminus=true;
                // this.addminusac=staticData["add2_gl_ac"];
                  this.addminusamount = staticData["adj2_amt"];
                  this.totalglobalamount_cr+=Number(this.addminusamount);
                  this.addminus_slno=this.sLNumber;
                }
              // console.log("bussiness data:"+JSON.stringify(business));
      
      
      
      
      
              let finalop=this.totalglobalamount_cr.toFixed(2);
              let finalopdr=this.totalglobalamount_dr.toFixed(2);
                

        
         
          this.totalglobalamount_cr= Number(finalop);
          this.totalglobalamount_dr= Number(finalopdr);

      });

    }
    else{
        this.status=false;
        this.company_name = localStorage.getItem("company_name");

        forkJoin(
        // this.Service.retriveSalesCreditNote(this.Id),
          this.Service.retriveSalesCreditNoteposting(this.Id),
          this.Service.getSalesCreditNoteIDposting(this.creditnoteid),  
          //this.DropDownListService.getCompanyBUMNCList(this.company_name),
          this.DropDownListService.ledgerNameList(),
          this.Service.getcreditnotetaxcodes(this.creditnoteid),
          this.DropDownListService.getCompanyDetails(this.company_name)
    //   ).subscribe(([staticData,itemData,business,ledgerdata,invoiceTaxSum,compdetails])=>
        ).subscribe(([staticData,itemData,ledgerdata,invoiceTaxSum,compdetails])=>
        {
          this.company_name1=compdetails.company_name;
          this.cin_no=compdetails.tin_no;

          this.DropDownListService.getCBUdetailsById(staticData["business_unit"]).subscribe((cbudata)=>
              { 
                console.log("cbudata:"+JSON.stringify(cbudata))
                this.businessUnit=cbudata.businessunit_name;
                this.work_address=cbudata.work_address;
                this.pin_no=cbudata.pin_code;
                this.state_name=cbudata.state_name;
                this.city_name=cbudata.city_name;
              });

          this.ledgernames=ledgerdata;
          if(staticData["export"]==0)//need to create column in db 
          {
            this.billPosting=true;
          } 
          this.customer_name=staticData["partyname"];
          this.customer_amount=Number(staticData["payable_amt"]).toFixed(2);
          
          this.totalglobalamount_cr+=Number(this.customer_amount);//change dr
          this.listSalesItem = itemData;
          

        
        
          this.item_name = itemData[0]["item_name"];//need to change
          this.item_amount = Number(itemData[0]["amount"]).toFixed(2);//need to change
          for(let idata of itemData)
          {
            this.totalglobalamount_dr+=Number(idata["amount"]);//make cr
          }
          this.customerSlNo=this.sLNumber;
          itemData.forEach(element=>
            {
              this.sLNumber=this.sLNumber+1;
              element.slno=this.sLNumber;
            
            });
          

          // let unitarray:any=[];
          // unitarray=business;

          // unitarray.forEach(element => {
          //   if(element.businessunit_id == staticData["business_unit"])
          //   {
          //     this.businessUnit=element.businessunit_name;
          //   }

          // });
          
          this.Service.custAddRetriveList(staticData["party"]).subscribe(stateName=>{
          this.statename=stateName["state"];
          console.log(" this.statename :: " + JSON.stringify(stateName)+"/ststename/"+this.statename);
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
            this.roundoff_amount_cr=Number(staticData["roundoff_amt"]).toFixed(2);
            this.totalglobalamount_cr+=Number(this.roundoff_amount_cr);
          }
          else{
            this.roundoff_amount_dr=Number(staticData["roundoff_amt"]).toFixed(2);
            this.totalglobalamount_dr+=Number(this.roundoff_amount_dr);
            
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


          if(this.roundoff_gl_acstatus==true)
          {
            this.rounldoffslno=this.sLNumber+1;

          }



          this.sLNumber=this.sLNumber+1;
        console.log("hello her :: "+JSON.stringify(invoiceTaxSum))
          this.taxNumber=this.sLNumber;
          for(let gstTaxData of invoiceTaxSum)
          {
            this.taxNumber=this.taxNumber+1;
            gstTaxData["id"]=this.taxNumber;
          
            if(Number(gstTaxData["igst"]) == 0.0)
            {
              this.taxNumber=this.taxNumber+1;
            // console.log("hello"+this.taxNumber);
              gstTaxData["inserted_by"]=this.taxNumber;
            

            }
            else
            {
            // console.log("hello 123 :: "+this.taxNumber);
            }

            this.ledgernames.forEach(ledger=>{

              if(gstTaxData["cgstledgerid"] == ledger["ledgerid"])
              {
                gstTaxData["cgstledgerid"] =ledger["ledgername"];
                this.totalglobalamount_dr+=Number(gstTaxData["cgst"]);
              }
              if(gstTaxData["sgstledgerid"]== ledger["ledgerid"])
              {
                gstTaxData["sgstledgerid"] =ledger["ledgername"];
                this.totalglobalamount_dr+=Number(gstTaxData["sgst"]);
              }
              if(gstTaxData["igstledgerid"]== ledger["ledgerid"])
              {
                gstTaxData["igstledgerid"] =ledger["ledgername"];
                this.totalglobalamount_dr+=Number(gstTaxData["igst"]);
              }
            })

          }
          this.TaxSummAllData = invoiceTaxSum;
          
          if(Number(staticData["adj1_amt"])>0)
          {
            this.addplus=true;
          // this.addplusac=staticData["add1_gl_ac"];
            this.addplusamount=staticData["adj1_amt"];
            this.totalglobalamount_dr+=Number(this.addplusamount);

            this.addplus_slno=this.sLNumber;
    

          }
          if(Number(staticData["adj2_amt"])>0)
          {
            this.addminus=true;
          // this.addminusac=staticData["add2_gl_ac"];
            this.addminusamount = staticData["adj2_amt"];
            this.totalglobalamount_cr+=Number(this.addminusamount);
            this.addminus_slno=this.sLNumber;
          }
        // console.log("bussiness data:"+JSON.stringify(business));





        let finalop=this.totalglobalamount_cr.toFixed(2);
        let finalopdr=this.totalglobalamount_dr.toFixed(2);
      // this.totalglobalamount_cr= Number(finalop);
        //this.totalglobalamount_dr= Number(finalopdr);
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()}); 
   }
  }

  accountpostingFinal()
  {
   this.status =false;
   
    this.DropDownListService.accountpostingCreditNote(this.Id).subscribe(data=>
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
