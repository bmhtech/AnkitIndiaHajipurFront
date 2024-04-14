import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { SalesReturnNotePopUpComponent } from '../sales-return-note-pop-up/sales-return-note-pop-up.component';

@Component({
  selector: 'app-multiple-sales-return-popup',
  templateUrl: './multiple-sales-return-popup.component.html',
  styleUrls: ['./multiple-sales-return-popup.component.scss']
})
export class MultipleSalesReturnPopupComponent implements OnInit {

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
    finalsalesidlist:any;
    item_sl_no = 1; 
    finalsales_nolist:any;
    finalsales_datelist:any;
    checkboxcheck:boolean=false;
    singledate:any;
    invoicetype:any;
    allchno:any;

  constructor(private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<MultipleSalesReturnPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        salesreturnnoteid:[''],
        salesreturnnumber:[''],
        salesreturndate:[''],
        allsalesreturndate:[''],
        salesreturnnoterefno:[''],
        
        sales_return: this.fb.array([this.fb.group({
          salesreturnnoteno:'',
          salesreturnnotedate:'',
          checkbox:'',
          salesreturnnoteid:'',
          salesreturnnoterefno:''
        })]),

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
          taxamt:'',
          totalamt:'',
          accnorms:'',
          checkbox:'',
           salesreturnnoteno:'',
        salesreturnnoteid:''
        })]),
        
      });

      this.party = data['party_id'];
      this.companyId = data['company_id'];
      this.date = data['date'];
      this.b_unit = data['bunit'];
      this.fin_year = data['finYear'];
      this.id=data['id'];
      this.invoicetype=data['invoicetype'];
    }

    get sales_return(){{ return this.userForm.get('sales_return') as FormArray;}}
    get sales_return_note_Item_Dtls(){{ return this.userForm.get('sales_return_note_Item_Dtls') as FormArray;}}
  
    ngOnInit() 
    {
      this.status = false;
      if(this.id == 0)//on first time 
      {
        //alert("invoicetype:"+this.invoicetype+"id:"+this.id)
        this.showbutton=true;
        this.DropDownListService.getSalesRtnNote("bunit="+this.b_unit+"&party="+this.party+"&invdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year+"&invoicetype="+this.invoicetype).subscribe(data =>
          {
            console.log("chk data"+JSON.stringify(data))
                while(this.sales_return.length ) 
                this.sales_return.removeAt(0);
                for(let data1 of data)
                this.addStatic();
                this.sales_return.patchValue(data);
                this.status = true;
          });
      }
      else // on update time list fetch
      {
        this.showbutton=false;
        this.DropDownListService.getSalesRtnNoteUpdate(this.id).subscribe(data =>
          {
            while(this.sales_return.length ) 
            this.sales_return.removeAt(0);
            for(let data1 of data)
            this.addStatic();
            this.sales_return.patchValue(data);
            this.status = true;
            for(let k=0;k<this.sales_return.length;k++)
                {
                  this.sales_return.at(k).patchValue({checkbox:true})
                }
          });
          this.DropDownListService.getMultipleSalesReturnNoteitemlistUpdate(this.id).subscribe(data=> //id thourgh item detal of credit note
              {
                while (this.sales_return_note_Item_Dtls.length)
                this.sales_return_note_Item_Dtls.removeAt(0);

                for(let i=0;i<data.length;i++)
                this.addItemDetails();
                this.sales_return_note_Item_Dtls.patchValue(data);
                this.status = true; 
                for(let p=0;p<this.sales_return_note_Item_Dtls.length;p++)
                    {
                      this.sales_return_note_Item_Dtls.at(p).patchValue({checkbox:true});
                    }
              });

      }

    }

  addStatic()
  {
    this.sales_return.push(this.fb.group({
      
          salesreturnnoteno:'',
          salesreturnnotedate:'',
          checkbox:'',
          salesreturnnoteid:'',
          salesreturnnoterefno:''
    }))
  }
  addItemDetails()
    {
      this.sales_return_note_Item_Dtls.push(this.fb.group({
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
        taxamt:'',
        totalamt:'',
        accnorms:'',
        checkbox:'true',
        salesreturnnoteno:'',
        salesreturnnoteid:''
      }));
    }

    check1(index)
    {
            this.finalsalesidlist="";
            this.finalsales_nolist="";
            this.finalsales_datelist="";
            this.allchno="";

            let salesid_list="",sales_no="",sales_date="",single_date="",chno="";
            let checkstatus:boolean=false; 
            for(let i=0;i<this.sales_return.length;i++)
            {
              
              if(this.sales_return.at(i).get("checkbox").value == true || this.sales_return.at(i).get("checkbox").value == 'true')
              {
                salesid_list+=this.sales_return.at(i).get("salesreturnnoteid").value+",";
                sales_no+=this.sales_return.at(i).get("salesreturnnoteno").value+",";
                sales_date+=this.sales_return.at(i).get("salesreturnnotedate").value+",";
                single_date=this.sales_return.at(i).get("salesreturnnotedate").value;
                chno+=this.sales_return.at(i).get("salesreturnnoterefno").value+",";

                checkstatus=true;
              }
              
            }
            if(checkstatus ==false)
            {
              //console.log(" length::  "+ this.sales_return_note_Item_Dtls.length );
              while (this.sales_return_note_Item_Dtls.length)
              this.sales_return_note_Item_Dtls.removeAt(0);
              this.addItemDetails();
              this.sales_return_note_Item_Dtls.at(0).patchValue({checkbox:false})

            }
            else
            {
              this.finalsalesidlist=salesid_list.substring(0,salesid_list.length-1);
              this.finalsales_nolist=sales_no.substring(0,sales_no.length-1);
              this.finalsales_datelist=sales_date.substring(0,sales_date.length-1);
              this.allchno=chno.substring(0,chno.length-1);
              this.singledate=single_date;
              this.DropDownListService.getMultipleSalesReturnNoteitemlist(this.finalsalesidlist).subscribe(data=>
                {
                  while (this.sales_return_note_Item_Dtls.length)
                  this.sales_return_note_Item_Dtls.removeAt(0);
                  for(let data1 of data)
                  this.addItemDetails();
                  this.status = true;        
                  this.sales_return_note_Item_Dtls.patchValue(data);

                  for(let v=0;v<this.sales_return_note_Item_Dtls.length;v++)
                  {
                    this.sales_return_note_Item_Dtls.at(v).patchValue({checkbox:true})
                  }
                });
  
                  
            }
            
        
    }
    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({salesreturnnoteid: this.finalsalesidlist,salesreturnnumber:this.finalsales_nolist,allsalesreturndate:this.finalsales_datelist,salesreturndate:this.singledate,salesreturnnoterefno:this.allchno});
      this.userForm.patchValue(this.sales_return_note_Item_Dtls.value);
      for(let i=0;i<this.sales_return_note_Item_Dtls.length;i++)
       {
         if(this.sales_return_note_Item_Dtls.at(i).get("checkbox").value==true || this.sales_return_note_Item_Dtls.at(i).get("checkbox").value=='true')
         {
           this.checkboxcheck=true;
         }
       } 
       if(this.checkboxcheck == true)
       {
         this.dialogRef.close(this.userForm.getRawValue()); 
       }
       else
       {
         alert("Please tick on checkbox!!!!");
       }
      this.dialogRef.close(this.userForm.value);  
    }

   
}
