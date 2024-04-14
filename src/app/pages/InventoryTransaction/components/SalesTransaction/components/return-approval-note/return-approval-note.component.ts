import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ReturnApprovalNote } from '../../../../../../Models/SalesTransaction/return-approval-note';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SalesQuoTaxModalComponent } from '../sales-quo-tax-modal/sales-quo-tax-modal.component';
import { DelChallanSOrderPopUpComponent } from '../../components/del-challan-sorder-pop-up/del-challan-sorder-pop-up.component';
import { DelChallanLoadingAdvPopUpComponent } from '../../components/del-challan-loading-adv-pop-up/del-challan-loading-adv-pop-up.component';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { formatDate } from '@angular/common';
import { SalesQcPopupComponent } from '../sales-qc-popup/sales-qc-popup.component';
import { forkJoin, timer } from 'rxjs';
import { Master } from '../../../../../../service/master.service';
import { DeliveryChallanPopUpComponent } from '../delivery-challan-pop-up/delivery-challan-pop-up.component';
import { SalesOrderPopUpComponent } from '../sales-order-pop-up/sales-order-pop-up.component';
import { SalesInvoicePopUpComponent } from '../sales-invoice-pop-up/sales-invoice-pop-up.component';
import { SalesOrderReturnapprovalPopupComponent } from '../sales-order-returnapproval-popup/sales-order-returnapproval-popup.component';
import { ReturnApprovalJobworkPopupComponent } from '../return-approval-jobwork-popup/return-approval-jobwork-popup.component';

@Component({
  selector: 'app-return-approval-note',
  templateUrl: './return-approval-note.component.html',
  styleUrls: ['./return-approval-note.component.scss']
})

export class ReturnApprovalNoteComponent implements OnInit {
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  brokerReq = false;
  isHidden: any;
  submitted = false;
  public userForm: FormGroup;
  model: ReturnApprovalNote = new ReturnApprovalNote();
  item_codes: any = [];
  brokerNames: any = [];
  partyList: any = [];
  ReCriteria: any;
  status = false;
  packingItem: any = [];
  customUOMs: {};
  Id: any;
  SalesreturnType: any;
  ReturnbasedOn: any;
  bussiness_unit_list: any = [];
  reasonIdList: {};
  contNameList: any = [];
  employeeNames: {};
  company_name: any;
  PartyAllList: any = [];
  trans_codes: {};
  item_sl_no = 1;
  editable: boolean = false;
  PriceReadOnly: boolean = false;
  PackingQty: boolean = false;
  broker_sl_no = 1;
  party_sl_no = 1;
  listReturnApprovalNote: any = [];
  partyNameList: any = [];
  currentDate: any;
  challanNo: any;
  ConfirmedBy = "0";
  Reason = "0";
  grandTotal: any;
  veh_nos: any = [];
  capacity: any = [];
  empty_bag_wt: any = [];
  selectedItemName: any = [];
  selectedPackingItem: any = [];
  selectedPartyName: any = [];
  selectedContName: any = [];
  customerDelvAddList: any = [];
  invoiceType: any = [];
  financialYear: any;
  salesReturnNo: any;
  returnbaseOn: any;
  returnCriteria: any = [];
  returnBaseOnList: any = [];
  _customerId: any;
  action: any;
  ReturnBasedOn: string;
  modeOfTransport: any = [];
  returnapprovenotesave: boolean = true;
  returnapprovenoteupdate: boolean = true;
  returnapprovenoteview: boolean = true;
  returnapprovenotedelete: boolean = true;
  Jobworkshow: boolean = false;
  jobwork_sl_no = 1;
  service_sl_no = 1;
  selectedJobPacking: any = [];
  selectedJobItem: any = [];
  item_services: any = [];
  selectedService: any = [];
  jobpackinglist: any = [];
  jobitemlist: any = [];
  totalItem: number = 0;
  taxcodelist: any = [];
  tax_list: any = [];
  state: any;
  statestatus: number = 0;
  cgstvalue: any;
  sgstvalue: any;
  igstvalue: any;
  company_state:any;

