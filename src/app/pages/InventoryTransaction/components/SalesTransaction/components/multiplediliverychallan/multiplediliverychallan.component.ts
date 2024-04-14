import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-multiplediliverychallan',
  templateUrl: './multiplediliverychallan.component.html',
  styleUrls: ['./multiplediliverychallan.component.scss']
})
export class MultiplediliverychallanComponent implements OnInit {
  public userForm:FormGroup;
  challanList:any = [];
  challan_item_List:any = [];
  challan_id = "0";
  invoiceType:any;
  date:any;
  customer:any;
  companyId:any;
  status = false;
  ReturnCriteria:any;
  SalesReturnType:any;
  showsubmitbutton:boolean=true;
  showsubmitbutton1:boolean=false;
  checkSubmit:any= [];
  checkboxcheck:boolean=false;
  ParentModel:any;
  Id:number;
  showbutton:boolean=true;

  _item_qty:any;
  _packing_qty:any;
  _mrp:any;
  _taxrate:any;
  _taxAmt:any;
  _netAmt:any;
  _discount:any;
  _totalAmt:any;
  _priceBasedOn:any;
  _discountBasadOn:any;
  discountAmt:any;
  amt:any;
  itemId:any;
  capacity:any = [];
  Packing:any;
  empty_bag_wt:any = [];
  company_name:any;
  finaldeliverylist:any;

