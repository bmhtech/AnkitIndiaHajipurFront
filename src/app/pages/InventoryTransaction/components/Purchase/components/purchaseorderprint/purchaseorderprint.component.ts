import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-purchaseorderprint',
  templateUrl: './purchaseorderprint.component.html',
  styleUrls: ['./purchaseorderprint.component.scss']
})
export class PurchaseorderprintComponent implements OnInit {

  Id: any;
  PurchaseId: any;
  partyname: any;
  address: any;
  gstno: any;
  pano: any;
  pono: any;
  orderdate: any;
  itemDetails: any = [];
  termscondition: any = [];
  ser_item_subtype_name:any;
  totalamount:number=0;
  totalqty:number=0;
  business_unit:any;
  company_state:any;
  company_name:any;
  cin_no:any;
  dist:any;
  bu_address:any;
  pin:any;
  gst_no:any;
  pan_no:any;
  email_id:any;
  phone_no:any;
  ho_address:any;
  city_name:any;


  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<PurchaseorderprintComponent>, @Inject(MAT_DIALOG_DATA) data) {

    this.Id = data["id"];
    this.PurchaseId = data["purchaseid"];
    this.business_unit=data["businessunit"];
  }

  ngOnInit() {
    this.totalamount=0;
    this.totalqty=0;
    forkJoin(
      this.DropDownListService.getPurOrderDetailsThroughOrderId(this.PurchaseId),
      //this.Service.purOrdItemRetriveList(this.PurchaseId),
      this.Service.purOrdItemwtHSNRetriveList(this.PurchaseId),
      this.DropDownListService.purOrdTramsCondition(this.PurchaseId),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name")),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.business_unit)
    ).subscribe(([staticData, itemData, tremscondition,compdetails,companystate]) => {

      //console.log("PurOrder:"+JSON.stringify(staticData))
      //console.log("PurOrderItem:"+JSON.stringify(itemData))
      //console.log("PurOrderPayment:"+JSON.stringify(tremscondition))
      this.company_name=compdetails.company_name;
      this.cin_no=compdetails.tin_no;
      this.ho_address=compdetails.company_address;
      this.company_state=companystate["state_name"];
      this.dist=companystate["dist_name"];
      this.bu_address=companystate["mailing_address"];
      this.pin=companystate["pin_code"];
      this.gst_no=companystate["gstin_no"];
      this.pan_no=companystate["pan_no"];
      this.email_id=companystate["website_name"];
      this.phone_no=companystate["work_phoneno"];
      this.city_name=companystate["city_name"];

      this.pono = staticData[0].pur_order_no;
      this.partyname = staticData[0].supplier;
      this.orderdate = formatDate(staticData[0].ord_date, 'dd/MM/yyyy', 'en');
      this.ser_item_subtype_name = staticData[0].ser_item_subtype_name;
      this.itemDetails = itemData;
      this.termscondition = tremscondition;

      console.log("PurOrder:"+this.ser_item_subtype_name)
      for(let data of itemData)
      {
        this.totalamount+=Number(data["total_amount"]);
        this.totalqty+=Number(data["packing_qty"]);
        console.log(this.totalamount+"CHECK  "+Number(data["total_amount"]))
       
      }
      //console.log("pono"+this.pono+"//"+this.partyname)
      forkJoin(
        this.DropDownListService.getSupplierAddrFast(staticData[0].supplier_name)
      )
        .subscribe(([printData,]) => {
          console.log("print:" + JSON.stringify(printData))
          this.address = printData["add1"];
          //this.gstno = statinfo["gst_no"];
          //this.pano = statinfo["pan_no"];
          console.log("address" + this.address)
        });

    });
  }

}
