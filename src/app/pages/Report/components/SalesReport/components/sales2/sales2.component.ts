import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { Sales2Report } from '../../../../../../Models/SalesTransaction/sales2';
import { forkJoin } from 'rxjs';
import { nodeValue } from '@angular/core/src/view';



interface VehicleNode {
  name: string;
  text?:string;
  id?: number;
  children?: VehicleNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: VehicleNode;
}

 const TREE_DATA: VehicleNode[] = [
 
  {//here start
          name: "Sales Invoice",
          text:"sales_invoice",
          children: [
                { name: "Invoice Type", id: 1 ,text:"invoice_type"},
                { name: "Business Unit", id: 2 ,text:"business_unit"},
                { name: "Invoice No.", id: 3 ,text:"invoice_no"}, 
                { name: "Advice No.", id: 4 ,text:"adviceno"},
                { name: "Invoice Date", id: 5 ,text:"invoice_date"},
                { name: "Party Name", id: 6 ,text:"partyname"},
                { name: "Challan", id: 7 ,text:"challan"},
                { name: "E-Invoice No.", id: 8 ,text:"e_invoice_no"}, 
                { name: "Sales Order No", id: 9 ,text:"salesorderno"},
                { name: "Sales Order Date", id: 10 ,text:"salesorderdate"},
                { name: "Ref Challan No", id: 11 ,text:"refchallanno"},
                { name: "Ref Challan Date", id: 12 ,text:"refchallandate"},
               
              ],  
        },{
          name: "Item Details",
          text:"sales_invoice_item_dtls",
          children: [
                { name: "Item Name", id: 13 ,text:"item_name"},
                { name: "Item Group", id: 14 ,text:"item_group"},
                { name: "Packing Item", id: 15 ,text:"packing_name"}, 
                { name: "HSN Code", id: 16 ,text:"hsn_code"},
                { name: "Packing Qty.", id: 17 ,text:"squantity"},
                { name: "Packing UOM", id: 18 ,text:"suom"},
                { name: "Item Qty.", id: 19 ,text:"quantity"}, 
                { name: "Item UOM", id: 20 ,text:"uom"},
                { name: "Mat Wt.", id: 21 ,text:"mat_wt"},
                { name: "Price", id: 22 ,text:"price"},
                { name: "Price Based on", id: 23 ,text:"price_based_on"},
                { name: "Amount", id: 24 ,text:"amount"},
                { name: "Discount", id: 25 ,text:"discount_rate"},
                { name: "Discount Based on", id: 26 ,text:"discount_type"}, 
                { name: "Discount Amt", id: 27 ,text:"discount_amt"},
                { name: "Tax Code", id: 28 ,text:"tax_code"},
                { name: "Tax Rate(%)", id: 29 ,text:"tax_rate"},
                { name: "Tax Amt.", id: 30 ,text:"tax_amt"},
                { name: "Total Amt.", id: 31 ,text:"total_amt"}, 
                { name: "Quality Norms", id: 32 ,text:"acc_norms"}
              ],  
            },
            {
                  name: "Tax Information",
                  text:"sales_invoice_tax_info",
                  children: [
                        { name: "PAN No", id: 33 ,text:"panno"},
                        { name: "GST No", id: 34 ,text:"gstno"},
                        { name: "CIN No", id: 35 ,text:"cinno"}, 
                        { name: "TAN No", id: 36 ,text:"tanno"}
              ],  
        },
        {
          name: "Broker Details",
          text:"sales_invoice_broker_dtls",
          children: [
                { name: "Broker Name", id: 37 ,text:"brokercode"},
                { name: "Basis", id: 38 ,text:"basis"},
                { name: "Rate", id: 39 ,text:"rate"}
       
                ],  
          },
          {
            name: "Transporter Details",
            text:"sales_invoice_trans_dtls",
            children: [
                  { name: "Transporter Name", id: 40 ,text:"transname"},
                  { name: "Vehicle Type", id: 41 ,text:"vehicletype"},
                  { name: "Vehicle No", id: 42 ,text:"vehicleno"},
                  { name: "E-Way Bill No", id: 43 ,text:"ewaybillno"},
                  { name: "E-Way Bill Date", id: 44 ,text:"ewaybilldate"}
         
                  ],  
            },
            {
              name: "Delivery Information",
              text:"sales_invoice_shipment_dtls",
              children: [
                    { name: "Shipment Address", id: 45 ,text:"shipaddr"},
                    { name: "Shipment Details", id: 46 ,text:"shipdtls"},
                    { name: "Pay To Address", id: 47 ,text:"paytoaddr"},
                    { name: "Pay To Details", id: 48 ,text:"paytodtls"}
           
                    ], 
              }//here ends
          
      ];//atmost last

      const TREE_DATA2: VehicleNode[] = [
            {
              name: "Sales Enquiry",
              text:"sales_enquiry",
              children: [
                    { name: "Enquiry Type", id: 1 ,text:"enq_type"},
                    { name: "Enquiry Date", id: 2 ,text:"enq_date"},
                    { name: "Enquiry No.", id: 3 ,text:"enquiry_no"},
                    { name: "Mode Of Enquiry", id: 4 ,text:"mode_of_enq"},
                    { name: "Sales Person", id: 5 ,text:"sales_person"},
                    { name: "Predicted Closing (Days)", id: 6 ,text:"pre_closing"},
                    { name: "Approx. Deal Value", id: 7 ,text:"app_deal_val"},
                    { name: "Referred By", id: 8 ,text:"referred_by"},
                    { name: "Bussiness Unit", id: 9 ,text:"businessunit"},
                    { name: "Enquiry Status", id: 10 ,text:"enq_status"},
                    { name: "Remarks", id: 11 ,text:"remarks"},
                    ]    
            }
            ,
            {
              name: "Item Details",
              text:"sales_enquiry_item_dtls",
              children: [
                    { name: "ITEM NAME", id: 12 ,text:"item_name"},
                    { name: "PACKING ITEM", id: 13 ,text:"packing_item"},
                    { name: "PACKING QUANTITY", id: 14 ,text:"packing_quantity"},
                    { name: "PACKING UOM", id: 15 ,text:"packing_uom"},
                    { name: "ITEM QUANTITY", id: 16 ,text:"quantity"},
                    { name: "ITEM UOM", id: 17 ,text:"uom"},
                    { name: "QC NORMS", id: 18 ,text:"qc_norms"},
                    { name: "REMARKS", id: 19 ,text:"remarks"},                  
           
                    ]    
            }
            ,
            {
              name: "Party Details",
              text:"sales_enquiry_party_dtls",
              children: [
                    { name: "PARTY NAME", id: 20 ,text:"p_name"},
                    { name: "CONTACT PERSON NAME", id: 21 ,text:"cp_name"},
                    { name: "CONTACT NUMBER", id: 22 ,text:"cp_contact"},
                    { name: "TCS APPLICABLE", id: 23 ,text:"tcs_applicable"},
                    { name: "TCS RATE", id: 24 ,text:"tcs_rate"},
                    { name: "MODE OF ENQUIRY", id: 25 ,text:"mode_of_enq"},
                   
                    ]    
            }
      ];//atmost last

      const TREE_DATA3: VehicleNode[] = [
        
            {
              name: "Sales Quotation",
              text:"sales_quotation",
              children: [
                    { name: "Quotation Type", id: 1 ,text:"quo_type"},
                    { name: "Quotation Date", id: 2 ,text:"quotation_date"},
                    { name: "Quotation No.", id: 3 ,text:"quotation_no"},
                    { name: "Reference Type", id: 4 ,text:"ref_type"},
                    { name: "Bussiness Unit", id: 5 ,text:"business_unit"},
                    { name: "Valid Till", id: 6 ,text:"valid_till"},
                    { name: "Price Term", id: 7 ,text:"price_term"},
                    { name: "Receipt Criteria", id: 7 ,text:"receipt_ct"},
                    { name: "Weighment UOM", id: 8 ,text:"we_uom"},
                    { name: "Delivery Within", id: 9 ,text:"delivery"},
                    { name: "Delivery Term", id: 10 ,text:"delivery_term"},
                    { name: "Shipment Mode", id: 11 ,text:"shipment_mode"},
                    { name: "Sales Person", id: 12 ,text:"sales_person"},
                    { name: "Customer Ref. Document No.", id: 13 ,text:"cust_ref"},
                    { name: "Quotation status", id: 14 ,text:"q_status"},
                    { name: "Sales Invoice Type", id: 15 ,text:"inv_type"},
                    { name: "Applicable Charges", id: 16 ,text:"app_chgs_id"},
                    { name: "Remarks", id: 17 ,text:"remarks"},
                    { name: "Confirmed By", id: 18 ,text:"confirmed_by"},
                    { name: "Approved", id: 19 ,text:"approved"},
                    { name: "Reason", id: 20 ,text:"reason"},
                    ]    
            }
            ,
            {
              name: "Item Details",
              text:"sales_quotation_item_dtls",
              children: [
                    { name: "ITEM NAME", id: 21 ,text:"item_name"},
                    { name: "PACKING ITEM", id: 22 ,text:"packing_name"},
                    { name: "PACKING QTY.", id: 23 ,text:"squantity"},
                    { name: "PACKING UOM", id: 24 ,text:"suom"},
                    { name: "ITEM QUANTITY", id: 25 ,text:"quantity"},
                    { name: "ITEM UOM", id: 26 ,text:"uom"},
                    { name: "CONVERSION FACTOR", id: 27 ,text:"con_factor"},
                    { name: "GROSS.WT", id: 28 ,text:"mat_wt"},
                    { name: "PRICE", id: 29 ,text:"price"},
                    { name: "PRICE BASED ON", id: 30 ,text:"price_based_on"},
                    { name: "AMOUNT", id: 31 ,text:"amount"},
                    { name: "DISCOUNT", id: 32 ,text:"discount_rate"},
                    { name: "DISCOUNT BASED ON", id: 33 ,text:"discount_type"},
                    { name: "DISCOUNT AMT", id: 34 ,text:"discount_amt"},
                    { name: "TOLERANCE(%)", id: 35 ,text:"tolerance"},
                    { name: "TAX CODE", id: 36 ,text:"tax_code"},
                    { name: "TAX RATE(%)", id: 37 ,text:"tax_rate"},
                    { name: "TAX AMT", id: 38 ,text:"tax_amt"},   
           
                    ]    
            }
            ,
            {
              name: "Party Details",
              text:"sales_quotation_party_dtls",
              children: [
                    { name: "PARTY NAME", id: 39 ,text:"p_name"},
                    { name: "CONTACT PERSON NAME", id: 40 ,text:"cp_name"},
                    { name: "CONTACT NUMBER", id: 41 ,text:"cp_contact"},
                    { name: "SEND VIA", id: 42 ,text:"send_via"},
                    { name: "TCS APPLICABLE", id: 43 ,text:"tcs_applicable"},
                    { name: "TCS RATE", id: 44 ,text:"tcs_rate"},                                 
                    ]    
            }    
            ,
            {
              name: "Broker Details",
              text:"sales_quotation_broker_dtls",
              children: [
                    { name: "BROKER NAME", id: 45 ,text:"broker_name"},
                    { name: "BASIS", id: 46 ,text:"basis"},
                    { name: "BASED ON", id: 47 ,text:"based_on"},
                    { name: "RATE", id: 48 ,text:"rate"},                                 
                    ]    
            }  
            ,
            {
              name: "Summary Amount",
              text:"sales_quotation_summary",
              children: [
                    { name: "Item Total", id: 49 ,text:"item_total"},
                    { name: "Discount", id: 50 ,text:"discount"},
                    { name: "Tax Total", id: 51 ,text:"tax_total"},
                    { name: "Net Amount", id: 52 ,text:"net_amount"},
                    { name: "Applicable Brokerage", id: 53 ,text:"app_brokerage"},
                    { name: "Net R Value.", id: 54 ,text:"net_r_value"},                                 
                    ]    
            }
            ,
            {
              name: "Summary Applicable Charges",
              text:"sales_quotation_summary_dyn",
              children: [
                    { name: "CHARGES NAME", id: 55 ,text:"charge_name"},
                    { name: "RATE CALCULATION  METHOD", id: 56 ,text:"rate_cal_method"},
                    { name: "TAX RATE(%)", id: 57 ,text:"tax_rate"},
                    { name: "AMOUNT", id: 58 ,text:"amount"},                                 
                    ]    
            }     
            ,
            {
              name: "Transport Information",
              text:"sales_quotation_trans_info",
              children: [
                    { name: "Transport Borne By", id: 59 ,text:"trans_borne_by"},
                    { name: "Mode Of Transport", id: 60 ,text:"mode_of_trans"},
                    { name: "Transporter Name", id: 61 ,text:"transporter_name"},
                    { name: "Charge Code", id: 62 ,text:"charge_code"},                                 
                    ]    
            }  
            ,
            {
              name: "Shipment Details",
              text:"sales_quotation_shipment_dtls",
              children: [
                    { name: "Ship To Address Id", id: 63 ,text:"ship_addr"},
                    { name: "Payment From Address Id", id: 64 ,text:"pay_addr"},
                    { name: "Ship To Address Details", id: 65 ,text:"ship_details"},
                    { name: "Payment From Address Details", id: 66 ,text:"pay_details"},                                 
                    ]    
            }
      ];//atmost last

      const TREE_DATA4: VehicleNode[] = [
        {
          name: "Sales Order",
          text:"sales_order",
          children: [
                { name: "Order Type", id: 1 ,text:"order_type"},
                { name: "Order Date", id: 2 ,text:"order_date"},
                { name: "Order No.", id: 3 ,text:"order_no"},
                { name: "Business Unit", id: 4 ,text:"business_unit"},
                { name: "Reference Type", id: 5 ,text:"ref_type"},
                { name: "Valid Till", id: 6 ,text:"valid_till"},
                { name: "Price Term", id: 7 ,text:"price_term"},
                { name: "Receipt Criteria", id: 8 ,text:"receipt_criteria"},
                { name: "Weighment UOM", id: 9 ,text:"we_uom"},
                { name: "Delivery Within", id: 10 ,text:"delivery_date"},
                { name: "Delivery Term", id: 11 ,text:"delivery_term"},
                { name: "Shipment Mode", id: 12 ,text:"shipment_mode"},
                { name: "Sales Person", id: 13 ,text:"sales_person"},
                { name: "Customer Ref. Document No.", id: 14 ,text:"cust_refdocno"},
                { name: "Order status", id: 15 ,text:"q_status"},
                { name: "Sales Invoice Type", id: 16 ,text:"inv_type"},
                { name: "Applicable Charges", id: 17 ,text:"app_chgs_id"},
                { name: "Remarks", id: 18 ,text:"remarks"},
                { name: "Confirmed By", id: 19 ,text:"confirmed_by"},
                { name: "Approved", id: 20 ,text:"approval"},
                { name: "Reason", id: 21 ,text:"reason"},
                ]    
        }
        ,
        {
          name: "Item Details",
          text:"sales_order_item_dtls",
          children: [
                { name: "ITEM NAME", id: 22 ,text:"item_name"},
                { name: "PACKING ITEM", id: 23 ,text:"packing_name"},
                { name: "HSN CODE", id: 24 ,text:"hsn_code"},
                { name: "PACKING QTY.", id: 25 ,text:"squantity"},
                { name: "PACKING UOM", id: 26 ,text:"suom"},
                { name: "ITEM QTY.", id: 27 ,text:"quantity"},
                { name: "ITEM UOM", id: 28 ,text:"uom"},
                { name: "CONVERSION FACTOR", id: 29 ,text:"con_factor"},
                { name: "GROSS.WT", id: 30 ,text:"mat_wt"},     
                { name: "PRICE", id: 31 ,text:"price"},
                { name: "PRICE BASED ON", id: 32 ,text:"price_based_on"},
                { name: "AMOUNT", id: 33 ,text:"amount"},
                { name: "DISCOUNT", id: 34 ,text:"discount_rate"},
                { name: "DISCOUNT BASED ON", id: 35 ,text:"discount_type"},
                { name: "DISCOUNT AMT", id: 36 ,text:"discount_amt"},     
                { name: "TOLERANCE(%)", id: 37 ,text:"tolerance"},
                { name: "TAX CODE", id: 38 ,text:"tax_code"},
                { name: "TAX RATE(%)", id: 39 ,text:"tax_rate"},
                { name: "TAX AMT", id: 40 ,text:"tax_amt"},
                { name: "QUALITY NORMS", id: 41 ,text:"acc_norms"},                 
                { name: "PACKING LIST REQ.", id: 42 ,text:"packing_list_req"},

                ]    
        }
        ,
        {
          name: "Party Details",
          text:"sales_order_party_dtls",
          children: [
                { name: "PARTY NAME", id: 43 ,text:"p_name"},
                { name: "CONTACT PERSON NAME", id: 44 ,text:"cp_name"},
                { name: "CONTACT NUMBER", id: 45 ,text:"cp_contact"},
                { name: "SEND VIA", id: 46 ,text:"send_via"},
                { name: "TCS APPLICABLE", id: 47 ,text:"tcs_applicable"},
                { name: "TCS RATE", id: 48 ,text:"tcs_rate"},
               
                ]    
        }
        ,
        {
          name: "Broker Details",
          text:"sales_order_broker_dtls",
          children: [
                { name: "PARTY NAME", id: 49 ,text:"p_code"},
                { name: "BROKER NAME", id: 50 ,text:"broker_name"},
                { name: "BASIS", id: 51 ,text:"basis"},
                { name: "BASED ON", id: 52 ,text:"based_on"},
                { name: "RATE", id: 53 ,text:"rate"},                                 
                ]    
        } 
        ,
        {
          name: "Payment Details",
          text:"sales_order_terms_con",
          children: [
                { name: "Payment Mode", id: 54 ,text:"payment_mode"},
                { name: "Bank Name", id: 55 ,text:"bank_name"},
                { name: "Payment Term", id: 56 ,text:"payment_term"},
                { name: "Account Number", id: 57 ,text:"account_no"},
                { name: "Account Name", id: 58 ,text:"account_name"},    
                { name: "Branch", id: 59 ,text:"branch"},
                { name: "BIC/SWIFT Code", id: 60 ,text:"bic_swift_code"},
                { name: "IFSC Code", id: 61 ,text:"ifsc_code"},
                { name: "Cash Limit", id: 62 ,text:"cash_limit"},                             
                ]    
        }
        ,
        {
          name: "Summary Amount",
          text:"sales_order_summary",
          children: [
                { name: "Item Total", id: 64 ,text:"item_total"},
                { name: "Discount", id: 65 ,text:"discount"},
                { name: "Tax Total", id: 67 ,text:"tax_total"},
                { name: "Net Amount", id: 68 ,text:"net_amount"},
                { name: "Applicable Brokerage", id: 69 ,text:"app_brokerage"},
                { name: "Net R Value.", id: 70 ,text:"net_r_value"},                                 
                ]    
        }
        ,
        {
          name: "Summary Applicable Charges",
          text:"sales_order_summary_dyn",
          children: [
                { name: "CHARGES NAME", id: 71 ,text:"charge_name"},
                { name: "RATE CALCULATION  METHOD", id: 72 ,text:"rate_cal_method"},
                { name: "TAX RATE(%)", id: 73 ,text:"tax_rate"},
                { name: "AMOUNT", id: 74 ,text:"amount"},                                 
                ]    
        } 
  ];//atmost last

  const TREE_DATA5: VehicleNode[] = [
        
    {
      name: "Delivery Challan",
      text:"delivery_challan",
      children: [
            { name: "Sales Invoice Type", id: 1 ,text:"inv_type"},
            { name: "Challan Date", id: 2 ,text:"challan_date"},
            { name: "Challan No.", id: 3 ,text:"challan_no"},
            { name: "Bussiness Unit", id: 4 ,text:"business_unit"},
            { name: "Party", id: 5 ,text:"party"},
            { name: "Reference Type", id: 6 ,text:"ref_type"},
            { name: "Price Term", id: 7 ,text:"price_term"},
            { name: "Customer Ref. Document No.", id: 8 ,text:"cust_ref_doc_no"},
            { name: "Date", id: 9 ,text:"date2"},
            { name: "Grand Total", id: 10 ,text:"grand_total"},
            { name: "Remarks", id: 11 ,text:"remark"},
            { name: "Confirmed By", id: 12 ,text:"confirmed_by"},
            { name: "Approved", id: 13 ,text:"approval"},
            { name: "Reason", id: 14 ,text:"reason"},
            ]    
    }
    ,
    {
      name: "Item Details",
      text:"delivery_challan_item_dtls",
      children: [
            { name: "ITEM NAME", id: 15 ,text:"item_name"},
            { name: "PACKING ITEM", id: 16 ,text:"packing_name"},
            { name: "HSN CODE", id: 17 ,text:"hsn_code"},
            { name: "PACKING QTY.", id: 18 ,text:"squantity"},
            { name: "PACKING UOM", id: 19 ,text:"suom"},
            { name: "ITEM QTY.", id: 20 ,text:"quantity"},
            { name: "ITEM UOM", id: 21 ,text:"uom"},
            { name: "MAT.WT", id: 22 ,text:"mat_wt"},
            { name: "PRICE", id: 23 ,text:"price"},
            { name: "PRICE BASED ON", id: 24 ,text:"price_based_on"},
            { name: "AMOUNT", id: 25 ,text:"amount"},
            { name: "DISCOUNT", id: 26 ,text:"discount_rate"},
            { name: "DISCOUNT BASED ON", id: 27 ,text:"discount_type"},
            { name: "DISCOUNT AMT", id: 28 ,text:"discount_amt"},
            { name: "TAX CODE", id: 29 ,text:"tax_code"},
            { name: "TAX RATE(%)", id: 30 ,text:"tax_rate"},
            { name: "TAX AMT", id: 31 ,text:"tax_amt"},   
            { name: "TOTAL AMT.", id: 32 ,text:"total_amt"},
            { name: "QUALITY NORMS", id: 33 ,text:"acc_norms"},    
            ]    
    }
    ,
    {
      name: "Party Details",
      text:"delivery_challan_party_dtls",
      children: [
            { name: "PARTY NAME", id: 34 ,text:"p_name"},
            { name: "CONTACT PERSON NAME", id: 35 ,text:"cp_name"},
            { name: "CONTACT NUMBER", id: 36 ,text:"cp_contact"},                                 
            ]    
    }    
    ,
    {
      name: "Shipment Details",
      text:"delivery_challan_shipment_dtls",
      children: [
            { name: "Ship To Address Id", id: 37 ,text:"ship_addr"},
            { name: "Ship To Address", id: 38 ,text:"ship_details"},
            { name: "Pay To Address Id", id: 39 ,text:"pay_addr"},
            { name: "Pay To Address", id: 40 ,text:"pay_details"},                                 
            ]    
    }  
    ,
    {
      name: "WEIGHMENT DETAILS",
      text:"delivery_challan_weight_dtl",
      children: [
        { name: "UOM", id: 41 ,text:"own_uom"},
        { name: "Gross", id: 42 ,text:"own_gross"},
        { name: "Tare", id: 43 ,text:"own_tare"},
        { name: "Net", id: 44 ,text:"own_net"},
        { name: "Eway-Bill No", id: 45 ,text:"own_permit_no"},
        { name: "Date", id: 46 ,text:"own_date"},
        { name: "Slip No.", id: 47 ,text:"own_slip_no"},
        { name: "Party UOM", id: 48 ,text:"party_uom"},
        { name: "Party Gross", id: 49 ,text:"party_gross"},
        { name: "Party Tare", id: 50 ,text:"party_tare"},
        { name: "Party Net", id: 51 ,text:"party_net"},
        { name: "Party Date", id: 52 ,text:"party_date"},
        { name: "Party Slip No.", id: 53 ,text:"party_slip_no"},
            ]    
    }
    ,
    {
      name: "TRANSPORT INFORMATION",
      text:"delivery_challan_trans_info",
      children: [
            { name: "Transport Borne By", id: 54 ,text:"trans_borne_by"},
            { name: "Mode Of Transport", id: 55 ,text:"mode_of_trans"},
            { name: "Transporter Name", id: 56 ,text:"transporter_name"},
            { name: "Vehicle No.", id: 57 ,text:"vehle_no"},
            { name: "Charge Code", id: 58 ,text:"charge_code"},
            { name: "Freight Amount", id: 59 ,text:"freight_amt"},
            { name: "Advance Paid", id: 60 ,text:"adv_paid"},
            ]    
    }     
    
];//atmost last