  public userForm1: FormGroup;
  partySearchList: any = [];

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private Service: Master, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group(
      {
        id: [''],
        referance_id: [''],
        salesreturnid: [''],
        salesreturntype: [''],
        salesreturnno: [''],
        party: [''],
        salesreturndate: [''],
        businessunit: [''],
        returncriteria: [''],
        returnbasedon: [''],
        salesreturnrefno: [''],
        remark: [''],
        confirmedby: [''],
        approval: [''],
        reason: [''],
        grandtotal: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        inv_type: [''],
        diliverylist: [''],
        jobwork: [''],

        return_approval_item_dtls: this.fb.array([this.fb.group({
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
          accnorms: '',
          delivery_cid: ''
        })]),

        return_approval_broker_dtls: this.fb.array([this.fb.group({
          slno: this.broker_sl_no,
          brokercode: '',
          basis: '',
          rate: ''
        })]),

        return_approval_party_dtls: this.fb.array([this.fb.group({
          slno: this.party_sl_no,
          pcode: '',
          cpname: '',
          cpcontact: ''
        })]),

        return_approval_docs: this.fb.array([this.fb.group({
          docname: ''
        })]),

        return_approval_shipment_dtls: this.fb.group({
          shipaddr: '',
          shipdetails: '',
          payaddr: '',
          paydetails: ''
        }),

        return_approval_trans_info: this.fb.group({
          transborneby: '',
          modeoftrans: '',
          //transportername:'',
          vehicleid: '',
          freightamt: '',
          advpaid: '',
          chargecode: '',
          transcode: ''
        }),

        return_approval_weight_dtl: this.fb.group({
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

        return_approval_item_dtls_for_jobwork: this.fb.array([this.fb.group({
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
        return_approval_item_dtls_for_jobwork_price: this.fb.array([this.fb.group({
          slno: this.service_sl_no,
          item_service: '',
          sac_code: '',
          job_price: '',
          tax_value: '',
          cgst_tax: '',
          cgst_amt: '',
          sgst_tax: '',
          sgst_amt: '',
          tot_amount: '',
          igst_tax: '',
          igst_amt: '',
          taxcode: ''
        })])
      });

    this.userForm1 = fb.group(
      {
        fromdate: [''],
        todate: [''],
        //party1:[''],
      });

  }

  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  //get party1(){ return this.userForm1.get("party1") as FormControl }

  get id() { return this.userForm.get("id") as FormControl };
  get salesreturnid() { return this.userForm.get("salesreturnid") as FormControl };
  get salesreturntype() { return this.userForm.get("salesreturntype") as FormControl };
  get salesreturnno() { return this.userForm.get("salesreturnno") as FormControl };
  get party() { return this.userForm.get("party") as FormControl };
  get salesreturndate() { return this.userForm.get("salesreturndate") as FormControl };
  get businessunit() { return this.userForm.get("businessunit") as FormControl };
  get returncriteria() { return this.userForm.get("returncriteria") as FormControl };
  get returnbasedon() { return this.userForm.get("returnbasedon") as FormControl };
  get salesreturnrefno() { return this.userForm.get("salesreturnrefno") as FormControl };
  get remark() { return this.userForm.get("remark") as FormControl };
  get confirmedby() { return this.userForm.get("confirmedby") as FormControl };
  get approval() { return this.userForm.get("approval") as FormControl };
  get reason() { return this.userForm.get("reason") as FormControl };
  get grandtotal() { return this.userForm.get("grandtotal") as FormControl };
  get inv_type() { return this.userForm.get("inv_type") as FormControl; }
  get diliverylist() { return this.userForm.get("diliverylist") as FormControl; }
  get jobwork() { return this.userForm.get("jobwork") as FormControl; }

  get return_approval_item_dtls() { return this.userForm.get("return_approval_item_dtls") as FormArray };
  get return_approval_broker_dtls() { return this.userForm.get("return_approval_broker_dtls") as FormArray };
  get return_approval_party_dtls() { return this.userForm.get("return_approval_party_dtls") as FormArray };
  get return_approval_shipment_dtls() { return this.userForm.get("return_approval_shipment_dtls") as FormGroup };
  get return_approval_trans_info() { return this.userForm.get("return_approval_trans_info") as FormGroup };
  get return_approval_weight_dtl() { return this.userForm.get("return_approval_weight_dtl") as FormGroup };
  get return_approval_docs() { return this.userForm.get("return_approval_docs") as FormArray };
  get return_approval_item_dtls_for_jobwork() { return this.userForm.get("return_approval_item_dtls_for_jobwork") as FormArray };
  get return_approval_item_dtls_for_jobwork_price() { return this.userForm.get("return_approval_item_dtls_for_jobwork_price") as FormArray };


  ngOnInit() {
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.returnapprovenotesave = false;
    this.returnapprovenoteview = false;
    this.returnapprovenoteupdate = false;
    this.returnapprovenotedelete = false;

    if (accessdata.includes('return_approval_note.save')) {
      this.returnapprovenotesave = true;
    }
    if (accessdata.includes('return_approval_note.update')) {
      this.returnapprovenoteupdate = true;
    }
    if (accessdata.includes('return_approval_note.view')) {
      this.returnapprovenoteview = true;
    }
    if (accessdata.includes('return_approval_note.delete')) {
      this.returnapprovenotedelete = true;
    }


    this.status = false;
    this.isHidden = false;
    this.grandTotal = 0;
    this.ConfirmedBy = "0";
    this.Reason = "0";
    this.returnCriteria = ["Full Return", "Partial Return"];
    this.return_approval_shipment_dtls.patchValue({ payaddr: "0" });
    this.return_approval_trans_info.patchValue({ transcode: "0", modeoftrans: "0", vehicleid: "0" })
    for (let i = 0; i < this.return_approval_broker_dtls.length; i++) {
      this.return_approval_broker_dtls.at(i).patchValue({ brokercode: "0" });
    }
    for (let i = 0; i < this.return_approval_party_dtls.length; i++) {
      this.return_approval_party_dtls.at(i).patchValue({ pcode: "0" });
    }
    //this.returnBaseOnList=["Delivery Challan", "Sales Order","Sales Invoice"];
    this.packingItem = [];
    this.capacity = [];
    this.empty_bag_wt = [];
    this.returnbaseOn = '';
    this._customerId = "0";
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

    this.userForm.patchValue({ id: 0, referance_id: 0 });
    this.company_name = localStorage.getItem("company_name");
    this.financialYear = localStorage.getItem("financial_year");
    this.modeOfTransport = ["By Air", "By Rail", "By Road", "By Ship", "By Train", "By Vehicle", "By Water", "By Other"];
    forkJoin(

      //this.DropDownListService.customerNameCodeList(this.company_name),
      this.DropDownListService.customerNameCodeListnew(this.company_name),
      //this.DropDownListService.getVehicleThruWeighment(),
      this.DropDownListService.getVehicleThruWeighmentfast(),
      this.DropDownListService.reasonList(),
      //this.Service.getReturnApprovalNote("company="+this.company_name+"&finyear="+this.financialYear),
      this.DropDownListService.getReturnApprovalNoteList(this.company_name, this.currentDate),
      //this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
      //this.DropDownListService.itemNamesList(),
      this.DropDownListService.itemNamesNewList(),
      //this.DropDownListService.brokerNameList(),
      // this.DropDownListService.transporterNamesList(),
      this.DropDownListService.getTransporterMNCListFast(),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.getWeighmentCustomUOM(),
      this.DropDownListService.taxList(),
      // this.DropDownListService.customerNameCodeList(this.company_name),
    ).subscribe(([customerData, vehicleData, reasonData, returnNoteData,
      //    BUMNCData, itemNameData, brokerData, transData, empData, customData,PartyallData])=>
      BUMNCData, itemNameData, transData, empData, customData, tax]) => {
      console.log("returnNoteData:" + JSON.stringify(returnNoteData))
      this.tax_list = tax;
      this.partyNameList = customerData;
      this.partySearchList = customerData;
      this.veh_nos = vehicleData;
      this.reasonIdList = reasonData;
      this.listReturnApprovalNote = returnNoteData;
      this.bussiness_unit_list = BUMNCData;
      this.item_codes = itemNameData;
      //this.brokerNames = brokerData;
      this.trans_codes = transData;
      this.employeeNames = empData;
      this.customUOMs = customData;
      this.userForm.patchValue({ party: "0", businessunit: "0", id: "0", referance_id: "0" });
      this.return_approval_item_dtls.at(0).patchValue({
        itemcode: "0", packing: "0", squantity: 0, quantity: 0, pricebasedon: "0",
        amount: 0, discounttype: "0", discountamt: 0, netamount: 0, taxableamount: 0, taxamount: 0, totalamt: 0
      });
      this.capacity[0] = 1;
      this.empty_bag_wt[0] = 0;
      //  this.PartyAllList = PartyallData;//customerData
      this.PartyAllList = customerData;
      this.return_approval_weight_dtl.patchValue({ ownuom: "0", partyuom: "0" });
      this.return_approval_item_dtls.at(0).patchValue({
        squantity: 0, quantity: 0,
        matwt: 0, price: 0, pricebasedon: "0", discountrate: 0, discounttype: "0", taxrate: 0
      });
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  showList(s: string) {
    if (this.returnapprovenotesave == true && this.returnapprovenoteupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.ConfirmedBy = "0";
        this.Reason = "0";
        this.return_approval_shipment_dtls.patchValue({ payaddr: "0" });
        this.return_approval_trans_info.patchValue({ transcode: "0", modeoftrans: "0", vehicleid: "0" })
        for (let i = 0; i < this.return_approval_broker_dtls.length; i++) {
          this.return_approval_broker_dtls.at(i).patchValue({ brokercode: "0" });
        }
        for (let i = 0; i < this.return_approval_party_dtls.length; i++) {
          this.return_approval_party_dtls.at(i).patchValue({ pcode: "0" });
        }
      }
    }
    if (this.returnapprovenotesave == true && this.returnapprovenoteupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.ConfirmedBy = "0";
        this.Reason = "0";
        this.return_approval_shipment_dtls.patchValue({ payaddr: "0" });
        this.return_approval_trans_info.patchValue({ transcode: "0", modeoftrans: "0", vehicleid: "0" })
        for (let i = 0; i < this.return_approval_broker_dtls.length; i++) {
          this.return_approval_broker_dtls.at(i).patchValue({ brokercode: "0" });
        }
        for (let i = 0; i < this.return_approval_party_dtls.length; i++) {
          this.return_approval_party_dtls.at(i).patchValue({ pcode: "0" });
        }
      }
    }

    if (s == "list") {
      this.returnbaseOn = '';
      this.isHidden = false;
      this.action = 'update';
      this.ConfirmedBy = "0";
      this.Reason = "0";
      this.returnapprovenotesave = true;
      this.return_approval_trans_info.patchValue({ transcode: "0", modeoftrans: "0", vehicleid: "0" })
      this.return_approval_shipment_dtls.patchValue({ payaddr: "0" });
      this.userForm.reset();
      this.return_approval_trans_info.reset();
      this.return_approval_shipment_dtls.reset();
      this.return_approval_weight_dtl.reset();
      for (let i = 0; i < this.return_approval_broker_dtls.length; i++) {
        this.return_approval_broker_dtls.at(i).patchValue({ brokercode: "0" });
      }
      for (let i = 0; i < this.return_approval_party_dtls.length; i++) {
        this.return_approval_party_dtls.at(i).patchValue({ pcode: "0" });
      }
      this.packingItem = [];
      this.selectedPackingItem = [];
      this.selectedItemName = [];
      this.item_sl_no = 0;
      while (this.return_approval_item_dtls.length)
        this.return_approval_item_dtls.removeAt(0);
      this.addItem();

      this.selectedPartyName = [];
      this.selectedContName = [];
      this.party_sl_no = 0;
      while (this.return_approval_party_dtls.length)
        this.return_approval_party_dtls.removeAt(0)
      this.addParty();

      this.broker_sl_no = 0;
      while (this.return_approval_broker_dtls.length)
        this.return_approval_broker_dtls.removeAt(0);
      this.addBroker();

      while (this.return_approval_docs.length)
        this.return_approval_docs.removeAt(0);
      this.addDocument();
    }
  }

  onChangeSalesReturnType(event, operation) {
    this.ReCriteria = this.userForm.get("returncriteria").value as FormControl;
    this.userForm.patchValue({ returncriteria: null, returnbasedon: null });
    if (event != "0") {
      this.returnbaseOn = '';
      if (operation != 'update') {
        this.status = false;
        this.DropDownListService.getRANSequenceId(this.financialYear + "/" + event).subscribe(data => {
          this.salesReturnNo = data.sequenceid;
          this.status = true;
        });
      }

      if (event == 'Acceptance of Lower Rate') {
        this.userForm.patchValue({ returncriteria: 'Full Return' });
        this.returnBaseOnList = ["Sales Invoice"];
        this.ReturnBasedOn = "Sales Invoice";
        this.editable = true;
        this.PriceReadOnly = false;
        this.PackingQty = true;
        this.onChangeReturnBasedOn(event);
      }
      else {
        this.editable = false;
        this.PriceReadOnly = false;
        this.PackingQty = false;
      }
    }
  }

  onChangeReturnCriteria(event, operation) {
    this.userForm.patchValue({ returnbasedon: null });
    this.SalesreturnType = this.userForm.get("salesreturntype").value as FormControl;
    if (event != "0") {
      this.returnbaseOn = '';
      if (this.SalesreturnType == 'Goods Return Due To Rejection' && event == 'Partial Return') {
        this.returnBaseOnList = ["Delivery Challan", "Sales Order"];
        this.editable = true;
        this.PriceReadOnly = false;
        this.PackingQty = false;
        this.onChangeReturnBasedOn(event);
      }

      else if (this.SalesreturnType == 'Goods Return Due To Rejection' && event == 'Full Return') {

        this.returnBaseOnList = ["Delivery Challan"];
        this.ReturnBasedOn = "Delivery Challan";
        this.editable = true;
        this.PriceReadOnly = true;
        this.PackingQty = true;
        this.onChangeReturnBasedOn(event);
      }
      else {
        this.editable = false;
        this.PriceReadOnly = false;
        this.PackingQty = false;
      }
    }
  }

  onChangeReturnCriteria1(SalesreturnType: string, ReturnCri: string) {
    // this.userForm.patchValue({returnbasedon:null});
    //this.SalesreturnType= this.userForm.get("salesreturntype").value as FormControl;

    this.returnbaseOn = '';
    if (SalesreturnType == 'Goods Return Due To Rejection' && ReturnCri == 'Partial Return') {
      this.returnBaseOnList = ["Delivery Challan", "Sales Order"];
      // this.editable = true;
      // this.PriceReadOnly=false;  
      // this.PackingQty = false;
      this.onChangeReturnBasedOn(ReturnCri);
    }

    else if (SalesreturnType == 'Goods Return Due To Rejection' && ReturnCri == 'Full Return') {

      this.returnBaseOnList = ["Delivery Challan"];
      this.ReturnBasedOn = "Delivery Challan";
      // this.editable = true;
      // this.PriceReadOnly=true; 
      // this.PackingQty = true;   
      this.onChangeReturnBasedOn(ReturnCri);
    }
  }

  onChangeReturnBasedOn(event) {
    if (event != 'Choose An Options')
      this.returnbaseOn = event;
    else
      this.returnbaseOn = '';
  }

  onChangeParty(party_id: string) {
    this._customerId = party_id;
    if (party_id.length && party_id != '0') {
      this.status = true;

      forkJoin(

        this.DropDownListService.getCustDelvFromList(party_id),
        this.Service.custBillAddRetriveList(party_id),
        this.DropDownListService.custBrokerRetriveList(party_id)
      ).subscribe(([custDelvData, CustAddress, brokerData]) => {
       // console.log("brokerData:" + JSON.stringify(brokerData))
        this.brokerNames[0] = brokerData;
        this.customerDelvAddList = custDelvData;
        this.return_approval_shipment_dtls.patchValue({ payaddr: this._customerId, paydetails: CustAddress["address"] });

        //console.log(this.company_state+"state:" + CustAddress["state"] + "//" + CustAddress["cp_name"])
        this.state = CustAddress["state"];
       // if (this.state == 'BIHAR') { this.statestatus = 0; }
        if (this.state == this.company_state) { this.statestatus = 0; }
        else {
          this.statestatus = 1;
        }

        this.status = true;
      });
      // this.DropDownListService.getCustDelvFromList(party_id).subscribe(custDelvData=>
      // {
      //   this.customerDelvAddList = custDelvData;
      //   this.status = true;
      // });


      this.addParty();
      this.party_sl_no = 0;
      while (this.return_approval_party_dtls.length)
        this.return_approval_party_dtls.removeAt(0);
      this.addParty();
      this.return_approval_party_dtls.at(0).patchValue({ pcode: party_id });
      this.onChangePartyName(party_id, 0);
    }
  }

  GetDeliveryBuisnessUnit(businessunit_code: string) {
    //alert(businessunit_code+","+this.sales_Order_Shipment_Dtls.get("pay_addr").value);
    if (businessunit_code != '0') {
      this.status = false;

      this.DropDownListService.getCustDelvFromAdd(this.return_approval_shipment_dtls.get("payaddr").value, businessunit_code).subscribe(data => {
        this.return_approval_shipment_dtls.patchValue({ shipdetails: data["ship_to"] });
        this.status = true;
      });
    }
  }

  onChangePartyName(party_id: string, index) {
    this.contNameList[index] = [];
    this.return_approval_party_dtls.at(index).patchValue({ cpcontact: '' });
    if (party_id != "0") {
      this.status = false;
      this.DropDownListService.custAddDtlsRetriveList(party_id, this.company_name).subscribe(contactName => {
        this.status = true;
        this.contNameList[index] = contactName;
      });
    }
  }

  onChangePartyName1(partid: string, index) {
    this.contNameList[index] = [];
    this.DropDownListService.custAddDtlsRetriveList(partid, this.company_name).subscribe(contactName => {
      this.contNameList[index] = contactName;
    });

  }

  partyId: any;
  onChangeContactName(index, event) {
    this.return_approval_party_dtls.at(index).patchValue({ cpcontact: null });
    if (event.target.value != "0") {
      this.status = false;
      this.partyId = this.return_approval_party_dtls.at(index).get("pcode").value as FormControl;
      this.DropDownListService.custContactByName(this.partyId, event.target.value, this.company_name).subscribe(data => {
        this.return_approval_party_dtls.at(index).patchValue({ cpcontact: data.mobile });
        this.status = true;
      });
    }
  }

  _total_amt: any
  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.return_approval_item_dtls.push(this.fb.group({
      slno: this.item_sl_no,
      itemcode: '',
      packing: '',
      quantity: '',
      uom: '',
      squantity: '',
      hsn_code: '',
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
      delivery_cid: ''
    }))

    this.return_approval_item_dtls.at(this.item_sl_no - 1).patchValue({
      itemcode: "0", packing: "0", squantity: 0, quantity: 0, pricebasedon: "0",
      amount: 0, discounttype: "0", discountrate: 0
    });
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      this._total_amt = this.return_approval_item_dtls.at(index).get("totalamt").value as FormControl;
      this.grandTotal = this.grandTotal - this._total_amt;
      this.userForm.patchValue({ grandtotal: this.grandTotal.toFixed(2) });
      this.packingItem.splice(index, 1);
      this.capacity.splice(index, 1);
      this.empty_bag_wt.splice(index, 1);
      this.return_approval_item_dtls.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      this.grandTotal = 0;
      alert("can't delete all rows");
      this.return_approval_item_dtls.reset();
      this.return_approval_item_dtls.at(0).patchValue({ slno: this.item_sl_no });
      this.userForm.patchValue({ grandtotal: 0.00 });
      this.return_approval_item_dtls.at(this.item_sl_no - 1).patchValue({
        itemcode: "0", packing: "0", squantity: 0, quantity: 0, pricebasedon: "0",
        amount: 0, discounttype: "0", discountamt: 0, netamount: 0, taxableamount: 0, taxamount: 0, totalamt: 0
      });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.return_approval_item_dtls.at(i - 1).patchValue({ slno: i });

  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.return_approval_broker_dtls.push(this.fb.group({
      slno: this.broker_sl_no,
      brokercode: '',
      basis: '',
      rate: ''
    }))
    for (let i = 0; i < this.return_approval_broker_dtls.length; i++) {
      this.return_approval_broker_dtls.at(i).patchValue({ brokercode: "0" });
    }
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.return_approval_broker_dtls.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.return_approval_broker_dtls.reset();
      this.return_approval_broker_dtls.at(0).patchValue({ slno: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.return_approval_broker_dtls.at(i - 1).patchValue({ slno: i });

  }

  addParty() {
    this.party_sl_no = this.party_sl_no + 1;
    this.return_approval_party_dtls.push(this.fb.group({
      slno: this.party_sl_no,
      pcode: '',
      cpname: '',
      cpcontact: ''
    }))
  }

  deleteParty(index) {
    if (this.party_sl_no > 1) {
      this.return_approval_party_dtls.removeAt(index);
      this.party_sl_no = this.party_sl_no - 1;
    }
    else {
      this.party_sl_no = 1;
      alert("can't delete all rows");
      this.return_approval_party_dtls.reset();
      this.return_approval_party_dtls.at(0).patchValue({ slno: this.party_sl_no });
    }
    for (let i = 1; i <= this.party_sl_no; i++)
      this.return_approval_party_dtls.at(i - 1).patchValue({ slno: i });
  }

  addDocument() {
    this.return_approval_docs.push(this.fb.group({
      docname: '',
    }))
  }

  deleteDocument(index) {
    if (index) { this.return_approval_docs.removeAt(index); }
    else {
      alert("Can not delete all rows");
      this.return_approval_docs.reset();
    }
  }

  onChangeBrokerName(index, event) {
    let Party = this.userForm.get("party").value
    if (event.target.value != "0") {
      this.status = false;
      this.DropDownListService.getCustomerBrokerDtls(Party, event.target.value).subscribe(data => {
        this.return_approval_broker_dtls.at(index).patchValue({
          brokername: data.ven_name,
          basis: data.basis, rate: data.rate
        });
        this.status = true;
      });
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
    // this.return_approval_item_dtls.at(index).patchValue({quantity: this._item_qty, matwt: this._item_qty - this.empty_bag_wt[index]});//changes on 10-03-2023
    this.return_approval_item_dtls.at(index).patchValue({ quantity: this._item_qty.toFixed(3), matwt: this._item_qty.toFixed(3) });


    this._mrp = this.return_approval_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.return_approval_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.return_approval_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getItemQty(itemQty, index) {
    this._packing_qty = this.return_approval_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = itemQty.target.value;

    this.return_approval_item_dtls.at(index).patchValue({ matwt: this._item_qty });

    this._mrp = this.return_approval_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.return_approval_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.return_approval_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getPrice(price, index) {
    this._packing_qty = this.return_approval_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.return_approval_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = price.target.value;
    this._priceBasedOn = this.return_approval_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.return_approval_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangePriceBasedOn(price_based_on, index) {
    this._packing_qty = this.return_approval_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.return_approval_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.return_approval_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = price_based_on.target.value;
    this._discount = this.return_approval_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getDiscount(discount, index) {
    this._packing_qty = this.return_approval_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.return_approval_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.return_approval_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.return_approval_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = discount.target.value;
    this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangeDiscountBasedOn(dis_based_on, index) {
    this._packing_qty = this.return_approval_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.return_approval_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.return_approval_item_dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.return_approval_item_dtls.at(index).get('pricebasedon').value as FormControl;
    this._discount = this.return_approval_item_dtls.at(index).get('discountrate').value as FormControl;
    this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
    this._taxrate = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangeItemName(event, index) {
    if (event.target.value) {
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterInvData1(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterPackMat(event.target.value),
        this.DropDownListService.retriveItemMasterStatInfo(event.target.value, this.company_name),
        this.DropDownListService.getItemQCDetails(event.target.value, this.company_name)
      ).subscribe(([itemData, invData, packingData, statInfoData, qcData]) => {
        this.DropDownListService.getUomName(itemData["mstock_unit"]).subscribe(data => {
          this.return_approval_item_dtls.at(index).patchValue({ uom: data.description });
          this.status = true;
        });
        this.return_approval_item_dtls.at(index).patchValue({ price: invData["mrp"] });
        this.packingItem[index] = packingData;
        this.return_approval_item_dtls.at(index).patchValue({
          taxcode: statInfoData[0].tax_code,
          taxrate: statInfoData[0].tax_rate
        });
        this.return_approval_item_dtls.at(index).patchValue({ accnorms: qcData[0].qc_code });
      });
    }
  }

  onchangeTransname(event) {
    if (event.length && event != "0") {
      this.status = false;
      this.DropDownListService.getVehicleThruTransporter(event).subscribe(data => {
        this.veh_nos = data;
        this.status = true;
      });
    }
  }

  itemId: any;
  packingQty: any;
  onChangePackingItem(event, index) {
    if (event.target.value) {
      this.status = false;
      this.itemId = this.return_approval_item_dtls.at(index).get("itemcode").value as FormControl;
      this.packingQty = this.return_approval_item_dtls.at(index).get("squantity").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name).subscribe(data => {
        this.capacity[index] = data.capacity;
        this.empty_bag_wt[index] = data.empty_big_wt;
        this._item_qty = this.capacity[index] * this.packingQty;
        this.return_approval_item_dtls.at(index).patchValue({ suom: data.uom1, quantity: this._item_qty, matwt: this._item_qty - this.empty_bag_wt[index] });
        this._mrp = this.return_approval_item_dtls.at(index).get("price").value as FormControl;
        this._priceBasedOn = this.return_approval_item_dtls.at(index).get('pricebasedon').value as FormControl;
        this._discount = this.return_approval_item_dtls.at(index).get('discountrate').value as FormControl;
        this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
        this._taxrate = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
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

    let taxdata: any = [];
    let tax_id: any;
    taxdata = this.tax_list;
    console.log("packingQty" + packingQty + "ItemQty " + ItemQty + "price" + price + "PriceBasedOn" + PriceBasedOn + "discount" + discount + "discountBasedOn" + discountBasedOn + "taxrate" + taxrate + "index" + index)
    taxdata.forEach(element => {
      console.log("taxname:" + element.tax_id + "//" + this.return_approval_item_dtls.at(index).get("taxcode").value)
      if (element.tax_id == this.return_approval_item_dtls.at(index).get("taxcode").value) {
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
          this.igstvalue = Number(this.round(Number(netAmt * (this.return_approval_item_dtls.at(index).get("taxrate").value / 100)), 2));
          // console.log("netAmt"+netAmt+"//"+this.igstvalue)
        }
        let taxamt = Number(this.cgstvalue) + Number(this.sgstvalue) + Number(this.igstvalue);
        //console.log(netAmt+"taxamt::"+taxamt)
        this.totalAmt = taxamt + netAmt;
        this.return_approval_item_dtls.at(index).patchValue({
          cgstamt: this.cgstvalue, sgstamt: this.sgstvalue, igstamt: this.igstvalue,
          taxamt: taxamt,totalamt: (Number(taxamt) + Number(netAmt)).toFixed(2)
        });


      }

    });
    this.grandTotal = 0;
    for (let y = 0; y < this.return_approval_item_dtls.length; y++) {
      this._total_amt = this.return_approval_item_dtls.at(y).get("totalamt").value as FormControl;
      this.grandTotal = Number(this.grandTotal) + Number(this._total_amt);
      this.userForm.patchValue({ grandtotal: this.grandTotal.toFixed(2) });
    }



    /* this.DropDownListService.taxlistbycode(this.return_approval_item_dtls.at(index).get("taxcode").value).subscribe(taxcode=>
       {
 
         let cgst_amt =  taxcode["cgst_act_val"];
         let sgst_amt = taxcode["sgst_act_val"];
         let igst_amt = taxcode["igst_act_val"];
 
         if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)//tax 0%
         {
              let taxamt = 0;
           
              this.return_approval_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
                   discountamt:(Math.round(this.discountAmt * 100) / 100).toFixed(2),
                   netamount: (Math.round(netAmt * 100) / 100).toFixed(2),
                   taxamt: taxamt,totalamt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
         }
         else if(cgst_amt == 0)//igst
         {
         
            // let taxamt =Number(netAmt *(this.return_approval_item_dtls.at(index).get("taxrate").value/100)).toFixed(2);
            let taxamt =Number(this.round(Number(netAmt *(this.return_approval_item_dtls.at(index).get("taxrate").value/100)),2))


             
             this.return_approval_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
             discountamt:(Math.round(this.discountAmt * 100) / 100).toFixed(2),
             netamount: (Math.round(netAmt * 100) / 100).toFixed(2),
             taxamt: taxamt,totalamt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
         }
         else//cgst and sgst
         {
            // let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
            let csgt_final=Number(this.round(Number(netAmt *(cgst_amt/100)),2));

             //let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
             let sgst_final=Number(this.round(Number(netAmt *(sgst_amt/100)),2));


             let taxamt = Number(csgt_final)+ Number(sgst_final);

             this.return_approval_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
             discountamt:(Math.round(this.discountAmt * 100) / 100).toFixed(2),
             netamount: (Math.round(netAmt * 100) / 100).toFixed(2),
             taxamt: taxamt,totalamt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
             
         }
        
         this.grandTotal = 0;
      
         for(let i=0; i<this.return_approval_item_dtls.length; i++)
         {
           this._total_amt = this.return_approval_item_dtls.at(i).get("totalamt").value as FormControl;
          // console.log(Number(this.grandTotal+this._total_amt).toFixed(2)+"_total_amt"+this._total_amt+"//"+Number(this.grandTotal).toFixed(2)+"///"+Number(this._total_amt).toFixed(2))
          //this.grandTotal = Number(this.grandTotal).toFixed(2)+Number(this._total_amt).toFixed(2);
           this.grandTotal = Number(this.grandTotal+this._total_amt).toFixed(2);
           this.userForm.patchValue({grandtotal:this.grandTotal});
         }
       });
       */


  }

  onChangePayToFromAddId(businessunit_code: string) {
    if (businessunit_code.length && businessunit_code != "0") {
      this.status = false;
      this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data => {
        this.return_approval_shipment_dtls.patchValue({ paydetails: data["add"] });
        this.status = true;
      });
    }
  }

  onChangeShipToAddId(addId: String) {
    if (addId.length && addId != "0") {
      this.status = false;
      this.DropDownListService.getCustDelvFromAdd(this._customerId, addId).subscribe(data => {
        this.return_approval_shipment_dtls.patchValue({ shipdetails: data.address })
        this.status = true;
      })
    }
  }

  onChangeBusinessUnit(event) {
    if (event.length && event != "0") {
      this.status = false;
      // this.DropDownListService.getCustomerThruBU(event).subscribe(data=>
      forkJoin(
      this.DropDownListService.getCustomerThruBUnewlist(event),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),event)
      ).subscribe(([data,companystate]) => {
        this.partyList = data;
        this.company_state=companystate["state_name"];
        this.status = true;
      });
    }
  }

  onChangeDate(event) {
    this.currentDate = event;
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  onClickShow() {

    if (this.userForm.get("jobwork").value == true) {
     // console.log("com state:"+this.company_state)
      let ReturnCriteria = this.userForm.get("returncriteria").value as FormControl;
      let SalesReturnType = this.userForm.get("salesreturntype").value as FormControl;
      this.ReturnbasedOn = this.userForm.get("returnbasedon").value as FormControl;
      let salesreturndate = this.userForm.get("salesreturndate").value as FormControl;
      let businessunit = this.userForm.get("businessunit").value as FormControl;

      this.Id = this.userForm.get("id").value;

      if (this.Id == null || this.Id == '') {
        this.Id = 0;
      }
      const dialogConfig1 = new MatDialogConfig();
      dialogConfig1.disableClose = true;
      dialogConfig1.autoFocus = true;

      dialogConfig1.data = { SalesReturnType: SalesReturnType, party_id: this._customerId, ReturnCriteria: ReturnCriteria, ReturnbasedOn: this.ReturnbasedOn, id: this.Id, salesreturndate: salesreturndate, businessunit: businessunit };

      const dialogRef = this.dialog.open(ReturnApprovalJobworkPopupComponent, dialogConfig1);
      dialogRef.afterClosed().subscribe(data => {
        if (data != '' && data["main_id"] != "0") {

          this.grandTotal = 0;
          // console.log(data["order_id"]+"main id:"+data["main_id"])
          this.userForm.patchValue({ referance_id: data.main_id });
          this.jobwork_sl_no = 0;
          this.addJobworkItem();
          this.jobpackinglist = [];
          while (this.return_approval_item_dtls_for_jobwork.length)
            this.return_approval_item_dtls_for_jobwork.removeAt(0);
          let k = 0;
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
                this.return_approval_item_dtls_for_jobwork.at(k).patchValue(data1);
                this.return_approval_item_dtls_for_jobwork.at(k).patchValue({ sl_no: k + 1 });
                k = k + 1;
              });
            }
          }
          // case of job work return done for delv challan and sales order done but invoice due as suggested by jitesh sir and avijit sir.
          if (this.ReturnbasedOn == "Sales Order") {
            this.userForm.patchValue({ referance_id: data.order_id, diliverylist: data.multi_challan });
            forkJoin(
              this.DropDownListService.getItemServiceList(this.company_name),
              this.DropDownListService.getDelvChallanMultiJobworkPrice(data["multi_challan"]),
              this.Service.custAddRetriveList(this.userForm.get("party").value),
              this.Service.taxCodeDtlsRetriveList("TC00002")
            ).subscribe(([service, saleorderjobprice, state, taxlist]) => {
              this.service_sl_no = 0;
              this.addJobworkItemservice();
              // console.log("service11:"+JSON.stringify(service))
              // console.log("service price11:"+JSON.stringify(saleorderjobprice))
              this.item_services = service;
              this.taxcodelist = taxlist;
              this.selectedService = [];

              this.totalItem = 0;
              let pk = 0;
              while (this.return_approval_item_dtls_for_jobwork_price.length) { this.return_approval_item_dtls_for_jobwork_price.removeAt(0); }
              for (let data2 of saleorderjobprice) {
                let totjobprice = 0;
                this.addJobworkItemservice();
                this.selectedService[pk] = data2["item_service"];

                totjobprice = Number(this.round(Number(data["job_price_total"]) * Number(data2["job_price"]), 2));
                let igstamt: any = 0, cgstAmount: any = 0, sgstAmount: any = 0, taxAmount: any = 0, totalAmount: any = 0;
                // if (state["state"] == "BIHAR") {
                if (state["state"] == this.company_state) {
                  cgstAmount = Number(this.round(Number(totjobprice * (data2["cgst_tax"] / 100)), 2));
                  sgstAmount = Number(this.round(Number(totjobprice * (data2["sgst_tax"] / 100)), 2));
                  igstamt = 0;
                }
                else {
                  cgstAmount = 0;
                  sgstAmount = 0;
                  igstamt = Number(this.round(Number(totjobprice * (data2["igst_tax"] / 100)), 2));
                }

                taxAmount = Number(cgstAmount) + Number(sgstAmount) + Number(igstamt);

                totalAmount = Number(taxAmount) + Number(totjobprice);

                this.return_approval_item_dtls_for_jobwork_price.at(pk).patchValue({
                  slno: pk + 1, item_service: data2["item_service"],
                  sac_code: data2["sac_code"], job_price: data2["job_price"], tax_value: totjobprice, cgst_tax: data2["cgst_tax"], cgst_amt: cgstAmount,
                  sgst_tax: data2["sgst_tax"], sgst_amt: sgstAmount, tot_amount: totalAmount, igst_tax: data2["igst_tax"], igst_amt: igstamt, taxcode: data2["taxcode"]
                });

                this.totalItem += Number(this.round(Number(totjobprice), 2));
                this._taxAmt += (Number(totalAmount) - Number(totjobprice));
                pk++;
                // console.log("amt::"+this.totalItem+"//"+totjobprice)
              }
              //console.log("amt1::"+this.totalItem)
              this.userForm.patchValue({ grandtotal: this.totalItem })
            });



            this.status = false;
            forkJoin(
              this.DropDownListService.getSalesOrderDetails(data["order_id"]),
              this.DropDownListService.getSalesOrdShipDtls(data["order_id"]),
              //this.DropDownListService.getSalesOrdTransInfo(data["order_id"]),
              this.DropDownListService.getSalesOrdIfMultiTransInfo(data["multi_challan"]),
              this.DropDownListService.getSalesOrdPartyDtls(data["order_id"]),
              this.DropDownListService.getSalesOrdBrokerDtls(data["order_id"]),
              this.DropDownListService.getDlvChallanWeightDtlsMulti(data["multi_challan"])
            ).subscribe(([salesData, shipmentdata, transData, partyData, brokerData, weigmentData]) => {
              this.return_approval_weight_dtl.patchValue({
                ownuom: weigmentData["own_uom"], owngross: weigmentData["own_gross"],
                owntare: weigmentData["own_tare"], ownnet: weigmentData["own_net"],
                ownpermitno: weigmentData["own_permit_no"], owndate: weigmentData["own_date"], ownslipno: weigmentData["own_slip_no"],
                partyuom: weigmentData["party_uom"], partygross: weigmentData["party_gross"], partytare: weigmentData["party_tare"],
                partynet: weigmentData["party_net"], partydate: weigmentData["party_date"], partyslipno: weigmentData["party_slip_no"]
              });

              this.userForm.patchValue({ salesorderno: salesData["order_no"], salesorderdate: salesData["order_date"], salesreturnrefno: salesData["order_no"], inv_type: salesData["inv_type"] });
              this.return_approval_shipment_dtls.patchValue({
                shipaddr: shipmentdata.ship_addr,
                shipdetails: shipmentdata.ship_details, payaddr: shipmentdata.pay_addr, paydetails: shipmentdata.pay_details
              });

              let i = 0;
              this.addBroker();
              this.broker_sl_no = 0;
              while (this.return_approval_broker_dtls.length)
                this.return_approval_broker_dtls.removeAt(0);

              for (let data1 of brokerData) {
                this.addBroker();
                this.return_approval_broker_dtls.at(i).patchValue({
                  brokercode: data1.broker_code,
                  basis: data1.basis, rate: data1.rate,
                });
                i = i + 1;
              }
              console.log("transData" + JSON.stringify(transData))
              this.return_approval_trans_info.patchValue({
                transborneby: transData['trans_borne_by'], modeoftrans: transData['mode_of_trans'],
                transcode: transData['trans_code'], vehicleid: transData['vehle_no'],
                chargecode: transData['charge_code'], freightamt: transData['freight_amt'], advpaid: transData['adv_paid']
              });

              let k = 0;
              this.addParty();
              this.party_sl_no = 0;
              while (this.return_approval_party_dtls.length)
                this.return_approval_party_dtls.removeAt(0);

              for (let data1 of partyData) {
                this.addParty();
                this.onChangePartyName(data1["p_code"], k);
                this.return_approval_party_dtls.at(k).patchValue({
                  pcode: data1["p_code"],
                  cpname: data1["cp_name"], cpcontact: data1["cp_contact"]
                });
                k = k + 1;
              }
            });



          }
          if (this.ReturnbasedOn == "Delivery Challan") {
            forkJoin(
              this.DropDownListService.getItemServiceList(this.company_name),
              this.DropDownListService.getDelvChallanJobworkPrice(data["main_id"]),
              this.Service.custAddRetriveList(this.userForm.get("party").value),
              this.Service.taxCodeDtlsRetriveList("TC00002"),
            ).subscribe(([service, saleorderjobprice, state, taxlist]) => {
              this.service_sl_no = 0;
              this.addJobworkItemservice();
              // console.log("service:"+JSON.stringify(service))
              //  console.log("service price:"+JSON.stringify(saleorderjobprice))
              this.item_services = service;
              this.taxcodelist = taxlist;
              this.selectedService = [];
              this.totalItem = 0;
              let pk = 0;
              while (this.return_approval_item_dtls_for_jobwork_price.length) { this.return_approval_item_dtls_for_jobwork_price.removeAt(0); }
              for (let data2 of saleorderjobprice) {
                let totjobprice = 0;
                this.addJobworkItemservice();
                this.selectedService[pk] = data2["item_service"];

                totjobprice = Number(this.round(Number(data["job_price_total"]) * Number(data2["job_price"]), 2));
                let igstamt: any = 0, cgstAmount: any = 0, sgstAmount: any = 0, taxAmount: any = 0, totalAmount: any = 0;
                //console.log("delv com state:"+this.company_state)
                //if (state["state"] == "BIHAR")
                if (state["state"] == this.company_state) {
                  cgstAmount = Number(this.round(Number(totjobprice * (data2["cgst_tax"] / 100)), 2));
                  sgstAmount = Number(this.round(Number(totjobprice * (data2["sgst_tax"] / 100)), 2));
                  igstamt = 0;
                }
                else {
                  cgstAmount = 0;
                  sgstAmount = 0;
                  igstamt = Number(this.round(Number(totjobprice * (data2["igst_tax"] / 100)), 2));
                }

                taxAmount = Number(cgstAmount) + Number(sgstAmount) + Number(igstamt);

                totalAmount = Number(taxAmount) + Number(totjobprice);

                this.return_approval_item_dtls_for_jobwork_price.at(pk).patchValue({
                  slno: pk + 1, item_service: data2["item_service"],
                  sac_code: data2["sac_code"], job_price: data2["job_price"], tax_value: totjobprice, cgst_tax: data2["cgst_tax"], cgst_amt: cgstAmount,
                  sgst_tax: data2["sgst_tax"], sgst_amt: sgstAmount, tot_amount: totalAmount, igst_tax: data2["igst_tax"], igst_amt: igstamt, taxcode: data2["taxcode"]
                });

                this.totalItem += Number(this.round(Number(totjobprice), 2));
                this._taxAmt += (Number(totalAmount) - Number(totjobprice));
                //console.log("amt122::"+this.totalItem+"//"+totjobprice)
                pk++;
              }
              //console.log("amt123::"+this.totalItem)
              this.userForm.patchValue({ grandtotal: this.totalItem })
            });



            this.status = false;
            forkJoin(
              this.DropDownListService.getDlvChallanWeightDtls(data["main_id"]),
              this.DropDownListService.getDlvChallanShipmentDtls(data["main_id"]),
              this.DropDownListService.getDlvChallanTransInfo(data["main_id"]),
              this.DropDownListService.getDlvChallanPartyDtls(data["main_id"]),
              this.DropDownListService.getDlvChallanBrokerDtls(data["main_id"]),
              this.DropDownListService.getDlvChallanDoc(data["main_id"]),
              this.DropDownListService.getDeliveryChallanDtlsFast(data["main_id"]),
            ).subscribe(([weigmentData, shipmentdata, transData, partyData, brokerData, docsData, challanData]) => {

              console.log("challanData" + JSON.stringify(challanData))
              this.userForm.patchValue({
                salesorderno: challanData["salesorderno"], salesorderdate: challanData["salesorderdate"],
                salesreturnrefno: challanData["challan_no"], inv_type: challanData["inv_type"]
              });

              this.return_approval_weight_dtl.patchValue({
                ownuom: weigmentData["own_uom"], owngross: weigmentData["own_gross"],
                owntare: weigmentData["own_tare"], ownnet: weigmentData["own_net"],
                ownpermitno: weigmentData["own_permit_no"], owndate: weigmentData["own_date"], ownslipno: weigmentData["own_slip_no"],
                partyuom: weigmentData["party_uom"], partygross: weigmentData["party_gross"], partytare: weigmentData["party_tare"],
                partynet: weigmentData["party_net"], partydate: weigmentData["party_date"], partyslipno: weigmentData["party_slip_no"]
              });

              // console.log("transData"+JSON.stringify(transData))
              // console.log("vehicle list"+JSON.stringify(this.veh_nos))
              this.return_approval_shipment_dtls.patchValue({
                shipaddr: shipmentdata.ship_addr,
                shipdetails: shipmentdata.ship_details, payaddr: shipmentdata.pay_addr, paydetails: shipmentdata.pay_details
              });

              let i = 0;
              this.addBroker();
              this.broker_sl_no = 0;
              while (this.return_approval_broker_dtls.length)
                this.return_approval_broker_dtls.removeAt(0);

              for (let data1 of brokerData) {
                this.addBroker();
                this.return_approval_broker_dtls.at(i).patchValue({
                  brokercode: data1.broker_code,
                  basis: data1.basis, rate: data1.rate,
                });
                i = i + 1;
              }

              this.return_approval_trans_info.patchValue({
                transborneby: transData['trans_borne_by'], modeoftrans: transData['mode_of_trans'],
                transcode: transData['trans_code'], vehicleid: transData['vehle_no'],
                chargecode: transData['charge_code'], freightamt: transData['freight_amt'], advpaid: transData['adv_paid']
              });

              let j = 0;
              this.addDocument();
              while (this.return_approval_docs.length)
                this.return_approval_docs.removeAt(0)

              for (let data1 of docsData) {
                this.addDocument();
                this.return_approval_docs.at(j).patchValue({ docname: data1.doc_name });
                j = j + 1;
              }

              let k = 0;
              this.addParty();
              this.party_sl_no = 0;
              while (this.return_approval_party_dtls.length)
                this.return_approval_party_dtls.removeAt(0);

              for (let data1 of partyData) {
                this.addParty();

                // this.selectedPartyName[i] = data1["pcode"];
                // this.selectedContName[i] = data1["cpname"];

                this.onChangePartyName1(data1["p_code"], k);
                this.contNameList[i] = data1["cp_name"];
                this.return_approval_party_dtls.at(k).patchValue({
                  pcode: data1["p_code"],
                  cpname: data1["cp_name"], cpcontact: data1["cp_contact"]
                });
                k = k + 1;
              }
              this.status = true;
            });



          }


        }
      });
    }
    else {


      let ReturnCriteria = this.userForm.get("returncriteria").value as FormControl;
      let SalesReturnType = this.userForm.get("salesreturntype").value as FormControl;
      this.ReturnbasedOn = this.userForm.get("returnbasedon").value as FormControl;


      this.Id = this.userForm.get("id").value;
      console.log("tuhin here  :: " + this.Id)
      if (this.Id == null || this.Id == '') {
        this.Id = 0;
        console.log("tuhin here12345 :: " + this.Id)
      }



      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      //alert(this.ReturnbasedOn)
      dialogConfig.data = { SalesReturnType: SalesReturnType, ReturnCriteria: ReturnCriteria, invoice_type: "0", party_id: this._customerId, company_id: this.company_name, date: this.currentDate, parent_model: 'Return Aproval', id: this.Id };
      if (this._customerId != "0") {

        if (this.ReturnbasedOn == 'Delivery Challan') {
          const dialogRef = this.dialog.open(DeliveryChallanPopUpComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => {
            console.log("Item :" + JSON.stringify(data))
            if (data != '' && data["delivery_cid"] != "0") {
              this.grandTotal = 0;
              this.userForm.patchValue({ referance_id: data.delivery_cid });
              this.packingItem = [];
              let i = 0;

              this.addItem();
              this.item_sl_no = 0;
              while (this.return_approval_item_dtls.length)
                this.return_approval_item_dtls.removeAt(0);

              for (let data1 of data.delivery_challan_Item_Dtls) {

                if (data1.checkbox == true || data1.checkbox == 'true') {
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                    this.packingItem[i] = packingList;

                    this.addItem();
                   /* this.return_approval_item_dtls.at(i).patchValue({
                      itemcode: data1["item_code"], packing: data1["packing"],
                      squantity: data1["squantity"], suom: data1["suom"], quantity: data1["quantity"], uom: data1["uom"],
                      price: data1["price"], matwt: data1["mat_wt"], pricebasedon: data1["price_based_on"], amount: data1["amount"],
                      discountrate: data1["discount_rate"], discounttype: data1["discount_type"], discountamt: data1["discount_amt"], hsn_code: data1["hsn_code"],
                      //taxcode: data1["tax_code"], taxrate: data1["tax_rate"], taxamt: data1["tax_amt"], accnorms: data1["acc_norms"], totalamt: data1["total_amt"]
                      taxcode: data1["tax_code"], taxrate: data1["tax_rate"], accnorms: data1["acc_norms"]
                    });
                    */
                    //tuhin new code starts here

                    let netAmt = Number(data1["amount"]) - Number(data1["discount_amt"]);
                    let taxdata:any=[];
                    let tax_id:any;
                    taxdata=this.tax_list;
                    //console.log("TAX :: "+data1["tax_code"]);
                    //console.log("JSON :: "+JSON.stringify(taxdata));
                    taxdata.forEach(element =>
                    {
                      if(element.tax_id == data1["tax_code"])
                      {
                        if(this.statestatus==0)
                        {
                          this.cgstvalue= Number(this.round((Number(netAmt*element["cgst_act_val"])/100),2));
                          this.sgstvalue= Number(this.round((Number(netAmt*element["sgst_act_val"])/100),2));
                          this.igstvalue="0";
                        }
                        else
                        {
                          this.cgstvalue='0';
                          this.sgstvalue='0';
                          this.igstvalue= Number(this.round(Number(netAmt *(Number(data1["tax_rate"])/100)),2));
                        }
                        let taxamt=Number(this.cgstvalue)+Number(this.sgstvalue)+Number(this.igstvalue);
                        this.totalAmt = taxamt + netAmt;
                        console.log("Check 1 "+this.totalAmt);
                        this.return_approval_item_dtls.at(i).patchValue({
                          itemcode: data1["item_code"], packing: data1["packing"],
                          squantity: data1["squantity"], suom: data1["suom"], quantity: Number(this.round(data1["quantity"], 3)), uom: data1["uom"],
                          price: Number(this.round(data1["price"], 2)), matwt: Number(this.round(data1["mat_wt"], 3)), pricebasedon: data1["price_based_on"], amount: Number(this.round(data1["amount"],2)),
                          discountrate: data1["discount_rate"], discounttype: data1["discount_type"], discountamt: Number(this.round(data1["discount_amt"], 2)), hsn_code: data1["hsn_code"],
                          //taxcode: data1["tax_code"], taxrate: data1["tax_rate"], taxamt: data1["tax_amt"], accnorms: data1["acc_norms"], totalamt: data1["total_amt"]
                          taxcode: data1["tax_code"], taxrate: data1["tax_rate"], accnorms: data1["acc_norms"],
                          cgstamt:this.cgstvalue,sgstamt:this.sgstvalue,igstamt:this.igstvalue,
                          taxamt: this.round(taxamt,2),totalamt:this.round(this.totalAmt,2)
                        });
                        this.grandTotal += Number(this.round(this.totalAmt,2));
                      }
                            
                    });

                   

                    //tuhin new code ends here
                    // this.calculateItemData(data1["squantity"],data1.quantity,data1.price,data1.price_based_on,data1.discount_rate,data1.discount_type,data1.tax_rate,i); 

                    
                    timer(500).subscribe
                      (x => {
                        let TotalAmtt = 0;
                        for (let i = 0; i < this.return_approval_item_dtls.length; i++) {
                          TotalAmtt += Number(this.return_approval_item_dtls.at(i).get("totalamt").value);
                        }
                        let Ttal = TotalAmtt.toFixed(2);
                        this.userForm.patchValue({ grandtotal: Ttal })
                      })

                    this.status = true;
                    i = i + 1;
                  });


                }

                this.status = false;
                forkJoin(
                  this.DropDownListService.getDlvChallanWeightDtls(data["delivery_cid"]),
                  this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanShipmentDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanTransInfo(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanPartyDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanBrokerDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanDoc(data["delivery_cid"]),
                ).subscribe(([weigmentData, challanData, shipmentdata, transData, partyData, brokerData, docsData]) => {
                  this.return_approval_weight_dtl.patchValue({
                    ownuom: weigmentData["own_uom"], owngross: weigmentData["own_gross"],
                    owntare: weigmentData["own_tare"], ownnet: weigmentData["own_net"],
                    ownpermitno: weigmentData["own_permit_no"], owndate: weigmentData["own_date"], ownslipno: weigmentData["own_slip_no"],
                    partyuom: weigmentData["party_uom"], partygross: weigmentData["party_gross"], partytare: weigmentData["party_tare"],
                    partynet: weigmentData["party_net"], partydate: weigmentData["party_date"], partyslipno: weigmentData["party_slip_no"]
                  });

                  console.log("challanData" + JSON.stringify(challanData))
                  this.userForm.patchValue({
                    salesorderno: challanData["salesorderno"], salesorderdate: challanData["salesorderdate"],
                    salesreturnrefno: challanData["challan_no"], refchallandate: challanData["challan_date"], inv_type: challanData["inv_type"]
                  });
                  this.return_approval_shipment_dtls.patchValue({
                    shipaddr: shipmentdata.ship_addr,
                    shipdetails: shipmentdata.ship_details, payaddr: shipmentdata.pay_addr, paydetails: shipmentdata.pay_details
                  });

                  let i = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while (this.return_approval_broker_dtls.length)
                    this.return_approval_broker_dtls.removeAt(0);

                  for (let data1 of brokerData) {
                    this.addBroker();
                    this.return_approval_broker_dtls.at(i).patchValue({
                      brokercode: data1.broker_code,
                      basis: data1.basis, rate: data1.rate,
                    });
                    i = i + 1;
                  }

                  this.return_approval_trans_info.patchValue({
                    transborneby: transData['trans_borne_by'], modeoftrans: transData['mode_of_trans'],
                    transcode: transData['trans_code'], vehicleid: transData['vehle_no'],
                    chargecode: transData['charge_code'], freightamt: transData['freight_amt'], advpaid: transData['adv_paid']
                  });

                  let j = 0;
                  this.addDocument();
                  while (this.return_approval_docs.length)
                    this.return_approval_docs.removeAt(0)

                  for (let data1 of docsData) {
                    this.addDocument();
                    this.return_approval_docs.at(j).patchValue({ docname: data1.doc_name });
                    j = j + 1;
                  }

                  let k = 0;
                  this.addParty();
                  this.party_sl_no = 0;
                  while (this.return_approval_party_dtls.length)
                    this.return_approval_party_dtls.removeAt(0);

                  for (let data1 of partyData) {
                    this.addParty();

                    // this.selectedPartyName[i] = data1["pcode"];
                    // this.selectedContName[i] = data1["cpname"];

                    this.onChangePartyName1(data1["p_code"], k);
                    this.contNameList[i] = data1["cp_name"];
                    this.return_approval_party_dtls.at(k).patchValue({
                      pcode: data1["p_code"],
                      cpname: data1["cp_name"], cpcontact: data1["cp_contact"]
                    });
                    k = k + 1;
                  }
                  this.status = true;
                })
              }
            }


          });
        }

        if (this.ReturnbasedOn == 'Sales Order') {
          // const dialogRef = this.dialog.open(SalesOrderPopUpComponent, dialogConfig);
          const dialogRef = this.dialog.open(SalesOrderReturnapprovalPopupComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => {
            if (data != '' && data.order_id != "0") {
              this.grandTotal = 0;
              this.userForm.patchValue({ referance_id: data.order_id, diliverylist: data.delivery_cid, parentmodel: "ReturnApproval" });
              this.packingItem = [];
              let i = 0;

              this.addItem();
              this.item_sl_no = 0;
              while (this.return_approval_item_dtls.length)
                this.return_approval_item_dtls.removeAt(0);

              for (let data1 of data.sales_Order_Item_Dtls) {
                if (data1.checkbox == true || data1.checkbox == 'true') {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                    this.packingItem[i] = packingList;
                    this.grandTotal = Number(this.grandTotal).toFixed(2) + data1["total_amt"];
                    this.addItem();
                    this.return_approval_item_dtls.at(i).patchValue({
                      itemcode: data1["item_code"], packing: data1["packing"],
                      squantity: data1["squantity"], suom: data1["suom"], quantity: data1["quantity"], uom: data1["uom"], hsn_code: data1["hsn_code"],
                      price: data1["price"], matwt: data1["mat_wt"], pricebasedon: data1["price_based_on"], amount: data1["amount"],
                      discountrate: data1["discount_rate"], discounttype: data1["discount_type"], discountamt: data1["discount_amt"],
                      taxcode: data1["tax_code"], taxrate: data1["tax_rate"], taxamt: data1["tax_amt"], accnorms: data1["acc_norms"], totalamt: data1["total_amt"]
                    });

                    this.calculateItemData(data1["squantity"], data1.quantity, data1.price, data1.price_based_on, data1.discount_rate, data1.discount_type, data1.tax_rate, i);

                    i = i + 1;
                    timer(500).subscribe
                      (x => {
                        let TotalAmtt = 0;
                        for (let i = 0; i < this.return_approval_item_dtls.length; i++) {
                          TotalAmtt += Number(this.return_approval_item_dtls.at(i).get("totalamt").value)
                        }
                        // alert("TotalAmtt: "+TotalAmtt)
                        let Ttal = TotalAmtt.toFixed(2);
                        // alert(Ttal)
                        this.userForm.patchValue({ grandtotal: TotalAmtt })
                      })
                    //this.userForm.patchValue({grandtotal: this.grandTotal})
                  });
                }
              }



              this.status = false;
              forkJoin(
                this.DropDownListService.getSalesOrderDetails(data["order_id"]),
                this.DropDownListService.getSalesOrdShipDtls(data["order_id"]),
                this.DropDownListService.getSalesOrdTransInfo(data["order_id"]),
                this.DropDownListService.getSalesOrdPartyDtls(data["order_id"]),
                this.DropDownListService.getSalesOrdBrokerDtls(data["order_id"]),
              ).subscribe(([salesData, shipmentdata, transData, partyData, brokerData]) => {
                console.log("salesData" + JSON.stringify(salesData))
                this.userForm.patchValue({ salesorderno: salesData["order_no"], salesorderdate: salesData["order_date"], salesreturnrefno: salesData["order_no"], inv_type: salesData["inv_type"] });
                this.return_approval_shipment_dtls.patchValue({
                  shipaddr: shipmentdata.ship_addr,
                  shipdetails: shipmentdata.ship_details, payaddr: shipmentdata.pay_addr, paydetails: shipmentdata.pay_details
                });

                let i = 0;
                this.addBroker();
                this.broker_sl_no = 0;
                while (this.return_approval_broker_dtls.length)
                  this.return_approval_broker_dtls.removeAt(0);

                for (let data1 of brokerData) {
                  this.addBroker();
                  this.return_approval_broker_dtls.at(i).patchValue({
                    brokercode: data1.broker_code,
                    basis: data1.basis, rate: data1.rate,
                  });
                  i = i + 1;
                }

                this.return_approval_trans_info.patchValue({
                  transborneby: transData['trans_borne_by'],
                  modeoftrans: transData['mode_of_trans'], transcode: transData['trans_code'], chargecode: transData['charge_code']
                });

                let k = 0;
                this.addParty();
                this.party_sl_no = 0;
                while (this.return_approval_party_dtls.length)
                  this.return_approval_party_dtls.removeAt(0);

                for (let data1 of partyData) {
                  this.addParty();
                  this.onChangePartyName(data1["p_code"], k);
                  this.return_approval_party_dtls.at(k).patchValue({
                    pcode: data1["p_code"],
                    cpname: data1["cp_name"], cpcontact: data1["cp_contact"]
                  });
                  k = k + 1;
                }

              })

            }
          });
        }

        if (this.ReturnbasedOn == 'Sales Invoice') {
          console.log("here invoice ")
          const dialogRef = this.dialog.open(SalesInvoicePopUpComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => {
            if (data != '' && data.invoice_id != "0") {
              this.grandTotal = 0;
              this.userForm.patchValue({ referance_id: data.invoice_id });
              this.packingItem = [];
              let i = 0;

              this.addItem();
              this.item_sl_no = 0;
              while (this.return_approval_item_dtls.length)
                this.return_approval_item_dtls.removeAt(0);

              for (let data1 of data.sales_Invoice_Item_Dtls) {
                if (data1.checkbox == true || data1.checkbox == 'true') {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                    this.packingItem[i] = packingList;
                    this.grandTotal = Number(this.grandTotal) + Number(data1["total_amt"]);
                    this.addItem();
                    this.return_approval_item_dtls.at(i).patchValue({
                      itemcode: data1["item_code"], packing: data1["packing"],
                      squantity: data1["squantity"], suom: data1["suom"], quantity: data1["quantity"], uom: data1["uom"], hsn_code: data1["hsn_code"],
                      price: data1["price"], matwt: data1["mat_wt"], pricebasedon: data1["price_based_on"], amount: data1["amount"],
                      discountrate: data1["discount_rate"], discounttype: data1["discount_type"], discountamt: data1["discount_amt"],
                      taxcode: data1["tax_code"], taxrate: data1["tax_rate"], taxamt: data1["tax_amt"], accnorms: data1["acc_norms"], totalamt: data1["total_amt"]
                    });

                    this.calculateItemData(data1["squantity"], data1.quantity, data1.price, data1.price_based_on, data1.discount_rate, data1.discount_type, data1.tax_rate, i);
                    i = i + 1;
                    timer(500).subscribe
                      (x => {
                        let TotalAmtt = 0;
                        for (let i = 0; i < this.return_approval_item_dtls.length; i++) {
                          TotalAmtt += Number(this.return_approval_item_dtls.at(i).get("totalamt").value)

                        }
                        let Ttal = TotalAmtt.toFixed(2);
                        // alert(Ttal)
                        this.userForm.patchValue({ grandtotal: Ttal })
                      })
                    // this.userForm.patchValue({grandtotal: this.grandTotal})
                  });
                }
              }

              this.status = false;
              forkJoin(
                this.DropDownListService.getSalesInvDetails(data['invoice_id']),
                this.DropDownListService.getSalesShipDtls(data["invoice_id"]),
                this.DropDownListService.getSalesInvBrkDtls(data["invoice_id"]),
                this.DropDownListService.getSalesInvDocs(data["invoice_id"]),
              ).subscribe(([invoiceData, shipmentdata, brokerData, docsData]) => {
                console.log("invoiceData" + JSON.stringify(invoiceData))
                this.userForm.patchValue({ inv_type: invoiceData["invoice_type"], salesreturnrefno: invoiceData["invoice_no"] });
                this.status = false;
                forkJoin(
                  this.DropDownListService.getDlvChallanWeightDtls(invoiceData["reference_id"]),
                  this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + invoiceData["reference_id"]),
                  //this.DropDownListService.getDeliveryChallanDtlsFast(invoiceData["reference_id"]),
                  this.DropDownListService.getDlvChallanTransInfo(invoiceData["reference_id"]),
                  this.DropDownListService.getDlvChallanPartyDtls(invoiceData["reference_id"]),
                ).subscribe(([weigmentData, challanData, transData, partyData]) => {
                  this.status = true;
                  this.return_approval_weight_dtl.patchValue({
                    ownuom: weigmentData["own_uom"], owngross: weigmentData["own_gross"],
                    owntare: weigmentData["own_tare"], ownnet: weigmentData["own_net"],
                    ownpermitno: weigmentData["own_permit_no"], owndate: weigmentData["own_date"], ownslipno: weigmentData["own_slip_no"],
                    partyuom: weigmentData["party_uom"], partygross: weigmentData["party_gross"], partytare: weigmentData["party_tare"],
                    partynet: weigmentData["party_net"], partydate: weigmentData["party_date"], partyslipno: weigmentData["party_slip_no"]
                  });

                  this.userForm.patchValue({
                    salesorderno: challanData["salesorderno"], salesorderdate: challanData["salesorderdate"],
                    refchallanno: challanData["challan_no"], refchallandate: challanData["challan_date"], salesreturnrefno: challanData["challan_no"]
                  });

                  this.return_approval_trans_info.patchValue({
                    transborneby: transData['trans_borne_by'], modeoftrans: transData['mode_of_trans'],
                    transcode: transData['trans_code'], vehicleid: transData['vehle_no'],
                    chargecode: transData['charge_code'], freightamt: transData['freight_amt'], advpaid: transData['adv_paid']
                  });

                  let k = 0;
                  this.addParty();
                  this.party_sl_no = 0;
                  while (this.return_approval_party_dtls.length)
                    this.return_approval_party_dtls.removeAt(0);

                  for (let data1 of partyData) {
                    this.addParty();
                    this.onChangePartyName(data1["p_code"], k);
                    this.return_approval_party_dtls.at(k).patchValue({
                      pcode: data1["p_code"],
                      cpname: data1["cp_name"], cpcontact: data1["cp_contact"]
                    });
                    k = k + 1;
                  }
                })

                this.return_approval_shipment_dtls.patchValue({
                  shipaddr: shipmentdata.shipaddr,
                  shipdetails: shipmentdata.shipdtls, payaddr: shipmentdata.paytoaddr, paydetails: shipmentdata.paytodtls
                });

                let i = 0;
                this.addBroker();
                this.broker_sl_no = 0;
                while (this.return_approval_broker_dtls.length)
                  this.return_approval_broker_dtls.removeAt(0);

                for (let data1 of brokerData) {
                  this.addBroker();
                  this.return_approval_broker_dtls.at(i).patchValue({
                    brokercode: data1.brokercode,
                    basis: data1.basis, rate: data1.rate,
                  });
                  i = i + 1;
                }

                let j = 0;
                this.addDocument();
                while (this.return_approval_docs.length)
                  this.return_approval_docs.removeAt(0)

                for (let data1 of docsData) {
                  this.addDocument();
                  this.return_approval_docs.at(j).patchValue({ docname: data1.doc_name });
                  j = j + 1;
                }
              })


            }
          });
        }

      }
      else { alert("Select Party First!") }
    }
  }

  showPopUp(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index };
    const dialogRef = this.dialog.open(SalesQuoTaxModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != '') {
        this.return_approval_item_dtls.at(index).patchValue({
          taxcode: data["tax_id"],
          taxrate: data["tax_rate"]
        });
        this._taxrate = data["tax_rate"];
        this._packing_qty = this.return_approval_item_dtls.at(index).get("squantity").value as FormControl;
        this._item_qty = this.return_approval_item_dtls.at(index).get("quantity").value as FormControl;
        this._mrp = this.return_approval_item_dtls.at(index).get('taxrate').value as FormControl;
        this._priceBasedOn = this.return_approval_item_dtls.at(index).get('pricebasedon').value as FormControl;
        this._discount = this.return_approval_item_dtls.at(index).get('discountrate').value as FormControl;
        this._discountBasadOn = this.return_approval_item_dtls.at(index).get('discounttype').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
      }
    });
  }

