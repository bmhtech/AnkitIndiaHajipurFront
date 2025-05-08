import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { apiconfig } from '../Configuration/ApiConfig';
import { Bin } from '../Models/InventoryModel/Bin';
import { Indent, IndentorderDetails, pur_Indent_docs } from '../Models/transaction/PurchaseTransaction/IndentOrder';
import { Broker, broker_master_add_dyn, Broker_master_pty, Broker_master_vdr, broker_master_stu_details, broker_master_doc, Broker_master_transporter, Broker_master_oth, broker_master_acc, Broker_master_add } from '../Models/BrokerModel/Broker';
import { BusinessPartnerGroup } from '../Models/InventoryModel/BusinessPartnerGroup';
import { materialCategory } from '../Models/InventoryModel/MaterialCategory';
import { materialGroup } from '../Models/InventoryModel/MaterialGroup';
import { materialType } from '../Models/InventoryModel/MaterialType';
import { mise } from '../Models/InventoryModel/Mise';
import { Supplier } from '../Models/InventoryModel/Supplier';
import { Enquiry, EnquiryServiceDetails, EnquiryBPDetails, pur_Enquiry_docs } from '../Models/transaction/PurchaseTransaction/PurchaseEnquiry';
import { taxType } from '../Models/InventoryModel/TaxType';
import { WeighmentCharges } from '../Models/OtherMaster/weighment-charges';
import { CompanyBusinessPartnerUnit, companyBusinessUnitDetails } from '../Models/InventoryModel/CompanyBusinessUnit';
import { Customer } from '../Models/InventoryModel/Customer';
import { CustomUom } from '../Models/InventoryModel/CustomUom';
import { material } from '../Models/InventoryModel/Material';
import { TransportationChgsMatrix, transportation_chgs_matrix_details } from '../Models/InventoryModel/TransportationChgsMatrix';
import { transporter } from '../Models/InventoryModel/transporter';
import { Vehicle, Vehicle_master_docs_details } from '../Models/InventoryModel/vehicle';
import { wareHouse } from '../Models/InventoryModel/ware-house-master';
import { Company, company_licence_details } from '../Models/InventoryModel/Company';
import { TaxCode, Tax_code_details } from '../Models/InventoryModel/TaxCode';
import { employee, employee_master_list } from '../Models/InventoryModel/employee';
import { SalesOrder, sales_Order_Item_Dtls, sales_Order_Broker_Dtls, sales_Order_Summary, sales_Order_Summary_dyn, sales_Order_Trans_Info, Sales_Order_Party_Dtls, sales_Order_Terms_Con, sales_Order_Shipment_Dtls, sales_Order_Docs } from '../Models/SalesTransaction/SalesOrder';
import { PartyBillPayment } from '../Models/SalesTransaction/party-bill-payment';
import { SalesReport } from '../Models/SalesTransaction/Sales-report';
import { Salesregistration } from '../Models/SalesTransaction/Sales-registration';
import { PurchaseReport } from '../Models/transaction/PurchaseTransaction/Purchase-report';
import { vehicleType } from '../Models/InventoryModel/vehicle-type-master';
import { acc_group } from '../Models/Account-Master-Model/acc_group';
import { acc_subgroup } from '../Models/Account-Master-Model/acc_subgroup';
import { acc_cost_category } from '../Models/Account-Master-Model/acc_cost_category';
import { acc_cost_centre } from '../Models/Account-Master-Model/acc_cost_centre';
import { acc_gen_ledger } from '../Models/Account-Master-Model/acc_gen_ledger';
import { acc_narration } from '../Models/Account-Master-Model/acc_narration';
import { Qc_rules_setup, qc_rules_setup_dtls } from '../Models/OtherMaster/Qc_rules_setup';
import { Acc_acceptance_norms, acc_acceptance_norms_master_dts } from '../Models/OtherMaster/Acc_acceptance_norms';
import { Acc_pay_mode } from '../Models/OtherMaster/Acc_pay_mode';
import { Acc_pay_term, Dyn_Acc_pay_term } from '../Models/OtherMaster/Acc_pay_term';
import { Acc_tax_code_details } from '../Models/OtherMaster/Acc_tax_code_details';
import { Item_category_master } from '../Models/ItemModel/ItemCatagoryMaster';
import { Item_group_master, Item_group_master_pur_acc, Item_group_master_pur_ret_acc, Item_group_master_sales_acc, Item_group_master_sales_ret_acc, Item_group_master_stk_trans_pur, Item_group_master_stk_trans_sale } from '../Models/ItemModel/ItemGrpMaster';
import { Item_type_master, department_info } from '../Models/ItemModel/ItemTypeMaster';
import { ItemMaster, Item_master_inv_data1, Item_master_inv_data2, Item_master_other_info, Item_master_stat_info, Item_master_pack_mat_tag, item_master_alternative_dtls, itmItem_master_qc_details } from '../Models/ItemModel/ItemMaster';
import { Supplier_group } from '../Models/SupplierModel/Supplier_group';
import { Supp_bussiness_partner, Supp_bussiness_partner_brokers, Supp_bussiness_partner_addr, Supp_bussiness_partner_bill_address, Supp_bussiness_partner_addr_dyn, Supp_bussiness_partner_bill_addr_dyn, Supp_bussiness_partner_doc, Supp_bussiness_partner_delv_froms, Supp_bussiness_partner_stat, Supp_bussiness_partner_acc } from '../Models/SupplierModel/Supp_bussiness_partner';
import { Transporter_group } from '../Models/SupplierModel/Transporter_group';
import { cust_bussiness_partner, Cust_bussiness_partner_delv_to, Cust_bussiness_partner_addr, Cust_bussiness_partner_addr_dyn, Cust_bussiness_partner_bill_address, Cust_bussiness_partner_bill_addr_dyn, Cust_bussiness_partner_acc, Cust_bussiness_partner_stat, Cust_bussiness_partner_brokers, Cust_bussiness_partner_doc, cust_bussiness_partner_shipping_addr_dtls } from '../Models/CustomerModel/cust_bussiness_partner';
import { otherPartner } from '../Models/OtherPartnerMaster/OtherPartner';
import { Trans_bussiness_partner, Trans_bussiness_partner_address, Trans_bussiness_partner_accont, Trans_bussiness_partner_statutory, Trans_bussiness_partner_broker, Trans_vehicle_detalis, Trans_bussiness_partner_docs, Trans_bussiness_partner_address_dlts } from '../Models/SupplierModel/Trans_bussiness_partner';
import { channelPartner } from '../Models/ChannelPartner/ChannelPartner';
import { Cust_group } from '../Models/CustomerModel/CustGroup';
import { Broker_group } from '../Models/BrokerModel/BrokerGroup';
import { Otherpartner_group } from '../Models/OtherPartnerMaster/OtherpartnerGroup';
import { district } from '../Models/PlaceModel/district';
import { city } from '../Models/PlaceModel/city';
import { area } from '../Models/PlaceModel/area';
import { Tds_master } from '../Models/OtherMaster/Tds_master';
import { PurposeMaster } from '../Models/InventoryModel/PurposeMaster';
import { screenMaster } from '../Models/InventoryModel/ScreenMaster';
import { reasonMaster } from '../Models/InventoryModel/ReasonMaster';
import { Charges, charges_details } from '../Models/OtherMaster/charges';
import { Designation } from '../Models/InventoryModel/designation';
import { Department1 } from '../Models/InventoryModel/department1';
import { LoadingWeightment } from '../Models/Weightment/loading-weightment';
import { LoadingAdvice, Wm_loading_advice_itm_dtls, Wm_loading_advice_driver_dtls, Wm_loading_advice_trans_info, Wm_loading_advice_bp_dtls, Wm_loading_advice_doc_attch, wm_loading_advice_broker_dtls, wm_loading_advice_Party_Dtls, wm_loading_advice_Shipment_Dtls } from '../Models/Weightment/loading-advice';
import { UnloadAdvice, Wm_unload_advice_item_dtls, wm_unload_advice_app_chgs, Wm_unload_advice_bp_dtls, Wm_unload_advice_broker_dtls, Wm_unload_advice_doc, Wm_unload_advice_driver_dtls, Wm_unload_advice_party_wm, Wm_unload_advice_terms_con, Wm_unload_advice_trans_info } from '../Models/Weightment/unload-advice';
import { UnloadWeightment } from '../Models/Weightment/unload-weightment';
import { DriverMasterPopup } from '../Models/Weightment/driver-master-popup';
import { SalesEnq, sales_Enquiry_Item_Dtls, sales_Enquiry_Party_Dtls, sales_Enquiry_Docs } from '../Models/SalesTransaction/sales-enq';
import { Sales_Quotation, sales_Quotation_Item_Dtls, sales_Quotation_Broker_Dtls, sales_Quotation_Summary, sales_Quotation_Summary_dyn, sales_Quotation_Trans_Info, Sales_Quotation_Party_Dtls, sales_Quotation_Terms_Con, sales_Quotation_Shipment_Dtls, sales_Quotation_Docs } from '../Models/SalesTransaction/Sales_Quotation';
import { channel_cust_master } from '../Models/OtherMaster/ChannelCustomerMaster';
import { DeliveryChallan, delivery_challan_Item_Dtls, delivery_challan_Party_Dtls, delivery_challan_Shipment_Dtls, delivery_challan_weight_dtl, delivery_challan_Trans_Info, delivery_challan_Docs, delivery_challan_Broker_Dtls, delivery_challan_Chgs_dyn } from '../Models/SalesTransaction/DeliveryChallan';
import { GatePass } from '../Models/SalesTransaction/gate-pass';
import { SalesInvoice, sales_Invoice_Item_Dtls, sales_invoice_tax_info, sales_invoice_Broker_Dtls, sales_invoice_bp_dtls, sales_Invoice_Docs, sales_Invoice_Trans_Dtls, sales_Invoice_Shipment_Dtls, sales_Invoice_Payment_Dtls, Item_Groupwise_Hsnsumm, Item_Groupwise_taxsumm } from '../Models/SalesTransaction/SalesInvoice';
import { IndentOrder, IndentorderDetail, stock_Indent_docs, stock_Terminations, stock_Transfer_Terminations_dyn } from '../Models/StockTransfer/indent-order';
import { Stk_Transfer_grn_bu_dtls, Stk_Trans_grn_docs, Stk_Trans_grn_item_details, Stk_Trans_grn_other_information, Stk_Trans_grn_resource_cost, Stk_Trans_grn_trans_info, StockTransferGrn } from '../Models/StockTransfer/stock-transfer-grn';
import { StockTransfer, stock_transfer_Item_Dtls, stock_transfer_Summary, stock_transfer_Summary_dyn, stock_transfer_Trans_Info, StktransReceiptResourceCost, Stock_Transfer_Terminations, Stock_Transfer_Terminations_dyn, Stock_transfer_Doc } from '../Models/StockTransfer/stock-transfer';
import { StockTransferChallan, stk_challan__Item_Dtls, stk_challan__Shipment_Dtls, stk_challan__Trans_Info, stk_challan__Docs, stk_challan_business_unit_Dtls, stk_challan__weight_dtl } from '../Models/StockTransfer/stock-transfer-challan';
import { StockTransferInvoice } from '../Models/StockTransfer/stock-transfer-invoice';
import { TagAdviceWithPo } from '../Models/Weightment/tag-advice-with-po';
import { PurchaseOrder, PurchaseOrderItem, pur_Order_Terms_Con, pur_Order_app_chgs, pur_bussiness_partner_brokers, PO_Trans_Infos, BPDetails, pur_Order_docs, PO_Terminations, pur_Order_Terminations_dyn, pur_Order_Terms_Conditon_dyn } from '../Models/transaction/PurchaseTransaction/PurchaseOrder';
import { Quotation, QuotationDetails, Business_Partner_details, pur_Quotation_docs, pur_Quotation_Broker } from '../Models/transaction/PurchaseTransaction/PurchaseQuotation';
import { InvoiceType } from '../Models/InventoryModel/invoice-type';
import { LaodingPoint } from '../Models/OtherMaster/laoding-point';
import { PurchaseBill, PurchaseBillItem, pur_Bill_MusterRoll_Details, pur_Bill_Tax_Info, pur_Bill_Broker_Details, Pur_Bill_BPDetails, pur_Bill_Account_Info, pur_Bill_docs, pur_Bill_app_chgs } from '../Models/transaction/PurchaseTransaction/purchase-bill';

import { PaymentApproval } from '../Models/transaction/PurchaseTransaction/payment-approval';
import { Employee } from './httpclient.service';
import { PurchaseGRN, ReceiptItemDetails, ReceiptOtherInformation, Pur_good_receipt_broker, RecieptTransInfo, BusinessPartnerdetails, ReceiptResourceCost, pur_good_receipt_docs } from '../Models/transaction/PurchaseTransaction/PurchaseGRN';
import { ReturnApprovalNote, return_approval_Item_Dtls, return_approval_weight_dtl, return_approval_Docs, return_approval_Party_Dtls, return_approval_Shipment_Dtls, return_approval_Trans_Info, return_approval_Broker_Dtls } from '../Models/SalesTransaction/return-approval-note';
import { SalesReturnNote, sales_return_note_Broker_Dtls, sales_return_note_Docs, sales_return_note_Item_Dtls, sales_return_note_Party_Dtls, sales_return_note_Shipment_Dtls, sales_return_note_Trans_Info, sales_return_note_weight_dtl } from '../Models/SalesTransaction/sales-return-note';
import { CreditNote, sales_credit_note_bp_dtls, sales_credit_note_broker_dtls, sales_credit_note_docs, sales_credit_note_item_dtls, sales_credit_note_payment_dtls, sales_credit_note_shipment_dtls, sales_credit_note_tax_info, sales_credit_note_trans_dtls } from '../Models/SalesTransaction/credit-note';
import { DebitNote, Pur_debit_note_item_details, Pur_debit_note_musterroll_details, Pur_debit_note_tax_info, Pur_debit_note_broker_details, Pur_debit_note_bp_details, Pur_debit_note_account_info, Pur_debit_note_docs } from '../Models/transaction/PurchaseTransaction/debit-note';
import {
  PurReturnApprovalNote, pur_return_approval_item_dtls, pur_return_approval_trans_info,
  pur_return_approval_broker_dtls, pur_return_approval_supplier_dtls, pur_return_approval_shipment_dtls,
  pur_return_approval_weight_dtl, pur_return_approval_docs
} from '../Models/transaction/PurchaseTransaction/pur-return-approval-note';
import { PurReturnNote, pur_return_note_Docs, pur_return_note_Item_Dtls, pur_return_note_supplier_Dtls, pur_return_note_Shipment_Dtls, pur_return_note_Trans_Info, pur_return_note_weight_dtl, pur_return_note_Broker_Dtls } from '../Models/transaction/PurchaseTransaction/pur-return-note';
import { StockTransferPurchaseInvoice } from '../Models/StockTransfer/stock-transfer-purchase-invoice';
import { Stk_Transfer_sales_inv_bu_dtls, Stk_Transfer_sales_inv_docs, Stk_Transfer_sales_inv_item_dtls, Stk_Transfer_sales_inv_shipment_dtls, Stk_Transfer_sales_inv_tax_info, Stk_Transfer_sales_inv_trans_dtls, StockTransferSalesInvoice } from '../Models/StockTransfer/stock-transfer-sales-invoice';
import { Shop_floor_master } from '../Models/OtherMaster/Shopfloormodel';
import { Process_master, process_master_doc } from '../Models/ProductionModel/process-master';
import { Bom_Input_Details, Bom_Output_Details, Bom_Resource_Cost, Production_master } from '../Models/ProductionModel/ProductionmasterModel';
import { Production_planning, Production_Planning_shop_floor_dtls, Production_Planning_Special_Dtls } from '../Models/ProductionModel/ProductionPlanningModel';
import { ProductionTransaction, Production_Transaction_Input_Details, Production_Transaction_Output_Details } from '../Models/ProductionModel/production-transaction';
import { periodic_date_details } from '../Models/ProductionModel/periodic-date-popup';
import { Special_date_details } from '../Models/ProductionModel/special-date-popup';

import { ProductionTransactionSpecial, Production_Transaction_Spl_Input_Details, Production_Transaction_Spl_Output_Details } from '../Models/ProductionModel/production-transaction-special';

import { MENU_ITEM1 } from '../Models/NavDynamicChanges';
import { UserRoles } from '../Models/user-roles';
import { RoleMaster } from '../Models/ProfileModel/rolemaster';
import { ItemOpeningStock } from '../Models/ItemModel/item-opening-stock';
import { Settings } from '../Models/settings';
import { PostOffice } from '../Models/PlaceModel/post-office';
import { PartyBillPaymentTo } from '../Models/SalesTransaction/party-bill-payment-to';
import { ZoneMaster } from '../Models/OtherMaster/zone-master';
import { Purchaseregistration } from '../Models/transaction/PurchaseTransaction/Purchaseregistration';
import { Sales2Report } from '../Models/SalesTransaction/sales2';
import { SalesDynamicSorting } from '../Models/SalesTransaction/salesDynamicSorting';
import { PurchaseDynReport } from '../Models/transaction/PurchaseTransaction/PurchaseDynReport';
import { userAccess } from '../Models/System/userAccess';
import { Driver } from '../Models/InventoryModel/Driver';
import { GatepassChecklist } from '../Models/Gatepass/GatepassChecklist';
import { GatepassGetin } from '../Models/Gatepass/GatepassGetin';
import { GatepassGateoutAuthorization } from '../Models/Gatepass/GatepassGateoutAuthorization';
import { GatepassGateout } from '../Models/Gatepass/GatepassGateout';
import { Visitor } from '../Models/InventoryModel/Visitor';
import { PowerCutReport } from '../Models/Report/power-cut-report';
import { Dailystockfinishgood } from '../Models/Report/dailystockfinishgood';
import { Dailypowerreport } from '../Models/Report/dailypowerreport';
import { Dieselusedimport } from '../Models/Report/dieselusedimport';
import { Grnregisterreport } from '../Models/Report/grnregisterreport';
import { Wheatreceiving } from '../Models/Report/Wheatreceiving';
import { Wheatstackcardreport } from '../Models/Report/wheatstackcardreport';
import { GodownMaster } from '../Models/InventoryModel/GodownMaster';
import { HubMaster } from '../Models/InventoryModel/HubMaster';
import { Gateinoutregister } from '../Models/Report/Gateinoutregister';
import { Gatepassregister } from '../Models/Report/Gatepassregister';
import { Dailyproduction } from '../Models/Report/Dailyproduction';
import { Misclabreportfg } from '../Models/Report/Misclabreportfg';
import { Granulationreport } from '../Models/Report/Granulationreport';
import { SeivesMaster } from '../Models/InventoryModel/SeivesMaster';
import { Otherparameterreport } from '../Models/Report/Otherparameterreport';
import { Bingroup } from '../Models/InventoryModel/Bingroup';
import { Millbreakdownreport } from '../Models/Report/Millbreakdownreport';
import { Weigherreding } from '../Models/Report/Weigherreding';
import { Binreport } from '../Models/Report/binreports';
import { ShopFloorAccess } from '../Models/Storemodel/ShopFloorAccess';

import { Requisition } from '../Models/Storemodel/requisition';
import { Issuestock } from '../Models/Storemodel/issuestock';
import { Wheatacceptance } from '../Models/Report/Wheatacceptance';
import { Nongoodstypemaster } from '../Models/JobWork/nongoodstypemaster';
import { Exitclausemaster } from '../Models/JobWork/exitclausemaster';
import { Termasservice } from '../Models/JobWork/termasservice';


//import { Servicemaster } from '../Models/ServiceMaster/servicemaster';
import { nongoodsservice } from '../Models/JobWork/nongoodsservice';
import { Ratechart } from '../Models/SalesTransaction/rate-chart';
import { Servicemaster } from '../Models/ServiceMaster/servicemaster';
import { nongoodssrn } from '../Models/JobWork/nongoodssrn';
import { StateMaster } from '../Models/OtherMaster/StateMaster';
import { salestransport } from '../Models/SalesTransaction/salestransport';

import { Accounts_group_master } from '../Models/AccountsMaster/AccountsGroup';

import { Accounts_type_master } from '../Models/AccountsMaster/AccountsType';
import { Accounts_category_master } from '../Models/AccountsMaster/AccountsCategory';
import { Accounts_ledger_master } from '../Models/AccountsMaster/AccountsLedger';
import { itemStock } from '../Models/ItemModel/itemStock';
import { Dailyweigher } from '../Models/Report/Dailyweigher';
import { Solarpower } from '../Models/Report/Solarpower';
import { solarpowergenerationwithpowercut } from '../Models/Report/solarpowergenerationwithpowercut';
import { ItemServiceMaster } from '../Models/ItemModel/ItemServiceMaster';
import { OtherPartyMaster } from '../Models/OtherMaster/OtherPartyMaster';
import { OtherItemMaster } from '../Models/OtherMaster/OtherItemMaster';
import { eInvoiceGenerate } from '../Models/SalesTransaction/eInvoiceGenerate';
import { StatusDTO } from '../Models/SalesTransaction/StatusDTO';
import { JobWorkItemAllocation } from '../Models/ItemModel/JobWorkItemAllocation';
import { ResponseDTO } from '../Models/SalesTransaction/ResponseDTO';
import { prodsummary } from '../Models/ProductionModel/prodsummary';
import { TaskAllocation } from '../Models/InventoryModel/TaskAllocation';
import { TaskProgress } from '../Models/TaskManager/taskprogress';
import { JW_Grn_ItemTagging } from '../Models/ItemModel/jw_grn_itemtagging';
import { StoreIssueNote } from '../Models/StoreTransaction/StoreIssueNote';
import { StoreCharges } from '../Models/OtherMaster/StoreCharges';
import { StackMaintain } from '../Models/transaction/PurchaseTransaction/StackMaintain';


@Injectable({
  providedIn: 'root'
})

export class Master {
  errorData: {};
  url: String;
  constructor(private httpClient: HttpClient, config: apiconfig) {
    this.url = config.url;
  }

