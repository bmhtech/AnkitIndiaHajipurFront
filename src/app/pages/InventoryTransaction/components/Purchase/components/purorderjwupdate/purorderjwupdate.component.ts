import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs';
import { PurchaseOrder } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseOrder';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';

@Component({
  selector: 'app-purorderjwupdate',
  templateUrl: './purorderjwupdate.component.html',
  styleUrls: ['./purorderjwupdate.component.scss']
})
export class PurorderjwupdateComponent implements OnInit {

  public userForm: FormGroup;
  model: PurchaseOrder = new PurchaseOrder();
  Pur_orderid: any;
  status: any;
  Id: any;

  constructor(private fb: FormBuilder, private UpdateService: Master, private PurchaseService: PurchaseModuleServiceService,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<PurorderjwupdateComponent>, @Inject(MAT_DIALOG_DATA) data) {

    this.Pur_orderid = data["pur_orderid"];
    this.Id = data["id"];
    //console.log(this.Pur_orderid + " / " + this.Id)
    this.userForm = fb.group(
      {
        id: [''],
        pur_orderid: [''],
        pur_order_no: [''],
        ord_date: [''],
        ser_item_type: [true],
        ser_item_subtype: [''],
        supplier_name: [''],
        businessunit: [''],
        po_fullfillment: [''],
        no_of_advice: [''],
        broker_info: [''],
        advice_req: [''],
        referance_type: [''],
        pref_doc_no: [''],
        madvice_sin_grn: [''],
        weightment_req: [''],
        pan_no: [''],
        gst_no: [''],
        cin_no: [''],
        brokerage_active: [''],
        tan_no: [''],
        ship_to_addr_id: [''],
        ship_to_addr: [''],
        pay_to_addr_id: [''],
        pay_to_addr: [''],
        broker_name: [''],
        gl_account: [''],
        remarks: [''],
        doc_upload: [''],
        confirmed_by: [''],
        approved: [''],
        reason: [''],
        term_pur_ord: [''],
        master_roll_required: [],
        pur_ord_type: [],
        app_chgs_id: [''],
        all_unit: [''],
        company_id: [''],
        fin_year: [''],
        referance_id: [''],
        username: [''],
        receipt_criteria: [''],
        total_qty: [''],
        staticuom: [''],
        tagadvice_status: [''],
        channel_req: [''],
        sup_channel: [''],
        sup_channel_list: [''],
        poitemnumber: [''],
        consignment_type: [''],
        trans_borne_by_chgs: [''],
        document_no: [''],

        pur_Order_Item_Details: this.fb.array([this.fb.group({
          slno: '',
          item_code: '',
          item_name: '',
          classified_item_name: '',
          packing_item: '',
          packing_item_name: '',

          packing_item_code: '',
          packing_size: '',
          packing_weight: '',
          packing_type: '',

          packing_uom: '',
          packing_qty: '',
          stock_uom: '',
          stock_qty: '',
          toleranceqty: '0',

          price: '',
          con_factor: '0',
          mat_weight: '',
          price_based_on: '',
          amount: '',
          taxable_amount: '',
          discount: '',
          discount_basedon: '',
          discount_amount: '',
          net_amount: '',
          tax_code: '',
          tax_amount: '',
          total_amount: '',
          qc_norms: '',
          priority: '',
          delivery_date: '',
          purpose: '',
          to_be_used: '',
          remarks: '',
          tax_rate: '',

          packing_list_req: '',
          packing_list: '',
          adjusted_remarks: '',
          adjusted_qty: ''
          // weight_tolerance: ''
        })]),

        pur_Order_broker: this.fb.array([this.fb.group({
          sl_no: '',
          ven_code_name: '',
          basis: '',
          rate: '',
          amount: '',
          tax_rate: '',
          tax_amount: '',
          total_amount: '',
          brokerage_acc: '',
          tds_acc: '',
          tds_rate: ''
        })]),

        pur_Order_docs: this.fb.array([this.fb.group({
          doc_name: ''
        })]),

        pur_Order_Terms_Con: this.fb.group({
          payment_mode: '',
          cash_limit: '',
          tcs_applicable: '',
          tcs_rate: '',
          payment_terms: '',
          bank_name: '',
          account_name: '',
          account_no: '',
          branch: '',
          ifsc: '',
          mobile: '',
          iban: '',
          bic_swift_code: ''
        }),

        pur_Order_app_chgs: this.fb.array([this.fb.group({
          charges_name: '',
          add_less: '',
          rate_cal_method: '',
          app_rate: '',
          tax_rate: '',
          amount: '',
          required: ''
        })]),

        pur_order_terms_conditions: this.fb.array([this.fb.group({
          slno: '',
          terms_name: '',
          description: '',
        })]),

        pur_Order_BPDetails: this.fb.group({
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

        pur_Order_Terminations: this.fb.group({
          term_pur_ord: '',
          order_by: '',
          reason: '',
          remarks: '',
          tot_term_chg: '',
          term_add: '',
          term_deduct: '',
          net_term_chg: '',
          charges_descpt: ''
        }),

        pur_Order_Terminations_dyn: this.fb.array([this.fb.group({
          charge_name: '',
          termination_cal: '',
          cal_qty: '',
          amount: '',
          method: '',
          tax_rate: '',
          qty: '',
          rate: '',
          gl_account: '',
          tax_amount: '',
          total_amount: '',
        })]),

        pur_Order_Trans_Infos: this.fb.group({
          trans_borne_by: '',
          mode_of_trans: '',
          transport_from: '',
          transport_to: '',
          transporter_name: '',
          transport_rate: '',
          // charge_code: '',
          rate_value: '',
          payment_mode: '',
          payment_terms: '',
          bank_name: '',
          account_name: '',
          account_no: '',
          branch: '',
          iban: '',
          bic_swift_code: '',
          cash_limit: '',
          ifsc_code: '',
          mobile: ''
        }),

        pur_Order_Trans_Chgs_dyn: this.fb.array([this.fb.group({
          slno: '',
          mode_of_trans: '',
          transport_from: '',
          transport_to: '',
          transporter_name: '',
          transport_rate: '',
          charge_code: '',
          chgs_rate_value: '',
          chgs_remarks: '',
          distance_in_km: '',
          uom: '',
          tax_code: '',
          tax_rate: '',
          transportation_acc: '',
          tds_code: '',
          tds_codename: '',
          tds_rate: '',
          tds_acc: '',
          tds_accname: '',
          allowed_shortage: '',
          deduction_basedon: '',
          charge_id: ''
        })]),




      });
  }

  get receipt_criteria() { return this.userForm.get("receipt_criteria") as FormControl }
  get poitemnumber() { return this.userForm.get("poitemnumber") as FormControl }

  get consignment_type() { return this.userForm.get("consignment_type") as FormControl }

  get trans_borne_by_chgs() { return this.userForm.get("trans_borne_by_chgs") as FormControl }


  get channel_req() { return this.userForm.get("channel_req") as FormControl }
  get sup_channel() { return this.userForm.get("sup_channel") as FormControl }
  get sup_channel_list() { return this.userForm.get("sup_channel_list") as FormControl }

  get total_qty() { return this.userForm.get("total_qty") as FormControl }
  get staticuom() { return this.userForm.get("staticuom") as FormControl }
  get tagadvice_status() { return this.userForm.get("tagadvice_status") as FormControl }

  get referance_id() { return this.userForm.get("referance_id") as FormControl }
  get id() { return this.userForm.get("id") as FormControl }
  get brokerage_active() { return this.userForm.get("brokerage_active") as FormControl }
  get ord_date() { return this.userForm.get("ord_date") as FormControl }
  get ser_item_type() { return this.userForm.get("ser_item_type") as FormControl }
  get ser_item_subtype() { return this.userForm.get("ser_item_subtype") as FormControl }
  get supplier_name() { return this.userForm.get("supplier_name") as FormControl }
  get businessunit() { return this.userForm.get("businessunit") as FormControl }
  get po_fullfillment() { return this.userForm.get("po_fullfillment") as FormControl }
  get no_of_advice() { return this.userForm.get("no_of_advice") as FormControl }
  get broker_info() { return this.userForm.get("broker_info") as FormControl }
  get advice_req() { return this.userForm.get("advice_req") as FormControl }
  get referance_type() { return this.userForm.get("referance_type") as FormControl }
  get pref_doc_no() { return this.userForm.get("pref_doc_no") as FormControl }
  get madvice_sin_grn() { return this.userForm.get("madvice_sin_grn") as FormControl }
  get weightment_req() { return this.userForm.get("weightment_req") as FormControl }
  get pan_no() { return this.userForm.get("pan_no") as FormControl }
  get gst_no() { return this.userForm.get("gst_no") as FormControl }
  get cin_no() { return this.userForm.get("cin_no") as FormControl }
  get tan_no() { return this.userForm.get("tan_no") as FormControl }
  get ship_to_addr_id() { return this.userForm.get("ship_to_addr_id") as FormControl }
  get ship_to_addr() { return this.userForm.get("ship_to_addr") as FormControl }
  get pay_to_addr_id() { return this.userForm.get("pay_to_addr_id") as FormControl }
  get pay_to_addr() { return this.userForm.get("pay_to_addr") as FormControl }
  get broker_name() { return this.userForm.get("broker_name") as FormControl }
  get gl_account() { return this.userForm.get("gl_account") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get doc_upload() { return this.userForm.get("doc_upload") as FormControl }
  get confirmed_by() { return this.userForm.get("confirmed_by") as FormControl }
  get approved() { return this.userForm.get("approved") as FormControl }
  get reason() { return this.userForm.get("reason") as FormControl }
  get term_pur_ord() { return this.userForm.get("term_pur_ord") as FormControl }
  get pur_ord_type() { return this.userForm.get("pur_ord_type") as FormControl }
  get master_roll_required() { return this.userForm.get("master_roll_required") as FormControl }
  get document_no() { return this.userForm.get("document_no") as FormControl }
  get pur_Order_docs() { return this.userForm.get('pur_Order_docs') as FormArray; }
  get pur_Order_Item_Details() { return this.userForm.get('pur_Order_Item_Details') as FormArray; }
  get pur_Order_BPDetails() { return this.userForm.get('pur_Order_BPDetails') as FormGroup; }
  get pur_Order_Terminations() { return this.userForm.get('pur_Order_Terminations') as FormGroup; }
  get pur_Order_Terminations_dyn() { return this.userForm.get('pur_Order_Terminations_dyn') as FormArray; }
  get pur_Order_Trans_Infos() { return this.userForm.get('pur_Order_Trans_Infos') as FormGroup; }
  get pur_Order_app_chgs() { return this.userForm.get('pur_Order_app_chgs') as FormArray; }
  get pur_order_terms_conditions() { return this.userForm.get('pur_order_terms_conditions') as FormArray; }
  get pur_Order_broker() { return this.userForm.get('pur_Order_broker') as FormArray; }
  get pur_Order_Terms_Con() { return this.userForm.get('pur_Order_Terms_Con') as FormGroup; }
  get pur_Order_Trans_Chgs_dyn() { return this.userForm.get('pur_Order_Trans_Chgs_dyn') as FormArray; }

  ngOnInit() {
    this.status = true

    forkJoin(
      this.UpdateService.purOrderRetrive(this.Id),
      this.UpdateService.purOrdItemRetriveList(this.Pur_orderid),
      this.UpdateService.getPurOrdAppChgs(this.Pur_orderid),
      this.UpdateService.purOrdTransConRetriveList(this.Pur_orderid),
      this.UpdateService.getPurOrdTrans(this.Pur_orderid),
      this.UpdateService.getPurOrdBrokerList(this.Pur_orderid),
      this.UpdateService.purOrdBPDRetriveList(this.Pur_orderid),
      this.UpdateService.purOrdDocRetriveList(this.Pur_orderid),
      this.UpdateService.getPurOrdTermList(this.Pur_orderid),
      this.UpdateService.purOrdTerminateRetriveList(this.Pur_orderid),
      this.UpdateService.getPurOrdTransChgsDynList(this.Pur_orderid),
      this.UpdateService.getPurOrdTermsCondDynList(this.Pur_orderid)
    ).subscribe(([purOrderData, itemData, appChgData, tcData, transData, brokerData,
      bpData, docData, dynTerminationData, staticTerminationData, chgDyndata, termsCondsData]) => {
      //console.log(JSON.stringify(purOrderData))
      //console.log(JSON.stringify(itemData))

      this.userForm.patchValue({
        pur_orderid: purOrderData["pur_orderid"], pur_order_no: purOrderData["pur_order_no"], company_id: purOrderData["company_id"],
        ord_date: purOrderData["ord_date"], ser_item_subtype: purOrderData["ser_item_subtype"],
        pur_ord_type: purOrderData["pur_ord_type"], supplier_name: purOrderData["supplier_name"], businessunit: purOrderData["businessunit"],
        advice_req: purOrderData["advice_req"], po_fullfillment: purOrderData["po_fullfillment"],
        referance_type: purOrderData["referance_type"], pref_doc_no: purOrderData["pref_doc_no"], master_roll_required: purOrderData["master_roll_required"],
        broker_info: purOrderData["broker_info"], madvice_sin_grn: purOrderData["madvice_sin_grn"], weightment_req: purOrderData["weightment_req"],
        pan_no: purOrderData["pan_no"], gst_no: purOrderData["gst_no"], cin_no: purOrderData["cin_no"], tan_no: purOrderData["tan_no"],
        ship_to_addr_id: purOrderData["ship_to_addr_id"], ship_to_addr: purOrderData["ship_to_addr"], pay_to_addr_id: purOrderData["pay_to_addr_id"],
        pay_to_addr: purOrderData["pay_to_addr"], remarks: purOrderData["remarks"], confirmed_by: purOrderData["confirmed_by"], approved: purOrderData["approved"],
        reason: purOrderData["reason"], app_remarks: purOrderData["app_remarks"], brokerage_active: purOrderData["brokerage_active"],
        app_chgs_id: purOrderData["app_chgs_id"], fin_year: purOrderData["fin_year"], receipt_criteria: purOrderData["receipt_criteria"],
        total_qty: purOrderData["total_qty"], staticuom: purOrderData["staticuom"], tagadvice_status: purOrderData["tagadvice_status"],
        channel_req: purOrderData["channel_req"], sup_channel: purOrderData["sup_channel"],
        poitemnumber: purOrderData["poitemnumber"], consignment_type: purOrderData["consignment_type"],
        trans_borne_by_chgs: purOrderData["trans_borne_by_chgs"],document_no:purOrderData["document_no"],ser_item_type:purOrderData["ser_item_type"]
      });
      this.addItem();
      while (this.pur_Order_Item_Details.length)
        this.pur_Order_Item_Details.removeAt(0);
      for (let data1 of itemData) {
        this.addItem();
        this.pur_Order_Item_Details.patchValue(itemData);
      }

      this.pur_Order_app_chgs.patchValue(appChgData);
      this.pur_Order_Terms_Con.patchValue(tcData);
      this.pur_Order_Trans_Infos.patchValue(transData);
      this.pur_Order_broker.patchValue(brokerData);
      this.pur_Order_BPDetails.patchValue(bpData);
      this.pur_Order_docs.patchValue(docData);
      this.pur_Order_Terminations_dyn.patchValue(dynTerminationData);
      this.pur_Order_Terminations.patchValue(staticTerminationData);
      this.pur_Order_Trans_Chgs_dyn.patchValue(chgDyndata);
      this.pur_order_terms_conditions.patchValue(termsCondsData);
    });
  }

  addItem() {

    this.pur_Order_Item_Details.push(this.fb.group({
      slno: '',
      item_code: '',
      item_name: '',
      classified_item_name: '',
      packing_item: '',
      packing_item_name: '',
      packing_item_code: '',
      packing_size: '',
      packing_weight: '',
      packing_type: '',
      packing_uom: '',
      packing_qty: '',
      stock_uom: '',
      stock_qty: '',
      toleranceqty: '0',
      price: '',
      con_factor: '0',
      mat_weight: '',
      price_based_on: '',
      amount: '',
      taxable_amount: '',
      discount: '',
      discount_basedon: '',
      discount_amount: '',
      net_amount: '',
      tax_code: '',
      tax_amount: '',
      total_amount: '',
      qc_norms: '',
      priority: '',
      delivery_date: '',
      purpose: '',
      to_be_used: '',
      remarks: '',
      tax_rate: '',
      packing_list_req: '',
      packing_list: '',
      adjusted_remarks: '',
      adjusted_qty: ''
      // weight_tolerance: ''
    }));
  }

  SendDataToDifferentComponenet() {

    this.status = false;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });

    this.PurchaseService.updatePurOrder(this.userForm.getRawValue(), this.Id).subscribe(data => {
      alert("Jw Items Adjusted  successfully.");
      this.userForm.reset();
      this.dialogRef.close();
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });


  }

}
