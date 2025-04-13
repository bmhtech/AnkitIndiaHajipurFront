import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { apiconfig } from '../Configuration/ApiConfig';
import {
  SalesInvoice, sales_Invoice_Trans_Dtls, sales_Invoice_Item_Dtls,
  sales_Invoice_Payment_Dtls, sales_invoice_Broker_Dtls, sales_Invoice_Docs,
  sales_invoice_tax_info, sales_invoice_bp_dtls, sales_Invoice_Shipment_Dtls
} from '../Models/SalesTransaction/SalesInvoice';
import {
  uom, dy_taxCode, Item_category, ItemType, ItemMaster, itemModalPopUp,
  item_master_alternative_dtls, Item_master_stat_info, itmItem_master_qc_details,
  Bussiness_Unit, Item_master_pack_mat_tag, Item_master_inv_data1
} from '../Models/ItemModel/ItemMaster';
import { transportcode } from '../Models/InventoryModel/TransportationChgsMatrix';
import { Supplier_group } from '../Models/SupplierModel/Supplier_group';
import { Broker, Broker_master_vdr } from '../Models/BrokerModel/Broker';
import { PurchageEnqDocList, PurchageEnqDocsLists } from '../Models/transaction/PurchaseTransaction/PurchaseEnquiry';
import { Indent, IndentorderDetails } from '../Models/transaction/PurchaseTransaction/IndentOrder';
import { Broker_group } from '../Models/BrokerModel/BrokerGroup';
import { Cust_group } from '../Models/CustomerModel/CustGroup';
import {
  broker_name, Supp_bussiness_partner, Supp_bussiness_partner_delv_froms,
  Supp_bussiness_partner_bill_addr_dyn, Supp_bussiness_partner_addr_dyn,
  Supp_bussiness_partner_addr, Supp_bussiness_partner_acc,
  Supp_bussiness_partner_brokers, Supp_bussiness_partner_stat
} from '../Models/SupplierModel/Supp_bussiness_partner';
import { Transporter_group } from '../Models/SupplierModel/Transporter_group';
import {
  cust_bussiness_partner, Cust_bussiness_partner_brokers,
  Cust_bussiness_partner_acc, Cust_bussiness_partner_addr_dyn,
  Cust_bussiness_partner_delv_to, Cust_bussiness_partner_addr,
  Cust_bussiness_partner_bill_addr_dyn, Cust_bussiness_partner_stat
} from '../Models/CustomerModel/cust_bussiness_partner';
import { screenMaster } from '../Models/InventoryModel/ScreenMaster';
import { Charges } from '../Models/OtherMaster/charges';
import { TaxList, PurIndentDDCList, indentdls } from '../Models/InventoryModel/TaxCode';
import { QcDetails } from '../Models/InventoryModel/QcDetails';
import { SupplierMasterNcList } from '../Models/InventoryModel/supplierMasterNcList';
import { CustomUom } from '../Models/InventoryModel/CustomUom';
import { TDS } from '../Models/InventoryModel/tds';
import {
  PurchaseOrder, pur_bussiness_partner_brokers, Uom, pur_Order_docs,
  accNorms, BPDetails, pur_Order_app_chgs, PurchaseOrderItem,
  purchase, AccNorms, pur_Order_Terms_Con, PO_Trans_Infos
} from '../Models/transaction/PurchaseTransaction/PurchaseOrder';
import { PurchageOrderBrokerList } from '../Models/transaction/PurchaseTransaction/PurchageOrderBrokerList';
import { Item_group_master, Item_group_master_sales_acc, ledger } from '../Models/ItemModel/ItemGrpMaster';
import { purOrderPopup, purOrderPopup_dtls } from '../Models/transaction/PurchaseTransaction/purOrderPopup';
import { charges_details } from '../Models/OtherMaster/charges';
import { grn_unload_code_list, grn_unload_item_list, Vechile_type_Name, unload_code, unload_bp_details } from '../Models/transaction/PurchaseTransaction/grnPopupModal';
import { UnloadWeighmentList } from '../Models/Weightment/unloadWeighmentList';
import { Trans_bussiness_partner_accont, Trans_bussiness_partner, Trans_bussiness_partner_broker } from '../Models/SupplierModel/Trans_bussiness_partner';
import { CompanyBusinessPartnerUnit, companyBusinessUnitDetails } from '../Models/InventoryModel/CompanyBusinessUnit';
import { DriverMasterPopup } from '../Models/Weightment/driver-master-popup';
import { Vehicle } from '../Models/InventoryModel/vehicle';
import { SalesEnq, sales_Enquiry_Item_Dtls, sales_Enquiry_Party_Dtls, SequenceId, Group_name, Status } from '../Models/SalesTransaction/sales-enq';
import {
  Sales_Quotation, sales_Quotation_Item_Dtls, sales_Quotation_Broker_Dtls,
  sales_Quotation_Summary, sales_Quotation_Summary_dyn, sales_Quotation_Trans_Info,
  sales_Quotation_Terms_Con, Sales_Quotation_Party_Dtls, sales_Quotation_Shipment_Dtls
} from '../Models/SalesTransaction/Sales_Quotation';
import { employee_master_list } from '../Models/InventoryModel/employee';
import { wareHouse } from '../Models/InventoryModel/ware-house-master';
import {
  SalesOrder, sales_Order_Item_Dtls, Sales_Order_Party_Dtls, sales_Order_Broker_Dtls,
  sales_Order_Terms_Con, sales_Order_Shipment_Dtls, sales_Order_Trans_Info
} from '../Models/SalesTransaction/SalesOrder';
import { Bin } from '../Models/InventoryModel/Bin';
import {
  LoadingAdvice, Wm_loading_advice_itm_dtls, wm_loading_advice_broker_dtls, Wm_loading_advice_trans_info,
  wm_loading_advice_Party_Dtls, wm_loading_advice_Shipment_Dtls, Wm_loading_advice_driver_dtls, wm_loading_advice_Item_Dtls_for_jobwork
} from '../Models/Weightment/loading-advice';
import {
  UnloadAdvice, Wm_unload_advice_trans_info, Wm_unload_advice_item_dtls,
  Wm_unload_advice_broker_dtls, Wm_unload_advice_driver_dtls, Wm_unload_advice_party_wm,
  Wm_unload_advice_bp_dtls, Wm_unload_advice_doc, wm_unload_advice_app_chgs
} from '../Models/Weightment/unload-advice';
import { Item_type_master } from '../Models/ItemModel/ItemTypeMaster';
import { channel_cust_master } from '../Models/OtherMaster/ChannelCustomerMaster';
import { Enquiry, EnquiryServiceDetails } from '../Models/transaction/PurchaseTransaction/PurchaseEnquiry';

import { Quotation, QuotationDetails, Business_Partner_details, pur_Quotation_docs, pur_Quotation_Broker } from '../Models/transaction/PurchaseTransaction/PurchaseQuotation';

import { reasonMaster } from '../Models/InventoryModel/ReasonMaster';
import {
  DeliveryChallan, delivery_challan_Item_Dtls, delivery_challan_Broker_Dtls,
  delivery_challan_Shipment_Dtls, delivery_challan_Party_Dtls, delivery_challan_Trans_Info,
  delivery_challan_Docs, delivery_challan_weight_dtl, delivery_challan_Item_Dtls_for_jobwork
} from '../Models/SalesTransaction/DeliveryChallan';
import { IndentOrder, IndentorderDetail } from '../Models/StockTransfer/indent-order';
import {
  StockTransferChallan, stk_challan__Item_Dtls, stk_challan__Trans_Info,
  stk_challan_business_unit_Dtls, stk_challan__Shipment_Dtls,
  stk_challan__weight_dtl, stk_challan__Docs
} from '../Models/StockTransfer/stock-transfer-challan';
import { StockTransfer, stock_transfer_Item_Dtls, stock_transfer_Trans_Info } from '../Models/StockTransfer/stock-transfer';
import { Qc_rules_setup, qc_rules_setup_dtls } from '../Models/OtherMaster/Qc_rules_setup';
import { UnloadWeightment, Wm_unload_wgmnt_dtls } from '../Models/Weightment/unload-weightment';
import { wm_charges_master } from '../Models/Weightment/wm_charges_master';
import { Item_category_master } from '../Models/ItemModel/ItemCatagoryMaster';
import {
  ReceiptItemDetails, Pur_good_receipt_broker, BusinessPartnerdetails,
  PurchaseGRN, pur_good_receipt_docs, RecieptTransInfo, ReceiptOtherInformation
} from '../Models/transaction/PurchaseTransaction/PurchaseGRN';
import {
  pur_Bill_Broker_Details, PurchaseBill, PurchaseBillItem,
  pur_Bill_MusterRoll_Details, pur_Bill_Tax_Info,
  Pur_Bill_BPDetails, pur_Bill_Account_Info, pur_Bill_docs
} from '../Models/transaction/PurchaseTransaction/purchase-bill';
import {
  ReturnApprovalNote, return_approval_Item_Dtls, return_approval_Trans_Info,
  return_approval_Broker_Dtls, return_approval_Party_Dtls, return_approval_Shipment_Dtls,
  return_approval_weight_dtl, return_approval_Docs, return_approval_Trans_dyn
} from '../Models/SalesTransaction/return-approval-note';
import {
  SalesReturnNote, sales_return_note_Item_Dtls, sales_return_note_Trans_Info,
  sales_return_note_Broker_Dtls, sales_return_note_Party_Dtls, sales_return_note_Shipment_Dtls,
  sales_return_note_weight_dtl, sales_return_note_Docs, sales_return_note_Trans_dyn
} from '../Models/SalesTransaction/sales-return-note';
import { GrnComponent } from '../pages/InventoryTransaction/components/Purchase/components/grn/grn.component';
import {
  PurReturnApprovalNote, pur_return_approval_item_dtls, pur_return_approval_trans_info,
  pur_return_approval_broker_dtls, pur_return_approval_supplier_dtls, pur_return_approval_shipment_dtls,
  pur_return_approval_weight_dtl, pur_return_approval_docs
} from '../Models/transaction/PurchaseTransaction/pur-return-approval-note';
import {
  PurReturnNote, pur_return_note_Item_Dtls, pur_return_note_Trans_Info,
  pur_return_note_Broker_Dtls, pur_return_note_supplier_Dtls, pur_return_note_Docs,
  pur_return_note_Shipment_Dtls, pur_return_note_weight_dtl
} from '../Models/transaction/PurchaseTransaction/pur-return-note';
import { ExecFileOptionsWithStringEncoding } from 'child_process';
import { Shop_floor_master } from '../Models/OtherMaster/Shopfloormodel';
import { Process_master } from '../Models/ProductionModel/process-master';
import { Production_planning } from '../Models/ProductionModel/ProductionPlanningModel';
import { Bom_Input_Details, Bom_Output_Details, Production_master } from '../Models/ProductionModel/ProductionmasterModel';
import { ProductionTransaction } from '../Models/ProductionModel/production-transaction';
import { Stk_Transfer_pur_inv_item_dtls, StockTransferPurchaseInvoice } from '../Models/StockTransfer/stock-transfer-purchase-invoice';
import { Stk_Trans_grn_docs, Stk_Trans_grn_item_details, StockTransferGrn } from '../Models/StockTransfer/stock-transfer-grn';
import { district } from '../Models/PlaceModel/district';
import { city } from '../Models/PlaceModel/city';
import { PostOffice } from '../Models/PlaceModel/post-office';
import { Company } from '../Models/InventoryModel/Company';
import { Acc_pay_term } from '../Models/OtherMaster/Acc_pay_term';
import { WeighmentCharges } from '../Models/OtherMaster/weighment-charges';
import { LaodingPoint } from '../Models/OtherMaster/laoding-point';
import { ZoneMaster } from '../Models/OtherMaster/zone-master';
import { Salesregistration } from '../Models/SalesTransaction/Sales-registration';
import { SalesDynamicReport } from '../Models/SalesTransaction/SalesDynamicReport';
import { User } from './authentication.service';

import { map } from "rxjs/operators";
import { GodownMaster } from '../Models/InventoryModel/GodownMaster';
import { HubMaster } from '../Models/InventoryModel/HubMaster';
import { Terminatekata } from '../Models/Weightment/terminatekata';
import { Jw_grn_partywitem_details } from '../Models/ItemModel/jw_grn_partywitem_details';

@Injectable({
  providedIn: 'root'
})

export class DropdownServiceService {
  url: String;
  http: any;
  constructor(private httpClient: HttpClient, config: apiconfig) {
    this.url = config.url;
  }



