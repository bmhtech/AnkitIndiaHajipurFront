import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ReturnApprovalNote, return_approval_Item_Dtls } from '../../../../../../Models/SalesTransaction/return-approval-note';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-sales-return-approval-note-pop-up',
    templateUrl: './sales-return-approval-note-pop-up.component.html',
    styleUrls: ['./sales-return-approval-note-pop-up.component.scss']
  })

  export class SalesReturnApprovalNotePopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    salesReturnList:any = [];
    check:any;
    salesreturn_id = "0";
    status = false;
    party:any;
    date:any;
    companyId:any;
    financialYear:any;
    bUnit:any;
    dynamicexistrow:boolean=false;
  
    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<SalesReturnApprovalNotePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        salesreturnid:[''],
        return_approval_Item_Dtls: this.fb.array([this.fb.group({
          itemcode:'',
          itemname:'',
          packing:'',
          packingname: '',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          matwt:'',
          price:'',
          pricebasedon:'',
          amount:'',
          discounttype:'',
          discountrate:'',
          discountamt: '',
          taxcode:'',
          taxrate: '',
          taxamt:'',
          totalamt:'',
          accnorms:'',
          checkbox:''
        })]),
      });

      this.party = data['customer_id'];
      this.companyId = data['company_id'];
      this.date = data['date'];
      this.financialYear = data['fin_yr'];
      this.bUnit = data['bunit'];
    }

    get return_approval_Item_Dtls(){{ return this.userForm.get('return_approval_Item_Dtls') as FormArray;}}

    ngOnInit() 
    {
      this.status = true;
      this.DropDownListService.getReturnAppNoteThruUnAdv("bunit="+this.bUnit+"&uldate="+this.date+"&company="+this.companyId+"&finyear="+this.financialYear+"&party="+this.party).subscribe(data =>
      {
        this.salesReturnList  = data;
        this.status = true;
      });
    }

    add()
    {
      this.return_approval_Item_Dtls.push(this.fb.group({
        checkbox:'',
        itemcode:'',
        itemname:'',
        packing:'',
        packingname: '',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        matwt:'',
        price:'',
        pricebasedon:'',
        amount:'',
        discounttype:'',
        discountrate:'',
        discountamt: '',
        taxcode:'',
        taxrate: '',
        taxamt:'',
        totalamt:'',
        accnorms:''
        
      }));
     // console.log(this.return_approval_Item_Dtls)
    }

    check1(salesReturnList:ReturnApprovalNote)
    {
       
      this.salesreturn_id = salesReturnList.salesreturnid;
      this.status = false;
      while (this.return_approval_Item_Dtls.length )
      this.return_approval_Item_Dtls.removeAt(0);
      let i=0;
      this.DropDownListService.getReturnApprovalID(this.salesreturn_id).subscribe(data=>
      {
       
        for(let data1 of data)
        this.add();
         this.return_approval_Item_Dtls.patchValue(data);
         this.return_approval_Item_Dtls.at(i).patchValue({checkbox:true})
        i++;
        this.status = true;  
      });
    }
  
    SendDataToDifferentComponenet()
    {
      
      this.userForm.patchValue({salesreturnid: this.salesreturn_id});
      this.userForm.patchValue(this.return_approval_Item_Dtls.value);
     
      for(let b=0;b<this.return_approval_Item_Dtls.length;b++)
      {
        if(this.return_approval_Item_Dtls.at(b).get("checkbox").value == true || this.return_approval_Item_Dtls.at(b).get("checkbox").value == 'true')
        {
          this.dynamicexistrow=true;
        }
      }

      if(this.dynamicexistrow==true)
      {
         this.dialogRef.close(this.userForm.value); 
      }
       else
      {
         alert("Please tick on checkbox!!!!");
      }
       
    }
  
  }


