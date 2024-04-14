import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurReturnApprovalNote, pur_return_approval_item_dtls} from '../../../../../../models/transaction/PurchaseTransaction/pur-return-approval-note';

  @Component({
    selector: 'app-pur-return-approval-note-pop-up',
    templateUrl: './pur-return-approval-note-pop-up.component.html',
    styleUrls: ['./pur-return-approval-note-pop-up.component.scss']})

  export class PurReturnApprovalNotePopUpComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    b_unit:any;
    supplierId:any;
    date:any;
    fin_year:any;
    companyId:any;
    purReturn_id = "0";
    status = false;
    callingFileName:any;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PurReturnApprovalNotePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        purreturnid: [''],
        pur_return_approval_item_dtls: this.fb.array([this.fb.group({
          checkbox: '',
          itemcode: '',
          itemname: '',
          packing: '',
          packingname: '',
          quantity: '',
          uom: '',
          squantity: '',
          suom: '',
          matwt: '',
          price: '',
          pricebasedon: '',
          amount: '',
          discounttype: '',
          discountrate: '',
          discountamt: '',
          taxcode: '',
          taxrate: '',
          taxamt: '',
          totalamt: '',
          accnorms: '',
          net_amount:'',	
          qc_deduction :'',
          net_amt_after_qc :'',
          gross_amt:'',
          })]),
        });
        this.b_unit = data["b_unit"];
        this.supplierId = data["supplier"];
        this.date = data["date"];
        this.fin_year = data["fin_year"];
        this.companyId = data["company_id"];
        this.callingFileName = data["file_name"];
    }
     
    get pur_return_approval_item_dtls(){{ return this.userForm1.get('pur_return_approval_item_dtls') as FormArray;}}
  
    ngOnInit() 
    {
      this.status = false;
      if(this.callingFileName == 'Purchase Return Note') 
      {
        this.DropDownListService.getPurRtnAppNoteThruWe("bunit="+this.b_unit+"&supplier="+this.supplierId+
        "&tdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data=>
        {
          this.list  = data;
          this.status = true;
        });
      }
      else if(this.callingFileName == 'Debit Note')
      {
        this.DropDownListService.getPurRtnAppNoteLowRate("bunit="+this.b_unit+"&supplier="+this.supplierId+
        "&tdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data=>
        {
          this.list  = data;
          this.status = true;
        });
      }
    }
     
    add()
    {
      this.pur_return_approval_item_dtls.push(this.fb.group({
        checkbox: '',
        itemcode: '',
        itemname: '',
        packing: '',
        packingname: '',
        quantity: '',
        uom: '',
        squantity: '',
        suom: '',
        matwt: '',
        price: '',
        pricebasedon: '',
        amount: '',
        discounttype: '',
        discountrate: '',
        discountamt: '',
        taxcode: '',
        taxrate: '',
        taxamt: '',
        totalamt: '',
        accnorms: '',
        net_amount:'',	
        qc_deduction :'',
        net_amt_after_qc :'',
        gross_amt:'',}));
    }
    
    check1(purReturnList:PurReturnApprovalNote)
    {
      this.status = false;
      this.purReturn_id = purReturnList.purreturnid;
      this.DropDownListService.getPurReturnAppID(this.purReturn_id).subscribe(data=>
      {
        while (this.pur_return_approval_item_dtls.length ) 
        {this.pur_return_approval_item_dtls.removeAt(0);}
        for(let i=0;i<data.length;i++)
        {this.add(); }
        this.pur_return_approval_item_dtls.patchValue(data);
        this.status = true;
      });
    }
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({purreturnid: this.purReturn_id})
      this.userForm1.patchValue(this.pur_return_approval_item_dtls.value)
      this.dialogRef.close(this.userForm1.value);  
    }
  }


