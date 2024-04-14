import { Component, OnInit, Inject } from '@angular/core';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { FormBuilder } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { PurchaseGRN, ReceiptItemDetails} from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseGRN';

@Component({
  selector: 'app-grn-pop-up',
  templateUrl: './grn-pop-up.component.html',
  styleUrls: ['./grn-pop-up.component.scss']})

export class GrnPopUpComponent implements OnInit
{
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
  retstatus = false;
  retcriteria:any;
  itmtype:any;
  pursubtype:any;
  showsubmitbutton:boolean=true;
  showsubmitbutton1:boolean=true;
  checkSubmit:any= [];
  referance_type1:any;
  showbutton:boolean=true;
  checkboxcheck:boolean=false;
  supname:any;

  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<GrnPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
  {
    this.userForm=fb.group(
    {
      grn_id: [''],
      referance_type: [''],
      pur_good_receipt_item_details: this.fb.array([this.fb.group({
      slno:'',
      adv_item_code:'',
      classified_item_name:'',
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
      checkbox:'',
      tax_id:''
      })]),
    });

    this.item_type = data["item_type"];
    this.item_sub_type = data["item_sub_type"];
    this.b_unit = data["bunit"];
    this.supplierId = data["supplier_id"];
    this.date = data["date"];
    this.fin_year = data["fin_year"];
    this.companyId = data["company_id"];
    this.callingFile = data["file_name"];
    this.retcriteria=data["retcriteria"];
    this.pursubtype=data["pursubtype"];
    this.supname=data["supname"];
  }

   get pur_good_receipt_item_details(){{ return this.userForm.get('pur_good_receipt_item_details') as FormArray;}}

  ngOnInit() 
  {
    this.status = false;
    this.showbutton=true;
    if(this.callingFile == "PurchaseBill")
    {
      console.log("grn popup:"+this.supplierId +" / " + this.item_type +" / " + this.item_sub_type +" / " + this.pursubtype)

      this.DropDownListService.getPurGoodRcptThruSupp(this.supplierId,this.item_type,this.item_sub_type,this.pursubtype).subscribe(data=>
      //this.DropDownListService.getReturnApprovalPopupData(this.date,this.b_unit,this.supplierId,"GRN",this.fin_year,this.companyId).subscribe(data=>
      {
        console.log("popupdata:"+JSON.stringify(data))
        this.grnList  = data;
        this.status = true;
        this.retstatus=true;
      });
    }
    if(this.callingFile == "PurchaseReturnApproval")
    {
    //  this.DropDownListService.getPurGRptRtnApp("bunit="+this.b_unit+"&supplier="+this.supplierId+"&tdate="
      //  +this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data=>
      this.DropDownListService.getReturnApprovalPopupData(this.date,this.b_unit,this.supplierId,"GRN",this.fin_year,this.companyId).subscribe(data=>
      {
        this.grnList  = data;
        
        this.status = true;
        
        if(this.retcriteria=="Partial Return")
        {
          this.retstatus=true;
        }
      });
    }
     
  }

  add()
  {
    this.pur_good_receipt_item_details.push(this.fb.group({
      slno:'',
      adv_item_code:'',
      classified_item_name:'',
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
      cgstamt:'',
      sgstamt:'',
      igstamt:'',
      tax_amt:'',
      gross_amt:'',
      qc_norms:'',
      warehouse_name:'',	
      rack:'',
      stack_uom:'',
      stack_qty:'',
      checkbox:'true',
      tax_id:''
    }))
  }

  check1(Grnlist:PurchaseGRN)
  {
    this.showsubmitbutton=true;
    this.grnId = Grnlist.grn_id;
    this.referance_type1=Grnlist.referance_type;
    this.status = false;
    //this.DropDownListService.getPurGoodRcptItemDtlsList(this.grnId).subscribe(data=>
    this.DropDownListService.getPurGoodRcptItemDtlsListfastapi(this.grnId).subscribe(data=>
    {
      console.log("grn data item:"+JSON.stringify(data));
      while (this.pur_good_receipt_item_details.length ) 
      this.pur_good_receipt_item_details.removeAt(0);
      for(let i=0;i<data.length;i++) 
      {
        this.add();
        this.pur_good_receipt_item_details.at(i).patchValue({checkbox:true});
        this.pur_good_receipt_item_details.at(i).get("checkbox").disable();
       }
      this.pur_good_receipt_item_details.patchValue(data);
      this.status = true;
    });
  }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({grn_id: this.grnId,referance_type:this.referance_type1});
    this.userForm.patchValue(this.pur_good_receipt_item_details.value);
    
    this.dialogRef.close(this.userForm.value); 
    
     
    for(let j=0;j<this.pur_good_receipt_item_details.length;j++)
    {
    
      if(this.pur_good_receipt_item_details.at(j).get("checkbox").value==true || this.pur_good_receipt_item_details.at(j).get("checkbox").value=='true')
      {
        this.checkboxcheck=true;
      }
    }
    if(this.checkboxcheck==true)
    {
     
      this.dialogRef.close(this.userForm.getRawValue());  
    }
    else
    {
      alert("Please tick on checkbox!!!!");
    }
  } 
}
