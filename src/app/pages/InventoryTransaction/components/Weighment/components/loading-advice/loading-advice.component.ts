import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LoadingAdvice } from '../../../../../../Models/Weightment/loading-advice';
import { Master } from '../../../../../../service/master.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { cust_bussiness_partner } from '../../../../../../Models/CustomerModel/cust_bussiness_partner';
import { UnloadAdviceDrivingPopupComponent } from '../unload-advice-driving-popup/unload-advice-driving-popup.component';
import { SalesOrderPopUpModalComponent } from '../sales-order-pop-up-modal/sales-order-pop-up-modal.component';
import { AddNewVechilePopUpComponent } from '../add-new-vechile-pop-up/add-new-vechile-pop-up.component';
import { formatDate } from '@angular/common';
import { StockTransferPopUpModalComponent } from '../../components/stock-transfer-pop-up-modal/stock-transfer-pop-up-modal.component';
import { forkJoin, timer } from 'rxjs';
import { PurReturnApprovalNotePopUpComponent } from '../pur-return-approval-note-pop-up/pur-return-approval-note-pop-up.component';
import { LoadingAdvicePrintComponent } from '../loading-advice-print/loading-advice-print.component';
import { PageEvent } from '@angular/material';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Console } from 'console';
import { Alert } from 'selenium-webdriver';
import { SalesorderjobworkpopupComponent } from '../salesorderjobworkpopup/salesorderjobworkpopup.component';

@Component({
  selector: 'app-loading-advice',
  templateUrl: './loading-advice.component.html',
  styleUrls: ['./loading-advice.component.scss']
})

export class LoadingAdviceComponent implements OnInit {
  public userForm: FormGroup;
  submitted = false;
  listLoadingAdvice: LoadingAdvice[];
  model: LoadingAdvice = new LoadingAdvice();
  listcust_bussiness_partner: cust_bussiness_partner[];
  bussiness_partner_list: any = [];
  status = false;
  item_codes: any = [];
  seq_no: string;
  selectedItemName = [];
  selectedPackingItem: any = [];
  selectedAlterItemName = [];
  selectedAlterPackingItem: any = [];
  selectedJobItem: any = [];
  selectedJobPacking: any = [];
  isHidden: any;
  OrderId = '0';
  Load_By = "0";
  Erp_Usr_Name = "0";

  packingItem: any = [];
  UnloadinPointList: any = [];
  customerDelvAddList: any = [];
  bank_names: any = [];
  capacity: any = [];
  businesslists: any = [];
  Id: any;
  //WareHouse="0";
  veh_nos: any = [];
  acc_no: "NA"
  warehouses: any = [];
  transBrone: any = [];
  modeOfTransport: any = [];
  supplierList: any = [];
  transRate: any = [];
  payModes: any = [];
  payTerms: any = [];
  company_name: any;
  item_sl_no = 1;
  _broker_sl_no = 1;
  broker_sl_no = 1;
  party_sl_no = 1;
  job_sl_no = 1;
  currentDate: any;
  trans_codes: any = [];
  loadingPoints: any = [];
  selectedDocumentType: any;
  employeeNames: any = [];
  loadingAdviceType: any;
  action: any;
  supplier_id: any;
  financialYear: any;
  businessunit: any;
  loadingadvicesave: boolean = true;
  loadingadviceupdate: boolean = true;
  loadingadviceview: boolean = true;
  loadingadvicedelete: boolean = true;
  loadingadviceprint: boolean = true;
  salesOrderPopupStatus: boolean = false;
  vehicleno_nochange: boolean = false;
  myFiles: any = [];
  file_name: string;
  customUOMs: any = [];
  reftypedisablestat: boolean = true;
  adviceopenadive: boolean = true;
  totalElements: number = 0;
  showgstno: any;
  trans_borne_by_chgs: true;
  alter_item_codes: any = [];
  alter_packingItem: any = [];
  jobtransaction: boolean = false;
  jobtransaction1: boolean = false;
  jobpackinglist: any = [];
  jobitemlist: any = [];
  submitsave: boolean = true;
  jobworklooseitem: boolean = true;
  statusNoMsg: any = "";
  onday: boolean = true;
  document_no_list: any = [];
  DocNo:any;
  shipinformal:boolean=false;
  customerShipDtlsList:any=[];

  public userForm1: FormGroup;

  constructor(public fb: FormBuilder, private Service: Master,
    public dialog: MatDialog, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group({
      id: [''],
      advice_no: [''],
      advice_id: [''],
      advice_type: [''],
      advice_date: [''],
      bus_partner: [''],
      b_unit: [''],
      load_point: [''],
      vehicle_id: [''],
      load_by: [''],
      erp_usr_name: [''],
      ref_doc_type: [''],
      doc_no: [''],
      doc_date: [''],
      remarks: [''],
      confirmed_by: [''],
      approval: [''],
      reason: [''],
      unloading_point: [''],
      delivery_business_unit: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      referance_id: [''],
      customer: [''],
      price_term: [''],
      cust_refdocno: [''],
      supplier: [''],
      billing_req: [''],
      staticuom: [''],
      multipleloading: [''],
      jobwork: [''],
      looseitem: [''],
      payment_mode: [''],
      refraction: [''],
      pur_cust_refdocno: [''],
      pur_cust_refdocnoqty: [''],
      weight_bridge_location:[''],

      wm_loading_advice_bp_dtls: this.fb.group({
        cust_name: '',
        cust_ph: '',
        cust_fax: '',
        cust_mail: '',
        cust_add: '',
        supp_name: '',
        supp_phone: '',
        supp_fax: '',
        supp_email: '',
        supp_address: '',
        cp_desg: '',
        cp_name: '',
        cp_ph: '',
        cp_fax: '',
        cp_mail: '',
        cp_add: ''
      }),

      wm_loading_advice_doc_attch: this.fb.array([this.fb.group({
        doc_name: ''
      })]),

      wm_loading_advice_driver_dtls: this.fb.group({
        dri_part_dtls: '',
        dri_pay_remark: '',
        driver_name: '',
        phone: '',
        address: '',
        doc_type: '',
        doc_no: '',
        description: '',

      }),

      wm_loading_advice_itm_dtls: this.fb.array([this.fb.group({
        sl_no: this.item_sl_no,
        item_code: '',
        alter_item_code: '',
        packing: '',
        alter_packing: '',
        hsn_code: '',
        quantity: '',
        uom: '',
        s_quantity: '',
        s_uom: '',
        mat_wt: '',
        warehouse: '',
        stack_rack: '',
        base_qty: '',
        price: '',
        price_based_on: '',
        pricecal: '',
        amount: '',
        discount_rate: '',
        discount_type: '',
        discount_amt: '',
        tax_code: '',
        tax_rate: '',
        tax_amt: '',
        total_amt: '',
        tolerance: '',
        acc_norms: '',
        item_tolerance: '0',
        tolerance_qty: '0'
      })]),
      wm_loading_advice_Item_Dtls_for_jobwork: this.fb.array([this.fb.group({
        slno: this.job_sl_no,
        job_item: '',
        job_packing: '',
        job_hsn: '',
        pack_qty: '',
        pack_uom: '',
        price_based_on: '',
        item_qty: '',
        item_uom: '',
        mat_wt: '',
        tolerance: '',
        job_tolerance_qty: '',
        allostatus: ''
      })]),

      wm_loading_advice_trans_info: this.fb.group({
        trans_borne_by: '',
        mode_of_trans: '',
        transporter_name: '',
        transport_rate: '',
        charge_code: '',
        rate_value: '',
        mode_of_payment: '',
        payment_term: '',
        bank_name: '',
        account_name: '',
        account_no: '',
        branch: '',
        iban: '',
        bic_swift_code: '',
        adv_payment: '',
        ifsc_code: '',
        cash_limit: '',
        mobile: '',
        days: ''
        // mode_of_payment:''
      }),

      wm_loading_advice_broker_dtls: this.fb.array([this.fb.group({
        slno: this.broker_sl_no,
        broker_code: '',
        basis: '',
        rate: '',
        based_on: ''
      })]),

      wm_loading_advice_Party_Dtls: this.fb.array([this.fb.group({
        sl_no: this.party_sl_no,
        p_code: '',
        p_name: '',
        cp_name: '',
        cp_contact: '',
        send_via: ''
      })]),

      wm_loading_advice_Shipment_Dtls: this.fb.group({
        ship_addr: '',
        ship_addr_code:'',
        ship_details: '',
        pay_addr: '',
        pay_details: ''
      }),
    });

    //userForm1
    this.userForm1 = fb.group({

      order1_no: [''],
      fromdate: [''],
      todate: [''],
      bus_partner1: ['']

    });
  }

  get order1_no() { return this.userForm1.get("order1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get bus_partner1() { return this.userForm1.get("bus_partner1") as FormControl }

  get multipleloading() { return this.userForm.get("multipleloading") as FormControl }
  get jobwork() { return this.userForm.get("jobwork") as FormControl }
  get looseitem() { return this.userForm.get("looseitem") as FormControl }
  get payment_mode() { return this.userForm.get("payment_mode") as FormControl }

  get id() { return this.userForm.get("id") as FormControl }
  get advice_id() { return this.userForm.get("advice_id") as FormControl }
  get advice_no() { return this.userForm.get("advice_no") as FormControl }
  get referance_id() { return this.userForm.get("referance_id") as FormControl }
  get customer() { return this.userForm.get("customer") as FormControl }
  get advice_type() { return this.userForm.get("advice_type") as FormControl }
  get advice_date() { return this.userForm.get("advice_date") as FormControl }
  get bus_partner() { return this.userForm.get("bus_partner") as FormControl }
  get b_unit() { return this.userForm.get("b_unit") as FormControl }
  get load_point() { return this.userForm.get("load_point") as FormControl }
  get veh_no() { return this.userForm.get("veh_no") as FormControl }
  get load_by() { return this.userForm.get("load_by") as FormControl }
  get erp_usr_name() { return this.userForm.get("erp_usr_name") as FormControl }
  get ref_doc_type() { return this.userForm.get("ref_doc_type") as FormControl }
  get doc_no() { return this.userForm.get("doc_no") as FormControl }
  get doc_date() { return this.userForm.get("doc_date") as FormControl }
  get supplier() { return this.userForm.get("supplier") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get staticuom() { return this.userForm.get("staticuom") as FormControl }
  get weight_bridge_location() { return this.userForm.get("weight_bridge_location") as FormControl }
  get delivery_business_unit() { return this.userForm.get("delivery_business_unit") as FormControl }
  get unloading_point() { return this.userForm.get("unloading_point") as FormControl }
  get wm_loading_advice_doc_attch() { return this.userForm.get('wm_loading_advice_doc_attch') as FormArray; }
  get wm_loading_advice_itm_dtls() { return this.userForm.get('wm_loading_advice_itm_dtls') as FormArray; }
  get wm_loading_advice_bp_dtls() { return this.userForm.get('wm_loading_advice_bp_dtls') as FormGroup; }
  get wm_loading_advice_driver_dtls() { return this.userForm.get('wm_loading_advice_driver_dtls') as FormGroup; }
  get wm_loading_advice_trans_info() { return this.userForm.get('wm_loading_advice_trans_info') as FormGroup; }
  get wm_loading_advice_broker_dtls() { return this.userForm.get('wm_loading_advice_broker_dtls') as FormArray; }
  get wm_loading_advice_Party_Dtls() { return this.userForm.get('wm_loading_advice_Party_Dtls') as FormArray; }
  get wm_loading_advice_Shipment_Dtls() { return this.userForm.get('wm_loading_advice_Shipment_Dtls') as FormGroup; }
  get wm_loading_advice_Item_Dtls_for_jobwork() { return this.userForm.get('wm_loading_advice_Item_Dtls_for_jobwork') as FormArray; }
  ngOnInit() {
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    //   this.getProducts({ page: "0", size: "10" });
    this.loadingadvicesave = false;
    this.loadingadviceupdate = false;
    this.loadingadviceview = false;
    this.loadingadvicedelete = false;
    this.loadingadviceprint = false;
    this.jobtransaction = true;
    this.jobtransaction1 = false;
    this.shipinformal=false;

    if (accessdata.includes('loading_advice.save')) {
      this.loadingadvicesave = true;
    }
    if (accessdata.includes('loading_advice.update')) {
      this.loadingadviceupdate = true;
    }
    if (accessdata.includes('loading_advice.view')) {
      this.loadingadviceview = true;
    }
    if (accessdata.includes('loading_advice.delete')) {
      this.loadingadvicedelete = true;
    }
    if (accessdata.includes('loading_advice.print')) {
      this.loadingadviceprint = true;
    }

    this.submitsave = true;
    this.userForm.patchValue({ supplier: "0" });
    this.isHidden = false;
    this.loadingAdviceType = "";
    this.empty_bag_wt = [];
    this.Load_By = "0";
    this.Erp_Usr_Name = "0";
    this.capacity = [];
    this.packingItem = [];
    this.action = 'update';
    this.wm_loading_advice_trans_info.patchValue({ transporter_name: "0", bank_name: "0", payment_term: "0" });
    this.supplier_id = "0";
    //  this.WareHouse="0";
    this.businessunit = "0";
    this.customer_id = "0";
    this.company_name = localStorage.getItem("company_name");
    this.financialYear = localStorage.getItem("financial_year");
    this.selectedDocumentType = "Driving Licence";
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      console.log("sucess");
    }
    else {
      alert("Current date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }

    this.transBrone = ["FOR", "FOB"];
    this.modeOfTransport = ["By Air", "By Rail", "By Road", "By Ship", "By Train", "By Vehicle", "By Water", "By Other"];
    this.transRate = ["PER TRUCK", "PER UOM"];
    this.payModes = ["Cash", "Cheque", "DD", "NEFT", "RTGS"];
    this.userForm.patchValue({
      id: 0, bus_partner: "0", b_unit: "0", referance_id: "0", price_term: "0",
      cust_refdocno: '', billing_req: "0",weight_bridge_location:'Weight Bridge 2'
    });
    //starts here 
    //forkJoin(
    //this.DropDownListService.getBankLedger(),
    //this.DropDownListService.transporterNamesList(),
    //this.DropDownListService.getVehicleThruWeighment(),
    //this.Service.getCustomerBussinessPartner(),
    //  this.Service.getLoadingAdvices(),
    //this.DropDownListService.getCompanyBUMNCList(this.company_name),
    //this.DropDownListService.employeeNamesList(this.company_name),
    //this.DropDownListService.itemNamesList(),
    //this.DropDownListService.payTermNameList(),
    //this.DropDownListService.supplierNamesList(this.company_name),
    //this.Service.getCustomUoms()
    // ).subscribe(([loadingAdviceData])=>

    // {
    //  this.customUOMs=customUOMsdata;
    //console.log("loadingAdviceData::"+JSON.stringify(loadingAdviceData))
    //this.bank_names = bankData;
    //this.trans_codes = transporterData;
    //this.veh_nos = vehicleData;
    //this.listcust_bussiness_partner  = bpData;
    //this.supplierList  = supplierData;
    //  this.listLoadingAdvice  = loadingAdviceData;
    //this.businesslists  = BUMNCData;
    //this.employeeNames = employeeData;
    //this.item_codes = itemData;
    //this.payTerms = payTermData;
    //   this.status = true;
    // }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    // this.ngOnInit()});

    //ends here 
    forkJoin(
      this.DropDownListService.newcustomerList(this.company_name),
      // this.DropDownListService.getLoadingAdviceDataList(this.currentDate,this.financialYear)//getLoadingAdviceDataListfast
      this.DropDownListService.getLoadingAdviceDataListfast(this.currentDate, this.financialYear),
      this.DropDownListService.getdocumentno()
    ).subscribe(([data, loadingData, Document_no_list]) => {
      this.bussiness_partner_list = data;
      this.document_no_list = Document_no_list;
      // console.log("loadingData:" + JSON.stringify(loadingData))
      this.listLoadingAdvice = loadingData;
    });
    if (localStorage.getItem("svalue") == 'true') {
      this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
    }
    this.status = true;
  }

  OnChangeTransporterName(transporter_id: string) {
    this.wm_loading_advice_trans_info.patchValue({
      adv_payment: null, bic_swift_code: null, iban: null,
      mode_of_payment: null, payment_term: "0", bank_name: null, account_name: null,
      account_no: null, ifsc_code: null, mobile: null, branch: null, cash_limit: 0
    });
    //if(transporter_id != "0")
    if (transporter_id.length && transporter_id != "0") {
      this.status = false;
      this.DropDownListService.getTransAccount(transporter_id).subscribe(data => {
        this.onChangePaymentMode(data["mode_of_pay"]);
        this.wm_loading_advice_trans_info.patchValue({
          bic_swift_code: data["bic_swift_code"],
          iban: data["iban"], mode_of_payment: data["mode_of_pay"], payment_term: data["pay_term"],
          bank_name: data["bank_name"], account_name: data["acc_holder_name"],
          account_no: data["acc_no"], ifsc_code: data["ifsc_code"], mobile: data["mobile"],
          branch: data["branch"], cash_limit: data["cash_limit"]
        });

        if (data["mode_of_pay"] != "Cash")
          this.wm_loading_advice_trans_info.patchValue({ cash_limit: 0 })
        this.DropDownListService.getsalevehiclelist(this.wm_loading_advice_trans_info.get("transporter_name").value).subscribe(vehicleData => {
          console.log("vehicleData" + JSON.stringify(vehicleData))
          this.veh_nos = vehicleData;
        });
        this.status = true;
      });


      if (this.wm_loading_advice_trans_info.get("trans_borne_by").value == "FOR") {
        // this.DropDownListService.getsaleordercharges(transporter_id,this.userForm.get("referance_id").value).subscribe(data=>
        // {
        //   this.wm_loading_advice_trans_info.patchValue({charge_code:data['charge_code']})
        // });


      }
    }
  }

  onChangeTransBornBy(event: string) { }

  showList(s: string) {
    if (this.loadingadvicesave == true && this.loadingadviceupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        this.DocNo="0";

        this.status = false;
        forkJoin(
          this.DropDownListService.getBankLedger(),
          this.DropDownListService.transporterNamesList(),
          //this.DropDownListService.getVehicleThruWeighment(),
          this.DropDownListService.getVehicleThruWeighmentfast(),

          //this.DropDownListService.newcustomerList(this.company_name),
          this.DropDownListService.newfastcustomerList(this.company_name),
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          this.DropDownListService.employeeNamesList(this.company_name),
          //  this.DropDownListService.itemNamesList(),
          this.DropDownListService.itemNamesNewList(),
          this.DropDownListService.payTermNameList(),

          this.DropDownListService.newsupplierNamesList(this.company_name),
          this.Service.getCustomUoms()
        ).subscribe(([bankData, transporterData, vehicleData,
          bpData, BUMNCData, employeeData,
          itemData, payTermData, supplierData, customUOMsdata]) => {

          this.customUOMs = customUOMsdata;
          // console.log("loadingAdviceData::"+JSON.stringify(bankData))
          this.bank_names = bankData;
          this.trans_codes = transporterData;
          this.veh_nos = vehicleData;
          // console.log("bpData::"+JSON.stringify(bpData))
          this.listcust_bussiness_partner = bpData;
          this.supplierList = supplierData;
          //this.listLoadingAdvice  = loadingAdviceData;
          this.businesslists = BUMNCData;
          this.employeeNames = employeeData;
          //this.item_codes = itemData;
          this.payTerms = payTermData;
          if (this.userForm.get("id").value > 0) {

          }
          else {
            this.Load_By = "0";
            this.Erp_Usr_Name = "0";
            this.wm_loading_advice_trans_info.patchValue({ transporter_name: "0", bank_name: "0", payment_term: "0" });

          }

          this.vehicleno_nochange = false;
          this.DisableTransporterName = true;

          this.status = true;
        }, (error) => {
          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
          this.ngOnInit()
        });



        //this.WareHouse="0";
      }
    }
    if (this.loadingadvicesave == true && this.loadingadviceupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        this.status = false;
        this.DocNo="0";
        forkJoin(
          this.DropDownListService.getBankLedger(),
          this.DropDownListService.transporterNamesList(),
          // this.DropDownListService.getVehicleThruWeighment(),
          this.DropDownListService.getVehicleThruWeighmentfast(),
          //  this.Service.getCustomerBussinessPartner(),
          // this.DropDownListService.newcustomerList(this.company_name),
          this.DropDownListService.newfastcustomerList(this.company_name),
          //this.Service.getLoadingAdvices(),
          //this.DropDownListService.getCompanyBUMNCList(this.company_name),
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          this.DropDownListService.employeeNamesList(this.company_name),
          // this.DropDownListService.itemNamesList(),
          this.DropDownListService.itemNamesNewList(),

          this.DropDownListService.payTermNameList(),
          // this.DropDownListService.supplierNamesList(this.company_name),
          this.DropDownListService.newsupplierNamesList(this.company_name),
          this.Service.getCustomUoms()
        ).subscribe(([bankData, transporterData, vehicleData,
          bpData, loadingAdviceData, BUMNCData, employeeData,
          itemData, payTermData, supplierData, customUOMsdata]) => {
          this.customUOMs = customUOMsdata;
          //console.log("loadingAdviceData::"+JSON.stringify(loadingAdviceData))
          this.bank_names = bankData;
          this.trans_codes = transporterData;
          this.veh_nos = vehicleData;
          this.listcust_bussiness_partner = bpData;
          this.supplierList = supplierData;
          //this.listLoadingAdvice  = loadingAdviceData;
          this.businesslists = BUMNCData;
          this.employeeNames = employeeData;
          //this.item_codes = itemData;
          this.payTerms = payTermData;

          if (this.userForm.get("id").value > 0) {

          }
          else {
            this.Load_By = "0";
            this.Erp_Usr_Name = "0";
            this.wm_loading_advice_trans_info.patchValue({ transporter_name: "0", bank_name: "0", payment_term: "0" });
          }


          this.vehicleno_nochange = false;
          this.DisableTransporterName = true;
          this.status = true;
        }, (error) => {
          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
          this.ngOnInit()
        });



        //this.WareHouse="0";
      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.DocNo="0";
      this.vehicleno_nochange = false;
      this.DisableTransporterName = true;
      this.userForm.reset(this.ResetAllValues().value);
      this.packingItem = [];
      this.Load_By = "0";
      this.wm_loading_advice_trans_info.patchValue({ transporter_name: "0", bank_name: "0", payment_term: "0" });
      this.Erp_Usr_Name = "0";
      this.selectedPackingItem = [];
      this.selectedAlterItemName = [];
      this.selectedAlterPackingItem = [];
      this.selectedItemName = [];
      this.userForm.patchValue({ id: 0 })
      let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

      this.loadingadvicesave = false;
      this.loadingadviceupdate = false;
      this.loadingadviceview = false;
      this.loadingadvicedelete = false;
      this.loadingadviceprint = false;

      if (accessdata.includes('loading_advice.save')) {
        this.loadingadvicesave = true;
      }
      if (accessdata.includes('loading_advice.update')) {
        this.loadingadviceupdate = true;
      }
      if (accessdata.includes('loading_advice.view')) {
        this.loadingadviceview = true;
      }
      if (accessdata.includes('loading_advice.delete')) {
        this.loadingadvicedelete = true;
      }
      if (accessdata.includes('loading_advice.print')) {
        this.loadingadviceprint = true;
      }

    }
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      id: [''],
      advice_no: [''],
      advice_id: [''],
      advice_type: [''],
      advice_date: [''],
      bus_partner: [''],
      b_unit: [''],
      load_point: [''],
      vehicle_id: [''],
      load_by: [''],
      erp_usr_name: [''],
      ref_doc_type: [''],
      doc_no: [''],
      doc_date: [''],
      remarks: [''],
      confirmed_by: [''],
      approval: [''],
      reason: [''],
      unloading_point: [''],
      delivery_business_unit: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      referance_id: [''],
      customer: [''],
      price_term: [''],
      cust_refdocno: [''],
      supplier: [''],
      billing_req: [''],
      staticuom: [''],
      multipleloading: [''],
      jobwork: [''],
      looseitem: [''],
      payment_mode: [''],
      refraction: [''],
      pur_cust_refdocno: [''],
      pur_cust_refdocnoqty: [''],
      weight_bridge_location:[''],

      wm_loading_advice_bp_dtls: this.fb.group({
        cust_name: '',
        cust_ph: '',
        cust_fax: '',
        cust_mail: '',
        cust_add: '',
        supp_name: '',
        supp_phone: '',
        supp_fax: '',
        supp_email: '',
        supp_address: '',
        cp_desg: '',
        cp_name: '',
        cp_ph: '',
        cp_fax: '',
        cp_mail: '',
        cp_add: ''
      }),

      wm_loading_advice_doc_attch: this.fb.array([this.fb.group({
        doc_name: ''
      })]),

      wm_loading_advice_driver_dtls: this.fb.group({
        dri_part_dtls: '',
        dri_pay_remark: '',
        driver_name: '',
        phone: '',
        address: '',
        doc_type: '',
        doc_no: '',
        description: '',

      }),

      wm_loading_advice_itm_dtls: this.fb.array([this.fb.group({
        sl_no: this.item_sl_no,
        item_code: '',
        alter_item_code: '',
        packing: '',
        alter_packing: '',
        hsn_code: '',
        quantity: '',
        uom: '',
        s_quantity: '',
        s_uom: '',
        mat_wt: '',
        warehouse: '',
        stack_rack: '',
        base_qty: '',
        price: '',
        pricecal: '',
        price_based_on: '',
        amount: '',
        discount_rate: '',
        discount_type: '',
        discount_amt: '',
        tax_code: '',
        tax_rate: '',
        tax_amt: '',
        total_amt: '',
        tolerance: '',
        acc_norms: '',
        item_tolerance: '0',
        tolerance_qty: '0'
      })]),

      wm_loading_advice_Item_Dtls_for_jobwork: this.fb.array([this.fb.group({
        slno: this.job_sl_no,
        job_item: '',
        job_packing: '',
        job_hsn: '',
        pack_qty: '',
        pack_uom: '',
        price_based_on: '',
        item_qty: '',
        item_uom: '',
        mat_wt: '',
        tolerance: '',
        job_tolerance_qty: '0'
      })]),

      wm_loading_advice_trans_info: this.fb.group({
        trans_borne_by: '',
        mode_of_trans: '',
        transporter_name: '',
        transport_rate: '',
        charge_code: '',
        rate_value: '',
        mode_of_payment: '',
        payment_term: '',
        bank_name: '',
        account_name: '',
        account_no: '',
        branch: '',
        iban: '',
        bic_swift_code: '',
        adv_payment: '',
        ifsc_code: '',
        cash_limit: '',
        mobile: '',
        days: ''
        // mode_of_payment:''
      }),

      wm_loading_advice_broker_dtls: this.fb.array([this.fb.group({
        slno: this.broker_sl_no,
        broker_code: '',
        basis: '',
        rate: '',
        based_on: ''
      })]),

      wm_loading_advice_Party_Dtls: this.fb.array([this.fb.group({
        sl_no: this.party_sl_no,
        p_code: '',
        p_name: '',
        cp_name: '',
        cp_contact: '',
        send_via: ''
      })]),

      wm_loading_advice_Shipment_Dtls: this.fb.group({
        ship_addr: '',
        ship_addr_code:'',
        ship_details: '',
        pay_addr: '',
        pay_details: ''
      }),

    });

  }

  addParty() {
    this.party_sl_no = this.party_sl_no + 1;
    this.wm_loading_advice_Party_Dtls.push(this.fb.group({
      sl_no: this.party_sl_no,
      p_code: '',
      p_name: '',
      p_contact: '',
      cp_name: '',
      cp_contact: '',
      send_via: ''
    }))
  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.wm_loading_advice_broker_dtls.push(this.fb.group({
      slno: this.broker_sl_no,
      broker_code: '',
      basis: '',
      rate: '',
      based_on: ''
    }))
  }

  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.wm_loading_advice_itm_dtls.push(this.fb.group({
      sl_no: this.item_sl_no,
      item_code: '',
      alter_item_code: '',
      packing: '',
      alter_packing: '',
      hsn_code: '',
      quantity: '',
      uom: '',
      s_quantity: '',
      s_uom: '',
      mat_wt: '',
      warehouse: '',
      stack_rack: '',
      base_qty: '',
      price: '',
      pricecal: '',
      price_based_on: '',
      amount: '',
      discount_rate: '',
      discount_type: '',
      discount_amt: '',
      tax_code: '',
      tolerance: '',
      tax_rate: '',
      tax_amt: '',
      total_amt: '',
      acc_norms: '',
      item_tolerance: '0',
      tolerance_qty: '0'
    }));
  }

