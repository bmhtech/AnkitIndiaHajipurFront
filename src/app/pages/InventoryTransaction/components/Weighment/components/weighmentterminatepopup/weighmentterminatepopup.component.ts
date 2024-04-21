import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-weighmentterminatepopup',
  templateUrl: './weighmentterminatepopup.component.html',
  styleUrls: ['./weighmentterminatepopup.component.scss']
})
export class WeighmentterminatepopupComponent implements OnInit {

  public userForm1: FormGroup;

  status = false;
  ID: any;
  wgmnt_id: any;
  othWgmntList: any = [];
  showotherweighmentno: boolean = false;
  Mainnet_weight: any;
  alertmsg:any;
  wgment_type:any;

  constructor(public fb: FormBuilder,
    private Service: Master, private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<WeighmentterminatepopupComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.userForm1 = fb.group({
      weighment_id: [''],
      ter_oth_wgmnt_no: [''],
      terminate_remarks: [''],
      username: [''],
      wgment_for: [''],
    });

    this.ID = data["id"];
    this.wgmnt_id = data["wgmentid"];
    this.Mainnet_weight = data["net_weight"];
    this.wgment_type = data["wgment_for"];
  }

  get weighment_id() { return this.userForm1.get("weighment_id") as FormControl }
  get ter_oth_wgmnt_no() { return this.userForm1.get("ter_oth_wgmnt_no") as FormControl }
  get terminate_remarks() { return this.userForm1.get("terminate_remarks") as FormControl }
  get username() { return this.userForm1.get("username") as FormControl }
  get wgment_for() { return this.userForm1.get("wgment_for") as FormControl }

  ngOnInit() {

    this.status = false;
    if (Number(this.Mainnet_weight) > 1) {
      this.showotherweighmentno = true;
    }
    else {
      this.showotherweighmentno = false;
    }
    console.log(this.showotherweighmentno +" // " + this.Mainnet_weight)
    forkJoin(
      this.DropDownListService.getOtherWgnmtList(),
    ).subscribe(([wgmntData]) => {

     // console.log("Other Wgnmt No. : : " + JSON.stringify(wgmntData))
      this.othWgmntList = wgmntData;
      this.status = true;
      //net_weight
    });
  }

  SendDataToDifferentComponenet() 
  {
     this.status=false;
    if(this.showotherweighmentno==true && (this.userForm1.get("ter_oth_wgmnt_no").value=='' || this.userForm1.get("ter_oth_wgmnt_no").value==null))
    {
      this.alertmsg="Please Select Other Weighment Number";
      this.status=true;
    }
    else if(this.userForm1.get("terminate_remarks").value =='' || this.userForm1.get("terminate_remarks").value==null)
    {
      this.alertmsg="Please Enter Remarks";
      this.status=true;
    }
    else
    {
      this.userForm1.patchValue({username:localStorage.getItem("username"),weighment_id:this.wgmnt_id,wgment_for:this.wgment_type})
      this.status=false;
      console.log("Terminate Kata s : "+JSON.stringify(this.userForm1.getRawValue()));
    this.DropDownListService.terminatekata(this.userForm1.getRawValue()).subscribe(data=>
        {
          console.log("Terminate Kata: "+this.userForm1.getRawValue());
          alert("Weighment Terminated Successfully......")
          this.status=true;
          window.location.reload();
          this.dialogRef.close();
        })
        
    }
    
   
 
  }

}