const TREE_DATA6: VehicleNode[] = [
      
  {
    name: "Return Approval Note",
    text:"return_approval_note",
    children: [
          { name: "Sales Return Type", id: 1 ,text:"salesreturntype"},
          { name: "Sales Return No.", id: 2 ,text:"salesreturnno"},
          { name: "Sales Return Date", id: 3 ,text:"salesreturndate"},
          { name: "Bussiness Unit", id: 4 ,text:"businessunitname"},
          { name: "Party", id: 5 ,text:"party"},
          { name: "Return Criteria", id: 6 ,text:"returncriteria"},
          { name: "Return Based On", id: 7 ,text:"returnbasedon"},
          { name: "Reference No.", id: 8 ,text:"salesreturnrefno"},
          { name: "Grand Total", id: 9 ,text:"grandtotal"},
          { name: "Remarks", id: 10 ,text:"remarks"},
          { name: "Confirmed By", id: 11 ,text:"confirmedby"},
          { name: "Approved", id: 12 ,text:"approved"},
          { name: "Reason", id: 13 ,text:"reason"},
          ]    
  }
  ,
  {
    name: "Item Details",
    text:"return_approval_item_dtls",
    children: [
          { name: "ITEM NAME", id: 14 ,text:"itemname"},
          { name: "PACKING ITEM", id: 15 ,text:"packingname"},
          { name: "HSN CODE", id: 16 ,text:"hsn_code"},
          { name: "PACKING QTY.", id: 17 ,text:"squantity"},
          { name: "PACKING UOM", id: 18 ,text:"suom"},
          { name: "ITEM QTY.", id: 19 ,text:"quantity"},
          { name: "ITEM UOM", id: 20 ,text:"uom"},
          { name: "MAT.WT", id: 21 ,text:"matwt"},
          { name: "PRICE", id: 22 ,text:"price"},
          { name: "PRICE BASED ON", id: 23 ,text:"pricebasedon"},
          { name: "AMOUNT", id: 24 ,text:"amount"},
          { name: "DISCOUNT", id: 25 ,text:"discountrate"},
          { name: "DISCOUNT BASED ON", id: 26 ,text:"discounttype"},
          { name: "DISCOUNT AMT", id: 27 ,text:"discountamt"},
          { name: "TAX CODE", id: 28 ,text:"taxcode"},
          { name: "TAX RATE(%)", id: 29 ,text:"taxrate"},
          { name: "TAX AMT.", id: 30 ,text:"taxamt"},   
          { name: "TOTAL AMT.", id: 31 ,text:"totalamt"},
          { name: "QUALITY NORMS", id: 32 ,text:"accnorms"},    
          ]    
  }
  ,
  {
    name: "Broker Details",
    text:"return_approval_broker_dtls",
    children: [
          { name: "BROKER NAME", id: 33 ,text:"brokercode"},
          { name: "BASIS", id: 34 ,text:"basis"},
          { name: "RATE", id: 35 ,text:"rate"},                                 
          ]    
  } 
  ,
  {
    name: "Party Details",
    text:"return_approval_party_dtls",
    children: [
          { name: "PARTY NAME", id: 36 ,text:"pcode"},
          { name: "CONTACT PERSON NAME", id: 37 ,text:"cpname"},
          { name: "CONTACT NUMBER", id: 38 ,text:"cpcontact"},                                 
          ]    
  }    
  ,
  {
    name: "Shipment Details",
    text:"return_approval_shipment_dtls",
    children: [
          { name: "Ship To Address Id", id: 39 ,text:"shipaddr"},
          { name: "Ship To Address", id: 40 ,text:"shipdetails"},
          { name: "Pay To Address Id", id: 41 ,text:"payaddr"},
          { name: "Pay To Address", id: 42 ,text:"paydetails"},                                 
          ]    
  }  
  ,
  {
    name: "WEIGHMENT DETAILS",
    text:"return_approval_weight_dtl",
    children: [
      { name: "UOM", id: 43 ,text:"ownuom"},
      { name: "Gross", id: 44 ,text:"owngross"},
      { name: "Tare", id: 45 ,text:"owntare"},
      { name: "Net", id: 46 ,text:"ownnet"},
      { name: "Eway-Bill No", id: 47 ,text:"ownpermitno"},
      { name: "Date", id: 48 ,text:"owndate"},
      { name: "Slip No.", id: 49 ,text:"ownslipno"},
      { name: "Party UOM", id: 50 ,text:"partyuom"},
      { name: "Party Gross", id: 51 ,text:"partygross"},
      { name: "Party Tare", id: 52 ,text:"partytare"},
      { name: "Party Net", id: 53 ,text:"partynet"},
      { name: "Party Date", id: 54 ,text:"partydate"},
      { name: "Party Slip No.", id: 55 ,text:"partyslipno"},
          ]    
  }
  ,
  {
    name: "TRANSPORT INFORMATION",
    text:"return_approval_trans_info",
    children: [
          { name: "Transport Borne By", id: 56 ,text:"transborneby"},
          { name: "Mode Of Transport", id: 57 ,text:"modeoftrans"},
          { name: "Transporter Name", id: 58 ,text:"transcode"},
          { name: "Vehicle No.", id: 59 ,text:"vehleno"},
          { name: "Charge Code", id: 60 ,text:"chargecode"},
          { name: "Freight Amount", id: 61 ,text:"freightamt"},
          { name: "Advance Paid", id: 62 ,text:"advpaid"},
          ]    
  }     
  
];//atmost last

