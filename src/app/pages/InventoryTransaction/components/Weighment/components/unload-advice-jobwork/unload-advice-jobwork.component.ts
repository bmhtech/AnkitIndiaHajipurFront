import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { ReturnApprovalNote } from '../../../../../../Models/SalesTransaction/return-approval-note';

@Component({
  selector: 'app-unload-advice-jobwork',
  templateUrl: './unload-advice-jobwork.component.html',
  styleUrls: ['./unload-advice-jobwork.component.scss']
})
export class UnloadAdviceJobworkComponent implements OnInit {

    public userForm:FormGroup;
      advice_date:any;
      BUnit:any;
      Party:any;
      Id:any;
      showbutton:boolean=true;
      status:boolean=true;
      Main:any;
      returnList:any=[];
 
      constructor( private fb: FormBuilder,private Service: Master,
        private DropDownListService: DropdownServiceService,
        private dialogRef: MatDialogRef<UnloadAdviceJobworkComponent>, @Inject(MAT_DIALOG_DATA)data)
      {
        this.userForm=fb.group(
        {
          main_id:[''],
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
          })]),
        });
      
        this.advice_date = data.advice_date;
        this.BUnit = data.BUnit;
        this.Party = data.Party;
        this.Id=data["Id"];
       
      }
      get job_details(){ return this.userForm.get('job_details') as FormArray;}
  
       company_name:any;
       ngOnInit() 
       {
       
         this.status = false;
         if(this.Id == 0)
         {
          
          this.showbutton=true;
          this.DropDownListService.getReturnAppNoteThruUnAdvjobwork(this.advice_date,this.BUnit,this.Party).subscribe(jobdata =>
            {
              
              this.returnList  = jobdata;
              this.status = true;
            });
         }
         else{
          this.showbutton=false;
        
         }
        
       }
   
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

       check1(returnList:ReturnApprovalNote)
       {
        this.Main=returnList.salesreturnid;
        this.status = false;
       // this.DropDownListService.deliverychallanjobworkRetriveList(this.Main).subscribe(jobData=>
       this.DropDownListService.retriveReturnAppJobwork(this.Main).subscribe(jobData=>
        {
          this.status=true;
          this.add();
          
          while (this.job_details.length) 
          this.job_details.removeAt(0);
          for(let data12 of jobData)
          {  this.add();
            this.job_details.patchValue(jobData);
          }
    
    
        });
       }
   
     SendDataToDifferentComponenet()
     {
       this.userForm.patchValue({main_id: this.Main});
       this.userForm.patchValue(this.job_details.value);
       this.dialogRef.close(this.userForm.value);  
     }
}
