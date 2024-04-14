import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { ReturnApprovalNote } from '../../../../../../Models/SalesTransaction/return-approval-note';

@Component({
  selector: 'app-salereturnjobwork',
  templateUrl: './salereturnjobwork.component.html',
  styleUrls: ['./salereturnjobwork.component.scss']
})
export class SalereturnjobworkComponent implements OnInit {
   
  public userForm:FormGroup;
  date:any;
  bunit:any;
  party_id:any;
  Id:any;
  showbutton:boolean=true;
  status:boolean=true;
  Main:any;
  returnList:any=[];
  _advice_id:any;
  showsubmitbutton:boolean=true;
  showsubmitbutton1:boolean=false;
  checkSubmit:any= [];
  refid:any;
  salesApproval_id:any;
  salesreturnnumber:any;
  salesreturndate:any;

  constructor(private fb: FormBuilder,private Service: Master,
        private DropDownListService: DropdownServiceService,
        private dialogRef: MatDialogRef<SalereturnjobworkComponent>, @Inject(MAT_DIALOG_DATA)data) 
        {
          this.userForm=fb.group(
            {
              main_id: [''],
              salesreturndate: [''],
              salesreturnnumber: [''],

              job_details: this.fb.array([this.fb.group({
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
          this.Id=data['id'];

        }
        get job_details(){{ return this.userForm.get('job_details') as FormArray;}}

  ngOnInit() 
  {
      this.status=false;
      if(this.Id == 0)//on first time 
    {
     // this.DropDownListService.getSalesReturnNoteJobwork(this.date,this.bunit,this.party_id).subscribe(data =>
     this.DropDownListService.getReturnAppNoteThruWejobwork(this.date,this.bunit,this.party_id).subscribe(data =>
      {
        this.showbutton=true;
        this.returnList=data;
        this.status = true;
      });
    }
    else
    {
      this.showbutton=false;
      this.status = true;
    }
  }

  add()
  {
    this.job_details.push(this.fb.group({
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
      checkbox:'true'}))
  }

  check1(returnList:ReturnApprovalNote)
  {
    this.salesApproval_id = returnList.salesreturnid;
    this.salesreturnnumber= returnList.salesreturnno;
    this.salesreturndate= returnList.salesreturndate;
    this.status = false;
    //this.DropDownListService.retriveUnloadAdviceJobwork(this._advice_id).subscribe(data=>
    this.DropDownListService.retriveReturnAppJobwork(this.salesApproval_id).subscribe(data=>
      {
        console.log()
        while (this.job_details.length ) 
        this.job_details.removeAt(0);
        for(let i=0;i<data.length;i++)
        this.add();
        this.job_details.patchValue(data);

        this.status = true;
      });


  }

  SendDataToDifferentComponenet()
  {

    this.userForm.patchValue({main_id: this.salesApproval_id,salesreturnnumber:this.salesreturnnumber,salesreturndate:this.salesreturndate})
    this.userForm.patchValue(this.job_details.value)

      this.dialogRef.close(this.userForm.value);

     this.submitstatus();
      if(this.showsubmitbutton == true && this.showsubmitbutton1 == true)
      {
       
        this.dialogRef.close(this.userForm.value);
      }
      else
      {
      alert("Please tick on checkbox!!!!");
      }

  }

  submitstatus()
  {
    this.checkSubmit=[];
    for(let i=0;i<this.job_details.length;i++)
    {
      
      if(this.job_details.at(i).get("checkbox").value == true || this.job_details.at(i).get("checkbox").value == "true")
      {
        this.checkSubmit.push("true");
       
      }
    }
    
    if(this.checkSubmit.includes("true"))
    {
     
      this.showsubmitbutton1=true;
      
    }
  }

}