const TREE_DATA7: VehicleNode[] = [
      
  {
    name: "SALES RETURN NOTE",
    text:"sales_return_note",
    children: [
          { name: "Sales Invoice Type", id: 1 ,text:"inv_type"},
          { name: "Sales Return Date.", id: 2 ,text:"salesreturnnotedate"},
          { name: "Sales Return Note No.", id: 3 ,text:"salesreturnnoteno"},
          { name: "Bussiness Unit", id: 4 ,text:"businessunitname"},
          { name: "Party", id: 5 ,text:"party"},
          { name: "Reference No.", id: 6 ,text:"salesreturnnoterefno"},
          { name: "Price Term", id: 7 ,text:"price_term"},
          { name: "Customer Ref. Document No.", id: 8 ,text:"cust_ref_doc_no"},
          { name: "Date", id: 9 ,text:"date2"},
          { name: "Grand Total", id: 10 ,text:"grandtotal"},
          { name: "Remarks", id: 11 ,text:"remarks"},
          { name: "Confirmed By", id: 12 ,text:"confirmedby"},
          { name: "Approved", id: 13 ,text:"approved"},
          { name: "Reason", id: 14 ,text:"reason"},
          ]    
  }
  ,
  {
    name: "Item Details",
    text:"sales_return_note_item_dtls",
    children: [
          { name: "ITEM NAME", id: 15 ,text:"itemname"},
          { name: "PACKING ITEM", id: 16 ,text:"packingname"},
          { name: "HSN CODE", id: 17 ,text:"hsn_code"},
          { name: "PACKING QTY.", id: 18 ,text:"squantity"},
          { name: "PACKING UOM", id: 19 ,text:"suom"},
          { name: "ITEM QTY.", id: 20 ,text:"quantity"},
          { name: "ITEM UOM", id: 21 ,text:"uom"},
          { name: "MAT.WT", id: 22 ,text:"matwt"},
          { name: "PRICE", id: 23 ,text:"price"},
          { name: "PRICE BASED ON", id: 24 ,text:"pricebasedon"},
          { name: "AMOUNT", id: 25 ,text:"amount"},
          { name: "DISCOUNT", id: 26 ,text:"discountrate"},
          { name: "DISCOUNT BASED ON", id: 27 ,text:"discounttype"},
          { name: "DISCOUNT AMT", id: 28 ,text:"discountamt"},
          { name: "TAX CODE", id: 29 ,text:"taxcode"},
          { name: "TAX RATE(%)", id: 30 ,text:"taxrate"},
          { name: "TAX AMT.", id: 31 ,text:"taxamt"},   
          { name: "TOTAL AMT.", id: 32 ,text:"totalamt"},
          { name: "QUALITY NORMS", id: 33 ,text:"accnorms"},    
          ]    
  }
  ,
  {
    name: "Broker Details",
    text:"sales_return_note_broker_dtls",
    children: [
          { name: "BROKER NAME", id: 34 ,text:"brokercode"},
          { name: "BASIS", id: 35 ,text:"basis"},
          { name: "RATE", id: 36 ,text:"rate"},                                 
          ]    
  } 
  ,
  {
    name: "Party Details",
    text:"sales_return_note_party_dtls",
    children: [
          { name: "PARTY NAME", id: 37 ,text:"pcode"},
          { name: "CONTACT PERSON NAME", id: 38 ,text:"cpname"},
          { name: "CONTACT NUMBER", id: 39 ,text:"cpcontact"},                                 
          ]    
  }    
  ,
  {
    name: "Shipment Details",
    text:"sales_return_note_shipment_dtls",
    children: [
          { name: "Ship To Address Id", id: 40 ,text:"shipaddr"},
          { name: "Ship To Address", id: 41 ,text:"shipdetails"},
          { name: "Pay To Address Id", id: 42 ,text:"payaddr"},
          { name: "Pay To Address", id: 43 ,text:"paydetails"},                                 
          ]    
  }  
  ,
  {
    name: "WEIGHMENT DETAILS",
    text:"sales_return_note_weight_dtl",
    children: [
      { name: "UOM", id: 44 ,text:"ownuom"},
      { name: "Gross", id: 45 ,text:"owngross"},
      { name: "Tare", id: 46 ,text:"owntare"},
      { name: "Net", id: 47 ,text:"ownnet"},
      { name: "Eway-Bill No", id: 48 ,text:"ownpermitno"},
      { name: "Date", id: 49 ,text:"owndate"},
      { name: "Slip No.", id: 50 ,text:"ownslipno"},
      { name: "Party UOM", id: 51 ,text:"partyuom"},
      { name: "Party Gross", id: 52 ,text:"partygross"},
      { name: "Party Tare", id: 53 ,text:"partytare"},
      { name: "Party Net", id: 54 ,text:"partynet"},
      { name: "Party Date", id: 55 ,text:"partydate"},
      { name: "Party Slip No.", id: 56 ,text:"partyslipno"},
          ]    
  }
  ,
  {
    name: "TRANSPORT INFORMATION",
    text:"sales_return_note_trans_info",
    children: [
          { name: "Transport Borne By", id: 57 ,text:"transborneby"},
          { name: "Mode Of Transport", id: 58 ,text:"modeoftrans"},
          { name: "Transporter Name", id: 59 ,text:"transcode"},
          { name: "Vehicle No.", id: 60 ,text:"vehleno"},
          { name: "Charge Code", id: 61 ,text:"chargecode"},
          { name: "Freight Amount", id: 62 ,text:"freightamt"},
          { name: "Advance Paid", id: 63 ,text:"advpaid"},
          ]    
  }     
  
];//atmost last

const TREE_DATA8: VehicleNode[] = [
      
  {
    name: "SALES CREDIT NOTE",
    text:"sales_credit_note",
    children: [
          { name: "Sales Return Type", id: 1 ,text:"creditnotetype"},
          { name: "Credit Note Inv No.", id: 2 ,text:"creditnoteno"},
          { name: "Credit Note Inv Date", id: 3 ,text:"creditnotedate"},
          { name: "Invoice Type", id: 4 ,text:"invoice_typename"},
          { name: "Business Unit", id: 5 ,text:"business_unitname"},
          { name: "Party Name", id: 6 ,text:"partyname"},
          { name: "Challan", id: 7 ,text:"challan"},
          { name: "E-Invoice No.", id: 8 ,text:"e_invoice_no"},
          { name: "Sales Return Note No", id: 9 ,text:"salesorderno"},
          { name: "Sales Return Note Date", id: 10 ,text:"salesorderdate"},
          { name: "Ref Challan No", id: 11 ,text:"refchallanno"},
          { name: "Ref Challan Date", id: 12 ,text:"refchallandate"},
          { name: "Grand Total", id: 13 ,text:"grand_total"},
          { name: "Remarks", id: 14 ,text:"remarks"},
          { name: "Item Total", id: 15 ,text:"item_total"},
          { name: "Item GL Ac", id: 16 ,text:"item_total_gl_ac"},
          { name: "Discount", id: 17 ,text:"discount"},
          { name: "Discount GL Ac", id: 18 ,text:"discount_gl_ac"},
          { name: "Tax Total	", id: 19 ,text:"tax_total"},
          { name: "Tax GL Ac", id: 20 ,text:"tax_total_gl_ac"},
          { name: "Applicable Charge", id: 21 ,text:"applicable_amt"},
          { name: "Applicable Charge GL Ac", id: 22 ,text:"applicable_gl_ac"},
          { name: "Adj (+)", id: 23 ,text:"adj1_amt"},
          { name: "Adj (+) GL Ac", id: 24 ,text:"adj1_gl_ac"},
          { name: "Adj (-)", id: 25 ,text:"adj2_amt"},
          { name: "Adj (-) GL Ac", id: 26 ,text:"adj2_gl_ac"},
          { name: "RoundOff", id: 27 ,text:"roundoff_amt"},
          { name: "RoundOff GL Ac", id: 28 ,text:"roundoff_gl_ac"},
          { name: "TCS(+)", id: 29 ,text:"tcsamt"},
          { name: "TCS(+) GL Ac", id: 30 ,text:"tcsglac"},
          { name: "Payable Amount", id: 31 ,text:"payable_amt"},
          { name: "Payable Amount GL Ac", id: 32 ,text:"payable_amt_gl_ac"},
          
          ]    
  }
  ,
  {
    name: "Item Details",
    text:"sales_credit_note_item_dtls",
    children: [
          { name: "ITEM NAME", id: 33 ,text:"item_name"},
          { name: "ITEM GROUP", id: 34 ,text:"item_group"},
          { name: "PACKING ITEM", id: 35 ,text:"packing_name"},
          { name: "HSN CODE", id: 36 ,text:"hsn_code"},
          { name: "PACKING QTY.", id: 37 ,text:"squantity"},
          { name: "PACKING UOM", id: 38 ,text:"suom"},
          { name: "ITEM QTY.", id: 39 ,text:"quantity"},
          { name: "ITEM UOM", id: 40 ,text:"uom"},
          { name: "MAT.WT", id: 41 ,text:"mat_wt"},
          { name: "PRICE", id: 42 ,text:"price"},
          { name: "PRICE BASED ON", id: 43 ,text:"price_based_on"},
          { name: "AMOUNT", id: 44 ,text:"amount"},
          { name: "DISCOUNT", id: 45 ,text:"discount_rate"},
          { name: "DISCOUNT BASED ON", id: 46 ,text:"discount_type"},
          { name: "DISCOUNT AMT", id: 47 ,text:"discount_amt"},
          { name: "TAX CODE", id: 48 ,text:"tax_code"},
          { name: "TAX RATE(%)", id: 49 ,text:"tax_rate"},
          { name: "TAX AMT.", id: 50 ,text:"tax_amt"},   
          { name: "TOTAL AMT.", id: 51 ,text:"total_amt"},
          { name: "QUALITY NORMS", id: 52 ,text:"acc_norms"},    
          ]    
  }
  ,
  {
    name: "Tax Information",
    text:"sales_credit_note_tax_info",
    children: [
          { name: "PAN No", id: 53 ,text:"panno"},
          { name: "GST No", id: 54 ,text:"gstno"},
          { name: "CIN No", id: 55 ,text:"cinno"},    
          { name: "TAN No", id: 56 ,text:"tanno"},                              
          ]    
  } 
  ,
  {
    name: "Broker Details",
    text:"sales_credit_note_broker_dtls",
    children: [
          { name: "BROKER NAME", id: 57 ,text:"brokercode"},
          { name: "BASIS", id: 58 ,text:"basis"},
          { name: "RATE", id: 59 ,text:"rate"},                                 
          ]    
  }    
  ,
  {
    name: "Transporter Details",
    text:"sales_credit_note_trans_dtls",
    children: [
          { name: "TRANSPORTER NAME", id: 60 ,text:"transname"},
          { name: "VEHICLE TYPE", id: 61 ,text:"vehicletype"},
          { name: "VEHICLE NO", id: 62 ,text:"vehicleno"},
          { name: "E-WAY BILL NO", id: 63 ,text:"ewaybillno"},      
          { name: "E-WAY BILL DATE", id: 64 ,text:"ewaybilldate"},                             
          ]    
  }  
  ,
  {
    name: "Shipment Details",
    text:"sales_credit_note_shipment_dtls",
    children: [
          { name: "Ship To Address Id", id: 65 ,text:"shipaddr"},
          { name: "Ship To Address", id: 66 ,text:"shipdetails"},
          { name: "Pay To Address Id", id: 67 ,text:"paytoaddr"},
          { name: "Pay To Address", id: 68 ,text:"paytodtls"},                                 
          ]    
  }  
  ,
  {
    name: "BUSINESS PARTNER DETAILS",
    text:"sales_credit_note_bp_dtls",
    children: [
      { name: "Name", id: 69 ,text:"sp_name"},
      { name: "Phone No.", id: 70 ,text:"sp_phone"},
      { name: "Address", id: 71 ,text:"sp_address"},
      { name: "Fax", id: 72 ,text:"sp_fax"},
      { name: "E-Mail", id: 73 ,text:"sp_email"},
      { name: "Contact Person Name", id: 74 ,text:"cp_name"},
      { name: "Contact Person Designation", id: 75 ,text:"cp_designation"},
      { name: "Contact Person Address", id: 76 ,text:"cp_address"},
      { name: "Contact Person Phone No.", id: 77 ,text:"cp_phone"},
      { name: "Contact Person Fax", id: 78 ,text:"cp_fax"},
      { name: "Contact Person E-Mail", id: 79 ,text:"cp_email"},
          ]    
  }
  ,
  {
    name: "Payment Details",
    text:"sales_credit_note_payment_dtls",
    children: [
          { name: "Mode of Payment", id: 80 ,text:"mode_of_payment"},
          { name: "Bank Name", id: 81 ,text:"bank_name"},
          { name: "Account Holder Name", id: 82 ,text:"account_name"},
          { name: "Account No", id: 83 ,text:"account_no"},   
          { name: "Branch", id: 84 ,text:"branch"},
          { name: "IBAN", id: 85 ,text:"iban"},
          { name: "IFSC Code", id: 86 ,text:"ifsc_code"},
          { name: "Mobile", id: 87 ,text:"mobile"},
          { name: "BIC/SWIFT Code", id: 88 ,text:"bic_swift_code"},
          { name: "Payment Terms", id: 89 ,text:"payment_term"},
          { name: "Cash Limit", id: 90 ,text:"cash_limit"},                             
          ]    
  }   
  
];//atmost last

const TREE_DATA9: VehicleNode[] = [
      
  {
    name: "GATE PASS",
    text:"gate_pass",
    children: [
          { name: "Date", id: 1 ,text:"challan_date"},
          { name: "Advice No.", id: 2 ,text:"advive_no"},
          { name: "Status", id: 3 ,text:"status"},
          { name: "Narration", id: 4 ,text:"narration"},
          { name: "Transporter Name", id: 5 ,text:"trans_name"},
          { name: "Driver Name", id: 6 ,text:"driver_name"},
          { name: "Truck No", id: 7 ,text:"truck_no"},
          
          ]    
  }
  ,
  {
    name: "Item Details",
    text:"gate_pass_item_dtls",
    children: [
            { name: "ITEM NAME", id: 8 ,text:"item_name"},
            { name: "PACKING MATERIAL", id: 9 ,text:"pack_mat"},
            { name: "PACKING QUANTITY", id: 10 ,text:"pack_qty"},
            { name: "PACKING UOM", id: 11 ,text:"pack_uom"},
            { name: "ITAM QUANTITY", id: 12 ,text:"item_qty"},
            { name: "ITAM UOM", id: 13 ,text:"item_uom"},   
          ]    
  }  
  
];//atmost last

const TREE_DATA10: VehicleNode[] = [
      
  {
    name: "PURCHASE INDENT ORDER",
    text:"pur_indent",
    children: [
          { name: "Indent Type", id: 1 ,text:"indent_type"},
          { name: "Indent Date", id: 2 ,text:"indent_date"},
          { name: "Indent No.", id: 3 ,text:"indent_no"},
          { name: "Valid Until", id: 4 ,text:"valid_until"},
          { name: "Department", id: 5 ,text:"department"},
          { name: "Referance Type", id: 6 ,text:"referance_type"},
          { name: "Indent By", id: 7 ,text:"indent_by"},
          { name: "Service / Item Type", id: 8 ,text:"ser_item_type"},
          { name: "Fullfillment Type", id: 9 ,text:"fullfillment_type"},
          { name: "Fullfillment By", id: 10 ,text:"fullfillment_by"},
          { name: "Packing Required", id: 11 ,text:"packing_req"},
          { name: "Remarks", id: 12 ,text:"remarks"},
          { name: "Confirmed By", id: 13 ,text:"confirmed_by"},
          { name: "Approved", id: 14 ,text:"approved"},
          { name: "Reason", id: 15 ,text:"reason"},
          { name: "Close", id: 16 ,text:"close"},
          
          ]    
  }
  ,
  {
    name: "Service/Item Details",
    text:"pur_indent_details",
    children: [
            { name: "ITEM NAME", id: 17 ,text:"item_name"},
            { name: "PACKING ITEM", id: 18 ,text:"packing_item_name"},
            { name: "STOCK IN HAND ITEM", id: 19 ,text:"stock_item"},
            { name: "STOCK IN HAND ITEM UOM", id: 20 ,text:"stock_item_uom"},
            { name: "STOCK IN HAND PACKING", id: 21 ,text:"stock_pack"},
            { name: "STOCK IN HAND PACKING UOM", id: 22 ,text:"stock_pack_uom"},
            { name: "PACKING QTY", id: 23 ,text:"indent_pack_qty"},
            { name: "ITEM QTY", id: 24 ,text:"indent_item_qty"},
            { name: "ITEM UOM", id: 25 ,text:"item_uom"},
            { name: "INDICATIVE PRICE", id: 26 ,text:"indicative_price"},
            { name: "PRICE BASED ON", id: 27 ,text:"price_based_on"},
            { name: "AMOUNT", id: 28 ,text:"amount"},
            { name: "QC NORMS", id: 29 ,text:"qc_norms"},
            { name: "PRIORITY", id: 30 ,text:"priority"},
            { name: "DELIVERY DATE", id: 31 ,text:"delivery_date"},
            { name: "REQUIREMENT DATE", id: 32 ,text:"req_date"},
            { name: "PURPOSE", id: 33 ,text:"purpose"},
            { name: "WHERE TO BE USED", id: 34 ,text:"to_be_used"},
            { name: "REMARKS", id: 35 ,text:"remarks"},
            { name: "PACKING UOM", id: 36 ,text:"packing_uom"},   
          ]    
  }
  
];//atmost last

