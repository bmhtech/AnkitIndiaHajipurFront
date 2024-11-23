import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PurchaseBill } from '../../../../../../Models/transaction/PurchaseTransaction/purchase-bill';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { TaxPopUpModalComponent } from '../tax-pop-up-modal/tax-pop-up-modal.component';
import { forkJoin, timer } from 'rxjs';
import { GrnPopUpComponent } from '../../components/grn-pop-up/grn-pop-up.component';
import { MatDialog, PageEvent } from '@angular/material';
import { MatDialogConfig } from '@angular/material/dialog';
import { PurBillAccountpostingComponent } from '../pur-bill-accountposting/pur-bill-accountposting.component';
import { Console } from 'console';
import { element } from 'protractor';

@Component({
  selector: 'app-purchase-bill',
  templateUrl: './purchase-bill.component.html',
  styleUrls: ['./purchase-bill.component.scss']
})

export class PurchaseBillComponent implements OnInit {
  status: any;
  model: PurchaseBill = new PurchaseBill();
  isHidden: any;
  listPurchaseBill: any = [];
  item_codes: {};
  supplier_id = "0";
  supplierNames: any = [];
  vehicleList: any = [];
  PurBillId: any;
  submitted = false;
  seq_no: string;
  currentDate: any;
  payModes: any = [];
  itemId: any;
  capacity: any = [];
  chargesIdList: any = [];

  show_Row = false;
  company_name: any;
  warehouses: {};
  ledgerNames: any = [];
  empty_bag_wt: any = [];
  charges_details: any = [];
  empty_bag_wt_priceBasedOn: any = [];
  item_sl_no = 1;
  employeeNames: any = [];
  brokerNameList: any = [];
  puSubTypeList: any = [];
  itemtypes: any = [];
  item_types: {};
  broker_sl_no = 1;
  public userForm: FormGroup;
  srvItemType: any;
  srvItemSubType: any;
  totalItem: number;
  totalDiscount: number;
  totalNetAmt: number;
  totalTaxAmt: number;
  totalQcDeduction: number;
  totalNetAmtAfterDeduction: number;
  totalGrossAmt: number;
  defaultValue: number;
  defaultValue1: number;
  defaultValue2: number;
  defaultValue3: number;
  defaultValue4: number;
  add: number;
  sub: number;
  otherCharges: number;
  alreadyPaid: number;
  action: any;
  pusubtype: any;
  purchasebillsave: boolean = true;
  purchasebillupdate: boolean = true;
  purchasebillview: boolean = true;
  purchasebillprint: boolean = true;
  purchasebilldelete: boolean = true;
  purchase_type_new: any;
  purchase_subtype_new: any;
  created_by_new: any;
  truck_no_new: any;
  upfrontbrokeragenew: any;
  claim1new: any;
  claim2new: any;
  itemname: boolean = true;
  claimClickShow: boolean = false;
  totalElements: number = 0;
  public userForm1: FormGroup;
  itemGroups: any = [];
  requiredmatrixdisable: any = [];
  totaltds_span: boolean = false;
  storepurchase: boolean = false;
  storeChargesList: any = [];