  deleteItem(index) {
    if (this.wm_loading_advice_itm_dtls.length > 1) {
      console.log("if" + index)
      this.wm_loading_advice_itm_dtls.removeAt(index);
      this.packingItem.splice(index, 1);
      this.selectedItemName.splice(index, 1);
      this.selectedPackingItem.splice(index, 1);
      this.alter_packingItem.splice(index, 1);
      this.selectedAlterItemName.splice(index, 1);
      this.selectedAlterPackingItem.splice(index, 1);
      this.capacity.splice(index, 1);
      this.empty_bag_wt.splice(index, 1);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      console.log("else")
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.wm_loading_advice_itm_dtls.reset();
      this.wm_loading_advice_itm_dtls.at(0).patchValue({ sl_no: this.item_sl_no });
    }

    for (let i = 1; i <= this.wm_loading_advice_itm_dtls.length; i++)
      this.wm_loading_advice_itm_dtls.at(i - 1).patchValue({ sl_no: i });

  }

  addJobItem() {
    this.job_sl_no = this.job_sl_no + 1;
    this.wm_loading_advice_Item_Dtls_for_jobwork.push(this.fb.group({
      slno: this.job_sl_no,
      job_item: '',
      job_packing: '',
      job_hsn: '',
      pack_qty: '',
      pack_uom: '',
      price_based_on: '',
      item_qty: '',
      item_uom: '',
      mat_wt: '',
      tolerance: '',
      allostatus: '',
      job_tolerance_qty: '0'
    }));
  }

  addDocument() {
    this.wm_loading_advice_doc_attch.push(this.fb.group({
      doc_name: ''
    }));
  }

  deleteDocument(index) {
    if (index) { this.wm_loading_advice_doc_attch.removeAt(index); }
    else {
      alert("can't delete all rows");
      this.wm_loading_advice_doc_attch.reset();
    }
  }

  isChecked1 = false;
  isChecked = false;
  isBankNameDisabled = false;
  onChangePaymentMode(event: string) {
    let gotbank = event
    if (gotbank == "RTGS" || gotbank == "NEFT") {
      this.isBankNameDisabled = true;
      this.isChecked = true;
    }
    else {
      this.wm_loading_advice_trans_info.patchValue({ bank_name: null });
      this.isBankNameDisabled = false;
      this.wm_loading_advice_trans_info.patchValue({ account_no: this.acc_no });
      this.isChecked = false;
      this.wm_loading_advice_trans_info.patchValue({ ifsc_code: null });
      this.wm_loading_advice_trans_info.patchValue({ account_name: null });
      this.wm_loading_advice_trans_info.patchValue({ branch: null });
      this.wm_loading_advice_trans_info.patchValue({ iban: null });
      this.wm_loading_advice_trans_info.patchValue({ bic_swift_code: null });
    }
    if (gotbank == 'Cash') { this.isChecked1 = true; }
    else { this.isChecked1 = false; }
  }

  onChangeBankName(bank_name: string) {
    if (bank_name == 'NA') { this.isChecked = false; }
    else { this.isChecked = true; }
  }

  brokerCodeList: any = [];
  customerNameList: any = [];
  contactPersonNameList: any = [];
  customer_id: any;
  onChangeBussinessPartner(cust_id: string) {

    this.supplier_id = "0";
    this.customer_id = cust_id;
    this.userForm.patchValue({ supplier: this.supplier_id });
    this.brokerCodeList = [];
    this.customerNameList = [];
    this.contactPersonNameList = [];
    this.wm_loading_advice_Shipment_Dtls.patchValue({ pay_addr: this.customer_id });
    this.wm_loading_advice_bp_dtls.patchValue({
      cust_name: null, cust_ph: null, cust_fax: null,
      cust_mail: null, cust_add: null, cp_name: null, cp_desg: null, cp_ph: null, cp_fax: null,
      cp_mail: null, cp_add: null
    });

    if (cust_id.length && cust_id != "0") {
      this.status = false;
      forkJoin(
        this.DropDownListService.custBrokerRetriveList(cust_id),
        this.DropDownListService.getCustomerAddress(cust_id),
        this.DropDownListService.getCustDelvFromList(cust_id),
        this.DropDownListService.custAddDtlsRetriveList(cust_id, this.company_name),
        this.DropDownListService.getCustDelvFromList(cust_id),
        this.Service.custBillAddRetriveList(cust_id),
        this.DropDownListService.custPayment(this.userForm.get("advice_date").value, this.userForm.get("bus_partner").value, this.userForm.get("ref_doc_type").value),
      ).subscribe(([brokerData, custData, cPersonData, customerList, custDelvData, CustAddress, CustPaymentMode]) => {
        // console.log("cPersonData:::"+JSON.stringify(cPersonData))
        if (CustPaymentMode["status"] == "Yes") {
          alert("Party Payment exceed 2 lakh amount in Cash");
          this.userForm.patchValue({ bus_partner: "" });
        }// if ends payment check
        else {
          this.brokerCodeList = brokerData;
          this.wm_loading_advice_bp_dtls.patchValue({ cust_add: custData['address'] })
          this.contactPersonNameList = cPersonData;
          this.customerNameList = customerList;
          this.customerDelvAddList = custDelvData;
          this.wm_loading_advice_Shipment_Dtls.patchValue({ pay_details: CustAddress["address"] });
        }
        this.status = true;
      });

      this.DropDownListService.getCustBPStat(cust_id).subscribe(gstdata => {
        // console.log("gstdata:"+gstdata.gst_no)
        if (gstdata.gst_no) {
          this.showgstno = 'GSTN:' + gstdata.gst_no;
        }
        else {
          this.showgstno = 'GSTN:Not Given';
        }
      });
    }
  }

  onChangeSupplier(suppid: string) {
    this.supplier_id = suppid;
    this.customer_id = "0";
    this.userForm.patchValue({ bus_partner: this.customer_id });
    this.brokerCodeList = [];
    this.customerNameList = [];
    this.contactPersonNameList = [];
    this.wm_loading_advice_bp_dtls.patchValue({
      cust_name: null, cust_ph: null, cust_fax: null,
      cust_mail: null, cust_add: null, cp_name: null, cp_desg: null, cp_ph: null, cp_fax: null,
      cp_mail: null, cp_add: null
    });
    if (suppid.length && suppid != "0") {
      this.status = false;
      this.supplier_id = suppid;
      forkJoin(
        this.DropDownListService.getBrokerListBySupplierCode(suppid),
        this.DropDownListService.getAddrById(suppid),
        this.DropDownListService.getSuppAddrById(suppid),
        this.DropDownListService.getDeliveryAddrById(suppid),
        this.Service.custShipAddDtlsRetriveList(suppid),
      ).subscribe(([brokerData, sData, customerList, cPersonData,custshippingdata]) => {
        this.brokerCodeList = brokerData;
        this.wm_loading_advice_bp_dtls.patchValue({ supp_address: sData["address"] });
        this.customerNameList = customerList;
        this.contactPersonNameList = cPersonData;
        this.customerShipDtlsList=custshippingdata;
        this.status = true;
      });
      this.DropDownListService.getSuppBPStat(suppid).subscribe(gstdata => {
        //console.log("gstdata:"+gstdata.gst_no)
        if (gstdata.gst_no) {
          this.showgstno = 'GSTN:' + gstdata.gst_no;
        }
        else {
          this.showgstno = 'GSTN:Not Given';
        }
      });
    }
  }

  /*GetDeliveryBuisnessUnit(businessunit_code: string) {
    let Bus_Partner = this.userForm.get("bus_partner").value;
    //alert(businessunit_code+","+this.sales_Order_Shipment_Dtls.get("pay_addr").value);
    if (businessunit_code != '0') {
      this.status = false;

      this.DropDownListService.getCustDelvFromAdd(Bus_Partner, businessunit_code).subscribe(data => {
        this.wm_loading_advice_Shipment_Dtls.patchValue({ ship_details: data["ship_to"] });
        this.status = true;
      });
    }
  }*/
  

  onChangeCustomerName(name: string) {
    this.wm_loading_advice_bp_dtls.patchValue({ cust_ph: null, cust_fax: null, cust_mail: null });
    if (name != "0" && this.customer_id != "0") {
      this.status = false;
      this.DropDownListService.getCustContDetails(this.customer_id, name).subscribe(data => {
        this.wm_loading_advice_bp_dtls.patchValue({ cust_ph: data.phone, cust_fax: data.fax, cust_mail: data.email });
        this.status = true;
      });
    }
  }

  onChangeSuppInfoName(name: String) {
    this.wm_loading_advice_bp_dtls.patchValue({ supp_phone: null, supp_fax: null, supp_email: null });
    if (name != "0" && this.supplier_id != "0") {
      this.status = false;
      this.DropDownListService.getSupplierContDetails(this.supplier_id, name).subscribe(data => {
        this.wm_loading_advice_bp_dtls.patchValue({
          supp_phone: data["phone"],
          supp_fax: data["fax"], supp_email: data["email"]
        });
        this.status = true;
      });
    }
  }

  onChangeContactPersonName(name: string) {
    // console.log("name::"+name+"cust id::"+this.customer_id)
    this.wm_loading_advice_bp_dtls.patchValue({ cp_desg: null, cp_ph: null, cp_fax: null, cp_mail: null, cp_add: null });
    if (name != "0" && this.customer_id != "0") {
      this.status = false;
      this.DropDownListService.getCustDelvFromAdd(this.customer_id, name).subscribe(data => {
        // console.log("name::"+name+"data::"+JSON.stringify(data))
        this.wm_loading_advice_bp_dtls.patchValue({
          cp_desg: data.designation, cp_ph: data.phone,
          cp_fax: data.fax, cp_mail: data.email, cp_add: data.address
        });
        this.status = true;
      });
    }
  }

  onChangeContInfoName(event) {
    this.wm_loading_advice_bp_dtls.patchValue({ cp_desg: null, cp_ph: null, cp_fax: null, cp_mail: null, cp_add: null });
    if (event != '0' && this.supplier_id != "0") {
      this.status = false;
      this.DropDownListService.getSupplierDelvFromAdd(this.supplier_id, event).subscribe(data => {
        this.wm_loading_advice_bp_dtls.patchValue({
          cp_desg: data["designation"],
          cp_ph: data["phone"], cp_fax: data["fax"],
          cp_mail: data["email"], cp_add: data["address"]
        });
        this.status = true;
      });
    }
  }

