import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';



import { userAccess } from '../../../../../../Models/System/userAccess';



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
 
  {
          name: "ITEM TYPE",
          text:"item_type",
          children: [
                { name: "Save", id: 1 ,text:"item_type.save"},
                { name: "Update", id: 2 ,text:"item_type.update"},
                { name: "View", id: 3 ,text:"item_type.view"} 
              ]   
        },
        {
          name: "ITEM CATAGORY",
          text:"item_catagory",
          children: [
                { name: "Save", id: 4 ,text:"item_catagory.save"},
                { name: "Update", id: 5 ,text:"item_catagory.update"},
                { name: "Delete", id: 6 ,text:"item_catagory.delete"}, 
                { name: "View", id: 6111 ,text:"item_catagory.view"}
              ]     
        },
        {
          name: "ITEM GROUP",
          text:"item_group",
          children: [
                { name: "Save", id: 7 ,text:"item_group.save"},
                { name: "Update", id: 8 ,text:"item_group.update"},
                { name: "Delete", id: 9 ,text:"item_group.delete"},
                { name: "View", id: 888 ,text:"item_group.view"}, 
              ]     
        },
        {
          name: "ITEM MASTER",
          text:"item_master",
          children: [
                { name: "Save", id: 10 ,text:"item_master.save"},
                { name: "Update", id: 11 ,text:"item_master.update"},
                { name: "Delete", id: 12 ,text:"item_master.delete"}, 
                { name: "View", id: 1211 ,text:"item_master.view"},
                { name: "Posting", id: 1212 ,text:"item_master.posting"},
              ]     
        }   
      ];

      const TREE_DATA2: VehicleNode[] = [
 
        {
                name: "Supplier Group",
                text:"supplier_group",
                children: [
                  { name: "Save", id: 13 ,text:"supplier_group.save"},
                  { name: "Update", id: 14 ,text:"supplier_group.update"},
                  { name: "Delete", id: 15 ,text:"supplier_group.delete"},
                  { name: "View", id: 1500 ,text:"supplier_group.view"}  
                ] 
              },
              {
                name: "Supplier Master",
                text:"supplier_master",
                children: [
                  { name: "Save", id: 16 ,text:"supplier_master.save"},
                  { name: "Update", id: 17 ,text:"supplier_master.update"},
                  { name: "Delete", id: 18 ,text:"supplier_master.delete"},  
                  { name: "View", id: 1800 ,text:"supplier_master.view"},
                  { name: "Posting", id: 1802 ,text:"supplier_master.posting"}
                ] 
              },
              {
                name: "Transporter Group",
                text:"transporter_group",
                children: [
                  { name: "Save", id: 19 ,text:"transporter_group.save"},
                  { name: "Update", id: 20 ,text:"transporter_group.update"},
                  { name: "Delete", id: 21 ,text:"transporter_group.delete"},  
                  { name: "View", id: 2100 ,text:"transporter_group.view"}
                ] 
              },
              {
                name: "Transporter Master",
                text:"transporter_master",
                children: [
                  { name: "Save", id: 22 ,text:"transporter_master.save"},
                  { name: "Update", id: 23 ,text:"transporter_master.update"},
                  { name: "Delete", id: 24 ,text:"transporter_master.delete"},
                  { name: "View", id: 2400 ,text:"transporter_master.view"}   
                ] 
              }   
            ];

            const TREE_DATA3: VehicleNode[] = [
 
              {
                      name: "Customer Group",
                      text:"customer_group",
                      children: [
                        { name: "Save", id: 25 ,text:"customer_group.save"},
                        { name: "Update", id: 26 ,text:"customer_group.update"},
                        { name: "Delete", id: 27 ,text:"customer_group.delete"},
                        { name: "View", id: 2700 ,text:"customer_group.view"}  
                      ] 
                    },
                    {
                      name: "Customer Master",
                      text:"customer_master",
                      children: [
                        { name: "Save", id: 28 ,text:"customer_master.save"},
                        { name: "Update", id: 29 ,text:"customer_master.update"},
                        { name: "Delete", id: 30 ,text:"customer_master.delete"}, 
                        { name: "View", id: 3000 ,text:"customer_master.view"},
                        { name: "Posting", id: 3001 ,text:"customer_master.posting"}  
                      ] 
                    }
                  ];

        const TREE_DATA4: VehicleNode[] = [
 
              {
                      name: "Broker Group",
                      text:"broker_group",
                      children: [
                        { name: "Save", id: 31 ,text:"broker_group.save"},
                        { name: "Update", id: 32 ,text:"broker_group.update"},
                        { name: "Delete", id: 33 ,text:"broker_group.delete"},
                        { name: "View", id: 3301 ,text:"broker_group.view"}  
                      ] 
                    },
                    {
                      name: "Broker Master",
                      text:"broker_master",
                      children: [
                        { name: "Save", id: 34 ,text:"broker_master.save"},
                        { name: "Update", id: 35 ,text:"broker_master.update"},
                        { name: "Delete", id: 36 ,text:"broker_master.delete"},
                        { name: "View", id: 3601 ,text:"broker_master.view"},
                        { name: "Posting", id: 3602 ,text:"broker_master.posting"}   
                      ] 
                    }
                  ];

                  const TREE_DATA5: VehicleNode[] = [
 
                    {
                            name: "Other Partner Group",
                            text:"other_partner_group",
                            children: [
                              { name: "Save", id: 37 ,text:"other_partner_group.save"},
                              { name: "Update", id: 38 ,text:"other_partner_group.update"},
                              { name: "Delete", id: 39 ,text:"other_partner_group.delete"}  
                            ] 
                          },
                          {
                            name: "Other Partner Master",
                            text:"other_partner_master",
                            children: [
                              { name: "Save", id: 40 ,text:"other_partner_master.save"},
                              { name: "Update", id: 41 ,text:"other_partner_master.update"},
                              { name: "Delete", id: 42 ,text:"other_partner_master.delete"}   
                            ] 
                          }
                        ];

        const TREE_DATA6: VehicleNode[] = [
               {
                      name: "Shop Floor Master",
                      text:"shop_floor_master",
                      children: [
                        { name: "Save", id: 43 ,text:"shop_floor_master.save"},
                        { name: "Update", id: 44 ,text:"shop_floor_master.update"},
                        { name: "Delete", id: 45 ,text:"shop_floor_master.delete"},
                        { name: "View", id: 4500 ,text:"shop_floor_master.view"} 
                      ] 
                    },
                    {
                      name: "Payment Term Master",
                      text:"payment_term_master",
                      children: [
                        { name: "Save", id: 46 ,text:"payment_term_master.save"},
                        { name: "Update", id: 47 ,text:"payment_term_master.update"},
                        { name: "Delete", id: 48 ,text:"payment_term_master.delete"},
                        { name: "View", id: 4811 ,text:"payment_term_master.view"}   
                      ] 
                    },
                    {
                      name: "QC Rules Setup",
                      text:"qcrules_setup",
                      children: [
                        { name: "Save", id: 49 ,text:"qcrules_setup.save"},
                        { name: "Update", id: 50 ,text:"qcrules_setup.update"},
                        { name: "Delete", id: 51 ,text:"qcrules_setup.delete"},
                        { name: "View", id: 5100 ,text:"qcrules_setup.view"}
                      ] 
                    },
                    {
                      name: "QTDS Master",
                      text:"qtds_master",
                      children: [
                        { name: "Save", id: 52 ,text:"qtds_master.save"},
                        { name: "Update", id: 53 ,text:"qtds_master.update"},
                        { name: "Delete", id: 54 ,text:"qtds_master.delete"},
                        { name: "View", id: 5004 ,text:"qtds_master.view"} 
                      ] 
                    },
                    {
                      name: "Charges Master",
                      text:"charges_master",
                      children: [
                        { name: "Save", id: 55 ,text:"charges_master.save"},
                        { name: "Update", id: 56 ,text:"charges_master.update"},
                        { name: "Delete", id: 57 ,text:"charges_master.delete"},
                        { name: "View", id: 5001 ,text:"charges_master.view"}
                      ] 
                    },
                    {
                      name: "Zone Master",
                      text:"zone_master",
                      children: [
                        { name: "Save", id: 58 ,text:"zone_master.save"},
                        { name: "Update", id: 59 ,text:"zone_master.update"},
                        { name: "Delete", id: 60 ,text:"zone_master.delete"},
                        { name: "View", id: 6000 ,text:"zone_master.view"}  
                      ] 
                    },
                    {
                      name: "Channel Customer Master",
                      text:"channel_customer_master",
                      children: [
                        { name: "Save", id: 61 ,text:"channel_customer_master.save"},
                        { name: "Update", id: 62 ,text:"channel_customer_master.update"},
                        { name: "Delete", id: 63 ,text:"channel_customer_master.delete"},
                        { name: "View", id: 6300 ,text:"channel_customer_master.view"}   
                      ] 
                    },
                    {
                      name: "Weightment Charges Master",
                      text:"weightment_charges_master",
                      children: [
                        { name: "Save", id: 64 ,text:"weightment_charges_master.save"},
                        { name: "Update", id: 65 ,text:"weightment_charges_master.update"},
                        { name: "Delete", id: 66 ,text:"weightment_charges_master.delete"},
                        { name: "View", id: 6600 ,text:"weightment_charges_master.view"}   
                      ] 
                    },
                    {
                      name: "Loading Point",
                      text:"loading_point",
                      children: [
                        { name: "Save", id: 67 ,text:"loading_point.save"},
                        { name: "Update", id: 68 ,text:"loading_point.update"},
                        { name: "Delete", id: 69 ,text:"loading_point.delete"},
                        { name: "View", id: 6911 ,text:"loading_point.view"}
                      ] 
                    }
                  ];

          const TREE_DATA7: VehicleNode[] = [
              {
                      name: "Company Master",
                      text:"company_master",
                      children: [
                        { name: "Save", id: 70 ,text:"company_master.save"},
                        { name: "Update", id: 71 ,text:"company_master.update"},
                        { name: "Delete", id: 72 ,text:"company_master.delete"},
                        { name: "View", id: 720 ,text:"company_master.view"}  
                      ] 
                    },
                    {
                      name: "Company Business Unit",
                      text:"company_business_unit",
                      children: [
                        { name: "Save", id: 73 ,text:"company_business_unit.save"},
                        { name: "Update", id: 74 ,text:"company_business_unit.update"},
                        { name: "Delete", id: 75 ,text:"company_business_unit.delete"},
                        { name: "View", id: 750 ,text:"company_business_unit.view"}   
                      ] 
                    },
                    {
                      name: "Warehouse Master",
                      text:"warehouse_master",
                      children: [
                        { name: "Save", id: 76 ,text:"warehouse_master.save"},
                        { name: "Update", id: 77 ,text:"warehouse_master.update"},
                        { name: "Delete", id: 78 ,text:"warehouse_master.delete"},
                        { name: "View", id: 78 ,text:"warehouse_master.view"}     
                      ] 
                    },
                    {
                      name: "Bin Master",
                      text:"bin_master",
                      children: [
                        { name: "Save", id: 79 ,text:"bin_master.save"},
                        { name: "Update", id: 80 ,text:"bin_master.update"},
                        { name: "Delete", id: 81 ,text:"bin_master.delete"},
                        { name: "View", id: 8111 ,text:"bin_master.view"}  
                      ] 
                    },
                    {
                      name: "Department Master",
                      text:"department_master",
                      children: [
                        { name: "Save", id: 82 ,text:"department_master.save"},
                        { name: "Update", id: 83 ,text:"department_master.update"},
                        { name: "Delete", id: 84 ,text:"department_master.delete"},
                        { name: "View", id: 840 ,text:"department_master.view"}   
                      ] 
                    },
                    {
                      name: "Custom UOM Master",
                      text:"custom_uom_master",
                      children: [
                        { name: "Save", id: 85 ,text:"custom_uom_master.save"},
                        { name: "Update", id: 86 ,text:"custom_uom_master.update"},
                        { name: "Delete", id: 87 ,text:"custom_uom_master.delete"},
                        { name: "View", id: 870 ,text:"custom_uom_master.view"}   
                      ] 
                    },
                    {
                      name: "Misc Master",
                      text:"misc_master",
                      children: [
                        { name: "Save", id: 88 ,text:"misc_master.save"},
                        { name: "Update", id: 89 ,text:"misc_master.update"},
                        { name: "Delete", id: 90 ,text:"misc_master.delete"},
                        { name: "View", id: 920 ,text:"misc_master.view"}   
                      ] 
                    },
                    {
                      name: "Tax Type Master",
                      text:"tax_type_master",
                      children: [
                        { name: "Save", id: 91 ,text:"tax_type_master.save"},
                        { name: "Update", id: 92 ,text:"tax_type_master.update"},
                        { name: "Delete", id: 93 ,text:"tax_type_master.delete"},
                        { name: "View", id: 930 ,text:"tax_type_master.view"} 
                      ] 
                    },
                    {
                      name: "Vehicle Type Master",
                      text:"vehicle_type_master",
                      children: [
                        { name: "Save", id: 94 ,text:"vehicle_type_master.save"},
                        { name: "Update", id: 95 ,text:"vehicle_type_master.update"},
                        { name: "Delete", id: 96 ,text:"vehicle_type_master.delete"},
                        { name: "View", id: 906 ,text:"vehicle_type_master.view"}   
                      ] 
                    },
                    {
                      name: "Vehicle Master",
                      text:"vehicle_master",
                      children: [
                        { name: "Save", id: 97 ,text:"vehicle_master.save"},
                        { name: "Update", id: 98 ,text:"vehicle_master.update"},
                        { name: "Delete", id: 99 ,text:"vehicle_master.delete"},
                        { name: "View", id: 991 ,text:"vehicle_master.view"}   
                      ] 
                    },
                    {
                      name: "Transportation Charges",
                      text:"transportation_charges",
                      children: [
                        { name: "Save", id: 100 ,text:"transportation_charges.save"},
                        { name: "Update", id: 101 ,text:"transportation_charges.update"},
                        { name: "Delete", id: 102 ,text:"transportation_charges.delete"},
                        { name: "View", id: 1002 ,text:"transportation_charges.view"}   
                      ] 
                    },
                    {
                      name: "Tax Code Master",
                      text:"tax_code_master",
                      children: [
                        { name: "Save", id: 103 ,text:"tax_code_master.save"},
                        { name: "Update", id: 104 ,text:"tax_code_master.update"},
                        { name: "Delete", id: 105 ,text:"tax_code_master.delete"},
                        { name: "View", id: 1005 ,text:"tax_code_master.view"}   
                      ] 
                    },
                    {
                      name: "Designation Master",
                      text:"designation_master",
                      children: [
                        { name: "Save", id: 106 ,text:"designation_master.save"},
                        { name: "Update", id: 107 ,text:"designation_master.update"},
                        { name: "Delete", id: 108 ,text:"designation_master.delete"},
                        { name: "View", id: 1080 ,text:"designation_master.view"}   
                      ] 
                    },
                    {
                      name: "District Master",
                      text:"district_master",
                      children: [
                        { name: "Save", id: 109 ,text:"district_master.save"},
                        { name: "Update", id: 110 ,text:"district_master.update"},
                        { name: "Delete", id: 111 ,text:"district_master.delete"},
                        { name: "View", id: 1111 ,text:"district_master.view"}   
                      ] 
                    },
                    {
                      name: "City Master",
                      text:"city_master",
                      children: [
                        { name: "Save", id: 112 ,text:"city_master.save"},
                        { name: "Update", id: 113 ,text:"city_master.update"},
                        { name: "Delete", id: 114 ,text:"city_master.delete"},
                        { name: "View", id: 1141 ,text:"city_master.view"}
                      ] 
                    },
                    {
                      name: "Area Master",
                      text:"area_master",
                      children: [
                        { name: "Save", id: 115 ,text:"area_master.save"},
                        { name: "Update", id: 116 ,text:"area_master.update"},
                        { name: "Delete", id: 117 ,text:"area_master.delete"},
                        { name: "View", id: 1171 ,text:"area_master.view"}   
                      ] 
                    },
                    {
                      name: "Reason Master",
                      text:"reason_master",
                      children: [
                        { name: "Save", id: 118 ,text:"reason_master.save"},
                        { name: "Update", id: 119 ,text:"reason_master.update"},
                        { name: "Delete", id: 120 ,text:"reason_master.delete"},
                        { name: "View", id: 1020 ,text:"reason_master.view"}   
                      ] 
                    },
                    {
                      name: "Screen Master",
                      text:"screen_master",
                      children: [
                        { name: "Save", id: 121 ,text:"screen_master.save"},
                        { name: "Update", id: 122 ,text:"screen_master.update"},
                        { name: "Delete", id: 123 ,text:"screen_master.delete"},
                        { name: "View", id: 1023 ,text:"screen_master.view"}   
                      ] 
                    },
                    {
                      name: "Purpose Master",
                      text:"purpose_master",
                      children: [
                        { name: "Save", id: 124 ,text:"purpose_master.save"},
                        { name: "Update", id: 125 ,text:"purpose_master.update"},
                        { name: "Delete", id: 126 ,text:"purpose_master.delete"},
                        { name: "View", id: 1206 ,text:"purpose_master.view"}   
                      ] 
                    },
                    {
                      name: "Invoice type",
                      text:"invoice_type",
                      children: [
                        { name: "Save", id: 127 ,text:"invoice_type.save"},
                        { name: "Update", id: 128 ,text:"invoice_type.update"},
                        { name: "Delete", id: 129 ,text:"invoice_type.delete"},
                        { name: "View", id: 1209 ,text:"invoice_type.view"}   
                      ] 
                    },
                    {
                      name: "Driver Master",
                      text:"driver_master",
                      children: [
                        { name: "Save", id: 1271 ,text:"driver_master.save"},
                        { name: "Update", id: 1281 ,text:"driver_master.update"},
                        { name: "Delete", id: 1291 ,text:"driver_master.delete"},
                        { name: "View", id: 1292 ,text:"driver_master.view"}   
                      ] 
                    }
                  ];

 const TREE_DATA8: VehicleNode[] = [
               {
                      name: "Indent Order",
                      text:"indent_order",
                      children: [
                        { name: "Save", id: 130 ,text:"indent_order.save"},
                        { name: "Update", id: 131 ,text:"indent_order.update"},
                        { name: "View", id: 132 ,text:"indent_order.view"},
                        { name: "Delete", id: 133 ,text:"indent_order.delete"} ,
                        { name: "Bill Print", id: 134 ,text:"indent_order.print"} 
                      ] 
                    },
                    {
                      name: "Purchase Enquiry",
                      text:"purchase_enquiry",
                      children: [
                        { name: "Save", id: 135 ,text:"purchase_enquiry.save"},
                        { name: "Update", id: 136 ,text:"purchase_enquiry.update"},
                        { name: "View", id: 137 ,text:"purchase_enquiry.view"},
                        { name: "Delete", id: 138 ,text:"purchase_enquiry.delete"},  
                        { name: "Bill Print", id: 139 ,text:"purchase_enquiry.print"} 
                      ] 
                    },
                    {
                      name: "Purchase Quotation",
                      text:"purchase_quotation",
                      children: [
                        { name: "Save", id: 140 ,text:"purchase_quotation.save"},
                        { name: "Update", id: 141 ,text:"purchase_quotation.update"},
                        { name: "View", id: 142 ,text:"purchase_quotation.view"},
                        { name: "Delete", id: 143 ,text:"purchase_quotation.delete"},
                        { name: "Bill Print", id: 144 ,text:"purchase_quotation.print"}  
                      ] 
                    },
                    {
                      name: "Purchase Order",
                      text:"purchase_order",
                      children: [
                        { name: "Save", id: 145 ,text:"purchase_order.save"},
                        { name: "Update", id: 146 ,text:"purchase_order.update"},
                        { name: "View", id: 147 ,text:"purchase_order.view"},
                        { name: "Delete", id: 148 ,text:"purchase_order.delete"},
                        { name: "Bill Print", id: 149 ,text:"purchase_order.print"}
                      ] 
                    },
                    {
                      name: "Quality Check",
                      text:"quality_check",
                      children: [
                        { name: "Save", id: 150 ,text:"quality_check.save"},
                        { name: "Update", id: 151 ,text:"quality_check.update"},
                        { name: "View", id: 152 ,text:"quality_check.view"},
                        { name: "Delete", id: 153 ,text:"quality_check.delete"},
                        { name: "Bill Print", id: 154 ,text:"quality_check.print"}  
                      ] 
                    },
                    {
                      name: "Peripheral Quality Check",
                      text:"peripheral_quality_check",
                      children: [
                        { name: "Save", id: 155 ,text:"peripheral_quality_check.save"},
                        { name: "Update", id: 156 ,text:"peripheral_quality_check.update"},
                        { name: "View", id: 157 ,text:"peripheral_quality_check.view"},
                        { name: "Delete", id: 158 ,text:"peripheral_quality_check.delete"},
                        { name: "Bill Print", id: 159 ,text:"peripheral_quality_check.print"}  
                      ] 
                    },
                    {
                      name: "GRN",
                      text:"grn",
                      children: [
                        { name: "Save", id: 160 ,text:"grn.save"},
                        { name: "Update", id: 161 ,text:"grn.update"},
                        { name: "View", id: 162 ,text:"grn.view"},
                        { name: "Delete", id: 163 ,text:"grn.delete"},
                        { name: "Bill Print", id: 164 ,text:"grn.print"}   
                      ] 
                    },
                    {
                      name: "L1 Selection",
                      text:"l1_selection",
                      children: [
                        { name: "Save", id: 165 ,text:"l1_selection.save"},
                        { name: "Update", id: 166 ,text:"l1_selection.update"},
                        { name: "View", id: 167 ,text:"l1_selection.view"},
                        { name: "Delete", id: 168 ,text:"l1_selection.delete"},
                        { name: "Bill Print", id: 169 ,text:"l1_selection.print"}
                      ] 
                    },
                    {
                      name: "Purchase Bill",
                      text:"purchase_bill",
                      children: [
                        { name: "Save", id: 170 ,text:"purchase_bill.save"},
                        { name: "Update", id: 171 ,text:"purchase_bill.update"},
                        { name: "View", id: 172 ,text:"purchase_bill.view"},
                        { name: "Delete", id: 173 ,text:"purchase_bill.delete"},
                        { name: "Bill Print", id: 174 ,text:"purchase_bill.print"}   
                      ] 
                    },
                    {
                      name: "Purchase Return Approval",
                      text:"purchase_return_approval",
                      children: [
                        { name: "Save", id: 175 ,text:"purchase_return_approval.save"},
                        { name: "Update", id: 176 ,text:"purchase_return_approval.update"},
                        { name: "View", id: 177 ,text:"purchase_return_approval.view"},
                        { name: "Delete", id: 178 ,text:"purchase_return_approval.delete"}, 
                        { name: "Bill Print", id: 179 ,text:"purchase_return_approval.print"}
                      ] 
                    },
                    {
                      name: "Purchase Return Note",
                      text:"purchase_return_note",
                      children: [
                        { name: "Save", id: 180 ,text:"purchase_return_note.save"},
                        { name: "Update", id: 181 ,text:"purchase_return_note.update"},
                        { name: "View", id: 183 ,text:"purchase_return_note.view"},
                        { name: "Delete", id: 184 ,text:"purchase_return_note.delete"},
                        { name: "Bill Print", id: 185 ,text:"purchase_return_note.print"}
  
                      ] 
                    },
                    {
                      name: "Debit Note",
                      text:"debit_note",
                      children: [
                        { name: "Save", id: 186 ,text:"debit_note.save"},
                        { name: "Update", id: 187 ,text:"debit_note.update"},
                        { name: "View", id: 188 ,text:"debit_note.view"},
                        { name: "Delete", id: 189 ,text:"debit_note.delete"},
                        { name: "Bill Print", id: 190 ,text:"debit_note.print"}
                      ] 
                    }
                  ];

          const TREE_DATA9: VehicleNode[] = [
               {
                      name: "Tag Advice With PO",
                      text:"tag_advice_with_po",
                      children: [
                        { name: "Save", id: 191 ,text:"tag_advice_with_po.save"},
                        { name: "Update", id: 192 ,text:"tag_advice_with_po.update"},
                        { name: "View", id: 193 ,text:"tag_advice_with_po.view"},
                        { name: "Delete", id: 194 ,text:"tag_advice_with_po.delete"},
                        { name: "Bill Print", id: 195 ,text:"tag_advice_with_po.print"}  
                      ] 
                    },
                    {
                      name: "Unload Advice",
                      text:"unload_advice",
                      children: [
                        { name: "Save", id: 196 ,text:"unload_advice.save"},
                        { name: "Update", id: 197 ,text:"unload_advice.update"},
                        { name: "View", id: 198 ,text:"unload_advice.view"},
                        { name: "Delete", id: 199 ,text:"unload_advice.delete"},
                        { name: "Bill Print", id: 200 ,text:"unload_advice.print"}
                      ] 
                    },
                    {
                      name: "Weightment",
                      text:"weightment",
                      children: [
                        { name: "Save", id: 201 ,text:"weightment.save"},
                        { name: "Update", id: 202 ,text:"weightment.update"},
                        { name: "View", id: 203 ,text:"weightment.view"},
                        { name: "Delete", id: 204 ,text:"weightment.delete"},
                        { name: "Bill Print", id: 205 ,text:"weightment.print"}
                      ] 
                    },
                    {
                      name: "Loading Advice",
                      text:"loading_advice",
                      children: [
                        { name: "Save", id: 204 ,text:"loading_advice.save"},
                        { name: "Update", id: 205 ,text:"loading_advice.update"},
                        { name: "View", id: 206 ,text:"loading_advice.view"},
                        { name: "Delete", id: 207 ,text:"loading_advice.delete"},
                        { name: "Bill Print", id: 208 ,text:"loading_advice.print"}
                      ] 
                    }
                  ];

          const TREE_DATA10: VehicleNode[] = [
               {
                      name: "Sales Enquiry",
                      text:"sales_enquiry",
                      children: [
                        { name: "Save", id: 209 ,text:"sales_enquiry.save"},
                        { name: "Update", id: 210 ,text:"sales_enquiry.update"},
                        { name: "View", id: 211 ,text:"sales_enquiry.view"},
                        { name: "Delete", id: 212 ,text:"sales_enquiry.delete"},
                        { name: "Bill Print", id: 213 ,text:"sales_enquiry.print"}
                      ] 
                    },
                    {
                      name: "Sales Quotation",
                      text:"sales_quotation",
                      children: [
                        { name: "Save", id: 214 ,text:"sales_quotation.save"},
                        { name: "Update", id: 215 ,text:"sales_quotation.update"},
                        { name: "View", id: 216 ,text:"sales_quotation.view"},
                        { name: "Delete", id: 217 ,text:"sales_quotation.delete"},
                        { name: "Bill Print", id: 218 ,text:"sales_quotation.print"}
                      ] 
                    },
                    {
                      name: "Sales Order",
                      text:"sales_order",
                      children: [
                        { name: "Save", id: 219 ,text:"sales_order.save"},
                        { name: "Update", id: 220 ,text:"sales_order.update"},
                        { name: "View", id: 221 ,text:"sales_order.view"},
                        { name: "Delete", id: 222 ,text:"sales_order.delete"},
                        { name: "Bill Print", id: 223 ,text:"sales_order.print"}   
                      ] 
                    },
                    {
                      name: "Delivery Challan",
                      text:"delivery_challan",
                      children: [
                        { name: "Save", id: 224 ,text:"delivery_challan.save"},
                        { name: "Update", id: 225 ,text:"delivery_challan.update"},
                        { name: "View", id: 226 ,text:"purchase_enquiry.view"},
                        { name: "Delete", id: 227 ,text:"delivery_challan.delete"},
                        { name: "Bill Print", id: 228 ,text:"delivery_challan.print"}
                      ] 
                    },
                    {
                      name: "Sales Invoice",
                      text:"sales_invoice",
                      children: [
                        { name: "Save", id: 229 ,text:"sales_invoice.save"},
                        { name: "Update", id: 230 ,text:"sales_invoice.update"},
                        { name: "View", id: 231 ,text:"sales_invoice.view"},
                        { name: "Delete", id: 232 ,text:"sales_invoice.delete"},
                        { name: "Bill Print", id: 234 ,text:"sales_invoice.print"} 
                      ] 
                    },
                    {
                      name: "Return Appoval Note",
                      text:"return_approval_note",
                      children: [
                        { name: "Save", id: 235 ,text:"return_approval_note.save"},
                        { name: "Update", id: 236 ,text:"return_approval_note.update"},
                        { name: "View", id: 237 ,text:"return_approval_note.view"},
                        { name: "Delete", id: 238 ,text:"return_approval_note.delete"},
                        { name: "Bill Print", id: 239 ,text:"return_approval_note.print"}
                      ] 
                    },
                    {
                      name: "Sales Return Note",
                      text:"sales_return_note",
                      children: [
                        { name: "Save", id: 240 ,text:"sales_return_note.save"},
                        { name: "Update", id: 241 ,text:"sales_return_note.update"},
                        { name: "View", id: 242 ,text:"sales_return_note.view"},
                        { name: "Delete", id: 243 ,text:"sales_return_note.delete"},
                        { name: "Bill Print", id: 245 ,text:"sales_return_note.print"}  
                      ] 
                    },
                    {
                      name: "Credit Note",
                      text:"credit_note",
                      children: [
                        { name: "Save", id: 246 ,text:"credit_note.save"},
                        { name: "Update", id: 247 ,text:"credit_note.update"},
                        { name: "View", id: 248 ,text:"credit_note.view"},
                        { name: "Delete", id: 249 ,text:"credit_note.delete"},
                        { name: "Bill Print", id: 250 ,text:"credit_note.print"}
                      ] 
                    },
                    {
                      name: "Gate pass",
                      text:"gate_pass",
                      children: [
                        { name: "Save", id: 251 ,text:"gate_pass.save"},
                        { name: "Update", id: 252 ,text:"gate_pass.update"},
                        { name: "View", id: 253 ,text:"gate_pass.view"},
                        { name: "Delete", id: 254 ,text:"gate_pass.delete"},
                        { name: "Bill Print", id: 255 ,text:"gate_pass.print"} 
                      ] 
                    }
                  ];

           const TREE_DATA11: VehicleNode[] = [
               {
                      name: "Process Master",
                      text:"process_master",
                      children: [
                        { name: "Save", id: 256 ,text:"process_master.save"},
                        { name: "Update", id: 257 ,text:"process_master.update"},
                        { name: "View", id: 258 ,text:"process_master.view"},
                        { name: "Delete", id: 259 ,text:"process_master.delete"},
                        { name: "Bill Print", id: 260 ,text:"process_master.print"}
                      ] 
                    },
                    {
                      name: "Bom Master",
                      text:"bom_master",
                      children: [
                        { name: "Save", id: 261 ,text:"bom_master.save"},
                        { name: "Update", id: 262 ,text:"bom_master.update"},
                        { name: "View", id: 263 ,text:"bom_master.view"},
                        { name: "Delete", id: 264 ,text:"bom_master.delete"},
                        { name: "Bill Print", id: 265 ,text:"bom_master.print"}  
                      ] 
                    },
                    {
                      name: "Production Planning",
                      text:"production_planning",
                      children: [
                        { name: "Save", id: 266 ,text:"production_planning.save"},
                        { name: "Update", id: 267 ,text:"production_planning.update"},
                        { name: "View", id: 268 ,text:"production_planning.view"},
                        { name: "Delete", id: 269 ,text:"production_planning.delete"},
                        { name: "Bill Print", id: 270 ,text:"production_planning.print"}  
                      ] 
                    },
                    {
                      name: "Production Transaction(Reg)",
                      text:"production_transaction_reg",
                      children: [
                        { name: "Save", id: 271 ,text:"production_transaction_reg.save"},
                        { name: "Update", id: 272 ,text:"production_transaction_reg.update"},
                        { name: "View", id: 273 ,text:"production_transaction_reg.view"},
                        { name: "Delete", id: 274 ,text:"production_transaction_reg.delete"},
                        { name: "Bill Print", id: 275 ,text:"production_transaction_reg.print"}  
                      ] 
                    },
                    {
                      name: "Production Transaction(Spc)",
                      text:"production_transaction_spc",
                      children: [
                        { name: "Save", id: 276 ,text:"production_transaction_spc.save"},
                        { name: "Update", id: 277 ,text:"production_transaction_spc.update"},
                        { name: "View", id: 278 ,text:"production_transaction_spc.view"},
                        { name: "Delete", id: 279 ,text:"production_transaction_spc.delete"},
                        { name: "Bill Print", id: 280 ,text:"production_transaction_spc.print"}   
                      ] 
                    },
                    {
                      name: "Stock Transfer Indent",
                      text:"stock_transfer_indent",
                      children: [
                        { name: "Save", id: 281 ,text:"stock_transfer_indent.save"},
                        { name: "Update", id: 282 ,text:"stock_transfer_indent.update"},
                        { name: "View", id: 283 ,text:"stock_transfer_indent.view"},
                        { name: "Delete", id: 284 ,text:"stock_transfer_indent.delete"},
                        { name: "Bill Print", id: 285 ,text:"stock_transfer_indent.print"}  
                      ] 
                    }
                  ];

          const TREE_DATA12: VehicleNode[] = [
               {
                      name: "Stock Transfer Order",
                      text:"stock_transfer_order",
                      children: [
                        { name: "Save", id: 286 ,text:"stock_transfer_order.save"},
                        { name: "Update", id: 287 ,text:"stock_transfer_order.update"},
                        { name: "View", id: 288 ,text:"stock_transfer_order.view"},
                        { name: "Delete", id: 289 ,text:"stock_transfer_order.delete"},
                        { name: "Bill Print", id: 290 ,text:"stock_transfer_order.print"} 
                      ] 
                    },
                    {
                      name: "Stock Transfer Challan",
                      text:"stock_transfer_challan",
                      children: [
                        { name: "Save", id: 291 ,text:"stock_transfer_challan.save"},
                        { name: "Update", id: 292 ,text:"stock_transfer_challan.update"},
                        { name: "View", id: 293 ,text:"stock_transfer_challan.view"},
                        { name: "Delete", id: 294 ,text:"stock_transfer_challan.delete"},
                        { name: "Bill Print", id: 295 ,text:"stock_transfer_challan.print"}  
                      ] 
                    },
                    {
                      name: "Stock Transfer Pur Inv",
                      text:"stock_transfer_pur_inv",
                      children: [
                        { name: "Save", id: 296 ,text:"stock_transfer_pur_inv.save"},
                        { name: "Update", id: 297 ,text:"stock_transfer_pur_inv.update"},
                        { name: "View", id: 298 ,text:"stock_transfer_pur_inv.view"},
                        { name: "Delete", id: 299 ,text:"stock_transfer_pur_inv.delete"},
                        { name: "Bill Print", id: 300 ,text:"stock_transfer_pur_inv.print"}  
                      ] 
                    },
                    {
                      name: "Stock Transfer Sales Inv",
                      text:"stock_transfer_sales_inv",
                      children: [
                        { name: "Save", id: 301 ,text:"stock_transfer_sales_inv.save"},
                        { name: "Update", id: 302 ,text:"stock_transfer_sales_inv.update"},
                        { name: "View", id: 303 ,text:"stock_transfer_sales_inv.view"},
                        { name: "Delete", id: 304 ,text:"stock_transfer_sales_inv.delete"},
                        { name: "Bill Print", id: 305 ,text:"stock_transfer_sales_inv.print"},
                        { name: "Bill Posting", id: 3005 ,text:"stock_transfer_sales_inv.posting"} 
                      ] 
                    },
                    {
                      name: "Stock Transfer GRN",
                      text:"stock_transfer_grn",
                      children: [
                        { name: "Save", id: 306 ,text:"stock_transfer_grn.save"},
                        { name: "Update", id: 307 ,text:"stock_transfer_grn.update"},
                        { name: "View", id: 308 ,text:"stock_transfer_grn.view"},
                        { name: "Delete", id: 309 ,text:"stock_transfer_grn.delete"},
                        { name: "Bill Print", id: 310 ,text:"stock_transfer_grn.print"}  
                      ] 
                    }
                  ];
          const TREE_DATA13: VehicleNode[] = [
                    {
                           name: "Gate Pass Check List",
                           text:"gate_pass_check_list",
                           children: [
                             { name: "Save", id: 311 ,text:"gate_pass_check_list.save"},
                             { name: "Update", id: 312 ,text:"gate_pass_check_list.update"},
                             { name: "View", id: 312 ,text:"gate_pass_check_list.view"},
                             { name: "Delete", id: 314 ,text:"gate_pass_check_list.delete"},
                             { name: "Bill Print", id: 315 ,text:"gate_pass_check_list.print"} 
                           ] 
                         },
                         {
                           name: "Gate In",
                           text:"gate_in",
                           children: [
                             { name: "Save", id: 316 ,text:"gate_in.save"},
                             { name: "Update", id: 317 ,text:"gate_in.update"},
                             { name: "View", id: 318 ,text:"gate_in.view"},
                             { name: "Delete", id: 319 ,text:"gate_in.delete"},
                             { name: "Bill Print", id: 320 ,text:"gate_in.print"}  
                           ] 
                         },
                         {
                           name: "Gate out Authorization",
                           text:"gate_out_authorization",
                           children: [
                             { name: "Save", id: 321 ,text:"gate_out_authorization.save"},
                             { name: "Update", id: 322 ,text:"gate_out_authorization.update"},
                             { name: "View", id: 323 ,text:"gate_out_authorization.view"},
                             { name: "Delete", id: 324 ,text:"gate_out_authorization.delete"},
                             { name: "Bill Print", id: 325 ,text:"gate_out_authorization.print"}  
                           ] 
                         },
                         {
                           name: "Gate Pass Gate Out",
                           text:"gate_pass_gate_out",
                           children: [
                             { name: "Save", id: 326 ,text:"gate_pass_gate_out.save"},
                             { name: "Update", id: 327 ,text:"gate_pass_gate_out.update"},
                             { name: "View", id: 328 ,text:"gate_pass_gate_out.view"},
                             { name: "Delete", id: 329 ,text:"gate_pass_gate_out.delete"},
                             { name: "Bill Print", id: 330 ,text:"gate_pass_gate_out.print"}
                           ] 
                         },
                         {
                           name: "Visitor Master",
                           text:"visitor_master",
                           children: [
                             { name: "Save", id: 331 ,text:"visitor_master.save"},
                             { name: "Update", id: 332 ,text:"visitor_master.update"},
                             { name: "View", id: 333 ,text:"visitor_master.view"},
                             { name: "Delete", id: 334 ,text:"visitor_master.delete"},
                             { name: "Bill Print", id: 335 ,text:"visitor_master.print"}  
                           ] 
                         }
                       ];
             const TREE_DATA14: VehicleNode[] = [
               {
                      name: "Sales/Purchase Report",
                      text:"sales_purchase_report",
                      children: [
                        { name: "Save", id: 311 ,text:"sales_purchase_report.save"},
                        { name: "Delete", id: 312 ,text:"sales_purchase_report.delete"}  
                      ] 
                    },
                    {
                      name: "Power Cut",
                      text:"power_cut",
                      children: [
                        { name: "Save", id: 336 ,text:"power_cut.save"},
                        { name: "Update", id: 337 ,text:"power_cut.update"},
                        { name: "View", id: 338 ,text:"power_cut.view"},
                        { name: "Delete", id: 339 ,text:"power_cut.delete"},
                        { name: "Print", id: 340 ,text:"power_cut.print"}  
                      ] 
                    }
                  ];  
        const TREE_DATA15: VehicleNode[] = [
          {
                  name: "Store Floor Access",
                  text:"shop_floor_access",
                  children: [
                    { name: "Save", id: 400 ,text:"shop_floor_access.save"},
                    { name: "Update", id: 401 ,text:"shop_floor_access.update"},  
                    { name: "View", id: 402 ,text:"shop_floor_access.view"}, 
                    { name: "Delete", id: 403 ,text:"shop_floor_access.delete"} 
                  ] 
                },
                {
                  name: "Store Dashboard",
                  text:"store_dashboard",
                  children: [
                    { name: "Save", id: 404 ,text:"store_dashboard.save"},
                    { name: "Update", id: 405 ,text:"store_dashboard.update"},  
                    { name: "View", id: 406 ,text:"store_dashboard.view"}, 
                    { name: "Delete", id: 407 ,text:"store_dashboard.delete"}  
                  ] 
                },
                {
                  name: "Requisition",
                  text:"requisition",
                  children: [
                    { name: "Save", id: 408 ,text:"requisition.save"},
                    { name: "Update", id: 409 ,text:"requisition.update"},  
                    { name: "View", id: 410 ,text:"requisition.view"}, 
                    { name: "Delete", id: 411 ,text:"requisition.delete"}  
                  ] 
                },
                {
                  name: "View Store",
                  text:"view_store",
                  children: [
                    { name: "Save", id: 412 ,text:"view_store.save"},
                    { name: "Update", id: 413 ,text:"view_store.update"},  
                    { name: "View", id: 414 ,text:"view_store.view"}, 
                    { name: "Delete", id: 415 ,text:"view_store.delete"}  
                  ] 
                }
              ];   

