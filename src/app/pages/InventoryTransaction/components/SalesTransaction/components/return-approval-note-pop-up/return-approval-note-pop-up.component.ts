import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ReturnApprovalNote, return_approval_Item_Dtls} from '../../../../../../Models/SalesTransaction/return-approval-note';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-return-approval-note-pop-up',
    templateUrl: './return-approval-note-pop-up.component.html',
    styleUrls: ['./return-approval-note-pop-up.component.scss']})

  export class ReturnApprovalNotePopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    salesReturnApprovalList:{};
    check:any;
    salesApproval_id = "0";
    status = false;
    party:any;
    date:any;
    companyId:any;
    b_unit:any;
    fin_year:any;
    _invoicetype:any;
    parentModel:any;
    salesreturnnumber:any;
    salesreturndate:any;
    Id:number;
    showbutton:boolean=true;
    invoicetype:any;
  
    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<ReturnApprovalNotePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        salesreturnid:[''],
        salesreturnnumber:[''],
        salesreturndate:[''],
        return_approval_Item_Dtls: this.fb.array([this.fb.group({
          itemcode:'',
          itemname: '',
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
      this._invoicetype = data["inv_type"];
      this.parentModel = data["parent_model"];
      this.Id=data["id"];
      this.invoicetype=data["invoicetype"];
    }
  
    get return_approval_Item_Dtls(){{ return this.userForm.get('return_approval_Item_Dtls') as FormArray;}}
  
    ngOnInit() 
    {
      this.status = false;
      if(this.parentModel == 'Credit Note')
      {
        if(this.Id == 0)//on first time 
        {
        this.showbutton=true;
        //alert("this.invoicetype:"+this.invoicetype)
        this.DropDownListService.getRtnAppNoteLowRate("bunit="+this.b_unit+"&party="+this.party+"&invdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year+"&invoicetype="+this.invoicetype).subscribe(data =>
        {
          this.salesReturnApprovalList  = data;
          this.status = true;
        });
      }
      else //for update
      {
          this.showbutton=false;
          this.DropDownListService.getcreditnoteapproval(this.Id).subscribe(data =>
            {
              //alert("check:"+JSON.stringify(data))
              this.salesReturnApprovalList  = data;
              this.status = true;
          let k:number=0;
            while (this.return_approval_Item_Dtls.length)
            this.return_approval_Item_Dtls.removeAt(0);
            
              this.DropDownListService.getRtnAppNoteLowRateitemdetals(this.Id).subscribe(dynamicdata =>
              {
                    for(let data1 of dynamicdata)
                    this.add(); 
                    this.return_approval_Item_Dtls.patchValue(dynamicdata);
                    this.return_approval_Item_Dtls.at(k).patchValue({checkbox:true})
              k++;
              });

          });
      }
      }
      // if(this.parentModel == 'Sales Return Note')
      // {
      //   this.DropDownListService.getReturnAppNoteThruWe("invtype="+this._invoicetype+"&bunit="+this.b_unit+"&party="+this.party+"&srdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data =>
      //   {
      //     this.salesReturnApprovalList  = data;
      //     this.status = true;
      //   });
      // }
      if(this.parentModel == 'Sales Return Note')
      {


        if(this.Id == 0)//on first time 
        {
          this.showbutton=true;
                this.DropDownListService.getReturnAppNoteThruWe("invtype="+this._invoicetype+"&bunit="+this.b_unit+"&party="+this.party+"&srdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year).subscribe(data =>
                {
                  this.salesReturnApprovalList  = data;
                  this.status = true;
                });
        }
        else//for update
        {
           this.showbutton=false;
           this.DropDownListService.getreturnapprovalnote_salesreturnupdate(this.Id).subscribe(data =>
            {
                 this.salesReturnApprovalList  = data;

                 console.log(JSON.stringify(data));
                 this.salesReturnApprovalList  = data;
                 this.status = true;
                 let k:number=0;
                 while (this.return_approval_Item_Dtls.length)
                 this.return_approval_Item_Dtls.removeAt(0);
                 this.DropDownListService.getRtnAppNoteLowRateitemdetals_returnapp(data[0]["salesreturnid"],this.Id).subscribe(dynamicdata =>
                  {
                    console.log(JSON.stringify(dynamicdata))
                        for(let data1 of dynamicdata)
                        this.add(); 
                        this.return_approval_Item_Dtls.patchValue(dynamicdata);
                        this.return_approval_Item_Dtls.at(k).patchValue({checkbox:true})
                  k++;
                  });
    



                 this.status = true;
            })

        }
           

      }
     
    }
  
    add()
    {
      this.return_approval_Item_Dtls.push(this.fb.group({
        itemcode:'',
        itemname: '',
        packing:'',
        packingname: '',
        quantity:'',
        hsn_code:'',
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
  
    check1(salesAppList:ReturnApprovalNote)
    {
      this.salesApproval_id = salesAppList.salesreturnid;
      this.salesreturnnumber= salesAppList.salesreturnno;
      this.salesreturndate= salesAppList.salesreturndate;
      this.status = false;
      while (this.return_approval_Item_Dtls.length )
      this.return_approval_Item_Dtls.removeAt(0);
      this.DropDownListService.getReturnApprovalID(this.salesApproval_id).subscribe(data=>
      {
        for(let data1 of data)
        this.add();
        this.status = true;  
        this.return_approval_Item_Dtls.patchValue(data);
       
        for(let k=0;k<this.return_approval_Item_Dtls.length;k++)
        {
         this.return_approval_Item_Dtls.at(k).patchValue({checkbox:true});
        }
      });
    }
  
    SendDataToDifferentComponenet()
    {
     //this.userForm.patchValue({salesreturnid: this.salesApproval_id});
      this.userForm.patchValue({salesreturnid: this.salesApproval_id,salesreturnnumber:this.salesreturnnumber,salesreturndate:this.salesreturndate});
      this.userForm.patchValue(this.return_approval_Item_Dtls.value);
      this.dialogRef.close(this.userForm.value);  
    }
  
  }


