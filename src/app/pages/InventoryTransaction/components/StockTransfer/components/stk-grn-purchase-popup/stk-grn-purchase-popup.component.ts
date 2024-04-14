import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { StockTransferGrn,Stk_Trans_grn_item_details} from '../../../../../../models/StockTransfer/stock-transfer-grn';
@Component({
  selector: 'app-stk-grn-purchase-popup',
  templateUrl: './stk-grn-purchase-popup.component.html',
  styleUrls: ['./stk-grn-purchase-popup.component.scss']
})
export class StkGrnPurchasePopupComponent implements OnInit 
{
  public userForm:FormGroup;
  GrnLists:any =[];
  BU_unit:any;
  Company_Name:any;
  FinYear:any;
  CurrentDate:any;
  checkboxcheck:boolean=false;
  Id:any;
  staticArray:any = [];
  status = false;
  showbutton:boolean=true;

  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StkGrnPurchasePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data)
   {
    this.userForm=fb.group
    ({    
       stk_grn_id: [''], 
        stk_transfer_grn_item_details: this.fb.array([this.fb.group({
          adv_item_code:'',
          adv_item_name:'',
          adv_packing:'',
          adv_packing_name:'',
          adv_pack_qty:'',
          adv_pack_uom:'',
          adv_item_qty:'',
          adv_mat_wt:'',
          adv_item_uom:'',
          rcv_pack_qty:'',
          rcv_pack_uom:'',
          rcv_item_qty:'',
          rcv_mat_wt:'',
          rcv_item_uom:'',
          pssd_pack_qty:'',
          pssd_pack_uom:'',
          pssd_item_qty:'',
          pssd_mat_wt:'',
          pssd_item_uom:'',
          unit_rate: '',
          price_based_on: '',	
          amount: '', 
          discount:'',
          discount_based_on:'',
          discount_amt:'',
          net_amt:'',
          qc_deduction: '',
          net_amt_after_qc: '',
          tax_code: '',
          tax_rate:'',	
          tax_amt:'',
          gross_amt:'',
          qc_norms:'',
          warehouse:'',
          warehouse_name:'',	
          rack:'',
          rack_name:'',
          stack_uom:'',
          stack_qty:'',
          checkbox:''
        })])
    });
     this.BU_unit = data["BU_unit"];
     this.Company_Name = data["Company_Name"];
     this.FinYear = data["FinYear"];
     this.CurrentDate = data["Stk_Date"]
     this.Id=data["id"];
   }
   
   get stk_grn_id(){return this.userForm.get("stk_grn_id") as FormControl};
   get stk_transfer_grn_item_details() { return this.userForm.get('stk_transfer_grn_item_details') as FormArray;}


   add()
   {
     this.stk_transfer_grn_item_details.push(this.fb.group({
         adv_item_code:'',
          adv_item_name:'',
          adv_packing:'',
          adv_packing_name:'',
          adv_pack_qty:'',
          adv_pack_uom:'',
          adv_item_qty:'',
          adv_mat_wt:'',
          adv_item_uom:'',
          rcv_pack_qty:'',
          rcv_pack_uom:'',
          rcv_item_qty:'',
          rcv_mat_wt:'',
          rcv_item_uom:'',
          pssd_pack_qty:'',
          pssd_pack_uom:'',
          pssd_item_qty:'',
          pssd_mat_wt:'',
          pssd_item_uom:'',
          unit_rate: '',
          price_based_on: '',	
          amount: '', 
          discount:'',
          discount_based_on:'',
          discount_amt:'',
          net_amt:'',
          qc_deduction: '',
          net_amt_after_qc: '',
          tax_code: '',
          tax_rate:'',	
          tax_amt:'',
          gross_amt:'',
          qc_norms:'',
          warehouse:'',
          warehouse_name:'',	
          rack:'',
          rack_name:'',
          stack_uom:'',
          stack_qty:'',
          checkbox:'true'
      }));
   }

  
   StkGrnId:any;
   check1(StkGrnList:StockTransferGrn)
    {
      this.status = false;
      this.StkGrnId = StkGrnList.stk_grn_id;
      this.stk_transfer_grn_item_details.removeAt(0);
       this.DropDownListService.getStkTranGrnItemDlts(this.StkGrnId).subscribe(data=>
       {
          for(let i=0;i<data.length;i++){
            this.add();
           }
          this.stk_transfer_grn_item_details.patchValue(data);

          for(let k=0;k<this.stk_transfer_grn_item_details.length;k++)
          {
            this.stk_transfer_grn_item_details.at(k).patchValue({checkbox:true});
          }
          this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
   }
  ngOnInit() {
    if(this.Id == 0)//on first time 
    {
      this.showbutton=true;
      this.status = true;
      this.DropDownListService.getStkTranGrn("bunit="+this.BU_unit+"&tdate="+this.CurrentDate+"&company="+this.Company_Name+"&finyear="+this.FinYear).subscribe(data=>
        {
          this.GrnLists  = data;
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()}); 
    }
    else
    {
      this.showbutton=false;
      this.DropDownListService.stkPurInv(this.Id).subscribe(data=>
        {
          //console.log("chkdata:"+JSON.stringify(data))
          this.staticArray.push(data);
          
          this.GrnLists  =  this.staticArray;
          
          this.DropDownListService.getStkTransPurInvItemDtls(data["reference_status"]).subscribe(itemdata=>
            {
              console.log("bid here:"+JSON.stringify(itemdata))
              while (this.stk_transfer_grn_item_details.length ) 
              {
                this.stk_transfer_grn_item_details.removeAt(0);
              }
              for(let i=0;i<itemdata.length;i++)
              {
                this.add();
                this.stk_transfer_grn_item_details.at(i).patchValue({adv_item_name:itemdata[i]["adv_item_name"],adv_packing_name:itemdata[i]["adv_packing_item_name"],
                pssd_pack_qty:itemdata[i]["passed_packing_qty"],pssd_pack_uom:itemdata[i]["passed_packing_uom"],pssd_item_qty:itemdata[i]["passed_item_qty"],pssd_mat_wt:itemdata[i]["passed_mat_weight"],pssd_item_uom:itemdata[i]["passed_item_uom"],
                adv_pack_qty:itemdata[i]["passed_packing_qty"],adv_pack_uom:itemdata[i]["passed_packing_uom"],adv_item_qty:itemdata[i]["passed_item_qty"],adv_mat_wt:itemdata[i]["passed_mat_weight"],adv_item_uom:itemdata[i]["passed_item_uom"],
                rcv_pack_qty:itemdata[i]["passed_packing_qty"],rcv_pack_uom:itemdata[i]["passed_packing_uom"],rcv_item_qty:itemdata[i]["passed_item_qty"],rcv_mat_wt:itemdata[i]["passed_mat_weight"],rcv_item_uom:itemdata[i]["passed_item_uom"],
                unit_rate:itemdata[i]["unit_rate"],price_based_on:itemdata[i]["price_based_on"],amount:itemdata[i]["amount"],discount:itemdata[i]["discount"],discount_based_on:itemdata[i]["discount_basedon"],discount_amt:itemdata[i]["discount_amount"],
                tax_code:itemdata[i]["tax_code"],tax_rate:itemdata[i]["tax_rate"],tax_amt:itemdata[i]["tax_amt"],
                net_amt:itemdata[i]["net_amount"],qc_deduction:itemdata[i]["qc_deduction"],net_amt_after_qc:itemdata[i]["net_amt_after_qc"],gross_amt:itemdata[i]["gross_amt"],qc_norms:itemdata[i][""],checkbox:true})
              
              }
            this.status = true;
           
            });
        });
    }

      
  }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({stk_grn_id: this.StkGrnId});
    this.userForm.patchValue(this.stk_transfer_grn_item_details.value);
    
    for(let i=0;i<this.stk_transfer_grn_item_details.length;i++)
             {
               if(this.stk_transfer_grn_item_details.at(i).get("checkbox").value==true || this.stk_transfer_grn_item_details.at(i).get("checkbox").value=='true')
               {
                 this.checkboxcheck=true;
               }
             } 
             if(this.checkboxcheck == true)
             {
               this.dialogRef.close(this.userForm.getRawValue()); 
             }
             else
             {
               alert("Please tick on checkbox!!!!");
             }
   }

}