@Component({
  selector: 'app-new-user-role',
  templateUrl: './new-user-role.component.html',
  styleUrls: ['./new-user-role.component.scss']
})

export class NewUserRoleComponent implements OnInit {
  
  model:userAccess =new userAccess();
  public userForm: FormGroup;
  status:any;
  Id:any;
  RoleList:any=[];
  


  constructor(fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master, )
   {
    this.userForm=fb.group({ 
    
      reporttype:[''],
      id: [''], 
      item_master: [''], 
      supplier_master:[''],
      cusromer_master:[''],
      broker_master:[''],
      other_partner_master:[''],
      other_master:[''],
      mislenious_master:[''],
      purchase_inventory:[''],
      weighment:[''],
      sales_transaction:[''],
      production_module:[''],
      stock_transfer:[''],
      gate_pass:[''],
      sales_pur_report:[''],
      stock_transaction:[''],
      user_role:[''],
      parent_role_id:[''],
      role_id:[''],
      name:[''],
     
       });

    }
      
    get reporttype(){return this.userForm.get("reporttype") as FormControl }


    ngOnInit() {

      this.status =true;
      
      this.dataSource.data = TREE_DATA;
      Object.keys(this.dataSource.data).forEach((x) => {
       this.setParent(this.dataSource.data[x], null);      
     });

     this.dataSource2.data = TREE_DATA2;
     Object.keys(this.dataSource2.data).forEach((x) => {
      this.setParent(this.dataSource2.data[x], null);     
    });

    this.dataSource3.data = TREE_DATA3;
    Object.keys(this.dataSource3.data).forEach((x) => {
     this.setParent(this.dataSource3.data[x], null); 
   });

   this.dataSource4.data = TREE_DATA4;
    Object.keys(this.dataSource4.data).forEach((x) => {
     this.setParent(this.dataSource4.data[x], null);
   });

   this.dataSource5.data = TREE_DATA5;
    Object.keys(this.dataSource5.data).forEach((x) => {
     this.setParent(this.dataSource5.data[x], null);  
   });

   this.dataSource6.data = TREE_DATA6;
    Object.keys(this.dataSource6.data).forEach((x) => {
     this.setParent(this.dataSource6.data[x], null); 
   });

   this.dataSource7.data = TREE_DATA7;
    Object.keys(this.dataSource7.data).forEach((x) => {
     this.setParent(this.dataSource7.data[x], null);  
   });
      
   this.dataSource8.data = TREE_DATA8;
    Object.keys(this.dataSource8.data).forEach((x) => {
     this.setParent(this.dataSource8.data[x], null);  
   });

   this.dataSource9.data = TREE_DATA9;
    Object.keys(this.dataSource9.data).forEach((x) => {
     this.setParent(this.dataSource9.data[x], null);  
   });
      
   this.dataSource10.data = TREE_DATA10;
    Object.keys(this.dataSource10.data).forEach((x) => {
     this.setParent(this.dataSource10.data[x], null);  
   });

   this.dataSource11.data = TREE_DATA11;
    Object.keys(this.dataSource11.data).forEach((x) => {
     this.setParent(this.dataSource11.data[x], null);  
   });
      
   this.dataSource12.data = TREE_DATA12;
    Object.keys(this.dataSource12.data).forEach((x) => {
     this.setParent(this.dataSource12.data[x], null);  
   });

   this.dataSource13.data = TREE_DATA13;
    Object.keys(this.dataSource13.data).forEach((x) => {
     this.setParent(this.dataSource13.data[x], null);  
   });

   this.dataSource14.data = TREE_DATA14;
    Object.keys(this.dataSource14.data).forEach((x) => {
     this.setParent(this.dataSource14.data[x], null);  
   });

   this.dataSource15.data = TREE_DATA15;
    Object.keys(this.dataSource15.data).forEach((x) => {
     this.setParent(this.dataSource15.data[x], null);  
   });

   this.DropDownListService.getroles().subscribe(data=>{this.RoleList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
   this.ngOnInit()});

 };
 