const TREE_DATA11: VehicleNode[] = [
      
  {
    name: "PURCHASE ENQUIRY",
    text:"pur_enquiry",
    children: [
          { name: "Enquiry Type", id: 1 ,text:"enquiry_type"},
          { name: "Enquiry Date", id: 2 ,text:"enquiry_date"},
          { name: "Enquiry No.", id: 3 ,text:"enquiry_no"},
          { name: "Referance Type", id: 4 ,text:"referance_type"},
          { name: "Valid Until", id: 5 ,text:"valid_until"},
          { name: "Fulfilment Type", id: 6 ,text:"fullfillment_type"},
          { name: "Fulfilment By", id: 7 ,text:"fullfillment_by"},
          { name: "Mode Of Quotation", id: 8 ,text:"mode_of_enq"},
          { name: "Service / Item Type", id: 9 ,text:"service_type_name"},
          { name: "Department", id: 10 ,text:"dept"},
          { name: "Packing Required", id: 11 ,text:"packing_req"},
          { name: "Enquiry Status", id: 12 ,text:"enquiry_status"},
          { name: "Confirmed By", id: 13 ,text:"confirmed_by"},
          { name: "Approved", id: 14 ,text:"approved"},
          { name: "Reason", id: 15 ,text:"reason"},
          { name: "Remarks", id: 16 ,text:"remarks"},
          { name: "Payment Term", id: 17 ,text:"payment_term"},
          { name: "Transport Born By", id: 18 ,text:"trans_born_by"},
          { name: "Location Of Delivery", id: 19 ,text:"loc_of_delivery"},
          ]    
  }
  ,
  {
    name: "Service/Item Details",
    text:"pur_enquiry_service_details",
    children: [
            { name: "ITEM NAME", id: 20 ,text:"item_name"},
            { name: "PACKING ITEM", id: 21 ,text:"packing_item_name"},
            { name: "PACKING UOM", id: 22 ,text:"packing_uom"},
            { name: "PACKING QTY", id: 23 ,text:"packing_qty"},
            { name: "ITEM UOM", id: 24 ,text:"item_uom"},
            { name: "ITEM QTY", id: 25 ,text:"item_qty"},
            { name: "MRP", id: 26 ,text:"mrp"},
            { name: "PRICE BASED ON", id: 27 ,text:"price_based_on"},
            { name: "AMOUNT", id: 28 ,text:"amount"},
            { name: "QC NORMS", id: 29 ,text:"qc_norms"},
            { name: "PRIORITY", id: 30 ,text:"priority"},
            { name: "DELIVERY DATE", id: 31 ,text:"delivery_date"},
            { name: "REQUIREMENT DATE", id: 32 ,text:"required_date"},
            { name: "PURPOSE", id: 33 ,text:"purpose"},
            { name: "WHERE TO BE USED", id: 34 ,text:"to_be_used"},
            { name: "REMARKS", id: 35 ,text:"remarks"},
            { name: "PACKING LIST REQ.", id: 36 ,text:"packing_list_req"},   
          ]    
  }
  ,
  {
    name: "BUSINESS PARTNER DETAILS",
    text:"pur_enquiry_bpartner_details",
    children: [
            { name: "BUSINESS PARTNER NAME", id: 37 ,text:"bp_name"},
            { name: "CONTACT PERSON NAME", id: 38 ,text:"cp_name"},
            { name: "CONTACT NUMBER", id: 39 ,text:"cp_mobile"},
            { name: "SEND VIA", id: 40 ,text:"send_via"},   
          ]    
  }

];//atmost last

const TREE_DATA12: VehicleNode[] = [
      
  {
    name: "PURCHASE QUOTATION",
    text:"pur_quotation",
    children: [
          { name: "Quotation Type", id: 1 ,text:"quotation_type"},
          { name: "Quotation Date", id: 2 ,text:"quotation_date"},
          { name: "Quotation No.", id: 3 ,text:"quotation_no"},
          { name: "Supplier Name", id: 4 ,text:"supplier_name"},
          { name: "Referance Type", id: 5 ,text:"quotation_refeance_type"},
          { name: "Required Date", id: 6 ,text:"required_date"},
          { name: "Valid Until", id: 7 ,text:"valid_until"},
          { name: "Fulfilment Type", id: 8 ,text:"fullfillment_type"},
          { name: "Fulfilment By", id: 9 ,text:"fullfillment_by"},
          { name: "Mode Of Quotation", id: 10 ,text:"mode_of_quotation"},
          { name: "Quotation Status", id: 11 ,text:"quotation_status"},
          { name: "Service / Item Type", id: 12 ,text:"item_type"},
          { name: "Department", id: 13 ,text:"department"},
          { name: "Packing Required", id: 14 ,text:"packing_req"},
          { name: "Document No.", id: 15 ,text:"doc_no"},
          { name: "Document Date", id: 16 ,text:"doc_date"},
          { name: "Payment Terms", id: 17 ,text:"payment_term"},
          { name: "Location Of Delivery", id: 18 ,text:"loc_of_delivery"},
          { name: "Transport Borne By", id: 19 ,text:"transport_borne_by"},
          { name: "Mode Of Transport", id: 20 ,text:"mode_of_transport"},
          { name: "Transporter Name", id: 21 ,text:"transport_name"},
          { name: "Remarks", id: 22 ,text:"remarks"},
          { name: "Confirmed By", id: 23 ,text:"confirmed_by"},
          { name: "Approved", id: 24 ,text:"approved"},
          { name: "Reason", id: 25 ,text:"reason"},
          { name: "Delivery Period (In Days)", id: 26 ,text:"delivery_perior"},
          { name: "Delivery Terms", id: 27 ,text:"delivery_terms"},
          ]    
  }
  ,
  {
    name: "Service/Item Details",
    text:"pur_quotation_service",
    children: [
            { name: "ITEM NAME", id: 28 ,text:"item_name"},
            { name: "PACKING ITEM", id: 29 ,text:"packing_item_name"},
            { name: "PACKING UOM", id: 30 ,text:"packing_uom"},
            { name: "PACKING QTY", id: 31 ,text:"packing_qty"},
            { name: "ITEM UOM", id: 32 ,text:"stock_uom"},
            { name: "ITEM QTY", id: 33 ,text:"stock_qty"},
            { name: "MAT WT", id: 34 ,text:"mat_weight"},
            { name: "PRICE", id: 35 ,text:"price"},
            { name: "PRICE BASED ON", id: 36 ,text:"price_based_on"},
            { name: "TAXABLE AMT", id: 37 ,text:"taxable_amount"},
            { name: "DISCOUNT", id: 38 ,text:"discount"},
            { name: "DISCOUNT BASED ON", id: 39 ,text:"discount_basedon"},
            { name: "DISOCUNT AMOUNT", id: 40 ,text:"discount_amount"},
            { name: "NET AMOUNT", id: 41 ,text:"net_amount"},
            { name: "TAX CODE", id: 42 ,text:"tax_code"},
            { name: "TAX RATE(%)", id: 43 ,text:"tax_rate"},
            { name: "TAX AMOUNT", id: 44 ,text:"tax_amount"},   
            { name: "TOTAL AMOUNT", id: 45 ,text:"total_amount"},
            { name: "QUALITY NORMS", id: 46 ,text:"qc_norms"},
            { name: "PRIORITY", id: 47 ,text:"priority"},
            { name: "DELIVERY DATE", id: 48 ,text:"delivery_date"},
            { name: "PURPOSE", id: 49 ,text:"purpose"},
            { name: "WHERE TO BE USED", id: 50 ,text:"to_be_used"},
            { name: "REMARKS", id: 51 ,text:"remarks"},
            { name: "PACKING LIST REQ.", id: 52 ,text:"packing_list_req"},   
          ]    
  }
  ,
  {
    name: "Broker Details",
    text:"pur_quotation_broker",
    children: [
          { name: "BROKER NAME", id: 53 ,text:"ven_code_name"},
          { name: "BASIS", id: 54 ,text:"basis"},
          { name: "RATE", id: 55 ,text:"rate"},         
          { name: "BROKERAGE ACCOUNT", id: 56 ,text:"brokerage_acc"},   
          { name: "TDS RATE", id: 57 ,text:"tds_rate"},                     
          { name: "TDS ACCOUNT", id: 58 ,text:"tds_acc"},
          ]    
  } 
  ,
  {
    name: "BUSINESS PARTNER DETAILS",
    text:"pur_quotation_business_partner_details",
    children: [
            { name: "Name", id: 59 ,text:"sp_name"},
            { name: "Phone No.", id: 60 ,text:"sp_phone"},
            { name: "Fax", id: 61 ,text:"sp_fax"},
            { name: "E-Mail", id: 62 ,text:"sp_email"},  
            { name: "Address", id: 63 ,text:"sp_address"}, 
            { name: "Contact person Name", id: 64 ,text:"cp_name"}, 
            { name: "Contact person Designation", id: 65 ,text:"cp_designation"}, 
            { name: "Contact person Phone No.", id: 66 ,text:"cp_phone"}, 
            { name: "Contact person Fax", id: 67 ,text:"cp_fax"}, 
            { name: "Contact person E-Mail", id: 68 ,text:"cp_email"}, 
            { name: "Contact person Address", id: 69 ,text:"cp_address"}, 
          ]    
  }

];//atmost last

const TREE_DATA13: VehicleNode[] = [
      
  {
    name: "PURCHASE ORDER",
    text:"pur_order",
    children: [
          { name: "Order Date", id: 1 ,text:"ord_date"},
          { name: "PO Type", id: 2 ,text:"ser_item_subtype"},
          { name: "PO Sub Type", id: 3 ,text:"pur_ord_type"},
          { name: "Order Number", id: 4 ,text:"pur_order_no"},
          { name: "Supplier Name", id: 5 ,text:"supplier_name"},
          { name: "Bussiness Unit", id: 6 ,text:"businessunit_name"},
          { name: "Advice Required", id: 7 ,text:"advice_req"},
          { name: "PO Fulfillment By Advice Count", id: 8 ,text:"po_fullfillment"},
          { name: "Referance Type", id: 9 ,text:"referance_type"},
          { name: "Party Ref. Document No.", id: 10 ,text:"pref_doc_no"},
          { name: "No Of Advice", id: 11 ,text:"no_of_advice"},
          { name: "PAN No.", id: 12 ,text:"pan_no"},
          { name: "GST No.", id: 13 ,text:"gst_no"},
          { name: "CIN No.", id: 14 ,text:"cin_no"},
          { name: "TAN No", id: 15 ,text:"tan_no"},
          { name: "Ship To Address Id", id: 16 ,text:"ship_to_addr_id"},
          { name: "Ship To Address", id: 17 ,text:"ship_to_addr"},
          { name: "Pay To Address Id", id: 18 ,text:"pay_to_addr_id"},
          { name: "Pay To Address", id: 19 ,text:"pay_to_addr"},
          { name: "Applicable Charges", id: 20 ,text:"app_chgs_id"},
         
          ]    
  }
  ,
  {
    name: "Service/Item Details",
    text:"pur_order_item_details",
    children: [
            { name: "ITEM NAME", id: 21 ,text:"item_name"},
            { name: "PACKING ITEM", id: 22 ,text:"packing_item_name"},
            { name: "PACKING UOM", id: 23 ,text:"packing_uom"},
            { name: "PACKING QTY", id: 24 ,text:"packing_qty"},
            { name: "ITEM UOM", id: 25 ,text:"stock_uom"},
            { name: "ITEM QTY", id: 26 ,text:"stock_qty"},
            { name: "MAT WT", id: 27 ,text:"mat_weight"},
            { name: "PRICE", id: 28 ,text:"price"},
            { name: "PRICE BASED ON", id: 29 ,text:"price_based_on"},
            { name: "AMOUNT", id: 30 ,text:"amount"},
            { name: "TAXABLE AMT", id: 31 ,text:"taxable_amount"},
            { name: "DISCOUNT", id: 32 ,text:"discount"},
            { name: "DISCOUNT BASED ON", id: 33 ,text:"discount_basedon"},
            { name: "DISOCUNT AMOUNT", id: 34 ,text:"discount_amount"},
            { name: "NET AMOUNT", id: 35 ,text:"net_amount"},
            { name: "TAX CODE", id: 36 ,text:"tax_code"},
            { name: "TAX RATE(%)", id: 37 ,text:"tax_rate"},
            { name: "TAX AMOUNT", id: 38 ,text:"tax_amount"},   
            { name: "TOTAL AMOUNT", id: 39 ,text:"total_amount"},
            { name: "QC NORMS", id: 40 ,text:"qc_norms"},
            { name: "PRIORITY", id: 41 ,text:"priority"},
            { name: "DELIVERY DATE", id: 42 ,text:"delivery_date"},
            { name: "PURPOSE", id: 43 ,text:"purpose"},
            { name: "WHERE TO BE USED", id: 44 ,text:"to_be_used"},
            { name: "REMARKS", id: 45 ,text:"remarks"},    
            
          ]    
  }
  ,
  {
    name: "Transport Information",
    text:"pur_order_trans_info",
    children: [
          { name: "Payment Mode", id: 46 ,text:"payment_mode"},
          { name: "Transport Borne By", id: 47 ,text:"trans_borne_by"},
          { name: "Mode Of Transport", id: 48 ,text:"mode_of_trans"},
          { name: "Transporter Name", id: 49 ,text:"transporter_name"},
          { name: "Transportation Rate", id: 50 ,text:"transport_rate"},
          { name: "Charge Code", id: 51 ,text:"charge_code"},
          { name: "Rate Value", id: 52 ,text:"rate_value"},
          { name: "Cash Amt.", id: 53 ,text:"cash_limit"},
          ]    
  } 
  ,
  {
    name: "Terms Condition",
    text:"pur_order_terms_con",
    children: [
          { name: "TCS Applicable", id: 54 ,text:"tcs_applicable"},
          { name: "Payment Terms", id: 55 ,text:"payment_terms"},
          { name: "Bank Name", id: 56 ,text:"bank_name"},
          { name: "Account Holder Name", id: 57 ,text:"account_name"},
          { name: "Account No", id: 58 ,text:"account_no"},
          { name: "Branch", id: 59 ,text:"branch"},
          { name: "IFSC Code", id: 60 ,text:"ifsc_code"},
          { name: "Mobile Number", id: 61 ,text:"mobile"},
          { name: "IBAN", id: 62 ,text:"iban"},
          { name: "BIC/SWIFT Code", id: 63 ,text:"bic_swift_code"},
         
          ]    
  } 
  ,
  {
    name: "Application charges",
    text:"pur_order_app_chgs",
    children: [
          { name: "CHARGES NAME", id: 64 ,text:"charges_name"},
          { name: "ADD/LESS", id: 65 ,text:"add_less"},
          { name: "RATE CALCULATION METHOD", id: 66 ,text:"rate_cal_method"},
          { name: "TAX RATE(%)", id: 67 ,text:"tax_rate"},
          { name: "AMOUNT", id: 68 ,text:"amount"},
          ]    
  }
  ,
  {
    name: "BUSINESS PARTNER DETAILS",
    text:"pur_order_bpdetails",
    children: [
            { name: "Name", id: 69 ,text:"supp_name"},
            { name: "Phone No.", id: 70 ,text:"supp_phone"},
            { name: "Fax", id: 71 ,text:"supp_fax"},
            { name: "E-Mail", id: 72 ,text:"supp_email"},  
            { name: "Address", id: 73 ,text:"supp_address"}, 
            { name: "Contact person Name", id: 74 ,text:"cp_name"}, 
            { name: "Contact person Designation", id: 75 ,text:"cp_designation"}, 
            { name: "Contact person Phone No.", id: 76 ,text:"cp_phone"}, 
            { name: "Contact person Fax", id: 77 ,text:"cp_fax"}, 
            { name: "Contact person E-Mail", id: 78 ,text:"cp_email"}, 
            { name: "Contact person Address", id: 79 ,text:"cp_address"},
          ]    
  }
  ,
  {
    name: "Termination",
    text:"pur_order_termination",
    children: [ 
            { name: "Order By", id: 80 ,text:"order_by"},
            { name: "Charges Description", id: 81 ,text:"charges_descpt"},
            { name: "Reason", id: 82 ,text:"reason"},
            { name: "Remarks", id: 83 ,text:"remarks"},
            { name: "Total Termination Charge", id: 84 ,text:"tot_term_chg"},
            { name: "Add", id: 85 ,text:"term_add"},
            { name: "Deduct", id: 86 ,text:"term_deduct"},
            { name: "Net Termination Charge", id: 87 ,text:"net_term_chg"},
          ]    
  }
  ,
  {
    name: "Termination Details",
    text:"pur_order_termination_dyn",
    children: [
            { name: "CHARGES NAME", id: 88 ,text:"charge_name"},
            { name: "TERMINATION CALCULATION METHOD", id: 89 ,text:"termination_cal"},
            { name: "METHOD", id: 90 ,text:"method"}, 
            { name: "CALCULATION QTY", id: 91 ,text:"cal_qty"},
            { name: "QUANTITY", id: 92 ,text:"qty"},
            { name: "AMOUNT", id: 93 ,text:"amount"},
            { name: "RATE", id: 94 ,text:"rate"},
            { name: "GL ACCOUNT", id: 95 ,text:"gl_account"},
            { name: "TAX RATE(%)", id: 96 ,text:"tax_rate"},
            { name: "TAX AMT", id: 97 ,text:"tax_amount"},
            { name: "TOTAL AMT", id: 98 ,text:"total_amount"},
          ]    
  }

];//atmost last

