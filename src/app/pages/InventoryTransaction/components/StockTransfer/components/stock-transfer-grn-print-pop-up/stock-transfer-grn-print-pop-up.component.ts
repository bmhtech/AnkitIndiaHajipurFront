import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-stock-transfer-grn-print-pop-up',
  templateUrl: './stock-transfer-grn-print-pop-up.component.html',
  styleUrls: ['./stock-transfer-grn-print-pop-up.component.scss']
})
export class StockTransferGrnPrintPopUpComponent implements OnInit {

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
  stockNo:any;
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
  rec_b_unit:any;
  itemDetails:any = [];
  B_unit:any;
  Reference_status:any;
  Reference_id:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StockTransferGrnPrintPopUpComponent>, @Inject(MAT_DIALOG_DATA)data) 
    { 

      this.Id=data["id"];
    this.Grn_id=data["grn_id"];
    this.B_unit=data["bu_unit"];
    this.Reference_status=data["reference_status"];
    this.Reference_id=data["reference_id"];
    //console.log("this.Id :"+ this.Id +" / " + this.Grn_id);

    }

  ngOnInit() {
  forkJoin(
    this.Service.retriveStkTransGRN(this.Id),
    this.Service.StkTransGRNItemRetriveList(this.Grn_id),      
    this.Service.StkTransGRNOtherInfoRetriveList(this.Grn_id),
    this.DropDownListService.getStockOrdByUnloadCode(this.Reference_id,this.Reference_status),
    this.DropDownListService.getCompanyBUAddress(this.B_unit)
        
      
        ).subscribe(([GrnData, itemData, OtherInfoData,stockNo,supplierdetails])=>
        { 
          //console.log("GrnData/"+JSON.stringify(stockNo));    
          this.Supplier=GrnData["b_unitname"];
          this.rec_b_unit=GrnData["rec_b_unit"];
          
          this.stockNo=stockNo["order_no"];
          this.orddate=stockNo["order_date"];

          this.partyaddress=supplierdetails["work_address"];
           

          this.grnno=GrnData["stk_grn_no"];
          this.grndate=this.datecalculator(GrnData["stk_grn_date"]);
          
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
          
         // console.log("chk itemdata:"+JSON.stringify(itemData))
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

                 
        });
      
}


datecalculator(date)
{

  let date1=date.split("-");
  return date = date1[2]+"/"+date1[1]+"/"+date1[0];
}

}