  onChangeDriverName(driver_id: String) {
    this.wm_loading_advice_driver_dtls.patchValue({
      phone: null, address: null,
      identity: null, doc_type: null, doc_no: null
    });
    if (driver_id != "0") {
      this.status = false;
      this.DropDownListService.DriverDetails(driver_id).subscribe(data => {
        this.status = true;
        this.wm_loading_advice_driver_dtls.patchValue({
          phone: data["phone_no"], address: data["address"],
          identity: data["identity"], doc_type: data["doc_type"], doc_no: data["doc_no"]
        });
      });
    }
  }

  vehicleId = '0';
  driverNameList: any = [];
  onChangeVehicleNo(vehicle_id: string) {
    this.vehicleId = '0';
    // this.driverNameList = [];
    // console.log(" id " + this.userForm.get("id").value)

    if (vehicle_id.length && vehicle_id != "0") {
      this.status = false;
      if (this.userForm.get("id").value > 0) {



        this.DropDownListService.getDriverByVehicle(vehicle_id).subscribe(data => {
          let name = this.wm_loading_advice_driver_dtls.get("driver_name").value;
          // console.log("tuhin"+this.wm_loading_advice_driver_dtls.get("driver_name").value);
          this.driverNameList = data;
          this.wm_loading_advice_driver_dtls.patchValue({ driver_name: name })
          this.status = true;
        });
      }
      else {
        //console.log("inside ")
        this.DropDownListService.checkVehicleNoWeighment(vehicle_id, "Loading").subscribe(data => {
          this.status = true;
          //starts here
          if (data["status"] == 'No') {
            this.vehicleId = vehicle_id;
            this.DropDownListService.getDriverByVehicle(vehicle_id).subscribe(data => {
              this.driverNameList = data;
              this.status = true;
            });
          }
          else {
            alert("Vehicle No Already Exists in Weighment")
            this.userForm.patchValue({ vehicle_id: '' });

          }
          //ends here
        });

      }

      //  console.log("tuhin ends here")         
    }
  }

  referenceType: any;
  onChangeAdviceType(advice_type: string) {
    this.loadingAdviceType = advice_type;
    this.getLoadingAdviceNo(this.currentDate, this.loadingAdviceType)
    this.userForm.patchValue({ ref_doc_type: null });
    if (advice_type != "0") {
      if (advice_type == "Sale") {
        this.reftypedisablestat = false;
        //this.userForm.patchValue({ref_doc_type: "Sales Order"});
        //this.referenceType = 'Sales Order';
        //console.log( "check "+this.reftypedisablestat)
      }
      else {
        this.userForm.patchValue({ ref_doc_type: advice_type });
        this.referenceType = advice_type;
        // console.log("this.referenceType " +this.referenceType)
        this.reftypedisablestat = true;
      }
    }

    this.addItem();
    this.item_sl_no = 0;
    while (this.wm_loading_advice_itm_dtls.length)
      this.wm_loading_advice_itm_dtls.removeAt(0);
    this.addItem();

    this.addBroker();
    this.broker_sl_no = 0;
    while (this.wm_loading_advice_broker_dtls.length)
      this.wm_loading_advice_broker_dtls.removeAt(0);
    this.addBroker();

    this.addParty();
    this.party_sl_no = 0;
    while (this.wm_loading_advice_Party_Dtls.length)
      this.wm_loading_advice_Party_Dtls.removeAt(0);
    this.addParty();

    this.userForm.patchValue({ remarks: null, confirmed_by: null, approval: null, reason: null });

    this.wm_loading_advice_trans_info.reset();
    this.wm_loading_advice_Shipment_Dtls.reset();
  }

  onChangeref_doc_type(ref_doc_type: string) {
    let advice_type = this.userForm.get("advice_type").value;
    //console.log("hi " + advice_type)
    if (advice_type == 'Sale') {
      if (ref_doc_type == 'Purchase Return') {
        alert("Reference Type cant be Purchase Return if Advice type is selected as Sale Order");
        // console.log("ref_doc_type" + ref_doc_type);
        this.userForm.patchValue({ ref_doc_type: null });
      }
      else if (ref_doc_type == 'Stock Transfer') {
        alert("Reference Type cant be Stock Transfer if Advice type is selected as Sale Order");
        // console.log("ref_doc_type " +ref_doc_type);
        this.userForm.patchValue({ ref_doc_type: null });
      }
      else {


      }


      if (ref_doc_type == 'Open Advice') {
        this.adviceopenadive = true;
      }
      else {
        this.adviceopenadive = false;
      }

      // advice_type
    }
  }

