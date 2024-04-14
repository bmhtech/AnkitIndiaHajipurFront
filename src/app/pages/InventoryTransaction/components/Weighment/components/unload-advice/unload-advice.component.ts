import { Component, OnInit, ClassProvider } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UnloadAdvice } from '../../../../../../Models/Weightment/unload-advice';
import { Master } from '../../../../../../service/master.service';
import { AddNewVechilePopUpComponent } from '../add-new-vechile-pop-up/add-new-vechile-pop-up.component';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PurchaseOrdPopUpModalComponent } from '../../components/purchase-ord-pop-up-modal/purchase-ord-pop-up-modal.component';
import { UnloadAdviceDrivingPopupComponent } from '../unload-advice-driving-popup/unload-advice-driving-popup.component';
import { forkJoin } from 'rxjs';
import { SalesReturnApprovalNotePopUpComponent } from '../sales-return-approval-note-pop-up/sales-return-approval-note-pop-up.component';
import { UnloadBillPrintComponent } from '../unload-bill-print/unload-bill-print.component';
import { DriverprintpopupComponent } from '../driverprintpopup/driverprintpopup.component';
import { StockTransferUnloadingAfterInvoiceComponent } from '../stock-transfer-unloading-after-invoice/stock-transfer-unloading-after-invoice.component';
import { PageEvent } from '@angular/material';
import { Console } from 'console';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { UnloadAdviceJobworkComponent } from '../unload-advice-jobwork/unload-advice-jobwork.component';

@Component({
  selector: 'app-unload-advice',
  templateUrl: './unload-advice.component.html',
  styleUrls: ['./unload-advice.component.scss']
})

export class UnloadAdviceComponent implements OnInit {
  public userForm: FormGroup;
  submitted = false;
  listUnloadAdvice: UnloadAdvice[];
  model: UnloadAdvice = new UnloadAdvice();
  itemtypes: any = [];
  referenceTypeList: any = [];
  ledgerNames: any = [];
  businessPartnerList: any = [];
  vehclenos: any = [];
  Id: any;
  // customUOMs:{};
  customUOMs: any = [];
  item_codes: any = [];
  gitemname: {};
  contAddrs: any = [];
  chargesIdList: {};
  transBrone: any[];
  transporterNames: any = [];
  bussiness_unit_list: any = [];
  modeOfTransport: any = [];
  transRate: any = [];
  payModes: any = [];
  payTerms: any = [];
  brokerNameList: any = [];
  driver_names: any = [];
  warehouses: any = [];
  chargesList: any = [];
  isBrokerageApplicable: any;
  item_sl_no = 1;
  broker_sl_no = 1;
  seq_no: string;
  currentDate: any;
  isTcsApplicable: any;
  status: any;
  isHidden: any;
  isBrokerDtlsHidden: any;
  financialYear: any;
  businessUnit: any;
  _tareWt: number;
  _grossWt: number;
  selectedAdviceType: any;
  refNo: boolean = true;
  _referenceNo: any;
  selectedDocumentType: any;
  transporter_id: any;
  WeighBridgeList: any = [];
  empty_bag_wt_priceBasedOn: any = [];
  orderNo: any;
  company_name: any;
  adviceType: any;
  supplier_id: any;
  customer_id: any;
  action: any;
  unloadadvicesave: boolean = true;
  unloadadviceupdate: boolean = true;
  unloadadviceview: boolean = true;
  unloadadvicedelete: boolean = true;
  unloadadvicebillprint: boolean = true;
  imageURL: string;
  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  brokerdetailsshow: boolean = true;
  transportdetailsshow: boolean = true;
  showaddrow: boolean = false;
  openadvice: boolean = false;
  no_advice_cal: any = [];
  final_mat_wt: any = [];
  showstatus: any;
  FinalTotal_qty: any;
  business_unit1: any;
  ref_type1: any;
  item_type1: any;
  customer1: any;
  item_subtype1: any;
  transporter_code1: any;
  uomnew: any;
  jobworklooseitem: boolean = false;
  itemstatus: any = [];
  packingstatus: any = [];
  packingqtystatus: any = [];
  itemqtystatus: any = [];
  brokerdetailstatus: any = [];
  tolerance: any = [];
  validTransport: boolean = false;
  view_image: any;
  transportownstatus: any;
  popupstatus: boolean = false;
  salesreturnstatus: boolean = false;
  qc_normsList: any = [];

  poitemnumberstatus: boolean = true;
  jobtransaction: boolean = false;
  myFiles: any = [];
  file_name: string;
  totalElements: number = 0;
  public userForm1: FormGroup;
  business_Partner_List: any = [];
  showgstno: any;
  totalmatwtvalue: any;
  job_sl_no = 1;
  selectedJobPacking: any = [];
  selectedJobItem: any = [];
  jobpackinglist: any = [];
  jobitemlist: any = [];

  storepurchase: boolean = false;

  potype_packing: boolean = false;

  constructor(public fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService, private dialog: MatDialog) {
    this.userForm = fb.group({
      pur_orderid: [''],
      id: [''],
      unadviceid: [''],
      item_type: [''],
      transporter_code: [''],
      item_subtype: [''],
      busi_partner: [''],
      ref_type: [''],
      ul_date: [''],
      we_req: [''],
      we_chg_app: [''],
      supp_ref_doc: [''],
      supp_ref_docno: [''],
      supp_ref_doc_date: [''],
      ula_date: [''],
      business_unit: [''],
      vehicle_id: [''],
      total_qty: [''],
      uom: [''],
      return_type: [''],
      return_remarks: [''],
      remarks: [''],
      brokerage_active: [''],
      app_chgs_id: [''],
      unadviceno: [''],
      advice_type: [''],
      qc_required: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      referance_id: [''],
      customer: [''],
      total_qty_copy: [''],
      poitemnumber: [''],
      jobwork: [''],
      looseitem: [''],


      wm_unload_advice_item_dtls: this.fb.array([this.fb.group({
        sl_no: this.item_sl_no,
        item_code: '',
        classified_item_name: '',
        packing: '',
        packing_item_code: '',
        packing_type: '',
        packing_size: '',
        packing_weight: '',
        quantity: '0',
        toleranceqty: '0',
        uom: '',
        s_qty: '0',
        s_uom: '',
        con_factor: '0',
        mat_wt: '',
        qc_norms: '',
        wearhouse: '',
        rack: '',
        base_uom: '',
        base_qty: '',
        pur_dyn_id: '',
        price_based_on: '',
      })]),


      wm_unload_advice_item_dtls_for_jobwork: this.fb.array([this.fb.group({
        sl_no: this.job_sl_no,
        job_item: '',
        job_packing: '',
        job_hsn: '',
        pack_qty: '',
        pack_uom: '',
        price_based_on: '',
        item_qty: '',
        item_uom: '',
        mat_wt: '',
        tolerance: ''
      })]),

      wm_unload_advice_party_wm: this.fb.group({
        gross_wt: '',
        uom1: '',
        tare_wt: '',
        uom2: '',
        net_wt: '',
        uom3: '',
        slip_no: '',
        pw_date: '',
        wb_name: ''
      }),

      wm_unload_advice_driver_dtls: this.fb.group({
        spot_trans: '',
        remarks: '',
        driver_name: '',
        phone: '',
        address: '',
        doc_type: '',
        doc_no: '',
        description: '',
        doc_img: '',
      }),

      wm_unload_advice_broker_dtls: this.fb.array([this.fb.group({
        sl_no: this.broker_sl_no,
        ven_code_name: '',
        basis: '',
        rate: '',
        brokerage_acc: '',
        tds_rate: '',
        tds_acc: ''
      })]),

      wm_unload_advice_trans_info: this.fb.group({
        trans_borne_by: '',
        transporter_name: '',
        mode_of_trans: '',
        transport_rate: '',
        charge_code: '',
        rate_value: '',
        payment_mode: '',
        payment_terms: '',
        bank_name: '',
        account_name: '',
        account_no: '',
        branch: '',
        iban: '',
        bic_swift_code: '',
        mobile: '',
        ifsc_code: '',
        cash_limit: ''
      }),

      wm_unload_advice_terms_con: this.fb.group({
        payment_mode: '',
        payment_terms: '',
        bank_name: '',
        account_name: '',
        account_no: '',
        branch: '',
        iban: '',
        bic_swift_code: '',
        cash_limit: '',
        ifsc: '',
        mobile: '',
        tcs_applicable: '',
        tcs_rate: '',
      }),

      wm_unload_advice_bp_dtls: this.fb.group({
        sp_name: '',
        sp_phone: '',
        sp_fax: '',
        sp_email: '',
        sp_address: '',
        cp_name: '',
        cp_designation: '',
        cp_phone: '',
        cp_fax: '',
        cp_email: '',
        cp_address: ''
      }),

      wm_unload_advice_app_chgs: this.fb.array([this.fb.group({
        charges_name: '',
        rate_cal_method: '',
        tax_rate: '',
        amount: ''
      })]),

      wm_unload_advice_docs: this.fb.array([this.fb.group({
        doc_name: ''
      })]),

      wm_unload_advice_docs_list: this.fb.array([this.fb.group({
        doc_name: '',
        doc_pdf: '',

      })])
    });

    this.userForm1 = fb.group({
      order1_no: [''],
      fromdate: [''],
      todate: [''],
      busi_partner1: ['']

    });

  }

