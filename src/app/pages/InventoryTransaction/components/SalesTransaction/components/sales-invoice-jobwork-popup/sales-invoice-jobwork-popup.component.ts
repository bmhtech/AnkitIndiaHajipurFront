import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { DeliveryChallan } from '../../../../../../Models/SalesTransaction/DeliveryChallan';

@Component({
  selector: 'app-sales-invoice-jobwork-popup',
  templateUrl: './sales-invoice-jobwork-popup.component.html',
  styleUrls: ['./sales-invoice-jobwork-popup.component.scss']
})
export class SalesInvoiceJobworkPopupComponent implements OnInit {
  invoiceType:any;
  customer:any;
  companyId:any;
  date:any;
  Id:any;
  public userForm:FormGroup;
  status = true;
  company_name:any;
  challanList:any=[];
  challan_id:any;
  showsubmitbutton:boolean=true;
  showsubmitbutton1:boolean=false;
  checkSubmit:any= [];
  showbutton:boolean=false;
  totalprice:number=0;
  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SalesInvoiceJobworkPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
  {

    this.userForm=fb.group(
      {
        delivery_cid: [''],
        job_price_total: [''],
        delivery_challan_Item_Dtls_for_jobwork: this.fb.array([this.fb.group({
          job_item:'',
          job_item_name:'',
          job_packing:'',
          job_packing_name:'',
          job_hsn:'',
          pack_qty:'',
          pack_uom:'',
          price_based_on:'',
          item_qty:'',
          item_uom:'',
          mat_wt:'',
          tolerance:'',
          checkbox:''
      })])});

        this.invoiceType = data['invoice_type'];
        this.customer = data['party_id'];
        this.companyId = data['company_id'];
        this.date = data['date'];
        this.Id=data["id"];
  }

  get delivery_challan_Item_Dtls_for_jobwork(){{ return this.userForm.get('delivery_challan_Item_Dtls_for_jobwork') as FormArray;}}

  add()
  {
   
    this.delivery_challan_Item_Dtls_for_jobwork.push(this.fb.group({
      job_item:'',
      job_item_name:'',
      job_packing:'',
      job_packing_name:'',
      job_hsn:'',
      pack_qty:'',
      pack_uom:'',
      price_based_on:'',
      item_qty:'',
      item_uom:'',
      mat_wt:'',
      tolerance:'',
      checkbox:'true',
    }))

  }


  ngOnInit()
   {
    this.status = false;
    this.company_name = localStorage.getItem("company_name");
    if(this.Id == 0)//on first time 
    {
      this.DropDownListService.getDelvChallansnewjobwork("invtype="+this.invoiceType+"&party="+this.customer+"&invdate="+this.date+"&comp="+this.companyId+"&parentmodel=Sales Invoice").subscribe(data=>
      {
        this.showbutton=true;
        this.challanList  = data;
        this.status = true;
      });

    }
  }

  check1(challanList:DeliveryChallan)
  {

    this.challan_id = challanList.delivery_cid;
    this.status = false;
    
    this.DropDownListService.getDlvChallanItemjobworkRetriveList(this.challan_id).subscribe(data=>
      {
        while (this.delivery_challan_Item_Dtls_for_jobwork.length ) 
        this.delivery_challan_Item_Dtls_for_jobwork.removeAt(0);
        for(let i=0;i<data.length;i++)
        this.add();
        this.delivery_challan_Item_Dtls_for_jobwork.patchValue(data);
        this.status = true;
      });

  }


  SendDataToDifferentComponenet()
  {
    for(let k=0;k<this.delivery_challan_Item_Dtls_for_jobwork.length;k++)
    {
      this.totalprice+=this.delivery_challan_Item_Dtls_for_jobwork.at(k).get("item_qty").value
    }
    this.userForm.patchValue({delivery_cid: this.challan_id,job_price_total:this.totalprice})
    this.userForm.patchValue(this.delivery_challan_Item_Dtls_for_jobwork.value)

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
    for(let i=0;i<this.delivery_challan_Item_Dtls_for_jobwork.length;i++)
    {
      
      if(this.delivery_challan_Item_Dtls_for_jobwork.at(i).get("checkbox").value == true || this.delivery_challan_Item_Dtls_for_jobwork.at(i).get("checkbox").value == "true")
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
