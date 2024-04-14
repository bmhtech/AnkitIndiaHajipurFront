import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-transportjvposting',
  templateUrl: './transportjvposting.component.html',
  styleUrls: ['./transportjvposting.component.scss']
})
export class TransportjvpostingComponent implements OnInit {
  Id:any;
  TransportId:any;
  Sortage:any;
  charge_matrix_list:any=[];
  Sortageamount:any;
  roundoff:any;
  roundoff_amount_dr:any;
  roundoff_amount_cr:any;
  price:any;
  price_dr:any;
  price_cr:any;
  transname:any;
  tds:any;
  tds_amount_dr:any;
  tds_amount_cr:any;
  jvTotal:any;
  adv_price:any;
  adv_price_dr:any;
  adv_price_cr:any;
  roundoff_acstatus:boolean=false;
  sortage_acstatus:boolean=false;
  adv_trans_acstatus:boolean=false;
  tds_acstatus:boolean=false;
  totalamount_dr:number=0;
  totalamount_cr:number=0;
  transportname:any;
  chgs_credit:any;
  chgs_debit:any;
  posting:boolean=true;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<TransportjvpostingComponent>, @Inject(MAT_DIALOG_DATA)data) 
    {
      this.Id=data["id"];
      this.TransportId=data["sales_tranport_id"];
    }

  ngOnInit() 
  {
    forkJoin
    (
      this.DropDownListService.getSalesTransport(this.Id),
      this.DropDownListService.getSalesTransportChgs(this.TransportId)
    ).subscribe(
      ([salestransport,salescharges])=>
      {
        console.log(JSON.stringify(salestransport))
       // this.Sortageamount=salestransport["mat_amt"].toFixed(2);
        this.roundoff=salestransport["round_off"];
      //  this.charge_matrix_list=salescharges;
        this.price=salestransport["pay_amt"].toFixed(2);
        this.transname=salestransport["transname"];
        //this.jvTotal=salestransport["price"].toFixed(2);
        this.jvTotal=Number(salestransport["actual_amt"]).toFixed(2);
        this.transportname=salestransport["transname"];
      
        //posting
        console.log("export:"+salestransport["export"])
        if(salestransport["export"]==0)
        {
          console.log("if part")
          this.posting=true;
        }
        else
        {
          console.log("else part")
          this.posting=false;
        }

        if(salestransport["chgs_dedu"]<0)
        {
          this.chgs_credit=0;
          this.chgs_debit=Number(salestransport["chgs_dedu"]).toFixed(2);
          this.chgs_debit=Math.abs(this.chgs_debit);
          console.log("-ve"+this.chgs_credit+"//"+this.chgs_debit)
        }
        else{
          this.chgs_debit=0;
          this.chgs_credit=Number(salestransport["chgs_dedu"]).toFixed(2);
          this.chgs_credit=Math.abs(this.chgs_credit);
          console.log("+ve"+this.chgs_credit+"//"+this.chgs_debit)
        }
        //Advance Pay
        // if(Number(salestransport["adv_pay"]) == 0)
        // {
        //   this.adv_trans_acstatus=false;
        // }
        // else
        // {
        //   this.adv_trans_acstatus=true;
        // }
        // Advance Transportation Cost
        //let adv_price:number=0;
       // adv_price=salestransport["adv_pay"];
        // if(adv_price>0)//Credit
        // {
        //   this.adv_price_cr=Number(salestransport["adv_pay"]).toFixed(2);
        //   this.totalamount_cr+=Number(this.adv_price_cr);
        // }
        // else//Debit
        // {
        //   this.adv_price_dr=Number(salestransport["adv_pay"]).toFixed(2);
        //   this.adv_price_dr=Math.abs(this.adv_price_dr);
        //   this.totalamount_dr+=Number(this.adv_price_dr);
        // }
        //TDS
        if(Number(salestransport["tds_amt"]) == 0)
        {
          this.tds_acstatus=false;
        }
        else
        {
          this.tds_acstatus=true;
        }
        //TDS
        let tds:number=0;
        tds=salestransport["tds_amt"];
        if(tds>0)//CREDIT 
        {
          this.tds_amount_cr=Number(salestransport["tds_amt"]).toFixed(2);
          this.totalamount_cr+=Number(this.tds_amount_cr);
        }
        else//debit
        {
          this.tds_amount_dr=Number(salestransport["tds_amt"]).toFixed(2);
          this.tds_amount_dr=Math.abs(this.tds_amount_dr);
          this.totalamount_dr+=Number(this.tds_amount_dr);
        }

        //Sortage
        if(Number(salestransport["mat_amt"])<=0)
        {
          this.sortage_acstatus=false;

        }
        else
        {
          this.sortage_acstatus=true;
          //this.totalamount_cr+=Number(salestransport["mat_amt"]);
        }

        //round off
        if(Number(salestransport["round_off"]) ==0)
        {
          this.roundoff_acstatus=false;
        }
        else
        {
          this.roundoff_acstatus=true;
        }
        //Round Off
        let roundoff:number=0;
        roundoff=salestransport["round_off"];
        if(roundoff<0)//CREDIT 
        {
          console.log("credit  ")
          this.roundoff_amount_cr=Number(salestransport["round_off"]).toFixed(2);
          this.roundoff_amount_cr=this.roundoff_amount_cr.substring(1, this.roundoff_amount_cr.length);
          this.totalamount_cr+=Number(this.roundoff_amount_cr);
        }
        else//Debit
        {
          console.log("debit ")
          this.roundoff_amount_dr=Number(salestransport["round_off"]).toFixed(2);
          this.totalamount_dr+=Number(this.roundoff_amount_dr);
        }
        // Transportation Cost
        let price:number=0;
        price=salestransport["final_pay"];
        if(price>0)//Credit 
        {
          this.price_cr=Number(salestransport["pay_amt"]).toFixed(2);
          this.totalamount_cr+=Number(this.price_cr);
        }
        else//Debit
        {
          this.price_dr=Number(salestransport["pay_amt"]).toFixed(2);
          this.price_dr=Math.abs(this.price_dr);
          this.totalamount_dr+=Number(this.price_dr);
        }

      
          this.totalamount_dr+=Number(this.jvTotal);
          this.totalamount_cr+=Number(this.chgs_credit);
          this.totalamount_dr+=Number(this.chgs_debit);
          
       /* for(let data1 of salescharges)
        {
          if(data1["add_less"] =='less')
          {
            if(data1["amount"] == '' || data1["amount"]== null || data1["amount"]=='undefined')
            {

            }
            else
            {
              this.totalamount_cr+=Number(data1["amount"]);
            }
          }
          if(data1["add_less"] =='add')
          { 
            if(data1["amount"] == '' || data1["amount"]== null || data1["amount"]=='undefined')
            {

            }
            else
            {
              this.totalamount_dr+=Number(data1["amount"]);
            }
          }
          }*/
        }


      );
    

    
  }

  accountposting(action)
  {

    if(action=="Posting")
    {
      this.DropDownListService.accountpostingsalestransport(this.Id).subscribe(data=>
        {
       
          console.log("export: "+data["export"]);
          console.log("response: "+data["response"]);
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
        
         
        });
    }
    else
    {
      

        
      alert
      if(confirm("Are you sure to Posting Undo Of this Item ?"))
      {
        if(confirm("First Delete This Item Ledger From Tally!!!"))
        {
          this.DropDownListService.accountpostingsalestransportundo(this.Id).subscribe(data=>
            {
              if(data["export"] == 0)
              {
                alert("Account Posting Undo Sucessfully !!!!!!!!!!!!! ");
              }
              else
              {
                alert("Undo Unsucessfull  !!!!!!!!!!!!! ");
              }
              
              this.ngOnInit();
              
            });
        }
        
      }
    }
    
    
  }


}
