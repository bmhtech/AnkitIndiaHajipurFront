import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-update-gatepass',
  templateUrl: './update-gatepass.component.html',
  styleUrls: ['./update-gatepass.component.scss']
})
export class UpdateGatepassComponent implements OnInit {
 public userForm:FormGroup;
  status = false;
  id:any;
  challan:any;
  gatepass:any;

  constructor(private fb: FormBuilder,private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<UpdateGatepassComponent>, @Inject(MAT_DIALOG_DATA)data) 
  { 
    this.userForm=fb.group(
      {
        challanno:[''],
        gatepass:[''],
      });
    this.id = data['id'];
    this.challan = data['challan'];
    this.gatepass=data["gatepass"];
  }

  ngOnInit() {
    this.userForm.patchValue({challanno:this.challan,gatepass:this.gatepass});
    this.status=true;
  }
  
  SendDataToDifferentComponenet()
  {
    let gatepass=this.userForm.get("gatepass").value;
    this.DropDownListService.updateGatepass(this.id,gatepass).subscribe(data=>
      {
       // console.log("close check:"+JSON.stringify(data))
        this.dialogRef.close(data.status);
      });   
  }

}