    editable: boolean = false;
    PriceReadOnly:boolean = false;
    PackingQty:boolean = false;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<MultiplediliverychallanComponent>, @Inject(MAT_DIALOG_DATA)data) {

      this.userForm=fb.group(
        {
          alldeliveryid:['']
          ,
          delivery_challan: this.fb.array([this.fb.group({
           
            challan_no:'',
            challan_date:'',
            checkbox:'',
            delivery_cid:''
          })])
        ,
        delivery_challan_Item_Dtls: this.fb.array([this.fb.group({
          slno:'',
          item_code:'',
          hsn_code:'',
          item_name:'',
          packing:'',
          packing_name: '',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          con_factor:'',
          mat_wt:'',
          price:'',
          price_based_on:'',
          amount:'',
          discount_type:'',
          discount_rate:'',
          discount_amt: '',
          tolerance:'',
          tax_code:'',
          tax_rate: '',
          tax_amt:'',
          cgstamt: '',
          sgstamt: '',
          igstamt: '',
          total_amt:'',
          acc_norms:'',
          checkbox:'',
          delivery_cid:''
          })])
        
        
        });

        this.invoiceType = data['invoice_type'];
        this.customer = data['party_id'];
        this.companyId = data['company_id'];
        this.date = data['date'];
        this.ReturnCriteria =data["ReturnCriteria"];
        this.SalesReturnType =data["SalesReturnType"];
        this.ParentModel=data["parent_model"];
        this.Id=data["id"];
     }


     get delivery_challan(){{ return this.userForm.get('delivery_challan') as FormArray;}}
     get delivery_challan_Item_Dtls(){{ return this.userForm.get('delivery_challan_Item_Dtls') as FormArray;}}
  
     addchallan()
     {
       this.delivery_challan.push(this.fb.group({
       
        challan_no:'',
        challan_date:'',
        checkbox:'',
        delivery_cid:''
      }))
    }

     additemdetails()
    {
      this.delivery_challan_Item_Dtls.push(this.fb.group({
        slno:'',
        item_code:'',
        item_name:'',
        hsn_code:'',
        packing:'',
        packing_name: '',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        con_factor:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        discount_type:'',
        discount_rate:'',
        discount_amt: '',
        tolerance:'',
        tax_code:'',
        tax_rate: '',
        tax_amt:'',
        cgstamt: '',
        sgstamt: '',
        igstamt: '',
        total_amt:'',
        acc_norms:'',
        checkbox:'true',
        delivery_cid:''
      }))
    }
     
     ngOnInit() 
     {
        this.status = false;
        this.company_name = localStorage.getItem("company_name");
        if(this.Id == 0)//on first time 
        {
            this.showbutton=true;
            if(this.invoiceType != "0")
            {
              this.DropDownListService.getMultipleDelvChallans("invtype="+this.invoiceType+"&party="+this.customer+"&invdate="+this.date+"&comp="+this.companyId+"&parentmodel="+this.ParentModel).subscribe(challanlist=>
              {
                while (this.delivery_challan.length ) 
                this.delivery_challan.removeAt(0);
                for(let data1 of challanlist)
                this.addchallan();
                this.delivery_challan.patchValue(challanlist);
                this.status = true;

              });
            }
            else
            {
              this.DropDownListService.getMultipleDelvChallansApp("party="+this.customer+"&invdate="+this.date+"&comp="+this.companyId+"&parentmodel="+this.ParentModel).subscribe(challanlist=>
              {
                while (this.delivery_challan.length ) 
                this.delivery_challan.removeAt(0);
                for(let data1 of challanlist)
                this.addchallan();
                this.delivery_challan.patchValue(challanlist);
                this.status = true;
              });
            }
          
        }
        else //update time
        {
          this.showbutton=false;
          this.DropDownListService.getMultipleDelvChallansUpdate(this.Id).subscribe(challanlist=>
            {
              //console.log("delv data:"+JSON.stringify(challanlist))
              
              while (this.delivery_challan.length ) 
              this.delivery_challan.removeAt(0);
              for(let data1 of challanlist)
              this.addchallan();
              this.delivery_challan.patchValue(challanlist);
              this.status = true;
              for(let k=0;k<this.delivery_challan.length;k++)
              {
                this.delivery_challan.at(k).patchValue({checkbox:true})
              }
            });
         
            this.DropDownListService.getdeliverchallanitemlistUpdate(this.Id).subscribe(data=>
              {
                while (this.delivery_challan_Item_Dtls.length)
                this.delivery_challan_Item_Dtls.removeAt(0);

                    for(let i=0;i<data.length;i++)
                    this.additemdetails();
                  
                    if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                    {
                    for(let k=0;k<this.delivery_challan_Item_Dtls.length;k++)
                    {
                    this.delivery_challan_Item_Dtls.at(k).patchValue({checkbox:true});
                    this.delivery_challan_Item_Dtls.at(k).get("checkbox").disable();
                    this.delivery_challan_Item_Dtls.at(k).get("price_based_on").disable();
                    //this.delivery_challan_Item_Dtls.at(k).disable();
                    this.editable = true;
                    this.PackingQty = true;
                    this.PriceReadOnly =true;
                    }
                    }
                    else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Acceptance of Lower Rate')
                    {
                      this.PackingQty = false;
                      this.editable = true;
                      this.PriceReadOnly =false;
                      for(let i=0;i<this.delivery_challan_Item_Dtls.length;i++)
                      {
                      this.delivery_challan_Item_Dtls.at(i).get("price_based_on").disable();
                      }
                    }
                    else if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Acceptance of Lower Rate')
                    {
                      this.PackingQty = true;
                      this.editable = true;
                      this.PriceReadOnly =false;
                      for(let i=0;i<this.delivery_challan_Item_Dtls.length;i++)
                      {
                      this.delivery_challan_Item_Dtls.at(i).get("price_based_on").disable();
                      }
                    }
                    else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                    {
                      this.PackingQty = false;
                      this.editable = true;
                      this.PriceReadOnly =true;
                      for(let i=0;i<this.delivery_challan_Item_Dtls.length;i++)
                    {
                      this.delivery_challan_Item_Dtls.at(i).get("price_based_on").disable();
                    }
                    }
                  else
                  {
                    this.PackingQty = true;
                    this.editable = true;
                    this.PriceReadOnly =false;
                    for(let m=0;m<this.delivery_challan_Item_Dtls.length;m++)
                    {
                    this.delivery_challan_Item_Dtls.at(m).get("price_based_on").enable();
                    }
                  }
                    this.delivery_challan_Item_Dtls.patchValue(data);
                    this.status = true;
              });

        }
 
     }

     checkdeliverychallan(index)
     {
            this.finaldeliverylist="";
            let challan_list="";
            while (this.delivery_challan_Item_Dtls.length)
            this.delivery_challan_Item_Dtls.removeAt(0);
            for(let i=0;i<this.delivery_challan.length;i++)
            {
              if(this.delivery_challan.at(i).get("checkbox").value == true || this.delivery_challan.at(i).get("checkbox").value == 'true')
              {
                challan_list+=this.delivery_challan.at(i).get("delivery_cid").value+",";
              }
              
            }
            this.finaldeliverylist=challan_list.substring(0,challan_list.length-1);
            this.DropDownListService.getdeliverchallanitemlist(this.finaldeliverylist).subscribe(data=>
            {
              
                  console.log(JSON.stringify(data))
                  while (this.delivery_challan_Item_Dtls.length ) 
                  this.delivery_challan_Item_Dtls.removeAt(0);
                  for(let i=0;i<data.length;i++)
                  this.additemdetails();
                
                  if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                  {
                  for(let k=0;k<this.delivery_challan_Item_Dtls.length;k++)
                  {
                  
                  this.delivery_challan_Item_Dtls.at(k).patchValue({checkbox:true});
                  this.delivery_challan_Item_Dtls.at(k).get("checkbox").disable();
                  this.delivery_challan_Item_Dtls.at(k).get("price_based_on").disable();
                  //this.delivery_challan_Item_Dtls.at(k).disable();
                  this.editable = true;
                  this.PackingQty = true;
                  this.PriceReadOnly =true;
                  }
                  }

                  else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Acceptance of Lower Rate')
                  {
                    this.PackingQty = false;
                    this.editable = true;
                    this.PriceReadOnly =false;
                    for(let i=0;i<this.delivery_challan_Item_Dtls.length;i++)
                    {
                    this.delivery_challan_Item_Dtls.at(i).get("price_based_on").disable();
                    }
                  }

                  else if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Acceptance of Lower Rate')
                  {
                    this.PackingQty = true;
                    this.editable = true;
                    this.PriceReadOnly =false;
                    for(let i=0;i<this.delivery_challan_Item_Dtls.length;i++)
                    {
                    this.delivery_challan_Item_Dtls.at(i).get("price_based_on").disable();
                    }
                  }

                  else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                  {
                    this.PackingQty = false;
                    this.editable = true;
                    this.PriceReadOnly =true;
                    for(let i=0;i<this.delivery_challan_Item_Dtls.length;i++)
                  {
                    this.delivery_challan_Item_Dtls.at(i).get("price_based_on").disable();
                  }
                  }

                else
                {
                  this.PackingQty = true;
                  this.editable = true;
                  this.PriceReadOnly =false;
                  for(let m=0;m<this.delivery_challan_Item_Dtls.length;m++)
                  {
                  this.delivery_challan_Item_Dtls.at(m).get("price_based_on").enable();
                  }
                }

                  this.delivery_challan_Item_Dtls.patchValue(data);
                  this.status = true;
                

              
            });

            if(this.delivery_challan_Item_Dtls.length == 0)
            {
              this.additemdetails();
              this.delivery_challan_Item_Dtls.at(0).patchValue({checkbox:false})
            }


         // }
     }

     getPackingQty(packingQty, index)
     {
       this.Packing =  this.delivery_challan_Item_Dtls.at(index).get("packing").value as FormControl;
       this.itemId =  this.delivery_challan_Item_Dtls.at(index).get("item_code").value as FormControl;
       this.DropDownListService.getItemPackUom(this.itemId, this.Packing,this.company_name).subscribe(data=>
         {  
           this.capacity[index] = data.capacity; 
           this.empty_bag_wt[index] = data.empty_big_wt;
           //this.delivery_challan_Item_Dtls.at(index).patchValue({suom: data.uom1, quantity: this.capacity * parseInt(this.packingQty)});
           this.status = true;
         });
 
       this._packing_qty = packingQty.target.value;
       this._item_qty = this.capacity[index] * this._packing_qty;
       this.delivery_challan_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty - this.empty_bag_wt[index]});
  
       this._mrp = this.delivery_challan_Item_Dtls.at(index).get("price").value as FormControl;
       this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
       this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
       this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
       this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;
 
 //alert("_mrp: "+this._mrp+"_priceBasedOn : "+this._priceBasedOn +"_discount: "+this._discount +"_taxrate : "+this._taxrate)
 //alert("_discountBasadOn: "+this._discountBasadOn+"_priceBasedOn : "+this._priceBasedOn +"_discount: "+this._discount +"_taxrate : "+this._taxrate)
       this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
         this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
     }
 
     calculateItemData(packingQty, ItemQty, price, PriceBasedOn, discount, discountBasedOn, taxrate, index)
     {
      
       if(PriceBasedOn == "Packing")
       {this.amt = price * packingQty}
 
       if(PriceBasedOn == "Item")
       {this.amt = price * ItemQty}
 
       if(PriceBasedOn == "0")
       {this.amt = 0}   
 
       if(discountBasedOn == "Uom")
       {this.discountAmt = discount;}
 
       if(discountBasedOn == "%")
       {this.discountAmt =  this.amt * (discount / 100);}
 
       if(discountBasedOn == "0")
       {this.discountAmt = 0}
 
       let netAmt = this.amt - this.discountAmt;
       if(taxrate == 0)
       this._taxAmt = 0; 
       else 
       this._taxAmt = netAmt *(taxrate/100);
       this._totalAmt = this._taxAmt + netAmt;
       this.delivery_challan_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
         discount_amt:this.discountAmt.toFixed(2), net_amount: netAmt.toFixed(2), 
         taxable_amount:this.amt.toFixed(2), tax_amt: this._taxAmt.toFixed(2), 
         total_amt:this._totalAmt.toFixed(2)});
        
      
     }
 
     _PriceBasedOn:any;
     SendDataToDifferentComponenet()
     {    
       this.userForm.patchValue({alldeliveryid: this.finaldeliverylist});
       this.userForm.patchValue(this.delivery_challan_Item_Dtls.value);
       
       for(let i=0;i<this.delivery_challan_Item_Dtls.length;i++)
       {
         if(this.delivery_challan_Item_Dtls.at(i).get("checkbox").value==true || this.delivery_challan_Item_Dtls.at(i).get("checkbox").value=='true')
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
