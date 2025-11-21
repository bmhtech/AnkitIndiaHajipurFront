import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesQuoTaxModalComponent } from '../sales-quo-tax-modal/sales-quo-tax-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { CreditNote } from '../../../../../../Models/SalesTransaction/credit-note';
import { SalesReturnNotePopUpComponent } from '../sales-return-note-pop-up/sales-return-note-pop-up.component';
import { SalesQcPopupComponent } from '../sales-qc-popup/sales-qc-popup.component';
import { forkJoin, timer } from 'rxjs';
import { ReturnApprovalNotePopUpComponent } from '../../components/return-approval-note-pop-up/return-approval-note-pop-up.component';
import { triggerAsyncId } from 'async_hooks';
import { MultipleSalesReturnPopupComponent } from '../multiple-sales-return-popup/multiple-sales-return-popup.component';
import { MultipleReturnApprovalPopupComponent } from '../multiple-return-approval-popup/multiple-return-approval-popup.component';
import { Alert } from 'selenium-webdriver';
import { CreditnoteaccountpostingComponent } from '../creditnoteaccountposting/creditnoteaccountposting.component';
import { CreditnotejobworkComponent } from '../creditnotejobwork/creditnotejobwork.component';
import { CreditnoteEinvoiceCancelComponent } from '../creditnote-einvoice-cancel/creditnote-einvoice-cancel.component';
import { CreditnoteEwaybillCancelComponent } from '../creditnote-ewaybill-cancel/creditnote-ewaybill-cancel.component';
import { eInvoiceGenerate } from '../../../../../../Models/SalesTransaction/eInvoiceGenerate';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.scss']
})

export class CreditNoteComponent implements OnInit {
  public userForm: FormGroup;
  model: CreditNote = new CreditNote();
  model1: eInvoiceGenerate = new eInvoiceGenerate();
  submitted = false;
  isHidden: any;
  currentDate: any;
  brokerNames: any = [];
  partyList: any = [];
  invoiceType: any = [];
  Id: any;
  isChecked1 = false;
  isChecked = false;
  isBankNameDisabled = false;
  ledgerNames: any = [];
  item_codes: any = [];
  selectedItemName: any = [];
  selectedPackingItem: any = [];
  payTerms: any = [];
  vehicleNoList: any = [];
  vehicleTypeList: any = [];
  acc_no: any;
  itemCode: any;
  businesslists: any = [];
  bank_names: any = [];
  _customerId: any;
  payment_termsList: any = [];
  packingItem: any = [];
  company_name: any;
  item_sl_no = 1;
  broker_sl_no = 1;
  listCreditNote: any = [];
  status: any;
  username: any;
  capacity: any = [];
  businessUnit: any;
  PartyAllList: any = [];
  transporter_sl_no = 1;
  financialYear: any;
  seqId: any;
  customerDelvAddList: any = [];
  contAddrs: any = [];
  delvAddrs: any = [];
  transporterNames: any = [];
  transporter_id: any;
  b_unit: any;
  defaultValue: any;
  totalItem: number = 0;
  totalDiscount: number = 0;
  totalNetAmt: number = 0;
  totalTaxAmt: number = 0;
  add: number = 0;
  sub: number = 0;
  appChargesAmt: number = 0;
  tcsAmt: number = 0;
  grandTotal: any;
  empty_bag_wt: any = [];
  action: any;
  partyNameList: any = [];
  appCharges: any;
  adj1: any;
  adj2: any;
  defaultChallan: any;
  creditnotesave: boolean = true;
  creditnoteupdate: boolean = true;
  creditnoteview: boolean = true;
  creditnotedelete: boolean = true;
  registeredstatus: boolean = false;
  einvoiceshow: boolean = false;
  ewaybillshow: boolean = false;
  jobwork_sl_no = 1;
  service_sl_no = 1;

  selectedJobPacking: any = [];
  selectedJobItem: any = [];
  jobpackinglist: any = [];
  selectedService: any = [];

