import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Console } from 'console';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-stock-transfer-challan-print-pop-up',
  templateUrl: './stock-transfer-challan-print-pop-up.component.html',
  styleUrls: ['./stock-transfer-challan-print-pop-up.component.scss']
})
export class StockTransferChallanPrintPopUpComponent implements OnInit {
  ID:any;
  challan_id:any;
  bussiness_unit_list:any=[];
  itemDetails:any=[];
  business_name:any;
  currentdate:any;
  customer:any;
  address:any;
  orderno:any;
  orderdate:any;
  broker1:any;
  challanno:any;
  challandate:any;
  vehicle:any;
  permit:any;
  freight_amt:any;
  adv_paid:any;
  trms:any;
  gstinno:any;


  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StockTransferChallanPrintPopUpComponent>, @Inject(MAT_DIALOG_DATA)data) {


      this.ID=data["alldata"];
      this.challan_id=data["challan_id"];
     
     }

  ngOnInit() {
    this.bussiness_unit_list = JSON.parse(localStorage.getItem("businessunit"));
    //this.currentdate=formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentdate=formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

    forkJoin(
      this.Service.getStockTransChlnById(this.ID),
      this.Service.getStkTransChallanItemDlts(this.challan_id),
      this.Service.getStkTransChallanShipDtls(this.challan_id),
      this.Service.getStkTransChallanTranInfo(this.challan_id),
      

      ).subscribe(([staticData,itemData,shipmentData,transportData])=>
        {
          this.bussiness_unit_list.forEach(element=>
            {
              if(staticData["business_unit"]==element.businessunit_id)
              {
                this.business_name=element.businessunit_name; 
              }
            })
           
           this.DropDownListService.getCompanyBUAddress(staticData["delivery_business_unit"]).subscribe(deliveryBU=>{
            //console.log("deliveryBU:"+JSON.stringify(deliveryBU));
               this.customer=deliveryBU["businessunit_name"];
             });
             
            if(staticData["reference_id"] == "" || staticData["reference_id"] == null || staticData["reference_id"] == "0")
            {
              this.orderno="Open Stock Transfer Challan";
              this.orderdate="";
            }
            else
            {
              this.DropDownListService.getOrderNumberForChallan(staticData["reference_id"],staticData["ref_type"]).subscribe(challanOreder=>{
                //console.log("deliveryBU:"+JSON.stringify(deliveryBU));
                this.orderno=challanOreder["order_no"];
                this.orderdate=challanOreder["order_date"];
                  });
            }
           
            this.DropDownListService.getVehicleDetails(transportData["vehicle_no"]).subscribe(vehicleNo=>{
              //console.log("deliveryBU:"+JSON.stringify(deliveryBU));
              this.vehicle=vehicleNo["vehicle_no"];
             });

            this.address=shipmentData["pay_details"];
            this.challanno=staticData["stk_challan_no"];
            this.challandate=staticData["stk_challan_date"];

            this.permit=transportData["trans_borne_by"];
            this.freight_amt=transportData["freight_amt"];
            this.adv_paid=transportData["adv_paid"];
            
            console.log("itemData:"+JSON.stringify(itemData))
          this.itemDetails=itemData;
           
        });
  }

}