import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pur-bill-accountposting',
  templateUrl: './pur-bill-accountposting.component.html',
  styleUrls: ['./pur-bill-accountposting.component.scss']
})
 

  export class PurBillAccountpostingComponent implements OnInit {
  Id:any;
  Purbillid:any;
  status:any;
  supplier_name:any;
  supplier_amount:any;
  roundoff:any;
  roundoff_amount_dr:any;
  roundoff_amount_cr:any;
  item_name:any;
  item_amount:any;
  charge_matrix_list:any=[];

  addplus:boolean=false;
  addminus:boolean=false;
  addplusac:any;
  addplusamount:any;
  addminusac:any;
  addminusamount:any;
  totalglobalamount_dr:number=0;
  totalglobalamount_cr:number=0;
  businessUnit:any;
  company_name:any;
  businessunitklist:any=[];
  show:boolean=false;
  billPosting:boolean=false;
  postingAction:boolean=false;
  sLNumber:number=1;
  itemList:any=[];
  roundoffsl_no:number=0;
  supplier_slno:number=0;

  addplus_slno:number=0;
  addminus_slno:number=0;
  roundoff_gl_acstatus:boolean=false;
  companyname:any;
  cin_no:any;
  work_address:any;
  pin_no:any;
  state_name:any;
  city_name:any;
  company_name1:any
  showcharge_matrix:boolean=true;
  taxNumber:number=0;
  TaxSummAllData:any=[];
  billno:any;
  billdate:any;
  vehicleno:any;

  purorderno:any;
  purbillno:any;
  purbilldate:any;
  purorderdate:any;
  vechileno:any;
  gstn:any;
  partyname:any;
  address:any;
  statename:any;
  business_unit:any;
  gst_no:any;
  public userForm:FormGroup;

    constructor(private fb: FormBuilder,private Service: Master,private toast:ToastrService,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<PurBillAccountpostingComponent>, @Inject(MAT_DIALOG_DATA)data) 
    {
      this.userForm=fb.group(
        {
          response_return:['']
        });
          this.Id=data["id"];
          this.Purbillid=data["purbillid"];
          this.companyname=data["company_name"];
          this.business_unit=data["business_unit"];
    }
 
  ngOnInit() 
  {
    this.status=false;
    this.company_name = localStorage.getItem("company_name");

    forkJoin(
    this.Service.purBillItemRetriveListPrint(this.Purbillid),
    this.Service.purBillRetriveList(this.Id),
    this.Service.purBillCharMatrixposting(this.Purbillid),
    this.DropDownListService.getCompanyBUMNCList(this.company_name),
    this.DropDownListService.ledgerNameList(),
    this.DropDownListService.getCompanyDetails(this.companyname),
    this.Service.getpurBillInvTaxSum(this.Purbillid),
    this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.business_unit)
    ).subscribe(([itemData,staticData,chargeData,business,ledgerdata,compdetails,invoiceTaxSum,companystate])=>
    {
      this.Service.getpurbillprintupperdata(this.Purbillid).subscribe(upperdata=>
        {
          //console.log("Bill Data : : "+upperdata);
          this.purorderno=upperdata[0]["ponumber"];
          this.purbillno=upperdata[0]["pur_bill_no"];
          this.purbilldate=upperdata[0]["bill_date"];
          this.purorderdate=upperdata[0]["podate"];
          this.vechileno=upperdata[0]["vehicleno"];
          this.gstn=upperdata[0]["gstn"];
          this.partyname=upperdata[0]["supplier"];
          this.address=upperdata[0]["address"];
        })
      //console.log(" invoice  "+JSON.stringify(invoiceTaxSum))
    

      //console.log(" data :: "+ upperdata[0]["vehicleno"])
      this.gst_no=companystate["gstin_no"];
      this.company_name1=compdetails.company_name;
      this.cin_no=compdetails.tin_no;
      this.billno=staticData.pur_bill_no;
      this.billdate=staticData.billdate;
      this.vehicleno=staticData.vehicleno;
      this.DropDownListService.getCBUdetailsById(staticData["business_unit"]).subscribe((cbudata)=>
      { 
        
        this.work_address=cbudata.work_address;
        this.pin_no=cbudata.pin_code;
        this.state_name=cbudata.state_name;
        this.city_name=cbudata.city_name;
      });
      
      this.DropDownListService.getAddrById(staticData["supplier_name"]).subscribe(stateName=>{
        this.statename=stateName["state"];
        
        });
//console.log("item data"+JSON.stringify(itemData))
      for(let itemdetails of itemData)
      {
        itemdetails["slno"]=this.sLNumber;
        this.totalglobalamount_dr+=Number(itemdetails["net_amount"]);
        this.sLNumber=this.sLNumber+1;
      }
      this.itemList=itemData;

       //round off
        if(Number(staticData["roundoff_amt"]) ==0)
        {
          this.roundoff_gl_acstatus=false;
        }
        else
        {
          this.roundoff_gl_acstatus=true;
          this.roundoffsl_no=this.sLNumber;
          this.sLNumber=this.sLNumber+1;
        }                           

        this.supplier_slno=this.sLNumber;

        if(staticData["export"]==0)
        {
          this.billPosting=true;
          this.postingAction=true;
        }
        else
        {
          this.postingAction=false;
        }
        
        this.supplier_name=staticData["supplier"];
        this.supplier_amount=Number(staticData["net_payable_party"]).toFixed(2);
        
        this.totalglobalamount_cr+=Number(this.supplier_amount);

        let roundoff:number=0;
        roundoff=staticData["roundoff_amt"];
        if(roundoff<0)//CREDIT 
        {
          this.roundoff_amount_cr=Number(staticData["roundoff_amt"]).toFixed(2);
          this.roundoff_amount_cr=this.roundoff_amount_cr.substring(1, this.roundoff_amount_cr.length);
          this.totalglobalamount_cr+=Number(this.roundoff_amount_cr);
        }
        else//debit
        {
          this.roundoff_amount_dr=Number(staticData["roundoff_amt"]).toFixed(2);
          this.totalglobalamount_dr+=Number(this.roundoff_amount_dr);
        }
    
        this.item_name = itemData[0]["adv_item_name"];
        this.item_amount = Number(itemData[0]["net_amount"]).toFixed(2);
        this.sLNumber=this.sLNumber+1;
       
        if(staticData["app_chgs_id"] == 0 || staticData["app_chgs_id"] == null)
        {
          this.showcharge_matrix=false;
        }
   //   console.log(" charge matrix ::: "+JSON.stringify(chargeData))
        for(let data1 of chargeData)
        {
          if( this.showcharge_matrix==true)
          {
            data1["p_id"]=this.sLNumber;
            if(data1["add_less"] =='less')
            {
              if(data1["amount"] == '' || data1["amount"]== null || data1["amount"]=='undefined')
              {
              }
              else
              {
                this.totalglobalamount_cr+=Number(data1["amount"]);
              }
             
             
            }
            if(data1["add_less"] =='add')
            { 
              if(data1["amount"] == '' || data1["amount"]== null || data1["amount"]=='undefined')
              {}
              else
              {
                this.totalglobalamount_dr+=Number(data1["amount"]);
              }

             
            }
          
            this.sLNumber=this.sLNumber+1;
          }
        }
      
        this.charge_matrix_list=chargeData;
    
        let unitarray:any=[];
        unitarray=business;

        unitarray.forEach(element => {
          if(element.businessunit_id == staticData["business_unit"])
          {
            this.businessUnit=element.businessunit_name;
          }

        });

     
        let ledger:any=[];
        ledger=ledgerdata;
        ledger.forEach(element=>{
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

        if(Number(staticData["add1"])>0)
        {
          this.addplus=true;
          this.addplusamount=staticData["add1"];
          this.totalglobalamount_dr+=Number(this.addplusamount);
          this.addplus_slno=this.sLNumber;
        }
        if(Number(staticData["add2"])>0)
        {
          this.addminus=true;
          this.addminusamount = staticData["add2"];
          this.totalglobalamount_cr+=Number(this.addminusamount);
          this.addminus_slno=this.sLNumber;
        }
      
        this.taxNumber=this.sLNumber;
        console.log(" size "+ invoiceTaxSum.length)
        for(let gstTaxData of invoiceTaxSum)
        {
          if(Number(gstTaxData["igst"]) == 0.0)
          {
            console.log("slno "+ this.taxNumber)
            
            gstTaxData["fin_year"]=this.taxNumber;
            this.taxNumber=this.taxNumber+1;
            gstTaxData["inserted_by"]=this.taxNumber;
            console.log("slno "+gstTaxData["inserted_by"]+' / '+gstTaxData["fin_year"] )
          }
          else
          {
        
            gstTaxData["username"]=this.taxNumber;
            this.taxNumber=this.taxNumber+1;
          }

          ledger.forEach(ledger=>
            {
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
         
          itemData.forEach(element=>
          {
            if(element.discount_amount>0)
            {
              this.sLNumber=this.sLNumber+1;
              element.squantity=this.sLNumber;
              
            }
            
          });
        

          let finalop=this.totalglobalamount_cr.toFixed(2);
          let finalopdr=this.totalglobalamount_dr.toFixed(2);
          this.totalglobalamount_cr= Number(finalop);
          this.totalglobalamount_dr= Number(finalopdr);
        

          this.show=true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()}); 
    }
    response_c:any;
      accountpostingFinal(action)
      {
        if(action=="Posting")
        {
        this.DropDownListService.accountpostingPurchaseBill(this.Id).subscribe(data=>
          {
            if(data["export"] == 1)
            {
              //alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
              this.toast.success("Data has been Exported Sucessfully ! ","Success");
            }
            else
            {
              //alert("Data Didn't Exported  !!!!!!!!!!!!! ");
              this.toast.error("Data Didn't Exported !!!!!!!! ","Error");
            }
            this.response_c=data["export"];
            //console.log("export " + this.response_c)
            this.sendtoMaints(this.response_c);
            this.ngOnInit();
          // this.isHidden = false;
            this.status = true;
          });
        }
        else
        {
          alert
          if(confirm("Are you sure to Posting Undo Of this Bill ?"))
          {
            if(confirm("First Delete This Purchase Bill From Tally!!!"))
            {
              this.DropDownListService.accountpostingPurchaseBillundo(this.Id).subscribe(data=>
                {
                  if(data["export"] == 0)
                  {
                    //alert("Account Posting Undo Sucessfully !!!!!!!!!!!!! ");
                    this.toast.success("Account Posting Undo Sucessfully !!!!!!!!!!!!! ");
                  }
                  else
                  {
                    this.toast.error("Undo Unsucessfull  !!!!!!!!!!!!! ");
                  }
                  this.response_c=data["export"];
                  //console.log("export " + this.response_c)
                  this.sendtoMaints(this.response_c);
                  this.ngOnInit();
                  
                });
            }
            
          }
        }
      }

      sendtoMaints(response_c)
      {
        //console.log("export1 " + response_c)
        this.userForm.patchValue({response_return:response_c});
        this.dialogRef.close(this.userForm.getRawValue()); 
      }
}