  item_services: any = [];
  jobitemlist: any = [];
  taxcodelist: any = [];
  tax_list: any = [];
  anystate: any;
  statestatus: number = 0;
  cgstvalue: any;
  sgstvalue: any;
  igstvalue: any;
  jobtransaction: boolean = false;
  company_state:any;
  public einvoiceGeneration: FormGroup;
  public statusdto: FormGroup;
  public cancel: FormGroup;
  public ewaybillcreate: FormGroup;
  public ewaybillcancel: FormGroup;
  public responsedto: FormGroup;
  public ewaybillWOInvoiceGen: FormGroup;
  public userForm1: FormGroup;

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private Service: Master, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group(
      {
        id: [''],
        creditnoteno: [''],
        creditnoteid: [''],
        invoice_type: [''],
        business_unit: [''],
        creditnotetype: [''],
        creditnotedate: [''],
        state: [''],
        party: [''],
        challan: [''],
        e_invoice_no: [''],
        remarks: [''],
        grand_total: [''],
        brokage_app: [''],
        item_total: [''],
        item_total_gl_ac: [''],
        discount: [''],
        discount_gl_ac: [''],
        net_total: [''],
        net_total_gl_ac: [''],
        tax_total: [''],
        tax_total_gl_ac: [''],
        total_bill_amt: [''],
        total_bill_amt_gl_ac: [''],
        applicable_amt: [''],
        applicable_gl_ac: [''],
        adj1_amt: [''],
        adj1_gl_ac: [''],
        adj2_amt: [''],
        adj2_gl_ac: [''],
        roundoff_amt: [''],
        roundoff_gl_ac: [''],
        final_bill_amt: [''],
        final_bill_amt_gl_ac: [''],
        tcsamt: [''],
        tcsglac: [''],
        payable_amt: [''],
        payable_amt_gl_ac: [''],
        salesorderno: [''],
        salesorderdate: [''],
        allsalesorderdate: [''],
        refchallanno: [''],
        refchallandate: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        referance_id: [''],
        waybill: [''],

        sales_credit_note_trans_dtls: this.fb.array([this.fb.group({
          slno: this.transporter_sl_no,
          transname: '',
          vehicletype: '',
          vehicleno: '',
          ewaybillno: '',
          ewaybilldate: ''
        })]),

        credit_item_groupwise_summ: this.fb.array([this.fb.group({
          item_group: '',
          item_total: '',
          discount_amt: '',
          item_ledger: '',
          discount_ledger: ''
        })]),

        credit_item_groupwise_hsnsumm: this.fb.array([this.fb.group({
          hsn_code: '',
          amount: '',
        })]),

        credit_item_groupwise_taxsumm: this.fb.array([this.fb.group({
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


        sales_credit_note_docs: this.fb.array([this.fb.group({
          doc_name: ''
        })]),

        sales_credit_note_item_dtls: this.fb.array([this.fb.group({
          slno: this.item_sl_no,
          item_code: '',
          packing: '',
          hsn_code: '',
          item_group: '',
          quantity: '',
          uom: '',
          squantity: '',
          suom: '',
          mat_wt: '',
          price: '',
          price_based_on: '',
          amount: '',
          discount_type: '',
          discount_rate: '',
          discount_amt: '',
          tax_code: '',
          tax_rate: '',
          cgstamt: '',
          sgstamt: '',
          igstamt: '',
          tax_amt: '',
          total_amt: '',
          acc_norms: '',
          salesreturnnoteno: '',
          salesreturnnoteid: ''
        })]),

        sales_credit_note_tax_info: this.fb.group
          ({
            panno: '',
            tanno: '',
            cinno: '',
            gstno: ''
          }),

        sales_credit_note_shipment_dtls: this.fb.group({
          shipaddr: '',
          shipdtls: '',
          paytoaddr: '',
          paytodtls: ''
        }),

        sales_credit_note_payment_dtls: this.fb.group({
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
          mobile: ''
        }),

        sales_credit_note_bp_dtls: this.fb.group({
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

        sales_credit_note_broker_dtls: this.fb.array([this.fb.group(
          {
            slno: this.broker_sl_no,
            brokercode: '',
            basis: '',
            rate: ''
          })]),

        sales_credit_note_item_dtls_for_jobwork: this.fb.array([this.fb.group({
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

        sales_credit_note_item_dtls_for_jobwork_price: this.fb.array([this.fb.group({
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
        order1_no: [''],
        fromdate: [''],
        todate: [''],
        party1: [''],
      });

    this.einvoiceGeneration = fb.group(
      {
        Version: ['1.1'],
        ShipDtls: [''],
        TranDtls: this.fb.group({
          TaxSch: 'GST',
          SupTyp: '',
          IgstOnIntra: '',
          RegRev: '',
          EcmGstin: ''
        }),
        DocDtls: this.fb.group({
          Typ: 'INV',
          No: '',
          Dt: ''
        }),
        SellerDtls: this.fb.group({
          Gstin: '',
          LglNm: '',
          TrdNm: '',
          Addr1: '',
          Addr2: '',
          Loc: '',
          Pin: '',
          Stcd: '',
          Ph: '',
          Em: ''
        }),
        BuyerDtls: this.fb.group({
          Gstin: '',
          LglNm: '',
          TrdNm: '',
          Pos: '',
          Addr1: '',
          Addr2: '',
          Loc: '',
          Pin: '',
          Stcd: '',
          Ph: '',
          Em: ''
        }),
        ValDtls: this.fb.group({
          AssVal: '',
          IgstVal: '',
          CgstVal: '',
          SgstVal: '',
          StCesVal: '',
          Discount: '',
          OthChrg: '',
          RndOffAmt: '',
          TotInvVal: ''
        }),
        ItemList: this.fb.array([this.fb.group({
          SlNo: '',
          PrdDesc: '',
          IsServc: '',
          HsnCd: '',
          Qty: '',
          Unit: '',
          UnitPrice: '',
          TotAmt: '',
          Discount: '',
          PreTaxVal: '',
          AssAmt: '',
          GstRt: '',
          IgstAmt: '',
          CgstAmt: '',
          SgstAmt: '',
          CesRt: '',
          CesAmt: '',
          CesNonAdvlAmt: '',
          StateCesRt: '',
          StateCesAmt: '',
          StateCesNonAdvlAmt: '',
          OthChrg: '',
          TotItemVal: ''
        })]),

      });
    this.statusdto = fb.group(
      {
        status: ['']
      });

    this.cancel = fb.group(
      {
        Irn: [''],
        CnlRsn: [''],
        CnlRem: [''],
      });

    this.ewaybillcreate = fb.group(
      {
        Irn: [''],
        Distance: [''],
        TransMode: [''],
        TransId: [''],
        TransName: [''],
        TrnDocDt: [''],
        TrnDocNo: [''],
        VehNo: [''],
        VehType: [''],

      });

    this.ewaybillcancel = fb.group(
      {
        ewbNo: [''],
        cancelRsnCode: [''],
        cancelRmrk: [''],
      });

    this.responsedto = fb.group(
      {
        status: [''],
        cancel_message: ['']
      });

    this.ewaybillWOInvoiceGen = fb.group(
      {
        supplyType: [''],
        subSupplyType: [''],
        subSupplyDesc: [''],
        docType: [''],
        docNo: [''],
        docDate: [''],
        fromGstin: [''],
        fromTrdName: [''],
        fromAddr1: [''],
        fromAddr2: [''],
        fromPlace: [''],
        fromPincode: [''],
        actFromStateCode: [''],
        fromStateCode: [''],
        toGstin: [''],
        toTrdName: [''],
        toAddr1: [''],
        toAddr2: [''],
        toPlace: [''],
        toPincode: [''],
        actToStateCode: [''],
        toStateCode: [''],
        transactionType: [''],
        dispatchFromGSTIN: [''],
        dispatchFromTradeName: [''],
        shipToGSTIN: [''],
        shipToTradeName: [''],
        otherValue: [''],
        totalValue: [''],
        cgstValue: [''],
        sgstValue: [''],
        igstValue: [''],
        cessValue: [''],
        cessNonAdvolValue: [''],
        totInvValue: [''],
        transporterId: [''],
        transporterName: [''],
        transDocNo: [''],
        transMode: [''],
        transDistance: [''],
        transDocDate: [''],
        vehicleNo: [''],
        vehicleType: [''],
        ItemList: this.fb.array([this.fb.group({
          productName: '',
          productDesc: '',
          hsnCode: '',
          quantity: '',
          qtyUnit: '',
          cgstRate: '',
          sgstRate: '',
          igstRate: '',
          cessRate: '',
          cessNonAdvol: '',
          taxableAmount: ''
        })]),

      });
  }
  get order1_no() { return this.userForm1.get("order1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get party1() { return this.userForm1.get("party1") as FormControl }

  get id() { return this.userForm.get("id") as FormControl }
  get creditnoteid() { return this.userForm.get("creditnoteid") as FormControl }
  get creditnoteno() { return this.userForm.get("creditnoteno") as FormControl }
  get state() { return this.userForm.get("state") as FormControl }
  get creditnotedate() { return this.userForm.get("creditnotedate") as FormControl }
  get creditnotetype() { return this.userForm.get("creditnotetype") as FormControl }
  get invoice_type() { return this.userForm.get("invoice_type") as FormControl }
  get business_unit() { return this.userForm.get("business_unit") as FormControl }
  get e_invoice_no() { return this.userForm.get("e_invoice_no") as FormControl }
  get party() { return this.userForm.get("party") as FormControl }
  get salesorderno() { return this.userForm.get("salesorderno") as FormControl }
  get salesorderdate() { return this.userForm.get("salesorderdate") as FormControl }
  get allsalesorderdate() { return this.userForm.get("allsalesorderdate") as FormControl }
  get refchallanno() { return this.userForm.get("refchallanno") as FormControl }
  get refchallandate() { return this.userForm.get("refchallandate") as FormControl }
  get brokage_app() { return this.userForm.get("brokage_app") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get challan() { return this.userForm.get("challan") as FormControl }
  get grand_total() { return this.userForm.get("grand_total") as FormControl }
  get item_total() { return this.userForm.get("item_total") as FormControl }
  get item_total_gl_ac() { return this.userForm.get("item_total_gl_ac") as FormControl }
  get discount() { return this.userForm.get("discount") as FormControl }
  get discount_gl_ac() { return this.userForm.get("discount_gl_ac") as FormControl }
  get net_total() { return this.userForm.get("net_total") as FormControl }
  get net_total_gl_ac() { return this.userForm.get("net_total_gl_ac") as FormControl }
  get tax_total() { return this.userForm.get("tax_total") as FormControl }
  get tax_total_gl_ac() { return this.userForm.get("tax_total_gl_ac") as FormControl }
  get total_bill_amt() { return this.userForm.get("total_bill_amt") as FormControl }
  get total_bill_amt_gl_ac() { return this.userForm.get("total_bill_amt_gl_ac") as FormControl }
  get applicable_amt() { return this.userForm.get("applicable_amt") as FormControl }
  get applicable_gl_ac() { return this.userForm.get("applicable_gl_ac") as FormControl }
  get adj1_amt() { return this.userForm.get("adj1_amt") as FormControl }
  get adj1_gl_ac() { return this.userForm.get("adj1_gl_ac") as FormControl }
  get adj2_amt() { return this.userForm.get("adj2_amt") as FormControl }
  get adj2_gl_ac() { return this.userForm.get("adj2_gl_ac") as FormControl }
  get roundoff_amt() { return this.userForm.get("roundoff_amt") as FormControl }
  get roundoff_gl_ac() { return this.userForm.get("roundoff_gl_ac") as FormControl }
  get final_bill_amt() { return this.userForm.get("final_bill_amt") as FormControl }
  get final_bill_amt_gl_ac() { return this.userForm.get("final_bill_amt_gl_ac") as FormControl }
  get tcsamt() { return this.userForm.get("tcsamt") as FormControl }
  get tcsglac() { return this.userForm.get("tcsglac") as FormControl }
  get payable_amt() { return this.userForm.get("payable_amt") as FormControl }
  get payable_amt_gl_ac() { return this.userForm.get("payable_amt_gl_ac") as FormControl }
  get waybill() { return this.userForm.get("waybill") as FormControl }

  get sales_credit_note_payment_dtls() { return this.userForm.get('sales_credit_note_payment_dtls') as FormGroup; }
  get sales_credit_note_shipment_dtls() { return this.userForm.get('sales_credit_note_shipment_dtls') as FormGroup; }
  get sales_credit_note_tax_info() { return this.userForm.get('sales_credit_note_tax_info') as FormGroup; }
  get sales_credit_note_broker_dtls() { return this.userForm.get("sales_credit_note_broker_dtls") as FormArray };
  get sales_credit_note_item_dtls() { return this.userForm.get("sales_credit_note_item_dtls") as FormArray };
  get sales_credit_note_item_dtls_for_jobwork() { return this.userForm.get("sales_credit_note_item_dtls_for_jobwork") as FormArray };
  get sales_credit_note_item_dtls_for_jobwork_price() { return this.userForm.get("sales_credit_note_item_dtls_for_jobwork_price") as FormArray };
  get sales_credit_note_trans_dtls() { return this.userForm.get("sales_credit_note_trans_dtls") as FormArray };
  get sales_credit_note_docs() { return this.userForm.get("sales_credit_note_docs") as FormArray };
  get sales_credit_note_bp_dtls() { return this.userForm.get('sales_credit_note_bp_dtls') as FormGroup; }
  get credit_item_groupwise_summ() { return this.userForm.get("credit_item_groupwise_summ") as FormArray };
  get credit_item_groupwise_taxsumm() { return this.userForm.get("credit_item_groupwise_taxsumm") as FormArray };
  get credit_item_groupwise_hsnsumm() { return this.userForm.get("credit_item_groupwise_hsnsumm") as FormArray };

  get Version() { return this.einvoiceGeneration.get("Version") as FormControl }
  get ShipDtls() { return this.einvoiceGeneration.get("ShipDtls") as FormControl }
  get TranDtls() { return this.einvoiceGeneration.get('TranDtls') as FormGroup; }
  get DocDtls() { return this.einvoiceGeneration.get('DocDtls') as FormGroup; }
  get SellerDtls() { return this.einvoiceGeneration.get('SellerDtls') as FormGroup; }
  get BuyerDtls() { return this.einvoiceGeneration.get('BuyerDtls') as FormGroup; }
  get ValDtls() { return this.einvoiceGeneration.get('ValDtls') as FormGroup; }

  get ItemList() { return this.einvoiceGeneration.get('ItemList') as FormArray; }

  get ItemList1() { return this.ewaybillWOInvoiceGen.get('ItemList') as FormArray; }

  ngOnInit() {
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.einvoiceshow = false;
    this.creditnotesave = false;
    this.creditnoteupdate = false;
    this.creditnoteview = false;
    this.creditnotedelete = false;

    if (accessdata.includes('credit_note.save')) {
      this.creditnotesave = true;
    }
    if (accessdata.includes('credit_note.update')) {
      this.creditnoteupdate = true;
    }
    if (accessdata.includes('credit_note.view')) {
      this.creditnoteview = true;
    }
    if (accessdata.includes('credit_note.delete')) {
      this.creditnotedelete = true;
    }

    this.status = false;
    this.isHidden = false;
    this.ewaybillshow = false;
    this.transporter_id = "0";
    for (let k = 0; k < this.sales_credit_note_trans_dtls.length; k++) {
      this.sales_credit_note_trans_dtls.at(k).patchValue({ transname: "0", vehicletype: "0", vehicleno: "0" });
    }
    for (let k = 0; k < this.sales_credit_note_broker_dtls.length; k++) {
      this.sales_credit_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
    }
    this.jobtransaction = false;
    this.sales_credit_note_shipment_dtls.patchValue({ paytoaddr: "0" });
    this.b_unit = "0";
    this._customerId = "0";
    this.grandTotal = 0;
    this.appCharges = 0;
    this.adj1 = 0;
    this.adj2 = 0;
    this.tcsAmt = 0;
    this.defaultValue = 0;
    this.totalItem = 0;
    this.totalDiscount = 0;
    this.totalNetAmt = 0;
    this.totalTaxAmt = 0;
    this.add = 0;
    this.sub = 0;
    this.appChargesAmt = 0;
    this.packingItem = [];
    this.capacity = [];
    this.empty_bag_wt = [];
    this.action = 'update';
    this.company_name = localStorage.getItem("company_name");
    this.username = localStorage.getItem("username");
    this.financialYear = localStorage.getItem("financial_year");
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
    forkJoin(
      this.DropDownListService.getInvSalesTypes(),
      this.DropDownListService.getAccPayTerms(),
      this.DropDownListService.payTermNameList(),
      this.DropDownListService.getBankLedger(),
      this.DropDownListService.custometrBusList(this.company_name),
      this.DropDownListService.ledgerNameList(),
      //this.DropDownListService.itemNamesList(),
      this.DropDownListService.itemNamesNewList(),
      //this.DropDownListService.brokerNameList(),
      this.DropDownListService.brokerNameListFast(),
      //this.Service.getSalesCreditNote(this.company_name),
      this.Service.getSalesCreditNoteFast(this.company_name),
      // this.DropDownListService.getVehicleThruWeighment(),
      this.DropDownListService.getVehicleThruWeighmentfast(),
      this.DropDownListService.vehicleCodeList(),
      //this.DropDownListService.customerNameCodeList(this.company_name),
      this.DropDownListService.customerNameCodeListnew(this.company_name),
      this.DropDownListService.taxList(),
      this.Service.getCustomerBussinessPartnerFastApi(localStorage.getItem("company_name")),
    ).subscribe(([invoiceData, accPayTermsData, payTermData, bankList,
      custometrBusListData, ledgerData, ItemNameData, brokerNameList,
      CreditData, vehNoData, vehTypeList, PartyallData, tax, party]) => {

      this.partyNameList = party;
      //console.log(" All party list "+JSON.stringify(this.partyNameList));
      this.tax_list = tax;
      this.invoiceType = invoiceData;
      this.payment_termsList = accPayTermsData;
      this.payTerms = payTermData;
      this.bank_names = bankList;
      this.businesslists = custometrBusListData;
      this.ledgerNames = ledgerData;
      this.item_codes = ItemNameData;
      this.brokerNames = brokerNameList;
      console.log(" CHECK credit note: : " + JSON.stringify(CreditData));
      this.listCreditNote = CreditData;
      this.vehicleNoList = vehNoData;
      this.vehicleTypeList = vehTypeList;
      this.PartyAllList = PartyallData;

      this.sales_credit_note_payment_dtls.patchValue({ payment_term: "0" })
      this.sales_credit_note_item_dtls.at(0).patchValue({
        squantity: 0, quantity: 0,
        mat_wt: 0, price: 0, price_based_on: "0", discount_rate: 0, discount_type: "0",
        tax_rate: 0, amount: 0.00, discount_amt: 0.00, tax_amt: 0.00
      });
      this.userForm.patchValue({
        item_total_gl_ac: "0", applicable_gl_ac: "0",
        discount_gl_ac: "0", net_total_gl_ac: "0",
        tax_total_gl_ac: "0", total_bill_amt_gl_ac: "0",
        roundoff_gl_ac: "0", cash_dis_gl_ac: "0",
        adj1_gl_ac: "0", adj2_gl_ac: "0", net_gl_ac: "0",
        final_bill_amt_gl_ac: "0", tcsglac: "CC00300004",
        payable_amt_gl_ac: "0", business_unit: "0", invoice_type: "0", party: "0"
      });
      this.userForm.patchValue({ party: "0", roundoff_gl_ac: "IB00001" });
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  showList(s: string) {
    if (this.creditnotesave == true && this.creditnoteupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        this.einvoiceshow = false;
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.userForm.patchValue({ party: "0", roundoff_gl_ac: "IB00001" });
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        for (let k = 0; k < this.sales_credit_note_trans_dtls.length; k++) {
          this.sales_credit_note_trans_dtls.at(k).patchValue({ transname: "0", vehicletype: "0", vehicleno: "0" });
        }
        for (let k = 0; k < this.sales_credit_note_broker_dtls.length; k++) {
          this.sales_credit_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
        }
        this.sales_credit_note_shipment_dtls.patchValue({ paytoaddr: "0" });
      }
    }
    if (this.creditnotesave == true && this.creditnoteupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        this.einvoiceshow = false;
        this.userForm.patchValue({ party: "0", roundoff_gl_ac: "IB00001" });
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        for (let k = 0; k < this.sales_credit_note_trans_dtls.length; k++) {
          this.sales_credit_note_trans_dtls.at(k).patchValue({ transname: "0", vehicletype: "0", vehicleno: "0" });
        }
        for (let k = 0; k < this.sales_credit_note_broker_dtls.length; k++) {
          this.sales_credit_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
        }
        this.sales_credit_note_shipment_dtls.patchValue({ paytoaddr: "0" });
      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.creditnotesave = true;
      this.einvoiceshow = false;
      this.userForm.reset();
      this.sales_credit_note_tax_info.reset();
      this.sales_credit_note_bp_dtls.reset();
      this.sales_credit_note_shipment_dtls.reset();
      this.sales_credit_note_payment_dtls.reset();

      for (let k = 0; k < this.sales_credit_note_trans_dtls.length; k++) {
        this.sales_credit_note_trans_dtls.at(k).patchValue({ transname: "0", vehicletype: "0", vehicleno: "0" });
      }
      for (let k = 0; k < this.sales_credit_note_broker_dtls.length; k++) {
        this.sales_credit_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
      }
      this.sales_credit_note_shipment_dtls.patchValue({ paytoaddr: "0" });

      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.packingItem = [];
      this.item_sl_no = 0;
      while (this.sales_credit_note_item_dtls.length)
        this.sales_credit_note_item_dtls.removeAt(0);
      this.addItem();

      this.broker_sl_no = 0;
      while (this.sales_credit_note_broker_dtls.length)
        this.sales_credit_note_broker_dtls.removeAt(0);
      this.addBrokers();

      this.transporter_sl_no = 0;
      while (this.sales_credit_note_trans_dtls.length)
        this.sales_credit_note_trans_dtls.removeAt(0);
      this.addTransporter();

      while (this.sales_credit_note_docs.length)
        this.sales_credit_note_docs.removeAt(0);
      this.addDocument();
      this.userForm.patchValue({ party: "0", roundoff_gl_ac: "IB00001" });
    }
  }

  addItemGrpTax() {
    this.credit_item_groupwise_taxsumm.push(this.fb.group({
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

  addItemGrp() {
    this.credit_item_groupwise_summ.push(this.fb.group({
      item_group: '',
      item_total: '',
      discount_amt: '',
      item_ledger: '',
      discount_ledger: ''
    }))
  }

  addItemGrpHsn() {
    this.credit_item_groupwise_hsnsumm.push(this.fb.group({
      hsn_code: '',
      amount: '',
    }))
  }

  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.sales_credit_note_item_dtls.push(this.fb.group({
      slno: this.item_sl_no,
      item_code: '',
      packing: '',
      item_group: '',
      hsn_code: '',
      quantity: '',
      uom: '',
      squantity: '',
      suom: '',
      mat_wt: '',
      price: '',
      price_based_on: '',
      amount: '',
      discount_type: '',
      discount_rate: '',
      discount_amt: '',
      tax_code: '',
      tax_rate: '',
      cgstamt: '',
      sgstamt: '',
      igstamt: '',
      tax_amt: '',
      total_amt: '',
      acc_norms: '',
      salesreturnnoteno: '',
      salesreturnnoteid: ''
    }))
    this.sales_credit_note_item_dtls.at(this.item_sl_no - 1).patchValue({
      squantity: 0, quantity: 0,
      mat_wt: 0, price: 0, price_based_on: "0", discount_rate: 0, discount_type: "0",
      tax_rate: 0, amount: 0.00, discount_amt: 0.00, tax_amt: 0.00
    });
  }

  deleteItem(index) {
    if (index) { this.sales_credit_note_item_dtls.removeAt(index); }
    else {
      alert("Can not delete all rows");
      this.sales_credit_note_item_dtls.reset();
    }
  }

  addBrokers() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.sales_credit_note_broker_dtls.push(this.fb.group({
      slno: this.broker_sl_no,
      brokercode: '',
      basis: '',
      rate: '',
    }))

    for (let k = 0; k < this.sales_credit_note_broker_dtls.length; k++) {
      this.sales_credit_note_broker_dtls.at(k).patchValue({ brokercode: "0" });
    }
  }

  deleteBrokers(index) {
    if (this.broker_sl_no > 1) {
      this.sales_credit_note_broker_dtls.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.sales_credit_note_broker_dtls.reset();
      this.sales_credit_note_broker_dtls.at(0).patchValue({ slno: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.sales_credit_note_broker_dtls.at(i - 1).patchValue({ slno: i });
  }

  addTransporter() {
    this.transporter_sl_no = this.transporter_sl_no + 1;
    this.sales_credit_note_trans_dtls.push(this.fb.group({
      slno: this.transporter_sl_no,
      transname: '',
      vehicletype: '',
      vehicleno: '',
      ewaybillno: '',
      ewaybilldate: ''
    }))
    // for(let k=0;k<this.sales_credit_note_trans_dtls.length;k++){
    //   this.sales_credit_note_trans_dtls.at(k).patchValue({transname:"0",vehicletype:"0",vehicleno:"0"});
    // }
  }

  deleteTransporter(index) {
    if (this.transporter_sl_no > 1) {
      this.sales_credit_note_trans_dtls.removeAt(index);
      this.transporter_sl_no = this.transporter_sl_no - 1;
    }
    else {
      this.transporter_sl_no = 1;
      alert("can't delete all rows");
      this.sales_credit_note_trans_dtls.reset();
      this.sales_credit_note_trans_dtls.at(0).patchValue({ slno: this.transporter_sl_no });
    }

    for (let i = 1; i <= this.transporter_sl_no; i++)
      this.sales_credit_note_trans_dtls.at(i - 1).patchValue({ slno: i });
  }

  addDocument() {
    this.sales_credit_note_docs.push(this.fb.group({
      doc_name: ''
    }))
  }

  deleteDocument(index) {
    if (index) { this.sales_credit_note_docs.removeAt(index); }
    else {
      alert("Can not delete all rows");
      this.sales_credit_note_docs.reset();
    }
  }

  RoundOff: any;
  TcsAmt1: any;
  calRoundOfFigure(finalBillamount, tcs) {
    let PartyName: any;
    PartyName = this.userForm.get("party").value as FormControl;

    let totlround = Math.round(finalBillamount);
    let totlWithoutround = finalBillamount.toFixed(2);
    // alert("totlWithoutround : " +totlWithoutround);
    this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);
    this.Service.custAccountRetriveList(PartyName).subscribe(data => {
      //alert("tcs_rate : "+data.tcs_rate)
      this.TcsAmt1 = (Number(totlround * data.tcs_rate) / 100);
      //alert("TcsAmt1 : " +this.TcsAmt1);
      this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
      let t = Number(totlround) + Number(this.TcsAmt1);
      let d = t.toFixed(2)
      this.userForm.patchValue({ payable_amt: d })
    }
    );
    this.userForm.patchValue({ roundoff_amt: this.RoundOff });
  }

  onChangeItemName(index, event) {
    if (event.target.value != "0") {
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterPackMat(event.target.value),
        this.DropDownListService.getItemMasterInvData1(event.target.value, this.company_name),
        this.DropDownListService.retriveItemMasterStatInfo(event.target.value, this.company_name),
        this.DropDownListService.getItemQCDetails(event.target.value, this.company_name)
      ).subscribe(([data, data1, data2, data3, data4]) => {
        this.sales_credit_note_item_dtls.at(index).patchValue({ item_group: data.item_group, hsn_code: data.hsn_code });

        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => {
          this.sales_credit_note_item_dtls.at(index).patchValue({ uom: data.description });
          this.status = true;
        });
        this.packingItem[index] = data1;
        this.sales_credit_note_item_dtls.at(index).patchValue({ price: data2["mrp"] });
        this.sales_credit_note_item_dtls.at(index).patchValue({ tax_code: data3[0].tax_code, tax_rate: data3[0].tax_rate });
        this.sales_credit_note_item_dtls.at(index).patchValue({ acc_norms: data4[0].qc_code });
      })
    }
    let Items = '';
    for (let i = 0; i < this.sales_credit_note_item_dtls.length; i++) {
      let ItemName = this.sales_credit_note_item_dtls.at(i).get("item_code").value as FormControl;
      Items += ItemName + ",";
    }
    console.log("Items: " + Items.substring(0, Items.length - 1));
    let substringItem = Items.substring(0, Items.length - 1);

    forkJoin(
      this.DropDownListService.getGroupSalesAccThruItems("items=" + substringItem)
    ).subscribe(([SubItemdata]) => {
      this.userForm.patchValue({
        item_total_gl_ac: SubItemdata["item_total"], discount_gl_ac: SubItemdata["discount"],
        adj1_gl_ac: SubItemdata["adjplus"], adj2_gl_ac: SubItemdata["adjminus"]
      });
    })
  }

  itemId: any;
  packingQty: any;
  onChangePackingItem(index, event,) {
    if (event) {
      this.status = false;
      this.itemId = this.sales_credit_note_item_dtls.at(index).get("item_code").value as FormControl;
      this.packingQty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name).subscribe(data => {
        this.capacity[index] = data.capacity;
        this.empty_bag_wt[index] = data.empty_big_wt;
        this.sales_credit_note_item_dtls.at(index).patchValue({ suom: data.uom1, quantity: this.capacity * parseInt(this.packingQty) });
        this.status = true;
      });
    }
  }

  onChangeParty(party_id: string) {
    this._customerId = party_id;
    if (party_id.length && party_id != '0') {

      this.status = true;
      forkJoin
        (
          this.DropDownListService.custStatutoryRetriveList(party_id),
          this.DropDownListService.getCustDelvFromList(party_id),
          this.DropDownListService.getTransporterThruCustomer(party_id),
          this.DropDownListService.getCustDelvFromList(party_id),
          this.DropDownListService.custAddDtlsRetriveList(party_id, this.company_name),
          this.DropDownListService.getCustomerAddress(party_id),
          this.Service.custAddRetriveList(party_id),
          this.DropDownListService.getCustomerControlAccounts(party_id),
          this.Service.custBillAddRetriveList(party_id)
        ).subscribe(([statData, custDelvData, transData, delvData, contData, custAdd, CustAddState, ControlAccdata, CustAddress]) => {
          this.status = true;

          if (statData["registered"] == true)//registered
          {
            //if(this.userForm.get("invoice_type").value == 'INV00002' || this.userForm.get("invoice_type").value == 'INV00004')
            if (this.userForm.get("invoice_type").value == 'INV00002' || this.userForm.get("invoice_type").value == 'INV00004' || this.userForm.get("invoice_type").value == 'INV00003') {
              this.einvoiceshow = true;
            }
            else {
              this.einvoiceshow = false;
            }

          }
          else {
            this.einvoiceshow = false;
          }
          this.anystate = CustAddress["state"];
          //console.log("Comp State:"+this.company_state)
          //if (this.anystate == 'BIHAR') { this.statestatus = 0; }
          if (this.anystate == this.company_state) { this.statestatus = 0; }
          else {
            this.statestatus = 1;
          }

          this.sales_credit_note_tax_info.patchValue({
            panno: statData["pan_no"],
            gstno: statData["gst_no"], cinno: statData["cin_no"], tanno: statData["tan_no"]
          })

          this.registeredstatus = statData["registered"];

          this.customerDelvAddList = custDelvData;
          this.transporterNames = transData;
          this.delvAddrs = delvData;
          this.contAddrs = contData;
          this.sales_credit_note_shipment_dtls.patchValue({ paytoaddr: this._customerId, paytodtls: CustAddress["address"] });
          this.userForm.patchValue({ state: CustAddState.state, payable_amt_gl_ac: ControlAccdata.ctrl_acc });
          this.sales_credit_note_bp_dtls.patchValue({ sp_address: custAdd["address"] });
        })
    }
  }

  GetDeliveryBuisnessUnit(businessunit_code: string) {
    //alert(businessunit_code+","+this.sales_Order_Shipment_Dtls.get("pay_addr").value);
    if (businessunit_code != '0') {
      this.status = false;

      this.DropDownListService.getCustDelvFromAdd(this.sales_credit_note_shipment_dtls.get("paytoaddr").value, businessunit_code).subscribe(data => {
        this.sales_credit_note_shipment_dtls.patchValue({ shipdtls: data["ship_to"] });
        this.status = true;
      });
    }
  }

  _mrp: any;
  _priceBasedOn: any;
  _mat_weight: any;
  _taxrate: any;
  _netAmt: any;
  _item_qty: any;
  _packing_qty: any;
  _discount: any;
  _discountBasadOn: any;
  _taxAmt: any;
  amt: any;
  _totalAmt
  getPackingQty(packingQty, index) {
    this._packing_qty = packingQty.target.value;
    this._item_qty = this.capacity[index] * this._packing_qty;

    //  this.sales_credit_note_item_dtls.at(index).patchValue({quantity: this._item_qty, 
    //    mat_wt: (Number(this._item_qty) - Number(this.empty_bag_wt[index])).toFixed(3)});
    this.sales_credit_note_item_dtls.at(index).patchValue({
      quantity: this._item_qty.toFixed(3),
      mat_wt: this._item_qty.toFixed(3)
    });

    this._mrp = this.sales_credit_note_item_dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_credit_note_item_dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_credit_note_item_dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_credit_note_item_dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_credit_note_item_dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_credit_note_item_dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getItemQty(itemQty, index) {
    this._packing_qty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = itemQty.target.value;
    // this.sales_credit_note_item_dtls.at(index).patchValue({ 
    //  mat_wt: (Number(this._item_qty) - Number(this.empty_bag_wt[index])).toFixed(3)});
    this.sales_credit_note_item_dtls.at(index).patchValue({
      quantity: this._item_qty.toFixed(3),
      mat_wt: this._item_qty.toFixed(3)
    });

    this._mrp = this.sales_credit_note_item_dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_credit_note_item_dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_credit_note_item_dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_credit_note_item_dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_credit_note_item_dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_credit_note_item_dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getMatWt(matwt, index) {
    this._packing_qty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_credit_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_credit_note_item_dtls.at(index).get("price").value as FormControl;
    this._mat_weight = matwt.target.value;
    this._priceBasedOn = this.sales_credit_note_item_dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_credit_note_item_dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_credit_note_item_dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_credit_note_item_dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getPrice(price, index) {
    this._packing_qty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_credit_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = price.target.value;
    this._mat_weight = this.sales_credit_note_item_dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_credit_note_item_dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_credit_note_item_dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_credit_note_item_dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_credit_note_item_dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangePriceBasedOn(price_based_on, index) {
    this._packing_qty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_credit_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_credit_note_item_dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_credit_note_item_dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = price_based_on.target.value;
    this._discount = this.sales_credit_note_item_dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_credit_note_item_dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_credit_note_item_dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getDiscount(discount, index) {
    this._packing_qty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_credit_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_credit_note_item_dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_credit_note_item_dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_credit_note_item_dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = discount.target.value;
    this._discountBasadOn = this.sales_credit_note_item_dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_credit_note_item_dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onchangeDiscountBasedOn(dis_based_on, index) {
    this._packing_qty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_credit_note_item_dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_credit_note_item_dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_credit_note_item_dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_credit_note_item_dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_credit_note_item_dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = dis_based_on.target.value;
    this._taxrate = this.sales_credit_note_item_dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }


  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  _total_amt: any
  discountAmt: any;
  GlobalTcs_rate: any;
  discountBasedOn: any;
  taxrate: any;
  totalAmt: any;
  calculateItemData(packingQty, ItemQty, price, matWt, PriceBasedOn, discount, discountBasedOn, taxrate, index) {
    this.grandTotal = 0;
    this.totalItem = 0;
    this.totalDiscount = 0;
    this.totalNetAmt = 0;
    this.totalTaxAmt = 0;
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
    //console.log("packingQty" + packingQty + "ItemQty " + ItemQty + "price" + price + "PriceBasedOn" + PriceBasedOn + "discount" + discount + "discountBasedOn" + discountBasedOn + "taxrate" + taxrate + "index" + index)
    taxdata.forEach(element => {
      //console.log("taxname:" + element.tax_id + "//" + this.sales_credit_note_item_dtls.at(index).get("tax_code").value)
      if (element.tax_id == this.sales_credit_note_item_dtls.at(index).get("tax_code").value) {
        //console.log("statestatus:"+this.statestatus)
        if (this.statestatus == 0) {
          this.cgstvalue = Number(this.round((Number(netAmt * element["cgst_act_val"]) / 100), 2));
          this.sgstvalue = Number(this.round((Number(netAmt * element["sgst_act_val"]) / 100), 2));

          this.igstvalue = "0";
          // console.log("netAmt"+netAmt+"//"+this.cgstvalue+"//"+this.sgstvalue)
        }
        else {
          this.cgstvalue = '0';
          this.sgstvalue = '0';
          this.igstvalue = Number(this.round(Number(netAmt * (this.sales_credit_note_item_dtls.at(index).get("tax_rate").value / 100)), 2));
          // console.log("netAmt"+netAmt+"//"+this.igstvalue)
        }
        let taxamt = Number(this.cgstvalue) + Number(this.sgstvalue) + Number(this.igstvalue);
        //console.log(netAmt+"taxamt::"+taxamt)
        this.totalAmt = taxamt + netAmt;
        this.sales_credit_note_item_dtls.at(index).patchValue({
          cgstamt: this.cgstvalue, sgstamt: this.sgstvalue, igstamt: this.igstvalue,
          discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2),
          tax_amt: taxamt,total_amt: this.totalAmt
        });


      }

    });
    //console.log(" u : " + this.sales_credit_note_item_dtls.at(0).get("amount").value)
    this.grandTotal = 0;
    for (let y = 0; y < this.sales_credit_note_item_dtls.length; y++) {
      this._total_amt = this.sales_credit_note_item_dtls.at(y).get("total_amt").value as FormControl;

      this.amt = this.sales_credit_note_item_dtls.at(y).get("amount").value as FormControl;
      //console.log(" v " + this.sales_credit_note_item_dtls.at(y).get("amount").value)
      this.totalItem = Number(this.totalItem) + Number(this.amt);
      //console.log(" totalItem " + this.totalItem)
      this.discountAmt = this.sales_credit_note_item_dtls.at(y).get("discount_amt").value as FormControl;
      //console.log(" discountAmt " + this.discountAmt)
      this.totalDiscount = Number(this.totalDiscount) + Number(this.discountAmt);
      //console.log(" totalDiscount " + this.totalDiscount)
      this._taxAmt = this.sales_credit_note_item_dtls.at(y).get("tax_amt").value as FormControl;
      //console.log(" _taxAmt " + this._taxAmt)
      this.totalTaxAmt = Number(this.totalTaxAmt) + Number(this._taxAmt);
      //console.log(" totalTaxAmt: " + this.totalTaxAmt)
      this.grandTotal = Number(this.grandTotal) + Number(this._total_amt);
      //console.log(" grandTotal " + this.grandTotal)
      this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });

      this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
        this.appCharges, this.adj1, this.adj2, this.tcsAmt)
      //console.log("total item" + this.totalItem + "totalDiscount " + this.totalDiscount + " totalTaxAmt " + this.totalTaxAmt + " appCharges" + this.appCharges + " adj1" + this.adj1 + "  adj1" + this.adj1 + " tcsAmt" + this.tcsAmt)
    }

    /* this.DropDownListService.taxlistbycode(this.sales_credit_note_item_dtls.at(index).get("tax_code").value).subscribe(taxcode=>
       {
 
         let cgst_amt =  taxcode["cgst_act_val"];
         let sgst_amt = taxcode["sgst_act_val"];
         let igst_amt = taxcode["igst_act_val"];
 
         if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)//tax 0%
         {
              let taxamt = 0;
          
              this.sales_credit_note_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
              discount_amt:(Math.round(this.discountAmt * 100) / 100).toFixed(2),
              tax_amt: taxamt,total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
         }
         else if(cgst_amt == 0)//igst
         {
             //let taxamt =Number(netAmt *(this.sales_credit_note_item_dtls.at(index).get("tax_rate").value/100)).toFixed(2);
             let taxamt =Number(this.round(Number(netAmt *(this.sales_credit_note_item_dtls.at(index).get("tax_rate").value/100)),2))

             this.sales_credit_note_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
             discount_amt:(Math.round(this.discountAmt * 100) / 100).toFixed(2),
             tax_amt: taxamt,total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
        }
         else//cgst and sgst
         {
            // let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
             let csgt_final=Number(this.round(Number(netAmt *(cgst_amt/100)),2));
             
             //let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
             let sgst_final=Number(this.round(Number(netAmt *(sgst_amt/100)),2));

             let taxamt = Number(csgt_final)+ Number(sgst_final);

             this.sales_credit_note_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
              discount_amt:(Math.round(this.discountAmt * 100) / 100).toFixed(2),
              tax_amt: taxamt,total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
             
         }
         this.grandTotal = 0;
         for(let i=0; i<this.sales_credit_note_item_dtls.length; i++)
         {
           this.amt = this.sales_credit_note_item_dtls.at(i).get("amount").value as FormControl;
           this.totalItem =Number(this.totalItem)  +Number(this.amt) ;
           this.discountAmt = this.sales_credit_note_item_dtls.at(i).get("discount_amt").value as FormControl;
           this.totalDiscount =Number(this.totalDiscount)  +Number(this.discountAmt) ;
           this._taxAmt = this.sales_credit_note_item_dtls.at(i).get("tax_amt").value as FormControl;
           this.totalTaxAmt =Number(this.totalTaxAmt)  +Number(this._taxAmt) ;
           this._total_amt = this.sales_credit_note_item_dtls.at(i).get("total_amt").value as FormControl;
           this.grandTotal = Number(this.grandTotal).toFixed(2)  +Number(this._total_amt).toFixed(2) ;
           this.userForm.patchValue({grand_total:this.grandTotal});
           this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
             this.appCharges, this.adj1, this.adj2, this.tcsAmt)
         }
       });
       */
  }

  onChangeBusinessUnit(event) {
    this.b_unit = event;
    if (event.length && event != "0") {
      this.status = false;
      //this.DropDownListService.getCustomerThruBU(event).subscribe(data=>
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

  getCreditNoteDate(event) {
    this.currentDate = event.target.value;
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  onChangeSalesReturnType(event) {
    if (event.length && event != "0") {
      this.status = false;
      this.DropDownListService.getCNSequenceId(this.financialYear + "/" + event + "/" + this.userForm.get("creditnotetype").value).subscribe(data => {
        this.status = true;
        this.seqId = data["sequenceid"];

        if (this.userForm.get("invoice_type").value == "INV00003") {

          this.jobtransaction = true;
          this.ewaybillshow = false;
        }
        else {
          this.jobtransaction = false;
          this.ewaybillshow = true;
        }


      });
    }

  }
  onChangeSeqNo(event: string) {
    if (event.length && event != "0") {
      console.log(event)
      this.status = false;
      this.DropDownListService.getCNSequenceId(this.financialYear + "/" + this.userForm.get("invoice_type").value + "/" + event).subscribe(
        {
          next: (data) => {
            this.status = true;
            this.seqId = data["sequenceid"];
          },
          error: (error) => {
            console.log(error)
          }

        });
    }
  }

  onChangePaymentMode(event: string) {
    let gotbank = event
    if (gotbank == "RTGS" || gotbank == "NEFT") {
      this.isBankNameDisabled = true;
      this.isChecked = true;
    }
    else {
      this.sales_credit_note_payment_dtls.patchValue({ bank_name: null });
      this.isBankNameDisabled = false;
      this.sales_credit_note_payment_dtls.patchValue({ account_no: this.acc_no });
      this.isChecked = false;
      this.sales_credit_note_payment_dtls.patchValue({ ifsc_code: null });
      this.sales_credit_note_payment_dtls.patchValue({ account_name: null });
      this.sales_credit_note_payment_dtls.patchValue({ branch: null });
      this.sales_credit_note_payment_dtls.patchValue({ iban: null });
      this.sales_credit_note_payment_dtls.patchValue({ bic_swift_code: null });
    }
    if (gotbank == 'Cash') {
      this.isChecked1 = true;
    }
    else {
      this.isChecked1 = false;
    }
  }

  onChangeBankName(bank_name: string) {
    if (bank_name == 'NA') {
      this.isChecked = false;
    }
    else {
      this.isChecked = true;
    }
  }

  onChangePartyInfoName(custname: String) {
    this.sales_credit_note_bp_dtls.patchValue({ sp_phone: null, sp_fax: null, sp_email: null });
    if (custname != "0" && this._customerId != "0") {
      this.status = false;
      this.DropDownListService.getCustContDetails(this._customerId, custname).subscribe(data => {
        this.sales_credit_note_bp_dtls.patchValue({ sp_phone: data["phone"], sp_fax: data["fax"], sp_email: data["email"] });
        this.status = true;
      });

    }
  }

  onChangeContInfoName(custname: String) {
    this.sales_credit_note_bp_dtls.patchValue({
      cp_designation: null, cp_phone: null,
      cp_fax: null, cp_email: null, cp_address: null
    });
    if (custname != "0" && this._customerId != "0") {
      this.status = false;
      this.DropDownListService.getCustDelvFromAdd(this._customerId, custname).subscribe(data => {
        this.sales_credit_note_bp_dtls.patchValue({
          cp_designation: data["designation"], cp_phone: data["phone"],
          cp_fax: data["fax"], cp_email: data["email"], cp_address: data["address"]
        });
        this.status = true;
      });
    }
  }

  onChangeShipToAddId(addId: String) {
    if (addId.length && this._customerId != "0") {
      this.status = false;
      this.DropDownListService.getCustDelvFromAdd(this._customerId, addId).subscribe(data => {
        this.sales_credit_note_shipment_dtls.patchValue({ shipdtls: data.address })
        this.status = true;
      })
    }
  }

  onChangePayToFromAddId(businessunit_code: string) {
    if (businessunit_code.length && businessunit_code != "0") {
      this.status = false;
      this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data => {
        this.sales_credit_note_shipment_dtls.patchValue({ paytodtls: data["add"] });
        this.status = true;
      });
    }
  }

  showPopUp2(index) {
    this.itemCode = this.sales_credit_note_item_dtls.at(index).get('item_code').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, item_code: this.itemCode };
    const dialogRef = this.dialog.open(SalesQcPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.sales_credit_note_item_dtls.at(index).patchValue({ acc_norms: data["qc_code"] });
    });
  }

  showPopUp(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, };
    const dialogRef = this.dialog.open(SalesQuoTaxModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != '') {
        this.sales_credit_note_item_dtls.at(index).patchValue({ tax_code: data["tax_id"], tax_rate: data["tax_rate"] });
        this._taxrate = data['tax_rate'];
        this._packing_qty = this.sales_credit_note_item_dtls.at(index).get("squantity").value as FormControl;
        this._item_qty = this.sales_credit_note_item_dtls.at(index).get("quantity").value as FormControl;
        this._mrp = this.sales_credit_note_item_dtls.at(index).get('price').value as FormControl;
        this._mat_weight = this.sales_credit_note_item_dtls.at(index).get("mat_wt").value as FormControl;
        this._priceBasedOn = this.sales_credit_note_item_dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_credit_note_item_dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_credit_note_item_dtls.at(index).get('discount_type').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
      }
    });
  }

  openSalesRetApprovalPopUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (this.userForm.get("invoice_type").value == 0) {
      alert("Select Invoice Type Before Clicking Sales Return Approval Note!");
      this.status = true;
    }
    else if (this.b_unit == "0") {
      alert("Select Business Unit Before Clicking Sales Return Approval Note!");
      this.status = true;
    }
    else if (this._customerId == "0") {
      alert("Select Party Name Before Clicking Sales Return Approval Note!");
      this.status = true;
    }
    else if (this.userForm.get("challan").value == null) {
      alert("Select Challan Before Clicking Sales Return Approval Note!");
      this.status = true;
    }
    else {
      this.Id = this.userForm.get("id").value;
      console.log("tuhin here  :: " + this.Id)
      if (this.Id == null || this.Id == '') {
        this.Id = 0;
       // console.log("tuhin here12345 :: " + this.Id)
      }

      if (this.userForm.get("challan").value == 'Multiple') {
        //alert("id"+this.Id)
        dialogConfig.data = { party_id: this._customerId, bunit: this.b_unit, date: this.currentDate, finYear: this.financialYear, company_id: this.company_name, id: this.Id, invoicetype: this.userForm.get("invoice_type").value };
        let dialogref1;
        dialogref1 = this.dialog.open(MultipleReturnApprovalPopupComponent, dialogConfig);
        dialogref1.afterClosed().subscribe(data => {
          //starts here


          if (data != '' && data["salesreturnid"] != '0') {
            let k = 0;
            this.grandTotal = 0;
            this.totalItem = 0;
            this.totalDiscount = 0;
            this.totalNetAmt = 0;
            this.totalTaxAmt = 0;
            this.packingItem = [];
            // this.userForm.patchValue({referance_id: data["salesreturnid"]});
            console.log("ghds" + JSON.stringify(data));

            this.userForm.patchValue({ referance_id: data["salesreturnid"], salesorderno: data["salesreturnno"], salesorderdate: data["salesreturndate"], allsalesorderdate: data["allsalesreturndate"], refchallanno: data["salesreturnrefno"] });
            this.addItem();
            this.item_sl_no = 0;
            while (this.sales_credit_note_item_dtls.length)
              this.sales_credit_note_item_dtls.removeAt(0);
            //console.log("salesReturn item dtls: "+JSON.stringify(data))
            for (let data1 of data.return_approval_Item_Dtls) {
              if (data1.checkbox == true) {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                  this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name),
                  this.DropDownListService.getItemNameById(data1["itemcode"], this.company_name),
                ).subscribe(([packingList, capacityEmptyWt, ItemGrp]) => {
                  this.status = true;
                  this.packingItem[k] = packingList;
                  this.capacity[k] = capacityEmptyWt["capacity"];
                  this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                  this.grandTotal = Number(this.grandTotal) + Number(data1.totalamt);
                  this.totalItem = Number(this.totalItem) + Number(data1.amount);
                  this.totalDiscount = Number(this.totalDiscount) + Number(data1.discountamt);
                  this.totalNetAmt = Number(this.totalNetAmt) + (data1.amount - data1.discountamt);
                  this.totalTaxAmt = Number(this.totalTaxAmt) + Number(data1.taxamt);

                  this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
                    this.appCharges, this.adj1, this.adj2, this.tcsAmt)

                  this.ItemGr.push(ItemGrp["item_group"]);
                  console.log("ItemGr : " + JSON.stringify(data1));
                  // console.log("DlvTaxdata ; "+JSON.stringify(DlvTaxdata))              
                  this.TaxCode.push(data1["taxcode"]);
                  this.HsnCode.push(data1["hsn_code"]);
                  this.TaxRate.push(data1["taxrate"]);

                  this.addItem();
                  this.sales_credit_note_item_dtls.at(k).patchValue({
                    item_code: data1.itemcode, hsn_code: data1.hsn_code,
                    packing: data1.packing, quantity: data1.quantity, uom: data1.uom, squantity: data1.squantity,
                    suom: data1.suom, mat_wt: data1.matwt, price: data1.price, price_based_on: data1.pricebasedon,
                    amount: data1.amount, discount_type: data1.discounttype, discount_rate: data1.discountrate,
                    discount_amt: data1.discountamt, tax_code: data1.taxcode, tax_rate: data1.taxrate,
                    tax_amt: data1.taxamt, total_amt: data1.totalamt, acc_norms: data1.accnorms, item_group: ItemGrp["item_group"], salesreturnnoteno: data1.salesreturnno, salesreturnnoteid: data1.salesreturnid
                  });


                  //for hsn
                  timer(3000).subscribe
                    (x => {
                      const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);
                      console.log("distinctArrayHsnCode: " + distinctArrayHsnCode);
                      this.addItemGrpHsn();
                      while (this.credit_item_groupwise_hsnsumm.length)
                        this.credit_item_groupwise_hsnsumm.removeAt(0);
                      for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                        let DiscountAmt = 0;
                        for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                          if (this.sales_credit_note_item_dtls.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                            DiscountAmt += this.sales_credit_note_item_dtls.at(k).get("amount").value - this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                            console.log("DiscountAmt:" + DiscountAmt);
                          }
                        }
                        this.addItemGrpHsn();
                        console.log("hsn_code  :" + distinctArrayHsnCode[j]); // 1, "string", false
                        this.credit_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                      }
                    }
                    )


                  timer(3500).subscribe
                    (x => {
                      console.log("ItemGrLength: " + this.ItemGr.length);
                      const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);
                      console.log("distinctArray: " + distinctArray);
                      //let j=0
                      this.addItemGrp();
                      while (this.credit_item_groupwise_summ.length)
                        this.credit_item_groupwise_summ.removeAt(0)
                      for (let j = 0; j < distinctArray.length; j++) {
                        let Amt = 0;
                        let Discount = 0;

                        for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                          if (this.sales_credit_note_item_dtls.at(k).get("item_group").value == distinctArray[j]) {
                            Amt += this.sales_credit_note_item_dtls.at(k).get("amount").value;
                            Discount += this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                            console.log("Amt:" + Amt);
                            console.log("Discount : " + Discount);
                          }
                        }
                        this.addItemGrp();
                        console.log("Item  :" + distinctArray[j]); // 1, "string", false
                        this.credit_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                        forkJoin(
                          this.Service.getItemGroupSalesAcc(distinctArray[j]),
                        ).subscribe(([ItemgrpLedger]) => {
                          this.credit_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });

                          this.status = true;
                        });
                      }
                    }
                    )

                  timer(5000).subscribe
                    (x => {
                      this.StateName = this.userForm.get("state").value;
                      // console.log("TaxCodeLength: "+this.TaxCode.length);
                      const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                      // console.log("distinctArrayTax: "+distinctArrayTax);

                      this.addItemGrpTax();
                      while (this.credit_item_groupwise_taxsumm.length)
                        this.credit_item_groupwise_taxsumm.removeAt(0)
                      for (let j = 0; j < distinctArrayTax.length; j++) {
                        let TaxRate = 0;
                        let TaxAmt = 0;

                        for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                          if (this.sales_credit_note_item_dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                            TaxRate = this.sales_credit_note_item_dtls.at(k).get("tax_rate").value;
                            TaxAmt += this.sales_credit_note_item_dtls.at(k).get("tax_amt").value;
                            //  console.log("TaxRate:"+TaxRate);   
                            //  console.log("TaxAmt : "+TaxAmt);                    
                          }
                        }
                        this.addItemGrpTax();
                        //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
                        this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                        if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                          forkJoin(
                            this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                          ).subscribe(([TaxData]) => {

                            if (TaxData) {
                              this.credit_item_groupwise_taxsumm.at(j).patchValue({
                                percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                                , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                              });

                              this.status = true;

                              this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                              this.StateName = this.userForm.get("state").value;
                              this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


                             // if (this.StateName == 'BIHAR') {
                              if (this.StateName == this.company_state) {
                                let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                                let Sgst = (this.Tax_Amt - Cgst);
                                // this.credit_item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Number(this.round(Cgst, 2)), sgst: Number(this.round(Sgst, 2)) });
                              }
                              else { this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                              const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                              for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                let Amount = 0;
                                let DiscountAmt = 0;
                                let Taxable_Amnt = 0;

                                for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                                  if (this.sales_credit_note_item_dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                    Amount += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
                                    DiscountAmt += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
                                    // Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                                    Taxable_Amnt = Number(this.round((Number(Amount) - Number(DiscountAmt)), 2));

                                    console.log("Taxable_Amnt : " + Taxable_Amnt)
                                    // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                  }
                                }
                                this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                              }
                            }

                            else {
                              //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                              alert("something error is happened");
                            }

                          }, (error) => {
                            this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");

                          });
                        }
                      }
                    })
                  k = k + 1;
                  timer(500).subscribe
                    (x => {
                      let TotalAmtt = 0;
                      for (let i = 0; i < this.sales_credit_note_item_dtls.length; i++) {
                        TotalAmtt += Number(this.sales_credit_note_item_dtls.at(i).get("total_amt").value);
                      }
                      let Ttal = TotalAmtt.toFixed(2);
                      this.userForm.patchValue({ grand_total: Ttal })
                    })
                  //this.userForm.patchValue({grand_total: (Math.round(this.grandTotal * 1000)/1000).toFixed(3)})
                  // this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
                  //   this.add, this.sub, this.tcsAmt, this.appChargesAmt)
                });
              }
            }

            let splitval = data["salesreturnid"].toString().split(",");

            this.status = false;
            forkJoin(
              this.DropDownListService.getReturnAppTransInfo(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalDtls(splitval[0]),
              this.DropDownListService.getReturnApprovalBD(splitval[0]),
              this.DropDownListService.getReturnApprovalSD(splitval[0]),

            ).subscribe(([transData, sReturnData, brokerData, shipmentData]) => {
              console.log("sales approval transData: " + JSON.stringify(transData));
              let k = 0;
              this.addTransporter();
              this.transporter_sl_no = 0;
              while (this.sales_credit_note_trans_dtls.length)
                this.sales_credit_note_trans_dtls.removeAt(0)
              for (let data1 of transData) {
                this.addTransporter();
                this.sales_credit_note_trans_dtls.at(k).patchValue(data1);
                k = k + 1;
              }

              this.sales_credit_note_shipment_dtls.patchValue({
                shipaddr: shipmentData["shipaddr"],
                shipdtls: shipmentData["shipdetails"], paytoaddr: shipmentData["payaddr"], paytodtls: shipmentData["paydetails"]
              });

              this.userForm.patchValue({
                remarks: sReturnData["remark"],
                salesorderno: sReturnData["salesreturnno"], salesorderdate: sReturnData["salesreturndate"]
              });

              this.DropDownListService.getSalesInvDetails(sReturnData["referance_id"]).subscribe(data => {
                console.log("chk challan" + JSON.stringify(data))
                // this.userForm.patchValue({item_total_gl_ac: data["item_total_gl_ac"], tax_total_gl_ac:data["tax_total_gl_ac"],challan:data["challan"],e_invoice_no:data["e_invoice_no"],
                //    discount_gl_ac:data["discount_gl_ac"],net_total_gl_ac:data["net_total_gl_ac"],total_bill_amt_gl_ac:data["total_bill_amt_gl_ac"],refchallanno:data["refchallanno"],
                this.userForm.patchValue({
                  item_total_gl_ac: data["item_total_gl_ac"], tax_total_gl_ac: data["tax_total_gl_ac"],
                  discount_gl_ac: data["discount_gl_ac"], net_total_gl_ac: data["net_total_gl_ac"], total_bill_amt_gl_ac: data["total_bill_amt_gl_ac"],
                  applicable_gl_ac: data["applicable_gl_ac"], adj1_gl_ac: data["adj1_gl_ac"], adj2_gl_ac: data["adj2_gl_ac"], roundoff_gl_ac: data["roundoff_gl_ac"], refchallandate: data["refchallandate"],
                  final_bill_amt_gl_ac: data["final_bill_amt_gl_ac"], tcsglac: data["tcsglac"], payable_amt_gl_ac: data["payable_amt_gl_ac"]
                });
                this.status = true;
              });
              this.userForm.patchValue({ salesorderno: data["salesreturnno"], salesorderdate: data["salesreturndate"] });
              //Broker Dtls
              let j = 0;
              this.addBrokers();
              this.broker_sl_no = 0;
              while (this.sales_credit_note_broker_dtls.length)
                this.sales_credit_note_broker_dtls.removeAt(0);
              for (let data1 of brokerData) {
                this.addBrokers();
                this.sales_credit_note_broker_dtls.at(j).patchValue({
                  brokercode: data1["brokercode"],
                  basis: data1["basis"], rate: data1["rate"]
                });
                j = j + 1;
              }
              this.status = true;
            });
          }
          //ends here
        });

      }
      else {
        
        dialogConfig.data = {
          inv_type: "0", party_id: this._customerId, bunit: this.b_unit, date: this.currentDate,
          //  finYear: this.financialYear, company_id: this.company_name, parent_model: 'Credit Note'};
          finYear: this.financialYear, company_id: this.company_name, parent_model: 'Credit Note', id: this.Id, invoicetype: this.userForm.get("invoice_type").value
        };
        let dialogref;
        dialogref = this.dialog.open(ReturnApprovalNotePopUpComponent, dialogConfig);
        dialogref.afterClosed().subscribe(data => {

          if (data != '' && data["salesreturnid"] != '0') {
            let k = 0;
            this.grandTotal = 0;
            this.totalItem = 0;
            this.totalDiscount = 0;
            this.totalNetAmt = 0;
            this.totalTaxAmt = 0;
            this.packingItem = [];
            // this.userForm.patchValue({referance_id: data["salesreturnid"]});
            this.userForm.patchValue({ referance_id: data["salesreturnid"], salesorderno: data["salesreturnnumber"], salesorderdate: data["salesreturndate"] });

            this.addItem();
            this.item_sl_no = 0;
            while (this.sales_credit_note_item_dtls.length)
              this.sales_credit_note_item_dtls.removeAt(0);
            //console.log("salesReturn item dtls: " + JSON.stringify(data.return_approval_Item_Dtls))
            for (let data1 of data.return_approval_Item_Dtls) {
              if (data1.checkbox == true) {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                  this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name),
                  this.DropDownListService.getItemNameById(data1["itemcode"], this.company_name),
                ).subscribe(([packingList, capacityEmptyWt, ItemGrp]) => {
                  this.status = true;
                  this.packingItem[k] = packingList;
                  this.capacity[k] = capacityEmptyWt["capacity"];
                  this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                  this.grandTotal = Number(this.grandTotal) + Number(data1.totalamt);
                  this.totalItem = Number(this.totalItem) + Number(data1.amount);
                  this.totalDiscount = Number(this.totalDiscount) + Number(data1.discountamt);
                  this.totalNetAmt = Number(this.totalNetAmt) + (data1.amount - data1.discountamt);
                  this.totalTaxAmt = Number(this.totalTaxAmt) + Number(data1.taxamt);
                  //console.log("total item"+this.totalItem+"totalDiscount "+this.totalDiscount+" totalTaxAmt "+this.totalTaxAmt+" appCharges"+this.appCharges+" adj1"+this.adj1+"  adj1"+this.adj1+" tcsAmt"+this.tcsAmt)
                  // this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
                  //   this.appCharges, this.adj1, this.adj2, this.tcsAmt)

                  this.ItemGr.push(ItemGrp["item_group"]);
                  //  console.log("ItemGr : "+JSON.stringify(this.ItemGr)); 
                  // console.log("DlvTaxdata ; "+JSON.stringify(DlvTaxdata))              
                  this.TaxCode.push(data1["taxcode"]);
                  this.HsnCode.push(data1["hsn_code"]);
                  this.TaxRate.push(data1["taxrate"]);

                  this.addItem();
                  //console.log(" ::Amount:: " + data1.amount+" ::taxrate:: " + data1.taxrate+" ::tax_amt:: " + data1.taxamt+" ::totalamt:: " + data1.totalamt)

                  this.sales_credit_note_item_dtls.at(k).patchValue({
                    item_code: data1.itemcode, hsn_code: data1.hsn_code,
                    packing: data1.packing, quantity: data1.quantity, uom: data1.uom, squantity: data1.squantity,
                    suom: data1.suom, mat_wt: data1.matwt, price: data1.price, price_based_on: data1.pricebasedon,
                    amount: data1.amount, discount_type: data1.discounttype, discount_rate: data1.discountrate,
                    discount_amt: data1.discountamt, tax_code: data1.taxcode, tax_rate: data1.taxrate,
                    tax_amt: data1.taxamt, total_amt: data1.totalamt, acc_norms: data1.accnorms, item_group: ItemGrp["item_group"]
                  });

                  this.calculateItemData(data1.squantity, data1.quantity, data1.price, data1.matwt, data1.pricebasedon, data1.discountrate, data1.discounttype, data1.taxrate, k);
                  //for hsn
                  timer(3000).subscribe
                    (x => {
                      const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);
                      //console.log("distinctArrayHsnCode: " + distinctArrayHsnCode);
                      this.addItemGrpHsn();
                      while (this.credit_item_groupwise_hsnsumm.length)
                        this.credit_item_groupwise_hsnsumm.removeAt(0);
                      for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                        let DiscountAmt = 0;
                        for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                          if (this.sales_credit_note_item_dtls.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                            DiscountAmt += this.sales_credit_note_item_dtls.at(k).get("amount").value - this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                           // console.log("DiscountAmt:" + DiscountAmt);
                          }
                        }
                        this.addItemGrpHsn();
                      //  console.log("hsn_code  :" + distinctArrayHsnCode[j]); // 1, "string", false
                        this.credit_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                      }
                    }
                    )


                  timer(3500).subscribe
                    (x => {
                      //console.log("ItemGrLength: " + this.ItemGr.length);
                      const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);
                      //console.log("distinctArray: " + distinctArray);
                      //let j=0
                      this.addItemGrp();
                      while (this.credit_item_groupwise_summ.length)
                        this.credit_item_groupwise_summ.removeAt(0)
                      for (let j = 0; j < distinctArray.length; j++) {
                        let Amt = 0;
                        let Discount = 0;

                        for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                          if (this.sales_credit_note_item_dtls.at(k).get("item_group").value == distinctArray[j]) {
                            Amt += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
                            Discount += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
                            //console.log("Amt:" + Amt);
                            //console.log("Discount : " + Discount);
                          }
                        }
                        this.addItemGrp();
                        //console.log("Item  :" + distinctArray[j]); // 1, "string", false
                        this.credit_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                        forkJoin(
                          this.Service.getItemGroupSalesAcc(distinctArray[j]),
                        ).subscribe(([ItemgrpLedger]) => {
                          this.credit_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });

                          this.status = true;
                        });
                      }
                    }
                    )

                  timer(5000).subscribe
                    (x => {
                      this.StateName = this.userForm.get("state").value;
                      //console.log("TaxCodeLength: "+this.TaxCode.length);
                      const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                      //console.log("distinctArrayTax: "+distinctArrayTax);

                      this.addItemGrpTax();
                      while (this.credit_item_groupwise_taxsumm.length)
                        this.credit_item_groupwise_taxsumm.removeAt(0)
                      for (let j = 0; j < distinctArrayTax.length; j++) {
                        let TaxRate = 0;
                        let TaxAmt = 0;

                        for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                          if (this.sales_credit_note_item_dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                            TaxRate = this.sales_credit_note_item_dtls.at(k).get("tax_rate").value;
                            TaxAmt += this.sales_credit_note_item_dtls.at(k).get("tax_amt").value;
                            //console.log("TaxRate:"+TaxRate);   
                            //console.log("TaxAmt : "+TaxAmt);                    
                          }
                        }
                        this.addItemGrpTax();
                        //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
                        this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                        if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                          forkJoin(
                            this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                          ).subscribe(([TaxData]) => {

                            if (TaxData) {
                              this.credit_item_groupwise_taxsumm.at(j).patchValue({
                                percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                                , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                              });

                              this.status = true;

                              this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                              this.StateName = this.userForm.get("state").value;
                              this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


                             // if (this.StateName == 'BIHAR') {
                              if(this.StateName == this.company_state) {
                                let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                                let Sgst = (this.Tax_Amt - Cgst);
                                this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                              }
                              else { this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                              const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                              for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                let Amount = 0;
                                let DiscountAmt = 0;
                                let Taxable_Amnt = 0;

                                for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                                  if (this.sales_credit_note_item_dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                    Amount += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
                                    DiscountAmt += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
                                    // Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                                    Taxable_Amnt = Number(this.round((Number(Amount) - Number(DiscountAmt)), 2));
                                    //console.log("Taxable_Amnt : " + Taxable_Amnt)
                                    // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                  }
                                }
                                this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                              }
                            }

                            else {
                              //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                              alert("something error is happened");
                            }

                          }, (error) => {
                            this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");

                          });
                        }
                      }
                    })
                  k = k + 1;
                  timer(500).subscribe
                    (x => {
                      let TotalAmtt = 0;
                      for (let i = 0; i < this.sales_credit_note_item_dtls.length; i++) {
                        TotalAmtt += Number(this.sales_credit_note_item_dtls.at(i).get("total_amt").value);
                      }
                      let Ttal = TotalAmtt.toFixed(2);
                      this.userForm.patchValue({ grand_total: Ttal })
                    })
                  //this.userForm.patchValue({grand_total: (Math.round(this.grandTotal * 1000)/1000).toFixed(3)})
                  // this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
                  //   this.add, this.sub, this.tcsAmt, this.appChargesAmt)
                });
              }
            }



            this.status = false;
            forkJoin(
              this.DropDownListService.getReturnAppTransInfo(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalDtls(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalBD(data["salesreturnid"]),
              this.DropDownListService.getReturnApprovalSD(data["salesreturnid"]),

            ).subscribe(([transData, sReturnData, brokerData, shipmentData]) => {
              console.log("sales approval transData: " + JSON.stringify(transData));
              let k = 0;
              this.addTransporter();
              this.transporter_sl_no = 0;
              while (this.sales_credit_note_trans_dtls.length)
                this.sales_credit_note_trans_dtls.removeAt(0)
              for (let data1 of transData) {
                this.addTransporter();
                this.sales_credit_note_trans_dtls.at(k).patchValue(data1);
                k = k + 1;
              }

              this.sales_credit_note_shipment_dtls.patchValue({
                shipaddr: shipmentData["shipaddr"],
                shipdtls: shipmentData["shipdetails"], paytoaddr: shipmentData["payaddr"], paytodtls: shipmentData["paydetails"]
              });

              this.userForm.patchValue({
                remarks: sReturnData["remark"],
                salesorderno: sReturnData["salesreturnno"], salesorderdate: sReturnData["salesreturndate"]
              });

              this.DropDownListService.getSalesInvDetails(sReturnData["referance_id"]).subscribe(data => {
                //this.userForm.patchValue({item_total_gl_ac: data["item_total_gl_ac"], tax_total_gl_ac:data["tax_total_gl_ac"],challan:data["challan"],e_invoice_no:data["e_invoice_no"],
                this.userForm.patchValue({
                  item_total_gl_ac: data["item_total_gl_ac"], tax_total_gl_ac: data["tax_total_gl_ac"], challan: data["challan"],
                  discount_gl_ac: data["discount_gl_ac"], net_total_gl_ac: data["net_total_gl_ac"], total_bill_amt_gl_ac: data["total_bill_amt_gl_ac"], refchallanno: data["refchallanno"],
                  applicable_gl_ac: data["applicable_gl_ac"], adj1_gl_ac: data["adj1_gl_ac"], adj2_gl_ac: data["adj2_gl_ac"], roundoff_gl_ac: data["roundoff_gl_ac"], refchallandate: data["refchallandate"],
                  final_bill_amt_gl_ac: data["final_bill_amt_gl_ac"], tcsglac: data["tcsglac"], payable_amt_gl_ac: data["payable_amt_gl_ac"]
                });
                this.status = true;
              });

              //Broker Dtls
              let j = 0;
              this.addBrokers();
              this.broker_sl_no = 0;
              while (this.sales_credit_note_broker_dtls.length)
                this.sales_credit_note_broker_dtls.removeAt(0);
              for (let data1 of brokerData) {
                this.addBrokers();
                this.sales_credit_note_broker_dtls.at(j).patchValue({
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

    }

  }


  Tax_Amt: any;
  ItemGr = [];
  Tax_Rate: any;
  TaxCode = [];
  TaxRate = [];
  HsnCode = [];
  StateName: any;
  NewItemGrp: any = [];
  //  TaxCodee:any;
  Percentage: any;
  TcsAmt: any;

  openSalesRetPopUp() {

    if (this.userForm.get("invoice_type").value == "INV00003") {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      if (this.userForm.get("invoice_type").value == 0) {
        alert("Select Invoice Type Before Clicking Sales Return Note!");
        this.status = true;
      }
      else if (this.b_unit == "0") {
        alert("Select Business Unit Before Clicking Sales Return Note!");
        this.status = true;
      }
      else if (this._customerId == "0") {
        alert("Select Party Name Before Clicking Sales Return Note!");
        this.status = true;
      }
      else if (this.userForm.get("challan").value == null) {
        alert("Select Challan Before Clicking Sales Return Note!");
        this.status = true;
      }
      else {
        this.Id = this.userForm.get("id").value;
        if (this.Id == null || this.Id == '') {
          this.Id = 0;
        }

        dialogConfig.data = { party_id: this._customerId, bunit: this.b_unit, date: this.userForm.get("creditnotedate").value, id: this.Id };
        let dialogref1;
        
        dialogref1 = this.dialog.open(CreditnotejobworkComponent, dialogConfig);
        dialogref1.afterClosed().subscribe(data => {

          if (data != '' && data["salesreturnnoteid"] != '') {
            this.userForm.patchValue({ referance_id: data["salesreturnnoteid"], salesorderno: data["salesreturnnumber"], salesorderdate: data["salesreturndate"], e_invoice_no: '' });





            this.status = true;
            forkJoin(
              this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, this.userForm.get("invoice_type").value),
              this.DropDownListService.getItemServiceList(this.company_name),
              this.DropDownListService.getsalereturnjobworkprice(data["returnnoteid"]),
              this.Service.custAddRetriveList(this.userForm.get("party").value),
              this.Service.taxCodeDtlsRetriveList("TC00002")
            ).subscribe(([itemlist, service, saleorderjobprice, state, taxlist]) => {
              this.status = false;
              this.jobitemlist = itemlist;
              this.item_services = service;
              this.taxcodelist = taxlist;
              let u = 0;
              this.jobpackinglist = [];
              this.selectedJobItem = [];
              this.selectedJobPacking = [];
              this.TaxCode = [];
              this.TaxRate = [];

              this.selectedService = [];
              this.totalItem = 0;
              this.totalDiscount = 0;
              this.totalTaxAmt = 0;
              this.grandTotal = 0;
              this._taxAmt = 0;


              this.addJobworkItemservice();
              this.service_sl_no = 0;
              while (this.sales_credit_note_item_dtls_for_jobwork_price.length) { this.sales_credit_note_item_dtls_for_jobwork_price.removeAt(0); }
              let jp = 0;
              let grandtotal: number = 0;
              for (let data1 of saleorderjobprice) {
                let totjobprice = 0;

                this.addJobworkItemservice();
                this.selectedService[jp] = data1["item_service"];
                //  this.sales_Invoice_Item_Dtls_for_jobwork_price.patchValue(saleorderjobprice);
                totjobprice = this.round((Number(data["job_price_total"]) * Number(data1["job_price"])), 2);
                let igstamt: any = 0, cgstAmount: any = 0, sgstAmount: any = 0, taxAmount: any = 0, totalAmount: any = 0;
                //if (state["state"] == "BIHAR") {
                  if (state["state"] == this.company_state) {
                  cgstAmount = Number(this.round(Number(totjobprice * (data1["cgst_tax"] / 100)), 2));
                  sgstAmount = Number(this.round(Number(totjobprice * (data1["sgst_tax"] / 100)), 2));
                  igstamt = 0;
                }
                else {
                  cgstAmount = 0;
                  sgstAmount = 0;
                  igstamt = Number(this.round(Number(totjobprice * (data1["igst_tax"] / 100)), 2));
                }

                console.log(" total price " + data["job_price_total"] + " // " + totjobprice)

                taxAmount = Number(cgstAmount) + Number(sgstAmount) + Number(igstamt);

                totalAmount = Number(this.round(taxAmount, 2)) + Number(this.round(totjobprice, 2));

                this.sales_credit_note_item_dtls_for_jobwork_price.at(jp).patchValue({
                  slno: data1["slno"], item_service: data1["item_service"],
                  sac_code: data1["sac_code"], job_price: data1["job_price"], tax_value: this.round(totjobprice, 2), cgst_tax: data1["cgst_tax"], cgst_amt: cgstAmount,
                  sgst_tax: data1["sgst_tax"], sgst_amt: sgstAmount, tot_amount: this.round(totalAmount, 2), igst_tax: data1["igst_tax"], igst_amt: igstamt, taxcode: data1["taxcode"]
                });

                this.totalItem += Number(this.round(totjobprice, 2));

                this._taxAmt += (Number(this.round(totalAmount, 2)) - Number(this.round(totjobprice, 2)));
                this.TaxCode.push(data1["taxcode"]);
                this.TaxRate.push(data1["igst_tax"]);
                jp++;

              }
              this.userForm.patchValue({ grand_total: this.totalItem })
              //starts here 
              let Amt = this.totalItem;

              this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;

              let netAmt = this.totalItem - this.totalDiscount;
              let totalAmt = netAmt + this.totalTaxAmt;
              let finalBillamount = totalAmt + this.appCharges + this.adj1 - this.adj2;
              this.userForm.patchValue({
                item_total: Amt.toFixed(2),
                discount: this.totalDiscount.toFixed(2),
                tax_total: this.totalTaxAmt.toFixed(2)
              })
              let totlround = Math.round(finalBillamount);
              let totlWithoutround = finalBillamount.toFixed(2);
              this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);




              this.TcsAmt1 = 0;
              this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
              let t = Number(totlround) + Number(this.TcsAmt1)

              if (this.einvoiceshow == true) {
                this.userForm.patchValue({ payable_amt: finalBillamount.toFixed(2), roundoff_amt: 0 })
              }
              else {
                this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })

                let roundOfAmt = Math.round(finalBillamount * 100) % 100;
                if (roundOfAmt >= 50) {
                  roundOfAmt = 100 - roundOfAmt;
                  this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
                }
                else {
                  this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
                };
              }

              /*this.userForm.patchValue({payable_amt:totlround.toFixed(2)})
              let roundOfAmt = Math.round(finalBillamount * 100) % 100;
              if(roundOfAmt >= 50)
              {
                roundOfAmt = 100 - roundOfAmt;
                this.userForm.patchValue({roundoff_amt: Number(Number(roundOfAmt)/100).toFixed(2)})
              }
              else
              {
                this.userForm.patchValue({roundoff_amt: Number(0 - Number(roundOfAmt)/100).toFixed(2)});
              };*/

              //STARTS HERE
              timer(0).subscribe
                (x => {
                  this.StateName = this.userForm.get("state").value;
                  const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                  this.addItemGrpTax();
                  while (this.credit_item_groupwise_taxsumm.length)
                    this.credit_item_groupwise_taxsumm.removeAt(0)
                  for (let j = 0; j < distinctArrayTax.length; j++) {
                    let TaxRate = 0;
                    let TaxAmt = 0;
                    for (let k = 0; k < this.sales_credit_note_item_dtls_for_jobwork_price.length; k++) {
                      if (this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("taxcode").value == distinctArrayTax[j]) {
                        TaxRate = this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("igst_tax").value;
                       // if (this.StateName == 'BIHAR') {
                        if (this.StateName == this.company_state) {
                          TaxAmt += (Number(this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("cgst_amt").value) + Number(this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("sgst_amt").value));
                        }
                        else {
                          TaxAmt += this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("igst_amt").value;
                        }

                      }
                    }
                    this.addItemGrpTax();
                    this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                    if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                      forkJoin(
                        this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                      ).subscribe(([TaxData]) => {
                        if (TaxData) {
                          console.log("hello")
                          this.credit_item_groupwise_taxsumm.at(j).patchValue({ percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger, sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger });
                          this.status = true;
                          this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                          this.StateName = this.userForm.get("state").value;
                          this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

                          //if (this.StateName == 'BIHAR') {
                          if (this.StateName == this.company_state) {
                            let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                            let Sgst = (this.Tax_Amt - Cgst);
                            console.log("hello bihar" + this.Tax_Amt + " - " + Cgst + " " + Sgst)
                            this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: this.round(Cgst, 2), sgst: this.round(Sgst, 2) });
                          }
                          else {
                            this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 });
                          }
                          const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);
                          for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                            let Amount = 0;
                            let DiscountAmt = 0;
                            let Taxable_Amnt = 0;
                            for (let k = 0; k < this.sales_credit_note_item_dtls_for_jobwork_price.length; k++) {

                              if (this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("igst_tax").value == distinctArrayTaxRate[j]) {
                                Amount += this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("tax_value").value;

                                Taxable_Amnt = Number(Amount.toFixed(2));
                              }
                            }
                            this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                          }
                        }
                        else {

                          alert("something error is happened");
                        }
                      });
                    }
                  }
                })

              timer(500).subscribe
                (x => {
                  let TotalAmtt = 0;
                  for (let i = 0; i < this.sales_credit_note_item_dtls_for_jobwork_price.length; i++) {
                    TotalAmtt += Number(this.sales_credit_note_item_dtls_for_jobwork_price.at(i).get("tax_value").value);
                  }
                  let Ttal = TotalAmtt.toFixed(2);
                  this.userForm.patchValue({ grand_total: Ttal })
                })
              //ENDS HERE 
              this.addJobworkItem();
              this.jobwork_sl_no = 0;
              while (this.sales_credit_note_item_dtls_for_jobwork.length) { this.sales_credit_note_item_dtls_for_jobwork.removeAt(0); }

              for (let data1 of data.job_details) {
                console.log(JSON.stringify(data.delivery_challan_Item_Dtls_for_jobwork))

                if (data1.checkbox == true || data1.checkbox == "true") {
                  this.status = false;
                  console.log("insideim ")


                  this.DropDownListService.getItemMasterPackMat(data1["job_item"])
                    .subscribe(packingList => {
                      this.addJobworkItem();
                      this.jobpackinglist[u] = packingList;
                      this.selectedJobItem[u] = data1["job_item"];
                      this.selectedJobPacking[u] = data1["job_packing"];
                      this.sales_credit_note_item_dtls_for_jobwork.patchValue(data.job_details);
                      u++;
                      this.status = true;
                    });
                }

              }


            });
            // });
            //}
            //here job work done
            console.log(" here " + data["salesreturnnoteid"] + " / " + data["returnnoteid"])
            this.status = false;
            forkJoin(
              this.DropDownListService.getSalesRtnNoteTransInfo(data["salesreturnnoteid"]),
              this.DropDownListService.getSalesReturnNoteDtls(data["salesreturnnoteid"]),
              this.DropDownListService.getSalesReturnNoteBD(data["salesreturnnoteid"]),
              this.DropDownListService.getSalesReturnNoteSD(data["salesreturnnoteid"]),
            ).subscribe(([transData, sReturnData, brokerData, shipmentData]) => {

              let k = 0;
              this.addTransporter();
              this.transporter_sl_no = 0;
              while (this.sales_credit_note_trans_dtls.length)
                this.sales_credit_note_trans_dtls.removeAt(0)
              for (let data1 of transData) {
                console.log(" transData " + JSON.stringify(transData))
                this.addTransporter();

              }
              this.sales_credit_note_trans_dtls.at(0).patchValue({ vehicleno: transData[0]["vehicleno"], transname: transData[0]["transname"], vehicletype: transData[0]["vehicletype"], ewaybillno: transData[0]["ewaybillno"] });//ewaybilldate no dto 
              this.sales_credit_note_shipment_dtls.patchValue({
                shipaddr: shipmentData["shipaddr"],
                shipdtls: shipmentData["shipdetails"], paytoaddr: shipmentData["payaddr"], paytodtls: shipmentData["paydetails"]
              });

              console.log("sReturnData" + JSON.stringify(sReturnData));

              this.DropDownListService.getReturnApprovalDtls(sReturnData["referance_id"]).subscribe(DeliveryData => {

                if (DeliveryData["referance_id"].substring(0, 2) == "DC") {
                  this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + DeliveryData["referance_id"]).subscribe(DeliveryData => {
                    this.userForm.patchValue({ refchallanno: DeliveryData["challan_no"], refchallandate: DeliveryData["challan_date"] });
                    this.status = true;
                  });
                }

                if (DeliveryData["referance_id"].substring(0, 2) == "SO") {
                  this.DropDownListService.getSalesOrderDetails(DeliveryData["referance_id"]).subscribe(SalesOrderData => {
                    this.userForm.patchValue({ refchallanno: SalesOrderData["order_no"], refchallandate: SalesOrderData["order_date"] });
                    this.status = true;
                  });
                }

              });

              this.userForm.patchValue({
                remarks: sReturnData["remark"],
                salesorderno: sReturnData["salesreturnnoteno"], salesorderdate: sReturnData["salesreturnnotedate"]
              });

              //Broker Dtls
              let j = 0;
              this.addBrokers();
              this.broker_sl_no = 0;
              while (this.sales_credit_note_broker_dtls.length)
                this.sales_credit_note_broker_dtls.removeAt(0);
              for (let data1 of brokerData) {
                this.addBrokers();
                this.sales_credit_note_broker_dtls.at(j).patchValue({
                  brokercode: data1["brokercode"],
                  basis: data1["basis"], rate: data1["rate"]
                });
                j = j + 1;
              }
              this.status = true;

              console.log("hello vehicle " + this.sales_credit_note_trans_dtls.at(0).get("vehicleno").value)

            });


          }

        });

      }
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      if (this.userForm.get("invoice_type").value == 0) {
        alert("Select Invoice Type Before Clicking Sales Return Note!");
        this.status = true;
      }
      else if (this.b_unit == "0") {
        alert("Select Business Unit Before Clicking Sales Return Note!");
        this.status = true;
      }
      else if (this._customerId == "0") {
        alert("Select Party Name Before Clicking Sales Return Note!");
        this.status = true;
      }
      else if (this.userForm.get("challan").value == null) {
        alert("Select Challan Before Clicking Sales Return Note!");
        this.status = true;
      }
      else {
        this.Id = this.userForm.get("id").value;
        console.log("tuhin here  :: " + this.Id)
        if (this.Id == null || this.Id == '') {
          this.Id = 0;
          console.log("tuhin here12345 :: " + this.Id)
        }

        
        if (this.userForm.get("challan").value == 'Multiple') {
          dialogConfig.data = { party_id: this._customerId, bunit: this.b_unit, date: this.currentDate, finYear: this.financialYear, company_id: this.company_name, id: this.Id, invoicetype: this.userForm.get("invoice_type").value };
          let dialogref1;
          //alert(this.Id+"///"+this.userForm.get("invoice_type").value)
          
          dialogref1 = this.dialog.open(MultipleSalesReturnPopupComponent, dialogConfig);
          dialogref1.afterClosed().subscribe(data => {
            //statts here

            if (data != '' && data["salesreturnnoteid"] != '0') {
              let k = 0;
              this.grandTotal = 0;
              this.totalItem = 0;
              this.totalDiscount = 0;
              this.totalNetAmt = 0;
              this.totalTaxAmt = 0;
              this.packingItem = [];

              let splitval = data.salesreturnnoteid.toString().split(",");
              // alert(data["salesreturndate"])
              //this.userForm.patchValue({referance_id: data["salesreturnnoteid"]});

              console.log("chkdata:" + JSON.stringify(data))
              this.userForm.patchValue({ referance_id: data["salesreturnnoteid"], salesorderno: data["salesreturnnumber"], salesorderdate: data["salesreturndate"], allsalesorderdate: data["allsalesreturndate"], e_invoice_no: '', refchallanno: data["salesreturnnoterefno"] });

              this.addItem();
              this.item_sl_no = 0;
              while (this.sales_credit_note_item_dtls.length)
                this.sales_credit_note_item_dtls.removeAt(0);
              console.log("salesReturn item dtls: " + JSON.stringify(data))
              for (let data1 of data.sales_return_note_Item_Dtls) {
                if (data1.checkbox == true) {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                    this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name),
                    this.DropDownListService.getItemNameById(data1["itemcode"], this.company_name),
                  ).subscribe(([packingList, capacityEmptyWt, ItemGrp]) => {
                    this.status = true;
                    this.packingItem[k] = packingList;
                    this.capacity[k] = capacityEmptyWt["capacity"];
                    this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                    this.grandTotal = (Number(this.grandTotal) + Number(data1.totalamt));
                    this.totalItem = Number(this.totalItem) + Number(data1.amount);
                    this.totalDiscount = Number(this.totalDiscount) + Number(data1.discountamt);
                    this.totalNetAmt = Number(this.totalNetAmt) + (data1.amount - data1.discountamt);
                    this.totalTaxAmt = Number(this.totalTaxAmt) + Number(data1.taxamt);

                    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
                      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
                    this.grandTotal = Number(this.grandTotal) + Number(data1["totalamt"]);

                    // console.log("Alll data: "+JSON.stringify(data1) )
                    this.ItemGr.push(ItemGrp["item_group"]);
                    this.TaxCode.push(data1["taxcode"]);
                    this.HsnCode.push(data1["hsn_code"]);
                    this.TaxRate.push(data1["taxrate"]);

                    this.addItem();
                    this.sales_credit_note_item_dtls.at(k).patchValue({ item_group: ItemGrp["item_group"] });
                    this.sales_credit_note_item_dtls.at(k).patchValue({
                      item_code: data1.itemcode, hsn_code: data1.hsn_code,
                      packing: data1.packing, quantity: data1.quantity, uom: data1.uom, squantity: data1.squantity,
                      suom: data1.suom, mat_wt: data1.matwt, price: data1.price, price_based_on: data1.pricebasedon,
                      amount: data1.amount, discount_type: data1.discounttype, discount_rate: data1.discountrate,
                      discount_amt: data1.discountamt, tax_code: data1.taxcode, tax_rate: data1.taxrate,
                      tax_amt: data1.taxamt, total_amt: data1.totalamt, acc_norms: data1.accnorms, salesreturnnoteno: data1.salesreturnnoteno, salesreturnnoteid: data1.salesreturnnoteid
                    });

                    timer(4300).subscribe
                      (x => {
                        const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);
                        //console.log("distinctArrayHsnCode: "+distinctArrayHsnCode);
                        this.addItemGrpHsn();
                        while (this.credit_item_groupwise_hsnsumm.length)
                          this.credit_item_groupwise_hsnsumm.removeAt(0);
                        for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                          let DiscountAmt = 0;
                          for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                            if (this.sales_credit_note_item_dtls.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                              DiscountAmt += this.sales_credit_note_item_dtls.at(k).get("amount").value - this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                              // console.log("DiscountAmt:"+DiscountAmt);              
                            }
                          }
                          this.addItemGrpHsn();
                          //console.log("hsn_code  :"+distinctArrayHsnCode[j]); // 1, "string", false
                          this.credit_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                        }
                      }
                      )


                    timer(4500).subscribe
                      (x => {
                        //console.log("ItemGrLength: "+this.ItemGr.length);
                        const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);
                        // console.log("distinctArray: "+distinctArray);
                        //let j=0
                        this.addItemGrp();
                        while (this.credit_item_groupwise_summ.length)
                          this.credit_item_groupwise_summ.removeAt(0)
                        for (let j = 0; j < distinctArray.length; j++) {
                          let Amt = 0;
                          let Discount = 0;

                          for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                            if (this.sales_credit_note_item_dtls.at(k).get("item_group").value == distinctArray[j]) {
                              Amt += this.sales_credit_note_item_dtls.at(k).get("amount").value;
                              Discount += this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                              //console.log("Amt:"+Amt);   
                              // console.log("Discount : "+Discount);                    
                            }
                          }
                          this.addItemGrp();
                          //console.log("Item  :"+distinctArray[j]); // 1, "string", false
                          this.credit_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                          forkJoin(
                            this.Service.getItemGroupSalesAcc(distinctArray[j]),
                          ).subscribe(([ItemgrpLedger]) => {
                            this.credit_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });
                            this.status = true;
                          });
                        }
                      }
                      )

                    timer(5000).subscribe
                      (x => {
                        this.StateName = this.userForm.get("state").value;
                        // console.log("TaxCodeLength: "+this.TaxCode.length);
                        const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                        // console.log("distinctArrayTax: "+distinctArrayTax);

                        this.addItemGrpTax();
                        while (this.credit_item_groupwise_taxsumm.length)
                          this.credit_item_groupwise_taxsumm.removeAt(0)
                        for (let j = 0; j < distinctArrayTax.length; j++) {
                          let TaxRate = 0;
                          let TaxAmt = 0;

                          for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                            if (this.sales_credit_note_item_dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                              TaxRate = this.sales_credit_note_item_dtls.at(k).get("tax_rate").value;
                              TaxAmt += this.sales_credit_note_item_dtls.at(k).get("tax_amt").value;
                              //  console.log("TaxRate:"+TaxRate);   
                              //  console.log("TaxAmt : "+TaxAmt);                    
                            }
                          }
                          this.addItemGrpTax();
                          //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
                          this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                          if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                            forkJoin(
                              this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                            ).subscribe(([TaxData]) => {

                              if (TaxData) {
                                this.credit_item_groupwise_taxsumm.at(j).patchValue({
                                  percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                                  , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                                });

                                this.status = true;

                                this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                                this.StateName = this.userForm.get("state").value;
                                this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


                                //if (this.StateName == 'BIHAR') {
                                  if (this.StateName == this.company_state) {
                                  let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                                  let Sgst = (this.Tax_Amt - Cgst);
                                  this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                                }
                                else { this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                                const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                                for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                  let Amount = 0;
                                  let DiscountAmt = 0;
                                  let Taxable_Amnt = 0;

                                  for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                                    if (this.sales_credit_note_item_dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                      Amount += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
                                      DiscountAmt += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
                                      // Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                                      Taxable_Amnt = Number(this.round((Number(Amount) - Number(DiscountAmt)), 2));
                                      console.log("Taxable_Amnt : " + Taxable_Amnt)
                                      // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                    }
                                  }
                                  this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                                }
                              }

                              else {
                                //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                alert("something error is happened");
                              }

                            }, (error) => {
                              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");

                            });
                          }
                        }
                      })
                    k = k + 1;
                    // this.userForm.patchValue({grand_total: this.grandTotal.toFixed(3)})
                    timer(500).subscribe
                      (x => {
                        let TotalAmtt = 0;
                        for (let i = 0; i < this.sales_credit_note_item_dtls.length; i++) {
                          TotalAmtt += Number(this.sales_credit_note_item_dtls.at(i).get("total_amt").value);
                        }
                        let Ttal = TotalAmtt.toFixed(2);
                        this.userForm.patchValue({ grand_total: Ttal })
                      })
                  });
                }
              }

              this.status = false;
              forkJoin(
                this.DropDownListService.getMultipleSalesRtnNoteTransInfo(data["salesreturnnoteid"]),
                this.DropDownListService.getSalesReturnNoteDtls(splitval[0]),
                this.DropDownListService.getSalesReturnNoteBD(splitval[0]),
                this.DropDownListService.getSalesReturnNoteSD(splitval[0]),
              ).subscribe(([transData, sReturnData, brokerData, shipmentData]) => {
                //Transporter Details
                console.log("sales return transData: " + JSON.stringify(transData));
                let k = 0;
                this.addTransporter();
                this.transporter_sl_no = 0;
                while (this.sales_credit_note_trans_dtls.length)
                  this.sales_credit_note_trans_dtls.removeAt(0)
                for (let data1 of transData) {
                  this.addTransporter();
                  this.sales_credit_note_trans_dtls.at(k).patchValue(data1);

                  k = k + 1;
                }

                this.sales_credit_note_shipment_dtls.patchValue({
                  shipaddr: shipmentData["shipaddr"],
                  shipdtls: shipmentData["shipdetails"], paytoaddr: shipmentData["payaddr"], paytodtls: shipmentData["paydetails"]
                });

                console.log("sReturnData" + JSON.stringify(sReturnData));
                //alert("Return App note id : "+sReturnData["referance_id"]);                
                this.DropDownListService.getReturnApprovalDtls(sReturnData["referance_id"]).subscribe(DeliveryData => {
                  //alert("Deliverys id : "+DeliveryData["referance_id"]);
                  // alert("Code: "+DeliveryData["referance_id"].substring(0,2));
                  if (DeliveryData["referance_id"].substring(0, 2) == "DC") {
                    this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + DeliveryData["referance_id"]).subscribe(DeliveryData => {
                      // this.userForm.patchValue({refchallanno:DeliveryData["challan_no"],refchallandate:DeliveryData["challan_date"] });
                      this.userForm.patchValue({ refchallandate: DeliveryData["challan_date"] });
                      this.status = true;
                    });
                  }

                  if (DeliveryData["referance_id"].substring(0, 2) == "SO") {
                    this.DropDownListService.getSalesOrderDetails(DeliveryData["referance_id"]).subscribe(SalesOrderData => {
                      this.userForm.patchValue({ refchallanno: SalesOrderData["order_no"], refchallandate: SalesOrderData["order_date"] });
                      this.status = true;
                    });
                  }

                });

                this.userForm.patchValue({
                  remarks: sReturnData["remark"],
                  salesorderno: data["salesreturnnumber"], salesorderdate: data["salesreturndate"]
                });

                //Broker Dtls
                let j = 0;
                this.addBrokers();
                this.broker_sl_no = 0;
                while (this.sales_credit_note_broker_dtls.length)
                  this.sales_credit_note_broker_dtls.removeAt(0);
                for (let data1 of brokerData) {
                  this.addBrokers();
                  this.sales_credit_note_broker_dtls.at(j).patchValue({
                    brokercode: data1["brokercode"],
                    basis: data1["basis"], rate: data1["rate"]
                  });
                  j = j + 1;
                }
                this.status = true;
              });
            }

            //ends here


          });

        }
        else {

          // dialogConfig.data = {party_id: this._customerId, bunit: this.b_unit, date: this.currentDate, finYear: this.financialYear, company_id: this.company_name};
          dialogConfig.data = { party_id: this._customerId, bunit: this.b_unit, date: this.currentDate, finYear: this.financialYear, company_id: this.company_name, id: this.Id, invoicetype: this.userForm.get("invoice_type").value };
          let dialogref;
          dialogref = this.dialog.open(SalesReturnNotePopUpComponent, dialogConfig);
          dialogref.afterClosed().subscribe(data => {
            if (data != '' && data["salesreturnnoteid"] != '0') {
              let k = 0;
              this.grandTotal = 0;
              this.totalItem = 0;
              this.totalDiscount = 0;
              this.totalNetAmt = 0;
              this.totalTaxAmt = 0;
              this.packingItem = [];

              let itemtoal: number = 0;

              this.userForm.patchValue({ referance_id: data["salesreturnnoteid"], salesorderno: data["salesreturnnumber"], salesorderdate: data["salesreturndate"], e_invoice_no: '' });

              this.addItem();
              this.item_sl_no = 0;
              while (this.sales_credit_note_item_dtls.length)
              this.sales_credit_note_item_dtls.removeAt(0);

              for (let data1 of data.sales_return_note_Item_Dtls) {
                if (data1.checkbox == true) {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                    this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"], this.company_name),
                    this.DropDownListService.getItemNameById(data1["itemcode"], this.company_name),
                    this.Service.custAccountRetriveList(this._customerId)
                  ).subscribe(([packingList, capacityEmptyWt, ItemGrp,tcs]) => {
                    this.status = true;
                    this.packingItem[k] = packingList;
                    this.capacity[k] = capacityEmptyWt["capacity"];
                    this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
                   // this.grandTotal = (Number(this.grandTotal) + Number(data1.totalamt));
                   // this.totalItem = Number(this.totalItem) + Number(data1.amount);
                   // this.totalDiscount = Number(this.totalDiscount) + Number(data1.discountamt);
                   // this.totalNetAmt = Number(this.totalNetAmt) + (data1.amount - data1.discountamt);
                   // this.totalTaxAmt = Number(this.totalTaxAmt) + Number(this.round(Number(data1.taxamt), 2));

                    // this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
                    // this.appCharges, this.adj1, this.adj2, this.tcsAmt)
                    // this.grandTotal = Number(this.grandTotal) + Number(data1["totalamt"]);

                    this.ItemGr.push(ItemGrp["item_group"]);
                    this.TaxCode.push(data1["taxcode"]);
                    this.HsnCode.push(data1["hsn_code"]);
                    this.TaxRate.push(data1["taxrate"]);

                    this.addItem();

                    this.sales_credit_note_item_dtls.at(k).patchValue({ item_group: ItemGrp["item_group"] });
                    this.sales_credit_note_item_dtls.at(k).patchValue({
                      item_code: data1.itemcode, hsn_code: data1.hsn_code,
                      packing: data1.packing, quantity: data1.quantity.toFixed(3), uom: data1.uom, squantity: data1.squantity,
                      suom: data1.suom, mat_wt: data1.matwt.toFixed(3), price: data1.price.toFixed(2), price_based_on: data1.pricebasedon,
                      amount: data1.amount.toFixed(2), discount_type: data1.discounttype, discount_rate: data1.discountrate,
                      discount_amt: data1.discountamt, tax_code: data1.taxcode, tax_rate: data1.taxrate,
                      tax_amt: data1.taxamt.toFixed(2), total_amt: data1.totalamt.toFixed(2), acc_norms: data1.accnorms, cgstamt: data1.cgstamt.toFixed(2),
                      sgstamt: data1.sgstamt.toFixed(2),
                      igstamt: data1.igstamt.toFixed(2)
                    });

                    itemtoal = itemtoal + Number(data1["amount"]);
                  console.log(" amt " + itemtoal +" / " + data1["amount"])

                    this.amt = itemtoal;
                console.log(" amt "+this.amt)

                    this.totalItem = itemtoal;
                  console.log(" totalItem "+this.totalItem)

                    this.discountAmt = data1["discountamt"];
                  //  console.log(" discountAmt "+this.discountAmt)

                    this.totalDiscount = this.totalDiscount + this.discountAmt;
                   // console.log(" totalDiscount "+this.totalDiscount)

                    this._taxAmt = data1["taxamt"];
                    console.log(" _taxAmt "+this._taxAmt + " / " +data1["taxamt"] )

                    this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;
                    console.log(" totalTaxAmt "+this.totalTaxAmt)

                    let Amt = this.totalItem;
                   // console.log(" Amt "+Amt)

                    let netAmt = this.totalItem - this.totalDiscount;
                   // console.log(" netAmt "+netAmt)

                    let totalAmt = netAmt + this.totalTaxAmt;
                  //  console.log(" totalAmt "+totalAmt)

                    let finalBillamount = totalAmt + this.appCharges + this.adj1 - this.adj2;
                  //  console.log(" finalBillamount "+finalBillamount)


                    this.userForm.patchValue({
                      item_total: Amt.toFixed(2),
                      discount: this.totalDiscount.toFixed(2),
                      tax_total: Number(this.round(this.totalTaxAmt, 2)).toFixed(2)

                    });

                    let totlround = Math.round(finalBillamount);
                    let totlWithoutround = finalBillamount.toFixed(2);
                    this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);


                    console.log(" totlround "+totlround  + " / " + finalBillamount +" / " + Amt)
                    this.TcsAmt1 = (Number(totlround * tcs.tcs_rate) / 100).toFixed(2);

                    this.userForm.patchValue({ tcsamt: this.TcsAmt1 });

                    let t = Number(totlround) + Number(this.TcsAmt1)
                    console.log(" e invoice "+this.einvoiceshow  )
                    if (this.einvoiceshow == true) {
                      this.userForm.patchValue({ payable_amt: finalBillamount.toFixed(2), roundoff_amt: 0 })


                    }
                    else {
                      this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })

                      let roundOfAmt = Math.round(finalBillamount * 100) % 100;
                      if (roundOfAmt >= 50) {
                        roundOfAmt = 100 - roundOfAmt;
                        this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
                      }
                      else {
                        this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
                      };

                    }

                    //console.log(this.sales_credit_note_item_dtls.at(k).get("amount").value)


                    timer(4300).subscribe
                      (x => {
                        const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);
                        //console.log("distinctArrayHsnCode: "+distinctArrayHsnCode);
                        this.addItemGrpHsn();
                        while (this.credit_item_groupwise_hsnsumm.length)
                          this.credit_item_groupwise_hsnsumm.removeAt(0);
                        for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                          let DiscountAmt = 0;
                          for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                            if (this.sales_credit_note_item_dtls.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                              DiscountAmt += this.sales_credit_note_item_dtls.at(k).get("amount").value - this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                              // console.log("DiscountAmt:"+DiscountAmt);              
                            }
                          }
                          this.addItemGrpHsn();
                          //console.log("hsn_code  :"+distinctArrayHsnCode[j]); // 1, "string", false
                          this.credit_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                        }
                      }
                      )


                    timer(4500).subscribe
                      (x => {
                        //console.log("ItemGrLength: "+this.ItemGr.length);
                        const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);
                        // console.log("distinctArray: "+distinctArray);
                        //let j=0
                        this.addItemGrp();
                        while (this.credit_item_groupwise_summ.length)
                          this.credit_item_groupwise_summ.removeAt(0)
                        for (let j = 0; j < distinctArray.length; j++) {
                          let Amt = 0;
                          let Discount = 0;

                          for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                            if (this.sales_credit_note_item_dtls.at(k).get("item_group").value == distinctArray[j]) {
                              Amt += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
                              Discount += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
                              // console.log("Amt:"+Amt);   
                              // console.log("Discount : "+Discount);                    
                            }
                          }
                          this.addItemGrp();
                         // console.log("Item  :" + distinctArray[j]); // 1, "string", false
                          this.credit_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                          forkJoin(
                            this.Service.getItemGroupSalesAcc(distinctArray[j]),
                          ).subscribe(([ItemgrpLedger]) => {
                            this.credit_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });
                            this.status = true;
                          });
                        }
                      }
                      )

                    timer(5000).subscribe
                      (x => {
                        this.StateName = this.userForm.get("state").value;
                        // console.log("TaxCodeLength: "+this.TaxCode.length);
                        const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                        // console.log("distinctArrayTax: "+distinctArrayTax);

                        this.addItemGrpTax();
                        while (this.credit_item_groupwise_taxsumm.length)
                          this.credit_item_groupwise_taxsumm.removeAt(0)
                        for (let j = 0; j < distinctArrayTax.length; j++) {
                          let TaxRate = 0;
                          let TaxAmt = 0;

                          for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                            if (this.sales_credit_note_item_dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                              TaxRate = this.sales_credit_note_item_dtls.at(k).get("tax_rate").value;
                              TaxAmt += this.sales_credit_note_item_dtls.at(k).get("tax_amt").value;
                              //  console.log("TaxRate:"+TaxRate);   
                              //  console.log("TaxAmt : "+TaxAmt);                    
                            }
                          }
                          this.addItemGrpTax();
                          //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
                          this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                          if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                            forkJoin(
                              this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                            ).subscribe(([TaxData]) => {

                              if (TaxData) {
                                this.credit_item_groupwise_taxsumm.at(j).patchValue({
                                  percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                                  , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                                });

                                this.status = true;

                                this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                                this.StateName = this.userForm.get("state").value;
                                this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


                                //if (this.StateName == 'BIHAR') {
                                  if (this.StateName == this.company_state) {
                                  let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                                  let Sgst = (this.Tax_Amt - Cgst);
                                  this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                                }
                                else { this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                                const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                                for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                  let Amount = 0;
                                  let DiscountAmt = 0;
                                  let Taxable_Amnt = 0;

                                  for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                                    if (this.sales_credit_note_item_dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                      Amount += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
                                      DiscountAmt += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
                                      // Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                                      Taxable_Amnt = Number(this.round((Number(Amount) - Number(DiscountAmt)), 2));
                                   //   console.log("Taxable_Amnt11 : " + Taxable_Amnt)
                                      // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                    }
                                  }
                                  this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt });
                                }
                              }

                              else {
                                //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                alert("something error is happened");
                              }

                            }, (error) => {
                              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");

                            });
                          }
                        }
                      })

                    k = k + 1;
                    timer(500).subscribe
                      (x => {
                        let TotalAmtt = 0;
                        for (let i = 0; i < this.sales_credit_note_item_dtls.length; i++) {
                          TotalAmtt += Number(this.sales_credit_note_item_dtls.at(i).get("total_amt").value);
                        }
                        let Ttal = TotalAmtt.toFixed(2);
                        this.userForm.patchValue({ grand_total: Ttal })
                      })
                  });
                }
              }

              this.status = false;
              forkJoin(
                this.DropDownListService.getSalesRtnNoteTransInfo(data["salesreturnnoteid"]),
                this.DropDownListService.getSalesReturnNoteDtls(data["salesreturnnoteid"]),
                this.DropDownListService.getSalesReturnNoteBD(data["salesreturnnoteid"]),
                this.DropDownListService.getSalesReturnNoteSD(data["salesreturnnoteid"]),
              ).subscribe(([transData, sReturnData, brokerData, shipmentData]) => {
                //Transporter Details
                // console.log("sales return transData: "+JSON.stringify(transData));
                //console.log("sales return sReturnData: "+JSON.stringify(sReturnData));
                //console.log("sales return brokerData: "+JSON.stringify(brokerData));
                //console.log("sales return shipmentData: "+JSON.stringify(shipmentData));
                let k = 0;
                this.addTransporter();
                this.transporter_sl_no = 0;
                while (this.sales_credit_note_trans_dtls.length)
                  this.sales_credit_note_trans_dtls.removeAt(0)
                for (let data1 of transData) {
                //  console.log(" transData " + JSON.stringify(transData))
                  this.addTransporter();
                  // //  this.sales_credit_note_trans_dtls.at(k).patchValue({vehicleno:data1["vehicleno"]});

                  // this.sales_credit_note_trans_dtls.patchValue(transData);
                  //   k = k + 1;
                }
                this.sales_credit_note_trans_dtls.at(0).patchValue({ vehicleno: transData[0]["vehicleno"], transname: transData[0]["transname"], vehicletype: transData[0]["vehicletype"], ewaybillno: transData[0]["ewaybillno"] });//ewaybilldate no dto 
                this.sales_credit_note_shipment_dtls.patchValue({
                  shipaddr: shipmentData["shipaddr"],
                  shipdtls: shipmentData["shipdetails"], paytoaddr: shipmentData["payaddr"], paytodtls: shipmentData["paydetails"]
                });

               // console.log("sReturnData" + JSON.stringify(sReturnData));
                // alert("Return App note id : "+sReturnData["referance_id"]);                
                this.DropDownListService.getReturnApprovalDtls(sReturnData["referance_id"]).subscribe(DeliveryData => {
                  //alert("Deliverys id : "+DeliveryData["referance_id"]);
                  // alert("Code: "+DeliveryData["referance_id"].substring(0,2));
                  if (DeliveryData["referance_id"].substring(0, 2) == "DC") {
                    this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + DeliveryData["referance_id"]).subscribe(DeliveryData => {
                      this.userForm.patchValue({ refchallanno: DeliveryData["challan_no"], refchallandate: DeliveryData["challan_date"] });
                      this.status = true;
                    });
                  }

                  if (DeliveryData["referance_id"].substring(0, 2) == "SO") {
                    this.DropDownListService.getSalesOrderDetails(DeliveryData["referance_id"]).subscribe(SalesOrderData => {
                      this.userForm.patchValue({ refchallanno: SalesOrderData["order_no"], refchallandate: SalesOrderData["order_date"] });
                      this.status = true;
                    });
                  }

                });

                this.userForm.patchValue({
                  remarks: sReturnData["remark"],
                  salesorderno: sReturnData["salesreturnnoteno"], salesorderdate: sReturnData["salesreturnnotedate"]
                });

                //Broker Dtls
                let j = 0;
                this.addBrokers();
                this.broker_sl_no = 0;
                while (this.sales_credit_note_broker_dtls.length)
                  this.sales_credit_note_broker_dtls.removeAt(0);
                for (let data1 of brokerData) {
                  this.addBrokers();
                  this.sales_credit_note_broker_dtls.at(j).patchValue({
                    brokercode: data1["brokercode"],
                    basis: data1["basis"], rate: data1["rate"]
                  });
                  j = j + 1;
                }
                this.status = true;

              //  console.log("hello vehicle " + this.sales_credit_note_trans_dtls.at(0).get("vehicleno").value)

              });
            }
          });



        }





      }


    }



  }

  calculateFinalBillAmt(amt, dscAmt, taxAmt, appCharges, adj1, adj2, tcs) {
    console.log("amt:" + amt + " dscAmt:" + dscAmt + " taxAmt:" + taxAmt + " appCharges:" + appCharges + " adj1:" + adj1 + " adj2:" + adj2 + " tcs:" + tcs)
    let netAmt = amt - dscAmt;
    let totalAmt = Number(netAmt) + Number(taxAmt);

    let finalBillamount = totalAmt + appCharges + adj1 - adj2;
    this.userForm.patchValue({
      item_total: amt,
      discount: dscAmt,
      tax_total: Number(this.round(Number(taxAmt), 2))
    })
    this.calRoundOfFigure(finalBillamount, tcs);
  }

  getApplicableCharges(event) {
    this.appCharges = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }

  getAdj1(event) {
    this.adj1 = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }

  getAdj2(event) {
    this.adj2 = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }

  getTcs(event) {
    this.tcsAmt = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }


  Payable_Amount: any;
  Item_Total: number = 0;
  Item_Discount: number = 0;
  Tax_Amtt: any;
  ValidatetotalAmt: any;
  RoundOFF_Amt: any;
  HsnCode1 = [];
  TaxCode1 = [];
  TaxRate1 = [];
  ItemGr1 = [];
  StateName1: any;

  OnCalcute() {
    // timer(1000).subscribe
    // (x=>
    //    {
    this.StateName = this.userForm.get("state").value;
    // console.log("TaxCodeLength: "+this.TaxCode.length);
    const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
    // console.log("distinctArrayTax: "+distinctArrayTax);

    this.addItemGrpTax();
    while (this.credit_item_groupwise_taxsumm.length)
      this.credit_item_groupwise_taxsumm.removeAt(0)
    for (let j = 0; j < distinctArrayTax.length; j++) {
      let TaxRate = 0;
      let TaxAmt = 0;

      for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

        if (this.sales_credit_note_item_dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
          TaxRate = this.sales_credit_note_item_dtls.at(k).get("tax_rate").value;
          TaxAmt += this.sales_credit_note_item_dtls.at(k).get("tax_amt").value;
          //  console.log("TaxRate:"+TaxRate);   
          //  console.log("TaxAmt : "+TaxAmt);                    
        }
      }
      this.addItemGrpTax();
      //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
      this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });
      if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
        forkJoin(
          this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
        ).subscribe(([TaxData]) => {
          this.credit_item_groupwise_taxsumm.at(j).patchValue({
            percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
            , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
          });

          this.status = true;

          this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
          this.StateName = this.userForm.get("state").value;
          this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

          //if (this.StateName == 'BIHAR') {
            if (this.StateName == this.company_state) {
            let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
            let Sgst = (this.Tax_Amt - Cgst);
            this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
          }
          else { this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }
        });
      }
    }

    //taxrate
    const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

    for (let j = 0; j < distinctArrayTaxRate.length; j++) {
      let Amount = 0;
      let DiscountAmt = 0;
      let Taxable_Amnt = 0;

      for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

        if (this.sales_credit_note_item_dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
          Amount += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
          DiscountAmt += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
          // Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
          Taxable_Amnt = Number(this.round((Number(Amount) - Number(DiscountAmt)), 2));
          console.log("Taxable_Amnt : " + Taxable_Amnt)
          // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
        }
      }
      this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
    }
    //  console.log("distinctArrayTaxRate: "+distinctArrayTaxRate);


    this.Item_Total = 0;
    this.Item_Discount = 0;
    this.RoundOFF_Amt = this.userForm.get("roundoff_amt").value as FormControl;
    for (let i = 0; i < this.credit_item_groupwise_summ.length; i++) {
      this.Item_Total += this.credit_item_groupwise_summ.at(i).get("item_total").value;
      this.Item_Discount += this.credit_item_groupwise_summ.at(i).get("discount_amt").value;
    }


    this.Tax_Amtt = 0;
    for (let k = 0; k < this.credit_item_groupwise_taxsumm.length; k++) {
      this.Tax_Amtt = Number(this.Tax_Amtt) + Number(this.credit_item_groupwise_taxsumm.at(k).get("tax_amt").value);
    }

    console.log(" Item_Total: " + this.Item_Total);
    console.log(" Item_Discount: " + this.Item_Discount);
    console.log(" Tax_Amtt: " + this.Tax_Amtt);


    this.ValidatetotalAmt = Number(this.Item_Total) + Number(this.Tax_Amtt) - Number(this.Item_Discount) + Number(this.RoundOFF_Amt);
    console.log(" ValidatetotalAmt: " + this.ValidatetotalAmt);

  }

  ValidateTcsAmt: any;
  Id1: any;
  TaxTotal: any;
  jobtotalprice: any;
  send() {
    this.Id1 = this.userForm.get("id").value as FormControl;
    // if(this.Id1<0)
    // {
    //   this.StateName =this.userForm.get("state").value;
    //   // console.log("TaxCodeLength: "+this.TaxCode.length);
    //    const distinctArrayTax:any=[] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
    //   // console.log("distinctArrayTax: "+distinctArrayTax);

    //    this.addItemGrpTax();
    //    while(this.credit_item_groupwise_taxsumm.length)
    //    this.credit_item_groupwise_taxsumm.removeAt(0)            
    //    for (let j=0;j<distinctArrayTax.length;j++) 
    //    { 
    //      let TaxRate =0;
    //      let TaxAmt=0;

    //      for(let k = 0; k<this.sales_credit_note_item_dtls.length; k++)   
    //        { 

    //          if(this.sales_credit_note_item_dtls.at(k).get("tax_code").value==distinctArrayTax[j])
    //          {
    //           TaxRate= this.sales_credit_note_item_dtls.at(k).get("tax_rate").value;
    //           TaxAmt+=this.sales_credit_note_item_dtls.at(k).get("tax_amt").value;
    //           //  console.log("TaxRate:"+TaxRate);   
    //           //  console.log("TaxAmt : "+TaxAmt);                    
    //          }                    
    //        }                  
    //        this.addItemGrpTax();
    //       //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
    //        this.credit_item_groupwise_taxsumm.at(j).patchValue({tax_code:distinctArrayTax[j],tax_rate:TaxRate.toFixed(2),tax_amt:TaxAmt.toFixed(2)});

    //        if(distinctArrayTax[j] !='' && distinctArrayTax[j] !=null)
    //        {
    //         forkJoin(        
    //           this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
    //           ).subscribe(([TaxData])=>
    //             {    

    //               if(TaxData)
    //               {
    //                 this.credit_item_groupwise_taxsumm.at(j).patchValue({percentage:TaxData.cgst,cgstledgerid:TaxData.cgst_output_ledger
    //                   ,sgstledgerid:TaxData.output_ledger,igstledgerid:TaxData.igst_output_ledger});

    //               this.status = true;

    //               this.Tax_Rate=this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
    //               this.StateName =this.userForm.get("state").value;               
    //               this.Tax_Amt=this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


    //               if(this.StateName=='BIHAR')
    //               {                         
    //                 let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
    //                 let Sgst =(this.Tax_Amt - Cgst);
    //                 this.credit_item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
    //               }                  
    //              else
    //               {this.credit_item_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}


    //               const distinctArrayTaxRate:any=[] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

    //               for (let j=0;j<distinctArrayTaxRate.length;j++) 
    //               { 
    //                let Amount=0;
    //                let DiscountAmt=0;
    //                let Taxable_Amnt=0;

    //                for(let k = 0; k<this.sales_credit_note_item_dtls.length; k++)   
    //                { 

    //                  if(this.sales_credit_note_item_dtls.at(k).get("tax_rate").value==distinctArrayTaxRate[j])
    //                  {
    //                    Amount+=this.sales_credit_note_item_dtls.at(k).get("amount").value;
    //                    DiscountAmt+=this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
    //                    Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
    //                    console.log("Taxable_Amnt : " +Taxable_Amnt)  
    //                   // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
    //                  }
    //                }
    //                this.credit_item_groupwise_taxsumm.at(j).patchValue({taxable_amt:Taxable_Amnt.toFixed(2)});
    //               }
    //               }

    //               else
    //               {
    //                 //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
    //                 alert("something error is happened");
    //               }       

    //             },(error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");

    //           }); 
    //        }                
    // }
    // } 
    //for validation
    // send......

    timer(1000).subscribe
      (x => {

        this.Id = this.userForm.get("id").value as FormControl;

        this.Payable_Amount = this.userForm.get("payable_amt").value as FormControl;
        this.ValidateTcsAmt = this.userForm.get("tcsamt").value as FormControl;
        this.TaxTotal = this.userForm.get("tax_total").value as FormControl;

        this.Item_Total = 0;
        this.Item_Discount = 0;
        this.RoundOFF_Amt = this.userForm.get("roundoff_amt").value as FormControl;
        for (let i = 0; i < this.credit_item_groupwise_summ.length; i++) {
          console.log("item:" + this.credit_item_groupwise_summ.at(i).get("item_total").value)
          this.Item_Total += Number(this.credit_item_groupwise_summ.at(i).get("item_total").value);
          this.Item_Discount += Number(this.credit_item_groupwise_summ.at(i).get("discount_amt").value);
          console.log(" Item_Total1222: " + this.Item_Total);
        }
        console.log(" Item_Total111: " + this.Item_Total);
        this.Tax_Amtt = 0;
        for (let k = 0; k < this.credit_item_groupwise_taxsumm.length; k++) {
          this.Tax_Amtt = Number(this.Tax_Amtt) + Number(this.credit_item_groupwise_taxsumm.at(k).get("tax_amt").value);
        }
        this.ValidatetotalAmt = 0;
        this.jobtotalprice = 0;
        if (this.userForm.get("invoice_type").value == "INV00003") {
          for (let z = 0; z < this.sales_credit_note_item_dtls_for_jobwork_price.length; z++) {
            this.jobtotalprice += Number(this.sales_credit_note_item_dtls_for_jobwork_price.at(z).get("tot_amount").value)
          }
          console.log("if part:" + this.jobtotalprice + " - " + this.Item_Discount + " - " + this.RoundOFF_Amt + " - " + this.ValidateTcsAmt)
          this.ValidatetotalAmt = this.round((Number(this.jobtotalprice) - Number(this.Item_Discount) + Number(this.RoundOFF_Amt) + Number(this.ValidateTcsAmt)), 2);
        }
        else {
          console.log("else part:" + Number(this.Item_Total) + "//" + Number(this.TaxTotal) + " - " + Number(this.Item_Discount) + " - " + Number(this.RoundOFF_Amt) + " - " + Number(this.ValidateTcsAmt))
          this.ValidatetotalAmt = Number(this.round((Number(this.Item_Total) + Number(this.TaxTotal) - Number(this.Item_Discount) + Number(this.RoundOFF_Amt) + Number(this.ValidateTcsAmt)), 2));
        }
        console.log(" Item_Total: " + this.Item_Total);
        console.log(" Item_Discount: " + this.Item_Discount);
        console.log(" Tax_Amtt: " + this.Tax_Amtt);



        console.log(" ValidatetotalAmt: " + this.ValidatetotalAmt);
        console.log(" Payable_Amount: " + this.Payable_Amount);

        this.userForm.patchValue({
          company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"), username: localStorage.getItem("username")
        });
        this.submitted = true;
        if (!this.userForm.valid) {
          alert('Please fill all fields!')
          return false;
        }

        else if (this.Payable_Amount != this.ValidatetotalAmt) {
          alert('Please check all Mathematical Operation first..!');
          return false;
        }

        else {
          this.status = false;
          if (this.userForm.get("creditnotetype").value == '' || this.userForm.get("creditnotetype").value == null || this.userForm.get("creditnotetype").value == 0) {
            alert("Please Select Sales Return Type");
            this.status = true;
          }
          else if (this.userForm.get("creditnoteno").value == '' || this.userForm.get("creditnoteno").value == null || this.userForm.get("creditnoteno").value == 0) {
            alert("Please Enter Credit Note Inv No.");
            this.status = true;
          }
          else if (this.userForm.get("creditnotedate").value == '' || this.userForm.get("creditnotedate").value == null || this.userForm.get("creditnotedate").value == 0) {
            alert("Please Enter Credit Note Inv Date");
            this.status = true;
          }
          else if (this.userForm.get("invoice_type").value == '' || this.userForm.get("invoice_type").value == null || this.userForm.get("invoice_type").value == 0) {
            alert("Please Select Invoice Type");
            this.status = true;
          }
          else if (this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0) {
            alert("Please Select Bussiness Unit Name");
            this.status = true;
          }
          else if (this.userForm.get("party").value == '' || this.userForm.get("party").value == null || this.userForm.get("party").value == 0) {
            alert("Please Select Party Name");
            this.status = true;
          }
          else if (this.userForm.get("challan").value == '' || this.userForm.get("challan").value == null || this.userForm.get("challan").value == 0) {
            alert("Please Select Challan");
            this.status = true;
          }
          // else if(this.userForm.get("e_invoice_no").value == '' || this.userForm.get("e_invoice_no").value == null || this.userForm.get("e_invoice_no").value == 0)
          /*else if(this.userForm.get("invoice_type").value == 'INV00002' && (this.userForm.get("e_invoice_no").value == "" || this.userForm.get("e_invoice_no").value == null || this.userForm.get("e_invoice_no").value == 0))
          {
            alert("Please Enter E-Invoice No.");
            this.status=true;
          }
          */
          else if (this.userForm.get("salesorderno").value == '' || this.userForm.get("salesorderno").value == null || this.userForm.get("salesorderno").value == 0) {
            alert("Please Enter Sales Return Note No");
            this.status = true;
          }
          else if (this.userForm.get("salesorderdate").value == '' || this.userForm.get("salesorderdate").value == null || this.userForm.get("salesorderdate").value == 0) {
            alert("Please Enter Sales Return Note Date");
            this.status = true;
          }
          /* else if(this.userForm.get("refchallanno").value == '' || this.userForm.get("refchallanno").value == null || this.userForm.get("refchallanno").value == 0)
           {
             alert("Please  Enter Ref Challan No");
             this.status=true;
           }
           else if(this.userForm.get("refchallandate").value == '' || this.userForm.get("refchallandate").value == null || this.userForm.get("refchallandate").value == 0)
           {
             alert("Please Enter Ref Challan Date");
             this.status=true;
           }*/
          else if ((Number(this.userForm.get("roundoff_amt").value) > 0 || Number(this.userForm.get("roundoff_amt").value) < 0) && (this.userForm.get("roundoff_gl_ac").value == null || this.userForm.get("roundoff_gl_ac").value == 0)) {
            alert("Pleasse Select Round Off Ledger");
            this.status = true;
          }
          else {
            let eincoicecheking: boolean = false;
            if (this.registeredstatus == true && (this.userForm.get("invoice_type").value == "INV00002" || this.userForm.get("invoice_type").value == "INV00004")) {
              eincoicecheking = true;
            }
            if (eincoicecheking == true) {
              let invoiceno = "NA";
              if (this.Id == '' || this.Id == null) {
                //console.log("HERE");
                this.Id = 0;
              }
              else {
                invoiceno = this.userForm.get("creditnoteno").value;
              }
              this.DropDownListService.geteinvoicestatus_creditnote(this.Id, invoiceno).subscribe(data => {
                console.log("GGGSHJHSJ  :: " + data[0]["einvoicelength"]);
                console.log("CHECKCHECK  :: " + Number(data[0]["einvoicelength"]));
                if (Number(data[0]["einvoicelength"]) == 15 || data[0]["einvoicelength"] == "15") {

                  if (this.Id > 0) {
                    this.Service.updateCreditNote(this.userForm.getRawValue(), this.Id).subscribe(data => {
                      console.log(this.userForm.getRawValue());
                      alert("Credit Note Updated successfully.");
                      this.userForm.reset();
                      this.ngOnInit();

                      this.item_sl_no = 0;
                      while (this.sales_credit_note_item_dtls.length)
                        this.sales_credit_note_item_dtls.removeAt(0);
                      this.addItem();

                      this.broker_sl_no = 0;
                      while (this.sales_credit_note_broker_dtls.length)
                        this.sales_credit_note_broker_dtls.removeAt(0);
                      this.addBrokers();


                      while (this.sales_credit_note_docs.length)
                        this.sales_credit_note_docs.removeAt(0);
                      this.addDocument();

                      while (this.credit_item_groupwise_summ.length)
                        this.credit_item_groupwise_summ.removeAt(0);
                      this.addItemGrp();

                      while (this.credit_item_groupwise_taxsumm.length)
                        this.credit_item_groupwise_taxsumm.removeAt(0);
                      this.addItemGrpTax();

                      while (this.credit_item_groupwise_hsnsumm.length)
                        this.credit_item_groupwise_hsnsumm.removeAt(0);
                      this.addItemGrpHsn();

                      this.transporter_sl_no = 0;
                      while (this.sales_credit_note_trans_dtls.length)
                        this.sales_credit_note_trans_dtls.removeAt(0);
                      this.addTransporter();

                    }, (error) => {
                      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                      //this.ngOnInit()
                    });
                  }
                  else {
                    this.Service.createSalesCreditNote(this.userForm.getRawValue()).subscribe(data => {
                      console.log(this.userForm.getRawValue());
                      alert("Credit Note created successfully.");
                      this.userForm.reset();
                      this.ngOnInit();
                      this.item_sl_no = 0;
                      while (this.sales_credit_note_item_dtls.length)
                        this.sales_credit_note_item_dtls.removeAt(0);
                      this.addItem();

                      this.broker_sl_no = 0;
                      while (this.sales_credit_note_broker_dtls.length)
                        this.sales_credit_note_broker_dtls.removeAt(0);
                      this.addBrokers();

                      while (this.sales_credit_note_docs.length)
                        this.sales_credit_note_docs.removeAt(0);
                      this.addDocument();

                      while (this.credit_item_groupwise_summ.length)
                        this.credit_item_groupwise_summ.removeAt(0);
                      this.addItemGrp();

                      while (this.credit_item_groupwise_taxsumm.length)
                        this.credit_item_groupwise_taxsumm.removeAt(0);
                      this.addItemGrpTax();

                      while (this.credit_item_groupwise_hsnsumm.length)
                        this.credit_item_groupwise_hsnsumm.removeAt(0);
                      this.addItemGrpHsn();

                      this.transporter_sl_no = 0;
                      while (this.sales_credit_note_trans_dtls.length)
                        this.sales_credit_note_trans_dtls.removeAt(0);
                      this.addTransporter();
                      //. window.location.reload();   
                      this.status = true;
                    }, (error) => {
                      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                      //this.ngOnInit()
                    });
                  }


                }
                else {
                  alert(" Please update Bill Number " + data[0]["invoiceno"] + " with e-invoice number !!!!!");
                  this.status = true;

                }

              });
            }
            else {
              if (this.Id > 0) {
                this.Service.updateCreditNote(this.userForm.getRawValue(), this.Id).subscribe(data => {
                  console.log(this.userForm.getRawValue());
                  alert("Credit Note Updated successfully.");
                  this.userForm.reset();
                  this.ngOnInit();

                  this.item_sl_no = 0;
                  while (this.sales_credit_note_item_dtls.length)
                    this.sales_credit_note_item_dtls.removeAt(0);
                  this.addItem();

                  this.broker_sl_no = 0;
                  while (this.sales_credit_note_broker_dtls.length)
                    this.sales_credit_note_broker_dtls.removeAt(0);
                  this.addBrokers();


                  while (this.sales_credit_note_docs.length)
                    this.sales_credit_note_docs.removeAt(0);
                  this.addDocument();

                  while (this.credit_item_groupwise_summ.length)
                    this.credit_item_groupwise_summ.removeAt(0);
                  this.addItemGrp();

                  while (this.credit_item_groupwise_taxsumm.length)
                    this.credit_item_groupwise_taxsumm.removeAt(0);
                  this.addItemGrpTax();

                  while (this.credit_item_groupwise_hsnsumm.length)
                    this.credit_item_groupwise_hsnsumm.removeAt(0);
                  this.addItemGrpHsn();

                  this.transporter_sl_no = 0;
                  while (this.sales_credit_note_trans_dtls.length)
                    this.sales_credit_note_trans_dtls.removeAt(0);
                  this.addTransporter();

                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                  //this.ngOnInit()
                });
              }
              else {
                this.Service.createSalesCreditNote(this.userForm.getRawValue()).subscribe(data => {
                  console.log(this.userForm.getRawValue());
                  alert("Credit Note created successfully.");
                  this.userForm.reset();
                  this.ngOnInit();
                  this.item_sl_no = 0;
                  while (this.sales_credit_note_item_dtls.length)
                    this.sales_credit_note_item_dtls.removeAt(0);
                  this.addItem();

                  this.broker_sl_no = 0;
                  while (this.sales_credit_note_broker_dtls.length)
                    this.sales_credit_note_broker_dtls.removeAt(0);
                  this.addBrokers();

                  while (this.sales_credit_note_docs.length)
                    this.sales_credit_note_docs.removeAt(0);
                  this.addDocument();

                  while (this.credit_item_groupwise_summ.length)
                    this.credit_item_groupwise_summ.removeAt(0);
                  this.addItemGrp();

                  while (this.credit_item_groupwise_taxsumm.length)
                    this.credit_item_groupwise_taxsumm.removeAt(0);
                  this.addItemGrpTax();

                  while (this.credit_item_groupwise_hsnsumm.length)
                    this.credit_item_groupwise_hsnsumm.removeAt(0);
                  this.addItemGrpHsn();

                  this.transporter_sl_no = 0;
                  while (this.sales_credit_note_trans_dtls.length)
                    this.sales_credit_note_trans_dtls.removeAt(0);
                  this.addTransporter();
                  //. window.location.reload();   
                  this.status = true;
                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                  //this.ngOnInit()
                });
              }
            }



          }






        }

      })

  }

  onUpdate(id: any, creditnoteid: string,bunit, action) {
    if (action == 'view') { this.creditnotesave = false; }
    else { this.creditnotesave = true; }


    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];


    forkJoin(
      this.Service.retriveSalesCreditNote(id),
      this.Service.getSalesCreditNoteID(creditnoteid),
      this.Service.getSalesCreditNoteBD(creditnoteid),
      this.Service.getSalesCreditNoteD(creditnoteid),
      this.Service.getSalesCreditNoteTI(creditnoteid),
      this.Service.getSalesCreditNoteBPD(creditnoteid),
      this.Service.getSalesCreditNotePD(creditnoteid),
      this.Service.getSalesCreditNoteSD(creditnoteid),
      this.Service.getSalesCreditNoteTD(creditnoteid),
      this.Service.getSalesCreditNoteJobwork(creditnoteid),
      this.Service.getSalesCreditNoteJobworkPrice(creditnoteid),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),bunit)
    ).subscribe(([CreditNoteData, itemData, brokerData,
      docData, TaxData, BPData, PaymentData, shipmentData, TransData, jobwork, jobworkprice,companystate]) => {
      //this.onChangeSalesReturnType(CreditNoteData["creditnotetype"]);
      this.company_state=companystate["state_name"];
      //console.log("Comp State:"+this.company_state)
      this.onChangeParty(CreditNoteData["party"]);
      this.onChangeBusinessUnit(CreditNoteData["business_unit"]);

      console.log("Credit Note check : : " + JSON.stringify(CreditNoteData))

      this.userForm.patchValue({
        id: CreditNoteData["id"], creditnoteid: CreditNoteData["creditnoteid"],
        invoice_type: CreditNoteData["invoice_type"], business_unit: CreditNoteData["business_unit"], creditnoteno: CreditNoteData["creditnoteno"],
        creditnotetype: CreditNoteData["creditnotetype"], creditnotedate: CreditNoteData["creditnotedate"], party: CreditNoteData["party"],
        challan: CreditNoteData["challan"], e_invoice_no: CreditNoteData["e_invoice_no"], item_total: CreditNoteData["item_total"], remarks: CreditNoteData["remarks"],
        item_total_gl_ac: CreditNoteData["item_total_gl_ac"], discount: CreditNoteData["discount"], discount_gl_ac: CreditNoteData["discount_gl_ac"],
        net_total: CreditNoteData["net_total"], net_total_gl_ac: CreditNoteData["net_total_gl_ac"], tax_total: CreditNoteData["tax_total"],
        tax_total_gl_ac: CreditNoteData["tax_total_gl_ac"], total_bill_amt: CreditNoteData["total_bill_amt"], total_bill_amt_gl_ac: CreditNoteData["total_bill_amt_gl_ac"],
        referance_id: CreditNoteData["referance_id"], applicable_amt: CreditNoteData["applicable_amt"], applicable_gl_ac: CreditNoteData["applicable_gl_ac"],
        adj1_amt: CreditNoteData["adj1_amt"], adj1_gl_ac: CreditNoteData["adj1_gl_ac"], adj2_amt: CreditNoteData["adj2_amt"], adj2_gl_ac: CreditNoteData["adj2_gl_ac"],
        roundoff_amt: CreditNoteData["roundoff_amt"], roundoff_gl_ac: CreditNoteData["roundoff_gl_ac"], final_bill_amt: CreditNoteData["final_bill_amt"],
        final_bill_amt_gl_ac: CreditNoteData["final_bill_amt_gl_ac"], payable_amt: CreditNoteData["payable_amt"], payable_amt_gl_ac: CreditNoteData["payable_amt_gl_ac"],
        company_id: CreditNoteData["company_id"], fin_year: CreditNoteData["fin_year"], username: CreditNoteData["username"], brokage_app: CreditNoteData["brokage_app"],
        tcsamt: CreditNoteData["tcsamt"], tcsglac: CreditNoteData["tcsglac"], salesorderno: CreditNoteData["salesorderno"], grand_total: CreditNoteData["grand_total"],
        salesorderdate: CreditNoteData["salesorderdate"], refchallanno: CreditNoteData["refchallanno"], refchallandate: CreditNoteData["refchallandate"],
        allsalesorderdate: CreditNoteData["allsalesorderdate"], waybill: CreditNoteData["waybill"]
      });

      if (this.userForm.get("invoice_type").value == "INV00003") {
        this.jobtransaction = true;

        forkJoin(
          this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, this.userForm.get("invoice_type").value),
          this.DropDownListService.getItemServiceList(this.company_name),
          this.Service.custAddRetriveList(this.userForm.get("party").value),
          this.Service.taxCodeDtlsRetriveList("TC00002")
        ).subscribe(([itemlist, service, state, taxlist]) => {
          this.jobitemlist = itemlist;
          this.item_services = service;
          this.taxcodelist = taxlist;
          let u = 0;
          this.jobpackinglist = [];
          this.selectedJobItem = [];
          this.selectedJobPacking = [];
          this.TaxCode = [];
          this.TaxRate = [];
          this.selectedService = [];
          this.totalItem = 0;
          this.totalDiscount = 0;
          this.totalTaxAmt = 0;
          this._taxAmt = 0;

          this.addJobworkItem();
          this.jobwork_sl_no = 0;
          while (this.sales_credit_note_item_dtls_for_jobwork.length) { this.sales_credit_note_item_dtls_for_jobwork.removeAt(0); }

          for (let jobdata of jobwork) {
            this.status = false;
            this.DropDownListService.getItemMasterPackMat(jobdata["job_item"])
              .subscribe(packingList => {
                this.addJobworkItem();
                this.jobpackinglist[u] = packingList;
                this.selectedJobItem[u] = jobdata["job_item"];
                this.selectedJobPacking[u] = jobdata["job_packing"];

                this.sales_credit_note_item_dtls_for_jobwork.at(u).patchValue({
                  sl_no: jobdata["sl_no"], job_item: jobdata["job_item"], job_packing: jobdata["job_packing"],
                  job_hsn: jobdata["job_hsn"], pack_qty: jobdata["pack_qty"], pack_uom: jobdata["pack_uom"], price_based_on: jobdata["price_based_on"],
                  item_qty: jobdata["item_qty"], item_uom: jobdata["item_uom"], tolerance: jobdata["tolerance"]
                });
                u++;
                this.status = true;
              });
          }

          this.addJobworkItemservice();
          this.service_sl_no = 0;
          let grandtotal: number = 0;
          for (let y = 0; y < jobwork.length; y++) {
            grandtotal = Number(grandtotal) + Number(jobwork[y]["item_qty"]);
          }
          console.log("grand total " + grandtotal)
          while (this.sales_credit_note_item_dtls_for_jobwork_price.length) { this.sales_credit_note_item_dtls_for_jobwork_price.removeAt(0); }
          let jp = 0;

          for (let data1 of jobworkprice) {
            let totjobprice = 0;

            this.addJobworkItemservice();
            this.selectedService[jp] = data1["item_service"];

            totjobprice = Number(grandtotal) * Number(data1["job_price"]);
            let igstamt: any = 0, cgstAmount: any = 0, sgstAmount: any = 0, taxAmount: any = 0, totalAmount: any = 0;
            //if (state["state"] == "BIHAR") {
              if (state["state"] == this.company_state) {
              cgstAmount = Number(this.round(Number(totjobprice * (data1["cgst_tax"] / 100)), 2));
              sgstAmount = Number(this.round(Number(totjobprice * (data1["sgst_tax"] / 100)), 2));
              igstamt = 0;
            }
            else {
              cgstAmount = 0;
              sgstAmount = 0;
              igstamt = Number(this.round(Number(totjobprice * (data1["igst_tax"] / 100)), 2));
            }

            console.log(" total price " + grandtotal + " // " + totjobprice)

            taxAmount = Number(cgstAmount) + Number(sgstAmount) + Number(igstamt);

            totalAmount = Number(taxAmount) + Number(totjobprice);
            console.log("service item " + JSON.stringify(data1))
            this.sales_credit_note_item_dtls_for_jobwork_price.at(jp).patchValue({
              item_service: data1["item_service"],
              sac_code: data1["sac_code"], job_price: data1["job_price"], tax_value: this.round(totjobprice, 2), cgst_tax: data1["cgst_tax"], cgst_amt: cgstAmount,
              sgst_tax: data1["sgst_tax"], sgst_amt: sgstAmount, tot_amount: this.round(totalAmount, 2), igst_tax: data1["igst_tax"], igst_amt: igstamt, taxcode: data1["taxcode"]
            });

            this.totalItem += Number(totjobprice);

            this._taxAmt += (Number(totalAmount) - Number(totjobprice));
            this.TaxCode.push(data1["taxcode"]);
            this.TaxRate.push(data1["igst_tax"]);
            jp++;

          }
          this.userForm.patchValue({ grand_total: this.totalItem })
          //starts here 
          let Amt = this.totalItem;

          this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;

          let netAmt = this.totalItem - this.totalDiscount;
          let totalAmt = netAmt + this.totalTaxAmt;
          let finalBillamount = totalAmt + this.appCharges + this.adj1 - this.adj2;
          this.userForm.patchValue({
            item_total: Amt.toFixed(2),
            discount: this.totalDiscount.toFixed(2),
            tax_total: this.totalTaxAmt.toFixed(2)
          })
          let totlround = Math.round(finalBillamount);
          let totlWithoutround = finalBillamount.toFixed(2);
          this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);




          this.TcsAmt1 = 0;
          this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
          let t = Number(totlround) + Number(this.TcsAmt1);

          if (this.einvoiceshow == true) {
            this.userForm.patchValue({ payable_amt: finalBillamount.toFixed(2), roundoff_amt: 0 })
          }
          else {
            this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })
            let roundOfAmt = Math.round(finalBillamount * 100) % 100;
            if (roundOfAmt >= 50) {
              roundOfAmt = 100 - roundOfAmt;
              this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
            }
            else {
              this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
            };
          }

          /*this.userForm.patchValue({payable_amt:totlround.toFixed(2)})
          let roundOfAmt = Math.round(finalBillamount * 100) % 100;
          if(roundOfAmt >= 50)
          {
            roundOfAmt = 100 - roundOfAmt;
            this.userForm.patchValue({roundoff_amt: Number(Number(roundOfAmt)/100).toFixed(2)})
          }
          else
          {
            this.userForm.patchValue({roundoff_amt: Number(0 - Number(roundOfAmt)/100).toFixed(2)});
          };*/

          //STARTS HERE
          timer(0).subscribe
            (x => {
              this.StateName = this.userForm.get("state").value;
              const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
              this.addItemGrpTax();
              while (this.credit_item_groupwise_taxsumm.length)
                this.credit_item_groupwise_taxsumm.removeAt(0)
              for (let j = 0; j < distinctArrayTax.length; j++) {
                let TaxRate = 0;
                let TaxAmt = 0;
                for (let k = 0; k < this.sales_credit_note_item_dtls_for_jobwork_price.length; k++) {
                  if (this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("taxcode").value == distinctArrayTax[j]) {
                    TaxRate = this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("igst_tax").value;
                   // if (this.StateName == 'BIHAR') {
                    if (this.StateName == this.company_state) {
                      TaxAmt += (Number(this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("cgst_amt").value) + Number(this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("sgst_amt").value));
                    }
                    else {
                      TaxAmt += this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("igst_amt").value;
                    }

                  }
                }
                this.addItemGrpTax();
                this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                  forkJoin(
                    this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                  ).subscribe(([TaxData]) => {
                    if (TaxData) {
                      this.credit_item_groupwise_taxsumm.at(j).patchValue({ percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger, sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger });
                      this.status = true;
                      this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                      this.StateName = this.userForm.get("state").value;
                      this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

                      //if (this.StateName == 'BIHAR') {
                        if (this.StateName == this.company_state) {
                        let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                        let Sgst = (this.Tax_Amt - Cgst);
                        this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                      }
                      else {
                        this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 });
                      }
                      const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);
                      for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                        let Amount = 0;
                        let DiscountAmt = 0;
                        let Taxable_Amnt = 0;
                        for (let k = 0; k < this.sales_credit_note_item_dtls_for_jobwork_price.length; k++) {

                          if (this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("igst_tax").value == distinctArrayTaxRate[j]) {
                            Amount += this.sales_credit_note_item_dtls_for_jobwork_price.at(k).get("tax_value").value;

                            Taxable_Amnt = Number(Amount.toFixed(2));
                          }
                        }
                        this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                      }
                    }
                    else {

                      alert("something error is happened");
                    }
                  });
                }
              }
            })

          timer(500).subscribe
            (x => {
              let TotalAmtt = 0;
              for (let i = 0; i < this.sales_credit_note_item_dtls_for_jobwork_price.length; i++) {
                TotalAmtt += Number(this.sales_credit_note_item_dtls_for_jobwork_price.at(i).get("tax_value").value);
              }
              let Ttal = TotalAmtt.toFixed(2);
              this.userForm.patchValue({ grand_total: Ttal })
            })
          //ENDS HERE 
        });
      }
      else {
        this.jobtransaction = false;
        console.log("item Details: " + JSON.stringify(itemData));
        let k = 0;
        this.addItem();
        this.item_sl_no = 0;
        while (this.sales_credit_note_item_dtls.length)
          this.sales_credit_note_item_dtls.removeAt(0);
        for (let data1 of itemData) {
          //alert("Hiii..")
          this.status = false;
          this.addItem();
          forkJoin(
            this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
            this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
          ).subscribe(([packingList, capacityEmptyWt]) => {
            //alert("Hi..")
            this.capacity[k] = capacityEmptyWt.capacity;
            this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
            this.selectedPackingItem[k] = data1["packing"];
            this.selectedItemName[k] = data1["item_code"];
            this.HsnCode1.push(data1["hsn_code"]);
            this.TaxCode1.push(data1["tax_code"]);
            this.TaxRate1.push(data1["tax_rate"]);
            this.ItemGr1.push(data1["item_group"]);
            this.packingItem[k] = packingList;
            this.sales_credit_note_item_dtls.at(k).patchValue(data1);
            k = k + 1;
            this.status = true;
          });
        }


        // calculation

        timer(10000).subscribe
          (x => {
            const distinctArrayHsnCode: any = [] = this.HsnCode1.filter((n, i) => this.HsnCode1.indexOf(n) === i);
            console.log("distinctArrayHsnCode: " + distinctArrayHsnCode);
            this.addItemGrpHsn();
            while (this.credit_item_groupwise_hsnsumm.length)
              this.credit_item_groupwise_hsnsumm.removeAt(0);
            for (let j = 0; j < distinctArrayHsnCode.length; j++) {
              let DiscountAmt = 0;
              for (let k = 0; k < this.credit_item_groupwise_hsnsumm.length; k++) {

                if (this.credit_item_groupwise_hsnsumm.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                  DiscountAmt += this.credit_item_groupwise_hsnsumm.at(k).get("amount").value - this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                  console.log("DiscountAmt:" + DiscountAmt);
                }
              }
              this.addItemGrpHsn();
              console.log("hsn_code  :" + distinctArrayHsnCode[j]); // 1, "string", false
              this.credit_item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt.toFixed(2) });
            }
          }
          )

        timer(1000).subscribe
          (x => {

            console.log("ItemGrLength: " + this.ItemGr1.length);
            const distinctArray: any = [] = this.ItemGr1.filter((n, i) => this.ItemGr1.indexOf(n) === i);
            console.log("distinctArray: " + distinctArray);
            //let j=0
            this.addItemGrp();
            while (this.credit_item_groupwise_summ.length)
              this.credit_item_groupwise_summ.removeAt(0)
            for (let j = 0; j < distinctArray.length; j++) {
              let Amt = 0;
              let Discount = 0;

              for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                if (this.sales_credit_note_item_dtls.at(k).get("item_group").value == distinctArray[j]) {
                  Amt += this.sales_credit_note_item_dtls.at(k).get("amount").value;
                  Discount += this.sales_credit_note_item_dtls.at(k).get("discount_amt").value;
                  console.log("Amt:" + Amt);
                  console.log("Discount : " + Discount);
                }
              }
              this.addItemGrp();
              console.log("Item  :" + distinctArray[j]); // 1, "string", false
              this.credit_item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt.toFixed(2), discount_amt: Discount.toFixed(2) });

              forkJoin(
                this.Service.getItemGroupSalesAcc(distinctArray[j]),
              ).subscribe(([ItemgrpLedger]) => {
                this.credit_item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });

                this.status = true;
              });
            }
          }
          )


        timer(1000).subscribe
          (x => {
            this.StateName1 = this.userForm.get("state").value;
            // console.log("TaxCodeLength: "+this.TaxCode.length);
            const distinctArrayTax: any = [] = this.TaxCode1.filter((n, i) => this.TaxCode1.indexOf(n) === i);
            // console.log("distinctArrayTax: "+distinctArrayTax);

            this.addItemGrpTax();
            while (this.credit_item_groupwise_taxsumm.length)
              this.credit_item_groupwise_taxsumm.removeAt(0)
            for (let j = 0; j < distinctArrayTax.length; j++) {
              let TaxRate = 0;
              let TaxAmt = 0;

              for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                if (this.sales_credit_note_item_dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                  TaxRate = this.sales_credit_note_item_dtls.at(k).get("tax_rate").value;
                  TaxAmt += this.sales_credit_note_item_dtls.at(k).get("tax_amt").value;

                }
              }
              this.addItemGrpTax();
              //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
              this.credit_item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

              if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                forkJoin(
                  this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                ).subscribe(([TaxData]) => {

                  if (TaxData) {
                    this.credit_item_groupwise_taxsumm.at(j).patchValue({
                      percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                      , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                    });

                    this.status = true;

                    this.Tax_Rate = this.credit_item_groupwise_taxsumm.at(j).get("tax_rate").value;
                    this.StateName1 = this.userForm.get("state").value;
                    this.Tax_Amt = this.credit_item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;


                    //if (this.StateName1 == 'BIHAR') {
                      if (this.StateName1 == this.company_state) {
                      let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                      let Sgst = (this.Tax_Amt - Cgst);
                      this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                    }
                    else { this.credit_item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                    const distinctArrayTaxRate: any = [] = this.TaxRate1.filter((n, i) => this.TaxRate1.indexOf(n) === i);

                    for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                      let Amount = 0;
                      let DiscountAmt = 0;
                      let Taxable_Amnt = 0;

                      for (let k = 0; k < this.sales_credit_note_item_dtls.length; k++) {

                        if (this.sales_credit_note_item_dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                          Amount += Number(this.sales_credit_note_item_dtls.at(k).get("amount").value);
                          DiscountAmt += Number(this.sales_credit_note_item_dtls.at(k).get("discount_amt").value);
                          // Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                          Taxable_Amnt = Number(this.round((Number(Amount) - Number(DiscountAmt)), 2));
                          console.log("Taxable_Amnt : " + Taxable_Amnt)
                          // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                        }
                      }
                      this.credit_item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                    }
                  }

                  else {
                    //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                    alert("something error is happened");
                  }

                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");


                });
              }

            }
          }
          )
      }
      this.addBrokers();
      this.broker_sl_no = 0;
      while (this.sales_credit_note_broker_dtls.length)
        this.sales_credit_note_broker_dtls.removeAt(0);
      for (let data1 of brokerData)
        this.addBrokers();
      this.sales_credit_note_broker_dtls.patchValue(brokerData);
      //console.log("brokerData: "+JSON.stringify(brokerData));

      this.addDocument();
      while (this.sales_credit_note_docs.length)
        this.sales_credit_note_docs.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.sales_credit_note_docs.patchValue(docData);
      //console.log("docData: "+JSON.stringify(docData));

      //console.log("taxData: "+  JSON.stringify(TaxData));
      this.sales_credit_note_tax_info.patchValue(TaxData);

      //console.log("BPData: "+  JSON.stringify(BPData));
      this.sales_credit_note_bp_dtls.patchValue(BPData);

      //console.log("PaymentData: "+  JSON.stringify(PaymentData));
      this.onChangePaymentMode(PaymentData["mode_of_payment"]);
      this.sales_credit_note_payment_dtls.patchValue(PaymentData);

      //console.log("shipmentData: "+  JSON.stringify(shipmentData));
      this.sales_credit_note_shipment_dtls.patchValue(shipmentData);

      //console.log("TransData: "+  JSON.stringify(TransData));
      let i = 0;
      this.addTransporter();
      this.transporter_sl_no = 0;
      while (this.sales_credit_note_trans_dtls.length)
        this.sales_credit_note_trans_dtls.removeAt(0);
      for (let data1 of TransData) {
        this.addTransporter();
        this.sales_credit_note_trans_dtls.at(i).patchValue({
          slno: data1["slno"], transname: data1["transname"],
          vehicletype: data1["vehicletype"], vehicleno: data1["vehicleno"], ewaybillno: data1["ewaybillno"], ewaybilldate: data1["ewaybilldate"]
        })
        //this.sales_credit_note_trans_dtls.at(i).patchValue(data1);
      }

      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  onDelete(id: any) {
    this.status = false;
    if (confirm("Are you sure to delete this Credit Note?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deleteCreditNotes(this.userForm.getRawValue(), id).subscribe(data => {
        //console.log("Cat id:"+data.wm_charge_desc);

        if (data.creditnoteid == '' || data.creditnoteid == null) {
          alert("Opps!!! Can't delete this Credit Notes !!!");
        } else {
          alert("Credit Notes deleted successfully.");
        }
        this.status = true;
        this.ngOnInit()
      });
    }
    this.status = true;
  }
  accountpostingpopup(id, creditnoteid, inv_type) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;

    dialogref = this.dialog.open(CreditnoteaccountpostingComponent, {
      data: { id: id, creditnoteid: creditnoteid, inv_type: inv_type }, height: '80%',
      width: '60%'
    });
    dialogref.afterClosed().subscribe(data => {

    });

  }

  accountpostingundo(id, creditnoteid) {
    alert
    if (confirm("Are you sure to Posting Undo Of this Credit Note ?")) {
      if (confirm("First Delete This Credit Note From Tally!!!")) {
        this.status = false;
        this.DropDownListService.accountpostingundo(id).subscribe(data => {
          if (data["export"] == 0) {
            alert("Account Posting Undo Sucessfully !!!!!!!!!!!!! ");
            //this.Service.getSalesCreditNote(this.company_name).subscribe(salesdata=>
            this.Service.getSalesCreditNoteFast(this.company_name).subscribe(salesdata => {
              this.listCreditNote = salesdata;
              this.status = true;
            });
          }
          else {
            alert("Undo Unsucessfull  !!!!!!!!!!!!! ");
            this.status = true;
          }
        });

      }
    }

  }


  addJobworkItem() {
    this.jobwork_sl_no = this.jobwork_sl_no + 1;
    this.sales_credit_note_item_dtls_for_jobwork.push(this.fb.group({
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

  addJobworkItemservice() {
    this.service_sl_no = this.service_sl_no + 1;
    this.sales_credit_note_item_dtls_for_jobwork_price.push(this.fb.group({
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
  }


  search() {
    let order1_no = this.userForm1.get("order1_no").value;
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let party1 = this.userForm1.get("party1").value;
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchSalesCreditNote("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&party1=" + party1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listCreditNote = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Credit Note Data Not Found !!!")
      this.listCreditNote = [];
    })
  }

  creditNoteEinvoiceGeneration(id, creditnoteid, party) {
    this.status = false;
    forkJoin(
      this.Service.retriveSalesCreditNote(id),
      this.Service.getSalesCreditNoteSD(creditnoteid),
      this.Service.getcreditnotetaxcodes(creditnoteid),
      this.Service.custStatutoryRetriveList(party),
      this.DropDownListService.getCustomerAddressDetails(party)
    ).subscribe(([creditNoteData, shipmentData, taxData, partydetails, customeraddress]) => {

      this.einvoiceGeneration.patchValue({ Version: '1.1', ShipDtls: null });
      this.TranDtls.patchValue({
        TaxSch: 'GST',
        SupTyp: 'B2B',
        IgstOnIntra: 'N',
        RegRev: null,
        EcmGstin: null
      })

      this.DocDtls.patchValue({
        Typ: 'CRN',
        No: creditNoteData.creditnoteno,
        //Dt: formatDate(creditNoteData.invoice_date, 'dd/MM/yyyy', 'en')})
        Dt: formatDate(creditNoteData.creditnotedate, 'dd/MM/yyyy', 'en')
      })

      this.SellerDtls.patchValue({
        /*Gstin: '10AATCA7447B1ZV',
        LglNm: 'AAYOG AGRO PRIVATE LIMITED',
        TrdNm: 'AAYOG AGRO PRIVATE LIMITED',
        Addr1: '802 MAHUA ROAD BELKUNDA',
        Addr2: 'BHOJPATTI VAISHALI',
        Loc: 'HAJIPUR',
        Pin: '844125',
        Stcd: '10',
        Ph: null,
        Em: null*/
        Gstin: '10AADCA2518H1ZD',
        LglNm: 'ANKIT INDIA LIMITED',
        TrdNm: 'ANKIT INDIA LIMITED',
        Addr1: 'PLOT NO-802, MAHUA ROAD',
        Addr2: 'BHOJPATTI VAISHALI',
        Loc: 'HAJIPUR',
        Pin: '844125',
        Stcd: '10',
        Ph: null,
        Em: null
        /*Gstin: '34AACCC1596Q002',
        LglNm: 'NIC company pvt ltd',
        TrdNm: 'NIC Industries',
        Addr1: '5th block, kuvempu layout',
        Addr2: 'kuvempu layout',
        Loc: 'GANDHINAGAR',
        Pin: '605001',
        Stcd: '34',
        Ph: '9000000000',
        Em: 'abc@gmail.com'*/
      })
      let address: any;
      if (customeraddress["add1"].legth > 103) {
        address = customeraddress["add1"].substring(101, 200);
      }
      else {
        address = "Not Required";
      }
      this.BuyerDtls.patchValue({
        Gstin: partydetails.gst_no,
        LglNm: creditNoteData["partyname"],
        TrdNm: creditNoteData["partyname"],
        Pos: partydetails.gst_no.substring(0, 2),
        Addr1: customeraddress["add1"].substring(0, 100),
        Addr2: address,
        Loc: customeraddress["district"],
        Pin: customeraddress["pincode"],
        Stcd: partydetails.gst_no.substring(0, 2),
        Ph: null,
        Em: null
      })
      // console.log("taxData:"+JSON.stringify(creditNoteData))
      this.ValDtls.patchValue({
        AssVal: creditNoteData.item_total,
        //IgstVal: taxData[0]["cgst"]+taxData[0]["sgst"],
        IgstVal: taxData[0]["igst"],
        CgstVal: taxData[0]["cgst"],
        SgstVal: taxData[0]["sgst"],
        StCesVal: 0,
        Discount: 0,
        OthChrg: 0,
        RndOffAmt: creditNoteData.roundoff_amt,
        //TotInvVal: creditNoteData["grand_total"]
        TotInvVal: creditNoteData["payable_amt"]
      })
      //console.log("creditNoteData.invoice_type"+creditNoteData.invoice_type)
      if (creditNoteData.invoice_type == 'INV00003') {
        forkJoin(
          this.Service.getSalesCreditNoteJobwork(creditnoteid),
          this.Service.getSalesCreditNoteJobworkPrice(creditnoteid)
        ).subscribe(([jobitem, serviceitem]) => {
          //console.log("Job Item:"+JSON.stringify(jobitem))
          //console.log("SERVICE Item:"+JSON.stringify(serviceitem))
          this.addItemList();
          while (this.ItemList.length)
            this.ItemList.removeAt(0);
          this.addItemList();

          this.ItemList.at(0).patchValue({
            SlNo: '1',
            PrdDesc: serviceitem[0].item_service_name,
            IsServc: 'Y',
            HsnCd: serviceitem[0].sac_code,
            Qty: jobitem[0].item_qty,
            UnitPrice: serviceitem[0].job_price,
            TotAmt: serviceitem[0].amount,
            Discount: 0,
            PreTaxVal: '0',
            AssAmt: this.round(Number(serviceitem[0].amount), 2),
            GstRt: serviceitem[0].igst_tax,
            // IgstAmt:serviceitem[0].cgst_amt+serviceitem[0].sgst_amt,
            IgstAmt: serviceitem[0].igst_amt,
            CgstAmt: serviceitem[0].cgst_amt,
            SgstAmt: serviceitem[0].sgst_amt,
            CesRt: 0,
            CesAmt: 0,
            CesNonAdvlAmt: 0,
            StateCesRt: 0,
            StateCesAmt: 0,
            StateCesNonAdvlAmt: 0,
            OthChrg: 0,
            TotItemVal: serviceitem[0].tot_amount
          })
          if (jobitem[0].price_based_on == "Packing") {
            this.ItemList.at(0).patchValue({ Qty: jobitem[0].pack_qty, Unit: jobitem[0].pack_uom })
          }
          else {
            if (jobitem[0].item_uom == "QTLS") {
              this.ItemList.at(0).patchValue({ Qty: jobitem[0].item_qty, Unit: 'QTL' })
            }
            else {
              this.ItemList.at(0).patchValue({ Qty: jobitem[0].item_qty, Unit: jobitem[0].item_uom })
            }
          }
          //console.log(" job json::"+JSON.stringify(this.einvoiceGeneration.getRawValue()))
          this.statusdto.patchValue({ status: JSON.stringify(this.einvoiceGeneration.getRawValue()) })
          this.Service.creditNoteEinvoiceGeneration(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {

            //console.log("Status1:"+data.status)
            let message = data.status.substring(4, data.status.length);
            // console.log("message"+message)
            if (data.status.includes('Yes')) {
              alert(message);
            }
            else {
              alert(data.status)
            }
            this.ngOnInit();
            this.status = true;
          });
        });
      }
      else {
        //console.log("enter else:")
        this.Service.getSalesCreditNoteID(creditnoteid).subscribe(itemData => {
          this.addItemList();
          let k = 0;
          while (this.ItemList.length)
            this.ItemList.removeAt(0);
          for (let item of itemData) {
            this.addItemList();
            this.ItemList.at(k).patchValue({
              SlNo: "" + Number(k + 1),
              PrdDesc: item.item_name,
              IsServc: 'N',
              HsnCd: item.hsn_code,
              // Qty:item.quantity,
              UnitPrice: item.price,
              TotAmt: item.amount,
              Discount: item.discount_amt,
              PreTaxVal: 0,
              AssAmt: this.round(Number(item.amount + item.discount_amt), 2),
              GstRt: item.tax_rate,
              // IgstAmt: item.cgstamt+item.sgstamt,
              IgstAmt: item.igstamt,
              CgstAmt: item.cgstamt,
              SgstAmt: item.sgstamt,
              CesRt: 0,
              CesAmt: 0,
              CesNonAdvlAmt: 0,
              StateCesRt: 0,
              StateCesAmt: 0,
              StateCesNonAdvlAmt: 0,
              OthChrg: 0,
              TotItemVal: item.total_amt
            })
        /*if (item.price_based_on == "Packing") {
            this.ItemList1.at(k).patchValue({ quantity: item.squantity, qtyUnit: item.suom })
          }
          else {
            if (item.uom == "QTLS") {
              this.ItemList1.at(k).patchValue({ quantity: item.quantity, qtyUnit: 'QTL' })
            }
            else {
              this.ItemList1.at(k).patchValue({ quantity: item.quantity, qtyUnit: item.uom })
            }
          }*/
            if (creditNoteData.creditnotetype == 'Acceptance of Lower Rate') {
              this.ItemList.at(k).patchValue({ Qty: 0, Unit: 'QTL' })
            }
            else {
              if (item.price_based_on == "Packing") {
                this.ItemList.at(k).patchValue({ Qty: item.squantity, Unit: item.suom })
              }
              else {
                if (item.uom == "QTLS") {
                  this.ItemList.at(k).patchValue({ Qty: item.quantity, Unit: 'QTL' })
                }
                else {
                  this.ItemList.at(k).patchValue({ Qty: item.quantity, Unit: item.uom })
                }
              }
            }

            k++;
          }
          //console.log("json::"+JSON.stringify(this.einvoiceGeneration.getRawValue()))

          this.statusdto.patchValue({ status: JSON.stringify(this.einvoiceGeneration.getRawValue()) })

          this.Service.creditNoteEinvoiceGeneration(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
            let message = data.status.substring(4, data.status.length);
            //console.log("message"+message)
            if (data.status.includes('Yes')) {
              alert(message);
            }
            else {
              alert(data.status)
            }
            this.ngOnInit();
            this.status = true;
          });
        });
      }

    });
  }


  creditnoteEinvoiceCancel(creditnoteid, id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;
    //alert(id+"//"+invoiceid);
    dialogref = this.dialog.open(CreditnoteEinvoiceCancelComponent, {
      data: {}, height: '60%',
      width: '40%'
    });
    dialogref.afterClosed().subscribe(datamsg => {
      this.status = false;
      console.log("cencel_message:" + datamsg.cencel_message)
      this.DropDownListService.creditnoteeinvoicedetails(creditnoteid).subscribe(data => {
        //ack_no//invoice_id
        this.cancel.patchValue(
          {
            Irn: data['irn_no'],
            CnlRsn: "1",
            CnlRem: "Wrong entry",
          });
        // console.log(" :: " + JSON.stringify(data) )
        this.responsedto.patchValue({ status: JSON.stringify(this.cancel.getRawValue()), cancel_message: datamsg.cencel_message })
        this.Service.creditNoteEinvoicecancel(this.responsedto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
          //console.log("check status::"+data.status)
          if (data.status == 'Done') {
            alert("Credit Note E-Invoice Cancellation Done.")
          }
          else {
            alert(data.status)
          }
          this.ngOnInit();
          this.status = true;
        });
      })
    });
  }

  trans_name: any;
  creditnoteEwaybillCreate(creditnoteid, id, creditnotedate) {
    this.status = false;
    forkJoin(
      this.DropDownListService.creditnoteeinvoicedetails(creditnoteid),
      this.Service.getSalesCreditNoteTD(creditnoteid)
    )
      .subscribe(([data, transdata]) => {
        //console.log(JSON.stringify(transdata))
        if (transdata[0]["transporter"] == 0 || transdata[0]["transporter"] == '' || transdata[0]["transporter"] == 'NA') {
          this.trans_name = null;
        }
        else {
          this.trans_name = transdata[0]["transporter"];
        }
        this.ewaybillcreate.patchValue({
          Irn: data['irn_no'],
          Distance: 0,
          TransMode: "1",
          TransId: null,
          TransName: this.trans_name,
          TrnDocDt: formatDate(creditnotedate, 'dd/MM/yyyy', 'en'),
          TrnDocNo: null,
          VehNo: transdata[0]["vehicle"].replaceAll(' ', ''),
          VehType: "R"
        })
        console.log("json::" + JSON.stringify(this.ewaybillcreate.getRawValue()))
        this.statusdto.patchValue({ status: JSON.stringify(this.ewaybillcreate.getRawValue()) })
        this.Service.creditNoteEwaybillcreate(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
          //console.log("status::::"+data.status)
          let message = data.status.substring(5, data.status.length);
          //console.log("message"+message)
          if (data.status.includes('Done')) {
            alert(message);
          }
          else if (data.status.includes('None')) {
            alert("Credit Note E-way Bill has not been Created!!!!!!")
          }
          else {
            alert(data.status)
          }
          this.ngOnInit();
          this.status = true;
        });
      });
  }

  creditnoteEwaybillCancel(creditnoteid, id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;
    //alert(id+"//"+invoiceid);
    dialogref = this.dialog.open(CreditnoteEwaybillCancelComponent, {
      data: {}, height: '60%',
      width: '40%'
    });
    dialogref.afterClosed().subscribe(datamsg => {
      this.status = false;
      console.log("cencel_message:" + datamsg.cencel_message)
      this.DropDownListService.creditnoteeinvoicedetails(creditnoteid).subscribe(data => {
        this.ewaybillcancel.patchValue(
          {
            ewbNo: data['eway_bill_no'],
            cancelRsnCode: 2,
            cancelRmrk: "Cancelled the order"
          });
        // console.log(" :: " + JSON.stringify(data) )
        this.responsedto.patchValue({ status: JSON.stringify(this.ewaybillcancel.getRawValue()), cancel_message: datamsg.cencel_message })
        this.Service.creditNoteEwaybillcancel(this.responsedto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
          //console.log("check status::"+data.status)
          if (data.status == 'Done') {
            alert("E-Waybill Cancellation Done.")
          }
          else {
            alert(data.status)
          }
          this.ngOnInit();
          this.status = true;
        });

      })

    });

  }



  creditnoteEwaybillWOinvoiceCreate(id, creditnoteid, party,bunit) {
    this.status = false;
    forkJoin(
      this.Service.retriveSalesCreditNote(id),
      this.Service.getcreditnotetaxcodes(creditnoteid),
      this.Service.custStatutoryRetriveList(party),
      this.DropDownListService.getCustomerAddressDetails(party),
      this.Service.getSalesCreditNoteTD(creditnoteid),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),bunit)
    ).subscribe(([creditNoteData, taxData, partydetails, customeraddress, transporter,companystate]) => {
      //console.log("creditNoteData:"+JSON.stringify(creditNoteData))
      //console.log("taxData:"+JSON.stringify(taxData))
      //console.log("partydetails:"+JSON.stringify(partydetails))
      //console.log("customeraddress:"+JSON.stringify(customeraddress))
      // console.log("transporter:"+JSON.stringify(transporter))
      this.company_state=companystate["state_name"];
     // console.log("Comp State:"+this.company_state)

      let address: any;
      if (customeraddress["add1"].legth > 103) {
        address = customeraddress["add1"].substring(101, 200);
      }
      else {
        address = "Not Required";
      }
      //console.log("address:"+address)
      this.ewaybillWOInvoiceGen.patchValue({
        //supplyType: 'O',
        supplyType: 'I',
        //subSupplyType: '1',
        subSupplyType: '7',
        subSupplyDesc: null,
        docType: 'CHL',
        docNo: creditNoteData.creditnoteno,
        docDate: formatDate(creditNoteData.creditnotedate, 'dd/MM/yyyy', 'en'),
        /*
        toGstin: '34AACCC1596Q002',
        toTrdName: 'NIC company pvt ltd',
        toAddr1: '5th block, kuvempu layout',
        toAddr2: 'kuvempu layout',
        toPlace: 'GANDHINAGAR',
        toPincode: '605001',
        actToStateCode: 34,
        toStateCode: 34,
       */
        fromGstin: partydetails.gst_no,
        fromTrdName: creditNoteData["partyname"],
        fromAddr1: customeraddress["add1"].substring(0, 100),
        fromAddr2: address,
        fromPlace: customeraddress["district"],
        fromPincode: customeraddress["pincode"],
        actFromStateCode: partydetails.gst_no.substring(0, 2),
        fromStateCode: partydetails.gst_no.substring(0, 2),

        /*toGstin: '10AATCA7447B1ZV',
        toTrdName: 'AAYOG AGRO PRIVATE LIMITED',
        toAddr1: '802 MAHUA ROAD BELKUNDA',
        toAddr2: 'BHOJPATTI VAISHALI',
        toPlace: 'HAJIPUR',
        toPincode: '844125',
        actToStateCode: 10,
        toStateCode: 10,*/
        toGstin: '10AADCA2518H1ZD',
        toTrdName: 'ANKIT INDIA LIMITED',
        toAddr1: 'PLOT NO-802, MAHUA ROAD',
        toAddr2: 'BHOJPATTI VAISHALI',
        toPlace: 'HAJIPUR',
        toPincode: '844125',
        actToStateCode: 10,
        toStateCode: 10,
        transactionType: '4',
        dispatchFromGSTIN: null,
        dispatchFromTradeName: null,
        shipToGSTIN: null,
        shipToTradeName: null,
        otherValue: 0,
        totalValue: creditNoteData.item_total,
        cgstValue: taxData[0]["cgst"],
        sgstValue: taxData[0]["sgst"],
        igstValue: taxData[0]["igst"],
        //cgstValue: taxData[0]["igst"],
        //sgstValue: taxData[0]["igst"],
        //igstValue: taxData[0]["cgst"]+taxData[0]["sgst"],
        cessValue: 0,
        cessNonAdvolValue: 0,
        totInvValue: creditNoteData["grand_total"],
        transporterId: null,
        transporterName: transporter[0]["transporter"],
        transDocNo: creditNoteData.creditnoteno,
        transMode: '1',
        transDistance: '0',
        transDocDate: formatDate(creditNoteData.creditnotedate, 'dd/MM/yyyy', 'en'),
        vehicleNo: transporter[0]["vehicle"].replaceAll(' ', ''),
        vehicleType: "R"
      });

      let cgstrate = 0;
      let sgstrate = 0;
      let igstrate = 0;
      if(customeraddress.state == this.company_state){
      //if (Number(10) == Number(partydetails.gst_no.substring(0, 2))) {
        //if (Number(34) == Number(partydetails.gst_no.substring(0, 2))) {
        cgstrate = Number(taxData[0]["tax_rate"]) / 2;
        sgstrate = Number(taxData[0]["tax_rate"]) / 2;
        igstrate = 0;
      }
      else {
        cgstrate = 0;
        sgstrate = 0;
        igstrate = Number(taxData[0]["tax_rate"]);
      }

      //console.log("SalesInvoiceData.invoice_type"+SalesInvoiceData.invoice_type)
      /* if (creditNoteData.invoice_type == 'INV00003') {   //for job work ewaybill not create
         forkJoin(
           this.Service.getSalesCreditNoteJobwork(creditnoteid),
           this.Service.getSalesCreditNoteJobworkPrice(creditnoteid)
         ).subscribe(([jobitem, serviceitem]) => {
           //console.log("Job Item:"+JSON.stringify(jobitem))
           //console.log("SERVICE Item:"+JSON.stringify(serviceitem))
           this.addItemWithOutInvoiceList();
           while (this.ItemList1.length)
             this.ItemList1.removeAt(0);
           this.addItemWithOutInvoiceList();
 
           this.ItemList1.at(0).patchValue({
             productName: serviceitem[0].item_service_name,
             productDesc: serviceitem[0].item_service_name,
             hsnCode: serviceitem[0].sac_code,
             igstRate: igstrate,
             cgstRate: cgstrate,
             sgstRate: sgstrate,
             cessRate: 0,
             cessNonAdvol: 0,
             taxableAmount: serviceitem[0].tot_amount
           })
 
           if (jobitem[0].price_based_on == "Packing") {
             this.ItemList1.at(0).patchValue({ quantity: jobitem[0].pack_qty, qtyUnit: jobitem[0].pack_uom })
 
           }
           else {
             if (jobitem[0].item_uom == "QTLS") {
               this.ItemList1.at(0).patchValue({ quantity: jobitem[0].qtyUnit, Unit: 'QTL' })
             }
             else {
               this.ItemList1.at(0).patchValue({ quantity: jobitem[0].qtyUnit, Unit: jobitem[0].item_uom })
             }
           }
 
           this.statusdto.patchValue({ status: JSON.stringify(this.ewaybillWOInvoiceGen.getRawValue()) })
           this.Service.creditNoteEwaybillWOInvoiceCreate(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
 
             //console.log("Status1:"+data.status)
             let message = data.status.substring(4, data.status.length);
             // console.log("message"+message)
             if (data.status.includes('Yes')) {
               alert(message);
             }
             else {
               alert(data.status)
             }
             this.ngOnInit();
             this.status = true;
           });
         });
       }
       else { */
      //console.log("enter else:")
      this.Service.getSalesCreditNoteID(creditnoteid).subscribe(itemData => {
        this.addItemWithOutInvoiceList();
        let k = 0;

        while (this.ItemList1.length)
          this.ItemList1.removeAt(0);
        for (let item of itemData) {
          this.addItemWithOutInvoiceList();
          this.ItemList1.at(k).patchValue({
            productName: item.item_name,
            productDesc: item.item_name,
            hsnCode: item.hsn_code,
            taxableAmount: this.round(Number(item.amount + item.discount_amt), 2),
            igstRate: igstrate,
            cgstRate: cgstrate,
            sgstRate: sgstrate,
            cessRate: 0,
            cessNonAdvol: 0,
          })

          /*if (item.price_based_on == "Packing") {
            this.ItemList1.at(k).patchValue({ quantity: item.squantity, qtyUnit: item.suom })
          }
          else {
            if (item.uom == "QTLS") {
              this.ItemList1.at(k).patchValue({ quantity: item.quantity, qtyUnit: 'QTL' })
            }
            else {
              this.ItemList1.at(k).patchValue({ quantity: item.quantity, qtyUnit: item.uom })
            }
          }*/
          if (creditNoteData.creditnotetype == 'Acceptance of Lower Rate') {
            this.ItemList.at(k).patchValue({ Qty: 0, Unit: 'QTL' })
          }
          else {
            if (item.price_based_on == "Packing") {
              this.ItemList.at(k).patchValue({ Qty: item.squantity, Unit: item.suom })
            }
            else {
              if (item.uom == "QTLS") {
                this.ItemList.at(k).patchValue({ Qty: item.quantity, Unit: 'QTL' })
              }
              else {
                this.ItemList.at(k).patchValue({ Qty: item.quantity, Unit: item.uom })
              }
            }
          }
          k++;
        }
        console.log("total json::" + JSON.stringify(this.ewaybillWOInvoiceGen.getRawValue()))
        this.statusdto.patchValue({ status: JSON.stringify(this.ewaybillWOInvoiceGen.getRawValue()) })
        this.Service.creditNoteEwaybillWOInvoiceCreate(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
          //console.log("Status1:"+data.status)
          let message = data.status.substring(4, data.status.length);
          //console.log("message"+message)
          if (data.status.includes('Yes')) {
            alert(message);
          }
          else {
            alert(data.status)
          }
          this.ngOnInit();
          this.status = true;
        });
      });
      // }

    });
  }

  addItemList() {

    this.ItemList.push(this.fb.group({
      SlNo: '',
      PrdDesc: '',
      IsServc: '',
      HsnCd: '',
      Qty: '',
      Unit: '',
      UnitPrice: '',
      TotAmt: '',
      Discount: '',
      PreTaxVal: '',
      AssAmt: '',
      GstRt: '',
      IgstAmt: '',
      CgstAmt: '',
      SgstAmt: '',
      CesRt: '',
      CesAmt: '',
      CesNonAdvlAmt: '',
      StateCesRt: '',
      StateCesAmt: '',
      StateCesNonAdvlAmt: '',
      OthChrg: '',
      TotItemVal: ''
    }));
  }

  addItemWithOutInvoiceList() {
    this.ItemList1.push(this.fb.group({
      productName: '',
      productDesc: '',
      hsnCode: '',
      quantity: '',
      qtyUnit: '',
      cgstRate: '',
      sgstRate: '',
      igstRate: '',
      cessRate: '',
      cessNonAdvol: '',
      taxableAmount: ''
    }));
  }

}
