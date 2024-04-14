import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
// import { CustomersMasterComponent } from '../components/CustomersMaster/CustomersMaster.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Trans_bussiness_partner } from '../../../../../../Models/SupplierModel/Trans_bussiness_partner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mastermodal',
  templateUrl: './mastermodal.component.html',
  styleUrls: ['./mastermodal.component.scss']
})
export class MastermodalComponent implements OnInit {
  public userForm1: FormGroup;
  description:string;
  listTransBussinessPartner:{};

  constructor( fb: FormBuilder,
              private Service: Master,
              private dialogRef: MatDialogRef<MastermodalComponent>,
              @Inject(MAT_DIALOG_DATA) data)
              {
                this.userForm1=fb.group({
                  bp_Id:[''],
                  bp_code:[''],
                  index:[''],
                });


                this.description = data.description;
                console.log("json: "+JSON.stringify(data));
               // alert("index: "+data.index);
                this.userForm1.patchValue(data);
                this.Service.getTransporterBussinessPartner().subscribe(data=>{this.listTransBussinessPartner  = data;});
              
              }

              ngOnInit() {
               
            }
            get bp_code(){ return this.userForm1.get("bp_code") as FormControl }           
            get index(){ return this.userForm1.get("index") as FormControl }           
            value='';
            check1(event, listTransBussinessPartner:Trans_bussiness_partner)
            {
               if(event.checked)
               {
                this.value = this.value + listTransBussinessPartner.bp_Id + ",";
               }
               else
               {
                this.value = this.value.replace(listTransBussinessPartner.bp_Id + ",", "");
               }
               this.userForm1.patchValue({bp_code:this.value});

            }

            SendDataToDifferentComponenet()
            {
              this.userForm1.patchValue({bp_code:this.value.substr(0, this.value.length-1)});
              
              this.dialogRef.close(this.userForm1.value); 
            }

}
