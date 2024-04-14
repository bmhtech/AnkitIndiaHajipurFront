import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PurchaseGRN, ReceiptItemDetails } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseGRN';

@Component({
  selector: 'app-grn-return-popup',
  templateUrl: './grn-return-popup.component.html',
  styleUrls: ['./grn-return-popup.component.scss']
})
export class GrnReturnPopupComponent implements OnInit {

  public userForm:FormGroup;
  grnList:any=[];
  check:any;
  grnId = '0';
  item_type:any;
  item_sub_type:any;
  b_unit:any;
  supplierId:any;
  date:any;
  fin_year:any;
  companyId:any;
  callingFile:any;
  status = false;


  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<GrnReturnPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
  {
    this.userForm=fb.group(
    {
      grn_id: [''],
      pur_good_receipt_item_details: this.fb.array([this.fb.group({
      slno:'',
      adv_item_code:'',
      adv_packing_name:'',
      adv_item_name:'',
      adv_packing:'',
      adv_pack_qty:'',
      adv_pack_uom:'',
      adv_item_qty:'',
      adv_mat_wt:'',
      adv_item_uom:'',
      rcv_pack_qty:'',
      rcv_pack_uom:'',
      rcv_item_qty:'',
      rcv_mat_wt:'',
      rcv_item_uom:'',
      pssd_pack_qty:'',
      pssd_pack_uom:'',
      pssd_item_qty:'',
      pssd_mat_wt:'',
      pssd_item_uom:'',
      unit_rate: '',
      price_based_on: '',	
      amount: '', 
      discount:'',
      discount_based_on:'',
      discount_amt:'',
      net_amt:'',
      qc_deduction: '',
      net_amt_after_qc: '',
      tax_code: '',
      tax_rate:'',	
      tax_amt:'',
      gross_amt:'',
      qc_norms:'',
      warehouse_name:'',	
      rack:'',
      stack_uom:'',
      stack_qty:'',
      checkbox:''
      })]),
    });

    this.item_type = data["item_type"];
    this.item_sub_type = data["item_sub_type"];
    this.b_unit = data["bunit"];
    this.supplierId = data["supplier_id"];
    this.date = data["date"];
    this.fin_year = data["fin_year"];
    this.companyId = data["company_id"];
    this.callingFile = data["file_name"]
  }

   get pur_good_receipt_item_details(){{ return this.userForm.get('pur_good_receipt_item_details') as FormArray;}}

  ngOnInit() 
  {
    this.status = false;
    // if(this.callingFile == "PurchaseBill")
    // {
    //   this.DropDownListService.getPurGoodRcptThruSupp(this.supplierId, this.item_sub_type).subscribe(data=>
    //   {
    //     this.grnList  = data;
    //     this.status = true;
    //   });
    // }
    if(this.callingFile == "PurchaseReturnApproval")
    {
      this.DropDownListService.getPurGRptRtnApp("type="+this.item_type+"&itemtype="
        +this.item_sub_type+"&bunit="+this.b_unit+"&supplier="+this.supplierId+"&tdate="
        +this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data=>
      {
        this.grnList  = data;
        this.status = true;
      });
    }
     
  }

  add()
  {
    this.pur_good_receipt_item_details.push(this.fb.group({
      slno:'',
      adv_item_code:'',
      adv_item_name:'',
      adv_packing_name:'',
      adv_packing:'',
      adv_pack_qty:'',
      adv_pack_uom:'',
      adv_item_qty:'',
      adv_mat_wt:'',
      adv_item_uom:'',
      rcv_pack_qty:'',
      rcv_pack_uom:'',
      rcv_item_qty:'',
      rcv_mat_wt:'',
      rcv_item_uom:'',
      pssd_pack_qty:'',
      pssd_pack_uom:'',
      pssd_item_qty:'',
      pssd_mat_wt:'',
      pssd_item_uom:'',
      unit_rate: '',
      price_based_on: '',	
      amount: '', 
      discount:'',
      discount_based_on:'',
      discount_amt:'',
      net_amt:'',
      qc_deduction: '',
      net_amt_after_qc: '',
      tax_code: '',
      tax_rate:'',	
      tax_amt:'',
      gross_amt:'',
      qc_norms:'',
      warehouse_name:'',	
      rack:'',
      stack_uom:'',
      stack_qty:'',
      checkbox:''
    }))
  }

  check1(Grnlist:ReceiptItemDetails)
  {
    this.grnId = Grnlist.grn_id;
    this.status = false;
    this.DropDownListService.getPurGoodRcptItemDtlsList(this.grnId).subscribe(data=>
    {
      console.log("grn data item:"+JSON.stringify(data));
      while (this.pur_good_receipt_item_details.length ) 
      this.pur_good_receipt_item_details.removeAt(0);
      for(let i=0;i<data.length;i++)
      this.add(); 
      this.pur_good_receipt_item_details.patchValue(data);
      this.status = true;
    });
  }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({grn_id: this.grnId});
    this.userForm.patchValue(this.pur_good_receipt_item_details.value);
    this.dialogRef.close(this.userForm.value);  
  }

}
