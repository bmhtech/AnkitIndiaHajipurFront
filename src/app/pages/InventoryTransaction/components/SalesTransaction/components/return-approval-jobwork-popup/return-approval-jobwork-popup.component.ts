import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { DeliveryChallan } from '../../../../../../Models/SalesTransaction/DeliveryChallan';
import { SalesOrder } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { SalesInvoice } from '../../../../../../Models/SalesTransaction/SalesInvoice';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-return-approval-jobwork-popup',
  templateUrl: './return-approval-jobwork-popup.component.html',
  styleUrls: ['./return-approval-jobwork-popup.component.scss']
})
export class ReturnApprovalJobworkPopupComponent implements OnInit {

  public userForm:FormGroup;
  SalesReturnType:any;
  customer:any;
  ReturnCriteria:any;
  ReturnbasedOn:any;
  Id:any;
  salesreturndate:any;
  showbutton:boolean=false;
  status:boolean=false;
  allList:any=[];
  salerorderflow:boolean=false;
  challanflow:boolean=false;
  invoiceflow:boolean=false;
  businessunit:any;
  Main:any;
  checkboxcheck:boolean=false;
  saleorderList:any=[];
  Order_id:any;
  finaldeliverylist:any;
  makechanges:boolean=true;
  totalprice:number=0;
  _item_qty:any;
  capacity:any = [];
  item_qty_old:any = [];
 

  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<ReturnApprovalJobworkPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
  {
    this.userForm=fb.group(
    {
      main_id: [''],
      order_id: [''],
      job_price_total: [''],
      multi_challan:[''],
      job_details: this.fb.array([this.fb.group({
          sl_no :'', 
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
          checkbox:'',
          capacity:''
    })]),
    deliverychallan:this.fb.array([this.fb.group({
      challan_no:'',
      delivery_cid:'',
      challan_date:'',
      checkbox:''
    })])
  
  
     });

    this.SalesReturnType =data["SalesReturnType"];// good accept
    this.customer = data['party_id'];//customername
    this.ReturnCriteria =data["ReturnCriteria"];//partial full//Partial Return
    this.ReturnbasedOn=data["ReturnbasedOn"];//order type
    this.Id=data["id"];//id
    this.salesreturndate = data['salesreturndate'];//date
    this.businessunit=data["businessunit"];
    
    if(this.ReturnbasedOn=="Sales Order")
    {
      this.salerorderflow=true;
    }
    if(this.ReturnbasedOn=="Delivery Challan")
    {
      this.challanflow=true;
    }
    if(this.ReturnbasedOn=="Sales Invoice")
    {
      this.invoiceflow=true;
    }


    if(this.ReturnCriteria == "Partial Return")
    {
      this.makechanges=false;
    }
    else
    {
      this.makechanges=true;
    }
  }

  get job_details(){ return this.userForm.get('job_details') as FormArray;}
  get deliverychallan(){ return this.userForm.get('deliverychallan') as FormArray;}

  

  ngOnInit() 
  {
    this.status = false;
    if(this.Id == 0)//on first time 
    {
      this.showbutton=true;
      this.DropDownListService.getSalesAllTransactionData(this.ReturnbasedOn,this.customer,this.salesreturndate,this.businessunit).subscribe(alltransdata=>
      {
        if(this.ReturnbasedOn=="Sales Order")
        {
          this.saleorderList=alltransdata;
          this.allList = alltransdata.filter(
            (thing, i, arr) => arr.findIndex(t => t.order_id === thing.order_id) === i
          );
        }
        else
        {
          this.allList=alltransdata;
        }
       
        this.status = true;
      }); 

    }
    else
    {
      this.showbutton=false;
      

    }
  }

  add()
  {
    this.job_details.push(this.fb.group({
      sl_no :'', 
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
          capacity:''
    }))
  }

  addchallan()
  {
    this.deliverychallan.push(this.fb.group({
      challan_no:'',
      delivery_cid:'',
      challan_date:'',
      checkbox:''
    })); 

  }

  checkorder(allList:SalesOrder)
  {
       this.Order_id=allList.order_id;
       this.Main = allList.order_id;
       while (this.deliverychallan.length )
       this.deliverychallan.removeAt(0);

       let orderlist:any=[];
       orderlist=this.saleorderList;
       console.log(" JSON"+JSON.stringify(this.saleorderList))
       let j=0;
       orderlist.forEach(element => {
        
        if(element.order_id == this.Order_id)
        {
          this.addchallan();
          this.deliverychallan.at(j).patchValue(element);
          j++;
        }
       });


  }
  

