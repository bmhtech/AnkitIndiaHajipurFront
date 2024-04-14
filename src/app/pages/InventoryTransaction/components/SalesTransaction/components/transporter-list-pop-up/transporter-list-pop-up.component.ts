import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Trans_bussiness_partner } from '../../../../../../Models/SupplierModel/Trans_bussiness_partner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { TransporterPopUp } from '../../../../../../Models/TransporterModal/transporter-pop-up';

  @Component({
    selector: 'app-transporter-list-pop-up',
    templateUrl: './transporter-list-pop-up.component.html',
    styleUrls: ['./transporter-list-pop-up.component.scss']
  })
  export class TransporterListPopUpComponent implements OnInit 
  {
    model: TransporterPopUp=new TransporterPopUp();
    public userForm1: FormGroup;
    customer_id:any;
    listTransBussinessPartner:{};
    transGroup:{};
    status = false;

    constructor( private fb: FormBuilder, private Service: Master,private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<TransporterListPopUpComponent>,@Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm1=fb.group({
        bp_Id:[''],
        group_type:[''],
        transporter_id:[''],

        transporter_list: this.fb.array([this.fb.group({
          //sl_no :'',
          bp_Id :'',
          checkbox:'',
          bp_name:'',
          group_type:''

        })])
      });

      this.customer_id = data.customer_id;
      console.log("json: "+JSON.stringify(data));
      this.userForm1.patchValue(data);
      this.Service.getTransporterBussinessPartner().subscribe(data=>{this.listTransBussinessPartner  = data;});
    }

    get transporter_list() { return this.userForm1.get('transporter_list') as FormArray;}
    get group_type(){ return this.userForm1.get("group_type") as FormControl }           
    get bp_Id(){ return this.userForm1.get("bp_Id") as FormControl }  
    get transporter_id(){ return this.userForm1.get("transporter_id") as FormControl }  

    ngOnInit() {
      this.status = false;
      this.DropDownListService.transportNameCodeList().subscribe(data=>{this.transGroup = data;});
      
      this.status = true;
    }

    add()
    {
      this.transporter_list.push(this.fb.group({
        //sl_no :'',
        bp_Id :'',
        checkbox:'',
        bp_name:'',
        group_type:''
      }))
    }

    onChangeTransporter(tgroup:string)
    {
      this.status = false;
      this.temp="";
      this.userForm1.patchValue({transporter_id: this.temp});

      while(this.transporter_list.length)
      this.transporter_list.removeAt(0);

      this.DropDownListService.getTransporterThruGroup(tgroup).subscribe(data=>
      {
        this.status = true; 
        for(let i=0;i<data.length;i++){ this.add(); }
        this.transporter_list.patchValue(data);

      });
    }

    temp  = '';
    transId:any;
    check(event, index)
    {
      this.transId = this.transporter_list.at(index).get("bp_Id").value as FormControl;

       if(event.checked == true)
       { this.temp = this.temp + this.transId + ",";}
       else
       {this.temp = this.temp.replace(this.transId + "," , ""); }

      this.userForm1.patchValue({transporter_id: this.temp.substring(0, this.temp.length-1)});

    }
                    
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({bp_code:this.customer_id});
      this.dialogRef.close(this.userForm1.getRawValue()); 
    }

}
