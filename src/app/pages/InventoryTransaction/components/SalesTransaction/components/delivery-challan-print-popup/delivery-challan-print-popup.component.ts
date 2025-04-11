import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Console } from 'console';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-delivery-challan-print-popup',
  templateUrl: './delivery-challan-print-popup.component.html',
  styleUrls: ['./delivery-challan-print-popup.component.scss']
})
export class DeliveryChallanPrintPopupComponent implements OnInit {
  ID:any;
  delv_id:any;
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
  companyname:any;
  company_name:any;
  cin_no:any;
  work_address:any;
  pin_no:any;
  state_name:any;
  city_name:any;
  businessUnit:any;
  bunit:any;
  dist:any;
  pin:any;
  bu_address:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<DeliveryChallanPrintPopupComponent>, @Inject(MAT_DIALOG_DATA)data) {


      this.ID=data["alldata"];
      this.delv_id=data["deliveryid"];
      this.companyname=data["company_name"];
      this.bunit=data["bunit"];

     }

  ngOnInit() {
    this.bussiness_unit_list = JSON.parse(localStorage.getItem("businessunit"));
    //this.currentdate=formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentdate=formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

    forkJoin(
      this.Service.retriveDeliveryChallan(this.ID),
      this.Service.getDlvChallanItemDtls(this.delv_id),
      this.Service.getDlvChallanShipmentDtls(this.delv_id),
      this.Service.getDlvChallanBrokerDtls(this.delv_id),
      this.Service.getDlvChallanTransInfo(this.delv_id),
      this.DropDownListService.getVehicleThruWeighment(),
      this.Service.retriveDeliveryChallanOrderNo(this.delv_id),
      this.DropDownListService.brokerNamesList(),
      this.DropDownListService.payTermNameList(),
      this.Service.getDlvChallanPartyDtls(this.delv_id),
      this.DropDownListService.getCompanyDetails(this.companyname),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.bunit)

      ).subscribe(([staticData,itemData,shipmentData,brokerData,transportData,allVehicledata,
        salesOrdData,Broker,ordPartyData,partyData,compdetails,bunitdetails])=>
        {
          console.log("staticData:"+JSON.stringify(staticData))
          this.dist=bunitdetails.dist_name;
          this.bu_address=bunitdetails.mailing_address;
          this.pin=bunitdetails.pin_code;
          this.company_name=compdetails.company_name;
          this.cin_no=compdetails.tin_no;

          this.DropDownListService.partynameListById(staticData["party"]).subscribe((printData)=>
          { 
           // console.log("print:"+JSON.stringify(printData))
            this.customer=printData["print_to_name"];
          });

          this.DropDownListService.getCBUdetailsById(staticData["business_unit"]).subscribe((cbudata)=>
          { 
           // console.log("cbudata:"+JSON.stringify(cbudata))
            this.businessUnit=cbudata.businessunit_name;
            this.work_address=cbudata.work_address;
            this.pin_no=cbudata.pin_code;
            this.state_name=cbudata.state_name;
            this.city_name=cbudata.city_name;
          });
          /*this.bussiness_unit_list.forEach(element=>
            {
              if(staticData["business_unit"]==element.businessunit_id)
              {
                this.business_name=element.businessunit_name;
                
              }
             
            })*/
           
          allVehicledata.forEach(element1=>
            {
              //console.log("transportData::"+transportData["vehle_no"] +"element:"+element1.vehicle_id)
              if(transportData["vehle_no"]==element1.vehicle_id)
              {
                this.vehicle=element1.vehicle_no;
               // console.log("vehh:"+this.vehicle+"//"+element1.vehicle_no)
              }
              
            })

            
            Broker.forEach(element1=>
            {
              //console.log("bro::"+brokerData[0]["broker_code"]+"////"+element1.broker_Id)
              if(brokerData[0]["broker_code"]==element1.broker_Id)
              {
                this.broker1=element1.name;
              }
              
            })   
            //console.log("broker data::"+this.broker1)
            // this.DropDownListService.brokerListById(brokerData["broker_code"]).subscribe(brokername=>{
            //   this.broker=brokername["name"];
            // });
           // console.log("ord data::"+JSON.stringify(salesOrdData))
            //this.customer=staticData["partyname"];
            this.address=shipmentData["pay_details"];
            this.orderno=salesOrdData["order_no"];
            this.orderdate=salesOrdData["order_date"];
            this.challanno=staticData["challan_no"];
            this.challandate=staticData["challan_date"];
            this.permit=transportData["trans_borne_by"];
            this.freight_amt=transportData["freight_amt"];
            this.adv_paid=transportData["adv_paid"];
            
           // console.log("itemData:"+JSON.stringify(itemData))
          this.itemDetails=itemData;

          if(staticData.ref_type==='GRN') //For Delivrry challan Comes From Direct GRN
          {
            forkJoin(
              this.DropDownListService.getGrnDetails(staticData["referance_id"]),
              this.Service.custStatutoryRetriveList(partyData[0]["p_code"])
    
              ).subscribe(([grnData,gstnNo])=>{
                  
                if(gstnNo["gst_no"] == null || gstnNo["gst_no"] =='')
                {
                  this.gstinno = "Un-Registered";
                }
                else{
                  this.gstinno = gstnNo["gst_no"];
                }
                
                   this.Service.getSalesOrdTermsCon(grnData["sales_order"]).subscribe(orderparty=>{
                    
                    ordPartyData.forEach(element => {
                      if(element.payterm_id == orderparty["payment_term"])
                      {
                        this.trms = element.payterm_desc;
                      }
                      
                    });
                  
                    });
                 });
          }
          else{   //For Delivrry challan Comes From Loading Advice
            forkJoin(
              this.DropDownListService.getLoadingDetails(staticData["referance_id"]),
              this.Service.custStatutoryRetriveList(partyData[0]["p_code"])
    
              ).subscribe(([advice,gstnNo])=>{
                  
                if(gstnNo["gst_no"] == null || gstnNo["gst_no"] =='')
                {
                  this.gstinno = "Un-Registered";
                }
                else{
                  this.gstinno = gstnNo["gst_no"];
                }
                
                   this.Service.getSalesOrdTermsCon(advice["referance_id"]).subscribe(orderparty=>{
                    
                    ordPartyData.forEach(element => {
                      if(element.payterm_id == orderparty["payment_term"])
                      {
                        this.trms = element.payterm_desc;
                      }
                      
                    });
                  
                    });
                 });
          }

        });
  }

}
