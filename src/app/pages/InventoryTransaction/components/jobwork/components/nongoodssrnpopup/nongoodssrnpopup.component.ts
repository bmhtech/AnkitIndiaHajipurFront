import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-nongoodssrnpopup',
  templateUrl: './nongoodssrnpopup.component.html',
  styleUrls: ['./nongoodssrnpopup.component.scss']
})



export class NongoodssrnpopupComponent implements OnInit 
{
  public userForm1:FormGroup;
  id:any;
  services:any;
  ordertype:any;
  srndate:any;
  rowamount:any;
  service_sl_no = 1;
  servicedetailslist:any=[];
  serviceUOMlist:any=[];
  company_name:any;
  ordertypecheck:boolean=false;
  status=false;
  showsubmitbutton:boolean=true;
  showsubmitbutton1:boolean=true;
  nongoodsserviceid = '0';
  b_unit:any;
  orderid:any;

  constructor(private fb: FormBuilder, private Service : Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<NongoodssrnpopupComponent>, @Inject(MAT_DIALOG_DATA)data) 
  {
    this.status = false;
    this.userForm1=fb.group
    ({
      totalamt: [''],
  
      nonservicesrn_desc_details: this.fb.array([this.fb.group({
        slno:this.service_sl_no,
        desc_name:'',
        bill_period:'',
        bill_on:'',
        amount_change:'',
        desc_qty:'',
        desc_uom:'',
        desc_price:'',
        desc_total:'',
        billing_from:'',
        billing_to:'',
        duedate:'',
        remarks:'',
        serviceno:''
        })]),
      });
   
    this.id = data.id;
    this.services= data.services;
    this.ordertype= data.ordertype;
    this.srndate= data.srndate;
    this.rowamount= data.rowamount;
    this.orderid=data.orderid;
    this.company_name = localStorage.getItem("company_name");
   }

   get totalamt(){ return this.userForm1.get("totalamt") as FormControl }
   get nonservicesrn_desc_details(){{ return this.userForm1.get('nonservicesrn_desc_details') as FormArray;}}


  ngOnInit()
   {
    this.service_sl_no = 0;
    while (this.nonservicesrn_desc_details.length) 
    this.nonservicesrn_desc_details.removeAt(0);
    this.add();

    if(this.id>0)
    {
      forkJoin(
        this.DropDownListService.retriveNongoodsSrn(this.id),
        this.DropDownListService.getServiceMasterDetails(this.services),
        this.DropDownListService.getStandardCustomUOM(this.company_name)
        ).subscribe(([srn,masterdetailsdata,alluomlist])=>
        {

          this.servicedetailslist=masterdetailsdata;
          this.serviceUOMlist=alluomlist;
          this.userForm1.patchValue({totalamt:this.rowamount});
          this.DropDownListService.getSrnItemDetailsSerList(srn["srnid"],this.services).subscribe(servicedata=>
            {
              while (this.nonservicesrn_desc_details.length) 
              this.nonservicesrn_desc_details.removeAt(0);
              this.service_sl_no = 0;
              let n=0
              for(let data1 of servicedata)
              {   
                this.add();
                this.nonservicesrn_desc_details.at(n).patchValue(data1);
                n++;
              }

            });
        });
    }
    else{
      forkJoin(
        this.DropDownListService.getServiceMasterDetails(this.services),
        this.DropDownListService.getStandardCustomUOM(this.company_name),
        this.DropDownListService.getDescAccordingBillPeriodList(this.orderid,this.services)
        ).subscribe(([masterdetailsdata,alluomlist,descriptionlist])=>
        {
          
        
         // console.log("descriptionlist:"+JSON.stringify(descriptionlist))
          let l=0;
          this.service_sl_no = 0;
          while (this.nonservicesrn_desc_details.length) 
          this.nonservicesrn_desc_details.removeAt(0);
          for(let data of descriptionlist) 
          {   
            this.add(); 
            this.servicedetailslist=masterdetailsdata;
            this.serviceUOMlist=alluomlist;
            this.nonservicesrn_desc_details.at(l).patchValue({desc_name:data["desc_name"],bill_period:data["bill_period"],
            bill_on:data["bill_on"],amount_change:data["amount_change"],desc_uom:data["desc_uom"],desc_price:data["desc_price"],
            billing_from:data["nextbillingfrom"],billing_to:data["nextbillingto"]});
            l++;
                
          }
         
        });
        
    }
   
    this.status=true;
   

   }
   add()
   {
     this.service_sl_no =this.service_sl_no +1;
     this.nonservicesrn_desc_details.push(this.fb.group({
       slno:this.service_sl_no,
       desc_name:'',
       bill_period:'',
       bill_on:'',
       amount_change:'',
       desc_qty:'',
       desc_uom:'',
       desc_price:'',
       desc_total:'',
       billing_from:'',
       billing_to:'',
       duedate:'',
       remarks:'',
       serviceno:this.services
      }));
   }


   itemdelete(index) 
   {
     if(index)
     {
       this.nonservicesrn_desc_details.removeAt(index);
     }
     else
     {
       if(this.nonservicesrn_desc_details.length>1)
       {
        
         this.nonservicesrn_desc_details.removeAt(index);
       }
       else
       {
         alert("can't delete all rows");
       }
       
     } 
     let total:number=0;
     for(let i=1; i<=this.nonservicesrn_desc_details.length; i++)
     {
       this.nonservicesrn_desc_details.at(i-1).patchValue({slno: i});
       total+=Number(this.nonservicesrn_desc_details.at(i-1).get("desc_total").value);
       this.service_sl_no=i;
     }
     this.userForm1.patchValue({totalamt:total});
   }

   getAmount()
   {
       let total:number=0;
       for(let t=0;t<this.nonservicesrn_desc_details.length;t++)
       {
         total+=Number(this.nonservicesrn_desc_details.at(t).get("desc_total").value);
       }
       this.userForm1.patchValue({totalamt:total});
   } 

   getprice(index)
   {
     let price:number=0;
     price=Number(this.nonservicesrn_desc_details.at(index).get("desc_qty").value)*Number(this.nonservicesrn_desc_details.at(index).get("desc_price").value);
     this.nonservicesrn_desc_details.at(index).patchValue({desc_total:price});
     let total:number=0;
     for(let t=0;t<this.nonservicesrn_desc_details.length;t++)
     {
         total+=Number(this.nonservicesrn_desc_details.at(t).get("desc_total").value);
     }
     this.userForm1.patchValue({totalamt:total});
   }
   
   
   getqty(index)
   {
     let price:number=0;
     let total:number=0;
     price=Number(this.nonservicesrn_desc_details.at(index).get("desc_qty").value)*Number(this.nonservicesrn_desc_details.at(index).get("desc_price").value);
   
     this.nonservicesrn_desc_details.at(index).patchValue({desc_total:price});
     
     for(let t=0;t<this.nonservicesrn_desc_details.length;t++)
     {
       total+=Number(this.nonservicesrn_desc_details.at(t).get("desc_total").value);
     }
     this.userForm1.patchValue({totalamt:total});
   }

   SendDataToDifferentComponenet()
    {    
      this.userForm1.patchValue(this.nonservicesrn_desc_details.value);
      this.dialogRef.close(this.userForm1.getRawValue());
    }

}
