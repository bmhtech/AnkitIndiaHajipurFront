import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesDynamicReport } from '../../../../../../Models/SalesTransaction/SalesDynamicReport';
import { ExcelService } from '../../../../../../service/excel.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sales-dynamic-report-view',
  templateUrl: './sales-dynamic-report-view.component.html',
  styleUrls: ['./sales-dynamic-report-view.component.scss']
})
export class SalesDynamicReportViewComponent implements OnInit {
  model: SalesDynamicReport = new SalesDynamicReport();
  public userForm: FormGroup;
  public userForm1: FormGroup;
  public userForm2: FormGroup;
  public userForm3: FormGroup;
  public userForm4: FormGroup;
  public userForm6: FormGroup;
  public userForm7: FormGroup;
  public userForm8: FormGroup;
  public userForm9: FormGroup;
  public userForm10: FormGroup;
  public userForm11: FormGroup;
  public userForm12: FormGroup;
  public userForm13: FormGroup;
  public userForm14: FormGroup;
  public userForm151: FormGroup;
  public userForm152: FormGroup;
  public userForm15: FormGroup;


  status = false;
  reportnamelists: any = [];
  columnslist: any = [];
  datalist: any[];
  purchaselist: any[];
  supplierNames: any = [];
  purchasebalancelist: any = [];
  unloadadvicelist: any = [];
  loadingadvicelist: any = [];
  GrnList: any = [];
  deliverychallanlist: any = [];
  pendingSoudaList: any = [];
  purchaseBillList: any = [];
  pur_order_list: any = [];
  jobwork_sales_list: any = [];
  creditnote_jobwork_list: any = [];
  invoiceType: any = [];
  salesOrderList: any = [];
  insurancetransit: any = [];
  supplierList: any = [];
  customerList: any = [];
  freight_list: any = [];
  JWAllocation_list: any = [];
  itemtypes: any = [];

  pertruck: boolean = true;

  totaltruck: number = 0;
  totalpending: number = 0;
  totalqty: number = 0;
  advwt: number = 0;
  pendingwt: number = 0;
  totalpackqty: number = 0;
  totalitemqty: number = 0;

  constructor(public fb: FormBuilder, private DropDownListService: DropdownServiceService, private excelService: ExcelService) {
    this.userForm = fb.group
      ({
        reportname: [''],
        fromdate: [''],
        todate: ['']
      });

    this.userForm1 = fb.group(
      {
        purfromdate: [''],
        purtodate: [''],
        ser_item_subtype: [''],
        supplier_name: ['']
      });

    this.userForm2 = fb.group(
      {
        purbillfromdate: [''],
        purbilltodate: [''],
        supplier_name: [''],
        ser_item_subtype: ['']
      });

    this.userForm3 = fb.group(
      {
        unadvicefromdate: [''],
        unadvicetodate: [''],
        supplier_name: ['']
      });

    this.userForm4 = fb.group(
      {
        loadingfromdate: [''],
        loadingtodate: ['']
      });

    this.userForm6 = fb.group(
      {
        grnfromdate: [''],
        grntodate: ['']
      });

    this.userForm7 = fb.group(
      {
        challanfromdate: [''],
        challantodate: ['']
      });

    this.userForm8 = fb.group(
      {
        pendingfromdate: [''],
        pendingtodate: [''],
        pendingcatagory: ['']
      });

    this.userForm9 = fb.group(
      {
        billfromdate: [''],
        billtodate: ['']
      });

    this.userForm10 = fb.group(
      {
        orderfromdate: [''],
        ordertodate: ['']
      });

    this.userForm11 = fb.group(
      {
        jobworkfromdate: [''],
        jobworktodate: ['']
      });

    this.userForm12 = fb.group(
      {
        creditnotefromdate: [''],
        creditnotetodate: [''],
        creditnote_invoice_type: ['']
      });

    this.userForm13 = fb.group(
      {
        salesfromdate: [''],
        salestodate: [''],
      });

    this.userForm14 = fb.group(
      {
        salesinvfromdate: [''],
        salesinvtodate: [''],
      });

    this.userForm151 = fb.group(
      {
        dchallanfromdate: [''],
        dchallantodate: [''],
        dchallan_invoice_type: ['']
      });

    this.userForm152 = fb.group(
      {
        allocationfromdate: [''],
        allocationtodate: ['']
      });

    this.userForm15 = fb.group({
      mastertype: [''],
    });

  }
  get reportname() { return this.userForm.get("reportname") as FormControl }
  get fromdate() { return this.userForm.get("fromdate") as FormControl }
  get todate() { return this.userForm.get("todate") as FormControl }