const TREE_DATA14: VehicleNode[] = [
      
  {
    name: "PURCHASE QUALITY CHECK",
    text:"pur_quality_check",
    children: [
          { name: "QC No.", id: 1 ,text:"qcno"},
          { name: "QC Date", id: 2 ,text:"qc_date"},
          { name: "Referance Type", id: 3 ,text:"ref_type"},
          { name: "Supplier Name", id: 4 ,text:"supplier_name"},
          { name: "Service / Item Type", id: 5 ,text:"item_type"},
          { name: "Service / Item Sub Type", id: 6 ,text:"item_sub_type"},
          { name: "QC By", id: 7 ,text:"qc_by"},
          { name: "Approved By", id: 8 ,text:"approved_by"},
         
          ]    
  }
  ,
  {
    name: "Service/Item Details",
    text:"pur_quality_check_details",
    children: [
            { name: "ITEM NAME", id: 10 ,text:"item_name"},
            { name: "PACKING ITEM", id: 11 ,text:"packing_name"},
            { name: "ITEM UOM", id: 12 ,text:"uom"},
            { name: "ITEM QUANTITY", id: 13 ,text:"quantity"},
            { name: "WEARHOUSE", id: 14 ,text:"warehouse"},
            { name: "STACK / RACK", id: 15 ,text:"stack"},
            { name: "QC", id: 16 ,text:"qc"},
            { name: "QC STATUS", id: 17 ,text:"qc_status"},
          ]    
  }
  
];//atmost last

const TREE_DATA15: VehicleNode[] = [
      
  {
    name: "Purchase Peripheral Quality Check",
    text:"pur_peri_quality_check",
    children: [
          { name: "PQC No.", id: 1 ,text:"pqcno"},
          { name: "PQC Date", id: 2 ,text:"pqc_date"},
          { name: "Supplier Name", id: 3 ,text:"supplier_name"},
          { name: "Weighment Details", id: 4 ,text:"wments_dtls"},
          { name: "Service / Item Type", id: 5 ,text:"item_type"},
          { name: "Service / Item Sub Type", id: 6 ,text:"item_sub_type"},
          { name: "Referance Type", id: 7 ,text:"ref_type"},
          { name: "PQC Parameter", id: 8 ,text:"qc_parameter"},
          { name: "Received By", id: 9 ,text:"recieved_by"},
          { name: "Weighment No", id: 10 ,text:"wghmnt_no"},
         
          ]    
  }
  
];//atmost last

const TREE_DATA16: VehicleNode[] = [
      
  {
    name: "Purchase Goods Receipt",
    text:"pur_good_receipt",
    children: [
          { name: "Bussiness Unit", id: 1 ,text:"b_unitname"},
          { name: "Purchase Type", id: 2 ,text:"purchase_type"},
          { name: "Purchase Sub Type", id: 3 ,text:"purchase_subtype"},
          { name: "GRN Date", id: 4 ,text:"grn_date"},
          { name: "GRN No", id: 5 ,text:"grn_no"},
          { name: "Supplier Name", id: 6 ,text:"supplier_name"},
          { name: "Referance Type", id:7  ,text:"referance_type"},
          { name: "Vehicle No", id: 8 ,text:"vehicle_no"},
          { name: "Applicable Charges", id: 9 ,text:"applicable_charges_id"},
          { name: "Remarks", id: 10 ,text:"remarks"},
         
          ]    
  }
  ,
  {
    name: "SERVICE / ITEM DETAILS",
    text:"pur_good_receipt_item_details",
    children: [
          { name: "ADV ITEM NAME", id: 11 ,text:"adv_item_name"},
          { name: "ADV PACKING ITEM", id: 12 ,text:"adv_packing_name"},
          { name: "ADV PACKING QTY", id: 13 ,text:"adv_pack_qty"},
          { name: "ADV PACKING UOM", id: 14 ,text:"adv_pack_uom"},
          { name: "ADV ITEM QTY", id: 15 ,text:"adv_item_qty"},
          { name: "ADV MAT WT", id: 16 ,text:"adv_mat_wt"},
          { name: "ADV ITEM UOM", id: 17 ,text:"adv_item_uom"},
          { name: "RCV PACKING QTY", id: 18 ,text:"rcv_pack_qty"},
          { name: "RCV PACKING UOM", id: 19 ,text:"rcv_pack_uom"},
          { name: "RCV ITEM QTY", id: 20 ,text:"rcv_item_qty"},
          { name: "RCV MAT WT", id: 21 ,text:"rcv_mat_wt"},
          { name: "RCV ITEM UOM", id: 22 ,text:"rcv_item_uom"},
          { name: "PSSD PACKING QTY", id: 23 ,text:"pssd_pack_qty"},
          { name: "PSSD PACKING UOM", id: 24 ,text:"pssd_pack_uom"},
          { name: "PSSD ITEM QTY", id: 25 ,text:"pssd_item_qty"},
          { name: "PSSD MAT WT", id: 26 ,text:"pssd_mat_wt"},
          { name: "PSSD ITEM UOM", id: 27 ,text:"pssd_item_uom"},
          { name: "UNIT RATE", id: 28 ,text:"unit_rate"},
          { name: "PRICE BASED ON", id: 29 ,text:"price_based_on"},
          { name: "AMOUNT", id: 29 ,text:"amount"},
          { name: "DISOCUNT", id: 30 ,text:"discount"},
          { name: "DISCOUNT BASED ON", id: 31 ,text:"discount_based_on"},
          { name: "DISOCUNT AMOUNT", id: 32 ,text:"discount_amt"},
          { name: "NET AMOUNT", id: 33 ,text:"net_amt"},
          { name: "QC DEDUCTION", id: 34 ,text:"qc_deduction"},
          { name: "NET AMT AFTER QC", id: 35 ,text:"net_amt_after_qc"},
          { name: "TAX CODE", id: 36 ,text:"tax_code"},
          { name: "TAX RATE(%)", id: 37 ,text:"tax_rate"},
          { name: "TAX AMOUNT", id: 38 ,text:"tax_amt"},
          { name: "GROSS AMOUNT", id: 39 ,text:"gross_amt"},
          { name: "QC NORMS", id: 40 ,text:"qc_norms"},
          { name: "WEARHOUSE NAME", id: 41 ,text:"warehouse_name"},
          { name: "STACK / RACK NO", id: 42 ,text:"rack"},
          { name: "STACK UOM", id: 43 ,text:"stack_uom"},
          { name: "STACK QTY", id: 44 ,text:"stack_qty"},
         
        ]    
  }
  ,
  {
    name: "Other Information",
    text:"pur_goods_receipt_other_information",
    children: [
          { name: "Gross Wt.", id: 45 ,text:"pty_gross_wt"},
          { name: "Gross UOM", id: 46 ,text:"pty_gross_uom"},
          { name: "Tare Wt.", id: 47 ,text:"pty_tare_wt"},
          { name: "Tare UOM", id: 48 ,text:"pty_tare_uom"},
          { name: "Net Wt.", id: 49 ,text:"pty_net_wt"},
          { name: "Net UOM", id: 50 ,text:"pty_net_uom"},
          { name: "Weigh Bridge Name", id: 51 ,text:"pty_weigh_bridge_name"},
          { name: "Slip No.", id: 52 ,text:"pty_weigh_slip_no"},
          { name: "Date", id: 53 ,text:"pty_weigh_date"},
          { name: "Own Gross Wt", id: 54 ,text:"own_gross_wt"},
          { name: "Own Gross UOM", id: 55 ,text:"own_gross_uom"},
          { name: "Own Tare Wt", id: 56 ,text:"own_tare_wt"},
          { name: "Own Tare UOM ", id: 57 ,text:"own_tare_uom"},
          { name: "Own Net", id: 58 ,text:"own_net_wt"},
          { name: "Own Net UOM", id: 59 ,text:"own_net_uom"},
          { name: "Own Weigh Bridge Name", id: 60 ,text:"own_weigh_bridge_name"},
          { name: "Own Slip No.", id: 61 ,text:"own_weigh_slip_no"},
          { name: "Own Date", id: 62 ,text:"own_weigh_date"},
          { name: "Adviced Freight", id: 63 ,text:"adv_freight_charge"},
          { name: "Freight Paid Amt.", id: 64 ,text:"freight_paid_amt"},
          { name: "DC/C.M No.", id: 65 ,text:"dc_no"},
          { name: "DC/C.M Date", id: 66 ,text:"dc_date"},
          { name: "C.N/R.R No.", id: 67 ,text:"cn_no"},
          { name: "C.N/R.R Date", id: 68 ,text:"cn_date"},
          { name: "Arg.Tax Dtl.", id: 69 ,text:"arg_tax_dtl"},
          { name: "Arg.Tax Amt.", id: 70 ,text:"arg_tax_amt"},
          { name: "Vehicle No", id: 71 ,text:"vehicle_id"},
          { name: "Bill Amt.", id: 72 ,text:"bill_amt"},
          { name: "Checkpost Name", id: 73 ,text:"checkpost_name"},
          { name: "Entry Date", id: 74 ,text:"entry_date"},
          { name: "Remarks", id: 75 ,text:"remarks"},
         
       ]    
  }
 ,
  {
    name: "Broker details",
    text:"pur_good_receipt_broker",
    children: [
          { name: "BROKER NAME", id: 76 ,text:"ven_name"},
          { name: "BASIS", id: 77 ,text:"basis"},
          { name: "RATE", id: 78 ,text:"rate"},
          { name: "BROKERAGE ACCOUNT", id: 79 ,text:"brokerage_acc"},
          { name: "TDS RATE", id: 80 ,text:"tds_rate"},
          { name: "TDS ACCOUNT", id: 81 ,text:"tds_acc"},
         
          ]    
  }
  ,
  {
    name: "Transport Information",
    text:"pur_good_reciept_trans_info",
    children: [
          { name: "Transport Borne By", id: 82 ,text:"trans_borne_by"},
          { name: "Transporter Name", id: 83 ,text:"transporter_code"},
          { name: "Mode Of Transport", id: 84 ,text:"mode_of_trans"},
          { name: "Transportation Rate", id: 85 ,text:"transportation_rate"},
          { name: "Payment Mode", id: 86 ,text:"payment_mode"},
          { name: "Payment Terms", id: 87 ,text:"payment_term"},
          { name: "Bank Name", id: 88 ,text:"bank_name"},
          { name: "Account Name", id: 89 ,text:"acc_name"},
          { name: "Account No", id: 90 ,text:"acc_no"},
          { name: "Branch", id: 91 ,text:"branch"},
          { name: "IBAN", id: 92 ,text:"iban"},
          { name: "BIC/SWIFT Code", id: 93 ,text:"bic_swift_code"},
         
          ]    
  }
  ,
  {
    name: "BUSINESS PARTNER DETAILS",
    text:"pur_good_receipt_business_partner_details",
    children: [
            { name: "Name", id: 94 ,text:"sp_name"},
            { name: "Designation", id: 95 ,text:"sp_designation"},
            { name: "Phone No.", id: 96 ,text:"sp_phone"},
            { name: "Fax", id: 97 ,text:"sp_fax"},
            { name: "E-Mail", id: 98 ,text:"sp_email"},  
            { name: "Address", id: 99 ,text:"sp_address"}, 
            { name: "Contact Name", id: 100 ,text:"cp_name"}, 
            { name: "Contact Designation", id: 101 ,text:"cp_designation"}, 
            { name: "Contact Phone No.", id: 102 ,text:"cp_phone"}, 
            { name: "Contact Fax", id: 103 ,text:"cp_fax"}, 
            { name: "Contact E-Mail", id: 104 ,text:"cp_email"}, 
            { name: "Contact Address", id: 105 ,text:"cp_address"},
          ]    
  }
  ,
  {
    name: "Resource Cost",
    text:"pur_good_receipt_resource_cost",
    children: [
          { name: "CHARGES NAME", id: 106 ,text:"charge_name"},
          { name: "RATE CALCULATION METHOD", id: 107 ,text:"rate_cal_method"},
          { name: "AMOUNT", id: 108 ,text:"amount"},
          { name: "TAX RATE(%)", id: 109 ,text:"tax_rate"},
          { name: "TAX AMT", id: 110 ,text:"tax_amt"},
          { name: "GROSS AMT", id: 111 ,text:"gross_amt"},
         ]    
  }
];//atmost last

const TREE_DATA17: VehicleNode[] = [
      
  {
    name: "Purchase L1 Selection",
    text:"pur_l1_selection",
    children: [
          { name: "L1 Doc Number", id: 1 ,text:"pqcno"},
          { name: "Date", id: 2 ,text:"pqc_date"},
          { name: "Supplier Qoutation", id: 3 ,text:"supplier_name"},
          { name: "Remarks", id: 4 ,text:"wments_dtls"},
          
          ]    
  },
  {
    name: "Purchase L1 Selection",
    text:"pur_l1_selection_dtls",
    children: [
          { name: "P.QOUT.DOC.NO", id: 5 ,text:"pq_doc_no"},
          { name: "ITEM CODE", id: 6 ,text:"item_code"},
          { name: "ITEM NAME", id: 7 ,text:"item_name"},
          { name: "VENDOR CODE", id: 8 ,text:"vendor_code"},
          { name: "VENDOR NAME", id: 9 ,text:"vendor_name"},
          { name: "PRICE", id: 10 ,text:"price"},
          { name: "REQ DATE", id: 11 ,text:"req_date"},
          { name: "QOUT DATE", id: 12 ,text:"qout_date"},
          { name: "REQ QTY", id: 13 ,text:"req_qty"},
          { name: "QOUT QTY", id: 14 ,text:"qout_qty"},
          { name: "AMOUNT", id: 15 ,text:"amount"},
          { name: "STATUS", id: 16 ,text:"status"},
          { name: "REASON", id: 17 ,text:"reason"},
          { name: "REMARKS", id: 18 ,text:"remarks"},
          ]    
  }
  
];//atmost last


