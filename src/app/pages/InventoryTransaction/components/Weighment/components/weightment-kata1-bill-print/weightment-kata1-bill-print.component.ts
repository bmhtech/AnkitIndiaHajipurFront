import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-weightment-kata1-bill-print',
  templateUrl: './weightment-kata1-bill-print.component.html',
  styleUrls: ['./weightment-kata1-bill-print.component.scss']
})
export class WeightmentKata1BillPrintComponent implements OnInit {
  public userForm1: FormGroup;
  ID: any;
  weighment_id: any;
  companyname: any;
  company_name: any;
  cin_no: any;
  netweight: any;
  grossweight: any;
  grossdate: any;
  grosstime: any;
  weighmentno: any;
  tarebags: any;
  adviceno: any;
  trucknumber: any;
  ref_no: any;
  ref_date: any;
  staticdate: any;
  packingbags: any;
  itemqty: any;
  itemname: any;
  Businessunit: any;
  work_address: any;
  pin_no: any;
  state_name: any;
  city_name: any;
  suppliername: any;
  partydistrict: any;
  partyaddress: any;
  partystate: any;
  partycity: any;
  partypincode: any;
  partyaccountname: any;
  partyifsc: any;
  fyear: any;
  weighmentfor: any;
  rawmaterial: any;
  businessunit11: any = [];
  invoicetype: any;
  tareweight: any;
  taredate: any;
  taretime: any;
  purchase1st: boolean = false;
  sale1st: boolean = false;

  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<WeightmentKata1BillPrintComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    
    this.ID = data["alldata"];
    this.weighment_id = data["weighment_id"];
    this.companyname = data["company_name"];
    }

  ngOnInit() {
    this.sale1st=false;
    this.purchase1st=false;
    forkJoin(
      this.DropDownListService.unloadWeightmentRetrive(this.ID),
      this.DropDownListService.unloadWMDtlsRetriveList(this.weighment_id),
      this.DropDownListService.getCompanyDetails(this.companyname)
    ).subscribe(([data12, wgmntDtls, compdetails]) => {
      console.log("UNLOADDATA:: "+JSON.stringify(data12));
      console.log("WGTDATA:: "+JSON.stringify(wgmntDtls));
      console.log("COMPDATA:: "+JSON.stringify(compdetails));

      this.company_name = compdetails.company_name;
      this.cin_no = compdetails.tin_no
      this.netweight = Number(data12.net_weight).toFixed(3);
      
      this.weighmentno = data12.wgment_no;
      this.tarebags = data12.tarebags;
      this.adviceno = wgmntDtls[0].advice_no;
      this.trucknumber = data12.vehicle_no;
      this.ref_no = data12.ref_doc_no;
      if (data12.ref_doc_date == null) {
        this.ref_date = data12.ref_doc_date;
      }
      else {
        this.ref_date = this.datecalculator(data12.ref_doc_date);
      }

      if (data12["vehicle_ref_name"] == "Unload Advice") {
        this.purchase1st=true;
        this.grossweight = Number(data12.gross_weight).toFixed(3);
        this.grossdate = this.datecalculator(data12.gw_date);
        this.grosstime = data12.gw_time;
        //this.staticdate = this.datecalculator(data12.tw_date);
        this.staticdate = this.datecalculator(data12.gw_date);
        //this.DropDownListService.getUnloadadvanceListNew(wgmntDtls[0].advice)
        this.DropDownListService.getUnloadDetailsFastApiWgt(wgmntDtls[0].advice)
          .subscribe(unloadtable => {
            console.log("ADVICE DTLS : : " + JSON.stringify(unloadtable));
            if (unloadtable["jobwork"] == true || unloadtable["jobwork"] == '1') {
              forkJoin(
                this.DropDownListService.unloadadvicejobworkRetriveList(wgmntDtls[0].advice)
              ).subscribe(([data31]) => {
                //console.log("DATA 1 : : "+JSON.stringify(data31))
                console.log("ADVICE 1 : : " + JSON.stringify(unloadtable))

                let quantity: number = 0, bags: number = 0;
                for (let itemDetails of data31) {
                  quantity += Number(itemDetails["quantity"]);
                  bags += Number(itemDetails["s_qty"]);
                }
                this.packingbags = bags;
                this.itemqty = quantity;
                if (Number(data31.length) == 1) {
                  this.itemname = data31[0].item_name;
                }
                else {
                  let itemnamesubstring: any;
                  for (let itemitemNames of data31) {
                    itemnamesubstring += itemitemNames.item_name + ',';
                  }
                  this.itemname = itemnamesubstring.substring(0, itemnamesubstring.length - 1);
                }

                this.Businessunit = unloadtable.business_unitname;
                this.work_address = unloadtable.supp_ref_doc;
                this.pin_no = unloadtable.advice_type;
                this.state_name = unloadtable.supp_ref_docno;
                this.city_name = unloadtable.ula_date;

                if (unloadtable.supp_name == null) {

                  forkJoin(
                    this.DropDownListService.partynameListById(unloadtable.customer),
                    this.DropDownListService.getCustomerAddress(unloadtable.customer)
                  )
                    .subscribe(([customername, district]) => {
                      this.suppliername = customername["cp_name"];
                      this.partydistrict = district["district"];
                    });

                }
                else {
                  //this.suppliername = unloadtable.supp_name;
                  this.suppliername = unloadtable["bp_code"];
                  this.DropDownListService.getSupplierAddress(unloadtable["busi_partner"]).subscribe(suppdetails => {

                    this.partydistrict = suppdetails["district"];
                  });

                  forkJoin(
                    this.Service.getSuppBPAddr(unloadtable.busi_partner),
                    this.Service.getSuppBPAcc(unloadtable.busi_partner)
                  ).subscribe(([data41, accountsdetails]) => {
                    this.partyaddress = data41.add1 + " " + data41.add2 + " " + data41.add3;
                    this.partystate = data41.state;
                    this.partydistrict = data41.district;
                    this.partycity = data41.city;
                    this.partypincode = data41.pincode;
                    this.partyaccountname = accountsdetails.acc_no;
                    this.partyifsc = accountsdetails.ifsc;
                  });
                }
                this.fyear = unloadtable.fin_year;

                /* forkJoin(
                  this.Service.getSuppBPAddr(unloadtable.busi_partner),
                  this.Service.getSuppBPAcc(unloadtable.busi_partner)
                ).subscribe(([data41, accountsdetails])=>
                  {
                    this.partyaddress=data41.add1+ " " +data41.add2 + " " +data41.add3;
                    this.partystate=data41.state;
                    this.partydistrict=data41.district;
                    this.partycity=data41.city;
                    this.partypincode=data41.pincode;
                    this.partyaccountname=accountsdetails.acc_no;
                    this.partyifsc=accountsdetails.ifsc;
                  }); */
                this.weighmentfor = true;
                this.rawmaterial = unloadtable.item_subtypename;
              });

            }

            else {
              forkJoin(
                this.DropDownListService.getUnloadItemList(wgmntDtls[0].advice)
              ).subscribe(([data31]) => {
                //console.log("DATA : : "+JSON.stringify(data31))
                console.log("ADVICE : : " + JSON.stringify(data31))

                let quantity: number = 0, bags: number = 0;
                for (let itemDetails of data31) {
                  quantity += Number(itemDetails["quantity"]);
                  bags += Number(itemDetails["s_qty"]);
                }
                this.packingbags = bags;
                this.itemqty = quantity;
                if (Number(data31.length) == 1) {
                  this.itemname = data31[0].item_name;
                }
                else {
                  let itemnamesubstring: any;
                  for (let itemitemNames of data31) {
                    itemnamesubstring += itemitemNames.item_name + ',';
                  }
                  this.itemname = itemnamesubstring.substring(0, itemnamesubstring.length - 1);
                }

                this.Businessunit = unloadtable.business_unitname;
                /*this.work_address=unloadtable.supp_ref_doc;
                this.pin_no=unloadtable.advice_type;
                this.state_name=unloadtable.supp_ref_docno;
                this.city_name=unloadtable.ula_date;*/

                // Company Details
                this.DropDownListService.getCBUdetails(unloadtable.business_unitname).subscribe(cbudata => {
                  console.log("UnADVICE Details : : " + JSON.stringify(unloadtable))
                  this.work_address = cbudata.work_address;
                  this.pin_no = cbudata.pin_code;
                  this.state_name = cbudata.state_name;
                  this.city_name = cbudata.city_name;
                });
                // Details close

                if (unloadtable.supp_name == null) {
                  forkJoin(
                    this.DropDownListService.partynameListById(unloadtable.customer),
                    this.DropDownListService.getCustomerAddress(unloadtable.customer)
                  )
                    .subscribe(([customername, district]) => {
                      this.suppliername = customername["cp_name"];
                      this.partydistrict = district["district"];
                    });
                }
                else {
                  //this.suppliername = unloadtable.supp_name;
                  this.suppliername = unloadtable["bp_code"];
                  this.DropDownListService.getSupplierAddress(unloadtable["busi_partner"]).subscribe(suppdetails => {
                    this.partydistrict = suppdetails["district"];
                  });
                }
                this.fyear = unloadtable.fin_year;

                if (data12["wgment_for"] == "Sales Return") {
                  this.weighmentfor = true;
                  this.rawmaterial = unloadtable.item_subtypename;
                }
                else {
                  forkJoin(
                    this.Service.getSuppBPAddr(unloadtable.busi_partner),
                    this.Service.getSuppBPAcc(unloadtable.busi_partner)
                  ).subscribe(([data41, accountsdetails]) => {
                    //console.log("Add Sup : : "+JSON.stringify(data41))
                    this.partyaddress = data41.add1 + " " + data41.add2 + " " + data41.add3;
                    this.partystate = data41.state;
                    this.partydistrict = data41.district;
                    this.partycity = data41.city;
                    this.partypincode = data41.pincode;
                    this.partyaccountname = accountsdetails.acc_no;
                    this.partyifsc = accountsdetails.ifsc;
                  });
                  this.rawmaterial = unloadtable.item_subtypename;
                }

              });
            }
          });

        if (data12["wgment_for"] == "Sales Return")//
        {

          this.weighmentfor = false;
        }
        else {
          this.weighmentfor = true;
        }
      }

      if (data12["vehicle_ref_name"] == "Load Advice") {
        this.sale1st=true;
      this.tareweight = Number(data12.tare_weight).toFixed(3);
      this.taredate = this.datecalculator(data12.tw_date);
      this.taretime = data12.tw_time;
        //this.staticdate = this.datecalculator(data12.gw_date);
        this.staticdate = this.datecalculator(data12.tw_date);
        this.businessunit11 = JSON.parse(localStorage.getItem("businessunit"));

        this.DropDownListService.getLoadingDetails(wgmntDtls[0].advice)
        .subscribe(loadtable => {

          if (loadtable["jobwork"] == true || loadtable["jobwork"] == '1') {
            forkJoin(
              this.DropDownListService.loadadvicejobworkRetriveList(wgmntDtls[0].advice)
            ).subscribe(([data31]) => {
              let quantity: number = 0, bags: number = 0;
              for (let itemDetails of data31) {
                quantity += Number(itemDetails["item_qty"]);
                bags += Number(itemDetails["pack_qty"]);
              }
              this.packingbags = bags;

              this.itemqty = quantity;
              this.itemname = data31[0].job_item_name;
              this.businessunit11.forEach(element => {
                if (element.businessunit_id == loadtable.b_unit) {
                  this.Businessunit = element.businessunit_name;
                  this.DropDownListService.getCBUdetails(element.businessunit_name).subscribe(cbudata => {
                    this.work_address = cbudata.work_address;
                    this.pin_no = cbudata.pin_code;
                    this.state_name = cbudata.state_name;
                    this.city_name = cbudata.city_name;
                  });
                  this.DropDownListService.partynameListById(loadtable["customer"]).subscribe((printData) => {
                    this.suppliername = printData["print_to_name"];
                  });
                }
              });

              this.fyear = loadtable.fin_year;

              forkJoin(
                this.DropDownListService.getCustomerAddress(loadtable.bus_partner),
                this.Service.custAccountRetriveList(loadtable.bus_partner),
                this.DropDownListService.getSalesOrderDetails(loadtable["referance_id"])
              ).subscribe(([data41, accountsdetails, saleorderdteials]) => {
                this.partyaddress = data41["add1"] + " " + data41["add2"] + " " + data41["add3"];
                this.partystate = data41["state"];
                this.partydistrict = data41["district"];
                this.partycity = data41["city"];
                this.partypincode = data41["pincode"];
                this.partyaccountname = accountsdetails.acc_no;
                this.partyifsc = accountsdetails.ifsc;

                if (saleorderdteials["inv_type"] == 'INV00003') {
                  this.invoicetype = "JOB WORK";
                }
                else {
                  this.invoicetype = "FINISHED";
                }
              });
            });

          }
          else {
            forkJoin(
              this.Service.loadingItemRetriveList(wgmntDtls[0].advice)
            ).subscribe(([data31]) => {
              let quantity: number = 0, bags: number = 0;
              for (let itemDetails of data31) {
                quantity += Number(itemDetails["quantity"]);
                bags += Number(itemDetails["s_quantity"]);
              }
              this.packingbags = bags;

              this.itemqty = quantity;
              this.itemname = data31[0].item_name;
              this.businessunit11.forEach(element => {
                if (element.businessunit_id == loadtable.b_unit) {
                  this.Businessunit = element.businessunit_name;
                  this.DropDownListService.getCBUdetails(element.businessunit_name).subscribe(cbudata => {
                    this.work_address = cbudata.work_address;
                    this.pin_no = cbudata.pin_code;
                    this.state_name = cbudata.state_name;
                    this.city_name = cbudata.city_name;
                  });
                  this.DropDownListService.partynameListById(loadtable["customer"]).subscribe((printData) => {
                    this.suppliername = printData["print_to_name"];
                  });
                }
              });

              this.fyear = loadtable.fin_year;

              forkJoin(
                this.DropDownListService.getCustomerAddress(loadtable.bus_partner),
                this.Service.custAccountRetriveList(loadtable.bus_partner),
                this.DropDownListService.getSalesOrderDetails(loadtable["referance_id"])
              ).subscribe(([data41, accountsdetails, saleorderdteials]) => {
                this.partyaddress = data41["add1"] + " " + data41["add2"] + " " + data41["add3"];
                this.partystate = data41["state"];
                this.partydistrict = data41["district"];
                this.partycity = data41["city"];
                this.partypincode = data41["pincode"];
                this.partyaccountname = accountsdetails.acc_no;
                this.partyifsc = accountsdetails.ifsc;

                if (saleorderdteials["inv_type"] == 'INV00004') {
                  this.invoicetype = "PACKING MATERIAL SALE";
                }
                else {
                  this.invoicetype = "FINISHED";
                }
              });
            });
          }
        })
        this.weighmentfor = false;
      }
    });
  }

  datecalculator(date) 
  {
    let date1 = date.split("-");
    return date = date1[2] + "/" + date1[1] + "/" + date1[0];
  }

}