  checkdelivery(allList:DeliveryChallan)
  {

    this.Main = allList.delivery_cid;
    this.status = false;
    
    this.DropDownListService.deliverychallanjobworkRetriveList(this.Main).subscribe(jobData=>
    {
      this.status=true;
      this.add();
      let k=0;
      while (this.job_details.length) 
      this.job_details.removeAt(0);
      for(let data12 of jobData)
      {  
        this.add();
        this.job_details.patchValue(jobData);
       // console.log("job iem:"+JSON.stringify(data12))
        this.DropDownListService.getItemPackUom(this.job_details.at(k).get("job_item").value, this.job_details.at(k).get("job_packing").value,localStorage.getItem("company_name")).subscribe(capacitydata=>
        { 
          this.capacity[k] = capacitydata.capacity;
          //console.log("capacity:"+JSON.stringify(capacitydata))
          //console.log("item qty:"+this.capacity[k])
          //console.log("item qty:"+data12.item_qty)
          this.job_details.at(k).patchValue({capacity:capacitydata.capacity});
          this.item_qty_old[k] = data12.item_qty;
          k=k+1;
        });  
        
      }

    });

  }

  getJobItemQty(itemQty, index)
  {
    this._item_qty = itemQty.target.value;
    //console.log(Number(this.item_qty_old[index])+"index:"+index+"///"+this._item_qty)
   // this.job_details.at(index).patchValue({pack_qty:Number(this._item_qty)/Number(this.job_details.at(index).get("capacity").value)});
      if(Number(this.item_qty_old[index])>=this.job_details.at(index).get("item_qty").value)
      {
        //this.job_details.at(index).patchValue({pack_qty:Number(this._item_qty)/Number(this.capacity[index])});
        this.job_details.at(index).patchValue({pack_qty:Number(this._item_qty)/Number(this.job_details.at(index).get("capacity").value)});
      }
      else
      {
        alert("Qty must be inside Limit "+this.item_qty_old[index])
        this.job_details.at(index).patchValue({item_qty:0,pack_qty:0});
      }   
   }

  checkinvoice(allList:SalesInvoice)
  {

  }


  checkdeliverychallan(index)
  {
    this.finaldeliverylist="";
    let challan_list="";
    for(let i=0;i<this.deliverychallan.length;i++)
    {
      if(this.deliverychallan.at(i).get("checkbox").value == true || this.deliverychallan.at(i).get("checkbox").value == 'true')
      {
        challan_list+=this.deliverychallan.at(i).get("delivery_cid").value+",";
      }
    }
    this.finaldeliverylist=challan_list.substring(0,challan_list.length-1);
    this.add();
    while (this.job_details.length )
    this.job_details.removeAt(0);
    this.DropDownListService.getdeliverchallanjobitemlist(this.finaldeliverylist).subscribe(deliveryitemdetails=>
    {
      let k=0;
      for(let data1 of deliveryitemdetails)
      {
        this.add();
        this.job_details.patchValue(deliveryitemdetails);
        console.log("job iem1:"+JSON.stringify(data1))
        this.DropDownListService.getItemPackUom(this.job_details.at(k).get("job_item").value, this.job_details.at(k).get("job_packing").value,localStorage.getItem("company_name")).subscribe(capacitydata=>
          { 
            this.capacity[k] = capacitydata.capacity;
            console.log("capacity1:"+JSON.stringify(capacitydata))
            //console.log("item qty:"+this.capacity[k])
            console.log("item qty1:"+data1.item_qty)
            this.job_details.at(k).patchValue({capacity:capacitydata.capacity});
            this.item_qty_old[k] = data1.item_qty;
            k=k+1;
          });  

      }
    
    });

  }
  
  SendDataToDifferentComponenet()
  {    
    for(let k=0;k<this.job_details.length;k++)
    {
      this.totalprice+=this.job_details.at(k).get("item_qty").value
    }
    
    this.userForm.patchValue({main_id: this.Main,order_id:this.Order_id,job_price_total:this.totalprice,multi_challan:this.finaldeliverylist});
    this.userForm.patchValue(this.job_details.value);
    
    for(let i=0;i<this.job_details.length;i++)
    {
      if(this.job_details.at(i).get("checkbox").value==true || this.job_details.at(i).get("checkbox").value=='true')
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