const TREE_DATA18: VehicleNode[] = [
      
  {
    name: "Purchase Bill",
    text:"pur_bill",
    children: [
            { name: "Bill Date", id: 1 ,text:"bill_date"},
            { name: "Service / Item Sub Type", id: 2 ,text:"purchase_typename"},
            { name: "Purchase Bill No", id: 3 ,text:"pur_bill_no"},
            { name: "Supplier Name", id: 4 ,text:"supplier"},
            //{ name: "Created By", id: 5 ,text:"created_by"},
            { name: "Truck No", id: 6 ,text:"vehicleno"},
            { name: "Item Total", id: 7 ,text:"item_total"},
           { name: "Discount Total", id: 8 ,text:"discount"},
            { name: "Net Amount", id: 9 ,text:"net_amt"},
            { name: "Qc Deduction", id: 10 ,text:"qc_deduction"},
            { name: "Amount After Deduction", id: 11 ,text:"amt_after_deduction"},
            { name: "Add Tax", id: 12 ,text:"add_tax"},
            { name: "Post Tax Amount", id: 13 ,text:"post_tax_amt"},
            { name: "Other Charges", id: 14 ,text:"other_charges"},      
            { name: "Add(+)", id: 15 ,text:"add1"},
            { name: "Add(-)", id: 16 ,text:"add2"},
            { name: "Rounded Off", id: 17 ,text:"roundoff_amt"},
            { name: "Payable To Party", id: 18 ,text:"payable_party"},
            { name: "Already Paid", id: 19 ,text:"already_paid"},
            { name: "Net Payable To Party", id: 20 ,text:"net_payable_party"},
            { name: "Remarks", id: 21 ,text:"remarks"},
            { name: "Advice No.", id: 121 ,text:"adviceno"},
            
            ]    
  },
  {
    name: "Purchase Bill Item Details",
    text:"pur_bill_item_details",
    children: [
            { name: "ADVICE ITEM NAME", id: 22 ,text:"adv_item_name"},
            { name: "ADVICE PACKING ITEM", id: 23 ,text:"adv_packing_item_name"},
            { name: "PASSED PACKING QTY", id: 24 ,text:"passed_packing_qty"},
            { name: "PASSED PACKING UOM", id: 25 ,text:"passed_packing_uom"},
            { name: "PASSED ITEM QTY", id: 26 ,text:"passed_item_qty"},
            { name: "PASSED MAT WEIGHT", id: 27 ,text:"passed_mat_weight"},
            { name: "PASSED ITEM UOM", id: 28 ,text:"passed_item_uom"},
            { name: "UNIT RATE", id: 29 ,text:"unit_rate"},
            { name: "PRICE BASED ON", id: 30 ,text:"price_based_on"},
            { name: "AMOUNT", id: 31 ,text:"amount"},
           // { name: "DISOCUNT", id: 32 ,text:"discount"},
            { name: "DISCOUNT BASED ON", id: 33 ,text:"discount_basedon"},
            { name: "DISOCUNT AMOUNT", id: 34 ,text:"discount_amount"},
            { name: "NET AMOUNT", id: 35 ,text:"net_amount"},
        //    { name: "QC DEDUCTION", id: 36 ,text:"qc_deduction"},
            { name: "NET AMOUNT AFTER QC", id: 37 ,text:"net_amt_after_qc"},
            { name: "TAX CODE", id: 38 ,text:"tax_code"},
            { name: "TAX RATE", id: 39 ,text:"tax_rate"},
            { name: "TAX AMOUNT", id: 40 ,text:"tax_amt"},
            { name: "GROSS AMOUNT", id: 41 ,text:"gross_amt"},
            { name: "GL ACCOUNT", id: 42 ,text:"gl_acc"},
            { name: "WEARHOUSE NAME", id: 43 ,text:"warehouse_name"},
            { name: "STACK / RACK NO", id: 44 ,text:"stack_name"},
          ]    
  }
  
  ,
  {
    name: "Purchase Bill Muster Roll",
    text:"pur_bill_musterroll_details",
    children: [
          { name: "MUSTER ROLL NAME", id: 45 ,text:"muster_roll_name"},
          ]    
  }
  ,
  {
    name: "Purchase Tax Information",
    text:"pur_bill_tax_info",
    children: [
          { name: "PAN No.", id: 46 ,text:"pan"},
          { name: "GST No.", id: 47 ,text:"gst"},
          { name: "CIN No.", id: 48 ,text:"cin"},
          { name: "TAN No.", id: 49,text:"tan"},  
          ]    
  }
  ,
  {
    name: "Purchase Bill Broker Details",
    text:"pur_bill_broker_details",
    children: [
          { name: "BROKER NAME", id: 50 ,text:"broker_name"},
          { name: "BROKERAGE AMOUNT", id: 51 ,text:"brokerage_amt"},
          { name: "BROKER OTHER INFO.", id: 52 ,text:"broker_other_info"},
          { name: "UP BROKERAGE AMOUNT", id: 53 ,text:"up_brokerage_amt"},
          { name: "TOTAL BROKERAGE", id: 54 ,text:"total_brokerage"},
          ]    
  }
  ,
  {
    name: "Purchase Bill Business Partner Details",
    text:"pur_bill_bp_details",
    children: [
          { name: "Name", id: 55 ,text:"supp_name"},
          { name: "Phone No.", id: 56 ,text:"supp_phone"},
          { name: "Fax", id: 57 ,text:"supp_fax"},
          { name: "E-Mail", id: 58 ,text:"supp_email"},
          { name: "Address", id: 59 ,text:"supp_address"},
          { name: "Contact Person Designation", id: 60 ,text:"cp_designation"},
          { name: "Contact Person Name", id: 61 ,text:"cp_name"},
          { name: "Contact Person Phone", id: 62 ,text:"cp_phone"},
          { name: "Contact Person Fax", id: 63 ,text:"cp_fax"},
          { name: "Contact Person E-Mail", id: 64 ,text:"cp_email"},
          { name: "Contact Person Address", id: 65 ,text:"cp_address"},
          ]    
  }
  ,
  {
    name: "Purchase Bill Payment",
    text:"pur_bill_account_info",
    children: [
          { name: "Payment Date", id: 66 ,text:"payment_date"},
          { name: "Mode of Payment", id: 67 ,text:"mode_of_pay"},
          { name: "Pay Term", id: 68 ,text:"pay_term"},
          { name: "Credit Limit", id: 69 ,text:"credit_lim"},
          { name: "Bank Name", id: 70 ,text:"bankname"},
          { name: "Account Holder Name", id: 71 ,text:"accountholder"},
          { name: "Account No.", id: 72 ,text:"acc_no"},
          { name: "Ifsc Code", id: 73 ,text:"ifsc"},
          { name: "Mobile No.", id: 74 ,text:"mobile"},
          { name: "Iban", id: 75 ,text:"iban"},
          { name: "Bis Swift Code", id: 76 ,text:"bic_swift_code"},
          { name: "Branch", id: 77 ,text:"branch"},
          ]    
  }
];//atmost last

const TREE_DATA19: VehicleNode[] = [
      
  {
    name: "PURCHASE RETURN APPROVAL NOTE",
    text:"pur_return_approval_note",
    children: [   
          { name: "Purchase Return Date", id: 1 ,text:"purreturndate"},
          { name: "Purchase Return Type", id: 2 ,text:"purreturntype"},
          { name: "Purchase Return No.", id: 3 ,text:"purreturnno"},
          { name: "Bussiness Unit", id: 4 ,text:"businessunit_name"},
          { name: "Supplier", id: 5 ,text:"supplier"},
          { name: "Return Criteria", id: 6 ,text:"returncriteria"},
          { name: "Return Based On", id: 7 ,text:"returnbasedon"},
          { name: "Purchase Type", id: 8 ,text:"ser_item_subtype"},
          { name: "Purchase Sub Type", id: 9 ,text:"purchase_subtype"},
          { name: "Reference No.", id: 10 ,text:"purreturnrefno"},
          { name: "Remarks", id: 11 ,text:"remark"},
          { name: "Confirmed By", id: 12 ,text:"confirmedby"},
          { name: "Approved", id: 13 ,text:"approval"},
          { name: "Reason", id: 14 ,text:"reason"},
          ]    
  },
  {
    name: "Purchase Return Note Item Details",
    text:"pur_return_approval_item_dtls",
    children: [
            { name: "PACKING ITEM", id: 15 ,text:"packingname"},
            { name: "PACKING QTY.", id: 16 ,text:"squantity"},
            { name: "PACKING UOM", id: 17 ,text:"suom"},
            { name: "ITEM QTY.", id: 18 ,text:"quantity"},
            { name: "ITEM UOM", id: 19 ,text:"uom"},
            { name: "MAT.WT", id: 20 ,text:"matwt"},
            { name: "PRICE", id: 21 ,text:"price"},
            { name: "PRICE BASED ON", id: 22 ,text:"pricebasedon"},
            { name: "AMOUNT", id: 23 ,text:"amount"},
            { name: "DISCOUNT", id: 24 ,text:"discounttype"},
            { name: "DISCOUNT BASED ON", id: 25 ,text:"discountrate"},
            { name: "DISCOUNT AMT", id: 26 ,text:"discountamt"},
            { name: "TAX CODE", id: 27 ,text:"taxcode"},
            { name: "TAX RATE(%)", id: 28 ,text:"taxrate"},
            { name: "TAX AMT.", id: 29 ,text:"taxamt"},
            { name: "TOTAL AMT.", id: 30 ,text:"totalamt"},
            { name: "QUALITY NORMS", id: 31 ,text:"accnorms"},
            { name: "WEARHOUSE NAME", id: 32 ,text:"warehouse_name"},
            { name: "STACK / RACK NO", id: 33 ,text:"stack_name"},
            ]    
  }
  
  ,
  {
    name: "Purchase Return Approval Broker details",
    text:"pur_return_approval_broker_dtls",
    children: [
          { name: "BROKER NAME", id: 34 ,text:"brokercode"},
          { name: "BASIS", id: 35 ,text:"basis"},
          { name: "RATE", id: 36 ,text:"rate"},
          ]    
  }
  ,
  {
    name: "Purchase Return Approval Supplier details",
    text:"pur_return_approval_shipment_dtls",
    children: [
          { name: "SUPPLIER NAME", id: 37 ,text:"spcode"},
          { name: "CONTACT PERSON NAME", id: 38 ,text:"spname"},
          { name: "CONTACT NUMBER", id: 39 ,text:"spcontact"},
          ]    
  }
  ,
  {
    name: "Purchase Return Approval Shipment details",
    text:"pur_bill_broker_details",
    children: [
          { name: "Ship To Address Id", id: 40 ,text:"shipaddr"},
          { name: "Ship To Address", id: 41 ,text:"shipdetails"},
          { name: "Pay To Address Id", id: 42 ,text:"payaddr"},
          { name: "Pay To Address", id: 43,text:"paydetails"},
          ]    
  }
  ,
  {
    name: "Purchase Return Approval Weight details",
    text:"pur_return_approval_weight_dtl",
    children: [
          { name: "UOM", id: 44 ,text:"ownuom"},
          { name: "Gross", id: 45 ,text:"owngross"},
          { name: "Tare", id: 46 ,text:"owntare"},
          { name: "Net", id: 47 ,text:"ownnet"},
          { name: "Eway-Bill No", id: 48 ,text:"ownpermitno"},
          { name: "Date", id: 49 ,text:"owndate"},
          { name: "Slip No.", id: 50 ,text:"ownslipno"},
          { name: "Party UOM", id: 51 ,text:"partyuom"},
          { name: "Party Gross", id: 52 ,text:"partygross"},
          { name: "Party Tare", id: 53 ,text:"partytare"},
          { name: "Party Net", id: 54 ,text:"partynet"},
          { name: "Party Date", id: 55 ,text:"partydate"},
          { name: "Party Slip No.", id: 56 ,text:"partyslipno"},
          ]    
  }
  ,
  {
    name: "Purchase Return Approval Transport details",
    text:"pur_bill_account_info",
    children: [
      { name: "Transport Borne By", id: 57 ,text:"transborneby"},
          { name: "Mode Of Transport", id: 58 ,text:"modeoftrans"},    
          { name: "Transporter Name", id: 59 ,text:"transcode"},
          { name: "Vehicle No.", id: 60 ,text:"vehicleno"},
          { name: "Charge Code", id: 61 ,text:"chargecode"},
          { name: "Freight Amount", id: 62 ,text:"freightamt"},
          { name: "Advance Paid", id: 63 ,text:"advpaid"},
          ]    
  }
];//atmost last

const TREE_DATA20: VehicleNode[] = [
      
  {
    name: "PURCHASE RETURN NOTE",
    text:"pur_return_note",
    children: [    
      { name: "Purchase Return Date", id: 1 ,text:"purreturnnotedate"},
      { name: "Bussiness Unit", id: 2 ,text:"businessunitname"},
      { name: "Supplier", id: 3 ,text:"suppliername"},
      { name: "Purchase Return Note No.", id: 4 ,text:"purreturnnoteno"},
      { name: "Reference No.", id: 5 ,text:"purreturnnoterefno"},
      { name: "Customer Ref. Document No.", id: 6 ,text:"cust_ref_doc_no"},
      { name: "Date", id: 7 ,text:"date2"},
      { name: "Grand Total", id: 8 ,text:"grandtotal"},
      { name: "Remarks", id: 9 ,text:"remark"},
      { name: "Confirmed By", id: 10 ,text:"confirmedby"},
      { name: "Approved", id: 11 ,text:"approval"},
      { name: "Reason", id: 12 ,text:"reason"},
          

          ]    
  },
  {
    name: "Purchase Return Note Item Details",
    text:"pur_return_note_item_dtls",
    children: [
          { name: "ITEM NAME", id: 13 ,text:"itemname"},
          { name: "PACKING ITEM", id: 14 ,text:"packingname"},
          { name: "PACKING QTY.", id: 15 ,text:"squantity"},
          { name: "PACKING UOM", id: 16 ,text:"suom"},
          { name: "ITEM QTY.", id: 17 ,text:"quantity"},
          { name: "ITEM UOM", id: 18 ,text:"uom"},
          { name: "MAT.WT", id: 19 ,text:"matwt"},
          { name: "PRICE", id: 20 ,text:"price"},
          { name: "PRICE BASED ON", id: 21 ,text:"pricebasedon"},
          { name: "AMOUNT", id: 22 ,text:"amount"}, 
          { name: "DISCOUNT", id: 23 ,text:"discounttype"},
          { name: "DISCOUNT BASED ON", id: 24 ,text:"discountrate"},
          { name: "DISCOUNT AMT", id: 25 ,text:"discountamt"},
          { name: "TAX CODE", id: 26 ,text:"taxcode"},
          { name: "TAX RATE(%)", id: 27 ,text:"taxrate"},
          { name: "TAX AMT.", id: 28 ,text:"taxamt"},
          { name: "TOTAL AMT.", id: 29 ,text:"totalamt"},
          { name: "QUALITY NORMS", id: 30 ,text:"accnorms"},
          
          ]    
  }
  
  ,
  {
    name: "Purchase Return Note Broker details",
    text:"pur_return_note_broker_dtls",
    children: [
          { name: "BROKER NAME", id: 31 ,text:"brokercode"},
          { name: "BASIS", id: 32 ,text:"rate"},
          { name: "RATE", id: 33 ,text:"rate"},
          ]    
  }
  ,
  {
    name: "Purchase Return Note Supplier details",
    text:"pur_return_note_supplier_dtls",
    children: [
          { name: "SUPPLIER NAME", id: 34 ,text:"spcode"},
          { name: "CONTACT PERSON NAME", id: 35 ,text:"spname"},
          { name: "CONTACT NUMBER", id: 36 ,text:"spcontact"},
         
          ]    
  }
  ,
  {
    name: "Purchase Return Note Shipment details",
    text:"pur_return_note_shipment_dtls",
    children: [
        { name: "Ship To Address Id", id: 37 ,text:"shipaddr"},
        { name: "Ship To Address", id: 38 ,text:"shipdetails"},
        { name: "Pay To Address Id", id: 39 ,text:"payaddr"},
        { name: "Pay To Address", id: 40 ,text:"paydetails"},


     
          ]    
  }
  ,
  {
    name: "Purchase Return Note Weight details",
    text:"pur_return_note_weight_dtl",
    children: [
          { name: "UOM", id: 41 ,text:"ownuom"},
          { name: "Gross", id: 42 ,text:"owngross"},
          { name: "Tare", id: 43 ,text:"owntare"},
          { name: "Net", id: 44 ,text:"ownnet"},
          { name: "Eway-Bill No", id: 45 ,text:"ownpermitno"},
          { name: "Date", id: 46 ,text:"owndate"},
          { name: "Slip No.", id: 47 ,text:"ownslipno"},
          { name: "Party UOM", id: 48 ,text:"partyuom"},
          { name: "Party Gross", id: 49 ,text:"partygross"},
          { name: "Party Tare", id: 50 ,text:"partytare"}, 
          { name: "Party Net", id: 51 ,text:"partynet"},
          { name: "Party Date", id: 52 ,text:"partydate"},
          { name: "Party Slip No.", id: 53 ,text:"partyslipno"},

         
      
      
          ]    
  }
  ,
  {
    name: "Purchase Return Note Transport details",
    text:"pur_return_note_trans_info",
    children: [
        { name: "Transporter Name", id: 54 ,text:"transcode"},
        { name: "Vehicle No.", id: 55 ,text:"vehicleno"},
        { name: "Charge Code", id: 56 ,text:"chargecode"},
        { name: "Freight Amount", id: 57 ,text:"freightamt"},
        { name: "Advance Paid", id: 58 ,text:"advpaid"},
     
         
      
          ]    
  }
];//atmost last

