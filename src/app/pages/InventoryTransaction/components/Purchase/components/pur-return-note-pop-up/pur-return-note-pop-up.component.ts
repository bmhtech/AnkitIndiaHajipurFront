import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurReturnNote, pur_return_note_Item_Dtls} from '../../../../../../models/transaction/PurchaseTransaction/pur-return-note';

  @Component({
    selector: 'app-pur-return-note-pop-up',
    templateUrl: './pur-return-note-pop-up.component.html',
    styleUrls: ['./pur-return-note-pop-up.component.scss']})

  export class PurReturnNotePopUpComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    b_unit:any;
    supplierId:any;
    date:any;
    fin_year:any;
    companyId:any;
    purReturnNote_id = "0";
    status = false;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PurReturnNotePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        purreturnnoteid: [''],
        pur_return_note_Item_Dtls: this.fb.array([this.fb.group({
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
    }
     
    get pur_return_note_Item_Dtls(){{ return this.userForm1.get('pur_return_note_Item_Dtls') as FormArray;}}
  
    ngOnInit() 
    {
      this.status = false;
      this.DropDownListService.getPurReturnNotes("bunit="+this.b_unit+"&supplier="+this.supplierId+
      "&invdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data=>
      {
        this.list  = data;
        this.status = true;
      });
    }
     
    add()
    {
      this.pur_return_note_Item_Dtls.push(this.fb.group({
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
    
    check1(purReturnNoteList:PurReturnNote)
    {
      this.status = false;
      this.purReturnNote_id = purReturnNoteList.purreturnnoteid;
      this.DropDownListService.getPurRtnNoteItemDtls(this.purReturnNote_id).subscribe(data=>
      {
        while (this.pur_return_note_Item_Dtls.length ) 
        {this.pur_return_note_Item_Dtls.removeAt(0);}
        for(let i=0;i<data.length;i++)
        {this.add(); }
        this.pur_return_note_Item_Dtls.patchValue(data);
        this.status = true;
      });
    }
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({purreturnnoteid: this.purReturnNote_id})
      this.userForm1.patchValue(this.pur_return_note_Item_Dtls.value)
      this.dialogRef.close(this.userForm1.value);  
    }
  }