  get purfromdate() { return this.userForm1.get("purfromdate") as FormControl };
  get purtodate() { return this.userForm1.get("purtodate") as FormControl };
  get ser_item_subtype() { return this.userForm1.get("ser_item_subtype") as FormControl };
  get supplier_name1() { return this.userForm1.get("supplier_name") as FormControl };

  get purbillfromdate() { return this.userForm2.get("purbillfromdate") as FormControl }
  get purbilltodate() { return this.userForm2.get("purbilltodate") as FormControl };
  get supplier_name() { return this.userForm2.get("supplier_name") as FormControl };
  get ser_item_subtype1() { return this.userForm2.get("ser_item_subtype") as FormControl };

  get unadvicefromdate() { return this.userForm3.get("unadvicefromdate") as FormControl }
  get unadvicetodate() { return this.userForm3.get("unadvicetodate") as FormControl };
  get suppliername() { return this.userForm3.get("suppliername") as FormControl };

  get loadingfromdate() { return this.userForm4.get("loadingfromdate") as FormControl };
  get loadingtodate() { return this.userForm4.get("loadingtodate") as FormControl };

  get grnfromdate() { return this.userForm6.get("grnfromdate") as FormControl };
  get grntodate() { return this.userForm6.get("grntodate") as FormControl };


  get challanfromdate() { return this.userForm7.get("challanfromdate") as FormControl };
  get challantodate() { return this.userForm7.get("challantodate") as FormControl };

  get pendingfromdate() { return this.userForm8.get("pendingfromdate") as FormControl };
  get pendingtodate() { return this.userForm8.get("pendingtodate") as FormControl };
  get pendingcatagory() { return this.userForm8.get("pendingcatagory") as FormControl };

  get billfromdate() { return this.userForm9.get("billfromdate") as FormControl };
  get billtodate() { return this.userForm9.get("billtodate") as FormControl };

  get orderfromdate() { return this.userForm10.get("orderfromdate") as FormControl };
  get ordertodate() { return this.userForm10.get("ordertodate") as FormControl };

  get jobworkfromdate() { return this.userForm11.get("jobworkfromdate") as FormControl };
  get jobworktodate() { return this.userForm11.get("jobworktodate") as FormControl };

  get creditnotefromdate() { return this.userForm12.get("creditnotefromdate") as FormControl };
  get creditnotetodate() { return this.userForm12.get("creditnotetodate") as FormControl };
  get creditnote_invoice_type() { return this.userForm12.get("creditnote_invoice_type") as FormControl };

  get salesfromdate() { return this.userForm13.get("salesfromdate") as FormControl };
  get salestodate() { return this.userForm13.get("salestodate") as FormControl };

  get salesinvfromdate() { return this.userForm14.get("salesinvfromdate") as FormControl };
  get salesinvtodate() { return this.userForm14.get("salesinvtodate") as FormControl };

  get dchallanfromdate() { return this.userForm151.get("dchallanfromdate") as FormControl };
  get dchallantodate() { return this.userForm151.get("dchallantodate") as FormControl };
  get dchallan_invoice_type() { return this.userForm151.get("dchallan_invoice_type") as FormControl };

  get allocationfromdate() { return this.userForm151.get("allocationfromdate") as FormControl };
  get allocationtodate() { return this.userForm151.get("allocationtodate") as FormControl };

  get mastertype() { return this.userForm15.get("mastertype") as FormControl };


  ngOnInit() {

    this.status = true;
    forkJoin(
      this.DropDownListService.getSalesRegDynamicList(),
      this.DropDownListService.supplierNamesNewList(localStorage.getItem("company_name")),
      this.DropDownListService.getInvSalesTypes(),
      this.DropDownListService.itemTypeListFastAPI(localStorage.getItem("company_name")),
    ).subscribe(([BuData, supplierData, invoiceData, itemTypeData]) => {
      console.log(BuData);
      this.reportnamelists = BuData;
      this.supplierNames = supplierData;
      this.invoiceType = invoiceData;
      this.itemtypes = itemTypeData;
      this.status = true;
    });
  }

