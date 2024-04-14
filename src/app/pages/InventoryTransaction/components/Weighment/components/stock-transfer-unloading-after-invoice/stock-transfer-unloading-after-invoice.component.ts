import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StockTransferChallan } from '../../../../../../models/StockTransfer/stock-transfer-challan';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-stock-transfer-unloading-after-invoice',
  templateUrl: './stock-transfer-unloading-after-invoice.component.html',
  styleUrls: ['./stock-transfer-unloading-after-invoice.component.scss']
})
export class StockTransferUnloadingAfterInvoiceComponent implements OnInit {

  public userForm: FormGroup;
  list:any = [];
  bunit:any;
  company_id:any;
  date:any;
  fin_yr:any;
  status = false;
  Stk_challan_id:any;
  checkSubmit:any= [];
  showsubmitbutton1:boolean=false;
  showsubmitbutton:boolean=true;
  
  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StockTransferUnloadingAfterInvoiceComponent>, @Inject(MAT_DIALOG_DATA)data) 
    { 
      this.bunit=data["bunit"];
      this.company_id=data["company_id"];
      this.date=data["date"];
      this.fin_yr=data["fin_yr"];

      this.userForm=fb.group
      ({
        stk_challan_id: [''],
        
        stk_challan__Item_Dtls: this.fb.array([this.fb.group({
          checkbox: '',
          item_code:'',
          item_name: '',
          packing:'',
          packing_name: '',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt:'',
          price:'',
          price_based_on:'',
          amount:'',
          tax_code:'',
          tax_rate: '',
          tax_amt:'',
          total_amt:'',
          acc_norms:''})]),
        });

    }
    get stk_challan_id(){return this.userForm.get("stk_challan_id") as FormControl};

    get stk_challan__Item_Dtls(){{ return this.userForm.get('stk_challan__Item_Dtls') as FormArray;}}

    add()
     {
       this.stk_challan__Item_Dtls.push(this.fb.group({
        checkbox: 'true',
        item_code:'',
        item_name: '',
        packing:'',
        packing_name:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        tax_code:'',
        tax_rate: '',
        tax_amt:'',
        total_amt:'',
        acc_norms:''}));
    }
    
  ngOnInit() 
  {

    this.DropDownListService.getstocktransferchallaninunloading(this.bunit,this.date,this.company_id,this.fin_yr).subscribe(data=>
      {
        //console.log("chk unload data:"+JSON.stringify(data))
        this.list  = data; 
        this.status = true;
      });
  }

  check1(challanList:StockTransferChallan)
    {
      this.status = false;
      this.showsubmitbutton=true;
      this.Stk_challan_id = challanList.stk_challan_id;
      this.DropDownListService.getStkTransChallanItemDlts(this.Stk_challan_id).subscribe(data=>{
       while (this.stk_challan__Item_Dtls.length )
      {
        this.stk_challan__Item_Dtls.removeAt(0);
      }
      //console.log("Item data:"+JSON.stringify(data))
      for(let i=0;i<data.length;i++)
      {
        this.add(); 
      }
       this.stk_challan__Item_Dtls.patchValue(data);
       for(let i=0;i<data.length;i++)
        {
          this.stk_challan__Item_Dtls.at(i).patchValue({checkbox:true});
        }
       this.status = true;
      });
    }
   
    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({stk_challan_id: this.Stk_challan_id});
      this.userForm.patchValue(this.stk_challan__Item_Dtls.value);
      
      this.submitstatus();
      if(this.showsubmitbutton == true && this.showsubmitbutton1 == true)
      {
        this.dialogRef.close(this.userForm.getRawValue());  
      }
      else
      {
        alert("Please tick on checkbox!!!!");
      }
    }

    submitstatus()
    {
      this.checkSubmit=[];
      for(let i=0;i<this.stk_challan__Item_Dtls.length;i++)
      {
        if(this.stk_challan__Item_Dtls.at(i).get("checkbox").value == true || this.stk_challan__Item_Dtls.at(i).get("checkbox").value == "true")
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