const TREE_DATA21: VehicleNode[] = [
      
  {
    name: "PURCHASE Debit NOTE",
    text:"pur_debit_note",
    children: [
         
     
          { name: "Purchase Return Type", id: 1 ,text:"debitnotetype"},
          { name: "Debit Note Date", id: 2 ,text:"debitnotedate"},
          { name: "Debit Note No", id: 3 ,text:"debitnoteno"},
          { name: "Business Unit", id: 4 ,text:"businessunitname"},
          { name: "Supplier Name", id: 5 ,text:"supplier_name"},
          { name: "Created By", id: 6 ,text:"created_by"},
          { name: "Truck No", id: 7 ,text:"truck_no"},
          { name: "Item Total", id: 8 ,text:"item_total"},
          { name: "Discount Total", id: 9 ,text:"discount"},
          { name: "Net Amount", id: 10 ,text:"net_amt"},
          { name: "Qc Deduction", id: 11 ,text:"qc_deduction"},
          { name: "Amount After Deduction", id: 12 ,text:"amt_after_deduction"},
          { name: "Add Tax", id: 13 ,text:"add_tax"},   
          { name: "Post Tax Amount", id: 14 ,text:"post_tax_amt"},
          { name: "Other Charges", id: 15 ,text:"other_charges"},
          { name: "Payable Amount", id: 16 ,text:"payable_amt"},
          { name: "Add(+)", id: 17 ,text:"add1"},
          { name: "Add(-)", id: 18 ,text:"add2"},   
          { name: "Rounded Off", id: 19 ,text:"roundoff_amt"},
          { name: "Payable To Party", id: 20 ,text:"payable_party"},
          { name: "Already Paid	", id: 21 ,text:"already_paid"},
          { name: "Net Payable To Party", id: 22 ,text:"net_payable_party"},
          { name: "Remarks", id: 23 ,text:"remarks"},
          ]    
  },
  {
    name: "Purchase Debit Note Item Details",
    text:"pur_debit_note_item_details",
    children: [
     
          { name: "ADVICE ITEM NAME", id: 24 ,text:"adv_item_name"},
          { name: "ADVICE PACKING ITEM", id: 25 ,text:"adv_packing_item_name"},
          { name: "PASSED PACKING QTY", id: 26 ,text:"passed_packing_qty"},
          { name: "PASSED PACKING UOM", id: 27,text:"passed_packing_uom"},
          { name: "PASSED ITEM QTY", id: 28 ,text:"passed_item_qty"},   
          { name: "PASSED MAT WEIGHT", id: 29 ,text:"passed_mat_weight"},
          { name: "PASSED ITEM UOM", id: 30 ,text:"passed_item_uom"},
          { name: "UNIT RATE", id: 31 ,text:"unit_rate"},
          { name: "PRICE BASED ON", id: 32 ,text:"price_based_on"},
          { name: "AMOUNT", id: 33 ,text:"amount"},   
          { name: "DISCOUNT", id: 34 ,text:"discount"},
          { name: "DISCOUNT BASED ON", id: 35 ,text:"discount_basedon"},
          { name: "DISOCUNT AMOUNT", id: 36 ,text:"discount_amount"},
          { name: "NET AMOUNT", id: 37 ,text:"net_amount"},
          { name: "QC DEDUCTION", id: 38 ,text:"qc_deduction"},
          { name: "NET AMOUNT AFTER QC", id: 39 ,text:"net_amt_after_qc"},
          { name: "TAX CODE", id: 40 ,text:"tax_code"},
          { name: "TAX RATE", id: 41 ,text:"tax_rate"},
          { name: "TAX AMOUNT", id: 42 ,text:"tax_amt"},
          { name: "GROSS AMOUNT", id: 43 ,text:"gross_amt"},
          { name: "GL ACCOUNT", id: 44 ,text:"gl_acc"},
    ]
  }
  
  ,
  {
    name: "Purchase Debit Note Muster Roll details",
    text:"pur_debit_note_musterroll_details",
    children: [
              { name: "MUSTER ROLL NAME", id: 45 ,text:"muster_roll_name"},
              ]    
  }
  ,
  {
    name: "Purchase Debit Note Tax Information",
    text:"pur_debit_note_tax_info",
    children: [
          { name: "PAN No.", id: 46 ,text:"pan"},
          { name: "GST No.", id: 47 ,text:"gst"},
          { name: "CIN No.", id: 48 ,text:"cin"},
          { name: "TAN No.", id: 49 ,text:"tan"},
          ]    
  },
  {
    name: "Purchase Debit Note Broker details",
    text:"pur_debit_note_broker_details",
    children: [  
          { name: "BROKER NAME", id: 50 ,text:"broker_name"},
          { name: "BROKERAGE AMOUNT", id: 51 ,text:"brokerage_amt"},
          { name: "BROKER OTHER INFO.", id: 52 ,text:"broker_other_info"},
          { name: "UP BROKERAGE AMOUNT", id: 53 ,text:"up_brokerage_amt"},
          { name: "TOTAL BROKERAGE", id: 54 ,text:"total_brokerage"},
          ]    
  }
  ,
  {
    name: "Purchase Return Note Business Partner details",
    text:"pur_debit_note_bp_details",
    children: [   
          { name: "Name", id: 55 ,text:"supp_name"},
          { name: "Phone No.", id: 56 ,text:"supp_phone"},
          { name: "Fax", id: 57 ,text:"supp_fax"},
          { name: "E-Mail", id: 58 ,text:"supp_email"},
          { name: "Address", id: 59 ,text:"supp_address"},
          { name: "Contact Person Name", id: 60 ,text:"cp_name"},
          { name: "Contact Person Designation", id: 61 ,text:"cp_designation"},
          { name: "Contact Person Phone", id: 62 ,text:"cp_phone"},
          { name: "Contact Person Fax", id: 63 ,text:"cp_fax"},
          { name: "Contact Person E-Mail", id: 64 ,text:"cp_email"},
          { name: "Contact Person Address", id: 65 ,text:"cp_address"},
          ]    
  }
  ,
  {
    name: "Purchase Debit Note Payment details",
    text:"pur_debit_note_account_info",
    children: [
          { name: "Mode of Payment", id: 66 ,text:"mode_of_pay"},
          { name: "Pay Term", id: 67 ,text:"pay_term"},
          { name: "Credit Limit", id: 68,text:"credit_lim"},
          { name: "Bank Name", id: 69 ,text:"bankname"},
          { name: "Account Holder Name", id: 70 ,text:"accountholder"},
          { name: "Account No.", id: 71 ,text:"acc_no"},
          { name: "Ifsc Code", id: 72 ,text:"ifsc"},
          { name: "Mobile No.", id: 73 ,text:"mobile"},
          { name: "Iban", id: 74 ,text:"iban"},
          { name: "Bis Swift Code", id: 75 ,text:"bic_swift_code"},
          { name: "Branch", id: 76 ,text:"branch"},
          ]    
  }     
          
];//atmost last

const TREE_DATA22: VehicleNode[] = [
      
  {
    name: "Unload Advice",
    text:"wm_unload_advice",//db table name
    children: [
         
     
          { name: "Advice Date", id: 1 ,text:"ula_date"},//text is column name
          { name: "Business Unit", id: 2 ,text:"business_unit"},
          { name: "Advice Number", id: 3 ,text:"unadviceno"},
          { name: "Advice Type", id: 4 ,text:"advice_type"},
          { name: "Referance Type", id: 5 ,text:"ref_type"},
          { name: "Business Partner", id: 6 ,text:"busi_partner"},
          { name: "Customer Business Partner", id: 7 ,text:"customer"},
          { name: "Service / Item Type", id: 8 ,text:"item_type"},
          { name: "Service / Item Sub Type", id: 9 ,text:"item_subtype"},
          { name: "Supplier Ref. Document Type", id: 10 ,text:"supp_ref_doc"},
          { name: "Supplier Ref. Document No.", id: 11 ,text:"supp_ref_docno"},
          { name: "Supplier Ref. Document Date", id: 12 ,text:"supp_ref_doc_date"},
          { name: "Transporter Name", id: 13 ,text:"transporter_code"},
          { name: "Vehicle No", id: 14 ,text:"vehicle_id"},   
          { name: "PO Quantity", id: 15 ,text:"total_qty"},
          { name: "Unload Quantity", id: 16 ,text:"total_qty_copy"},
          { name: "UoM", id: 17 ,text:"uom"},
          { name: "Return Remark", id: 18 ,text:"return_remarks"},
          { name: "Return Type Partial", id: 19 ,text:"return_type"},   
          { name: "Weightment Required", id: 20 ,text:"we_req"},
          { name: "QC Required", id: 21 ,text:"qc_required"},
          { name: "Weighment Charges Applicable", id: 22 ,text:"we_chg_app"},
          { name: "Remarks", id: 23 ,text:"remarks"},
          { name: "Applicable Charges", id: 24 ,text:"app_chgs_id"}
          ]    
  },
  {
    name: "Unload Advice Item Details",
    text:"wm_unload_advice_item_dtls",
    children: [
     
          { name: "Item Name", id: 25 ,text:"item_code"},
          { name: "Packing Item", id: 26 ,text:"packing"},
          { name: "Packing Quantity", id: 27 ,text:"s_qty"},
          { name: "Packing Uom", id: 28,text:"s_uom"},
          { name: "Item Quantity", id: 29 ,text:"quantity"},   
          { name: "Item Uom", id: 30 ,text:"uom"},
          { name: "Mat.Wt", id: 31 ,text:"mat_wt"},
          { name: "QC Norms", id: 32 ,text:"qc_norms"},
          { name: "Warehouse", id: 33 ,text:"wearhouse"},
          { name: "Stack / Rack", id: 34 ,text:"rack"},   
          { name: "Base Uom", id: 35 ,text:"base_uom"},
          { name: "Base Quantity", id: 36 ,text:"base_qty"}
         
    ]
  }
  ,
  {
    name: "Party Weighment",
    text:"wm_unload_advice_party_wm",
    children: [
          { name: "Gross Wt.", id: 37 ,text:"gross_wt"},
          { name: "Gross Uom", id: 38 ,text:"uom1"},
          { name: "Tare Wt.", id: 39 ,text:"tare_wt"},
          { name: "Tare Uom", id: 40 ,text:"uom2"},
          { name: "Net Wt.", id: 41 ,text:"net_wt"},
          { name: "Net Uom", id: 42 ,text:"uom3"},
          { name: "Slip No.", id: 43 ,text:"slip_no"},
          { name: "Date", id: 44 ,text:"pw_date"},
          { name: "Weigh Bridge Name", id: 45 ,text:"wb_name"},
          ]    
  },
  {
    name: "Driver Details",
    text:"wm_unload_advice_driver_dtls",
    children: [  
          { name: "Driver Name", id: 46 ,text:"driver_name"},
          { name: "Remarks", id: 47 ,text:"remarks"},
          { name: "Phone no", id: 48 ,text:"phone"},
          { name: "Address", id: 49 ,text:"address"},
          { name: "Document Type", id: 50 ,text:"doc_type"},
          { name: "Document No.", id: 51 ,text:"doc_no"},
          { name: "Description", id: 52 ,text:"description"}
          

          ]    
  }
  ,
  {
    name: "Broker Details",
    text:"wm_unload_advice_broker_dtls",
    children: [   
          { name: "Broker Name", id: 53 ,text:"ven_code_name"},
          { name: "Basis", id: 54 ,text:"basis"},
          { name: "Rate", id: 55 ,text:"rate"},
          { name: "Brokerage Account", id: 56 ,text:"brokerage_acc"},
          { name: "TDS Rate", id: 57 ,text:"tds_rate"},
          { name: "TDS Account", id: 58 ,text:"tds_acc"}
         
          ]    
  }
  ,
  {
    name: "Transport Information",
    text:"wm_unload_advice_trans_info",
    children: [
          { name: "Transport Borne By", id: 59 ,text:"trans_borne_by"},
          { name: "Transporter Name", id: 60 ,text:"transporter_name"},
          { name: "Mode Of Transport", id: 61 ,text:"mode_of_trans"},
          { name: "Transportation Rate", id: 62 ,text:"transport_rate"},
          { name: "Charge Code", id: 63 ,text:"charge_code"},
          { name: "Rate Value", id: 64 ,text:"rate_value"},
          { name: "Payment Mode", id: 65 ,text:"payment_mode"},
          { name: "Cash Amt.", id: 66 ,text:"cash_limit"},
          { name: "Payment Terms", id: 67 ,text:"payment_terms"},
          { name: "Bank Name", id: 68 ,text:"bank_name"},
          { name: "Account Holder Name", id: 69 ,text:"account_name"},
          { name: "Account No", id: 70 ,text:"account_no"},
          { name: "Branch", id: 71 ,text:"branch"},
          { name: "IFSC Code", id: 72 ,text:"ifsc_code"},
          { name: "Mobile Number", id: 73 ,text:"mobile"},
          { name: "IBAN", id: 74 ,text:"iban"},
          { name: "BIC/SWIFT Code", id: 75 ,text:"bic_swift_code"},
          ]    
  }
  ,
  {
    name: "Applicable Charges",
    text:"wm_unload_advice_app_chgs",
    children: [   
          { name: "Charges Name", id: 76 ,text:"charges_name"},
          { name: "Rate Calculation Method", id: 77 ,text:"rate_cal_method"},
          { name: "Tax Rate(%)", id: 78 ,text:"tax_rate"},
          { name: "Amount", id: 79 ,text:"amount"}
         
         
          ]    
  }  
  ,
  {
    name: "Business Partner Details",
    text:"wm_unload_advice_bp_dtls",
    children: [   
          { name: "Supplier Name", id: 80 ,text:"sp_name"},
          { name: "Supplier Phone No.", id: 81 ,text:"sp_phone"},
          { name: "Supplier Fax", id: 82 ,text:"sp_fax"},
          { name: "Supplier E-Mail", id: 83 ,text:"sp_email"},
          { name: "Supplier Address", id: 84 ,text:"sp_address"},
          { name: "Customer Name", id: 85 ,text:"cp_name"},
          { name: "Customer Phone No.", id: 86 ,text:"cp_phone"},
          { name: "Customer Fax", id: 87 ,text:"cp_fax"},
          { name: "Customer E-Mail", id: 88 ,text:"cp_email"},
          { name: "Customer Address", id: 89 ,text:"cp_address"},
          { name: "Designation", id: 90 ,text:"cp_designation"}
           
         
          ]    
  }
    
  
          
];//atmost last