  send() {
    let Reportname = this.userForm.get("reportname").value;
    this.status = false;
    this.DropDownListService.getSalesDynamicReportCol(Reportname)
      .subscribe(
        (data) => {
          {
            this.columnslist = data
            this.promise(data)


          }
          this.status = true;
        }
      );
  }

  promise(data: string[]) {
    console.log("check:" + data);
    this.status = false;
    let Reportname = this.userForm.get("reportname").value;
    let fromdate = this.userForm.get("fromdate").value;
    let todate = this.userForm.get("todate").value;

    this.DropDownListService.getSalesDynamicProcedure(Reportname, fromdate, todate)
      .subscribe(data => {
        this.anotherPromise(data)

        this.status = true;
      }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); });
  }

  anotherPromise(data: any[]) {
    this.datalist = data;
    this.status = false;
  }



  exportAsXLSX(): void {
    let element = document.getElementById('dynamictable');
    this.excelService.exportAsExcelFile(element, 'myExcelFile');
  }

  search() {
    let fromdate = this.userForm1.get("purfromdate").value;
    let todate = this.userForm1.get("purtodate").value;
    let finyear = localStorage.getItem("financial_year");
    let po_type = this.userForm1.get("ser_item_subtype").value;
    let supplier_name = this.userForm1.get("supplier_name").value;
    this.status = false;
    if (po_type == null || po_type == '' || po_type == 0) {
      po_type = "All";
    }
    if (supplier_name == null || supplier_name == '' || supplier_name == 0) {
      supplier_name = "NONAME";
    }
    this.DropDownListService.getPurBillNewReport(fromdate, todate, finyear, po_type, supplier_name).subscribe(purchasedata => {
      this.purchaselist = purchasedata;
      this.status = true;
    });
  }

  exportAsXLSX1(): void {
    let element = document.getElementById('dynamictable3');
    this.excelService.exportAsExcelFile(element, 'Purchase Bill Report From ' + this.userForm1.get("purfromdate").value + 'to' + this.userForm1.get("purtodate").value);
  }

  searchbal() {
    let fromdate = this.userForm2.get("purbillfromdate").value;
    let todate = this.userForm2.get("purbilltodate").value;
    let supplier_name = this.userForm2.get("supplier_name").value;
    let po_type = this.userForm2.get("ser_item_subtype").value;
    let finyear = localStorage.getItem("financial_year");
    this.status = false;
    if (supplier_name == null || supplier_name == '') {
      supplier_name = "NONAME";
    }
    if (po_type == null || po_type == '' || po_type == 0) {
      po_type = "All";
    }
    this.DropDownListService.getPurBillbalanceNewReport(fromdate, todate, supplier_name, finyear, po_type).subscribe(purchasedata => {
      this.purchasebalancelist = purchasedata;
      this.status = true;
    });
  }

  exportAsXLSX2(): void {
    let element = document.getElementById('dynamictable4');
    this.excelService.exportAsExcelFile(element, 'Purchase Bill Report From ' + this.userForm2.get("purbillfromdate").value + 'to' + this.userForm2.get("purbilltodate").value);
  }
  supplier: any;
  unadviceSearch() {
    let unadvicefromdate = this.userForm3.get("unadvicefromdate").value;
    let unadvicetodate = this.userForm3.get("unadvicetodate").value;
    this.supplier = this.userForm3.get("supplier_name").value;
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    if (this.supplier == null || this.supplier == '') {
      this.supplier = "NONAME";
    }
    this.DropDownListService.getUnloadAdviceReport(unadvicefromdate, unadvicetodate, this.supplier, finyear).subscribe(unloadadvdata => {
      console.log("unloadadvdata:" + JSON.stringify(unloadadvdata))
      this.unloadadvicelist = unloadadvdata;
      this.status = true;
    });
  }

  exportAsXLSX3(): void {
    let element = document.getElementById('dynamictable5');
    this.excelService.exportAsExcelFile(element, 'Unload Advice Report From ' + this.userForm3.get("unadvicefromdate").value + 'to' + this.userForm3.get("unadvicetodate").value);
  }

  searchadvice() {
    let fromdate = this.userForm4.get("loadingfromdate").value;
    let todate = this.userForm4.get("loadingtodate").value;
    let finyear = localStorage.getItem("financial_year");
    this.status = false;

    this.DropDownListService.getLoadingAdviceReport(fromdate, todate, finyear).subscribe(advicedata => {
      console.log(" hallu " + JSON.stringify(advicedata))
      this.loadingadvicelist = advicedata;
      this.status = true;
    });
  }

  exportAsXLSX4(): void {
    let element = document.getElementById('dynamictable2');
    this.excelService.exportAsExcelFile(element, 'Loading Advice Report From ' + this.userForm4.get("loadingfromdate").value + 'to' + this.userForm4.get("loadingtodate").value);
  }


  searchgrn() {
    let fromdate = this.userForm6.get("grnfromdate").value;
    let todate = this.userForm6.get("grntodate").value;

    this.status = false;

    this.DropDownListService.getgrnpurbillReport(fromdate, todate).subscribe(grndata => {
      console.log(" hallu " + JSON.stringify(grndata))
      this.GrnList = grndata;
      this.status = true;
    });
  }

  exportAsXLSX6(): void {
    let element = document.getElementById('dynamictable6');
    this.excelService.exportAsExcelFile(element, 'Grn Pur Bill Report From ' + this.userForm6.get("grnfromdate").value + 'to' + this.userForm6.get("grntodate").value);
  }
  searchsalesinvoice() {

  }


  searchchallan() {
    let fromdate = this.userForm7.get("challanfromdate").value;
    let todate = this.userForm7.get("challantodate").value;
    this.status = false;

    this.DropDownListService.getchallanReport(fromdate, todate).subscribe(challandata => {
      //console.log(" hallu "+ JSON.stringify(challandata))
      this.deliverychallanlist = challandata;
      this.status = true;
    });
  }

  exportAsXLSX7(): void {
    let element = document.getElementById('dynamictable7');
    this.excelService.exportAsExcelFile(element, 'Challan Tag with Invoice Report From ' + this.userForm7.get("challanfromdate").value + 'to' + this.userForm7.get("challantodate").value);
  }

  onChangeCategory(event) {
    if (this.userForm8.get("pendingcatagory").value == "truck") {
      this.pertruck = true;
    }
    else {
      this.pertruck = false;
    }
  }

  searchpending() {
    let fromdate = this.userForm8.get("pendingfromdate").value;
    let todate = this.userForm8.get("pendingtodate").value;
    let catagory = this.userForm8.get("pendingcatagory").value;
    this.status = false;

    this.totaltruck = 0;
    this.totalpending = 0;
    this.totalqty = 0;
    this.advwt = 0;
    this.pendingwt = 0;

    this.DropDownListService.getPendingSoudaReport(fromdate, todate, catagory).subscribe(pendingdata => {
      //console.log("Pending Check ::  "+ JSON.stringify(pendingdata))
      this.pendingSoudaList = pendingdata;
      if (this.userForm8.get("pendingcatagory").value == "truck") {
        for (let data of pendingdata) {
          this.totaltruck += Number(data["truck"])
          //console.log("CHECK  "+Number(data["item_qty"]))
          this.totalpending += Number(data["pending"])
        }
      }
      else {
        for (let data of pendingdata) {
          this.totalqty += Number(data["total_qty"])
          this.advwt += Number(data["adv_mat_wt"])
          this.pendingwt += Number(data["pending"])
        }
      }
      this.status = true;
    });
  }

  exportAsXLSX8(): void {
    let element = document.getElementById('dynamictable8');
    this.excelService.exportAsExcelFile(element, 'Pending Souda From ' + this.userForm8.get("pendingfromdate").value + ' to ' + this.userForm8.get("pendingtodate").value);
  }

  searchPurBill() {
    let fromdate = this.userForm9.get("billfromdate").value;
    let todate = this.userForm9.get("billtodate").value;

    this.status = false;

    this.DropDownListService.getPurBillReport(fromdate, todate).subscribe(billdata => {
      //console.log(" Shree ::  "+ JSON.stringify(billdata))
      this.purchaseBillList = billdata;
      this.status = true;
    });

  }

  exportAsXLSX9(): void {
    let element = document.getElementById('dynamictable9');
    this.excelService.exportAsExcelFile(element, 'Purchase Bill From ' + this.userForm9.get("billfromdate").value + ' to ' + this.userForm9.get("billtodate").value);
  }

  searchPurOrder() {
    let fromdate = this.userForm10.get("orderfromdate").value;
    let todate = this.userForm10.get("ordertodate").value;

    this.status = false;

    this.DropDownListService.getPurOrderReport(fromdate, todate).subscribe(orderdata => {
      //console.log(" Shree ::  "+ JSON.stringify(orderdata))
      this.pur_order_list = orderdata;
      this.status = true;
    });

  }

  exportAsXLSX10(): void {
    let element = document.getElementById('dynamictable10');
    this.excelService.exportAsExcelFile(element, 'Purchase Order From ' + this.userForm10.get("orderfromdate").value + ' to ' + this.userForm10.get("ordertodate").value);
  }

  searchJobWorkSales() {
    let fromdate = this.userForm11.get("jobworkfromdate").value;
    let todate = this.userForm11.get("jobworktodate").value;

    this.totalpackqty = 0;
    this.totalitemqty = 0;

    this.status = false;

    this.DropDownListService.getJobWorkSalesReport(fromdate, todate).subscribe(jobWorkdata => {
      console.log(" Job H YA : :  "+ JSON.stringify(jobWorkdata))
      this.jobwork_sales_list = jobWorkdata;
      for (let data of jobWorkdata) {
        this.totalpackqty += Number(data["pack_qty"])
        //console.log("CHECK  "+Number(data["item_qty"]))
        this.totalitemqty += Number(data["item_qty"])
      }
      this.status = true;
    });

  }

  exportAsXLSX11(): void {
    let element = document.getElementById('dynamictable11');
    this.excelService.exportAsExcelFile(element, 'JobWork Sales From ' + this.userForm11.get("jobworkfromdate").value + ' to ' + this.userForm11.get("jobworktodate").value);
  }

  totalcnpackqty: number = 0;
  totalcnitemqty: number = 0;
  totalcnmatwt: number = 0;

  searchSalesCreditNote() {
    let fromdate = this.userForm12.get("creditnotefromdate").value;
    let todate = this.userForm12.get("creditnotetodate").value;
    let invoicetype = this.userForm12.get("creditnote_invoice_type").value;
    console.log("invoicetype:" + invoicetype)
    this.totalcnpackqty = 0;
    this.totalcnitemqty = 0;
    this.totalcnmatwt = 0;

    this.status = false;

    this.DropDownListService.getSalesCreditNoteReport(fromdate, todate, invoicetype).subscribe(salesdata => {
      //console.log(" Job H YA : :  "+ JSON.stringify(salesdata))
      this.creditnote_jobwork_list = salesdata;
      for (let data of salesdata) {
        this.totalcnpackqty += Number(data["squantity"])
        //console.log("CHECK  "+Number(data["item_qty"]))
        this.totalcnitemqty += Number(data["quantity"])
        this.totalcnmatwt += Number(data["mat_wt"])

      }
      this.status = true;
    });
  }

  exportAsXLSX12(): void {
    let element = document.getElementById('dynamictable12');
    this.excelService.exportAsExcelFile(element, 'Sales Credit Note From ' + this.userForm12.get("creditnotefromdate").value + ' to ' + this.userForm12.get("creditnotetodate").value);
  }

  searchsalesorder() {
    this.status = false;

    let fromdate = this.userForm13.get("salesfromdate").value;
    let todate = this.userForm13.get("salestodate").value;
    this.DropDownListService.getSalesOrderReport(fromdate, todate).subscribe(SOdata => {
      //console.log("Sales Check ::  "+ JSON.stringify(SOdata))
      this.salesOrderList = SOdata;
      this.status = true;
    });
  }

  exportAsXLSX13(): void {
    let element = document.getElementById('dynamictable13');
    this.excelService.exportAsExcelFile(element, 'Sales Order Report From ' + this.userForm13.get("salesfromdate").value + ' To ' + this.userForm13.get("salestodate").value);
  }

  searchtransitreport() {
    this.status = false;

    let fromdate = this.userForm14.get("salesinvfromdate").value;
    let todate = this.userForm14.get("salesinvtodate").value;

    this.DropDownListService.getSalesInvoicetransitReport(fromdate, todate).subscribe(transit => {
      //console.log("Sales Check ::  "+ JSON.stringify(SOdata))
      this.insurancetransit = transit;
      this.status = true;
    });
  }

  exportAsXLSX14() {
    let element = document.getElementById('dynamictable14');
    this.excelService.exportAsExcelFile(element, 'Insurance From ' + this.userForm14.get("salesinvfromdate").value + ' To ' + this.userForm14.get("salesinvtodate").value);
  }

  Supplier: boolean = true;

  onChangeMasterType(masterType) {
    if (masterType == "Supplier") {
      this.Supplier = true;
      this.supplierList = [];
      this.customerList = [];
    }
    else {
      this.Supplier = false;
      this.supplierList = [];
      this.customerList = [];
    }
  }

  searchSalesFreight() {
    let fromdate = this.userForm151.get("dchallanfromdate").value;
    let todate = this.userForm151.get("dchallantodate").value;
    let invoicetype = this.userForm151.get("dchallan_invoice_type").value;

    console.log("invoicetype: " + invoicetype)

    this.status = false;

    this.DropDownListService.getSalesFreightReport(fromdate, todate, invoicetype).subscribe(freightdata => {
      console.log("Freight Data : :  " + JSON.stringify(freightdata))
      this.freight_list = freightdata;
      this.status = true;
    });
  }

  exportAsXLSX151(): void {
    let element = document.getElementById('dynamictable151');
    this.excelService.exportAsExcelFile(element, 'Sales Freight From ' + this.userForm151.get("dchallanfromdate").value + ' To ' + this.userForm151.get("dchallantodate").value);
  }

  searchJobWorkAllocation() {
    let fromdate = this.userForm152.get("allocationfromdate").value;
    let todate = this.userForm152.get("allocationtodate").value;

    this.status = false;

    if (fromdate == null || fromdate == '' || fromdate == 0) {
      alert("Select From Date ....");
      this.status = true;
    }
    else if (todate == null || todate == '' || todate == 0) {
      alert("Select To Date ....");
      this.status = true;
    }
    else {
      this.DropDownListService.getJobWorkAllocationReport(fromdate, todate).subscribe(jwAllocationdata => {
        console.log("Allocation Data : :  " + JSON.stringify(jwAllocationdata))
        this.JWAllocation_list = jwAllocationdata;
        this.status = true;
      });
    }

  }

  exportAsXLSX152(): void {
    let element = document.getElementById('dynamictable152');
    this.excelService.exportAsExcelFile(element, 'JobWork Allocation Report From ' + this.userForm152.get("allocationfromdate").value + ' To ' + this.userForm152.get("allocationtodate").value);
  }

  getSupplierMasterReport() {

    this.status = false;

    let mastertype = this.userForm15.get("mastertype").value;
    if (mastertype == null || mastertype == 0 || mastertype == "") {
      alert("Please Select Master Type...")
      this.status = true;
    }
    else {
      if (mastertype == "Supplier") {
        this.DropDownListService.getSupplierMasterReport().subscribe(supplier => {
          console.log("Supplier ::  " + JSON.stringify(supplier))
          this.supplierList = supplier;
          this.status = true;
        });
      }
      else {
        this.DropDownListService.getCustomerMasterReport().subscribe(customer => {
          console.log("Customer ::  " + JSON.stringify(customer))
          this.customerList = customer;
          this.status = true;
        });
      }
    }
  }

  exportAsXLSX15() {
    let element = document.getElementById('dynamictable15');
    this.excelService.exportAsExcelFile(element, this.userForm15.get("mastertype").value + ' Master Report as on ' + formatDate(new Date(localStorage.getItem("CurrentDate")), 'dd-MM-yyyy', 'en'));
  }

}
