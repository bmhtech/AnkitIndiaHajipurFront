import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatCheckboxChange} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { DeliveryChallan } from '../../../../../../Models/SalesTransaction/DeliveryChallan';

  @Component({
    selector: 'app-delivery-challan-pop-up',
    templateUrl: './delivery-challan-pop-up.component.html',
    styleUrls: ['./delivery-challan-pop-up.component.scss']})

  export class DeliveryChallanPopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    challanList:any = [];
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
    gst_taxdifstat:boolean=false;
    StateName:any;
    
    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<DeliveryChallanPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        delivery_cid: [''],
        taxdif: [''],
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
          cgstamt: '',
          sgstamt: '',
          igstamt: '',
          tax_amt:'',
          total_amt:'',
          acc_norms:'',
          checkbox:'',
      })])});
      this.invoiceType = data['invoice_type'];
      this.customer = data['party_id'];
      this.companyId = data['company_id'];
      this.date = data['date'];
      this.ReturnCriteria =data["ReturnCriteria"];
      this.SalesReturnType =data["SalesReturnType"];
      this.ParentModel=data["parent_model"];
      this.Id=data["id"];


    }

    get delivery_challan_Item_Dtls(){{ return this.userForm.get('delivery_challan_Item_Dtls') as FormArray;}}

    ngOnInit() 
    {
      //console.log("inv type:"+this.invoiceType)
      this.status = false;
      this.company_name = localStorage.getItem("company_name");
      if(this.Id == 0)//on first time 
      {
        this.showbutton=true;
            if(this.invoiceType != "0")
            {
              //this.DropDownListService.getDelvChallans("invtype="+this.invoiceType+"&party="+this.customer+"&invdate="+this.date+"&comp="+this.companyId+"&parentmodel="+this.ParentModel).subscribe(data=>
                this.DropDownListService.getDelvChallansnew("invtype="+this.invoiceType+"&party="+this.customer+"&invdate="+this.date+"&comp="+this.companyId+"&parentmodel="+this.ParentModel).subscribe(data=>
              {
                //console.log("if");
                //console.log("if data"+JSON.stringify(data));
                this.challanList  = data;
                this.status = true;
              });
            }
            else
            {
             // console.log("else");
             // this.DropDownListService.getDelvChallansApp("party="+this.customer+"&invdate="+this.date+"&comp="+this.companyId+"&parentmodel="+this.ParentModel).subscribe(data=>
             this.DropDownListService.getDelvChallansReturnApp("party="+this.customer+"&invdate="+this.date+"&comp="+this.companyId+"&parentmodel="+this.ParentModel).subscribe(data=>
              {
                //console.log("else data"+JSON.stringify(data));
                this.challanList  = data;
                this.status = true;
              });
            }
      }
      else
      {
        this.showbutton=false;
        this.DropDownListService.getdiliverychallanreturnapprovepopup(this.Id).subscribe
        (deliverydata =>
          {
            //console.log("chk data1:"+JSON.stringify(deliverydata))
            this.challanList  = deliverydata;
            this.DropDownListService.getreturnnoteitemdetails(deliverydata[0]['delivery_cid']).subscribe(itemdetails=>
              {
                console.log("chk data:"+JSON.stringify(itemdetails))
                while (this.delivery_challan_Item_Dtls.length ) 
                this.delivery_challan_Item_Dtls.removeAt(0);
                for(let i=0;i<itemdetails.length;i++)
                this.add();
               // console.log("chk data:"+this.ReturnCriteria+"//"+this.SalesReturnType)
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
        
                this.delivery_challan_Item_Dtls.patchValue(itemdetails);
                this.status = true;
              })

            this.status = true;
          })

      }

      this.Service.custAddRetriveList(this.customer).subscribe(data=>
        {
             
          this.StateName=data.state;
        })
      
    }

    add()
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
        cgstamt: '',
        sgstamt: '',
        igstamt: '',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        checkbox:'true',
      }))
    }

    editable: boolean = false;
    PriceReadOnly:boolean = false;
    PackingQty:boolean = false;
    check1(challanList:DeliveryChallan)
    {
      this.challan_id = challanList.delivery_cid;
      this.status = false;
      //this.DropDownListService.getDlvChallanItemDtls(this.challan_id).subscribe(data=>
      this.DropDownListService.getRestDlvChallanItemDtls(this.challan_id).subscribe(data=>
      {
       // console.log("Check1 data::"+JSON.stringify(data))
        this.packqty=data;
        while (this.delivery_challan_Item_Dtls.length ) 
        this.delivery_challan_Item_Dtls.removeAt(0);
        for(let i=0;i<data.length;i++)
        this.add();
       
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

    // onChangeCheckbox(event:MatCheckboxChange,index): void 
    // {
    //   console.log("checked: "+event.checked);
    //   if(event.checked==true)
    //   {
    //     //this.delivery_challan_Item_Dtls.at(index).patchValue()
    //   }
    // }

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
    packqty: any = [];

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
       

      this._packing_qty = packingQty.target.value;
     // this.delivery_challan_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty - this.empty_bag_wt[index]});
     this._item_qty = this.capacity[index] * this._packing_qty;
     //console.log("first:"+this._item_qty)
     this.packqty.forEach(element => {
      if (element.item_code == this.delivery_challan_Item_Dtls.at(index).get("item_code").value && element.packing == this.delivery_challan_Item_Dtls.at(index).get("packing").value && element.squantity < this._packing_qty) {
        alert("Packing Qty Exceeds..");
        this._item_qty = this.capacity[index] * element.squantity;
        //console.log("if"+this._item_qty)
        this.delivery_challan_Item_Dtls.at(index).patchValue({squantity:element.squantity,quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3)});
       }
       else{
        //console.log("else"+this._item_qty)
        this.delivery_challan_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3)});
       }
    });
     
    this._mrp = this.delivery_challan_Item_Dtls.at(index).get("price").value as FormControl;
      this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;

      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   

  });

      
    }

    round(num, decimalPlaces = 0) {
      var p = Math.pow(10, decimalPlaces);
      var n = (num * p) * (1 + Number.EPSILON);
      return Math.round(n) / p;
    }
    
    calculateItemData(packingQty, ItemQty, price, PriceBasedOn, discount, discountBasedOn, taxrate, index)
    {
     //console.log("enter cal:"+PriceBasedOn+"//"+price+"//"+ItemQty)
      if(PriceBasedOn == "Packing")
      {this.amt = price * packingQty}

      if(PriceBasedOn == "Item")
      {this.amt = price * ItemQty}

      if(PriceBasedOn == "0")
      {this.amt = 0}   
      //console.log("amount:"+this.amt)
      if(discountBasedOn == "Uom")
      {this.discountAmt = discount;}

      if(discountBasedOn == "%")
      {this.discountAmt =  this.amt * (discount / 100);}

      if(discountBasedOn == "0")
      {this.discountAmt = 0}

      let netAmt = this.amt - this.discountAmt;
      
      /*if(taxrate == 0)
      this._taxAmt = 0; 
      else 
      this._taxAmt = netAmt *(taxrate/100);
      this._totalAmt = this._taxAmt + netAmt;



      this.delivery_challan_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
        discount_amt:this.discountAmt.toFixed(2), net_amount: netAmt.toFixed(2), 
        taxable_amount:this.amt.toFixed(2), tax_amt: this._taxAmt.toFixed(2), 
        total_amt:this._totalAmt.toFixed(2)});
       
     */
        this.DropDownListService.taxlistbycode(this.delivery_challan_Item_Dtls.at(index).get("tax_code").value).subscribe(taxcode=>
          {
    
            let cgst_amt =  taxcode["cgst_act_val"];
            let sgst_amt = taxcode["sgst_act_val"];
            let igst_amt = taxcode["igst_act_val"];
    
            if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
            {
              //console.log("enter no gst")
                 let taxamt = 0;
               
                    this.delivery_challan_Item_Dtls.at(index).patchValue({amount: Number(this.round(this.amt, 2)), 
                      discount_amt:Number(this.round(this.discountAmt,2)), net_amount: Number(this.round(netAmt,2)), 
                      taxable_amount:Number(this.round(this.amt,2)), tax_amt: taxamt, 
                      total_amt:Number(this.round((Number(taxamt) + Number(netAmt)),2))});
            }
            else if(cgst_amt == 0)
            {
             // console.log("enter igst")
                let taxamt =Number(netAmt *(this.delivery_challan_Item_Dtls.at(index).get("tax_rate").value/100)).toFixed(2);
           
                this.delivery_challan_Item_Dtls.at(index).patchValue({amount:  Number(this.round(this.amt, 2)), 
                  discount_amt:Number(this.round(this.discountAmt,2)), net_amount: Number(this.round(netAmt,2)), 
                  taxable_amount: Number(this.round(this.amt, 2)), tax_amt: taxamt, 
                  total_amt:Number(this.round((Number(taxamt) + Number(netAmt)),2))});
            }
            else
            {
              //console.log("enter c sgst")
                let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
                let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
                let taxamt = Number(csgt_final)+ Number(sgst_final);

                this.delivery_challan_Item_Dtls.at(index).patchValue({amount:  Number(this.round(this.amt, 2)), 
                  discount_amt:Number(this.round(this.discountAmt,2)), net_amount: Number(this.round(netAmt,2)), 
                  taxable_amount: Number(this.round(this.amt, 2)), tax_amt: taxamt, 
                  total_amt:Number(this.round((Number(taxamt) + Number(netAmt)),2))});
                
            }
          });
    }

    _PriceBasedOn:any;
    SendDataToDifferentComponenet()
    {    
      this.userForm.patchValue({delivery_cid: this.challan_id,taxdif:this.gst_taxdifstat});
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
