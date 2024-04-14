import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { MultipleSalesReturnPopupComponent } from '../multiple-sales-return-popup/multiple-sales-return-popup.component';

@Component({
  selector: 'app-multiple-return-approval-popup',
  templateUrl: './multiple-return-approval-popup.component.html',
  styleUrls: ['./multiple-return-approval-popup.component.scss']
})
export class MultipleReturnApprovalPopupComponent implements OnInit {

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
  finalreturnidlist:any;
  item_sl_no = 1; 
  finalreturn_nolist:any;
  finalreturn_datelist:any;
  checkboxcheck:boolean=false;
  singledate:any;
  salesApproval_id = "0";
  _invoicetype:any;
  parentModel:any;
  invoicetype:any;
  finalchallanno:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<MultipleSalesReturnPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
  {
    this.userForm=fb.group(
    {
      salesreturnid:[''],
      salesreturnno:[''],
      salesreturndate:[''],
      allsalesreturndate:[''],
      salesreturnrefno:[''],
      
      return_approval: this.fb.array([this.fb.group({
        salesreturnno:'',
        salesreturndate:'',
        checkbox:'',
        salesreturnid:'',
        salesreturnrefno:'',
      })]),

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
        taxamt:'',
        totalamt:'',
        accnorms:'',
        checkbox:'',
        salesreturnid:'',
        salesreturnno:''
      })]),
      
    });
    this.party = data['party_id'];
      this.companyId = data['company_id'];
      this.date = data['date'];
      this.b_unit = data['bunit'];
      this.fin_year = data['finYear'];
     // this._invoicetype = data["inv_type"];
      //this.parentModel = data["parent_model"];
      this.id=data['id'];
      this.invoicetype=data['invoicetype'];
  }

  get return_approval(){{ return this.userForm.get('return_approval') as FormArray;}}
  get return_approval_Item_Dtls(){{ return this.userForm.get('return_approval_Item_Dtls') as FormArray;}}

  addStatic()
  {
    this.return_approval.push(this.fb.group({
      
      salesreturnno:'',
      salesreturndate:'',
      checkbox:'',
      salesreturnid:'',
      salesreturnrefno:''
    }))
  }
  addItemDetails()
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
        totalamt:'',
        accnorms:'',
        checkbox:'true',
        salesreturnid:'',
        salesreturnno:''
      }));
    }
   
  ngOnInit() {
    this.status = true;
    
      if(this.id == 0)//on first time 
      {
        this.showbutton=true;
        //console.log("this.invoicetype:"+this.invoicetype);
        this.DropDownListService.getRtnAppNoteLowRate("bunit="+this.b_unit+"&party="+this.party+"&invdate="+this.date+"&company="+this.companyId+"&finyear="+this.fin_year+"&invoicetype="+this.invoicetype).subscribe(data =>
          {
            console.log("chkdata:"+JSON.stringify(data));
                while(this.return_approval.length ) 
                this.return_approval.removeAt(0);
                for(let data1 of data)
                this.addStatic();
                this.return_approval.patchValue(data);
                this.status = true;
          });
      }
      else // on update time list fetch
      {
      
        this.showbutton=false;
        //console.log("this.invoicetype:"+this.invoicetype);
        this.DropDownListService.getRtnAppNoteLowRateUpdate(this.id).subscribe(data =>
          {
                while(this.return_approval.length ) 
                this.return_approval.removeAt(0);
                for(let data1 of data)
                this.addStatic();
                this.return_approval.patchValue(data);
                this.status = true;
                //alert(this.return_approval.length)
                for(let k=0;k<this.return_approval.length;k++)
                {
                  this.return_approval.at(k).patchValue({checkbox:true})
                }
          });
           this.DropDownListService.getMultipleReturnApprovalitemlistUpdate(this.id).subscribe(data=>
            {
              while (this.return_approval_Item_Dtls.length)
                this.return_approval_Item_Dtls.removeAt(0);
              for(let data1 of data)
              this.addItemDetails();
              this.status = true;        
              this.return_approval_Item_Dtls.patchValue(data);
              for(let p=0;p<this.return_approval_Item_Dtls.length;p++)
              {
                this.return_approval_Item_Dtls.at(p).patchValue({checkbox:true});
              }
            });
      }
  }

  check1(index)
    {
            this.finalreturnidlist="";
            this.finalreturn_nolist="";
            this.finalreturn_datelist="";
            this.finalchallanno="";

            let checkstatus:boolean=false; 
            let returnid_list="",return_no="",return_date="",single_date="",challanno="";
            while (this.return_approval_Item_Dtls.length)
            this.return_approval_Item_Dtls.removeAt(0);
            for(let i=0;i<this.return_approval.length;i++)
            {
              
              if(this.return_approval.at(i).get("checkbox").value == true || this.return_approval.at(i).get("checkbox").value == 'true')
              {
                returnid_list+=this.return_approval.at(i).get("salesreturnid").value+",";
                return_no+=this.return_approval.at(i).get("salesreturnno").value+",";
                return_date+=this.return_approval.at(i).get("salesreturndate").value+",";
                single_date=this.return_approval.at(i).get("salesreturndate").value;
                challanno+=this.return_approval.at(i).get("salesreturnrefno").value+",";
                checkstatus=true;
              }
              
            }
            if(checkstatus ==false)
              {
                while (this.return_approval_Item_Dtls.length)
              this.return_approval_Item_Dtls.removeAt(0);
              this.addItemDetails();
              this.return_approval_Item_Dtls.at(0).patchValue({checkbox:false})
              }
              else
              {
                this.finalreturnidlist=returnid_list.substring(0,returnid_list.length-1);
                this.finalreturn_nolist=return_no.substring(0,return_no.length-1);
                this.finalreturn_datelist=return_date.substring(0,return_date.length-1);
                this.finalchallanno=challanno.substring(0,challanno.length-1);
                this.singledate=single_date;
                this.DropDownListService.getMultipleReturnApprovalitemlist(this.finalreturnidlist).subscribe(data=>
                  {
                    for(let data1 of data)
                    this.addItemDetails();
                    this.status = true;        
                    this.return_approval_Item_Dtls.patchValue(data);
                    for(let v=0;v<this.return_approval_Item_Dtls.length;v++)
                  {
                    this.return_approval_Item_Dtls.at(v).patchValue({checkbox:true})
                  }
                  });
    
               
              }

           
    }
    
    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({salesreturnid: this.finalreturnidlist,salesreturnno:this.finalreturn_nolist,allsalesreturndate:this.finalreturn_datelist,salesreturndate:this.singledate,salesreturnrefno:this.finalchallanno});
      this.userForm.patchValue(this.return_approval_Item_Dtls.value);
      for(let i=0;i<this.return_approval_Item_Dtls.length;i++)
       {
         if(this.return_approval_Item_Dtls.at(i).get("checkbox").value==true || this.return_approval_Item_Dtls.at(i).get("checkbox").value=='true')
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
