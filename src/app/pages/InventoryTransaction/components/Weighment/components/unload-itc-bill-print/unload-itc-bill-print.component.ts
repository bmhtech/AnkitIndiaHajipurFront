import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-unload-itc-bill-print',
  templateUrl: './unload-itc-bill-print.component.html',
  styleUrls: ['./unload-itc-bill-print.component.scss']
})
export class UnloadItcBillPrintComponent implements OnInit {
unload_id: any;
  ID: any;
  BusinessUnit: any;
  advice_no: any;
  advicetime: any;
  advicedate: any;
  oderno: any;
  showorderno: boolean = false;
  challanno: any;
  tareweight: any;
  grossweight: any;
  netweight: any;
  vehicleno: any;
  slipno: any;
  purchaseitemList: any = [];
  suppliername: any;
  todayDate: any;
  currentdate: any;
  purchase_order_date: any;
  companyname: any;
  company_bu_address: any;
  company_dist: any;
  company_state: any;
  company_pin: any;
  company_name: any;
  dist: any;
  reftype: boolean = true;
  nameswitch: boolean = true;
  billPacking: boolean = false;
  jobworkstatus: boolean = false;

  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<UnloadItcBillPrintComponent>, @Inject(MAT_DIALOG_DATA) data) {


    this.ID = data["alldata"];
    this.unload_id = data["unloadid"];
    this.companyname = data["company_name"];
  }

  ngOnInit() {

    this.Service.unloadAdviceRetrive(this.ID).subscribe(UnloadingAdviceData => {
      if (UnloadingAdviceData["jobwork"] == true || UnloadingAdviceData["jobwork"] == '1') {
        this.jobworkstatus = true;
        this.billPacking = false;
        forkJoin(
          this.DropDownListService.unloadadvicejobworkRetriveList(this.unload_id),
          this.Service.wmUnAdvicePartyWmRetriveList(this.unload_id),
          this.DropDownListService.getCompanyDetails(this.companyname),
          this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),'CBU00001'),
        ).subscribe(([itemData, partyData, compdetails,companystate]) => {
          console.log("COMPANy DTLS:: ",JSON.stringify(compdetails));
          if (UnloadingAdviceData["ref_type"] == 'Purchase Order' || UnloadingAdviceData["ref_type"] == 'Open Advice' || UnloadingAdviceData["ref_type"] == 'Stock Transfer Unloading') {
            this.reftype = true;
          }
          if (UnloadingAdviceData["ref_type"] == 'Sales Return') {
            this.reftype = false;
          }
          this.currentdate = UnloadingAdviceData["ula_date"]

          this.company_name = compdetails.company_name;
          this.company_state=companystate["state_name"];
          this.company_dist=companystate["dist_name"];
          this.company_bu_address=companystate["mailing_address"];
          this.company_pin=companystate["pin_code"];

          this.BusinessUnit = UnloadingAdviceData.business_unitname;
          this.advice_no = UnloadingAdviceData.unadviceno;
          this.vehicleno = UnloadingAdviceData["vehicle_no"];

          if (UnloadingAdviceData.pur_orderid == null) {
            this.showorderno = false;
          }
          else {
            this.showorderno = true;
            this.oderno = UnloadingAdviceData.pur_orderid
          }
          this.challanno = UnloadingAdviceData.supp_ref_docno;

          //getPurOrd
          console.log(UnloadingAdviceData["referance_id"])
          this.DropDownListService.getPurOrd(UnloadingAdviceData["referance_id"]).subscribe(checkPurOrd => {
            console.log(JSON.stringify(checkPurOrd))
            console.log(checkPurOrd[0]["ord_date"])
            this.purchase_order_date = checkPurOrd[0]["ord_date"];
          });

          this.tareweight = partyData.tare_wt;
          this.grossweight = partyData.gross_wt;
          this.netweight = partyData.net_wt;
          this.slipno = partyData.slip_no;
          console.table(itemData);
          this.purchaseitemList = itemData;

          let loadingtime = UnloadingAdviceData["inserted_on"];

          let dateTime = new Date(loadingtime);
          this.todayDate = dateTime.getTime();


          if (UnloadingAdviceData.supp_name == null) {
            this.nameswitch = false;
            forkJoin(
              this.DropDownListService.partynameListById(UnloadingAdviceData.customer),
              this.DropDownListService.getCustomerAddress(UnloadingAdviceData.customer)
            )
              .subscribe(([customername, district]) => {
                this.suppliername = customername["cp_name"];
                this.dist = district["district"];
              });

          }
          else {
            this.suppliername = UnloadingAdviceData.supp_name;
            this.DropDownListService.getSupplierAddress(UnloadingAdviceData["busi_partner"]).subscribe(suppdetails => {
              console.log(JSON.stringify(suppdetails))
              this.dist = suppdetails["district"];
            });
          }
        });
      }
      else {
        this.jobworkstatus = false;

        forkJoin(
          this.Service.getUnloadItemList(this.unload_id),
          this.Service.wmUnAdvicePartyWmRetriveList(this.unload_id),
          this.DropDownListService.getCompanyDetails(this.companyname),
          this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),'CBU00001'),
        ).subscribe(([itemData, partyData, compdetails,companystate]) => {
          console.log("COMPANy DTLS:: ",JSON.stringify(compdetails));
          if (UnloadingAdviceData["ref_type"] == 'Purchase Order' || UnloadingAdviceData["ref_type"] == 'Open Advice' || UnloadingAdviceData["ref_type"] == 'Stock Transfer Unloading') {
            this.reftype = true;
          }
          if (UnloadingAdviceData["ref_type"] == 'Sales Return') {
            this.reftype = false;
          }
          this.currentdate = UnloadingAdviceData["ula_date"]

          this.company_name = compdetails.company_name;
          this.company_state=companystate["state_name"];
          this.company_dist=companystate["dist_name"];
          this.company_bu_address=companystate["mailing_address"];
          this.company_pin=companystate["pin_code"];
          this.BusinessUnit = UnloadingAdviceData.business_unitname;
          
          this.advice_no = UnloadingAdviceData.unadviceno;
          this.vehicleno = UnloadingAdviceData["vehicle_no"];

          if (UnloadingAdviceData.pur_orderid == null) {
            this.showorderno = false;
          }
          else {
            this.showorderno = true;
            this.oderno = UnloadingAdviceData.pur_orderid
          }
          this.challanno = UnloadingAdviceData.supp_ref_docno;

          //getPurOrd
          console.log(UnloadingAdviceData["referance_id"])
          this.DropDownListService.getPurOrd(UnloadingAdviceData["referance_id"]).subscribe(checkPurOrd => {
            console.log(JSON.stringify(checkPurOrd))
            console.log(checkPurOrd[0]["ord_date"])
            this.purchase_order_date = checkPurOrd[0]["ord_date"];

          });

          if (UnloadingAdviceData["item_subtypename"] == 'PACKING ITEMS') {
            this.billPacking = true;
          }
          else {
            this.billPacking = false;
          }


          this.tareweight = partyData.tare_wt;
          this.grossweight = partyData.gross_wt;
          this.netweight = partyData.net_wt;
          this.slipno = partyData.slip_no;

          console.table(itemData);
          this.purchaseitemList = itemData;

          let loadingtime = UnloadingAdviceData["inserted_on"];

          let dateTime = new Date(loadingtime);
          this.todayDate = dateTime.getTime();


          if (UnloadingAdviceData.supp_name == null) {
            this.nameswitch = false;
            forkJoin(
              this.DropDownListService.partynameListById(UnloadingAdviceData.customer),
              this.DropDownListService.getCustomerAddress(UnloadingAdviceData.customer)
            )
              .subscribe(([customername, district]) => {
                this.suppliername = customername["cp_name"];
                this.dist = district["district"];
              });

          }
          else {
            this.suppliername = UnloadingAdviceData.supp_name;
            this.DropDownListService.getSupplierAddress(UnloadingAdviceData["busi_partner"]).subscribe(suppdetails => {
              console.log(JSON.stringify(suppdetails))
              this.dist = suppdetails["district"];
            });
          }
        });
      }
    });
  }
}