  constructor(public fb: FormBuilder, private Service: Master, public dialog: MatDialog,
    private DropDownListService: DropdownServiceService,) {
    this.userForm = fb.group(
      {
        id: [''],
        referance_id: [''],
        pur_bill_id: [''],
        pur_bill_no: [''],
        bill_date: [''],
        supplier_name: [''],
        item_type: [''],
        ser_item_subtype: [''],
        purchase_type: [''],
        purchase_subtype: [''],
        created_by: [''],
        truck_no: [''],
        remarks: [''],
        company_id: [''],
        fin_year: [''],
        item_total: [''],
        item_total_gl_ac: [''],
        discount: [''],
        discount_gl_ac: [''],
        qc_deduction: [''],
        qc_deduction_gl_ac: [''],
        state: [''],
        //new added 3 fields
        upfrontbrokerage: [''],
        upfrontbrokerage_gl_ac: [''],
        claim1: [''],
        claim1_gl_ac: [''],
        claim2: [''],
        claim2_gl_ac: [''],
        //new added ends
        net_amt: [''],
        net_amt_gl_ac: [''],
        amt_after_deduction: [''],
        amt_after_deduction_gl_ac: [''],
        add_tax: [''],
        add_tax_gl_ac: [''],
        post_tax_amt: [''],
        post_tax_amt_gl_ac: [''],
        other_charges: [''],
        other_charges_gl_ac: [''],
        payable_amt: [''],
        payable_amt_gl_ac: [''],
        add1: [''],
        add1_gl_ac: [''],
        add2: [''],
        add2_gl_ac: [''],
        roundoff_amt: [''],
        roundoff_gl_ac: [''],
        payable_party: [''],
        payable_party_gl_ac: [''],
        already_paid: [''],
        already_paid_gl_ac: [''],
        net_payable_party: [''],
        net_payable_party_gl_ac: [''],
        username: [''],
        payment_date: [''],
        business_unit: [''],
        app_chgs_id: [''],
        tot_amt: [''],
        add1_remarks: [''],
        add2_remarks: [''],
        referance_type: [''],
        supp_ref_doc: [''],
        supp_ref_docno: [''],
        supp_ref_doc_date: [''],
        store_charges: [''],
        store_taxamt: [''],
        allstorecharges: [''],
        store_frieghtcharges: [''],
        store_frieghtcharges_gl_ac: [''],

        pur_Bill_Item_Details: this.fb.array([this.fb.group(
          {
            slno: this.item_sl_no,
            adv_item_code: '',
            item_group: '',
            adv_packing_item: '',
            classified_item_name: '',
            hsn_code: '',
            passed_packing_qty: '',
            passed_packing_uom: '',
            passed_item_qty: '',
            passed_mat_weight: '',
            passed_item_uom: '',
            unit_rate: '',
            price_based_on: '',
            amount: '',
            discount: '',
            discount_basedon: '',
            discount_amount: '',
            net_amount: '',
            qc_deduction: '',
            net_amt_after_qc: '',
            tax_code: '',
            tax_name: '',
            tax_rate: '',
            cgstamt: '',
            sgstamt: '',
            igstamt: '',
            tax_amt: '',
            gross_amt: '',
            gl_acc: '',
            warehouse: '',
            stack: ''
          })]),

        pur_Bill_Broker_Details: this.fb.array([this.fb.group(
          {
            sl_no: this.broker_sl_no,
            broker_name: '',
            broker_code: '',
            brokerage_amt: '',
            broker_other_info: '',
            up_brokerage_amt: '',
            total_brokerage: ''
          })]),

        pur_Bill_Docs: this.fb.array([this.fb.group({
          doc_name: ''
        })]),


        purchase_item_groupwise_summ: this.fb.array([this.fb.group({
          item_group: '',
          item_total: '',
          discount_amt: '',
          item_ledger: '',
          discount_ledger: ''
        })]),

        purchase_item_groupwise_hsnsumm: this.fb.array([this.fb.group({
          hsn_code: '',
          amount: '',
        })]),

        purchase_item_groupwise_taxsumm: this.fb.array([this.fb.group({
          tax_code: '',
          tax_rate: '',
          tax_amt: '',
          percentage: '',
          cgst: '',
          sgst: '',
          igst: '',
          cgstledgerid: '',
          sgstledgerid: '',
          igstledgerid: '',
          taxable_amt: ''
        })]),

        pur_Bill_Musterroll_Details: this.fb.array([this.fb.group({
          muster_roll_name: ''
        })]),

        pur_Bill_Tax_Info: this.fb.group(
          {
            pan: '',
            gst: '',
            cin: '',
            tan: ''
          }),

        pur_Bill_Bp_Details: this.fb.group(
          {
            supp_name: '',
            supp_phone: '',
            supp_fax: '',
            supp_email: '',
            supp_address: '',
            cp_name: '',
            cp_phone: '',
            cp_fax: '',
            cp_email: '',
            cp_address: '',
            cp_designation: ''
          }),

        pur_Bill_Account_Info: this.fb.group(
          {
            mode_of_pay: '',
            payment_date: '',
            pay_term: '',
            credit_lim: '',
            bankname: '',
            accountholder: '',
            acc_no: '',
            ifsc: '',
            mobile: '',
            iban: '',
            bic_swift_code: '',
            branch: ''
          }),

        pur_Bill_app_chgs: this.fb.array([this.fb.group({
          charges_name: '',
          add_less: '',
          rate_cal_method: '',
          app_rate: '',
          tax_rate: '0',
          amount: '0',
          required: ''
        })]),

        pur_bill_store_chgs: this.fb.array([this.fb.group({
          charges_name: '',
          charges_acc: '',
          store_cgst: '',
          store_sgst: '',
          store_igst: '',
          store_amount: '',
          store_taxrate: ''
        })]),




      });
    this.userForm1 = fb.group(
      {
        order1_no: [''],
        fromdate: [''],
        todate: [''],
        supplier_name1: [''],
        pur_type1: ['']
      });
  }
  get order1_no() { return this.userForm1.get("order1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get supplier_name1() { return this.userForm1.get("supplier_name1") as FormControl }
  get pur_type1() { return this.userForm1.get("pur_type1") as FormControl }

  get store_frieghtcharges_gl_ac() { return this.userForm.get("store_frieghtcharges_gl_ac") as FormControl }
  get store_frieghtcharges() { return this.userForm.get("store_frieghtcharges") as FormControl }
  get allstorecharges() { return this.userForm.get("allstorecharges") as FormControl }
  get store_taxamt() { return this.userForm.get("store_taxamt") as FormControl }
  get store_charges() { return this.userForm.get("store_charges") as FormControl }
  get state() { return this.userForm.get("state") as FormControl }
  get id() { return this.userForm.get("id") as FormControl }
  get referance_type() { return this.userForm.get("referance_type") as FormControl }
  get pur_bill_id() { return this.userForm.get("pur_bill_id") as FormControl }
  get pur_bill_no() { return this.userForm.get("pur_bill_no") as FormControl }
  get bill_date() { return this.userForm.get("bill_date") as FormControl }
  get supplier_name() { return this.userForm.get("supplier_name") as FormControl }
  get item_type() { return this.userForm.get("ser_item_type") as FormControl }
  get purchase_type() { return this.userForm.get("purchase_type") as FormControl }
  get purchase_subtype() { return this.userForm.get("purchase_subtype") as FormControl }
  get business_unit() { return this.userForm.get("business_unit") as FormControl }
  get payment_date() { return this.userForm.get("payment_date") as FormControl }
  get created_by() { return this.userForm.get("created_by") as FormControl }
  get truck_no() { return this.userForm.get("truck_no") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get item_total() { return this.userForm.get("item_total") as FormControl }
  get item_total_gl_ac() { return this.userForm.get("item_total_gl_ac") as FormControl }
  get discount() { return this.userForm.get("discount") as FormControl }
  get discount_gl_ac() { return this.userForm.get("discount_gl_ac") as FormControl }
  get qc_deduction() { return this.userForm.get("qc_deduction") as FormControl }
  get qc_deduction_gl_ac() { return this.userForm.get("qc_deduction_gl_ac") as FormControl }
  get net_amt() { return this.userForm.get("net_amt") as FormControl }
  get net_amt_gl_ac() { return this.userForm.get("net_amt_gl_ac") as FormControl }
  get amt_after_deduction() { return this.userForm.get("amt_after_deduction") as FormControl }
  get amt_after_deduction_gl_ac() { return this.userForm.get("amt_after_deduction_gl_ac") as FormControl }
  get add_tax() { return this.userForm.get("add_tax") as FormControl }
  get add_tax_gl_ac() { return this.userForm.get("add_tax_gl_ac") as FormControl }
  get post_tax_amt() { return this.userForm.get("post_tax_amt") as FormControl }
  get post_tax_amt_gl_ac() { return this.userForm.get("post_tax_amt_gl_ac") as FormControl }
  get other_charges() { return this.userForm.get("other_charges") as FormControl }
  get other_charges_gl_ac() { return this.userForm.get("other_charges_gl_ac") as FormControl }
  get payable_amt() { return this.userForm.get("payable_amt") as FormControl }
  get payable_amt_gl_ac() { return this.userForm.get("payable_amt_gl_ac") as FormControl }
  get add1() { return this.userForm.get("add1") as FormControl }
  get add1_gl_ac() { return this.userForm.get("add1_gl_ac") as FormControl }
  get add2() { return this.userForm.get("add2") as FormControl }
  get add2_gl_ac() { return this.userForm.get("add2_gl_ac") as FormControl }
  get roundoff_amt() { return this.userForm.get("roundoff_amt") as FormControl }
  get roundoff_gl_ac() { return this.userForm.get("roundoff_gl_ac") as FormControl }
  get payable_party() { return this.userForm.get("payable_party") as FormControl }
  get payable_party_gl_ac() { return this.userForm.get("payable_party_gl_ac") as FormControl }
  get already_paid() { return this.userForm.get("already_paid") as FormControl }
  get already_paid_gl_ac() { return this.userForm.get("already_paid_gl_ac") as FormControl }
  get net_payable_party() { return this.userForm.get("net_payable_party") as FormControl }
  get net_payable_party_gl_ac() { return this.userForm.get("net_payable_party_gl_ac") as FormControl }
  get pur_Bill_Item_Details() { return this.userForm.get('pur_Bill_Item_Details') as FormArray; }
  get pur_Bill_Account_Info() { return this.userForm.get('pur_Bill_Account_Info') as FormGroup; }
  get pur_Bill_Bp_Details() { return this.userForm.get('pur_Bill_Bp_Details') as FormGroup; }
  get pur_Bill_Tax_Info() { return this.userForm.get('pur_Bill_Tax_Info') as FormGroup; }
  get pur_Bill_Musterroll_Details() { return this.userForm.get('pur_Bill_Musterroll_Details') as FormArray; }
  get pur_Bill_Docs() { return this.userForm.get('pur_Bill_Docs') as FormArray; }
  get pur_Bill_Broker_Details() { return this.userForm.get('pur_Bill_Broker_Details') as FormArray; }
  get upfrontbrokerage() { return this.userForm.get("upfrontbrokerage") as FormControl }
  get upfrontbrokerage_gl_ac() { return this.userForm.get("upfrontbrokerage_gl_ac") as FormControl }
  get claim1() { return this.userForm.get("claim1") as FormControl }
  get claim1_gl_ac() { return this.userForm.get("claim1_gl_ac") as FormControl }
  get claim2() { return this.userForm.get("claim2") as FormControl }
  get claim2_gl_ac() { return this.userForm.get("claim2_gl_ac") as FormControl }

  get pur_Bill_app_chgs() { return this.userForm.get('pur_Bill_app_chgs') as FormArray; }

  get app_chgs_id() { return this.userForm.get("app_chgs_id") as FormControl }
  get tot_amt() { return this.userForm.get("tot_amt") as FormControl }
  get add1_remarks() { return this.userForm.get("add1_remarks") as FormControl }
  get add2_remarks() { return this.userForm.get("add2_remarks") as FormControl }

  get purchase_item_groupwise_summ() { return this.userForm.get("purchase_item_groupwise_summ") as FormArray };
  get purchase_item_groupwise_taxsumm() { return this.userForm.get("purchase_item_groupwise_taxsumm") as FormArray };
  get purchase_item_groupwise_hsnsumm() { return this.userForm.get("purchase_item_groupwise_hsnsumm") as FormArray };

  get pur_bill_store_chgs() { return this.userForm.get('pur_bill_store_chgs') as FormArray; }

  addItemGrp() {
    this.purchase_item_groupwise_summ.push(this.fb.group({
      item_group: '',
      item_total: '',
      discount_amt: '',
      item_ledger: '',
      discount_ledger: ''
    }))
  }

  addItemGrpTax() {
    this.purchase_item_groupwise_taxsumm.push(this.fb.group({
      tax_code: '',
      tax_rate: '',
      tax_amt: '',
      percentage: '',
      cgst: '',
      sgst: '',
      igst: '',
      cgstledgerid: '',
      sgstledgerid: '',
      igstledgerid: '',
      taxable_amt: ''
    }))
  }

  addItemGrpHsn() {
    this.purchase_item_groupwise_hsnsumm.push(this.fb.group({
      hsn_code: '',
      amount: '',
    }))
  }

  ngOnInit() {
    //this.getProducts({ page: "0", size: "10" });
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.purchasebillsave = false;
    this.purchasebillupdate = false;
    this.purchasebillview = false;
    this.purchasebillprint = false;
    this.purchasebilldelete = false;

    if (accessdata.includes('purchase_bill.save')) {
      this.purchasebillsave = true;
    }
    if (accessdata.includes('purchase_bill.update')) {
      this.purchasebillupdate = true;
    }
    if (accessdata.includes('purchase_bill.view')) {
      this.purchasebillview = true;
    }
    if (accessdata.includes('purchase_bill.print')) {
      this.purchasebillprint = true;
    }
    if (accessdata.includes('purchase_bill.delete')) {
      this.purchasebilldelete = true;
    }

    this.status = false;
    this.srvItemType = true;
    this.srvItemSubType = '0';
    this.totalItem = 0;
    this.totalDiscount = 0;
    this.totalNetAmt = 0;
    this.totalQcDeduction = 0;
    this.totalNetAmtAfterDeduction = 0;
    this.totalTaxAmt = 0;
    this.totalGrossAmt = 0;
    this.add = 0;
    this.sub = 0;
    this.defaultValue = 0;
    this.defaultValue1 = 0.00;
    this.defaultValue2 = 0.00;
    this.defaultValue3 = 0.00;
    this.defaultValue4 = 0.00;
    this.otherCharges = 0;
    this.alreadyPaid = 0;
    this.action = 'update';
    this.isHidden = false;
    this.empty_bag_wt_priceBasedOn = [];
    this.empty_bag_wt = [];
    this.capacity = [];
    this.packingItem = [];
    this.totaltds_span = false;
    this.storepurchase = false;
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
    this.item_types = ["MATERIAL", "SERVICE"];
    this.company_name = localStorage.getItem("company_name");
    this.payModes = ["CASH", "CARD", "CHEQUE", "DD", "NEFT", "RTGS"];
    //this.puSubTypeList=[{display: "Camp Purchase"},{display: "E-Open Purchase"},{display: "Hat Purchase"},{display: "PDS Purchase"}];
    this.userForm.patchValue({ referance_id: '0', id: 0 });
    this.userForm.patchValue({ supplier_name: '0' });
    this.purchase_type_new = '0';
    this.purchase_subtype_new = '0';
    this.created_by_new = '0';
    this.truck_no_new = '0';
    this.upfrontbrokeragenew = "0.00";
    this.claim1new = "0.00";
    this.claim2new = "0.00";

    let finyear = localStorage.getItem("financial_year");
    forkJoin(
      //this.Service.getPurchaseBill(),
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getVehicleNameCode(),
      this.DropDownListService.employeeNamesList(this.company_name),
      //this.DropDownListService.itemTypeList(this.company_name),
      this.DropDownListService.itemTypeListFastAPI(this.company_name),
      this.DropDownListService.ledgerNameList(),
      //this.DropDownListService.supplierNamesList(this.company_name),
      this.DropDownListService.supplierNamesNewList(this.company_name),
      //this.DropDownListService.itemNamesList(),
      this.DropDownListService.itemNamesNewList(),
      this.DropDownListService.getChargeMasterList(),
      this.DropDownListService.getpurBillDataList(this.currentDate, finyear),
      this.DropDownListService.itemGroupList(this.company_name),
      this.DropDownListService.getStoreChargesList()
      // ).subscribe(([pBillData, companyBUMNCList,vehicleData, employeeData, itemTypedata,
    ).subscribe(([companyBUMNCList, vehicleData, employeeData, itemTypedata,
      ledgerdata, supplierData, itemNameData, ChargeMasterData, purBillDataList, itemgroupdata, storedata]) => {
      //this.listPurchaseBill  = pBillData;
      //console.log("purBillDataList:"+JSON.stringify(purBillDataList))
      this.listPurchaseBill = purBillDataList;
      this.bussiness_unit_list = companyBUMNCList;
      this.storeChargesList = storedata;
      //console.log("itemTypedata: "+JSON.stringify(itemTypedata));
      this.vehicleList = vehicleData;
      this.employeeNames = employeeData;
      //this.itemtypes  = itemTypedata.slice(0, -1);
      this.itemtypes = itemTypedata;
      this.ledgerNames = ledgerdata;
      this.supplierNames = supplierData;
      this.item_codes = itemNameData;
      this.chargesIdList = ChargeMasterData;
      this.itemGroups = itemgroupdata;

      /* itemTypedata.filter(element => {
        if (element.item_id == "ITMT00009") { }
        else { this.itemtypes.push(element) }
      }); */

      this.pur_Bill_Item_Details.at(0).patchValue({ adv_item_code: 0 });
      this.userForm.patchValue({
        item_total_gl_ac: "0", discount_gl_ac: "0",
        qc_deduction_gl_ac: "0", upfrontbrokerage_gl_ac: "0", claim1_gl_ac: "0", claim2_gl_ac: "0", amt_after_deduction_gl_ac: "0",
        add_tax_gl_ac: "0", post_tax_amt_gl_ac: "0", ser_item_subtype: "0",
        other_charges_gl_ac: "0", other_charges: 0, payable_amt_gl_ac: "0", created_by: "0",
        add1_gl_ac: "0", add1: 0, add2_gl_ac: "0", add2: 0, roundoff_gl_ac: "IB00001",
        payable_party_gl_ac: "0", already_paid_gl_ac: "0", already_paid: 0,
        net_payable_party_gl_ac: "0", net_amt: "0", net_amt_gl_ac: "0", store_frieghtcharges_gl_ac: "0"
      });

      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
    }
  }

  getAddAmt(event) {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.add = parseFloat(event.target.value);

    this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt,
      this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
      (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
  }

  getSubAmt(event) {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.sub = parseFloat(event.target.value);

    this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt,
      this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
      (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
  }

  getOtherCharges(event) {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.otherCharges = parseFloat(event.target.value);

    // this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
    //   this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
    //   (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
    let totamt = Number(this.grossAmt) + Number(this.otherCharges);
    this.userForm.patchValue({ payable_amt: totamt, payable_party: totamt, net_payable_party: totamt });

  }

  businessUnit: any;
  stackList: any = [];
  bussiness_unit_list: any = [];
  onChangeBussinessUnit(buss_id: string, operation) {
    this.warehouses = []
    this.stackList = [];
    this.businessUnit = buss_id;

    if (buss_id != '0') {
      this.status = false;
      forkJoin(
        this.DropDownListService.getWHListbyBUnit(buss_id)

      ).subscribe(([wearHouseData]) => {
        this.warehouses = wearHouseData;

        this.status = true;
      })
    }
  }
  onChangeBussUnit(buss_id: string) {
    this.warehouses = []
    this.stackList = [];
    this.status = false;
    forkJoin(
      this.DropDownListService.getWHListbyBUnit(buss_id)

    ).subscribe(([wearHouseData]) => {
      this.warehouses = wearHouseData;
      this.status = true;
    })
  }

  getAlreadyPaidAmt(event) {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.alreadyPaid = parseFloat(event.target.value)

    // this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
    //   this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
    //   (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
    let finalCal = Number(this.userForm.get("payable_party").value) - Number(event.target.value);
    this.userForm.patchValue({ net_payable_party: finalCal });

  }

  calculate(amt, dscAmt, taxAmt, netAmt, qcDeduction, netAmtAfterDeduction, add, sub,
    otherCharges, alreadyPaid, grossAmt,) {
    console.log("add/" + add + "/sub/" + sub)
    this.userForm.patchValue({
      item_total: (Math.round(amt * 100) / 100).toFixed(2),
      discount: (Math.round(dscAmt * 100) / 100).toFixed(2),
      add_tax: (Math.round(taxAmt * 100) / 100).toFixed(2),
      net_amt: (Math.round(netAmt * 100) / 100).toFixed(2),
      qc_deduction: (Math.round(qcDeduction * 100) / 100).toFixed(2),
      amt_after_deduction: (Math.round(netAmtAfterDeduction * 100) / 100).toFixed(2),
      post_tax_amt: (Math.round(grossAmt * 100) / 100).toFixed(2),
      payable_amt: (Math.round((grossAmt + otherCharges) * 100) / 100).toFixed(2),
      payable_party: (Math.round((grossAmt + otherCharges + add - sub))).toFixed(2),
      net_payable_party: (Math.round((grossAmt + otherCharges + add - sub - alreadyPaid))).toFixed(2)
    });
    this.calRoundOfFigure(grossAmt + otherCharges + add - sub);
  }



  calRoundOfFigure(payableToPartyamount) {
    console.log("roudof " + payableToPartyamount)
    let roundOfAmt = Math.round(payableToPartyamount * 100) % 100;
    console.log("roundOfAmt " + roundOfAmt)
    if (roundOfAmt >= 50) {
      roundOfAmt = 100 - roundOfAmt;
      console.log("roundOfAmt if " + roundOfAmt)
      this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
    }
    else {
      this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
    };
  }

  onChangePBillDate(event) {
    this.currentDate = event.target.value;
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      if (this.pusubtype != '' && this.srvItemSubType != '0')
        this.getBillNo(this.currentDate, this.srvItemType, this.srvItemSubType, this.pusubtype)
    }
    else {
      alert("Current date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }

  }

  onChangeServicesItemSubType(event, operation) {
    this.srvItemSubType = event;
    console.log("itype:" + event)

    if (this.srvItemSubType != '0' && this.pusubtype != '') {
      this.status = false;
      this.packingItem = [];
      this.capacity = [];
      this.empty_bag_wt = [];
      if (this.srvItemSubType == 'ITMT00008') {
        this.DropDownListService.getItemThruType("ITMT00001").subscribe(data => {
          this.item_codes = data;
          this.status = true;
        })

      }
      else {
        this.DropDownListService.getItemThruType(event).subscribe(data => {
          this.item_codes = data;
          this.status = true;
        })

      }
      if (this.srvItemSubType == 'ITMT00004') {
        console.log(" Store Purchase")
        this.storepurchase = true;
      }
      else {
        this.storepurchase = false;
      }
      if (operation != 'update') { this.getBillNo(this.currentDate, this.srvItemType, this.srvItemSubType, this.pusubtype) }
    }
  }

  onChangeServicesItemType(event) {
    this.srvItemType = event;
    if (this.srvItemSubType != '0' && this.pusubtype != '')
      this.getBillNo(this.currentDate, this.srvItemType, this.srvItemSubType, this.pusubtype)
  }



  onChangePOSubType(event) {
    this.pusubtype = event;

    // window.alert()

    if (this.pusubtype != '' && this.srvItemSubType != '0') { this.getBillNo(this.currentDate, this.srvItemType, this.srvItemSubType, this.pusubtype) }

  }

  getBillNo(date, itemType, srvItemSubType, pursub) {
    this.status = false;
    this.DropDownListService.getPBSequenceId(date + "/" + itemType + "/" + srvItemSubType + "/" + pursub).subscribe(data => {
      this.seq_no = data["sequenceid"];
      this.status = true;
    })
  }

  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.pur_Bill_Item_Details.push(this.fb.group({
      slno: this.item_sl_no,
      adv_item_code: '',
      item_group: '',
      adv_packing_item: '',
      classified_item_name: '',
      hsn_code: '',
      passed_packing_qty: '',
      passed_packing_uom: '',
      passed_item_qty: '',
      passed_mat_weight: '',
      passed_item_uom: '',
      unit_rate: '',
      price_based_on: '',
      amount: '',
      discount: '',
      discount_basedon: '',
      discount_amount: '',
      net_amount: '',
      qc_deduction: '',
      net_amt_after_qc: '',
      gross_amt: '',
      tax_code: '',
      tax_name: '',
      tax_rate: '',
      cgstamt: '',
      sgstamt: '',
      igstamt: '',
      tax_amt: '',
      gl_acc: '',
      warehouse: '',
      stack: ''
    }));
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      this.packingItem.slice(index, 1);
      this.capacity.slice(index, 1);
      this.pur_Bill_Item_Details.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.pur_Bill_Item_Details.reset();
      this.pur_Bill_Item_Details.at(0).patchValue({ slno: this.item_sl_no });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.pur_Bill_Item_Details.at(i - 1).patchValue({ slno: i });
  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.pur_Bill_Broker_Details.push(this.fb.group({
      sl_no: this.broker_sl_no,
      broker_name: '',
      broker_code: '',
      brokerage_amt: '',
      broker_other_info: '',
      up_brokerage_amt: '',
      total_brokerage: ''
    }));
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.pur_Bill_Broker_Details.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.pur_Bill_Broker_Details.reset();
      this.pur_Bill_Broker_Details.at(0).patchValue({ sl_no: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.pur_Bill_Broker_Details.at(i - 1).patchValue({ sl_no: i });

  }

  addMusterRoll() {
    this.pur_Bill_Musterroll_Details.push(this.fb.group({
      muster_roll_name: ''
    }));
  }

  deleteMusterRoll(index) {
    if (index) { this.pur_Bill_Musterroll_Details.removeAt(index); }
    else {
      alert("can't delete all rows");
      this.pur_Bill_Musterroll_Details.reset();
    }
  }

  addDocument() {
    this.pur_Bill_Docs.push(this.fb.group({
      doc_name: ''
    }));
  }

  deleteDocument(index) {
    if (index) { this.pur_Bill_Docs.removeAt(index); }
    else {
      alert("can't delete all rows");
      this.pur_Bill_Docs.reset();
    }
  }

  showList(s: string) {
    if (this.purchasebillsave == true && this.purchasebillupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        this.storepurchase = false;
      }
    }
    if (this.purchasebillsave == true && this.purchasebillupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        this.storepurchase = false;
      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.storepurchase = false;
      this.action = 'update';
      this.userForm.reset();
      this.pur_Bill_Bp_Details.reset();
      this.pur_Bill_Tax_Info.reset();

      this.packingItem = [];
      this.item_sl_no = 0;
      while (this.pur_Bill_Item_Details.length)
        this.pur_Bill_Item_Details.removeAt(0);
      this.addItem();

      this.broker_sl_no = 0;
      while (this.pur_Bill_Broker_Details.length)
        this.pur_Bill_Broker_Details.removeAt(0);
      this.addBroker();

      while (this.pur_Bill_Musterroll_Details.length)
        this.pur_Bill_Musterroll_Details.removeAt(0);
      this.addMusterRoll();

      while (this.pur_Bill_Docs.length)
        this.pur_Bill_Docs.removeAt(0);
      this.addDocument();
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    }
  }

  packingItem: any = [];
  onchangeItemName(index, event) {
    if (event.target.value != '0') {
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterPackMat(event.target.value)
      ).subscribe(([itemNameData, packingItemData]) => {
        this.pur_Bill_Item_Details.at(index).patchValue({ adv_item_name: itemNameData["item_name"] });
        this.packingItem[index] = packingItemData;
        this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data => {
          this.pur_Bill_Item_Details.at(index).patchValue({ passed_item_uom: data.description });
          this.status = true;
        });
      });
    }
  }

  getItemQty(event, index) {
    let itemQty = this.capacity[index] * event;
    let matwt = itemQty - this.empty_bag_wt[index];
    this.pur_Bill_Item_Details.at(index).patchValue({
      passed_item_qty: itemQty,
      passed_mat_weight: (Math.round(matwt * 1000) / 1000).toFixed(3)
    });
  }

  onchangePackingItem(index, event) {
    if (event.target.value != '0') {
      this.itemId = this.pur_Bill_Item_Details.at(index).get("adv_item_code").value as FormControl;
      this.status = false;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name).subscribe(data => {
        this.capacity[index] = data.capacity;
        this.empty_bag_wt[index] = data.empty_big_wt;
        this.pur_Bill_Item_Details.at(index).patchValue({ passed_packing_uom: data.uom1 });
        this.status = true;
      });
    }
  }

  onChangeSupplierName(suppid: string) {
    this.userForm.patchValue({ pan_no: null, gst_no: null, cin_no: null, tan_no: null });
    this.pur_Bill_Broker_Details.reset();
    this.brokerNameList = [];
    this.onChangePaymentMode("0");
    this.pur_Bill_Account_Info.patchValue({
      mode_of_pay: "0", accountholder: null,
      acc_no: null, bankname: null, ifsc: null, mobile: null, iban: null, bic_swift_code: null, branch: null
    });
    this.pur_Bill_Account_Info.patchValue({
      bic_swift_code: null, iban: null, payment_mode: "0", payment_terms: "0",
      bank_name: null, account_name: null, account_no: null, ifsc_code: null, mobile: null, branch: null, cash_limit: 0
    });

    if (suppid.length && suppid != '0') {
      forkJoin(
        this.DropDownListService.getSuppliertransport(suppid),
        this.DropDownListService.getSuppliertdsStatDtls(suppid, localStorage.getItem("financial_year"))

      ).subscribe(([data12, tdsstat]) => {


        if (Number(tdsstat.totalamount) < 4500000) {
          this.totaltds_span = false;
        }
        else {
          this.totaltds_span = true;
        }


        if (data12[0].transport_own == 'YES') {
          this.status = false;
          this.supplier_id = suppid;
          forkJoin(
            this.DropDownListService.getSuppBPAcc(suppid),
            this.DropDownListService.getSupplierStatDtls(suppid),
            this.DropDownListService.getBrokerListBySupplierCode(suppid),
            this.DropDownListService.getAddrById(suppid),
            this.DropDownListService.getSuppAddrById(suppid),
            this.DropDownListService.getDeliveryAddrById(suppid),
            this.DropDownListService.getSuppContactNameList(suppid),
            this.DropDownListService.getTransporterThruSupplier(suppid),

          ).subscribe(([data, data1, data2, data3, data4, data5, data6, data7]) => {
            this.onChangePaymentMode(data["mode_of_pay"]);
            this.pur_Bill_Account_Info.patchValue({
              mode_of_pay: data["mode_of_pay"], pay_term: data["pay_term"],
              accountholder: data["accountholder"], acc_no: data["acc_no"], bankname: data["bankname"],
              ifsc: data["ifsc"], mobile: data["mobile"], iban: data["iban"], bic_swift_code: data["bic_swift_code"],
              branch: data["branch"]
            });

            this.userForm.patchValue({ state: data3["state"] });

            this.pur_Bill_Tax_Info.patchValue({ pan: data1["pan_no"], gst: data1["gst_no"], cin: data1["cin_no"], tan: data1["tan_no"] });
            this.brokerNameList = data2;
            this.status = true;
          });

        }

        if (data12[0].transport_own == 'NO') {
          this.status = false;
          this.supplier_id = suppid;
          forkJoin(
            this.DropDownListService.getSuppBPAcc(suppid),
            this.DropDownListService.getSupplierStatDtls(suppid),
            this.DropDownListService.getBrokerListBySupplierCode(suppid),
            this.DropDownListService.getAddrById(suppid),
            this.DropDownListService.getSuppAddrById(suppid),
            this.DropDownListService.getDeliveryAddrById(suppid),
            this.DropDownListService.getSuppContactNameList(suppid),
            //  this.DropDownListService.getTransporterThruSupplier(suppid)
            // ).subscribe(([data, data1, data2, data3, data4, data5, data6, data7])=>
          ).subscribe(([data, data1, data2, data3, data4, data5, data6]) => {
            this.onChangePaymentMode(data["mode_of_pay"]);
            this.pur_Bill_Account_Info.patchValue({
              mode_of_pay: data["mode_of_pay"], pay_term: data["pay_term"],
              accountholder: data["accountholder"], acc_no: data["acc_no"], bankname: data["bankname"],
              ifsc: data["ifsc"], mobile: data["mobile"], iban: data["iban"], bic_swift_code: data["bic_swift_code"],
              branch: data["branch"]
            });

            this.pur_Bill_Tax_Info.patchValue({ pan: data1["pan_no"], gst: data1["gst_no"], cin: data1["cin_no"], tan: data1["tan_no"] });
            this.brokerNameList = data2;
            this.userForm.patchValue({ state: data3["state"] });
            this.status = true;
          });

        }

      });


    }
  }

  is_cash_limit_active = false;
  onChangePaymentMode(payment_mode: string) {
    if (payment_mode == "Cash") { this.is_cash_limit_active = true; }
    else {
      this.is_cash_limit_active = false;
      this.pur_Bill_Account_Info.patchValue({ cash_limit: 0 });
    }
  }

  Payment_date: any
  onChangePaymentdate(event) {
    this.userForm.get("id").value as FormControl
    this.Payment_date = this.pur_Bill_Account_Info.get("payment_date").value as FormControl;
    this.userForm.patchValue({ payment_date: this.Payment_date })
  }

  onChangeWarehouse(event, index) {
    this.status = false;
    this.DropDownListService.getBinDescByWarehouse(event).subscribe(data1 => {
      console.log("stackListData: " + JSON.stringify(data1))
      this.status = true;
      this.stackList[index] = data1;
    });
  }

  onChangeWarehouse1(warehouse, index) {
    this.status = false;
    this.DropDownListService.getBinDescByWarehouse(warehouse).subscribe(data1 => {
      console.log("stackListData: " + JSON.stringify(data1))
      this.status = true;
      this.stackList[index] = data1;
    });
  }

  add7() {
    this.pur_Bill_app_chgs.push(this.fb.group({
      charges_name: '',
      add_less: '',
      rate_cal_method: '',
      app_rate: '',
      tax_rate: '0',
      amount: '0',
      required: ''
    }));
  }


  amt: any;
  discountAmt: any;
  netAmt: any;
  qcDeduction: any;
  amtAfterDeduction: any;
  taxAmt: any;
  grossAmt: any;
  BusinessUnit: any;

  ItemGr = [];
  TaxCode = [];
  HsnCode = [];
  TaxRate = [];
  StateName: any;
  Tax_Rate: any;

  Tax_Amt: any;
  onClickShow() {
    let supname = "";
    this.supplierNames.forEach(element => {
      if (element.bp_Id == this.supplier_id) {
        supname = element.bp_name;
      }
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      supplier_id: this.supplier_id, item_sub_type: this.srvItemSubType,
      item_type: this.srvItemType, company_id: localStorage.getItem("company_name"), fin_year: "0", date: this.currentDate,
      bunit: "0", pursubtype: this.pusubtype, file_name: "PurchaseBill", supname: supname
    };

    if (this.supplier_id == "0") {
      alert("Please Select Supplier Name");
    }
    else if (this.userForm.get("purchase_type").value == "0") {
      alert("Please Select Service / Item Sub Type");
    }
    else if (this.userForm.get("purchase_subtype").value == "0") {
      alert("Please Select Purchase Sub Type");
    }
    else {

      if (this.supplier_id != "0" && this.srvItemSubType != "0") {



        const dialogRef = this.dialog.open(GrnPopUpComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          if (data != '' && data["grn_id"] != '0') {

            // console.log("All data::"+JSON.stringify(data))

            this.upfrontbrokeragenew = 0.00;
            this.claim1new = 0.00;
            this.claim2new = 0.00;
            this.totalItem = 0;
            this.totalDiscount = 0;
            this.totalNetAmt = 0;
            this.totalQcDeduction = 0;
            this.totalNetAmtAfterDeduction = 0;
            this.totalTaxAmt = 0;
            this.totalGrossAmt = 0;
            this.userForm.patchValue({ referance_id: data["grn_id"], referance_type: data["referance_type"] });
            this.packingItem = [];
            let k = 0;
            this.addItem();
            this.item_sl_no = 0;
            this.status = false;
            let grn_id = data["grn_id"];

            //open grn start here
            if (data["referance_type"] == "OPEN GRN") {
              // console.log("im in ")
              forkJoin(
                this.DropDownListService.getPurGoodRcptDtlsopengrn(data["grn_id"]),
                this.DropDownListService.getPurGoodRcptBPDtls(data["grn_id"]),
                this.DropDownListService.getPurGoodRcptBrokerList(data["grn_id"]),
                this.DropDownListService.getPurGoodRcptDocList(data["grn_id"]),

              ).subscribe(([grnData, bpDetails, brokerData, docData]) => {

                // console.log("chargematrix :: "+JSON.stringify(chargematrix))

                this.onChangeSupplierName(grnData["supplier_name"]);
                this.onChangeServicesItemType(grnData["item_type"]);
                this.onChangeBussUnit(grnData["b_unit"]);
                //   this.userForm.patchValue({app_chgs_id:grnData["applicable_charges_id"]});


                this.add7();
                while (this.pur_Bill_app_chgs.length)
                  this.pur_Bill_app_chgs.removeAt(0);

                this.add7();



                this.userForm.patchValue({ ser_item_type: grnData["item_type"], remarks: grnData["remarks"], truck_no: grnData["vehicle_id"], business_unit: grnData["b_unit"], });
                this.BusinessUnit = grnData["b_unit"];
                this.pur_Bill_Bp_Details.patchValue({
                  supp_name: bpDetails["sp_name"], supp_phone: bpDetails["sp_phone"],
                  supp_fax: bpDetails["sp_fax"], supp_email: bpDetails["sp_email"], supp_address: bpDetails["sp_address"],
                  cp_designation: bpDetails["cp_designation"], cp_name: bpDetails["cp_name"], cp_phone: bpDetails["cp_phone"],
                  cp_fax: bpDetails["cp_fax"], cp_email: bpDetails["cp_email"], cp_address: bpDetails["cp_address"]
                });

                // console.log("brokerData: "+JSON.stringify(brokerData));
                let i = 0;
                this.addBroker();
                this.broker_sl_no = 0;
                while (this.pur_Bill_Broker_Details.length)
                  this.pur_Bill_Broker_Details.removeAt(0);
                for (let data1 of brokerData) {
                  this.addBroker();
                  this.pur_Bill_Broker_Details.at(i).patchValue({ broker_name: data1["ven_name"], broker_code: data1["ven_code_name"] });
                  i = i + 1;
                }

                this.addDocument();
                while (this.pur_Bill_Docs.length)
                  this.pur_Bill_Docs.removeAt(0);
                for (let data1 of docData)
                  this.addDocument();
                this.pur_Bill_Docs.patchValue(docData);
                this.status = true;
              });

            }
            //open grn ends here                     
            else {
              //HERE FETCH
              forkJoin(
                this.DropDownListService.getPurGoodRcptDtls(data["grn_id"]),
                this.DropDownListService.getPurGoodRcptBPDtls(data["grn_id"]),
                this.DropDownListService.getPurGoodRcptBrokerList(data["grn_id"]),
                this.DropDownListService.getPurGoodRcptDocList(data["grn_id"])
                //this.DropDownListService.getChargesMatrixdetails(data["grn_id"])
                //   ).subscribe(([grnData, bpDetails, brokerData, docData,chargematrix])=>
              ).subscribe(([grnData, bpDetails, brokerData, docData]) => {

                // console.log("chargematrix :: "+JSON.stringify(chargematrix))

                this.onChangeSupplierName(grnData["supplier_name"]);
                this.onChangeServicesItemType(grnData["item_type"]);
                this.onChangeBussUnit(grnData["b_unit"]);
                this.userForm.patchValue({ app_chgs_id: grnData["applicable_charges_id"] });

                /*  
                   this.add7();
                   while (this.pur_Bill_app_chgs.length) 
                   this.pur_Bill_app_chgs.removeAt(0);
                   for(let data1 of chargematrix)
                   this.add7();
                   this.pur_Bill_app_chgs.patchValue(chargematrix);
                */




                this.userForm.patchValue({ ser_item_type: grnData["item_type"], remarks: grnData["remarks"], truck_no: grnData["vehicle_id"], business_unit: grnData["b_unit"], });
                this.BusinessUnit = grnData["b_unit"];
                this.pur_Bill_Bp_Details.patchValue({
                  supp_name: bpDetails["sp_name"], supp_phone: bpDetails["sp_phone"],
                  supp_fax: bpDetails["sp_fax"], supp_email: bpDetails["sp_email"], supp_address: bpDetails["sp_address"],
                  cp_designation: bpDetails["cp_designation"], cp_name: bpDetails["cp_name"], cp_phone: bpDetails["cp_phone"],
                  cp_fax: bpDetails["cp_fax"], cp_email: bpDetails["cp_email"], cp_address: bpDetails["cp_address"]
                });

                // console.log("brokerData: "+JSON.stringify(brokerData));
                let i = 0;
                this.addBroker();
                this.broker_sl_no = 0;
                while (this.pur_Bill_Broker_Details.length)
                  this.pur_Bill_Broker_Details.removeAt(0);
                for (let data1 of brokerData) {
                  this.addBroker();
                  this.pur_Bill_Broker_Details.at(i).patchValue({ broker_name: data1["ven_name"], broker_code: data1["ven_code_name"] });
                  i = i + 1;
                }

                this.addDocument();
                while (this.pur_Bill_Docs.length)
                  this.pur_Bill_Docs.removeAt(0);
                for (let data1 of docData)
                  this.addDocument();
                this.pur_Bill_Docs.patchValue(docData);
                this.status = true;


                /*supp_ref_doc:any;
                  supp_ref_docno:any;
                  supp_ref_doc_date:any;
                  */
                //getUnload_multi_popup
                if (this.userForm.get("purchase_type").value == "ITMT00004") {
                  this.userForm.patchValue({ supp_ref_doc: '', supp_ref_docno: '', supp_ref_doc_date: '' });

                }
                else {
                  this.DropDownListService.getUnload_multi_popup(grnData["referance_id"]).subscribe(data => {
                    this.userForm.patchValue({ supp_ref_doc: data["supp_ref_doc"], supp_ref_docno: data["supp_ref_docno"], supp_ref_doc_date: data["supp_ref_doc_date"] });
                  });
                }

              });

            }


            while (this.pur_Bill_Item_Details.length)
              this.pur_Bill_Item_Details.removeAt(0);

            for (let data1 of data.pur_good_receipt_item_details) {
              if (data1.checkbox == true || data1.checkbox == "true") {
                this.status = false;

                let rawopen: boolean = true;
                // console.log(this.userForm.get("purchase_type").value + " // " + data["referance_type"])
                if ((this.userForm.get("purchase_type").value == "ITMT00001" || this.userForm.get("purchase_type").value == "ITMT00010") && data["referance_type"] == "OPEN GRN") {
                  rawopen = false;
                }
                else {
                  rawopen = true;
                }
                //store purchase starts here
                if (this.userForm.get("purchase_type").value == "ITMT00004") {

                  this.DropDownListService.getStoreChargesPo(this.userForm.get("referance_id").value, data["referance_type"]).subscribe(data => {

                    console.log("check store data:" + JSON.stringify(data))
                    if (data['store_charges'] == 'NA') {


                      //starts here             
                      forkJoin(
                        this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                        this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"], this.company_name),
                        this.DropDownListService.getItemNameById(data1["adv_item_code"], this.company_name),
                        // this.DropDownListService.gettaxcodefromgrn(data1["adv_item_code"],data["grn_id"])
                        // this.DropDownListService.gettaxcodefromgrnnewForStore(data1["adv_item_code"], grn_id, data1["adv_packing"], data1["classified_item_name"])
                        //  ).subscribe(([packingList, capacityEmptyWt, ItemGrp, taxid]) => {
                      ).subscribe(([packingList, capacityEmptyWt, ItemGrp]) => {
                        this.status = true;
                        this.capacity[k] = capacityEmptyWt.capacity;
                        this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
                        this.empty_bag_wt_priceBasedOn = capacityEmptyWt.empbagwt_based_on;
                        this.packingItem[k] = packingList;

                        this.ItemGr.push(ItemGrp["item_group"]);
                        //this.TaxCode.push(taxid["tax_code"]);//earlier
                        this.TaxCode.push(data1["tax_id"]);
                        this.HsnCode.push(ItemGrp["hsn_code"]);
                        this.TaxRate.push(data1["tax_rate"]);
                        //hsn_code

                        this.addItem();
                        // this.onChangeWarehouse1(data1.warehouse_name, k); // checked on 10-05-2022,need to be rectified latter
                        this.totalItem = this.totalItem + parseFloat(data1["amount"]);
                        this.totalDiscount = this.totalDiscount + parseFloat(data1["discount_amt"]);
                        this.totalTaxAmt = this.totalTaxAmt + parseFloat(data1["tax_amt"]);
                        this.totalNetAmt = this.totalNetAmt + parseFloat(data1["net_amt"]);
                        this.totalGrossAmt = this.totalGrossAmt + parseFloat(data1["gross_amt"]);
                        this.totalQcDeduction = this.totalQcDeduction + parseFloat(data1["qc_deduction"]);
                        this.totalNetAmtAfterDeduction = this.totalNetAmtAfterDeduction + parseFloat(data1["net_amt_after_qc"]);
                        this.pur_Bill_Item_Details.at(k).patchValue({
                          adv_item_code: data1["adv_item_code"], item_group: ItemGrp["item_group"], hsn_code: ItemGrp["hsn_code"],
                          adv_packing_item: data1["adv_packing"], passed_packing_uom: data1["pssd_pack_uom"],
                          passed_item_qty: data1["pssd_item_qty"], passed_mat_weight: (Math.round(data1["pssd_mat_wt"] * 1000) / 1000).toFixed(3),
                          passed_item_uom: data1["pssd_item_uom"], unit_rate: data1["unit_rate"], price_based_on: data1["price_based_on"],
                          amount: data1["amount"], discount: data1["discount"], discount_basedon: data1["discount_based_on"],
                          discount_amount: data1["discount_amt"], net_amount: data1["net_amt"], qc_deduction: data1["qc_deduction"],
                          net_amt_after_qc: data1["net_amt_after_qc"], tax_code: data1["tax_code"], warehouse: data1["warehouse_name"], stack: data1["rack"],
                          tax_rate: data1["tax_rate"], cgstamt: data1["cgstamt"], sgstamt: data1["sgstamt"], igstamt: data1["igstamt"], tax_amt: data1["tax_amt"],
                          // gross_amt: data1["gross_amt"], passed_packing_qty: data1["pssd_pack_qty"], tax_name: taxid["tax_code"],
                          gross_amt: data1["gross_amt"], passed_packing_qty: data1["pssd_pack_qty"], tax_name: data1["tax_id"],

                          classified_item_name: data1["classified_item_name"]
                        });

                        // console.log(" taxamount " + data1["tax_amt"])
                        k = k + 1;

                        //  this.chargematrixdata();
                        console.log("calculation" + this.totalItem + " / " + this.totalDiscount + " / " + this.totalTaxAmt + " / " + this.totalNetAmt)
                        console.log("calculation1" + this.totalQcDeduction + " / " + this.totalNetAmtAfterDeduction + " / " + this.add + " / " + this.sub)
                        console.log("calculation2" + this.alreadyPaid + " / " + this.totalGrossAmt)

                        this.calculatnew(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt,
                          this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
                          0, this.alreadyPaid, this.totalGrossAmt, 0)



                        //for //gstigst sgast starts here   
                        //timer(3000).subscribe
                        timer(0).subscribe
                          (x => {
                            const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);

                            this.addItemGrpHsn();
                            while (this.purchase_item_groupwise_hsnsumm.length)
                              this.purchase_item_groupwise_hsnsumm.removeAt(0);
                            for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                              let DiscountAmt = 0;
                              for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {
                                if (this.pur_Bill_Item_Details.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                                  DiscountAmt += this.pur_Bill_Item_Details.at(k).get("amount").value - this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                                }
                              }
                              this.addItemGrpHsn();

                              this.purchase_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                            }
                          }
                          )
                        //timer(3500).subscribe
                        timer(0).subscribe
                          (x => {
                            const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);

                            this.addItemGrp();
                            while (this.purchase_item_groupwise_summ.length)
                              this.purchase_item_groupwise_summ.removeAt(0)
                            for (let j = 0; j < distinctArray.length; j++) {
                              let Amt = 0;
                              let Discount = 0;

                              for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                if (this.pur_Bill_Item_Details.at(k).get("item_group").value == distinctArray[j]) {
                                  Amt += this.pur_Bill_Item_Details.at(k).get("amount").value;
                                  Discount += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                                }
                              }
                              this.addItemGrp();

                              this.purchase_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                              forkJoin(
                                this.Service.getItemGroupPurAcc(distinctArray[j]),
                              ).subscribe(([ItemgrpLedger]) => {
                                this.purchase_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total_gl_ac, discount_ledger: ItemgrpLedger.discount_gl_ac });

                                this.status = true;
                              });
                            }
                          }
                          )
                        //timer(4000).subscribe
                        timer(0).subscribe
                          (x => {
                            this.StateName = this.userForm.get("state").value;

                            console.log("State::" + this.StateName)
                            const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);

                            this.addItemGrpTax();
                            while (this.purchase_item_groupwise_taxsumm.length)
                              this.purchase_item_groupwise_taxsumm.removeAt(0)
                            for (let j = 0; j < distinctArrayTax.length; j++) {
                              let TaxRate = 0;
                              let TaxAmt = 0;
                              let cgst = 0;
                              let sgst = 0;
                              let igst = 0;

                              for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                if (this.pur_Bill_Item_Details.at(k).get("tax_name").value == distinctArrayTax[j]) {
                                  TaxRate = this.pur_Bill_Item_Details.at(k).get("tax_rate").value;
                                  TaxAmt += this.pur_Bill_Item_Details.at(k).get("tax_amt").value;
                                  cgst += this.pur_Bill_Item_Details.at(k).get("cgstamt").value;
                                  sgst += this.pur_Bill_Item_Details.at(k).get("sgstamt").value;
                                  igst += this.pur_Bill_Item_Details.at(k).get("igstamt").value;
                                }
                              }
                              this.addItemGrpTax();
                              this.purchase_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2), cgst: cgst.toFixed(2), sgst: sgst.toFixed(2), igst: igst.toFixed(2) });

                              if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                                // console.log("tax code " + distinctArrayTax[j])
                                forkJoin(
                                  this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                                ).subscribe(([TaxData]) => {
                                  console.log("TaxData::" + JSON.stringify(TaxData))
                                  if (TaxData) {
                                    this.purchase_item_groupwise_taxsumm.at(j).patchValue({
                                      percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_input_ledger
                                      , sgstledgerid: TaxData.input_ledger, igstledgerid: TaxData.igst_input_ledger
                                    });



                                    this.status = true;

                                    this.Tax_Rate = this.purchase_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                                    this.StateName = this.userForm.get("state").value;

                                    this.Tax_Amt = this.purchase_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

                                    console.log(this.Tax_Amt + "state name tax :" + this.StateName)
                                    /* if(this.StateName=='BIHAR')
                                    {                         
                                      let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
                                      let Sgst =(this.Tax_Amt - Cgst);
                                      this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                    }                  
                                    else
                                    {this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}
                                  */


                                    const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                                    for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                      let Amount = 0;
                                      let DiscountAmt = 0;
                                      let Taxable_Amnt = 0;

                                      for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                        if (this.pur_Bill_Item_Details.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                          Amount += this.pur_Bill_Item_Details.at(k).get("amount").value;
                                          DiscountAmt += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;
                                          Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
                                          //  console.log("Taxable_Amnt : " +Taxable_Amnt)  
                                          // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                        }
                                      }
                                      this.purchase_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                                    }
                                  }

                                  else {
                                    //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                    alert("something error is happened");
                                  }

                                });
                              }


                            }
                          })

                        //gstigst sgast ends here                   
                      });
                      //ends

                    }
                    else {
                      this.userForm.patchValue({ store_charges: data['store_charges'] });
                      this.DropDownListService.getPurOrdStoreDynList(data['pur_orderid']).subscribe(storedate => {
                        console.log("storedate::" + JSON.stringify(storedate))
                        let m = 0, storetax = 0, storeallcharge = 0;
                        this.addStoreCharge();
                        while (this.pur_bill_store_chgs.length)
                          this.pur_bill_store_chgs.removeAt(0);
                        for (let storedatalist of storedate) {
                          this.addStoreCharge();
                          this.pur_bill_store_chgs.at(m).patchValue({
                            charges_name: storedatalist["charges_name"],
                            charges_acc: storedatalist["charges_acc"],
                            store_amount: storedatalist["store_amount"],
                            store_taxrate: storedatalist["store_taxrate"],
                            store_cgst: storedatalist["store_cgst"],
                            store_sgst: storedatalist["store_sgst"],
                            store_igst: storedatalist["store_igst"]
                          });
                          storetax += Number(storedatalist["store_igst"]) + Number(storedatalist["store_cgst"]) + Number(storedatalist["store_sgst"]);
                          storeallcharge += Number(storedatalist["store_amount"])
                          this.userForm.patchValue({ store_taxamt: storetax, allstorecharges: storeallcharge });
                          m++;

                        }




                        //starts here             
                        forkJoin(
                          this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                          this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"], this.company_name),
                          this.DropDownListService.getItemNameById(data1["adv_item_code"], this.company_name),
                          // this.DropDownListService.gettaxcodefromgrn(data1["adv_item_code"],data["grn_id"])
                          //  this.DropDownListService.gettaxcodefromgrnnewForStore(data1["adv_item_code"], grn_id, data1["adv_packing"], data1["classified_item_name"])
                          // ).subscribe(([packingList, capacityEmptyWt, ItemGrp, taxid]) => {
                        ).subscribe(([packingList, capacityEmptyWt, ItemGrp]) => {
                          // console.log(" taxid " + JSON.stringify(taxid))
                          this.status = true;
                          this.capacity[k] = capacityEmptyWt.capacity;
                          this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
                          this.empty_bag_wt_priceBasedOn = capacityEmptyWt.empbagwt_based_on;
                          this.packingItem[k] = packingList;

                          this.ItemGr.push(ItemGrp["item_group"]);
                          //this.TaxCode.push(taxid["tax_code"]);//ealrier
                          this.TaxCode.push(data1["tax_id"]);
                          this.HsnCode.push(ItemGrp["hsn_code"]);
                          this.TaxRate.push(data1["tax_rate"]);
                          //hsn_code

                          this.addItem();
                          // this.onChangeWarehouse1(data1.warehouse_name, k); // checked on 10-05-2022,need to be rectified latter
                          this.totalItem = this.totalItem + parseFloat(data1["amount"]);
                          this.totalDiscount = this.totalDiscount + parseFloat(data1["discount_amt"]);
                          this.totalTaxAmt = this.totalTaxAmt + parseFloat(data1["tax_amt"]);
                          this.totalNetAmt = this.totalNetAmt + parseFloat(data1["net_amt"]);
                          this.totalGrossAmt = this.totalGrossAmt + parseFloat(data1["gross_amt"]);
                          this.totalQcDeduction = this.totalQcDeduction + parseFloat(data1["qc_deduction"]);
                          this.totalNetAmtAfterDeduction = this.totalNetAmtAfterDeduction + parseFloat(data1["net_amt_after_qc"]);
                          this.pur_Bill_Item_Details.at(k).patchValue({
                            adv_item_code: data1["adv_item_code"], item_group: ItemGrp["item_group"], hsn_code: ItemGrp["hsn_code"],
                            adv_packing_item: data1["adv_packing"], passed_packing_uom: data1["pssd_pack_uom"],
                            passed_item_qty: data1["pssd_item_qty"], passed_mat_weight: (Math.round(data1["pssd_mat_wt"] * 1000) / 1000).toFixed(3),
                            passed_item_uom: data1["pssd_item_uom"], unit_rate: data1["unit_rate"], price_based_on: data1["price_based_on"],
                            amount: data1["amount"], discount: data1["discount"], discount_basedon: data1["discount_based_on"],
                            discount_amount: data1["discount_amt"], net_amount: data1["net_amt"], qc_deduction: data1["qc_deduction"],
                            net_amt_after_qc: data1["net_amt_after_qc"], tax_code: data1["tax_code"], warehouse: data1["warehouse_name"], stack: data1["rack"],
                            tax_rate: data1["tax_rate"], cgstamt: data1["cgstamt"], sgstamt: data1["sgstamt"], igstamt: data1["igstamt"], tax_amt: data1["tax_amt"],
                            //gross_amt: data1["gross_amt"], passed_packing_qty: data1["pssd_pack_qty"], tax_name: taxid["tax_code"],
                            gross_amt: data1["gross_amt"], passed_packing_qty: data1["pssd_pack_qty"], tax_name: data1["tax_id"],
                            classified_item_name: data1["classified_item_name"]
                          });

                          //console.log(" taxamount " + data1["tax_amt"])
                          k = k + 1;

                          //  this.chargematrixdata();
                          console.log("calculation" + this.totalItem + " / " + this.totalDiscount + " / " + this.totalTaxAmt + " / " + this.totalNetAmt)
                          console.log("calculation1" + this.totalQcDeduction + " / " + this.totalNetAmtAfterDeduction + " / " + this.add + " / " + this.sub)
                          console.log("calculation2" + this.alreadyPaid + " / " + this.totalGrossAmt)

                          this.calculatnew(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt,
                            this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
                            0, this.alreadyPaid, this.totalGrossAmt, 0)



                          //for //gstigst sgast starts here   
                          //timer(3000).subscribe
                          timer(0).subscribe
                            (x => {
                              const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);

                              this.addItemGrpHsn();
                              while (this.purchase_item_groupwise_hsnsumm.length)
                                this.purchase_item_groupwise_hsnsumm.removeAt(0);
                              for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                                let DiscountAmt = 0;
                                for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {
                                  if (this.pur_Bill_Item_Details.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                                    DiscountAmt += this.pur_Bill_Item_Details.at(k).get("amount").value - this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                                  }
                                }
                                this.addItemGrpHsn();

                                this.purchase_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                              }
                            }
                            )
                          //timer(3500).subscribe
                          timer(0).subscribe
                            (x => {
                              const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);

                              this.addItemGrp();
                              while (this.purchase_item_groupwise_summ.length)
                                this.purchase_item_groupwise_summ.removeAt(0)
                              for (let j = 0; j < distinctArray.length; j++) {
                                let Amt = 0;
                                let Discount = 0;

                                for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                  if (this.pur_Bill_Item_Details.at(k).get("item_group").value == distinctArray[j]) {
                                    Amt += this.pur_Bill_Item_Details.at(k).get("amount").value;
                                    Discount += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                                  }
                                }
                                this.addItemGrp();

                                this.purchase_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                                forkJoin(
                                  this.Service.getItemGroupPurAcc(distinctArray[j]),
                                ).subscribe(([ItemgrpLedger]) => {
                                  this.purchase_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total_gl_ac, discount_ledger: ItemgrpLedger.discount_gl_ac });

                                  this.status = true;
                                });
                              }
                            }
                            )
                          //timer(4000).subscribe
                          timer(0).subscribe
                            (x => {
                              this.StateName = this.userForm.get("state").value;

                              console.log("State::" + this.StateName)
                              const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);

                              this.addItemGrpTax();
                              while (this.purchase_item_groupwise_taxsumm.length)
                                this.purchase_item_groupwise_taxsumm.removeAt(0)
                              for (let j = 0; j < distinctArrayTax.length; j++) {
                                let TaxRate = 0;
                                let TaxAmt = 0;
                                let cgst = 0;
                                let sgst = 0;
                                let igst = 0;

                                for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                  if (this.pur_Bill_Item_Details.at(k).get("tax_name").value == distinctArrayTax[j]) {
                                    TaxRate = this.pur_Bill_Item_Details.at(k).get("tax_rate").value;
                                    TaxAmt += this.pur_Bill_Item_Details.at(k).get("tax_amt").value;
                                    cgst += this.pur_Bill_Item_Details.at(k).get("cgstamt").value;
                                    sgst += this.pur_Bill_Item_Details.at(k).get("sgstamt").value;
                                    igst += this.pur_Bill_Item_Details.at(k).get("igstamt").value;
                                  }
                                }
                                this.addItemGrpTax();
                                this.purchase_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2), cgst: cgst.toFixed(2), sgst: sgst.toFixed(2), igst: igst.toFixed(2) });

                                if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                                  console.log("tax code " + distinctArrayTax[j])
                                  forkJoin(
                                    this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                                  ).subscribe(([TaxData]) => {
                                    console.log("TaxData::" + JSON.stringify(TaxData))
                                    if (TaxData) {
                                      this.purchase_item_groupwise_taxsumm.at(j).patchValue({
                                        percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_input_ledger
                                        , sgstledgerid: TaxData.input_ledger, igstledgerid: TaxData.igst_input_ledger
                                      });



                                      this.status = true;

                                      this.Tax_Rate = this.purchase_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                                      this.StateName = this.userForm.get("state").value;

                                      this.Tax_Amt = this.purchase_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

                                      console.log(this.Tax_Amt + "state name tax :" + this.StateName)
                                      /* if(this.StateName=='BIHAR')
                                      {                         
                                        let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
                                        let Sgst =(this.Tax_Amt - Cgst);
                                        this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                      }                  
                                      else
                                      {this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}
                                    */


                                      const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                                      for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                        let Amount = 0;
                                        let DiscountAmt = 0;
                                        let Taxable_Amnt = 0;

                                        for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                          if (this.pur_Bill_Item_Details.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                            Amount += this.pur_Bill_Item_Details.at(k).get("amount").value;
                                            DiscountAmt += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;
                                            Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
                                            //  console.log("Taxable_Amnt : " +Taxable_Amnt)  
                                            // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                          }
                                        }
                                        this.purchase_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                                      }
                                    }

                                    else {
                                      //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                      alert("something error is happened");
                                    }

                                  });
                                }


                              }
                            })

                          //gstigst sgast ends here                   
                        });


                        //ends


                      });

                    }
                  });
                  //store purchase ends here
                }
                else if (this.userForm.get("purchase_type").value == "ITMT00005" || this.userForm.get("purchase_type").value == "ITMT00002" || this.userForm.get("purchase_type").value == "ITMT00007" || rawopen == false) {
                  //starts here             
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                    this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"], this.company_name),
                    this.DropDownListService.getItemNameById(data1["adv_item_code"], this.company_name),
                    // this.DropDownListService.gettaxcodefromgrn(data1["adv_item_code"],data["grn_id"])
                    this.DropDownListService.gettaxcodefromgrnnew(data1["adv_item_code"], data["grn_id"], data1["adv_packing"])
                  ).subscribe(([packingList, capacityEmptyWt, ItemGrp, taxid]) => {

                    this.status = true;
                    this.capacity[k] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
                    this.empty_bag_wt_priceBasedOn = capacityEmptyWt.empbagwt_based_on;
                    this.packingItem[k] = packingList;

                    this.ItemGr.push(ItemGrp["item_group"]);
                    this.TaxCode.push(taxid["tax_code"]);
                    this.HsnCode.push(ItemGrp["hsn_code"]);
                    this.TaxRate.push(data1["tax_rate"]);
                    //hsn_code

                    this.addItem();
                    // this.onChangeWarehouse1(data1.warehouse_name, k); // checked on 10-05-2022,need to be rectified latter
                    this.totalItem = this.totalItem + parseFloat(data1["amount"]);
                    this.totalDiscount = this.totalDiscount + parseFloat(data1["discount_amt"]);
                    this.totalTaxAmt = this.totalTaxAmt + parseFloat(data1["tax_amt"]);
                    this.totalNetAmt = this.totalNetAmt + parseFloat(data1["net_amt"]);
                    this.totalGrossAmt = this.totalGrossAmt + parseFloat(data1["gross_amt"]);
                    this.totalQcDeduction = this.totalQcDeduction + parseFloat(data1["qc_deduction"]);
                    this.totalNetAmtAfterDeduction = this.totalNetAmtAfterDeduction + parseFloat(data1["net_amt_after_qc"]);
                    this.pur_Bill_Item_Details.at(k).patchValue({
                      adv_item_code: data1["adv_item_code"], item_group: ItemGrp["item_group"], hsn_code: ItemGrp["hsn_code"],
                      adv_packing_item: data1["adv_packing"], passed_packing_uom: data1["pssd_pack_uom"],
                      passed_item_qty: data1["pssd_item_qty"], passed_mat_weight: (Math.round(data1["pssd_mat_wt"] * 1000) / 1000).toFixed(3),
                      passed_item_uom: data1["pssd_item_uom"], unit_rate: data1["unit_rate"], price_based_on: data1["price_based_on"],
                      amount: data1["amount"], discount: data1["discount"], discount_basedon: data1["discount_based_on"],
                      discount_amount: data1["discount_amt"], net_amount: data1["net_amt"], qc_deduction: data1["qc_deduction"],
                      net_amt_after_qc: data1["net_amt_after_qc"], tax_code: data1["tax_code"], warehouse: data1["warehouse_name"], stack: data1["rack"],
                      tax_rate: data1["tax_rate"], cgstamt: data1["cgstamt"], sgstamt: data1["sgstamt"], igstamt: data1["igstamt"], tax_amt: data1["tax_amt"],
                      gross_amt: data1["gross_amt"], passed_packing_qty: data1["pssd_pack_qty"], tax_name: taxid["tax_code"],
                      classified_item_name: data1["classified_item_name"]
                    });

                    console.log(" taxamount " + data1["tax_amt"])
                    k = k + 1;

                    //  this.chargematrixdata();
                    console.log("calculation" + this.totalItem + " / " + this.totalDiscount + " / " + this.totalTaxAmt + " / " + this.totalNetAmt)
                    console.log("calculation1" + this.totalQcDeduction + " / " + this.totalNetAmtAfterDeduction + " / " + this.add + " / " + this.sub)
                    console.log("calculation2" + this.alreadyPaid + " / " + this.totalGrossAmt)

                    this.calculatnew(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt,
                      this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
                      0, this.alreadyPaid, this.totalGrossAmt, 0)



                    //for //gstigst sgast starts here   
                    //timer(3000).subscribe
                    timer(0).subscribe
                      (x => {
                        const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);

                        this.addItemGrpHsn();
                        while (this.purchase_item_groupwise_hsnsumm.length)
                          this.purchase_item_groupwise_hsnsumm.removeAt(0);
                        for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                          let DiscountAmt = 0;
                          for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {
                            if (this.pur_Bill_Item_Details.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                              DiscountAmt += this.pur_Bill_Item_Details.at(k).get("amount").value - this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                            }
                          }
                          this.addItemGrpHsn();

                          this.purchase_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                        }
                      }
                      )
                    //timer(3500).subscribe
                    timer(0).subscribe
                      (x => {
                        const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);

                        this.addItemGrp();
                        while (this.purchase_item_groupwise_summ.length)
                          this.purchase_item_groupwise_summ.removeAt(0)
                        for (let j = 0; j < distinctArray.length; j++) {
                          let Amt = 0;
                          let Discount = 0;

                          for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                            if (this.pur_Bill_Item_Details.at(k).get("item_group").value == distinctArray[j]) {
                              Amt += this.pur_Bill_Item_Details.at(k).get("amount").value;
                              Discount += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                            }
                          }
                          this.addItemGrp();

                          this.purchase_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                          forkJoin(
                            this.Service.getItemGroupPurAcc(distinctArray[j]),
                          ).subscribe(([ItemgrpLedger]) => {
                            this.purchase_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total_gl_ac, discount_ledger: ItemgrpLedger.discount_gl_ac });

                            this.status = true;
                          });
                        }
                      }
                      )
                    //timer(4000).subscribe
                    timer(0).subscribe
                      (x => {
                        this.StateName = this.userForm.get("state").value;

                        console.log("State::" + this.StateName)
                        const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);

                        this.addItemGrpTax();
                        while (this.purchase_item_groupwise_taxsumm.length)
                          this.purchase_item_groupwise_taxsumm.removeAt(0)
                        for (let j = 0; j < distinctArrayTax.length; j++) {
                          let TaxRate = 0;
                          let TaxAmt = 0;
                          let cgst = 0;
                          let sgst = 0;
                          let igst = 0;

                          for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                            if (this.pur_Bill_Item_Details.at(k).get("tax_name").value == distinctArrayTax[j]) {
                              TaxRate = this.pur_Bill_Item_Details.at(k).get("tax_rate").value;
                              TaxAmt += this.pur_Bill_Item_Details.at(k).get("tax_amt").value;
                              cgst += this.pur_Bill_Item_Details.at(k).get("cgstamt").value;
                              sgst += this.pur_Bill_Item_Details.at(k).get("sgstamt").value;
                              igst += this.pur_Bill_Item_Details.at(k).get("igstamt").value;
                            }
                          }
                          this.addItemGrpTax();
                          this.purchase_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2), cgst: cgst.toFixed(2), sgst: sgst.toFixed(2), igst: igst.toFixed(2) });

                          if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                            console.log("tax code " + distinctArrayTax[j])
                            forkJoin(
                              this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                            ).subscribe(([TaxData]) => {
                              console.log("TaxData::" + JSON.stringify(TaxData))
                              if (TaxData) {
                                this.purchase_item_groupwise_taxsumm.at(j).patchValue({
                                  percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_input_ledger
                                  , sgstledgerid: TaxData.input_ledger, igstledgerid: TaxData.igst_input_ledger
                                });



                                this.status = true;

                                this.Tax_Rate = this.purchase_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                                this.StateName = this.userForm.get("state").value;

                                this.Tax_Amt = this.purchase_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

                                console.log(this.Tax_Amt + "state name tax :" + this.StateName)
                                /* if(this.StateName=='BIHAR')
                                {                         
                                  let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
                                  let Sgst =(this.Tax_Amt - Cgst);
                                  this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                }                  
                                else
                                {this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}
                              */


                                const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                                for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                  let Amount = 0;
                                  let DiscountAmt = 0;
                                  let Taxable_Amnt = 0;

                                  for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                    if (this.pur_Bill_Item_Details.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                      Amount += this.pur_Bill_Item_Details.at(k).get("amount").value;
                                      DiscountAmt += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;
                                      Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
                                      //  console.log("Taxable_Amnt : " +Taxable_Amnt)  
                                      // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                    }
                                  }
                                  this.purchase_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                                }
                              }

                              else {
                                //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                alert("something error is happened");
                              }

                            });
                          }


                        }
                      })

                    //gstigst sgast ends here                   
                  });
                  //ends
                }
                else {
                  //console.log("raw " + this.userForm.get("purchase_type").value)
                  //starts here             
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                    this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"], this.company_name),
                    this.DropDownListService.getChargesapplication(data["grn_id"]),
                    this.DropDownListService.getChargesMatrixdetails(data["grn_id"]),
                    this.DropDownListService.getItemNameById(data1["adv_item_code"], this.company_name),
                    this.DropDownListService.gettaxcodefromgrnnew(data1["adv_item_code"], data["grn_id"], data1["adv_packing"]),
                  ).subscribe(([packingList, capacityEmptyWt, chargesapp, chargematrix, ItemGrp,taxdata]) => {
                    this.status = true;
                    this.capacity[k] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
                    this.empty_bag_wt_priceBasedOn = capacityEmptyWt.empbagwt_based_on;
                    this.packingItem[k] = packingList;

                    this.ItemGr.push(ItemGrp["item_group"]);

                    if(this.userForm.get("purchase_type").value=='ITMT00003' || this.userForm.get("purchase_type").value=='ITMT00010'){  //fin & trading purchase
                      console.log("enter here else part fin purchase")
                      console.log("tax code:: "+ taxdata["tax_code"])
                      this.TaxCode.push(taxdata["tax_code"]);
                    }
                    else{
                      this.TaxCode.push(data1["tax_code"]);
                    }

                    //this.TaxCode.push(data1["tax_code"]);
                    this.HsnCode.push(ItemGrp["hsn_code"]);
                    this.TaxRate.push(data1["tax_rate"]);

                    this.addItem();
                    // this.onChangeWarehouse1(data1.warehouse_name, k); // checked on 10-05-2022,need to be rectified latter
                    this.totalItem = this.totalItem + parseFloat(data1["amount"]);
                    this.totalDiscount = this.totalDiscount + parseFloat(data1["discount_amt"]);
                    this.totalTaxAmt = this.totalTaxAmt + parseFloat(data1["tax_amt"]);
                    this.totalNetAmt = this.totalNetAmt + parseFloat(data1["net_amt"]);
                    this.totalGrossAmt = this.totalGrossAmt + parseFloat(data1["gross_amt"]);
                    this.totalQcDeduction = this.totalQcDeduction + parseFloat(data1["qc_deduction"]);
                    this.totalNetAmtAfterDeduction = this.totalNetAmtAfterDeduction + parseFloat(data1["net_amt_after_qc"]);
                    this.pur_Bill_Item_Details.at(k).patchValue({
                      adv_item_code: data1["adv_item_code"], item_group: ItemGrp["item_group"], hsn_code: ItemGrp["hsn_code"],
                      adv_packing_item: data1["adv_packing"], passed_packing_uom: data1["pssd_pack_uom"],
                      passed_item_qty: data1["pssd_item_qty"], passed_mat_weight: (Math.round(data1["pssd_mat_wt"] * 1000) / 1000).toFixed(3),
                      passed_item_uom: data1["pssd_item_uom"], unit_rate: data1["unit_rate"], price_based_on: data1["price_based_on"],
                      amount: data1["amount"], discount: data1["discount"], discount_basedon: data1["discount_based_on"],
                      discount_amount: data1["discount_amt"], net_amount: data1["net_amt"], qc_deduction: data1["qc_deduction"],
                      net_amt_after_qc: data1["net_amt_after_qc"], tax_code: data1["tax_code"], warehouse: data1["warehouse_name"], stack: data1["rack"],
                      tax_name: data1["tax_id"],tax_rate: data1["tax_rate"], cgstamt: data1["cgstamt"], sgstamt: data1["sgstamt"], igstamt: data1["igstamt"], tax_amt: data1["tax_amt"], gross_amt: data1["gross_amt"], passed_packing_qty: data1["pssd_pack_qty"]
                    });

                    k = k + 1;

                    this.add7();
                    while (this.pur_Bill_app_chgs.length)
                      this.pur_Bill_app_chgs.removeAt(0);
                    for (let data1 of chargematrix)
                      this.add7();
                    this.pur_Bill_app_chgs.patchValue(chargematrix);


                    this.chargematrixdata();

                    this.calculatnew(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt,
                      this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
                      0, this.alreadyPaid, this.totalGrossAmt, this.userForm.get("claim1").value)


                    //for //gstigst sgast starts here   
                    timer(0).subscribe
                      (x => {
                        const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);

                        this.addItemGrpHsn();
                        while (this.purchase_item_groupwise_hsnsumm.length)
                          this.purchase_item_groupwise_hsnsumm.removeAt(0);
                        for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                          let DiscountAmt = 0;
                          for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {
                            if (this.pur_Bill_Item_Details.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                              DiscountAmt += this.pur_Bill_Item_Details.at(k).get("amount").value - this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                            }
                          }
                          this.addItemGrpHsn();

                          this.purchase_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                        }
                      }
                      )
                    timer(0).subscribe
                      (x => {
                        const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);

                        this.addItemGrp();
                        while (this.purchase_item_groupwise_summ.length)
                          this.purchase_item_groupwise_summ.removeAt(0)
                        for (let j = 0; j < distinctArray.length; j++) {
                          let Amt = 0;
                          let Discount = 0;

                          for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                            if (this.pur_Bill_Item_Details.at(k).get("item_group").value == distinctArray[j]) {
                              Amt += this.pur_Bill_Item_Details.at(k).get("amount").value;
                              Discount += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;

                            }
                          }
                          this.addItemGrp();

                          this.purchase_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                          forkJoin(
                            this.Service.getItemGroupPurAcc(distinctArray[j]),
                          ).subscribe(([ItemgrpLedger]) => {
                            this.purchase_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total_gl_ac, discount_ledger: ItemgrpLedger.discount_gl_ac });

                            this.status = true;
                          });
                        }
                      }
                      )
                    //timer(10000).subscribe
                    timer(0).subscribe
                      (x => {
                        this.StateName = this.userForm.get("state").value;
                        const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                        console.log("ENTER TAX :: " + distinctArrayTax)
                        this.addItemGrpTax();
                        while (this.purchase_item_groupwise_taxsumm.length)
                          this.purchase_item_groupwise_taxsumm.removeAt(0)
                        for (let j = 0; j < distinctArrayTax.length; j++) {
                          let TaxRate = 0;
                          let TaxAmt = 0;
                          let cgst = 0;
                          let sgst = 0;
                          let igst = 0;
                          console.log("ENTER TAX array length :: " + distinctArrayTax.length +" /pur item len/ "+this.pur_Bill_Item_Details.length)
                          for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {
                            console.log("item Pur Tax:: "+this.pur_Bill_Item_Details.at(k).get("tax_name").value+" // "+distinctArrayTax[j]
                            +" // "+this.pur_Bill_Item_Details.at(k).get("igstamt").value)
                            if (this.pur_Bill_Item_Details.at(k).get("tax_name").value == distinctArrayTax[j]) {
                              TaxRate = this.pur_Bill_Item_Details.at(k).get("tax_rate").value;
                              TaxAmt += this.pur_Bill_Item_Details.at(k).get("tax_amt").value;
                              cgst += this.pur_Bill_Item_Details.at(k).get("cgstamt").value;
                              sgst += this.pur_Bill_Item_Details.at(k).get("sgstamt").value;
                              igst += this.pur_Bill_Item_Details.at(k).get("igstamt").value;
                            }
                          }
                          this.addItemGrpTax();
                          console.log(" Pur gst Tax:: "+TaxRate.toFixed(2)+" // "+TaxAmt.toFixed(2)
                            +" // "+cgst.toFixed(2)+" // "+sgst.toFixed(2)+" // "+igst.toFixed(2))
                          this.purchase_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2), cgst: cgst.toFixed(2), sgst: sgst.toFixed(2), igst: igst.toFixed(2) });

                          if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                            console.log("tax code " + distinctArrayTax[j])
                            forkJoin(
                              this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                            ).subscribe(([TaxData]) => {

                              if (TaxData) {
                                this.purchase_item_groupwise_taxsumm.at(j).patchValue({
                                  percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_input_ledger
                                  , sgstledgerid: TaxData.input_ledger, igstledgerid: TaxData.igst_input_ledger
                                });

                                this.status = true;

                                this.Tax_Rate = this.purchase_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                                this.StateName = this.userForm.get("state").value;
                                this.Tax_Amt = this.purchase_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


                                /* if(this.StateName=='BIHAR')
                                 {                         
                                   let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
                                   let Sgst =(this.Tax_Amt - Cgst);
                                   this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                 }                  
                                 else
                                 {this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}
                               */

                                const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                                for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                  let Amount = 0;
                                  let DiscountAmt = 0;
                                  let Taxable_Amnt = 0;

                                  for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                                    if (this.pur_Bill_Item_Details.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                      Amount += this.pur_Bill_Item_Details.at(k).get("amount").value;
                                      DiscountAmt += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;
                                      Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
                                      //  console.log("Taxable_Amnt : " +Taxable_Amnt)  
                                      // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                    }
                                  }
                                  this.purchase_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                                }
                              }

                              else {
                                //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                alert("something error is happened");
                              }

                            });
                          }


                        }
                      })

                    //gstigst sgast ends here            
                  });
                  //ends


                }


              }
            }


          }
        });
      }
      else {
        alert("Select Supplier Name and Item Sub Type First!")

      }
    }




  }

  showPopUp1(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index };
    const dialogRef = this.dialog.open(TaxPopUpModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => { this.pur_Bill_Item_Details.at(index).patchValue({ tax_rate: data["tax_rate"], tax_code: data["tax_id"] }); });
  }

  send() {
    // this.status=false;
    if (this.userForm.get("item_type").value == null) {
      this.userForm.patchValue({ item_type: true })
    }
    // alert(this.userForm.get("item_type").value);

    this.PurBillId = this.userForm.get("id").value as FormControl
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"), username: localStorage.getItem("username")
    });
    this.submitted = true;
    let trucknu: boolean = true;

    if (this.userForm.get("purchase_type").value == "ITMT00004" || this.userForm.get("purchase_type").value == "ITMT00005" || this.userForm.get("purchase_type").value == "ITMT00002" || this.userForm.get("purchase_type").value == "ITMT00007" || this.userForm.get("referance_type").value == "OPEN GRN") {
      trucknu = false;
    }

    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {
      //alert("chk status"+this.claimClickShow)
      if (this.userForm.get("purchase_type").value == "0") {
        alert("Please Select Service / Item Sub Type");
        this.status = true;
      }
      else if (this.userForm.get("purchase_subtype").value == "0") {
        alert("Please Select Purchase Sub Type");
        this.status = true;
      }
      else if (this.userForm.get("supplier_name").value == "0") {
        alert("Please Select Supplier Name");
        this.status = true;
      }
      else if (this.userForm.get("created_by").value == "0") {
        alert("Please Select Created By");
        this.status = true;
      }
      else if (trucknu == true && this.userForm.get("truck_no").value == "0") {
        console.log("hello :: " + this.userForm.get("purchase_type").value)
        alert("Please Select Truck No");
        this.status = true;
      }
      else if (this.userForm.get("supp_ref_docno").value == "" || this.userForm.get("supp_ref_docno").value == null) {
        alert("Please Enter Supplier Ref. Document No.");
        this.status = true;
      }
      else if (this.userForm.get("supp_ref_doc_date").value == "" || this.userForm.get("supp_ref_doc_date").value == null) {
        alert("Please Enter Supplier Ref. Document Date");
        this.status = true;
      }
      else if (Number(this.userForm.get("add1").value) > 0 && (this.userForm.get("add1_gl_ac").value == '' || this.userForm.get("add1_gl_ac").value == null || this.userForm.get("add1_gl_ac").value == 0)) {
        alert("Please Select Add(+) Ledger Account");
        this.status = true;
      }
      else if (Number(this.userForm.get("add1").value) > 0 && (this.userForm.get("add1_remarks").value == '' || this.userForm.get("add1_remarks").value == null)) {
        alert("Please Enter Remarks for Add(+)");
        this.status = true;
      }
      else if (Number(this.userForm.get("add2").value) > 0 && (this.userForm.get("add2_gl_ac").value == '' || this.userForm.get("add2_gl_ac").value == null || this.userForm.get("add2_gl_ac").value == 0)) {
        alert("Please Select Add(-) Ledger Account");
        this.status = true;
      }
      else if (Number(this.userForm.get("add2").value) > 0 && (this.userForm.get("add2_remarks").value == '' || this.userForm.get("add2_remarks").value == null)) {
        alert("Please Enter Remarks for Add(-)");
        this.status = true;
      }
      else if ((Number(this.userForm.get("roundoff_amt").value) > 0 || Number(this.userForm.get("roundoff_amt").value) > 0) && (this.userForm.get("roundoff_gl_ac").value == '' || this.userForm.get("roundoff_gl_ac").value == null || this.userForm.get("roundoff_gl_ac").value == 0)) {
        alert("Please Select Round Off Ledger Account");
        this.status = true;
      }//closed on 12 10 by tuhin 
      // else if(this.claimClickShow==false && trucknu ==true)
      // {
      //   alert("Please Click CLAIM / DEDUCTION Tab")
      //   this.status=true;
      // }
      // else if((this.userForm.get("tot_amt").value=='' || this.userForm.get("tot_amt").value==null) && (trucknu ==true))
      // {
      //   alert("Please Check Data in CLAIM / DEDUCTION Tab")
      //   this.status=true;
      // }
      else {


        for (let i = 0; i < this.pur_Bill_Item_Details.length; i++) {
          if (this.pur_Bill_Item_Details.at(i).get("adv_item_code").value == "0") {
            alert("Please Select item Name");
            this.status = true;
          }

        }
        if (this.itemname == false) {
          this.status = true;
        }

        else {


          if (this.PurBillId > 0) {
            this.status = false;
            this.Service.updatePurBill(this.userForm.getRawValue(), this.PurBillId).subscribe(data => {
              console.log(this.userForm.value);
              this.status = true;
              alert("Purchase Bill Updated successfully.");
              this.userForm.reset();
              this.ngOnInit();
              this.showList("list");
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
          }
          else {
            this.status = false;

            this.Service.createPurchaseBill(this.userForm.getRawValue()).subscribe(data => {
              this.status = true;
              //console.log(this.userForm.value);
              alert("New Purchase Bill created successfully.");
              this.userForm.reset();
              this.ngOnInit();
              this.showList("list");
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
          }


        }
      }
    }
  }
  // pur_Bill_Item_Details

  HsnCode1 = [];
  TaxCode1 = [];
  TaxRate1 = [];
  ItemGr1 = [];
  StateName1: any;
  onUpdate(id: any, pbid: string, action) {
    this.purchasebillsave = true;
    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    if (action == 'view') { this.action = 'view'; }
    else { this.action = 'update'; }
    forkJoin(
      this.Service.purBillRetriveList(id),
      this.Service.purBillItemRetriveList(pbid),
      this.Service.purBillMusterRollRetriveList(pbid),
      this.Service.purBillTaxInfoRetriveList(pbid),
      this.Service.purBillBrokerRetriveList(pbid),
      this.Service.purBillBpDtlsRetriveList(pbid),
      this.Service.purBillAccountInfoRetriveList(pbid),
      this.Service.purBillDocsRetriveList(pbid),
      this.Service.purBillAppChargesRetriveList(pbid),
      this.Service.purBillStoreChargesRetriveList(pbid)
    ).subscribe(([purBillData, itemData, MusterrollData,
      TaxInfo, brokerData, Bpdetails, AccountData, DocsData, appCharges, storedate]) => {
      this.onChangeServicesItemSubType(purBillData["purchase_type"], 'update');
      console.log("BillDetails:" + JSON.stringify(purBillData))
      this.srvItemSubType = purBillData["purchase_type"];
      this.srvItemType = purBillData["ser_item_type"];
      this.currentDate = purBillData["bill_date"];
      this.totalItem = purBillData["item_total"];
      this.totalDiscount = purBillData["discount"];
      this.totalNetAmt = purBillData["net_amt"];
      this.totalQcDeduction = purBillData["qc_deduction"];
      this.totalNetAmtAfterDeduction = purBillData["amt_after_deduction"];
      this.totalTaxAmt = purBillData["add_tax"];
      this.totalGrossAmt = purBillData["post_tax_amt"];
      this.add = purBillData["add1"];
      this.sub = purBillData["add2"];
      this.otherCharges = purBillData["other_charges"];
      this.alreadyPaid = purBillData["already_paid"];
      this.onChangeSupplierName(purBillData["supplier_name"]);
      this.onChangeBussinessUnit(purBillData["business_unit"], 'update');

      this.userForm.patchValue({
        id: purBillData["id"], pbid: purBillData["pbid"], pur_bill_no: purBillData["pur_bill_no"],
        bill_date: purBillData["bill_date"], supplier_name: purBillData["supplier_name"], ser_item_type: purBillData["ser_item_type"],
        ser_item_subtype: purBillData["purchase_type"], created_by: purBillData["created_by"], truck_no: purBillData["truck_no"],
        remarks: purBillData["remarks"], company_id: purBillData["company_id"], fin_year: purBillData["fin_year"], purchase_type: purBillData["purchase_type"], purchase_subtype: purBillData["purchase_subtype"],
        item_total: purBillData["item_total"], item_total_gl_ac: purBillData["item_total_gl_ac"], discount: purBillData["discount"], discount_gl_ac: purBillData["discount_gl_ac"],
        qc_deduction: purBillData["qc_deduction"], net_amt: purBillData["net_amt"], net_amt_gl_ac: purBillData["net_amt_gl_ac"],
        qc_deduction_gl_ac: purBillData["qc_deduction_gl_ac"], amt_after_deduction: purBillData["amt_after_deduction"], amt_after_deduction_gl_ac: purBillData["amt_after_deduction_gl_ac"],
        add_tax: purBillData["add_tax"], add_tax_gl_ac: purBillData["add_tax_gl_ac"], post_tax_amt: purBillData["post_tax_amt"],
        roundoff_amt: purBillData["roundoff_amt"], roundoff_gl_ac: purBillData["roundoff_gl_ac"], payable_party: purBillData["payable_party"],
        payable_party_gl_ac: purBillData["payable_party_gl_ac"], already_paid: purBillData["already_paid"], already_paid_gl_ac: purBillData["already_paid_gl_ac"],
        post_tax_amt_gl_ac: purBillData["post_tax_amt_gl_ac"], other_charges: purBillData["other_charges"], other_charges_gl_ac: purBillData["other_charges_gl_ac"],
        net_payable_party: purBillData["net_payable_party"], net_payable_party_gl_ac: purBillData["net_payable_party_gl_ac"],
        payable_amt: purBillData["payable_amt"], payable_amt_gl_ac: purBillData["payable_amt_gl_ac"], add1: purBillData["add1"],
        add1_gl_ac: purBillData["add1_gl_ac"], add2: purBillData["add2"], add2_gl_ac: purBillData["add2_gl_ac"],
        upfrontbrokerage: purBillData["upfrontbrokerage"], upfrontbrokerage_gl_ac: purBillData["upfrontbrokerage_gl_ac"],
        claim1: purBillData["claim1"], claim1_gl_ac: purBillData["claim1_gl_ac"], claim2: purBillData["claim2"], claim2_gl_ac: purBillData["claim2_gl_ac"],
        app_chgs_id: purBillData["app_chgs_id"], tot_amt: purBillData["tot_amt"], add1_remarks: purBillData["add1_remarks"], add2_remarks: purBillData["add2_remarks"], referance_type: purBillData["referance_type"]
        , supp_ref_doc: purBillData["supp_ref_doc"], supp_ref_docno: purBillData["supp_ref_docno"], supp_ref_doc_date: purBillData["supp_ref_doc_date"],
        referance_id: purBillData["referance_id"], state: purBillData["state"], store_charges: purBillData["store_charges"],
        store_taxamt: purBillData["store_taxamt"], allstorecharges: purBillData["allstorecharges"], store_frieghtcharges: purBillData["store_frieghtcharges"],
        store_frieghtcharges_gl_ac: purBillData["store_frieghtcharges_gl_ac"]
      });

      console.log("itemData: " + JSON.stringify(itemData));
      let k = 0;
      this.addItem()
      this.item_sl_no = 0;
      while (this.pur_Bill_Item_Details.length)
        this.pur_Bill_Item_Details.removeAt(0);
      for (let data1 of itemData) {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
          this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing_item"], this.company_name),
          //this.DropDownListService.gettaxcodefromgrnnew(data1["adv_item_code"], purBillData["referance_id"], data1["adv_packing_item"])
          this.DropDownListService.gettaxcodefromgrnnewMulti(data1["adv_item_code"], purBillData["referance_id"], data1["adv_packing_item"])
        ).subscribe(([packingList, capacityEmptyWt, taxid]) => {
          this.status = true;
          this.addItem();
          this.onChangeWarehouse(data1.warehouse, k);
          this.packingItem[k] = packingList;
          this.capacity[k] = capacityEmptyWt["capacity"];
          this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
          this.pur_Bill_Item_Details.at(k).patchValue(data1);


          this.HsnCode1.push(data1["hsn_code"]);
          this.TaxCode1.push(taxid["tax_code"]);
          this.TaxRate1.push(data1["tax_rate"]);
          this.ItemGr1.push(data1["item_group"]);

          k = k + 1;
        });
      }

      //new gst igst sgst starts here 

      timer(1000).subscribe
        (x => {
          const distinctArrayHsnCode: any = [] = this.HsnCode1.filter((n, i) => this.HsnCode1.indexOf(n) === i);
          // console.log("distinctArrayHsnCode: "+distinctArrayHsnCode);
          this.addItemGrpHsn();
          while (this.purchase_item_groupwise_hsnsumm.length)
            this.purchase_item_groupwise_hsnsumm.removeAt(0);
          for (let j = 0; j < distinctArrayHsnCode.length; j++) {
            let DiscountAmt = 0;
            for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

              if (this.pur_Bill_Item_Details.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                DiscountAmt += this.pur_Bill_Item_Details.at(k).get("amount").value - this.pur_Bill_Item_Details.at(k).get("discount_amount").value;
                //  console.log("DiscountAmt:"+DiscountAmt);              
              }
            }
            this.addItemGrpHsn();
            // console.log("hsn_code  :"+distinctArrayHsnCode[j]); // 1, "string", false
            this.purchase_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt.toFixed(2) });
          }
        }
        )

      timer(1000).subscribe
        (x => {

          // console.log("ItemGrLength: "+this.ItemGr1.length);
          const distinctArray: any = [] = this.ItemGr1.filter((n, i) => this.ItemGr1.indexOf(n) === i);
          // console.log("distinctArray: "+distinctArray);
          //let j=0
          this.addItemGrp();
          while (this.purchase_item_groupwise_summ.length)
            this.purchase_item_groupwise_summ.removeAt(0)
          for (let j = 0; j < distinctArray.length; j++) {
            let Amt = 0;
            let Discount = 0;

            for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

              if (this.pur_Bill_Item_Details.at(k).get("item_group").value == distinctArray[j]) {
                Amt += this.pur_Bill_Item_Details.at(k).get("amount").value;
                Discount += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;
                // console.log("Amt:"+Amt);   
                // console.log("Discount : "+Discount);                    
              }
            }
            this.addItemGrp();
            //console.log("Item  :"+distinctArray[j]); // 1, "string", false
            this.purchase_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt.toFixed(2), discount_amt: Discount.toFixed(2) });

            forkJoin(
              this.Service.getItemGroupPurAcc(distinctArray[j]),
            ).subscribe(([ItemgrpLedger]) => {
              this.purchase_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total_gl_ac, discount_ledger: ItemgrpLedger.discount_gl_ac });

              this.status = true;
            });
          }
        }
        )

      timer(1000).subscribe
        (x => {
          this.StateName1 = this.userForm.get("state").value;
          //  console.log("TaxCodeLength: "+this.TaxCode1.length);
          const distinctArrayTax: any = [] = this.TaxCode1.filter((n, i) => this.TaxCode1.indexOf(n) === i);
          //  console.log("distinctArrayTax: "+distinctArrayTax);

          this.addItemGrpTax();
          while (this.purchase_item_groupwise_taxsumm.length)
            this.purchase_item_groupwise_taxsumm.removeAt(0)
          for (let j = 0; j < distinctArrayTax.length; j++) {
            let TaxRate = 0;
            let TaxAmt = 0;

            for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

              if (this.pur_Bill_Item_Details.at(k).get("tax_name").value == distinctArrayTax[j]) {
                TaxRate = this.pur_Bill_Item_Details.at(k).get("tax_rate").value;
                TaxAmt += this.pur_Bill_Item_Details.at(k).get("tax_amt").value;

              }
            }
            this.addItemGrpTax();
            //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
            this.purchase_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

            if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
              console.log("tax code " + distinctArrayTax[j])
              forkJoin(
                this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
              ).subscribe(([TaxData]) => {

                if (TaxData) {
                  this.purchase_item_groupwise_taxsumm.at(j).patchValue({
                    percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_input_ledger
                    , sgstledgerid: TaxData.input_ledger, igstledgerid: TaxData.igst_input_ledger
                  });

                  this.status = true;

                  this.Tax_Rate = this.purchase_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                  this.StateName1 = this.userForm.get("state").value;
                  this.Tax_Amt = this.purchase_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


                  /*  if(this.StateName1 =='BIHAR')
                    {                         
                      let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
                      let Sgst =(this.Tax_Amt - Cgst);
                      this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                    }                  
                   else
                    {this.purchase_item_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}
                  */

                  const distinctArrayTaxRate: any = [] = this.TaxRate1.filter((n, i) => this.TaxRate1.indexOf(n) === i);

                  for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                    let Amount = 0;
                    let DiscountAmt = 0;
                    let Taxable_Amnt = 0;
                    let cgst = 0;
                    let sgst = 0;
                    let igst = 0;

                    for (let k = 0; k < this.pur_Bill_Item_Details.length; k++) {

                      if (this.pur_Bill_Item_Details.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                        Amount += this.pur_Bill_Item_Details.at(k).get("amount").value;
                        DiscountAmt += this.pur_Bill_Item_Details.at(k).get("discount_amount").value;
                        Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
                        cgst += this.pur_Bill_Item_Details.at(k).get("cgstamt").value;
                        sgst += this.pur_Bill_Item_Details.at(k).get("sgstamt").value;
                        igst += this.pur_Bill_Item_Details.at(k).get("igstamt").value;
                        // console.log("Taxable_Amnt : " +Taxable_Amnt)  
                        // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                      }
                    }
                    this.purchase_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2), cgst: cgst.toFixed(2), sgst: sgst.toFixed(2), igst: igst.toFixed(2) });
                  }
                }

                else {
                  //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                  alert("something error is happened");
                }

              });
            }

          }
        }
        )




      //new gst igst sgst ends here 
      this.addMusterRoll()
      while (this.pur_Bill_Musterroll_Details.length)
        this.pur_Bill_Musterroll_Details.removeAt(0);
      for (let data1 of MusterrollData)
        this.addMusterRoll();
      this.pur_Bill_Musterroll_Details.patchValue(MusterrollData);
      //console.log("Musterdata: "+JSON.stringify(MusterrollData));

      // console.log("Tax details: "+  JSON.stringify(TaxInfo));
      this.pur_Bill_Tax_Info.patchValue(TaxInfo);

      this.addBroker();
      this.broker_sl_no = 0;
      while (this.pur_Bill_Broker_Details.length)
        this.pur_Bill_Broker_Details.removeAt(0);
      for (let data1 of brokerData)
        this.addBroker();
      this.pur_Bill_Broker_Details.patchValue(brokerData);
      //  console.log("brokerData: "+JSON.stringify(brokerData));

      // console.log("BP data: "+  JSON.stringify(Bpdetails));
      this.pur_Bill_Bp_Details.patchValue(Bpdetails);

      //  console.log("Account: "+  JSON.stringify(AccountData));
      this.pur_Bill_Account_Info.patchValue(AccountData);

      this.addDocument()
      while (this.pur_Bill_Docs.length)
        this.pur_Bill_Docs.removeAt(0);
      for (let data1 of DocsData)
        this.addDocument();
      this.pur_Bill_Docs.patchValue(DocsData);
      // console.log("docData: "+JSON.stringify(appCharges));

      console.log("docData: " + JSON.stringify(appCharges));
      this.add7();
      while (this.pur_Bill_app_chgs.length)
        this.pur_Bill_app_chgs.removeAt(0);
      for (let data1 of appCharges)
        this.add7();
      this.pur_Bill_app_chgs.patchValue(appCharges);



      this.addStoreCharge();
      while (this.pur_bill_store_chgs.length)
        this.pur_bill_store_chgs.removeAt(0);
      for (let storedatalist of storedate) {
        this.addStoreCharge();
        this.pur_bill_store_chgs.patchValue(storedate);
      }

      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }
  }



  calculateamoutnafterdeduction() {
    //alert(this.userForm.get("upfrontbrokerage").value + " / " + this.userForm.get("claim1").value +" /" +this.userForm.get("claim2").value )
    let calculateamoutnafterdeduction = Number(this.userForm.get("net_amt").value) - Number(this.userForm.get("qc_deduction").value) - Number(this.userForm.get("upfrontbrokerage").value) - Number(this.userForm.get("claim1").value) - Number(this.userForm.get("claim2").value);
    let posttaxamount = calculateamoutnafterdeduction + Number(this.userForm.get("add_tax").value);
    this.userForm.patchValue({ amt_after_deduction: calculateamoutnafterdeduction, post_tax_amt: posttaxamount });
    this.userForm.patchValue({ payable_amt: posttaxamount, payable_party: posttaxamount, net_payable_party: posttaxamount })

  }


  newCalculation() {
    // alert(this.userForm.get("other_charges").value);
    /*this.userForm.get("item_total").value
    this.userForm.get("discount").value
    this.userForm.get("net_amt").value
    this.userForm.get("qc_deduction").value
    this.userForm.get("upfrontbrokerage").value
    this.userForm.get("claim1").value
    this.userForm.get("claim2").value
    this.userForm.get("amt_after_deduction").value
    this.userForm.get("add_tax").value
    this.userForm.get("post_tax_amt").value
    this.userForm.get("other_charges").value
    this.userForm.get("payable_amt").value
    this.userForm.get("add1").value
    this.userForm.get("add2").value
    this.userForm.get("roundoff_amt").value
    this.userForm.get("payable_party").value
    this.userForm.get("already_paid").value
    this.userForm.get("net_payable_party").value*/


    let amt_after_deduction = Number(this.userForm.get("net_amt").value) - (Number(this.userForm.get("qc_deduction").value) + Number(this.userForm.get("upfrontbrokerage").value) + Number(this.userForm.get("claim1").value) + Number(this.userForm.get("claim2").value));

    let post_tax_amt = Number(amt_after_deduction) + Number(this.userForm.get("add_tax").value);
    console.log(this.userForm.get("amt_after_deduction").value + " / " + this.userForm.get("add_tax").value + " / " + amt_after_deduction);
    let payable_amt = Number(this.userForm.get("post_tax_amt").value) + Number(this.userForm.get("other_charges").value);

    let payable_party = Number(this.userForm.get("payable_amt").value) + Number(this.userForm.get("add1").value) + Number(this.userForm.get("roundoff_amt").value) - Number(this.userForm.get("add2").value);

    let net_payable_party = Number(payable_party) - Number(this.userForm.get("already_paid").value);

    console.log("net_payable_party :: " + net_payable_party + " / " + payable_party)
    this.userForm.patchValue({ amt_after_deduction: Number(amt_after_deduction).toFixed(2), post_tax_amt: Number(post_tax_amt).toFixed(2), payable_amt: Number(payable_amt).toFixed(2), payable_party: Number(payable_party).toFixed(2), net_payable_party: Number(net_payable_party).toFixed(2) })


  }

  accountpostingpopup(id, purbillid, business_unit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;
    let comp = this.company_name;

    dialogref = this.dialog.open(PurBillAccountpostingComponent, {
      data: { id: id, purbillid: purbillid, company_name: comp, business_unit: business_unit }, height: '80%',
      width: '60%'
    });
    dialogref.afterClosed().subscribe(data => {
      if (data.response_return == 1) {
        this.listPurchaseBill.find(data => {
          return data.pur_bill_id == purbillid;
        }).export = 1;
      }
      if (data.response_return == 0) {
        this.listPurchaseBill.find(data => {
          return data.pur_bill_id == purbillid;
        }).export = 0;
      }
    });
  }

  chargematrixdata() {
    console.log("hello ::")
    let totalamount: number = 0, totalchargematrix: number = 0;
    this.requiredmatrixdisable = [];
    for (let i = 0; i < this.pur_Bill_Item_Details.length; i++) {

      if (this.pur_Bill_Item_Details.at(i).get("price_based_on").value == "Packing") {
        totalamount += Number(this.pur_Bill_Item_Details.at(i).get("passed_packing_qty").value);
      }
      if (this.pur_Bill_Item_Details.at(i).get("price_based_on").value == "With Packing") {
        totalamount += Number(this.pur_Bill_Item_Details.at(i).get("passed_item_qty").value);
      }
      if (this.pur_Bill_Item_Details.at(i).get("price_based_on").value == "Without Packing") {
        totalamount += Number(this.pur_Bill_Item_Details.at(i).get("passed_mat_weight").value);
      }


      for (let v = 0; v < this.pur_Bill_app_chgs.length; v++) {

        if (this.pur_Bill_app_chgs.at(v).get("rate_cal_method").value == "UOM") {

          this.pur_Bill_app_chgs.at(v).patchValue({ amount: (Math.round(Number(totalamount * (Number(this.pur_Bill_app_chgs.at(v).get("app_rate").value))))) })
        }
        if (this.pur_Bill_app_chgs.at(v).get("rate_cal_method").value == "%") {
          this.pur_Bill_app_chgs.at(v).patchValue({ amount: (Math.round(Number(totalamount * (Number(this.pur_Bill_app_chgs.at(v).get("app_rate").value) / 100)))) })
        }
        if (this.pur_Bill_app_chgs.at(v).get("rate_cal_method").value == "Fixed") {
          this.pur_Bill_app_chgs.at(v).patchValue({ amount: (Math.round(Number(this.pur_Bill_app_chgs.at(v).get("app_rate").value))) })
        }
        if (this.pur_Bill_app_chgs.at(v).get("required").value == "Yes")//requiredmatrixdisable
        {
          this.requiredmatrixdisable[v] = true;
        }
        else {
          this.requiredmatrixdisable[v] = false;
        }
        if (this.pur_Bill_app_chgs.at(v).get("add_less").value == 'less')//less means plus
        {
          totalchargematrix += Number(this.pur_Bill_app_chgs.at(v).get("amount").value);
        }
        else//add means -
        {
          totalchargematrix -= Number(this.pur_Bill_app_chgs.at(v).get("amount").value);
        }

      }

    }


    this.userForm.patchValue({ claim1: Number(totalchargematrix).toFixed(2), tot_amt: Number(totalchargematrix).toFixed(2) });



  }
  calratechargematrix(index) {
    console.log("11");
    let totalamount: number = 0, totalchargematrix: number = 0;

    console.log("obj")
    console.log(this.pur_Bill_app_chgs);
    console.log(this.pur_Bill_Item_Details);

    for (let i = 0; i < this.pur_Bill_Item_Details.length; i++) {

      if (this.pur_Bill_Item_Details.at(i).get("price_based_on").value == "Packing") {
        totalamount += Number(this.pur_Bill_Item_Details.at(i).get("passed_packing_qty").value);
      }
      if (this.pur_Bill_Item_Details.at(i).get("price_based_on").value == "With Packing") {
        totalamount += Number(this.pur_Bill_Item_Details.at(i).get("passed_item_qty").value);
      }
      if (this.pur_Bill_Item_Details.at(i).get("price_based_on").value == "Without Packing") {
        totalamount += Number(this.pur_Bill_Item_Details.at(i).get("passed_mat_weight").value);
      }

      for (let v = 0; v < this.pur_Bill_app_chgs.length; v++) {

        if (this.pur_Bill_app_chgs.at(v).get("rate_cal_method").value == "UOM") {

          this.pur_Bill_app_chgs.at(v).patchValue({ amount: (Math.round(Number(totalamount * (Number(this.pur_Bill_app_chgs.at(v).get("app_rate").value))))) })
        }
        if (this.pur_Bill_app_chgs.at(v).get("rate_cal_method").value == "%") {
          this.pur_Bill_app_chgs.at(v).patchValue({ amount: (Math.round(Number(totalamount * (Number(this.pur_Bill_app_chgs.at(v).get("app_rate").value) / 100)))) })
        }
        if (this.pur_Bill_app_chgs.at(v).get("rate_cal_method").value == "Fixed") {
          this.pur_Bill_app_chgs.at(v).patchValue({ amount: (Math.round(Number(this.pur_Bill_app_chgs.at(v).get("app_rate").value))) })
        }

        if (this.pur_Bill_app_chgs.at(v).get("add_less").value == 'less')//less means plus
        {
          totalchargematrix += Number(this.pur_Bill_app_chgs.at(v).get("amount").value);
        }
        else//add means -
        {
          totalchargematrix -= Number(this.pur_Bill_app_chgs.at(v).get("amount").value);
        }
      }

    }

    console.log("ame: " + totalchargematrix)

    this.userForm.patchValue({ claim1: Number(totalchargematrix).toFixed(2), tot_amt: Number(totalchargematrix).toFixed(2) });
    this.chargematrixcalculation();

  }

  chargematrixcalculation() {
    let totalchargematrix: number = 0;

    for (let v = 0; v < this.pur_Bill_app_chgs.length; v++) {
      //totalchargematrix += Number(this.pur_Bill_app_chgs.at(v).get("amount").value);
      if (this.pur_Bill_app_chgs.at(v).get("add_less").value == 'less')//less means plus
      {
        totalchargematrix += Number(this.pur_Bill_app_chgs.at(v).get("amount").value);
      }
      else//add means -
      {
        totalchargematrix -= Number(this.pur_Bill_app_chgs.at(v).get("amount").value);
      }
    }
    //console.log("totalchargematrix : "+totalchargematrix) 

    this.userForm.patchValue({ claim1: Number(totalchargematrix).toFixed(2), tot_amt: Number(totalchargematrix).toFixed(2) });



    this.calculatnew(this.userForm.get("item_total").value,
      this.userForm.get("discount").value,
      this.userForm.get("add_tax").value,
      this.userForm.get("net_amt").value,
      this.userForm.get("qc_deduction").value,
      Number(this.userForm.get("net_amt").value) - Number(this.userForm.get("qc_deduction").value),
      this.userForm.get("add1").value,
      this.userForm.get("add2").value,
      0,
      this.userForm.get("already_paid").value,
      this.userForm.get("post_tax_amt").value,
      totalchargematrix);





  }

  calculatnew(amt, dscAmt, taxAmt, netAmt, qcDeduction, netAmtAfterDeduction, add, sub,
    otherCharges, alreadyPaid, grossAmt, claimdeduction) {
    console.log(amt + " / " + dscAmt + " / " + taxAmt + " / " + netAmt + " / " + qcDeduction + " / " + netAmtAfterDeduction + " / " + add + " / " + sub + " / " +
      otherCharges + " / " + alreadyPaid + " / " + grossAmt + " / " + claimdeduction)
    let postamountcal: number = 0, amountdefuction: number = 0;
    let Allstorecharges = this.userForm.get("allstorecharges").value, Store_taxamt = this.userForm.get("store_taxamt").value;
    if (this.userForm.get("allstorecharges").value == null || this.userForm.get("allstorecharges").value == '') {
      Allstorecharges = 0;
    }
    if (this.userForm.get("store_taxamt").value == null || this.userForm.get("store_taxamt").value == '') {
      Store_taxamt = 0;
    }


    //amountdefuction = Number(netAmtAfterDeduction) - Number(claimdeduction) - Number(qcDeduction);//earlier
    amountdefuction = Number(netAmtAfterDeduction) - Number(claimdeduction) - Number(qcDeduction) + Number(Allstorecharges);

    // postamountcal = amountdefuction + Number(taxAmt);//earlier
    postamountcal = amountdefuction + Number(taxAmt) + Number(Store_taxamt);


    console.log("here :: " + amountdefuction + " / " + postamountcal + " / " + (Math.round(amt * 100) / 100).toFixed(2) + " / " + (Math.round(dscAmt * 100) / 100).toFixed(2) + " / " + (Math.round(taxAmt * 100) / 100).toFixed(2) + " / " + (Math.round(netAmt * 100) / 100).toFixed(2) + " / " + (Math.round(qcDeduction * 100) / 100).toFixed(2) + " / " + (Math.round(amountdefuction * 100) / 100).toFixed(2) + " / " + (Math.round(postamountcal * 100) / 100).toFixed(2) + " / " + (Math.round((postamountcal + add - sub))).toFixed(2) + " / " + (Math.round((postamountcal + add - sub - alreadyPaid))).toFixed(2))
    //store_taxamt
    //allstorecharges
    //claim1


    this.userForm.patchValue({
      item_total: (Math.round(amt * 100) / 100).toFixed(2),
      discount: (Math.round(dscAmt * 100) / 100).toFixed(2),
      add_tax: Number((Math.round(taxAmt * 100) / 100).toFixed(2)) + Number(Store_taxamt),
      net_amt: (Math.round(netAmt * 100) / 100).toFixed(2),
      //new add
      // claim1:Number(this.userForm.get("claim1").value)+Number(this.userForm.get("allstorecharges").value),
      store_frieghtcharges: Number(Allstorecharges),
      //new add ends
      qc_deduction: (Math.round(qcDeduction * 100) / 100).toFixed(2),
      amt_after_deduction: (Math.round(amountdefuction * 100) / 100).toFixed(2),
      post_tax_amt: (Math.round(postamountcal * 100) / 100).toFixed(2),
      payable_amt: (Math.round((postamountcal) * 100) / 100).toFixed(2),
      payable_party: (Math.round((postamountcal + add - sub))).toFixed(2),
      net_payable_party: (Math.round((postamountcal + add - sub - alreadyPaid))).toFixed(2)
    });



    this.calRoundOfFigure(postamountcal + add - sub);
  }

  delete(index) {
    if (this.pur_Bill_app_chgs.length > 0) {
      this.pur_Bill_app_chgs.removeAt(index);
      this.requiredmatrixdisable.splice(index, 1);
      this.chargematrixcalculation();
    }
    else { alert("can't delete all rows"); }
  }

  getIndexOfMatTab(event) {
    if (event.index == 7) {

      this.claimClickShow = true;
      // console.log("hi7"+this.claimClickShow)

    }

  }

  onDelete(id: any, grn_id) {
    this.status = false;
    if (confirm("Are you sure to delete this Purchase Bill ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deletePurchaseBill(this.userForm.getRawValue(), id).subscribe(data => {
        //  console.log("Broker :"+data.broker_code);
        if (data.pur_bill_id == '' || data.pur_bill_id == null) {
          alert("Opps!!! Can't delete this Purchase Bill !!!");
        } else {
          alert("Purchase Bill Deleted successfully.");
        }
        this.userForm.reset();
        this.status = true;
        this.isHidden = false;
        this.ngOnInit();
        this.showList("list");
      });
    }
    this.status = true;
  }

  getProducts(request) {
    // console.log("tuhin req "+request.size);
    this.DropDownListService.getPurBillPagination(request.page, request.size)
      .subscribe(data => {
        this.listPurchaseBill = data['content'];
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
  search() {
    let order1_no = this.userForm1.get("order1_no").value;
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let supplier_name1 = this.userForm1.get("supplier_name1").value;
    let pur_type1 = this.userForm1.get("pur_type1").value;

    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchPurBillFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&supplier_name1=" + supplier_name1 + "&pur_type1=" + pur_type1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listPurchaseBill = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Purchase Bill Not Found !!!")
      this.listPurchaseBill = [];
    })
  }


  deleteStoreCharge(index) {
    if (index) { this.pur_bill_store_chgs.removeAt(index); }
    else { alert("can't delete all rows"); }
  }

  addStoreCharge() {
    this.pur_bill_store_chgs.push(this.fb.group({
      charges_name: '',
      charges_acc: '',
      store_cgst: '',
      store_sgst: '',
      store_igst: '',
      store_amount: '',
      store_taxrate: ''
    }));
  }

}