  itemCode: any;
  showPopUp2(index) {
    this.itemCode = this.return_approval_item_dtls.at(index).get('itemcode').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, item_code: this.itemCode };
    const dialogRef = this.dialog.open(SalesQcPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.return_approval_item_dtls.at(index).patchValue({ accnorms: data["qc_code"] });
    });
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
      if (this.userForm.get("salesreturntype").value == '' || this.userForm.get("salesreturntype").value == 0 || this.userForm.get("salesreturntype").value == null) {
        alert("Please Select Sales Return Type");
        this.status = true;
      }
      else if (this.userForm.get("salesreturnno").value == '' || this.userForm.get("salesreturnno").value == 0 || this.userForm.get("salesreturnno").value == null) {
        alert("Please Enter Sales Return No.");
        this.status = true;
      }
      else if (this.userForm.get("salesreturndate").value == '' || this.userForm.get("salesreturndate").value == 0 || this.userForm.get("salesreturndate").value == null) {
        alert("Please Enter Sales Return Date");
        this.status = true;
      }
      else if (this.userForm.get("businessunit").value == '' || this.userForm.get("businessunit").value == 0 || this.userForm.get("businessunit").value == null) {
        alert("Please Select Bussiness Unit Name");
        this.status = true;
      }
      else if (this.userForm.get("party").value == '' || this.userForm.get("party").value == 0 || this.userForm.get("party").value == null) {
        alert("Please Select Party Name");
        this.status = true;
      }
      else if (this.userForm.get("returncriteria").value == '' || this.userForm.get("returncriteria").value == 0 || this.userForm.get("returncriteria").value == null) {
        alert("Please Select Return Criteria");
        this.status = true;
      }
      else if (this.userForm.get("returnbasedon").value == '' || this.userForm.get("returnbasedon").value == 0 || this.userForm.get("returnbasedon").value == null) {
        alert("Please Select Return Based On");
        this.status = true;
      }
      else {
        let itemcheck = false;
        let packingcheck = false;
        let packingqtycheck = false;
        let itemqtycheck = false;
        let pricebasedonCheck = false;
        let brokernamecheck = false;
        let partynamecheck = false;


        for (let b = 0; b < this.return_approval_item_dtls.length; b++) {
          if (this.userForm.get("jobwork").value == false && (this.return_approval_item_dtls.at(b).get("itemcode").value == null || this.return_approval_item_dtls.at(b).get("itemcode").value == '' || this.return_approval_item_dtls.at(b).get("itemcode").value == 0)) {
            itemcheck = true;
          }
          if (this.userForm.get("jobwork").value == false && (this.return_approval_item_dtls.at(b).get("packing").value == null || this.return_approval_item_dtls.at(b).get("packing").value == '' || this.return_approval_item_dtls.at(b).get("packing").value == 0)) {
            packingcheck = true;
          }
          if (this.userForm.get("jobwork").value == false && (this.return_approval_item_dtls.at(b).get("squantity").value == null || this.return_approval_item_dtls.at(b).get("squantity").value == '' || this.return_approval_item_dtls.at(b).get("squantity").value == 0)) {
            packingqtycheck = true;
          }
          if (this.userForm.get("jobwork").value == false && (this.return_approval_item_dtls.at(b).get("quantity").value == null || this.return_approval_item_dtls.at(b).get("quantity").value == '' || this.return_approval_item_dtls.at(b).get("quantity").value == 0)) {
            itemqtycheck = true;
          }
          if (this.userForm.get("jobwork").value == false && (this.return_approval_item_dtls.at(b).get("pricebasedon").value == null || this.return_approval_item_dtls.at(b).get("pricebasedon").value == '' || this.return_approval_item_dtls.at(b).get("pricebasedon").value == 0)) {
            pricebasedonCheck = true;
          }
        }
        for (let b = 0; b < this.return_approval_broker_dtls.length; b++) {
          if (this.return_approval_broker_dtls.at(b).get("brokercode").value == null || this.return_approval_broker_dtls.at(b).get("brokercode").value == '' || this.return_approval_broker_dtls.at(b).get("brokercode").value == 0) {
            brokernamecheck = true;
          }
        }
        for (let b = 0; b < this.return_approval_party_dtls.length; b++) {
          if (this.return_approval_party_dtls.at(b).get("pcode").value == null || this.return_approval_party_dtls.at(b).get("pcode").value == '' || this.return_approval_party_dtls.at(b).get("pcode").value == 0) {
            partynamecheck = true;
          }
        }

        if (itemcheck == true) {
          alert("Please Select Item Name in Item Details Tab!!!"); this.status = true;
        }
        else if (packingcheck == true) {
          alert("Please Select Packing Name in Item Details Tab!!!"); this.status = true;
        }
        else if (packingqtycheck == true) {
          alert("Please Enter PACKING QTY. in Item Details Tab!!!"); this.status = true;
        }
        else if (itemqtycheck == true) {
          alert("Please Enter ITEM QTY. in Item Details Tab!!!"); this.status = true;
        }
        else if (pricebasedonCheck == true) {
          alert("Please Select Price Based On in Item Details Tab!!!"); this.status = true;
        }
        else if (brokernamecheck == true) {
          alert("Please Select BROKER NAME in Broker Details Tab!!!"); this.status = true;
        }
        else if (partynamecheck == true) {
          alert("Please Select Party Name in Party Details Tab!!!"); this.status = true;
        }
        else if (this.userForm.get("confirmedby").value == '' || this.userForm.get("confirmedby").value == null || this.userForm.get("confirmedby").value == 0) {
          alert("Please Select Confirmed By in APPROVAL Tab");
          this.status = true;
        }
        else if (this.userForm.get("approval").value == '' || this.userForm.get("approval").value == null || this.userForm.get("approval").value == 0) {
          alert("Please Select Approved in APPROVAL Tab");
          this.status = true;
        }
        else if (this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0) {
          alert("Please Select Reason in APPROVAL Tab");
          this.status = true;
        }
        else {
          if (this.Id > 0) {

            console.log("userform: " + JSON.stringify(this.userForm.value));
            this.Service.updateReturnApprovalNote(this.userForm.getRawValue(), this.Id).subscribe(data => {

              this.DropDownListService.updatesalesorder(data['id'])
              {
                alert("Return Approval Note Updated Successfully.");
                this.userForm.reset();
                this.ngOnInit();
              }
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
          }
          else {
            this.status = false;
            console.log("userform: " + JSON.stringify(this.userForm.value));
            this.Service.createReturnApprovalNote(this.userForm.getRawValue()).subscribe(data => {

              this.DropDownListService.updatesalesorder(data['id'])
              {
                alert("New Return Approval Note Created Successfully.");
                this.userForm.reset();
                this.ngOnInit();
              }

            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
          }
        }

      }

    }
  }

  onUpdate(id: any, salesreturnid: string, action) {

    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.selectedContName = [];
    this.selectedPartyName = [];
    if (action == 'view') {
      this.returnapprovenotesave = false;
    }
    else { this.returnapprovenotesave = true; }

    forkJoin(
      this.Service.retriveReturnApprovalNote(id),
      this.Service.getReturnApprovalID(salesreturnid),
      this.Service.getReturnApprovalTI(salesreturnid),
      this.Service.getReturnApprovalPD(salesreturnid),
      this.Service.getReturnApprovalD(salesreturnid),
      this.Service.getReturnApprovalWD(salesreturnid),
      this.Service.getReturnApprovalSD(salesreturnid),
      this.Service.getReturnApprovalBD(salesreturnid),
    ).subscribe(([ReturnApprovalData, itemData, transData,
      partyData, docData, weightData, shipmentData, brokerData]) => {
      this._customerId = ReturnApprovalData["party"];
      this.onChangeSalesReturnType(ReturnApprovalData["salesreturntype"], 'update');
      this.onChangeReturnCriteria1(ReturnApprovalData["salesreturntype"], ReturnApprovalData["returncriteria"])
      this.onChangeParty(ReturnApprovalData["party"]);
      this.onChangeBusinessUnit(ReturnApprovalData["businessunit"]);
      this.onChangeReturnBasedOn(ReturnApprovalData["returnbasedon"]);
      this.userForm.patchValue({
        id: ReturnApprovalData["id"], salesreturnid: ReturnApprovalData["salesreturnid"], inv_type: ReturnApprovalData["inv_type"],
        salesreturntype: ReturnApprovalData["salesreturntype"], salesreturnno: ReturnApprovalData["salesreturnno"], party: ReturnApprovalData["party"],
        salesreturndate: ReturnApprovalData["salesreturndate"], businessunit: ReturnApprovalData["businessunit"], returncriteria: ReturnApprovalData["returncriteria"],
        returnbasedon: ReturnApprovalData["returnbasedon"], salesreturnrefno: ReturnApprovalData["salesreturnrefno"], remark: ReturnApprovalData["remark"],
        confirmedby: ReturnApprovalData["confirmedby"], approval: ReturnApprovalData["approval"], reason: ReturnApprovalData["reason"], referance_id: ReturnApprovalData["referance_id"],
        grandtotal: ReturnApprovalData["grandtotal"], company_id: ReturnApprovalData["company_id"], fin_year: ReturnApprovalData["fin_year"], username: ReturnApprovalData["username"], jobwork: ReturnApprovalData["jobwork"]
      });
      //console.log("ReturnApprovalData Details: "+  JSON.stringify(ReturnApprovalData));

      //console.log("itemData Details: "+  JSON.stringify(itemData));

      if (ReturnApprovalData["inv_type"] == "INV00003") {
        this.Jobworkshow = true;
        forkJoin(
          this.DropDownListService.retriveReturnAppJobwork(ReturnApprovalData["salesreturnid"]),
          this.DropDownListService.retriveReturnAppJobworkPrice(ReturnApprovalData["salesreturnid"]),
          this.DropDownListService.getItemThruSalesThruBU_inv_type(ReturnApprovalData["businessunit"], this.company_name, ReturnApprovalData["inv_type"]),
          this.Service.taxCodeDtlsRetriveList("TC00002")
        ).subscribe(([jobData, servicedata, itemlist, taxlist]) => {
          this.taxcodelist = taxlist;
          //console.log("jobData :: "+JSON.stringify(jobData))
          //console.log("servicedata :: "+JSON.stringify(servicedata))
          //console.log("itemlist :: "+JSON.stringify(itemlist))
          //console.log("taxlist :: "+JSON.stringify(taxlist))
          this.jobitemlist = itemlist;
          let j1 = 0;
          this.addJobworkItem();
          this.jobwork_sl_no = 0;
          while (this.return_approval_item_dtls_for_jobwork.length)
            this.return_approval_item_dtls_for_jobwork.removeAt(0);

          for (let data12 of jobData) {

            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data12["job_item"]),
              this.DropDownListService.getItemPackUom(data12["job_item"], data12["job_packing"], this.company_name),
              this.DropDownListService.getJobworklist(data12["job_item"])
            ).subscribe(([packingList, capacityEmptyWt, service]) => {
              this.item_services = service;
              //console.log("jobpackinglist:"+JSON.stringify(packingList))
              this.addJobworkItem();
              this.jobpackinglist[j1] = packingList;
              this.capacity[j1] = capacityEmptyWt.capacity;
              this.empty_bag_wt[j1] = capacityEmptyWt.empty_big_wt;
              this.selectedJobItem[j1] = data12["job_item"];
              this.selectedJobPacking[j1] = data12["job_packing"];
              //console.log("packing"+data12["job_packing"])
              this.return_approval_item_dtls_for_jobwork.at(j1).patchValue({
                job_item: data12["job_item"], job_packing: data12["job_packing"],
                job_hsn: data12["job_hsn"], pack_qty: data12["pack_qty"], pack_uom: data12["pack_uom"], price_based_on: data12["price_based_on"],
                item_qty: data12["item_qty"], item_uom: data12["item_uom"], tolerance: data12["tolerance"]
              });
              j1 = j1 + 1;
              this.status = true;
            });

          }

          let j2 = 0;
          this.addJobworkItemservice();
          this.service_sl_no = 0;
          while (this.return_approval_item_dtls_for_jobwork_price.length)
            this.return_approval_item_dtls_for_jobwork_price.removeAt(0);
          for (let data11 of servicedata) {
            this.addJobworkItemservice();
            this.selectedService[j2] = data11["item_service"];
            this.return_approval_item_dtls_for_jobwork_price.at(j2).patchValue({
              item_service: data11["item_service"], sac_code: data11["sac_code"],
              job_price: data11["job_price"], tax_value: data11["tax_value"], taxcode: data11["taxcode"], cgst_tax: data11["cgst_tax"], cgst_amt: data11["cgst_amt"],
              sgst_tax: data11["sgst_tax"], sgst_amt: data11["sgst_amt"], igst_tax: data11["igst_tax"], igst_amt: data11["igst_amt"], tot_amount: data11["tot_amount"]
            });
            j2 = j2 + 1;
          }


        });
      }
      else {
        this.Jobworkshow = false;
        let k = 0;
        this.addItem();
        this.item_sl_no = 0;
        while (this.return_approval_item_dtls.length)
          this.return_approval_item_dtls.removeAt(0);
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
            this.return_approval_item_dtls.at(k).patchValue(data1);
            k = k + 1;
            this.status = true;
          });
        }
      }
      console.log("transData: " + JSON.stringify(transData));
      this.return_approval_trans_info.patchValue(transData);

      console.log("partyData: " + JSON.stringify(partyData));
      let i = 0;
      this.addParty();
      this.party_sl_no = 0;
      while (this.return_approval_party_dtls.length)
        this.return_approval_party_dtls.removeAt(0);
      for (let data1 of partyData) {
        this.status = false;
        this.DropDownListService.custAddDtlsRetriveList(data1["pcode"], this.company_name).subscribe(cName => {
          this.addParty();
          this.contNameList[i] = cName;
          this.selectedPartyName[i] = data1["pcode"];
          this.selectedContName[i] = data1["cpname"];
          this.return_approval_party_dtls.at(i).patchValue(data1);
          i = i + 1;
          this.status = true;
        });
      }

      this.addDocument();
      while (this.return_approval_docs.length)
        this.return_approval_docs.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.return_approval_docs.patchValue(docData);
      console.log("docData: " + JSON.stringify(docData));

      console.log("weightData: " + JSON.stringify(weightData));
      this.return_approval_weight_dtl.patchValue(weightData);

      this.return_approval_shipment_dtls.patchValue({
        shipdetails: shipmentData["shipdetails"],
        shipaddr: shipmentData["shipaddr"], payaddr: shipmentData["payaddr"], paydetails: shipmentData["paydetails"],
      });
      console.log("shipment Details: " + JSON.stringify(shipmentData));

      this.addBroker();
      while (this.return_approval_broker_dtls.length)
        this.return_approval_broker_dtls.removeAt(0);
      for (let data1 of brokerData)
        this.addBroker();
      this.return_approval_broker_dtls.patchValue(brokerData);
      console.log("brokerData: " + JSON.stringify(brokerData));

      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  onDelete(id: any, salesreturnid: string) {
    this.status = false;
    if (confirm("Are you sure to delete this Sales Return Approval Note?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.DropDownListService.salesReturnApprovalNoteUsage(salesreturnid).subscribe(checkSalesReturnApprovalNote => {
        // alert("bidhan here::"+checkSalesReturnApprovalNote.status);
        if (checkSalesReturnApprovalNote.status == 'No') {
          this.Service.deleteSalesReturnApprovalNotes(this.userForm.getRawValue(), id).subscribe(data => {
            //  console.log("Pur :"+data.pur_orderid);
            if (data.salesreturnid == '' || data.salesreturnid == null) {
              alert("Opps!!! Can't delete this Sales Return Approval Note !!!");
            } else {
              alert("Sales Return Approval Note deleted successfully.");
            }
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });

        }
        else {
          alert("This Sales return Approval Note is Already Used,Can not be Deleted!! ");
        }
      });
    }
    this.status = true;
  }

  search() {
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    //let party1=this.userForm1.get("party1").value;

    this.status = false;

    this.DropDownListService.searchReturnApprovalNote(fromdate, todate)  // ,party1
      .subscribe(data => {
        //console.log("Check Search :: " + JSON.stringify(data))
        this.listReturnApprovalNote = data;
        this.status = true;

      }, (error) => {
        this.status = true;
        alert("Return Approval Note Not Found !!!")
        this.listReturnApprovalNote = [];
      })
  }

  addJobworkItemservice() {
    this.service_sl_no = this.service_sl_no + 1;
    this.return_approval_item_dtls_for_jobwork_price.push(this.fb.group({
      slno: this.service_sl_no,
      item_service: '',
      sac_code: '',
      job_price: '',
      tax_value: '',
      cgst_tax: '',
      cgst_amt: '',
      sgst_tax: '',
      sgst_amt: '',
      tot_amount: '',
      igst_tax: '',
      igst_amt: '',
      taxcode: ''
    }));
    //console.log("service sl no:"+this.service_sl_no)
  }

  deleteJobworkItemservice(index) {
    if (this.service_sl_no > 1) {
      this.return_approval_item_dtls_for_jobwork_price.removeAt(index);
      this.service_sl_no = this.service_sl_no - 1;
    }
    else {
      this.service_sl_no = 1;

      alert("can't delete all rows");
      this.return_approval_item_dtls_for_jobwork_price.reset();
      this.return_approval_item_dtls_for_jobwork_price.at(0).patchValue({ sl_no: this.service_sl_no });

      this.return_approval_item_dtls_for_jobwork_price.at(this.service_sl_no - 1).patchValue({
        item_service: '',
        sac_code: '',
        job_price: '',
        tax_value: '',
        cgst_tax: '',
        cgst_amt: '',
        sgst_tax: '',
        sgst_amt: '',
        tot_amount: '',
        igst_tax: '',
        igst_amt: '',
        taxcode: ''
      });
    }

    for (let i = 1; i <= this.service_sl_no; i++)
      this.return_approval_item_dtls_for_jobwork_price.at(i - 1).patchValue({ sl_no: i });

  }



  addJobworkItem() {
    this.jobwork_sl_no = this.jobwork_sl_no + 1;
    this.return_approval_item_dtls_for_jobwork.push(this.fb.group({
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
    //console.log("job sl no:"+this.jobwork_sl_no)
  }


  deleteJobworkItem(index) {
    if (this.jobwork_sl_no > 1) {
      this.return_approval_item_dtls_for_jobwork.removeAt(index);
      this.jobwork_sl_no = this.jobwork_sl_no - 1;
    }
    else {
      this.jobwork_sl_no = 1;

      alert("can't delete all rows");
      this.return_approval_item_dtls_for_jobwork.reset();
      this.return_approval_item_dtls_for_jobwork.at(0).patchValue({ sl_no: this.jobwork_sl_no });

      this.return_approval_item_dtls_for_jobwork.at(this.jobwork_sl_no - 1).patchValue({
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
      this.return_approval_item_dtls_for_jobwork.at(i - 1).patchValue({ sl_no: i });

  }

  jobworkshow(event) {
    if (event.checked) {
      this.Jobworkshow = true;
      this.addItem();
      this.item_sl_no = 0;
      while (this.return_approval_item_dtls.length) { this.return_approval_item_dtls.removeAt(0); }
      this.packingItem = [];
      this.packingItem = [];
      this.addItem();
    }
    else {
      this.Jobworkshow = false;
      this.addJobworkItem();
      this.jobwork_sl_no = 0;
      while (this.return_approval_item_dtls_for_jobwork.length) { this.return_approval_item_dtls_for_jobwork.removeAt(0); }

      this.jobpackinglist = [];
      this.selectedJobItem = [];
      this.selectedJobPacking = [];
      this.addJobworkItem();

      this.addJobworkItemservice();
      this.service_sl_no = 0;
      while (this.return_approval_item_dtls_for_jobwork_price.length) { this.return_approval_item_dtls_for_jobwork_price.removeAt(0); }
      this.selectedService = [];
      this.addJobworkItemservice();
    }
  }

}