  get order1_no() { return this.userForm1.get("order1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get busi_partner1() { return this.userForm1.get("busi_partner1") as FormControl }

  get total_qty_copy() { return this.userForm.get("total_qty_copy") as FormControl }
  get unadviceid() { return this.userForm.get("unadviceid") as FormControl }
  get id() { return this.userForm.get("id") as FormControl }
  get transporter_code() { return this.userForm.get("transporter_code") as FormControl }
  get transporter_name() { return this.userForm.get("transporter_name") as FormControl }
  get item_type() { return this.userForm.get("item_type") as FormControl }
  get item_subtype() { return this.userForm.get("item_subtype") as FormControl }
  get customer() { return this.userForm.get("customer") as FormControl }
  get busi_partner() { return this.userForm.get("busi_partner") as FormControl }
  get ref_type() { return this.userForm.get("ref_type") as FormControl }
  get ul_date() { return this.userForm.get("ul_date") as FormControl }
  get we_req() { return this.userForm.get("we_req") as FormControl }
  get we_chg_app() { return this.userForm.get("we_chg_app") as FormControl }
  get supp_ref_doc() { return this.userForm.get("supp_ref_doc") as FormControl }
  get supp_ref_docno() { return this.userForm.get("supp_ref_docno") as FormControl }
  get ula_date() { return this.userForm.get("ula_date") as FormControl }
  get business_unit() { return this.userForm.get("business_unit") as FormControl }
  get vehicle_no() { return this.userForm.get("vehicle_no") as FormControl }
  get total_qty() { return this.userForm.get("total_qty") as FormControl }
  get uom() { return this.userForm.get("uom") as FormControl }
  get return_type() { return this.userForm.get("return_type") as FormControl }
  get return_remarks() { return this.userForm.get("return_remarks") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get brokerage_active() { return this.userForm.get("brokerage_active") as FormControl }
  get app_chgs_id() { return this.userForm.get("app_chgs_id") as FormControl }
  get wm_unload_advice_item_dtls() { return this.userForm.get('wm_unload_advice_item_dtls') as FormArray; }
  get wm_unload_advice_item_dtls_for_jobwork() { return this.userForm.get('wm_unload_advice_item_dtls_for_jobwork') as FormArray; }

  get wm_unload_advice_party_wm() { return this.userForm.get('wm_unload_advice_party_wm') as FormGroup; }
  get wm_unload_advice_driver_dtls() { return this.userForm.get('wm_unload_advice_driver_dtls') as FormGroup; }
  get wm_unload_advice_broker_dtls() { return this.userForm.get('wm_unload_advice_broker_dtls') as FormArray; }
  get wm_unload__advice_trans_info() { return this.userForm.get('wm_unload__advice_trans_info') as FormGroup; }
  get wm_unload_advice_terms_con() { return this.userForm.get('wm_unload_advice_terms_con') as FormGroup; }
  get wm_unload_advice_bp_dtls() { return this.userForm.get('wm_unload_advice_bp_dtls') as FormGroup; }
  get wm_unload_advice_trans_info() { return this.userForm.get('wm_unload_advice_trans_info') as FormGroup; }
  get wm_unload_advice_app_chgs() { return this.userForm.get('wm_unload_advice_app_chgs') as FormArray; }
  get wm_unload_advice_docs() { return this.userForm.get('wm_unload_advice_docs') as FormArray; }
  get wm_unload_advice_docs_list() { return this.userForm.get('wm_unload_advice_docs_list') as FormArray; }

  ngOnInit() {
    //For User Role

    //this.getProducts({ page: "0", size: "10" });

    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.unloadadvicesave = false;
    this.unloadadviceupdate = false;
    this.unloadadviceview = false;
    this.unloadadvicebillprint = false;
    this.unloadadvicedelete = false;
    //console.log("chk/"+JSON.stringify(data))
    if (accessdata.includes('unload_advice.save')) {
      this.unloadadvicesave = true;
    }
    if (accessdata.includes('unload_advice.update')) {
      this.unloadadviceupdate = true;
    }
    if (accessdata.includes('unload_advice.view')) {
      this.unloadadviceview = true;
    }
    if (accessdata.includes('unload_advice.print')) {
      this.unloadadvicebillprint = true;
    }
    if (accessdata.includes('unload_advice.delete')) {
      this.unloadadvicedelete = true;
    }

    //}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    //this.ngOnInit()});

    this.status = false;
    this.isHidden = false;
    this.empty_bag_wt_priceBasedOn = [];
    this.empty_bag_wt = [];
    this.capacity = [];
    this.tolerance = [];
    this.packingItem = [];
    this._tareWt = 0;
    this._grossWt = 0;
    this.adviceType = "0";
    this.businessUnit = "0";
    this.userForm.patchValue({ app_chgs_id: "0" });
    this.selectedDocumentType = "Driving Licence";
    this.selectedAdviceType = "Purchase Order";
    this.refNo = true;
    this._referenceNo = "0";
    this.transporter_id = '0';
    this.supplier_id = "0";
    this.customer_id = "0";
    this.ref_type1 = "0";
    this.business_unit1 = "0";
    this.item_type1 = "0";
    this.customer1 = "0";
    this.item_subtype1 = "0";
    this.transporter_code1 = "0";
    this.uomnew = "0";
    this.storepurchase = false;
    this.potype_packing = false;

    this.wm_unload_advice_driver_dtls.patchValue({ driver_name: "0" })
    this.wm_unload_advice_broker_dtls.at(0).patchValue({ ven_code_name: 0 });
    this.wm_unload_advice_party_wm.patchValue({ gross_wt: 0, tare_wt: 0, net_wt: 0 })


    this.action = 'update';
    this.company_name = localStorage.getItem("company_name");
    this.orderNo = '0';
    this.isBrokerDtlsHidden = true;
    this.isBrokerageApplicable = false;
    this.isTcsApplicable = false;
    this.financialYear = localStorage.getItem("financial_year");
    this.transBrone = ["FOB", "FOR"];
    this.modeOfTransport = ["By Air", "By Rail", "By Road", "By Ship", "By Train", "By Vehicle", "By Water", "By Other"];
    this.transRate = ["PER TRUCK", "PER UOM"];
    this.payModes = ["Cash", "Card", "Cheque", "DD", "NEFT", "RTGS"];
    this.referenceTypeList = [{ "name": "Choose an Option", "value": "0" }];
    //this.userForm.patchValue({ referance_id: "0", id: "0"});
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      console.log("sucess");
    }
    else {
      alert("Current date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }

    this.company_name = localStorage.getItem("company_name");


    forkJoin(
      this.DropDownListService.supplierorcustomerCodeListNew(this.company_name),
      //this.DropDownListService.getUnloaDataList(this.currentDate,this.financialYear)
      this.DropDownListService.getUnloaDataListfastapi(this.currentDate, this.financialYear)
    ).subscribe(([data, unloadData]) => {
      this.business_Partner_List = data;
      this.listUnloadAdvice = unloadData;
    });

    this.status = true;
    if (localStorage.getItem("svalue") == 'true') {
      this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
    }
  }

  onChangeServicesItemType(itemSubType: string, refType) {
    if (itemSubType != "0") {
      this.status = false;
      if (refType != 'Open Advice')
        this.userForm.get("item_subtype").enable();
      else
        this.userForm.get("item_subtype").disable();

      if (itemSubType == 'ITMT00008') {
        this.getUnloadNonew(this.userForm.get("business_unit").value);
        this.DropDownListService.getItemThruType("ITMT00001").subscribe(data => {
          this.item_codes = data;
          this.status = true;
        })
      }
      else {
        this.DropDownListService.getItemThruType(itemSubType).subscribe(data => {
          this.item_codes = data;
          this.status = true;
        })
      }
      if (itemSubType == 'ITMT00004') {
        console.log(" Store Purchase")
        this.storepurchase = true;
      }
      else {
        this.storepurchase = false;
      }

      if (itemSubType == 'ITMT00002')//packing
      {
        this.potype_packing = true;
      }
      else {
        this.potype_packing = false;
      }
    }
  }

  addItemupdate() {
    this.item_sl_no = this.item_sl_no + 1;
    this.wm_unload_advice_item_dtls.push(this.fb.group({
      sl_no: this.item_sl_no,
      item_code: '',
      classified_item_name: '',
      packing: '',
      packing_item_code: '',
      packing_type: '',
      packing_size: '',
      packing_weight: '',
      quantity: '',
      toleranceqty: '0',
      uom: '',
      s_qty: '',
      s_uom: '',
      con_factor: '0',
      mat_wt: '',
      qc_norms: '',
      wearhouse: '',
      rack: '',
      base_uom: '',
      base_qty: '',
      price_based_on:''
    }));

    console.log(" status  : :" + this.showstatus)
    if (this.poitemnumberstatus == false && this.showstatus == "onShowStatus") {
      this.wm_unload_advice_item_dtls.at(this.item_sl_no - 1).patchValue({
        item_code: this.wm_unload_advice_item_dtls.at(0).get("item_code").value,
        packing: "0",
        quantity: 0,
        toleranceqty: 0,
        s_qty: 0,
        con_factor: 0
      });
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(this.wm_unload_advice_item_dtls.at(0).get("item_code").value, this.company_name),
        this.DropDownListService.getItemMasterPackMat(this.wm_unload_advice_item_dtls.at(0).get("item_code").value),
        this.DropDownListService.getItemQCDetails(this.wm_unload_advice_item_dtls.at(0).get("item_code").value, this.company_name)
      ).subscribe(([data, data1, data2]) => {
        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => {
          this.wm_unload_advice_item_dtls.at(this.item_sl_no - 1).patchValue({ uom: data.description });
        });

        this.packingItem[this.item_sl_no - 1] = data1;
        this.wm_unload_advice_item_dtls.at(this.item_sl_no - 1).patchValue({ qc_norms: data2[0].qc_code });
        this.status = true;
      })
    }
    else {
      this.wm_unload_advice_item_dtls.at(this.item_sl_no - 1).patchValue({
        item_code: "0", packing: "0",
        quantity: 0, toleranceqty: 0, s_qty: 0, con_factor: 0
      });
    }
  }

  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.wm_unload_advice_item_dtls.push(this.fb.group({
      sl_no: this.item_sl_no,
      item_code: '',
      classified_item_name: '',
      packing: '',
      packing_item_code: '',
      packing_size: '',
      packing_weight: '',
      packing_type: '',
      quantity: '',
      toleranceqty: '0',
      uom: '',
      s_qty: '',
      s_uom: '',
      con_factor: '0',
      mat_wt: '',
      qc_norms: '',
      wearhouse: '',
      rack: '',
      base_uom: '',
      base_qty: '',
      price_based_on: ''
    }));
    //console.log(" status  : :"+this.showstatus)
    this.wm_unload_advice_item_dtls.at(this.item_sl_no - 1).patchValue({
      item_code: "0", packing: "0",
      quantity: 0, toleranceqty: 0, s_qty: 0, con_factor: 0
    });
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      this.packingItem.splice(index, 1);
      this.capacity.splice(index, 1);
      this.tolerance.splice(index, 1);
      this.qc_normsList.splice(index, 1);
      this.wm_unload_advice_item_dtls.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.wm_unload_advice_item_dtls.reset();
      this.wm_unload_advice_item_dtls.at(0).patchValue({ sl_no: this.item_sl_no });
    }
    for (let i = 1; i <= this.item_sl_no; i++)
      this.wm_unload_advice_item_dtls.at(i - 1).patchValue({ sl_no: i });
  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.wm_unload_advice_broker_dtls.push(this.fb.group({
      sl_no: this.broker_sl_no,
      ven_code_name: '',
      basis: '',
      rate: '',
      brokerage_acc: '',
      tds_rate: '',
      tds_acc: ''
    }));
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.wm_unload_advice_broker_dtls.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.wm_unload_advice_broker_dtls.reset();
      this.wm_unload_advice_broker_dtls.at(0).patchValue({ sl_no: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.wm_unload_advice_broker_dtls.at(i - 1).patchValue({ sl_no: i });
  }

  addDocument() {
    this.wm_unload_advice_docs.push(this.fb.group({
      doc_name: ''
    }));
  }
  addDocumentlist() {
    this.wm_unload_advice_docs_list.push(this.fb.group({
      doc_name: '',
      doc_pdf: ''
    }));
  }

  deleteDocument(index) {
    if (index) { this.wm_unload_advice_docs.removeAt(index); }
    else {
      alert("can't delete all rows");
      this.wm_unload_advice_docs.reset();
    }
  }

  deleteDocumentlist(index) {
    this.wm_unload_advice_docs_list.removeAt(index);
  }

  onChangeUom(event) {
    //alert(event);
    this.wm_unload_advice_party_wm.patchValue({ uom3: event, uom2: event, uom1: event });
  }

  onChangeAdviceType(adviceType: string) {
    //alert("Type:>> "+adviceType);
    this.openbuttonstatus(adviceType);
    this.userForm.patchValue({ ref_type: "0" });
    if (adviceType != "0") {
      if (adviceType == 'Sales Return' && this.businessUnit != "0") {
        this.salesreturnstatus = true;
        this.brokerdetailsshow = true;
        this.transportdetailsshow = true;


        this.status = false;
        this.adviceType = 'Sales Return';
        //this.DropDownListService.getCustomerThruBU(this.businessUnit).subscribe(data=>
        this.DropDownListService.getCustomerThruBUnewlist(this.businessUnit).subscribe(data => {
          // console.log("businessPartnerList here : "+JSON.stringify(data));
          this.status = true;
          this.businessPartnerList = data;
        });
      }
      else if (this.businessUnit != "0") {
        this.status = false;
        //this.DropDownListService.getSupplierThruBU(this.businessUnit).subscribe(data=>
        this.DropDownListService.getSupplierThruBUNew(this.businessUnit).subscribe(data => {
          this.status = true;
          this.businessPartnerList = data;
        });
      } else { }

      if (adviceType == 'Stock Transfer') {
        this.referenceTypeList = [{ "name": "Stock Transfer", "value": "Stock Transfer" }];
        this.DropDownListService.transporterNamesList().subscribe(data => { this.transporterNames = data; });
        this.adviceType = 'Stock Transfer';
        this.userForm.patchValue({ ref_type: 'Stock Transfer' });
        if (this.businessUnit != "0") { this.onChangeBusinessUnit(this.businessUnit, 'update'); }

        this.brokerdetailsshow = false;
        this.transportdetailsshow = false;
      }
      else if (adviceType == 'Purchase Order') {
        this.brokerdetailsshow = true;
        this.transportdetailsshow = true;

        this.adviceType = 'Purchase Order';
        this.userForm.patchValue({ ref_type: 'Purchase Order' });
        this.referenceTypeList = [{ "name": "Open Advice", "value": "Open Advice" },
        { "name": "Purchase Order", "value": "Purchase Order" }];
      }
      else if (adviceType == 'Sales Return') {
        this.referenceTypeList = [{ "name": "Sales Return", "value": "Sales Return" }];
        this.adviceType = 'Sales Return';
        this.userForm.patchValue({ ref_type: "Sales Return" });
      } else { }

    }
  }

  addAppCharges() {
    this.wm_unload_advice_app_chgs.push(this.fb.group({
      charges_name: '',
      rate_cal_method: '',
      amount: '',
      tax_rate: ''
    }));
  }

  stackList: any = [];
  onChangeWarehouse(event, index) {
    //this.stackList[index] = "";
    if (event != "0" && event != '' && event != undefined) {
      this.status = false;
      //this.DropDownListService.getBinDescByWarehouse(event).subscribe(data=>
      this.DropDownListService.getStackNoByWarehouse(event).subscribe(data => {
        console.log("stackListData: " + JSON.stringify(data))
        this.stackList[index] = data;
        this.status = true;
      });
    }
  }

  onChangeTInfoTransporterName(transporter_id: string) {
    //console.log("transporter_id"+ transporter_id);
    this.wm_unload_advice_trans_info.patchValue({
      bic_swift_code: null, iban: null,
      payment_mode: null, payment_terms: null, bank_name: null, account_name: null,
      account_no: null, ifsc_code: null, mobile: null, branch: null, cash_limit: null
    });
    if (transporter_id != "0") {

      if (this.wm_unload_advice_trans_info.get("trans_borne_by").value == "" || this.wm_unload_advice_trans_info.get("trans_borne_by").value == null || this.wm_unload_advice_trans_info.get("trans_borne_by").value == 0) {
        alert("Please Select Transport Borne By ")
        this.status = true;
      }
      else {
        this.userForm.patchValue({ transporter_code: transporter_id })
        this.DropDownListService.getsalevehiclelist(this.wm_unload_advice_trans_info.get("transporter_name").value).subscribe(vehicleData => {
          //console.log("vehicleData"+JSON.stringify(vehicleData))
          this.vehclenos = vehicleData;
        });
        if (this.wm_unload_advice_trans_info.get("trans_borne_by").value == "FOB") {
          if (this.userForm.get("ref_type").value == "Purchase Order") {

            this.DropDownListService.getpurchaseordercharges(transporter_id, this.userForm.get("referance_id").value).subscribe(data => {
              //console.log(" respoinse  "+JSON.stringify(data))
              this.wm_unload_advice_trans_info.patchValue({ charge_code: data['charge_code'], transport_rate: data['transport_rate'], rate_value: data['chgs_rate_value'], mode_of_trans: data['mode_of_trans'] })
            });
          }
          else {
            this.status = false;
            this.DropDownListService.getTransAccount(transporter_id).subscribe(data => {
              this.wm_unload_advice_trans_info.patchValue({
                bic_swift_code: data["bic_swift_code"],
                iban: data["iban"], payment_mode: data["mode_of_pay"], payment_terms: data["pay_term"],
                bank_name: data["bank_name"], account_name: data["acc_holder_name"],
                account_no: data["acc_no"], ifsc_code: data["ifsc_code"], mobile: data["mobile"],
                branch: data["branch"], cash_limit: data["cash_limit"]
              });

              if (data["mode_of_pay"] != "Cash")
                this.wm_unload_advice_trans_info.patchValue({ cash_limit: 0 })
              this.status = true;
            });
          }
        }
        else {
          this.status = false;
          this.DropDownListService.getTransAccount(transporter_id).subscribe(data => {
            this.wm_unload_advice_trans_info.patchValue({
              bic_swift_code: data["bic_swift_code"],
              iban: data["iban"], payment_mode: data["mode_of_pay"], payment_terms: data["pay_term"],
              bank_name: data["bank_name"], account_name: data["acc_holder_name"],
              account_no: data["acc_no"], ifsc_code: data["ifsc_code"], mobile: data["mobile"],
              branch: data["branch"], cash_limit: data["cash_limit"]
            });

            if (data["mode_of_pay"] != "Cash")
              this.wm_unload_advice_trans_info.patchValue({ cash_limit: 0 })
            this.status = true;
          });
        }
      }
    }
  }

  isTranporterInfoIsDisabled = false;
  onChangeTransportBorneBy(transBornBy: string) {
    if (transBornBy == 'FOR') {
      this.isTranporterInfoIsDisabled = true;
      this.wm_unload_advice_trans_info.patchValue({
        transporter_name: null, mode_of_trans: null,
        transport_rate: null, charge_code: null, rate_value: null, payment_mode: null,
        payment_terms: null, bank_name: null, account_name: null, account_no: null,
        branch: null, iban: null, bic_swift_code: null, mobile: null, ifsc_code: null, cash_limit: null
      });
    }
    else {
      this.isTranporterInfoIsDisabled = false;
    }
  }

  onChangeBusinessUnit(b_id: string, operation) {
    this.businessUnit = b_id;
    //changes on 13.04
    if (operation == 'update' || operation == 'view') {

    }
    else {
      if (this.userForm.get("item_subtype").value == 'ITMT00008') {
        this.getUnloadNonew(this.userForm.get("business_unit").value);
      }
      else {
        this.getUnloadNo(this.businessUnit, this.currentDate);
      }

    }
    // this.getUnloadNo(this.businessUnit, this.currentDate);//changes on 14-04-2022
    if (b_id.length && b_id != "0") {
      if (operation != 'update') {
        this.status = false;

        if (this.adviceType == 'Sales Return') {
          this.status = false;
          //this.DropDownListService.getCustomerThruBU(b_id).subscribe(data=> 
          this.DropDownListService.getCustomerThruBUnewlist(b_id).subscribe(data => {
            console.log("businessPartnerList: " + JSON.stringify(data));
            this.status = true;
            this.businessPartnerList = data;
          });
        }
        else {
          this.status = false;
          //this.DropDownListService.getSupplierThruBU(b_id).subscribe(data=>
          this.DropDownListService.getSupplierThruBUNew(b_id).subscribe(data => {
            this.status = true;
            this.businessPartnerList = data;
          });
        }
      }

      this.status = false;
      this.DropDownListService.getWHListbyBUnit(b_id).subscribe(data1 => {
        console.log("ware house data/" + JSON.stringify(data1));
        this.warehouses = data1;
        this.status = true;
      });


    }
  }

  onChangeUnloadDate(unloadDate) {
    this.currentDate = unloadDate.target.value;
    // this.getUnloadNo(this.businessUnit, this.currentDate);

    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      if (this.userForm.get("item_subtype").value == 'ITMT00008') {
        this.getUnloadNonew(this.userForm.get("business_unit").value);
      }
      else {
        this.getUnloadNo(this.businessUnit, this.currentDate);
      }

    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  getUnloadNo(b_unit, unloadDate) {
    if (this.businessUnit != "0") {
      this.status = false;
      this.DropDownListService.getUASequenceId(b_unit + "/" + this.currentDate).subscribe(data => {
        this.seq_no = data.sequenceid;
        this.status = true;
      });
    }
  }

  getUnloadNonew(b_unit) {
    if (this.businessUnit != "0") {
      this.status = false;
      this.DropDownListService.getUASequenceIdnew(b_unit + "/" + this.currentDate).subscribe(data => {
        this.seq_no = data.sequenceid;
        this.status = true;
      });
    }
  }

  getGrossWt(event) {
    this._grossWt = event.target.value;
    this.wm_unload_advice_party_wm.patchValue({ net_wt: (Math.round(Math.abs(this._grossWt - this._tareWt) * 100) / 100).toFixed(3) });
  }

  getTareWt(event) {
    this._tareWt = event.target.value;
    this.wm_unload_advice_party_wm.patchValue({ net_wt: (Math.round(Math.abs(this._grossWt - this._tareWt) * 100) / 100).toFixed(3) });
  }

  onChangePartyDate(event) {
    if (this.currentDate.valueOf() < (event.target.value).valueOf()) {
      alert("Choose Another Date, Unload Date Must Be Grater!")
      this.wm_unload_advice_party_wm.patchValue({ pw_date: null });
    }
  }

  onChangeTransporterName(transporter_id: string) {
    console.log("transporter_id :: " + transporter_id)
    this.transporter_id = transporter_id;
    this.driver_names = [];
    this.wm_unload_advice_driver_dtls.patchValue({
      phone: null, address: null,
      identity: null, doc_type: null, doc_no: null
    });

    if (transporter_id != "0" && this.adviceType != 'Stock Transfer') {
      this.status = false;
      this.transporter_id = transporter_id;
      this.DropDownListService.getVehicleThruTransWOWt1(transporter_id).subscribe(data => {
        this.vehclenos = data;
        this.status = true;
      });
    }
    if (transporter_id == "0") {
      this.DropDownListService.getVehiclenoall().subscribe(data => {
        this.vehclenos = data;
        this.status = true;
      });
    }
  }

  onChangeTransporterName1(transporter_code: string) {
    this.DropDownListService.getVehicleThruTransWOWt2(transporter_code).subscribe(data => {
      console.log("UPDATE VEHICLE:" + JSON.stringify(data))
      this.vehclenos = data;
      this.status = true;
    });
  }

  onChangeTcsApplicable(tcs_appl: string) {
    if (tcs_appl == 'Yes')
      this.isTcsApplicable = true;
    else
      this.isTcsApplicable = false;
  }

  is_cash_limit_active = false;
  onChangePaymentMode(payment_mode: string) {
    if (payment_mode == "Cash") {
      this.is_cash_limit_active = true;
    }
    else {
      this.is_cash_limit_active = false;
      this.wm_unload_advice_terms_con.patchValue({ cash_limit: 0 });
    }
  }

  createNewDriver() {
    let VehicleId = this.userForm.get("vehicle_id").value;

    // console.log("VehicleId get :: "+VehicleId);

    if (VehicleId == null || VehicleId == '0' || VehicleId == '') {
      alert("Select Vehicle No First!");
    }
    else {
      console.log(VehicleId.length);
      if (VehicleId.length) {

        let dialogref = this.dialog.open(UnloadAdviceDrivingPopupComponent, { data: { transporter_id: this.transporter_id, vehicle_id: VehicleId } });
        dialogref.afterClosed().subscribe(result => {
          // console.log(" formdata "+JSON.stringify(result));
          if (result == '' || result == null) {
            this.status = true;

          }
          else {

            this.status = false;
            this.Service.createDriverpopup(result).subscribe(data => {
              //console.log("Driver Details: "+JSON.stringify(result));
              alert("New Driver master created successfully.");
              this.status = true;
              this.DropDownListService.getDriverByVehicle(VehicleId).subscribe(data => {
                this.driver_names = data;
                this.status = true;

              }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); }
              )
            });
          }
        });
      }
      else {
        this.status = true;
      }
    }
  }

  onChangeCustomerName(event: string) {
    //this.status = false;
    this.customer_id = event;
    this.supplier_id = "0";
    this.userForm.patchValue({
      item_type: "0", item_subtype: "0",
      supp_ref_doc: '', supp_ref_docno: '', supp_ref_doc_date: ''
    });
    //console.log("hello tuhin "+event )
    //   if(event.length )
    if (event == null || event == "") {

    }
    else {
      forkJoin
        (
          this.DropDownListService.itemNamesList(),
          this.DropDownListService.getTransporterThruCustomer(event),
          this.DropDownListService.getCustDelvFromList(event),
          this.DropDownListService.custAddDtlsRetriveList(event, this.company_name),
          this.DropDownListService.getCustomerAddress(event),
        ).subscribe(([itemNameData, transData, delvData, contData, custAdd]) => {
          this.status = true;
          this.item_codes = itemNameData;
          this.transporterNames = transData;
          //console.log("transData: "+JSON.stringify(transData))
          this.delvAddrs = delvData;
          this.contAddrs = contData;
          this.wm_unload_advice_bp_dtls.patchValue({ sp_address: custAdd["address"] });
        });

      this.DropDownListService.getCustBPStat(event).subscribe(gstdata => {
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

  Addrs: {};
  delvAddrs: any = [];
  onChangeSupplierName(suppid: string) {

    this.customer_id = "0";
    this.wm_unload_advice_bp_dtls.patchValue({
      sp_phone: null, sp_fax: null, sp_email: null, sp_address: null,
      cp_designation: null, cp_phone: null, cp_fax: null, cp_email: null, cp_address: null
    });
    this.wm_unload_advice_broker_dtls.reset();
    this.contAddrs = [];
    this.delvAddrs = [];
    this.transporterNames = [];
    this.onChangePaymentMode("0");
    this.onChangeTcsApplicable("0");

    this.wm_unload_advice_terms_con.patchValue({
      payment_terms: "0", account_name: null,
      account_no: null, bank_name: null, ifsc: null, mobile: null, iban: null, bic_swift_code: null, branch: null
    });

    this.wm_unload_advice_trans_info.patchValue({
      bic_swift_code: null, iban: null, payment_mode: "0", payment_terms: "0",
      bank_name: null, account_name: null, account_no: null, ifsc_code: null, mobile: null, branch: null, cash_limit: 0
    });
    if (suppid.length)
    // if(suppid != "0")
    {

      this.DropDownListService.getSuppliertransport(suppid).subscribe(data12 => {
        console.log("check/" + data12[0].transport_own);
        //this.transportownstatus=data12[0].transport_own;


        if (data12[0].transport_own == 'YES') {
          this.validTransport = true;
          this.status = false;
          this.supplier_id = suppid;
          //console.log(" check sup id :: " + this.supplier_id);
          forkJoin(
            this.DropDownListService.getSuppBPAcc(suppid),
            this.DropDownListService.getTransporterThruSupplier(suppid),
            this.DropDownListService.getDeliveryAddrById(suppid),
            this.DropDownListService.getSuppAddrById(suppid),
            this.DropDownListService.getAddrById(suppid),
            // this.DropDownListService.getBrokerListBySupplierCode(suppid)
          ).subscribe(([data, data1, data2, data3, data4]) => {
            this.onChangePaymentMode(data["mode_of_pay"]);
            this.onChangeTcsApplicable(data["tcs_applicable"]);
            this.wm_unload_advice_terms_con.patchValue({
              payment_mode: data["mode_of_pay"],
              payment_terms: data["pay_term"], cash_limit: data["cash_limit"],
              tcs_applicable: data["tcs_applicable"], tcs_rate: data["tcs_rate"],
              account_name: data["accountholder"], account_no: data["acc_no"],
              bank_name: data["bankname"], ifsc: data["ifsc"], mobile: data["mobile"],
              iban: data["iban"], bic_swift_code: data["bic_swift_code"], branch: data["branch"]
            });
            //console.log("weight Details: "+  JSON.stringify(data2));
            // alert(suppid);
            //tuhin check here
            this.transporterNames = data1;
            this.delvAddrs = data2;
            this.contAddrs = data3;

            let Add2 = data4["address"].substring(0, data4["address"].length - 1)
            let Add1 = data4["address"].substring(0, data4["address"].length - 2)

            if (data4["add2"] == '' || data4["add2"] == null && data4["add3"] == '' || data4["add3"] == null) { this.wm_unload_advice_bp_dtls.patchValue({ sp_address: Add1 }); }

            else if (data4["add3"] == '' || data4["add3"] == null) { this.wm_unload_advice_bp_dtls.patchValue({ sp_address: Add2 }); }
            else { this.wm_unload_advice_bp_dtls.patchValue({ sp_address: data4["address"] }); }

            // this.brokerNameList = data5;
            // console.log("broker supp: "+JSON.stringify(data5));
            this.status = true;
          });



        }

        if (data12[0].transport_own == 'NO') {
          this.validTransport = false;
          this.status = false;
          this.supplier_id = suppid;
          // console.log(" check sup id else :: " + this.supplier_id);
          forkJoin(
            this.DropDownListService.getSuppBPAcc(suppid),
            // this.DropDownListService.getTransporterThruSupplier(suppid),
            this.DropDownListService.getDeliveryAddrById(suppid),
            this.DropDownListService.getSuppAddrById(suppid),
            this.DropDownListService.getAddrById(suppid),
            this.DropDownListService.getVehiclenoall()
            // this.DropDownListService.getBrokerListBySupplierCode(suppid)
            // ).subscribe(([data, data1, data2, data3, data4])=>
          ).subscribe(([data, data2, data3, data4, vehicleall]) => {
            this.vehclenos = vehicleall;
            this.onChangePaymentMode(data["mode_of_pay"]);
            this.onChangeTcsApplicable(data["tcs_applicable"]);
            this.wm_unload_advice_terms_con.patchValue({
              payment_mode: data["mode_of_pay"],
              payment_terms: data["pay_term"], cash_limit: data["cash_limit"],
              tcs_applicable: data["tcs_applicable"], tcs_rate: data["tcs_rate"],
              account_name: data["accountholder"], account_no: data["acc_no"],
              bank_name: data["bankname"], ifsc: data["ifsc"], mobile: data["mobile"],
              iban: data["iban"], bic_swift_code: data["bic_swift_code"], branch: data["branch"]
            });
            //console.log("weight Details: "+  JSON.stringify(data2));
            // alert(suppid);
            //tuhin check here
            // this.transporterNames = data1;
            this.delvAddrs = data2;
            this.contAddrs = data3;

            let Add2 = data4["address"].substring(0, data4["address"].length - 1)
            let Add1 = data4["address"].substring(0, data4["address"].length - 2)

            if (data4["add2"] == '' || data4["add2"] == null && data4["add3"] == '' || data4["add3"] == null) { this.wm_unload_advice_bp_dtls.patchValue({ sp_address: Add1 }); }

            else if (data4["add3"] == '' || data4["add3"] == null) { this.wm_unload_advice_bp_dtls.patchValue({ sp_address: Add2 }); }
            else { this.wm_unload_advice_bp_dtls.patchValue({ sp_address: data4["address"] }); }

            // this.brokerNameList = data5;
            // console.log("broker supp: "+JSON.stringify(data5));
            this.status = true;
          });

        }


      });

      this.DropDownListService.getSuppBPStat(suppid).subscribe(gstdata => {
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

  onChangeSuppInfoName(name: string) {
    this.wm_unload_advice_bp_dtls.patchValue({ sp_phone: null, sp_fax: null, sp_email: null });
    if (name != "0") {
      this.status = false;
      if (this.supplier_id != "0") {
        this.DropDownListService.getSupplierContDetails(this.supplier_id, name).subscribe(data => {
          this.wm_unload_advice_bp_dtls.patchValue({ sp_phone: data["phone"], sp_fax: data["fax"], sp_email: data["email"] });
          this.status = true;
        });
      }
      else {
        this.DropDownListService.getCustContDetails(this.customer_id, name).subscribe(data => {
          this.wm_unload_advice_bp_dtls.patchValue({ sp_phone: data["phone"], sp_fax: data["fax"], sp_email: data["email"] });
          this.status = true;
        });
      }
    }
  }

  onChangeContInfoName(name: string) {
    this.wm_unload_advice_bp_dtls.patchValue({
      cp_designation: null,
      cp_phone: null, cp_fax: null, cp_email: null, cp_address: null
    });
    if (name != "0") {
      this.status = false;
      if (this.supplier_id != "0") {
        this.DropDownListService.getSupplierDelvFromAdd(this.supplier_id, name).subscribe(data => {
          this.wm_unload_advice_bp_dtls.patchValue({
            cp_designation: data["designation"],
            cp_phone: data["phone"], cp_fax: data["fax"], cp_email: data["email"], cp_address: data["address"]
          });
          this.status = true;
        });
      }
      else {
        this.DropDownListService.getCustDelvFromAdd(this.customer_id, name).subscribe(data => {
          this.wm_unload_advice_bp_dtls.patchValue({
            cp_designation: data["designation"],
            cp_phone: data["phone"], cp_fax: data["fax"], cp_email: data["email"], cp_address: data["address"]
          });
          this.status = true;
        });
      }
    }
  }

  onChangeBrokerName(index, broker_code) {
    this.wm_unload_advice_broker_dtls.at(index).patchValue({
      basis: null, based_on: null,
      rate: null, brokerage_acc: null, tds_rate: null, tds_acc: null
    });
    if (broker_code != "0") {
      this.status = false;
      this.DropDownListService.getBrokerDetailsByBrokerCode(broker_code).subscribe(data => {
        this.wm_unload_advice_broker_dtls.at(index).patchValue({
          basis: data[0].basis, based_on: data[0].based_on,
          rate: data[0].rate, brokerage_acc: data[0].brokerage_acc, tds_rate: data[0].tds_rate, tds_acc: data[0].tds_acc
        });
        this.status = true;
      });
    }
  }

  WeighmentId: any;
  vehicleId = '0';
  onChangeVechileNo(event) {

    this.wm_unload_advice_driver_dtls.reset();
    this.driver_names = [];
    var vechile_id = event;
    this.vehicleId = vechile_id;
    if (vechile_id.length)
    //if(vechile_id != "0" )
    {
      this.status = false;
      if (this.userForm.get("id").value > 0) {

        this.DropDownListService.getDriverByVehicle(vechile_id).subscribe(data => {
          console.log("Driver list " + JSON.stringify(data));
          this.driver_names = data;
          if (this.userForm.get("id").value > 0) {
            // console.log("tuhin here  :: " + this.userForm.get("vehicle_id").value)
          }
          else {
            this.wm_unload_advice_driver_dtls.patchValue({ driver_name: "0" });
          }
          this.status = true;
        });

      }
      else {
        this.DropDownListService.checkVehicleNoWeighment(vechile_id, "Unloading").subscribe(data => {
          this.status = true;
          //starts here
          console.log("Hi" + data["status"])
          if (data["status"] == 'No') {
            this.DropDownListService.getDriverByVehicle(vechile_id).subscribe(data => {
              console.log("Driver list " + JSON.stringify(data));
              this.driver_names = data;
              if (this.userForm.get("id").value > 0) {
                //console.log("tuhin here  :: " + this.userForm.get("vehicle_id").value)
              }
              else {
                this.wm_unload_advice_driver_dtls.patchValue({ driver_name: "0" });
              }
              this.status = true;
            });
          }
          else {
            alert("Vehicle No Already Exists in Weighment")
            this.userForm.patchValue({ vehicle_id: '' });

          }
        });
      }
      //starts here 

      //ends here


    }
  }

  getStockDriverName(vehicle_id) {
    this.wm_unload_advice_driver_dtls.reset();
    this.driver_names = [];
    this.DropDownListService.getDriverByVehicle(vehicle_id).subscribe(data => {

      this.driver_names = data;


      this.status = true;
    });


  }
  //   imageObject: Array<object> = [{}];
  //   closeEventHandler() {
  //     this.showFlag = false;
  //     this.selectedImageIndex = -1;
  // }



  //   showLightbox(index) {
  //     this.selectedImageIndex = index;
  //     this.showFlag = true;
  // }
  viewimg(event) {
    // alert("hi");

    var left = (screen.width / 2) - (450 / 2);
    var top = (screen.height / 2) - (450 / 2);

    var file = new Blob([this.view_image], { type: 'image/jpeg' });
    var fileURL = URL.createObjectURL(file);


    let param = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,, width='450', height='450', top='+top+', left='+left";


    window.open(fileURL, "_blank", param);

  }
  createImage(data: Blob) {
    this.view_image = data;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(data)
  }


  getdriverImage(imagepath) {
    console.log("imagepath :: " + imagepath)

    let filename = imagepath.substring(29, imagepath.length);
    this.DropDownListService.getdriverimage(filename)
      .subscribe(data => {
        console
        this.createImage(data);

        this.status = true;
      }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); });


  }
  onChangeDriverName(driver_id: String) {
    this.wm_unload_advice_driver_dtls.patchValue({
      phone: null, address: null,
      identity: null, doc_type: null, doc_no: null
    });
    if (driver_id != '0') {
      this.status = false;
      this.DropDownListService.DriverDetails(driver_id).subscribe(data => {

        console.log(" driver data :: " + JSON.stringify(data));
        this.wm_unload_advice_driver_dtls.patchValue({
          phone: data["phone_no"], address: data["address"],
          identity: data["identity"], doc_type: data["doc_type"], doc_no: data["doc_no"], doc_img: data["doc_img"]
        });
        //console.log(" driver data  12 ::"+ this.wm_unload_advice_driver_dtls.controls.doc_img.value)
        console.log(" this.wm_unload_advice_driver_dtls.controls.doc_img.value  " + this.wm_unload_advice_driver_dtls.controls.doc_img.value);

        if (this.wm_unload_advice_driver_dtls.controls.doc_img.value == null || this.wm_unload_advice_driver_dtls.controls.doc_img.value == "") {

        }
        else {
          this.getdriverImage(this.wm_unload_advice_driver_dtls.controls.doc_img.value);
        }



        this.status = true;
      });



    }
  }

  onChangeApplicableCharges(applicable_charges_id: string) {
    if (applicable_charges_id != "0") {
      this.status = false;
      this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data => {
        let i = 0;
        while (this.wm_unload_advice_app_chgs.length) { this.wm_unload_advice_app_chgs.removeAt(0); }

        for (let data1 of data) {
          this.addAppCharges();
          this.wm_unload_advice_app_chgs.at(i).patchValue({
            charges_name: data1.charge_name,
            rate_cal_method: data1.rate_cal, tax_rate: data1.tax_rate
          });
          i = i + 1;
        }
        this.status = true;
      });
    }
  }

  showList(s: string) {
    if (this.unloadadvicesave == true && this.unloadadviceupdate == true)//true exist  false not exist 
    {

      if (s == "add") {
        this.isHidden = true;
        this.status = false;
        this.storepurchase = false;
        this.potype_packing = false;

        forkJoin(
          // this.DropDownListService.brokerNameList(),
          this.DropDownListService.brokerNameListFast(),
          this.DropDownListService.getWeighmentCharges(),
          this.DropDownListService.ledgerNameList(),
          this.DropDownListService.payTermNameList(),
          // this.DropDownListService.itemTypeListNew(this.company_name),
          this.DropDownListService.itemTypeListFastAPI(this.company_name),

          //  this.Service.getUnloadAdvice(),
          //  this.DropDownListService.getItemThruPurchase(),
          this.DropDownListService.getItemThruPurchasenew(),
          this.DropDownListService.getWeighmentCustomUOM(),
          // this.DropDownListService.getCompanyBUMNCList(this.company_name),
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          this.DropDownListService.getChargeMasterList(),
          this.DropDownListService.getMiscList(),
          // this.DropDownListService.getVehiclenoall(), //change on 13042023  by bidhan
          this.DropDownListService.getVehicleThruWeighmentfast()
        ).subscribe(([brokerData, wmtChgData, ledgerData, paytermData, itemTypeData,
          itemNameData, customUomData, buData, chgMasterData, getMiscData, vehclenosall]) => {
          //changes12-04-2022
          this.vehclenos = vehclenosall;
          //console.log(" itemTypeData : " + JSON.stringify(itemTypeData));
          //ends 
          console.log(" itemNameData : " + JSON.stringify(itemNameData));
          this.brokerNameList = brokerData;
          //  console.log("broker cust: "+JSON.stringify(brokerData));
          this.chargesList = wmtChgData;
          this.ledgerNames = ledgerData;
          this.payTerms = paytermData;
          this.itemtypes = itemTypeData;
          //  this.listUnloadAdvice  = uAdviceData;
          //console.log("this.listUnloadAdvice//"+JSON.stringify(this.listUnloadAdvice));
          this.item_codes = itemNameData;
          this.customUOMs = customUomData;
          this.bussiness_unit_list = buData;
          this.chargesIdList = chgMasterData;
          this.WeighBridgeList = getMiscData;
          this.userForm.patchValue({
            business_unit: "0", uom: "0", busi_partner: "0",
            transporter_code: "0", vehicle_id: "0", item_subtype: "0"
          });
          this.wm_unload_advice_party_wm.patchValue({ pw_date: this.currentDate, uom1: "0", uom2: "0", uom3: "0" });
          this.onChangeAdviceType(this.selectedAdviceType);
          this.openbuttonstatus("Purchase Order");
          this.wm_unload_advice_item_dtls.at(0).patchValue({ item_code: "0", packing: "0", quantity: 0, s_qty: 0 });
          this.wm_unload_advice_item_dtls.at(0).patchValue({ sl_no: 1 })
          this.status = true;
        }, (error) => {
          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
          this.ngOnInit()
        });






      }
    }
    if (this.unloadadvicesave == true && this.unloadadviceupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        this.status = false;
        this.storepurchase = false;
        this.potype_packing = false;
        forkJoin(
          // this.DropDownListService.brokerNameList(),
          this.DropDownListService.brokerNameListFast(),
          this.DropDownListService.getWeighmentCharges(),
          this.DropDownListService.ledgerNameList(),
          this.DropDownListService.payTermNameList(),
          // this.DropDownListService.itemTypeListNew(this.company_name),
          this.DropDownListService.itemTypeListFastAPI(this.company_name),

          //this.Service.getUnloadAdvice(),
          this.DropDownListService.getItemThruPurchase(),
          //this.DropDownListService.getItemThruPurchasenew(),
          this.DropDownListService.getWeighmentCustomUOM(),
          // this.DropDownListService.getCompanyBUMNCList(this.company_name),
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          this.DropDownListService.getChargeMasterList(),
          this.DropDownListService.getMiscList(),
          this.DropDownListService.getVehiclenoall(),
        ).subscribe(([brokerData, wmtChgData, ledgerData, paytermData, itemTypeData,
          itemNameData, customUomData, buData, chgMasterData, getMiscData, vehclenosall]) => {
          //changes12-04-2022
          this.vehclenos = vehclenosall;
          console.log(" itemNameData : " + JSON.stringify(itemNameData));
          //ends 
          this.brokerNameList = brokerData;
          //  console.log("broker cust: "+JSON.stringify(brokerData));
          this.chargesList = wmtChgData;
          this.ledgerNames = ledgerData;
          this.payTerms = paytermData;
          this.itemtypes = itemTypeData;
          //    this.listUnloadAdvice  = uAdviceData;
          //  console.log("this.listUnloadAdvice//"+JSON.stringify(this.listUnloadAdvice));
          this.item_codes = itemNameData;
          this.customUOMs = customUomData;
          this.bussiness_unit_list = buData;
          this.chargesIdList = chgMasterData;
          this.WeighBridgeList = getMiscData;
          this.userForm.patchValue({
            business_unit: "0", uom: "0", busi_partner: "0",
            transporter_code: "0", vehicle_id: "0", item_subtype: "0"
          });
          this.wm_unload_advice_party_wm.patchValue({ pw_date: this.currentDate, uom1: "0", uom2: "0", uom3: "0" });
          this.onChangeAdviceType(this.selectedAdviceType);
          this.openbuttonstatus("Purchase Order");
          this.wm_unload_advice_item_dtls.at(0).patchValue({ item_code: "0", packing: "0", quantity: 0, s_qty: 0 });
          this.status = true;
        }, (error) => {
          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
          this.ngOnInit()
        });

      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.storepurchase = false;
      this.potype_packing = false;
      this.userForm.reset();
      this.wm_unload_advice_item_dtls.enable();
      this.wm_unload_advice_party_wm.enable();
      this.wm_unload_advice_driver_dtls.enable();
      this.wm_unload_advice_broker_dtls.enable();
      this.wm_unload_advice_trans_info.enable();
      this.wm_unload_advice_terms_con.enable();
      this.wm_unload_advice_bp_dtls.enable();
      this.wm_unload_advice_docs.enable();
      this.wm_unload_advice_app_chgs.enable();
      this.ngOnInit();
    }
  }

  onChangeBrokerageApplStatus(event) {
    if (event.checked)
      this.isBrokerageApplicable = true;
    else
      this.isBrokerageApplicable = false;
  }

  packingItem: any = [];
  onChangeItemName(index, item_id: string) {
    if (this.userForm.get("ref_type").value != 'Purchase Order') {
      if (item_id != "0") {
        this.status = false;
        this.itemId = item_id;
        forkJoin(
          this.DropDownListService.getItemNameById(item_id, this.company_name),
          this.DropDownListService.getItemMasterPackMat(item_id),
          this.DropDownListService.getItemQCDetails(item_id, this.company_name)
        ).subscribe(([data, data1, data2]) => {
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => {
            this.wm_unload_advice_item_dtls.at(index).patchValue({ uom: data.description });
          });

          this.packingItem[index] = data1;
          this.qc_normsList[index] = data2;
          // this.wm_unload_advice_item_dtls.at(index).patchValue({qc_norms:data2[0].qc_code});
          this.status = true;
        })
      }
    }
    else {
      if (this.popupstatus == false) {
        alert("Please Select Respective Item details from Show Button !!!!!!!!!");
        this.wm_unload_advice_item_dtls.reset();
        this.status = true
      }
    }

  }

  capacity: any = [];
  itemId: any;
  packingQty: any;
  empty_bag_wt: any = [];
  onChangePackingItem(index, packing_code) {
    this.wm_unload_advice_item_dtls.at(index).patchValue({ s_uom: null });
    if (packing_code.target.value != "0") {

      this.status = false;
      //this.DropDownListService.getItemPackUom(this.itemId, packing_code.target.value,this.company_name).subscribe(data=>
      forkJoin(
        this.DropDownListService.getItemPackUom(this.wm_unload_advice_item_dtls.at(index).get("item_code").value, packing_code.target.value, this.company_name),
        this.DropDownListService.getItemNameByIdNew(packing_code.target.value, this.company_name)
      )
        .subscribe(([data, packingdata]) => {
          console.log("tuhin here " + JSON.stringify(data))
          this.capacity[index] = data.capacity;
          this.tolerance[index] = data.tolerance;
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;

          this.wm_unload_advice_item_dtls.at(index).patchValue({ s_uom: packingdata.mstock_unit_name });
          this.status = true;
        });
    }
  }
  getPackingQty(packing_qty, index) {


    let itemQty: any;

    let alluom: any = [];
    alluom = JSON.parse(localStorage.getItem("ALLUOM"));
    if (this.userForm.get("item_subtype").value == 'ITMT00004' || this.userForm.get("item_subtype").value == 'ITMT00002') {
      console.log(" main " + this.wm_unload_advice_item_dtls.at(index).get("price_based_on").value)
      if (this.wm_unload_advice_item_dtls.at(index).get("price_based_on").value == "Packing") {
        let Packingqty = packing_qty.target.value;
        console.log("1 " + this.showstatus)
        if (this.showstatus == "onShowStatus") {

          let NewPackingqty: number = 0, total_packingqty: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            NewPackingqty += Number(this.wm_unload_advice_item_dtls.at(v).get("s_qty").value);
            total_packingqty += Number(this.wm_unload_advice_item_dtls.at(v).get("s_qty").value);
          }
          console.log("2 " + NewPackingqty + " / " + total_packingqty)
          if (Number(this.FinalTotal_qty) > NewPackingqty || Number(this.FinalTotal_qty) == NewPackingqty)//check//total qty of main purchase 
          {
            let compareqty: boolean = false;
            if (this.userForm.get("id").value > 0) {
              compareqty = true;
            }
            else {
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                compareqty = true;
              }
              else//check
              {
                let maxqty_item: number = (Number(this.final_mat_wt[index]));//final_mat_wt each restwt
                let itemqty_item: boolean = false;
                itemqty_item = Number(Packingqty) <= maxqty_item;
                console.log("2 " + itemqty_item + " / " + this.final_mat_wt[index])
                if (itemqty_item) {
                  compareqty = true;
                  console.log("if")
                }
                else {
                  compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("s_qty").value));
                  console.log("else" + compareqty)
                }
                console.log(" 3 " + compareqty)
                //ends
              }
            }
            if (compareqty == false) {
              alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: this.final_mat_wt[index] });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
            else {
              //HERE SETTING TOTAL QTY 
              let finaltotalqty = Number(this.FinalTotal_qty) - Packingqty;
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                this.userForm.patchValue({ total_qty: '0' });
                this.userForm.patchValue({ total_qty_copy: total_packingqty.toFixed(3) });
              }
              else {
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                this.userForm.patchValue({ total_qty_copy: total_packingqty.toFixed(3) });
              }
            }
          }
          else {

            let compareqty: boolean = false;
            if (this.userForm.get("id").value > 0) {
              compareqty = true;
              // console.log("in update here")
            }
            else {
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                compareqty = true;
              }
              else//check
              {
                let maxqty_item: number = (Number(this.final_mat_wt[index]));
                let itemqty_item: boolean = false;
                itemqty_item = Number(Packingqty) <= maxqty_item;
                if (itemqty_item) {
                  compareqty = true;
                }
                else {
                  compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("s_qty").value));
                }
              }
            }
            if (compareqty == false) {
              alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: this.final_mat_wt[index] });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
            else {
              let finaltotalqty = Number(this.FinalTotal_qty) - Packingqty;
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                this.userForm.patchValue({ total_qty: '0' });
                this.userForm.patchValue({ total_qty_copy: total_packingqty.toFixed(3) });
              }
              else {
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                this.userForm.patchValue({ total_qty_copy: total_packingqty.toFixed(3) });
              }
            }
          }
        }
        if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
        {
          let NewPackingqty: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            NewPackingqty += Number(this.wm_unload_advice_item_dtls.at(v).get("s_qty").value);
          }
          this.userForm.patchValue({ total_qty: 0 });
          this.userForm.patchValue({ total_qty_copy: NewPackingqty.toFixed(3) }); 
        }
      }
      //stroe packing ends here
    }
    else {
      //starts here
      if (this.wm_unload_advice_item_dtls.at(index).get("uom").value == "PCS") {
        itemQty = Math.round(this.capacity[index] * packing_qty.target.value);
      }
      else {
        alluom.forEach(element => {
          if (element.description == this.wm_unload_advice_item_dtls.at(index).get("uom").value) {
            itemQty = Number(this.capacity[index] * packing_qty.target.value).toFixed(Number(element.decimalv));
          }
        });
      }
      this.wm_unload_advice_item_dtls.at(index).patchValue({ quantity: itemQty, toleranceqty: itemQty });
      // console.log(itemQty + " / " + this.empty_bag_wt[index] + " / " + packing_qty.target.value + " / " + Number(this.empty_bag_wt[index] * packing_qty.target.value) + " // " + this.capacity[index]);
      if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
        //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (Math.round((itemQty - (this.empty_bag_wt[index] * packing_qty.target.value))*1000)/1000).toFixed(3)});
        this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (Number((itemQty - (this.empty_bag_wt[index] * packing_qty.target.value)))).toFixed(3) });
        //console.log( " here 1"+this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value + " / " +(Math.round((itemQty - (this.empty_bag_wt[index] * packing_qty.target.value))*1000)/1000).toFixed(3) )
        //console.log( " here tuhin "+this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value + " / " +this.empty_bag_wt[index] +"/" + packing_qty.target.value);
      }
      else {
        //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: ((Math.round((itemQty - (itemQty * this.empty_bag_wt[index])/100) * 1000))/1000).toFixed(3) });
        this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: ((Number((itemQty - (itemQty * this.empty_bag_wt[index]) / 100)))).toFixed(3) });
        //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (Math.round((itemQty - (this.empty_bag_wt[index] * packing_qty.target.value))*1000)/1000).toFixed(3)});
        //console.log(" here " + this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value);
      }

      if (this.showstatus == "onShowStatus") {
        let Newmat_wt: number = 0, total_itemqty: number = 0;
        for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
          Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
          total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
          // console.log(" hello " + Newmat_wt + " / " + this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
        }
        // console.log("final qty " + this.FinalTotal_qty + " / " + Newmat_wt);
        if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt)//check
        {
          //here start
          let minqty: number = (Number(itemQty) * ((100 - Number(this.tolerance[index])) / 100));
          // let maxqty:number=(Number(itemQty) * ((100+Number(this.tolerance[index]))/100)) ;
          let itemqty: boolean = false;
          itemqty = Number(this.FinalTotal_qty) >= minqty;//281 //0
          if (itemqty) {
            let compareqty: boolean = false;
            if (this.userForm.get("id").value > 0) {
              compareqty = true;
              // console.log("in update here")
            }
            else {
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                compareqty = true;
              }
              else//check
              {
                // console.log("here1 tuhin :: " + Math.round(Number(this.final_mat_wt[index])) + " / " + Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value)))
                let maxqty_item: number = (Number(this.final_mat_wt[index]) * ((100 + Number(this.tolerance[index])) / 100));
                let itemqty_item: boolean = false;
                itemqty_item = Number(Newmat_wt) <= maxqty_item;
                //console.log(Newmat_wt + " tuhin // " + maxqty_item + " // " + itemqty_item)
                if (itemqty_item) {
                  compareqty = true;
                }
                else {
                  // console.log(this.final_mat_wt[index] + " here check avijit sir" + this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value)
                  compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
                }
                //ends
                // console.log("here1 id tuhin " + Math.round(Number(this.final_mat_wt[index])) + " / " +Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value)))
                // compareqty=Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
              }
            }
            //console.log("compareqty " + compareqty)
            if (compareqty == false) {
              alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
            else {
              //HERE SETTING TOTAL QTY 
              let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                this.userForm.patchValue({ total_qty: '0' });
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }
              else {
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }
            }
          }
          else {
            alert("Exceed Purchase Order Total Quantity");
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
          }
        }
        else {
          let minqty: number = (Number(itemQty) * ((100 - Number(this.tolerance[index])) / 100));
          // let maxqty:number=(Number(itemQty) * ((100+Number(this.tolerance[index]))/100)) ;
          let itemqty: boolean = false;
          itemqty = Number(this.FinalTotal_qty) >= minqty;//281 //0
          if (itemqty) {
            let compareqty: boolean = false;
            if (this.userForm.get("id").value > 0) {
              compareqty = true;
              // console.log("in update here")
            }
            else {
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                compareqty = true;
              }
              else//check
              {
                //console.log("here1 tuhin :: " + Math.round(Number(this.final_mat_wt[index])) + " / " + Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value)))
                let maxqty_item: number = (Number(this.final_mat_wt[index]) * ((100 + Number(this.tolerance[index])) / 100));
                let itemqty_item: boolean = false;
                itemqty_item = Number(Newmat_wt) <= maxqty_item;
                //console.log(Newmat_wt + " tuhin // " + maxqty_item + " // " + itemqty_item)
                //Newmat_wt 282
                //this.final_mat_wt[index] //271
                if (itemqty_item) {
                  compareqty = true;
                }
                else {
                  // console.log(this.final_mat_wt[index] + " here check avijit sir" + this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value)
                  compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
                }
              }
            }
            //console.log("compareqty " + compareqty)
            if (compareqty == false) {
              alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
            else {
              //HERE SETTING TOTAL QTY 
              let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                this.userForm.patchValue({ total_qty: '0' });
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }
              else {
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }
            }
          }
          else {
            alert("Exceed Purchase Order Total Quantity");
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
          }
        }
      }
      if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
      {
        let Newmat_wt: number = 0;
        for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
          Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
          // console.log(" hello " + Newmat_wt + " / " + this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
        }
        // this.userForm.patchValue({total_qty:Newmat_wt});
        this.userForm.patchValue({ total_qty: 0 });
        this.userForm.patchValue({ total_qty_copy: Newmat_wt.toFixed(3) }); //changes on 07-05-2022
      }
      //ends here
    }

  }


  getItemQty(item_qty, index, tm) {
    if (this.userForm.get("item_subtype").value == 'ITMT00004' || this.userForm.get("item_subtype").value == 'ITMT00002') {
      console.log(" main "+ this.wm_unload_advice_item_dtls.at(index).get("price_based_on").value == "Packing")
      if (this.wm_unload_advice_item_dtls.at(index).get("price_based_on").value == "Packing") {

        this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: item_qty.target.value,toleranceqty:item_qty.target.value});
      }
      else {
          let itemQty = item_qty.target.value;
          this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: itemQty,toleranceqty:itemQty});
          console.log("1 "+ this.showstatus)
          if (this.showstatus == "onShowStatus") {
            let Newmat_wt: number = 0, total_itemqty: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
              total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            }
            console.log(" 2 " + Newmat_wt + " / " + total_itemqty + " / " +this.FinalTotal_qty)
            if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt) {
              let compareqty: boolean = false;
              if (this.userForm.get("id").value > 0) {
                compareqty = true;
              }
              else {
                if (this.userForm.get("advice_type").value == 'Stock Transfer') {
                  compareqty = true;
                }
                else {
                  compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("quantity").value));
                  console.log(" 3 " + compareqty)
                }
              }
              console.log(" 4 " + compareqty)
              if (compareqty == false) {
                alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
                this.wm_unload_advice_item_dtls.at(index).patchValue({  quantity: this.final_mat_wt[index], mat_wt: this.final_mat_wt[index],toleranceqty:this.final_mat_wt[index] });
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
              }
              else {
                //HERE SETTING TOTAL QTY 
                if (this.userForm.get("advice_type").value == 'Stock Transfer') {
                  this.userForm.patchValue({ total_qty: '0' });
                  this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
                }
                else {
                  this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                  this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
                }
              }
            }
            else {
              alert("Exceed Purchase Order Total Quantity");
              this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: this.final_mat_wt[index], quantity: this.final_mat_wt[index] ,toleranceqty:this.final_mat_wt[index]});
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
          }
          //for open advice
          if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
          {
            let Newmat_wt: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            }
            this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
          }

          //for stock transfer
          if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
          {
            let Newmat_wt: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            }
            this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
          }
      }
    }
    else {
      //starts here 
      //console.log("Hello");
      this.packingQty = this.wm_unload_advice_item_dtls.at(index).get("s_qty").value as FormControl;
      let itemQty = item_qty.target.value;
      let itemstatus: boolean = true, itemstatusmin: boolean = true;
      //console.log(" tolerance " + this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value)
      if (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value == "0" || this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value == 0)//first time item qty
      {
        if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
          //console.log("0 " + this.empty_bag_wt_priceBasedOn[index])
          //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (item_qty.target.value/this.capacity[index])*1000)/1000).toFixed(3)});}
          //  this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (item_qty.target.value/this.capacity[index])*1000)/1000).toFixed(3)});
          //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
          this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (Number((itemQty - (this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value).target.value)))).toFixed(3) });
        }
        else {
          //console.log("01 " + this.empty_bag_wt_priceBasedOn[index])
          //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: Number(itemQty - (itemQty * this.empty_bag_wt[index])/100).toFixed(3)});
          this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: ((Number((itemQty - (itemQty * this.empty_bag_wt[index]) / 100)))).toFixed(3) });
          //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
        }
        if (this.showstatus == "onShowStatus") {
          //console.log("here popup values ")
          let Newmat_wt: number = 0, total_itemqty: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
            total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            // console.log(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
          }
          // console.log(this.FinalTotal_qty + " / " + Newmat_wt);
          if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt) {
            // console.log(" here id " + this.userForm.get("id").value);
            let compareqty: boolean = false;
            if (this.userForm.get("id").value > 0) {
              compareqty = true;
              //console.log(" item update " + this.userForm.get("id").value)
            }
            else {
              compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
            }
            if (compareqty == false) {
              alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
            else {
              //HERE SETTING TOTAL QTY 
              let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
              if (this.userForm.get("advice_type").value == 'Stock Transfer') {
                this.userForm.patchValue({ total_qty: '0' });
                // this.userForm.patchValue({total_qty_copy:Newmat_wt});
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }
              else {
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                // this.userForm.patchValue({total_qty_copy:Newmat_wt});
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }
            }
          }
          else {
            alert("Exceed Purchase Order Total Quantity");
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
          }
        }

        //for open advice
        if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
        {
          let Newmat_wt: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            // console.log(" hello " + Newmat_wt + " / " + this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
          }
          this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
          //console.log("here 1")
        }
        //for Stock Transfer
        if (this.userForm.get("ref_type").value == "Stock Transfer")//for Stock Transfer 
        {
          //console.log("if part")
          let Newmat_wt: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            //console.log(" hello " + Newmat_wt + " / " + this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
          }
          this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
          //console.log("here 2")
        }
      }
      else {
        //console.log("this.tolerance[index] " + this.tolerance[index])
        let minqty: number = (Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value) * ((100 - Number(this.tolerance[index])) / 100));
        let maxqty: number = (Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value) * ((100 + Number(this.tolerance[index])) / 100));
        itemstatusmin = Number(itemQty) >= minqty;
        itemstatus = Number(itemQty) <= maxqty;
        if (itemstatus == true && itemstatusmin == true) {
          //start here
          if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
            // console.log("1 ")
            //  this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (item_qty.target.value/this.capacity[index])*1000)/1000).toFixed(3)});
            //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
            this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (Number((itemQty - (this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value))))).toFixed(3) });
            //console.log(itemQty + " // " + this.empty_bag_wt[index] + " // " + item_qty.target.value + " // " + this.capacity[index])
          }
          else {
            //console.log("%")
            //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: Number(itemQty - (itemQty * this.empty_bag_wt[index])/100).toFixed(3)});
            //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
            this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: ((Number((itemQty - (itemQty * this.empty_bag_wt[index]) / 100)))).toFixed(3) });
          }
          if (this.showstatus == "onShowStatus") {
            let Newmat_wt: number = 0, total_itemqty: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
              total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
              //console.log(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
            }
            //console.log("tuhin here " + this.FinalTotal_qty + " / " + Newmat_wt);
            if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt) {
              let compareqty: boolean = false;
              if (this.userForm.get("id").value > 0) {
                compareqty = true;
                //console.log(" item update " + this.userForm.get("id").value)
              }
              else {
                if (this.userForm.get("advice_type").value == 'Stock Transfer') {
                  compareqty = true;
                }
                else {
                  compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
                }
              }
              if (compareqty == false) {
                alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
                this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
              }
              else {
                //HERE SETTING TOTAL QTY 
                let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
                if (this.userForm.get("advice_type").value == 'Stock Transfer') {
                  this.userForm.patchValue({ total_qty: '0' });
                  // this.userForm.patchValue({total_qty_copy:Newmat_wt});
                  this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
                }
                else {
                  this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                  // this.userForm.patchValue({total_qty_copy:Newmat_wt});
                  this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
                }
              }
            }
            else {
              alert("Exceed Purchase Order Total Quantity");
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
          }
          //for open advice
          if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
          {
            let Newmat_wt: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
              // console.log(" hello " + Newmat_wt + " / " + this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            }
            this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
            //console.log("here 2")
          }

          //for stock transfer
          if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
          {
            //console.log("else part")
            let Newmat_wt: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
              //console.log(" hello " + Newmat_wt + " / " + this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            }
            this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
            //console.log("here 3")
          }
          //ends here
        }
        else {
          // console.log("else tuhin here ");
          alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) + " to " + maxqty.toFixed(3));
          this.wm_unload_advice_item_dtls.at(index).patchValue({ quantity: Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value).toFixed(2) });
          // starts here
          if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
            //  this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value/this.capacity[index])*1000)/1000).toFixed(3)});
            this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value) * 1000) / 1000).toFixed(3) });
          }
          else {
            this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value - (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value * this.empty_bag_wt[index]) / 100).toFixed(3) });
          }
          if (this.showstatus == "onShowStatus") {
            let Newmat_wt: number = 0, total_itemqty: number = 0, toleranceqty: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
              total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
              toleranceqty += Number(this.wm_unload_advice_item_dtls.at(v).get("toleranceqty").value);
              // console.log(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
            }
            //console.log(this.FinalTotal_qty + " / " + Newmat_wt);
            if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt) {
              let compareqty: boolean = false;
              //for stock transfer
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                compareqty = true;
              }
              else {
                compareqty = Math.round(Number(this.final_mat_wt[index])) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
              }
              // console.log(this.userForm.get("ref_type").value + " // " + compareqty);
              if (compareqty == false) {
                alert("Material Weight exceeded in respect with purchase order :: " + this.final_mat_wt[index]);
                this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0', toleranceqty: '0' });
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
              }
              else {
                //HERE SETTING TOTAL QTY 
                let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
                if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
                {
                  this.userForm.patchValue({ total_qty: '0' });
                  // this.userForm.patchValue({total_qty_copy:Newmat_wt});
                  this.userForm.patchValue({ total_qty_copy: toleranceqty.toFixed(3) });
                }
                else {
                  this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                  // this.userForm.patchValue({total_qty_copy:Newmat_wt});
                  this.userForm.patchValue({ total_qty_copy: toleranceqty.toFixed(3) });
                }
              }
            }
            else {
              alert("Exceed Purchase Order Total Quantity");
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0, toleranceqty: 0 });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
          }

          //for open advice
          if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
          {
            let Newmat_wt: number = 0, toleranceqty: number = 0;
            for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
              Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
              toleranceqty += Number(this.wm_unload_advice_item_dtls.at(v).get("toleranceqty").value);
              // console.log(" hello " + Newmat_wt + " / " + this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            }
            this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
            // console.log("here 3")
          }
          //ends here
        }
      }
    }


  }


  getItemQty1(item_qty, index) {
    this.packingQty = this.wm_unload_advice_item_dtls.at(index).get("s_qty").value as FormControl;
    let itemQty = item_qty.target.value;
    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
      this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (Number((itemQty - (this.empty_bag_wt[index] * this.packingQty)))).toFixed(3) });
    }
    else {
      this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: ((Number((itemQty - (itemQty * this.empty_bag_wt[index]) / 100)))).toFixed(3) });
      //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: Number(itemQty - (this.empty_bag_wt[index] * this.packingQty)).toFixed(3)});
    }
  }

  openbuttonstatus(referenceNo: String) {
    console.log(" tuhin here ")
    if (referenceNo == "Sales Return") {
      this.refNo = true;
      this._referenceNo = referenceNo;
      this.brokerdetailsshow = true;
      this.transportdetailsshow = true;
      // this.showaddrow=false;
      this.showaddrow = true;
    }
    else if (referenceNo == "Purchase Order") {
      this.refNo = true;
      this._referenceNo = referenceNo;
      this.brokerdetailsshow = true;
      this.transportdetailsshow = true;
      this.showaddrow = true;
      //this.wm_unload_advice_item_dtls.at(0).get("")

    }
    else if (referenceNo == "Open Advice") {
      //changed on 13-04-20222
      this.brokerdetailsshow = false;
      this.transportdetailsshow = false;
      this.showaddrow = false;
      //ends
      console.log(" tuhin here " + this.showaddrow)
      //this.userForm.patchValue({item_subtype: 'ITMT00002', we_req: true});
      this.userForm.patchValue({ item_subtype: 'ITMT00001', we_req: true });
      this.userForm.get("item_subtype").disable();
      //this.onChangeServicesItemType('ITMT00002', 'Open Advice');
      this.onChangeServicesItemType('ITMT00001', 'Open Advice');
      this.addItem();
      this.item_sl_no = 0;
      while (this.wm_unload_advice_item_dtls.length)
        this.wm_unload_advice_item_dtls.removeAt(0);
      this.addItem();
      this.refNo = false;


      this.userForm.patchValue({ total_qty: "0", total_qty_copy: "0" })
    }
    else if (referenceNo == "Stock Transfer") {

      this.refNo = true;
      this._referenceNo = referenceNo;
      this.showaddrow = true;

    }
    else {
      this.refNo = false;
      this.showaddrow = false;
      ;
    }
  }

  onClickShow() {
    this.no_advice_cal = [];
    this.final_mat_wt = [];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0 };
    //console.log("hello")
    if (this.userForm.get("advice_type").value == 'Stock Transfer') {
      //starts here 
      this.supplier_id = 0;
      this.customer_id = 0;


      let dialogref;
      dialogref = this.dialog.open(StockTransferUnloadingAfterInvoiceComponent, { data: { bunit: this.businessUnit, company_id: this.company_name, date: this.currentDate, fin_yr: this.financialYear } });
      dialogref.afterClosed().subscribe(data => {

        if (data != '' && data["stk_challan_id"] != '0') {
          this.showstatus = "onShowStatus";
          let totalunloadqty: number = 0;
          let k = 0;
          let globaluom = data.stk_challan__Item_Dtls[0]["uom"];
          // console.log("globaluom:"+globaluom)
          this.packingItem = [];
          this.userForm.patchValue({ referance_id: data["stk_challan_id"] });

          this.addItem();
          this.item_sl_no = 0;
          while (this.wm_unload_advice_item_dtls.length)
            this.wm_unload_advice_item_dtls.removeAt(0);
          console.log("Stock Transfer item dtls: " + JSON.stringify(data))
          this.userForm.patchValue({ we_req: true });
          console.log("Stock Transfer item dtls: " + JSON.stringify(data.stk_challan__Item_Dtls))
          for (let data1 of data.stk_challan__Item_Dtls) {
            if (data1.checkbox == true) {
              this.status = false;
              this.isBrokerageApplicable = true;
              forkJoin(
                this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
              ).subscribe(([packingList, capacityEmptyWt]) => {
                this.status = true;
                //this.onChangeWarehouse(data1.wearhouse, k);
                this.packingItem[k] = packingList;
                this.capacity[k] = capacityEmptyWt["capacity"];
                this.tolerance[k] = capacityEmptyWt["tolerance"];
                this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];

                this.addItem();
                console.log("here " + data1["item_code"])
                this.wm_unload_advice_item_dtls.at(k).patchValue({
                  item_code: data1["item_code"], qc_norms: data1["accnorms"],
                  quantity: Number(data1["quantity"]).toFixed(3), packing: data1["packing"], uom: data1["uom"],
                  s_qty: data1["squantity"], s_uom: data1["suom"], mat_wt: Number(data1["mat_wt"]).toFixed(3), toleranceqty: data1["quantity"]
                });


                totalunloadqty += Number(Number(data1["quantity"]).toFixed(3));
                //unloadqty patching here 
                this.userForm.patchValue({ total_qty_copy: Number(totalunloadqty).toFixed(3), total_qty: 0 });
                this.FinalTotal_qty = Number(totalunloadqty).toFixed(3);
                console.log(" quality12  " + totalunloadqty)
                k = k + 1;
              });
            }
          }
          this.customUOMs.forEach(element => {
            if (element.description == globaluom) {
              this.userForm.patchValue({ uom: element.customuom_id });
            }


          });
          this.DropDownListService.getStockVehicleAndDriver(data["stk_challan_id"]).subscribe((driverVehicle) => {

            this.userForm.patchValue({ vehicle_id: driverVehicle["doc_no"] });

            this.getStockDriverName(driverVehicle["doc_no"]);
            this.wm_unload_advice_driver_dtls.patchValue({ driver_name: driverVehicle["driver_name"], phone: driverVehicle["phone"], address: driverVehicle["address"] });
          });

          this.status = true;



        }



        this.status = true;
      });

      //ends here 
    }
    else {

      //starts bid
      if (this.supplier_id != "0" || this.customer_id != "0") {

        if (this._referenceNo == "Purchase Order") {
          let dialogref;
          dialogref = this.dialog.open(PurchaseOrdPopUpModalComponent, {
            data: {
              ref_type: "Purchase Order", supplier_id: this.supplier_id,
              business_unit: this.business_unit.value, item_subtype: this.userForm.get("item_subtype").value
            }
          });
          dialogref.afterClosed().subscribe(data => {

            if (data != '' && data["pur_orderid"] != '0') {
              let k = 0;
              this.showstatus = "onShowStatus";
              this.userForm.patchValue({
                referance_id: data["pur_orderid"], total_qty: data["total_qty_copy"].toFixed(3),
                uom: data["staticuom"], poitemnumber: data["poitemnumber"]
              });

              if (data["poitemnumber"] == "Yes") {
                this.poitemnumberstatus = false;
                this.showaddrow = false;
                this.totalmatwtvalue = data.PurchaseOrderItem[0]["final_mat_wt"];
              }
              else {
                this.poitemnumberstatus = true;
                this.showaddrow = true;
              }
              this.packingItem = [];
              this.userForm.patchValue({ referance_id: data["pur_orderid"] });
              this.orderNo = data["pur_orderid"];

              if (JSON.stringify(data.weightment_req) == 'true') {
                this.userForm.patchValue({ we_req: 'true' })
              }
              this.addItem();
              this.item_sl_no = 0;
              while (this.wm_unload_advice_item_dtls.length)
                this.wm_unload_advice_item_dtls.removeAt(0);
              let totalUnloadQty: number = 0;
              totalUnloadQty = 0;

              for (let data1 of data.PurchaseOrderItem) {
                if (data1.checkbox == true || data1.checkbox == "true") {
                  this.popupstatus = true;
                  this.status = false;
                  this.isBrokerageApplicable = true;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.onChangeWarehouse(data1.wearhouse, k);
                    this.final_mat_wt.push(data1["final_mat_wt"]);
                    this.no_advice_cal.push(data1["no_advice_cal"]);
                    this.packingItem[k] = packingList;
                    this.capacity[k] = capacityEmptyWt["capacity"];
                    this.tolerance[k] = capacityEmptyWt["tolerance"];
                    this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                    this.empty_bag_wt_priceBasedOn[k] = capacityEmptyWt["empbagwt_based_on"];
                    this.addItem();
                    if (data["ser_item_subtype"] == "ITMT00002" || data["ser_item_subtype"] == "ITMT00004") {
                      this.wm_unload_advice_item_dtls.at(k).patchValue({
                        item_code: data1["item_code"], qc_norms: data1["qc_norms"],
                        packing: data1["packing_item"], packing_item_code: data1["packing_item_code"], packing_size: data1["packing_size"],
                        packing_weight: data1["packing_weight"], packing_type: data1["packing_type"], uom: data1["stock_uom"],
                        s_uom: data1["packing_uom"], pur_dyn_id: data1["id"], con_factor: data1["con_factor"], s_qty: data1["packing_qty"],
                        quantity: data1["stock_qty"], mat_wt: data1["mat_weight"], toleranceqty: data1["stock_qty"],
                        classified_item_name: data1["classified_item_name"], price_based_on: data1["price_based_on"]
                      });

                      totalUnloadQty += Number(data1["stock_qty"]);
                      this.userForm.patchValue({ total_qty_copy: totalUnloadQty });
                    }
                    else {
                      this.wm_unload_advice_item_dtls.at(k).patchValue({
                        item_code: data1["item_code"], qc_norms: data1["qc_norms"],
                        packing: data1["packing_item"], uom: data1["stock_uom"],
                        s_uom: data1["packing_uom"], pur_dyn_id: data1["id"], con_factor: data1["con_factor"], classified_item_name: data1["classified_item_name"]
                      });

                    }
                    if (data.consignment_type == "Yes") {
                      this.wm_unload_advice_item_dtls.at(k).patchValue({ s_qty: data1["packing_qty"], quantity: data1["stock_qty"] });
                    }

                    if (data1["packing_item"] == "" || data1["packing_item"] == null)
                      this.wm_unload_advice_item_dtls.at(k).patchValue({ packing: "0" });
                    k = k + 1;
                  });
                }
              }

              this.status = false;
              forkJoin(
                this.DropDownListService.getPurOrdAppChgs(data["pur_orderid"]),
                // this.DropDownListService.getPurOrdTrans(data["pur_orderid"]),
                this.Service.getPurOrdTransChgsDynList(data["pur_orderid"]),
                this.DropDownListService.purOrdBPDRetriveList(data["pur_orderid"]),
                this.DropDownListService.getPurOrdDetails(data["pur_orderid"]),
                this.DropDownListService.transporterNamesList(),
                this.DropDownListService.transporterNameChgsPurList(data["pur_orderid"]),
              ).subscribe(([appChargesData, transporterData, bpData, pOrderData, transport, tranchgslist]) => {

                let k = 0
                this.addAppCharges();
                while (this.wm_unload_advice_app_chgs.length)
                  this.wm_unload_advice_app_chgs.removeAt(0);
                for (let data1 of appChargesData) {
                  this.addAppCharges();
                  this.wm_unload_advice_app_chgs.at(k).patchValue({
                    charges_name: data1["charges_name"],
                    rate_cal_method: data1["rate_cal_method"], tax_rate: data1["tax_rate"], amount: data1["amount"]
                  });
                  k = k + 1;
                }
                //Transporter Details
                if (pOrderData["trans_borne_by_chgs"] == "FOB") {
                  this.transporterNames = tranchgslist;
                  this.userForm.patchValue({ transporter_code: transporterData[0]["transporter_name"] });
                  this.wm_unload_advice_trans_info.patchValue({ trans_borne_by: pOrderData["trans_borne_by_chgs"] });
                  this.wm_unload_advice_trans_info.patchValue({
                    transporter_name: transporterData[0]["transporter_name"],
                    mode_of_trans: transporterData[0]["mode_of_trans"], transport_rate: transporterData[0]["transport_rate"],
                    charge_code: transporterData[0]["charge_code"],
                    rate_value: transporterData[0]["chgs_rate_value"]
                  });
                  this.onChangeTInfoTransporterName(transporterData[0]["transporter_name"]);
                }
                else {

                  this.transporterNames = transport;
                }
                if (this.transporter_id == '' || this.transporter_id == null || this.transporter_id == '0') {
                  this.DropDownListService.getVehiclenoall().subscribe(vehicleData1 => {
                    this.vehclenos = vehicleData1;
                    this.status = true;
                  })
                }
                else {
                  this.wm_unload_advice_trans_info.patchValue({
                    payment_mode: transporterData["payment_mode"],
                    payment_terms: transporterData["payment_terms"], bank_name: transporterData["bank_name"],
                    account_name: transporterData["account_name"], account_no: transporterData["account_no"],
                    branch: transporterData["branch"], iban: transporterData["iban"], bic_swift_code: transporterData["bic_swift_code"],
                    mobile: transporterData["mobile"], ifsc_code: transporterData["ifsc_code"], cash_limit: transporterData["cash_limit"]
                  });
                }
                //Business Partner details
                this.wm_unload_advice_bp_dtls.patchValue({
                  sp_name: bpData["supp_name"], sp_address: bpData["supp_address"],
                  sp_email: bpData["supp_email"], sp_fax: bpData["supp_fax"], sp_phone: bpData["supp_phone"],
                  cp_name: bpData["cp_name"], cp_designation: bpData["cp_designation"], cp_email: bpData["cp_email"],
                  cp_fax: bpData["cp_fax"], cp_phone: bpData["cp_phone"], cp_address: bpData["cp_address"]
                });

                //Purchage Order Details
                this.onChangeServicesItemType(pOrderData["ser_item_subtype"], pOrderData["referance_type"]);
                this.userForm.patchValue({
                  item_subtype: pOrderData["ser_item_subtype"],
                  app_chgs_id: pOrderData["app_chgs_id"], remarks: pOrderData["remarks"], business_unit: pOrderData["businessunit"]
                });
                if (pOrderData["broker_info"] == true) {
                  this.status = false;
                  this.isBrokerDtlsHidden = false;
                  this.DropDownListService.getPurOrdBrokerList(data.pur_orderid).subscribe(brokerData => {
                    console.log("purchage broker: " + JSON.stringify(brokerData));
                    this.addBroker();
                    this.broker_sl_no = 0;
                    while (this.wm_unload_advice_broker_dtls.length)
                      this.wm_unload_advice_broker_dtls.removeAt(0);
                    for (let data1 of brokerData)
                      this.addBroker();
                    this.wm_unload_advice_broker_dtls.patchValue(brokerData);
                  });
                }
                this.status = true;
              });
              if (this.vehicleId == '' || this.vehicleId == null) {
              }
              else {
                this.onChangeVechileNo(this.vehicleId);
              }
            }
            this.onChangeUom(this.userForm.get("uom").value);

            this.FinalTotal_qty = this.userForm.get("total_qty").value;

            this.wm_unload_advice_driver_dtls.patchValue({ driver_name: "0" })
          });
        }

        if (this._referenceNo == 'Sales Return') {

          if (this.userForm.get("jobwork").value == true) {
            this.Id = this.userForm.get("id").value;
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { advice_date: this.userForm.get("ula_date").value, BUnit: this.userForm.get("business_unit").value, Party: this.customer_id, Id: this.Id };
            const dialogRef = this.dialog.open(UnloadAdviceJobworkComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(data => {
              if (data != '' && data["main_id"] != "0") {
                this.userForm.patchValue({ referance_id: data.main_id });
                this.addJobItem();
                this.jobpackinglist = [];
                this.job_sl_no = 0;
                while (this.wm_unload_advice_item_dtls_for_jobwork.length)
                  this.wm_unload_advice_item_dtls_for_jobwork.removeAt(0);
                let totalunloadqty: number = 0;
                let k = 0, UOM = "";
                for (let data1 of data.job_details) {
                  if (data1.checkbox == true || data1.checkbox == 'true') {
                    forkJoin(
                      this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, 'INV00003'),
                      this.DropDownListService.getItemMasterPackMat(data1["job_item"])).subscribe(([itemdatalist, packingList]) => {
                        this.jobitemlist = itemdatalist;
                        this.jobpackinglist[k] = packingList;
                        this.selectedJobItem[k] = data1["job_item"]
                        this.selectedJobPacking[k] = data1["job_packing"]
                        this.addJobItem();
                        totalunloadqty += Number(Number(data1["item_qty"]).toFixed(3));
                        this.userForm.patchValue({ total_qty_copy: this.round(Number(totalunloadqty), 3) });
                        this.wm_unload_advice_item_dtls_for_jobwork.at(k).patchValue(data1);
                        k = k + 1;
                      });
                  }
                }



                this.status = false;
                forkJoin(
                  // this.DropDownListService.getPurOrdTrans(data["salesreturnid"]),
                  this.DropDownListService.getReturnApprovalWD(data["main_id"]),
                  this.DropDownListService.getReturnApprovalDtls(data["main_id"]),
                  this.DropDownListService.getReturnApprovalTI(data["main_id"]),
                  this.DropDownListService.getReturnApprovalBD(data["main_id"]),
                  this.DropDownListService.getVehiclenoall(),
                  this.DropDownListService.transporterNamesList()
                ).subscribe(([wghmentData, sReturnData, transporterData, brokerData, allvehicle, translist]) => {
                  this.transporterNames = translist;
                  console.log("Check SRETURN  : : " + JSON.stringify(sReturnData));
                  console.log("trans code:" + transporterData["transcode"] + "//" + transporterData["transborneby"])
                  //Transporter Details
                  //this.onChangeTransporterName(transporterData["transcode"]);
                  if (transporterData["transborneby"] == 'FOR') {
                    this.isTranporterInfoIsDisabled = true;
                  }
                  else {
                    this.isTranporterInfoIsDisabled = false;
                  }
                  this.wm_unload_advice_trans_info.patchValue({
                    trans_borne_by: transporterData["transborneby"],
                    transporter_name: transporterData["transcode"], mode_of_trans: transporterData["modeoftrans"],
                    charge_code: transporterData["chargecode"], rate_value: transporterData["freightamt"]
                  });
                  //this.onChangeTInfoTransporterName(transporterData["transcode"]);
                  //this.onChangeTransportBorneBy(transporterData["transborneby"]);

                  this.wm_unload_advice_party_wm.patchValue({
                    gross_wt: wghmentData["partygross"], uom1: wghmentData["partyuom"],
                    tare_wt: wghmentData["partytare"], uom2: wghmentData["partyuom"], net_wt: wghmentData["partynet"],
                    uom3: wghmentData["partyuom"], slip_no: wghmentData["partyslipno"], pw_date: wghmentData["partydate"]
                  })

                  //console.log("transporterData: "+JSON.stringify(transporterData))
                  if (sReturnData["returncriteria"] == "Partial Return") {
                    this.userForm.patchValue({ return_type: true })
                  }
                  this.vehclenos = allvehicle;
                  this.userForm.patchValue({
                    remarks: sReturnData["remark"], we_req: true,
                    uom: wghmentData["partyuom"], total_qty: wghmentData["partynet"], transporter_code: transporterData["transcode"], vehicle_id: transporterData["vehicleid"]
                  });

                  console.log(" hello " + transporterData["vehicleid"]);
                  if (transporterData["vehicleid"] == '' || transporterData["vehicleid"] == null) {
                  }
                  else {

                    this.onChangeVechileNo(transporterData["vehicleid"]);
                  }

                  //Broker Dtls
                  console.log("broker data:" + JSON.stringify(brokerData))
                  let j = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while (this.wm_unload_advice_broker_dtls.length)
                    this.wm_unload_advice_broker_dtls.removeAt(0);
                  for (let data1 of brokerData) {
                    this.status = false;
                    this.DropDownListService.getCustomerBrokerDtls(this.customer_id, data1["brokercode"]).subscribe(accData => {
                      this.addBroker();
                      this.wm_unload_advice_broker_dtls.at(j).patchValue({
                        ven_code_name: data1["brokercode"], tds_acc: accData["tds_acc"],
                        basis: data1["basis"], rate: data1["rate"], brokerage_acc: accData["brokerage_acc"], tds_rate: accData["tds_rate"]
                      });
                      j = j + 1;
                      this.status = true;
                    })
                  }
                  this.status = true;
                });





              }
            });
          }
          else {

            let dialogref;
            dialogref = this.dialog.open(SalesReturnApprovalNotePopUpComponent, { data: { bunit: this.businessUnit, company_id: this.company_name, customer_id: this.customer_id, date: this.currentDate, fin_yr: this.financialYear } });
            dialogref.afterClosed().subscribe(data => {
              if (data != '' && data["salesreturnid"] != '0') {
                this.showstatus = "onShowStatus";
                let totalunloadqty: number = 0;
                let k = 0;
                this.packingItem = [];
                this.userForm.patchValue({ referance_id: data["salesreturnid"] });

                this.addItem();
                this.item_sl_no = 0;
                while (this.wm_unload_advice_item_dtls.length)
                  this.wm_unload_advice_item_dtls.removeAt(0);
                //console.log("salesReturn item dtls: "+JSON.stringify(data))

                for (let data1 of data.return_approval_Item_Dtls) {
                  if (data1.checkbox == true) {
                    this.status = false;
                    this.isBrokerageApplicable = true;
                    forkJoin(
                      this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                      this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name)
                    ).subscribe(([packingList, capacityEmptyWt]) => {
                      this.status = true;
                      this.onChangeWarehouse(data1.wearhouse, k);
                      this.packingItem[k] = packingList;
                      this.capacity[k] = capacityEmptyWt["capacity"];
                      this.tolerance[k] = capacityEmptyWt["tolerance"];
                      this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                      this.addItem();
                      this.wm_unload_advice_item_dtls.at(k).patchValue({
                        item_code: data1["itemcode"], qc_norms: data1["accnorms"],
                        quantity: Number(data1["quantity"]).toFixed(3), packing: data1["packing"], uom: data1["uom"],
                        s_qty: data1["squantity"], s_uom: data1["suom"], mat_wt: Number(data1["matwt"]).toFixed(3)
                      });


                      totalunloadqty += Number(Number(data1["quantity"]).toFixed(3));
                      //unloadqty patching here 
                      this.userForm.patchValue({ total_qty_copy: Number(totalunloadqty).toFixed(3) });
                      //console.log(" quality12  " + totalunloadqty)
                      k = k + 1;
                    });
                  }
                }


                this.status = false;
                forkJoin(
                  // this.DropDownListService.getPurOrdTrans(data["salesreturnid"]),
                  this.DropDownListService.getReturnApprovalWD(data["salesreturnid"]),
                  this.DropDownListService.getReturnApprovalDtls(data["salesreturnid"]),
                  this.DropDownListService.getReturnApprovalTI(data["salesreturnid"]),
                  this.DropDownListService.getReturnApprovalBD(data["salesreturnid"])
                ).subscribe(([wghmentData, sReturnData, transporterData, brokerData]) => {
                  //Transporter Details
                  this.onChangeTInfoTransporterName(transporterData["transcode"]);
                  this.onChangeTransporterName(transporterData["transcode"]);
                  this.wm_unload_advice_trans_info.patchValue({
                    trans_borne_by: transporterData["transborneby"],
                    transporter_name: transporterData["transcode"], mode_of_trans: transporterData["modeoftrans"],
                    charge_code: transporterData["chargecode"]
                  });
                  this.onChangeTransportBorneBy(transporterData["transborneby"]);

                  this.wm_unload_advice_party_wm.patchValue({
                    gross_wt: wghmentData["partygross"], uom1: wghmentData["partyuom"],
                    tare_wt: wghmentData["partytare"], uom2: wghmentData["partyuom"], net_wt: wghmentData["partynet"],
                    uom3: wghmentData["partyuom"], slip_no: wghmentData["partyslipno"], pw_date: wghmentData["partydate"]
                  })

                  //console.log("salesReturn dtls: "+JSON.stringify(sReturnData))
                  if (sReturnData["returncriteria"] == "Partial Return") {
                    this.userForm.patchValue({ return_type: true })
                  }
                  this.userForm.patchValue({
                    remarks: sReturnData["remark"], we_req: true,
                    uom: wghmentData["partyuom"], total_qty: wghmentData["partynet"], transporter_code: transporterData["transcode"], vehicle_id: transporterData["vehicleid"]
                  });

                  //console.log(" hello " + transporterData["vehicleid"]);
                  if (transporterData["vehicleid"] == '' || transporterData["vehicleid"] == null) {
                  }
                  else {

                    this.onChangeVechileNo(transporterData["vehicleid"]);
                  }

                  //Broker Dtls

                  let j = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while (this.wm_unload_advice_broker_dtls.length)
                    this.wm_unload_advice_broker_dtls.removeAt(0);
                  for (let data1 of brokerData) {
                    this.status = false;
                    this.DropDownListService.getCustomerBrokerDtls(this.customer_id, data1["brokercode"]).subscribe(accData => {
                      this.addBroker();
                      this.wm_unload_advice_broker_dtls.at(j).patchValue({
                        ven_code_name: data1["brokercode"], tds_acc: accData["tds_acc"],
                        basis: data1["basis"], rate: data1["rate"], brokerage_acc: accData["brokerage_acc"], tds_rate: accData["tds_rate"]
                      });
                      j = j + 1;
                      this.status = true;
                    })
                  }
                  this.status = true;
                });

              }
            });
          }
        }
      }
      else {
        alert("Select Business Partner First");
      }
      //ends bid
    }

  }

  onClickBillPrint(id, unloadid) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    let comp = this.company_name;
    let dialogRef = this.dialog.open(UnloadBillPrintComponent, {
      data: { alldata: id, unloadid: unloadid, company_name: comp }, height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(data => {
      // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
    });
  }
  addNewVechile() {
    let TransporterCode = this.userForm.get("transporter_code").value;
    //console.log("transporter code:"+TransporterCode)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, TransporterCode: TransporterCode };
    const dialogRef = this.dialog.open(AddNewVechilePopUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.status = false;
        //console.log("Vechile Details: "+JSON.stringify(result));
        //this.Service.createVehicle(result).subscribe(data => 
        this.Service.createVehiclepopup(result).subscribe(data => {

          alert("New Vehicle Created Successfully.");
          //console.log("get trans id:"+this.transporter_id)

          if (this.transporter_id == 0 || this.transporter_id == '' || this.transporter_id == null) {
            this.DropDownListService.getVehiclenoall().subscribe(vehicleData1 => {
              //  console.log("if part:"+JSON.stringify(vehicleData1))
              this.vehclenos = vehicleData1;
              this.status = true;
            })

          }
          else {

            this.DropDownListService.getVehicleThruTransporter(this.transporter_id).subscribe(vehicleData => {
              //console.log("else part:"+JSON.stringify(vehicleData))
              this.vehclenos = vehicleData;
              this.status = true;
            })

          }
        });
      }

      this.wm_unload_advice_driver_dtls.patchValue({ driver_name: "0" })
      this.status = true;
    });
  }


  onUpdate(id: any, unadviceid: string, action) {
    this.unloadadvicesave = true;
    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.vehclenos = [];
    //this.showList('add');
    if (action == 'view') {
      this.action = 'view';

    }
    else {
      this.action = 'update';
    }


    forkJoin(
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      //this.DropDownListService.brokerNameList(),
      this.DropDownListService.brokerNameListFast(),
      this.DropDownListService.getWeighmentCharges(),
      this.DropDownListService.ledgerNameList(),
      this.DropDownListService.payTermNameList(),
      //this.DropDownListService.itemTypeListNew(this.company_name),
      this.DropDownListService.itemTypeListFastAPI(this.company_name),
      //this.DropDownListService.getItemThruPurchase(),
      this.DropDownListService.getItemThruPurchasenew(),
      this.DropDownListService.getWeighmentCustomUOM(),
      this.DropDownListService.getChargeMasterList(),
      this.DropDownListService.getMiscList(),
      this.DropDownListService.getVehiclenoall(),
      this.Service.unloadAdviceRetrive(id),
      this.Service.getUnloadItemList(unadviceid),
      this.Service.wmUnAdviceAppChgsRetriveList(unadviceid),
      this.Service.wmUnAdviceBpDtlsRetriveList(unadviceid),
      this.Service.wmUnAdviceBrokerRetriveList(unadviceid),
      this.Service.wmUnAdviceDocRetriveList(unadviceid),
      this.Service.wmUnAdviceDriverDtlsRetriveList(unadviceid),
      this.Service.wmUnAdvicePartyWmRetriveList(unadviceid),
      this.Service.wmUnAdviceTransConRetriveList(unadviceid),
      this.Service.wmUnAdviceTransInfoRetriveList(unadviceid),
      this.DropDownListService.getVehiclenoall(),
      this.DropDownListService.transporterNamesList()
    ).subscribe(([buData, brokerlistData, wmtChgData, ledgerData, paytermData, itemTypeData, itemNameData, customUomData, chgMasterData, getMiscData, vehclenosall, UnloadingAdviceData, itemData, appChargesData,
      bpDetailsData, brokerData, docData, driverData, partyData, termsConditionData, transData, vehicleall, translist]) => {
      this.bussiness_unit_list = buData;
      this.brokerNameList = brokerlistData;
      this.chargesList = wmtChgData;
      this.ledgerNames = ledgerData;
      this.payTerms = paytermData;
      this.itemtypes = itemTypeData;
      this.item_codes = itemNameData;
      this.customUOMs = customUomData;
      this.chargesIdList = chgMasterData;
      this.WeighBridgeList = getMiscData;
      this.vehclenos = vehclenosall;

      //console.log("static data " + JSON.stringify(UnloadingAdviceData));

      this.adviceType = UnloadingAdviceData["advice_type"];
      this.customer_id = UnloadingAdviceData["customer"];
      this.supplier_id = UnloadingAdviceData["busi_partner"];
      this.businessUnit = UnloadingAdviceData["business_unit"];
      this.currentDate = UnloadingAdviceData["ula_date"];
      this._referenceNo = UnloadingAdviceData["ref_type"];

      this.onChangeUom(UnloadingAdviceData["uom"]);

      this.onChangeVechileNo(UnloadingAdviceData["vehicle_id"]);

      if (UnloadingAdviceData["jobwork"] == true && UnloadingAdviceData["looseitem"] == true) {
        this.jobworklooseitem = false;
      }
      else {
        this.jobworklooseitem = true;
      }

      //lock unload advice for open advice with weigment done all
      //   if(UnloadingAdviceData["ref_type"] =="Open Advice" && UnloadingAdviceData["weighment_status"] == 2)
      if (UnloadingAdviceData["weighment_status"] == 2 || UnloadingAdviceData["weighment_status"] == 1) {
        this.openadvice = true;
      }
      //openadvice
      //changes 12-04-2022
      this.adviceType = UnloadingAdviceData["advice_type"];

      if (UnloadingAdviceData["transporter_code"] == null || UnloadingAdviceData["transporter_code"] == '0') {
        //console.log("hello")
        this.vehclenos = vehicleall;
      }
      else {
        //console.log("hello else")
        if (UnloadingAdviceData["ref_type"] == "Stock Transfer") {
          // console.log("hello else if")
        }
        else {
          //console.log("hello else else")
          this.onChangeTransporterName1(UnloadingAdviceData["transporter_code"]);
        }

      }
      // console.log(" tuhin here  " + UnloadingAdviceData["ref_type"]  +" / " + JSON.stringify(UnloadingAdviceData))

      //console.log(" tuhin here here    " +  this.showaddrow)

      this.onChangeBusinessUnit(UnloadingAdviceData["business_unit"], 'update');
      this.onChangeAdviceType(UnloadingAdviceData["advice_type"]);


      if (UnloadingAdviceData["advice_type"] == 'Sales Return') {
        this.onChangeCustomerName(UnloadingAdviceData["customer"]);
      }
      else if (UnloadingAdviceData["advice_type"] == 'Purchase Order') {

        this.onChangeSupplierName(UnloadingAdviceData["busi_partner"]);
        this.onChangeServicesItemType(UnloadingAdviceData["item_subtype"], UnloadingAdviceData["ref_type"]);
      }
      //  console.log("check here plz"+ UnloadingAdviceData["vehicle_id"] +" /" + UnloadingAdviceData["vehicle_no"]);

      this.onChangeServicesItemType(UnloadingAdviceData["item_subtype"], UnloadingAdviceData["ref_type"])

      // console.log(" tuhin here here   end 5 " +  this.showaddrow)

      this.userForm.patchValue({
        id: UnloadingAdviceData["id"], unadviceno: UnloadingAdviceData["unadviceno"], unadviceid: UnloadingAdviceData["unadviceid"],
        pur_orderid: UnloadingAdviceData["pur_orderid"], item_type: UnloadingAdviceData["item_type"], veh_no: UnloadingAdviceData["veh_no"],
        item_subtype: UnloadingAdviceData["item_subtype"], busi_partner: UnloadingAdviceData["busi_partner"], ref_type: UnloadingAdviceData["ref_type"],
        ul_date: UnloadingAdviceData["ul_date"], we_req: UnloadingAdviceData["we_req"], we_chg_app: UnloadingAdviceData["we_chg_app"],
        supp_ref_doc: UnloadingAdviceData["supp_ref_doc"], supp_ref_docno: UnloadingAdviceData["supp_ref_docno"], supp_ref_doc_date: UnloadingAdviceData["supp_ref_doc_date"], ula_date: UnloadingAdviceData["ula_date"],
        //business_unit: UnloadingAdviceData["business_unit"],vehicle_id: UnloadingAdviceData["vehicle_id"],vehicle_no: UnloadingAdviceData["vehicle_no"],    
        business_unit: UnloadingAdviceData["business_unit"], vehicle_id: UnloadingAdviceData["vehicle_id"],
        //   business_unit: UnloadingAdviceData["business_unit"],total_qty: UnloadingAdviceData["total_qty"], 
        uom: UnloadingAdviceData["uom"], return_type: UnloadingAdviceData["return_type"], return_remarks: UnloadingAdviceData["return_remarks"], referance_id: UnloadingAdviceData["referance_id"],
        transporter_name: UnloadingAdviceData["transporter_name"], transporter_code: UnloadingAdviceData["transporter_code"], brokerage_active: UnloadingAdviceData["brokerage_active"],
        advice_id: UnloadingAdviceData["advice_id"], weighment_status: UnloadingAdviceData["weighment_status"], app_chgs_id: UnloadingAdviceData["app_chgs_id"],
        advice_type: UnloadingAdviceData["advice_type"], qc_required: UnloadingAdviceData["qc_required"], company_id: UnloadingAdviceData["company_id"],
        remarks: UnloadingAdviceData["remarks"], fin_year: UnloadingAdviceData["fin_year"], customer: UnloadingAdviceData["customer"]
        , poitemnumber: UnloadingAdviceData["poitemnumber"], jobwork: UnloadingAdviceData["jobwork"], looseitem: UnloadingAdviceData["looseitem"]
      });




      //console.log("UnloadingAdviceData Details: "+  JSON.stringify(UnloadingAdviceData));
      //  console.log("vehicle: "+  this.userForm.get("vehicle_id").value);
      console.log("itemData: " + JSON.stringify(itemData));
      if (UnloadingAdviceData["ref_type"] == "Sales Return") {
        this.showaddrow = true;
      }
      else if (UnloadingAdviceData["ref_type"] == "Purchase Order") {
        if (UnloadingAdviceData["poitemnumber"] == "Yes") {
          this.poitemnumberstatus = false;
          this.showaddrow = false;
        }
        else {
          this.poitemnumberstatus = true;
          this.showaddrow = true;
        }
      }
      else if (UnloadingAdviceData["ref_type"] == "Open Advice") {
        this.showaddrow = false;
      }
      else if (UnloadingAdviceData["ref_type"] == "Stock Transfer") {
        this.showaddrow = true;
      }
      else {

        this.showaddrow = false;
      }
      // console.log(" tuhin here here   end 4 " +  this.showaddrow)
      if (UnloadingAdviceData["jobwork"] == true) {
        let totalunloadqty: number = 0;
        this.jobtransaction = true;
        forkJoin(
          this.DropDownListService.getItemThruSalesThruBU_inv_type(UnloadingAdviceData["business_unit"], this.company_name, 'INV00003'),
          this.DropDownListService.retriveUnloadAdviceJobwork(unadviceid),

        ).subscribe(([itemlist, jobData]) => {
          this.jobitemlist = itemlist;
          let j1 = 0;
          this.addJobItem();
          this.job_sl_no = 0;
          while (this.wm_unload_advice_item_dtls_for_jobwork.length)
            this.wm_unload_advice_item_dtls_for_jobwork.removeAt(0);
          for (let data12 of jobData) {
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data12["job_item"]),
              this.DropDownListService.getItemPackUom(data12["job_item"], data12["job_packing"], this.company_name)).subscribe(([packingList, capacityEmptyWt]) => {
                this.addJobItem();
                this.jobpackinglist[j1] = packingList;
                this.selectedJobItem[j1] = data12["job_item"];
                this.selectedJobPacking[j1] = data12["job_packing"];
                this.capacity[j1] = capacityEmptyWt.capacity;
                this.wm_unload_advice_item_dtls_for_jobwork.at(j1).patchValue({
                  job_item: data12["job_item"], job_packing: data12["job_packing"],
                  job_hsn: data12["job_hsn"], pack_qty: data12["pack_qty"], pack_uom: data12["pack_uom"], price_based_on: data12["price_based_on"],
                  item_qty: data12["item_qty"], item_uom: data12["item_uom"], tolerance: data12["tolerance"], classified_item_name: data12["classified_item_name"],
                });

                totalunloadqty += Number(Number(data12["item_qty"]).toFixed(3));
                this.userForm.patchValue({ total_qty_copy: Number(totalunloadqty).toFixed(3) });
                j1 = j1 + 1;
                this.status = true;
              });
          }
        });
      }
      else {
        this.jobtransaction = false;
        let k = 0;
        this.addItem()
        this.item_sl_no = 0;
        while (this.wm_unload_advice_item_dtls.length)
          this.wm_unload_advice_item_dtls.removeAt(0);


        for (let data1 of itemData) {
          this.status = false;
          forkJoin(
            this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
            this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
            this.DropDownListService.getItemQCDetails(data1["item_code"], this.company_name)
          ).subscribe(([packingList, capacityEmptyWt, qcdetails]) => {
            this.status = true;
            this.addItem();
            this.onChangeWarehouse(data1.wearhouse, k);
            this.packingItem[k] = packingList;
            this.capacity[k] = capacityEmptyWt["capacity"];
            this.tolerance[k] = capacityEmptyWt["tolerance"];
            this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
            this.empty_bag_wt_priceBasedOn[k] = capacityEmptyWt["empbagwt_based_on"];
            this.qc_normsList[k] = qcdetails;
            // this.selectedItemName[k] = data1["item_code"];
            //  this.selectedPackingItem[k] = data1["packing"];
            this.wm_unload_advice_item_dtls.at(k).patchValue(data1);
            if (data1["packing"] == "" || data1["packing"] == null)
              this.wm_unload_advice_item_dtls.at(k).patchValue({ packing: "0" });


            k = k + 1;
          });
        }
      }
      // console.log(" tuhin here here   end 3 " +  this.showaddrow)
      //this.userForm.patchValue({customer: UnloadingAdviceData["customer"], busi_partner: UnloadingAdviceData["busi_partner"]});
      //console.log("vehicle1: "+  this.userForm.get("vehicle_id").value);
      this.addAppCharges()
      while (this.wm_unload_advice_app_chgs.length)
        this.wm_unload_advice_app_chgs.removeAt(0);
      for (let data1 of appChargesData)
        this.addAppCharges();
      this.wm_unload_advice_app_chgs.patchValue(appChargesData);
      //  console.log("appChargesData: "+JSON.stringify(appChargesData));

      // console.log("BP details: "+  JSON.stringify(bpDetailsData));
      this.wm_unload_advice_bp_dtls.patchValue(bpDetailsData);

      this.addBroker()
      while (this.wm_unload_advice_broker_dtls.length)
        this.wm_unload_advice_broker_dtls.removeAt(0);
      for (let data1 of brokerData)
        this.addBroker();
      this.wm_unload_advice_broker_dtls.patchValue(brokerData);
      //  console.log("brokerData: "+JSON.stringify(brokerData));

      this.addDocument()
      while (this.wm_unload_advice_docs.length)
        this.wm_unload_advice_docs.removeAt(0);
      this.wm_unload_advice_docs_list.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.wm_unload_advice_docs.patchValue(docData);

      for (let data2 of docData)
        this.addDocumentlist();
      this.wm_unload_advice_docs_list.patchValue(docData);

      //  console.log("Driver: "+  JSON.stringify(driverData));
      this.wm_unload_advice_driver_dtls.patchValue(driverData);
      this.wm_unload_advice_driver_dtls.patchValue({ driver_name: driverData["driver_name"] });
      if (driverData.driver_name == null) {
        //   console.log("Wrong");
        this.wm_unload_advice_driver_dtls.patchValue({ driver_name: '0' });
      }

      //console.log("Party: "+  JSON.stringify(partyData));
      this.wm_unload_advice_party_wm.patchValue(partyData);

      //  console.log("TermsCondition: "+  JSON.stringify(termsConditionData));
      this.wm_unload_advice_terms_con.patchValue(termsConditionData);
      this.transporterNames = translist;
      //  console.log("TransInfo: "+  JSON.stringify(transData));
      this.wm_unload_advice_trans_info.patchValue(transData);
      //  console.log(" tuhin here here   end 1 " +  this.showaddrow)
      if (UnloadingAdviceData["ref_type"] == "Purchase Order") {
        this.userForm.patchValue({ total_qty_copy: UnloadingAdviceData.total_qty.toFixed(3) });
        this.userForm.patchValue({ total_qty: UnloadingAdviceData.total_qty_copy });
        this.showstatus = "onShowStatus";
        this.FinalTotal_qty = UnloadingAdviceData.total_qty_copy;
        //alert("showstatus: "+ this.showstatus);
        //   console.log("vehicle2: "+  this.userForm.get("vehicle_id").value);
        //here need to change afterwards when there are multiple rows
        this.DropDownListService.getPurOrdCNQUPList(UnloadingAdviceData["pur_orderid"]).subscribe(data => {
          //console.log(JSON.stringify(data))
          if (UnloadingAdviceData["poitemnumber"] == "Yes") {
            this.totalmatwtvalue = data[0]["final_mat_wt"];
            //console.log(" total here  "+ this.totalmatwtvalue)
          }
          else {
            for (let i = 0; i < data.length; i++) {
              this.final_mat_wt.push(data[i]["final_mat_wt"]);

            }
          }


          this.status = true;
        });

        this.refNo = true;

      }
      else {
        this.userForm.patchValue({ total_qty_copy: UnloadingAdviceData.total_qty.toFixed(3) });
        this.userForm.patchValue({ total_qty: 0 });
        this.refNo = false;

      }

      if (UnloadingAdviceData["ref_type"] == "Sales Return") {
        this.showstatus = "onShowStatus";

      }
      //console.log("bidhan here:"+UnloadingAdviceData["ref_type"])
      if (UnloadingAdviceData["ref_type"] == "Stock Transfer") {
        this.refNo = false;
      }
      //  console.log(" tuhin here here   end " +  this.showaddrow)
      //console.log("refernceid" + this.userForm.get("referance_id").value)
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }
  }

  send() {
    // this.status=false;
    this.Id = this.userForm.get("id").value as FormControl;
    this.wm_unload_advice_driver_dtls.patchValue({ doc_type: this.selectedDocumentType })

    //console.log("here start ")

    this.userForm.patchValue({
      pur_orderid: this.orderNo, company_id: this.company_name,
      fin_year: localStorage.getItem("financial_year"), username: localStorage.getItem("username")
    });
    this.submitted = true;
    let salereturn: boolean = true;


    if (this.userForm.get("advice_type").value == "Sales Return") {
      salereturn = false;
    }

    let weighmentreqstat: boolean = false; let uomstat: boolean = false;
    if (this.userForm.get("we_req").value == true) {
      weighmentreqstat = true;
    }
    if (this.userForm.get("uom").value == "0") {
      uomstat = true;
    }
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {
      // this.status = false;
      //console.log("2nd here ")
      //changes on 14-04-2022
      this.itemstatus = [];
      this.packingstatus = [];
      this.packingqtystatus = [];
      this.itemqtystatus = [];
      this.brokerdetailstatus = [];


      if (this.userForm.get("business_unit").value == "0") {
        alert("Please Select Business Unit");
        this.status = true;
      }//
      else if (this.userForm.get("advice_type").value == "0") {
        alert("Please Select Advice Type");
        this.status = true;
      }
      else if (this.userForm.get("ref_type").value == "0") {
        alert("Please Select Referance Type");
        this.status = true;
      }
      else if (this.userForm.get("busi_partner").value == "0" && this.userForm.get("advice_type").value == 'Purchase Order') {
        alert("Please Select Business Partner For Supplier");
        this.status = true;
      }
      else if (this.userForm.get("customer").value == "0" && this.userForm.get("advice_type").value == 'Sales Return') {
        alert("Please Select Business Partner for Customer");
        this.status = true;
      }
      else if (this.userForm.get("item_type").value == "0" && this.userForm.get("advice_type").value == 'Purchase Order') {
        alert("Please Select Service / Item Type");
        this.status = true;
      }
      else if (this.userForm.get("item_subtype").value == "0" && this.userForm.get("advice_type").value == 'Purchase Order') {
        alert("Please Select Service / Item Sub Type");
        this.status = true;
      }
      /* else if(this.validTransport==true && (this.userForm.get("transporter_code").value == '' || this.userForm.get("transporter_code").value == null || this.userForm.get("transporter_code").value == 0))
      {
        alert("Please Select Transporter Name");
        this.status=true;
      } */
      else if (this.userForm.get("vehicle_id").value == "0") {
        alert("Please Select Vehicle No.");
        this.status = true;
      }
      /* else if(this.userForm.get("we_req").value==true)
       {
         if(this.userForm.get("uom").value == "0")
         {
               alert("Please Select UoM");
               this.status=true;
         }
       }*/

      else if (weighmentreqstat == true && uomstat == true) {

        alert("Please Select UoM");
        this.status = true;
      }
      // else if(this.wm_unload_advice_driver_dtls.get("driver_name").value == "0")
      // {
      //       alert("Please Select Driver Name in Driver Details Tab");
      //       this.status=true;
      // }
      else {
        console.log("tuhin here ");

        let checkstatus = false;
        let checkstatus1 = false;
        let checkstatus2 = false;
        let checkstatus3 = false;
        let checkstatus4 = false;

        for (let a = 0; a < this.wm_unload_advice_item_dtls.length; a++) {


          if (this.userForm.get("jobwork").value == false && (this.wm_unload_advice_item_dtls.at(a).get("item_code").value == "0")) {
            //alert("Please Select Item Name");this.status=true;
            //this.itemstatus=false;
            checkstatus = true;
          }
          if (this.userForm.get("jobwork").value == false && (this.wm_unload_advice_item_dtls.at(a).get("packing").value == "0")) {
            //alert("Please Select Packing Name");this.status=true;
            //this.packingstatus=false;
            checkstatus1 = true;
          }
          if (this.userForm.get("jobwork").value == false && (this.wm_unload_advice_item_dtls.at(a).get("s_qty").value == "0")) {
            // alert("Please Select Packing Quantity");this.status=true;
            //this.packingqtystatus=false;
            checkstatus2 = true;
          }
          if (this.userForm.get("jobwork").value == false && (this.wm_unload_advice_item_dtls.at(a).get("quantity").value == "0")) {
            // alert("Please Select Item Quantity");this.status=true;
            //   this.itemqtystatus=false;
            checkstatus3 = true;
          }
        }
        for (let b = 0; b < this.wm_unload_advice_broker_dtls.length; b++) {
          //  alert("check:"+this.userForm.get("ref_type").value+"/"+this.wm_unload_advice_broker_dtls.at(b).get("ven_code_name").value);
          if (this.userForm.get("ref_type").value == 'Purchase Order' && (this.wm_unload_advice_broker_dtls.at(b).get("ven_code_name").value == null || this.wm_unload_advice_broker_dtls.at(b).get("ven_code_name").value == 0)) {
            // alert("Please Select Broker Details in Broker Details Tab");this.status=true;
            //this.brokerdetailstatus=false;
            checkstatus4 = true;
          }

        }
        if (checkstatus == true) {
          alert("Please Select Item Name In Service/Item details Tab!!"); this.status = true;
        }
        else if (checkstatus1 == true) {
          alert("Please Select Packing Item In Service/Item details Tab!!"); this.status = true;
        }
        else if (checkstatus2 == true) {
          alert("Please Select Packing Quantity In Service/Item details Tab!!"); this.status = true;
        }
        else if (checkstatus3 == true) {
          alert("Please Select Item Quantity In Service/Item details Tab!!"); this.status = true;
        }

        else if ((this.wm_unload_advice_party_wm.get("gross_wt").value == 0 || this.wm_unload_advice_party_wm.get("gross_wt").value == "0") && salereturn == true) {
          alert("Please Select Gross Weight in Party Weighment Tab"); this.status = true;
        }

        else if ((this.wm_unload_advice_party_wm.get("tare_wt").value == 0 || this.wm_unload_advice_party_wm.get("tare_wt").value == "0") && salereturn == true) {
          alert("Please Select Tare Weight in Party Weighment Tab"); this.status = true;
        }

        else if (this.wm_unload_advice_driver_dtls.get("driver_name").value == 0 || this.wm_unload_advice_driver_dtls.get("driver_name").value == "0") {
          alert("Please Select Driver Name in Driver Details Tab"); this.status = true;
        }
        // else if(checkstatus4 == true)
        // {
        //   alert("Please Select Broker Name in Broker Details Tab");this.status=true;
        // }
        // if(this.itemstatus.includes("false") || this.packingstatus.includes("false") || this.packingqtystatus.includes("false") || this.itemqtystatus.includes("false") || this.brokerdetailstatus.includes("false"))
        // {
        //   this.status=true;
        // }
        else {
          let totalvalue: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            totalvalue += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);

          }
          let compareqty: number = 0
          if (this.userForm.get("ref_type").value == "Open Advice") {

            compareqty = this.userForm.get("total_qty_copy").value;
          }
          else//openad
          {
            compareqty = this.userForm.get("total_qty").value;
          }
          if (this.userForm.get("advice_type").value == "Sales Return") {
            //  compareqty=this.userForm.get("total_qty_copy").value;   
            compareqty = totalvalue;  //changes on 1803 for sales return not update 
            // console.log("sales return::"+compareqty)
          }

          if (this.userForm.get("advice_type").value == "Stock Transfer") {

            compareqty = this.userForm.get("total_qty_copy").value;
          }

          console.log(compareqty + " / " + totalvalue);
          if (Number(totalvalue) < Number(compareqty) || Number(totalvalue) === Number(compareqty)) {

            if (this.Id > 0) {
              if (this.userForm.get("advice_type").value == "Sales Return") {

                this.userForm.patchValue({ total_qty_copy: 0, total_qty: compareqty })
              }
              /*   
                  //doc starts
                  this.userForm.removeControl('wm_unload_advice_docs_list');
                  const InputData = this.userForm.getRawValue(); 
                  console.log("input: "+JSON.stringify(InputData));
                  const frmData = new FormData();
                  console.log(" length "+this.myFiles.length);
                  for (let i = 0; i < this.myFiles.length; i++) {  
                   
                    frmData.append("files", this.myFiles[i]);   
                    console.log();
                   if (i == 0) {  
                    console.log(i+",files: "+this.myFiles[i])
                   }  
                 }  
                 frmData.append("Input", JSON.stringify(InputData));
                  //docs ends
*/
              this.status = false;
              //this.Service.updateUnloadAdvice(frmData).subscribe(data => 
              this.Service.updateUnloadAdvice(this.userForm.getRawValue(), this.Id).subscribe(data => {
                this.status = true;
                console.log("Unload advice: " + this.userForm.value)
                alert("UnLoading Advice Updated successfully.");
                this.userForm.reset();
                this.ngOnInit();
                //Refresh Dynemic Table
                this.packingItem = [];
                this.item_sl_no = 0;
                while (this.wm_unload_advice_item_dtls.length)
                  this.wm_unload_advice_item_dtls.removeAt(0);
                this.addItem();

                this.broker_sl_no = 0;
                while (this.wm_unload_advice_broker_dtls.length)
                  this.wm_unload_advice_broker_dtls.removeAt(0);
                this.addBroker();

                while (this.wm_unload_advice_docs.length - 1)
                  this.wm_unload_advice_docs.removeAt(0);
                this.status = true;
              }, (error) => {
                this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                this.ngOnInit()
              });

            }
            else {
              let reftype = this.userForm.get("ref_type").value
              let purid = this.userForm.get("referance_id").value;
              // let unloadid = this.userForm.get("unadviceid").value
              console.log(" check here  " + purid)

              const InputData = this.userForm.getRawValue();
              console.log("input: " + JSON.stringify(InputData));
              const frmData = new FormData();
              console.log(" length " + this.myFiles.length);
              for (let i = 0; i < this.myFiles.length; i++) {

                frmData.append("files", this.myFiles[i]);
                console.log();
                if (i == 0) {
                  console.log(i + ",files: " + this.myFiles[i])
                }
              }
              frmData.append("Input", JSON.stringify(InputData));

              this.status = false;

              this.Service.createUnloadAdvice(frmData)
                .subscribe(data => {
                  this.status = true;
                  if (reftype == 'Purchase Order') {
                    this.DropDownListService.getUnload_advice_updation(purid, reftype)
                      .subscribe(dataewe => {
                        this.status = true;
                        // console.log("Unload advice1111: "+JSON.stringify(purid+reftype))
                      }, (error) => {
                        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                        this.ngOnInit()
                      });
                  }
                  if (reftype == 'Open Advice') {
                    this.status = true;
                  }

                  console.log("Unload advice: " + JSON.stringify(data))

                  // console.log("hello" + JSON.stringify(vehicleData))


                  alert("New UnLoading Advice created successfully.");
                  this.userForm.reset();

                  //Refresh Dynemic Table
                  this.packingItem = [];
                  this.item_sl_no = 0;
                  while (this.wm_unload_advice_item_dtls.length)
                    this.wm_unload_advice_item_dtls.removeAt(0);
                  this.addItem();

                  this.broker_sl_no = 0;
                  while (this.wm_unload_advice_broker_dtls.length)
                    this.wm_unload_advice_broker_dtls.removeAt(0);
                  this.addBroker();

                  while (this.wm_unload_advice_docs.length - 1)
                    this.wm_unload_advice_docs.removeAt(0);

                  this.ngOnInit();
                  this.status = true;

                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                  this.ngOnInit()
                });

            }
          }
          else {
            alert("Total Unload advice Quantity exceed Purchase Order Total quantity ");
            this.wm_unload_advice_item_dtls.at(this.wm_unload_advice_item_dtls.length - 1).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0', toleranceqty: '0' })
            this.status = true;
          }
        }
      }













      //changes ends on 14-04-2022




    }
  }





  printdriverdetails(e) {
    // alert(e.get("driver_name").value + " / " + e.get("phone").value)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { index: 0, };
    let dialogref;

    let driver_name = e.get("driver_name").value;
    let phoneno = e.get("phone").value;
    let address = e.get("address").value;

    let doc_type = e.get("doc_type").value;
    let doc_no = e.get("doc_no").value;
    let description = e.get("description").value;
    let imageURL = this.view_image;



    dialogref = this.dialog.open(DriverprintpopupComponent, {
      data: { drivername: driver_name, phoneno: phoneno, address: address, doc_type: doc_type, doc_no: doc_no, description: description, imageURL: imageURL }, height: '40%',
      width: '60%'
    });
    dialogref.afterClosed().subscribe(data => {




    });


  }



  onDelete(id: any) {
    this.status = false;
    if (confirm("Are you sure to delete this Unload Advice ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deleteUnloadAdvice(this.userForm.getRawValue(), id).subscribe(data => {
        console.log("Cat id:" + data.order_id);

        if (data.unadviceid == '' || data.unadviceid == null) {
          alert("Opps!!! Can't delete this Unload Advice !!!");
        } else {
          alert("Unload Advice Deleted successfully.");
        }
        this.status = true;
        this.ngOnInit()
      });
    }
    this.status = true;
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

  viewpdf(i, tm) {

    var values = tm[i].controls.doc_pdf.value
    this.file_name = values.substring(23, tm[i].controls.doc_pdf.length);
    // alert(this.file_name);
    this.DropDownListService.downloadFileSystem(this.file_name).subscribe(response => {

      console.log("backend data" + response);
      var binaryData = [];
      binaryData.push(response.data);
      var url = window.URL.createObjectURL(new Blob(binaryData, { type: "application/*" }));
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

    }, error => {

      console.log(error);
    });

  }

  deletepdfwithid(dataid, i) {
    console.log("dataid " + JSON.stringify(dataid));//here getting id now procede delte process
    //  alert(JSON.stringify(dataid.id));
    this.Service.getdeletefileSystem(dataid).subscribe(data => {

      alert("Pdf Has Been Deleted successfully.");
      //alert(" i " + i);
      //this.process_master_doc_list.removeAt(i);
      this.deleteDocumentlist(i);

      // this.loaddocumentlist(this.process_id.value)
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }
  deletepdf(i, tm) {
    var values = tm[i].controls.doc_pdf.value
    this.file_name = values.substring(23, tm[i].controls.doc_pdf.length);
    this.DropDownListService.getdocumentListwithfile(this.file_name)
      .subscribe(data => {

        //console.log("data " +JSON.stringify(data));
        this.deletepdfwithid(data[0].id, i);

        this.status = true;
      }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); });


    // alert(JSON.stringify(this.process_no.value)); 
  }

  //   getProducts(request) {
  //     // console.log("tuhin req "+request.size);
  //      this.DropDownListService.getUnloadAdvicePagination(request.page,request.size)
  //      .subscribe(data => {
  //          this.listUnloadAdvice = data['content'];
  //          this.totalElements = data['totalElements'];
  //      }
  //      , error => {
  //          console.log(error.error.message);
  //      }
  //      );
  //  }
  // //  nextPage(event: PageEvent) {
  // //    const request = {};
  // //    request['page'] = event.pageIndex.toString();
  // //    request['size'] = event.pageSize.toString();
  // //    this.getProducts(request);
  // // }

  search() {
    let order1_no = this.userForm1.get("order1_no").value;
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let bus_partner1 = this.userForm1.get("busi_partner1").value;
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchUnloadAdvice("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&bus_partner1=" + bus_partner1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listUnloadAdvice = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Unload Advice Not Found !!!")
      this.listUnloadAdvice = [];
    })
  }

  getPackingQtysingleitem(packing_qty, index) {
    // let itemQty = this.capacity[index] * packing_qty.target.value;

    let itemQty: any;

    let alluom: any = [];
    alluom = JSON.parse(localStorage.getItem("ALLUOM"));

    //vineet Starts
    if (this.wm_unload_advice_item_dtls.at(index).get("uom").value == "PCS") {
      itemQty = Math.round(this.capacity[index] * packing_qty.target.value);
    }
    else {
      alluom.forEach(element => {
        if (element.description == this.wm_unload_advice_item_dtls.at(index).get("uom").value) {
          itemQty = Number(this.capacity[index] * packing_qty.target.value).toFixed(Number(element.decimalv));

        }
      });

    }
    //this.wm_unload_advice_item_dtls.at(index).patchValue({toleranceqty: itemQty});

    console.log(itemQty + " / " + this.capacity[index] + " / " + packing_qty.target.value);
    this.wm_unload_advice_item_dtls.at(index).patchValue({ quantity: itemQty, toleranceqty: itemQty });

    //vineet ends
    //alert(this.empty_bag_wt_priceBasedOn[index]);
    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
      this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (Number((itemQty - (this.empty_bag_wt[index] * packing_qty.target.value)))).toFixed(3) });
      //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (Math.round((itemQty - (this.empty_bag_wt[index] * packing_qty.target.value))*1000)/1000).toFixed(3)});
      console.log("Mat Qt: " + (itemQty - (this.empty_bag_wt[index] * packing_qty.target.value)));

    }
    else {
      this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: ((Number((itemQty - (itemQty * this.empty_bag_wt[index]) / 100)))).toFixed(3) });
      //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (Math.round((itemQty - (this.empty_bag_wt[index] * packing_qty.target.value))*1000)/1000).toFixed(3)});
    }
    console.log(itemQty + " / " + this.empty_bag_wt[index] + " / " + packing_qty.target.value + " / " + Number(this.empty_bag_wt[index] * packing_qty.target.value) + " // " + this.capacity[index]);

    console.log(" vineet " + this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value);

    if (this.showstatus == "onShowStatus") {
      let Newmat_wt: number = 0, total_itemqty: number = 0;
      for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
        Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
        total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
      }

      if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt)//check
      {

        let minqty: number = (Number(itemQty) * ((100 - Number(this.tolerance[index])) / 100));
        let itemqty: boolean = false;
        itemqty = Number(this.FinalTotal_qty) >= minqty;//281 //0

        if (itemqty) {
          let compareqty: boolean = false;
          if (this.userForm.get("id").value > 0) {
            compareqty = true;
          }
          else {
            if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
            {
              compareqty = true;
            }
            else//check
            {
              // let maxqty_item:number=(Number(this.final_mat_wt[index]) * ((100+Number(this.tolerance[index]))/100));
              let maxqty_item: number = (Number(this.totalmatwtvalue) * ((100 + Number(this.tolerance[index])) / 100));
              let itemqty_item: boolean = false;
              itemqty_item = Number(Newmat_wt) <= maxqty_item;
              if (itemqty_item) {
                compareqty = true;
              }
              else {
                compareqty = Math.round(Number(this.totalmatwtvalue)) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
              }
            }
          }

          if (compareqty == false) {
            alert("Material Weight exceeded in respect with purchase order :: " + this.totalmatwtvalue);
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
          }
          else {
            let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
            if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
            {
              this.userForm.patchValue({ total_qty: '0' });
              this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });

            }
            else {
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
              this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
            }

          }

        }
        else {
          alert("Exceed Purchase Order Total Quantity");
          this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
          this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
        }



      }
      else {
        let minqty: number = (Number(itemQty) * ((100 - Number(this.tolerance[index])) / 100));
        let itemqty: boolean = false;
        itemqty = Number(this.FinalTotal_qty) >= minqty;//281 //0
        if (itemqty) {
          let compareqty: boolean = false;
          if (this.userForm.get("id").value > 0) {
            compareqty = true;
          }
          else {
            if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
            {
              compareqty = true;
            }
            else//check
            {
              let maxqty_item: number = (Number(this.totalmatwtvalue) * ((100 + Number(this.tolerance[index])) / 100));
              let itemqty_item: boolean = false;
              itemqty_item = Number(Newmat_wt) <= maxqty_item;
              if (itemqty_item) {
                compareqty = true;
              }
              else {
                console.log(this.totalmatwtvalue + " here check avijit sir" + this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value)
                compareqty = Math.round(Number(this.totalmatwtvalue)) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
              }
            }

          }

          if (compareqty == false) {
            alert("Material Weight exceeded in respect with purchase order :: " + this.totalmatwtvalue);
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
          }
          else {

            let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
            if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
            {
              this.userForm.patchValue({ total_qty: '0' });
              this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });

            }
            else {
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
              this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
            }

          }

        }
        else {
          alert("Exceed Purchase Order Total Quantity");
          this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
          this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
        }


      }

    }

    if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
    {
      let Newmat_wt: number = 0;
      for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
        Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
      }
      this.userForm.patchValue({ total_qty: 0 });
      this.userForm.patchValue({ total_qty_copy: Newmat_wt.toFixed(3) }); //changes on 07-05-2022
    }
  }

  getItemQtysingle(item_qty, index) {

    this.packingQty = this.wm_unload_advice_item_dtls.at(index).get("s_qty").value as FormControl;
    let itemQty = item_qty.target.value;

    let itemstatus: boolean = true, itemstatusmin: boolean = true;
    if (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value == "0" || this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value == 0)//first time item qty
    {
      if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
        this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (Number((itemQty - (this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value))))).toFixed(3) });
        //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
      }
      else {
        this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: ((Number((itemQty - (itemQty * this.empty_bag_wt[index]) / 100)))).toFixed(3) });
        //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
      }
      console.log("if")
      if (this.showstatus == "onShowStatus") {
        let Newmat_wt: number = 0, total_itemqty: number = 0;
        for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
          Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
          total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
        }

        if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt) {
          let compareqty: boolean = false;
          if (this.userForm.get("id").value > 0) {
            compareqty = true;
          }
          else {
            compareqty = Math.round(Number(this.totalmatwtvalue)) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
          }

          if (compareqty == false) {
            alert("Material Weight exceeded in respect with purchase order :: " + this.totalmatwtvalue);
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
          }
          else {

            let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
            if (this.userForm.get("advice_type").value == 'Stock Transfer') {
              this.userForm.patchValue({ total_qty: '0' });
              this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
            }
            else {
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
              this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
            }

          }
        }
        else {
          alert("Exceed Purchase Order Total Quantity");
          this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
          this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
        }

      }

      if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
      {
        let Newmat_wt: number = 0;
        for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
          Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
        }
        this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
      }

      if (this.userForm.get("ref_type").value == "Stock Transfer")//for Stock Transfer 
      {
        let Newmat_wt: number = 0;
        for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
          Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
        }
        this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
      }
    }
    else {
      console.log("else")
      let minqty: number = (Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value) * ((100 - Number(this.tolerance[index])) / 100));
      let maxqty: number = (Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value) * ((100 + Number(this.tolerance[index])) / 100));
      itemstatusmin = Number(itemQty) >= minqty;
      itemstatus = Number(itemQty) <= maxqty;

      if (itemstatus == true && itemstatusmin == true) {
        if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
          this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (Number((itemQty - (this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value))))).toFixed(3) });
          //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
        }
        else {
          this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: ((Number((itemQty - (itemQty * this.empty_bag_wt[index]) / 100)))).toFixed(3) });
          //this.wm_unload_advice_item_dtls.at(index).patchValue({mat_wt: (itemQty - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value)*1000)/1000).toFixed(3)});
        }
        console.log(" here " + this.showstatus)
        if (this.showstatus == "onShowStatus") {
          let Newmat_wt: number = 0, total_itemqty: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
            total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
          }
          console.log(" id :: " + this.userForm.get("id").value + " / " + this.FinalTotal_qty + " / " + Newmat_wt)
          if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt) {
            let compareqty: boolean = false;
            if (this.userForm.get("id").value > 0) {
              compareqty = true;
              console.log(" item update " + this.userForm.get("id").value)
            }
            else {
              if (this.userForm.get("advice_type").value == 'Stock Transfer') {
                compareqty = true;
              }
              else {
                compareqty = Math.round(Number(this.totalmatwtvalue)) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
              }
            }

            if (compareqty == false) {
              alert("Material Weight exceeded in respect with purchase order :: " + this.totalmatwtvalue);
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0' });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
            else {
              let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
              if (this.userForm.get("advice_type").value == 'Stock Transfer') {
                this.userForm.patchValue({ total_qty: '0' });
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }
              else {
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                this.userForm.patchValue({ total_qty_copy: total_itemqty.toFixed(3) });
              }


            }
          }
          else {
            alert("Exceed Purchase Order Total Quantity");
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0 });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });

          }

        }
        if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
        {
          let Newmat_wt: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
          }
          this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
        }

        if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
        {
          let Newmat_wt: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
          }
          this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
        }
      }
      else {
        alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) + " to " + maxqty.toFixed(3));
        this.wm_unload_advice_item_dtls.at(index).patchValue({ quantity: Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value).toFixed(2) });

        if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
          this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value - Math.round(this.empty_bag_wt[index] * (this.wm_unload_advice_item_dtls.at(index).get("s_qty").value) * 1000) / 1000).toFixed(3) });
        }
        else {
          this.wm_unload_advice_item_dtls.at(index).patchValue({ mat_wt: Number(this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value - (this.wm_unload_advice_item_dtls.at(index).get("toleranceqty").value * this.empty_bag_wt[index]) / 100).toFixed(3) });
        }
        console.log(" anotherdiv" + this.showstatus)
        if (this.showstatus == "onShowStatus") {
          let Newmat_wt: number = 0, total_itemqty: number = 0, toleranceqty: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("mat_wt").value);
            total_itemqty += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            toleranceqty += Number(this.wm_unload_advice_item_dtls.at(v).get("toleranceqty").value);
          }
          console.log(" anotherdiv sum " + this.FinalTotal_qty + " / " + Newmat_wt)
          if (Number(this.FinalTotal_qty) > Newmat_wt || Number(this.FinalTotal_qty) == Newmat_wt) {
            let compareqty: boolean = false;
            if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
            {
              compareqty = true;
            }
            else {
              compareqty = Math.round(Number(this.totalmatwtvalue)) >= Math.round(Number(this.wm_unload_advice_item_dtls.at(index).get("mat_wt").value));
            }

            if (compareqty == false) {
              alert("Material Weight exceeded in respect with purchase order :: " + this.totalmatwtvalue);
              this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: '0', quantity: '0', mat_wt: '0', toleranceqty: '0' });
              this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
            }
            else {
              let finaltotalqty = Number(this.FinalTotal_qty) - Newmat_wt;
              if (this.userForm.get("ref_type").value == "Stock Transfer")//for stock transfer
              {
                this.userForm.patchValue({ total_qty: '0' });
                this.userForm.patchValue({ total_qty_copy: toleranceqty.toFixed(3) });
              }
              else {
                this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
                this.userForm.patchValue({ total_qty_copy: toleranceqty.toFixed(3) });
              }
            }
          }
          else {
            alert("Exceed Purchase Order Total Quantity");
            this.wm_unload_advice_item_dtls.at(index).patchValue({ s_qty: 0, mat_wt: 0, quantity: 0, toleranceqty: 0 });
            this.userForm.patchValue({ total_qty: this.FinalTotal_qty });
          }
        }
        if (this.userForm.get("ref_type").value == "Open Advice")//for openadvice 
        {
          let Newmat_wt: number = 0, toleranceqty: number = 0;
          for (let v = 0; v < this.wm_unload_advice_item_dtls.length; v++) {
            Newmat_wt += Number(this.wm_unload_advice_item_dtls.at(v).get("quantity").value);
            toleranceqty += Number(this.wm_unload_advice_item_dtls.at(v).get("toleranceqty").value);
          }
          this.userForm.patchValue({ total_qty: 0, total_qty_copy: Newmat_wt.toFixed(3) });
        }
      }
    }
  }

  looseitemshow(event) {
    if (event.checked == false) {
      this.jobworklooseitem = true;
      //console.log("no loose"+this.jobworklooseitem)
    }
    else {
      // if( this.userForm.get("item_subtype").value=="ITMT00009")
      if (this.userForm.get("jobwork").value == true) {
        this.jobworklooseitem = false;
        //console.log("job"+this.jobworklooseitem)
      }
      else {
        this.jobworklooseitem = true;
        //console.log("loose"+this.jobworklooseitem)
      }
    }
  }



  jobworkshow(event) {
    if (event.checked == false) {

      this.jobtransaction = false;
      if (this.userForm.get("looseitem").value == true) {
        this.jobworklooseitem = false;
      }
      else {
        this.jobworklooseitem = true;
      }
    }
    else {
      this.jobtransaction = true;
      if (this.userForm.get("looseitem").value == true) {
        this.jobworklooseitem = false;
      }
      else {
        this.jobworklooseitem = true;
      }
    }

  }


  addJobItem() {
    this.job_sl_no = this.job_sl_no + 1;
    this.wm_unload_advice_item_dtls_for_jobwork.push(this.fb.group({
      sl_no: this.job_sl_no,
      job_item: '',
      job_packing: '',
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

  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

}
