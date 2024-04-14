import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { UnloadAdvice, Wm_unload_advice_item_dtls} from '../../../../../../Models/Weightment/unload-advice';

@Component({
  selector: 'app-unload-advice-withoutpo-popup',
  templateUrl: './unload-advice-withoutpo-popup.component.html',
  styleUrls: ['./unload-advice-withoutpo-popup.component.scss']
})
export class UnloadAdviceWithoutpoPopupComponent implements OnInit 
 {
  public userForm:FormGroup;
  UnloadAdviceDocsList:any = [];
  unloadadvice_id:any;
  check : any;
  status=false;

  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<UnloadAdviceWithoutpoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data)
     {
      this.userForm=fb.group
      ({     
        wm_unload_advice_item_dtls: this.fb.array([this.fb.group({
          unadviceid:'',
          unadviceno:'',
          item_code: '',  
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
          item_code: '',  
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
          checkbox:''}));
      }

      ngOnInit() 
      {
        this.status = false;
        this.DropDownListService.getUnloadAdvRefOpenAdvQc().subscribe(data=>
        {
          //console.log("data::"+JSON.stringify(data))
          this.UnloadAdviceDocsList  = data;
          this.status = true;
        });
      }
      check1(unoloadAdviceList:UnloadAdvice)
    {
      this.unloadadvice_id = unoloadAdviceList.unadviceid;
      this.status = false;
      this.DropDownListService.getUnloadItemList(this.unloadadvice_id).subscribe(data=>
      {
        while (this.wm_unload_advice_item_dtls.length ) {this.wm_unload_advice_item_dtls.removeAt(0);}
        for(let i=0;i<data.length;i++){this.add(); }
        this.wm_unload_advice_item_dtls.patchValue(data);
        this.status = true;
      });
    }
      SendDataToDifferentComponenet()
      {
      
        this.dialogRef.close(this.wm_unload_advice_item_dtls.value);  
      }
   
}