  //Debit Note
  getPurDebitNote(companyId, finYear): Observable<DebitNote[]> {
    return this.httpClient.get<DebitNote[]>(this.url + 'getPurDebitNote/' + companyId + "/" + finYear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createPurDebitNote(DebitNote): Observable<DebitNote> {
    return this.httpClient.post<DebitNote>(this.url + "createPurDebitNote", DebitNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //purchase Return Note
  getPurReturnNote(companyId, finYear): Observable<PurReturnNote[]> {
    return this.httpClient.get<PurReturnNote[]>(this.url + 'getPurReturnNote/' + companyId + "/" + finYear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createPurReturnNote(PurReturnNote): Observable<PurReturnNote> {
    return this.httpClient.post<PurReturnNote>(this.url + "createPurReturnNote", PurReturnNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  getDepartments(): Observable<Department1[]> {
    return this.httpClient.get<Department1[]>(this.url + 'getDepartments').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createDepartment(Department1): Observable<Department1> {
    return this.httpClient.post<Department1>(this.url + "createDepartment", Department1).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //sales enq
  getSalesEnquiries(company_id: any): Observable<SalesEnq[]> {
    return this.httpClient.get<SalesEnq[]>(this.url + 'getSalesEnquiries?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createSalesEnquiry(SalesEnq): Observable<SalesEnq> {
    return this.httpClient.post<SalesEnq>(this.url + "createSalesEnquiry", SalesEnq).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //SALES ORDER
  getSalesOrder(): Observable<SalesOrder[]> {
    return this.httpClient.get<SalesOrder[]>(this.url + 'getSalesOrders').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createEffectiveSalesOrder(SalesOrd): Observable<SalesOrder> {
    return this.httpClient.post<SalesOrder>(this.url + "createEffectiveSalesOrder", SalesOrd).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSalesOrder(SalesOrd): Observable<SalesOrder> {
    return this.httpClient.post<SalesOrder>(this.url + "createSalesOrder", SalesOrd).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //SALES Quotation
  getSalesQuotations(curDate): Observable<Sales_Quotation[]> {
    return this.httpClient.get<Sales_Quotation[]>(this.url + 'getSalesQuotations').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSalesQuotation(SalesQue): Observable<Sales_Quotation> {
    return this.httpClient.post<Sales_Quotation>(this.url + "createSalesQuotation", SalesQue).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //BUSINESS PARTNER GROUP MASTER
  getBusinessGroups(): Observable<BusinessPartnerGroup[]> {
    return this.httpClient.get<BusinessPartnerGroup[]>(this.url + 'getBusinessGroups').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createBusinessGroup(BusinessPartnerGroup): Observable<BusinessPartnerGroup> {
    return this.httpClient.post<BusinessPartnerGroup>(this.url + "createBusinessGroup", BusinessPartnerGroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //BUSINESS PARTNER GROUP MASTER
  getCharges(): Observable<Charges[]> {
    return this.httpClient.get<Charges[]>(this.url + 'getCharges').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createChargemaster(Charges): Observable<Charges> {
    return this.httpClient.post<Charges>(this.url + "createChargemaster", Charges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Bin master
  getBin(): Observable<Bin[]> {
    return this.httpClient.get<Bin[]>(this.url + 'getBin').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createBin(Bin): Observable<Bin> {
    return this.httpClient.post<Bin>(this.url + "createBin", Bin).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Screen master
  getScreenMaster(): Observable<screenMaster[]> {
    return this.httpClient.get<screenMaster[]>(this.url + 'getScreenMaster').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createScreenMaster(screenMaster): Observable<screenMaster> {
    return this.httpClient.post<screenMaster>(this.url + "createScreenMaster", screenMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Reason master
  getReasonMaster(): Observable<reasonMaster[]> {
    return this.httpClient.get<reasonMaster[]>(this.url + 'getReasonMaster').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createReasonMaster(reasonMaster): Observable<reasonMaster> {
    return this.httpClient.post<reasonMaster>(this.url + "createReasonMaster", reasonMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Channel Customer Master  channel_cust_master
  getChannelCust(): Observable<channel_cust_master[]> {
    return this.httpClient.get<channel_cust_master[]>(this.url + 'getChannelCust').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  getChannelCustForSales(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getChannelCustForSales').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getChannelCustFastApi(): Observable<channel_cust_master[]> {
    return this.httpClient.get<channel_cust_master[]>(this.url + 'getChannelCustFastApi').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createChannelCust(channelMaster): Observable<channel_cust_master> {
    return this.httpClient.post<channel_cust_master>(this.url + "createChannelCust", channelMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Purpose Master 
  getPurpose(): Observable<PurposeMaster[]> {
    return this.httpClient.get<PurposeMaster[]>(this.url + 'getPurpose').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createPurpose(PurposeMaster): Observable<PurposeMaster> {
    return this.httpClient.post<PurposeMaster>(this.url + "createPurpose", PurposeMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getInvTypes(): Observable<InvoiceType[]> {
    return this.httpClient.get<InvoiceType[]>(this.url + 'getInvTypes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createInvType(InvoiceType): Observable<InvoiceType> {
    return this.httpClient.post<InvoiceType>(this.url + "createInvType", InvoiceType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //weightment start
  getUnloadWeightments(): Observable<UnloadWeightment[]> {
    return this.httpClient.get<UnloadWeightment[]>(this.url + 'getUnloadWeightments').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createUnloadWeightment(formdata: FormData): Observable<UnloadWeightment> {
    return this.httpClient.post<UnloadWeightment>(this.url + "createUnloadWeightment", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createWeightment(formdata: FormData): Observable<UnloadWeightment> {
    return this.httpClient.post<UnloadWeightment>(this.url + "createWeightment", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getTagAdvWithPO(company_id): Observable<TagAdviceWithPo[]> { return this.httpClient.get<TagAdviceWithPo[]>(this.url + 'getTagAdvWithPO?' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  //updateUserRoles(company_id): Observable<MENU_ITEM[]>{ return this.httpClient.put<MENU_ITEM[]>(this.url+'updateUserRoles?'+company_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}

  public createTagAdvWithPO(TagAdviceWithPo): Observable<TagAdviceWithPo> {
    //alert();
    return this.httpClient.post<TagAdviceWithPo>(this.url + "createTagAdvWithPO", TagAdviceWithPo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteTagadvice(TagAdviceWithPo, id): Observable<TagAdviceWithPo> {
    //console.log("Hi..:");
    return this.httpClient.put<TagAdviceWithPo>(this.url + 'deleteTagadvice/' + id, TagAdviceWithPo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  getUnloadAdvice(): Observable<UnloadAdvice[]> { return this.httpClient.get<UnloadAdvice[]>(this.url + 'getUnloadAdvice').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createUnloadAdvice(formdata: FormData): Observable<UnloadAdvice> {
    //alert();
    return this.httpClient.post<UnloadAdvice>(this.url + "createUnloadAdvice", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getLoadingAdvices(): Observable<LoadingAdvice[]> { return this.httpClient.get<LoadingAdvice[]>(this.url + 'getLoadingAdvices').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createLoadingAdvice(formdata: FormData): Observable<LoadingAdvice> {
    //alert();
    return this.httpClient.post<LoadingAdvice>(this.url + "createLoadingAdvice", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getLoadingWtmnts(): Observable<LoadingWeightment[]> { return this.httpClient.get<LoadingWeightment[]>(this.url + 'getLoadingWtmnts').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createLoadingWtmnt(LoadingWeightment): Observable<LoadingWeightment> {
    //alert();
    return this.httpClient.post<LoadingWeightment>(this.url + "createLoadingWtmnt", LoadingWeightment).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //gate pass
  getGatePasses(): Observable<GatePass[]> { return this.httpClient.get<GatePass[]>(this.url + 'getGatePasses').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createGatePass(GatePass): Observable<GatePass> {
    //alert();
    return this.httpClient.post<GatePass>(this.url + "createGatePass", GatePass).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //end




  //TDS master

  getTdsMaster(): Observable<Tds_master[]> { return this.httpClient.get<Tds_master[]>(this.url + 'getTdsMaster').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createTdsMaster(Tds_master): Observable<Tds_master> {
    //alert();
    return this.httpClient.post<Tds_master>(this.url + "createTdsMaster", Tds_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  // end

  // company master
  getCompanies(): Observable<Company[]> { return this.httpClient.get<Company[]>(this.url + 'getCompanies').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createCompany(Company): Observable<Company> {
    //alert();
    return this.httpClient.post<Company>(this.url + 'createCompany', Company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //getCompanies() : Observable<Company[]>{ return this.httpClient.get<Company[]>(this.url+'getCompanies').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  public createPartyBillPayment(PartyBillPayment): Observable<PartyBillPayment> {
    return this.httpClient.post<PartyBillPayment>(this.url + 'createPartyBillPayment', PartyBillPayment).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createPartyBillPaymentTo(PartyBillPaymentTo): Observable<PartyBillPaymentTo> {
    //alert();
    return this.httpClient.post<PartyBillPaymentTo>(this.url + 'createPartyBillPaymentTo', PartyBillPaymentTo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //end

  //TaxCode master
  getTaxCode(): Observable<TaxCode[]> { return this.httpClient.get<TaxCode[]>(this.url + 'getTaxCode').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createTaxCode(TaxCode): Observable<TaxCode> {
    //alert();
    return this.httpClient.post<TaxCode>(this.url + "createTaxCode", TaxCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }



  //end

  //createCompanyBusiness unit 

  getCompanyBusiness(): Observable<CompanyBusinessPartnerUnit[]> { return this.httpClient.get<CompanyBusinessPartnerUnit[]>(this.url + 'getCompanyBusiness').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createCompanyBusiness(formdata: FormData): Observable<CompanyBusinessPartnerUnit> {
    //alert();
    return this.httpClient.post<CompanyBusinessPartnerUnit>(this.url + "createCompanyBusiness", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //end

  //getCustomers

  getCustomers(): Observable<Customer[]> { return this.httpClient.get<Customer[]>(this.url + 'getCustomers').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createCustomer(Customer): Observable<Customer> {
    //alert();
    return this.httpClient.post<Customer>(this.url + "createCustomer", Customer).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //end

  //createCustomUom

  getCustomUoms(): Observable<CustomUom[]> { return this.httpClient.get<CustomUom[]>(this.url + 'getCustomUoms').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createCustomUom(CustomUom): Observable<CustomUom> {
    //alert();
    return this.httpClient.post<CustomUom>(this.url + "createCustomUom", CustomUom).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //purchase Bill
  getPurchaseBill(): Observable<PurchaseBill[]> { return this.httpClient.get<PurchaseBill[]>(this.url + 'getPurchaseBill').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createPurchaseBill(PurchaseBill): Observable<PurchaseBill> {
    //alert();
    return this.httpClient.post<PurchaseBill>(this.url + "createPurchaseBill", PurchaseBill).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletePurchaseBill(PurchaseBill, id): Observable<any> {
    return this.httpClient.put<PurchaseBill>(this.url + 'deletePurchaseBill/' + id, PurchaseBill).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public getPaymentStatus(PaymentApproval): Observable<PaymentApproval> {
    //alert();
    return this.httpClient.get<PaymentApproval>(this.url + 'getPaymentStatus?' + PaymentApproval).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //end

  //DEPARTMENT MASTER

  //  getDepartments(){ return this.httpClient.get<Department1[]>(this.url+'getDepartments').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  //  public createDepartment(Department1) {
  //     return this.httpClient.post<Department1>(this.url+"createDepartment", Department1).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //  }

  // //retrive dept(for setdata)
  // retriveDepartments(id){ return this.httpClient.get<department1[]>(this.url+'retriveDepartment/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}


  //  //for update..
  //  public updateDepartment(id) {

  //   return this.httpClient.put<department1>(this.url+'updateDepartment/'+id, department1).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  // }


  // //end

  //WARE HOUSE MASTER
  getWarehouses(): Observable<wareHouse[]> { return this.httpClient.get<wareHouse[]>(this.url + 'getWarehouses').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createWarehouse(wareHouse): Observable<wareHouse> {
    //alert();
    return this.httpClient.post<wareHouse>(this.url + "createWarehouse", wareHouse).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //end

  //Driver_masterPopup

  getDrivers(): Observable<DriverMasterPopup[]> { return this.httpClient.get<DriverMasterPopup[]>(this.url + 'getDrivers').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createDriver(DriverMasterPopup): Observable<DriverMasterPopup> {
    //alert();
    return this.httpClient.post<DriverMasterPopup>(this.url + "createDriver", DriverMasterPopup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createDriverpopup(formdata: FormData): Observable<DriverMasterPopup> {
    //alert();
    return this.httpClient.post<DriverMasterPopup>(this.url + "createDriverpopup", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //updateDriverpopup


  public updateDriverpopup(formdata: FormData): Observable<Process_master> {

    return this.httpClient.post<Process_master>(this.url + "updateDriverpopup", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retrieveDriver(id): Observable<Driver> { return this.httpClient.get<Driver>(this.url + 'retrieveDriver/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }



  public deleteDriver(id, Driver): Observable<Driver> {
    return this.httpClient.put<Driver>(this.url + 'deleteDriver/' + id, Driver).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }




  //district
  getDistrict(): Observable<district[]> { return this.httpClient.get<district[]>(this.url + 'getDistrict').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createDistrict(district): Observable<district> {
    //alert();
    return this.httpClient.post<district>(this.url + "createDistrict", district).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //designation
  getDesignations(): Observable<Designation[]> { return this.httpClient.get<Designation[]>(this.url + 'getDesignations').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createDesignation(Designation): Observable<Designation> {
    //alert();
    return this.httpClient.post<Designation>(this.url + "createDesignation", Designation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getCity(): Observable<city[]> { return this.httpClient.get<city[]>(this.url + 'getCity').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createCity(city): Observable<city> {
    return this.httpClient.post<city>(this.url + "createCity", city).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getPostOffice(): Observable<PostOffice[]> { return this.httpClient.get<PostOffice[]>(this.url + 'getPostOffice').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createPostOffice(PostOffice): Observable<PostOffice> {
    return this.httpClient.post<PostOffice>(this.url + "createPostOffice", PostOffice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getSystemSettings(): Observable<Settings[]> { return this.httpClient.get<Settings[]>(this.url + 'getSystemSettings').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createSystemSettings(Settings): Observable<Settings> {
    return this.httpClient.post<Settings>(this.url + "createSystemSettings", Settings).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getAreaMaster(): Observable<area[]> { return this.httpClient.get<area[]>(this.url + 'getAreaMaster').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAreaMaster(area): Observable<area> {
    return this.httpClient.post<area>(this.url + "createAreaMaster", area).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getWeighmentChargeMasters(): Observable<WeighmentCharges[]> { return this.httpClient.get<WeighmentCharges[]>(this.url + 'getWeighmentChargeMasters').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createWeighmentChargeMaster(WeighmentCharges): Observable<WeighmentCharges> {
    return this.httpClient.post<WeighmentCharges>(this.url + "createWeighmentChargeMaster", WeighmentCharges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //employee master
  getEmployees(): Observable<employee_master_list[]> { return this.httpClient.get<employee_master_list[]>(this.url + 'getEmployees').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createEmployee(employee_master_list): Observable<employee_master_list> {
    //alert("2");
    return this.httpClient.post<employee_master_list>(this.url + "createEmployee", employee_master_list).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //end

  //MATERIAL CATAGORY MASTER
  getMatCategories(): Observable<materialCategory[]> { return this.httpClient.get<materialCategory[]>(this.url + 'getMatCategories').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createMatCategory(materialCategory): Observable<materialCategory> {
    //alert();
    return this.httpClient.post<materialCategory>(this.url + "createMatCategory", materialCategory).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //MATERIAL GROUP MASTER
  getMaterialGroups(): Observable<materialGroup[]> { return this.httpClient.get<materialGroup[]>(this.url + 'getMaterialGroups').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createMaterialGroup(materialGroup): Observable<materialGroup> {
    //alert();
    return this.httpClient.post<materialGroup>(this.url + "createMaterialGroup", materialGroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //end

  //MATERIAL MASTER
  getMaterials(): Observable<material[]> { return this.httpClient.get<material[]>(this.url + 'getMaterials').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createMaterial(material): Observable<material> {
    //alert();
    return this.httpClient.post<material>(this.url + "createMaterial", material).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //MATERIAL TYPE MASTER
  getMaterialTypes(): Observable<materialType[]> { return this.httpClient.get<materialType[]>(this.url + 'getMaterialTypes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createMaterialType(materialType): Observable<materialType> {
    //alert();
    return this.httpClient.post<materialType>(this.url + "createMaterialType", materialType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //MISC MASTER

  getMiscs(): Observable<mise[]> { return this.httpClient.get<mise[]>(this.url + 'getMiscs').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createMisc(mise): Observable<mise> {
    return this.httpClient.post<mise>(this.url + "createMisc", mise).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }



  //OTHER PARTNER MASTER
  getOtherPartners(): Observable<otherPartner[]> { return this.httpClient.get<otherPartner[]>(this.url + 'getOtherPartners').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createOtherPartner(otherPartner): Observable<otherPartner> {
    //alert();
    return this.httpClient.post<otherPartner>(this.url + "createOtherPartner", otherPartner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //SUPPLIER MASTER
  getSuppliers(): Observable<Supplier[]> { return this.httpClient.get<Supplier[]>(this.url + 'getSuppliers').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createSupplier(Supplier): Observable<Supplier> {
    //alert();
    return this.httpClient.post<Supplier>(this.url + "createSupplier", Supplier).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //TAX TYPE MASTER
  getTaxTypes(): Observable<taxType[]> { return this.httpClient.get<taxType[]>(this.url + 'getTaxTypes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getTaxTypeSequenceId(): Observable<any> { return this.httpClient.get<any>(this.url + 'getTaxTypeSequenceId').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createTaxType(taxType): Observable<taxType> {
    //alert();
    return this.httpClient.post<taxType>(this.url + "createTaxType", taxType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //TRANSPORTATION CHGS MATRIX MASTER
  getTransChgsMatrixs(): Observable<TransportationChgsMatrix[]> { return this.httpClient.get<TransportationChgsMatrix[]>(this.url + 'getTransChgsMatrixs').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createTransChgsMatrix(TransportationChgsMatrix): Observable<TransportationChgsMatrix> {
    //alert();
    return this.httpClient.post<TransportationChgsMatrix>(this.url + "createTransChgsMatrix", TransportationChgsMatrix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //TRANSPORTER MASTER
  getTransporters(): Observable<transporter[]> { return this.httpClient.get<transporter[]>(this.url + 'getTransporters').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createTransporter(transporter): Observable<transporter> {
    //alert();
    return this.httpClient.post<transporter>(this.url + "createTransporter", transporter).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  ////
  //VEHICLE MASTER
  getVehicles(): Observable<Vehicle[]> { return this.httpClient.get<Vehicle[]>(this.url + 'getVehicles').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createVehicle(Vehicle): Observable<Vehicle> {
    //alert();
    return this.httpClient.post<Vehicle>(this.url + "createVehicle", Vehicle).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createVehiclepopup(Vehicle): Observable<Vehicle> {
    //alert();
    return this.httpClient.post<Vehicle>(this.url + "createVehiclepopup", Vehicle).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //VEHICLE TYPR MASTER
  getVehicleTypes(): Observable<vehicleType[]> { return this.httpClient.get<vehicleType[]>(this.url + 'getVehicleTypes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createVehicleType(vehicleType): Observable<vehicleType> {
    //alert();
    return this.httpClient.post<vehicleType>(this.url + "createVehicleType", vehicleType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  findAllProcess(): Observable<Process_master[]> { return this.httpClient.get<Process_master[]>(this.url + 'findAllProcess').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  findAllProcessList(): Observable<any> { return this.httpClient.get<any>(this.url + 'findAllProcessList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  // public createProcess(Process_master) : Observable<Process_master> {
  //   //alert();
  //   return this.httpClient.post<Process_master>(this.url+"createProcess", Process_master).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  // }
  public createProcess(formdata: FormData): Observable<Process_master> {
    //alert();
    return this.httpClient.post<Process_master>(this.url + "createProcess", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteProcessMaster(Process_master, id): Observable<Process_master> {
    return this.httpClient.put<Process_master>(this.url + 'deleteProcessMaster/' + id, Process_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  // public getdeletefileSystem(filename) : Observable<any> {
  //alert();
  // return this.httpClient.post<any>(this.url+"getdeletefileSystem", filename).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //}

  //public getdeletefileSystem(filename): {   
  //return this.httpClient.put<any>(this.url+'getdeletefileSystem/'+filename).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //}

  //  public getdeletefileSystem(filename) : Observable<any>{
  //   return this.httpClient.delete<any>(this.url+'getdeletefileSystem/'+filename).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //         }

  public getdeletefileSystem(id): Observable<any> {
    return this.httpClient.delete<any>(this.url + 'getdeletefileSystem/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public getdeletefileSalesInvoice(id): Observable<any> {
    return this.httpClient.delete<any>(this.url + 'getdeletefileSalesInvoice/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  
  public getdeletefileDelvChallan(id): Observable<any> {
    return this.httpClient.delete<any>(this.url + 'getdeletefileDelvChallan/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // getdeletefileSystem(filename): Observable<any>
  //{

  //  return this.httpClient.post(this.url+'getdeletefileSystem/'+filename).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}   



  findAllBom(): Observable<Production_master[]> { return this.httpClient.get<Production_master[]>(this.url + 'findAllBom').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  findAllBomList(): Observable<Production_master[]> { return this.httpClient.get<Production_master[]>(this.url + 'findAllBomList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createBom(Production_master): Observable<Production_master> {
    //alert();
    return this.httpClient.post<Production_master>(this.url + "createBom", Production_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteBomMaster(Production_master, id): Observable<any> {
    return this.httpClient.put<Production_master>(this.url + 'deleteBomMaster/' + id, Production_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  findAllProdPlanning(): Observable<Production_planning[]> { return this.httpClient.get<Production_planning[]>(this.url + 'findAllProdPlanning').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createProdPlanning(Production_planning): Observable<any> {

    return this.httpClient.post<any>(this.url + "createProdPlanning", Production_planning).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteProductionPlanning(Production_planning, id): Observable<Production_planning> {
    return this.httpClient.put<Production_planning>(this.url + 'deleteProductionPlanning/' + id, Production_planning).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  findAllProdTransSpl(): Observable<ProductionTransactionSpecial[]> { return this.httpClient.get<ProductionTransactionSpecial[]>(this.url + 'findAllProdTransSpl').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createProdTransSpl(ProductionTransactionSpecial): Observable<ProductionTransactionSpecial> {
    //alert();
    return this.httpClient.post<ProductionTransactionSpecial>(this.url + "createProdTransSpl", ProductionTransactionSpecial).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  findAllProdTrans(): Observable<ProductionTransaction[]> { return this.httpClient.get<ProductionTransaction[]>(this.url + 'findAllProdTrans').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  findAllProdTransfast(cdate): Observable<any> { return this.httpClient.get<any>(this.url + 'findAllProdTransfast/' + cdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createProdTrans(ProductionTransaction): Observable<ProductionTransaction> {
    //alert();
    return this.httpClient.post<ProductionTransaction>(this.url + "createProdTrans", ProductionTransaction).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteProdTransReg(ProductionTransaction, id): Observable<any> {
    return this.httpClient.put<ProductionTransaction>(this.url + 'deleteProdTransReg/' + id, ProductionTransaction).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createProdPlanningRegular(Production_Planning_shop_floor_dtls): Observable<Production_Planning_shop_floor_dtls> {
    return this.httpClient.post<Production_Planning_shop_floor_dtls>(this.url + "createProdPlanningRegular", Production_Planning_shop_floor_dtls).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createProdPlanningSpl(Production_Planning_Special_Dtls): Observable<Production_Planning_Special_Dtls> {
    return this.httpClient.post<Production_Planning_Special_Dtls>(this.url + "createProdPlanningSpl", Production_Planning_Special_Dtls).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_cost_category_master
  getAccCostCategories(): Observable<acc_cost_category[]> { return this.httpClient.get<acc_cost_category[]>(this.url + 'getAccCostCategories').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccCostCategory(acc_cost_category): Observable<acc_cost_category> {
    //alert();
    return this.httpClient.post<acc_cost_category>(this.url + "createAccCostCategory", acc_cost_category).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_cost_centre_master
  getAccCostCentres(): Observable<acc_cost_centre[]> { return this.httpClient.get<acc_cost_centre[]>(this.url + 'getAccCostCentres').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccCostCentre(acc_cost_centre): Observable<acc_cost_centre> {
    //alert();
    return this.httpClient.post<acc_cost_centre>(this.url + "createAccCostCentre", acc_cost_centre).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_acceptance_norms_master
  getAccAcceptanceNorms(): Observable<Acc_acceptance_norms[]> { return this.httpClient.get<Acc_acceptance_norms[]>(this.url + 'getAccAcceptanceNorms').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccAcceptanceNorms(Acc_acceptance_norms): Observable<Acc_acceptance_norms> {
    //alert();
    return this.httpClient.post<Acc_acceptance_norms>(this.url + "createAccAcceptanceNorms", Acc_acceptance_norms).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getLoadingPoints(): Observable<LaodingPoint[]> { return this.httpClient.get<LaodingPoint[]>(this.url + 'getLoadingPoints').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createLoadingPoint(LaodingPoint): Observable<LaodingPoint> {
    //alert();
    return this.httpClient.post<LaodingPoint>(this.url + "createLoadingPoint", LaodingPoint).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getZoneMaster(): Observable<ZoneMaster[]> { return this.httpClient.get<ZoneMaster[]>(this.url + 'getZoneMaster').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createZoneMaster(ZoneMaster): Observable<ZoneMaster> {
    //alert();
    return this.httpClient.post<ZoneMaster>(this.url + "createZoneMaster", ZoneMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_gen_ledger_master
  getAccGenLedgers(): Observable<acc_gen_ledger[]> { return this.httpClient.get<acc_gen_ledger[]>(this.url + 'getAccGenLedgers').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccGenLedger(acc_gen_ledger): Observable<acc_gen_ledger> {
    //alert();
    return this.httpClient.post<acc_gen_ledger>(this.url + "createAccGenLedger", acc_gen_ledger).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_group_master
  getAccountGroups(): Observable<acc_group[]> { return this.httpClient.get<acc_group[]>(this.url + 'getAccountGroups').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccGroup(acc_group): Observable<acc_group> {
    //alert();
    return this.httpClient.post<acc_group>(this.url + "createAccGroup", acc_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_narration_master
  getAccNarrations(): Observable<acc_narration[]> { return this.httpClient.get<acc_narration[]>(this.url + 'getAccNarrations').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccNarration(acc_narration): Observable<acc_narration> {
    //alert();
    return this.httpClient.post<acc_narration>(this.url + "createAccNarration", acc_narration).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_pay_mode_master
  getAccPayModes(): Observable<Acc_pay_mode[]> { return this.httpClient.get<Acc_pay_mode[]>(this.url + 'getAccPayModes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccPayMode(Acc_pay_mode): Observable<Acc_pay_mode> {
    //alert();
    return this.httpClient.post<Acc_pay_mode>(this.url + "createAccPayMode", Acc_pay_mode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //QCR master
  getQc_rules_setup(): Observable<Qc_rules_setup[]> { return this.httpClient.get<Qc_rules_setup[]>(this.url + 'getQc_rules_setup').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createQc_rules_setup(Qc_rules_setup): Observable<Qc_rules_setup> {
    //alert();
    return this.httpClient.post<Qc_rules_setup>(this.url + "createQc_rules_setup", Qc_rules_setup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_pay_term_master
  getAccPayTerms(): Observable<Acc_pay_term[]> { return this.httpClient.get<Acc_pay_term[]>(this.url + 'getAccPayTermsMaster').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccPayTerm(Acc_pay_term): Observable<Acc_pay_term> {
    //alert();
    return this.httpClient.post<Acc_pay_term>(this.url + "createAccPayTerm", Acc_pay_term).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  findAllShopFloor(): Observable<Shop_floor_master[]> { return this.httpClient.get<Shop_floor_master[]>(this.url + 'findAllShopFloor').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createShopFloor(Shop_floor_master): Observable<Shop_floor_master> {
    //alert();
    return this.httpClient.post<Shop_floor_master>(this.url + "createShopFloor", Shop_floor_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_sub_group_master
  getAccAccSubGroups(): Observable<acc_subgroup[]> { return this.httpClient.get<acc_subgroup[]>(this.url + 'getAccAccSubGroups').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccSubGroup(acc_subgroup): Observable<acc_subgroup> {
    //alert();
    return this.httpClient.post<acc_subgroup>(this.url + "createAccSubGroup", acc_subgroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Acc_taxcode_details_master
  getAccTaxCodes(): Observable<Acc_tax_code_details[]> { return this.httpClient.get<Acc_tax_code_details[]>(this.url + 'getAccTaxCodes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createAccTaxCode(Acc_tax_code_details): Observable<Acc_tax_code_details> {
    //alert();
    return this.httpClient.post<Acc_tax_code_details>(this.url + "createAccTaxCode", Acc_tax_code_details).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //item Type master
  getItemtypes(company_id): Observable<Item_type_master[]> { return this.httpClient.get<Item_type_master[]>(this.url + 'getItemTypesMaster/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createItemtype(Item_type_master): Observable<Item_type_master> {
    return this.httpClient.post<Item_type_master>(this.url + "createItemtype", Item_type_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //itemType Del...
  public deleteItemType(Item_type_master, id) {
    return this.httpClient.delete<Item_type_master>(this.url + 'deleteItemType/' + id, Item_type_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //  public deleteItemMaster(id) {   
  //   return this.httpClient.put<ItemMaster>(this.url+'deleteItemMaster/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //  }

  public deleteItemMaster(ItemMaster, id): Observable<any> {
    return this.httpClient.put<ItemMaster>(this.url + 'deleteItemMaster/' + id, ItemMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteEffectiveSalesOrder(SalesOrder, id): Observable<any> {
    return this.httpClient.put<SalesOrder>(this.url + 'deleteEffectiveSalesOrder/' + id, SalesOrder).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteSalesOrder(SalesOrder, id): Observable<any> {
    return this.httpClient.put<SalesOrder>(this.url + 'deleteSalesOrder/' + id, SalesOrder).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteUnloadAdvice(UnloadAdvice, id): Observable<any> {
    return this.httpClient.put<UnloadAdvice>(this.url + 'deleteUnloadAdvice/' + id, UnloadAdvice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteCompany(Company, id): Observable<any> {
    return this.httpClient.put<Company>(this.url + 'deleteCompany/' + id, Company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteAccPayTerm(Acc_pay_term, id): Observable<any> {
    return this.httpClient.put<Acc_pay_term>(this.url + 'deleteAccPayTerm/' + id, Acc_pay_term).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteChannelCustomer(channel_cust_master, id): Observable<any> {
    return this.httpClient.put<channel_cust_master>(this.url + 'deleteChannelCustomer/' + id, channel_cust_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteWeighmentCharges(Acc_pay_term, id): Observable<any> {
    return this.httpClient.put<WeighmentCharges>(this.url + 'deleteWeighmentCharges/' + id, Acc_pay_term).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteLoadingPoint(LaodingPoint, id): Observable<any> {
    return this.httpClient.put<LaodingPoint>(this.url + 'deleteLoadingPoint/' + id, LaodingPoint).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteZoneMaster(ZoneMaster, id): Observable<any> {
    return this.httpClient.put<ZoneMaster>(this.url + 'deleteZoneMaster/' + id, ZoneMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteQcRulesSetup(Qc_rules_setup, id): Observable<any> {
    return this.httpClient.put<Qc_rules_setup>(this.url + 'deleteQcRulesSetup/' + id, Qc_rules_setup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteChargeMaster(Charges, id): Observable<any> {
    return this.httpClient.put<Charges>(this.url + 'deleteChargeMaster/' + id, Charges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteTDSMaster(Tds_master, id): Observable<any> {
    return this.httpClient.put<Tds_master>(this.url + 'deleteTds/' + id, Tds_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteShopFloor(Shop_floor_master, id): Observable<any> {
    return this.httpClient.put<Shop_floor_master>(this.url + 'deleteShopFloor/' + id, Shop_floor_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteCompanyBUMaster(CompanyBusinessPartnerUnit, id): Observable<any> {
    return this.httpClient.put<CompanyBusinessPartnerUnit>(this.url + 'deleteCompanyBUMaster/' + id, CompanyBusinessPartnerUnit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteSalesInvoice(SalesInvoice, id): Observable<any> {
    return this.httpClient.put<SalesInvoice>(this.url + 'deleteSalesInv/' + id, SalesInvoice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteCreditNotes(CreditNote, id): Observable<any> {
    return this.httpClient.put<CreditNote>(this.url + 'deleteCreditNotes/' + id, CreditNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteSalesReturnNotes(SalesReturnNote, id): Observable<any> {
    return this.httpClient.put<SalesReturnNote>(this.url + 'deleteSalesReturnNotes/' + id, SalesReturnNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteSalesReturnApprovalNotes(ReturnApprovalNote, id): Observable<any> {
    return this.httpClient.put<ReturnApprovalNote>(this.url + 'deleteSalesReturnApprovalNotes/' + id, ReturnApprovalNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteLoadingAdvice(LoadingAdvice, id): Observable<any> {
    return this.httpClient.put<LoadingAdvice>(this.url + 'deleteLoadingAdvice/' + id, LoadingAdvice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteItemCategory(Item_category_master, id): Observable<any> {
    return this.httpClient.put<Item_category_master>(this.url + 'deleteItemCategory/' + id, Item_category_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteCity(city, id): Observable<any> {
    return this.httpClient.put<city>(this.url + 'deleteCity/' + id, city).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteSupplierGroup(Supplier_group, id): Observable<any> {
    return this.httpClient.put<Supplier_group>(this.url + 'deleteSupplierGroup/' + id, Supplier_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteCustGrp(Cust_group, id): Observable<any> {
    return this.httpClient.put<Cust_group>(this.url + 'deleteCustGrp/' + id, Cust_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteTransporterGrp(Transporter_group, id): Observable<any> {
    return this.httpClient.put<Transporter_group>(this.url + 'deleteTransporterGrp/' + id, Transporter_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteBrokerGrp(Broker_group, id): Observable<any> {
    return this.httpClient.put<Broker_group>(this.url + 'deleteBrokerGrp/' + id, Broker_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteBrokerMaster(Broker, id): Observable<any> {
    return this.httpClient.put<Broker>(this.url + 'deleteBrokerMaster/' + id, Broker).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteSuppBussinessPartner(Supp_bussiness_partner, id): Observable<any> {
    return this.httpClient.put<Supp_bussiness_partner>(this.url + 'deleteSuppBussinessPartner/' + id, Supp_bussiness_partner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteTransBussinessPartner(Trans_bussiness_partner, id): Observable<any> {
    return this.httpClient.put<Trans_bussiness_partner>(this.url + 'deleteTransBussinessPartner/' + id, Trans_bussiness_partner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteCustomerMaster(cust_bussiness_partner, id): Observable<any> {
    return this.httpClient.put<cust_bussiness_partner>(this.url + 'deleteCustomerMaster/' + id, cust_bussiness_partner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deletePostOffice(PostOffice, id): Observable<any> {
    return this.httpClient.put<PostOffice>(this.url + 'deletePostOffice/' + id, PostOffice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteWarehouse(warehouse, id): Observable<any> {
    return this.httpClient.put<wareHouse>(this.url + 'deleteWarehouse/' + id, warehouse).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteBin(Bin, id): Observable<any> {
    return this.httpClient.put<Bin>(this.url + 'deleteBin/' + id, Bin).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteArea(area, id): Observable<any> {
    return this.httpClient.put<area>(this.url + 'deleteAreaMaster/' + id, area).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteReason(reasonMaster, id): Observable<any> {
    return this.httpClient.put<reasonMaster>(this.url + 'deleteReason/' + id, reasonMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteScreen(Screen, id): Observable<any> {
    return this.httpClient.put<Screen>(this.url + 'deleteScreen/' + id, Screen).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deletePurpose(PurposeMaster, id): Observable<any> {
    return this.httpClient.put<PurposeMaster>(this.url + 'deletePurpose/' + id, PurposeMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteInvoiceType(InvoiceType, id): Observable<any> {
    return this.httpClient.put<InvoiceType>(this.url + 'deleteInvoiceType/' + id, InvoiceType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteDepartment(Department1, id): Observable<Department1> {
    return this.httpClient.put<Department1>(this.url + 'deleteDepartment/' + id, Department1).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteDistrict(district, id): Observable<any> {
    return this.httpClient.put<district>(this.url + 'deleteDistrict/' + id, district).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteItemGroup(Item_group_master, id): Observable<any> {
    return this.httpClient.put<Item_group_master>(this.url + 'deleteItemGroup/' + id, Item_group_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteMisc(mise, id): Observable<mise> {
    return this.httpClient.put<mise>(this.url + 'deleteMisc/' + id, mise).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteVehicleType(vehicleType, id): Observable<vehicleType> {
    return this.httpClient.put<vehicleType>(this.url + 'deleteVehicleType/' + id, vehicleType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteVehicleMaster(vehicle, id): Observable<Vehicle> {
    return this.httpClient.put<Vehicle>(this.url + 'deleteVehicleMaster/' + id, vehicle).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteTransChgsMatrix(TransportationChgsMatrix, id): Observable<TransportationChgsMatrix> {
    return this.httpClient.put<TransportationChgsMatrix>(this.url + 'deleteTransChgsMatrix/' + id, TransportationChgsMatrix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteDesignation(Designation, id): Observable<Designation> {
    return this.httpClient.put<Designation>(this.url + 'deleteDesignation/' + id, Designation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteTaxCode(TaxCode, id): Observable<TaxCode> {
    return this.httpClient.put<TaxCode>(this.url + 'deleteTaxCode/' + id, TaxCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteCustomUom(CustomUom, id): Observable<CustomUom> {
    return this.httpClient.put<CustomUom>(this.url + 'deleteCustomUom/' + id, CustomUom).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deleteTaxType(taxType, id): Observable<taxType> {
    return this.httpClient.put<taxType>(this.url + 'deleteTaxType/' + id, taxType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //Mozahar

  getSalesInvoice(companyId): Observable<SalesInvoice[]> {
    return this.httpClient.get<SalesInvoice[]>(this.url + 'getSalesInvoice?' + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //tuhin changes


  getSalesRegisterList(): Observable<SalesReport[]> {
    return this.httpClient.get<SalesReport[]>(this.url + 'getSalesRegisterList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getSalesRegDynamicList(): Observable<Sales2Report[]> {
    return this.httpClient.get<Sales2Report[]>(this.url + 'getSalesRegDynamicList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getPurchaseRegDynamicList(): Observable<PurchaseDynReport[]> {
    return this.httpClient.get<PurchaseDynReport[]>(this.url + 'getPurchaseRegDynamicList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getPurchaseRegisterList(): Observable<Purchaseregistration[]> {
    return this.httpClient.get<Purchaseregistration[]>(this.url + 'getPurchaseRegisterList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //getSalesSortDynList() : Observable<SalesDynamicSorting[]>
  //{
  // return this.httpClient.get<SalesDynamicSorting[]>(this.url+'getSalesSortDynList').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //}
  //Sales2Report

  getSalesSortDynList(): Observable<Sales2Report[]> {
    return this.httpClient.get<Sales2Report[]>(this.url + 'getSalesSortDynList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //updateSalesRegSort
  public updateSalesRegSort(Sales2Report, id): Observable<any> {
    return this.httpClient.put<Sales2Report>(this.url + 'updateSalesRegSort/' + id, Sales2Report).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSalesRegSorting(Sales2Report, id): Observable<Sales2Report> {
    return this.httpClient.put<Sales2Report>(this.url + 'updateSalesRegSorting/' + id, Sales2Report).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // public deleteSalesRegDynamic(Sales2Report,id) : Observable<any>{
  //   console.log("id: "+id);
  //   return this.httpClient.put<Sales2Report>(this.url+'deleteSalesRegDynamic/'+id,Sales2Report).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //          }
  public deleteSalesRegDynamic(id): Observable<any> {
    console.log("id: " + id);
    return this.httpClient.get<any>(this.url + 'deleteSalesRegDynamic/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public deletePurchaseRegDynamic(PurchaseDynReport, id): Observable<any> {
    return this.httpClient.put<PurchaseDynReport>(this.url + 'deletePurchaseRegDynamic/' + id, PurchaseDynReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //tuhin ends



  getStkTranSaleInvs(companyId_fin_year): Observable<StockTransferSalesInvoice[]> {
    return this.httpClient.get<StockTransferSalesInvoice[]>(this.url + 'getStkTranSaleInvs?' + companyId_fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createStkTranSaleInv(StockTransferSalesInvoice): Observable<StockTransferSalesInvoice> {
    return this.httpClient.post<StockTransferSalesInvoice>(this.url + "createStkTranSaleInv", StockTransferSalesInvoice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getStkTranGrns(companyId_FinencialYear): Observable<StockTransferGrn[]> { return this.httpClient.get<StockTransferGrn[]>(this.url + 'getStkTranGrns?' + companyId_FinencialYear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  
  public createStkTranGrn(StockTransferGrn): Observable<StockTransferGrn> {
    //alert();
    return this.httpClient.post<StockTransferGrn>(this.url + "createStkTranGrn", StockTransferGrn).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getSalesCreditNote(companyId): Observable<CreditNote[]> {
    return this.httpClient.get<CreditNote[]>(this.url + 'getSalesCreditNote?' + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getSalesCreditNoteFast(companyId): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesCreditNoteFast/' + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public createSalesCreditNote(CreditNote): Observable<CreditNote> {
    return this.httpClient.post<CreditNote>(this.url + "createSalesCreditNote", CreditNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public creditNoteEinvoiceGeneration(StatusDTO, id, username): Observable<StatusDTO> {
    return this.httpClient.put<StatusDTO>(this.url + 'creditNoteEinvoiceGeneration/' + id + '/' + username, StatusDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public creditNoteEinvoicecancel(ResponseDTO, id, username): Observable<ResponseDTO> {
    return this.httpClient.put<ResponseDTO>(this.url + 'creditNoteEinvoicecancel/' + id + '/' + username, ResponseDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public creditNoteEwaybillcreate(StatusDTO, id, username): Observable<StatusDTO> {
    return this.httpClient.put<StatusDTO>(this.url + 'creditNoteEwaybillcreate/' + id + '/' + username, StatusDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public creditNoteEwaybillcancel(ResponseDTO, id, username): Observable<ResponseDTO> {
    return this.httpClient.put<ResponseDTO>(this.url + 'creditNoteEwaybillcancel/' + id + '/' + username, ResponseDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public creditNoteEwaybillWOInvoiceCreate(StatusDTO, id, username): Observable<StatusDTO> {
    return this.httpClient.put<StatusDTO>(this.url + 'creditNoteEwaybillWOInvoiceCreate/' + id + '/' + username, StatusDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getStockIndentOrder(): Observable<IndentOrder[]> { return this.httpClient.get<IndentOrder[]>(this.url + 'getStockIndentOrder').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createStockIndentOrder(IndentOrder): Observable<IndentOrder> {
    return this.httpClient.post<IndentOrder>(this.url + "createStockIndentOrder", IndentOrder).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getStkTranPurInvs(companyId_fin_year: any): Observable<StockTransferPurchaseInvoice[]> { return this.httpClient.get<StockTransferPurchaseInvoice[]>(this.url + 'getStkTranPurInvs?' + companyId_fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createStkTranPurInv(StockTransferPurchaseInvoice): Observable<StockTransferPurchaseInvoice> {
    return this.httpClient.post<StockTransferPurchaseInvoice>(this.url + "createStkTranPurInv", StockTransferPurchaseInvoice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getStockTransfer(): Observable<StockTransfer[]> { return this.httpClient.get<StockTransfer[]>(this.url + 'getStockTransfer').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createStockTransfer(StockTransfer): Observable<StockTransfer> {
    return this.httpClient.post<StockTransfer>(this.url + "createStockTransfer", StockTransfer).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  getStockTransferChallans(): Observable<StockTransferChallan[]> { return this.httpClient.get<StockTransferChallan[]>(this.url + 'getStockTransferChallans').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createStockTransferChallan(StockTransferChallan): Observable<StockTransferChallan> {
    return this.httpClient.post<StockTransferChallan>(this.url + "createStockTransferChallan", StockTransferChallan).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteStocktransferOrder(StockTransfer, id): Observable<any> {
    return this.httpClient.put<StockTransfer>(this.url + 'deleteStocktransferOrder/' + id, StockTransfer).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getStockTransferInvoices(): Observable<StockTransferInvoice[]> { return this.httpClient.get<StockTransferInvoice[]>(this.url + 'getStockTransferInvoices').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createStockTransferInvoice(StockTransferInvoice): Observable<StockTransferInvoice> {
    return this.httpClient.post<StockTransferInvoice>(this.url + "createStockTransferInvoice", StockTransferInvoice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteStocktransferChallan(StockTransferChallan, id): Observable<any> {
    return this.httpClient.put<StockTransferChallan>(this.url + 'deleteStocktransferChallan/' + id, StockTransferChallan).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //end..

  public deleteStocktransferGRN(StockTransferGrn, id): Observable<any> {
    return this.httpClient.put<StockTransferGrn>(this.url + 'deleteStocktransferGRN/' + id, StockTransferGrn).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteStocktransferPurInv(StockTransferPurchaseInvoice, id): Observable<any> {
    return this.httpClient.put<StockTransferPurchaseInvoice>(this.url + 'deleteStocktransferPurInv/' + id, StockTransferPurchaseInvoice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getSalesReturnNote(company, currentdate): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesReturnNote/' + company + "/" + currentdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  // public createDeliveryChallan(SalesReturnNote): Observable<SalesReturnNote> {
  //   return this.httpClient.post<SalesReturnNote>(this.url+"createDeliveryChallan", SalesReturnNote).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  public createDeliveryChallan(formdata: FormData): Observable<DeliveryChallan> {
    return this.httpClient.post<DeliveryChallan>(this.url + "createDeliveryChallan", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  // public createDeliveryChallan(DeliveryChallan): Observable<DeliveryChallan> {
  //   return this.httpClient.post<DeliveryChallan>(this.url + "createDeliveryChallan", DeliveryChallan).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  // }

  public deleteDeliveryChallan(DeliveryChallan, id): Observable<any> {
    return this.httpClient.put<DeliveryChallan>(this.url + 'deleteDeliveryChallan/' + id, DeliveryChallan).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getDeliveryChallans(): Observable<DeliveryChallan[]> { return this.httpClient.get<DeliveryChallan[]>(this.url + 'getDeliveryChallans').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  // public createSalesReturnNote(DeliveryChallan): Observable<DeliveryChallan> {
  //   return this.httpClient.post<DeliveryChallan>(this.url+"createSalesReturnNote", DeliveryChallan).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  public createSalesReturnNote(SalesReturnNote): Observable<SalesReturnNote> {
    return this.httpClient.post<SalesReturnNote>(this.url + "createSalesReturnNote", SalesReturnNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getReturnApprovalNote(companyId_FinencialYear): Observable<ReturnApprovalNote[]> { return this.httpClient.get<ReturnApprovalNote[]>(this.url + 'getReturnApprovalNote?' + companyId_FinencialYear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createReturnApprovalNote(ReturnApprovalNote): Observable<ReturnApprovalNote> {
    return this.httpClient.post<ReturnApprovalNote>(this.url + "createReturnApprovalNote", ReturnApprovalNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //getPurReturnAppNote(){ return this.httpClient.get<PurReturnApprovalNote[]>(this.url+'getPurReturnAppNote').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  getPurReturnAppNote(companyId_FinencialYear): Observable<PurReturnApprovalNote[]> { return this.httpClient.get<PurReturnApprovalNote[]>(this.url + 'getPurReturnAppNote?' + companyId_FinencialYear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createPurReturnAppNote(PurReturnApprovalNote): Observable<PurReturnApprovalNote> {
    return this.httpClient.post<PurReturnApprovalNote>(this.url + "createPurReturnAppNote", PurReturnApprovalNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  //item category master
  getItemCategories(company_id): Observable<Item_category_master[]> { return this.httpClient.get<Item_category_master[]>(this.url + 'getItemCategories/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createItemCategory(Item_category_master): Observable<Item_category_master> {
    //alert();
    return this.httpClient.post<Item_category_master>(this.url + "createItemCategory", Item_category_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveItemCategoryes(id): Observable<Item_category_master[]> { return this.httpClient.get<Item_category_master[]>(this.url + 'retriveItemCategory/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveSystemSettings(id): Observable<Settings[]> { return this.httpClient.get<Settings[]>(this.url + 'retriveSystemSettings/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  //item group master
  getItemGroups(company_id): Observable<Item_group_master[]> { return this.httpClient.get<Item_group_master[]>(this.url + 'getItemGroups/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createItemGroup(Item_group_master): Observable<Item_group_master> {
    //alert();
    return this.httpClient.post<Item_group_master>(this.url + "createItemGroup", Item_group_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getItemOpeningStk(): Observable<ItemOpeningStock[]> { return this.httpClient.get<ItemOpeningStock[]>(this.url + 'getItemOpeningStk').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createItemOpeningStk(ItemOpeningStock): Observable<ItemOpeningStock> {
    //alert();
    return this.httpClient.post<ItemOpeningStock>(this.url + "createItemOpeningStk", ItemOpeningStock).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //retrive ItemGroups(for setdata)
  retriveItemGroups(id): Observable<Item_group_master[]> { return this.httpClient.get<Item_group_master[]>(this.url + 'retriveItemGroup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  findAllItems(): Observable<ItemMaster[]> { return this.httpClient.get<ItemMaster[]>(this.url + 'findAllItems').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //item master 
  getItems(company_id): Observable<any> { return this.httpClient.get<any>(this.url + 'getItems/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createItem(ItemMaster): Observable<ItemMaster> {
    //alert();
    return this.httpClient.post<ItemMaster>(this.url + "createItem", ItemMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public editItem(ItemMaster, id): Observable<ItemMaster> {
    return this.httpClient.put<ItemMaster>(this.url + 'updateItemMaster/' + id, ItemMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getAccountPostingFor(): Observable<any> { return this.httpClient.get<any>(this.url + 'getAccountPostingFor').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public updatePurBill(PurchaseBill, id): Observable<PurchaseBill> {
    return this.httpClient.put<PurchaseBill>(this.url + 'updatePurBill/' + id, PurchaseBill).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSystemSettings(Settings, id): Observable<Settings> {
    return this.httpClient.put<Settings>(this.url + 'updateSystemSettings/' + id, Settings).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateDebitNote(DebitNote, id): Observable<DebitNote> {
    return this.httpClient.put<DebitNote>(this.url + 'updatePurDebitNote/' + id, DebitNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public updateBin(Bin, id): Observable<Bin> {
    return this.httpClient.put<Bin>(this.url + 'updateBin/' + id, Bin).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateVehicle(Vehicle): Observable<Vehicle> {
    return this.httpClient.put<Vehicle>(this.url + 'updateVehicle', Vehicle).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateItemCategory(Item_category_master, id): Observable<Item_category_master> {
    return this.httpClient.put<Item_category_master>(this.url + 'updateItemCategory/' + id, Item_category_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateItemGroup(Item_group_master, id): Observable<Item_group_master> {
    return this.httpClient.put<Item_group_master>(this.url + 'updateItemGroup/' + id, Item_group_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateCustomerGrp(Cust_group, id): Observable<Cust_group> {
    return this.httpClient.put<Cust_group>(this.url + 'updateCustomerGrp/' + id, Cust_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSupplierGroup(Supplier_group, id): Observable<Supplier_group> {
    return this.httpClient.put<Supplier_group>(this.url + 'updateSupplierGroup/' + id, Supplier_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTransGrp(Transporter_group, id): Observable<Transporter_group> {
    return this.httpClient.put<Transporter_group>(this.url + 'updateTransGrp/' + id, Transporter_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateBrokerGrp(Broker_group, id): Observable<Broker_group> {
    return this.httpClient.put<Broker_group>(this.url + 'updateBrokerGrp/' + id, Broker_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateCity(city, id): Observable<city> {
    return this.httpClient.put<city>(this.url + 'updateCity/' + id, city).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatePostOffice(PostOffice, id): Observable<PostOffice> {
    return this.httpClient.put<PostOffice>(this.url + 'updatePostOffice/' + id, PostOffice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateAreaMaster(area, id): Observable<area> {
    return this.httpClient.put<area>(this.url + 'updateAreaMaster/' + id, area).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //changes by tuhin starts

  public createSalesRegMaster(SalesReport): Observable<SalesReport> {
    //console.log("tuhin save :: "+SalesReport);
    return this.httpClient.post<SalesReport>(this.url + 'createSalesRegMaster', SalesReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSalesInvDynamicSorting(SalesDynamicSorting, id): Observable<SalesDynamicSorting> {
    return this.httpClient.post<SalesDynamicSorting>(this.url + 'createSalesInvDynamicSorting' + id, SalesDynamicSorting).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSalesRegMaster(SalesReport, id): Observable<SalesReport> {
    console.log
    return this.httpClient.put<SalesReport>(this.url + 'updateSalesRegMaster/' + id, SalesReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public createSalesRegDynamic(Sales2Report): Observable<Sales2Report> {
    // console.log("tuhin save :: "+Sales2Report);
    return this.httpClient.post<Sales2Report>(this.url + 'createSalesRegDynamic', Sales2Report).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createUserRoleAccess(userAccess): Observable<userAccess> {
    // console.log("tuhin save :: "+createUserRoleAccess);
    return this.httpClient.post<userAccess>(this.url + 'createUserRoleAccess', userAccess).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createPurchaseRegDynamic(PurchaseDynReport): Observable<PurchaseDynReport> {
    return this.httpClient.post<PurchaseDynReport>(this.url + 'createPurchaseRegDynamic', PurchaseDynReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSalesRegNameMaster(Salesregistration): Observable<Salesregistration> {
    // console.log("tuhin save :: "+SalesReport);
    return this.httpClient.post<Salesregistration>(this.url + 'createSalesRegNameMaster', Salesregistration).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }




  public createPurchaseRegMaster(PurchaseReport): Observable<PurchaseReport> {
    // console.log("tuhin save :: "+SalesReport);
    return this.httpClient.post<PurchaseReport>(this.url + 'createPurchaseRegMaster', PurchaseReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //changes by tuhin ends


  public updateSalesEnquiries(SalesEnq, id): Observable<SalesEnq> {
    return this.httpClient.put<SalesEnq>(this.url + 'updateSalesEnquiries/' + id, SalesEnq).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSuppBussinessPartner(Supp_bussiness_partner, id): Observable<Supp_bussiness_partner> {
    return this.httpClient.put<Supp_bussiness_partner>(this.url + 'updateSuppBussinessPartner/' + id, Supp_bussiness_partner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //updateBrokerMaster
  public updateBrokerMaster(Broker, id): Observable<Broker> {
    return this.httpClient.put<Broker>(this.url + 'updateBrokerMaster/' + id, Broker).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSalesQuotation(Sales_Quotation, id): Observable<Sales_Quotation> {
    return this.httpClient.put<Sales_Quotation>(this.url + 'updateSalesQuotation/' + id, Sales_Quotation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSalesInvoice(formdata: FormData): Observable<SalesInvoice> {
    return this.httpClient.post<SalesInvoice>(this.url + "createSalesInvoice", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateSalesInv(formdata: FormData): Observable<SalesInvoice> {
    return this.httpClient.post<SalesInvoice>(this.url + "updateSalesInv", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  // public updateSalesInv(SalesInvoice,id): Observable<SalesInvoice> 
  // {
  //     return this.httpClient.put<SalesInvoice>(this.url+'updateSalesInv/'+id, SalesInvoice).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  // }

  //  public createEinvoiceGeneration(id,einvjson:Object) : Observable<any>  {
  //    return this.httpClient.get<any>(this.url+"createEinvoiceGeneration/"+id+"/"+encodeURIComponent(JSON.stringify(einvjson))).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}

  public createEinvoiceGeneration(StatusDTO, id, username): Observable<StatusDTO> {
    return this.httpClient.put<StatusDTO>(this.url + 'createEinvoiceGeneration/' + id + '/' + username, StatusDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createEinvoicecancel(ResponseDTO, id, username): Observable<ResponseDTO> {
    return this.httpClient.put<ResponseDTO>(this.url + 'createEinvoicecancel/' + id + '/' + username, ResponseDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public ewaybillcreate(StatusDTO, id, username): Observable<StatusDTO> {
    return this.httpClient.put<StatusDTO>(this.url + 'ewaybillcreate/' + id + '/' + username, StatusDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public ewaybillcancel(ResponseDTO, id, username): Observable<ResponseDTO> {
    return this.httpClient.put<ResponseDTO>(this.url + 'ewaybillcancel/' + id + '/' + username, ResponseDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateStkTransGrn(StockTransferGrn, id): Observable<StockTransferGrn> {
    return this.httpClient.put<StockTransferGrn>(this.url + 'updateStkTransGrn/' + id, StockTransferGrn).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createEwaybillWOInvoiceCreate(StatusDTO, id, username): Observable<StatusDTO> {
    return this.httpClient.put<StatusDTO>(this.url + 'createEwaybillWOInvoiceCreate/' + id + '/' + username, StatusDTO).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public updateUserRoles(UserRoles): Observable<UserRoles> {
    //alert();
    return this.httpClient.post<UserRoles>(this.url + "updateUserRoles", UserRoles).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public updateCreditNote(CreditNote, id): Observable<CreditNote> {
    return this.httpClient.put<CreditNote>(this.url + 'updateSalesCreditNote/' + id, CreditNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateReturnApprovalNote(ReturnApprovalNote, id): Observable<ReturnApprovalNote> {
    return this.httpClient.put<ReturnApprovalNote>(this.url + 'updateReturnApprovalNote/' + id, ReturnApprovalNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatePurReturnAppNote(PurReturnApprovalNote, id): Observable<PurReturnApprovalNote> {
    return this.httpClient.put<PurReturnApprovalNote>(this.url + 'updatePurReturnAppNote/' + id, PurReturnApprovalNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatePurReturn(PurReturnNote, id): Observable<PurReturnNote> {
    return this.httpClient.put<PurReturnNote>(this.url + 'updatePurReturn/' + id, PurReturnNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateEffectiveSalesOrder(SalesOrder, id): Observable<SalesOrder> {
    return this.httpClient.put<SalesOrder>(this.url + 'updateEffectiveSalesOrder/' + id, SalesOrder).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateEffectiveSalesOrderWithLoading(SalesOrder, id): Observable<SalesOrder> {
    return this.httpClient.put<SalesOrder>(this.url + 'updateEffectiveSalesOrderWithLoading/' + id, SalesOrder).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSalesOrder(SalesOrder, id): Observable<SalesOrder> {
    return this.httpClient.put<SalesOrder>(this.url + 'updateSalesOrder/' + id, SalesOrder).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSalesOrderWithLoading(SalesOrder, id): Observable<SalesOrder> {
    return this.httpClient.put<SalesOrder>(this.url + 'updateSalesOrderWithLoading/' + id, SalesOrder).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateStockTransOrders(StockTransfer, id): Observable<StockTransfer> {
    return this.httpClient.put<StockTransfer>(this.url + 'updateStockTransOrders/' + id, StockTransfer).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateStkTransChallan(StockTransferChallan, id): Observable<StockTransferChallan> {
    return this.httpClient.put<StockTransferChallan>(this.url + 'updateStkTransChallan/' + id, StockTransferChallan).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateCustomerMaster(cust_bussiness_partner, id): Observable<cust_bussiness_partner> {
    return this.httpClient.put<cust_bussiness_partner>(this.url + 'updateCustomerMaster/' + id, cust_bussiness_partner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTransBussinessPartner(formdata: FormData): Observable<Trans_bussiness_partner> {
    return this.httpClient.post<Trans_bussiness_partner>(this.url + 'updateTransBussinessPartner', formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateDlvChallan(formdata: FormData): Observable<DeliveryChallan> {
    return this.httpClient.post<DeliveryChallan>(this.url + "updateDlvChallan", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateDlvChallantransport(DeliveryChallan, id): Observable<DeliveryChallan> {
    return this.httpClient.put<DeliveryChallan>(this.url + 'updateDlvChallantransport/' + id, DeliveryChallan).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSalesReturnNote(SalesReturnNote, id): Observable<SalesReturnNote> {
    return this.httpClient.put<SalesReturnNote>(this.url + 'updateSalesReturnNote/' + id, SalesReturnNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateLoadingAdvice(LoadingAdvice, id): Observable<LoadingAdvice> {
    return this.httpClient.put<LoadingAdvice>(this.url + 'updateLoadingAdvice/' + id, LoadingAdvice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  // public updateUnloadAdvice(formdata:FormData): Observable<UnloadAdvice> {
  //   return this.httpClient.put<UnloadAdvice>(this.url+"updateUnloadAdvice", formdata).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //         }
  public updateUnloadAdvice(UnloadAdvice, id): Observable<any> {
    return this.httpClient.put<any>(this.url + 'updateUnloadAdvice/' + id, UnloadAdvice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateWarehouse(wareHouse, id): Observable<wareHouse> {
    return this.httpClient.put<wareHouse>(this.url + 'updateWarehouse/' + id, wareHouse).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateEmployee(employee_master_list, id): Observable<employee_master_list> {
    return this.httpClient.put<employee_master_list>(this.url + 'updateEmployee/' + id, employee_master_list).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateDepartment(Department1, id): Observable<Department1> {
    return this.httpClient.put<Department1>(this.url + 'updateDepartment/' + id, Department1).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateCustomUom(CustomUom, id): Observable<CustomUom> {
    return this.httpClient.put<CustomUom>(this.url + 'updateCustomUom/' + id, CustomUom).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateMisc(mise, id): Observable<mise> {
    return this.httpClient.put<mise>(this.url + 'updateMisc/' + id, mise).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTaxType(taxType, id): Observable<taxType> {
    return this.httpClient.put<taxType>(this.url + 'updateTaxType/' + id, taxType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTaxCode(TaxCode, id): Observable<TaxCode> {
    return this.httpClient.put<TaxCode>(this.url + 'updateTaxCode/' + id, TaxCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateVehicleType(vehicleType, id): Observable<vehicleType> {
    return this.httpClient.put<vehicleType>(this.url + 'updateVehicleType/' + id, vehicleType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateInvType(InvoiceType, id): Observable<InvoiceType> {
    return this.httpClient.put<InvoiceType>(this.url + 'updateInvType/' + id, InvoiceType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatePurpose(PurposeMaster, id): Observable<PurposeMaster> {
    return this.httpClient.put<PurposeMaster>(this.url + 'updatePurpose/' + id, PurposeMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateDistrict(district, id): Observable<district> {
    return this.httpClient.put<district>(this.url + 'updateDistrict/' + id, district).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateScreen(screenMaster, id): Observable<screenMaster> {
    return this.httpClient.put<screenMaster>(this.url + 'updateScreen/' + id, screenMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateAccAcceptanceNorms(Acc_acceptance_norms, id): Observable<Acc_acceptance_norms> {
    return this.httpClient.put<Acc_acceptance_norms>(this.url + 'updateAccAcceptanceNorms/' + id, Acc_acceptance_norms).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateChannelCust(cust_bussiness_partner, id): Observable<cust_bussiness_partner> {
    return this.httpClient.put<cust_bussiness_partner>(this.url + 'updateChannelCust/' + id, cust_bussiness_partner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateChargemaster(Charges, id): Observable<Charges> {
    return this.httpClient.put<Charges>(this.url + 'updateChargemaster/' + id, Charges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateLoadingPoint(LaodingPoint, id): Observable<LaodingPoint> {
    return this.httpClient.put<LaodingPoint>(this.url + 'updateLoadingPoint/' + id, LaodingPoint).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateZoneMaster(ZoneMaster, id): Observable<ZoneMaster> {
    return this.httpClient.put<ZoneMaster>(this.url + 'updateZoneMaster/' + id, ZoneMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateReason(reasonMaster, id): Observable<reasonMaster> {
    return this.httpClient.put<reasonMaster>(this.url + 'updateReason/' + id, reasonMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateAccPayMode(Acc_pay_mode, id): Observable<Acc_pay_mode> {
    return this.httpClient.put<Acc_pay_mode>(this.url + 'updateAccPayMode/' + id, Acc_pay_mode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateAccPayTerms(Acc_pay_term, id): Observable<Acc_pay_term> {
    return this.httpClient.put<Acc_pay_term>(this.url + 'updateAccPayTerms/' + id, Acc_pay_term).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateShopFloor(Shop_floor_master, id): Observable<Shop_floor_master> {
    return this.httpClient.put<Shop_floor_master>(this.url + 'updateShopFloor/' + id, Shop_floor_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //changed 01-04-2022      
  //   public updateProcess(Process_master,id) : Observable<Process_master>{
  //      return this.httpClient.put<Process_master>(this.url+'updateProcess/'+id, Process_master).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //  } 



  // public updateProcess(Process_master) : Observable<Process_master> {
  //alert();
  //  return this.httpClient.post<Process_master>(this.url+updateProcess', Process_master).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  // }

  // public updateProcess(Process_master): Observable<Process_master> {
  //   return this.httpClient.post<Process_master>(this.url+'updateProcess', Process_master).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //       } 
  public updateProcess(formdata: FormData): Observable<Process_master> {
    //alert();
    return this.httpClient.post<Process_master>(this.url + "updateProcess", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //public updateCompanyBusiness(CompanyBusinessPartnerUnit): Observable<CompanyBusinessPartnerUnit> {
  //  return this.httpClient.put<CompanyBusinessPartnerUnit>(this.url+'updateCompanyBusiness', CompanyBusinessPartnerUnit).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //     } 

  public updateBom(Production_master, id): Observable<Production_master> {
    return this.httpClient.put<Production_master>(this.url + 'updateBom/' + id, Production_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public updateProdPlanning(Production_planning, id): Observable<Production_planning> {
    return this.httpClient.put<Production_planning>(this.url + 'updateProdPlanning/' + id, Production_planning).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateProdPlanningRegular(Production_Planning_shop_floor_dtls, ppd_id, slno): Observable<Production_Planning_shop_floor_dtls> {
    return this.httpClient.put<Production_Planning_shop_floor_dtls>(this.url + 'updateProdPlanningRegular/' + ppd_id + "/" + slno, Production_Planning_shop_floor_dtls).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateProdPlanningSpl(Production_Planning_Special_Dtls, ppd_id, slno): Observable<Production_Planning_Special_Dtls> {
    return this.httpClient.put<Production_Planning_Special_Dtls>(this.url + 'updateProdPlanningSpl/' + ppd_id + "/" + slno, Production_Planning_Special_Dtls).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateProdTrans(ProductionTransaction, id): Observable<ProductionTransaction> {
    return this.httpClient.put<ProductionTransaction>(this.url + 'updateProdTrans/' + id, ProductionTransaction).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateProdTransSpl(ProductionTransactionSpecial, id): Observable<ProductionTransactionSpecial> {
    return this.httpClient.put<ProductionTransactionSpecial>(this.url + 'updateProdTransSpl/' + id, ProductionTransactionSpecial).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateQcRuleSetup(Qc_rules_setup, id): Observable<Qc_rules_setup> {
    return this.httpClient.put<Qc_rules_setup>(this.url + 'updateQcRuleSetup/' + id, Qc_rules_setup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTdsMaster(Tds_master, id): Observable<Tds_master> {
    return this.httpClient.put<Tds_master>(this.url + 'updateTdsMaster/' + id, Tds_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateWeighmentChargeMaster(WeighmentCharges, id): Observable<WeighmentCharges> {
    return this.httpClient.put<WeighmentCharges>(this.url + 'updateWeighmentChargeMaster/' + id, WeighmentCharges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTransChgsMatrix(TransportationChgsMatrix, id): Observable<TransportationChgsMatrix> {
    return this.httpClient.put<TransportationChgsMatrix>(this.url + 'updateTransChgsMatrix/' + id, TransportationChgsMatrix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateDesignation(Designation, id): Observable<Designation> {
    return this.httpClient.put<Designation>(this.url + 'updateDesignatione/' + id, Designation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateCompany(Company, id): Observable<Company> {
    return this.httpClient.put<Company>(this.url + 'updateCompany/' + id, Company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public updateCompanyBusiness(CompanyBusinessPartnerUnit): Observable<CompanyBusinessPartnerUnit> {
    return this.httpClient.put<CompanyBusinessPartnerUnit>(this.url + 'updateCompanyBusiness', CompanyBusinessPartnerUnit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //retrive ItemMaster(for setdata)
  retriveItemMaster(id): Observable<ItemMaster[]> { return this.httpClient.get<ItemMaster[]>(this.url + 'retriveItemMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  //supplier group master
  getSupplierGroup(): Observable<Supplier_group[]> { return this.httpClient.get<Supplier_group[]>(this.url + 'getSupplierGroup').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createSupplierGroup(Supplier_group): Observable<Supplier_group> {
    //alert();
    return this.httpClient.post<Supplier_group>(this.url + "createSupplierGroup", Supplier_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //supplier master
  getSupplierBPartners(): Observable<any> { return this.httpClient.get<any>(this.url + 'getSupplierBPartners').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSupplierBPartnersFastApi(company): Observable<any> { return this.httpClient.get<any>(this.url + 'getSupplierBPartnersFastApi/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  // public createSupplierBPartner(Supp_bussiness_partner) : Observable<Supp_bussiness_partner> {
  //   //alert();
  //   return this.httpClient.post<Supp_bussiness_partner>(this.url+"createSupplierBPartner",   Supp_bussiness_partner).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  // }
  public createSupplierBPartner(formdata: FormData): Observable<Supp_bussiness_partner> {
    //alert();
    return this.httpClient.post<Supp_bussiness_partner>(this.url + "createSupplierBPartner", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  // to set value by supplier code in broker tab
  getSupplierBrokerList(id: number): Observable<Supp_bussiness_partner_brokers[]> { return this.httpClient.get<Supp_bussiness_partner_brokers[]>(this.url + 'getSupplierBrokerList/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //TransporterGroup

  getTransporterGroup(): Observable<Transporter_group[]> { return this.httpClient.get<Transporter_group[]>(this.url + 'getTransporterGroup').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createTransporterGroup(Transporter_group): Observable<Supp_bussiness_partner> {
    //alert();
    return this.httpClient.post<Supp_bussiness_partner>(this.url + "createTransporterGroup", Transporter_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }



  //customar group master
  getCustomerGroup(): Observable<Cust_group[]> { return this.httpClient.get<Cust_group[]>(this.url + 'getCustomerGroup').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createCustomerGroup(Cust_group): Observable<Cust_group> {
    //alert();
    return this.httpClient.post<Cust_group>(this.url + "createCustomerGroup", Cust_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //customer  master
  getCustomerBussinessPartner(): Observable<any> { return this.httpClient.get<any>(this.url + 'getCustomerBussinessPartner').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public getCustomerBussinessPartnerFastApi(company): Observable<any> { return this.httpClient.get<any>(this.url + 'getCustomerBussinessPartnerFastApi/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createCustomerBussinessPartner(cust_bussiness_partner): Observable<cust_bussiness_partner> {
    return this.httpClient.post<cust_bussiness_partner>(this.url + "createCustomerBussinessPartner", cust_bussiness_partner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  public updateCustTransporters(customer_id, transporter_id): Observable<Cust_bussiness_partner_delv_to> {
    return this.httpClient.put<Cust_bussiness_partner_delv_to>(this.url + "updateCustTransporters/" + customer_id + "/" + transporter_id, Cust_bussiness_partner_delv_to).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  public updateCustomerTransporters(customer_id, transporter_id): Observable<Cust_bussiness_partner_delv_to> {
    return this.httpClient.put<Cust_bussiness_partner_delv_to>(this.url + "updateCustomerTransporters/" + customer_id + "/" + transporter_id, Cust_bussiness_partner_delv_to).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  //other partner master
  getOtherPartnerBussinessPartner(): Observable<otherPartner[]> { return this.httpClient.get<otherPartner[]>(this.url + 'getOtherPartnerBussinessPartner').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createOtherPartnerBussinessPartner(otherPartner): Observable<otherPartner> {
    //alert();
    return this.httpClient.post<otherPartner>(this.url + "createOtherPartnerBussinessPartner", otherPartner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }




  //transporter master
  getTransporterBussinessPartner(): Observable<Trans_bussiness_partner[]> { return this.httpClient.get<Trans_bussiness_partner[]>(this.url + 'getTransporterBussinessPartner').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getTransporterBussinessPartnerFast(): Observable<any> { return this.httpClient.get<any>(this.url + 'getTransporterBussinessPartnerFast').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createTransporterBussinessPartner(formdata: FormData): Observable<Trans_bussiness_partner> {
    //alert();
    return this.httpClient.post<Trans_bussiness_partner>(this.url + "createTransporterBussinessPartner", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }



  getChannel(): Observable<channelPartner[]> { return this.httpClient.get<channelPartner[]>(this.url + 'getChannel').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createChannel(channelPartner): Observable<channelPartner> {
    //alert();
    return this.httpClient.post<channelPartner>(this.url + "createChannel", channelPartner).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  getBrokers(): Observable<any> { return this.httpClient.get<any>(this.url + 'getBrokers').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getBrokersFastApi(company): Observable<any> { return this.httpClient.get<any>(this.url + 'getBrokersFastApi/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  // public createBroker(Broker): Observable<Broker> {
  //   //alert();
  //     return this.httpClient.post<Broker>(this.url+"createBroker",   Broker).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //   }
  public createBroker(formdata: FormData): Observable<Broker> {
    //alert();
    return this.httpClient.post<Broker>(this.url + "createBroker", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  getBrokerMaster(id: Number): Observable<Broker> { return this.httpClient.get<Broker>(this.url + 'getBrokerMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBrokerMasterAddr(broker_id: string): Observable<Broker_master_add> { return this.httpClient.get<Broker_master_add>(this.url + 'getBrokerMasterAddr/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBrokerMasterPty(broker_id: string): Observable<Broker_master_pty[]> { return this.httpClient.get<Broker_master_pty[]>(this.url + 'getBrokerMasterPty/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBrokerMasterVdr(broker_id: string): Observable<Broker_master_vdr[]> { return this.httpClient.get<Broker_master_vdr[]>(this.url + 'getBrokerMasterVdr/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getBrokerMasterVdrnew(broker_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getBrokerMasterVdrnew/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  getBrokerMasterTransporter(broker_id: string): Observable<Broker_master_transporter[]> { return this.httpClient.get<Broker_master_transporter[]>(this.url + 'getBrokerMasterTransporter/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBrokerMasterStatutory(broker_id: string): Observable<broker_master_stu_details> { return this.httpClient.get<broker_master_stu_details>(this.url + 'brokerStatutoryRetriveList/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBrokerMasterAccount(broker_id: string): Observable<broker_master_acc> { return this.httpClient.get<broker_master_acc>(this.url + 'brokerAccountRetriveList/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getBrokerMasterAddrDtls(broker_id: string): Observable<broker_master_add_dyn[]> { return this.httpClient.get<broker_master_add_dyn[]>(this.url + 'getBrokerMasterAddrDtls/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  brokerMasterOtherPartner(broker_id: string): Observable<Broker_master_oth[]> { return this.httpClient.get<Broker_master_oth[]>(this.url + 'brokerOthPartnerRetriveList/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  brokerMasterDocument(broker_id: string): Observable<broker_master_doc[]> { return this.httpClient.get<broker_master_doc[]>(this.url + 'brokerDocRetriveList/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getBrokerGroup(company_id: any): Observable<Broker_group[]> { return this.httpClient.get<Broker_group[]>(this.url + 'getBrokerGroup?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createBrokerGroup(Broker_group): Observable<Broker_group> {
    //alert();
    return this.httpClient.post<Broker_group>(this.url + "createBrokerGroup", Broker_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  getOtherPartnerGroup(): Observable<Otherpartner_group[]> { return this.httpClient.get<Otherpartner_group[]>(this.url + 'getOtherPartnerGroup').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  public createOtherPartnerGroup(Otherpartner_group): Observable<Otherpartner_group> {
    //alert();
    return this.httpClient.post<Otherpartner_group>(this.url + "createOtherPartnerGroup", Otherpartner_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //end

  //Update Sercive Start 
  // retriveChannelCust(id:any){ return this.httpClient.get<Bin>(this.url+'retriveChannelCust/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  retriveVehicle(id: any): Observable<Vehicle> { return this.httpClient.get<Vehicle>(this.url + 'retriveVehicle/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getVehicleDocDtls(id: any): Observable<Vehicle_master_docs_details[]> { return this.httpClient.get<Vehicle_master_docs_details[]>(this.url + 'getVehicleDocDtls?vid=' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveVehicleType(id: any): Observable<vehicleType> { return this.httpClient.get<vehicleType>(this.url + 'retriveVehicleType/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveTaxType(id: any): Observable<taxType> { return this.httpClient.get<taxType>(this.url + 'retriveTaxType/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveMisc(id: any): Observable<mise> { return this.httpClient.get<mise>(this.url + 'retriveMisc/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retrivePurpose(id: any): Observable<PurposeMaster> { return this.httpClient.get<PurposeMaster>(this.url + 'retrivePurpose/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveDesignation(id: any): Observable<Designation> { return this.httpClient.get<Designation>(this.url + 'retriveDesignation/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveCustomerUom(id: any): Observable<CustomUom> { return this.httpClient.get<CustomUom>(this.url + 'retriveCustomerUom/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveAreaMaster(id: any): Observable<area> { return this.httpClient.get<area>(this.url + 'retriveAreaMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveTaxTypeGst(taxcode): Observable<any> { return this.httpClient.get<any>(this.url + 'retriveTaxTypeGst/' + taxcode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveInvType(id: any): Observable<InvoiceType> { return this.httpClient.get<InvoiceType>(this.url + 'retriveInvType/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveScreen(id: any): Observable<screenMaster> { return this.httpClient.get<screenMaster>(this.url + 'retriveScreen/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveReason(id: any): Observable<reasonMaster> { return this.httpClient.get<reasonMaster>(this.url + 'retriveReason/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveShopFloor(id: any): Observable<Shop_floor_master> { return this.httpClient.get<Shop_floor_master>(this.url + 'retriveShopFloor/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveProcess(id: any): Observable<Process_master> { return this.httpClient.get<Process_master>(this.url + 'retriveProcess/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProcessDocs(process_id: string): Observable<process_master_doc[]> { return this.httpClient.get<process_master_doc[]>(this.url + 'getProcessDocs/' + process_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveDistrict(id: any): Observable<district> { return this.httpClient.get<district>(this.url + 'retriveDistrict/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveDepartment(id: any): Observable<Department1> { return this.httpClient.get<Department1>(this.url + 'retriveDepartment/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveBin(id: any): Observable<Bin> { return this.httpClient.get<Bin>(this.url + 'retriveBin/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //tuhin  
  retriveSalesRegister(id: any): Observable<SalesReport> {

    return this.httpClient.get<SalesReport>(this.url + 'retriveSalesRegister/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveSalesRegDynamic(id: any): Observable<Sales2Report> {

    return this.httpClient.get<Sales2Report>(this.url + 'retriveSalesRegDynamic/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  //tuhin ends

  retriveEmployee(id: any): Observable<employee_master_list> { return this.httpClient.get<employee_master_list>(this.url + 'retriveEmployee/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveWarehouse(id: any): Observable<wareHouse> { return this.httpClient.get<wareHouse>(this.url + 'retriveWarehouse/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveWarehouseStackDtls(warehouse_id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveWarehouseStackDtls/' + warehouse_id)
      .pipe(catchError((err) => {
        console.log("error in service: " + JSON.stringify(err));
        return throwError(err.status);
      }))
  }


  retriveItemType(id: any): Observable<Item_type_master> { return this.httpClient.get<Item_type_master>(this.url + 'retriveItemType/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveItemCatagory(id: any): Observable<Item_category_master> { return this.httpClient.get<Item_category_master>(this.url + 'retriveItemCategory/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveItemGroup(id: any): Observable<Item_group_master> { return this.httpClient.get<Item_group_master>(this.url + 'retriveItemGroup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupSalesAcc(item_group_id: string): Observable<Item_group_master_sales_acc> { return this.httpClient.get<Item_group_master_sales_acc>(this.url + 'getItemGroupSalesAcc/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupPurAcc(item_group_id: string): Observable<Item_group_master_pur_acc> { return this.httpClient.get<Item_group_master_pur_acc>(this.url + 'getItemGroupPurAcc/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupSalesRtnAcc(item_group_id: string): Observable<Item_group_master_sales_ret_acc> { return this.httpClient.get<Item_group_master_sales_ret_acc>(this.url + 'getItemGroupSalesRtnAcc/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupPurRtnAcc(item_group_id: string): Observable<Item_group_master_pur_ret_acc> { return this.httpClient.get<Item_group_master_pur_ret_acc>(this.url + 'getItemGroupPurRtnAcc/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupStkTrnsPur(item_group_id: string): Observable<Item_group_master_stk_trans_pur> { return this.httpClient.get<Item_group_master_stk_trans_pur>(this.url + 'getItemGroupStkTrnsPur/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupStkTrnsSale(item_group_id: string): Observable<Item_group_master_stk_trans_sale> { return this.httpClient.get<Item_group_master_stk_trans_sale>(this.url + 'getItemGroupStkTrnsSale/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupJobworkSales(item_group_id): Observable<any> { return this.httpClient.get<any>(this.url + 'getItemGroupJobworkSales/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemGroupJobworkSalesReturn(item_group_id): Observable<any> { return this.httpClient.get<any>(this.url + 'getItemGroupJobworkSalesReturn/' + item_group_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getItemMasterInvData1(item_id: string, companyId: string): Observable<Item_master_inv_data1> { return this.httpClient.get<Item_master_inv_data1>(this.url + 'getItemMasterInvData1/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveItemMasterInvData2(item_id: string, companyId: string): Observable<Item_master_inv_data2> { return this.httpClient.get<Item_master_inv_data2>(this.url + 'retriveItemMasterInvData2/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveItemMasterOtherInfo(item_id: string, companyId: string): Observable<Item_master_other_info> { return this.httpClient.get<Item_master_other_info>(this.url + 'retriveItemMasterOtherInfo/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveItemMasterStatInfo(item_id: string, companyId: string): Observable<Item_master_stat_info[]> { return this.httpClient.get<Item_master_stat_info[]>(this.url + 'retriveItemMasterStatInfo/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemMasterPackMa(item_id: string): Observable<Item_master_pack_mat_tag[]> { return this.httpClient.get<Item_master_pack_mat_tag[]>(this.url + 'getItemMasterPackMat/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getItemMasterPackMatList(item_id: string, companyId: string): Observable<Item_master_pack_mat_tag[]> { return this.httpClient.get<Item_master_pack_mat_tag[]>(this.url + 'getItemMasterPackMatList/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveItemMasterAltDtls(item_id: string, companyId: string): Observable<item_master_alternative_dtls[]> { return this.httpClient.get<item_master_alternative_dtls[]>(this.url + 'retriveItemMasterAltDtls/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getItemQCDetails(item_id: string, companyId: string): Observable<itmItem_master_qc_details[]> { return this.httpClient.get<itmItem_master_qc_details[]>(this.url + 'getItemQCDetails/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getItemstockDetails(item_id: string, companyId: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getItemstockDetails/' + item_id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveSupplierGroup(id: any): Observable<Supplier_group> { return this.httpClient.get<Supplier_group>(this.url + 'retriveSupplierGroup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveCustomerGrp(id: any): Observable<Cust_group> { return this.httpClient.get<Cust_group>(this.url + 'retriveCustomerGrp/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  TransGrpRetrive(id: any): Observable<Transporter_group> { return this.httpClient.get<Transporter_group>(this.url + 'TransGrpRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveBrokerGrp(id: any): Observable<Broker_group> { return this.httpClient.get<Broker_group>(this.url + 'retriveBrokerGrp/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveCity(id: any): Observable<city> { return this.httpClient.get<city>(this.url + 'retriveCity/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retrivePostOffice(id: any): Observable<PostOffice> { return this.httpClient.get<PostOffice>(this.url + 'retrivePostOffice/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //supplier
  retriveSupplierBPartner(id: any): Observable<Supp_bussiness_partner> { return this.httpClient.get<Supp_bussiness_partner>(this.url + 'retriveSupplierBPartner/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppBPAddr(bp_Id: string): Observable<Supp_bussiness_partner_addr> { return this.httpClient.get<Supp_bussiness_partner_addr>(this.url + 'getSuppBPAddr/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppContById(bp_Id: string): Observable<Supp_bussiness_partner_addr_dyn[]> { return this.httpClient.get<Supp_bussiness_partner_addr_dyn[]>(this.url + 'getSuppContById/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppBPBillAddr(bp_Id: string): Observable<Supp_bussiness_partner_bill_address> { return this.httpClient.get<Supp_bussiness_partner_bill_address>(this.url + 'getSuppBPBillAddr/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppBPBillAddrDtls(bp_Id: string): Observable<Supp_bussiness_partner_bill_addr_dyn[]> { return this.httpClient.get<Supp_bussiness_partner_bill_addr_dyn[]>(this.url + 'getSuppBPBillAddrDtls/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppBPBroker(bp_Id: string): Observable<Supp_bussiness_partner_brokers[]> { return this.httpClient.get<Supp_bussiness_partner_brokers[]>(this.url + 'getSuppBPBroker/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppBPDoc(bp_Id: string): Observable<Supp_bussiness_partner_doc[]> { return this.httpClient.get<Supp_bussiness_partner_doc[]>(this.url + 'getSuppBPDoc/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppContactNameList(bp_Id: string): Observable<Supp_bussiness_partner_delv_froms[]> { return this.httpClient.get<Supp_bussiness_partner_delv_froms[]>(this.url + 'getSuppContactNameList/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSupplierStatDtls(bp_Id: string): Observable<Supp_bussiness_partner_stat> { return this.httpClient.get<Supp_bussiness_partner_stat>(this.url + 'getSupplierStatDtls/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSuppBPAcc(bp_Id: string): Observable<Supp_bussiness_partner_acc> { return this.httpClient.get<Supp_bussiness_partner_acc>(this.url + 'getSuppBPAcc/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //end supplier    
  //customer
  retriveCustomer(id: any): Observable<cust_bussiness_partner> { return this.httpClient.get<cust_bussiness_partner>(this.url + 'retriveCustomer/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custAddRetriveList(cp_id: string): Observable<Cust_bussiness_partner_addr> { return this.httpClient.get<Cust_bussiness_partner_addr>(this.url + 'custAddRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custAddDtlsRetriveList(cp_id: string): Observable<Cust_bussiness_partner_addr_dyn[]> { return this.httpClient.get<Cust_bussiness_partner_addr_dyn[]>(this.url + 'custAddDtlsRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custAddDtlsRetriveListnew(cp_id: string): Observable<Cust_bussiness_partner_addr_dyn[]> { return this.httpClient.get<Cust_bussiness_partner_addr_dyn[]>(this.url + 'custAddDtlsRetriveListnew/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custBillAddRetriveList(cp_id: string): Observable<Cust_bussiness_partner_bill_address> { return this.httpClient.get<Cust_bussiness_partner_bill_address>(this.url + 'custBillAddRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custBillAddDtlsRetriveList(cp_id: string): Observable<Cust_bussiness_partner_bill_addr_dyn[]> { return this.httpClient.get<Cust_bussiness_partner_bill_addr_dyn[]>(this.url + 'custBillAddDtlsRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  
  custShipAddDtlsRetriveList(cp_id: string): Observable<any> 
  { 
    return this.httpClient.get(this.url + 'custShipAddDtlsRetriveList/' + cp_id)
    .pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  
  getCustDelvFromList(cp_id: string): Observable<Cust_bussiness_partner_delv_to[]> { return this.httpClient.get<Cust_bussiness_partner_delv_to[]>(this.url + 'getCustDelvFromList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  findCustDelvFromList(cp_id: string): Observable<Cust_bussiness_partner_delv_to[]> { return this.httpClient.get<Cust_bussiness_partner_delv_to[]>(this.url + 'findCustDelvFromList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custAccountRetriveList(cp_id: string): Observable<Cust_bussiness_partner_acc> { return this.httpClient.get<Cust_bussiness_partner_acc>(this.url + 'custAccountRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custStatutoryRetriveList(cp_id: string): Observable<Cust_bussiness_partner_stat> { return this.httpClient.get<Cust_bussiness_partner_stat>(this.url + 'custStatutoryRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custBrokerRetriveList(cp_id: string): Observable<Cust_bussiness_partner_brokers[]> { return this.httpClient.get<Cust_bussiness_partner_brokers[]>(this.url + 'custBrokerRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  custDocRetriveList(cp_id: string): Observable<Cust_bussiness_partner_doc[]> { return this.httpClient.get<Cust_bussiness_partner_doc[]>(this.url + 'custDocRetriveList/' + cp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //end customer

  //Transporter
  TransBussPtRetrive(id: any): Observable<Trans_bussiness_partner> { return this.httpClient.get<Trans_bussiness_partner>(this.url + 'TransBussPtRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTransBPAddr(bp_id: string): Observable<Trans_bussiness_partner_address> { return this.httpClient.get<Trans_bussiness_partner_address>(this.url + 'getTransBPAddr/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTransAccount(bp_id: string): Observable<Trans_bussiness_partner_accont> { return this.httpClient.get<Trans_bussiness_partner_accont>(this.url + 'getTransAccount/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTransBPStatu(bp_id: string): Observable<Trans_bussiness_partner_statutory> { return this.httpClient.get<Trans_bussiness_partner_statutory>(this.url + 'getTransBPStatu/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTransporterBrokerList(bp_id: string): Observable<Trans_bussiness_partner_broker[]> { return this.httpClient.get<Trans_bussiness_partner_broker[]>(this.url + 'getTransporterBrokerList/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTransBPVD(bp_id: string): Observable<Trans_vehicle_detalis[]> { return this.httpClient.get<Trans_vehicle_detalis[]>(this.url + 'getTransBPVD/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTransBPDocs(bp_id: string): Observable<Trans_bussiness_partner_docs[]> { return this.httpClient.get<Trans_bussiness_partner_docs[]>(this.url + 'getTransBPDocs/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTransBPAddrDtls(bp_id: string): Observable<Trans_bussiness_partner_address_dlts[]> { return this.httpClient.get<Trans_bussiness_partner_address_dlts[]>(this.url + 'getTransBPAddrDtls/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getTranstds(bp_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getTranstds/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //end Transporter

  PurIndentOrderRetrive(id: any): Observable<Indent> { return this.httpClient.get<Indent>(this.url + 'indentOrderRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  GetPurIndentDetailsList(indent_No: string): Observable<IndentorderDetails[]> { return this.httpClient.get<IndentorderDetails[]>(this.url + 'getPurIndentDetailsList/' + indent_No).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  IndentOrderDocRetriveList(indent_No: string): Observable<pur_Indent_docs[]> { return this.httpClient.get<pur_Indent_docs[]>(this.url + 'indentOrderDocRetriveList/' + indent_No).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //Pur Enquiry.
  purEnquiryRetrive(id: any): Observable<Enquiry> { return this.httpClient.get<Enquiry>(this.url + 'purEnquiryRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurEnquiryItemDtlsList(enq_id: string): Observable<EnquiryServiceDetails[]> { return this.httpClient.get<EnquiryServiceDetails[]>(this.url + 'getPurEnquiryItemDtlsList/' + enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurEnquiryBPDetails(enq_id: string): Observable<EnquiryBPDetails[]> { return this.httpClient.get<EnquiryBPDetails[]>(this.url + 'getPurEnquiryBPDetails/' + enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurEnquiryDocList(enq_id: string): Observable<pur_Enquiry_docs[]> { return this.httpClient.get<pur_Enquiry_docs[]>(this.url + 'getPurEnquiryDocList/' + enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  // Pur Qorder.
  purOrderRetrive(id: any): Observable<PurchaseOrder> { return this.httpClient.get<PurchaseOrder>(this.url + 'purOrderRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purOrdItemRetriveList(pur_order_no: string): Observable<PurchaseOrderItem[]> { return this.httpClient.get<PurchaseOrderItem[]>(this.url + 'purOrdItemRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purOrdTransConRetriveList(pur_order_no: string): Observable<pur_Order_Terms_Con> { return this.httpClient.get<pur_Order_Terms_Con>(this.url + 'purOrdTransConRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurOrdAppChgs(pur_order_no: string): Observable<pur_Order_app_chgs[]> { return this.httpClient.get<pur_Order_app_chgs[]>(this.url + 'getPurOrdAppChgs/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurOrdBrokerList(pur_order_no: string): Observable<pur_bussiness_partner_brokers[]> { return this.httpClient.get<pur_bussiness_partner_brokers[]>(this.url + 'getPurOrdBrokerList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurOrdTrans(pur_order_no: string): Observable<PO_Trans_Infos> { return this.httpClient.get<PO_Trans_Infos>(this.url + 'getPurOrdTrans/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purOrdBPDRetriveList(pur_order_no: string): Observable<BPDetails> { return this.httpClient.get<BPDetails>(this.url + 'purOrdBPDRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purOrdDocRetriveList(pur_order_no: string): Observable<pur_Order_docs[]> { return this.httpClient.get<pur_Order_docs[]>(this.url + 'purOrdDocRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purOrdTerminateRetriveList(pur_order_no: string): Observable<PO_Terminations> { return this.httpClient.get<PO_Terminations>(this.url + 'purOrdTerminateRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurOrdTransChgsDynList(pur_order_no: string): Observable<PO_Terminations> { return this.httpClient.get<PO_Terminations>(this.url + 'getPurOrdTransChgsDynList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurOrdTermList(pur_order_no: string): Observable<pur_Order_Terminations_dyn[]> { return this.httpClient.get<pur_Order_Terminations_dyn[]>(this.url + 'getPurOrdTermList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurOrdTermsCondDynList(pur_order_no: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getPurOrdTermsCondDynList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurOrdStoreDynList(pur_order_no): Observable<any> { return this.httpClient.get<any>(this.url + 'getPurOrdStoreDynList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //Pr order
  //pur quotation..
  purQuotationRetrive(id: any): Observable<Quotation> { return this.httpClient.get<Quotation>(this.url + 'purQuotationRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purQuotServRetriveList(quotation_no: string): Observable<QuotationDetails[]> { return this.httpClient.get<QuotationDetails[]>(this.url + 'purQuotServRetriveList/' + quotation_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  gePurQuotBPDetails(quotation_no: string): Observable<Business_Partner_details> { return this.httpClient.get<Business_Partner_details>(this.url + 'gePurQuotBPDetails/' + quotation_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurQuotDocs(quotation_no: string): Observable<pur_Quotation_docs[]> { return this.httpClient.get<pur_Quotation_docs[]>(this.url + 'getPurQuotDocs/' + quotation_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurQuotBrokerDtls(quotation_no: string): Observable<pur_Quotation_Broker[]> { return this.httpClient.get<pur_Quotation_Broker[]>(this.url + 'getPurQuotBrokerDtls/' + quotation_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  //Pur Enquiry.
  SalesEnquiriesRetrive(id: any): Observable<SalesEnq> { return this.httpClient.get<SalesEnq>(this.url + 'SalesEnquiriesRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesEnqItemDtls(enq_id: string): Observable<sales_Enquiry_Item_Dtls[]> { return this.httpClient.get<sales_Enquiry_Item_Dtls[]>(this.url + 'getSalesEnqItemDtls/' + enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesEnqPartyDtls(enq_id: string): Observable<sales_Enquiry_Party_Dtls[]> { return this.httpClient.get<sales_Enquiry_Party_Dtls[]>(this.url + 'getSalesEnqPartyDtls/' + enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesEnqDoc(enq_id: string): Observable<sales_Enquiry_Docs[]> { return this.httpClient.get<sales_Enquiry_Docs[]>(this.url + 'getSalesEnqDoc/' + enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //end

  // sales quo
  salesQuotationRetrive(id: any): Observable<Sales_Quotation> { return this.httpClient.get<Sales_Quotation>(this.url + 'salesQuotationRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotItemDtls(quotation_id: string): Observable<sales_Quotation_Item_Dtls[]> { return this.httpClient.get<sales_Quotation_Item_Dtls[]>(this.url + 'getSalesQuotItemDtls/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotBrokerDtls(quotation_id: string): Observable<sales_Quotation_Broker_Dtls[]> { return this.httpClient.get<sales_Quotation_Broker_Dtls[]>(this.url + 'getSalesQuotBrokerDtls/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotSummary(quotation_id: string): Observable<sales_Quotation_Summary> { return this.httpClient.get<sales_Quotation_Summary>(this.url + 'getSalesQuotSummary/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotSummDtls(quotation_id: string): Observable<sales_Quotation_Summary_dyn[]> { return this.httpClient.get<sales_Quotation_Summary_dyn[]>(this.url + 'getSalesQuotSummDtls/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotTransInfo(quotation_id: string): Observable<sales_Quotation_Trans_Info> { return this.httpClient.get<sales_Quotation_Trans_Info>(this.url + 'getSalesQuotTransInfo/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotPartyDtls(quotation_id: string): Observable<Sales_Quotation_Party_Dtls[]> { return this.httpClient.get<Sales_Quotation_Party_Dtls[]>(this.url + 'getSalesQuotPartyDtls/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotTermsCon(quotation_id: string): Observable<sales_Quotation_Terms_Con> { return this.httpClient.get<sales_Quotation_Terms_Con>(this.url + 'getSalesQuotTermsCon/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotShipDtls(quotation_id: string): Observable<sales_Quotation_Shipment_Dtls> { return this.httpClient.get<sales_Quotation_Shipment_Dtls>(this.url + 'getSalesQuotShipDtls/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesQuotDoc(quotation_id: string): Observable<sales_Quotation_Docs[]> { return this.httpClient.get<sales_Quotation_Docs[]>(this.url + 'getSalesQuotDoc/' + quotation_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  // sales order
  salesOrderRetrive(id: any): Observable<SalesOrder> { return this.httpClient.get<SalesOrder>(this.url + 'salesOrderRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdItemDtls(order_id: string): Observable<sales_Order_Item_Dtls[]> { return this.httpClient.get<sales_Order_Item_Dtls[]>(this.url + 'getSalesOrdItemDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSalesOrdItemDtlsnew(order_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getSalesOrdItemDtlsnew/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSalesOrdBrokerDtls(order_id: string): Observable<sales_Order_Broker_Dtls[]> { return this.httpClient.get<sales_Order_Broker_Dtls[]>(this.url + 'getSalesOrdBrokerDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdSumm(order_id: string): Observable<sales_Order_Summary> { return this.httpClient.get<sales_Order_Summary>(this.url + 'getSalesOrdSumm/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdSummDyna(order_id: string): Observable<sales_Order_Summary_dyn[]> { return this.httpClient.get<sales_Order_Summary_dyn[]>(this.url + 'getSalesOrdSummDyna/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdTransInfo(order_id: string): Observable<sales_Order_Trans_Info> { return this.httpClient.get<sales_Order_Trans_Info>(this.url + 'getSalesOrdTransInfo/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdPartyDtls(order_id: string): Observable<Sales_Order_Party_Dtls[]> { return this.httpClient.get<Sales_Order_Party_Dtls[]>(this.url + 'getSalesOrdPartyDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdTermsCon(order_id: string): Observable<sales_Order_Terms_Con> { return this.httpClient.get<sales_Order_Terms_Con>(this.url + 'getSalesOrdTermsCon/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdShipDtls(order_id: string): Observable<sales_Order_Shipment_Dtls> { return this.httpClient.get<sales_Order_Shipment_Dtls>(this.url + 'getSalesOrdShipDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdDocs(order_id: string): Observable<sales_Order_Docs[]> { return this.httpClient.get<sales_Order_Docs[]>(this.url + 'getSalesOrdDocs/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdTransChgsDynList(order_id): Observable<any> { return this.httpClient.get<any>(this.url + 'getSalesOrdTransChgsDynList/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdJobItemDtls(order_id): Observable<any> { return this.httpClient.get<any>(this.url + 'getSalesOrdJobItemDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesOrdTServiceItem(order_id): Observable<any> { return this.httpClient.get<any>(this.url + 'getSalesOrdTServiceItem/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSalesOrdItemDtlsJobwork(order_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrdItemDtlsJobwork/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveStkTrans(id: any): Observable<StockTransfer> { return this.httpClient.get<StockTransfer>(this.url + 'stock_TransferRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransItemRetriveList(order_id: string): Observable<stock_transfer_Item_Dtls[]> { return this.httpClient.get<stock_transfer_Item_Dtls[]>(this.url + 'getStockTransItemDlts/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransSummaryRetriveList(order_id: string): Observable<stock_transfer_Summary> { return this.httpClient.get<stock_transfer_Summary>(this.url + 'getStkTransSumm/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransSummaryDtlsRetriveList(order_id: string): Observable<stock_transfer_Summary_dyn[]> { return this.httpClient.get<stock_transfer_Summary_dyn[]>(this.url + 'getStkTraSumDyn/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransTransferRetriveList(order_id: string): Observable<stock_transfer_Trans_Info> { return this.httpClient.get<stock_transfer_Trans_Info>(this.url + 'getStkTransTranInfo/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransResourceCostDtlsRetriveList(order_id: string): Observable<StktransReceiptResourceCost[]> { return this.httpClient.get<StktransReceiptResourceCost[]>(this.url + 'getStockTransReCost/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransTerms(order_id: string): Observable<Stock_Transfer_Terminations> { return this.httpClient.get<Stock_Transfer_Terminations>(this.url + 'getStkTransTerms/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStockTransTermDtls(order_id: string): Observable<Stock_Transfer_Terminations_dyn[]> { return this.httpClient.get<Stock_Transfer_Terminations_dyn[]>(this.url + 'getStockTransTermDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStockTransDoc(order_id: string): Observable<Stock_transfer_Doc[]> { return this.httpClient.get<Stock_transfer_Doc[]>(this.url + 'getStockTransDoc/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }



  retriveStkIndentOrd(id: any): Observable<IndentOrder> { return this.httpClient.get<IndentOrder>(this.url + 'retriveStkIndentOrd/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkIndentOrdItemDtlsList(indent_id: string): Observable<IndentorderDetail[]> { return this.httpClient.get<IndentorderDetail[]>(this.url + 'getStkIndentOrdItemDtlsList/' + indent_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkIndentDocsList(indent_id: string): Observable<stock_Indent_docs[]> { return this.httpClient.get<stock_Indent_docs[]>(this.url + 'getStkIndentDocsList/' + indent_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkIndentTermDtlsList(indent_id: string): Observable<stock_Transfer_Terminations_dyn[]> { return this.httpClient.get<stock_Transfer_Terminations_dyn[]>(this.url + 'getStkIndentTermDtlsList/' + indent_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkIndTermDtls(indent_id: string): Observable<stock_Terminations> { return this.httpClient.get<stock_Terminations>(this.url + 'getStkIndTermDtls/' + indent_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  findOneChallan(id: any): Observable<any> { return this.httpClient.get<any>(this.url + 'findOneChallan/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStockTransChlnById(id: any): Observable<StockTransferChallan> { return this.httpClient.get<StockTransferChallan>(this.url + 'getStockTransChlnById/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransChallanItemDlts(stk_challan_id: string): Observable<stk_challan__Item_Dtls[]> { return this.httpClient.get<stk_challan__Item_Dtls[]>(this.url + 'getStkTransChallanItemDlts/' + stk_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransChallanShipDtls(stk_challan_id: string): Observable<stk_challan__Shipment_Dtls> { return this.httpClient.get<stk_challan__Shipment_Dtls>(this.url + 'getStkTransChallanShipDtls/' + stk_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransChallanTranInfo(stk_challan_id: string): Observable<stk_challan__Trans_Info> { return this.httpClient.get<stk_challan__Trans_Info>(this.url + 'getStkTransChallanTranInfo/' + stk_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransChallanDocs(stk_challan_id: string): Observable<stk_challan__Docs[]> { return this.httpClient.get<stk_challan__Docs[]>(this.url + 'getStkTransChallanDocs/' + stk_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransBUDtls(stk_challan_id: string): Observable<stk_challan_business_unit_Dtls> { return this.httpClient.get<stk_challan_business_unit_Dtls>(this.url + 'getStkTransBUDtls/' + stk_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransChallanWtDtls(stk_challan_id: string): Observable<stk_challan__weight_dtl> { return this.httpClient.get<stk_challan__weight_dtl>(this.url + 'getStkTransChallanWtDtls/' + stk_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getStockTransLoadingWeighmentId(id: any): Observable<LoadingAdvice> { return this.httpClient.get<LoadingAdvice>(this.url + 'getStockTransLoadingWeighmentId/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  stkSalesInv(id: any): Observable<StockTransferChallan> { return this.httpClient.get<StockTransferChallan>(this.url + 'stkSalesInv/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveStkTransGRN(id: any): Observable<StockTransferGrn> { return this.httpClient.get<StockTransferGrn>(this.url + 'getStkTranGrnById/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransGRNItemRetriveList(stk_grn_id: string): Observable<Stk_Trans_grn_item_details[]> { return this.httpClient.get<Stk_Trans_grn_item_details[]>(this.url + 'getStkTranGrnItemDlts/' + stk_grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransGRNOtherInfoRetriveList(stk_grn_id: string): Observable<Stk_Trans_grn_other_information[]> { return this.httpClient.get<Stk_Trans_grn_other_information[]>(this.url + 'getStkTranGrnOthDtls/' + stk_grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransGRNTransInfoRetriveList(stk_grn_id: string): Observable<Stk_Trans_grn_trans_info[]> { return this.httpClient.get<Stk_Trans_grn_trans_info[]>(this.url + 'getStkTranGrnTranInfo/' + stk_grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransGRNBUDtlsRetriveList(stk_grn_id: string): Observable<Stk_Transfer_grn_bu_dtls[]> { return this.httpClient.get<Stk_Transfer_grn_bu_dtls[]>(this.url + 'getStkTranGrnBUDtls/' + stk_grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  StkTransGRNResourceCostDtlsRetriveList(stk_grn_id: string): Observable<Stk_Trans_grn_resource_cost[]> { return this.httpClient.get<Stk_Trans_grn_resource_cost[]>(this.url + 'getStkTranGrnReCostDlts/' + stk_grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStockTransGRNDoc(stk_grn_id: string): Observable<Stk_Trans_grn_docs[]> { return this.httpClient.get<Stk_Trans_grn_docs[]>(this.url + 'getStkTranGrnDocs/' + stk_grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  getStkTransSalesInvById(id: any): Observable<StockTransferSalesInvoice> { return this.httpClient.get<StockTransferSalesInvoice>(this.url + 'getStkTransSalesInvById/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransSalesInvItemDtls(stk_sales_inv_id: string): Observable<Stk_Transfer_sales_inv_item_dtls[]> { return this.httpClient.get<Stk_Transfer_sales_inv_item_dtls[]>(this.url + 'getStkTransSalesInvItemDtls/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransSalesInvShipDtls(stk_sales_inv_id: string): Observable<Stk_Transfer_sales_inv_shipment_dtls> { return this.httpClient.get<Stk_Transfer_sales_inv_shipment_dtls>(this.url + 'getStkTransSalesInvShipDtls/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransSalesInvTransDtls(stk_sales_inv_id: string): Observable<Stk_Transfer_sales_inv_trans_dtls[]> { return this.httpClient.get<Stk_Transfer_sales_inv_trans_dtls[]>(this.url + 'getStkTransSalesInvTransDtls/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransSalesInvDocs(stk_sales_inv_id: string): Observable<Stk_Transfer_sales_inv_docs[]> { return this.httpClient.get<Stk_Transfer_sales_inv_docs[]>(this.url + 'getStkTransSalesInvDocs/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransSalesInvBUDtls(stk_sales_inv_id: string): Observable<Stk_Transfer_sales_inv_bu_dtls> { return this.httpClient.get<Stk_Transfer_sales_inv_bu_dtls>(this.url + 'getStkTransSalesInvBUDtls/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransSalesInvTaxInfo(stk_sales_inv_id: string): Observable<Stk_Transfer_sales_inv_tax_info> { return this.httpClient.get<Stk_Transfer_sales_inv_tax_info>(this.url + 'getStkTransSalesInvTaxInfo/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  deleteStockTransferSalesInvoice(StockTransferSalesInvoice, id): Observable<any> { return this.httpClient.put<StockTransferSalesInvoice>(this.url + 'deleteStockTransferSalesInvoice/' + id, StockTransferSalesInvoice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })); }

  retriveDeliveryChallan(id: any): Observable<DeliveryChallan> { return this.httpClient.get<DeliveryChallan>(this.url + 'retriveDeliveryChallan/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveDeliveryChallanOrderNo(delv_id: any): Observable<any> { return this.httpClient.get<any>(this.url + 'retriveDeliveryChallanOrderNo/' + delv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDlvChallanItemDtls(delivery_cid: string): Observable<delivery_challan_Item_Dtls[]> { return this.httpClient.get<delivery_challan_Item_Dtls[]>(this.url + 'getDlvChallanItemDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDlvChallanPartyDtls(delivery_cid: string): Observable<delivery_challan_Party_Dtls[]> { return this.httpClient.get<delivery_challan_Party_Dtls[]>(this.url + 'getDlvChallanPartyDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDlvChallanShipmentDtls(delivery_cid: string): Observable<delivery_challan_Shipment_Dtls> { return this.httpClient.get<delivery_challan_Shipment_Dtls>(this.url + 'getDlvChallanShipmentDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDlvChallanWeightDtls(delivery_cid: string): Observable<delivery_challan_weight_dtl> { return this.httpClient.get<delivery_challan_weight_dtl>(this.url + 'getDlvChallanWeightDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDlvChallanTransInfo(delivery_cid: string): Observable<delivery_challan_Trans_Info> { return this.httpClient.get<delivery_challan_Trans_Info>(this.url + 'getDlvChallanTransInfo/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDlvChallanDoc(delivery_cid: string): Observable<delivery_challan_Docs[]> { return this.httpClient.get<delivery_challan_Docs[]>(this.url + 'getDlvChallanDoc/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDlvChallanBrokerDtls(delivery_cid: string): Observable<delivery_challan_Broker_Dtls[]> { return this.httpClient.get<delivery_challan_Broker_Dtls[]>(this.url + 'getDlvChallanBrokerDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDelivery_challan_Chgs_dyn(delivery_cid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getDelivery_challan_Chgs_dyn/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDelivery_challan_Chgs_dynDtls(delivery_cid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getDelivery_challan_Chgs_dynDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getDelivery_challan_Chgs_dynpopup(advice_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getDelivery_challan_Chgs_dynpopup/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  //  getDlvChallanItemDtlsHsn(delivery_cid:string): Observable<delivery_challan_Item_Dtls[]>{ return this.httpClient.get<delivery_challan_Item_Dtls[]>(this.url+'getDlvChallanItemDtlsHsn/'+delivery_cid).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  retriveCompany(id: any): Observable<Company> { return this.httpClient.get<Company>(this.url + 'retriveCompany/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  compLiceRetriveList(company_id: string): Observable<company_licence_details[]> { return this.httpClient.get<company_licence_details[]>(this.url + 'compLiceRetriveList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveCompanyBusiness(id: any): Observable<CompanyBusinessPartnerUnit> { return this.httpClient.get<CompanyBusinessPartnerUnit>(this.url + 'retriveCompanyBusiness/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  compBURetriveList(businessunit_id: string): Observable<companyBusinessUnitDetails[]> { return this.httpClient.get<companyBusinessUnitDetails[]>(this.url + 'compBURetriveList/' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveTaxCode(id: any): Observable<TaxCode> { return this.httpClient.get<TaxCode>(this.url + 'retriveTaxCode/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  taxCodeDtlsRetriveList(tax_id: string): Observable<Tax_code_details[]> { return this.httpClient.get<Tax_code_details[]>(this.url + 'taxCodeDtlsRetriveList/' + tax_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveAccAcceptanceNorms(id: any): Observable<TransportationChgsMatrix> { return this.httpClient.get<TransportationChgsMatrix>(this.url + 'retriveAccAcceptanceNorms/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  transChrgsMatRetriveList(businessunit_id: string): Observable<transportation_chgs_matrix_details[]> { return this.httpClient.get<transportation_chgs_matrix_details[]>(this.url + 'transChrgsMatRetriveList/' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveTransChgsMatrix(id: any): Observable<Acc_acceptance_norms> { return this.httpClient.get<Acc_acceptance_norms>(this.url + 'retriveTransChgsMatrix/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  accAcceptanceNormsRetriveList(businessunit_id: string): Observable<acc_acceptance_norms_master_dts[]> { return this.httpClient.get<acc_acceptance_norms_master_dts[]>(this.url + 'accAcceptanceNormsRetriveList /' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveChannelCust(id: any): Observable<channel_cust_master> { return this.httpClient.get<channel_cust_master>(this.url + 'retriveChannelCust/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveChargesMaster(id: any): Observable<Charges> { return this.httpClient.get<Charges>(this.url + 'retriveChargesMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  chargeMasterRetriveList(charge_id: string): Observable<charges_details[]> { return this.httpClient.get<charges_details[]>(this.url + 'chargeMasterRetriveList/' + charge_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveLoadingPoints(id: any): Observable<LaodingPoint> { return this.httpClient.get<LaodingPoint>(this.url + 'retriveLoadingPoints/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveZoneMaster(id: any): Observable<ZoneMaster> { return this.httpClient.get<ZoneMaster>(this.url + 'retriveZoneMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveAccPayModes(id: any): Observable<Acc_pay_mode> { return this.httpClient.get<Acc_pay_mode>(this.url + 'retriveAccPayModes/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveAccPayTerms(id: any): Observable<Acc_pay_term> { return this.httpClient.get<Acc_pay_term>(this.url + 'retriveAccPayTerms/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  accPayTermsRetriveList(payterms_id: string): Observable<Dyn_Acc_pay_term[]> { return this.httpClient.get<Dyn_Acc_pay_term[]>(this.url + 'accPayTermsRetriveList/' + payterms_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveQcRuleSetup(id: any): Observable<Qc_rules_setup> { return this.httpClient.get<Qc_rules_setup>(this.url + 'retriveQcRuleSetup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  qcRuleSetupRetriveList(qc_id: string): Observable<qc_rules_setup_dtls[]> {
    return this.httpClient.get<qc_rules_setup_dtls[]>(this.url + 'qcRuleSetupRetriveList/' + qc_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveTdsMaster(id: any): Observable<Tds_master> { return this.httpClient.get<Tds_master>(this.url + 'retriveTdsMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveWeighmentChargeMasters(id: any): Observable<WeighmentCharges> { return this.httpClient.get<WeighmentCharges>(this.url + 'retriveWeighmentChargeMasters/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveLoadingAdvice(id: any): Observable<LoadingAdvice> { return this.httpClient.get<LoadingAdvice>(this.url + 'retriveLoadingAdvice/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  loadingItemRetriveList(advice_id: string): Observable<Wm_loading_advice_itm_dtls[]> { return this.httpClient.get<Wm_loading_advice_itm_dtls[]>(this.url + 'loadingItemRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  loadingItemRetriveListprint(advice_id: string): Observable<Wm_loading_advice_itm_dtls[]> { return this.httpClient.get<Wm_loading_advice_itm_dtls[]>(this.url + 'loadingItemRetriveListprint/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  loadingDriverRetriveList(advice_id: string): Observable<Wm_loading_advice_driver_dtls> { return this.httpClient.get<Wm_loading_advice_driver_dtls>(this.url + 'loadingDriverRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  loadingTransInfoRetriveList(advice_id: string): Observable<Wm_loading_advice_trans_info> { return this.httpClient.get<Wm_loading_advice_trans_info>(this.url + 'loadingTransInfoRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  loadingTransInfoRetriveListNew(advice_id: string, company_id): Observable<Wm_loading_advice_trans_info> { return this.httpClient.get<Wm_loading_advice_trans_info>(this.url + 'loadingTransInfoRetriveList/' + advice_id + '/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  loadingBPDtlsRetriveList(advice_id: string): Observable<Wm_loading_advice_bp_dtls> { return this.httpClient.get<Wm_loading_advice_bp_dtls>(this.url + 'loadingBPDtlsRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  loadingDocRetriveList(advice_id: string): Observable<Wm_loading_advice_doc_attch[]> { return this.httpClient.get<Wm_loading_advice_doc_attch[]>(this.url + 'loadingDocRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getLoadingAdvBrokerDtls(advice_id: string): Observable<wm_loading_advice_broker_dtls[]> { return this.httpClient.get<wm_loading_advice_broker_dtls[]>(this.url + 'getLoadingAdvBrokerDtls/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getLoadingAdvPartyDtls(advice_id: string): Observable<wm_loading_advice_Party_Dtls[]> { return this.httpClient.get<wm_loading_advice_Party_Dtls[]>(this.url + 'getLoadingAdvPartyDtls/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getLoadingAdvShipDtls(advice_id: string): Observable<wm_loading_advice_Shipment_Dtls> { return this.httpClient.get<wm_loading_advice_Shipment_Dtls>(this.url + 'getLoadingAdvShipDtls/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  unloadAdviceRetrive(id: any): Observable<UnloadAdvice> { return this.httpClient.get<UnloadAdvice>(this.url + 'unloadAdviceRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getUnloadItemList(unloadadvice_id: string): Observable<Wm_unload_advice_item_dtls[]> { return this.httpClient.get<Wm_unload_advice_item_dtls[]>(this.url + 'getUnloadItemList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdviceAppChgsRetriveList(unloadadvice_id: string): Observable<wm_unload_advice_app_chgs[]> { return this.httpClient.get<wm_unload_advice_app_chgs[]>(this.url + 'wmUnAdviceAppChgsRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdviceBpDtlsRetriveList(unloadadvice_id: string): Observable<Wm_unload_advice_bp_dtls> { return this.httpClient.get<Wm_unload_advice_bp_dtls>(this.url + 'wmUnAdviceBpDtlsRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdviceBrokerRetriveList(unloadadvice_id: string): Observable<Wm_unload_advice_broker_dtls[]> { return this.httpClient.get<Wm_unload_advice_broker_dtls[]>(this.url + 'wmUnAdviceBrokerRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdviceDocRetriveList(unloadadvice_id: string): Observable<Wm_unload_advice_doc[]> { return this.httpClient.get<Wm_unload_advice_doc[]>(this.url + 'wmUnAdviceDocRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdviceDriverDtlsRetriveList(unloadadvice_id: string): Observable<Wm_unload_advice_driver_dtls> { return this.httpClient.get<Wm_unload_advice_driver_dtls>(this.url + 'wmUnAdviceDriverDtlsRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdvicePartyWmRetriveList(unloadadvice_id: string): Observable<Wm_unload_advice_party_wm> { return this.httpClient.get<Wm_unload_advice_party_wm>(this.url + 'wmUnAdvicePartyWmRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdviceTransConRetriveList(unloadadvice_id: string): Observable<Wm_unload_advice_terms_con> { return this.httpClient.get<Wm_unload_advice_terms_con>(this.url + 'wmUnAdviceTransConRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  wmUnAdviceTransInfoRetriveList(unloadadvice_id: string): Observable<Wm_unload_advice_trans_info> { return this.httpClient.get<Wm_unload_advice_trans_info>(this.url + 'wmUnAdviceTransInfoRetriveList/' + unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  
  wmUnAdviceBrokerRetriveFastList(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdviceBrokerRetriveFastList/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  wmUnAdviceBpDtlsRetriveFastList(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdviceBpDtlsRetriveFastList/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  wmUnAdviceDriverDtlsRetriveFastList(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdviceDriverDtlsRetriveFastList/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  wmUnAdvicePartyWmRetriveFastList(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdvicePartyWmRetriveFastList/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  wmUnAdviceTransInfoRetriveFastList(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdviceTransInfoRetriveFastList/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  wmUnAdviceAppChgsRetriveListFast(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdviceAppChgsRetriveListFast/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  wmUnAdviceDocRetriveListFast(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdviceDocRetriveListFast/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
   getUnloadItemFastList(unloadadvice_id): Observable<any> {
     return this.httpClient.get<any>(this.url + 'getUnloadItemFastList/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
   }

  wmUnAdviceTransConRetriveFastList(unloadadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wmUnAdviceTransConRetriveFastList/'+unloadadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  tagadviceRetrive(id: any): Observable<TagAdviceWithPo> { return this.httpClient.get<TagAdviceWithPo>(this.url + 'tagadviceRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  purBillRetriveList(id: any): Observable<PurchaseBill> { return this.httpClient.get<PurchaseBill>(this.url + 'purBillRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillItemRetriveList(pbid: string): Observable<PurchaseBillItem[]> { return this.httpClient.get<PurchaseBillItem[]>(this.url + 'purBillItemRetriveList/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillItemRetriveListPrint(pbid: string): Observable<PurchaseBillItem[]> { return this.httpClient.get<PurchaseBillItem[]>(this.url + 'purBillItemRetriveListPrint/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getpurbillprintupperdata(pbid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getpurbillprintupperdata/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  getpurBillInvTaxSum(pbid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getpurBillInvTaxSum/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  purBillMusterRollRetriveList(pbid: string): Observable<pur_Bill_MusterRoll_Details[]> { return this.httpClient.get<pur_Bill_MusterRoll_Details[]>(this.url + 'purBillMusterRetriveList/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillTaxInfoRetriveList(pbid: string): Observable<pur_Bill_Tax_Info> { return this.httpClient.get<pur_Bill_Tax_Info>(this.url + 'gePurBillTaxInfo/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillBrokerRetriveList(pbid: string): Observable<pur_Bill_Broker_Details[]> { return this.httpClient.get<pur_Bill_Broker_Details[]>(this.url + 'purBillBrokerRetriveList/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillBpDtlsRetriveList(pbid: string): Observable<Pur_Bill_BPDetails> { return this.httpClient.get<Pur_Bill_BPDetails>(this.url + 'gePurBillBPRetrive/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillAccountInfoRetriveList(pbid: string): Observable<pur_Bill_Account_Info> { return this.httpClient.get<pur_Bill_Account_Info>(this.url + 'gePurBillAccRetrive/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillDocsRetriveList(pbid: string): Observable<pur_Bill_docs[]> { return this.httpClient.get<pur_Bill_docs[]>(this.url + 'purBillDocRetriveList/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillAppChargesRetriveList(pbid: string): Observable<pur_Bill_app_chgs[]> { return this.httpClient.get<pur_Bill_app_chgs[]>(this.url + 'purBillAppChargesRetriveList/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purBillStoreChargesRetriveList(pbid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'purBillStoreChargesRetriveList/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  
  purBillCharMatrixposting(pbid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'purBillCharMatrixposting/' + pbid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  //return approval

  retriveReturnApprovalNote(id: any): Observable<ReturnApprovalNote> { return this.httpClient.get<ReturnApprovalNote>(this.url + 'retriveReturnApprovalNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getReturnApprovalID(salesreturnid: string): Observable<return_approval_Item_Dtls[]> { return this.httpClient.get<return_approval_Item_Dtls[]>(this.url + 'getReturnApprovalID/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getReturnApprovalWD(salesreturnid: string): Observable<return_approval_weight_dtl> { return this.httpClient.get<return_approval_weight_dtl>(this.url + 'getReturnApprovalWD/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getReturnApprovalD(salesreturnid: string): Observable<return_approval_Docs[]> { return this.httpClient.get<return_approval_Docs[]>(this.url + 'getReturnApprovalD/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getReturnApprovalPD(salesreturnid: string): Observable<return_approval_Party_Dtls[]> { return this.httpClient.get<return_approval_Party_Dtls[]>(this.url + 'getReturnApprovalPD/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getReturnApprovalSD(salesreturnid: string): Observable<return_approval_Shipment_Dtls> { return this.httpClient.get<return_approval_Shipment_Dtls>(this.url + 'getReturnApprovalSD/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getReturnApprovalTI(salesreturnid: string): Observable<return_approval_Trans_Info> { return this.httpClient.get<return_approval_Trans_Info>(this.url + 'getReturnApprovalTI/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getReturnApprovalBD(salesreturnid: string): Observable<return_approval_Broker_Dtls[]> { return this.httpClient.get<return_approval_Broker_Dtls[]>(this.url + 'getReturnApprovalBD/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  purDebitNoteRetriveList(id: any): Observable<DebitNote> { return this.httpClient.get<DebitNote>(this.url + 'retrivePurDebitNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purDebitNoteItemRetriveList(debitnoteid: string): Observable<Pur_debit_note_item_details[]> { return this.httpClient.get<Pur_debit_note_item_details[]>(this.url + 'getPurDebitNoteItemDtls/' + debitnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purDebitNoteMusterRollRetriveList(debitnoteid: string): Observable<Pur_debit_note_musterroll_details[]> { return this.httpClient.get<Pur_debit_note_musterroll_details[]>(this.url + 'getPurDebitNoteMstDtls/' + debitnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purDebitNoteTaxInfoRetriveList(debitnoteid: string): Observable<Pur_debit_note_tax_info> { return this.httpClient.get<Pur_debit_note_tax_info>(this.url + 'getPurDebitNoteTaxInfo/' + debitnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purDebitNoteBrokerRetriveList(debitnoteid: string): Observable<Pur_debit_note_broker_details[]> { return this.httpClient.get<Pur_debit_note_broker_details[]>(this.url + 'getPurDebitNoteBrokerDtls/' + debitnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purDebitNoteBpDtlsRetriveList(debitnoteid: string): Observable<Pur_debit_note_bp_details> { return this.httpClient.get<Pur_debit_note_bp_details>(this.url + 'getPurDebitNoteBPDtls/' + debitnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purDebitNoteAccountInfoRetriveList(debitnoteid: string): Observable<Pur_debit_note_account_info> { return this.httpClient.get<Pur_debit_note_account_info>(this.url + 'getPurDebitNoteAccInfo/' + debitnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  purDebitNoteDocsRetriveList(debitnoteid: string): Observable<Pur_debit_note_docs[]> { return this.httpClient.get<Pur_debit_note_docs[]>(this.url + 'getPurDebitNoteDoc/' + debitnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveSalesReturnNote(id: any): Observable<SalesReturnNote> { return this.httpClient.get<SalesReturnNote>(this.url + 'retriveSalesReturnNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesReturnNoteBD(salesreturnnoteid: string): Observable<sales_return_note_Broker_Dtls[]> { return this.httpClient.get<sales_return_note_Broker_Dtls[]>(this.url + 'getSalesReturnNoteBD/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesReturnNoteD(salesreturnnoteid: string): Observable<sales_return_note_Docs[]> { return this.httpClient.get<sales_return_note_Docs[]>(this.url + 'getSalesReturnNoteD/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesReturnNoteID(salesreturnnoteid: string): Observable<sales_return_note_Item_Dtls[]> { return this.httpClient.get<sales_return_note_Item_Dtls[]>(this.url + 'getSalesReturnNoteID/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSalesReturnNoteIDjobwork(salesreturnnoteid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getSalesReturnNoteIDjobwork/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSalesReturnNotePD(salesreturnnoteid: string): Observable<sales_return_note_Party_Dtls[]> { return this.httpClient.get<sales_return_note_Party_Dtls[]>(this.url + 'getSalesReturnNotePD/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesReturnNoteSD(salesreturnnoteid: string): Observable<sales_return_note_Shipment_Dtls> { return this.httpClient.get<sales_return_note_Shipment_Dtls>(this.url + 'getSalesReturnNoteSD/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesReturnNoteTI(salesreturnnoteid: string): Observable<sales_return_note_Trans_Info> { return this.httpClient.get<sales_return_note_Trans_Info>(this.url + 'getSalesReturnNoteTI/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesReturnNoteWD(salesreturnnoteid: string): Observable<sales_return_note_weight_dtl> { return this.httpClient.get<sales_return_note_weight_dtl>(this.url + 'getSalesReturnNoteWD/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveSalesCreditNote(id: any): Observable<CreditNote> { return this.httpClient.get<CreditNote>(this.url + 'retriveSalesCreditNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveSalesCreditNoteposting(id: any): Observable<CreditNote> { return this.httpClient.get<CreditNote>(this.url + 'retriveSalesCreditNoteposting/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSalesCreditNoteBPD(creditnoteid: string): Observable<sales_credit_note_bp_dtls> { return this.httpClient.get<sales_credit_note_bp_dtls>(this.url + 'getSalesCreditNoteBPD/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteBD(creditnoteid: string): Observable<sales_credit_note_broker_dtls[]> { return this.httpClient.get<sales_credit_note_broker_dtls[]>(this.url + 'getSalesCreditNoteBD/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteD(creditnoteid: string): Observable<sales_credit_note_docs[]> { return this.httpClient.get<sales_credit_note_docs[]>(this.url + 'getSalesCreditNoteD/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteID(creditnoteid: string): Observable<sales_credit_note_item_dtls[]> { return this.httpClient.get<sales_credit_note_item_dtls[]>(this.url + 'getSalesCreditNoteID/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteIDposting(creditnoteid: string): Observable<sales_credit_note_item_dtls[]> { return this.httpClient.get<sales_credit_note_item_dtls[]>(this.url + 'getSalesCreditNoteIDposting/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  getcreditnotetaxcodes(creditnoteid: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getcreditnotetaxcodes/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getSalesCreditNotePD(creditnoteid: string): Observable<sales_credit_note_payment_dtls> { return this.httpClient.get<sales_credit_note_payment_dtls>(this.url + 'getSalesCreditNotePD/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteSD(creditnoteid: string): Observable<sales_credit_note_shipment_dtls> { return this.httpClient.get<sales_credit_note_shipment_dtls>(this.url + 'getSalesCreditNoteSD/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteTI(creditnoteid: string): Observable<sales_credit_note_tax_info> { return this.httpClient.get<sales_credit_note_tax_info>(this.url + 'getSalesCreditNoteTI/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteTD(creditnoteid: string): Observable<sales_credit_note_trans_dtls[]> { return this.httpClient.get<sales_credit_note_trans_dtls[]>(this.url + 'getSalesCreditNoteTD/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteJobwork(creditnoteid): Observable<any> { return this.httpClient.get<any>(this.url + 'getSalesCreditNoteJobwork/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesCreditNoteJobworkPrice(creditnoteid): Observable<any> { return this.httpClient.get<any>(this.url + 'getSalesCreditNoteJobworkPrice/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retrivePurReturnApprovalNote(id: any): Observable<PurReturnApprovalNote> { return this.httpClient.get<PurReturnApprovalNote>(this.url + 'retrivePurReturnAppNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurReturnApprovalID(purreturnid: string): Observable<pur_return_approval_item_dtls[]> { return this.httpClient.get<pur_return_approval_item_dtls[]>(this.url + 'getPurReturnAppID/' + purreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurReturnApprovalWD(purreturnid: string): Observable<pur_return_approval_weight_dtl> { return this.httpClient.get<pur_return_approval_weight_dtl>(this.url + 'getPurReturnAppWD/' + purreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurReturnApprovalD(purreturnid: string): Observable<pur_return_approval_docs[]> { return this.httpClient.get<pur_return_approval_docs[]>(this.url + 'getPurReturnAppDoc/' + purreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurReturnApprovalSuppD(purreturnid: string): Observable<pur_return_approval_supplier_dtls[]> { return this.httpClient.get<pur_return_approval_supplier_dtls[]>(this.url + 'getPurReturnAppSuppDtls/' + purreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurReturnApprovalSD(purreturnid: string): Observable<pur_return_approval_shipment_dtls> { return this.httpClient.get<pur_return_approval_shipment_dtls>(this.url + 'getPurReturnAppSD/' + purreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurReturnApprovalTI(purreturnid: string): Observable<pur_return_approval_trans_info> { return this.httpClient.get<pur_return_approval_trans_info>(this.url + 'getPurReturnAppTI/' + purreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurReturnApprovalBD(purreturnid: string): Observable<pur_return_approval_broker_dtls[]> { return this.httpClient.get<pur_return_approval_broker_dtls[]>(this.url + 'getPurReturnAppBD/' + purreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retrivePurRtnNote(id: any): Observable<PurReturnNote> { return this.httpClient.get<PurReturnNote>(this.url + 'retrivePurReturnNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurRtnNoteBroDtls(purreturnnoteid: string): Observable<pur_return_note_Broker_Dtls[]> { return this.httpClient.get<pur_return_note_Broker_Dtls[]>(this.url + 'getPurRtnNoteBrokerDtls/' + purreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurRtnNoteDocs(purreturnnoteid: string): Observable<pur_return_note_Docs[]> { return this.httpClient.get<pur_return_note_Docs[]>(this.url + 'getPurRtnNoteDocs/' + purreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurRtnNoteItemDtls(purreturnnoteid: string): Observable<pur_return_note_Item_Dtls[]> { return this.httpClient.get<pur_return_note_Item_Dtls[]>(this.url + 'getPurRtnNoteItemDtls/' + purreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurRtnNoteSuppDtls(purreturnnoteid: string): Observable<pur_return_note_supplier_Dtls[]> { return this.httpClient.get<pur_return_note_supplier_Dtls[]>(this.url + 'getPurRtnNoteSuppDtls/' + purreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurRtnNoteShipDtls(purreturnnoteid: string): Observable<pur_return_note_Shipment_Dtls> { return this.httpClient.get<pur_return_note_Shipment_Dtls>(this.url + 'getPurRtnNoteShipDtls/' + purreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurRtnNoteTransInfo(purreturnnoteid: string): Observable<pur_return_note_Trans_Info> { return this.httpClient.get<pur_return_note_Trans_Info>(this.url + 'getPurRtnNoteTransInfo/' + purreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getPurRtnNoteWeigtmentDtls(purreturnnoteid: string): Observable<pur_return_note_weight_dtl> { return this.httpClient.get<pur_return_note_weight_dtl>(this.url + 'getPurRtnNoteWeDtls/' + purreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  retriveProdPlanning(id: any): Observable<Production_planning> { return this.httpClient.get<Production_planning>(this.url + 'retriveProdPlanning/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdPlanFloorDtls(prod_plan_id: string): Observable<Production_Planning_shop_floor_dtls[]> { return this.httpClient.get<Production_Planning_shop_floor_dtls[]>(this.url + 'getProdPlanFloorDtls/' + prod_plan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdPlanSpecialDtls(prod_plan_id: string): Observable<Production_Planning_Special_Dtls[]> { return this.httpClient.get<Production_Planning_Special_Dtls[]>(this.url + 'getProdPlanSpecialDtls/' + prod_plan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }



  getProdPlanPerDateDtls(prod_plan_id: string, Ppd_Id: string): Observable<periodic_date_details[]> { return this.httpClient.get<periodic_date_details[]>(this.url + 'getProdPlanPerDateDtls/' + prod_plan_id + "/" + Ppd_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdPlanPerDateDtlsShiftNo(prod_plan_id: string, Ppd_Id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getProdPlanPerDateDtlsShiftNo/' + prod_plan_id + "/" + Ppd_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdPlanSplDateDtls(prod_plan_id: string, Pps_Id: string): Observable<Special_date_details[]> { return this.httpClient.get<Special_date_details[]>(this.url + 'getProdPlanSplDateDtls/' + prod_plan_id + "/" + Pps_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveBom(id: any): Observable<Production_master> { return this.httpClient.get<Production_master>(this.url + 'retriveBom/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBomInputDetails(production_id: string): Observable<Bom_Input_Details[]> { return this.httpClient.get<Bom_Input_Details[]>(this.url + 'getBomInputDetails/' + production_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBomInputDetailsNew(production_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getBomInputDetailsNew/' + production_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBomOutputDetails(production_id: string): Observable<Bom_Output_Details[]> { return this.httpClient.get<Bom_Output_Details[]>(this.url + 'getBomOutputDetails/' + production_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getBomResourceCost(production_id: string): Observable<Bom_Resource_Cost[]> { return this.httpClient.get<Bom_Resource_Cost[]>(this.url + 'getBomResourceCost/' + production_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  retriveProdTrans(id: any): Observable<ProductionTransaction> { return this.httpClient.get<ProductionTransaction>(this.url + 'retriveProdTrans/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdTranInputDetails(prod_trans_id: string): Observable<Production_Transaction_Input_Details[]> { return this.httpClient.get<Production_Transaction_Input_Details[]>(this.url + 'getProdTranInputDetails/' + prod_trans_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdTranOutputDetails(prod_trans_id: string): Observable<Production_Transaction_Output_Details[]> { return this.httpClient.get<Production_Transaction_Output_Details[]>(this.url + 'getProdTranOutputDetails/' + prod_trans_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  retriveProdTransSpl(id: any): Observable<ProductionTransactionSpecial> { return this.httpClient.get<ProductionTransactionSpecial>(this.url + 'retriveProdTransSpl/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdTranSplInputDetails(prod_trans_id: string): Observable<Production_Transaction_Spl_Input_Details[]> { return this.httpClient.get<Production_Transaction_Spl_Input_Details[]>(this.url + 'getProdTranSplInputDetails/' + prod_trans_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getProdTranSplOutputDetails(prod_trans_id: string): Observable<Production_Transaction_Spl_Output_Details[]> { return this.httpClient.get<Production_Transaction_Spl_Output_Details[]>(this.url + 'getProdTranSplOutputDetails/' + prod_trans_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  Prodtransaction_spl_Posting(prod_trans_id: string, id): Observable<any> { return this.httpClient.get<any>(this.url + 'Prodtransaction_spl_Posting/' + prod_trans_id + '/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  prodtransaction_spl_Posting_Undo(id, username): Observable<any> { return this.httpClient.get<any>(this.url + 'prodtransaction_spl_Posting_Undo/' + id + '/' + username).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  // sales InV
  retriveSalesInv(id: any): Observable<SalesInvoice> { return this.httpClient.get<SalesInvoice>(this.url + 'retriveSalesInv/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvItmDtls(invoice_id: string): Observable<sales_Invoice_Item_Dtls[]> { return this.httpClient.get<sales_Invoice_Item_Dtls[]>(this.url + 'getSalesInvItmDtls/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvItmDtlswtAltName(invoice_id): Observable<any> { return this.httpClient.get(this.url + 'getSalesInvItmDtlswtAltName/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  retriveinvoicejobworkprice(invoice_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'retriveinvoicejobworkprice/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }



  getSalesInvItmDtls1(invoice_id: string): Observable<sales_Invoice_Item_Dtls[]> { return this.httpClient.get<sales_Invoice_Item_Dtls[]>(this.url + 'getSalesInvItmDtls1/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvTaxInfo(invoice_id: string): Observable<sales_invoice_tax_info> { return this.httpClient.get<sales_invoice_tax_info>(this.url + 'getSalesInvTaxInfo/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvBrkDtls(invoice_id: string): Observable<sales_invoice_Broker_Dtls[]> { return this.httpClient.get<sales_invoice_Broker_Dtls[]>(this.url + 'getSalesInvBrkDtls/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvBpDtls(invoice_id: string): Observable<sales_invoice_bp_dtls> { return this.httpClient.get<sales_invoice_bp_dtls>(this.url + 'getSalesInvBpDtls/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvDocs(invoice_id: string): Observable<sales_Invoice_Docs[]> { return this.httpClient.get<sales_Invoice_Docs[]>(this.url + 'getSalesInvDocs/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvTransDtls(invoice_id: string): Observable<sales_Invoice_Trans_Dtls[]> { return this.httpClient.get<sales_Invoice_Trans_Dtls[]>(this.url + 'getSalesTransDtls/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvShipmentDtls(invoice_id: string): Observable<sales_Invoice_Shipment_Dtls> { return this.httpClient.get<sales_Invoice_Shipment_Dtls>(this.url + 'getSalesShipDtls/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getSalesInvPaymentDtls(invoice_id: string): Observable<sales_Invoice_Payment_Dtls> { return this.httpClient.get<sales_Invoice_Payment_Dtls>(this.url + 'getSalesPayDtls/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getInvTaxSum(invoice_id: string): Observable<Item_Groupwise_taxsumm[]> { return this.httpClient.get<Item_Groupwise_taxsumm[]>(this.url + 'getInvTaxSum?invid=' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getInvHsnSum(invoice_id: string): Observable<Item_Groupwise_Hsnsumm[]> { return this.httpClient.get<Item_Groupwise_Hsnsumm[]>(this.url + 'getInvHsnSum?invid=' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStkTransSalesInvByIdprint(id: any): Observable<any> { return this.httpClient.get<any>(this.url + 'getStkTransSalesInvByIdprint/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //Update Sercive End
  //stk_pur_inv retrive start

  stkPurInvRetriveList(id: any): Observable<any> { return this.httpClient.get<any>(this.url + 'stkPurInvRetriveList/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  stkPurInvItemRetriveList(invoice_id): Observable<any> { return this.httpClient.get<any>(this.url + 'stkPurInvItemRetriveList/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  stkPurInvMusterRollRetriveList(invoice_id): Observable<any> { return this.httpClient.get<any>(this.url + 'stkPurInvMusterRollRetriveList/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  stkPurInvTaxInfoRetriveList(invoice_id): Observable<any> { return this.httpClient.get<any>(this.url + 'stkPurInvTaxInfoRetriveList/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  stkPurInvBuRetriveList(invoice_id): Observable<any> { return this.httpClient.get<any>(this.url + 'stkPurInvBuRetriveList/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  stkPurInvDocsRetriveList(invoice_id): Observable<any> { return this.httpClient.get<any>(this.url + 'stkPurInvDocsRetriveList/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }


  //stk_pur_inv retrive ends

  getStockSaleInvHsnSum(stk_sales_inv_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getStockSaleInvHsnSum/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getStockSaleInvTaxSum(stk_sales_inv_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getStockSaleInvTaxSum/' + stk_sales_inv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  getstockrecivingbuunit(id): Observable<any> { return this.httpClient.get<any>(this.url + 'getstockrecivingbuunit/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  //Role master
  getRoles(): Observable<RoleMaster[]> { return this.httpClient.get<RoleMaster[]>(this.url + 'getRoles/').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
  public createRole(RoleMaster): Observable<RoleMaster> {
    //alert();
    return this.httpClient.post<RoleMaster>(this.url + "createRole", RoleMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public replaceAllSpl(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}&()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      //     // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message

    return throwError("Somtning Bad happened . Please Try Again");
  }


  public creategatepasschecklist(GatepassChecklist): Observable<GatepassChecklist> {
    //alert();
    return this.httpClient.post<GatepassChecklist>(this.url + "creategatepasschecklist", GatepassChecklist).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public creategatepassGetin(formdata: FormData): Observable<GatepassGetin> {
    //alert();
    return this.httpClient.post<GatepassGetin>(this.url + "creategatepassGetin", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updategatepassGetin(formdata: FormData): Observable<GatepassGetin> {
    //alert();
    return this.httpClient.post<GatepassGetin>(this.url + "updategatepassGetin", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  public creategatepassGetouta(GatepassGateoutAuthorization): Observable<GatepassGateoutAuthorization> {
    //alert();
    return this.httpClient.post<GatepassGateoutAuthorization>(this.url + "creategatepassGetouta", GatepassGateoutAuthorization).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updategatepassGetouta(GatepassGateoutAuthorization, id): Observable<GatepassGateoutAuthorization> {
    return this.httpClient.put<GatepassGateoutAuthorization>(this.url + "updategatepassGetouta/" + id, GatepassGateoutAuthorization).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public creategatepassGetout(GatepassGateout): Observable<GatepassGateout> {
    //alert();
    return this.httpClient.post<GatepassGateout>(this.url + "creategatepassGetout", GatepassGateout).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }



  public updategatepassCheckList(GatepassChecklist, id): Observable<GatepassChecklist> {
    return this.httpClient.put<GatepassChecklist>(this.url + 'updategatepassCheckList/' + id, GatepassChecklist).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  deleteGatePassCheckList(GatepassChecklist, id): Observable<any> { return this.httpClient.put<GatepassChecklist>(this.url + 'deleteGatePassCheckList/' + id, GatepassChecklist).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })); }

  //Visitor master start
  public createVisitorMaster(formdata: FormData): Observable<Visitor> {
    //alert();
    return this.httpClient.post<Visitor>(this.url + "createVisitorMaster", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateVisitorMaster(formdata: FormData): Observable<Visitor> {

    return this.httpClient.post<Visitor>(this.url + "updateVisitorMaster", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteVisitorMaster(Visitor, id): Observable<Visitor> {
    return this.httpClient.put<Visitor>(this.url + 'deleteVisitorMaster/' + id, Visitor).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Visitor Master ends

  //report starts
  public createpowercut(PowerCutReport): Observable<PowerCutReport> {
    //alert();
    return this.httpClient.post<PowerCutReport>(this.url + "createpowercut", PowerCutReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatepowercut(PowerCutReport, id): Observable<PowerCutReport> {
    return this.httpClient.put<PowerCutReport>(this.url + 'updatepowercut/' + id, PowerCutReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletePowerCutReport(PowerCutReport, id): Observable<PowerCutReport> {
    return this.httpClient.put<PowerCutReport>(this.url + 'deletePowerCutReport/' + id, PowerCutReport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //report ends

  // daily report starts here 
  public createdailystockfinishedgoods(Dailystockfinishgood): Observable<Dailystockfinishgood> {
    //alert();
    return this.httpClient.post<Dailystockfinishgood>(this.url + "createdailystockfinishedgoods", Dailystockfinishgood).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatedailystockfinishedgoods(Dailystockfinishgood, id): Observable<Dailystockfinishgood> {
    return this.httpClient.put<Dailystockfinishgood>(this.url + 'updatedailystockfinishedgoods/' + id, Dailystockfinishgood).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletedailystockfinishedgoods(Dailystockfinishgood, id): Observable<Dailystockfinishgood> {
    return this.httpClient.put<Dailystockfinishgood>(this.url + 'deletedailystockfinishedgoods/' + id, Dailystockfinishgood).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //daily report ends here 


  public createdailypowerreport(Dailypowerreport): Observable<Dailypowerreport> {
    return this.httpClient.post<Dailypowerreport>(this.url + "createdailypowerreport", Dailypowerreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatedailypowerreport(Dailypowerreport, id): Observable<Dailypowerreport> {
    return this.httpClient.put<Dailypowerreport>(this.url + 'updatedailypowerreport/' + id, Dailypowerreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public deletedailypowerreport(Dailypowerreport, id): Observable<Dailypowerreport> {
    return this.httpClient.put<Dailypowerreport>(this.url + 'deletedailypowerreport/' + id, Dailypowerreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createdieselusedimport(Dieselusedimport): Observable<Dieselusedimport> {
    return this.httpClient.post<Dieselusedimport>(this.url + "createdieselusedimport", Dieselusedimport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatedieselusedimport(Dieselusedimport, id): Observable<Dieselusedimport> {
    return this.httpClient.put<Dieselusedimport>(this.url + 'updatedieselusedimport/' + id, Dieselusedimport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletedieselusedimport(Dieselusedimport, id): Observable<Dieselusedimport> {
    return this.httpClient.put<Dieselusedimport>(this.url + 'deletedieselusedimport/' + id, Dieselusedimport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public creategrnregisterreport(Grnregisterreport): Observable<Grnregisterreport> {
    return this.httpClient.post<Grnregisterreport>(this.url + "creategrnregisterreport", Grnregisterreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updategrnregisterreport(Grnregisterreport, id): Observable<Grnregisterreport> {
    return this.httpClient.put<Grnregisterreport>(this.url + 'updategrnregisterreport/' + id, Grnregisterreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletegrnReport(Grnregisterreport, id): Observable<Grnregisterreport> {
    return this.httpClient.put<Grnregisterreport>(this.url + 'deletegrnReport/' + id, Grnregisterreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createwheatreceiving(Wheatreceiving): Observable<Wheatreceiving> {
    //alert();
    return this.httpClient.post<Wheatreceiving>(this.url + "createwheatreceiving", Wheatreceiving).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatewheatreceiving(Wheatreceiving, id): Observable<Wheatreceiving> {
    return this.httpClient.put<Wheatreceiving>(this.url + 'updatewheatreceiving/' + id, Wheatreceiving).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletewheatreceiving(Wheatreceiving, id): Observable<Wheatreceiving> {
    return this.httpClient.put<Wheatreceiving>(this.url + 'deletewheatreceiving/' + id, Wheatreceiving).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createwheatstackcard(Wheatstackcardreport): Observable<Wheatstackcardreport> {
    //alert();
    return this.httpClient.post<Wheatstackcardreport>(this.url + "createwheatstackcard", Wheatstackcardreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatewheatstackcard(Wheatstackcardreport, id): Observable<Wheatstackcardreport> {
    return this.httpClient.put<Wheatstackcardreport>(this.url + 'updatewheatstackcard/' + id, Wheatstackcardreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletewheatstackcard(Wheatstackcardreport, id): Observable<Wheatstackcardreport> {
    return this.httpClient.put<Wheatstackcardreport>(this.url + 'deletewheatstackcard/' + id, Wheatstackcardreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createGodownMaster(GodownMaster): Observable<GodownMaster> {
    //alert();
    return this.httpClient.post<GodownMaster>(this.url + "createGodownMaster", GodownMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateGodownMaster(GodownMaster, id): Observable<GodownMaster> {
    return this.httpClient.put<GodownMaster>(this.url + 'updateGodownMaster/' + id, GodownMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteGodownMaster(GodownMaster, id): Observable<GodownMaster> {
    return this.httpClient.put<GodownMaster>(this.url + 'deleteGodownMaster/' + id, GodownMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createHubMaster(HubMaster): Observable<HubMaster> {
    //alert();
    return this.httpClient.post<HubMaster>(this.url + "createHubMaster", HubMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateHubMaster(HubMaster, id): Observable<HubMaster> {
    return this.httpClient.put<HubMaster>(this.url + 'updateHubMaster/' + id, HubMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteHubMaster(HubMaster, id): Observable<HubMaster> {
    return this.httpClient.put<HubMaster>(this.url + 'deleteHubMaster/' + id, HubMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createGateinout(Gateinoutregister): Observable<Gateinoutregister> {
    return this.httpClient.post<Gateinoutregister>(this.url + "createGateinout", Gateinoutregister).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateGateinout(Gateinoutregister, id): Observable<Gateinoutregister> {
    return this.httpClient.put<Gateinoutregister>(this.url + 'updateGateinout/' + id, Gateinoutregister).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteGateinout(Gateinoutregister, id): Observable<Gateinoutregister> {
    return this.httpClient.put<Gateinoutregister>(this.url + 'deleteGateinout/' + id, Gateinoutregister).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createGatepassRegister(Gatepassregister): Observable<Gatepassregister> {
    return this.httpClient.post<Gatepassregister>(this.url + "createGatepassRegister", Gatepassregister).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateGatepassRegister(Gatepassregister, id): Observable<Gatepassregister> {
    return this.httpClient.put<Gatepassregister>(this.url + 'updateGatepassRegister/' + id, Gatepassregister).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteGatePassRegister(Gatepassregister, id): Observable<Gatepassregister> {
    return this.httpClient.put<Gatepassregister>(this.url + 'deleteGatePassRegister/' + id, Gatepassregister).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createdailyProduction(Dailyproduction): Observable<Dailyproduction> {
    return this.httpClient.post<Dailyproduction>(this.url + "createdailyProduction", Dailyproduction).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatedailyProduction(Dailyproduction, id): Observable<Dailyproduction> {
    return this.httpClient.put<Dailyproduction>(this.url + 'updatedailyProduction/' + id, Dailyproduction).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteDailyProduction(Dailyproduction, id): Observable<Dailyproduction> {
    return this.httpClient.put<Dailyproduction>(this.url + 'deleteDailyProduction/' + id, Dailyproduction).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createLabReport(Misclabreportfg): Observable<Misclabreportfg> {
    return this.httpClient.post<Misclabreportfg>(this.url + "createLabReport", Misclabreportfg).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateLabReport(Misclabreportfg, id): Observable<Misclabreportfg> {
    return this.httpClient.put<Misclabreportfg>(this.url + 'updateLabReport/' + id, Misclabreportfg).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteLabReport(Misclabreportfg, id): Observable<Misclabreportfg> {
    return this.httpClient.put<Misclabreportfg>(this.url + 'deleteLabReport/' + id, Misclabreportfg).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createGranulation(Granulationreport): Observable<Granulationreport> {
    return this.httpClient.post<Granulationreport>(this.url + "createGranulation", Granulationreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateGranulation(Granulationreport, id): Observable<Granulationreport> {
    return this.httpClient.put<Granulationreport>(this.url + 'updateGranulation/' + id, Granulationreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteGranulation(Granulationreport, id): Observable<Granulationreport> {
    return this.httpClient.put<Granulationreport>(this.url + 'deleteGranulation/' + id, Granulationreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSeives(SeivesMaster): Observable<SeivesMaster> {
    return this.httpClient.post<SeivesMaster>(this.url + "createSeives", SeivesMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSeives(SeivesMaster, id): Observable<SeivesMaster> {
    return this.httpClient.put<SeivesMaster>(this.url + 'updateSeives/' + id, SeivesMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteSeives(SeivesMaster, id): Observable<SeivesMaster> {
    return this.httpClient.put<SeivesMaster>(this.url + 'deleteSeives/' + id, SeivesMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createOtherParameter(Otherparameterreport): Observable<Otherparameterreport> {
    return this.httpClient.post<Otherparameterreport>(this.url + "createOtherParameter", Otherparameterreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateOtherParameter(Otherparameterreport, id): Observable<Otherparameterreport> {
    return this.httpClient.put<Otherparameterreport>(this.url + 'updateOtherParameter/' + id, Otherparameterreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteOtherParameter(Otherparameterreport, id): Observable<Otherparameterreport> {
    return this.httpClient.put<Otherparameterreport>(this.url + 'deleteOtherParameter/' + id, Otherparameterreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createBinGroup(Bingroup): Observable<Bingroup> {
    return this.httpClient.post<Bingroup>(this.url + "createBinGroup", Bingroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateBinGroup(Bingroup, id): Observable<Bingroup> {
    return this.httpClient.put<Bingroup>(this.url + 'updateBinGroup/' + id, Bingroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteBinGroup(Bingroup, id): Observable<Bingroup> {
    return this.httpClient.put<Bingroup>(this.url + 'deleteBinGroup/' + id, Bingroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createbinreport(Binreport): Observable<Binreport> {
    return this.httpClient.post<Binreport>(this.url + "createbinreport", Binreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updatebinreport(Binreport, id): Observable<Binreport> {
    return this.httpClient.put<Binreport>(this.url + 'updatebinreport/' + id, Binreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deletebinreport(Binreport, id): Observable<Binreport> {
    return this.httpClient.put<Binreport>(this.url + 'deletebinreport/' + id, Binreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public createMillBreakdown(Millbreakdownreport): Observable<Millbreakdownreport> {
    return this.httpClient.post<Millbreakdownreport>(this.url + "createMillBreakdown", Millbreakdownreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateMillBreakdown(Millbreakdownreport, id): Observable<Millbreakdownreport> {
    return this.httpClient.put<Millbreakdownreport>(this.url + 'updateMillBreakdown/' + id, Millbreakdownreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteMillBreakdown(Millbreakdownreport, id): Observable<Millbreakdownreport> {
    return this.httpClient.put<Millbreakdownreport>(this.url + 'deleteMillBreakdown/' + id, Millbreakdownreport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createWeigherReading(Weigherreding): Observable<Weigherreding> {
    return this.httpClient.post<Weigherreding>(this.url + "createWeigherReading", Weigherreding).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateWeigherReading(Weigherreding, id): Observable<Weigherreding> {
    return this.httpClient.put<Weigherreding>(this.url + 'updateWeigherReading/' + id, Weigherreding).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteWeigherReading(Weigherreding, id): Observable<Weigherreding> {
    return this.httpClient.put<Weigherreding>(this.url + 'deleteWeigherReading/' + id, Weigherreding).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createrequisition(Requisition): Observable<Requisition> {
    return this.httpClient.post<Requisition>(this.url + "createrequisition", Requisition).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updaterequisition(Requisition, id): Observable<Requisition> {
    return this.httpClient.put<Requisition>(this.url + 'updaterequisition/' + id, Requisition).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }



  public createFloorAccess(ShopFloorAccess): Observable<ShopFloorAccess> {
    return this.httpClient.post<ShopFloorAccess>(this.url + "createFloorAccess", ShopFloorAccess).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateFloorAccess(ShopFloorAccess, id): Observable<ShopFloorAccess> {
    return this.httpClient.put<ShopFloorAccess>(this.url + 'updateFloorAccess/' + id, ShopFloorAccess).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteFloorAccess(ShopFloorAccess, id): Observable<ShopFloorAccess> {
    return this.httpClient.put<ShopFloorAccess>(this.url + 'deleteFloorAccess/' + id, ShopFloorAccess).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public setreject(Requisition, id): Observable<Requisition> {
    return this.httpClient.put<Requisition>(this.url + 'setreject/' + id, Requisition).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public deleteRequisition(Requisition, id): Observable<Requisition> {
    return this.httpClient.put<Requisition>(this.url + 'deleteRequisition/' + id, Requisition).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createIssueStock(Issuestock): Observable<Issuestock> {
    return this.httpClient.post<Issuestock>(this.url + "createIssueStock", Issuestock).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateIssueStock(Issuestock, id): Observable<Issuestock> {
    return this.httpClient.put<Issuestock>(this.url + 'updateIssueStock/' + id, Issuestock).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteIssueStock(Issuestock, id): Observable<Issuestock> {
    return this.httpClient.put<Issuestock>(this.url + 'deleteIssueStock/' + id, Issuestock).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Rate Chart
  public createRateChart(Ratechart): Observable<any> {
    return this.httpClient.post<any>(this.url + 'createRateChart', Ratechart).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveRateChart(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveRateChart/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  rateRetriveList(rate_code: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'rateRetriveList/' + rate_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  public updateRateChart(Ratechart, id): Observable<Ratechart> {
    return this.httpClient.put<Ratechart>(this.url + 'updateRateChart/' + id, Ratechart).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public DeleteRateChart(Ratechart, id): Observable<Ratechart> {
    return this.httpClient.put<Ratechart>(this.url + 'DeleteRateChart/' + id, Ratechart).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // Service Master
  public createServiceMaster(Servicemaster): Observable<Servicemaster> {
    return this.httpClient.post<Servicemaster>(this.url + 'createServiceMaster', Servicemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveServiceMaster(id: any): Observable<Servicemaster> {
    return this.httpClient.get<Servicemaster>(this.url + 'retriveServiceMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  serviceMasterRetriveList(service_no: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'serviceMasterRetriveList/' + service_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  public updateServiceMaster(Servicemaster, id): Observable<Servicemaster> {
    return this.httpClient.put<Servicemaster>(this.url + 'updateServiceMaster/' + id, Servicemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public DeleteService(Servicemaster, id): Observable<Servicemaster> {
    return this.httpClient.put<Servicemaster>(this.url + 'DeleteService/' + id, Servicemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // Non Goods Type Master
  public createNonGoodsTypeMaster(Nongoodstypemaster): Observable<Nongoodstypemaster> {
    return this.httpClient.post<Nongoodstypemaster>(this.url + 'createNonGoodsTypeMaster', Nongoodstypemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveNonGoodsTypeMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNonGoodsTypeMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateNonGoodsTypeMaster(Nongoodstypemaster, id): Observable<Nongoodstypemaster> {
    return this.httpClient.put<Nongoodstypemaster>(this.url + 'updateNonGoodsTypeMaster/' + id, Nongoodstypemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteNonGoodsTypeMaster(Nongoodstypemaster, id): Observable<Nongoodstypemaster> {
    return this.httpClient.put<Nongoodstypemaster>(this.url + 'deleteNonGoodsTypeMaster/' + id, Nongoodstypemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // Exit Clause Master
  public createExitClauseMaster(Exitclausemaster): Observable<Exitclausemaster> {
    return this.httpClient.post<Exitclausemaster>(this.url + 'createExitClauseMaster', Exitclausemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveExitClauseMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveExitClauseMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateExitClauseMaster(Exitclausemaster, id): Observable<Exitclausemaster> {
    return this.httpClient.put<Exitclausemaster>(this.url + 'updateExitClauseMaster/' + id, Exitclausemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteExitClauseMaster(Exitclausemaster, id): Observable<Exitclausemaster> {
    return this.httpClient.put<Exitclausemaster>(this.url + 'deleteExitClauseMaster/' + id, Exitclausemaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // Term as Service
  public createTermasService(Termasservice): Observable<Termasservice> {
    return this.httpClient.post<Termasservice>(this.url + 'createTermasService', Termasservice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveTermasService(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveTermasService/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTermasService(Termasservice, id): Observable<Termasservice> {
    return this.httpClient.put<Termasservice>(this.url + 'updateTermasService/' + id, Termasservice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteTermasService(Termasservice, id): Observable<Termasservice> {
    return this.httpClient.put<Termasservice>(this.url + 'deleteTermasService/' + id, Termasservice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createWheatAcceptance(Wheatacceptance): Observable<Wheatacceptance> {
    return this.httpClient.post<Wheatacceptance>(this.url + "createWheatAcceptance", Wheatacceptance).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateWheatAcceptance(Wheatacceptance, id): Observable<Wheatacceptance> {
    return this.httpClient.put<Wheatacceptance>(this.url + 'updateWheatAcceptance/' + id, Wheatacceptance).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteWheatAcceptance(Wheatacceptance, id): Observable<Wheatacceptance> {
    return this.httpClient.put<Wheatacceptance>(this.url + 'deleteWheatAcceptance/' + id, Wheatacceptance).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public createnongoodservice(nongoodsservice): Observable<nongoodsservice> {
    return this.httpClient.post<nongoodsservice>(this.url + "createnongoodservice", nongoodsservice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateNongoodservice(nongoodsservice, id): Observable<nongoodsservice> {
    return this.httpClient.put<nongoodsservice>(this.url + 'updateNongoodservice/' + id, nongoodsservice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteNonGoodsService(nongoodsservice, id): Observable<nongoodsservice> {
    return this.httpClient.put<nongoodsservice>(this.url + 'deleteNonGoodsService/' + id, nongoodsservice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createnongoodsrn(nongoodssrn): Observable<nongoodssrn> {
    return this.httpClient.post<nongoodssrn>(this.url + "createnongoodsrn", nongoodssrn).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public updateNongoodsrn(nongoodssrn, id): Observable<nongoodssrn> {
    return this.httpClient.put<nongoodssrn>(this.url + 'updateNongoodsrn/' + id, nongoodssrn).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteNongoodsrn(nongoodssrn, id): Observable<nongoodssrn> {
    return this.httpClient.put<nongoodssrn>(this.url + 'deleteNongoodsrn/' + id, nongoodssrn).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSalesTransport(salestransport): Observable<salestransport> {
    return this.httpClient.post<salestransport>(this.url + "createSalesTransport", salestransport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSalesTransport(salestransport, id): Observable<salestransport> {
    return this.httpClient.put<salestransport>(this.url + 'updateSalesTransport/' + id, salestransport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteSalesTransport(salestransport, id,reason): Observable<salestransport> {
    return this.httpClient.put<salestransport>(this.url + 'deleteSalesTransport/'+id+'/'+reason,salestransport).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  public createAccGroups(Accounts_group_master): Observable<Accounts_group_master> {
    return this.httpClient.post<Accounts_group_master>(this.url + "createAccGroups", Accounts_group_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public updateAccGroups(Accounts_group_master, id): Observable<Accounts_group_master> {
    return this.httpClient.put<Accounts_group_master>(this.url + 'updateAccGroups/' + id, Accounts_group_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public deleteAccGrpMaster(Accounts_group_master, id): Observable<Accounts_group_master> {
    return this.httpClient.put<Accounts_group_master>(this.url + 'deleteAccGrpMaster/' + id, Accounts_group_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // Accounts Master
  public createAccountstype(Accounts_type_master): Observable<Accounts_type_master> {
    return this.httpClient.post<Accounts_type_master>(this.url + "createAccountstype", Accounts_type_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public deleteaccountstype(Accounts_type_master, id): Observable<Accounts_type_master> {
    return this.httpClient.put<Accounts_type_master>(this.url + 'deleteaccountstype/' + id, Accounts_type_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //Accounts Catagory
  public createAccCatagory(Accounts_category_master): Observable<Accounts_category_master> {
    return this.httpClient.post<Accounts_category_master>(this.url + "createAccCatagory", Accounts_category_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  updateAccCatagory(Accounts_category_master, id): Observable<Accounts_category_master> {
    return this.httpClient.put<Accounts_category_master>(this.url + 'updateAccCatagory/' + id, Accounts_category_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteAccCatagoryMaster(Accounts_category_master, id): Observable<Accounts_category_master> {
    return this.httpClient.put<Accounts_category_master>(this.url + 'deleteAccCatagoryMaster/' + id, Accounts_category_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Account Ledger 
  public createAccLedger(Accounts_ledger_master): Observable<Accounts_ledger_master> {
    return this.httpClient.post<Accounts_ledger_master>(this.url + "createAccLedger", Accounts_ledger_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  updateAccLedger(Accounts_ledger_master, id): Observable<Accounts_ledger_master> {
    return this.httpClient.put<Accounts_ledger_master>(this.url + 'updateAccLedger/' + id, Accounts_ledger_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteAccLedger(Accounts_ledger_master, id): Observable<Accounts_ledger_master> {
    return this.httpClient.put<Accounts_ledger_master>(this.url + 'deleteAccLedger/' + id, Accounts_ledger_master).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //Item Stock
  public createItemStock(itemStock): Observable<itemStock> {
    return this.httpClient.post<itemStock>(this.url + "createItemStock", itemStock).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  updateItemStock(itemStock, id): Observable<itemStock> {
    return this.httpClient.put<itemStock>(this.url + 'updateItemStock/' + id, itemStock).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createDailyweigher(Dailyweigher): Observable<Dailyweigher> {
    return this.httpClient.post<Dailyweigher>(this.url + "createDailyweigher", Dailyweigher).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public updateDailyweigher(Dailyweigher, id): Observable<Dailyweigher> {
    return this.httpClient.put<Dailyweigher>(this.url + 'updateDailyweigher/' + id, Dailyweigher).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveDailyweigher(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveDailyweigher/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveDailyweigherDetails(dwg_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveDailyweigherDetails/' + dwg_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  public deleteDailyweigher(Dailyweigher, id): Observable<Dailyweigher> {
    return this.httpClient.put<Dailyweigher>(this.url + 'deleteDailyweigher/' + id, Dailyweigher).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  public createSolarPowerGeneration(Solarpower): Observable<Solarpower> {
    return this.httpClient.post<Solarpower>(this.url + "createSolarPowerGeneration", Solarpower).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSolarPowerGeneration(Solarpower, id): Observable<Solarpower> {
    return this.httpClient.put<Solarpower>(this.url + 'updateSolarPowerGeneration/' + id, Solarpower).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteSolarPowerGeneration(Solarpower, id): Observable<Solarpower> {
    return this.httpClient.put<Solarpower>(this.url + 'deleteSolarPowerGeneration/' + id, Solarpower).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createSolarPowerCut(solarpowergenerationwithpowercut): Observable<solarpowergenerationwithpowercut> {
    return this.httpClient.post<solarpowergenerationwithpowercut>(this.url + "createSolarPowerCut", solarpowergenerationwithpowercut).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateSolarPowerCut(solarpowergenerationwithpowercut, id): Observable<solarpowergenerationwithpowercut> {
    return this.httpClient.put<solarpowergenerationwithpowercut>(this.url + 'updateSolarPowerCut/' + id, solarpowergenerationwithpowercut).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteSolarPowerCut(solarpowergenerationwithpowercut, id): Observable<solarpowergenerationwithpowercut> {
    return this.httpClient.put<solarpowergenerationwithpowercut>(this.url + 'deleteSolarPowerCut/' + id, solarpowergenerationwithpowercut).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public uploadstatemasterexcel(formdata: FormData): Observable<any> {
    return this.httpClient.post<any>(this.url + "uploadstatemasterexcel", formdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createItemServiceMaster(ItemServiceMaster): Observable<ItemServiceMaster> {
    return this.httpClient.post<ItemServiceMaster>(this.url + "createItemServiceMaster", ItemServiceMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateItemServiceMaster(ItemServiceMaster, id): Observable<ItemServiceMaster> {
    return this.httpClient.put<ItemServiceMaster>(this.url + 'updateItemServiceMaster/' + id, ItemServiceMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteItemService(ItemServiceMaster, id): Observable<ItemServiceMaster> {
    return this.httpClient.put<ItemServiceMaster>(this.url + 'deleteItemService/' + id, ItemServiceMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createOtherPartyMaster(OtherPartyMaster): Observable<OtherPartyMaster> {
    return this.httpClient.post<OtherPartyMaster>(this.url + "createOtherPartyMaster", OtherPartyMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateOtherPartyMaster(OtherPartyMaster, id): Observable<OtherPartyMaster> {
    return this.httpClient.put<OtherPartyMaster>(this.url + 'updateOtherPartyMaster/' + id, OtherPartyMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteOtherPartyMaster(OtherPartyMaster, id): Observable<OtherPartyMaster> {
    return this.httpClient.put<OtherPartyMaster>(this.url + 'deleteOtherPartyMaster/' + id, OtherPartyMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createOtherItemMaster(OtherItemMaster): Observable<OtherItemMaster> {
    return this.httpClient.post<OtherItemMaster>(this.url + "createOtherItemMaster", OtherItemMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateOtherItemMaster(OtherItemMaster, id): Observable<OtherItemMaster> {
    return this.httpClient.put<OtherItemMaster>(this.url + 'updateOtherItemMaster/' + id, OtherItemMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteOtherItemMaster(OtherItemMaster, id): Observable<OtherItemMaster> {
    return this.httpClient.put<OtherItemMaster>(this.url + 'deleteOtherItemMaster/' + id, OtherItemMaster).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteSalesQuotation(Sales_Quotation, id): Observable<any> {
    return this.httpClient.put<Sales_Quotation>(this.url + 'deleteSalesQuotation/' + id, Sales_Quotation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  //JobWork Item Allocation

  public createJobItemAllocation(JobWorkItemAllocation): Observable<any> {
    return this.httpClient.post<any>(this.url + 'createJobItemAllocation', JobWorkItemAllocation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveJobItemAllocation(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveJobItemAllocation/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  public updateJobItemAllocation(JobWorkItemAllocation, id): Observable<JobWorkItemAllocation> {
    return this.httpClient.put<JobWorkItemAllocation>(this.url + 'updateJobItemAllocation/' + id, JobWorkItemAllocation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public DeleteJobItemAllocation(JobWorkItemAllocation, id): Observable<JobWorkItemAllocation> {
    return this.httpClient.put<JobWorkItemAllocation>(this.url + 'DeleteJobItemAllocation/' + id, JobWorkItemAllocation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createProdsummary(prodsummary): Observable<prodsummary> {
    return this.httpClient.post<prodsummary>(this.url + "createProdsummary", prodsummary).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateProdSummary(prodsummary, id): Observable<prodsummary> {
    return this.httpClient.put<prodsummary>(this.url + 'updateProdSummary/' + id, prodsummary).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteProdSummary(prodsummary, id): Observable<prodsummary> {
    return this.httpClient.put<prodsummary>(this.url + 'deleteProdSummary/' + id, prodsummary).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createTaskAllocation(TaskAllocation): Observable<TaskAllocation> {
    return this.httpClient.post<TaskAllocation>(this.url + "createTaskAllocation", TaskAllocation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTaskAllocation(TaskAllocation, id): Observable<TaskAllocation> {
    return this.httpClient.put<TaskAllocation>(this.url + 'updateTaskAllocation/' + id, TaskAllocation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteTaskAllocation(TaskAllocation, id): Observable<TaskAllocation> {
    return this.httpClient.put<TaskAllocation>(this.url + 'deleteTaskAllocation/' + id, TaskAllocation).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  // Task Progress

  public createTaskProgress(TaskProgress): Observable<TaskProgress> {
    return this.httpClient.post<TaskProgress>(this.url + "createTaskProgress", TaskProgress).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateTaskProgress(TaskProgress, id): Observable<TaskProgress> {
    return this.httpClient.put<TaskProgress>(this.url + 'updateTaskProgress/' + id, TaskProgress).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteTaskProgress(TaskProgress, id): Observable<TaskProgress> {
    return this.httpClient.put<TaskProgress>(this.url + 'deleteTaskProgress/' + id, TaskProgress).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public createJobItemTagMaster(JW_Grn_ItemTagging): Observable<JW_Grn_ItemTagging> {
    return this.httpClient.post<JW_Grn_ItemTagging>(this.url + "createJobItemTagMaster", JW_Grn_ItemTagging).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateJobItemTagMaster(JW_Grn_ItemTagging, id): Observable<JW_Grn_ItemTagging> {
    return this.httpClient.put<JW_Grn_ItemTagging>(this.url + 'updateJobItemTagMaster/' + id, JW_Grn_ItemTagging).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public DeleteJobItemTagMaster(JW_Grn_ItemTagging, id): Observable<JW_Grn_ItemTagging> {
    return this.httpClient.put<JW_Grn_ItemTagging>(this.url + 'DeleteJobItemTagMaster/' + id, JW_Grn_ItemTagging).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  purOrdItemwtHSNRetriveList(pur_order_no: string): Observable<any> { 
    return this.httpClient.get<any>(this.url + 'purOrdItemwtHSNRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }
    
  public createStoreIssueNote(StoreIssueNote): Observable<StoreIssueNote> {
    return this.httpClient.post<StoreIssueNote>(this.url + "createStoreIssueNote", StoreIssueNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public updateStoreIssueNote(StoreIssueNote, id): Observable<StoreIssueNote> {
    return this.httpClient.put<StoreIssueNote>(this.url + 'updateStoreIssueNote/' + id, StoreIssueNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  public deleteStoreIssueNote(StoreIssueNote, id): Observable<StoreIssueNote> {
    return this.httpClient.put<StoreIssueNote>(this.url + 'deleteStoreIssueNote/' + id, StoreIssueNote).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  
  public createStoreChargeMaster(StoreCharges): Observable<StoreCharges> {
    return this.httpClient.post<StoreCharges>(this.url + "createStoreChargeMaster", StoreCharges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

public updateStoreChargeMaster(StoreCharges, id): Observable<StoreCharges> {
  return this.httpClient.put<StoreCharges>(this.url + 'updateStoreChargeMaster/' + id, StoreCharges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
}

public deleteStoreChargeMaster(StoreCharges, id): Observable<StoreCharges> {
  return this.httpClient.put<StoreCharges>(this.url + 'deleteStoreChargeMaster/' + id, StoreCharges).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
}

/* Stack Maintain Starts */
public createStackMaintain(StackMaintain: StackMaintain): Observable<StackMaintain>{
  return this.httpClient.post<StackMaintain>(this.url + "createStackMaintain", StackMaintain).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
}

public updateStackMaintain(StackMaintain: StackMaintain, id): Observable<StackMaintain>{
  return this.httpClient.put<StackMaintain>(this.url + 'updateStackMaintain/' + id, StackMaintain).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
}

public deleteStackMaintain(StackMaintain, id): Observable<StackMaintain> {
  return this.httpClient.put<StackMaintain>(this.url + 'deleteStackMaintain/' + id, StackMaintain).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
}
/* Stack Maintain Ends */

}