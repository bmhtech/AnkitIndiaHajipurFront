import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SalesReturnNote } from '../../../../../../Models/SalesTransaction/sales-return-note';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SalesQuoTaxModalComponent } from '../sales-quo-tax-modal/sales-quo-tax-modal.component';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { SalesQcPopupComponent } from '../sales-qc-popup/sales-qc-popup.component';
import { forkJoin, timer } from 'rxjs';
import { Master } from '../../../../../../service/master.service';
import { formatDate } from '@angular/common';
import { ReturnApprovalNotePopUpComponent } from '../../components/return-approval-note-pop-up/return-approval-note-pop-up.component';
import { SalereturnjobworkComponent } from '../salereturnjobwork/salereturnjobwork.component';

@Component({
  selector: 'app-sales-return-note',
  templateUrl: './sales-return-note.component.html',
  styleUrls: ['./sales-return-note.component.scss']
})

export class SalesReturnNoteComponent implements OnInit {
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  isHidden: any;
  submitted = false;
  public userForm: FormGroup;
  model: SalesReturnNote = new SalesReturnNote();
  item_codes: any = [];
  brokerNames: any = [];
  partyList: any = [];
  status: any;
  packingItem: any = [];
  selectedPartyName: any = [];
  selectedContName: any = [];
  selectedItemName: any = [];
  selectedPackingItem: any = [];
  customUOMs: any = [];
  PartyAllList: any = [];
  Id: any;
  bussiness_unit_list: any = [];
  reasonIdList: any = [];
  vehicleNoList: any = [];
  contNameList: any = [];
  employeeNames: any = [];
  company_name: any;
  trans_codes: any = [];
  item_sl_no = 1;
  broker_sl_no = 1;
  party_sl_no = 1;
  listSalesReturnNote: any = [];
  partyNameList: any = [];
  currentDate: any;
  grandTotal: any;
  capacity: any = [];
  empty_bag_wt: any = [];
  customerDelvAddList: any = [];
  invoiceType: any = [];
  financialYear: any;
  partyId: any;
  partyCode: any;
  b_unit: any;
  seqId: any;
  _invoicetype: any;
  action: any;
  modeOfTransport: any = [];
  salesreturnnotesave: boolean = true;
  salesreturnnoteupdate: boolean = true;
  salesreturnnoteview: boolean = true;
  salesreturnnotedelete: boolean = true;
  popupstatus: boolean = false;
  company_state:any;

  public userForm1: FormGroup;
  partySearchList: any = [];

  jobitemlist: any = [];
  jobpackinglist: any = [];
  selectedJobItem: any = [];
  selectedJobPacking: any = [];
  Jobworkshow: boolean = false;
  jobwork_sl_no = 1;

  tax_list: any = [];
  state: any;
  statestatus: number = 0;
  cgstvalue: any;
  sgstvalue: any;
  igstvalue: any;

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private Service: Master, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group(
      {
        id: [''],
        salesreturnnoteid: [''],
        inv_type: [''],
        salesreturnnoteno: [''],
        party: [''],
        salesreturnnotedate: [''],
        businessunit: [''],
        price_term: [''],
        cust_ref_doc_no: [''],
        date2: [''],
        salesreturnnoterefno: [''],
        remark: [''],
        confirmedby: [''],
        approval: [''],
        reason: [''],
        grandtotal: [''],
        grand_total: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        referance_id: [''],

        sales_return_note_item_dtls: this.fb.array([this.fb.group({
          slno: this.item_sl_no,
          itemcode: '',
          packing: '',
          hsn_code: '',
          quantity: '',
          uom: '',
          squantity: '',
          suom: '',
          matwt: '',
          price: '',
          pricebasedon: '',
          amount: '',
          discounttype: '',
          discountrate: '',
          discountamt: '',
          taxcode: '',
          taxrate: '',
          cgstamt: '',
          sgstamt: '',
          igstamt: '',
          taxamt: '',
          totalamt: '',
          accnorms: ''
        })]),

        sales_return_note_broker_dtls: this.fb.array([this.fb.group({
          slno: this.broker_sl_no,
          brokercode: '',
          basis: '',
          rate: ''
        })]),

        sales_return_note_party_dtls: this.fb.array([this.fb.group({
          slno: this.party_sl_no,
          pcode: '',
          cpname: '',
          cpcontact: ''
        })]),

        sales_return_note_docs: this.fb.array([this.fb.group({
          docname: ''
        })]),

        sales_return_note_shipment_dtls: this.fb.group({
          shipaddr: '',
          shipdetails: '',
          payaddr: '',
          paydetails: ''
        }),

        sales_return_note_trans_info: this.fb.group({
          transborneby: '',
          modeoftrans: '',
          vehicleno: '',
          freightamt: '',
          advpaid: '',
          chargecode: '',
          transcode: ''
        }),

        sales_return_note_weight_dtl: this.fb.group({
          ownuom: '',
          owngross: '',
          owntare: '',
          ownnet: '',
          ownpermitno: '',
          owndate: '',
          ownslipno: '',
          partyuom: '',
          partygross: '',
          partytare: '',
          partynet: '',
          partydate: '',
          partyslipno: ''
        }),

        sales_return_note_item_dtls_for_jobwork: this.fb.array([this.fb.group({
          sl_no: this.jobwork_sl_no,
          job_item: '',
          job_item_name: '',
          job_packing: '',
          job_packing_name: '',
          job_hsn: '',
          pack_qty: '',
          pack_uom: '',
          price_based_on: '',
          item_qty: '',
          item_uom: '',
          mat_wt: '',
          tolerance: ''
        })]),
      });

