import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-fumi-open-date-pop-up',
  templateUrl: './update-fumi-open-date-pop-up.component.html',
  styleUrls: ['./update-fumi-open-date-pop-up.component.scss']
})
export class UpdateFumiOpenDatePopUpComponent implements OnInit {
  public userForm:FormGroup;
  status = false;
  id:any;
  fumi_id:any;
  fumi_no:any;
  fumi_date:any;
  warehouse_name:any;
  stack:any;
  action:any;
  company:any;
  finyear:any;
  username:any;
  stack_open_date:any;
  allocate_status:any;
  pcmw_sign_name:any;
  supervisor_sign_name:any;
  lab_sign_name:any;
  manpower:any;
  degassing_date:any;
  degassing_time:any;
  wheat_Fumi_Qc:any;

  constructor(private fb: FormBuilder,private DropDownListService: DropdownServiceService, private toast: ToastrService,
    private dialogRef: MatDialogRef<UpdateFumiOpenDatePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
   { 
    this.userForm=fb.group(
      {
        fumi_id:[''],
        fumi_no:[''],
        fumi_date:[''],
        warehouse_name:[''],
        stackno:[''],
        manpower:[''],
        degassing_date:[''],
        degassing_time:[''],
        opendate:[''],
        allocate:[''],
        wheat_fumi_qc:[''],
        pcmw_sign_name:[''],
        supervisor_sign_name:[''],
        lab_sign_name:['']
      });
    this.fumi_id = data['fumigation_id'];
    this.fumi_no = data['fumi_no'];
    this.fumi_date = data['fumi_date'];
    this.warehouse_name=data["warehouse_name"];
    this.action=data['action'];
    this.stack=data['stack'];
    this.id=data['id'];
    this.company=data['company'];
    this.finyear=data['finyear'];
    this.username=data['username']; 
    this.pcmw_sign_name=data["pcmw_sign_name"];
    this.supervisor_sign_name=data["supervisor_sign_name"];
    this.lab_sign_name=data["lab_sign_name"];
    this.stack_open_date=data.stack_open_date;
    this.allocate_status=data.allocate_status;
    this.manpower=data.manpower;
    this.degassing_date=data.degassing_date;
    this.degassing_time=data.degassing_time;
    this.wheat_Fumi_Qc=data.wheat_fumi_qc;
  }

  get opendate() { return this.userForm.get("opendate") as FormControl };
  get allocate() { return this.userForm.get("allocate") as FormControl };
  get wheat_fumi_qc() { return this.userForm.get("wheat_fumi_qc") as FormControl };

  ngOnInit() {
    //new Date().toISOString().substring(0, 10);
    let currdate:String ='';
    let a_status:String ='';
    if(this.stack_open_date=='' || this.stack_open_date==null)
    {
      currdate=new Date().toISOString().substring(0, 10);
    }else{currdate=this.stack_open_date;}
    if(this.allocate_status=='' || this.allocate_status==null || this.allocate_status=='NA')
      {
        a_status='NA';
      }else{a_status=this.allocate_status;}
    console.log(this.stack_open_date,"  /currdate ",currdate)
    this.userForm.patchValue({fumi_no:this.fumi_no,fumi_date:this.fumi_date,warehouse_name:this.warehouse_name,
      stackno:this.stack,opendate:currdate,allocate:a_status,pcmw_sign_name:this.pcmw_sign_name,
      supervisor_sign_name:this.supervisor_sign_name,lab_sign_name:this.lab_sign_name,
      manpower:this.manpower,degassing_date:this.degassing_date,degassing_time:this.degassing_time,wheat_fumi_qc:this.wheat_Fumi_Qc});
    this.status=true;
  }
  
  SendDataToDifferentComponenet()
  {
    let opendate=this.userForm.get("opendate").value;
    let allocate1=this.userForm.get("allocate").value;
    let wheatfumiqc=this.userForm.get("wheat_fumi_qc").value;
    if(!wheatfumiqc || wheatfumiqc=="NA"){
      this.toast.error("Select Wheat Fumigation QC !!!","Oops");
    }
    else{
      this.DropDownListService.updateWheatFumiDetails(this.id,this.fumi_id,opendate,this.company,this.finyear,this.username,this.action,allocate1,this.pcmw_sign_name,this.supervisor_sign_name,this.lab_sign_name,this.manpower,this.degassing_date,this.degassing_time,wheatfumiqc)
      .subscribe(data=>
      {
        console.log("close check: "+JSON.stringify(data))
        this.dialogRef.close(data.status);
      });
    }
    
  }
}
