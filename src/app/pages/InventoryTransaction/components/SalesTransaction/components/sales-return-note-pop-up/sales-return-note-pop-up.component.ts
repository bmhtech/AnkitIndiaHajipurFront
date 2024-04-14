import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesReturnNote, sales_return_note_Item_Dtls} from '../../../../../../Models/SalesTransaction/sales-return-note';

  @Component({
    selector: 'app-sales-return-note-pop-up',
    templateUrl: './sales-return-note-pop-up.component.html',
    styleUrls: ['./sales-return-note-pop-up.component.scss']})

  export class SalesReturnNotePopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    salesReturnList:{};
    check:any;
    salesreturnnumber:any;
    salesreturndate:any;
    salesReturn_id = "0";
    status = false;
    party:any;
    date:any;
    companyId:any;
    b_unit:any;
    fin_year:any;
    id:number;
    showbutton:boolean=true;
    invoicetype:any;
   

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<SalesReturnNotePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        salesreturnnoteid:[''],
        salesreturnnumber:[''],
        salesreturndate:[''],
        sales_return_note_Item_Dtls: this.fb.array([this.fb.group({
          itemcode:'',
          itemname:'',
          hsn_code:'',
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
          cgstamt: '',
          sgstamt: '',
          igstamt: '',
          taxamt:'',
          totalamt:'',
          accnorms:'',
          checkbox:''
        })]),
      });

      this.party = data['party_id'];
      this.companyId = data['company_id'];
      this.date = data['date'];
      this.b_unit = data['bunit'];
      this.fin_year = data['finYear'];
      this.id=data['id'];
      this.invoicetype=data['invoicetype']
    }
  
    get sales_return_note_Item_Dtls(){{ return this.userForm.get('sales_return_note_Item_Dtls') as FormArray;}}
  
    ngOnInit() 
    {
      this.status = false;
      if(this.id == 0)//on first time 
      {
        this.showbutton=true;
        this.DropDownListService.getSalesRtnNote("bunit="+this.b_unit+"&party="+this.party+"&invdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year+"&invoicetype="+this.invoicetype).subscribe(data =>
          {
            this.salesReturnList  = data;
            this.status = true;
            
          });
      }
      else // on update time list fetch
      {
        this.showbutton=false;
        this.DropDownListService.getcreditnotepopupsalesreturn(this.id).subscribe(data =>
          {
            console.log("here" + JSON.stringify(data));
            this.salesReturnList  = data; 
            let k:number=0;
            while (this.sales_return_note_Item_Dtls.length )
            this.sales_return_note_Item_Dtls.removeAt(0);
            this.DropDownListService.getsales_creditnote(data[0]['salesreturnnoteid'],this.id).subscribe(dynamicdata =>
              {

                for(let data1 of dynamicdata)
                this.add();
                this.sales_return_note_Item_Dtls.patchValue(dynamicdata);
                this.sales_return_note_Item_Dtls.at(k).patchValue({checkbox:true})
                k++;
              });

            this.status = true;
          });
        }
    }
  
    add()
    {
      this.sales_return_note_Item_Dtls.push(this.fb.group({
        itemcode:'',
        itemname: '',
        packing:'',
        packingname: '',
        hsn_code:'',
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
        cgstamt: '',
        sgstamt: '',
        igstamt: '',
        totalamt:'',
        accnorms:'',
        checkbox:''
      }));
    }
  
    check1(salesRetList:SalesReturnNote)
    {
      this.salesReturn_id = salesRetList.salesreturnnoteid;
      this.salesreturnnumber= salesRetList.salesreturnnoteno;
      this.salesreturndate= salesRetList.salesreturnnotedate;
      this.status = false;
      while (this.sales_return_note_Item_Dtls.length )
      this.sales_return_note_Item_Dtls.removeAt(0);
      this.DropDownListService.getSalesReturnNoteID(this.salesReturn_id).subscribe(data=>
      {
        console.log("Item : "+JSON.stringify(data))
        for(let data1 of data)
        this.add();
        this.status = true;        
        this.sales_return_note_Item_Dtls.patchValue(data);
       
        for(let k=0;k<this.sales_return_note_Item_Dtls.length;k++)
        {
         this.sales_return_note_Item_Dtls.at(k).patchValue({checkbox:true});
        }
      });
     
    }
  
    SendDataToDifferentComponenet()
    {
     // this.userForm.patchValue({salesreturnnoteid: this.salesReturn_id});
      this.userForm.patchValue({salesreturnnoteid: this.salesReturn_id,salesreturnnumber:this.salesreturnnumber,salesreturndate:this.salesreturndate});
      this.userForm.patchValue(this.sales_return_note_Item_Dtls.value);
      this.dialogRef.close(this.userForm.value);  
    }
  
  }