  onChangeLoadingAdviceDate(adviceDate) {
    // this.currentDate = adviceDate.target.value;
    // if(this.loadingAdviceType != "")
    // {this.getLoadingAdviceNo(this.currentDate, this.loadingAdviceType)}
    this.currentDate = adviceDate.target.value;

    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
      if (this.loadingAdviceType != "0") { this.getLoadingAdviceNo(this.currentDate, this.loadingAdviceType) }
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  getLoadingAdviceNo(loadingDate, loadingType) {
    this.status = false;
    this.DropDownListService.getLASequenceId("LA/" + loadingDate + "/" + loadingType).subscribe(data => {
      this.seq_no = data.sequenceid;
      this.status = true;
    });
  }

  onChangeBussinessUnit(buss_id: string) {
    this.businessunit = buss_id;
    //  this.warehouses = [];
    //console.log("here watch");
    if (buss_id.length && buss_id != "0") {
      this.status = false;
      this.DropDownListService.getWHListbyBUnit(buss_id).subscribe(wareData => {
        this.DropDownListService.getLoadingPointThruBU(buss_id).subscribe(loadingPointData => {
          this.warehouses = wareData;
          this.loadingPoints = loadingPointData;
          if ((this.userForm.get("advice_type").value == 'Stock Transfer' && (this.userForm.get("delivery_business_unit").value == null || this.userForm.get("delivery_business_unit").value == "")) || (this.userForm.get("b_unit").value == null || this.userForm.get("b_unit").value == "" || this.userForm.get("b_unit").value == 0)) {
            alert("Please Click Show Button")
            this.status = true;
          }
          this.status = true;
        });
      });
    }

  }

  onChangeDelvBusinessUnit(event) {
    if (event != "0") {
      this.status = false;
      this.DropDownListService.getLoadingPointThruBU(event).subscribe(unloadPointData => {
        this.UnloadinPointList = unloadPointData;
        this.status = true;
      });
    }
  }

  stackList: any = [];
  onChangeWarehouse(event, index) {
    if (event.length) {
      this.status = false;
      this.DropDownListService.getBinDescByWarehouse(event).subscribe(data => {
        this.stackList[index] = data;
        this.status = true;
      });
    }
  }
  getJobPackingQty(packingQty, index) {

    let itemQty: any;
    let alluom: any = [];
    alluom = JSON.parse(localStorage.getItem("ALLUOM"));

    if (this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("item_uom").value == "PCS") {
      itemQty = this.round((this.capacity[index] * packingQty.target.value), 0);
    }
    else {
      alluom.forEach(element => {
        if (element.description == this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("item_uom").value) {

          //itemQty =  Number(this.capacity[index] * packingQty.target.value).toFixed(Number(element.decimalv));
          itemQty = this.round(Number(this.capacity[index] * packingQty.target.value), Number(element.decimalv));
        }
      });

    }
    /*console.log("achu "+itemQty)
    //this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: itemQty, job_tolerance_qty: itemQty });

    // console.log(itemQty + " / " + this.capacity[index] + " /  " + this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("item_uom").value)
     if (this.userForm.get("id").value > 0) {
       this.DropDownListService.getLoadingRestWeightJobworkupdate(this.userForm.get("referance_id").value,
         this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_item").value, itemQty,
         this.userForm.get("advice_id").value,
         this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_packing").value,
         this.userForm.get("bus_partner").value).subscribe(data => {
           if (data["status"] == 'Yes') {
 
             //this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: itemQty, allostatus: 'Yes'});
             this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: itemQty, allostatus: 'Yes' , job_tolerance_qty: itemQty});
           }
           if (data["status"] == 'No') {
             alert("Packing Quantity Exceeded From Sales Order Quantity ")
             this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: '0.00', pack_qty: '0.00', job_tolerance_qty: '0.00' });
           }
           this.status = true;
         });
     }
     else {
       this.DropDownListService.getLoadingRestWeightJobwork(this.userForm.get("referance_id").value, this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_item").value, itemQty,
       this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_packing").value, this.userForm.get("bus_partner").value).subscribe(data => {
         // this.DropDownListService.getLoadingRestWeightJobworkrectify(this.userForm.get("referance_id").value,this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_item").value,itemQty,this.userForm.get("pur_cust_refdocno").value
           console.log("CHECK : : " + data["status"])
           if (data["status"] == 'Yes') {
            //this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: itemQty, allostatus: 'Yes'}); 
            this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: itemQty, allostatus: 'Yes' , job_tolerance_qty: itemQty});
 
           }
           if (data["status"] == 'No') {
             alert("Packing Quantity Exceeded From Sales Order Quantity ")
             this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: '0.00', pack_qty: '0.00' , job_tolerance_qty: '0.00'});
           }
           this.status = true;
         });
 
     }
     */
  }


  getJobItemQty(itemQty, index) {
    this._item_qty = itemQty.target.value;
    if (Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_tolerance_qty").value) < this._item_qty) {
      alert("Item Quantity Exceeded From Sales Order Quantity ")
      this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: '0.00', pack_qty: '0.00' });
    }
    else {
      if (this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("price_based_on").value == "Item")//price_based_on
      {
        console.log("tolerance: " + this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("tolerance").value)
        console.log("Jobwork tolerance: " + this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_tolerance_qty").value)
       
        console.log("Qty Pur: : " + this.userForm.get("pur_cust_refdocnoqty").value)
        /* let actualitemqty = Number(Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_tolerance_qty").value)
          / (100 + Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("tolerance").value))) * 100; */

        let actualitemqty = Number(this.userForm.get("pur_cust_refdocnoqty").value);

        // console.log("actualitemqty :: " + actualitemqty)
        //let mintolerence: number = Number(actualitemqty) * (100 - Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("tolerance").value)) / 100;
        let mintolerence: number = Number(actualitemqty);
        let minstatus: boolean = false;

        //minstatus = Number(this._item_qty) >= mintolerence;
        minstatus = Number(this._item_qty) <= mintolerence;
        if (minstatus == true) {
          this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ pack_qty: this.round(Number(this._item_qty) / Number(this.capacity[index]), 0), allostatus: 'Yes' });
        }
        else {
          //alert("Item Quantity Must Be In Range Of " + mintolerence + " To " + this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_tolerance_qty").value);
          alert("Item Quantity Must Be In Range Of " + mintolerence);
          this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: '0.00', pack_qty: '0.00' });
        }
      }
      else {
        let actualitemqty = Number(Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_tolerance_qty").value)
          / (100 + Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("tolerance").value))) * 100;
        // console.log("actualitemqty :: " + actualitemqty)
        let mintolerence: number = Number(actualitemqty) * (100 - Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("tolerance").value)) / 100;
        let minstatus: boolean = false;

        minstatus = Number(this._item_qty) >= mintolerence;
        if (minstatus == true) {
          this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ pack_qty: this.round(Number(this._item_qty) / Number(this.capacity[index]), 0), allostatus: 'Yes' });
        }
        else {
          alert("Item Quantity Must Be In Range Of " + mintolerence + " To " + this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_tolerance_qty").value);
          this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_qty: '0.00', pack_qty: '0.00' });
        }


      }
    }
  }

  calItemQty(packing_qty, index) {
    if (this.userForm.get("refraction").value) {
      let alluom: any = [];
      alluom = JSON.parse(localStorage.getItem("ALLUOM"));
      //if later structure changes then do work below
      if (this.userForm.get("id").value > 0) {

      }
      else {

      }
      this.calculateItemData(index);
    }
    else {

      let itemQty: any;
      let alluom: any = [];
      alluom = JSON.parse(localStorage.getItem("ALLUOM"));
      //vineet Starts
      if (this.wm_loading_advice_itm_dtls.at(index).get("uom").value == "PCS") {
        itemQty = Math.round(this.capacity[index] * packing_qty.target.value);
      }
      else {
        alluom.forEach(element => {
          if (element.description == this.wm_loading_advice_itm_dtls.at(index).get("uom").value) {
            itemQty = Number(this.capacity[index] * packing_qty.target.value).toFixed(Number(element.decimalv));
          }
        });

      }
      //vineet ends

      if (this.userForm.get("looseitem").value == true || this.userForm.get("looseitem").value == 'true') {
        if (this.userForm.get("ref_doc_type").value == 'Open Advice') {
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: itemQty, mat_wt: itemQty, tolerance_qty: itemQty });
        }
        else {
          if (this.userForm.get("id").value > 0) {
            this.DropDownListService.getLoadingRestWeightupdatelooseitem(this.userForm.get("referance_id").value, this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, itemQty, this.userForm.get("advice_id").value, this.wm_loading_advice_itm_dtls.at(index).get("packing").value).subscribe(data => {
              console.log(data["status"])
              if (data["status"] == 'Yes') {
                console.log("chk Value Yes : " + itemQty)
                this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: itemQty, mat_wt: itemQty, tolerance_qty: itemQty });
                this.calculateItemData(index);
              }
              if (data["status"] == 'No') {
                console.log("chk Value No : " + itemQty)
                alert("Packing Quantity Exceeded From Sales Order Quantity ")
                this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
              }
              this.status = true;
            });
          }
          else {
            this.DropDownListService.getLoadingRestWeight(this.userForm.get("referance_id").value, this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, itemQty).subscribe(data => {
              if (data["status"] == 'Yes') {
                this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: itemQty, mat_wt: itemQty, tolerance_qty: itemQty });
                this.calculateItemData(index);
              }
              if (data["status"] == 'No') {
                alert("Packing Quantity Exceeded From Sales Order Quantity ")
                this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
              }
              this.status = true;
            });
          }
        }
      }
      else {
        if (this.userForm.get("ref_doc_type").value == 'Open Advice') {
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: itemQty, mat_wt: itemQty, tolerance_qty: itemQty });
        }
        else {
          if (this.userForm.get("id").value > 0) {
            this.DropDownListService.getLoadingRestWeightupdate(this.userForm.get("referance_id").value,
              this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, itemQty,
              this.userForm.get("advice_id").value,
              this.wm_loading_advice_itm_dtls.at(index).get("packing").value, this.wm_loading_advice_itm_dtls.at(index).get("alter_item_code").value,
              this.wm_loading_advice_itm_dtls.at(index).get("alter_packing").value).subscribe(data => {
                if (data["status"] == 'Yes') {
                  console.log("chk Value Yes : " + itemQty)
                  this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: itemQty, mat_wt: itemQty, tolerance_qty: itemQty });
                  this.calculateItemData(index);
                }
                if (data["status"] == 'No') {
                  console.log("chk Value No : " + itemQty)
                  alert("Packing Quantity Exceeded From Sales Order Quantity ")
                  this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
                }
                this.status = true;
              });
          }
          else {
            this.DropDownListService.getLoadingRestWeight(this.userForm.get("referance_id").value,
              this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, itemQty).subscribe(data => {
                if (data["status"] == 'Yes') {
                  console.log("chk Value Yes New : " + itemQty)
                  this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: itemQty, mat_wt: itemQty, tolerance_qty: itemQty });
                  this.calculateItemData(index);
                }
                if (data["status"] == 'No') {
                  console.log("chk Value No New: " + itemQty)
                  alert("Packing Quantity Exceeded From Sales Order Quantity ")
                  this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
                }
                this.status = true;
              });
          }
        }
      }
      this.calculateItemData(index);
    }

  }

  _item_qty: any;
  getItemQty(itemQty, index) {
    if (this.userForm.get("refraction").value) {

      if (Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) < Number(this.wm_loading_advice_itm_dtls.at(index).get("quantity").value)) {
        alert("Item Quantity Must Be Below or equal to " + this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value);
        this.wm_loading_advice_itm_dtls.at(index).patchValue({
          mat_wt: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value).toFixed(3),
          quantity: this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value
        });
        this.calculateItemData(index);
      }
      else {
        this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(itemQty.target.value).toFixed(3) });
        this.calculateItemData(index);
      }


    }
    else {
      this._item_qty = itemQty.target.value;
      if (this.userForm.get("ref_doc_type").value == 'Open Advice') {
        //start
        let mintolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 - Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;
        let maxtolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 + Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;

        let minstatus: boolean = false;
        let maxstatus: boolean = false;
        minstatus = Number(this._item_qty) >= mintolerence;
        maxstatus = Number(this._item_qty) <= maxtolerence;
        if (maxstatus == true && minstatus == true) {
          //this.wm_loading_advice_itm_dtls.at(index).patchValue({s_quantity: itemQty, mat_wt: itemQty,tolerance_qty:itemQty.toFixed(3)});
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this._item_qty).toFixed(3), s_quantity: (Number(this._item_qty) / Number(this.capacity[index])).toFixed(3) });
          this.calculateItemData(index);
          this.submitsave = false;
        }
        else {
          alert("Item Quantity Must Be In Range Of " + mintolerence + " To " + maxtolerence);
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value).toFixed(3), s_quantity: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) / Number(this.capacity[index]), quantity: this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value });
          this.submitsave = true;

        }
      }
      else {


        if (this.userForm.get("id").value > 0) {

          if (this.userForm.get("looseitem").value == true || this.userForm.get("looseitem").value == 'true') {
            this.DropDownListService.getLoadingRestWeightupdatelooseitem(this.userForm.get("referance_id").value, this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, itemQty.target.value, this.userForm.get("advice_id").value, this.wm_loading_advice_itm_dtls.at(index).get("packing").value).subscribe(data => {
              console.log(data["status"])
              if (data["status"] == 'Yes') {
                //start
                let mintolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 - Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;
                let maxtolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 + Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;

                let minstatus: boolean = false;
                let maxstatus: boolean = false;
                minstatus = Number(this._item_qty) >= mintolerence;
                maxstatus = Number(this._item_qty) <= maxtolerence;
                if (maxstatus == true && minstatus == true) {

                  this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this._item_qty).toFixed(3), s_quantity: Math.round(Number(this._item_qty) / Number(this.capacity[index])) });
                  this.calculateItemData(index);
                  this.submitsave = false;
                }
                else {
                  alert("Item Quantity Must Be In Range Of " + mintolerence + " To " + maxtolerence);
                  this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value).toFixed(3), s_quantity: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) / Number(this.capacity[index]), quantity: this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value });
                  this.submitsave = true;
                }
              }
              if (data["status"] == 'No') {
                alert("Packing Quantity Exceeded From Sales Order Quantity ")
                this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
                this.submitsave = true;
              }
            });


          }
          else {
            this.DropDownListService.getLoadingRestWeightupdate(this.userForm.get("referance_id").value,
              this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, itemQty.target.value,
              this.userForm.get("advice_id").value, this.wm_loading_advice_itm_dtls.at(index).get("packing").value,
              this.wm_loading_advice_itm_dtls.at(index).get("alter_item_code").value,
              this.wm_loading_advice_itm_dtls.at(index).get("alter_packing").value).subscribe(data => {
                if (data["status"] == 'Yes') {
                  //start
                  let mintolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 - Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;
                  let maxtolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 + Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;

                  let minstatus: boolean = false;
                  let maxstatus: boolean = false;
                  minstatus = Number(this._item_qty) >= mintolerence;
                  maxstatus = Number(this._item_qty) <= maxtolerence;
                  if (maxstatus == true && minstatus == true) {
                    //this.wm_loading_advice_itm_dtls.at(index).patchValue({s_quantity: itemQty, mat_wt: itemQty,tolerance_qty:itemQty.toFixed(3)});
                    //this.wm_loading_advice_itm_dtls.at(index).patchValue({mat_wt: Number(this._item_qty).toFixed(3),s_quantity:(Number(this._item_qty)/Number(this.capacity[index])).toFixed(3)});//bcz packing was comming in dec fig
                    //this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this._item_qty).toFixed(3), s_quantity: Math.round(Number(this._item_qty) / Number(this.capacity[index])) });
                    this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this._item_qty).toFixed(3)});
                    this.calculateItemData(index);
                    this.submitsave = false;
                  }
                  else {
                    alert("Item Quantity Must Be In Range Of " + mintolerence + " To " + maxtolerence);
                    this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value).toFixed(3), s_quantity: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) / Number(this.capacity[index]), quantity: this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value });
                    this.submitsave = true;
                  }
                }
                if (data["status"] == 'No') {
                  alert("Packing Quantity Exceeded From Sales Order Quantity ")
                  this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
                  this.submitsave = true;
                }
              });

          }

        }
        else {
          this.DropDownListService.getLoadingRestWeight(this.userForm.get("referance_id").value, this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, this._item_qty).subscribe(data => {
            if (data["status"] == 'Yes') {
              //start
              let mintolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 - Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;
              let maxtolerence: number = Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) * (100 + Number(this.wm_loading_advice_itm_dtls.at(index).get("item_tolerance").value)) / 100;

              let minstatus: boolean = false;
              let maxstatus: boolean = false;
              minstatus = Number(this._item_qty) >= mintolerence;
              maxstatus = Number(this._item_qty) <= maxtolerence;
              console.log("MIn: "+mintolerence +" / "+maxtolerence);
              if (maxstatus == true && minstatus == true) {
                //this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this._item_qty).toFixed(3), s_quantity: Math.round(Number(this._item_qty) / Number(this.capacity[index])) });
                this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this._item_qty).toFixed(3)});
                this.submitsave = false;
              }
              else {
                alert("Item Quantity Must Be In Range Of " + mintolerence + " To " + maxtolerence);
                this.wm_loading_advice_itm_dtls.at(index).patchValue({ mat_wt: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value).toFixed(3), s_quantity: Number(this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value) / Number(this.capacity[index]), quantity: this.wm_loading_advice_itm_dtls.at(index).get("tolerance_qty").value });
                this.submitsave = true;
              }
            }
            if (data["status"] == 'No') {
              alert("Packing Quantity Exceeded From Sales Order Quantity ")
              this.wm_loading_advice_itm_dtls.at(index).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
              this.submitsave = true;
            }
          });

        }
      }
    }

  }

  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  calculateItemData(index) {
    if (this.wm_loading_advice_itm_dtls.at(index).get("price_based_on").value == "Packing") {
      this.wm_loading_advice_itm_dtls.at(index).patchValue({ amount: Number(this.wm_loading_advice_itm_dtls.at(index).get("price").value) * Number(this.wm_loading_advice_itm_dtls.at(index).get("s_quantity").value) })
      console.log("Amount::" + this.wm_loading_advice_itm_dtls.at(index).get("amount").value)
    }

    if (this.wm_loading_advice_itm_dtls.at(index).get("price_based_on").value == "Item") {

      this.wm_loading_advice_itm_dtls.at(index).patchValue({ amount: Number(this.wm_loading_advice_itm_dtls.at(index).get("price").value) * Number(this.wm_loading_advice_itm_dtls.at(index).get("quantity").value) })

    }

    if (this.wm_loading_advice_itm_dtls.at(index).get("price_based_on").value == "0") {

      this.wm_loading_advice_itm_dtls.at(index).patchValue({ amount: 0 });
    }
    //console.log(" quantity  :: "+this.wm_loading_advice_itm_dtls.at(index).get("quantity").value)

    let netAmt = this.wm_loading_advice_itm_dtls.at(index).get("amount").value - this.wm_loading_advice_itm_dtls.at(index).get("discount_amt").value;
    //let taxamt=Number(netAmt +Number(netAmt*Number(this.wm_loading_advice_itm_dtls.at(index).get("tax_rate").value/100))).toFixed(2);
    //here we have to calculate cgst and sgst rate 
    //first we have to get if its gst or
    //starts here here
    this.DropDownListService.taxlistbycode(this.wm_loading_advice_itm_dtls.at(index).get("tax_code").value).subscribe(taxcode => {
      //cgst_amt: taxcode["cgst_act_val"]
      //sgst_amt: taxcode["sgst_act_val"]
      //igst_amt: taxcode["igst_act_val"]

      let cgst_amt = taxcode["cgst_act_val"];
      let sgst_amt = taxcode["sgst_act_val"];
      let igst_amt = taxcode["igst_act_val"];


      if (cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0) {

        let taxamt = 0;
        //let taxamt=Number(netAmt *(this.wm_loading_advice_itm_dtls.at(index).get("tax_rate").value/100)).toFixed(2);

        this.wm_loading_advice_itm_dtls.at(index).patchValue({ total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), tax_amt: taxamt });


      }
      else if (cgst_amt == 0) {

        // let taxamt =Number(netAmt *(this.wm_loading_advice_itm_dtls.at(index).get("tax_rate").value/100)).toFixed(2);
        let taxamt = Number(this.round(Number(netAmt * (this.wm_loading_advice_itm_dtls.at(index).get("tax_rate").value / 100)), 2));
        this.wm_loading_advice_itm_dtls.at(index).patchValue({ total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), tax_amt: taxamt });


      }
      else {


        //let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
        let csgt_final = Number(this.round(Number(netAmt * (cgst_amt / 100)), 2));
        //let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
        let sgst_final = Number(this.round(Number(netAmt * (sgst_amt / 100)), 2));


        let taxamt = Number(csgt_final) + Number(sgst_final);
        console.log(" tax here " + csgt_final + " // " + sgst_final + "  // " + taxamt + " // " + (Number(netAmt)).toFixed(2))
        this.wm_loading_advice_itm_dtls.at(index).patchValue({ total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), tax_amt: taxamt });


      }
    })
    //ends here 
    // let taxamt=Number(netAmt *(this.wm_loading_advice_itm_dtls.at(index).get("tax_rate").value/100)).toFixed(2);

    //  this.wm_loading_advice_itm_dtls.at(index).patchValue({total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2),tax_amt:taxamt});

  }

  onChangeItemName(index, itemId) {
    if (itemId.length) {
      this.status = false;
      this.selectedPackingItem[index] = [];
      this.wm_loading_advice_itm_dtls.at(index).patchValue({ item_code: itemId });
      forkJoin(
        this.DropDownListService.getItemNameById(itemId, this.company_name),
        this.DropDownListService.getItemMasterPackMat(itemId),
        this.DropDownListService.getAlternativeItemList(itemId),
        //this.DropDownListService.getItemMasterInvData1(itemId,this.company_name)
      ).subscribe(([data, data1, altercode]) => {
        this.wm_loading_advice_itm_dtls.at(index).patchValue({ hsn_code: data.hsn_code });
        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => { this.wm_loading_advice_itm_dtls.at(index).patchValue({ uom: data.description }); });
        this.packingItem[index] = data1;
        this.alter_item_codes[index] = altercode;

        this.item_codes.forEach(element => {
          if (element.item_id == itemId) {
            this.wm_loading_advice_itm_dtls.at(index).patchValue({ price: element.price, pricecal: element.price, price_based_on: element.price_based_on });
          }
        })




        this.status = true;
      });
    }
  }

  itemId: any;
  packingQty: any;
  empty_bag_wt: any = [];
  onChangePackingItem(index, pack_Item) {
    this.empty_bag_wt[index] = 0;
    if (pack_Item.length) {
      this.status = false;
      this.itemId = this.wm_loading_advice_itm_dtls.at(index).get("item_code").value as FormControl;
      forkJoin(
        this.DropDownListService.getItemPackUom(this.itemId, pack_Item, this.company_name),
        this.DropDownListService.getItemNameByIdNew(pack_Item, this.company_name)
      )
        .subscribe(([data, packingdata]) => {

          this.capacity[index] = data.capacity;
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ s_uom: data.uom1, item_tolerance: data.tolerance, packing: pack_Item });
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ s_uom: packingdata.mstock_unit_name, item_tolerance: data.tolerance, packing: pack_Item });

          this.status = true;
        });
    }
  }

  onChangeJobPacking(index, packingId) {
    if (packingId.length) {
      this.status = false;
      console.log("select pack:" + packingId)
      this.selectedJobPacking[index] = packingId;

      this.itemId = this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).get("job_item").value as FormControl;
      forkJoin(
        this.DropDownListService.getItemPackUom(this.itemId, packingId, this.company_name),
        this.DropDownListService.getItemNameByIdNew(packingId, this.company_name)
      )
        .subscribe(([data, packingdata]) => {

          this.capacity[index] = data.capacity;
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_uon: packingdata.mstock_unit_name, job_packing: packingId, tolerance: data.tolerance });

          this.status = true;
        });
    }

  }
  onChangeAlterItemName(index, itemId) {
    if (itemId.length) {
      console.log(itemId)
      this.status = false;
      this.selectedAlterPackingItem[index] = [];
      this.selectedAlterItemName[index] = [];
      this.selectedAlterItemName[index] = itemId;
      //this.wm_loading_advice_itm_dtls.at(index).patchValue({alter_item_code: itemId});
      this.wm_loading_advice_itm_dtls.at(index).patchValue({ alter_item_code: itemId, s_quantity: "0", quantity: "0", mat_wt: "0" });
      forkJoin(
        this.DropDownListService.getItemNameById(itemId, this.company_name),
        this.DropDownListService.getItemMasterPackMat(itemId),
        this.DropDownListService.retriveItemMasterStatInfo(itemId, this.company_name)
      ).subscribe(([data, data1, data3]) => {

        this.wm_loading_advice_itm_dtls.at(index).patchValue({ hsn_code: data.hsn_code, tax_code: data3[0].tax_code, tax_rate: data3[0].tax_rate });
        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => { this.wm_loading_advice_itm_dtls.at(index).patchValue({ uom: data.description }); });
        this.alter_packingItem[index] = data1;
        this.status = true;
      });
      let checkpackingalreadyexist: boolean = false;
      for (let p = 0; p < this.wm_loading_advice_itm_dtls.length; p++) {
        if (this.wm_loading_advice_itm_dtls.at(p).get("item_code").value && p != index && this.wm_loading_advice_itm_dtls.at(p).get("alter_item_code").value == itemId) {
          checkpackingalreadyexist = true;
        }
      }
      if (checkpackingalreadyexist == true) {
        this.wm_loading_advice_itm_dtls.at(index).patchValue({ item_code: '0', alter_item_code: '0' });
        //this.selectedItemName[index]="0";
        this.deleteItem(index);
        alert("Item And Alternate Item Name Are Same,Please Change...");
        this.status = true;
      }
      this.calculateItemData(index);
    }
  }
  onChangeAlterPackingItem(index, pack_Item) {
    this.empty_bag_wt[index] = 0;
    if (pack_Item.length) {
      this.status = false;
      this.itemId = this.wm_loading_advice_itm_dtls.at(index).get("alter_item_code").value as FormControl;



      forkJoin(
        this.DropDownListService.getItemPackUom(this.itemId, pack_Item, this.company_name),
        this.DropDownListService.getItemNameByIdNew(pack_Item, this.company_name),
        this.DropDownListService.getItemPackUom(this.itemId, pack_Item, this.company_name),
        this.DropDownListService.getItemPackUom(this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, this.wm_loading_advice_itm_dtls.at(index).get("packing").value, this.company_name),
        this.DropDownListService.getItemAlternateprice(this.wm_loading_advice_itm_dtls.at(index).get("item_code").value, this.itemId)
      )
        .subscribe(([data, packingdata, altercapactity, realcapactity, alterprice]) => {

          //this.capacity[j] = capactity["capacity"]; 
          let price = 0;
          if (this.wm_loading_advice_itm_dtls.at(index).get("price_based_on").value == 'Packing') {
            price = Math.round((Number(this.wm_loading_advice_itm_dtls.at(index).get("pricecal").value) / Number(realcapactity["capacity"])) * Number(altercapactity["capacity"]));
            if (alterprice["addless"] == "Add") {
              price = Number(price) + Number(alterprice["packing_cost"]);
            }
            else if (alterprice["addless"] == "Less") {
              price = Number(price) - Number(alterprice["packing_cost"]);
            }
            else {

            }


            this.wm_loading_advice_itm_dtls.at(index).patchValue({ price: price });
          }
          else {
            this.wm_loading_advice_itm_dtls.at(index).patchValue({ price: this.wm_loading_advice_itm_dtls.at(index).get("pricecal").value });
          }

          this.capacity[index] = data.capacity;
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ s_uom: data.uom1, item_tolerance: data.tolerance, alter_packing: pack_Item });
          this.wm_loading_advice_itm_dtls.at(index).patchValue({ s_uom: packingdata.mstock_unit_name, item_tolerance: data.tolerance, alter_packing: pack_Item });

          this.status = true;
        });
    }
  }

  createNewDriver() {
    if (this.userForm.get("id").value > 0) {
      this.vehicleId = this.userForm.get("vehicle_id").value;
    }
    if (this.vehicleId != '0') {

      let dialogref = this.dialog.open(UnloadAdviceDrivingPopupComponent, { data: { transporter_id: '0', vehicle_id: this.vehicleId } });
      dialogref.afterClosed().subscribe(result => {
        if (result != '') {
          this.status = false;
          //this.Service.createDriver(result).subscribe(data=> //new model save on 06062022
          this.Service.createDriverpopup(result).subscribe(data => {
            // console.log("Driver Details: "+JSON.stringify(result));
            alert("New Driver master created successfully.");
            this.DropDownListService.getDriverByVehicle(this.vehicleId).subscribe(data => {
              this.driverNameList = data;
              this.status = true;
            });
          });
        }
      });
    }
    else { alert("Select Vehicle No First!"); }
  }


  DisableTransporterName: boolean = false;

  onChangeTransBorne(event) {
    let Trans_Borne_By = this.wm_loading_advice_trans_info.get("trans_borne_by").value;
    if (Trans_Borne_By == 'FOB') {
      this.wm_loading_advice_trans_info.get("transporter_name").disable();
      this.DisableTransporterName = true;
    }
    else {
      this.wm_loading_advice_trans_info.get("transporter_name").enable();
      this.DisableTransporterName = false;
    }
  }


  onChangeJobItem(index, itemId) {
    if (itemId.length) {
      this.status = false;
      this.selectedJobPacking[index] = [];
      this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ job_item: itemId });
      forkJoin(
        this.DropDownListService.getItemNameById(itemId, this.company_name),
        this.DropDownListService.getItemMasterPackMat(itemId)
      ).subscribe(([data, data1]) => {
        this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ job_hsn: data.hsn_code });
        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => { this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ item_uom: data.description }); });
        this.packingItem[index] = data1;

        this.item_codes.forEach(element => {
          if (element.item_id == itemId) {
            this.wm_loading_advice_Item_Dtls_for_jobwork.at(index).patchValue({ price: element.price, pricecal: element.price, price_based_on: element.price_based_on });
          }
        })




        this.status = true;
      });
    }
  }
   GetDeliveryBusinessUnit(businessunit_code: string) {
    //alert(businessunit_code+","+businessunit_code);
      if (businessunit_code != '0') {
        this.status = false;
        //this.DropDownListService.getCustDelvFromAdd(this.sales_Order_Shipment_Dtls.get("pay_addr").value, businessunit_code).subscribe(data => {
        this.DropDownListService.getCustomershipdtls(this.userForm.get("bus_partner").value,businessunit_code).subscribe(data => {
          console.log("shipping dtls:"+JSON.stringify(data))
          this.wm_loading_advice_Shipment_Dtls.patchValue({ship_addr_code:data.shipping_name,ship_details: data["address"] });
          this.status = true;
        });
      }
    }
  Ad_date: any;
  BUnit: any;
  Party: any;
  Party1: any;
  MainId: any;
  AdviceId: any;
  onClickShow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { advice_date: this.currentDate, b_unit: this.businessunit }
    // console.log("hello ")
    if (this.businessunit == "0" || this.businessunit == "" || this.businessunit == null) {
      alert("Select Business Unit!...")
    }
    else {
      //if(this.referenceType == 'Stock Transfer' )

      if (this.userForm.get("advice_type").value == 'Stock Transfer') {
        const dialogRef = this.dialog.open(StockTransferPopUpModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          if (data != '' && data["order_id"] != '0') {
            this.packingItem = [];
            this.selectedItemName = [];
            this.selectedPackingItem = [];
            let k = 0;
            this.userForm.patchValue({ referance_id: data["order_id"] });

            this.addItem();
            this.item_sl_no = 0;
            while (this.wm_loading_advice_itm_dtls.length)
              this.wm_loading_advice_itm_dtls.removeAt(0);

            for (let data1 of data.stock_transfer_Item_Dtls) {
              if (data1.checkbox == true || data1.checkbox == 'true') {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
                ).subscribe(([packingList, capacityEmptyWt]) => {
                  this.status = true;
                  this.capacity[k] = capacityEmptyWt.capacity;
                  this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
                  this.addItem();
                  this.selectedItemName[k] = data1["item_code"];
                  this.selectedPackingItem[k] = data1["packing"];
                  this.packingItem[k] = packingList;
                  this.wm_loading_advice_itm_dtls.at(k).patchValue({
                    item_code: data1["item_code"], packing: data1["packing"], quantity: data1["quantity"],
                    uom: data1["uom"], s_quantity: data1["squantity"], s_uom: data1["suom"], mat_wt: data1["mat_wt"],
                    price: data1["price"], price_based_on: data1["price_based_on"], amount: data1["amount"],
                    tax_code: data1["tax_id"], tax_rate: data1["tax_rate"], tax_amt: data1["tax_amt"],
                    total_amt: data1["net_amt"], acc_norms: data1["acc_norms"], item_tolerance: capacityEmptyWt["tolerance"], tolerance_qty: data1["quantity"]
                  });
                  this.calculateItemData(k);
                  k = k + 1;
                });
              }
            }

            this.status = false;
            this.DropDownListService.getStockTransDtls(data["order_id"]).subscribe(data => {
              //this.onChangeBussinessUnit(data.business_unit);
              this.onChangeDelvBusinessUnit(data.delivery_business_unit);
              this.DropDownListService.getStkTransTranInfo(data["order_id"]).subscribe(data1 => {
                this.userForm.patchValue({
                  delivery_business_unit: data.delivery_business_unit, billing_req: data.billing_req,
                  unloading_point: data.unloading_point, b_unit: data.business_unit, load_point: data.loading_point,
                  remarks: data.remarks, confirmed_by: data.confirmed_by, approval: data.approval, reason: data.reason
                })
                this.wm_loading_advice_trans_info.patchValue({
                  transporter_name: data1.trans_code, payment_term: data1.payment_term,
                  charge_code: data1.charge_code, mode_of_trans: data1.mode_of_trans
                });
                this.status = true;
              });
            })
          }
        });
      }

      //  if(this.referenceType == 'Sales Order' && this.businessunit!='' && this.businessunit !=undefined)
      if (this.userForm.get("advice_type").value == 'Sale' && this.businessunit != '' && this.businessunit != undefined) {
        //console.log("hello ")
        this.Ad_date = this.userForm.get("advice_date").value as FormControl;
        this.BUnit = this.userForm.get("b_unit").value as FormControl;
        this.Party = this.userForm.get("bus_partner").value as FormControl;
        this.MainId = this.userForm.get("id").value as FormControl;
        this.AdviceId = this.userForm.get("advice_id").value as FormControl;
        let Refraction = this.userForm.get("refraction").value as FormControl;
        this.Id = this.userForm.get("id").value;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        //console.log("date:"+this.Ad_date+"//"+this.BUnit+"//"+this.Party+"//"+this.MainId+"//"+this.AdviceId)
        //job work start by bidhan
        if (this.userForm.get("jobwork").value == true) {

          if(this.userForm.get("pur_cust_refdocno").value == null || this.userForm.get("pur_cust_refdocno").value == "")
          {
             alert(" Please Select Purchase Ref. Document No.");
             this.status=true;
          }
          else
          {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { advice_date: this.Ad_date, BUnit: this.BUnit, Party: this.Party, id: this.Id };
            const dialogRef = this.dialog.open(SalesorderjobworkpopupComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(data => {
              //  console.log("data comes:"+JSON.stringify(data))
              if (data != '' && data["order_id"] != "0") {
                //console.log(" Data Comes ::")
                if (data["inv_type"] == 'INV00005') {
                  this.DropDownListService.getLASequenceIdWarehouse("LA/" + this.userForm.get("advice_date").value).subscribe(data => {
                    this.seq_no = data.sequenceid;
                    this.status = true;
                  });
                }
                else {
                  this.getLoadingAdviceNo(this.currentDate, this.loadingAdviceType)
                }
                //vehicleno_nochange
                // console.log("here tuhin "+JSON.stringify(data))
                this.salesOrderPopupStatus = true;
                this.jobtransaction = false;
                this.jobtransaction1 = true;
                this.jobpackinglist = [];
                this.selectedJobItem = [];
                this.selectedJobPacking = [];
                let j = 0;
                this.userForm.patchValue({ referance_id: data["order_id"], staticuom: data["salesuom"] });
  
                this.addJobItem();
                this.job_sl_no = 0;
                while (this.wm_loading_advice_Item_Dtls_for_jobwork.length)
                  this.wm_loading_advice_Item_Dtls_for_jobwork.removeAt(0);
  
                for (let data1 of data.sales_Order_Item_Dtls_for_jobwork) {
                  // console.log("here tuhin "+data1["item_code"] + " / " +  data1["packing"] + " / " + this.company_name + " / "+ data1.checkbox)
                  if (data1.checkbox == true || data1["checkbox"] == "true" || data1["checkbox"] == true) {
                    this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("b_unit").value, this.company_name, 'INV00003').subscribe(itemdata => {
                      // console.log("itemdata:"+JSON.stringify(itemdata))
                      this.jobitemlist = itemdata;
  
                      this.status = false;
                      forkJoin(
                        this.DropDownListService.getItemMasterPackMat(data1["job_item"]),
                        this.DropDownListService.getItemPackUom(data1["job_item"], data1["job_packing"], this.company_name),
                        //this.DropDownListService.getSOjwRestQty(data1["order_id"],data1["job_item"], data1["job_packing"])
                        ).subscribe(([packingList, capacityEmptyWt]) => {   //,soJwRestQty
                          this.status = true;
                          this.addJobItem();
                          this.jobpackinglist[j] = packingList;
                          this.selectedJobItem[j] = data1["job_item"];
                          this.capacity[j] = capacityEmptyWt.capacity;
                          this.selectedJobPacking[j] = data1["job_packing"];
                          //console.log(" qty check job work: "+  data1["item_qty"]+""+data1["pack_qty"] )
                          console.log(" On tolrance : "+  JSON.stringify(data1) );
                          //console.log(" On JW SO : "+  JSON.stringify(soJwRestQty) );
                          this.wm_loading_advice_Item_Dtls_for_jobwork.at(j).patchValue({
                            job_item: data1["job_item"], job_packing: data1["job_packing"],
                            job_hsn: data1["job_hsn"], pack_qty: this.round(data1["pack_qty"], 0), pack_uom: data1["pack_uom"], price_based_on: data1["price_based_on"],
                            item_qty: data1["item_qty"], item_uom: data1["item_uom"], tolerance: data1["tolerance"], job_tolerance_qty: data1["item_qty"], allostatus: data1["allostatus"]
                          });
  
                          j = j + 1;
  
                        });
                    });
                  }
                }
                //trans_borne_by_chgs
  
                this.status = false;
                forkJoin(
                  this.DropDownListService.getSalesOrderDetails(data["order_id"]),
                  //   this.DropDownListService.getSalesOrdTransInfo(data["order_id"]),
                  this.DropDownListService.getSalesOrdBrokerDtls(data["order_id"]),
                  this.DropDownListService.getSalesOrdPartyDtls(data["order_id"]),
                  //this.DropDownListService.getSalesOrdShipDtls(data["order_id"]),
                  this.DropDownListService.getSalesOrdShipDtlsNew(data["order_id"]),
                  this.DropDownListService.transporterNamesList(),
                  this.DropDownListService.getSalesOrdTermsCon(data["order_id"]),
                  //this.DropDownListService.transporterNameChgsList(data["order_id"]),         //// ,tranchgslist,transChgs
                  //this.Service.getSalesOrdTransChgsDynList(data["order_id"])
                  //  ).subscribe(([saleOrdData, transData, brokerData, partyData, shipDtlsData,transport])=>  
                ).subscribe(([saleOrdData, brokerData, partyData, shipDtlsData, transport, termscon]) => {
                  //console.log("transChgs:: "+JSON.stringify(transChgs))
                  this.onChangeBussinessPartner(this.Party);
                  this.onChangeBussinessUnit(saleOrdData["business_unit"])
                  // this.userForm.patchValue({b_unit: saleOrdData["business_unit"],  bus_partner: saleOrdData["customer"], remarks: saleOrdData["remarks"], confirmed_by: saleOrdData["confirmed_by"],
                  //   approval: saleOrdData["approval"], reason: saleOrdData["reason"], customer: saleOrdData["customer"], price_term: saleOrdData["price_term"], cust_refdocno: saleOrdData["cust_refdocno"]});
  
                  this.userForm.patchValue({
                    b_unit: saleOrdData["business_unit"], bus_partner: this.Party, remarks: saleOrdData["remarks"], confirmed_by: saleOrdData["confirmed_by"],
                    approval: saleOrdData["approval"], reason: saleOrdData["reason"], customer: this.Party, price_term: saleOrdData["price_term"], cust_refdocno: saleOrdData["cust_refdocno"]
                  });
  
                  //  this.OnChangeTransporterName(transData["trans_code"]);//closed by tuhin as no charge matrix there 
                  // this.wm_loading_advice_trans_info.patchValue({transporter_name: transData["trans_code"], 
                  //console.log("mode_of_trans " +transChgs[0]["mode_of_trans"]+": transport_rate:"+transChgs[0]["transport_rate"]+" // "+transChgs[0]["chgs_rate_value"])
                  if (termscon["payment_term"] == 'APT00001') {
                    this.onday = false;
                  }
                  else {
                    this.onday = true;
                  }
                  console.log("fob :" + saleOrdData["trans_borne_by_chgs"])
                  this.wm_loading_advice_trans_info.patchValue({ trans_borne_by: saleOrdData["trans_borne_by_chgs"], mode_of_payment: termscon["payment_mode"], payment_term: termscon["payment_term"], days: termscon["days"] });
  
                  //  console.log("transporter_name " +this.wm_loading_advice_trans_info.get("transporter_name").value )
  
  
                  if (saleOrdData["delivery_term"] == "FOR") {
                    this.DisableTransporterName = false;
                    //this.trans_codes=tranchgslist;
                    this.trans_codes = transport;
                    this.trans_borne_by_chgs = true;
                  }
  
                  else {
                    this.DisableTransporterName = true;
                    this.trans_codes = transport;
                  }
  
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while (this.wm_loading_advice_broker_dtls.length)
                    this.wm_loading_advice_broker_dtls.removeAt(0);
                  for (let data1 of brokerData)
                    this.addBroker();
                  this.wm_loading_advice_broker_dtls.patchValue(brokerData);
  
                  this.addParty();
                  this.party_sl_no = 0;
                  while (this.wm_loading_advice_Party_Dtls.length)
                    this.wm_loading_advice_Party_Dtls.removeAt(0);
                  for (let data1 of partyData)
                    this.addParty();
                  this.wm_loading_advice_Party_Dtls.patchValue(partyData);
  
                  //this.wm_loading_advice_Shipment_Dtls.patchValue(shipDtlsData)
                   this.wm_loading_advice_Shipment_Dtls.patchValue({ship_addr: shipDtlsData['cp_name'],ship_addr_code:shipDtlsData['ship_addr'],
                  ship_details: shipDtlsData['ship_details'], pay_addr: shipDtlsData['pay_addr'], pay_details: shipDtlsData['pay_details']});
                  this.status = true;
                });
              }
            });
            
          }

         
        }

        //job work ended by bidhan
        else {


          dialogConfig.data = { advice_date: this.Ad_date, BUnit: this.BUnit, Party: this.Party, MainId: this.MainId, AdviceId: this.AdviceId, refraction: Refraction };
          const dialogRef = this.dialog.open(SalesOrderPopUpModalComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => {

            if (data != '' && data["order_id"] != "0") {
              this.userForm.patchValue({ payment_mode: data["payment_mode"] });
              console.log(" VINEET    :: " + data["payment_mode"]);
              if (data["inv_type"] == 'INV00005') {
                this.DropDownListService.getLASequenceIdWarehouse("LA/" + this.userForm.get("advice_date").value).subscribe(data => {
                  this.seq_no = data.sequenceid;
                  this.status = true;
                });
              }
              else {
                this.getLoadingAdviceNo(this.currentDate, this.loadingAdviceType)
              }
              //vehicleno_nochange
              console.log("here tuhin " + JSON.stringify(data))
              this.salesOrderPopupStatus = true;
              this.packingItem = [];
              this.selectedPackingItem = [];
              this.selectedItemName = [];
              let j = 0;
              this.userForm.patchValue({ referance_id: data["order_id"], staticuom: data["salesuom"] });
              console.log('Received Data: ', data.sales_Order_Item_Dtls);
              this.addItem();
              this.item_sl_no = 0;
              while (this.wm_loading_advice_itm_dtls.length)
                this.wm_loading_advice_itm_dtls.removeAt(0);

              const sortedData = data.sales_Order_Item_Dtls.sort((a, b) => {
                // Sort by item_code or any other property that ensures the correct order
                return String(a.slno).localeCompare(String(b.slno));  // Or any other sorting criteria
              });
              console.log('Sorted Data: ', sortedData);
              for (let data1 of sortedData) {
              //for (let data1 of data.sales_Order_Item_Dtls) {
                // console.log("here tuhin "+data1["item_code"] + " / " +  data1["packing"] + " / " + this.company_name + " / "+ data1.checkbox)
                if (data1.checkbox == true || data1["checkbox"] == "true" || data1["checkbox"] == true) {
                  this.Service.getSalesOrdItemDtlsnew(data["order_id"]).subscribe(itemdata => {
                    //console.log("itemdata:" + JSON.stringify(itemdata))
                    this.item_codes = itemdata;
                    console.log('Received Data Item: ', data1);
                    this.status = false;
                    forkJoin(
                      this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                      this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                      this.DropDownListService.getAlternativeItemList(data1["item_code"])
                    ).subscribe(([packUomData, packingList, alteritem]) => {
                      this.status = true;
                      // this.item_codes[j]=alteritem;
                      this.alter_item_codes[j] = alteritem;
                      this.addItem();
                      this.capacity[j] = packUomData["capacity"];

                      this.empty_bag_wt[j] = packUomData["empty_big_wt"];

                      this.packingItem[j] = packingList;
                      this.alter_packingItem[j] = packingList;
                      this.selectedPackingItem[j] = data1["packing"];
                      this.selectedItemName[j] = data1["item_code"];
                      this.selectedAlterItemName[j] = data1["item_code"];
                      this.selectedAlterPackingItem[j] = data1["packing"];

                      //console.log(" abcd " + data1["item_code"])
                      this.wm_loading_advice_itm_dtls.at(j).patchValue({
                        item_code: data1["item_code"], packing: data1["packing"], alter_item_code: data1["item_code"], alter_packing: data1["packing"], quantity: data1["quantity"],
                        uom: data1["uom"], s_quantity: data1["squantity"], s_uom: data1["suom"], mat_wt: data1["mat_wt"],
                        price: data1["price"], pricecal: data1["price"], price_based_on: data1["price_based_on"], amount: data1["amount"],
                        discount_rate: data1["discount_rate"], discount_type: data1["discount_type"], discount_amt: data1["discount_amt"],
                        tax_code: data1["tax_code"], tax_rate: data1["tax_rate"], hsn_code: data1["hsn_code"],
                        tax_amt: data1["tax_amt"], total_amt: data1["total_amt"], acc_norms: data1["acc_norms"],
                        tolerance: data1["tolerance"], item_tolerance: packUomData["tolerance"], tolerance_qty: data1["quantity"]
                      });
                      this.calculateItemData(j);
                      console.log(" after patch " + this.wm_loading_advice_itm_dtls.at(j).get("alter_item_code").value)
                      j = j + 1;

                    });
                  });
                }
              }

              /*for (let data1 of data.sales_Order_Item_Dtls) {
                // console.log("here tuhin "+data1["item_code"] + " / " +  data1["packing"] + " / " + this.company_name + " / "+ data1.checkbox)
                if (data1.checkbox == true || data1["checkbox"] == "true" || data1["checkbox"] == true) {
                  this.Service.getSalesOrdItemDtlsnew(data["order_id"]).subscribe(itemdata => {
                    //console.log("itemdata:" + JSON.stringify(itemdata))
                    this.item_codes = itemdata;
                    console.log('Received Data Item: ', data1);
                    this.status = false;
                    forkJoin(
                      this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                      this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                      this.DropDownListService.getAlternativeItemList(data1["item_code"])
                    ).subscribe(([packUomData, packingList, alteritem]) => {
                      this.status = true;
                      // this.item_codes[j]=alteritem;
                      this.alter_item_codes[j] = alteritem;
                      this.addItem();
                      this.capacity[j] = packUomData["capacity"];

                      this.empty_bag_wt[j] = packUomData["empty_big_wt"];

                      this.packingItem[j] = packingList;
                      this.alter_packingItem[j] = packingList;
                      this.selectedPackingItem[j] = data1["packing"];
                      this.selectedItemName[j] = data1["item_code"];
                      this.selectedAlterItemName[j] = data1["item_code"];
                      this.selectedAlterPackingItem[j] = data1["packing"];

                      //console.log(" abcd " + data1["item_code"])
                      this.wm_loading_advice_itm_dtls.at(j).patchValue({
                        item_code: data1["item_code"], packing: data1["packing"], alter_item_code: data1["item_code"], alter_packing: data1["packing"], quantity: data1["quantity"],
                        uom: data1["uom"], s_quantity: data1["squantity"], s_uom: data1["suom"], mat_wt: data1["mat_wt"],
                        price: data1["price"], pricecal: data1["price"], price_based_on: data1["price_based_on"], amount: data1["amount"],
                        discount_rate: data1["discount_rate"], discount_type: data1["discount_type"], discount_amt: data1["discount_amt"],
                        tax_code: data1["tax_code"], tax_rate: data1["tax_rate"], hsn_code: data1["hsn_code"],
                        tax_amt: data1["tax_amt"], total_amt: data1["total_amt"], acc_norms: data1["acc_norms"],
                        tolerance: data1["tolerance"], item_tolerance: packUomData["tolerance"], tolerance_qty: data1["quantity"]
                      });
                      this.calculateItemData(j);
                      console.log(" after patch " + this.wm_loading_advice_itm_dtls.at(j).get("alter_item_code").value)
                      j = j + 1;

                    });
                  });
                }
              }*/
              //trans_borne_by_chgs

              this.status = false;
              forkJoin(
                this.DropDownListService.getSalesOrderDetails(data["order_id"]),
                this.DropDownListService.getSalesOrdTransInfo(data["order_id"]),
                this.DropDownListService.getSalesOrdBrokerDtls(data["order_id"]),
                this.DropDownListService.getSalesOrdPartyDtls(data["order_id"]),
                //this.DropDownListService.getSalesOrdShipDtls(data["order_id"]),
                this.DropDownListService.getSalesOrdShipDtlsNew(data["order_id"]),
                this.DropDownListService.transporterNamesList(),
                //this.DropDownListService.getTransporterMNCListFast(), //check letter for applying
                this.DropDownListService.getSalesOrdTermsCon(data["order_id"]),
                //this.DropDownListService.transporterNameChgsList(data["order_id"]),         //// ,tranchgslist,transChgs
                //this.Service.getSalesOrdTransChgsDynList(data["order_id"]),
                this.Service.custShipAddDtlsRetriveList(this.userForm.get("bus_partner").value)
              ).subscribe(([saleOrdData, transData, brokerData, partyData, shipDtlsData, transport,
                termscon,custshippingdata]) => {
                console.log("termscon:: " + JSON.stringify(termscon))
                this.onChangeBussinessPartner(this.Party);
                this.onChangeBussinessUnit(saleOrdData["business_unit"])
                // this.userForm.patchValue({b_unit: saleOrdData["business_unit"],  bus_partner: saleOrdData["customer"], remarks: saleOrdData["remarks"], confirmed_by: saleOrdData["confirmed_by"],
                //   approval: saleOrdData["approval"], reason: saleOrdData["reason"], customer: saleOrdData["customer"], price_term: saleOrdData["price_term"], cust_refdocno: saleOrdData["cust_refdocno"]});

                this.userForm.patchValue({
                  b_unit: saleOrdData["business_unit"], bus_partner: this.Party, remarks: saleOrdData["remarks"], confirmed_by: saleOrdData["confirmed_by"],
                  approval: saleOrdData["approval"], reason: saleOrdData["reason"], customer: this.Party, price_term: saleOrdData["price_term"], cust_refdocno: saleOrdData["cust_refdocno"]
                });

                this.OnChangeTransporterName(transData["trans_code"]);
                // this.wm_loading_advice_trans_info.patchValue({transporter_name: transData["trans_code"], 
                //console.log("mode_of_trans " +transChgs[0]["mode_of_trans"]+": transport_rate:"+transChgs[0]["transport_rate"]+" // "+transChgs[0]["chgs_rate_value"])

                /* this.wm_loading_advice_trans_info.patchValue({trans_borne_by: saleOrdData["trans_borne_by_chgs"],mode_of_trans: transChgs[0]["mode_of_trans"],
                   charge_code: transData["charge_code"],transport_rate: transChgs[0]["transport_rate"],rate_value: transChgs[0]["chgs_rate_value"]}) */
                if (termscon["payment_term"] == 'APT00001') {
                  this.onday = false;
                }
                else {
                  this.onday = true;
                }
                this.wm_loading_advice_trans_info.patchValue({ trans_borne_by: saleOrdData["trans_borne_by_chgs"], mode_of_payment: termscon["payment_mode"], payment_term: termscon["payment_term"], days: termscon["days"] });
                console.log("transporter_name " + this.wm_loading_advice_trans_info.get("transporter_name").value)

                
                if (saleOrdData["delivery_term"] == "FOR") {
                  //this.trans_codes=tranchgslist;
                  this.trans_codes = transport;
                  this.DisableTransporterName = false;
                  this.trans_borne_by_chgs = true;
                }
                else {
                  this.trans_codes = transport;
                  this.DisableTransporterName = true;
                }

                this.addBroker();
                this.broker_sl_no = 0;
                while (this.wm_loading_advice_broker_dtls.length)
                  this.wm_loading_advice_broker_dtls.removeAt(0);
                for (let data1 of brokerData)
                  this.addBroker();
                this.wm_loading_advice_broker_dtls.patchValue(brokerData);

                this.addParty();
                this.party_sl_no = 0;
                while (this.wm_loading_advice_Party_Dtls.length)
                  this.wm_loading_advice_Party_Dtls.removeAt(0);
                for (let data1 of partyData)
                  this.addParty();
                this.wm_loading_advice_Party_Dtls.patchValue(partyData);

                //this.wm_loading_advice_Shipment_Dtls.patchValue(shipDtlsData)
                 console.log("Shipment :: " + JSON.stringify(shipDtlsData))
                console.log("Shipment12 :: " + JSON.stringify(custshippingdata))
                console.log("Order Type :: " + data["order_type"])
                if(data["order_type"]=='Informal')
                {
                  this.customerShipDtlsList=custshippingdata;
                  this.shipinformal=true;
                  this.wm_loading_advice_Shipment_Dtls.patchValue({ship_addr: '',ship_addr_code:'',ship_details: ''})
                }
                else{
                  this.shipinformal=false;
                  this.wm_loading_advice_Shipment_Dtls.patchValue({
                    //ship_addr: shipDtlsData['shipaddr'],
                    ship_addr: shipDtlsData['cp_name'],ship_addr_code:shipDtlsData['ship_addr'],
                    ship_details: shipDtlsData['ship_details']    //, pay_addr: shipDtlsData['payaddr'], pay_details: shipDtlsData['paydetails']
                  })
                }
                this.status = true;
              });
            }
          });
        }


      }

    }
    //end here


    //  if(this.referenceType == 'Purchase Return')
    //this.userForm.get("advice_type").value
    if (this.userForm.get("advice_type").value == 'Purchase Return') {
      if (this.businessunit != "0" && this.supplier_id != "0") {
        dialogConfig.data = {
          b_unit: this.businessunit, supplier: this.supplier_id,
          date: this.currentDate, company_id: this.company_name, fin_year: this.financialYear
        };
        const dialogRef = this.dialog.open(PurReturnApprovalNotePopUpComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          if (data != '' && data["purreturnid"] != "0") {

            ///uom work need to add 
            this.packingItem = [];
            this.selectedPackingItem = [];
            this.selectedItemName = [];
            let j = 0;
            this.userForm.patchValue({ referance_id: data["purreturnid"] });

            this.addItem();
            this.item_sl_no = 0;
            while (this.wm_loading_advice_itm_dtls.length)
              this.wm_loading_advice_itm_dtls.removeAt(0);

            for (let data1 of data.pur_return_approval_item_dtls) {
              if (data1.checkbox == true) {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name),
                  this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                ).subscribe(([packUomData, packingList]) => {
                  this.status = true;
                  this.addItem();
                  this.capacity[j] = packUomData["capacity"];
                  this.empty_bag_wt[j] = packUomData["empty_big_wt"];
                  this.packingItem[j] = packingList;
                  this.selectedPackingItem[j] = data1["packing"];
                  this.selectedItemName[j] = data1["itemcode"];
                  this.wm_loading_advice_itm_dtls.at(j).patchValue({
                    item_code: data1["itemcode"], packing: data1["packing"], quantity: data1["quantity"],
                    uom: data1["uom"], s_quantity: data1["squantity"], s_uom: data1["suom"], mat_wt: data1["matwt"],
                    price: data1["price"], price_based_on: data1["pricebasedon"], amount: data1["amount"],
                    discount_rate: data1["discountrate"], discount_type: data1["discounttype"],
                    discount_amt: data1["discountamt"], tax_code: data1["taxcode"], tax_rate: data1["taxrate"],
                    tax_amt: data1["taxamt"], total_amt: data1["totalamt"], acc_norms: data1["accnorms"], item_tolerance: packUomData["tolerance"], tolerance_qty: data1["quantity"]
                  });
                  this.calculateItemData(j);
                  j = j + 1;
                });
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getPurRtnAppNoteDtls("purreturnid=" + data["purreturnid"]),
              this.DropDownListService.getPurReturnAppTI(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppBD(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppSD(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppDoc(data["purreturnid"]),
            ).subscribe(([purRetData, transData, brokerData, shipDtlsData, docData]) => {
              this.onChangeVehicleNo(transData['vehicleno'])
              // console.log("getPurchaseReturnDetails "+JSON.stringify(purRetData))
              this.userForm.patchValue({
                remarks: purRetData["remark"], confirmed_by: purRetData["confirmedby"],
                approval: purRetData["approval"], reason: purRetData["reason"], vehicle_id: transData['vehicleno']
              });

              this.OnChangeTransporterName(transData["transcode"]);
              this.wm_loading_advice_trans_info.patchValue({
                transporter_name: transData["transcode"],
                trans_borne_by: transData["transborneby"], mode_of_trans: transData["modeoftrans"],
                charge_code: transData["chargecode"]
              })

              let k = 0;
              this.addBroker();
              this.broker_sl_no = 0;
              while (this.wm_loading_advice_broker_dtls.length)
                this.wm_loading_advice_broker_dtls.removeAt(0);
              for (let data1 of brokerData) {
                this.addBroker();
                this.wm_loading_advice_broker_dtls.at(k).patchValue({
                  broker_code: data1['brokercode'],
                  basis: data1['basis'], rate: data1['rate']
                });
                k = k + 1;
              }

              this.wm_loading_advice_Shipment_Dtls.patchValue({
                ship_addr: shipDtlsData['shipaddr'],
                ship_details: shipDtlsData['shipdetails'], pay_addr: shipDtlsData['payaddr'], pay_details: shipDtlsData['paydetails']
              })

              let i = 0;
              this.addDocument();
              while (this.wm_loading_advice_doc_attch.length)
                this.wm_loading_advice_doc_attch.removeAt(0);
              for (let data1 of docData) {
                this.addDocument();
                this.wm_loading_advice_doc_attch.at(i).patchValue({ doc_name: data1['docname'] });
                i = i + 1;
              }

              if (purRetData['referance_id'] != "0") {
                this.status = false
                if (purRetData['returnbasedon'] == "Purchase Order") {
                  this.DropDownListService.purOrdBPDRetriveList(purRetData['referance_id']).subscribe(bpData => {
                    this.wm_loading_advice_bp_dtls.patchValue({
                      supp_name: bpData['supp_name'], supp_phone: bpData['supp_phone'],
                      supp_fax: bpData['supp_fax'], supp_email: bpData['supp_email'], supp_address: bpData['supp_address'],
                      cp_name: bpData['cp_name'], cp_desg: bpData['cp_designation'], cp_ph: bpData['cp_phone'],
                      cp_fax: bpData['cp_fax'], cp_mail: bpData['cp_email'], cp_add: bpData['cp_address']
                    });
                    this.status = true;
                  })
                }
                else if (purRetData['returnbasedon'] == "GRN") {
                  this.DropDownListService.getPurGoodRcptBPDtls(purRetData['referance_id']).subscribe(bpData => {
                    this.wm_loading_advice_bp_dtls.patchValue({
                      supp_name: bpData['sp_name'], supp_phone: bpData['supp_phone'],
                      supp_fax: bpData['sp_fax'], supp_email: bpData['sp_email'], supp_address: bpData['sp_address'],
                      cp_name: bpData['cp_name'], cp_desg: bpData['cp_designation'], cp_ph: bpData['cp_phone'],
                      cp_fax: bpData['cp_fax'], cp_mail: bpData['cp_email'], cp_add: bpData['cp_address']
                    });
                    this.status = true;
                  })
                }
                else {
                  this.DropDownListService.gePurBillBPRetrive(purRetData['referance_id']).subscribe(bpData => {
                    this.wm_loading_advice_bp_dtls.patchValue({
                      supp_name: bpData['supp_name'], supp_phone: bpData['supp_phone'],
                      supp_fax: bpData['supp_fax'], supp_email: bpData['supp_email'], supp_address: bpData['supp_address'],
                      cp_name: bpData['cp_name'], cp_desg: bpData['cp_designation'], cp_ph: bpData['cp_phone'],
                      cp_fax: bpData['cp_fax'], cp_mail: bpData['cp_email'], cp_add: bpData['cp_address']
                    });
                    this.status = true;
                  })
                }
              }
              else { this.status = true; }
            });
          }
        });
      } else { alert("Select Supplier Also!...") }
    }
  }

  addNewVechile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    const dialogRef = this.dialog.open(AddNewVechilePopUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.status = false;
        //console.log("Vechile details: "+JSON.stringify(result));
        //this.Service.createVehicle(result).subscribe(data => // changes on 06062022 for create vehicle new model.
        this.Service.createVehiclepopup(result).subscribe(data => {
          // console.log("Vechile details: "+JSON.stringify(data));
          alert("New Vehicle created successfully.");
          this.DropDownListService.getVehicleNameCode().subscribe(vehicleData => {
            this.veh_nos = vehicleData;
            this.status = true;
          })
        });
      }
    });
  }
 
  /*sendcheck() {  // old code without normal item qty check
    if (this.userForm.get("jobwork").value == true && this.userForm.get("advice_type").value == "Sale") {

      if (Number(this.userForm.get("id").value) > 0) {
        this.statusNoMsg = "";
        this.submitsave = false;
      }
      else {

        let totalqtyjobwork: number = 0;
        for (let v = 0; v < this.wm_loading_advice_Item_Dtls_for_jobwork.length; v++) {
          totalqtyjobwork += Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(v).get("item_qty").value);
        }

        this.DropDownListService.getLoadingRestWeightJobworkrectify(this.userForm.get("pur_cust_refdocno").value, totalqtyjobwork).subscribe(data => {
          if (data["status"] == 'Yes') 
          {
           
            this.statusNoMsg = "";
            this.submitsave = false;
          }
          else
          {
            //no 
            
            this.statusNoMsg = "Please Contact Jitesh Sir for JobWork Item Allocation Update in PO.";
            this.submitsave = true;
          }
        });
      }


    }
    else {
      this.statusNoMsg = "";
      this.submitsave = false;
    }

  }*/

  sendcheck() {
    if (this.userForm.get("jobwork").value == true && this.userForm.get("advice_type").value == "Sale") {
      if (Number(this.userForm.get("id").value) > 0) {
        console.log(" :: jobwork qty check update :: ");
        this.statusNoMsg = "";
        this.submitsave = false;
      }
      else {
        //if(this.userForm.get("jobwork").value)  {  // for JobWork
          console.log(" :: jobwork qty check save :: ");
          let totalqtyjobwork: number = 0;
          for (let v = 0; v < this.wm_loading_advice_Item_Dtls_for_jobwork.length; v++) {
            totalqtyjobwork += Number(this.wm_loading_advice_Item_Dtls_for_jobwork.at(v).get("item_qty").value);
          }

          this.DropDownListService.getLoadingRestWeightJobworkrectify(this.userForm.get("pur_cust_refdocno").value, totalqtyjobwork).subscribe(data => {
            if (data["status"] == 'Yes') 
            {
              this.statusNoMsg = "";
              this.submitsave = false;
            }
            else
            {
              //no 
              this.statusNoMsg = "Please Contact Jitesh Sir for JobWork Item Allocation Update in PO.";
              this.submitsave = true;
            }
          });
        //}
      }
    }
    else if(this.userForm.get("jobwork").value == false && this.userForm.get("advice_type").value == "Sale"){
      let itemQty: any = [];
      let alluom: any = [];
      alluom = JSON.parse(localStorage.getItem("ALLUOM"));
      
      if (Number(this.userForm.get("id").value) > 0) {
        console.log(" :: normal qty check UPDATE:: ");
        for (let v = 0; v < this.wm_loading_advice_itm_dtls.length; v++) {
        
        //vineet normal update Starts
        if (this.wm_loading_advice_itm_dtls.at(v).get("uom").value == "PCS") {
          itemQty[v] = Math.round(this.capacity[v] * this.wm_loading_advice_itm_dtls.at(v).get("s_quantity").value);
        }
        else {
          alluom.forEach(element => {
            if (element.description == this.wm_loading_advice_itm_dtls.at(v).get("uom").value) {
              itemQty[v] = Number(this.capacity[v] * this.wm_loading_advice_itm_dtls.at(v).get("s_quantity").value).toFixed(Number(element.decimalv));
            }
          });
        }
        console.log(" :: ITEM QTY UPDATE ARRAY :: "+itemQty);
        //vineet normal update ends

        this.DropDownListService.getLoadingRestWeightupdate(this.userForm.get("referance_id").value,
          this.wm_loading_advice_itm_dtls.at(v).get("item_code").value, itemQty[v],
          this.userForm.get("advice_id").value,
          this.wm_loading_advice_itm_dtls.at(v).get("packing").value, this.wm_loading_advice_itm_dtls.at(v).get("alter_item_code").value,
          this.wm_loading_advice_itm_dtls.at(v).get("alter_packing").value).subscribe(data => {
            if (data["status"] == 'Yes') {
              console.log("chk Value Yes : "+v+" ::Value::  "+ itemQty[v])
              this.wm_loading_advice_itm_dtls.at(v).patchValue({ quantity: itemQty[v], mat_wt: itemQty[v], tolerance_qty: itemQty[v] });
              this.calculateItemData(v);
              this.submitsave = false;
            }
            if (data["status"] == 'No') {
              console.log("chk Value No : " + itemQty[v])
              alert("Packing Quantity Exceeded From Sales Order Quantity ")
              this.wm_loading_advice_itm_dtls.at(v).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
              this.submitsave = true;
            }
            this.status = true;
          });
        }
        //this.submitsave = false;
      }
      else{
        console.log(" :: normal qty check SAVE :: ");
        for (let i = 0; i < this.wm_loading_advice_itm_dtls.length; i++) {

          //vineet normal save Starts
          if (this.wm_loading_advice_itm_dtls.at(i).get("uom").value == "PCS") {
            itemQty[i] = Math.round(this.capacity[i] * this.wm_loading_advice_itm_dtls.at(i).get("s_quantity").value);
          }
          else {
            alluom.forEach(element => {
              if (element.description == this.wm_loading_advice_itm_dtls.at(i).get("uom").value) {
                itemQty[i] = Number(this.capacity[i] * this.wm_loading_advice_itm_dtls.at(i).get("s_quantity").value).toFixed(Number(element.decimalv));
              }
            });
          }
          console.log(" :: ITEM QTY SAVE ARRAY :: "+itemQty);
          //vineet normal save ends

          this.DropDownListService.getLoadingRestWeight(this.userForm.get("referance_id").value,
          this.wm_loading_advice_itm_dtls.at(i).get("item_code").value, itemQty[i]).subscribe(data => {
            if (data["status"] == 'Yes') {
              console.log("chk Value Yes New : " +i+" ::Value::  "+ itemQty[i])
              this.wm_loading_advice_itm_dtls.at(i).patchValue({ quantity: itemQty[i], 
                mat_wt: itemQty[i], 
                tolerance_qty: itemQty[i] });
              this.calculateItemData(i);
              this.submitsave = false;
            }
            if (data["status"] == 'No') {
              console.log("chk Value No New: " + itemQty[i])
              alert("Packing Quantity Exceeded From Sales Order Quantity ")
              this.wm_loading_advice_itm_dtls.at(i).patchValue({ quantity: '0.00', mat_wt: '0.00', tolerance_qty: '0.00', s_quantity: '0.00' });
              this.submitsave = true;
            }
            this.status = true;
          });
        }
        //this.submitsave = false;
      }
    }
    else {
      console.log(" :: else other check :: ");
      this.statusNoMsg = "";
      this.submitsave = false;
    }
  }

  send() {
    this.submitsave = true;
    this.Id = this.userForm.get("id").value as FormControl;
    this.wm_loading_advice_driver_dtls.patchValue({ doc_type: this.selectedDocumentType })
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
      if (this.userForm.get("advice_type").value == "" || this.userForm.get("advice_type").value == null || this.userForm.get("advice_type").value == 0) {
        alert("Please Selet Advice Type");
        this.status = true;
      }
      else if (this.userForm.get("b_unit").value == "" || this.userForm.get("b_unit").value == null || this.userForm.get("b_unit").value == 0) {
        alert("Please Select Business Unit");
        this.status = true;
      }
      else if ((this.userForm.get("bus_partner").value == "" || this.userForm.get("bus_partner").value == null || this.userForm.get("bus_partner").value == 0) && this.userForm.get("advice_type").value == 'Sale') {
        alert("Please Select Business Partner");
        this.status = true;
      }
      // else if(this.userForm.get("supplier").value == "" || this.userForm.get("supplier").value == null || this.userForm.get("supplier").value == 0)
      // {
      //   alert("Please Select Business Partner");
      //   this.status=true;
      // }
      else if (this.userForm.get("load_point").value == "" || this.userForm.get("load_point").value == null || this.userForm.get("load_point").value == 0) {
        alert("Please Select Loading Point");
        this.status = true;
      }
      else if (this.userForm.get("weight_bridge_location").value == '' || this.userForm.get("weight_bridge_location").value == null || this.userForm.get("weight_bridge_location").value == 0) {
        alert("Please Select Weight Bridge Location");
        this.status = true;
      }
      else if (this.userForm.get("vehicle_id").value == "" || this.userForm.get("vehicle_id").value == null || this.userForm.get("vehicle_id").value == 0) {
        alert("Please Select Vehicle No.");
        this.status = true;
      }
      else if (this.userForm.get("load_by").value == "" || this.userForm.get("load_by").value == null || this.userForm.get("load_by").value == 0) {
        alert("Please Select Loading By");
        this.status = true;
      }
      else if (this.userForm.get("erp_usr_name").value == "" || this.userForm.get("erp_usr_name").value == null || this.userForm.get("erp_usr_name").value == 0) {
        alert("Please Select Supervisor Name");
        this.status = true;
      }
      //
      else if (this.userForm.get("staticuom").value == "" || this.userForm.get("staticuom").value == null || this.userForm.get("staticuom").value == 0) {
        alert("Please Select Uom");
        this.status = true;
      }
      else {
        let itemcheck = false;
        let packingcheck = false;
        let quantitycheck = false;
        let itemquantitycheck = false;
        for (let b = 0; b < this.wm_loading_advice_itm_dtls.length; b++) {
          if (this.userForm.get("jobwork").value != true && (this.wm_loading_advice_itm_dtls.at(b).get("item_code").value == null || this.wm_loading_advice_itm_dtls.at(b).get("item_code").value == '' || this.wm_loading_advice_itm_dtls.at(b).get("item_code").value == 0)) {
            itemcheck = true;
          }
          if (this.userForm.get("jobwork").value != true && (this.wm_loading_advice_itm_dtls.at(b).get("packing").value == null || this.wm_loading_advice_itm_dtls.at(b).get("packing").value == '' || this.wm_loading_advice_itm_dtls.at(b).get("packing").value == 0)) {
            packingcheck = true;
          }
          if (this.userForm.get("jobwork").value != true && (this.wm_loading_advice_itm_dtls.at(b).get("s_quantity").value == null || this.wm_loading_advice_itm_dtls.at(b).get("s_quantity").value == '' || this.wm_loading_advice_itm_dtls.at(b).get("s_quantity").value == 0 || this.wm_loading_advice_itm_dtls.at(b).get("s_quantity").value == "0")) {
            quantitycheck = true;
          }
          if (this.userForm.get("jobwork").value != true && (this.wm_loading_advice_itm_dtls.at(b).get("quantity").value == null || this.wm_loading_advice_itm_dtls.at(b).get("quantity").value == '' || this.wm_loading_advice_itm_dtls.at(b).get("quantity").value == 0 || this.wm_loading_advice_itm_dtls.at(b).get("quantity").value == "0")) {
            itemquantitycheck = true;
          }
        }
        if (itemcheck == true) {
          alert("Please Select Item Name in Item Details Tab!!!"); this.status = true;
        }
        else if (packingcheck == true) {
          alert("Please Select Packing Name in Item Details Tab!!!"); this.status = true;
        }
        else if (quantitycheck == true) {
          alert("Please Enter PACKING QTY in Item Details Tab!!!"); this.status = true;
        }

        else if (itemquantitycheck == true) {
          alert("Please Enter Item QTY in Item Details Tab!!!"); this.status = true;
        }

        else if (this.wm_loading_advice_driver_dtls.get("driver_name").value == "" || this.wm_loading_advice_driver_dtls.get("driver_name").value == null || this.wm_loading_advice_driver_dtls.get("driver_name").value == 0) {
          alert("Please Select Driver Details in DRIVER DETAILS Tab");
          this.status = true;
        }
        else if (this.wm_loading_advice_trans_info.get("trans_borne_by").value == "" || this.wm_loading_advice_trans_info.get("trans_borne_by").value == null || this.wm_loading_advice_trans_info.get("trans_borne_by").value == 0) {
          alert("Please Select Transport Brone By in TRANSPORT INFORMATION Tab");
          this.status = true;
        }
        else if (this.wm_loading_advice_trans_info.get("trans_borne_by").value == "FOR" && (this.wm_loading_advice_trans_info.get("transporter_name").value == null || this.wm_loading_advice_trans_info.get("transporter_name").value == '' || this.wm_loading_advice_trans_info.get("transporter_name").value == 0)) {
          alert("Delivery Term 'FOR' , Please Select Transporter Name in Transport Information Tab!!");
          this.status = true;
        }
        else if (this.userForm.get("advice_type").value !='Stock Transfer' && (this.wm_loading_advice_Shipment_Dtls.get("ship_addr").value == null || this.wm_loading_advice_Shipment_Dtls.get("ship_addr").value == '' || this.wm_loading_advice_Shipment_Dtls.get("ship_addr").value == 0)) {
          alert("Please Select Address Id into 'Ship To' Block in Shipment Details Tab!!");
          this.status = true;
        }
        /* else if(this.trans_borne_by_chgs ==true && (this.wm_loading_advice_trans_info.get("transporter_name").value == null|| this.wm_loading_advice_trans_info.get("transporter_name").value == '' || this.wm_loading_advice_trans_info.get("transporter_name").value == 0) )
        {
          alert("Please Select Transport Name  in TRANSPORT INFORMATION Tab");
          this.status=true;
        } */
        else {
          if (this.userForm.get("advice_type").value == "Sale" && (this.salesOrderPopupStatus == false && this.userForm.get("ref_doc_type").value == "Sales Order")) {
            alert("Please Select Show Buton");
            this.status = true;
          }
          else {
            //start
            //newcalculationstarts here 
            let totalamt = 0;
            for (let v = 0; v < this.wm_loading_advice_itm_dtls.length; v++) {
              if (this.wm_loading_advice_itm_dtls.at(v).get("price_based_on").value == "Packing") {
                this.wm_loading_advice_itm_dtls.at(v).patchValue({ amount: Number(this.wm_loading_advice_itm_dtls.at(v).get("price").value) * Number(this.wm_loading_advice_itm_dtls.at(v).get("s_quantity").value) })

              }

              if (this.wm_loading_advice_itm_dtls.at(v).get("price_based_on").value == "Item") {
                // console.log(" price  :: "+this.wm_loading_advice_itm_dtls.at(v).get("price").value)
                // console.log(" quantity  :: "+this.wm_loading_advice_itm_dtls.at(v).get("quantity").value)
                this.wm_loading_advice_itm_dtls.at(v).patchValue({ amount: Number(this.wm_loading_advice_itm_dtls.at(v).get("price").value) * Number(this.wm_loading_advice_itm_dtls.at(v).get("quantity").value) })
              }

              if (this.wm_loading_advice_itm_dtls.at(v).get("price_based_on").value == "0") {

                this.wm_loading_advice_itm_dtls.at(v).patchValue({ amount: 0 });
              }

              let netAmt = this.wm_loading_advice_itm_dtls.at(v).get("amount").value - this.wm_loading_advice_itm_dtls.at(v).get("discount_amt").value;

              // this.wm_loading_advice_itm_dtls.at(v).patchValue({total_amt:Number(this.wm_loading_advice_itm_dtls.at(v).get("tax_amt").value + netAmt).toFixed(2)});

              totalamt += Number(this.wm_loading_advice_itm_dtls.at(v).get("total_amt").value);

            }
            if (this.Id > 0) {
              if (this.userForm.get("payment_mode").value == "Cash") {
                this.DropDownListService.checkAdviceinCashUpdate(this.userForm.get("advice_date").value, this.userForm.get("bus_partner").value,
                  this.userForm.get("ref_doc_type").value, totalamt, this.userForm.get("advice_id").value).subscribe(data => {
                    console.log("CHECKMATE :: " + JSON.stringify(data));
                    if (data["status"] == "Yes") {
                      alert("Party Payment exceed 2 lakh amount in Cash");
                      this.status = true;
                    }
                    else {
                      this.status = false;
                      this.Service.updateLoadingAdvice(this.userForm.getRawValue(), this.Id).subscribe(data => {
                        alert("Loading Advice Updated successfully.");
                        window.location.reload();
                        this.status = true;
                      }, (error) => {
                        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                        //this.ngOnInit()
                      });
                    }
                  });
              }
              else {
                this.status = false;
                this.Service.updateLoadingAdvice(this.userForm.getRawValue(), this.Id).subscribe(data => {
                  alert("Loading Advice Updated successfully.");
                  window.location.reload();
                  this.status = true;
                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                  //this.ngOnInit()
                });
              }
              this.status = true;
            }

            else {

              //here starts

              if (this.userForm.get("payment_mode").value == "Cash") {
                if (Number(totalamt) <= 200000) {
                  this.DropDownListService.checkAdviceinCash(this.userForm.get("advice_date").value, this.userForm.get("bus_partner").value,
                    this.userForm.get("ref_doc_type").value, totalamt).subscribe(data => {
                      console.log("CHECKMATE :: " + JSON.stringify(data));
                      if (data["status"] == "Yes") {
                        alert("Party Payment exceed 2 lakh amount in Cash");
                        this.status = true;
                      }
                      else {
                        this.status = false;
                        const InputData = this.userForm.getRawValue();
                        //  console.log("input: "+JSON.stringify(InputData));
                        const frmData = new FormData();
                        // console.log(" length "+this.myFiles.length);
                        for (let i = 0; i < this.myFiles.length; i++) {

                          frmData.append("files", this.myFiles[i]);
                          // console.log();
                          if (i == 0) {
                            //console.log(i+",files: "+this.myFiles[i])
                          }
                        }
                        frmData.append("Input", JSON.stringify(InputData));



                        // console.log("Form data: "+ this.wm_loading_advice_itm_dtls.at(0).get("tax_amt").value);

                        this.Service.createLoadingAdvice(frmData).subscribe(data => {
                          // console.log(this.userForm.value);
                          alert("New Loading Advice created successfully.");
                          window.location.reload();
                          this.status = true;

                        }, (error) => {
                          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                          // this.ngOnInit()
                        });
                      }
                    });
                }
                else {
                  alert("Party Payment exceed 2 lakh amount in Cash");
                  this.status = true;
                }

              }
              else {
                this.status = false;
                const InputData = this.userForm.getRawValue();
                //  console.log("input: "+JSON.stringify(InputData));
                const frmData = new FormData();
                // console.log(" length "+this.myFiles.length);
                for (let i = 0; i < this.myFiles.length; i++) {

                  frmData.append("files", this.myFiles[i]);
                  // console.log();
                  if (i == 0) {
                    //console.log(i+",files: "+this.myFiles[i])
                  }
                }
                frmData.append("Input", JSON.stringify(InputData));



                // console.log("Form data: "+ this.wm_loading_advice_itm_dtls.at(0).get("tax_amt").value);

                this.Service.createLoadingAdvice(frmData).subscribe(data => {
                  // console.log(this.userForm.value);
                  alert("New Loading Advice created successfully.");
                  window.location.reload();
                  this.status = true;

                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                  // this.ngOnInit()
                });

              }
              // here ends

            }
            //end
          }

        }
      }


    }
  }

  looseitemshow(event) {
    if (event.checked == false) {
      this.jobworklooseitem = true;
      //console.log(this.jobworklooseitem)
    }
    else {
      if (this.userForm.get("jobwork").value == true) {
        this.jobworklooseitem = false;
        //console.log(this.jobworklooseitem)
      }
      else {
        this.jobworklooseitem = true;
        //console.log(this.jobworklooseitem)
      }
    }
  }

  jobworkshow(event) {
    if (event.checked == false) {
      this.jobworklooseitem = true;
      this.jobtransaction = true;
      this.jobtransaction1 = false;
      this.addItem();
      this.item_sl_no = 0;
      while (this.wm_loading_advice_itm_dtls.length)
        this.wm_loading_advice_itm_dtls.removeAt(0);
      this.selectedAlterItemName = [];
      this.selectedAlterPackingItem = [];
      this.selectedAlterItemName = [];
      this.selectedAlterPackingItem = [];
      this.addItem();
    }
    else {
      this.jobtransaction = false;
      this.jobtransaction1 = true;
      this.addJobItem();
      this.item_sl_no = 0;
      while (this.wm_loading_advice_Item_Dtls_for_jobwork.length)
        this.wm_loading_advice_Item_Dtls_for_jobwork.removeAt(0);
      this.selectedJobItem = [];
      this.selectedJobPacking = []
      this.addJobItem();
      if (this.userForm.get("looseitem").value == true) {
        this.jobworklooseitem = false;
        //console.log(this.jobworklooseitem)
      }
      else {
        this.jobworklooseitem = true;
        // console.log(this.jobworklooseitem)
      }
    }
  }

  onDelete(id: any) {
    this.status = false;
    if (confirm("Are you sure to delete this Load Advice ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deleteLoadingAdvice(this.userForm.getRawValue(), id).subscribe(data => {
        // console.log("advice_id:"+data.advice_id);

        if (data.advice_id == '' || data.advice_id == null) {
          alert("Opps!!! Can't delete this Load Advice !!!");
        } else {
          alert("Load Advice Deleted successfully.");
          this.getProducts({ page: "0", size: "10" });
        }
        this.status = true;
        this.ngOnInit();

      });
    }
    this.status = true;
  }

  onUpdate(id: any, advice_id: string, action) {
    this.userForm.patchValue({ id: id });
    this.loadingadvicesave = true;
    this.shipinformal=false;
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.alter_packingItem = [];
    this.selectedAlterItemName = [];
    this.selectedAlterPackingItem = [];
    if (action == 'view') {
      this.action = 'view';
      this.loadingadvicesave = false;
    }
    else { this.action = 'update'; }

    forkJoin(
      this.Service.retriveLoadingAdvice(id),
      this.Service.loadingDriverRetriveList(advice_id),
      this.Service.loadingTransInfoRetriveListNew(advice_id, this.company_name),
      this.Service.loadingBPDtlsRetriveList(advice_id),
      this.Service.loadingDocRetriveList(advice_id),
      this.Service.getLoadingAdvBrokerDtls(advice_id),
      this.Service.getLoadingAdvPartyDtls(advice_id),
      this.Service.getLoadingAdvShipDtls(advice_id),
      this.DropDownListService.getVehiclenoall(),
      this.DropDownListService.getBankLedger(),
      this.DropDownListService.transporterNamesList(),
      this.DropDownListService.getVehicleThruWeighmentfast(),
      this.DropDownListService.newfastcustomerList(this.company_name),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.payTermNameList(),
      this.DropDownListService.newsupplierNamesList(this.company_name),
      this.Service.getCustomUoms(),
      this.DropDownListService.getdocumentno()

    ).subscribe(([loadingAdviceData, driverData, transData, bpDetailsData, docData, BrokerData, PartyData, shipmentData, Vehicleall,
      bankData, transporterData, vehicleData,
      bpData, BUMNCData, employeeData,
      payTermData, supplierData, customUOMsdata,Document_no_list]) => {
      console.log(" CHECK : : " + JSON.stringify(Document_no_list));
      this.customUOMs = customUOMsdata;
      this.bank_names = bankData;
      this.trans_codes = transporterData;
      this.veh_nos = vehicleData;
      this.listcust_bussiness_partner = bpData;
      this.supplierList = supplierData;
      this.businesslists = BUMNCData;
      this.employeeNames = employeeData;
      this.payTerms = payTermData;
      this.vehicleno_nochange = false;
      this.document_no_list = Document_no_list;

      if (loadingAdviceData["jobwork"] == true && loadingAdviceData["looseitem"] == true) {
        this.jobworklooseitem = false;
      }
      else {
        this.jobworklooseitem = true;
      }
      if (transData["payment_term"] == 'APT00001') {
        this.onday = false;
      }
      else {
        this.onday = true;
      }
      if (transData["transporter_name"] == 0 || transData["transporter_name"] == null) {
        this.veh_nos.splice(0, this.veh_nos.length);
        this.veh_nos = Vehicleall;
      }
      else {
        this.DropDownListService.getsalevehiclelist(transData["transporter_name"]).subscribe(vehicleData => {
          this.veh_nos.splice(0, this.veh_nos.length);
          this.veh_nos = vehicleData;
        });
      }

      if (transData["trans_borne_by"] == "FOR") {
        this.DisableTransporterName = false;
        this.trans_codes = transporterData;
        this.trans_borne_by_chgs = true;
      }
      else {
        this.DisableTransporterName = true;
      }

      if (loadingAdviceData["advice_type"] == "Sale" && loadingAdviceData["ref_doc_type"] == "Sales Order") {
        this.salesOrderPopupStatus = true;
      }

      if (loadingAdviceData["weighment_status"] == 0) {
        this.vehicleno_nochange = false;
      }
      else {
        this.vehicleno_nochange = true;
      }

      if (loadingAdviceData["advice_type"] == "Sale") {
        this.reftypedisablestat = false;
        if (loadingAdviceData["ref_doc_type"] == "Open Advice") {
          this.adviceopenadive = true;
        }
        else {
          this.adviceopenadive = false;
        }
      }
      this.vehicleId = loadingAdviceData["vehicle_id"];
      this.supplier_id = loadingAdviceData["supplier"];
      this.customer_id = loadingAdviceData["bus_partner"];
      this.loadingAdviceType = loadingAdviceData["advice_type"];
      this.currentDate = loadingAdviceData["advice_date"];
      if (loadingAdviceData["advice_type"] != 'Stock Transfer') {
        this.onChangeBussinessPartner(loadingAdviceData["bus_partner"]);
         this.Service.custShipAddDtlsRetriveList(loadingAdviceData["bus_partner"]).subscribe(custshippingdata => {
          this.customerShipDtlsList=custshippingdata;
        });
      }
      else {
        if (loadingAdviceData["delivery_business_unit"] != "0" && loadingAdviceData["delivery_business_unit"] != null) {
          this.status = false;
          this.DropDownListService.getLoadingPointThruBU(loadingAdviceData["delivery_business_unit"]).subscribe(UnloadList => {
            this.UnloadinPointList = UnloadList;
            this.userForm.patchValue({ unloading_point: loadingAdviceData["unloading_point"], delivery_business_unit: loadingAdviceData["delivery_business_unit"] })
            this.status = true;
          });
        }
      }
      if (loadingAdviceData["advice_type"] != "0") {
        if (loadingAdviceData["advice_type"] == "Sale" && loadingAdviceData["ref_doc_type"] == "Sales Order") {
          this.userForm.patchValue({ ref_doc_type: "Sales Order" });
          this.referenceType = 'Sales Order';
        }
        else {
          if (loadingAdviceData["ref_doc_type"] == "Open Advice") {

          }
          else {
            this.userForm.patchValue({ ref_doc_type: loadingAdviceData["advice_type"] });
            this.referenceType = loadingAdviceData["advice_type"];
          }
        }
      }
      //this.onChangeAdviceType(loadingAdviceData["advice_type"]);

      this.onChangeBussinessUnit(loadingAdviceData["b_unit"]);

      /* if(loadingAdviceData["advice_type"] == "Sale")
      {
        this.reftypedisablestat=false;
      }
      else
      {
        this.userForm.patchValue({ref_doc_type: loadingAdviceData["advice_type"]});
        this.referenceType = loadingAdviceData["advice_type"];
        this.reftypedisablestat=true;
      } */

      console.log(" Loading : : " + JSON.stringify(loadingAdviceData));

      this.userForm.patchValue({
        id: loadingAdviceData["id"], advice_no: loadingAdviceData["advice_no"], advice_type: loadingAdviceData["advice_type"],
        advice_date: loadingAdviceData["advice_date"], bus_partner: loadingAdviceData["bus_partner"], customer: loadingAdviceData["customer"], b_unit: loadingAdviceData["b_unit"],
        load_point: loadingAdviceData["load_point"], vehicle_id: loadingAdviceData["vehicle_id"], load_by: loadingAdviceData["load_by"], referance_id: loadingAdviceData["referance_id"],
        erp_usr_name: loadingAdviceData["erp_usr_name"], ref_doc_type: loadingAdviceData["ref_doc_type"], doc_no: loadingAdviceData["doc_no"],
        doc_date: loadingAdviceData["doc_date"], weighment_status: loadingAdviceData["weighment_status"], company_id: loadingAdviceData["company_id"], fin_year: loadingAdviceData["fin_year"],
        remarks: loadingAdviceData["remarks"], advice_id: loadingAdviceData["advice_id"], confirmed_by: loadingAdviceData["confirmed_by"],
        approval: loadingAdviceData["approval"], reason: loadingAdviceData["reason"], unloading_point: loadingAdviceData["unloading_point"],
        delivery_business_unit: loadingAdviceData["delivery_business_unit"], supplier: loadingAdviceData['supplier'], staticuom: loadingAdviceData['staticuom'], multipleloading: loadingAdviceData['multipleloading'], jobwork: loadingAdviceData['jobwork'],
        looseitem: loadingAdviceData['looseitem'], payment_mode: loadingAdviceData['payment_mode'], refraction: loadingAdviceData['refraction'],
        pur_cust_refdocno: loadingAdviceData['pur_cust_refdocno'],pur_cust_refdocnoqty: loadingAdviceData['pur_cust_refdocnoqty'],
        weight_bridge_location:loadingAdviceData["weight_bridge_location"]
      });

      //console.log("order Details 2 2 : "+  JSON.stringify(loadingAdviceData));

      if (loadingAdviceData["jobwork"] == true) {
        this.jobtransaction = false;
        this.jobtransaction1 = true;
        forkJoin(
          this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("b_unit").value, this.company_name, 'INV00003'),
          this.DropDownListService.loadadvicejobworkRetriveList(advice_id),

        ).subscribe(([itemlist, jobData]) => {
          this.jobitemlist = itemlist;
          let j1 = 0;
          this.addJobItem();
          this.job_sl_no = 0;
          while (this.wm_loading_advice_Item_Dtls_for_jobwork.length)
            this.wm_loading_advice_Item_Dtls_for_jobwork.removeAt(0);
          for (let data12 of jobData) {
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data12["job_item"]),
              this.DropDownListService.getItemPackUom(data12["job_item"], data12["job_packing"], this.company_name)).subscribe(([packingList, capacityEmptyWt]) => {
                this.addJobItem();
                this.jobpackinglist[j1] = packingList;
                this.selectedJobItem[j1] = data12["job_item"];
                this.selectedJobPacking[j1] = data12["job_packing"];
                this.capacity[j1] = capacityEmptyWt.capacity;
                console.log("Update : "+JSON.stringify(data12));
                this.wm_loading_advice_Item_Dtls_for_jobwork.at(j1).patchValue({
                  job_item: data12["job_item"], job_packing: data12["job_packing"],
                  job_hsn: data12["job_hsn"], pack_qty: Number(this.round(data12["pack_qty"], 0)), pack_uom: data12["pack_uom"], price_based_on: data12["price_based_on"],
                  item_qty: data12["item_qty"], item_uom: data12["item_uom"], tolerance: data12["tolerance"], job_tolerance_qty: data12["item_qty"]
                });
                j1 = j1 + 1;
                this.status = true;
              });
          }
        });
      }
      else {
        this.jobtransaction = true;
        this.jobtransaction1 = false;
        forkJoin(
          this.Service.loadingItemRetriveList(advice_id)).subscribe(([itemData]) => {
            let k = 0;
            this.addItem()
            this.item_sl_no = 0;
            while (this.wm_loading_advice_itm_dtls.length)
              this.wm_loading_advice_itm_dtls.removeAt(0);
            for (let data1 of itemData) {
              this.Service.getSalesOrdItemDtlsnew(loadingAdviceData["referance_id"]).subscribe(itemdata => {
                this.item_codes = itemdata;
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["alter_item_code"], data1["alter_packing"], this.company_name),
                  this.DropDownListService.getAlternativeItemList(data1["item_code"]),
                  this.DropDownListService.getItemMasterPackMat(data1["alter_item_code"]),
                ).subscribe(([packingList, capacityEmptyWt, alteritem, packlist]) => {
                  this.status = true;
                  this.alter_item_codes[k] = alteritem;
                  this.addItem();
                  this.onChangeWarehouse(data1.warehouse, k);
                  this.packingItem[k] = packingList;
                  this.capacity[k] = capacityEmptyWt["capacity"];
                  this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                  this.selectedItemName[k] = data1["item_code"];
                  this.selectedPackingItem[k] = data1["packing"];
                  this.alter_packingItem[k] = packlist;
                  this.selectedAlterItemName[k] = data1["alter_item_code"];
                  this.selectedAlterPackingItem[k] = data1["alter_packing"];
                  this.wm_loading_advice_itm_dtls.at(k).patchValue(data1);
                  if (loadingAdviceData['refraction']) {
                    this.wm_loading_advice_itm_dtls.at(k).patchValue({ item_tolerance: capacityEmptyWt["tolerance"], tolerance_qty: data1["tolerance_qty"] })
                  }
                  else {
                    this.wm_loading_advice_itm_dtls.at(k).patchValue({ item_tolerance: capacityEmptyWt["tolerance"], tolerance_qty: data1["quantity"] })
                  }

                  k = k + 1;
                });
              });
            }
          });
      }
      this.DropDownListService.getDriverByVehicle(loadingAdviceData["vehicle_id"]).subscribe(data => {
        this.driverNameList = data;
        this.wm_loading_advice_driver_dtls.patchValue(driverData);
        this.status = true;
      });



      this.wm_loading_advice_trans_info.patchValue(transData);
      this.wm_loading_advice_bp_dtls.patchValue(bpDetailsData);
      this.addDocument()
      while (this.wm_loading_advice_doc_attch.length)
        this.wm_loading_advice_doc_attch.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.wm_loading_advice_doc_attch.patchValue(docData);
      this.addBroker()
      while (this.wm_loading_advice_broker_dtls.length)
        this.wm_loading_advice_broker_dtls.removeAt(0);
      for (let data1 of BrokerData)
        this.addBroker();
      this.wm_loading_advice_broker_dtls.patchValue(BrokerData);
      this.addParty()
      while (this.wm_loading_advice_Party_Dtls.length)
        this.wm_loading_advice_Party_Dtls.removeAt(0);
      for (let data1 of PartyData)
        this.addParty();
      this.wm_loading_advice_Party_Dtls.patchValue(PartyData);
      this.wm_loading_advice_Shipment_Dtls.patchValue(shipmentData);
      this.status = true;
    }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }
  }


  onUpdateoldmadebytuhin(id: any, advice_id: string, action) {
    this.userForm.patchValue({ id: id });
    this.showList('add')
    this.loadingadvicesave = true;


    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.alter_packingItem = [];
    this.selectedAlterItemName = [];
    this.selectedAlterPackingItem = [];

    if (action == 'view') {
      this.action = 'view';
      this.loadingadvicesave = false;
    }
    else { this.action = 'update'; }

    forkJoin(
      this.Service.retriveLoadingAdvice(id),
      this.Service.loadingDriverRetriveList(advice_id),
      this.Service.loadingTransInfoRetriveListNew(advice_id, this.company_name),
      this.Service.loadingBPDtlsRetriveList(advice_id),
      this.Service.loadingDocRetriveList(advice_id),
      this.Service.getLoadingAdvBrokerDtls(advice_id),
      this.Service.getLoadingAdvPartyDtls(advice_id),
      this.Service.getLoadingAdvShipDtls(advice_id),
      this.DropDownListService.getVehiclenoall()


    ).subscribe(([loadingAdviceData, driverData, transData, bpDetailsData, docData, BrokerData, PartyData, shipmentData, Vehicleall]) => {
      // console.log("hallu"+transData["transporter_name"]);
      //  this.veh_nos=Vehicleall; //changes on 16052023

      //alert("Transporter name: "+transData["transporter_name"]+"// "+this.veh_nos.length);
      if (transData["transporter_name"] == 0 || transData["transporter_name"] == null) {
        this.veh_nos.splice(0, this.veh_nos.length);
        this.veh_nos = Vehicleall;
      }
      else {
        this.DropDownListService.getsalevehiclelist(transData["transporter_name"]).subscribe(vehicleData => {


          console.log(transData["transporter_name"] + "vehicleData update time:" + JSON.stringify(vehicleData))
          this.veh_nos.splice(0, this.veh_nos.length);
          this.veh_nos = vehicleData;

        });
      }




      if (loadingAdviceData["advice_type"] == "Sale" && loadingAdviceData["ref_doc_type"] == "Sales Order") {
        this.salesOrderPopupStatus = true;
      }

      if (loadingAdviceData["weighment_status"] == 0) {
        this.vehicleno_nochange = false;
      }
      else {
        this.vehicleno_nochange = true;
      }


      console.log("adv type check:" + loadingAdviceData["advice_type"])

      if (loadingAdviceData["advice_type"] == "Sale") {
        this.reftypedisablestat = false;

        if (loadingAdviceData["ref_doc_type"] == "Open Advice") {
          this.adviceopenadive = true;
        }
        else {
          this.adviceopenadive = false;
        }
      }

      this.vehicleId = loadingAdviceData["vehicle_id"];


      this.supplier_id = loadingAdviceData["supplier"];
      this.customer_id = loadingAdviceData["bus_partner"];
      this.loadingAdviceType = loadingAdviceData["advice_type"];
      this.currentDate = loadingAdviceData["advice_date"];

      if (loadingAdviceData["advice_type"] != 'Stock Transfer') {
        this.onChangeBussinessPartner(loadingAdviceData["bus_partner"]);
      }
      else {
        if (loadingAdviceData["delivery_business_unit"] != "0" && loadingAdviceData["delivery_business_unit"] != null) {
          this.status = false;
          this.DropDownListService.getLoadingPointThruBU(loadingAdviceData["delivery_business_unit"]).subscribe(UnloadList => {
            this.UnloadinPointList = UnloadList;
            // console.log("UnloadinPointList"+JSON.stringify(this.UnloadinPointList))
            this.userForm.patchValue({
              unloading_point: loadingAdviceData["unloading_point"],
              delivery_business_unit: loadingAdviceData["delivery_business_unit"]
            })
            this.status = true;
          });
        }
      }

      if (loadingAdviceData["advice_type"] != "0") {
        if (loadingAdviceData["advice_type"] == "Sale" && loadingAdviceData["ref_doc_type"] == "Sales Order") {
          this.userForm.patchValue({ ref_doc_type: "Sales Order" });
          this.referenceType = 'Sales Order';
        }
        else {
          if (loadingAdviceData["ref_doc_type"] == "Open Advice") {

          }
          else {
            this.userForm.patchValue({ ref_doc_type: loadingAdviceData["advice_type"] });
            this.referenceType = loadingAdviceData["advice_type"];
          }

        }
      }
      this.onChangeAdviceType(loadingAdviceData["advice_type"]);
      // this.onChangeVehicleNo(loadingAdviceData["vehicle_id"]);
      this.onChangeBussinessUnit(loadingAdviceData["b_unit"]);

      console.log("Loading : " + JSON.stringify(loadingAdviceData));

      //alert("Transporter name: "+transData["transporter_name"]+"// "+this.veh_nos.length);

      this.userForm.patchValue({
        id: loadingAdviceData["id"], advice_no: loadingAdviceData["advice_no"], advice_type: loadingAdviceData["advice_type"],
        advice_date: loadingAdviceData["advice_date"], bus_partner: loadingAdviceData["bus_partner"], customer: loadingAdviceData["customer"], b_unit: loadingAdviceData["b_unit"],
        load_point: loadingAdviceData["load_point"], vehicle_id: loadingAdviceData["vehicle_id"], load_by: loadingAdviceData["load_by"], referance_id: loadingAdviceData["referance_id"],
        erp_usr_name: loadingAdviceData["erp_usr_name"], ref_doc_type: loadingAdviceData["ref_doc_type"], doc_no: loadingAdviceData["doc_no"],
        doc_date: loadingAdviceData["doc_date"], weighment_status: loadingAdviceData["weighment_status"], company_id: loadingAdviceData["company_id"], fin_year: loadingAdviceData["fin_year"],
        remarks: loadingAdviceData["remarks"], advice_id: loadingAdviceData["advice_id"], confirmed_by: loadingAdviceData["confirmed_by"],
        approval: loadingAdviceData["approval"], reason: loadingAdviceData["reason"], unloading_point: loadingAdviceData["unloading_point"],
        delivery_business_unit: loadingAdviceData["delivery_business_unit"], supplier: loadingAdviceData['supplier'], staticuom: loadingAdviceData['staticuom'], multipleloading: loadingAdviceData['multipleloading'], jobwork: loadingAdviceData['jobwork'], 
        looseitem: loadingAdviceData['looseitem'],weight_bridge_location:loadingAdviceData["weight_bridge_location"]
      });
      console.log("order Details: " + JSON.stringify(loadingAdviceData));

      // console.log("itemData: "+  JSON.stringify(itemData));
      // console.log("jobwork: "+ loadingAdviceData["jobwork"]);
      //bidhan starts       
      if (loadingAdviceData["jobwork"] == true) {
        this.jobtransaction = false;
        this.jobtransaction1 = true;
        // console.log("enter job work"+advice_id)
        forkJoin(
          this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("b_unit").value, this.company_name, 'INV00003'),
          this.DropDownListService.loadadvicejobworkRetriveList(advice_id),
          //this.DropDownListService.loadingItemjobworkRetriveList(advice_id), 

        ).subscribe(([itemlist, jobData]) => {
          // console.log("job work item list:"+JSON.stringify(itemlist))
          //console.log("job work item update time:"+JSON.stringify(jobData))
          this.jobitemlist = itemlist;
          let j1 = 0;
          this.addJobItem();
          this.job_sl_no = 0;
          while (this.wm_loading_advice_Item_Dtls_for_jobwork.length)
            this.wm_loading_advice_Item_Dtls_for_jobwork.removeAt(0);
          for (let data12 of jobData) {

            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data12["job_item"])).subscribe(([packingList]) => { //console.log("jobpackinglist:"+JSON.stringify(packingList))
                this.addJobItem();
                this.jobpackinglist[j1] = packingList;

                this.selectedJobItem[j1] = data12["job_item"];
                this.selectedJobPacking[j1] = data12["job_packing"];
                //console.log("packing"+data12["job_packing"])
                this.wm_loading_advice_Item_Dtls_for_jobwork.at(j1).patchValue({
                  job_item: data12["job_item"], job_packing: data12["job_packing"],
                  job_hsn: data12["job_hsn"], pack_qty: data12["pack_qty"], pack_uom: data12["pack_uom"], price_based_on: data12["price_based_on"],
                  item_qty: data12["item_qty"], item_uom: data12["item_uom"], tolerance: data12["tolerance"], job_tolerance_qty: data12["item_qty"]
                });
                j1 = j1 + 1;
                this.status = true;
              });
          }
        });
      }
      else {
        this.jobtransaction = true;
        this.jobtransaction1 = false;

        forkJoin(
          this.Service.loadingItemRetriveList(advice_id),
        ).subscribe(([itemData]) => {
          let k = 0;
          this.addItem()
          this.item_sl_no = 0;
          while (this.wm_loading_advice_itm_dtls.length)
            this.wm_loading_advice_itm_dtls.removeAt(0);
          for (let data1 of itemData) {
            this.Service.getSalesOrdItemDtlsnew(loadingAdviceData["referance_id"]).subscribe(itemdata => {
              // console.log("itemdata:"+JSON.stringify(itemdata))
              this.item_codes = itemdata;

              this.status = false;
              forkJoin(
                this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                this.DropDownListService.getAlternativeItemList(data1["item_code"]),
                this.DropDownListService.getItemMasterPackMat(data1["alter_item_code"]),
              ).subscribe(([packingList, capacityEmptyWt, alteritem, packlist]) => {
                this.status = true;
                this.alter_item_codes[k] = alteritem;
                this.addItem();
                this.onChangeWarehouse(data1.warehouse, k);
                this.packingItem[k] = packingList;
                this.capacity[k] = capacityEmptyWt["capacity"];
                this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                this.selectedItemName[k] = data1["item_code"];
                this.selectedPackingItem[k] = data1["packing"];
                this.alter_packingItem[k] = packlist;
                this.selectedAlterItemName[k] = data1["alter_item_code"];
                this.selectedAlterPackingItem[k] = data1["alter_packing"];
                this.wm_loading_advice_itm_dtls.at(k).patchValue(data1);
                this.wm_loading_advice_itm_dtls.at(k).patchValue({ item_tolerance: capacityEmptyWt["tolerance"], tolerance_qty: data1["quantity"] })
                k = k + 1;
              });
            });
          }
        });
      }

      this.DropDownListService.getDriverByVehicle(loadingAdviceData["vehicle_id"]).subscribe(data => {
        this.driverNameList = data;
        this.wm_loading_advice_driver_dtls.patchValue(driverData);
        this.status = true;
      });
      //console.log("Driver: "+  JSON.stringify(driverData));
      //this.wm_loading_advice_driver_dtls.patchValue(driverData);

      //bidhan ends

      // console.log("Trans: "+  JSON.stringify(transData));
      this.wm_loading_advice_trans_info.patchValue(transData);

      //console.log("BP details: "+  JSON.stringify(bpDetailsData));
      this.wm_loading_advice_bp_dtls.patchValue(bpDetailsData);

      this.addDocument()
      while (this.wm_loading_advice_doc_attch.length)
        this.wm_loading_advice_doc_attch.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.wm_loading_advice_doc_attch.patchValue(docData);
      // console.log("docData: "+JSON.stringify(docData));

      this.addBroker()
      while (this.wm_loading_advice_broker_dtls.length)
        this.wm_loading_advice_broker_dtls.removeAt(0);
      for (let data1 of BrokerData)
        this.addBroker();
      this.wm_loading_advice_broker_dtls.patchValue(BrokerData);
      //console.log("BrokerData: "+JSON.stringify(BrokerData));

      this.addParty()
      while (this.wm_loading_advice_Party_Dtls.length)
        this.wm_loading_advice_Party_Dtls.removeAt(0);
      for (let data1 of PartyData)
        this.addParty();
      this.wm_loading_advice_Party_Dtls.patchValue(PartyData);
      //   console.log("PartyData: "+JSON.stringify(PartyData));

      // console.log("shipmentData: "+  JSON.stringify(shipmentData));
      this.wm_loading_advice_Shipment_Dtls.patchValue(shipmentData);



      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }
  }
  onPrint(id, loading_id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    let comp = this.company_name;
    let dialogRef = this.dialog.open(LoadingAdvicePrintComponent, {
      data: { alldata: id, loadingid: loading_id, company_name: comp }, height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(data => {
      // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
    });
  }

  onFileSelected(e, i, tm) {

    this.myFiles.push(e.target.files[0]);//abc

    for (let v = 0; v < this.myFiles.length; v++)//v hoache files array length
    {

      if (this.myFiles.length > tm.length) {
        if (v == i)//if size greater than 1
        {

          this.myFiles[i] = e.target.files[0];

          this.myFiles.pop();

        }
      }

    }


  }

  //
  getProducts(request) {
    // console.log("tuhin req "+request.size);
    this.DropDownListService.getLoadingAdvices_pagination(request.page, request.size)
      .subscribe(data => {
        this.listLoadingAdvice = data['content'];
        this.totalElements = data['totalElements'];
      }
        , error => {
          console.log(error.error.message);
        }
      );
  }
  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getProducts(request);
  }

  searchsaleorder(event) {
    this.status = true;
    let serchText = event.target.value;
    if (event.key == "Enter") {

      if (serchText == null || serchText == undefined || serchText == '' || serchText == '0') {
        this.getProducts({ page: "0", size: "10" });
        this.status = true;
      }
      else {
        // console.log("2" + serchText);
        this.DropDownListService.findsaleorder(serchText).subscribe(data => {
          this.listLoadingAdvice = data

          this.status = true;
        });
      }
    }

  }
  search() {
    let order1_no = this.userForm1.get("order1_no").value;
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let bus_partner1 = this.userForm1.get("bus_partner1").value;
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchLoadingAdviceFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&bus_partner1=" + bus_partner1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listLoadingAdvice = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Loading Advice Not Found !!!")
      this.listLoadingAdvice = [];
    })
  }

  onChangedocumentpo(pur_cust_refdocno: string) {
    if (pur_cust_refdocno.length) {
      this.document_no_list.forEach(element => {
        if (element.document_no == pur_cust_refdocno) {
          console.log(element)
          //this.userForm.patchValue({ pur_cust_refdocnoqty: element.rest_wt })
          this.userForm.patchValue({ pur_cust_refdocnoqty: this.round(element.rest_wt,2) });
        }
      })

    }
  }
}
