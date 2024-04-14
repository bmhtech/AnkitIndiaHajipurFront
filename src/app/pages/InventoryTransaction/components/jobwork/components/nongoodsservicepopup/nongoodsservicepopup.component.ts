import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { InputItemPopupComponent } from '../../../Production/components/input-item-popup/input-item-popup.component';

@Component({
  selector: 'app-nongoodsservicepopup',
  templateUrl: './nongoodsservicepopup.component.html',
  styleUrls: ['./nongoodsservicepopup.component.scss']
})
export class NongoodsservicepopupComponent implements OnInit {
  public userForm1:FormGroup;
  check:any;
  status = false;
  id:any;
  company_name:any;
  services:any;
  service_sl_no = 1;
  descPriceCheck:boolean=true;
  servicedetailslist:any=[];
  billcheck:boolean=false;
  serviceUOMlist:any=[];
  ordertype:any;
  billing_from:any;
  billing_to:any;
  ordertypecheck:boolean=false;
  rowamount:any;

  
  constructor(private fb: FormBuilder, private Service : Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<NongoodsservicepopupComponent>, @Inject(MAT_DIALOG_DATA)data) 
    {
      this.status = false;

      this.userForm1=fb.group
      ({
        totalamt: [''],
    
        nonservice_desc_details: this.fb.array([this.fb.group({
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

        this.services = data.services;
        this.company_name = localStorage.getItem("company_name");
        this.id=data.id;
        this.ordertype=data.ordertype;
        this.billing_from=data.billing_from;
        this.billing_to=data.billing_to;
        this.rowamount=data.rowamount;
        
    
      }
     
      get totalamt(){ return this.userForm1.get("totalamt") as FormControl }
      get nonservice_desc_details(){{ return this.userForm1.get('nonservice_desc_details') as FormArray;}}

    add()
    {
      this.service_sl_no =this.service_sl_no +1;
      this.nonservice_desc_details.push(this.fb.group({
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
        this.nonservice_desc_details.removeAt(index);
      }
      else
      {
        if(this.nonservice_desc_details.length>1)
        {
         
          this.nonservice_desc_details.removeAt(index);
        }
        else
        {
          alert("can't delete all rows");
        }
        
      } 
      let total:number=0;
      for(let i=1; i<=this.nonservice_desc_details.length; i++)
      {
        this.nonservice_desc_details.at(i-1).patchValue({slno: i});
        total+=Number(this.nonservice_desc_details.at(i-1).get("desc_total").value);
        this.service_sl_no=i;
      }
      this.userForm1.patchValue({totalamt:total});
    }

    getAmount()
    {
        let total:number=0;
        for(let t=0;t<this.nonservice_desc_details.length;t++)
        {
          total+=Number(this.nonservice_desc_details.at(t).get("desc_total").value);
        }
        this.userForm1.patchValue({totalamt:total});
    } 

    getprice(index)
    {
      let price:number=0;
      price=Number(this.nonservice_desc_details.at(index).get("desc_qty").value)*Number(this.nonservice_desc_details.at(index).get("desc_price").value);
      this.nonservice_desc_details.at(index).patchValue({desc_total:price});
      let total:number=0;
      for(let t=0;t<this.nonservice_desc_details.length;t++)
      {
          total+=Number(this.nonservice_desc_details.at(t).get("desc_total").value);
      }
      this.userForm1.patchValue({totalamt:total});
    }
    
    
    getqty(index)
    {
      let price:number=0;
      let total:number=0;
      price=Number(this.nonservice_desc_details.at(index).get("desc_qty").value)*Number(this.nonservice_desc_details.at(index).get("desc_price").value);
    
      this.nonservice_desc_details.at(index).patchValue({desc_total:price});
      
      for(let t=0;t<this.nonservice_desc_details.length;t++)
      {
        total+=Number(this.nonservice_desc_details.at(t).get("desc_total").value);
      }
      this.userForm1.patchValue({totalamt:total});
    }
  
  ngOnInit() 
  {
    this.service_sl_no = 0;
    while (this.nonservice_desc_details.length) 
    this.nonservice_desc_details.removeAt(0);
    this.add();//billingon

    if(this.ordertype=='One Time')
    {
      this.ordertypecheck=true;
      
      let todate=new Date(this.billing_to);
      let date = new Date();
      date.setDate(todate.getDate() +1);
      let ndate=new Date(date).toISOString().slice(0, -14);
      this.nonservice_desc_details.at(0).patchValue({billing_from:this.billing_from,billing_to:this.billing_to,duedate:ndate});
    }
    else{
      this.ordertypecheck=false;
      this.nonservice_desc_details.at(0).patchValue({billing_from:'',billing_to:''});
    }
  
    if(this.id>0)
    {
      forkJoin(
        this.DropDownListService.retriveNongoodsService(this.id),
        this.DropDownListService.getServiceMasterDetails(this.services),
        this.DropDownListService.getStandardCustomUOM(this.company_name)
        ).subscribe(([nongoods,masterdetailsdata,alluomlist])=>
        {

          this.servicedetailslist=masterdetailsdata;
          this.serviceUOMlist=alluomlist;
          this.userForm1.patchValue({totalamt:this.rowamount});
          this.DropDownListService.getItemDetailsSerList(nongoods["nongoodsserviceid"],this.services).subscribe(servicedata=>
            {
              while (this.nonservice_desc_details.length) 
              this.nonservice_desc_details.removeAt(0);
              this.service_sl_no = 0;
              let n=0
              for(let data1 of servicedata)
              {   
                this.add();
                this.nonservice_desc_details.at(n).patchValue(data1);
                n++;
              }

            });
        });
    }
    else{
      forkJoin(
        this.DropDownListService.getServiceMasterDetails(this.services),
        this.DropDownListService.getStandardCustomUOM(this.company_name)
        ).subscribe(([masterdetailsdata,alluomlist])=>
        {
          this.servicedetailslist=masterdetailsdata;
          this.serviceUOMlist=alluomlist;
        });
        
    }
   
    this.status=true;
  }

  onChangeBillPeriod(index,billfrom)
  {
    let billperiod=this.nonservice_desc_details.at(index).get("bill_period").value;
  
    if(billperiod=="Daily")
    {
      let billto=billfrom.target.value;
      let todate=new Date(billto);
      let date = new Date();
      date.setDate(todate.getDate() +1);
      let ndate=new Date(date).toISOString().slice(0, -14);
      this.nonservice_desc_details.at(index).patchValue({billing_to:billto,duedate:ndate});
    }

    else if(billperiod=="Monthly")
    {
      let fromdate = new Date(billfrom.target.value);
      let d = new Date(fromdate);
      d.setMonth(d.getMonth() + +1);
      let ndate=new Date(d).toISOString().slice(0, -14);
      let d1 = new Date(ndate);
      d1.setDate(d1.getDate() +1);
      let ndate1=new Date(d1).toISOString().slice(0, -14);
      this.nonservice_desc_details.at(index).patchValue({billing_to:ndate,duedate:ndate1});
    }

    else if(billperiod=="Quaterly")
    {
      let fromdate = new Date(billfrom.target.value);
      let d = new Date(fromdate);
      d.setMonth(d.getMonth() + +3);
      let ndate=new Date(d).toISOString().slice(0, -14);
      let d1 = new Date(ndate);
      d1.setDate(d1.getDate() +1);
      let ndate1=new Date(d1).toISOString().slice(0, -14);
      this.nonservice_desc_details.at(index).patchValue({billing_to:ndate,duedate:ndate1});
    }
    else
    {
      let fromdate = new Date(billfrom.target.value);
      let d = new Date(fromdate);
      d.setMonth(d.getMonth() + +12);
      let ndate=new Date(d).toISOString().slice(0, -14);
      let d1 = new Date(ndate);
      d1.setDate(d1.getDate() +1);
      let ndate1=new Date(d1).toISOString().slice(0, -14);
      this.nonservice_desc_details.at(index).patchValue({billing_to:ndate,duedate:ndate1});
    }
  }

  onChangeBillingOn(bill)
  {
    if(bill.target.value=="Quantity")
    {
      this.billcheck=false;
    }
    else
    {
      this.billcheck=true;
    }
  }

  SendDataToDifferentComponenet()
  {    
    this.userForm1.patchValue(this.nonservice_desc_details.value);
    this.dialogRef.close(this.userForm1.getRawValue());
  }
 
}
