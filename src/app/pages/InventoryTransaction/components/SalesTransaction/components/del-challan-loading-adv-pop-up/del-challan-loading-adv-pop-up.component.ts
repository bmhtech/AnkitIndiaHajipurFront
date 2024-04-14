
import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { LoadingAdvice, Wm_loading_advice_itm_dtls } from '../../../../../../Models/Weightment/loading-advice';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
  selector: 'app-del-challan-loading-adv-pop-up',
  templateUrl: './del-challan-loading-adv-pop-up.component.html',
  styleUrls: ['./del-challan-loading-adv-pop-up.component.scss']})

  export class DelChallanLoadingAdvPopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    AdviceList:{};
    check:any;
    _advice_id = "0";
    challanDate:any;
    status = false;
    partyid:any;
    showsubmitbutton:boolean=true;
    showsubmitbutton1:boolean=false;
    checkSubmit:any= [];
    Id:any;
    showbutton:boolean=true;
    inv_type:any;


    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<DelChallanLoadingAdvPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        advice_id:[''],
        Wm_loading_advice_itm_dtls: this.fb.array([this.fb.group({
          item_code: '',  
          item_name: '',  
          alter_item_code: '',  
          alter_item_name: '',
          hsn_code: '',
          packing:  '', 
          packing_name:  '', 
          alter_packing:  '', 
          alter_packing_name:  '', 
          quantity: '',  
          uom: '',
          s_quantity: '', 
          s_uom: '', 
          mat_wt: '',   
          warehouse: '',
          stack_rack: '', 
          base_qty: '',
          price:'',
          price_based_on:'',
          amount:'',
          discount_rate:'',
          discount_type:'',
          discount_amt:'',
          tolerance:'',
          tax_code:'',
          tax_rate:'',
          tax_amt:'',
          total_amt:'',
          acc_norms:'',
          checkbox:'',})]),
      });
      this.challanDate = data["delivery_date"];
      this.partyid = data.partyid;
      this.Id=data['id'];
      this.inv_type=data['inv_type'];
    }

     get Wm_loading_advice_itm_dtls(){{ return this.userForm.get('Wm_loading_advice_itm_dtls') as FormArray;}}

    ngOnInit() 
    {
      //alert(this.Id)
      this.status = false;
      if(this.Id == 0)//on first time 
        {
          this.showbutton=true;
          this.DropDownListService.getLoadAdvThruWeighment(this.challanDate,this.partyid,this.inv_type).subscribe(data=>
          {
            this.AdviceList  = data;
            this.status = true;
          });
        }
        else //for update time
        {
          
          this.showbutton=false;
          this.DropDownListService.getLoadAdvThruWeighmentUpdate(this.Id).subscribe(staticdata=>
            {
              this.AdviceList = staticdata;
              this.DropDownListService.loadingItemRetriveListUpdate(this.Id).subscribe(delvItemData=>
                {
                  console.log("delv dynamic:"+JSON.stringify(delvItemData))
                  while (this.Wm_loading_advice_itm_dtls.length ) 
                  this.Wm_loading_advice_itm_dtls.removeAt(0);
                  for(let data1 of delvItemData)
                    this.add();
                    this.Wm_loading_advice_itm_dtls.patchValue(delvItemData);
                  this.status = true;
                });
          });
        }
    }

    add()
    {
      this.Wm_loading_advice_itm_dtls.push(this.fb.group({
        item_code: '',  
        item_name: '',  
        packing:  '', 
        alter_item_code: '',  
        alter_item_name: '',  
        alter_packing:  '',
        alter_packing_name:  '', 
        hsn_code:'',
        packing_name:  '', 
        quantity: '',  
        uom: '',
        s_quantity: '', 
        s_uom: '', 
        mat_wt: '',   
        warehouse: '',
        stack_rack: '', 
        base_qty: '',
        price:'',
        price_based_on:'',
        amount:'',
        discount_rate:'',
        discount_type:'',
        discount_amt:'',
        tolerance:'',
        tax_code:'',
        tax_rate:'',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        checkbox:'true'}))
    }

    check1(loadingAdviceList:LoadingAdvice)
    {
      this._advice_id = loadingAdviceList.advice_id;
      this.status = false;
      this.DropDownListService.loadingItemRetriveList(this._advice_id).subscribe(data=>
      {

       
        while (this.Wm_loading_advice_itm_dtls.length ) 
        this.Wm_loading_advice_itm_dtls.removeAt(0);
        for(let i=0;i<data.length;i++)
        this.add();
        this.Wm_loading_advice_itm_dtls.patchValue(data);
        this.status = true;
      });
    }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({advice_id: this._advice_id})
    this.userForm.patchValue(this.Wm_loading_advice_itm_dtls.value)
   // this.dialogRef.close(this.userForm.value);  

    this.submitstatus();
      if(this.showsubmitbutton == true && this.showsubmitbutton1 == true)
      {
       
        this.dialogRef.close(this.userForm.value);
      }
      else
      {
      alert("Please tick on checkbox!!!!");
      }
  }
  submitstatus()
  {
    this.checkSubmit=[];
    for(let i=0;i<this.Wm_loading_advice_itm_dtls.length;i++)
    {
      
      if(this.Wm_loading_advice_itm_dtls.at(i).get("checkbox").value == true || this.Wm_loading_advice_itm_dtls.at(i).get("checkbox").value == "true")
      {
        this.checkSubmit.push("true");
       
      }
    }
    
    if(this.checkSubmit.includes("true"))
    {
     
      this.showsubmitbutton1=true;
      
    }
  }

}
    





