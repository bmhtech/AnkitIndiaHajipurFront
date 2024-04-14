import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseGRN } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseGRN';
import { PurchaseOrder } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseOrder';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-purorder-returnapproval-popup',
  templateUrl: './purorder-returnapproval-popup.component.html',
  styleUrls: ['./purorder-returnapproval-popup.component.scss']
})
export class PurorderReturnapprovalPopupComponent implements OnInit {


  public userForm:FormGroup;
  PurOrderList:{};
  GrnList:{};
  check:any;
  _pur_orderid = "0";
  status = false;
  item_type:any;
  item_sub_type:any;
  b_unit:any;
  supplierId:any;
  date:any;
  fin_year:any;
  companyId:any;
  checkboxcheck:boolean=false;
  finalgrnlist:any;
  Id:number;
  showbutton:boolean=true;


  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<PurorderReturnapprovalPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        pur_orderid:[''],
        grn_id:[''],


        grn:this.fb.array([this.fb.group({
          grn_no:'',
          grn_id:'',
          grn_date:'',
          checkbox:''
        })]),


         pur_Order_Item_Details: this.fb.array([this.fb.group({
          checkbox:'',
          adv_item_code:'',
          adv_item_name:'',
          hsn_code:'',
          adv_packing:'',
          adv_packing_name:'',
          adv_pack_qty:'',
          adv_pack_uom:'',
          adv_item_qty:'',
          con_factor:'',
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
          warehouse_name:'',	
          rack:'',
          stack_uom:'',
          stack_qty:'',
          grn_id:''})])

      });


 
        this.Id=data["id"];
        this.item_type = data["item_type"];
        this.item_sub_type = data["item_sub_type"];
        this.b_unit = data["bunit"];
        this.supplierId = data["supplier_id"];
        this.date = data["date"];
        this.fin_year = data["fin_year"];
        this.companyId = data["company_id"];
     
    }
    
    get grn(){{ return this.userForm.get('grn') as FormArray;}}
    get pur_Order_Item_Details(){{ return this.userForm.get('pur_Order_Item_Details') as FormArray;}}
  
    company_name:any;
    ngOnInit() 
    {
      this.status = false;
      this.company_name = localStorage.getItem("company_name");

      if(this.Id == 0)//on first time 
      {
         this.showbutton=true;
          this.DropDownListService.getReturnApprovalPopupData(this.date,this.b_unit,this.supplierId,"Purchase Order",this.fin_year,this.companyId).subscribe(data=>
            {
              this.PurOrderList  = data;
              this.status = true;
            });
       }
       else
       {

       }
    }

    addchallan()
    {
      this.grn.push(this.fb.group({
        grn_no:'',
        grn_id:'',
        grn_date:'',
        checkbox:''
      })); 

    }
  
    add()
    {
      this.pur_Order_Item_Details.push(this.fb.group({
        checkbox:'',
        adv_item_code:'',
        adv_item_name:'',
        hsn_code:'',
        adv_packing:'',
        adv_packing_name:'',
        adv_pack_qty:'',
        adv_pack_uom:'',
        adv_item_qty:'',
        con_factor:'',
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
        warehouse_name:'',	
        rack:'',
        stack_uom:'',
        stack_qty:'',
        grn_id:''
      }));
    }
  
    editable: boolean = false;
    PriceReadOnly:boolean = false;
    PackingQty:boolean = false;
    
    
    check1(purorder:PurchaseOrder)
    {
      this._pur_orderid = purorder.pur_orderid;
      while (this.grn.length )
      this.grn.removeAt(0);
      this.status=false;

      this.DropDownListService.getgrnlistbypurorder(this._pur_orderid).subscribe(grn=>
      {
        this.GrnList=grn;
        let k=0;
        for(let data1 of grn)
        this.addchallan();
        this.grn.patchValue(grn);
        this.grn.at(k).patchValue({checkbox:false});
        k++;
        this.status=true;
      });
    }

    /*checkgrn(grn:PurchaseGRN)
    {
        this.finalgrnlist="";
        let grnlist="";
       console.log("hi")
        grnlist+=grn.grn_id+",";
         console.log("grnlist "+grnlist);
          this.finalgrnlist=grnlist.substring(0,grnlist.length-1);
          this.DropDownListService.getgrnitemlist( this.finalgrnlist).subscribe(grnitemdetails=>
          {
          
              while (this.pur_Order_Item_Details.length )
              this.pur_Order_Item_Details.removeAt(0);
              for(let data1 of grnitemdetails)
              this.add();
              this.pur_Order_Item_Details.patchValue(grnitemdetails);
              this.status = true;  
          });
    }
*/

   checkgrn(index)
    {
        this.finalgrnlist="";
        let grnlist="";
        for(let i=0;i<this.grn.length;i++)
        {
          if(this.grn.at(i).get("checkbox").value == true || this.grn.at(i).get("checkbox").value == 'true')
          {
            grnlist+=this.grn.at(i).get("grn_id").value+",";
          }
        }
         console.log("grnlist "+grnlist);
          this.finalgrnlist=grnlist.substring(0,grnlist.length-1);
          this.DropDownListService.getgrnitemlist( this.finalgrnlist).subscribe(grnitemdetails=>
          {
          
              while (this.pur_Order_Item_Details.length )
              this.pur_Order_Item_Details.removeAt(0);
              for(let data1 of grnitemdetails)
              this.add();
              this.pur_Order_Item_Details.patchValue(grnitemdetails);
              this.status = true;  
          });
    }

    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({pur_orderid: this._pur_orderid,grn_id:this.finalgrnlist});
    
      
      for(let j=0;j<this.pur_Order_Item_Details.length;j++)
      {
        if(this.pur_Order_Item_Details.at(j).get("checkbox").value==true || this.pur_Order_Item_Details.at(j).get("checkbox").value=='true')
        {
          this.checkboxcheck=true;
        }
      }
      if(this.checkboxcheck==true)
      {
        this.dialogRef.close(this.userForm.getRawValue());  
      }
      else
      {
        alert("Please tick on checkbox!!!!");
      }
    }
  
  }
