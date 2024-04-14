import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { UnloadAdvice, Wm_unload_advice_item_dtls} from '../../../../../../Models/Weightment/unload-advice';

@Component({
  selector: 'app-unload-advice-withpo-popup',
  templateUrl: './unload-advice-withpo-popup.component.html',
  styleUrls: ['./unload-advice-withpo-popup.component.scss']
})
export class UnloadAdviceWithpoPopupComponent implements OnInit 
{

  public userForm:FormGroup;
  UnloadAdviceDocsList:any = [];
  unloadadvice_id:any;
  check : any;
  status=false;
  showbutton:boolean=true;
  showsubmitbutton:boolean=false;
  checkSubmit:any= [];

  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<UnloadAdviceWithpoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data)
     {
      this.userForm=fb.group
      ({     
        wm_unload_advice_item_dtls: this.fb.array([this.fb.group({
          unadviceid:'',
          unadviceno:'',
          item_name: '',
          item_code :  '',  
          packing_name:  '',
          packing:  '',
          quantity: '',  
          uom: '',
          s_qty: '', 
          s_uom: '', 
          mat_wt: '',  
          qc_norms:'',
          wearhouse: '',
          rack: '', 
          base_qty: '',
          checkbox:''
      })])
      });
      }
      get wm_unload_advice_item_dtls(){ return this.userForm.get('wm_unload_advice_item_dtls') as FormArray;}
      
      add()
      {
        this.wm_unload_advice_item_dtls.push(this.fb.group({
          unadviceid:'',
          unadviceno:'',
          item_name: '',
          item_code: '',  
          packing:  '',
          packing_name:  '', 
          quantity: '',  
          uom: '',
          s_qty: '', 
          s_uom: '', 
          mat_wt: '',  
          qc_norms:'',
          wearhouse: '',
          rack: '', 
          base_qty: '',
          checkbox:''}));
      }

      ngOnInit() 
      {
        this.status = false;
        this.showbutton=true;
        //this.DropDownListService.getUnloadAdvRefPOQc().subscribe(data=>
        this.DropDownListService.getUnloadAdvRefPOQcNew().subscribe(data=>
        {
         // console.log("data::"+JSON.stringify(data))
          this.UnloadAdviceDocsList  = data;
          this.status = true;
        });
      }
    check1(unoloadAdviceList:UnloadAdvice)
    {
      this.showsubmitbutton=true;
      this.unloadadvice_id = unoloadAdviceList.unadviceid;
      this.status = false;
      this.DropDownListService.getUnloadItemList(this.unloadadvice_id).subscribe(data=>
      {
        //console.log("unadv::"+JSON.stringify(data))
        while (this.wm_unload_advice_item_dtls.length ) {this.wm_unload_advice_item_dtls.removeAt(0);}
        for(let data1 of data)
        {
          this.add(); 
        }
        this.wm_unload_advice_item_dtls.patchValue(data);
        for(let i=0;i<data.length;i++)
        {
          this.wm_unload_advice_item_dtls.at(i).patchValue({checkbox:true});
        }
       
        this.status = true;
      });
    }
      SendDataToDifferentComponenet()
      {
      
       // this.dialogRef.close(this.wm_unload_advice_item_dtls.value);  

        this.submitstatus();
            //alert(this.showsubmitbutton);
            if(this.showsubmitbutton == true)
            {
              //alert(JSON.stringify(this.userForm1.value));
            this.dialogRef.close(this.wm_unload_advice_item_dtls.value);
            }
            else
            {
            alert("Please tick on checkbox!!!!");
            }
      }
      
      submitstatus()
      {
        this.checkSubmit=[];
        for(let i=0;i<this.wm_unload_advice_item_dtls.length;i++)
        {
         //alert(this.wm_unload_advice_item_dtls.at(i).get("checkbox").value);
    
          if(this.wm_unload_advice_item_dtls.at(i).get("checkbox").value == 'true' || this.wm_unload_advice_item_dtls.at(i).get("checkbox").value == true)
          {
                //alert('Yes') ;
                this.checkSubmit.push("true");
          }
        }
        if(this.checkSubmit.includes("true"))
        {
          //alert('hi');
          this.showsubmitbutton=true;
          
        }
      }

}
