import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Trans_bussiness_partner } from '../../../../../../Models/SupplierModel/Trans_bussiness_partner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { QcDetails } from '../../../../../../Models/InventoryModel/QcDetails';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-quality-check-qcpop-up',
    templateUrl: './quality-check-qcpop-up.component.html',
    styleUrls: ['./quality-check-qcpop-up.component.scss']
  })

  export class QualityCheckQCPopUpComponent implements OnInit 
  {
    public userForm1: FormGroup;
    qcId:any;
    srl_no = 1;
    status = false;
    Id:any;
    qcDetailsData:any=[];
    action:any;
    updateQC:boolean=false;
  
    constructor(  private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<QualityCheckQCPopUpComponent>,@Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm1=fb.group
      ({
        qc_id:'',
        QcDetails: this.fb.array([this.fb.group({
          sl_no:this.srl_no,
          qc_code:'',
          qc_param:'',
          cal_basis:'',
          basis_amt_UoM:'',
          min:'',
          max:'',
          sample:'',
          observation:'',
          out_qc_param:'',
          master_observation:'',
          qc_remarks:''
        })])
      });

      this.qcId = data["qc_id"];
      this.Id=data["Id"];
      this.qcDetailsData=data["QcDetails"];
      this.action=data["action"]
    }
    get qc_id(){ return this.userForm1.get("qc_id") as FormControl }
    get QcDetails() { return this.userForm1.get('QcDetails') as FormArray;}

    ngOnInit() 
    {
      console.log("QC ACTION :: "+this.action)
      this.status = false;
      this.srl_no = 0;
      this.qcApproverName[0]=true;
      this.updateQC=false;
      if(this.action=='update')
      {
        console.log("IF");
        this.updateQC=true;
        //this.qcApproverName=true;
      }
      while (this.QcDetails.length) 
      this.QcDetails.removeAt(0);

     // console.log(this.qcId+"chwck length::"+JSON.stringify(this.qcDetailsData.length))

      if(this.qcDetailsData[0].sl_no=='')
      {
        this.DropDownListService.qcRulesRetriveList(this.qcId).subscribe(qclist=>
          {
            console.log(JSON.stringify(qclist))
               let i=0;
              for(let data1 of qclist)
              {
                console.log(" checkbox "+ data1["qty_chkbox"])
                if(data1["qty_chkbox"]== true || data1["qty_chkbox"]== '1' )
                {
                  this.add(); 
                  this.QcDetails.at(i).patchValue(data1);
                  i++;
                }
              }
          });
          this.status=true;
      }
      else
      {
        for(let i=0;i<this.qcDetailsData.length;i++)
        {
          this.add(); 
          this.QcDetails.patchValue(this.qcDetailsData);
          console.log(this.qcId+" chwck length::"+JSON.stringify(this.qcDetailsData.length)+" chwck :: "+JSON.stringify(this.qcDetailsData))
        }
        this.status = true;
      }

    }

    add()
    { 
      this.srl_no = this.srl_no + 1;
      this.QcDetails.push(this.fb.group({
        sl_no:this.srl_no,
        qc_code:'',
        qc_param:'',
        cal_basis:'',
        basis_amt_UoM:'',
        min:'',
        max:'',
        sample:'',
        observation:'',
        out_qc_param:'',
        master_observation:'',
        qc_remarks:''}));
    }
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({qc_id:this.qcId});
      console.log("ENTER : : "+this.qcId)
      console.log("ENTER : : "+this.userForm1.getRawValue())
      this.dialogRef.close(this.userForm1.getRawValue());  

    }
    qcApproverName:any=[];
    checkObs(obs, index)
    {
      let min_value=this.QcDetails.at(index).get("min").value;
      let max_value=this.QcDetails.at(index).get("max").value;
      let obs_value=obs.target.value;
      console.log("Enter: "+ obs_value+" / "+this.qcApproverName[index])
      if((obs_value>=min_value && obs_value<=max_value) || obs_value=="" || obs_value.toUpperCase()=="NIL")
      {
        this.QcDetails.at(index).patchValue({out_qc_param:"NA"});
        this.qcApproverName[index]=true;
        console.log("if: "+this.qcApproverName[index])
      }
      else
      {
        alert("Peripheral Observation is not in range.\n Please give a name to Approve in OUT OF QC PARAM field..")
        this.QcDetails.at(index).patchValue({out_qc_param:""});
        this.qcApproverName[index]=false;
        console.log("else: "+this.qcApproverName[index])
      }
      console.log("if final: "+this.qcApproverName[index])
    }
  }
  
  