const TREE_DATA23: VehicleNode[] = [
      
  {
    name: "Loading Advice",
    text:"wm_loading_advice",//db table name
    children: [
         
     
          { name: "Advice Type", id: 1 ,text:"advice_type"},//text is column name
          { name: "Advice Date", id: 2 ,text:"advice_date"},
          { name: "Loading Advice No.", id: 3 ,text:"advice_no"},
          { name: "Reference Type", id: 4 ,text:"ref_doc_type"},
          { name: "Business Unit", id: 5 ,text:"b_unit"},
          { name: "Customer Business Partner", id: 6 ,text:"bus_partner"},
          { name: "Supplier Business Partner", id: 7 ,text:"supplier"},
          { name: "Delivery Business Unit", id: 8 ,text:"delivery_business_unit"},
          { name: "Unload Point", id: 9 ,text:"unloading_point"},
          { name: "Loading Point", id: 10 ,text:"load_point"},
          { name: "Vehicle No.", id: 11 ,text:"vehicle_id"},
          { name: "Loading By", id: 12 ,text:"load_by"},
          { name: "Supervisor Name", id: 13 ,text:"erp_usr_name"},
          { name: "Document No.", id: 14 ,text:"doc_no"},   
          { name: "Document Date", id: 15 ,text:"doc_date"},
          { name: "Remarks", id: 16 ,text:"remarks"}
         
          ]    
  },
  {
    name: "loading Advice Item Details",
    text:"wm_loading_advice_itm_dtls",
    children: [
     
          { name: "Item Name", id: 17 ,text:"item_code"},
          { name: "Packing Item", id: 18 ,text:"packing"},
          { name: "HSN Code", id: 19 ,text:"hsn_code"},
          { name: "Packing Quantity", id: 20 ,text:"s_quantity"},
          { name: "Packing Uom", id: 21,text:"s_uom"},
          { name: "Item Qty", id: 22 ,text:"quantity"},   
          { name: "Item Uom", id: 23 ,text:"uom"},
          { name: "Gross.Wt", id: 24 ,text:"mat_wt"},
          { name: "Warehouse", id: 25 ,text:"warehouse"},
          { name: "Stack / Rack", id: 26 ,text:"stack_rack"},   
          { name: "Presant Stack UOM", id: 27 ,text:"base_qty"}
         
         
    ]
  }
  ,
  {
    name: "Driver Details",
    text:"wm_loading_advice_driver_dtls",
    children: [
          { name: "Driver Partner Details", id: 28 ,text:"dri_part_dtls"},
          { name: "Driver Payment Reamrks", id: 29 ,text:"dri_pay_remark"},
          { name: "Driver Name", id: 30 ,text:"driver_name"},
          { name: "Phone no", id: 31 ,text:"phone"},
          { name: "Address", id: 32 ,text:"address"},
          { name: "Document Type", id: 33 ,text:"doc_type"},
          { name: "Document No.", id: 34 ,text:"doc_no"},
          { name: "Description", id: 35 ,text:"description"},
          
          ]    
  },
  
  {
    name: "Transport Information",
    text:"wm_loading_advice_trans_info",
    children: [
          { name: "Transport Borne By", id: 36 ,text:"trans_borne_by"},
          { name: "Transporter Name", id: 37 ,text:"transporter_name"},
          { name: "Mode Of Transport", id: 38 ,text:"mode_of_trans"},
          { name: "Transportation Rate", id: 39 ,text:"transport_rate"},
          { name: "Charge Code", id: 40 ,text:"charge_code"},
          { name: "Rate Value", id: 41 ,text:"rate_value"},//ends
          { name: "Advance Payment", id: 42 ,text:"adv_payment"},
          { name: "Mode of Payment", id: 43 ,text:"mode_of_payment"},//here
          { name: "Bank Name", id: 44 ,text:"bank_name"},
          { name: "Account Holder Name", id: 45 ,text:"account_name"},
          { name: "Account No", id: 46 ,text:"account_no"},
          { name: "Branch", id: 47 ,text:"branch"},
          { name: "IFSC Code", id: 48 ,text:"ifsc_code"},
          { name: "Mobile Number", id: 49 ,text:"mobile"},
          { name: "IBAN", id: 50 ,text:"iban"},
          { name: "BIC/SWIFT Code", id: 51 ,text:"bic_swift_code"},
          { name: "Cash Limit", id: 52 ,text:"cash_limit"},
          { name: "Payment Terms", id: 53 ,text:"payment_term"}
          ]    
  }

  ,
  {
    name: "Business Partner Details",
    text:"wm_loading_advice_bp_dtls",
    children: [   
          { name: "Supplier Name", id: 54 ,text:"supp_name"},
          { name: "Supplier Phone No.", id: 55 ,text:"supp_phone"},
          { name: "Supplier Fax", id: 56 ,text:"supp_fax"},
          { name: "Supplier E-Mail", id: 57 ,text:"supp_email"},
          { name: "Supplier Address", id: 58 ,text:"supp_address"},
          { name: "Customer Name", id: 59 ,text:"cust_name"},
          { name: "Customer Phone No.", id: 60 ,text:"cust_ph"},
          { name: "Customer Fax", id: 61 ,text:"cust_fax"},
          { name: "Customer E-Mail", id: 62 ,text:"cust_mail"},
          { name: "Customer Address", id: 63 ,text:"cust_add"},
          { name: "Contact Name", id: 64 ,text:"cp_name"},
          { name: "Contact Designation", id: 65 ,text:"cp_desg"},
          { name: "Contact Phone", id: 66 ,text:"cp_ph"},
          { name: "Contact Fax", id: 67 ,text:"cp_fax"},
          { name: "Contact E-Mail", id: 68 ,text:"cp_mail"},
          { name: "Contact Address", id: 69 ,text:"cp_add"},
         
          ]    
  }
  ,
  {
    name: "Loading Code Details",
    text:"loading_code_details",
    children: [   
          { name: "Customer", id: 54 ,text:"Customer"},
          { name: "Vehicle No", id: 55 ,text:"vehicle_no"},
          { name: "Item Name", id: 56 ,text:"item_name"},
          { name: "Packing Name", id: 57 ,text:"packing_item"},
     
         
          ]    
  }
  
          
];//atmost last
//TREE_DATA24
const TREE_DATA24: VehicleNode[] = [
      
  {
    name: "Weighment",
    text:"wm_unload_wgmnt",//db table name
    children: [
         
     
          { name: "Weighment For", id: 1 ,text:"wgment_for"},//text is column name
          { name: "Vehicle No.", id: 2 ,text:"vehicle_no"},
          { name: "Date", id: 3 ,text:"wgment_date"},
          { name: "Weighment No.", id: 4 ,text:"wgment_no"},
          { name: "Ref. Doc. No.", id: 5 ,text:"ref_doc_no"},
          { name: "Vehicle Type", id: 6 ,text:"veh_type"},
          { name: "Ref. Doc. Date", id: 7 ,text:"ref_doc_date"},
          { name: "Gross Weight", id: 8 ,text:"gross_weight"},
          { name: "Gross UOM", id: 9 ,text:"gw_unit"},
          { name: "Gross Date", id: 10 ,text:"gw_date"},
          { name: "Gross Time.", id: 11 ,text:"gw_time"},
          { name: "Gross Remarks", id: 12 ,text:"gw_remarks"},
          { name: "Tare Weight", id: 13 ,text:"tare_weight"},
          { name: "Tare UOM", id: 14 ,text:"tw_unit"},   
          { name: "Tare Date", id: 15 ,text:"tw_date"},
          { name: "Tare Time", id: 16 ,text:"tw_time"},
          { name: "Tare Remarks", id: 17 ,text:"tw_remarks"},

          { name: "Bags", id: 18 ,text:"tarebags"},
          { name: "Net Weight", id: 19 ,text:"net_weight"},
          { name: "Net UOM", id: 20 ,text:"nw_unit"},
          { name: "Weighment Charge", id: 21 ,text:"wgment_charge"},
          { name: "Weighment Rs.", id: 22 ,text:"wgment_rs"},
          { name: "Digital Weight 1", id: 23 ,text:"digital_weight"},
          { name: "Digital Weight 2", id: 24 ,text:"digital_weight1"},
          { name: "Advice No", id: 25 ,text:"advice_no"},
          { name: "Advice Total Weight", id: 26 ,text:"totalweight"}, 
          ]    
  },
  {
    name: "Weighment Item Details",
    text:"wm_unload_wgmnt_dtls",
    children: [
     
         // { name: "Advice No", id: 25 ,text:"advice_no"},
          { name: "Advice No", id: 27 ,text:"advice_no"},
          { name: "Business Unit", id: 28 ,text:"business_unit"},
        //  { name: "Customer", id: 28 ,text:"customer"},  //also discard into sales dynamic sort table
       //   { name: "Weighment Number", id: 29,text:"wgment_no"},  
        //  { name: "Supplier", id: 30 ,text:"supplier"},   
        //  { name: "Weighment Date", id: 31 ,text:"wgment_date"},
         
    ]
  },
  {
    name: "Weighment Code Details",
    text:"weighment_code_details",
    children: [
     
          { name: "Gross Wt Unit", id: 28 ,text:"Grosswait_Unit"},
          { name: "Tare Wt Unit", id: 29 ,text:"tw_Unit"},
          { name: "Net Wt Unit", id: 30 ,text:"nw_Unit"},
          { name: "Customer", id: 31 ,text:"Customername"},
          { name: "Supplier", id: 32 ,text:"Supplier_Name"},  
         
    ]
  }
          
];//atmost last

@Component({
  selector: 'app-sales2',
  templateUrl: './sales2.component.html',
  styleUrls: ['./sales2.component.scss']
})

export class Sales2Component implements OnInit{

  model:Sales2Report =new Sales2Report();
  public userForm: FormGroup;
  status:any;
  sales_reportlists:any=[];
  Id:any;
  Concat_multi:any; //for parent.child list
  Concat_multi_static:any; //for only child list
  Concat_multi_parenttable:any; //for only child list
  listSalesRegistration:Sales2Report[];
  salespurchasereportsave:boolean = true;
  salespurchasereportdelete:boolean = true;

  constructor(fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master, )
   {
    this.userForm=fb.group({ 
      company_id:[''],
      fin_year:[''],
      username:[''],
      sales_report:[''],
      id: [''], 
      reportname:[''],
      static_report:[''],
      table_name:[''],
      reporttype:[''],
      reportlist:[''],
      

       });
  
    

    }

    get id(){ return this.userForm.get("id") as FormControl }
    get sales_report(){return this.userForm.get("sales_report") as FormControl }
    get reportname(){return this.userForm.get("reportname") as FormControl }
    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get username(){ return this.userForm.get("username") as FormControl }
    get reporttype(){return this.userForm.get("reporttype") as FormControl }
    get reportlist(){return this.userForm.get("reportlist") as FormControl }
   

    ngOnInit() {

      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.salespurchasereportsave = false;
    this.salespurchasereportdelete = false;
    if(accessdata.includes('sales_purchase_report.save'))
    {
     this.salespurchasereportsave = true;
    }
   if(accessdata.includes('sales_purchase_report.delete'))
    { 
      this.salespurchasereportdelete=true;
    }
  
      this.status =true;
      
       forkJoin(
        this.Service.getSalesRegDynamicList(),      
        ).subscribe(([SalesRegisterList])=>
          {
            this.listSalesRegistration=SalesRegisterList
          this.status = true; 
          });
      
    };
    @ViewChild('purchase_report_dropdown') purchase_report_dropdown:ElementRef;
    @ViewChild('sales_report_dropdown') sales_report_dropdown:ElementRef;
    @ViewChild('weigment_report_dropdown') weigment_report_dropdown:ElementRef;
    
    onChangeGroupReportType(event)
    {
      
      if(event == 'salesreport')
      {
        //change 2nd list
         this.dataSource.data =[];
       //  this.reportlist;
       
        this.purchase_report_dropdown.nativeElement.hidden=true;
        this.sales_report_dropdown.nativeElement.hidden=false;
        this.weigment_report_dropdown.nativeElement.hidden=true;
        
      }
      if(event == 'purchasereport')
      {
     //  chnage 2nd list
     this.dataSource.data =[];
      
      this.sales_report_dropdown.nativeElement.hidden=true;
      this.purchase_report_dropdown.nativeElement.hidden=false;
      this.weigment_report_dropdown.nativeElement.hidden=true;
        
      }
      if(event == 'weigmentreport')
      {
     //  chnage 2nd list
     this.dataSource.data =[];
     
      this.weigment_report_dropdown.nativeElement.hidden=false;
      this.sales_report_dropdown.nativeElement.hidden=true;
      this.purchase_report_dropdown.nativeElement.hidden=true;
     
        
      }
    

    }

    onChangeGroup(event)
    {
     
      if(event == 'salesinvoice')
      {
         this.dataSource.data = TREE_DATA;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'salesenquiry')
      {
         this.dataSource.data = TREE_DATA2;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'salesquotation')
      {
         this.dataSource.data = TREE_DATA3;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'salesorder')
      {
         this.dataSource.data = TREE_DATA4;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'deliverychallan')
      {
         this.dataSource.data = TREE_DATA5;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'returnapprovalnote')
      {
         this.dataSource.data = TREE_DATA6;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'salesreturnnote')
      {
         this.dataSource.data = TREE_DATA7;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'salescreditnote')
      {
         this.dataSource.data = TREE_DATA8;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'salesgatepass')
      {
         this.dataSource.data = TREE_DATA9;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      
      if(event == 'indentorder')
      {
         this.dataSource.data = TREE_DATA10;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'purchaseenquiry')
      {
         this.dataSource.data = TREE_DATA11;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'purchasequotation')
      {
         this.dataSource.data = TREE_DATA12;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'purchaseorder')
      {
         this.dataSource.data = TREE_DATA13;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'qualitycheck')
      {
         this.dataSource.data = TREE_DATA14;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'peripheralqualitycheck')
      {
         this.dataSource.data = TREE_DATA15;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'purchasegoodsreceipt')
      {
         this.dataSource.data = TREE_DATA16;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'l1selection')
      {
         this.dataSource.data = TREE_DATA17;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'purchasebill')
      {
         this.dataSource.data = TREE_DATA18;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'purchasereturnappovalnote')
      {
         this.dataSource.data = TREE_DATA19;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'purchasereturnnote')
      {
         this.dataSource.data = TREE_DATA20;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

      if(event == 'debitnote')
      {
         this.dataSource.data = TREE_DATA21;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'unloadadvice')
      {
         this.dataSource.data =TREE_DATA22;
         ;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      
      if(event == 'loadingadvice')
      {
         this.dataSource.data =TREE_DATA23;
         ;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }
      if(event == 'weightment')
      {
         this.dataSource.data =TREE_DATA24;
         ;
         Object.keys(this.dataSource.data).forEach((x) => {
          this.setParent(this.dataSource.data[x], null);
          
        });
      }

    }


     public treeControl = new NestedTreeControl<VehicleNode>(node => node.children);

    
     public dataSource = new MatTreeNestedDataSource<VehicleNode>();
     @ViewChild('outputDiv', {read: ElementRef}) 
     public outputDivRef: ElementRef<HTMLParagraphElement>;
     
   

  

      public hasChild = (_: number, node: VehicleNode) =>
      !!node.children && node.children.length > 0;
  
    private setParent(node: VehicleNode, parent: VehicleNode) {
      
      node.parent = parent;
      if (node.children) {
        node.children.forEach(childNode => {
          this.setParent(childNode, node);
        
        });
      }
      
    }
  
    private checkAllParents(node: VehicleNode) {
     
      if (node.parent) {
        const descendants = this.treeControl.getDescendants(node.parent);
        
        node.parent.selected = 
          descendants.every(child => child.selected);
        node.parent.indeterminate = 
          descendants.some(child => child.selected);
        this.checkAllParents(node.parent);

        //alert(node.parent.text);
      }

     
    }
  
    public itemToggle(checked: boolean, node: VehicleNode) {
      node.selected = checked;
    
      if (node.children) {
        node.children.forEach(child => {
          this.itemToggle(checked, child);
        });
      
      
      }
      this.checkAllParents(node);
      
      
    }

// check report name starts here 

onFocusOutEvent(event: any){

  console.log(event.target.value);

   this.DropDownListService.getSalesRegDuplicateCheck()
 .subscribe(data =>
    {
     if(data.includes(event.target.value))
    {
       alert("Report Name must be Unique .Please try other Report Name !!!!!");
       this.userForm.reset();
     }   
   }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
  

}




//report name ends here 
    public submit() {
  
     let checkreportName=this.userForm.get("reportname").value
     if(checkreportName=="" || checkreportName==null)
     {
       alert(" Please Enter Report Name");
     }
     else
     {
  
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      //console.log("chechk send : "+ this.sales_report.value +" / " + this.fin_year.value +" / " +this.username.value );
 
                //for 1st time submit
                 let result = [];
                 this.dataSource.data.forEach((node) => {
                   result = result.concat(
                     this.treeControl
                       .getDescendants(node)
                       .filter((x) => x.selected && x.name)
                       .map((x) => x.parent.text+ '.' + x.text)
                   );
                 });
                 
                 let result2 = this.dataSource.data.reduce(
                   (acc: string[], node: VehicleNode) => 
                     acc.concat(this.treeControl
                                 .getDescendants(node)
                                 .filter(descendant => descendant.selected)
                                 .map(descendant => descendant.text))
                   , [] as string[]);
                 let Concat_multi_static=result2
                 this.userForm.patchValue({static_report:Concat_multi_static.toString()});
           
               let Concat_multi = result;
               this.userForm.patchValue({sales_report:Concat_multi.toString()});
        
               let result3 = [];
               this.dataSource.data.forEach((node) => {
                 result3 = result3.concat(
                   this.treeControl
                     .getDescendants(node)
                     .filter((x) => x.selected && x.parent.name)
                     .map((x) => x.parent.name)
                     
                 );
               });
 
               let Concat_multi_parenttable=result3;
 
               this.userForm.patchValue({table_name:Concat_multi_parenttable.toString()});
          
                 this.Service.createSalesRegDynamic(this.userForm.getRawValue()).subscribe(data => 
               {
                      alert("New Sales Report Master created successfully.");
                 this.userForm.reset();
                      this.status = true;
                      this.ngOnInit();
                      this.dataSource.data =[];
                    }, (error) => 
                    {
                      this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                      alert("something error is occured please try again....");
                      this.userForm.reset();
                  this.ngOnInit();
                });
             }
        }
       




  
    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Sales Registration ?"))
      { 
        this.status = false;
      //  this.userForm.patchValue({fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
        this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
       // console.log("chk storage::"+localStorage.getItem("company_name")+"//"+localStorage.getItem("username"))
      this.Service.deleteSalesRegDynamic(id).subscribe(data=> 
        {     
         // console.log("chk data.reportname::"+data.reportname)
         if(data.status=='Yes')
         {
          alert("Sales Registration deleted successfully.");
          }else{
            alert("Opps!!! Can't delete this Sales Registration !!!");
          }
          this.status = true;
          this.ngOnInit()

          

        }); 
      }  
      else{
        alert("Opps!!! Can't delete this Sales Registration !!!");
      }
      this.status = true;
    }
    
   
}
