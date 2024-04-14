import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-update-arn-no',
  templateUrl: './update-arn-no.component.html',
  styleUrls: ['./update-arn-no.component.scss']
})
export class UpdateArnNoComponent implements OnInit {
  public userForm:FormGroup;
  status = false;
  id:any;
  invoiceno:any;
  asn_no:any;

  constructor(private fb: FormBuilder,private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<UpdateArnNoComponent>, @Inject(MAT_DIALOG_DATA)data) 
  { 
    this.userForm=fb.group(
      {
        invoiceno:[''],
        asn_no:[''],
      });
    this.id = data['id'];
    this.invoiceno = data['invoiceno'];
    this.asn_no=data["asn_no"];
  }

  ngOnInit() {
    this.userForm.patchValue({invoiceno:this.invoiceno,asn_no:this.asn_no});
    this.status=true;
  }
  
  SendDataToDifferentComponenet()
  {
    let asn_no=this.userForm.get("asn_no").value;
    this.DropDownListService.updateArnNo(this.id,this.invoiceno,asn_no).subscribe(data=>
      {
       // console.log("close check:"+JSON.stringify(data))
        this.dialogRef.close(data.status);
      });   
  }

}