     public treeControl = new NestedTreeControl<VehicleNode>(node => node.children);
    
    
    
     public dataSource = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource2 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource3 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource4 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource5 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource6 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource7 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource8 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource9 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource10 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource11 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource12 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource13 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource14 = new MatTreeNestedDataSource<VehicleNode>();
     public dataSource15 = new MatTreeNestedDataSource<VehicleNode>();
     
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


    public submit() {
     
     
      let result = [];
      this.dataSource.data.forEach((node) => {
        result = result.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result//"+result);
      this.userForm.patchValue({item_master:result.toString()});
      
      let result2 = [];
      this.dataSource2.data.forEach((node) => {
        result2 = result2.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
     // console.log("result2//"+result2);
      this.userForm.patchValue({supplier_master:result2.toString()});

      let result3 = [];
      this.dataSource3.data.forEach((node) => {
        result3 = result3.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result3//"+result3);
      this.userForm.patchValue({cusromer_master:result3.toString()});

      let result4 = [];
      this.dataSource4.data.forEach((node) => {
        result4 = result4.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result4//"+result4);
      this.userForm.patchValue({broker_master:result4.toString()});
      
      let result5 = [];
      this.dataSource5.data.forEach((node) => {
        result5 = result5.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result5//"+result5);
      this.userForm.patchValue({other_partner_master:result5.toString()});

      let result6 = [];
      this.dataSource6.data.forEach((node) => {
        result6 = result6.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result6//"+result6);
      this.userForm.patchValue({other_master:result6.toString()});

      let result7 = [];
      this.dataSource7.data.forEach((node) => {
        result7 = result7.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result7//"+result7);
      this.userForm.patchValue({mislenious_master:result7.toString()});

      let result8 = [];
      this.dataSource8.data.forEach((node) => {
        result8 = result8.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result8//"+result8);
      this.userForm.patchValue({purchase_inventory:result8.toString()});

      let result9 = [];
      this.dataSource9.data.forEach((node) => {
        result9 = result9.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result9//"+result9);
      this.userForm.patchValue({weighment:result9.toString()});

      let result10 = [];
      this.dataSource10.data.forEach((node) => {
        result10 = result10.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result10//"+result10);
      this.userForm.patchValue({sales_transaction:result10.toString()});

      let result11 = [];
      this.dataSource11.data.forEach((node) => {
        result11 = result11.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result11//"+result11);
      this.userForm.patchValue({production_module:result11.toString()});

      let result12 = [];
      this.dataSource12.data.forEach((node) => {
        result12 = result12.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result12//"+result12);
      this.userForm.patchValue({stock_transfer:result12.toString()});

      let result13 = [];
      this.dataSource13.data.forEach((node) => {
        result13 = result13.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
     // console.log("result13//"+result13);
      this.userForm.patchValue({gate_pass:result13.toString()});

      let result14 = [];
      this.dataSource14.data.forEach((node) => {
        result14 = result14.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result14//"+result14);
      this.userForm.patchValue({sales_pur_report:result14.toString()});

      let result15 = [];
      this.dataSource15.data.forEach((node) => {
        result15 = result15.concat(
          this.treeControl
            .getDescendants(node)
            .filter((x) => x.selected && x.name)
            .map((x) => x.text)
        );
      });
      //console.log("result15//"+result15);
      this.userForm.patchValue({stock_transaction:result15.toString()});

      this.Id= this.userForm.get("id").value as FormControl;
      if(this.Id!="")
      {

      }
      else
      {
        this.Service.createUserRoleAccess(this.userForm.getRawValue()).subscribe(data => 
          {
                 alert("New User Role Access created successfully.");
                 this.userForm.reset();
                 this.status = true;
               //  .collapseAll()
                  window.location.reload();
                 this.ngOnInit();
                
               }, (error) => 
               {
                 this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                 alert("something error is occured please try again....");
                 window.location.reload();
                 this.userForm.reset();
             this.ngOnInit()
           });
  
      }
      }
      
   
}
