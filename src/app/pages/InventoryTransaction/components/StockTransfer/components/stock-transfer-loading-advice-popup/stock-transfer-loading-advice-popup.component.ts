import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { LoadingAdvice, Wm_loading_advice_itm_dtls } from '../../../../../../Models/Weightment/loading-advice';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-stock-transfer-loading-advice-popup',
    templateUrl: './stock-transfer-loading-advice-popup.component.html',
    styleUrls: ['./stock-transfer-loading-advice-popup.component.scss']
  })

  export class StockTransferLoadingAdvicePopupComponent implements OnInit
  {
    public userForm:FormGroup;
    AdviceList:{};
    status:any;
    check:any;
    _advice_id = "0";
    showbutton:boolean=true;
    Id:any;
    staticArray:any = [];

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<StockTransferLoadingAdvicePopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
        {
          advice_id: [''],
          

          Wm_loading_advice_itm_dtls: this.fb.array([this.fb.group({
            item_code: '', 
            item_name: '', 
            packing:  '', 
            packing_name: '',
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
            checkbox:''})]),
        });
        this.Id=data["id"];
      }
      get advice_id(){return this.userForm.get("advice_id") as FormControl};
    
      get Wm_loading_advice_itm_dtls(){{ return this.userForm.get('Wm_loading_advice_itm_dtls') as FormArray;}}
    
      ngOnInit() 
      {
        if(this.Id == 0)//on first time 
        {
          this.showbutton=true;
          this.status = false;
          this.DropDownListService.getLoadingAdviceStkTrans().subscribe(data=>
          {
            this.AdviceList  = data;
            this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()}); 
        }
        else
        {
          this.showbutton=false;
          this.Service.getStockTransLoadingWeighmentId(this.Id).subscribe(data=>
            {
              console.log("chkdata:"+JSON.stringify(data))
              this.staticArray.push(data);
              
              this.AdviceList  =  this.staticArray;
              this.Service.getStkTransChallanItemDlts(data["bus_partner"]).subscribe(itemdata=>
                {
                  console.log(JSON.stringify(itemdata))
                  while (this.Wm_loading_advice_itm_dtls.length ) 
                  {
                    this.Wm_loading_advice_itm_dtls.removeAt(0);
                  }
                  for(let i=0;i<itemdata.length;i++)
                  {
                    this.add();
                    this.Wm_loading_advice_itm_dtls.at(i).patchValue({item_name:itemdata[i]["item_name"],packing_name:itemdata[i]["packing_name"],
                    s_quantity:itemdata[i]["squantity"],s_uom:itemdata[i]["suom"],quantity:itemdata[i]["quantity"],uom:itemdata[i]["uom"],mat_wt:itemdata[i]["mat_wt"],
                    price:itemdata[i]["price"],price_based_on:itemdata[i]["price_based_on"],amount:itemdata[i]["amount"],
                    tax_code:itemdata[i]["tax_code"],tax_rate:itemdata[i]["tax_rate"],tax_amt:itemdata[i]["tax_amt"],
                    total_amt:itemdata[i]["total_amt"],acc_norms:itemdata[i]["acc_norms"],checkbox:true})
                  
                  }

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
          packing_name: '',
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
          checkbox:'',}))
      }

      check1(loadingAdviceList:LoadingAdvice)
      {
        this.status = false;
        this._advice_id = loadingAdviceList.advice_id;
        
        this.DropDownListService.loadingItemRetriveList(this._advice_id).subscribe(data=>
        {
          while (this.Wm_loading_advice_itm_dtls.length ) 
          {this.Wm_loading_advice_itm_dtls.removeAt(0);}
          for(let i=0;i<data.length;i++){this.add();}
          this.Wm_loading_advice_itm_dtls.patchValue(data);
          this.status = true;
          for(let k=0;k<this.Wm_loading_advice_itm_dtls.length;k++)
          {
          this.Wm_loading_advice_itm_dtls.at(k).patchValue({checkbox:true});
          }
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
      }

      SendDataToDifferentComponenet()
      {
        this.userForm.patchValue({advice_id: this._advice_id});
        this.userForm.patchValue(this.Wm_loading_advice_itm_dtls.value);
        this.dialogRef.close(this.userForm.value);  
      }

  }