    this.userForm1 = fb.group(
      {
        fromdate: [''],
        todate: [''],
        party1: [''],
      });

  }

  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get party1() { return this.userForm1.get("party1") as FormControl }

  get id() { return this.userForm.get("id") as FormControl };
  get salesreturnnoteid() { return this.userForm.get("salesreturnnoteid") as FormControl };
  get inv_type() { return this.userForm.get("inv_type") as FormControl };
  get salesreturnnoteno() { return this.userForm.get("salesreturnnoteno") as FormControl };
  get party() { return this.userForm.get("party") as FormControl };
  get salesreturnnotedate() { return this.userForm.get("salesreturnnotedate") as FormControl };
  get businessunit() { return this.userForm.get("businessunit") as FormControl };
  get price_term() { return this.userForm.get("price_term") as FormControl };
  get cust_ref_doc_no() { return this.userForm.get("cust_ref_doc_no") as FormControl };
  get date2() { return this.userForm.get("date2") as FormControl };
  get salesreturnnoterefno() { return this.userForm.get("salesreturnnoterefno") as FormControl };
  get remark() { return this.userForm.get("remark") as FormControl };
  get confirmedby() { return this.userForm.get("confirmedby") as FormControl };
  get approval() { return this.userForm.get("approval") as FormControl };
  get reason() { return this.userForm.get("reason") as FormControl };
  get grandtotal() { return this.userForm.get("grandtotal") as FormControl };
  get sales_return_note_item_dtls() { return this.userForm.get("sales_return_note_item_dtls") as FormArray };
  get sales_return_note_broker_dtls() { return this.userForm.get("sales_return_note_broker_dtls") as FormArray };
  get sales_return_note_party_dtls() { return this.userForm.get("sales_return_note_party_dtls") as FormArray };
  get sales_return_note_shipment_dtls() { return this.userForm.get("sales_return_note_shipment_dtls") as FormGroup };
  get sales_return_note_trans_info() { return this.userForm.get("sales_return_note_trans_info") as FormGroup };
  get sales_return_note_weight_dtl() { return this.userForm.get("sales_return_note_weight_dtl") as FormGroup };
  get sales_return_note_docs() { return this.userForm.get("sales_return_note_docs") as FormArray };
  get sales_return_note_item_dtls_for_jobwork() { return this.userForm.get("sales_return_note_item_dtls_for_jobwork") as FormArray };

  ConfirmedBy = "0";
  Reason = "0";
  ngOnInit() {
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.salesreturnnotesave = false;
    this.salesreturnnoteupdate = false;
    this.salesreturnnoteview = false;
    this.salesreturnnotedelete = false;

    if (accessdata.includes('sales_return_note.save')) {
      this.salesreturnnotesave = true;
    }
    if (accessdata.includes('sales_return_note.update')) {
      this.salesreturnnoteupdate = true;
    }
    if (accessdata.includes('sales_return_note.view')) {
      this.salesreturnnoteview = true;
    }
    if (accessdata.includes('sales_return_note.delete')) {
      this.salesreturnnotedelete = true;
    }
    this.Jobworkshow = false;
    this.status = false;
    this.isHidden = false;
    this.grandTotal = 0;
    for (let k = 0; k < this.sales_return_note_party_dtls.length; k++) {
      this.sales_return_note_party_dtls.at(k).patchValue({ pcode: "0" });
    }
    for (let k = 0; k < this.sales_return_note_broker_dtls.length; k++) {
      this.sales_return_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
    }
    this.ConfirmedBy = "0";
    this.Reason = "0";
    this.sales_return_note_shipment_dtls.patchValue({ payaddr: "0" });
    this.sales_return_note_trans_info.patchValue({ modeoftrans: "0", transcode: "0", vehicleno: "0" });
    this.packingItem = [];
    this.partyId = "0";
    this.partyCode = "0";
    this.b_unit = "0";
    this._invoicetype = "0";
    this.capacity = [];
    this.empty_bag_wt = [];
    this.action = 'update';
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
    this.userForm.patchValue({ id: 0, referance_id: 0, inv_type: "0", businessunit: "0", party: "0" });
    this.company_name = localStorage.getItem("company_name");
    this.financialYear = localStorage.getItem("financial_year");
    this.modeOfTransport = ["By Air", "By Rail", "By Road", "By Ship", "By Train", "By Vehicle", "By Water", "By Other"];
    forkJoin(
      this.DropDownListService.getInvSalesTypesFast(),
      //this.DropDownListService.customerNameCodeList(this.company_name),
      this.DropDownListService.customerNameCodeListnew(this.company_name),
      this.DropDownListService.reasonList(),
      this.Service.getSalesReturnNote(this.company_name, this.currentDate),
      //this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      //this.DropDownListService.itemNamesList(),
      this.DropDownListService.itemNamesNewList(),
      this.DropDownListService.brokerNameList(),
      // this.DropDownListService.transporterNamesList(),
      this.DropDownListService.getTransporterMNCListFast(),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.getWeighmentCustomUOM(),
      // this.DropDownListService.getVehicleThruWeighment(),
      this.DropDownListService.getVehicleThruWeighmentfast(),
      //this.DropDownListService.customerNameCodeList(this.company_name),
      this.DropDownListService.taxList()
    ).subscribe(([invoiceData, customerData, reasonData, SalesReturnData,
      //BUMNCData, itemNameData, brokerData, transData, empData, customData, vehNoData,PartyallData])=>
      BUMNCData, itemNameData, brokerData, transData, empData, customData, vehNoData, tax]) => {
      this.invoiceType = invoiceData;
      this.partyNameList = customerData;
      this.partySearchList = customerData;
      this.reasonIdList = reasonData;
      this.listSalesReturnNote = SalesReturnData;
      this.bussiness_unit_list = BUMNCData;
      this.item_codes = itemNameData;
      this.brokerNames = brokerData;
      this.trans_codes = transData;
      this.employeeNames = empData;
      this.customUOMs = customData;
      this.vehicleNoList = vehNoData;
      //this.PartyAllList = PartyallData;
      this.PartyAllList = customerData;
      this.tax_list = tax;
      this.userForm.patchValue({ party: "0", referance_id: "0" });
      this.sales_return_note_item_dtls.at(0).patchValue({
        itemcode: "0", packing: "0", squantity: 0, quantity: 0, pricebasedon: "0",
        amount: 0, discounttype: "0", discountamt: 0, netamount: 0, taxableamount: 0, taxamount: 0, totalamt: 0
      });
      this.capacity[0] = 1;
      this.empty_bag_wt[0] = 0;
      this.sales_return_note_weight_dtl.patchValue({ ownuom: "0", partyuom: "0" });
      this.status = true;

      if (localStorage.getItem("svalue") == 'true') {
        //alert(localStorage.getItem("sid")+"//"+localStorage.getItem("sno")+"//"+localStorage.getItem("saction"));
        this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
      }
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  getSalesReturnDate(event) {
    this.currentDate = event.target.value;
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  onChangeSalesInvoiceType(event) {
    this._invoicetype = event;
    if (event.length && event != "0") {
      this.status = false;
      this.DropDownListService.getSRSequenceId(this.financialYear + "/" + event).subscribe(data => {
        this.status = true;
        this.seqId = data["sequenceid"];
      });

      if (this.userForm.get("inv_type").value == "INV00003") {
        this.Jobworkshow = true;
        this.addItem();
        this.item_sl_no = 0;
        while (this.sales_return_note_item_dtls.length) { this.sales_return_note_item_dtls.removeAt(0); }
        this.selectedPackingItem = [];
        this.selectedItemName = [];
        this.packingItem = [];
        this.addItem();

      }
      else {
        this.Jobworkshow = false;
        this.addJobworkItem();
        this.jobwork_sl_no = 0;
        while (this.sales_return_note_item_dtls_for_jobwork.length) { this.sales_return_note_item_dtls_for_jobwork.removeAt(0); }

        this.jobpackinglist = [];
        this.selectedJobItem = [];
        this.selectedJobPacking = [];
        this.addJobworkItem();
      }
    }
  }

  onChangeParty(party_id: string) {
    this.partyId = party_id;
    if (party_id.length && party_id != '0') {
      this.status = true;
      // this.DropDownListService.getCustDelvFromList(party_id).subscribe(custDelvData=>
      // {
      //   this.customerDelvAddList = custDelvData;
      //   this.status = true;
      // });
      //console.log("company state:"+this.company_state)
      if (party_id.length && party_id != "0") {
        this.status = false;
        forkJoin(

          this.DropDownListService.getCustDelvFromList(party_id),
          this.Service.custBillAddRetriveList(party_id)
        ).subscribe(([custDelvData, CustAddress]) => {

          this.customerDelvAddList = custDelvData;
          this.sales_return_note_shipment_dtls.patchValue({ payaddr: this.partyId, paydetails: CustAddress["address"] });

          console.log("state:" + CustAddress["state"] + "//" + CustAddress["cp_name"])
          this.state = CustAddress["state"];
          //if (this.state == 'BIHAR') { this.statestatus = 0; }
          if (this.state == this.company_state) { this.statestatus = 0; }
          else {
            this.statestatus = 1;
          }

          this.status = true;
        });
      }

      this.addParty();
      this.party_sl_no = 0;
      while (this.sales_return_note_party_dtls.length)
        this.sales_return_note_party_dtls.removeAt(0);
      this.addParty();
      this.sales_return_note_party_dtls.at(0).patchValue({ pcode: party_id });
      this.onChangePartyName(party_id, 0);
    }
  }

  GetDeliveryBuisnessUnit(businessunit_code: string) {
    //alert(businessunit_code+","+this.sales_Order_Shipment_Dtls.get("pay_addr").value);
    if (businessunit_code != '0') {
      this.status = false;

      this.DropDownListService.getCustDelvFromAdd(this.sales_return_note_shipment_dtls.get("payaddr").value, businessunit_code).subscribe(data => {
        this.sales_return_note_shipment_dtls.patchValue({ shipdetails: data["ship_to"] });
        this.status = true;
      });
    }
  }

  onChangeBusinessName(event) {
    this.b_unit = event;
    if (event.length && event != "0") {
      this.status = false;
      //this.DropDownListService.getCustomerThruBU(event).subscribe(data=>
      forkJoin(
      this.DropDownListService.getCustomerThruBUnewlist(event),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),event)
      ).subscribe(([data,companystate])=> {
        this.partyList = data;
        this.company_state=companystate["state_name"];
        this.status = true;
      });
    }
  }

  onChangePartyName(party_id: string, index) {
    this.contNameList[index] = [];
    this.partyCode = party_id;
    this.sales_return_note_party_dtls.at(index).patchValue({ cpcontact: null });
    if (party_id != "0") {
      this.status = false;
      this.DropDownListService.custAddDtlsRetriveList(party_id, this.company_name).subscribe(contactName => {
        this.status = true;
        this.contNameList[index] = contactName;
      });
    }
  }

  onChangeContactName(index, event) {
    this.sales_return_note_party_dtls.at(index).patchValue({ cp_contact: null });
    if (event.target.value != "0" && this.partyCode != "0") {
      this.status = false;
      this.DropDownListService.custContactByName(this.partyCode, event.target.value, this.company_name).subscribe(data => {
        this.sales_return_note_party_dtls.at(index).patchValue({ cp_contact: data.mobile });
        this.status = true;
      });
    }
  }

  itemCode: any;
  showPopUp2(index) {
    this.itemCode = this.sales_return_note_item_dtls.at(index).get('itemcode').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, item_code: this.itemCode };
    const dialogRef = this.dialog.open(SalesQcPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.sales_return_note_item_dtls.at(index).patchValue({ accnorms: data["qc_code"] });
    });
  }

  _total_amt: any
  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.sales_return_note_item_dtls.push(this.fb.group({
      slno: this.item_sl_no,
      itemcode: '',
      hsn_code: '',
      packing: '',
      quantity: '',
      uom: '',
      squantity: '',
      suom: '',
      matwt: '',
      price: '',
      pricebasedon: '',
      amount: '',
      discounttype: '',
      discountrate: '',
      discountamt: '',
      taxcode: '',
      taxrate: '',
      cgstamt: '',
      sgstamt: '',
      igstamt: '',
      taxamt: '',
      totalamt: '',
      accnorms: '',
    }))

    this.sales_return_note_item_dtls.at(this.item_sl_no - 1).patchValue({
      itemcode: "0", packing: "0", squantity: 0, quantity: 0, pricebasedon: "0",
      amount: 0, discounttype: "0", discountamt: 0, netamount: 0, taxableamount: 0, taxamount: 0, totalamt: 0
    });
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      this._total_amt = this.sales_return_note_item_dtls.at(index).get("totalamt").value as FormControl;
      this.grandTotal = this.grandTotal - this._total_amt;
      this.userForm.patchValue({ grandtotal: (Math.round(this.grandTotal * 100) / 100).toFixed(2) });

      this.sales_return_note_item_dtls.removeAt(index);
      this.packingItem.splice(index, 1);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      this.grandTotal = 0;
      alert("can't delete all rows");
      this.sales_return_note_item_dtls.reset();
      this.sales_return_note_item_dtls.at(0).patchValue({ slno: this.item_sl_no });
      this.userForm.patchValue({ grandtotal: this.grandTotal.toFixed(2) });
      this.sales_return_note_item_dtls.at(this.item_sl_no - 1).patchValue({
        itemcode: "0", packing: "0", squantity: 0, quantity: 0, pricebasedon: "0",
        amount: 0, discounttype: "0", discountamt: 0, netamount: 0, taxableamount: 0, taxamount: 0, totalamt: 0
      });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.sales_return_note_item_dtls.at(i - 1).patchValue({ slno: i });

  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.sales_return_note_broker_dtls.push(this.fb.group({
      slno: this.broker_sl_no,
      brokercode: '',
      basis: '',
      rate: ''
    }))
    for (let k = 0; k < this.sales_return_note_broker_dtls.length; k++) {
      this.sales_return_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
    }
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.sales_return_note_broker_dtls.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.sales_return_note_broker_dtls.reset();
      this.sales_return_note_broker_dtls.at(0).patchValue({ slno: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.sales_return_note_broker_dtls.at(i - 1).patchValue({ slno: i });

  }

  addParty() {
    this.party_sl_no = this.party_sl_no + 1;
    this.sales_return_note_party_dtls.push(this.fb.group({
      slno: this.party_sl_no,
      pcode: '',
      cpname: '',
      cpcontact: ''
    }))
    for (let k = 0; k < this.sales_return_note_party_dtls.length; k++) {
      this.sales_return_note_party_dtls.at(k).patchValue({ pcode: "0" });
    }
  }

  deleteParty(index) {
    if (this.party_sl_no > 1) {
      this.sales_return_note_party_dtls.removeAt(index);
      this.party_sl_no = this.party_sl_no - 1;
    }
    else {
      this.party_sl_no = 1;
      alert("can't delete all rows");
      this.sales_return_note_party_dtls.reset();
      this.sales_return_note_party_dtls.at(0).patchValue({ slno: this.party_sl_no });
    }
    for (let i = 1; i <= this.party_sl_no; i++)
      this.sales_return_note_party_dtls.at(i - 1).patchValue({ slno: i });
  }

  addDocument() {
    this.sales_return_note_docs.push(this.fb.group({
      docname: '',
    }))
  }

  deleteDocument(index) {
    if (index) { this.sales_return_note_docs.removeAt(index); }
    else {
      alert("Can not delete all rows");
      this.sales_return_note_docs.reset();
    }
  }

  onChangeBrokerName(index, event) {
    let Party = this.userForm.get("party").value
    if (event != "0") {
      this.status = false;
      this.DropDownListService.getCustomerBrokerDtls(Party, event.target.value).subscribe(data => {
        this.sales_return_note_broker_dtls.at(index).patchValue({
          brokername: data.ven_name,
          basis: data.basis, rate: data.rate
        });
        this.status = true;
      });
    }
  }

  showList(s: string) {
    if (this.salesreturnnotesave == true && this.salesreturnnoteupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.userForm.patchValue({ id: 0, referance_id: 0, inv_type: "0", salesreturnnotedate: this.currentDate, businessunit: "0", party: "0" });
        this.sales_return_note_weight_dtl.patchValue({ ownuom: "0", partyuom: "0" });
        for (let k = 0; k < this.sales_return_note_party_dtls.length; k++) {
          this.sales_return_note_party_dtls.at(k).patchValue({ pcode: "0" });
        }
        for (let k = 0; k < this.sales_return_note_broker_dtls.length; k++) {
          this.sales_return_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
        }
        this.ConfirmedBy = "0";
        this.Reason = "0";
        this.sales_return_note_shipment_dtls.patchValue({ payaddr: "0" });
        this.sales_return_note_trans_info.patchValue({ modeoftrans: "0", transcode: "0", vehicleno: "0" });
      }
    }
    if (this.salesreturnnotesave == true && this.salesreturnnoteupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.userForm.patchValue({ id: 0, referance_id: 0, inv_type: "0", salesreturnnotedate: this.currentDate, businessunit: "0", party: "0" });
        this.sales_return_note_weight_dtl.patchValue({ ownuom: "0", partyuom: "0" });
        for (let k = 0; k < this.sales_return_note_party_dtls.length; k++) {
          this.sales_return_note_party_dtls.at(k).patchValue({ pcode: "0" });
        }
        for (let k = 0; k < this.sales_return_note_broker_dtls.length; k++) {
          this.sales_return_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
        }
        this.ConfirmedBy = "0";
        this.Reason = "0";
        this.sales_return_note_shipment_dtls.patchValue({ payaddr: "0" });
        this.sales_return_note_trans_info.patchValue({ modeoftrans: "0", transcode: "0", vehicleno: "0" });
      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.salesreturnnotesave = true;
      this.userForm.patchValue({ id: 0, referance_id: 0, inv_type: "0", salesreturnnotedate: this.currentDate, businessunit: "0", party: "0" });
      this.action = 'update';
      for (let k = 0; k < this.sales_return_note_party_dtls.length; k++) {
        this.sales_return_note_party_dtls.at(k).patchValue({ pcode: "0" });
      }
      for (let k = 0; k < this.sales_return_note_broker_dtls.length; k++) {
        this.sales_return_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
      }
      this.ConfirmedBy = "0";
      this.Reason = "0";
      this.sales_return_note_shipment_dtls.patchValue({ payaddr: "0" });
      this.sales_return_note_trans_info.patchValue({ modeoftrans: "0", transcode: "0", vehicleno: "0" });
      this.userForm.reset();
      this.sales_return_note_trans_info.reset();
      this.sales_return_note_shipment_dtls.reset();
      this.sales_return_note_weight_dtl.reset();

      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.item_sl_no = 0;
      while (this.sales_return_note_item_dtls.length)
        this.sales_return_note_item_dtls.removeAt(0);
      this.addItem();

      this.selectedPartyName = [];
      this.selectedContName = [];
      this.party_sl_no = 0;
      while (this.sales_return_note_party_dtls.length)
        this.sales_return_note_party_dtls.removeAt(0);
      this.addParty();

      this.broker_sl_no = 0;
      while (this.sales_return_note_broker_dtls.length)
        this.sales_return_note_broker_dtls.removeAt(0);
      this.addBroker();

      while (this.sales_return_note_docs.length)
        this.sales_return_note_docs.removeAt(0);
      this.addDocument();
    }
  }

  _item_qty: any;
  _packing_qty: any;
  _mrp: any;
  _taxrate: any;
  _taxAmt: any;
  _netAmt: any;
  _discount: any;
  _totalAmt: any;
  _priceBasedOn: any;
  _discountBasadOn: any;
  discountAmt: any;
  amt: any;
  getPackingQty(packingQty, index) {
    this._packing_qty = packingQty.target.value;
    this._item_qty = this.capacity[index] * this._packing_qty;
    this.sales_return_note_item_dtls.at(index).patchValue({ quantity: this._item_qty, matwt: (Math.round((this._item_qty - this.empty_bag_wt[index]) * 1000) / 1000).toFixed(3) });

    this._mrp = this.sales_return_note_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.sales_return_note_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.sales_return_note_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.sales_return_note_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getItemQty(itemQty, index) {
    this._packing_qty = this.sales_return_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = itemQty.target.value;
    this.sales_return_note_item_dtls.at(index).patchValue({ matwt: (Math.round((this._item_qty - this.empty_bag_wt[index]) * 1000) / 1000).toFixed(3) });
    this._mrp = this.sales_return_note_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.sales_return_note_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.sales_return_note_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.sales_return_note_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getPrice(price, index) {
    this._packing_qty = this.sales_return_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_return_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = price.target.value;
    this._priceBasedOn = this.sales_return_note_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.sales_return_note_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.sales_return_note_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangePriceBasedOn(price_based_on, index) {
    this._packing_qty = this.sales_return_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_return_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_return_note_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = price_based_on.target.value;
    this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.sales_return_note_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.sales_return_note_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getDiscount(discount, index) {
    this._packing_qty = this.sales_return_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_return_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_return_note_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.sales_return_note_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = discount.target.value;
    this._discountBasadOn = this.sales_return_note_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.sales_return_note_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangeDiscountBasedOn(dis_based_on, index) {
    this._packing_qty = this.sales_return_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_return_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_return_note_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.sales_return_note_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = dis_based_on.target.value;
    this._taxrate = this.sales_return_note_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangeItemName(index, event) {
    if (event.target.value != "0") {
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterInvData1(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterPackMat(event.target.value),
        this.DropDownListService.retriveItemMasterStatInfo(event.target.value, this.company_name),
        this.DropDownListService.getItemQCDetails(event.target.value, this.company_name)
      ).subscribe(([itemData, invData, packingData, statInfoData, qcData]) => {
        this.DropDownListService.getUomName(itemData["mstock_unit"]).subscribe(data => {
          this.sales_return_note_item_dtls.at(index).patchValue({ uom: data.description });
          this.status = true;
        });
        this.sales_return_note_item_dtls.at(index).patchValue({ price: invData["mrp"] });
        this.packingItem[index] = packingData;
        this.sales_return_note_item_dtls.at(index).patchValue({
          taxcode: statInfoData[0].tax_code,
          tax_rate: statInfoData[0].tax_rate
        });
        this.sales_return_note_item_dtls.at(index).patchValue({ accnorms: qcData[0].qc_code });
      });
    }
  }

  itemId: any;
  packingQty: any;
  onChangePackingItem(index, event) {
    if (event.target.value != "0") {
      this.status = false;
      this.itemId = this.sales_return_note_item_dtls.at(index).get("itemcode").value as FormControl;
      this._packing_qty = this.sales_return_note_item_dtls.at(index).get("squantity").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name).subscribe(data => {
        this.capacity[index] = data.capacity;
        this.empty_bag_wt[index] = data.empty_big_wt;
        this._item_qty = this._packing_qty * this.capacity[index];
        this.sales_return_note_item_dtls.at(index).patchValue({ suom: data.uom1, quantity: this._item_qty });
        this.sales_return_note_item_dtls.at(index).patchValue({ matwt: (Math.round((this._item_qty - this.empty_bag_wt[index]) * 1000) / 1000).toFixed(3) });
        this._mrp = this.sales_return_note_item_dtls.at(index).get("price").value as FormControl;
        this._priceBasedOn = this.sales_return_note_item_dtls.at(index).get('pricebasedon').value as FormControl;
        this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
        this._discountBasadOn = this.sales_return_note_item_dtls.at(index).get('discounttype').value as FormControl;
        this._taxrate = this.sales_return_note_item_dtls.at(index).get('taxrate').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
        this.status = true;
      });
    }
  }

  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  sgst_final: any;
  csgt_final: any;
  igst_final: any;

  discount: any;
  discountBasedOn: any;
  taxrate: any;
  totalAmt: any;

  calculateItemData(packingQty, ItemQty, price, PriceBasedOn, discount, discountBasedOn, taxrate, index) {

    this.grandTotal = 0;

    if (PriceBasedOn == "Packing") { this.amt = price * packingQty }

    if (PriceBasedOn == "Item") { this.amt = price * ItemQty }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") { this.discountAmt = discount; }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;

    /* if(taxrate == 0)
    this._taxAmt = 0; 
    else 
    this._taxAmt = netAmt *(taxrate/100);
    this._totalAmt = this._taxAmt + netAmt;
    this.sales_return_note_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2), 
      discountamt: (Math.round(this.discountAmt * 100) / 100).toFixed(2), taxamt: (Math.round(this._taxAmt * 100) / 100).toFixed(2), 
      totalamt: (Math.round(this._totalAmt * 100) / 100).toFixed(2)});

    for(let i=0; i<this.sales_return_note_item_dtls.length; i++)
    {
      this._total_amt = this.sales_return_note_item_dtls.at(i).get("totalamt").value as FormControl;
      this.grandTotal = this.grandTotal + this._total_amt;
      this.userForm.patchValue({grand_total: (Math.round(this.grandTotal * 100) / 100).toFixed(2)});
    } */

    // Old Tax

    /*this.DropDownListService.taxlistbycode(this.sales_return_note_item_dtls.at(index).get("taxcode").value).subscribe(taxcode => {

      let cgst_amt = taxcode["cgst_act_val"];
      let sgst_amt = taxcode["sgst_act_val"];
      let igst_amt = taxcode["igst_act_val"];

      if (cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)//tax 0%
      {
        //let taxamt = 0;

        this.csgt_final = "0";

        this.sgst_final = "0";

        this.igst_final = "0";

        let taxamt = Number(this.csgt_final) + Number(this.sgst_final) + Number(this.igst_final);

        this.sales_return_note_item_dtls.at(index).patchValue({
          cgstamt: this.csgt_final, sgstamt: this.sgst_final, igstamt: this.igst_final,
          amount: (Math.round(this.amt * 100) / 100).toFixed(2),
          discountamt: (Math.round(this.discountAmt * 100) / 100).toFixed(2),
          taxamt: taxamt, totalamt: (Number(taxamt) + Number(netAmt)).toFixed(2)
        });
      }
      else if (cgst_amt == 0)//igst
      {
        //let taxamt =Number(netAmt *(this.sales_return_note_item_dtls.at(index).get("taxrate").value/100)).toFixed(2);
        //let taxamt = Number(this.round(Number(netAmt * (this.sales_return_note_item_dtls.at(index).get("taxrate").value / 100)), 2))

        this.csgt_final = "0";

        this.sgst_final = "0";

        this.igst_final = Number(this.round(Number(netAmt * (igst_amt / 100)), 2));

        let taxamt = Number(this.csgt_final) + Number(this.sgst_final) + Number(this.igst_final);

        this.sales_return_note_item_dtls.at(index).patchValue({
          cgstamt: this.csgt_final, sgstamt: this.sgst_final, igstamt: this.igst_final,
          amount: (Math.round(this.amt * 100) / 100).toFixed(2),
          discountamt: (Math.round(this.discountAmt * 100) / 100).toFixed(2),
          taxamt: taxamt, totalamt: (Number(taxamt) + Number(netAmt)).toFixed(2)
        });
      }
      else//cgst and sgst
      {
        //let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
        this.csgt_final = Number(this.round(Number(netAmt * (cgst_amt / 100)), 2));

        //let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
        this.sgst_final = Number(this.round(Number(netAmt * (sgst_amt / 100)), 2));

        this.igst_final = "0";

        let taxamt = Number(this.csgt_final) + Number(this.sgst_final) + Number(this.igst_final);

        this.sales_return_note_item_dtls.at(index).patchValue({
          cgstamt: this.csgt_final, sgstamt: this.sgst_final, igstamt: this.igst_final,
          amount: (Math.round(this.amt * 100) / 100).toFixed(2),
          discountamt: (Math.round(this.discountAmt * 100) / 100).toFixed(2),
          taxamt: taxamt, totalamt: (Number(taxamt) + Number(netAmt)).toFixed(2)
        });

      }*/
    /*
     for(let i=0; i<this.sales_return_note_item_dtls.length; i++)
     {
   this._total_amt = this.sales_return_note_item_dtls.at(i).get("totalamt").value as FormControl;
   this.grandTotal = this.grandTotal + this._total_amt;
   this.userForm.patchValue({grand_total: (Math.round(this.grandTotal * 100) / 100).toFixed(2)});
     }
    */

    // new TAX 

    let taxdata: any = [];
    taxdata = this.tax_list;
    console.log("packingQty" + packingQty + "ItemQty " + ItemQty + "price" + price + "PriceBasedOn" + PriceBasedOn + "discount" + discount + "discountBasedOn" + discountBasedOn + "taxrate" + taxrate + "index" + index)
    taxdata.forEach(element => {
      console.log("taxname:" + element.tax_id + "//" + this.sales_return_note_item_dtls.at(index).get("taxcode").value)
      if (element.tax_id == this.sales_return_note_item_dtls.at(index).get("taxcode").value) {
        //console.log("statestatus:"+this.statestatus)
        if (this.statestatus == 0) {
          // this.cgstvalue=(Number(netAmt*element["cgst_act_val"])/100).toFixed(2);
          //this.sgstvalue=(Number(netAmt*element["sgst_act_val"])/100).toFixed(2);
          this.cgstvalue = Number(this.round((Number(netAmt * element["cgst_act_val"]) / 100), 2));
          this.sgstvalue = Number(this.round((Number(netAmt * element["sgst_act_val"]) / 100), 2));

          this.igstvalue = "0";
          // console.log("netAmt"+netAmt+"//"+this.cgstvalue+"//"+this.sgstvalue)
        }
        else {
          this.cgstvalue = '0';
          this.sgstvalue = '0';
          this.igstvalue = Number(this.round(Number(netAmt * (this.sales_return_note_item_dtls.at(index).get("taxrate").value / 100)), 2));
          // console.log("netAmt"+netAmt+"//"+this.igstvalue)
        }
        let taxamt = Number(this.cgstvalue) + Number(this.sgstvalue) + Number(this.igstvalue);
        //console.log(netAmt+"taxamt::"+taxamt)
        this.totalAmt = taxamt + netAmt;
        this.sales_return_note_item_dtls.at(index).patchValue({
          cgstamt: this.cgstvalue, sgstamt: this.sgstvalue, igstamt: this.igstvalue,
          discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2),taxamt: taxamt,
          totalamt:  this.totalAmt
        });
      }

    });

    this.grandTotal = 0;

    for (let i = 0; i < this.sales_return_note_item_dtls.length; i++) {
      this._total_amt = this.sales_return_note_item_dtls.at(i).get("totalamt").value as FormControl;
      this.grandTotal = Number(this.grandTotal) + Number(this._total_amt);
      this.userForm.patchValue({ grandtotal: this.grandTotal.toFixed(2) });
    }
    //});

  }

  onChangePayToFromAddId(businessunit_code: string) {
    if (businessunit_code.length && businessunit_code != "0") {
      this.status = false;
      this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data => {
        this.sales_return_note_shipment_dtls.patchValue({ paydetails: data["add"] });
        this.status = true;
      });
    }
  }

  onChangeShipToAddId(addId: String) {
    if (addId.length && addId != "0") {
      this.status = false;
      this.DropDownListService.getCustDelvFromAdd(this.partyId, addId).subscribe(data => {
        this.sales_return_note_shipment_dtls.patchValue({ shipdetails: data.address })
        this.status = true;
      })
    }
  }

  showPopUp(index) {
    this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index };
    const dialogRef = this.dialog.open(SalesQuoTaxModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.sales_return_note_item_dtls.at(index).patchValue({
        taxcode: data["tax_id"],
        taxrate: data["tax_rate"]
      });
      this._packing_qty = this.sales_return_note_item_dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.sales_return_note_item_dtls.at(index).get("quantity").value as FormControl;
      this._mrp = this.sales_return_note_item_dtls.at(index).get("price").value as FormControl;
      this._priceBasedOn = this.sales_return_note_item_dtls.at(index).get('pricebasedon').value as FormControl;
      this._discount = this.sales_return_note_item_dtls.at(index).get('discountrate').value as FormControl;
      this._discountBasadOn = this.sales_return_note_item_dtls.at(index).get('discounttype').value as FormControl;
      this._taxrate = data["tax_rate"];
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
    });
  }

  onClickShow() {
    if (this.userForm.get("inv_type").value == "INV00003") {
      //console.log("//"+this.userForm.get("party").value+"//"+this.userForm.get("businessunit").value+"//"+this.userForm.get("inv_type").value)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      if (this.userForm.get("party").value != '' && this.userForm.get("businessunit").value != '' && this.userForm.get("inv_type").value != '') {
        this.Id = this.userForm.get("id").value;
        if (this.Id == null || this.Id == '') {
          this.Id = 0;
        }

        let dialogref;
        dialogConfig.data = { party_id: this.userForm.get("party").value, bunit: this.userForm.get("businessunit").value, date: this.userForm.get("salesreturnnotedate").value, id: this.Id }
        dialogref = this.dialog.open(SalereturnjobworkComponent, dialogConfig);
        dialogref.afterClosed().subscribe(data => {
          if (data != '' && data["main_id"] != '0') {
            console.log("maid id:" + data["main_id"])
            this.grandTotal = 0;
            this.userForm.patchValue({ referance_id: data.main_id });
            this.jobwork_sl_no = 0;
            this.addJobworkItem();
            this.jobpackinglist = [];
            while (this.sales_return_note_item_dtls_for_jobwork.length)
              this.sales_return_note_item_dtls_for_jobwork.removeAt(0);
            let k = 0;
            let totalamount: number = 0;
            for (let data1 of data.job_details) {
              if (data1.checkbox == true || data1.checkbox == 'true') {
                forkJoin(
                  this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("businessunit").value, this.company_name, 'INV00003'),
                  this.DropDownListService.getItemMasterPackMat(data1["job_item"])
                ).subscribe(([itemdatalist, packingList]) => {
                  this.jobitemlist = itemdatalist;
                  this.jobpackinglist[k] = packingList;
                  this.selectedJobItem[k] = data1["job_item"]
                  this.selectedJobPacking[k] = data1["job_packing"]
                  this.addJobworkItem();
                  this.sales_return_note_item_dtls_for_jobwork.at(k).patchValue(data1);
                  this.userForm.patchValue({ grandtotal: "0" });
                  this.sales_return_note_item_dtls_for_jobwork.at(k).patchValue({ sl_no: k + 1 });
                  k = k + 1;

                });
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getReturnApprovalWD(data["main_id"]),
              //this.DropDownListService.getReturnApprovalPD(data["main_id"]),
              this.DropDownListService.getReturnApprovalDtls(data["main_id"]),
              this.DropDownListService.getReturnApprovalTI(data["main_id"]),
              this.DropDownListService.getReturnApprovalBD(data["main_id"]),
              this.DropDownListService.getReturnApprovalSD(data["main_id"]),
              this.DropDownListService.getdeliverychallernpartyterm(data["main_id"]),
              this.DropDownListService.getunloadfromreturnid(data["main_id"]),
              this.DropDownListService.getVehiclenoall()
            ).subscribe(([wghmentData, sReturnData, transporterData, brokerData, shipmentData, price_term, unloaddata, vechileall]) => {
              //console.log(" transporterData "+  JSON.stringify(transporterData))
              //console.log(" trans list: "+  JSON.stringify(this.trans_codes))
              //Transporter Details 
              this.vehicleNoList = vechileall;
              this.sales_return_note_shipment_dtls.patchValue(shipmentData);
              this.userForm.patchValue({ transcode: transporterData["transcode"], price_term: price_term["price_term"], salesreturnnoterefno: sReturnData["salesreturnrefno"] });
              this.sales_return_note_trans_info.patchValue(transporterData);
              //vehicleno
              //console.log("vehicleid " +transporterData["vehicleid"])
              //this.sales_return_note_trans_info.patchValue({vehicleno:transporterData["vehicleid"]});
              this.sales_return_note_trans_info.patchValue({ vehicleno: unloaddata["vehicle_id"] });
              this.DropDownListService.getUnloadWeightmentWt(sReturnData["weighment_id"]).subscribe(weigmtData => {
                this.sales_return_note_weight_dtl.patchValue({
                  owngross: weigmtData["gross_weight"], ownuom: weigmtData["gw_unit"],
                  owndate: weigmtData["gw_date"], ownslipno: weigmtData["ref_doc_no"],
                  ownnet: weigmtData["net_weight"], owntare: weigmtData["tare_weight"]
                });
                this.status = true;
              })

              this.sales_return_note_weight_dtl.patchValue({
                partyuom: wghmentData["partyuom"],
                partygross: wghmentData["partygross"], partytare: wghmentData["partytare"], partynet: wghmentData["partynet"],
                partydate: wghmentData["partydate"], partyslipno: wghmentData["partyslipno"]
              })

              this.userForm.patchValue({ remarks: sReturnData["remark"] });

              //party data
              /*         let k = 0;
                       this.addParty();
                       this.party_sl_no = 0;
                       while(this.sales_return_note_party_dtls.length)
                       this.sales_return_note_party_dtls.removeAt(0);
                       for(let data1 of partyData)
                       {
                         this.addParty();
                         this.onChangePartyName(data1.pcode, k);
                         this.sales_return_note_party_dtls.at(k).patchValue({pcode: data1["pcode"],
                           cpname: data1["cpname"], cpcontact: data1["cpcontact"]});
                         k = k + 1;
                       }
         */
              //Broker Dtls
              let j = 0;
              this.addBroker();
              this.broker_sl_no = 0;
              while (this.sales_return_note_broker_dtls.length)
                this.sales_return_note_broker_dtls.removeAt(0);
              for (let data1 of brokerData) {
                this.addBroker();
                this.sales_return_note_broker_dtls.at(j).patchValue({
                  brokercode: data1["brokercode"],
                  basis: data1["basis"], rate: data1["rate"]
                });
                j = j + 1;
              }
              this.status = true;
            });

          }
        });

      }
      else {

        alert(" 11 Select Party,Invoice Type & Business Unit First!")
      }


    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      if (this.partyId != "0" && this.b_unit != "0" && this._invoicetype != "0") {
        this.Id = this.userForm.get("id").value;
        console.log("tuhin here  :: " + this.Id)
        if (this.Id == null || this.Id == '') {
          this.Id = 0;
          console.log("tuhin here12345 :: " + this.Id)

        }

        dialogConfig.data = {
          party_id: this.partyId, bunit: this.b_unit, date: this.currentDate,
          finYear: this.financialYear, company_id: this.company_name, inv_type: this._invoicetype, parent_model: 'Sales Return Note', id: this.Id
        };
        let dialogref;
        dialogref = this.dialog.open(ReturnApprovalNotePopUpComponent, dialogConfig);
        dialogref.afterClosed().subscribe(data => {
          if (data != '' && data["salesreturnid"] != '0') {
            this.popupstatus = true;
            let k = 0, totalamount: number = 0;
            this.grandTotal = 0;
            this.packingItem = [];
            this.userForm.patchValue({ referance_id: data["salesreturnid"] });

            this.addItem();
            this.item_sl_no = 0;
            while (this.sales_return_note_item_dtls.length)
              this.sales_return_note_item_dtls.removeAt(0);
            console.log("salesReturn item dtls: " + JSON.stringify(data))
            for (let data1 of data.return_approval_Item_Dtls) {
              if (data1.checkbox == true) {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                  this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name)
                ).subscribe(([packingList, capacityEmptyWt]) => {
                  this.status = true;
                  this.packingItem[k] = packingList;
                  this.capacity[k] = capacityEmptyWt["capacity"];
                  this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                  this.grandTotal = this.grandTotal + data1.totalamt;
                  this.addItem();
                  //this.sales_return_note_item_dtls.at(k).patchValue(data1);

                  this.sales_return_note_item_dtls.at(k).patchValue({
                    itemcode: data1["itemcode"], packing: data1["packing"],
                    squantity: data1["squantity"], suom: data1["suom"], quantity: data1["quantity"].toFixed(3), uom: data1["uom"],
                    price: data1["price"].toFixed(2), matwt: data1["matwt"].toFixed(3), pricebasedon: data1["pricebasedon"], amount: data1["amount"].toFixed(2),
                    discountrate: data1["discountrate"], discounttype: data1["discounttype"], discountamt: data1["discountamt"], hsn_code: data1["hsn_code"],
                    taxcode: data1["taxcode"], taxrate: data1["taxrate"], taxamt: data1["taxamt"].toFixed(2), accnorms: data1["accnorms"], totalamt: data1["totalamt"].toFixed(2),
                    cgstamt: data1["cgstamt"].toFixed(2),sgstamt: data1["sgstamt"].toFixed(2),igstamt: data1["igstamt"].toFixed(2),
                  });
                  
                  //avijit sir look here prob here 
                  
                  //this.calculateItemData(data1["squantity"], data1.quantity, data1.price, data1.pricebasedon, data1.discountrate, data1.discounttype, data1.taxrate, k);

                  totalamount += Number(this.sales_return_note_item_dtls.at(k).get("totalamt").value);
                  k = k + 1;
                  this.userForm.patchValue({ grandtotal: totalamount });
                  timer(1000).subscribe
                    (x => {
                      let TotalAmtt = 0;
                      for (let i = 0; i < this.sales_return_note_item_dtls.length; i++) {
                        TotalAmtt += Number(this.sales_return_note_item_dtls.at(i).get("totalamt").value);
                      }
                      let Ttal = TotalAmtt.toFixed(2);
                      this.userForm.patchValue({ grandtotal: Ttal })
                    })
                  //this.userForm.patchValue({grandtotal: this.grandTotal})
                });
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getReturnApprovalWD(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalPD(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalDtls(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalTI(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalBD(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalSD(data["salesreturnid"]),
              this.DropDownListService.getdeliverychallernpartyterm(data["salesreturnid"]),

              this.DropDownListService.getunloadfromreturnid(data["salesreturnid"]),
              this.DropDownListService.getVehiclenoall()
            ).subscribe(([wghmentData, partyData, sReturnData, transporterData, brokerData, shipmentData, price_term, unloaddata, vechileall]) => {
              console.log(" hello "+  JSON.stringify(unloaddata))
              //Transporter Details 
              this.vehicleNoList = vechileall;
              this.sales_return_note_shipment_dtls.patchValue(shipmentData);
              this.userForm.patchValue({ transcode: transporterData["transcode"], price_term: price_term["price_term"], salesreturnnoterefno: sReturnData["salesreturnrefno"] });
              this.sales_return_note_trans_info.patchValue(transporterData);
              //vehicleno
              //console.log("vehicleid " +transporterData["vehicleid"])
              //this.sales_return_note_trans_info.patchValue({vehicleno:transporterData["vehicleid"]});
              this.sales_return_note_trans_info.patchValue({ vehicleno: unloaddata["vehicle_id"] });
              this.DropDownListService.getUnloadWeightmentWt(sReturnData["weighment_id"]).subscribe(weigmtData => {
                this.sales_return_note_weight_dtl.patchValue({
                  owngross: weigmtData["gross_weight"], ownuom: weigmtData["gw_unit"],
                  owndate: weigmtData["gw_date"], ownslipno: weigmtData["ref_doc_no"],
                  ownnet: weigmtData["net_weight"], owntare: weigmtData["tare_weight"]
                });
                this.status = true;
              })

              this.sales_return_note_weight_dtl.patchValue({
                partyuom: wghmentData["partyuom"],
                partygross: wghmentData["partygross"], partytare: wghmentData["partytare"], partynet: wghmentData["partynet"],
                partydate: wghmentData["partydate"], partyslipno: wghmentData["partyslipno"]
              })

              this.userForm.patchValue({ remarks: sReturnData["remark"] });

              //party data
              /*         let k = 0;
                       this.addParty();
                       this.party_sl_no = 0;
                       while(this.sales_return_note_party_dtls.length)
                       this.sales_return_note_party_dtls.removeAt(0);
                       for(let data1 of partyData)
                       {
                         this.addParty();
                         this.onChangePartyName(data1.pcode, k);
                         this.sales_return_note_party_dtls.at(k).patchValue({pcode: data1["pcode"],
                           cpname: data1["cpname"], cpcontact: data1["cpcontact"]});
                         k = k + 1;
                       }
         */
              //Broker Dtls
              let j = 0;
              this.addBroker();
              this.broker_sl_no = 0;
              while (this.sales_return_note_broker_dtls.length)
                this.sales_return_note_broker_dtls.removeAt(0);
              for (let data1 of brokerData) {
                this.addBroker();
                this.sales_return_note_broker_dtls.at(j).patchValue({
                  brokercode: data1["brokercode"],
                  basis: data1["basis"], rate: data1["rate"]
                });
                j = j + 1;
              }
              this.status = true;
            });
          }
        });

      }
      else { alert("Select Invoice Type, Party & Business Unit First!") }

    }
  }

  send() {
    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.submitted = true;
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {
      this.status = false;
      if (this.userForm.get("inv_type").value == null || this.userForm.get("inv_type").value == '' || this.userForm.get("inv_type").value == '0' || this.userForm.get("inv_type").value == 0) {
        alert("Please Select Sales Invoice Type !!!!!");
        this.status = true;
      }
      else if (this.userForm.get("salesreturnnotedate").value == null || this.userForm.get("salesreturnnotedate").value == '') {
        alert("Please Select Sales Return Date !!!!!!");
        this.status = true;
      }
      else if (this.userForm.get("salesreturnnoteno").value == null || this.userForm.get("salesreturnnoteno").value == '') {
        alert("Please Enter Sales Return Note No. !!!!!!");
        this.status = true;
      }
      else if (this.userForm.get("businessunit").value == null || this.userForm.get("businessunit").value == '' || this.userForm.get("businessunit").value == '0' || this.userForm.get("businessunit").value == 0) {
        alert("Please Select Bussiness Unit !!!!!!");
        this.status = true;
      }
      else if (this.userForm.get("party").value == null || this.userForm.get("party").value == '' || this.userForm.get("party").value == '0' || this.userForm.get("party").value == 0) {
        alert("Please Select  Party !!!!!!!!");
        this.status = true;
      }
      /* else if(this.userForm.get("salesreturnnoterefno").value == null || this.userForm.get("salesreturnnoterefno").value == '')
       {
         alert("Please Enter Reference No.!!!!!!!");
         this.status=true;
       }
       */
      else if (this.userForm.get("price_term").value == null || this.userForm.get("price_term").value == '') {
        alert("Please Select Price term !!!!!!!");
        this.status = true;
      }
      /*    else if(this.userForm.get("cust_ref_doc_no").value == null || this.userForm.get("cust_ref_doc_no").value == '')
           {
             alert("Please Enter Customer Ref. Document No. !!!!!!");
             this.status=true;
           }
            
           else if(this.userForm.get("date2").value == null || this.userForm.get("date2").value == '')
           {
             alert(" Please Select Date !!!!!!!!!!!!");
             this.status=true;
           }
          */

      else {
        // this.popupstatus
        let item_name = false;
        let packing_name = false;
        let packing_qty = false;
        let item_qty = false;
        let pricebasedon = false;
        let brokername = false;
        let partyname = false;

        for (let p = 0; p < this.sales_return_note_item_dtls.length; p++) {
          if (this.userForm.get("inv_type").value != 'INV00003' && (this.sales_return_note_item_dtls.at(p).get("itemcode").value == '' || this.sales_return_note_item_dtls.at(p).get("itemcode").value == null || this.sales_return_note_item_dtls.at(p).get("itemcode").value == 0)) {
            item_name = true;
          }
          if (this.userForm.get("inv_type").value != 'INV00003' && (this.sales_return_note_item_dtls.at(p).get("packing").value == '' || this.sales_return_note_item_dtls.at(p).get("packing").value == null || this.sales_return_note_item_dtls.at(p).get("packing").value == 0)) {
            packing_name = true;
          }
          if (this.userForm.get("inv_type").value != 'INV00003' && (this.sales_return_note_item_dtls.at(p).get("squantity").value == '' || this.sales_return_note_item_dtls.at(p).get("squantity").value == null || this.sales_return_note_item_dtls.at(p).get("squantity").value == 0)) {
            packing_qty = true;
          }
          if (this.userForm.get("inv_type").value != 'INV00003' && (this.sales_return_note_item_dtls.at(p).get("quantity").value == '' || this.sales_return_note_item_dtls.at(p).get("quantity").value == null || this.sales_return_note_item_dtls.at(p).get("quantity").value == 0)) {
            item_qty = true;
          }
          if (this.userForm.get("inv_type").value != 'INV00003' && (this.sales_return_note_item_dtls.at(p).get("pricebasedon").value == '' || this.sales_return_note_item_dtls.at(p).get("pricebasedon").value == null || this.sales_return_note_item_dtls.at(p).get("pricebasedon").value == 0)) {
            pricebasedon = true;
          }
        }
        for (let q = 0; q < this.sales_return_note_broker_dtls.length; q++) {
          if (this.sales_return_note_broker_dtls.at(q).get("brokercode").value == '' || this.sales_return_note_broker_dtls.at(q).get("brokercode").value == null || this.sales_return_note_broker_dtls.at(q).get("brokercode").value == 0) {
            brokername = true;
          }
        }
        for (let r = 0; r < this.sales_return_note_party_dtls.length; r++) {
          if (this.sales_return_note_party_dtls.at(r).get("pcode").value == '' || this.sales_return_note_party_dtls.at(r).get("pcode").value == null || this.sales_return_note_party_dtls.at(r).get("pcode").value == 0) {
            partyname = true;
          }
        }
        if (item_name == true) {
          alert("Please Select Item Name In Item Details Tab");
          this.status = true;
        }
        else if (packing_name == true) {
          alert("Please Select Packing Name In Item Details Tab");
          this.status = true;
        }
        else if (packing_qty == true) {
          alert("Please Enter Packing Quantity In Item Details Tab");
          this.status = true;
        }
        else if (item_qty == true) {
          alert("Please Enter Item Quantity In Item Details Tab");
          this.status = true;
        }
        else if (pricebasedon == true) {
          alert("Please Select Price Based On In Item Details Tab");
          this.status = true;
        }
        else if (brokername == true) {
          alert("Please Select Broker Name In Broker Details Tab");
          this.status = true;
        }
        else if (partyname == true) {
          alert("Please Select Party Name In Party Details Tab");
          this.status = true;
        }
        else if (this.userForm.get("confirmedby").value == '' || this.userForm.get("confirmedby").value == null || this.userForm.get("confirmedby").value == 0) {
          alert("Please Select Comfirmed By In Aproval Tab")
          this.status = true;
        }
        else if (this.userForm.get("approval").value == '' || this.userForm.get("approval").value == null || this.userForm.get("approval").value == 0) {
          alert("Please Select Approved In Aproval Tab")
          this.status = true;
        }
        else if (this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0) {
          alert("Please Select Reason In Aproval Tab")
          this.status = true;
        }
        else {


          if (this.Id > 0) {
            this.Service.updateSalesReturnNote(this.userForm.getRawValue(), this.Id).subscribe(data => {
              console.log(this.userForm.value);
              alert("Sales Return Note Updated successfully.");
              this.userForm.reset();
              this.ngOnInit();
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
          }
          else {
            this.Service.createSalesReturnNote(this.userForm.getRawValue()).subscribe(data => {
              console.log(this.userForm.value);
              alert("New Sales Return Note created successfully.");
              this.userForm.reset();
              this.ngOnInit();
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
          }

        }

      }


    }
  }

  onUpdate(id: any, salesreturnnoteid: string, action) {

    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.selectedContName = [];
    this.selectedPartyName = [];
    if (action == 'view') { this.salesreturnnotesave = false; }
    else { this.salesreturnnotesave = true; }

    forkJoin(
      this.Service.retriveSalesReturnNote(id),
      // this.Service.getSalesReturnNoteID(salesreturnnoteid),      
      this.Service.getSalesReturnNoteTI(salesreturnnoteid),
      this.Service.getSalesReturnNotePD(salesreturnnoteid),
      this.Service.getSalesReturnNoteD(salesreturnnoteid),
      this.Service.getSalesReturnNoteWD(salesreturnnoteid),
      this.Service.getSalesReturnNoteSD(salesreturnnoteid),
      this.Service.getSalesReturnNoteBD(salesreturnnoteid),
      // ).subscribe(([SalesReturnNotedata, itemData, transData,
    ).subscribe(([SalesReturnNotedata, transData,
      partyData, docData, weightData, shipmentData, brokerData]) => {
      this.onChangeParty(SalesReturnNotedata["party"]);
      this.b_unit = SalesReturnNotedata["businessunit"];
      this._invoicetype = SalesReturnNotedata["inv_type"];
      this.partyId = SalesReturnNotedata["party"];
      this.currentDate = SalesReturnNotedata["currentDate"];
      this.popupstatus = true;
      //this.DropDownListService.getCustomerThruBU(SalesReturnNotedata["businessunit"]).subscribe(data=>
      /* this.DropDownListService.getCustomerThruBUnewlist(SalesReturnNotedata["businessunit"]).subscribe(data=>
        {
          this.partyList = data;
          this.status = true;
        });
*/
      this.DropDownListService.getCustomerThruBUnewlist(SalesReturnNotedata["businessunit"]).subscribe(
        {
          next: (data) => {
            this.partyList = data;
            this.status = true;
          }

        });

      this.userForm.patchValue({
        id: SalesReturnNotedata["id"], salesreturnnoteid: SalesReturnNotedata["salesreturnnoteid"], price_term: SalesReturnNotedata["price_term"],
        inv_type: SalesReturnNotedata["inv_type"], salesreturnnoteno: SalesReturnNotedata["salesreturnnoteno"], date2: SalesReturnNotedata["date2"], cust_ref_doc_no: SalesReturnNotedata["cust_ref_doc_no"],
        referance_id: SalesReturnNotedata["referance_id"], party: SalesReturnNotedata["party"], salesreturnnotedate: SalesReturnNotedata["salesreturnnotedate"],
        businessunit: SalesReturnNotedata["businessunit"], salesreturnnoterefno: SalesReturnNotedata["salesreturnnoterefno"], remark: SalesReturnNotedata["remark"],
        confirmedby: SalesReturnNotedata["confirmedby"], approval: SalesReturnNotedata["approval"], reason: SalesReturnNotedata["reason"],
        grandtotal: SalesReturnNotedata["grandtotal"], company_id: SalesReturnNotedata["company_id"], fin_year: SalesReturnNotedata["fin_year"], username: SalesReturnNotedata["username"],
      });
      console.log("order Details: " + JSON.stringify(SalesReturnNotedata));

      if (this.userForm.get("inv_type").value == "INV00003") {
        this.Jobworkshow = true;
        this.Service.getSalesReturnNoteIDjobwork(salesreturnnoteid).subscribe(jobitemData => {

          this.jobwork_sl_no = 0;
          this.addJobworkItem();
          this.jobpackinglist = [];
          while (this.sales_return_note_item_dtls_for_jobwork.length)
            this.sales_return_note_item_dtls_for_jobwork.removeAt(0);
          let k = 0;
          for (let data12 of jobitemData) {
            forkJoin(
              this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("businessunit").value, this.company_name, 'INV00003'),
              this.DropDownListService.getItemMasterPackMat(data12["job_item"])
            ).subscribe(([itemdatalist, packingList]) => {
              this.jobitemlist = itemdatalist;
              this.jobpackinglist[k] = packingList;
              this.selectedJobItem[k] = data12["job_item"]
              this.selectedJobPacking[k] = data12["job_packing"]
              this.addJobworkItem();
              console.log("jobitemData:" + JSON.stringify(jobitemData))
              console.log("packing" + data12["job_packing"])
              this.sales_return_note_item_dtls_for_jobwork.at(k).patchValue({
                sl_no: data12["sl_no"], job_item: data12["job_item"], job_packing: data12["job_packing"],
                job_hsn: data12["job_hsn"], pack_qty: data12["pack_qty"], pack_uom: data12["pack_uom"], price_based_on: data12["price_based_on"],
                item_qty: data12["item_qty"], item_uom: data12["item_uom"], tolerance: data12["tolerance"]
              });
              k = k + 1;
            });

          }
        })
      }
      else {
        this.Jobworkshow = false;

        this.Service.getSalesReturnNoteID(salesreturnnoteid).subscribe(itemData => {
          let k = 0;
          this.addItem();
          this.item_sl_no = 0;
          while (this.sales_return_note_item_dtls.length)
            this.sales_return_note_item_dtls.removeAt(0);
          for (let data1 of itemData) {
            this.status = false;
            this.addItem();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
              this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name)
            ).subscribe(([packingList, capacityEmptyWt]) => {
              this.capacity[k] = capacityEmptyWt.capacity;
              this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
              this.selectedPackingItem[k] = data1["packing"];
              this.selectedItemName[k] = data1["itemcode"];
              this.packingItem[k] = packingList;
              this.sales_return_note_item_dtls.at(k).patchValue(data1);
              k = k + 1;
              this.status = true;
            });
          }

        })
      }
      console.log("transData: " + JSON.stringify(transData));
      //this.onChangeTransporterName(transData["transcode"]);
      this.sales_return_note_trans_info.patchValue(transData);

      console.log("partyData: " + JSON.stringify(partyData));
      let i = 0;
      this.addParty();
      this.party_sl_no = 0;
      while (this.sales_return_note_party_dtls.length)
        this.sales_return_note_party_dtls.removeAt(0);
      for (let data1 of partyData) {
        this.status = false;
        this.DropDownListService.custAddDtlsRetriveList(data1["pcode"], this.company_name).subscribe(cName => {
          this.addParty();
          this.contNameList[i] = cName;
          this.selectedPartyName[i] = data1["pcode"];
          this.selectedContName[i] = data1["cpname"];
          this.sales_return_note_party_dtls.at(i).patchValue(data1);
          i = i + 1;
          this.status = true;
        });
      }

      this.addDocument();
      while (this.sales_return_note_docs.length)
        this.sales_return_note_docs.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.sales_return_note_docs.patchValue(docData);
      console.log("docData: " + JSON.stringify(docData));

      console.log("weightData: " + JSON.stringify(weightData));
      this.sales_return_note_weight_dtl.patchValue(weightData);

      this.sales_return_note_shipment_dtls.patchValue({
        shipaddr: shipmentData["shipaddr"],
        shipdetails: shipmentData["shipdetails"], payaddr: shipmentData["payaddr"], paydetails: shipmentData["paydetails"],
      });
      console.log("shipmentData: " + JSON.stringify(shipmentData));

      this.addBroker();
      while (this.sales_return_note_broker_dtls.length)
        this.sales_return_note_broker_dtls.removeAt(0);
      for (let data1 of brokerData)
        this.addBroker();
      this.sales_return_note_broker_dtls.patchValue(brokerData);
      console.log("brokerData: " + JSON.stringify(brokerData));

      this.status = true;

      if (localStorage.getItem("svalue") == 'true') {
        localStorage.setItem("svalue", 'false');
      }
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  onDelete(id: any, salesreturnnoteid: string) {
    this.status = false;
    if (confirm("Are you sure to delete this Sales Return Note?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.DropDownListService.salesReturnNoteUsage(salesreturnnoteid).subscribe(checkSalesReturnNote => {
        //alert("bidhan here::"+checkSalesReturnNote.status);
        if (checkSalesReturnNote.status == 'No') {
          this.Service.deleteSalesReturnNotes(this.userForm.getRawValue(), id).subscribe(data => {
            //  console.log("Pur :"+data.pur_orderid);
            if (data.salesreturnnoteid == '' || data.salesreturnnoteid == null) {
              alert("Opps!!! Can't delete this Sales Return Note !!!");
            } else {
              alert("Sales Return Note deleted successfully.");
            }
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });

        }
        else {
          alert("This Sales return Note is Already Used,Can not be Deleted!! ");
        }
      });
    }
    this.status = true;
  }

  search() {
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let party1 = this.userForm1.get("party1").value;

    this.status = false;

    this.DropDownListService.searchSalesReturnNote(fromdate, todate, party1)
      .subscribe(data => {
        //console.log("Check Search :: " + JSON.stringify(data))
        this.listSalesReturnNote = data;
        this.status = true;

      }, (error) => {
        this.status = true;
        alert("Sales Return Note Not Found !!!")
        this.listSalesReturnNote = [];
      })

  }
  addJobworkItem() {
    this.jobwork_sl_no = this.jobwork_sl_no + 1;
    this.sales_return_note_item_dtls_for_jobwork.push(this.fb.group({
      sl_no: this.jobwork_sl_no,
      job_item: '',
      job_item_name: '',
      job_packing: '',
      job_packing_name: '',
      job_hsn: '',
      pack_qty: '',
      pack_uom: '',
      price_based_on: '',
      item_qty: '',
      item_uom: '',
      mat_wt: '',
      tolerance: ''

    }));
  }

  deleteJobworkItem(index) {
    if (this.jobwork_sl_no > 1) {
      this.sales_return_note_item_dtls_for_jobwork.removeAt(index);
      this.jobwork_sl_no = this.jobwork_sl_no - 1;
    }
    else {
      this.jobwork_sl_no = 1;

      alert("can't delete all rows");
      this.sales_return_note_item_dtls_for_jobwork.reset();
      this.sales_return_note_item_dtls_for_jobwork.at(0).patchValue({ sl_no: this.jobwork_sl_no });

      this.sales_return_note_item_dtls_for_jobwork.at(this.jobwork_sl_no - 1).patchValue({
        job_item: '',
        job_item_name: '',
        job_packing: '',
        job_packing_name: '',
        job_hsn: '',
        pack_qty: '',
        pack_uom: '',
        price_based_on: '',
        item_qty: '',
        item_uom: '',
        mat_wt: '',
        tolerance: ''
      });
    }
    for (let i = 1; i <= this.jobwork_sl_no; i++)
      this.sales_return_note_item_dtls_for_jobwork.at(i - 1).patchValue({ sl_no: i });
  }


}


