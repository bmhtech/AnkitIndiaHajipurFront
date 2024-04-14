import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { SalesReturnNote } from '../../../../../../Models/SalesTransaction/sales-return-note';

@Component({
  selector: 'app-creditnotejobwork',
  templateUrl: './creditnotejobwork.component.html',
  styleUrls: ['./creditnotejobwork.component.scss']
})



export class CreditnotejobworkComponent implements OnInit {
  
  public userForm:FormGroup;
  date:any;
  bunit:any;
  party_id:any;
  id:any;
  showbutton:boolean=true;
  status:boolean=true;
  Main:any;
  salereturnList:any=[];
  Id:any;
  salesReturn_id:any;
  salesreturnnumber:any;
  salesreturndate:any;
  totalprice:number=0;
  returnnoteid:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<CreditnotejobworkComponent>, @Inject(MAT_DIALOG_DATA)data) 
    {
      this.userForm=fb.group(
        {
          salesreturnnoteid:[''],
          salesreturnnumber:[''],
          salesreturndate:[''],
          job_price_total: [''],
          returnnoteid:[''],
          job_details: this.fb.array([this.fb.group({
              sl_no :'', 
              job_item:'',
              job_item_name:'',
              job_packing:'',
              job_packing_name:'',
              job_hsn:'',
              pack_qty:'',
              pack_uom:'',
              price_based_on:'',
              item_qty:'',
              item_uom:'',
              mat_wt:'',
              tolerance:'',
              checkbox:'',
        })])

      });

      this.date =data["date"];
      this.bunit=data["bunit"];
      this.party_id=data["party_id"];
      this.Id =data["id"];
    }


    get job_details(){ return this.userForm.get('job_details') as FormArray;}
    add()
    {
      this.job_details.push(this.fb.group({
        sl_no :'', 
            job_item:'',
            job_item_name:'',
            job_packing:'',
            job_packing_name:'',
            job_hsn:'',
            pack_qty:'',
            pack_uom:'',
            price_based_on:'',
            item_qty:'',
            item_uom:'',
            mat_wt:'',
            tolerance:'',
            checkbox:'true',
      }))
    }


  ngOnInit() 
  {
    if(this.Id == 0)//on first time 
      {
        this.showbutton=true;
        this.DropDownListService.getSalesRtnNoteJw(this.date,this.bunit,this.party_id).subscribe(data =>
          {
            this.salereturnList  = data;
            this.status = true;
            
          });
      }
  }

  check1(salereturnList:SalesReturnNote)
  {
    console.log(JSON.stringify(salereturnList))
    this.salesReturn_id = salereturnList.salesreturnnoteid;
    this.salesreturnnumber= salereturnList.salesreturnnoteno;
    this.salesreturndate= salereturnList.salesreturnnotedate;
    this.returnnoteid=salereturnList.referance_id;
console.log("hallu tuhin "+this.returnnoteid)
    this.DropDownListService.getSalesRtnNoteJwdetails(this.salesReturn_id).subscribe(jobData=>
    {
        this.add();
          
        while (this.job_details.length) 
        this.job_details.removeAt(0);
        for(let data12 of jobData)
        {  this.add();
          this.job_details.patchValue(jobData);
        }

    })

  }

  SendDataToDifferentComponenet()
  {
    for(let k=0;k<this.job_details.length;k++)
    {
      this.totalprice+=this.job_details.at(k).get("item_qty").value
    }
  
    this.userForm.patchValue({salesreturnnoteid: this.salesReturn_id,
      salesreturnnumber:this.salesreturnnumber,
      salesreturndate:this.salesreturndate,
      returnnoteid: this.returnnoteid,
      job_price_total:this.totalprice});
    this.userForm.patchValue(this.job_details.value);
    this.dialogRef.close(this.userForm.value);  
  }


}
