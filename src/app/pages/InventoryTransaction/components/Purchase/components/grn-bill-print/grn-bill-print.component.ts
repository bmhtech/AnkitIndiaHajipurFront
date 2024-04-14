import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-grn-bill-print',
  templateUrl: './grn-bill-print.component.html',
  styleUrls: ['./grn-bill-print.component.scss']
})
export class GrnBillPrintComponent implements OnInit {


  Id:any;
  Grn_id:any;
  Supplier:any;
  grnno:any
  grndate:any;
  b_unitname:any;
  partyaddress:any;
  partystate:any;
  partydistrict:any;
  partycity:any;
  partypincode:any;
  brokername:any;
  purNo:any;
  orddate:any;
  truck_no:any;
  adviceFrt:any;
  billamt:any;
  ownBridge:any;
  ownSlip:any;
  ownTare:any;
  ownGross:any;
  ownNet:any;
  partyBridge:any;
  partySlip:any;
  partyTare:any;
  partyGross:any;
  partyNet:any;
  Own_recieve:any;
  Part_recieve:any;
  doc_no:any;
  doc_date:any;
  currentDate:any;
  itemDetails:any = [];
  companyname:any;
  company_name:any;
  cin_no:any;
  work_address:any;
  pin_no:any;
  state_name:any;
  city_name:any;

  constructor(private fb: FormBuilder,private Service: PurchaseModuleServiceService,private Service1: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<GrnBillPrintComponent>, @Inject(MAT_DIALOG_DATA)data) {



    this.Id=data["id"];
    this.Grn_id=data["grn_id"];
    //console.log("this.Id :"+ this.Id +" / " + this.Grn_id);
    this.companyname=data["company_name"];
		 


     }

     ngOnInit() {

      forkJoin(
        this.Service.retrivePurchaseGoodReceipt(this.Id),
        this.Service.grnItemDtlsRetriveList(this.Grn_id),      
        this.Service.grnOtherInfoRetriveList(this.Grn_id),
        this.Service.grnBrokerRetriveList(this.Grn_id),
        this.DropDownListService.getCompanyDetails(this.companyname)
      
        ).subscribe(([GrnData, itemData, OtherInfoData,brokerdetails,compdetails])=>
        { 
                 
          this.Supplier=GrnData["supplier"];
          this.company_name=compdetails.company_name;
          this.cin_no=compdetails.tin_no
          
         // console.log("bro code::"+JSON.stringify(brokerdetails)+"//"+brokerdetails[0]["ven_code_name"]);
          forkJoin(
            this.Service1.getSuppBPAddr(GrnData["supplier_name"]),
            //this.DropDownListService.getBrokerNameByBrokerCode(brokerdetails[0]["ven_code_name"]),
           // this.DropDownListService.getPurOrdByUnloadCode(GrnData["referance_id"]),
            this.DropDownListService.getCBUdetails(GrnData["b_unitname"])
            
            //this.Service.getSuppBPAddr(unloadtable.busi_partner)
           // ).subscribe(([supplierdetails,brokername,podata,cbudata])=>
           ).subscribe(([supplierdetails,cbudata])=>
            { 
              console.log("cbudata:"+JSON.stringify(supplierdetails))
              this.work_address=cbudata.work_address;
              this.pin_no=cbudata.pin_code;
              this.state_name=cbudata.state_name;
              this.city_name=cbudata.city_name;
             
             // this.partyaddress=supplierdetails.add1+ " " +supplierdetails.add2 + " " +supplierdetails.add3;
             this.partyaddress=supplierdetails.add1+ " ";
              if(supplierdetails.add2 =="null" || supplierdetails.add2 ==null)
              {}
              else
              {
                this.partyaddress+=supplierdetails.add2 + " ";
              }
              if(supplierdetails.add3 =="null" || supplierdetails.add3 ==null)
              {}
              else
              {
                this.partyaddress+=supplierdetails.add3 + " ";
              }
             
              this.partystate=supplierdetails.state;
              this.partydistrict=supplierdetails.district;
              this.partycity=supplierdetails.city;
              this.partypincode=supplierdetails.pincode;
            //  console.log("podata/"+JSON.stringify(podata));
             
              
              
                  

            });
            
          this.grnno=GrnData["grn_no"];
          this.grndate=this.datecalculator(GrnData["grn_date"]);
          this.b_unitname=GrnData["b_unitname"];
          this.truck_no=GrnData["vehicle_no"];


          this.adviceFrt=OtherInfoData["adv_freight_charge"];
          this.billamt=OtherInfoData["freight_paid_amt"];
          this.ownBridge=OtherInfoData["own_weigh_bridge_name"];
          this.ownSlip=OtherInfoData["own_weigh_slip_no"];
          this.ownTare=OtherInfoData["own_tare_wt"];
          this.ownGross=OtherInfoData["own_gross_wt"];
          this.ownNet=OtherInfoData["own_net_wt"];
          this.partyBridge=OtherInfoData["pty_weigh_bridge_name"];
          this.partySlip=OtherInfoData["pty_weigh_slip_no"];
          this.partyTare=OtherInfoData["pty_tare_wt"];
          this.partyGross=OtherInfoData["pty_gross_wt"];
          this.partyNet=OtherInfoData["pty_net_wt"];

          this.itemDetails=itemData;
          let own_weight=0;
          let party_weight=0;
          for(let i=0;i<itemData.length;i++)
          {
            own_weight +=Number(itemData[i].rcv_mat_wt)
            party_weight +=Number(itemData[i].adv_mat_wt)
          }
        
          this.Own_recieve=own_weight;
          this.Part_recieve=party_weight;

          this.currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

          
           if(GrnData["referance_type"] =="OPEN GRN")
           {

           }
           else
           {

            this.DropDownListService.getPurOrdByUnloadCode(GrnData["referance_id"]).subscribe((podata)=>
            {
             this.doc_no=podata["supp_ref_docno"];
             this.doc_date=this.datecalculator(podata["supp_ref_doc_date"]);

               this.DropDownListService.getpurnoByPurOrdCode(podata["pur_orderid"])
               .subscribe(poNo=>
               { 
                this.purNo=poNo["pur_order_no"];
                this.orddate=this.datecalculator(poNo["ord_date"]);
               });
            });
           }

           if(brokerdetails[0]["ven_code_name"] =="")
           {

           }
           else
           {
            this.DropDownListService.getBrokerNameByBrokerCode(brokerdetails[0]["ven_code_name"]).subscribe((brokername)=>
            {
              this.brokername=brokername["name"];
            });
           }
            
        });
      
}


datecalculator(date)
{

  let date1=date.split("-");
  return date = date1[2]+"/"+date1[1]+"/"+date1[0];
}

}
