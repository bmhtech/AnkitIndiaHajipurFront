import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-loading-advice-print',
  templateUrl: './loading-advice-print.component.html',
  styleUrls: ['./loading-advice-print.component.scss']
})
export class LoadingAdvicePrintComponent implements OnInit {

  ID: any;
  load_id: any;
  bussiness_unit_list: any = [];
  purchaseitemList: any = [];
  business_name: any;
  advice_no: any;
  customername: any;
  vehicle_no: any;
  currentdate: any;
  currentTime: any;
  todayDate: any;
  sales_order_no: any;
  sales_order_date: any;
  companyname: any;
  company_name: any;
  dist: any;
  jobworkstatus: boolean = false;


  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<LoadingAdvicePrintComponent>, @Inject(MAT_DIALOG_DATA) data) {


    this.ID = data["alldata"];
    this.load_id = data["loadingid"];
    this.companyname = data["company_name"];

  }

  ngOnInit() {

    this.bussiness_unit_list = JSON.parse(localStorage.getItem("businessunit"));
    this.Service.retriveLoadingAdvice(this.ID).subscribe(staticData => {

      if (staticData["jobwork"] == true || staticData["jobwork"] == '1') {
        this.jobworkstatus = true;
        forkJoin(
          this.DropDownListService.loadadvicejobworkRetriveList(this.load_id),
          this.DropDownListService.getCompanyDetails(this.companyname)
        ).subscribe(([JobitemData, compdetails]) => {
          let loadingtime = staticData["inserted_on"];
          let dateTime = new Date(loadingtime);
          this.todayDate = dateTime.getTime();
          this.company_name = compdetails.company_name;
          this.DropDownListService.partynameListById(staticData["customer"]).subscribe((printData) => {
            this.customername = printData["print_to_name"];
          });

          this.DropDownListService.getCustomerDetails(staticData["customer"]).subscribe(custdetails => {
            this.dist = custdetails["district"];
          });

          this.DropDownListService.getSalesOrderDetails(staticData["referance_id"]).subscribe(salesorderstatic => {
            this.sales_order_no = salesorderstatic["order_no"];
            this.sales_order_date = salesorderstatic["order_date"];
          });
          this.bussiness_unit_list.forEach(element => {
            if (staticData["b_unit"] == element.businessunit_id) {
              this.business_name = element.businessunit_name;
            }
          })
          this.advice_no = staticData["advice_no"];
          this.vehicle_no = staticData["vehicle_no"];
          this.currentdate = staticData["advice_date"];
          this.purchaseitemList = JobitemData;
        });
      }
      else {
        this.jobworkstatus = false;
        forkJoin(
          this.Service.loadingItemRetriveListprint(this.load_id),
          this.DropDownListService.getCompanyDetails(this.companyname)
        ).subscribe(([itemData, compdetails]) => {
          let loadingtime = staticData["inserted_on"];
          let dateTime = new Date(loadingtime);
          this.todayDate = dateTime.getTime();
          this.company_name = compdetails.company_name;
          this.DropDownListService.partynameListById(staticData["customer"]).subscribe((printData) => {
            this.customername = printData["print_to_name"];
          });

          this.DropDownListService.getCustomerDetails(staticData["customer"]).subscribe(custdetails => {
            this.dist = custdetails["district"];
          });

          this.DropDownListService.getSalesOrderDetails(staticData["referance_id"]).subscribe(salesorderstatic => {
            this.sales_order_no = salesorderstatic["order_no"];
            this.sales_order_date = salesorderstatic["order_date"];
          });
          this.bussiness_unit_list.forEach(element => {
            if (staticData["b_unit"] == element.businessunit_id) {
              this.business_name = element.businessunit_name;
            }
          })
          this.advice_no = staticData["advice_no"];
          this.vehicle_no = staticData["vehicle_no"];
          this.currentdate = staticData["advice_date"];
          this.purchaseitemList = itemData;
        });

      }


    })
  }


}