  chkSuppNameStat(sname: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkSuppNameStatus/' + sname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkCustNameStat(sname: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkCustNameStatus/' + sname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkBrokNameStat(sname: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkBrokerNameStatus/' + sname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  chkVehicleNoStat(sname: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkVehicleNoStatus/' + sname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  chkTranNameStat(sname: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkTransNameStatus/' + sname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  chkSuppGroupStatus(bp_grp_name: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkSuppGroupStatus/' + bp_grp_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkTranGroupStatus(bp_grp_name: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkTransGroupStatus/' + bp_grp_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkCustGroupStatus(bp_grp_name: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkCustGroupStatus/' + bp_grp_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  chkBrokGroupStatus(bp_grp_name: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkBrokerGroupStatus/' + bp_grp_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChargesapplication(grn_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getChargesapplication/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemGroupStatus(bp_grp_name: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkItemGroupStatus/' + bp_grp_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemNameStat(sname: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkItemNameStatus?iname=' + sname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkItemCodeStatus?icode=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountitemposting(id): Observable<ItemMaster> {
    return this.httpClient.get<ItemMaster>(this.url + 'accountitemposting/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingUndoItemMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingUndoItemMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemTypeCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkItemTypeCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemCatagoryCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkItemCatagoryCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkSupplierGrpCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkSupplierGrpCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkSuppBpCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkSuppBpCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkCustCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkCustCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  chkBrokerGrpCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkBrokerGrpCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkBrokerMasterCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkBrokerMasterCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  chkTransBpCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkTransBpCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkTransporterGrpCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkTransporterGrpCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkCustGrpCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkCustGrpCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemGroupCodeStatus(icode: string): Observable<Status> {
    return this.httpClient.get<Status>(this.url + 'chkItemGroupCodeStatus?code=' + icode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  chkCatNameStat(sname: string): Observable<Group_name> {
    return this.httpClient.get<Group_name>(this.url + 'chkCatNameStatus/' + sname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnNotes(bunit_supplier_date_company_finyear): Observable<PurReturnNote[]> {
    return this.httpClient.get<PurReturnNote[]>(this.url + 'getPurReturnNotes?' + bunit_supplier_date_company_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPartyBusinessUnit(party): Observable<any> {
    return this.httpClient.get(this.url + 'getPartyBusinessUnit?party=' + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPartyOutstanding(party, bu_id): Observable<any> {
    return this.httpClient.get(this.url + 'getPartyOutstanding?party=' + party + '&bunit=' + bu_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCustomerControlAccounts(Custid): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerControlAccounts?custid=' + Custid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGroupSalesAccThruItems(SubstringItem): Observable<Item_group_master_sales_acc> {
    return this.httpClient.get<Item_group_master_sales_acc>(this.url + 'getGroupSalesAccThruItems?' + SubstringItem).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findSalesOrders(BUnit_party_invdate): Observable<any> {
    return this.httpClient.get(this.url + 'findSalesOrders?' + BUnit_party_invdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findSalesOrdersModified(BUnit_party_invdate): Observable<any> {
    return this.httpClient.get(this.url + 'findSalesOrdersModified?' + BUnit_party_invdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  findSalesOrdersRefraction(BUnit_party_invdate): Observable<any> {
    return this.httpClient.get(this.url + 'findSalesOrdersRefraction?' + BUnit_party_invdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesStockDetails(BUnit_itemid_packid): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesStockDetails?' + BUnit_itemid_packid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemOpening(BUnit_itype_tdate): Observable<any> {
    return this.httpClient.get(this.url + 'getItemOpening?' + BUnit_itype_tdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesStockDetailsThruLoad(BUnit_itemid_packid_loadingId): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesStockDetailsThruLoad?' + BUnit_itemid_packid_loadingId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliverySalesOrder(BUnit_party_invdate): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrder?' + BUnit_party_invdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliverySalesOrderUpdate(id: Number): Observable<any> {
    alert(id)
    return this.httpClient.get(this.url + 'getDeliverySalesOrderUpdate?' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingRestWeight(salesorder, itemid, packing_qty): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeight/' + salesorder + "/" + itemid + "/" + packing_qty).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingRestWeightJobwork(salesorder, itemid, packing_qty, packing, party): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeightJobwork/' + salesorder + "/" + itemid + "/" + packing_qty + "/" + packing + "/" + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  
  getLoadingRestWeightJobworkrectify(pur_cust_refdocno,totalqtyjobwork): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeightJobworkrectify/' + pur_cust_refdocno + "/" + totalqtyjobwork).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getLoadingRestWeightJobworkrectifyupdate(pur_cust_refdocno,totalqtyjobwork,advice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeightJobwork/' + pur_cust_refdocno + "/" + totalqtyjobwork+"/"+advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadingRestWeightJobWorkAllocation(itemid, party, item_qty): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeightJobWorkAllocation/' + itemid + "/" + party + "/" + item_qty).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingRestWeightupdate(salesorder, itemid, packing_qty, advice_id, packing, alter_item_code, alter_packing): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeightupdate/' + salesorder + "/" + itemid + "/" + packing_qty + "/" + advice_id + "/" + packing + "/" + alter_item_code + "/" + alter_packing).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingRestWeightJobworkupdate(salesorder, itemid, packing_qty, advice_id, packing, party): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeightJobworkupdate/' + salesorder + "/" + itemid + "/" + packing_qty + "/" + advice_id + "/" + packing + "/" + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadingRestWeightupdatelooseitem(salesorder, itemid, packing_qty, advice_id, packing): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingRestWeightupdatelooseitem/' + salesorder + "/" + itemid + "/" + packing_qty + "/" + advice_id + "/" + packing).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTranGrn(bunit_date_company_finyear): Observable<StockTransferGrn[]> {
    return this.httpClient.get<StockTransferGrn[]>(this.url + 'getStkTranGrn?' + bunit_date_company_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  stkSalesInv(id: any): Observable<StockTransferChallan> { return this.httpClient.get<StockTransferChallan>(this.url + 'stkSalesInv/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getRolesThruUserId(Roles): Observable<any> {
    return this.httpClient.get(this.url + 'getRolesThruUserId?' + Roles).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getfinyearlist(): Observable<any> {
    return this.httpClient.get(this.url + 'getfinyearlist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUserRoles(Roles): Observable<any> {
    return this.httpClient.get(this.url + 'getUserRoles?' + Roles).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnNoteItemDtls(purReturnNoteId): Observable<pur_return_note_Item_Dtls[]> {
    return this.httpClient.get<pur_return_note_Item_Dtls[]>(this.url + 'getPurRtnNoteItemDtls/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnNoteDtls(purReturnNoteId): Observable<PurReturnNote> {
    return this.httpClient.get<PurReturnNote>(this.url + 'getPurRtnNoteDtls/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  stkPurInv(id: any): Observable<any> { return this.httpClient.get<any>(this.url + 'stkPurInv/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getStkTransPurInvItemDtls(purid): Observable<any> { return this.httpClient.get<any>(this.url + 'getStkTransPurInvItemDtls/' + purid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getPurRtnNoteBrokerDtls(purReturnNoteId): Observable<pur_return_note_Broker_Dtls[]> {
    return this.httpClient.get<pur_return_note_Broker_Dtls[]>(this.url + 'getPurRtnNoteBrokerDtls/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnNoteDocs(purReturnNoteId): Observable<pur_return_note_Docs[]> {
    return this.httpClient.get<pur_return_note_Docs[]>(this.url + 'getPurRtnNoteDocs/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnNoteTransInfo(purReturnNoteId): Observable<pur_return_note_Trans_Info> {
    return this.httpClient.get<pur_return_note_Trans_Info>(this.url + 'getPurRtnNoteTransInfo/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnNoteWeDtls(purReturnNoteId): Observable<pur_return_note_weight_dtl> {
    return this.httpClient.get<pur_return_note_weight_dtl>(this.url + 'getPurRtnNoteWeDtls/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnNoteShipDtls(purReturnNoteId): Observable<pur_return_note_Shipment_Dtls> {
    return this.httpClient.get<pur_return_note_Shipment_Dtls>(this.url + 'getPurRtnNoteShipDtls/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnNoteSuppDtls(purReturnNoteId): Observable<pur_return_note_supplier_Dtls[]> {
    return this.httpClient.get<pur_return_note_supplier_Dtls[]>(this.url + 'getPurRtnNoteSuppDtls/' + purReturnNoteId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnAppNoteLowRate(bunit_supplier_date_company_finyear): Observable<PurReturnApprovalNote[]> {
    return this.httpClient.get<PurReturnApprovalNote[]>(this.url + 'getPurRtnAppNoteLowRate?' + bunit_supplier_date_company_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdPlanShifts(a): Observable<any> {
    return this.httpClient.get(this.url + 'getProdPlanShifts?' + a).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdPlanShiftStatus(a): Observable<any> {
    return this.httpClient.get(this.url + 'getProdPlanShiftStatus?' + a).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getProdPlanShiftsFrom(a): Observable<any> {
    return this.httpClient.get(this.url + 'getProdPlanShiftsFrom?' + a).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurRtnAppNoteThruWe(bunit_supplier_date_company_finyear): Observable<PurReturnApprovalNote[]> {
    return this.httpClient.get<PurReturnApprovalNote[]>(this.url + 'getPurRtnAppNoteThruWe?' + bunit_supplier_date_company_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnAppNoteForLA(bunit_supplier_date_company_finyear): Observable<PurReturnApprovalNote[]> {
    return this.httpClient.get<PurReturnApprovalNote[]>(this.url + 'getPurRtnAppNoteForLA?' + bunit_supplier_date_company_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnAppID(purReturn_id): Observable<pur_return_approval_item_dtls[]> {
    return this.httpClient.get<pur_return_approval_item_dtls[]>(this.url + 'getPurReturnAppID/' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurRtnAppNoteDtls(purReturn_id): Observable<PurReturnApprovalNote> {
    return this.httpClient.get<PurReturnApprovalNote>(this.url + 'getPurRtnAppNoteDtls?' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnAppTI(purReturn_id): Observable<pur_return_approval_trans_info> {
    return this.httpClient.get<pur_return_approval_trans_info>(this.url + 'getPurReturnAppTI/' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnAppBD(purReturn_id): Observable<pur_return_approval_broker_dtls[]> {
    return this.httpClient.get<pur_return_approval_broker_dtls[]>(this.url + 'getPurReturnAppBD/' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnAppSD(purReturn_id): Observable<pur_return_approval_shipment_dtls> {
    return this.httpClient.get<pur_return_approval_shipment_dtls>(this.url + 'getPurReturnAppSD/' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnAppWD(purReturn_id): Observable<pur_return_approval_weight_dtl> {
    return this.httpClient.get<pur_return_approval_weight_dtl>(this.url + 'getPurReturnAppWD/' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnAppDoc(purReturn_id): Observable<pur_return_approval_docs[]> {
    return this.httpClient.get<pur_return_approval_docs[]>(this.url + 'getPurReturnAppDoc/' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReturnAppSuppDtls(purReturn_id): Observable<pur_return_approval_supplier_dtls[]> {
    return this.httpClient.get<pur_return_approval_supplier_dtls[]>(this.url + 'getPurReturnAppSuppDtls/' + purReturn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purBillItemRetriveList(purbillid): Observable<PurchaseBillItem[]> {
    return this.httpClient.get<PurchaseBillItem[]>(this.url + 'purBillItemRetriveList/' + purbillid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingPurchaseBill(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingPurchaseBill/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingPurchaseBillundo(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingPurchaseBillundo/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  accountpostingSalesInvoice(id): Observable<SalesInvoice> {
    return this.httpClient.get<SalesInvoice>(this.url + 'accountpostingSalesInvoice/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingCreditNote(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingCreditNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingundo(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingundo/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purBillMusterRetriveList(purbillid): Observable<pur_Bill_MusterRoll_Details[]> {
    return this.httpClient.get<pur_Bill_MusterRoll_Details[]>(this.url + 'purBillMusterRetriveList/' + purbillid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gePurBillTaxInfo(purbillid): Observable<pur_Bill_Tax_Info> {
    return this.httpClient.get<pur_Bill_Tax_Info>(this.url + 'gePurBillTaxInfo/' + purbillid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gePurBillBPRetrive(purbillid): Observable<Pur_Bill_BPDetails> {
    return this.httpClient.get<Pur_Bill_BPDetails>(this.url + 'gePurBillBPRetrive/' + purbillid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purBillBrokerRetriveList(purbillid): Observable<pur_Bill_Broker_Details[]> {
    return this.httpClient.get<pur_Bill_Broker_Details[]>(this.url + 'purBillBrokerRetriveList/' + purbillid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purBillDocRetriveList(purbillid): Observable<pur_Bill_docs[]> {
    return this.httpClient.get<pur_Bill_docs[]>(this.url + 'purBillDocRetriveList/' + purbillid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gePurBillAccRetrive(purbillid): Observable<pur_Bill_Account_Info> {
    return this.httpClient.get<pur_Bill_Account_Info>(this.url + 'gePurBillAccRetrive/' + purbillid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurBillDetails(purbillid_companyId_finYear): Observable<PurchaseBill> {
    return this.httpClient.get<PurchaseBill>(this.url + 'getPurBillDetails?' + purbillid_companyId_finYear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  unloadWMDtlsRetriveList(wgmntid): Observable<Wm_unload_wgmnt_dtls[]> {
    return this.httpClient.get<Wm_unload_wgmnt_dtls[]>(this.url + 'unloadWMDtlsRetriveList/' + wgmntid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCompanyDetails(compid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getCompanyDetails/' + compid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getnumtowordsaleorder(orderid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getnumtowordsaleorder/' + orderid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getnumtowordsaleinvoice(invoice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getnumtowordsaleinvoice/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getnumtoword(taxamt): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getnumtoword/' + taxamt).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  unloadWeightmentRetrive(id): Observable<UnloadWeightment> {
    return this.httpClient.get<UnloadWeightment>(this.url + 'unloadWeightmentRetrive/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //getcreditnotepopupsalesreturn
  getcreditnotepopupsalesreturn(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getcreditnotepopupsalesreturn/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getsales_creditnote(salesreturnid, id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getsales_creditnote/' + salesreturnid + '/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesRtnNote(bunit_party_date_companyId_finyear_invoicetype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesRtnNote?' + bunit_party_date_companyId_finyear_invoicetype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesRtnNoteJw(date, bunit, party_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesRtnNoteJw/' + date + '/' + bunit + '/' + party_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesRtnNoteJwdetails(salereturn): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesRtnNoteJwdetails/' + salereturn).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getSalesRtnNoteUpdate(id): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesRtnNoteUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  custStatutoryRetriveList(partyId: string): Observable<Cust_bussiness_partner_stat> {
    return this.httpClient.get<Cust_bussiness_partner_stat>(this.url + 'custStatutoryRetriveList/' + partyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesRtnNoteTransInfo(salesreturnId: string): Observable<sales_return_note_Trans_dyn[]> {
    return this.httpClient.get<sales_return_note_Trans_dyn[]>(this.url + 'getSalesRtnNoteTransInfo/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleSalesRtnNoteTransInfo(salesreturnId: string): Observable<sales_return_note_Trans_dyn[]> {
    return this.httpClient.get<sales_return_note_Trans_dyn[]>(this.url + 'getMultipleSalesRtnNoteTransInfo/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReturnNoteDtls(salesreturnId: string): Observable<SalesReturnNote> {
    return this.httpClient.get<SalesReturnNote>(this.url + 'getSalesReturnNoteDtls/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReturnNoteID(salesreturnId: string): Observable<sales_return_note_Item_Dtls[]> {
    return this.httpClient.get<sales_return_note_Item_Dtls[]>(this.url + 'getSalesReturnNoteID/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReturnNotePD(salesreturnId: string): Observable<sales_return_note_Party_Dtls[]> {
    return this.httpClient.get<sales_return_note_Party_Dtls[]>(this.url + 'getSalesReturnNotePD/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReturnNoteSD(salesreturnId: string): Observable<sales_return_note_Shipment_Dtls> {
    return this.httpClient.get<sales_return_note_Shipment_Dtls>(this.url + 'getSalesReturnNoteSD/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReturnNoteBD(salesreturnId: string): Observable<sales_return_note_Broker_Dtls[]> {
    return this.httpClient.get<sales_return_note_Broker_Dtls[]>(this.url + 'getSalesReturnNoteBD/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReturnNoteD(salesreturnId: string): Observable<sales_return_note_Docs[]> {
    return this.httpClient.get<sales_return_note_Docs[]>(this.url + 'getSalesReturnNoteD/' + salesreturnId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRtnAppNoteLowRate(bunit_party_date_companyId_finyear_invoicetype): Observable<ReturnApprovalNote[]> {
    //alert(bunit_party_date_companyId_finyear_invoicetype)
    return this.httpClient.get<ReturnApprovalNote[]>(this.url + 'getRtnAppNoteLowRate?' + bunit_party_date_companyId_finyear_invoicetype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRtnAppNoteLowRateUpdate(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRtnAppNoteLowRateUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getreturnapprovalnote_salesreturnupdate(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getreturnapprovalnote_salesreturnupdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnAppNoteThruWe(bunit_party_date_companyId_finyear): Observable<ReturnApprovalNote[]> {
    return this.httpClient.get<ReturnApprovalNote[]>(this.url + 'getReturnAppNoteThruWe?' + bunit_party_date_companyId_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnAppNoteThruWejobwork(date, bunit, party_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getReturnAppNoteThruWejobwork/' + date + "/" + bunit + "/" + party_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getcreditnoteapproval(id): Observable<ReturnApprovalNote[]> {
    return this.httpClient.get<ReturnApprovalNote[]>(this.url + 'getcreditnoteapproval/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRtnAppNoteLowRateitemdetals(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRtnAppNoteLowRateitemdetals/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRtnAppNoteLowRateitemdetals_returnapp(salesreturnid, id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRtnAppNoteLowRateitemdetals_returnapp/' + salesreturnid + "/" + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getReturnAppNoteThruUnAdv(bunit_party_date_companyId_finyear): Observable<ReturnApprovalNote[]> {
    return this.httpClient.get<ReturnApprovalNote[]>(this.url + 'getReturnAppNoteThruUnAdv?' + bunit_party_date_companyId_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnAppNoteThruUnAdvjobwork(advice_date, bunit, party): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getReturnAppNoteThruUnAdvjobwork/' + advice_date + "/" + bunit + "/" + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getReturnApprovalID(salesreturnAppId: string): Observable<return_approval_Item_Dtls[]> {
    return this.httpClient.get<return_approval_Item_Dtls[]>(this.url + 'getReturnApprovalID/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnAppTransInfo(salesreturnAppId: string): Observable<return_approval_Trans_dyn[]> {
    return this.httpClient.get<return_approval_Trans_dyn[]>(this.url + 'getReturnAppTransInfo/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnApprovalSD(salesreturnAppId: string): Observable<return_approval_Shipment_Dtls> {
    return this.httpClient.get<return_approval_Shipment_Dtls>(this.url + 'getReturnApprovalSD/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnApprovalDtls(salesreturnAppId: string): Observable<ReturnApprovalNote> {
    return this.httpClient.get<ReturnApprovalNote>(this.url + 'getReturnApprovalDtls/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnApprovalWD(salesreturnAppId: string): Observable<return_approval_weight_dtl> {
    return this.httpClient.get<return_approval_weight_dtl>(this.url + 'getReturnApprovalWD/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdeliverychallernpartyterm(salereturnid: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdeliverychallernpartyterm/' + salereturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getunloadfromreturnid(salereturnid: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getunloadfromreturnid/' + salereturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getReturnApprovalPD(salesreturnAppId: string): Observable<return_approval_Party_Dtls[]> {
    return this.httpClient.get<return_approval_Party_Dtls[]>(this.url + 'getReturnApprovalPD/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnApprovalTI(salesreturnAppId: string): Observable<return_approval_Trans_Info> {
    return this.httpClient.get<return_approval_Trans_Info>(this.url + 'getReturnApprovalTI/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnApprovalBD(salesreturnAppId: string): Observable<return_approval_Broker_Dtls[]> {
    return this.httpClient.get<return_approval_Broker_Dtls[]>(this.url + 'getReturnApprovalBD/' + salesreturnAppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvoices(party_date_companyId): Observable<SalesInvoice[]> {
    return this.httpClient.get<SalesInvoice[]>(this.url + 'getSalesInvoices?' + party_date_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvoiceReturn(party_date_companyId): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesInvoiceReturn?' + party_date_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvItmDtls(invoiceId: string): Observable<sales_Invoice_Item_Dtls[]> {
    return this.httpClient.get<sales_Invoice_Item_Dtls[]>(this.url + 'getSalesInvItmDtls/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvBrkDtls(invoiceId: string): Observable<sales_invoice_Broker_Dtls[]> {
    return this.httpClient.get<sales_invoice_Broker_Dtls[]>(this.url + 'getSalesInvBrkDtls/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvTaxInfo(invoiceId: string): Observable<sales_invoice_tax_info> {
    return this.httpClient.get<sales_invoice_tax_info>(this.url + 'getSalesInvTaxInfo/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvBpDtls(invoiceId: string): Observable<sales_invoice_bp_dtls> {
    return this.httpClient.get<sales_invoice_bp_dtls>(this.url + 'getSalesInvBpDtls/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesTransDtls(invoiceId: string): Observable<sales_Invoice_Trans_Dtls[]> {
    return this.httpClient.get<sales_Invoice_Trans_Dtls[]>(this.url + 'getSalesTransDtls/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesShipDtls(invoiceId: string): Observable<sales_Invoice_Shipment_Dtls> {
    return this.httpClient.get<sales_Invoice_Shipment_Dtls>(this.url + 'getSalesShipDtls/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesPayDtls(invoiceId: string): Observable<sales_Invoice_Payment_Dtls> {
    return this.httpClient.get<sales_Invoice_Payment_Dtls>(this.url + 'getSalesPayDtls/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvDocs(invoiceId: string): Observable<sales_Invoice_Docs[]> {
    return this.httpClient.get<sales_Invoice_Docs[]>(this.url + 'getSalesInvDocs/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvDetails(invoiceId: string): Observable<SalesInvoice> {
    return this.httpClient.get<SalesInvoice>(this.url + 'getSalesInvDetails/' + invoiceId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerThruBU(bUnit: string): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerThruBU/' + bUnit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCustomerThruBUnewlist(bUnit: string): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerThruBUnewlist/' + bUnit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentChargeThruVtype(vechile_code: string): Observable<wm_charges_master> {
    return this.httpClient.get<wm_charges_master>(this.url + 'getWeighmentChargeThruVtype/' + vechile_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadWeightmentWt(wgmt_id: string): Observable<UnloadWeightment> {
    return this.httpClient.get<UnloadWeightment>(this.url + 'getUnloadWeightmentWt/' + wgmt_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadWeightmentWtmultipopup(wgmt_id: string): Observable<UnloadWeightment> {
    return this.httpClient.get<UnloadWeightment>(this.url + 'getUnloadWeightmentWtmultipopup/' + wgmt_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCustomUomById(wgmt_id: string): Observable<CustomUom> {
    return this.httpClient.get<CustomUom>(this.url + 'getCustomUomById/' + wgmt_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdThruSuppAdvReq(supplier_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getPurOrdThruSuppAdvReq/' + supplier_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  exportuom(id): Observable<CustomUom> {
    return this.httpClient.get<CustomUom>(this.url + 'exportuom/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvPOItemDtls(unadviceid: string, pur_ord_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadAdvPOItemDtls/' + unadviceid + "/" + pur_ord_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemRawMaterials(): Observable<any> {
    return this.httpClient.get(this.url + 'getItemRawMaterials').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentCharges(): Observable<any> {
    return this.httpClient.get(this.url + 'getWeighmentCharges').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTransChallanTranInfo(stk_trans_challan_id: string): Observable<stk_challan__Trans_Info> {
    return this.httpClient.get<stk_challan__Trans_Info>(this.url + 'getStkTransChallanTranInfo/' + stk_trans_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTransChallanTranInfos(stk_trans_challan_id: string): Observable<sales_Invoice_Trans_Dtls[]> {
    return this.httpClient.get<sales_Invoice_Trans_Dtls[]>(this.url + 'getStkTransChallanTranInfos/' + stk_trans_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkOrderDetails(stk_trans_challan_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStkOrderDetails/' + stk_trans_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTransChallanThruBUnit(businessunit_id: string): Observable<StockTransferChallan[]> {
    return this.httpClient.get<StockTransferChallan[]>(this.url + 'getStkTransChallanThruBUnit/' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTransChallans(bunit_date_company_year): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStkTransChallans?' + bunit_date_company_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  //unloading stock transefr popup
  getstocktransferchallaninunloading(bunit, invdate, comp, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getstocktransferchallaninunloading/' + bunit + "/" + invdate + "/" + comp + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }




  getStkTransChallanDtls(stockTransChallan_id: string): Observable<StockTransferChallan> {
    return this.httpClient.get<StockTransferChallan>(this.url + 'getStkTransChallanDtls?' + stockTransChallan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTransChallanShipDtls(stockTransChallan_id: string): Observable<stk_challan__Shipment_Dtls> {
    return this.httpClient.get<stk_challan__Shipment_Dtls>(this.url + 'getStkTransChallanShipDtls/' + stockTransChallan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTransChallanDocs(stockTransChallan_id: string): Observable<stk_challan__Docs[]> {
    return this.httpClient.get<stk_challan__Docs[]>(this.url + 'getStkTransChallanDocs/' + stockTransChallan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTransChallanItemDlts(stockTransChallan_id: string): Observable<stk_challan__Item_Dtls[]> {
    return this.httpClient.get<stk_challan__Item_Dtls[]>(this.url + 'getStkTransChallanItemDlts/' + stockTransChallan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdviceThruVehicle(vechile_no: string, orderType: string): Observable<UnloadAdvice[]> {
    return this.httpClient.get<UnloadAdvice[]>(this.url + 'getUnloadAdviceThruVehicle/' + vechile_no + "/" + orderType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadAdviceThruVehiclefast(vechile_no: string, orderType: string): Observable<UnloadAdvice[]> {
    return this.httpClient.get<UnloadAdvice[]>(this.url + 'getUnloadAdviceThruVehiclefast/' + vechile_no + "/" + orderType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getGetDocuments(unadv_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGetDocuments/' + unadv_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getstockchallandetails(stockTransChallan_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getstockchallandetails/' + stockTransChallan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentcharges(unloadid): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadDetails/' + unloadid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getMultipleStkTransChallanDtls(stockTransChallan_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMultipleStkTransChallanDtls/' + stockTransChallan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleStkOrderDetails(stk_trans_challan_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMultipleStkOrderDetails/' + stk_trans_challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getmutiplegetStkTransChallans(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getmutiplegetStkTransChallans/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleStkTransSalesInvItemDtlsupdate(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMultipleStkTransSalesInvItemDtlsupdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleStkTransSalesInvItemDtls(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMultipleStkTransSalesInvItemDtls/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleStkTransChallanDocs(stockTransChallan_id: string): Observable<stk_challan__Docs[]> {
    return this.httpClient.get<stk_challan__Docs[]>(this.url + 'getMultipleStkTransChallanDocs/' + stockTransChallan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadngAdviceThruVehicle(vechile_no: string, orderType: string): Observable<LoadingAdvice[]> {
    return this.httpClient.get<LoadingAdvice[]>(this.url + 'getLoadngAdviceThruVehicle/' + vechile_no + "/" + orderType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadngAdviceThruVehiclefast(vechile_no: string, orderType: string): Observable<LoadingAdvice[]> {
    return this.httpClient.get<LoadingAdvice[]>(this.url + 'getLoadngAdviceThruVehiclefast/' + vechile_no + "/" + orderType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadingVehiThruStkTransfer(): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingVehiThruStkTransfer').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadVehiThruSR(): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadVehiThruSR').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingVehiThruSales(): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingVehiThruSales').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadVehiThruStkTransfer(): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadVehiThruStkTransfer').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadVehiThruPurchase(): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadVehiThruPurchase').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleListWeighment(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleListWeighment').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getVehicleListWeighmentnew(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleListWeighmentnew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadItemTotalWt(loadadvice): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadItemTotalWt/' + loadadvice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadingVehiThruPR(): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingVehiThruPR').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdvTransInfoThruVehicle(vehicle_id, adviceType): Observable<Wm_loading_advice_trans_info> {
    return this.httpClient.get<Wm_loading_advice_trans_info>(this.url + 'getLoadingAdvTransInfoThruVehicle/' + vehicle_id + "/" + adviceType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadingAdvThruVehicle(vehicle_id, adviceType): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingAdvThruVehicle/' + vehicle_id + "/" + adviceType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdvDriverDtlsThruVehicle(vehicle_id, adviceType): Observable<Wm_loading_advice_driver_dtls> {
    return this.httpClient.get<Wm_loading_advice_driver_dtls>(this.url + 'getLoadingAdvDriverDtlsThruVehicle/' + vehicle_id + "/" + adviceType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdvItemDtlsThruVehicle(vehicle_id, adviceType): Observable<Wm_loading_advice_itm_dtls[]> {
    return this.httpClient.get<Wm_loading_advice_itm_dtls[]>(this.url + 'getLoadingAdvItemDtlsThruVehicle/' + vehicle_id + "/" + adviceType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdviceThruBUnit(b_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingAdviceThruBUnit/' + b_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadItemDtlsThruVehi(vehicleid: string): Observable<Wm_unload_advice_item_dtls[]> {
    return this.httpClient.get<Wm_unload_advice_item_dtls[]>(this.url + 'getUnloadItemDtlsThruVehi/' + vehicleid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleRefName(vehicleid: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getVehicleRefName/' + vehicleid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvPartyWmThruVehi(vehicleid: string): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadAdvPartyWmThruVehi/' + vehicleid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentId(weimentid: string): Observable<any> {
    return this.httpClient.get(this.url + 'getWeighmentId/' + weimentid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReceipt_criteria(weimentid, unload): Observable<any> {
    return this.httpClient.get(this.url + 'getReceipt_criteria/' + weimentid + '/' + unload).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdviceData(unloadid): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadAdviceData/' + unloadid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChallanItemDlts(challanid, itemid): Observable<any> {
    return this.httpClient.get(this.url + 'getChallanItemDlts/' + challanid + '/' + itemid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvTransInfoThruVehi(vehicleid: string): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadAdvTransInfoThruVehi/' + vehicleid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvThruVehi(vehicleid: string): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadAdvThruVehi/' + vehicleid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingVehiThruBU(b_id, cdate): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingVehiThruBU/' + b_id + "/" + cdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStockTransThruInter(): Observable<IndentOrder[]> {
    return this.httpClient.get<IndentOrder[]>(this.url + 'getStockTransThruInter').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStockTransOrds(advicedate, bunit): Observable<StockTransfer[]> {
    return this.httpClient.get<StockTransfer[]>(this.url + 'getStockTransOrds/' + advicedate + "/" + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkIndOrder(): Observable<StockTransfer[]> {
    return this.httpClient.get<StockTransfer[]>(this.url + 'getStkIndOrder').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTrans(): Observable<StockTransfer[]> {
    return this.httpClient.get<StockTransfer[]>(this.url + 'getStkTrans').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStockTransDtls(stock_id: string): Observable<StockTransfer> {
    return this.httpClient.get<StockTransfer>(this.url + 'getStockTransDtls/' + stock_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStockTransItemDlts(stock_id: string): Observable<stock_transfer_Item_Dtls[]> {
    return this.httpClient.get<stock_transfer_Item_Dtls[]>(this.url + 'getStockTransItemDlts/' + stock_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkIndentOrderDetailsList(_indent_id: string): Observable<IndentorderDetail[]> {
    return this.httpClient.get<IndentorderDetail[]>(this.url + 'getStkIndentOrdItemDtlsList/' + _indent_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkIndOrdDtls(indent_id: String): Observable<IndentOrder[]> {
    return this.httpClient.get<IndentOrder[]>(this.url + 'getStkIndOrdDtls/' + indent_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustContDetails(customer_id: string, custname: String): Observable<Cust_bussiness_partner_addr_dyn> {
    return this.httpClient.get<Cust_bussiness_partner_addr_dyn>(this.url + 'getCustContDetails/' + customer_id + "/" + custname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustDelvFromAdd(customer_id: string, custname: String): Observable<Cust_bussiness_partner_delv_to> {
    return this.httpClient.get<Cust_bussiness_partner_delv_to>(this.url + 'getCustDelvFromAdd?cbpid=' + customer_id + "&bunit=" + custname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustDelvFromList(custid: string): Observable<Cust_bussiness_partner_delv_to[]> {
    return this.httpClient.get<Cust_bussiness_partner_delv_to[]>(this.url + 'getCustDelvFromList/' + custid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerAddress(custid: String): Observable<Cust_bussiness_partner_addr> {
    return this.httpClient.get<Cust_bussiness_partner_addr>(this.url + 'getCustomerAddress/' + custid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliveryChallanList(): Observable<DeliveryChallan[]> {
    return this.httpClient.get<DeliveryChallan[]>(this.url + 'getDeliveryChallanList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDelvChallans(invoiceTypePartyIdCompanyIdParentModel): Observable<DeliveryChallan[]> {
    return this.httpClient.get<DeliveryChallan[]>(this.url + 'getDelvChallans?' + invoiceTypePartyIdCompanyIdParentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDelvChallansnew(invoiceTypePartyIdCompanyIdParentModel): Observable<DeliveryChallan[]> {
    return this.httpClient.get<DeliveryChallan[]>(this.url + 'getDelvChallansnew?' + invoiceTypePartyIdCompanyIdParentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDelvChallansnewjobwork(invoiceTypePartyIdCompanyIdParentModel): Observable<DeliveryChallan[]> {
    return this.httpClient.get<DeliveryChallan[]>(this.url + 'getDelvChallansnewjobwork?' + invoiceTypePartyIdCompanyIdParentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDelvChallansApp(partyIdSalesorderDateCompanyIdParentModel): Observable<DeliveryChallan[]> {
    return this.httpClient.get<DeliveryChallan[]>(this.url + 'getDelvChallansApp?' + partyIdSalesorderDateCompanyIdParentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDelvChallansReturnApp(partyIdSalesorderDateCompanyIdParentModel): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDelvChallansReturnApp?' + partyIdSalesorderDateCompanyIdParentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleDelvChallans(invoiceTypePartyIdCompanyIdParentModel): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMultipleDelvChallans?' + invoiceTypePartyIdCompanyIdParentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleDelvChallansUpdate(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMultipleDelvChallansUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleDelvChallansApp(partyIdSalesorderDateCompanyIdParentModel): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMultipleDelvChallansApp?' + partyIdSalesorderDateCompanyIdParentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //getdiliverychallanreturnapprovepopup
  getdiliverychallanreturnapprovepopup(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdiliverychallanreturnapprovepopup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  //getreturnnoteitemdetails
  getreturnnoteitemdetails(delivery_cid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDlvChallanItemDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurGoodRcptList(): Observable<ReceiptItemDetails[]> {
    return this.httpClient.get<ReceiptItemDetails[]>(this.url + 'getPurGoodRcptList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurGoodRcptThruSupp(supplierId: string, itemtype, itemsubtype, pursubtype): Observable<ReceiptItemDetails[]> {
    return this.httpClient.get<ReceiptItemDetails[]>(this.url + 'getPurGoodRcptThruSupp/' + supplierId + "/" + itemtype + "/" + itemsubtype + "/" + pursubtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanItemDtls(sales_invoice_id: string): Observable<delivery_challan_Item_Dtls[]> {
    return this.httpClient.get<delivery_challan_Item_Dtls[]>(this.url + 'getDlvChallanItemDtls/' + sales_invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRestDlvChallanItemDtls(delvid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRestDlvChallanItemDtls/' + delvid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanItemjobworkRetriveList(delivery_cid: string): Observable<delivery_challan_Item_Dtls_for_jobwork[]> {
    return this.httpClient.get<delivery_challan_Item_Dtls_for_jobwork[]>(this.url + 'getDlvChallanItemjobworkRetriveList/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getPurGoodRcptItemDtlsList(grn_id: string): Observable<ReceiptItemDetails[]> {
    return this.httpClient.get<ReceiptItemDetails[]>(this.url + 'getPurGoodRcptItemDtlsList/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurGoodRcptItemDtlsListfastapi(grn_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurGoodRcptItemDtlsListfastapi/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getReasonIndent(): Observable<reasonMaster[]> {
    return this.httpClient.get<reasonMaster[]>(this.url + 'getReasonIndent').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSuppDelvAddress(supplierId: string, name: string): Observable<Supp_bussiness_partner_stat> {
    return this.httpClient.get<Supp_bussiness_partner_stat>(this.url + 'getSuppDelvAddress/' + supplierId + "/" + name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierStatDtls(supplierId: string): Observable<Supp_bussiness_partner_stat> {
    return this.httpClient.get<Supp_bussiness_partner_stat>(this.url + 'getSupplierStatDtls/' + supplierId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesEnquiryByEnqId(enqId: string): Observable<SalesEnq> {
    return this.httpClient.get<SalesEnq>(this.url + 'salesEnquiryByEnqId/' + enqId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransporterThruCustomer(customer_id: string): Observable<transportcode[]> {
    return this.httpClient.get<transportcode[]>(this.url + 'getTransporterThruCustomer/' + customer_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkcustomersaleclosed(customer_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'checkcustomersaleclosed/' + customer_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemByItemGroup(item_id: string): Observable<itemModalPopUp[]> {
    return this.httpClient.get<itemModalPopUp[]>(this.url + 'getItemByItemGroup/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruType1(item_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemThruType/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruType3(item_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemThruType3/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemThruTypeForUsedItem(bunit, itype: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemThruTypeForUsedItem/' + bunit + '/' + itype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getCustomerByGroup(cust_group: string): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'getCustomerByGroup/' + cust_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransporterThruGroup(tgroup: string): Observable<Trans_bussiness_partner[]> {
    return this.httpClient.get<Trans_bussiness_partner[]>(this.url + 'getTransporterThruGroup/' + tgroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustGroupByChannel(channel_custid: string): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'getCustGroupByChannel/' + channel_custid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChannelCustDesc(): Observable<channel_cust_master[]> {
    return this.httpClient.get<channel_cust_master[]>(this.url + 'getChannelCustDesc').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruType(servicesItemType: string) {
    return this.httpClient.get(this.url + 'getItemThruType/' + servicesItemType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSRSequenceId(sequenceid: string): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSRSequenceId/' + sequenceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCNSequenceId(sequenceid: string): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getCNSequenceId/' + sequenceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehiSequenceId(sequenceid: string): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getVehiSequenceId/' + sequenceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesEnqSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSalesEnqSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSalesQuotSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSalesOrdSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdSequenceIdWarehouse(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSalesOrdSequenceIdWarehouse/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDNSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getDNSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVtypeSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getVtypeSequenceId?prefix=' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTagAdvPOSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getTagAdvPOSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSFSequenceId(company_id: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSFSequenceId?prefix=SF&company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // getPTSequenceId(company_id:String)
  // {
  //   return this.httpClient.get<SequenceId>(this.url+'getPTSequenceId?prefix=PT&company='+company_id).pipe(
  //     catchError(this.handleError));
  // }

  getBMSequenceId(bunit, shpflor, company_id: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getBMSequenceId?prefix=BM&bunit=' + bunit + '&sfloor=' + shpflor + '&company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPPSequenceId(Bussiness_Unit: String, company_id: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPPSequenceId?prefix=PP&bunit=' + Bussiness_Unit + '&company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPMSequenceId(company_id: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPMSequenceId?prefix=PM&company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getShiftEndtime(dttime, tothrs) {

    return this.httpClient.get(this.url + 'getShiftTime/' + dttime + '/' + tothrs).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSTSISequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSTSISequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSTOSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSTOSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSTCSequenceId(prefix: String, business_Unit: string): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSTCSequenceId/' + prefix + "/" + business_Unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSTISequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSTISequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSTGRNSequenceId(bu_id: String) {
    return this.httpClient.get<SequenceId>(this.url + 'getSTGRNSequenceId/' + bu_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSTPISequenceId(bu_id: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSTPISequenceId/' + bu_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBrokerSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getBrokerSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSuppSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSuppSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getItemSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSystemSettingsByComp(companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSystemSettingsByComp?' + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getEmployeeSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getEmployeeSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemCategorySequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getIcatSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemGroupSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getIgrpSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemTypeSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getItypeSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierGroupSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSgrpSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTCMId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getTCMId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransporterGroupSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getTgrpSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBrokerGroupSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getBgrpSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerGroupSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getCgrpSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCustSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getCustSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransSequenceId(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getTransSequenceId?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSISequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSISequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSISequenceIdforDefence(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSISequenceIdforDefence/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRANSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getRANSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPRANSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPRANSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPRNSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPRNSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGRNSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getGRNSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getIndSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getIndSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getWeighmentSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentNumber(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getWeighmentNumber/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getWeighmentSequenceIdnew(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getWeighmentSequenceIdnew/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentSequenceIdnewloading(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getWeighmentSequenceIdnewloading/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDCSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getDCSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDCSequenceIdforDefence(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getDCSequenceIdforDefence/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLASequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getLASequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLASequenceIdWarehouse(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getLASequenceIdWarehouse/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUASequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getUASequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUASequenceIdnew(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getUASequenceIdnew/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getEnqSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getEnqSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getQuotSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getQuotSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPBSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPBSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPOSequenceId(prefix: String): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPOSequenceId/' + prefix).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierListByGroup(supp_group: string): Observable<SupplierMasterNcList[]> {
    return this.httpClient.get<SupplierMasterNcList[]>(this.url + 'supplierListByGroup/' + supp_group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemMasterInvData1(item_id: string, company_id: string): Observable<Item_master_inv_data1> {
    return this.httpClient.get<Item_master_inv_data1>(this.url + 'getItemMasterInvData1/' + item_id + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemTypeList(page_size, page_no): Observable<Item_type_master[]> {
    return this.httpClient.get<Item_type_master[]>(this.url + 'getItemTypeList/' + page_size + '/' + page_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  wmUnAdviceBpDtlsRetriveList(unloadAdvice_id: string): Observable<unload_bp_details> {
    return this.httpClient.get<unload_bp_details>(this.url + 'wmUnAdviceBpDtlsRetriveList/' + unloadAdvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  custBrokerByCode(broker_id: string): Observable<Cust_bussiness_partner_brokers[]> {
    return this.httpClient.get<Cust_bussiness_partner_brokers[]>(this.url + 'custBrokerByCode/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCustomerBrokerDtls(cp_id, broker_id): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerBrokerDtls/' + cp_id + "/" + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  custBrokerRetriveList(cust_id: string): Observable<Cust_bussiness_partner_brokers[]> {
    return this.httpClient.get<Cust_bussiness_partner_brokers[]>(this.url + 'custBrokerRetriveList/' + cust_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBinDescByWarehouse(wareHCode: String): Observable<Bin[]> {
    return this.httpClient.get<Bin[]>(this.url + 'getBinDescByWarehouse/' + wareHCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStackNoByWarehouse(wareHCode: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStackNoByWarehouse/' + wareHCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStackUom(rack: String): Observable<any> {
    return this.httpClient.get(this.url + 'getStackUom/' + rack).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProcessThruBUShopFloorAll(bunit_orderdate) {
    return this.httpClient.get(this.url + 'getProcessThruBUShopFloor?' + bunit_orderdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvVehiThruBU(bunit_sfloor_company) {
    return this.httpClient.get(this.url + 'getUnloadAdvVehiThruBU?' + bunit_sfloor_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProcessThruBUShopFloor(bunit_sfloor_company): Observable<Process_master[]> {
    return this.httpClient.get<Process_master[]>(this.url + 'getProcessThruBUShopFloorRegular?' + bunit_sfloor_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProcessThruBUShopFloorSpl(bunit_sfloor_company): Observable<Process_master[]> {
    return this.httpClient.get<Process_master[]>(this.url + 'getProcessThruBUShopFloorSpl?' + bunit_sfloor_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProcessThruBUSFProDesc(bunit_sfloor_pdec_company): Observable<Process_master[]> {
    return this.httpClient.get<Process_master[]>(this.url + 'getProcessThruBUSFProDesc?' + bunit_sfloor_pdec_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPTSequenceId(prefix_bunit_sfloor_company): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPTSequenceId?' + prefix_bunit_sfloor_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPTSSequenceId(prefix_bunit_sfloor_company): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getPTSSequenceId?' + prefix_bunit_sfloor_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdTranShiftTime(bunit_sfloor_procs_sid) {
    return this.httpClient.get(this.url + 'getProdTranShiftTime?' + bunit_sfloor_procs_sid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdTranShiftTimeShiftNo(bunit_sfloor_procs_sid) {
    return this.httpClient.get(this.url + 'getProdTranShiftTimeShiftNo?' + bunit_sfloor_procs_sid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBomThruProcess(bunit_sfloor_proces_company): Observable<Process_master[]> {
    return this.httpClient.get<Process_master[]>(this.url + 'getBomThruProcess?' + bunit_sfloor_proces_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBomDetails(bunit_sfloor_bomid_company): Observable<Production_master> {
    return this.httpClient.get<Production_master>(this.url + 'getBomDetails?' + bunit_sfloor_bomid_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdPlanSplProcessDtls(bunit_sfloor_sproc_company): Observable<ProductionTransaction> {
    return this.httpClient.get<ProductionTransaction>(this.url + 'getProdPlanSplProcessDtls?' + bunit_sfloor_sproc_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdPlanSplDtls(bunit_sfloor_company): Observable<ProductionTransaction> {
    return this.httpClient.get<ProductionTransaction>(this.url + 'getProdPlanSplDtls?' + bunit_sfloor_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProcessThruProPlan(pdate_bunit_sfloor_proces_company): Observable<ProductionTransaction> {
    return this.httpClient.get<ProductionTransaction>(this.url + 'getProcessThruProPlan?' + pdate_bunit_sfloor_proces_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdPlanShiftDtls(bunit_sfloor): Observable<ProductionTransaction> {
    return this.httpClient.get<ProductionTransaction>(this.url + 'getProdPlanShiftDtls?' + bunit_sfloor).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStoreconsumptiontransaction(shop_floor): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStoreconsumptiontransaction/' + shop_floor).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getProcessThruProdPlan(pdate_bunit_sfloor_process_proces_company): Observable<ProductionTransaction> {
    return this.httpClient.get<ProductionTransaction>(this.url + 'getProcessThruProdPlan?' + pdate_bunit_sfloor_process_proces_company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProdPlanShiftDetails(ShiftId): Observable<ProductionTransaction> {
    return this.httpClient.get<ProductionTransaction>(this.url + 'getProdPlanShiftDetails?' + ShiftId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // getProcessThruBUShopFloor(bunit_floor_comp)
  // {
  //   return this.httpClient.get<Shop_floor_master[]>(this.url+'getProcessThruBUShopFloor?'+bunit_floor_comp).pipe(
  //     catchError(this.handleError));
  // }

  getLoadingAdvices() {
    return this.httpClient.get(this.url + 'getLoadingAdvices').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdvThruWeighment(delivery_date) {
    return this.httpClient.get(this.url + 'getLoadingAdvThruWeigh/' + delivery_date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadAdvThruWeighment(deliveryDate: String, Party: String, inv_type) {
    return this.httpClient.get(this.url + 'getLoadingAdvThruWeigh?party=' + Party + '&cdate=' + deliveryDate + '&inv_type=' + inv_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadAdvThruWeighmentUpdate(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadAdvThruWeighmentUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  loadingItemRetriveListUpdate(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'loadingItemRetriveListUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingDetails(advice_id): Observable<LoadingAdvice> {
    return this.httpClient.get<LoadingAdvice>(this.url + 'getLoadingDetails/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdviceStkTrans() {
    return this.httpClient.get(this.url + 'getLoadingAdviceStkTrans').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  loadingItemRetriveList(advice_id: String): Observable<Wm_loading_advice_itm_dtls[]> {
    return this.httpClient.get<Wm_loading_advice_itm_dtls[]>(this.url + 'loadingItemRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  loadingItemjobworkRetriveList(advice_id: String): Observable<wm_loading_advice_Item_Dtls_for_jobwork[]> {
    return this.httpClient.get<wm_loading_advice_Item_Dtls_for_jobwork[]>(this.url + 'loadingItemjobworkRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkjobworkrestwt(advice_id: String): Observable<wm_loading_advice_Item_Dtls_for_jobwork[]> {
    return this.httpClient.get<wm_loading_advice_Item_Dtls_for_jobwork[]>(this.url + 'checkjobworkrestwt/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getLoadingAdvBrokerDtls(advice_id: String): Observable<wm_loading_advice_broker_dtls[]> {
    return this.httpClient.get<wm_loading_advice_broker_dtls[]>(this.url + 'getLoadingAdvBrokerDtls/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdvTransinfo(advice_id: String): Observable<Wm_loading_advice_trans_info> {
    return this.httpClient.get<Wm_loading_advice_trans_info>(this.url + 'getLoadingAdvTransinfo/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReceivingBuLoadingAdvice(advice_id: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getReceivingBuLoadingAdvice/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkChallanVehicleNo(advice_id: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStkChallanVehicleNo/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadingAdvPartyDtls(advice_id: String): Observable<wm_loading_advice_Party_Dtls[]> {
    return this.httpClient.get<wm_loading_advice_Party_Dtls[]>(this.url + 'getLoadingAdvPartyDtls/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdvShipDtls(advice_id: String): Observable<wm_loading_advice_Shipment_Dtls> {
    return this.httpClient.get<wm_loading_advice_Shipment_Dtls>(this.url + 'getLoadingAdvShipDtls/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkAdviceinCash(advicedate, party, ref_type, total_amt): Observable<any> {
    return this.httpClient.get(this.url + 'checkAdviceinCash/' + advicedate + '/' + party + '/' + ref_type + '/' + total_amt).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkAdviceinCashUpdate(advicedate, party, ref_type, total_amt, advice_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkAdviceinCashUpdate/' + advicedate + '/' + party + '/' + ref_type + '/' + total_amt + '/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  custPayment(advicedate, party, ref_type): Observable<any> {
    return this.httpClient.get(this.url + 'custPayment/' + advicedate + '/' + party + '/' + ref_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrder(party_date_companyId) {
    return this.httpClient.get(this.url + 'getSalesOrder?' + party_date_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderReturn(party_date_companyId) {
    return this.httpClient.get(this.url + 'getSalesOrderReturn?' + party_date_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getreturnapprovalsalesorder(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getreturnapprovalsalesorder/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getreturnapprovalsalesInvoice(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getreturnapprovalsalesInvoice/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesOrderList() {
    return this.httpClient.get(this.url + 'salesOrderList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderDetails(order_id: String): Observable<SalesOrder> {
    return this.httpClient.get<SalesOrder>(this.url + 'getSalesOrderDetails/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderDetailsthdeliverchallan(deliverychallan): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesOrderDetailsthdeliverchallan/' + deliverychallan).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getsaleorderjobworkprice(chyallanid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getsaleorderjobworkprice/' + chyallanid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getsalereturnjobworkprice(returnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getsalereturnjobworkprice/' + returnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDelvChallanJobworkPrice(chyallanid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDelvChallanJobworkPrice/' + chyallanid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDelvChallanMultiJobworkPrice(chyallanid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDelvChallanMultiJobworkPrice/' + chyallanid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerDetails(custid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getCustomerDetails/' + custid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdItemDtls(order_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrdItemDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdItemDtlsNew(order_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrdItemDtlsNew/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdItemDtlsRefraction(order_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrdItemDtlsRefraction/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSalesOrdItemDtlsUpdate(order_id: Number): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrdItemDtlsUpdate/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliverychallanlist(order_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getDeliverychallanlist/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getdeliverchallanitemlist(order_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getdeliverchallanitemlist/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdeliverchallanjobitemlist(order_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getdeliverchallanjobitemlist/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getdeliverchallanitemlistUpdate(id: Number): Observable<any> {
    return this.httpClient.get(this.url + 'getdeliverchallanitemlistUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleSalesReturnNoteitemlist(sales_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getMultipleSalesReturnNoteitemlist/' + sales_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleSalesReturnNoteitemlistUpdate(id): Observable<any> {
    return this.httpClient.get(this.url + 'getMultipleSalesReturnNoteitemlistUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleReturnApprovalitemlist(return_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getMultipleReturnApprovalitemlist/' + return_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleReturnApprovalitemlistUpdate(id): Observable<any> {
    return this.httpClient.get(this.url + 'getMultipleReturnApprovalitemlistUpdate/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdBrokerDtls(order_id: String): Observable<sales_Order_Broker_Dtls[]> {
    return this.httpClient.get<sales_Order_Broker_Dtls[]>(this.url + 'getSalesOrdBrokerDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdShipDtls(order_id: String): Observable<sales_Order_Shipment_Dtls> {
    return this.httpClient.get<sales_Order_Shipment_Dtls>(this.url + 'getSalesOrdShipDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdIfMultiTransInfo(order_id: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesOrdIfMultiTransInfo/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanWeightDtlsMulti(delivery_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDlvChallanWeightDtlsMulti/' + delivery_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSalesOrdTransInfo(order_id: String): Observable<sales_Order_Trans_Info> {
    return this.httpClient.get<sales_Order_Trans_Info>(this.url + 'getSalesOrdTransInfo/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getsalevehiclelist(transportid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getsalevehiclelist/' + transportid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getStkTransTranInfo(order_id: String): Observable<stock_transfer_Trans_Info> {
    return this.httpClient.get<stock_transfer_Trans_Info>(this.url + 'getStkTransTranInfo/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdPartyDtls(order_id: String): Observable<Sales_Order_Party_Dtls[]> {
    return this.httpClient.get<Sales_Order_Party_Dtls[]>(this.url + 'getSalesOrdPartyDtls/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrdTermsCon(order_id: String): Observable<sales_Order_Terms_Con> {
    return this.httpClient.get<sales_Order_Terms_Con>(this.url + 'getSalesOrdTermsCon/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesOrderByParty(party_id: String): Observable<SalesOrder[]> {
    return this.httpClient.get<SalesOrder[]>(this.url + 'salesOrderByParty/' + party_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDriverByVehicle(vehicle_id: String): Observable<DriverMasterPopup[]> {
    return this.httpClient.get<DriverMasterPopup[]>(this.url + 'getDriverByVehicle/' + vehicle_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkVehicleNoWeighment(vehicle_id, action): Observable<any> {
    return this.httpClient.get<any>(this.url + 'checkVehicleNoWeighment/' + vehicle_id + '/' + action).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  //driver image 

  getdriverimage(doc_img: String): Observable<Blob> {
    return this.httpClient.get(this.url + 'getdriverimage/' + doc_img, {

      responseType: 'blob'
    });
  }

  getgatepassimageimage(doc_img: String): Observable<Blob> {
    return this.httpClient.get(this.url + 'getgatepassimageimage/' + doc_img, {

      responseType: 'blob'
    });
  }

  //driver image stops here 
  getTransportImage(doc_img: String): Observable<Blob> {
    return this.httpClient.get(this.url + 'getTransportImage/' + doc_img, {

      responseType: 'blob'
    });
  }

  getEinvoiceImage(doc_img: String): Observable<Blob> {
    return this.httpClient.get(this.url + 'getEinvoiceImage/' + doc_img, {

      responseType: 'blob'
    });
  }

  getWHListbyBUnit(buss_code: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWHListbyBUnit/' + buss_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWHListbyBUnitFastApi(buss_code: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWHListbyBUnitFastApi/' + buss_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingPointThruBU(buss_code: String) {
    return this.httpClient.get(this.url + 'getLoadingPointThruBU/' + buss_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getBusiUnitStateStatus(bussU_DbussU: String) {
    return this.httpClient.get(this.url + 'getBusiUnitStateStatus/' + bussU_DbussU).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingPointThruBUDiff(buss_code, loading_point) {
    return this.httpClient.get(this.url + 'getLoadingPointThruBUDiff/' + buss_code + "/" + loading_point).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleTransporter(buss_code: String): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.url + 'getVehicleThruTransporter/' + buss_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  accountPostingTransporter(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountPostingTransporter/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingsalestransport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingsalestransport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingsalestransportundo(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingsalestransportundo/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSalesQuotDetails(channel_id: string): Observable<Sales_Quotation> {
    return this.httpClient.get<Sales_Quotation>(this.url + 'getSalesQuotDetails/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotShipDtls(channel_id: string): Observable<sales_Quotation_Shipment_Dtls> {
    return this.httpClient.get<sales_Quotation_Shipment_Dtls>(this.url + 'getSalesQuotShipDtls/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotTransInfo(channel_id: string): Observable<sales_Quotation_Trans_Info> {
    return this.httpClient.get<sales_Quotation_Trans_Info>(this.url + 'getSalesQuotTransInfo/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotTermsCon(channel_id: string): Observable<sales_Quotation_Terms_Con> {
    return this.httpClient.get<sales_Quotation_Terms_Con>(this.url + 'getSalesQuotTermsCon/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotSummary(channel_id: string): Observable<sales_Quotation_Summary> {
    return this.httpClient.get<sales_Quotation_Summary>(this.url + 'getSalesQuotSummary/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotPartyDtls(channel_id: string): Observable<Sales_Quotation_Party_Dtls[]> {
    return this.httpClient.get<Sales_Quotation_Party_Dtls[]>(this.url + 'getSalesQuotPartyDtls/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotSummDtls(channel_id: string): Observable<sales_Quotation_Summary_dyn[]> {
    return this.httpClient.get<sales_Quotation_Summary_dyn[]>(this.url + 'getSalesQuotSummDtls/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotBrokerDtls(channel_id: string): Observable<sales_Quotation_Broker_Dtls[]> {
    return this.httpClient.get<sales_Quotation_Broker_Dtls[]>(this.url + 'getSalesQuotBrokerDtls/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerByChannel(channel_id: string): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'getCustomerByChannel/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerByChannelFastApi(channel_id): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerByChannelFastApi/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierByChannel(channel_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSupplierByChannel/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierByChannelFastApi(channel_id): Observable<any> {
    return this.httpClient.get(this.url + 'getSupplierByChannelFastApi/' + channel_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesQuotationPrevList(): Observable<Sales_Quotation[]> {
    return this.httpClient.get<Sales_Quotation[]>(this.url + 'salesQuotationPrevList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesQuotationFinalise(): Observable<Sales_Quotation[]> {
    return this.httpClient.get<Sales_Quotation[]>(this.url + 'salesQuotationFinalise').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesQuotationList(): Observable<Sales_Quotation[]> {
    return this.httpClient.get<Sales_Quotation[]>(this.url + 'salesQuotationList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotationsList(curDate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesQuotationsList/' + curDate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchSaleQuotation(fromdate, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'searchSaleQuotation/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesQuotItemDtls(sales_quo_id: string): Observable<sales_Quotation_Item_Dtls[]> {
    return this.httpClient.get<sales_Quotation_Item_Dtls[]>(this.url + 'getSalesQuotItemDtls/' + sales_quo_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesEnqPersonList(sales_enq_id: string): Observable<SalesEnq> {
    return this.httpClient.get<SalesEnq>(this.url + 'salesEnqPersonList/' + sales_enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesEnqPartyDtls(sales_enq_id: string): Observable<sales_Enquiry_Party_Dtls[]> {
    return this.httpClient.get<sales_Enquiry_Party_Dtls[]>(this.url + 'getSalesEnqPartyDtls/' + sales_enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesEnquiryList(): Observable<SalesEnq[]> {
    return this.httpClient.get<SalesEnq[]>(this.url + 'salesEnquiryList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesEnquiriesOpen(date): Observable<SalesEnq[]> {
    return this.httpClient.get<SalesEnq[]>(this.url + 'getSalesEnquiriesOpen/' + date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesEnqItemDtls(sales_enq_id: string): Observable<sales_Enquiry_Item_Dtls[]> {
    return this.httpClient.get<sales_Enquiry_Item_Dtls[]>(this.url + 'getSalesEnqItemDtls/' + sales_enq_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  custAccountRetriveList(cp_Id: string, companyId): Observable<Cust_bussiness_partner_acc> {
    return this.httpClient.get<Cust_bussiness_partner_acc>(this.url + 'custAccountRetriveList/' + cp_Id + "/" + companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  custAddDtlsRetriveList(partner_id: string, company_id: any): Observable<Cust_bussiness_partner_addr_dyn[]> {
    return this.httpClient.get<Cust_bussiness_partner_addr_dyn[]>(this.url + 'custAddDtlsRetriveList/' + partner_id + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  custContactByName(partner_id: string, name: string, company_id: any): Observable<Supp_bussiness_partner_addr_dyn> {
    return this.httpClient.get<Supp_bussiness_partner_addr_dyn>(this.url + 'custContactByName/' + partner_id + "," + name + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  customerNameCodeList(company_id: any): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'customerNameCodeList?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  customerNameCodeListnew(company_id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'customerNameCodeListnew?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  customerList(company_id: any): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'customerList?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  newcustomerList(company_id: any): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'newcustomerList?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  newfastcustomerList(company_id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'newfastcustomerList?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getLoadingAdviceDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingAdviceDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getLoadingAdviceDataListfast(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingAdviceDataListfast/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdocumentno(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdocumentno').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDeliveryChallanDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDeliveryChallanDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliveryChallanFastList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDeliveryChallanFastList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvoiceDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesInvoiceDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // getSalesInvoiceDataListFast(currDate, finyear): Observable<any> {
  //   return this.httpClient.get<any>(this.url + 'getSalesInvoiceDataListFast/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  // }
  
  getWeighmentDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWeighmentDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeighmentDataFastList(currDate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWeighmentDataFastList/' + currDate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getOtherWeighmentDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherWeighmentDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getNopartyList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getNopartyList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getFirstData(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getFirstData').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getOtherWgFirstData(vehicleid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherWgFirstData/' + vehicleid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getOtherWgnmtList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherWgnmtList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPartyBillPayment(): Observable<any> {
    return this.httpClient.get(this.url + 'getPartyBillPayment').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerList(): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'getCustomerList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveItemMasterStatInfo(item_id: string, company_id: string): Observable<Item_master_stat_info[]> {
    return this.httpClient.get<Item_master_stat_info[]>(this.url + 'retriveItemMasterStatInfo/' + item_id + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemQCDetails(item_id: string, company_id: any): Observable<itmItem_master_qc_details[]> {
    return this.httpClient.get<itmItem_master_qc_details[]>(this.url + 'getItemQCDetails/' + item_id + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJobworklist(item_id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'getJobworklist/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getVehicleDetails(vechile_id: string): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.url + 'getVehicleDetails/' + vechile_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleNo(vechile_id: string): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.url + 'getVehicleDetails/' + vechile_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurOrdThruSuppList(supplier_id: string): Observable<PurchaseOrder[]> {
    return this.httpClient.get<PurchaseOrder[]>(this.url + 'getPurOrdThruSuppList/' + supplier_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurchaseOrdernetWeight(purchaseid: string, purchaseitemid: string): Observable<PurchaseOrderItem> {
    return this.httpClient.get<PurchaseOrderItem>(this.url + 'getPurOrderItemWeightViewList/' + purchaseid + "/" + purchaseitemid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurchaseOrdernetWeightnew(purchaseid: string, purchaseitemid: string, packinjgitem): Observable<PurchaseOrderItem> {
    return this.httpClient.get<PurchaseOrderItem>(this.url + 'getPurchaseOrdernetWeightnew/' + purchaseid + "/" + purchaseitemid + "/" + packinjgitem).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurOrdRtnApp(itemType_itemsubtype_suppName_bunit_date_companyId_finyear): Observable<PurchaseOrder[]> {
    return this.httpClient.get<PurchaseOrder[]>(this.url + 'getPurOrdRtnApp?' + itemType_itemsubtype_suppName_bunit_date_companyId_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurGRptRtnApp(itemType_itemsubtype_suppName_bunit_date_companyId_finyear): Observable<PurchaseGRN[]> {
    return this.httpClient.get<PurchaseGRN[]>(this.url + 'getPurGRptRtnApp?' + itemType_itemsubtype_suppName_bunit_date_companyId_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerThruBUGrp(BuunitCustGrp): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerThruBUGrp?' + BuunitCustGrp).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  //here changes by tuhin 
  getSalesreport() {
    return this.httpClient.get(this.url + 'getSalesreport').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesreport2() {
    return this.httpClient.get(this.url + 'getSalesreport2').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReportNameList() {
    return this.httpClient.get(this.url + 'getSalesReportNameList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getSalesRegDynamicList() {
    return this.httpClient.get(this.url + 'getSalesRegDynamicList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getStockReport1List() {
    return this.httpClient.get(this.url + 'getStockReport1List').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getSalesRegDuplicateCheck(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'getSalesRegDuplicateCheck').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  salesDynamicSort(reportname): Observable<any> {

    return this.httpClient.get(this.url + 'salesDynamicSort/' + reportname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  reportTypeDropdownList(reporttype): Observable<any> {

    return this.httpClient.get(this.url + 'reportTypeDropdownList/' + reporttype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getReportField(sales_report): Observable<any> {

    return this.httpClient.get(this.url + 'getReportField/' + sales_report).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReportNameList(sales_report): Observable<any> {

    return this.httpClient.get(this.url + 'getReportNameList/' + sales_report).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReportFieldPurchase(purchase_report): Observable<any> {

    return this.httpClient.get(this.url + 'getReportFieldPurchase/' + purchase_report).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //here changes by bidhan
  getRoleItemMaster(user_role: any): Observable<string> {
    return this.httpClient.get<string>(this.url + 'getRoleItemMaster/' + user_role).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  //  downloadFileSystem(filepath:any): Observable<HttpResponse<string>> 
  // {
  // return this.httpClient.get<HttpResponse<string>>(this.url+'downloadfile/'+filepath).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  //}

  // downloadFileSystem(filepath: string): Observable<HttpResponse<string>> {
  //   let headers = new HttpHeaders();
  //   return this.httpClient.get(this.url+'api/files/system/' + filepath, {
  //     headers: headers,
  //     observe: 'response',
  //     responseType: 'text'
  //   });
  // }


  // getdeletefileSystem(filename: string,filebyid): Observable<any>
  // {

  //   return this.httpClient.get(this.url+'getdeleteprocessfileSystem/'+filename+'/'+filebyid).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}   
  getdocumentList(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getProcessDocs/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }


  getdocumentListwithfileSalesInvoice(doc_pdf): Observable<any> {
   // console.log("doc_pdf" + doc_pdf);
    return this.httpClient.get<any>(this.url + 'getdocumentListwithfileSalesInvoice/' + doc_pdf).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getdocumentListwithfile(doc_pdf): Observable<any> {
    console.log("doc_pdf" + doc_pdf);
    return this.httpClient.get<any>(this.url + 'getdocumentListwithfile/' + doc_pdf).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getdocumentListwithfileDelvChallan(doc_pdf): Observable<any> {
   // console.log("doc_pdf" + doc_pdf);
    return this.httpClient.get<any>(this.url + 'getdocumentListwithfileDelvChallan/' + doc_pdf).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  


  downloadFileSystem(filename: string): Observable<any> {
    console.log("hello");
    return this.httpClient.get(this.url + 'file/download/' + filename, { responseType: 'blob' }).pipe(map((response) => {
      return {
        filename: filename,
        data: response
      };
    }));
  }

  downloadFileSystemDC(filename: string): Observable<any> {
    console.log("hello");
    return this.httpClient.get(this.url + 'file/downloadDC/' + filename, { responseType: 'blob' }).pipe(map((response) => {
      return {
        filename: filename,
        data: response
      };
    }));
  }

  //@GetMapping("file/download/{fileName:.+}")
  downloadFileSystemForWeighment(filename: string, pagename): Observable<any> {
    console.log("hello");
    return this.httpClient.get(this.url + 'files/download/' + filename + "/" + pagename, { responseType: 'blob' }).pipe(map((response) => {
      return {
        filename: filename,
        data: response
      };
    }));
  }
  DriverDetailsimage(filename: string): Observable<any> {
    console.log("hello");
    return this.httpClient.get(this.url + 'file/download/' + filename, { responseType: 'blob' }).pipe(map((response) => {
      return {
        filename: filename,
        data: response
      };
    }));
  }

  /*downloadFileSystem(filename: string): Observable<any>{
    return this.httpClient.get(this.url+'file/download/' + filename , {
      responseType: 'blob'
    })
    .pipe(
      map((res: any) => {
        return new Blob([res.body], { type: 'application/pdf' })
      })
    );
  }*/

  // role by prefernce

  getRolesNameList(role: any): Observable<string> {
    return this.httpClient.get<string>(this.url + 'getRolesNameList/' + role).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  //user email check
  getUserEmailDuplicateCheck(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'getUserEmailDuplicateCheck').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getPurchasereport() {
    return this.httpClient.get(this.url + 'getPurchasereport').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReportNameList(purchase_report): Observable<any> {

    return this.httpClient.get(this.url + 'getPurReportNameList/' + purchase_report).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReportCol(purchase_report: any, reportname: any): Observable<any> {
    return this.httpClient.get(this.url + 'getPurReportCol/' + purchase_report + "/" + reportname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurReportDynamic(purchase_report: any, reportname: any): Observable<Salesregistration[]> {
    return this.httpClient.get<Salesregistration[]>(this.url + 'getPurReportDynamic/' + purchase_report + "/" + reportname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //here dynamic columns

  //    /getSalesInvoicesr/{sales_report}/{reportname}
  //getSalesCol
  getSalesCol(sales_report: any, reportname: any): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesCol/' + sales_report + "/" + reportname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSalesDynamicReportCol(reportname: any): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesDynamicReportCol/' + reportname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getWeighmentReportForAnujSir(fromdate,todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWeighmentReportForAnujSir/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesDynamicProcedure(reportname: any, fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesDynamicProcedure/' + reportname + "/" + fromdate + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurBillNewReport(fromdate, todate, finyear, po_type,supplier_name): Observable<any> {
    return this.httpClient.get(this.url + 'getPurBillNewReport/' + fromdate + "/" + todate + "/" + finyear + "/" + po_type + "/" + supplier_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurBillbalanceNewReport(fromdate, todate, supplier_name, finyear, po_type): Observable<any> {
    return this.httpClient.get(this.url + 'getPurBillbalanceNewReport/' + fromdate + "/" + todate + "/" + supplier_name + "/" + finyear + "/" + po_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSalesInvoicesr(sales_report: any, reportname: any): Observable<Salesregistration[]> {
    return this.httpClient.get<Salesregistration[]>(this.url + 'getSalesInvoicesr/' + sales_report + "/" + reportname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //here dynamic columns ends
  //here ends by tuhin
  getSalesPaymentDetails(BuunitCustTodateFromdate): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesPaymentDetails?' + BuunitCustTodateFromdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getControlAccPayDetails(BuunitLedgerTodateFromdate): Observable<any> {
    return this.httpClient.get(this.url + 'getControlAccPayDetails?' + BuunitLedgerTodateFromdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerName(CpId): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerName/' + CpId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerAddressDetails(cpid): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerAddressDetails/' + cpid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurBillRtnApp(itemType_itemsubtype_suppName_bunit_date_companyId_finyear): Observable<PurchaseBill[]> {
    return this.httpClient.get<PurchaseBill[]>(this.url + 'getPurBillRtnApp?' + itemType_itemsubtype_suppName_bunit_date_companyId_finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdAdvThruSupp(supplier_id: string, business_unit: string): Observable<PurchaseOrder[]> {
    return this.httpClient.get<PurchaseOrder[]>(this.url + 'getPurOrdAdvThruSupp/' + supplier_id + '/' + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGrnThroughPurOrd(business_unit, purtype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGrnThroughPurOrd/' + business_unit + '/' + purtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGrnThroughPurOrdstore(business_unit, purtype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGrnThroughPurOrdstore/' + business_unit + '/' + purtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGrnThroughPurOrdpacking(business_unit, purtype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGrnThroughPurOrdpacking/' + business_unit + '/' + purtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurOrdDetails(pur_order_no: string): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(this.url + 'getPurOrdDetails/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurOrdcheckingwAdvice(purchase_id: any, unadvice_id: any): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(this.url + 'getPurOrdcheckingwAdvice/' + purchase_id + '/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurOrdItemDtls(pur_order_id, item_id): Observable<PurchaseOrderItem> {
    return this.httpClient.get<PurchaseOrderItem>(this.url + 'getPurOrdItemDtls/' + pur_order_id + '/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdItemDtlsnew(pur_order_id, item_id, packing): Observable<PurchaseOrderItem> {
    return this.httpClient.get<PurchaseOrderItem>(this.url + 'getPurOrdItemDtlsnew/' + pur_order_id + '/' + item_id + '/' + packing).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdItemDtlsnewpoitemnumber(pur_order_id): Observable<PurchaseOrderItem> {
    return this.httpClient.get<PurchaseOrderItem>(this.url + 'getPurOrdItemDtlsnewpoitemnumber/' + pur_order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdreceipt_criteria(pur_order_id): Observable<PurchaseOrderItem> {

    return this.httpClient.get<PurchaseOrderItem>(this.url + 'getPurOrdreceipt_criteria/' + pur_order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //add on 07-05-2022  
  getPurOrdBroker(pur_order_id): Observable<PurchaseOrderItem> {

    return this.httpClient.get<PurchaseOrderItem>(this.url + 'getPurOrdBrokerList/' + pur_order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdBrokerNew(pur_order_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurOrdBrokerList/' + pur_order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrd(pur_order_id): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(this.url + 'getPurOrd/' + pur_order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurOrdTrans(pur_order_no: string): Observable<PO_Trans_Infos> {
    return this.httpClient.get<PO_Trans_Infos>(this.url + 'getPurOrdTrans/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purOrdDocRetriveList(pur_order_no: string): Observable<pur_Order_docs[]> {
    return this.httpClient.get<pur_Order_docs[]>(this.url + 'purOrdDocRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purOrdTransConRetriveList(pur_order_no: string): Observable<pur_Order_Terms_Con> {
    return this.httpClient.get<pur_Order_Terms_Con>(this.url + 'purOrdTransConRetriveList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdAppChgs(pur_order_no: string): Observable<pur_Order_app_chgs[]> {
    return this.httpClient.get<pur_Order_app_chgs[]>(this.url + 'getPurOrdAppChgs/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomUomsbyname(name): Observable<any> { return this.httpClient.get<any>(this.url + 'getCustomUomsbyname/' + name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getPurOrdBrokerList(pur_order_no: string): Observable<pur_bussiness_partner_brokers[]> {
    return this.httpClient.get<pur_bussiness_partner_brokers[]>(this.url + 'getPurOrdBrokerList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  purOrdBPDRetriveList(purchage_order: string): Observable<BPDetails> {
    return this.httpClient.get<BPDetails>(this.url + 'purOrdBPDRetriveList/' + purchage_order).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurTermReasons(): Observable<any> {
    return this.httpClient.get(this.url + 'getPurTermReasons').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurchaseOrderList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurchaseOrderList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurchaseOrderListFastApi(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurchaseOrderListFastApi/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getGRNList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGRNList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloaDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloaDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloaDataListfastapi(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloaDataListfastapi/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloaDataListNew(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloaDataListNew/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpurBillDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpurBillDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCompBusinessUnitDiff(bu_id: string): Observable<Bussiness_Unit[]> {
    return this.httpClient.get<Bussiness_Unit[]>(this.url + 'getCompBusinessUnitDiff/' + bu_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCompanyBUMNCList(company_id): Observable<Bussiness_Unit[]> {
    return this.httpClient.get<Bussiness_Unit[]>(this.url + 'getcompanyBUMNCList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getcompanyBUMNCListnew(company_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getcompanyBUMNCListnew/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getcompanyBUMNCListFastApi(company_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getcompanyBUMNCListFastApi/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getProcessShift(process_id): Observable<any> {
    return this.httpClient.get(this.url + 'getProcessShift/' + process_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProcessShiftThruDate(process_id, startdate) {
    return this.httpClient.get(this.url + 'getProcessShiftThruDate/' + process_id + "/" + startdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getShopFloorThruBU(Bussiness_Unit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getShopFloorThruBU/' + Bussiness_Unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getShopFloorThruBUregular(Bussiness_Unit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getShopFloorThruBUregular/' + Bussiness_Unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getShopFloorspecialThruBU(Bussiness_Unit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getShopFloorspecialThruBU/' + Bussiness_Unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemNameByGroup(Bussiness_Unit, shop_floor, process): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemNameByGroup/' + Bussiness_Unit + '/' + shop_floor + '/' + process).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCompanyBusinessUnits(company_id): Observable<Bussiness_Unit[]> {
    return this.httpClient.get<Bussiness_Unit[]>(this.url + 'getCompanyBusinessUnits/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  DriverDetails(driver_id: String): Observable<DriverMasterPopup[]> {
    return this.httpClient.get<DriverMasterPopup[]>(this.url + 'getDriverDetails/' + driver_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvice(vechile_no: string): Observable<unload_code> {
    return this.httpClient.get<unload_code>(this.url + 'getUnloadAdvice/' + vechile_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleTypeName(vechile_no: string): Observable<Vechile_type_Name[]> {
    return this.httpClient.get<Vechile_type_Name[]>(this.url + 'getVehicleTypeName/' + vechile_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadWeightment(vechile_no: string): Observable<UnloadWeighmentList> {
    return this.httpClient.get<UnloadWeighmentList>(this.url + 'getUnloadWeightment/' + vechile_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  //getUnloadAdvRefOpenAdvQc
  getUnloadAdvRefOpenAdvQc(): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadAdvRefOpenAdvQc').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnload_multi_popup(adviceid): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnload_multi_popup/' + adviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  
  getStoreChargesPo(grnid,type): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStoreChargesPo/'+grnid+'/'+type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getPurOrdStoreDynList(pur_order_no): Observable<any> { return this.httpClient.get<any>(this.url + 'getPurOrdStoreDynList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  getUnloadAdvRefOpenAdv(): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadAdvRefOpenAdv').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvRefOpenAdvwt2(): Observable<UnloadAdvice[]> {
    return this.httpClient.get<UnloadAdvice[]>(this.url + 'getUnloadAdvRefOpenAdvWt2').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvRefOpenAdvwt2New(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadAdvRefOpenAdvWt2New').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadAdvRefPOQc(): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadAdvRefPOQc').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvRefPOQcNew(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadAdvRefPOQcNew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvRefPO(): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadAdvRefPO').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvRefPOwt2(): Observable<UnloadAdvice[]> {
    return this.httpClient.get<UnloadAdvice[]>(this.url + 'getUnloadAdvRefPOwt2').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvRefPOwt2Arg(b_unit: string, supp: string, itemtype: string, putype: string, pusutype: string, ordate: string): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadAdvRefPOwt2/' + b_unit + "/" + supp + "/" + itemtype + "/" + putype + "/" + pusutype + "/" + ordate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvRefPOwt2ArgFastAPI(b_unit: string, supp: string, itemtype: string, putype: string, pusutype: string, ordate: string): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadAdvRefPOwt2FastAPI/' + b_unit + "/" + supp + "/" + itemtype + "/" + putype + "/" + pusutype + "/" + ordate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getunloadstore(b_unit: string, supp: string, itemtype: string, putype: string, pusutype: string, ordate: string): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getunloadstore/' + b_unit + "/" + supp + "/" + itemtype + "/" + putype + "/" + pusutype + "/" + ordate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  //tuhin changes 15-04-2022
  getUnloadAdvRefPOwt2Argnew(b_unit: string, supp: string, itemtype: string, putype: string, pusutype: string, ordate: string): Observable<UnloadAdvice[]> {
    return this.httpClient.get<UnloadAdvice[]>(this.url + 'getUnloadAdvRefPOwt2Argnew/' + b_unit + "/" + supp + "/" + itemtype + "/" + putype + "/" + pusutype + "/" + ordate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  //tuhin changes 15-04-2022 ends   
  getpssd_item_qty(unloadadvice: string, weighmentdata: string, purchaseid: string): Observable<string> {
    return this.httpClient.get<string>(this.url + 'getpssd_item_qty/' + unloadadvice + "/" + weighmentdata + "/" + purchaseid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkmulticheck(purchase_id): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(this.url + 'getPurOrdDetails/' + purchase_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkPurchaseOrderUsage(pur_orderid): Observable<any> {
    return this.httpClient.get(this.url + 'checkPurchaseOrderUsage/' + pur_orderid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesReturnNoteUsage(salesreturnnoteid): Observable<any> {
    return this.httpClient.get(this.url + 'salesReturnNoteUsage/' + salesreturnnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesReturnApprovalNoteUsage(salesreturnid): Observable<any> {
    return this.httpClient.get(this.url + 'salesReturnApprovalNoteUsage/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  /* searchReturnApprovalNote(fromdate, todate, party1): Observable<any> {
    return this.httpClient.get(this.url + 'searchReturnApprovalNote/' + fromdate + "/" + todate + "/" + party1).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  } */

  searchReturnApprovalNote(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'searchReturnApprovalNote/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchSalesReturnNote(fromdate, todate, party1): Observable<any> {
    return this.httpClient.get(this.url + 'searchSalesReturnNote/' + fromdate + "/" + todate + "/" + party1).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpssd_packing_qty(unloadadvice: string, weighmentdata: string, purchaseid: string): Observable<string> {
    return this.httpClient.get<string>(this.url + 'getpssd_packing_qty/' + unloadadvice + "/" + weighmentdata + "/" + purchaseid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpssd_packing_qtyrectify(unadviceid: string, price_based_on: string, subtypestatus: string): Observable<string> {
    return this.httpClient.get<string>(this.url + 'getpssd_packing_qtyrectify/' + unadviceid + "/" + price_based_on + "/" + subtypestatus).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpssd_item_qtyrectify(unadviceid: string, price_based_on: string, subtypestatus: string): Observable<string> {
    return this.httpClient.get<string>(this.url + 'getpssd_item_qtyrectify/' + unadviceid + "/" + price_based_on + "/" + subtypestatus).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getpssd_item_qtymultiplepopup(unloadadvice: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpssd_item_qtymultiplepopup/' + unloadadvice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getpssd_packing_qtymultiplepopup(unloadadvice: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpssd_packing_qtymultiplepopup/' + unloadadvice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadDetails(unadviceid: string): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadDetails/' + unadviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getaxnametocode(unadviceid, item_code, packing): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getaxnametocode/' + unadviceid + '/' + item_code + '/' + packing).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadDetailsFastApi(unadviceid: string): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadDetailsFastApi/' + unadviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadDetailsFastApiWgt(unadviceid: string): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadDetailsFastApi/' + unadviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadDetailsmulti_popup(unadviceid): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadDetailsmulti_popup/' + unadviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadItemList(unadvice_id: string): Observable<Wm_unload_advice_item_dtls[]> {
    return this.httpClient.get<Wm_unload_advice_item_dtls[]>(this.url + 'getUnloadItemList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadItemListrevise(unadvice_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadItemListrevise/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //
  getUnloadadvanceList(unadvice_id: string): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadadvanceList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadadvanceListNew(unadvice_id: string): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'getUnloadadvanceListNew/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCBUdetails(bunit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getCBUdetails/' + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCBUdetailsById(bunit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getCBUdetailsById/' + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  wmUnAdviceDriverDtlsRetriveList(unadvice_id: string): Observable<Wm_unload_advice_driver_dtls> {
    return this.httpClient.get<Wm_unload_advice_driver_dtls>(this.url + 'wmUnAdviceDriverDtlsRetriveList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  wmUnAdviceTransInfoRetriveList(unadvice_id: string): Observable<Wm_unload_advice_trans_info[]> {
    return this.httpClient.get<Wm_unload_advice_trans_info[]>(this.url + 'wmUnAdviceTransInfoRetriveList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurGoodRcptDocList(grn_id: string): Observable<pur_good_receipt_docs[]> {
    return this.httpClient.get<pur_good_receipt_docs[]>(this.url + 'getPurGoodRcptDocList/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  grnTransInfoRetriveList(grn_id: string): Observable<RecieptTransInfo> {
    return this.httpClient.get<RecieptTransInfo>(this.url + 'grnTransInfoRetriveList/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  grnOtherInfoRetriveList(grn_id: string): Observable<ReceiptOtherInformation> {
    return this.httpClient.get<ReceiptOtherInformation>(this.url + 'grnOtherInfoRetriveList/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurGoodRcptBrokerList(grn_id: string): Observable<Pur_good_receipt_broker[]> {
    return this.httpClient.get<Pur_good_receipt_broker[]>(this.url + 'getPurGoodRcptBrokerList/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanBrokerDtls(delivery_cid: string): Observable<delivery_challan_Broker_Dtls[]> {
    return this.httpClient.get<delivery_challan_Broker_Dtls[]>(this.url + 'getDlvChallanBrokerDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanShipmentDtls(delivery_cid: string): Observable<delivery_challan_Shipment_Dtls> {
    return this.httpClient.get<delivery_challan_Shipment_Dtls>(this.url + 'getDlvChallanShipmentDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanShipmentDtlsFast(delivery_cid: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDlvChallanShipmentDtlsFast/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanWeightDtls(delivery_cid: string): Observable<delivery_challan_weight_dtl> {
    return this.httpClient.get<delivery_challan_weight_dtl>(this.url + 'getDlvChallanWeightDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanPartyDtls(delivery_cid: string): Observable<delivery_challan_Party_Dtls[]> {
    return this.httpClient.get<delivery_challan_Party_Dtls[]>(this.url + 'getDlvChallanPartyDtls/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanTransInfo(delivery_cid: string): Observable<delivery_challan_Trans_Info> {
    return this.httpClient.get<delivery_challan_Trans_Info>(this.url + 'getDlvChallanTransInfo/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChallanDoc(delivery_cid: string): Observable<delivery_challan_Docs[]> {
    return this.httpClient.get<delivery_challan_Docs[]>(this.url + 'getDlvChallanDoc/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDlvChlnTransInfo(delivery_cid: string): Observable<any> {
    return this.httpClient.get(this.url + 'getDlvChlnTransInfo/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMultipleDlvChlnTransInfo(delivery_cid: string): Observable<any> {
    return this.httpClient.get(this.url + 'getMultipleDlvChlnTransInfo/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliveryChallanDtls(delivery_cid): Observable<DeliveryChallan> {
    return this.httpClient.get<DeliveryChallan>(this.url + 'getDeliveryChallanDtls?' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliveryChallanDtlsFast(delivery_cid): Observable<any> {
    return this.httpClient.get(this.url + 'getDeliveryChallanDtlsFast/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  wmUnAdviceBrokerRetriveList(unadvice_id: string): Observable<Wm_unload_advice_broker_dtls[]> {
    return this.httpClient.get<Wm_unload_advice_broker_dtls[]>(this.url + 'wmUnAdviceBrokerRetriveList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  wmUnAdvicePartyWmRetriveList(unadvice_id: string): Observable<Wm_unload_advice_party_wm> {
    return this.httpClient.get<Wm_unload_advice_party_wm>(this.url + 'wmUnAdvicePartyWmRetriveList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  wmUnAdvicePartyWmRetriveListmultipopup(unadvice_id: string): Observable<Wm_unload_advice_party_wm> {
    return this.httpClient.get<Wm_unload_advice_party_wm>(this.url + 'wmUnAdvicePartyWmRetriveListmultipopup/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  wmUnAdviceAppChgsRetriveList(unadvice_id: string): Observable<wm_unload_advice_app_chgs[]> {
    return this.httpClient.get<wm_unload_advice_app_chgs[]>(this.url + 'wmUnAdviceAppChgsRetriveList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  wmUnAdviceDocRetriveList(unadvice_id: string): Observable<Wm_unload_advice_doc[]> {
    return this.httpClient.get<Wm_unload_advice_doc[]>(this.url + 'wmUnAdviceDocRetriveList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  balancedtotalquantity(purchaseorder_id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'wnUnAdvicebalancedtotalquantity/' + purchaseorder_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChargeMasterDtlsList(applicable_charges_id: string): Observable<charges_details[]> {
    return this.httpClient.get<charges_details[]>(this.url + 'getChargeMasterdtlsList/' + applicable_charges_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChargeMasterList(): Observable<Charges[]> {
    return this.httpClient.get<Charges[]>(this.url + 'getChargeMasterList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getSupplierAddress(supplierCode: string): Observable<Supp_bussiness_partner_addr> {
    return this.httpClient.get<Supp_bussiness_partner_addr>(this.url + 'getSupplierAddr/' + supplierCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  transporterownlist(transporterownlist): Observable<any> {
    return this.httpClient.get<any>(this.url + 'transporterownlist/' + transporterownlist).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChargesMatrixdetails(unloadid: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getChargesMatrixdetails/' + unloadid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChargesMatrixSalesdetails(delivery_cid: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getChargesMatrixSalesdetails/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAppChargesSalesdetails(delivery_cid: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getAppChargesSalesdetails/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierDetailsByCode(supplierCode: string): Observable<Supp_bussiness_partner_bill_addr_dyn[]> {
    return this.httpClient.get<Supp_bussiness_partner_bill_addr_dyn[]>(this.url + 'getSuppContById/' + supplierCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBrokerListBySupplierCode(suppid: String): Observable<PurchageOrderBrokerList[]> {
    return this.httpClient.get<PurchageOrderBrokerList[]>(this.url + 'getSupplierBrokersByCode/' + suppid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBrokerDetailsByBrokerCode(BrokerCode: string): Observable<Supp_bussiness_partner_brokers[]> {
    return this.httpClient.get<Supp_bussiness_partner_brokers[]>(this.url + 'getSupplierBrokersDtls/' + BrokerCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBrokerDetailsByBrokerCodenew(BrokerCode: string, supplier_id: string): Observable<Supp_bussiness_partner_brokers[]> {
    return this.httpClient.get<Supp_bussiness_partner_brokers[]>(this.url + 'getnewSupplierBrokersDtls/' + BrokerCode + "/" + supplier_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransporterBrokers(brokerCode: string): Observable<Trans_bussiness_partner_broker[]> {
    return this.httpClient.get<Trans_bussiness_partner_broker[]>(this.url + 'getTransporterBrokers/' + brokerCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  qcRulesRetriveList(QcId: string): Observable<QcDetails[]> {
    //  return this.httpClient.get<QcDetails[]>(this.url+'qcRulesRetriveList/'+QcId).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
    return this.httpClient.get<QcDetails[]>(this.url + 'qcRuleSetupRetriveList/' + QcId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getQCRuleSetupDtls(QcId: string): Observable<QcDetails> {
    return this.httpClient.get<QcDetails>(this.url + 'getQCRuleSetupDtls/' + QcId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransListByVlno(vehicle_name: String) {
    return this.httpClient.get(this.url + 'getTransListByVlno/' + vehicle_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdAllList(): Observable<purOrderPopup> {
    return this.httpClient.get<purOrderPopup>(this.url + 'getPurOrdAllList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdCNQUPList(pur_order_no: string): Observable<purOrderPopup_dtls[]> {
    return this.httpClient.get<purOrderPopup_dtls[]>(this.url + 'getPurOrdCNQUPList/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpurorderstorepurchase(pur_order_no: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpurorderstorepurchase/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpurorderpacking(pur_order_no: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpurorderpacking/' + pur_order_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getPurGoodRcptBPDtls(grn_id: string): Observable<BusinessPartnerdetails> {
    return this.httpClient.get<BusinessPartnerdetails>(this.url + 'getPurGoodRcptBPDtls/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gePurQuotBPDetails(quotationNo: string): Observable<Business_Partner_details> {
    return this.httpClient.get<Business_Partner_details>(this.url + 'gePurQuotBPDetails/' + quotationNo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurQuotBrokerDtls(quotationNo: string): Observable<pur_Quotation_Broker[]> {
    return this.httpClient.get<pur_Quotation_Broker[]>(this.url + 'getPurQuotBrokerDtls/' + quotationNo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurGoodRcptDtls(grn_id: string): Observable<PurchaseGRN> {
    return this.httpClient.get<PurchaseGRN>(this.url + 'getPurGoodRcptDtls/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurGoodRcptDtlsopengrn(grn_id: string): Observable<PurchaseGRN> {
    return this.httpClient.get<PurchaseGRN>(this.url + 'getPurGoodRcptDtlsopengrn/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurQuotDetails(quotationNo: string): Observable<Quotation> {
    return this.httpClient.get<Quotation>(this.url + 'getPurQuotDetails/' + quotationNo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurQuotPrevList(): Observable<Quotation[]> {
    return this.httpClient.get<Quotation[]>(this.url + 'getPurQuotPrevList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurQuotThruSuppList(ref_type: string, supplier_id: string, itemtype): Observable<Quotation[]> {
    return this.httpClient.get<Quotation[]>(this.url + 'getPurQuotThruSuppList/' + ref_type + "/" + supplier_id + "/" + itemtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurQtyList(refNo: string): Observable<Quotation[]> {
    return this.httpClient.get<Quotation[]>(this.url + 'getPurQtyDDCList/' + refNo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurQtyCNQUPList(quotationNo: string): Observable<QuotationDetails[]> {
    return this.httpClient.get<QuotationDetails[]>(this.url + 'getPurQtyCNQUPList/' + quotationNo).pipe(
      catchError(this.handleError));
  }

  getAccNormsDetails(code: String): Observable<AccNorms[]> {
    return this.httpClient.get<AccNorms[]>(this.url + 'getAccNormsDetails/' + code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehcleno(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleNameCode').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleNumberByVtype(vtype: String) {
    return this.httpClient.get(this.url + 'getVehicleNumberByVtype/' + vtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getContNoBySuppID(suppId: String, name: String): Observable<Supp_bussiness_partner_addr_dyn> {
    return this.httpClient.get<Supp_bussiness_partner_addr_dyn>(this.url + 'getSuppphoneByIdName/' + suppId + "," + name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getContNameBySppId(suppId: String): Observable<Supp_bussiness_partner_addr_dyn[]> {
    return this.httpClient.get<Supp_bussiness_partner_addr_dyn[]>(this.url + 'getSuppContById/' + suppId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  TransInfoRetriveList(advice_id: String): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'loadingTransInfoRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  loadingAdviceVehicle(advice_id: String): Observable<LoadingAdvice> {
    return this.httpClient.get<LoadingAdvice>(this.url + 'loadingAdviceVehicle/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  DriverName(advice_id: String): Observable<UnloadAdvice> {
    return this.httpClient.get<UnloadAdvice>(this.url + 'loadingDriverRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierDelvAddr(suppname: String): Observable<Supp_bussiness_partner> {
    return this.httpClient.get<Supp_bussiness_partner>(this.url + 'getSupplierDelvFromAdd/' + suppname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransAccount(transporter_Id: String): Observable<Trans_bussiness_partner_accont> {
    return this.httpClient.get<Trans_bussiness_partner_accont>(this.url + 'getTransAccount/' + transporter_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getsaleordercharges(transporter_Id: String, referance_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getsaleordercharges/' + transporter_Id + '/' + referance_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpurchaseordercharges(transporter_Id: String, referance_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpurchaseordercharges/' + transporter_Id + '/' + referance_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getTransChargeCode(transporter_Id, transfrom, transto, type): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getTransChargeCode/' + transporter_Id + "/" + transfrom + "/" + transto + "/" + type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  updateTransporterDetailsthruPopup(delv_id, distance): Observable<any> {
    return this.httpClient.get<any>(this.url + 'updateTransporterDetailsthruPopup/' + delv_id + "/" + distance).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getTranstds(bp_id: string): Observable<any> { return this.httpClient.get<any>(this.url + 'getTranstds/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  transporterNameChgsList(orderid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'transporterNameChgsList/' + orderid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  transporterNameChgsPurList(orderid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'transporterNameChgsPurList/' + orderid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCompanyBUAddress(businessunit_id: String): Observable<CompanyBusinessPartnerUnit> {
    return this.httpClient.get<CompanyBusinessPartnerUnit>(this.url + 'getCompanyBUAddress/' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierContDetails(supplier_id: string, suppname: String): Observable<Supp_bussiness_partner_addr_dyn> {
    return this.httpClient.get<Supp_bussiness_partner_addr_dyn>(this.url + 'getSupplierContDetails/' + supplier_id + "/" + suppname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransporterThruSupplier(suppid: String): Observable<any> {
    return this.httpClient.get(this.url + 'getTransporterThruSupplier/' + suppid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAddrById(suppid: String): Observable<Supp_bussiness_partner_addr_dyn> {
    return this.httpClient.get<Supp_bussiness_partner_addr_dyn>(this.url + 'getSupplierAddr/' + suppid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSuppliertransport(suppid: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSuppliertransport/' + suppid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSuppliertdsStatDtls(suppid: String, financial_year): Observable<any> {
    return this.httpClient.get(this.url + 'getSuppliertdsStatDtls/' + suppid + '/' + financial_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSuppBPAcc(suppid: String): Observable<Supp_bussiness_partner_acc> {
    return this.httpClient.get<Supp_bussiness_partner_acc>(this.url + 'getSuppBPAcc/' + suppid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliveryAddrById(suppid: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSuppContactNameList/' + suppid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleThruTransporter(transporter_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleThruTransporter/' + transporter_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  bro_supp_updation(broker_Id: string): Observable<any> {
    return this.httpClient.get(this.url + 'bro_supp_updation/' + broker_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supp_bro_updation(broker_Id: string): Observable<any> {
    return this.httpClient.get(this.url + 'brokercode/' + broker_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getUnload_advice_updation(purchaseid: string, subtype: string): Observable<any> {
    return this.httpClient.get(this.url + 'getUnload_advice_updation/' + purchaseid + "/" + subtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }





  getVehicleThruTransWOWt1(transporter_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleThruTransWOWt1/' + transporter_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleThruTransWOWt2(transporter_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleThruTransWOWt2/' + transporter_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMiscList(): Observable<any> {
    return this.httpClient.get(this.url + 'getMiscList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getMiscListFast(): Observable<any> {
    return this.httpClient.get(this.url + 'getMiscListFast').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSuppAddrById(suppid: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSuppContById/' + suppid).pipe(catchError((err) => {
      console.log("error in service: " + JSON.stringify(err));

      if (Number(err.status) == 500) {
        console.log("Avijit");
      }
      return throwError(err.status);
    }))
  }

  getItemListByGroup(itemGroup): Observable<ItemMaster[]> {
    return this.httpClient.get<ItemMaster[]>(this.url + 'getItemListByGroup/' + itemGroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemPackUom(itemid, itemcode, company): Observable<Item_master_pack_mat_tag> {
    return this.httpClient.get<Item_master_pack_mat_tag>(this.url + 'itempackUom/' + itemid + "&" + itemcode + "&" + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemAlternateprice(itemid, alternateitemid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemAlternateprice/' + itemid + "/" + alternateitemid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getOrderNumberForChallan(referance_id, ref_type): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOrderNumberForChallan/' + referance_id + "/" + ref_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRateChartItemSO(itemid, packingcode, company, business_unit, order_date, pricebasedon): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRateChartItemSO/' + itemid + "/" + packingcode + "/" + company + "/" + business_unit + "/" + order_date + "/" + pricebasedon).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRateChartItemSOforItem(itemid, packingcode, company, business_unit, order_date): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRateChartItemSOforItem/' + itemid + "/" + packingcode + "/" + company + "/" + business_unit + "/" + order_date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRateItemQty(order_date, itemid, packingid, id, pricebasedon): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRateItemQty/' + order_date + "/" + itemid + "/" + packingid + "/" + id + "/" + pricebasedon).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purchasechecktotaltranslimit(totalamount, supplier_name, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'purchasechecktotaltranslimit/' + totalamount + '/' + supplier_name + '/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purchasechecktotaltranslimitupdate(totalamount, supplier_name, finyear, id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'purchasechecktotaltranslimitupdate/' + totalamount + '/' + supplier_name + '/' + finyear + '/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  //16042022  
  checkweightunloadadvice(purchase_id, itemcode, quantity): Observable<any> {
    return this.httpClient.get<any>(this.url + 'checkweightunloadadvice/' + purchase_id + "&" + itemcode + "&" + quantity).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  // gettotalqtyanduom(pur_orderid): Observable<PurchaseOrder>
  //   {
  //   return this.httpClient.get<PurchaseOrder>(this.url+'gettotalqtyanduom/'+pur_orderid).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
  //


  getStkTranGrnDocs(StkId: any): Observable<Stk_Trans_grn_docs[]> {
    return this.httpClient.get<Stk_Trans_grn_docs[]>(this.url + 'getStkTranGrnDocs/' + StkId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTranGrnDtls(StkId: any): Observable<StockTransferGrn> {
    return this.httpClient.get<StockTransferGrn>(this.url + 'getStkTranGrnDtls?' + StkId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  tdsCode(): Observable<TDS> {
    return this.httpClient.get<TDS>(this.url + 'getTDSList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCharges(): Observable<Charges[]> {
    return this.httpClient.get<Charges[]>(this.url + 'getCharges').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }
  tdsAccount(tdscode): Observable<TDS> {
    return this.httpClient.get<TDS>(this.url + 'getTDSRate/' + tdscode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAccPayTerms(): Observable<any> {
    return this.httpClient.get(this.url + 'getAccPayTerms').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierMAsterNCList(): Observable<SupplierMasterNcList[]> {
    return this.httpClient.get<SupplierMasterNcList[]>(this.url + 'supplierMasterNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurQtyDDCList(): Observable<SupplierMasterNcList[]> {
    return this.httpClient.get<SupplierMasterNcList[]>(this.url + 'getPurQtyDDCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  employeeNameList(company_id: any): Observable<any> {
    return this.httpClient.get(this.url + 'getEmployeeName?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  QcDetailsList(item_code: String): Observable<QcDetails> {
    return this.httpClient.get<QcDetails>(this.url + 'getItemQCDetails/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurIndentDDCList1(): Observable<PurIndentDDCList> {
    return this.httpClient.get<PurIndentDDCList>(this.url + 'getPurIndentDDCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDutiesTaxesLedger(): Observable<ledger> {
    return this.httpClient.get<ledger>(this.url + 'getDutiesTaxesLedger').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurIndentCNQUPList(): Observable<indentdls> {
    return this.httpClient.get<indentdls>(this.url + 'getPurIndentCNQUPList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  taxList(): Observable<TaxList> {
    return this.httpClient.get<TaxList>(this.url + 'getTaxNameRate').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  taxlistbycode(code): Observable<any> {
    return this.httpClient.get<any>(this.url + 'taxlistbycode/' + code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCurrentDate(): Observable<any> {
    return this.httpClient.get(this.url + 'getCurrentDate').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  countryList(): Observable<any> {
    return this.httpClient.get(this.url + 'countryList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  statelistByCountryUserprofile(): Observable<any> {
    return this.httpClient.get(this.url + 'statelistByCountryUserprofile').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  stateList(): Observable<any> {
    return this.httpClient.get(this.url + 'stateList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  districtList(): Observable<any> {
    return this.httpClient.get(this.url + 'districtList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  citiNamesList(): Observable<any> {
    return this.httpClient.get(this.url + 'cityList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  areaList(): Observable<any> {
    return this.httpClient.get(this.url + 'areaList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  stateListByCountry(country_name: String): Observable<any> {
    return this.httpClient.get(this.url + 'stateListByCountry/' + country_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  districtListByState(state_name: String): Observable<any> {
    return this.httpClient.get(this.url + 'districtListByState/' + state_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  checkItemMasterUsage(item_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkItemMasterUsage/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkBrokerMasterUsage(broker_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkBrokerMasterUsage/' + broker_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkSupplierMasterUsage(bp_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkSupplierMasterUsage/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkTransporterMasterUsage(bp_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkTransporterMasterUsage/' + bp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // checkVehicleMasterUsage(vehicle_id): Observable<any>
  //   {
  //     return this.httpClient.get(this.url+'checkVehicleMasterUsage/'+vehicle_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}

  checkChargeMasterUsage(charge_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkChargeMasterUsage/' + charge_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  checkStoreChargeMasterUsage(charge_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkStoreChargeMasterUsage/' + charge_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkZoneMasterUsage(zone_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkZoneMasterUsage/' + zone_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkTdsMasterUsage(tds_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkTdsMasterUsage/' + tds_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkChennelCustomerMasterUsage(channel_custid): Observable<any> {
    return this.httpClient.get(this.url + 'checkChennelCustomerMasterUsage/' + channel_custid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkWmChgsMasterUsage(wm_charge_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkWmChgsMasterUsage/' + wm_charge_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkLoadingPointUsage(loading_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkLoadingPointUsage/' + loading_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkMisleniousDeletation(parent_id, parentModel): Observable<any> {
    return this.httpClient.get(this.url + 'checkMisleniousDeletation/' + parent_id + "/" + parentModel).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkCustomerMasterUsage(cust_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkCustomerMasterUsage/' + cust_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkTagAdvicePoUsage(adviceno): Observable<any> {
    return this.httpClient.get(this.url + 'checkTagAdvicePoUsage/' + adviceno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  checkTagAdvicePoUsageingrn(pur_orderno): Observable<any> {
    return this.httpClient.get(this.url + 'checkTagAdvicePoUsageingrn/' + pur_orderno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  checkGRNUsage(grn_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkGRNUsage/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkDeliveryChallanUsage(delivery_cid): Observable<any> {
    return this.httpClient.get(this.url + 'checkDeliveryChallanUsage/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkShopFloorUsage(shop_floor_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkShopFloorUsage/' + shop_floor_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkPayTermUsage(payterm_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkPayTermUsage/' + payterm_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkQualityCheckUsage(qc_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkQualityCheckUsage/' + qc_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkStockGRNUsage(grn_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkStockGRNUsage/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDistrictThruState(state_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getDistrictThruState/' + state_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPincodeThruPO(PostOffice): Observable<any> {
    return this.httpClient.get(this.url + 'getPincodeThruPO?po=' + PostOffice).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCityListThruDistrict(cityCode: String): Observable<any> {
    return this.httpClient.get(this.url + 'getCityListThruDistrict/' + cityCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPostOfficeThruDist(district_name: String): Observable<any> {
    return this.httpClient.get(this.url + 'getPostOfficeThruDist?distid=' + district_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  cityListByDistrict(district_name: String): Observable<any> {
    return this.httpClient.get(this.url + 'cityListByDistrict/' + district_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDriverList(): Observable<any> {
    return this.httpClient.get(this.url + 'getDriverList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDriverListnew(): Observable<any> {
    return this.httpClient.get(this.url + 'getDriverListnew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  itemTypeList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getItemTypes/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemTypeListNew(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getItemTypesNew/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemTypeListFastAPI(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'itemTypeListFastAPI/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getQcrulesNc(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getQcrulesNc/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemGroupList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getIGroupNames/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemGroupFastList(company_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'itemGroupFastList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemGroupName(groupname: String): Observable<any> {
    return this.httpClient.get(this.url + 'chkItemGroupName/' + groupname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemCatagoryList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getICategoriesName/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  screenList(): Observable<any> {
    return this.httpClient.get(this.url + 'getScreenList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  reasonList(): Observable<any> {
    return this.httpClient.get(this.url + 'getReasonList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUserroleAccessperrole(role): Observable<any> {
    return this.httpClient.get(this.url + 'getUserroleAccessperrole/' + role).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  TDSList(): Observable<any> {
    return this.httpClient.get(this.url + 'getTDSList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemTypeId(category_id: String): Observable<Item_category> {
    return this.httpClient.get<Item_category>(this.url + 'getItemTypeByCode/' + category_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  customUOMList(): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomUOMNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehiclesFromVehicleLoadUnload(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehiclesFromVehicleLoadUnload').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getWeighmentCustomUOM(): Observable<any> {
    return this.httpClient.get(this.url + 'getWeighmentCustomUOM').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStandardCustomUOM(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getStandardCustomUOM/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUomByIGroup(uomCode: String): Observable<any> {
    return this.httpClient.get(this.url + 'getUomByIGroup/' + uomCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUomName(uomCode: String): Observable<CustomUom> {
    return this.httpClient.get<CustomUom>(this.url + 'getUomByIGroup/' + uomCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCBUAddr(bpname): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getCBUAddr/' + bpname).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemTypeNameByCode(itemCode: String): Observable<ItemType> {
    return this.httpClient.get<ItemType>(this.url + 'getItemTypeNameByCode/' + itemCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomUOMs(UnitType: String): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomUOMs/' + UnitType).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUomList(): Observable<any> {
    return this.httpClient.get(this.url + 'getUomList/').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getCustomUOMsnew(): Observable<CustomUom[]> { return this.httpClient.get<CustomUom[]>(this.url + 'getCustomUoms').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); })) }

  custometrBusList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getcompanyBUMNCList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLedgerWithBACH(): Observable<any> {
    return this.httpClient.get(this.url + 'getLedgerWithBACH').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  ledgerNameList(): Observable<ledger> {
    return this.httpClient.get<ledger>(this.url + 'getLedger').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  ledgerNameListNew(): Observable<ledger> {
    return this.httpClient.get<ledger>(this.url + 'getLedgerNew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLedgerName(ledgerid): Observable<any> {
    return this.httpClient.get(this.url + 'getLedgerName?ledgerid=' + ledgerid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  controlAccList(): Observable<any> {
    return this.httpClient.get(this.url + 'getControlLedgers').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // getControlLedgers(company_id:any): Observable<any>
  // {
  //   return this.httpClient.get(this.url+'getControlLedgers?company='+company_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}

  taxCodeList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getTaxCNameCode/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  ledgerListBySubGroup(ledger_name: String): Observable<any> {
    return this.httpClient.get(this.url + 'getLedgerBySGr/' + ledger_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  brokerNamesList(): Observable<any> {
    return this.httpClient.get(this.url + 'brokerMsNameList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  brokerCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'brokerMNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  ledgerList(): Observable<any> {
    return this.httpClient.get(this.url + 'getLedger').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  brokerGroupList(): Observable<any> {
    return this.httpClient.get(this.url + 'brokerGroupMasterList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // getbrokerGroupList(company_id:any): Observable<any>
  // {
  //   return this.httpClient.get(this.url+'brokerGroupList?=company'+company_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}



  customerCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'customerNameCodeListNC').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  customerNameList(): Observable<any> {
    return this.httpClient.get(this.url + 'customerMsNameListNC').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  supplierCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'supplierMasterNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierorcustomerCodeList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'supplierorcustomerCodeList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierorcustomerCodeListNew(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'supplierorcustomerCodeListNew/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  //accountposting

  accountpostingSupplierBPartner(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingSupplierBPartner/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingUndoSupplierBPartner(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingUndoSupplierBPartner/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingBrokerMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingBrokerMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingUndoBrokerMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingUndoBrokerMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //accoutnpostingends
  supplierNameCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'supplierGroupList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  transporterCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'getTransporterMNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSuppParentGroupName(sgroupid: String): Observable<Supplier_group> {
    return this.httpClient.get<Supplier_group>(this.url + 'getSuppParentGroup/' + sgroupid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getsupplierByGroup(group): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getsupplierByGroup/' + group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  otherPartnerCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'getOtherPartnerMsCodeList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  otherPartnerNameList(): Observable<any> {
    return this.httpClient.get(this.url + 'getOtherPartnerMsNameList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  payTermList(): Observable<any> {
    return this.httpClient.get(this.url + 'getPayTermList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  bUnitList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getcompanyBUMNCList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByBUnitCode(businessunit_code: String): Observable<CompanyBusinessPartnerUnit> {
    return this.httpClient.get<CompanyBusinessPartnerUnit>(this.url + 'bUnitNameByCode/' + businessunit_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStockOrdByUnloadCode(reference_id, reference_status): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStockOrdByUnloadCode/' + reference_id + "/" + reference_status).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  aGroupList(): Observable<any> {
    return this.httpClient.get(this.url + 'getGroupmasterCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getgstdetailsoftaxtype(taxid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getgstdetailsoftaxtype/' + taxid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByAcGroupCode(group_code: String): Observable<any> {
    return this.httpClient.get(this.url + 'getGroupmasterNByCList/' + group_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  aSubGroupList(): Observable<any> {
    return this.httpClient.get(this.url + 'getSubgroupName').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.url + 'getUsers').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByAcSubGroupCode(asubgroup_code: String) {
    return this.httpClient.get(this.url + 'getSubGroupmasterNByC/' + asubgroup_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTaxNameByTaxCode(tax_code: String): Observable<dy_taxCode> {
    return this.httpClient.get<dy_taxCode>(this.url + 'getTaxNameByTaxCode/' + tax_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemGroupUom(groupId: string): Observable<uom> {
    return this.httpClient.get<uom>(this.url + 'getItemGroupUom/' + groupId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  userCostCenterList(): Observable<any> {
    return this.httpClient.get(this.url + 'getAccCostCentreNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  costCatagoryCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'getAccCostCategoriCNList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByCostCatagoryCode(costcat_code: String) {
    return this.httpClient.get(this.url + 'getAccCostCatNListbyC/' + costcat_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  vehicleCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleTNameCode').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findItems(company_id, searchText: string): Observable<ItemMaster[]> {
    return this.httpClient.get<ItemMaster[]>(this.url + 'findItems/' + company_id + "/" + searchText).pipe(
      catchError(this.handleError));
  }

  findItemGroup(searchText: string, company_id): Observable<Item_group_master[]> {
    return this.httpClient.get<Item_group_master[]>(this.url + 'findItemGroups?searchtext=' + searchText + "&company=" + company_id).pipe(
      catchError(this.handleError));
  }

  findSupplierGrps(searchText: string, company_id): Observable<Supplier_group[]> {
    return this.httpClient.get<Supplier_group[]>(this.url + 'findSupplierGrps?searchtext=' + searchText + "&company=" + company_id).pipe(
      catchError(this.handleError));
  }

  findTransporterGrps(searchText: string, company_id): Observable<Transporter_group[]> {
    return this.httpClient.get<Transporter_group[]>(this.url + 'findTransporterGrps?searchtext=' + searchText + "&company=" + company_id).pipe(
      catchError(this.handleError));
  }

  findVehicles(company_id, searchText: string): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.url + 'findVehicles?company=' + company_id + "&searchtext=" + searchText).pipe(
      catchError(this.handleError));
  }

  findItemTypes(company_id, searchText: string): Observable<Item_type_master[]> {
    return this.httpClient.get<Item_type_master[]>(this.url + 'findItemTypes/' + company_id + "/" + searchText).pipe(
      catchError(this.handleError));
  }

  findItemCategories(company_id, searchText: string): Observable<Item_category_master[]> {
    return this.httpClient.get<Item_category_master[]>(this.url + 'findItemCategories/' + company_id + "/" + searchText).pipe(
      catchError(this.handleError));
  }

  findDistricts(searchText: string): Observable<district[]> {
    return this.httpClient.get<district[]>(this.url + 'findDistricts?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findCities(searchText: string): Observable<city[]> {
    return this.httpClient.get<city[]>(this.url + 'findCities?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findPostOffice(searchText: string, dist: string): Observable<PostOffice[]> {
    return this.httpClient.get<PostOffice[]>(this.url + 'findPostOffice?pincode=' + searchText + "&dist=" + dist).pipe(
      catchError(this.handleError));
  }

  findAllPostOffice(searchText: string): Observable<PostOffice[]> {
    return this.httpClient.get<PostOffice[]>(this.url + 'findAllPostOffice?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findCustomers(searchText: string): Observable<cust_bussiness_partner[]> {
    return this.httpClient.get<cust_bussiness_partner[]>(this.url + 'findCustomers/' + searchText).pipe(
      catchError(this.handleError));
  }

  accountpostingCustomerMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingCustomerMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingUndoCustomerMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingUndoCustomerMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  findCustomerGrps(searchText: string, company_id): Observable<Cust_group[]> {
    return this.httpClient.get<Cust_group[]>(this.url + 'findCustomerGrps?searchtext=' + searchText + "&company=" + company_id).pipe(
      catchError(this.handleError));
  }

  findBrokers(searchText: string): Observable<Broker[]> {
    return this.httpClient.get<Broker[]>(this.url + 'findBrokers/' + searchText).pipe(
      catchError(this.handleError));
  }

  findBrokerGrps(searchText: string, company_id): Observable<Broker_group[]> {
    return this.httpClient.get<Broker_group[]>(this.url + 'findBrokerGrps?searchtext=' + searchText + "&company=" + company_id).pipe(
      catchError(this.handleError));
  }

  findSuppliers(searchText: string): Observable<Supp_bussiness_partner[]> {
    return this.httpClient.get<Supp_bussiness_partner[]>(this.url + 'findSuppliers/' + searchText).pipe(
      catchError(this.handleError));
  }

  // findTransporterGroup(searchText:string): Observable<Transporter_group[]>
  // {
  //    return this.httpClient.get<Transporter_group[]>(this.url+'findTransporterGroup/'+searchText).pipe(
  //      catchError(this.handleError));
  // }

  findWarehouse(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findWarehouse?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findBin(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findBin?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findArea(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findAreas?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findScreen(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findScreen?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }
  findPurpose(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findPurpose?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }
  findInvoiceType(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findInvoiceType?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findReason(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findReason?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findDepartment(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findDepartment?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findCustomUom(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findCustomUom?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }
  findMisc(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findMisc?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findVehicleType(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findVehicleType?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }
  findVehicle(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findVehicle?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }
  findTransChgsMatrix(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findTransChgsMatrix?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }
  findTaxCode(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findTaxCode?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }
  findTaxType(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findTaxType?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findDesignation(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findDesignation?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findCompanys(searchText: string): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.url + 'findCompanys?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findQcRulesSetup(searchText: string): Observable<Qc_rules_setup[]> {
    return this.httpClient.get<Qc_rules_setup[]>(this.url + 'findQcRulesSetup?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findAccPayTerm(searchText: string): Observable<Acc_pay_term[]> {
    return this.httpClient.get<Acc_pay_term[]>(this.url + 'findAccPayTerm?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findWeighmentCharges(searchText: string): Observable<WeighmentCharges[]> {
    return this.httpClient.get<WeighmentCharges[]>(this.url + 'findWeighmentCharges?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findChannelCustomer(searchText: string): Observable<channel_cust_master[]> {
    return this.httpClient.get<channel_cust_master[]>(this.url + 'findChannelCustomer?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findShopFloor(searchText: string): Observable<Shop_floor_master[]> {
    return this.httpClient.get<Shop_floor_master[]>(this.url + 'findShopFloor?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findLoadingPoint(searchText: string): Observable<LaodingPoint[]> {
    return this.httpClient.get<LaodingPoint[]>(this.url + 'findLoadingPoint?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findZoneMaster(searchText: string): Observable<ZoneMaster[]> {
    return this.httpClient.get<ZoneMaster[]>(this.url + 'findZoneMaster?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findChargeMaster(searchText: string): Observable<Charges[]> {
    return this.httpClient.get<Charges[]>(this.url + 'findChargeMaster?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findCompanyBUMaster(searchText: string): Observable<CompanyBusinessPartnerUnit[]> {
    return this.httpClient.get<CompanyBusinessPartnerUnit[]>(this.url + 'findCompanyBUMaster?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  findTransporters(searchText: string): Observable<Trans_bussiness_partner[]> {
    return this.httpClient.get<Trans_bussiness_partner[]>(this.url + 'findTransporters/' + searchText).pipe(
      catchError(this.handleError));
  }

  nameListByVehicleTypeCode(vehtype_code: String): Observable<Vechile_type_Name> {
    return this.httpClient.get<Vechile_type_Name>(this.url + 'getVehicleTypeNByCode/' + vehtype_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accLedgerNameList(): Observable<any> {
    return this.httpClient.get(this.url + 'getAccLedgerList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  wareHCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'getWarehouseNameCode').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByWreHouseCode(warehouse_name: String): Observable<any> {
    return this.httpClient.get(this.url + 'getWHNListbyCode/' + warehouse_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  employeeNamesList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getEmployeeName?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  employeeAdminNamesList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'employeeAdminNamesList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getEmployeeNamenew(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getEmployeeNamenew?company=' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getroles(): Observable<any> {
    return this.httpClient.get(this.url + 'getRoles').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRoleList(): Observable<any> {
    return this.httpClient.get(this.url + 'getRoleList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByItemTypeCode(item_category: String): Observable<Item_category> {
    return this.httpClient.get<Item_category>(this.url + 'getItemTypeByName/' + item_category).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  deptNamesList(): Observable<any> {
    return this.httpClient.get(this.url + 'getDepartmentNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAllItems(): Observable<any> {
    return this.httpClient.get(this.url + 'getAllItems').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purposesList(): Observable<any> {
    return this.httpClient.get(this.url + 'getPurposeList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getVehicleThruWeighment(): Observable<Vechile_type_Name[]> {
    return this.httpClient.get<Vechile_type_Name[]>(this.url + 'getVehicleThruWeighment').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleThruWeighmentfast(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getVehicleThruWeighmentfast').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  allVechileList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'allVechileList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleNameCode(): Observable<Vechile_type_Name[]> {
    return this.httpClient.get<Vechile_type_Name[]>(this.url + 'getVehicleNameCode').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkDriverStatus(documentNo: string): Observable<DriverMasterPopup[]> {
    return this.httpClient.get<DriverMasterPopup[]>(this.url + 'chkDriverStatus/' + documentNo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadCode(): Observable<grn_unload_code_list[]> {
    return this.httpClient.get<grn_unload_code_list[]>(this.url + 'getUnloadCodeList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadCodeList(bp_Id: String): Observable<grn_unload_code_list[]> {
    return this.httpClient.get<grn_unload_code_list[]>(this.url + 'getUnloadCodeList/' + bp_Id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdviceList(): Observable<LoadingAdvice[]> {
    return this.httpClient.get<LoadingAdvice[]>(this.url + 'getLoadingAdviceList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierNamesList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'supplierMasterNCList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierNamesNewList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'supplierMasterNCListNew/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  newsupplierNamesList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'newsupplierNamesList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSupplierThruBU(business_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getSupplierThruBU/' + business_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierThruBUnew(business_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getSupplierThruBUnew/' + business_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  transporterNamesList(): Observable<any> {
    return this.httpClient.get(this.url + 'getTransporterMNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransporterMNCListFast(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getTransporterMNCListFast').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  transportNameCodeList(): Observable<any> {
    return this.httpClient.get(this.url + 'transporterGroupList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBankLedger(): Observable<any> {
    return this.httpClient.get(this.url + 'getBankLedger').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemNamesList(): Observable<itemModalPopUp[]> {
    return this.httpClient.get<itemModalPopUp[]>(this.url + 'getItemCodeName').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemNamesNewList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemCodeNewName').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemThruSales(): Observable<itemModalPopUp[]> {
    return this.httpClient.get<itemModalPopUp[]>(this.url + 'getItemThruSales').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruSaleNew(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemThruSalesNew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemThruSalesThruBU(BuUnit, company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getItemThruSalesThruBU?bunit=' + BuUnit + "&company=" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruSalesThruBUFastApi(BuUnit, company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getItemThruSalesThruBUFastApi/' + BuUnit + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruSalesThruBU_inv_type(BuUnit, company_id, inv_type): Observable<any> {
    return this.httpClient.get(this.url + 'getItemThruSalesThruBU_inv_type?bunit=' + BuUnit + "&company=" + company_id + "&inv_type=" + inv_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruSalesThruBU_inv_typeGST(BuUnit, company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getItemThruSalesThruBU_inv_typeGST/' + BuUnit + '/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruSalesThruBU_inv_typeReg(BuUnit, company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getItemThruSalesThruBU_inv_typeReg/' + BuUnit + '/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruProcessed(Bussiness_Unit): Observable<itemModalPopUp[]> {
    return this.httpClient.get<itemModalPopUp[]>(this.url + 'getItemThruProcessed/' + Bussiness_Unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRateChartItemList(curr_date, b_unit, inv_type): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRateChartItemList/' + curr_date + '/' + b_unit + '/' + inv_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //itemnameproduction

  itemnameproduction(entrymode, businessunit, shopfloor): Observable<any> {
    return this.httpClient.get<any>(this.url + 'itemnameproduction/' + entrymode + '/' + businessunit + '/' + shopfloor).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  itemNameByGroupProduction(businessunit, itemgroup): Observable<any> {
    return this.httpClient.get<any>(this.url + 'itemNameByGroupProduction/' + businessunit + '/' + itemgroup).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemThruProcesse(): Observable<itemModalPopUp[]> {
    return this.httpClient.get<itemModalPopUp[]>(this.url + 'getItemThruProcessed').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemThruPurchase(): Observable<itemModalPopUp[]> {
    return this.httpClient.get<itemModalPopUp[]>(this.url + 'getItemThruPurchase').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemThruPurchasenew(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemThruPurchasenew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemCodeByPacking(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getItemCodeByPacking/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  addressBySupplierName(ship_to_addr_id: String): Observable<any> {
    return this.httpClient.get(this.url + 'getSupplierAddr/' + ship_to_addr_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  //order_id


  nameListByTransCode(bp_code: String): Observable<transportcode> {
    return this.httpClient.get<transportcode>(this.url + 'bpNameByCode/' + bp_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  brokerNameList(): Observable<any> {
    return this.httpClient.get(this.url + 'brokerMNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  brokerNameListFast(): Observable<any> {
    return this.httpClient.get(this.url + 'brokerNameListFast').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getVehiclenoall(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehiclenoall').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehiclenoallNew(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehiclenoallNew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getInvTypes(): Observable<any> {
    return this.httpClient.get(this.url + 'getInvTypes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getInvSalesTypes(): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesInvTypes').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getInvSalesTypesFast(): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesInvTypesFast').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  geteinvoicestatus_saleinv(id, invoiceno): Observable<any> {
    return this.httpClient.get(this.url + 'geteinvoicestatus_saleinv/' + id + '/' + invoiceno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  geteinvoicestatus_creditnote(id, invoiceno): Observable<any> {
    return this.httpClient.get(this.url + 'geteinvoicestatus_creditnote/' + id + '/' + invoiceno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  nameListByItemCode(item_code: String): Observable<any> {
    return this.httpClient.get(this.url + 'getItemNameByCode/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemNameById(item_code: String, company_id: String): Observable<ItemMaster> {
    return this.httpClient.get<ItemMaster>(this.url + 'getItemNameById/' + item_code + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemNameByIdNew(item_code: String, company_id: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemNameById/' + item_code + "/" + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getTaxCodeDetails(tax_code: String): Observable<any> {
    return this.httpClient.get(this.url + 'getTaxCodeDetails/' + tax_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getTaxCodeDetailsname(tax_name: String): Observable<any> {
    return this.httpClient.get(this.url + 'getTaxCodeDetailsname?' + tax_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  gettaxcodefromgrn(itemcode, grnid): Observable<any> {
    return this.httpClient.get(this.url + 'gettaxcodefromgrn/' + itemcode + "/" + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gettaxcodefromgrnnew(itemcode, grnid, packingcode): Observable<any> {
    return this.httpClient.get(this.url + 'gettaxcodefromgrnnew/' + itemcode + "/" + grnid + "/" + packingcode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gettaxcodefromgrnnewForStore(itemcode, grnid, packingcode, classified:string): Observable<any> {
    return this.httpClient.get(this.url + 'gettaxcodefromgrnnewForStore/' + itemcode + "/" + grnid + "/" + packingcode + "/" + classified).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemMasterPackMat(item_code: String): Observable<ItemMaster[]> {
    return this.httpClient.get<ItemMaster[]>(this.url + 'getItemMasterPackMat/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getAlternativeItemList(item_code): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getAlternativeItemList/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStockVehicleAndDriver(challan_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStockVehicleAndDriver/' + challan_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemMasterPackMatMultipopup(item_code: String): Observable<ItemMaster[]> {
    return this.httpClient.get<ItemMaster[]>(this.url + 'getItemMasterPackMatMultipopup/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getItemMasterPackMaterials(item_code: String): Observable<any> {
    return this.httpClient.get(this.url + 'getItemMasterPackMaterials/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  /*  getBomInputDtls(Production_Id:String, item_code: String): Observable<Bom_Input_Details[]>
    {
      return this.httpClient.get<Bom_Input_Details[]>(this.url+'getBomInputDtls/'+Production_Id+"/"+item_code).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
*/
  getBomInputDtls(Production_Id: String, item: String, packing: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getBomInputDtls/' + Production_Id + "/" + item + "/" + packing).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  /*getBomOutputDtls(Production_Id:String,item_code: String): Observable<Bom_Output_Details[]>
  {
    return this.httpClient.get<Bom_Output_Details[]>(this.url+'getBomOutputDtls/'+Production_Id+"/"+item_code).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
*/
  getBomOutputDtls(Production_Id: String, item: String, packing: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getBomOutputDtls/' + Production_Id + "/" + item + "/" + packing).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemMasterPackMatList(item_code: String): Observable<ItemMaster[]> {
    return this.httpClient.get<ItemMaster[]>(this.url + 'getItemMasterPackMatList/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSuppdtls(sp_name: String): Observable<ItemMaster[]> {
    return this.httpClient.get<ItemMaster[]>(this.url + 'getSupplierContDetails/' + sp_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  designationList(): Observable<any> {
    return this.httpClient.get(this.url + 'getDesignation').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  designationListNew(): Observable<any> {
    return this.httpClient.get(this.url + 'designationListNew').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUserroleAccess(): Observable<any> {
    return this.httpClient.get(this.url + 'getUserRoleList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTDSList(): Observable<any> {
    return this.httpClient.get(this.url + 'getTDSList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTDSRate(tdsnum: String): Observable<any> {
    return this.httpClient.get(this.url + 'getTDSRate/' + tdsnum).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  brokerListById(broker_code: String): Observable<broker_name> {
    return this.httpClient.get<broker_name>(this.url + 'brokerNameByCode/' + broker_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  partynameListById(party_code: String): Observable<cust_bussiness_partner> {
    return this.httpClient.get<cust_bussiness_partner>(this.url + 'getCustomerName/' + party_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierNameListById(party_code: String): Observable<Supp_bussiness_partner> {
    return this.httpClient.get<Supp_bussiness_partner>(this.url + 'getSupplierName/' + party_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  brokerListByCode(broker_code: String): Observable<transportcode> {
    return this.httpClient.get<transportcode>(this.url + 'brokerNameByCode/' + broker_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurIndentDDCList(indentCode: String, itemtype): Observable<Indent[]> {
    return this.httpClient.get<Indent[]>(this.url + 'getPurIndentDDCList/' + indentCode + "/" + itemtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurEnquiryInformal(ref_type: string): Observable<Enquiry[]> {
    return this.httpClient.get<Enquiry[]>(this.url + 'getPurEnquiryInformal/' + ref_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurEnquiryDDCSuppList(ref_type: string, supplier_id: string, itemtype) {
    return this.httpClient.get<Enquiry[]>(this.url + 'getPurEnquiryDDCSuppList/' + ref_type + "/" + supplier_id + "/" + itemtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurEnquiryDDCList(ref_type: String): Observable<Enquiry[]> {
    return this.httpClient.get<Enquiry[]>(this.url + 'getPurEnquiryDDCList/' + ref_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurEnquiryDetails(EnqId: string): Observable<Enquiry> {
    return this.httpClient.get<Enquiry>(this.url + 'getPurEnquiryDetails/' + EnqId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurEnquiryCNQUPList(EnqCode: String): Observable<EnquiryServiceDetails[]> {
    return this.httpClient.get<EnquiryServiceDetails[]>(this.url + 'getPurEnquiryCNQUPList/' + EnqCode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurIndentDtls(indentNo: string): Observable<Indent> {
    return this.httpClient.get<Indent>(this.url + 'getPurIndentDtls/' + indentNo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStkTranGrnItemDlts(stk_grn_id: string): Observable<Stk_Transfer_pur_inv_item_dtls[]> {
    return this.httpClient.get<Stk_Transfer_pur_inv_item_dtls[]>(this.url + 'getStkTranGrnItemDlts/' + stk_grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurIndentDetailList(indentNo: string): Observable<IndentorderDetails[]> {
    return this.httpClient.get<IndentorderDetails[]>(this.url + 'getPurIndentDetailsList/' + indentNo).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  payTermNameList(): Observable<any> {
    return this.httpClient.get(this.url + 'getPayTermNCList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  payTermNameListFast(): Observable<any> {
    return this.httpClient.get(this.url + 'getPayTermNCListFast').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByBrokerCode(group_type: String, company): Observable<Broker_group> {
    return this.httpClient.get<Broker_group>(this.url + 'getBroParentGroup/' + group_type + '/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  custNameList(): Observable<any> {
    return this.httpClient.get(this.url + 'custGroupList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByCustomerCode(group_type: String): Observable<Cust_group> {
    return this.httpClient.get<Cust_group>(this.url + 'getCustParentGroup/' + group_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAreaList(): Observable<any> {
    return this.httpClient.get(this.url + 'areaList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  nameListByTransporterCode(group_type: String): Observable<Transporter_group> {
    return this.httpClient.get<Transporter_group>(this.url + 'getTransParentGroup/' + group_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // getSuppContactNameList(supplier_name: String)
  // {
  //   return this.httpClient.get<purchase[]>(this.url+'getSuppContactNameList/'+supplier_name).pipe(
  //     catchError(this.handleError));
  // }

  getSuppContactNameList(supplierId: String): Observable<Supp_bussiness_partner_delv_froms> {
    return this.httpClient.get<Supp_bussiness_partner_delv_froms>(this.url + 'getSuppContactNameList/' + supplierId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierBrokerList(supplier_name: String): Observable<accNorms> {
    return this.httpClient.get<accNorms>(this.url + 'getSupplierBrokersByCode/' + supplier_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAccNormsNc(): Observable<accNorms[]> {
    return this.httpClient.get<accNorms[]>(this.url + 'getAccNormsNc').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierBrokerDtls(ven_code_name: String): Observable<pur_bussiness_partner_brokers> {
    return this.httpClient.get<pur_bussiness_partner_brokers>(this.url + 'getSupplierBrokersDtls/' + ven_code_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBrokerNameByBrokerCode(ven_code_name: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'brokerNameByCode/' + ven_code_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdByUnloadCode(unload_id: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadDetails/' + unload_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpurnoByPurOrdCode(pur_id: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurOrdDetails/' + pur_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  supplierStatutaries(supplier_name: String): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(this.url + 'getSupplierStatutaries/' + supplier_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierDelvFromAdd(supplier_id: string, supplier_name: String): Observable<Supp_bussiness_partner> {
    return this.httpClient.get<Supp_bussiness_partner>(this.url + 'getSupplierDelvFromAdd/' + supplier_id + "/" + supplier_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message  
    return throwError("Somtning Bad happened . Please Try Again");
  }

  getGatepasschecklistin(): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepasschecklistin').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getGatepasschecklistout(): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepasschecklistout').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getVehicleListgatepassauth(vehicle_id): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleListgatepassauth/' + vehicle_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getgatepassauthdetails(authoziationid): Observable<any> {
    return this.httpClient.get(this.url + 'getgatepassauthdetails/' + authoziationid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getVehicleListgatepassout(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleListgatepassout').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getVehicleListWeighmenOutAuth(): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleListWeighmenOutAuth').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getGatepassgetin_List(): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepassgetin_List').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGatepassgetinretrivebyid(id): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepassgetinretrivebyid/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGatepassgetinretrivedetails(gp_gi_id): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepassgetinretrivedetails/' + gp_gi_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGatepassgetouta_List(): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepassgetouta_List').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGatepassgetoutaretrivebyid(id): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepassgetoutaretrivebyid/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGatepassgetoutaretrivedetails(gp_go_auth_id): Observable<any> {
    return this.httpClient.get(this.url + 'getGatepassgetoutaretrivedetails/' + gp_go_auth_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gatoutList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'gatoutList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveGatepassGateOut(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGatepassGateOut/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveGatepassGateOutDetails(gp_go_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGatepassGateOutDetails/' + gp_go_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gatepassCheckList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'gatepassCheckList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retriveGatepassChkList(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGatepassChkList/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkGatePassCheckListUsage(gp_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkGatePassCheckListUsage/' + gp_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  // Visitors master starts     
  visitorsList(): Observable<any> {
    return this.httpClient.get(this.url + 'visitorsList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrieveVisitorById(id): Observable<any> {
    return this.httpClient.get(this.url + 'retrieveVisitorById/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVisitorsimageimage(doc_img: String): Observable<Blob> {
    return this.httpClient.get(this.url + 'getVisitorsimageimage/' + doc_img, {

      responseType: 'blob'
    });
  }

  getTransporterimageimage(doc_img: String): Observable<Blob> {
    return this.httpClient.get(this.url + 'getTransporterimageimage/' + doc_img, {

      responseType: 'blob'
    });
  }

  checkVisitorMasterDeletion(visitor_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkVisitorMasterDeletion/' + visitor_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  // Visitors master ends


  getliewterminationsalelist(): Observable<SalesOrder> {
    return this.httpClient.get<SalesOrder>(this.url + 'getliewterminationsalelist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAll(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getAll/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSaleOrderList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSaleOrderList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSaleOrderFastList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSaleOrderFastList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findsaleorder(searchtext): Observable<any> {
    return this.httpClient.get<any>(this.url + 'findsaleorder/' + searchtext).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  searchsaleorder(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchsaleorder?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  searchLoadingAdviceFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchLoadingAdviceFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchLoadingAdvice(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchLoadingAdvice?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchUnloadAdvice(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchUnloadAdvice?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchWeighment(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchWeighment?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchWeighmentFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchWeighmentFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchOtherWeighmentFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchOtherWeighmentFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchtaggedadvice(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchtaggedadvice?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchtaggedadviceFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchtaggedadviceFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchDeliveryChallan(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchDeliveryChallan?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchDeliveryChallanFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchDeliveryChallanFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchSalesInvoice(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchSalesInvoice?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchSalesInvoiceFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchSalesInvoiceFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchSalesCreditNote(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchSalesCreditNote?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchPurchaseOrder(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchPurchaseOrder?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchPurchaseOrderFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchPurchaseOrderFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  // Purchase Order List with PO Terminated and PO Status Open
  purchaseorderlist(curdate): Observable<any> {
    return this.httpClient.get(this.url + 'purchaseorderlist/' + curdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  searchGRN(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchGRN?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchGRNFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchGRNFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchProductionTransaction(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchProductionTransaction?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getGRNListData(currdate, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getGRNListData/' + currdate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchPurBill(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchPurBill?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchPurBillFast(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchPurBillFast?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdvices_pagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingAdvices_pagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadWeightments_pagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadWeightments_pagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  terminatekata(Terminatekata): Observable<Terminatekata> {

    return this.httpClient.post<Terminatekata>(this.url + "terminatekata", Terminatekata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }



  gettaggedadvice_pagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'gettaggedadvice_pagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDeliveryChallans_pagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDeliveryChallans_pagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getSales_Invoice_pagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSales_Invoice_pagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurOrderPagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurOrderPagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdvicePagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadAdvicePagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurGRNPagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurGRNPagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurBillPagination(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurBillPagination/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getpowercutlist(page, size): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpowercutlist/' + page + "/" + size).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpowercutDatalist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpowercutDatalist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruSalesThruBUanddDate(BuUnit, company_id, date, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getItemThruSalesThruBUanddDate/' + BuUnit + "/" + company_id + "/" + date + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdailystockfinishedgoodslist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailystockfinishedgoodslist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  searchpowercut(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchpowercut?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivePowerCut(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivePowerCut/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getdailystockfinishedgoodopeningstock(itemId, date, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailystockfinishedgoodopeningstock/' + itemId + "/" + date + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getcheckdate(date, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getcheckdate/' + date + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  searchdailystockfinishedgoods(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchdailystockfinishedgoods?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivedailystockfinishedgoods(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivedailystockfinishedgoods/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdailystockfinishedgoodsdtlslist(dailystockid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailystockfinishedgoodsdtlslist/' + dailystockid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdailypowerreportlist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailypowerreportlist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchdailypowerreport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchdailypowerreport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retrivedailypowerreport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivedailypowerreport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDieselusedimportlist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDieselusedimportlist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchDieselusedimportReport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchDieselusedimportReport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retrivedieselusedimport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivedieselusedimport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchItemData(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchItemData?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getGRNRegisterReportlist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGRNRegisterReportlist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  grnRegisterAllDataList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'grnRegisterAllDataList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  searchGRNRegisterReport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchGRNRegisterReport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchGRNRegisterReportPriview(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchGRNRegisterReportPriview?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveGRNRegister(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGRNRegister/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveGrnRegisterDetails(grnregisterid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGrnRegisterDetails/' + grnregisterid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  /* getdailygatewheatinwardreport(date,todate): Observable<any>
     {
       return this.httpClient.get<any>(this.url+'getdailygatewheatinwardreport/'+date+"/"+todate).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))}
*/
  getdailygatewheatinwardreportnew(date, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailygatewheatinwardreportnew/' + date + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdailygatewheatinwardreportnew2(date, todate, order): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailygatewheatinwardreportnew2/' + date + "/" + todate + "/" + order).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdailygatewheatinwardreportnew2WithParty(date, todate, order, party): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailygatewheatinwardreportnew2WithParty/' + date + "/" + todate + "/" + order + "/" + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getOtherKataReport(date, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherKataReport/' + date + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getOtherKataWithPartyReport(date, todate,party): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherKataWithPartyReport/' + date + "/" + todate+ "/" + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getdailyjobworkwgtreport(loadfromdate, load2date, party): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailyjobworkwgtreport/' + loadfromdate + "/" + load2date + "/" + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdailygatewheatOUTwardreport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'getdailygatewheatOUTwardreport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChallanPerTransportReport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'getChallanPerTransportReport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  updatesalesorder(id): Observable<any> {
    return this.httpClient.get(this.url + 'updatesalesorder/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  SalesOrderTerminate(id, username,quotatioid): Observable<any> {
    return this.httpClient.get(this.url + 'SalesOrderTerminate/' + id + "/" + username+"/"+quotatioid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWheatReceivinglist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWheatReceivinglist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveWheatReceiving(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveWheatReceiving/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveWheatDetails(wheatreceiveid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveWheatDetails/' + wheatreceiveid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveWheatIssueDetails(wheatreceiveid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveWheatIssueDetails/' + wheatreceiveid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivewheatstock_Dtls(wheatreceiveid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivewheatstock_Dtls/' + wheatreceiveid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchWheatreceiving(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchWheatreceiving?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getweatreceivingitemlist(businessunit_id): Observable<any> {
    return this.httpClient.get(this.url + 'getweatreceivingitemlist/' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getopeningstockwheatrecieve(itemId, date, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getopeningstockwheatrecieve/' + itemId + "/" + date + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLabItemlist(businessunit_id): Observable<any> {
    return this.httpClient.get(this.url + 'getLabItemlist/' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getbinlist(): Observable<any> {
    return this.httpClient.get(this.url + 'getbinlist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getbillreportlist(finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getbillreportlist/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getbinlistbygroup(bingroupid, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getbinlistbygroup/' + bingroupid + '/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkbingroup(bingroupid, binid, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'checkbingroup/' + bingroupid + '/' + binid + '/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  bincalculation(binid, dip): Observable<any> {
    return this.httpClient.get(this.url + 'bincalculation/' + binid + '/' + dip).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getbinreportlist(businessunit_id, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getbinreportlist/' + businessunit_id + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getwheatstackcardlist(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getwheatstackcardlist/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrievewheatstackcard(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrievewheatstackcard/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrievewheatstackcard_details(wheatstackid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrievewheatstackcard_details/' + wheatstackid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGodownList(): Observable<GodownMaster[]> {
    return this.httpClient.get<GodownMaster[]>(this.url + 'getGodownList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  findGodownMaster(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findGodownMaster?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  retriveGodownMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGodownMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getHubList(): Observable<HubMaster[]> {
    return this.httpClient.get<HubMaster[]>(this.url + 'getHubList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  findHubMaster(searchText: string): Observable<any> {
    return this.httpClient.get(this.url + 'findHubMaster?searchtext=' + searchText).pipe(
      catchError(this.handleError));
  }

  retriveHubMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveHubMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGateinoutList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGateinoutList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveGateinout(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGateinout/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGateinoutdtls(gateinoutregisterid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGateinoutdtls/' + gateinoutregisterid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchgateinoutRegister(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchgateinoutRegister?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getHubMasterList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getHubMasterList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGodownMasterList(company_id): Observable<any> {
    return this.httpClient.get(this.url + 'getGodownMasterList/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGatepassRegisterList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGatepassRegisterList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveGatePassRegister(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGatePassRegister/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchgatePassRegister(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchgatePassRegister?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDailyproductionList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDailyproductionList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemCodeByTypeNew(itemtype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemCodeByTypeNew/' + itemtype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveDailyProduction(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveDailyProduction/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchDailyProduction(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchDailyProduction?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  productionreportitembydata(itemId, date): Observable<any> {
    return this.httpClient.get<any>(this.url + 'productionreportitembydata/' + itemId + '/' + date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountpostingproductionreg(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountpostingproductionreg/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveProductionDetails(dailyproductionid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveProductionDetails/' + dailyproductionid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveProductionDetails1(dailyproductionid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveProductionDetails1/' + dailyproductionid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchSupplierMasterData(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchSupplierMasterData?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchCustomerMasterData(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchCustomerMasterData?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveLabReport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveLabReport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searcLabReport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searcLabReport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveLabReportDetails(misclabreportfgid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveLabReportDetails/' + misclabreportfgid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLabReportlist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLabReportlist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveGranulationReport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGranulationReport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchGranulationReport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchGranulationReport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveGranulationDetails(granulationreportid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveGranulationDetails/' + granulationreportid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGranulationlist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGranulationlist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSeiveslist(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSeiveslist/').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveSeives(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveSeives/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveSeivesDetails(seivesid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveSeivesDetails/' + seivesid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSeiveslistByitemid(itemid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSeiveslistByitemid/' + itemid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdailyloadingitemwise(date, todate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdailyloadingitemwise/' + date + "/" + todate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getOtherParameterlist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherParameterlist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveOtherParameter(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveOtherParameter/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searcOtherparameter(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searcOtherparameter?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveOtherParameterDetails(otherparameterid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveOtherParameterDetails/' + otherparameterid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getBingrouplist(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getBingrouplist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveBinGroup(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveBinGroup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  bingroupList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'bingroupList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivebillreport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivebillreport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivebillreportDetails(binreportid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivebillreportDetails/' + binreportid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivebillreportcolumnDetails(binreportid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivebillreportcolumnDetails/' + binreportid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getMillBreakdownlist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getMillBreakdownlist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveMillBreakdown(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveMillBreakdown/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searcMillBreakdown(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searcMillBreakdown?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveMillBreakdownDetails(millbreakdownid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveMillBreakdownDetails/' + millbreakdownid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWeigherReadingList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWeigherReadingList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveWeigherReading(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveWeigherReading/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searcWeigherReading(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searcWeigherReading?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemCapacity(item_code, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemCapacity/' + item_code + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkdaterangeupdate(date): Observable<any> {
    return this.httpClient.get<any>(this.url + 'checkdaterangeupdate/' + date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getInputPopup(id, item): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getInputPopup/' + id + '/' + item).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getOutputPopup(id, item): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOutputPopup/' + id + '/' + item).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getAccesslist(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getAccesslist/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveFloorAccess(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveFloorAccess/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getrequisitionnumber(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getrequisitionnumber/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  listRequisition(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'listRequisition').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getRequisitiondetails(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRequisitiondetails/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRequisitionitemdetails(requisitionno): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRequisitionitemdetails/' + requisitionno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRequisition(requisitionno): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRequisition/' + requisitionno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  requisitionapprove(id, username): Observable<any> {
    return this.httpClient.get<any>(this.url + 'requisitionapprove/' + id + "/" + username).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getRequisitionnumberapprove(shopfloor): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getRequisitionnumberapprove/' + shopfloor).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getissuestocknumber(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getissuestocknumber/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getIssueStocklist(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getIssueStocklist/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveIssueStock(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveIssueStock/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getIssueItemDetails(issueno): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getIssueItemDetails/' + issueno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getaayogstocks(itemcode): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getaayogstocks/' + itemcode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getrequistionstockrecordbyitem(itemcode, requisitionno, packingcode): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getrequistionstockrecordbyitem/' + itemcode + '/' + requisitionno + '/' + packingcode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWheatAcceptancelist(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWheatAcceptancelist/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveWheatAcceptance(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveWheatAcceptance/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchWheatAcceptance(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'searchWheatAcceptance?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getWheatAcceptancePrintList(acceptanceid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getWheatAcceptancePrintList/' + acceptanceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnApprovalPopupData(date, b_unit, supplierId, basedon, finyear, compid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getReturnApprovalPopupData/' + date + "/" + b_unit + "/" + supplierId + "/" + basedon + "/" + finyear + "/" + compid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierThruBUNew(business_id: string): Observable<any> {
    return this.httpClient.get(this.url + 'getSupplierThruBUNew/' + business_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getgrnlistbypurorder(pur_orderid): Observable<any> {
    return this.httpClient.get(this.url + 'getgrnlistbypurorder/' + pur_orderid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Service Master
  getSSequenceId(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getSSequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getServiceMasterList(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getServiceMasterList/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkServiceMasterUsage(service_no): Observable<any> {
    return this.httpClient.get(this.url + 'checkServiceMasterUsage/' + service_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  // Job Order
  getOSequenceId(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getOSequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  // Non Goods Type Master
  getNonGoodsTypeList(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getNonGoodsTypeList/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Exit Clause Master
  getExitClauseMasterList(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getExitClauseMasterList/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getESequenceId(fin_year): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getESequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Term as Service
  getTSequenceId(fin_year): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getTSequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTermasServiceList(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getTermasServiceList/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Rate Chart
  getRSequenceId(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getRSequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRateChartList(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getRateChartList/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  RateChartList(): Observable<any> {
    return this.httpClient.get(this.url + 'RateChartList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRateChartDateVerify(date): Observable<any> {
    return this.httpClient.get(this.url + 'getRateChartDateVerify/' + date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getRateChartItemthdt(date): Observable<any> {
    return this.httpClient.get(this.url + 'getRateChartItemthdt/' + date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getgrnitemlist(grnlist): Observable<any> {
    return this.httpClient.get(this.url + 'getgrnitemlist/' + grnlist).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getNonGoodsServicelist(finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getNonGoodsServicelist/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getServiceNo(check, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getServiceNo/' + check + '/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerSupplierList(bunit, check): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerSupplierList/' + bunit + '/' + check).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getServiceMasterDetails(service): Observable<any> {
    return this.httpClient.get(this.url + 'getServiceMasterDetails/' + service).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getServiceMasterItemDetails(service): Observable<any> {
    return this.httpClient.get(this.url + 'getServiceMasterItemDetails/' + service).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getServiceTypeList(): Observable<any> {
    return this.httpClient.get(this.url + 'getServiceTypeList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getServiceList(servicetype): Observable<any> {
    return this.httpClient.get(this.url + 'getServiceList/' + servicetype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDescCode(service): Observable<any> {
    return this.httpClient.get(this.url + 'getDescCode/' + service).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkcashchallan(orderdate, totalamount, id, party, referance_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkcashchallan/' + orderdate + '/' + totalamount + '/' + id + '/' + party + '/' + referance_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadAdviceReport(fromdate, todate, suppliername, finyear): Observable<any> {
    console.log("frm date" + fromdate + "//" + todate + "//" + suppliername + "//" + finyear)
    return this.httpClient.get(this.url + 'getUnloadAdviceReport/' + fromdate + "/" + todate + "/" + suppliername + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdviceReport(fromdate, todate, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingAdviceReport/' + fromdate + "/" + todate + "/" + finyear).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getgrnpurbillReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getgrnpurbillReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getchallanReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getchallanReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPendingSoudaReport(fromdate, todate, catagory): Observable<any> {
    return this.httpClient.get(this.url + 'getPendingSoudaReport/' + fromdate + "/" + todate + "/" + catagory).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurBillReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getPurBillReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrderReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getPurOrderReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJobWorkSalesReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getJobWorkSalesReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesCreditNoteReport(fromdate, todate, invoicetype): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesCreditNoteReport/' + fromdate + "/" + todate + "/" + invoicetype).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesFreightReport(fromdate, todate, invoicetype): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesFreightReport/' + fromdate + "/" + todate + "/" + invoicetype).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJobWorkAllocationReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getJobWorkAllocationReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderReportOrderWise(salesordernumber): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrderReportOrderWise/' + salesordernumber).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderReportOrderProcessWise(salesordernumber, salesprocess): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrderReportOrderProcessWise/' + salesordernumber + "/" + salesprocess).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  // Anuj Sir Sales Order Report

  getSalesOrderReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrderReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderProcessWiseReport(fromdate, todate, salesprocess): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrderProcessWiseReport/' + fromdate + "/" + todate + "/" + salesprocess).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvoicetransitReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesInvoicetransitReport/' + fromdate + "/" + todate).pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierMasterReport(): Observable<any> {
    return this.httpClient.get(this.url + 'getSupplierMasterReport').pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustomerMasterReport(): Observable<any> {
    return this.httpClient.get(this.url + 'getCustomerMasterReport').pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTermAsService(): Observable<any> {
    return this.httpClient.get(this.url + 'getTermAsService/').pipe(catchError((err) => { console.log("Error in Service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getFinishedItemlist(businessunit_id): Observable<any> {
    return this.httpClient.get(this.url + 'getFinishedItemlist/' + businessunit_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPackingUom(itemid): Observable<any> {
    return this.httpClient.get(this.url + 'getPackingUom/' + itemid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveNongoodsService(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsService/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceItem(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceItem/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceTermsCon(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceTermsCon/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceParty(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceParty/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceBankDtls(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceBankDtls/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceSummary(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceSummary/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceSummaryDyn(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceSummaryDyn/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceTimeService(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceTimeService/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceDocs(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceDocs/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceExitClause(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceExitClause/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsServiceExitClauseDyn(nongoodsid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsServiceExitClauseDyn/' + nongoodsid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemDetailsSerList(nongoodsid, serviceno): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemDetailsSerList/' + nongoodsid + "/" + serviceno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSRNlist(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSRNlist/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSRNNo(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSRNNo/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getNonServiceOrderAllList(ordertype, bunit, party, srndate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getNonServiceOrderAllList/' + ordertype + "/" + bunit + "/" + party + "/" + srndate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getServiceItemList(serviceid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getServiceItemList/' + serviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDescAccordingBillPeriodList(nongoodsserviceid, services): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDescAccordingBillPeriodList/' + nongoodsserviceid + "/" + services).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsSrn(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsSrn/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsSrnItem(srnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsSrnItem/' + srnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsSrnTime(srnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsSrnTime/' + srnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveNongoodsSrnDocs(srnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveNongoodsSrnDocs/' + srnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSrnItemDetailsSerList(srnid, serviceno): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSrnItemDetailsSerList/' + srnid + "/" + serviceno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  public updateSalesOrderWithLoadingItemDetails(order_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'updateSalesOrderWithLoadingItemDetails/' + order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getTagAdviceWithPoList(currDate, finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getTagAdviceWithPoList/' + currDate + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSalesOrderSummaryCatagorywiseList(catagory, catagoryname, fromdate, todate, bunit): Observable<any> {
    //console.log(catagoryname+"frm date"+catagory+"//"+fromdate+"//"+todate+"//"+bunit)
    return this.httpClient.get<any>(this.url + 'getSalesOrderSummaryCatagorywiseList/' + catagory + "/" + catagoryname + "/" + fromdate + "/" + todate + "/" + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderMiscList(catagory, fromdate, todate, bunit, broker, customer): Observable<any> {
    console.log("frm date" + catagory + "//" + fromdate + "//" + todate + "//" + bunit + "//" + broker + "//" + customer)
    return this.httpClient.get<any>(this.url + 'getSalesOrderMiscList/' + catagory + "/" + fromdate + "/" + todate + "/" + bunit + "/" + broker + "/" + customer).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvoiceSummaryCatagorywiseList(catagory, catagoryname, fromdate, todate, bunit): Observable<any> {
    //console.log(catagoryname+"frm date"+catagory+"//"+fromdate+"//"+todate+"//"+bunit)
    return this.httpClient.get<any>(this.url + 'getSalesInvoiceSummaryCatagorywiseList/' + catagory + "/" + catagoryname + "/" + fromdate + "/" + todate + "/" + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvoiceMiscList(catagory, fromdate, todate, bunit, broker, customer): Observable<any> {
    //console.log("frm date"+catagory+"//"+fromdate+"//"+todate+"//"+bunit)
    return this.httpClient.get<any>(this.url + 'getSalesInvoiceMiscList/' + catagory + "/" + fromdate + "/" + todate + "/" + bunit + "/" + broker + "/" + customer).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getPurchaseordermiscreport(business_unit, catagory, fromdate, todate, supplier_name, ven_code_name, statustype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurchaseordermiscreport/' + business_unit + "/" + catagory + "/" + fromdate + "/" + todate + "/" + supplier_name + "/" + ven_code_name + "/" + statustype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurchaseBillmiscreport(business_unit, catagory, fromdate, todate, supplier_name, ven_code_name): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurchaseBillmiscreport/' + business_unit + "/" + catagory + "/" + fromdate + "/" + todate + "/" + supplier_name + "/" + ven_code_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLastPOThruSupItemDtls(supplier_name): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLastPOThruSupItemDtls/' + supplier_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLastPOThruSupPurDtls(supplier_name): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLastPOThruSupPurDtls/' + supplier_name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getChannelPartyList(group_type, channeltype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getChannelPartyList/' + group_type + '/' + channeltype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  terminatechannel(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + 'terminatechannel/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSuppBPStat(suppid: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSuppBPStat/' + suppid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getCustBPStat(custid: String): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getCustBPStat/' + custid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getQClist(finyear): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getQClist/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveQualityCheck(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveQualityCheck/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveQualityCheckDetails(qcno): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveQualityCheckDetails/' + qcno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveQualityCheckDetailsQcDetails(qcno, qcid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveQualityCheckDetailsQcDetails/' + qcno + "/" + qcid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchQC(fromdate,todate,vehicle,finyear): Observable<any> {
    return this.httpClient.get(this.url + 'searchQC/' + fromdate + "/" + todate + "/" + vehicle + "/" + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purchaseBillSupplierNamesList(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'purchaseBillSupplierNamesList/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purchaseBillBrokerNamesList(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'purchaseBillBrokerNamesList/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purchaseOrderSupplierNamesList(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'purchaseOrderSupplierNamesList/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  purchaseOrderBrokerNamesList(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'purchaseOrderBrokerNamesList/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesOrderFinishedItemlist(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'salesOrderFinishedItemlist/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesOrderBrokerlist(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'salesOrderBrokerlist/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesOrderPartylist(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'salesOrderPartylist/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesInvoiceFinishedItemlist(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'salesInvoiceFinishedItemlist/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesInvoiceBrokerlist(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'salesInvoiceBrokerlist/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  salesInvoicePartylist(company_id, fromdate, todate, business_unit): Observable<any> {
    return this.httpClient.get(this.url + 'salesInvoicePartylist/' + company_id + "/" + fromdate + "/" + todate + "/" + business_unit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Production Input/Output Report
  getProdInputReport(business_unit, shop_floor, fromdate, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getProdInputReport/' + business_unit + "/" + shop_floor + "/" + fromdate + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getspecialProdInputReport(business_unit, shop_floor, fromdate, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getspecialProdInputReport/' + business_unit + "/" + shop_floor + "/" + fromdate + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getProdOutputReport(business_unit, shop_floor, fromdate, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getProdOutputReport/' + business_unit + "/" + shop_floor + "/" + fromdate + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getspecialProdOutputReport(business_unit, shop_floor, fromdate, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getspecialProdOutputReport/' + business_unit + "/" + shop_floor + "/" + fromdate + "/" + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesTransportReport(business_unit, fromdate, todate, inv_type, trans_type, transporter_code): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesTransportReport/' + business_unit + "/" + fromdate + "/" + todate + "/" + inv_type + "/" + trans_type + "/" + transporter_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurchaseTransportReport(business_unit, fromdate, todate, pur_inv_type, trans_type): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurchaseTransportReport/' + business_unit + "/" + fromdate + "/" + todate + "/" + pur_inv_type + "/" + trans_type).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderData(referance_id, delivery_cid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesOrderData/' + referance_id + "/" + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getdeliverychallanData(delivery_cid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getdeliverychallanData/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrderTransChgsData(referance_id, grn_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurOrderTransChgsData/' + referance_id + "/" + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveSalesTransport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveSalesTransport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // getSalesTransactionReport(fromdate,todate,challanno,invtype,finyear): Observable<any>
  // {
  //   return this.httpClient.get<any>(this.url+'getSalesTransactionReport/'+fromdate+"/"+todate+"/"+challanno+"/"+invtype+"/"+finyear).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
  // }
  getSalesTransactionReport(searchdata): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesTransactionReport?' + searchdata).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesTransactionReportCheckbalance(fromdate, todate, inv_typenew, trans_code): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesTransactionReportCheckbalance/' + fromdate + "/" + todate + "/" + inv_typenew + "/" + trans_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  searchTransportStatement(fromdate, todate, invoicetype): Observable<any> {
    return this.httpClient.get<any>(this.url + 'searchTransportStatement/' + fromdate + "/" + todate + "/" + invoicetype).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSeqNoForAccGrp(prefix_companyId): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSeqNoForAccGrp?' + prefix_companyId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountTypeList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'accountTypeList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accGroupList(company_id, catagory): Observable<any> {
    return this.httpClient.get(this.url + 'accGroupList/' + company_id + "/" + catagory).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkAccGroupUsage(grpid): Observable<any> {
    return this.httpClient.get(this.url + 'checkAccGroupUsage/' + grpid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  accountGroupList(): Observable<any> {
    return this.httpClient.get(this.url + 'accountGroupList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  accountParentGroupList(): Observable<any> {
    return this.httpClient.get(this.url + 'accountParentGroupList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveAccGroup(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveAccGroup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  postingaccountsgroup(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'postingaccountsgroup/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Accounts Master
  getATSequenceId(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getATSequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAccountsTypeList(): Observable<any> {
    return this.httpClient.get(this.url + 'getAccountsTypeList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveaccountstype(id): Observable<any> {
    return this.httpClient.get(this.url + 'retriveaccountstype/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  //AccountCatagory

  accountCatagoryList(): Observable<any> {
    return this.httpClient.get(this.url + 'accountCatagoryList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAccountsCategoryList(): Observable<any> {
    return this.httpClient.get(this.url + 'getAccountsCategoryList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAccountCatagorySequenceId(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getAccountCatagorySequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveaccountscatagory(id): Observable<any> {
    return this.httpClient.get(this.url + 'retriveaccountscatagory/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkAccTypeUsage(typecode): Observable<any> {
    return this.httpClient.get(this.url + 'checkAccTypeUsage/' + typecode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkAccCatagoryUsage(accts_catagory_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkAccCatagoryUsage/' + accts_catagory_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  // Accoutn ledger


  getAccountLedgerSequenceId(fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getAccountLedgerSequenceId/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  accountledgerlist(): Observable<any> {
    return this.httpClient.get(this.url + 'accountledgerlist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveaccountsledger(id): Observable<any> {
    return this.httpClient.get(this.url + 'retriveaccountsledger/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getReturnApprovalNoteList(company, currentdate): Observable<any> {
    return this.httpClient.get(this.url + 'getReturnApprovalNoteList/' + company + "/" + currentdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkcustomeramount(orderid, finyear): Observable<any> {
    return this.httpClient.get(this.url + 'checkcustomeramount/' + orderid + '/' + finyear).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getpoitemdetailsreport(poid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getpoitemdetailsreport/' + poid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getExecutionpo(poid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getExecutionpo/' + poid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getUnloadListThroughPurOrderId(poid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadListThroughPurOrderId/' + poid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGRNThroughUnloadId(unadviceid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGRNThroughUnloadId/' + unadviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getBillThroughGRNId(grn_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getBillThroughGRNId/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getLoadingAdviceReportThrouhgSO(unique): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getLoadingAdviceReportThrouhgSO/' + unique).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDeliveryChallanReportThrouhgLA(advice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDeliveryChallanReportThrouhgLA/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getInvoiceReportThroughChallan(delivery_cid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getInvoiceReportThroughChallan/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }




  getGrnDetailsThroughGrnId(grn_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGrnDetailsThroughGrnId/' + grn_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadDetailsThroughUnloadId(advice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getUnloadDetailsThroughUnloadId/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrderDetailsThroughOrderId(poid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPurOrderDetailsThroughOrderId/' + poid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  gettransactionalReport(fromdate, todate, catagory): Observable<any> {
    return this.httpClient.get<any>(this.url + 'gettransactionalReport/' + fromdate + '/' + todate + '/' + catagory).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getstocktrackingReport(fromdate, todate, catagory, startdate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getstocktrackingReport/' + fromdate + '/' + todate + '/' + catagory + '/' + startdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getstocktrackingReport2(fromdate, todate, catagory, startdate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getstocktrackingReport/' + fromdate + '/' + todate + '/' + catagory + '/' + startdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getalltransactionfromitem(itemcode, packingcode, fromdate, todate, catagory): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getalltransactionfromitem/' + itemcode + '/' + packingcode + '/' + fromdate + '/' + todate + '/' + catagory).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getSalesTransport(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesTransport/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesTransportChgs(transportId): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesTransportChgs/' + transportId).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStocklist(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStocklist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAllItemFromStockView(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getAllItemFromStockView').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveItemStock(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveItemStock/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveStockDetails(stockid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveStockDetails/' + stockid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSupplierAddrFast(bpid): Observable<any> {
    return this.httpClient.get(this.url + 'getSupplierAddrFast/' + bpid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  gettdsdetails(tdscode): Observable<any> {
    return this.httpClient.get(this.url + 'gettdsdetails/' + tdscode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransJVCode(prefix: String, currentdate): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getTransJVCode/' + prefix + '/' + currentdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesTransactionReportList(currentdate): Observable<SequenceId> {
    return this.httpClient.get<SequenceId>(this.url + 'getSalesTransactionReportList/' + currentdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getDailyweigherList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDailyweigherList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getSolarPowerGeneration(company_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSolarPowerGeneration/' + company_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveSolarPowerGeneration(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveSolarPowerGeneration/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSolarPorGenReport(bunit, fromdate, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSolarPorGenReport/' + bunit + '/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getInverterSolarPowerGeneration(bunit, fromdate, todate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getInverterSolarPowerGeneration/' + bunit + '/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  solarPowerGenerationWithPowerCutList(compid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'solarPowerGenerationWithPowerCutList/' + compid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAllSolarData(solardate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getAllSolarData/' + solardate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkSolarPowerCut(solardate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'checkSolarPowerCut/' + solardate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkSolarPowerDate(solardate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'checkSolarPowerDate/' + solardate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  // Solar Power Generation With Power Cut Report
  getSolarPowerWithPowerCutList(fromdate, todate, bunit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSolarPowerWithPowerCutList/' + fromdate + "/" + todate + "/" + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  retriveSolarPowerCut(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveSolarPowerCut/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveSolarPowercutDetails(powerid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveSolarPowercutDetails/' + powerid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDailyWeigherReport(wdate, machine): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDailyWeigherReport/' + wdate + '/' + machine).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTransportimage1(refno): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getTransportimage1/' + refno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getDuplicateRefTransport(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getDuplicateRefTransport').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getGroupItemLedgerForJob(group): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGroupItemLedgerForJob/' + group).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  //Item Service Master
  getItemServiceSequenceId(company, fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getItemServiceSequenceId/' + company + '/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemServiceList(company): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemServiceList/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findItemServiceMaster(company_id, searchText): Observable<any> {
    return this.httpClient.get<any>(this.url + 'findItemServiceMaster?searchtext=' + searchText + "&company=" + company_id).pipe(
      catchError(this.handleError));
  }

  retriveItemServiceMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveItemServiceMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  chkItemServiceNameStatic(name): Observable<any> {
    return this.httpClient.get<any>(this.url + 'chkItemServiceNameStatic/' + name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getServiceItemTax(name): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getServiceItemTax/' + name).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findJobSalesOrders(BUnit, Party, advice_date): Observable<any> {
    return this.httpClient.get<any>(this.url + 'findJobSalesOrders/' + BUnit + '/' + Party + '/' + advice_date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  loadadvicejobworkRetriveList(advice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'loadadvicejobworkRetriveList/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  unloadadvicejobworkRetriveList(unadvice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'unloadadvicejobworkRetriveList/' + unadvice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getJobWorkInvPrint(mainid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getJobWorkInvPrint/' + mainid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveReturnAppJobwork(salesreturnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveReturnAppJobwork/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveReturnAppJobworkPrice(salesreturnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveReturnAppJobworkPrice/' + salesreturnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  deliverychallanjobworkRetriveList(delivery_cid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'deliverychallanjobworkRetriveList/' + delivery_cid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getInvoiceJobItemDtls(invoice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getInvoiceJobItemDtls/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getInvoiceTServiceItem(invoice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getInvoiceTServiceItem/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  geteinvoicedetails(invoice_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'geteinvoicedetails/' + invoice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  creditnoteeinvoicedetails(creditnoteid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'creditnoteeinvoicedetails/' + creditnoteid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }



  getOtherPartyList(company): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherPartyList/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveOtherPartyMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveOtherPartyMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findOtherPartyMaster(searchText): Observable<any> {
    return this.httpClient.get(this.url + 'findOtherPartyMaster/' + searchText).pipe(
      catchError(this.handleError));
  }

  getOtherItemList(company): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherItemList/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveOtherItemMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveOtheritemMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  findOtherItemMaster(searchText): Observable<any> {
    return this.httpClient.get(this.url + 'findOtherItemMaster/' + searchText).pipe(
      catchError(this.handleError));
  }
  getOtherPartyMasterList(company): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherPartyMasterList/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getOtherItemMasterList(company): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherItemMasterList/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesAllTransactionData(ReturnbasedOn, customer, salesreturndate, businessunit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesAllTransactionData/' + ReturnbasedOn + '/' + customer + '/' + salesreturndate + '/' + businessunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesReturnNoteJobwork(date, bunit, party_id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSalesReturnNoteJobwork/' + date + "/" + bunit + "/" + party_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveUnloadAdviceJobwork(unadviceid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveUnloadAdviceJobwork/' + unadviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkSalesQuotationUsage(quote_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkSalesQuotationUsage/' + quote_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  SalesQuotationTerminate(id, username): Observable<any> {
    return this.httpClient.get(this.url + 'SalesQuotationTerminate/' + id + "/" + username).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // JobWork Item Allocation

  JobWorkItemAllocationList(): Observable<any> {
    return this.httpClient.get(this.url + 'JobWorkItemAllocationList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemQtythruLoading(item, party): Observable<any> {
    return this.httpClient.get(this.url + 'getItemQtythruLoading/' + item + "/" + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  Productionsummaryitemdetails(date): Observable<any> {
    return this.httpClient.get(this.url + 'Productionsummaryitemdetails/' + date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  Productionsummarydatecheck(date): Observable<any> {
    return this.httpClient.get(this.url + 'Productionsummarydatecheck/' + date).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveProdSummary(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveProdSummary/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveProdSummaryDetails(prod_sum_id): Observable<any> {
    return this.httpClient.get(this.url + 'retriveProdSummaryDetails/' + prod_sum_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getProductionSummurylist(): Observable<any> {
    return this.httpClient.get(this.url + 'getProductionSummurylist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  ProdSummaryPosting(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'ProdSummaryPosting/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  prodSummaryPostingUndo(id, username): Observable<any> {
    return this.httpClient.get<any>(this.url + 'prodSummaryPostingUndo/' + id + '/' + username).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkBulkSupply(adviceid): Observable<any> {
    return this.httpClient.get(this.url + 'checkBulkSupply/' + adviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkLooseItem(adviceid): Observable<any> {
    return this.httpClient.get(this.url + 'checkLooseItem/' + adviceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAllocationlist(): Observable<any> {
    return this.httpClient.get(this.url + 'getAllocationlist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivetaskAllocation(id): Observable<any> {
    return this.httpClient.get(this.url + 'retrivetaskAllocation/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Task Progress

  getProgresslist(): Observable<any> {
    return this.httpClient.get(this.url + 'getProgresslist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAllocationUsernameWiselist(currdate, user): Observable<any> {
    return this.httpClient.get(this.url + 'getAllocationUsernameWiselist/' + currdate + '/' + user).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTaskNameDetails(taskid): Observable<any> {
    return this.httpClient.get(this.url + 'getTaskNameDetails/' + taskid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retrivetaskProgress(id): Observable<any> {
    return this.httpClient.get(this.url + 'retrivetaskProgress/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getLoadingAdviceTransDtls(delvid): Observable<any> {
    return this.httpClient.get(this.url + 'getLoadingAdviceTransDtls/' + delvid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesInvPayDtls(invid): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesInvPayDtls/' + invid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTaskProgressReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getTaskProgressReport/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getTrialdata(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'getTrialdata/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJwAllocationRestWt(party): Observable<any> {
    return this.httpClient.get(this.url + 'getJwAllocationRestWt/' + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJwGRN(): Observable<any> {
    return this.httpClient.get(this.url + 'getJwGRN').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJwPo(): Observable<any> {
    return this.httpClient.get(this.url + 'getJwPo').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getJwGRNunique(): Observable<any> {
    return this.httpClient.get(this.url + 'getJwGRNunique').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }


  getJobItemList(): Observable<any> {
    return this.httpClient.get(this.url + 'getJobItemList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJobItemTagMaster(): Observable<any> {
    return this.httpClient.get(this.url + 'getJobItemTagMaster').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkdeleteJobItemTagMaster(jw_grn_tag): Observable<any> {
    return this.httpClient.get(this.url + 'checkdeleteJobItemTagMaster/' + jw_grn_tag).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkjw_itemallocation(party, job_item, qty, jw_grn_tag): Observable<any> {
    return this.httpClient.get(this.url + 'checkjw_itemallocation/' + party + '/' + job_item + '/' + qty + '/' + jw_grn_tag).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkjw_itemallocationsubmit(jw_grn_partywitem_details): Observable<any> {
    return this.httpClient.get(this.url + 'checkjw_itemallocationsubmit/' + JSON.stringify(jw_grn_partywitem_details)).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveJobItemTagMaster(id): Observable<any> {
    return this.httpClient.get(this.url + 'retriveJobItemTagMaster/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJwGrnPartytagDetails(jw_grn_tag): Observable<any> {
    return this.httpClient.get(this.url + 'getJwGrnPartytagDetails/' + jw_grn_tag).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getJwGrnPartywitemDetails(jw_grn_tag, party): Observable<any> {
    return this.httpClient.get(this.url + 'getJwGrnPartywitemDetails/' + jw_grn_tag + '/' + party).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveClassifiedItem(itemid, company): Observable<any> {
    return this.httpClient.get(this.url + 'retriveClassifiedItem/' + itemid + '/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveItemSizeAndWeight(itemid, company): Observable<any> {
    return this.httpClient.get(this.url + 'retriveItemSizeAndWeight/' + itemid + '/' + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Purchase Order Packing Print Start 

  getTermsConditionsDtlsList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getTermsConditionsDtlsList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  getPackingMasterCode(itemid, packingid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPackingMasterCode/' + itemid + '/' + packingid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  retrivePackingDtls(packingMasterCode, packingid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retrivePackingDtls/' + packingMasterCode + '/' + packingid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  purOrdTramsCondition(purid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'purOrdTramsCondition/' + purid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }));
  }

  checkValidGstNo(gstno): Observable<any> {
    return this.httpClient.get(this.url + 'checkValidGstNo/' + gstno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  checkValidPANNo(panno): Observable<any> {
    return this.httpClient.get(this.url + 'checkValidPANNo/' + panno).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdListOnlyStorePurchase(supplier, bunit): Observable<any> {
    return this.httpClient.get(this.url + 'getPurOrdListOnlyStorePurchase/' + supplier + '/' + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdListOnlyPacking(supplier, bunit): Observable<any> {
    return this.httpClient.get(this.url + 'getPurOrdListOnlyPacking/' + supplier + '/' + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getstoreIssuelist(): Observable<any> {
    return this.httpClient.get(this.url + 'getstoreIssuelist').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveStoreIssueNote(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveStoreIssueNote/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveStoreIssueNoteDetails(store_issue_id): Observable<any> {
    return this.httpClient.get(this.url + 'retriveStoreIssueNoteDetails/' + store_issue_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPoStoreQty(item, clasitem,warehouse): Observable<any> {
    return this.httpClient.get(this.url + 'getPoStoreQty/' + item + '/' + clasitem + '/' + warehouse).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemThruGrn(): Observable<any> {
    return this.httpClient.get(this.url + 'getItemThruGrn').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  retriveClassifiedItemThruGrn(itemid): Observable<any> {
    return this.httpClient.get(this.url + 'retriveClassifiedItemThruGrn/' + itemid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getWarehouseFromPoStoreItem(): Observable<any> {
    return this.httpClient.get(this.url + 'getWarehouseFromPoStoreItem').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getAllWarehouse(): Observable<any> {
    return this.httpClient.get(this.url + 'getAllWarehouse').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSOjwRestQty(orderid, itemid, itemcode): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getSOjwRestQty/' + orderid + "/" + itemid + "/" + itemcode).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getStoreChargesList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStoreChargesList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  retriveStoreInventoryChgs(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveStoreInventoryChgs/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getStoreChargeMasterDtlsList(storecgargeid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getStoreChargeMasterDtlsList/' + storecgargeid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  updateArnNo(id,invoiceno,asn_no): Observable<any> {
    return this.httpClient.get<any>(this.url + 'updateArnNo/'+id+'/'+invoiceno+'/'+asn_no).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  // QC Used Check
  checkQCUsed(advice_id): Observable<any> {
    return this.httpClient.get(this.url + 'checkQCUsed/' + advice_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  getCompanyBussinessUnitDetails(company,bunit): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getCompanyBussinessUnitDetails/' + company + "/" + bunit).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  // Multiple Advice Single GRN
  getUnloadAdvRefPOwt2ArgnewMultiItemGRN(b_unit, supp, itemtype, putype, pusutype, ordate): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadAdvRefPOwt2ArgnewMultiItemGRN/' + b_unit + "/" + supp + "/" + itemtype + "/" + putype + "/" + pusutype + "/" + ordate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemMasterPackMatMultipopupNew(item_code): Observable<any> {
    return this.httpClient.get(this.url + 'getItemMasterPackMatMultipopupNew/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getItemPackUomNew(itemid, itemcode, company): Observable<any> {
    return this.httpClient.get(this.url + 'getItemPackUomNew/' + itemid + "/" + itemcode + "/" + company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdItemDtlsMultipleItemGRN(pur_order_id, item_id): Observable<any> {
    return this.httpClient.get(this.url + 'getPurOrdItemDtlsMultipleItemGRN/' + pur_order_id + '/' + item_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getpssd_packing_item_qtymultiplepopup(unloadid): Observable<any> {
    return this.httpClient.get(this.url + 'getpssd_packing_item_qtymultiplepopup/' + unloadid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getPurOrdreceipt_criteriaNew(pur_order_id): Observable<any> {
    return this.httpClient.get(this.url + 'getPurOrdreceipt_criteriaNew/' + pur_order_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getUnloadWeightmentWtmultipopupmultipleItem(wgmt_id): Observable<any> {
    return this.httpClient.get(this.url + 'getUnloadWeightmentWtmultipopupmultipleItem/' + wgmt_id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  searchpendingUnAdviceReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'searchpendingUnAdviceReport/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  searchpendingGRNReport(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'searchpendingGRNReport/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  searchpendingDelvChallan(fromdate, todate): Observable<any> {
    return this.httpClient.get(this.url + 'searchpendingDelvChallan/' + fromdate + '/' + todate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  gettaxcodefromgrnnewMulti(item,grnno,packing): Observable<any> {
    return this.httpClient.get(this.url + 'gettaxcodefromgrnnewMulti/' + item + '/' + grnno+'/'+packing).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSalesOrderList(salesprocess,fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getSalesOrderList/' + salesprocess+ '/' + fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  /* Stack Maintain Starts */
  getGrnDetailsById(grnid): Observable<any> {
    return this.httpClient.get(this.url + 'getGrnDetailsById/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  stackMaintainList(currdate): Observable<any> {
    return this.httpClient.get<any>(this.url + 'stackMaintainList/'+currdate).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getGrnList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGrnList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getGrnAllList(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGrnAllList').pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  retriveStackMaintain(id): Observable<any> {
    return this.httpClient.get<any>(this.url + 'retriveStackMaintain/' + id).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  stackItemRetriveList(stackid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'stackItemRetriveList/'+stackid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getItemListByGrnId(grnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getItemListByGrnId/'+grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getPackingItemByGrn(item,grnid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getPackingItemByGrn/'+item+'/'+grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  findStackMaintain(searchText): Observable<any> {
    return this.httpClient.get(this.url + 'findStackMaintain/' + searchText).pipe(
      catchError(this.handleError));
  }

  getItemMasterPackMatNew(item_code): Observable<any> {
    return this.httpClient.get(this.url + 'getItemMasterPackMatNew/' + item_code).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  /* Stack Maintain Ends */
  
  getDelvChallanByOrder(sale_id,fin_year): Observable<any> {
    return this.httpClient.get(this.url + 'getDelvChallanByOrder/' + sale_id+'/'+fin_year).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getSaleOrderItemThroughGrn(order_id,grnid): Observable<any> {
    return this.httpClient.get(this.url + 'getSaleOrderItemThroughGrn/' + order_id+'/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getGrnWeighment(grnid): Observable<any> {
    return this.httpClient.get(this.url + 'getGrnWeighment/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getGrnDetails(grnid): Observable<any> {
    return this.httpClient.get(this.url + 'getGrnDetails/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getGrndetailsforWeighment(grnid,company): Observable<any> {
    return this.httpClient.get(this.url + 'getGrndetailsforWeighment/' + grnid+'/'+company).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleLocationwiseWeighmentList(location): Observable<any> {
    return this.httpClient.get(this.url + 'getVehicleLocationwiseWeighmentList/'+location).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

  getVehicleListWeighmentLocation(location): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getVehicleListWeighmentLocation/'+location).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getOtherWgFirstDataWtWgtFor(location): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getOtherWgFirstDataWtWgtFor/'+location).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }
  
  getGatepassByChallan(invoiceid): Observable<any> {
    return this.httpClient.get<any>(this.url + 'getGatepassByChallan/'+invoiceid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
  }

}
