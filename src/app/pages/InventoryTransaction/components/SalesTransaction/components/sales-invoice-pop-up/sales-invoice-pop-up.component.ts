import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesInvoice } from '../../../../../../Models/SalesTransaction/SalesInvoice';
import { forkJoin } from 'rxjs';
import { truncate } from 'fs';

  @Component({
    selector: 'app-sales-invoice-pop-up',
    templateUrl: './sales-invoice-pop-up.component.html',
    styleUrls: ['./sales-invoice-pop-up.component.scss']})

  export class SalesInvoicePopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    salesInvoiceList:any = [];
    check:any;
    _invoice_id = "0";
    status = false;
    party:any;
    date:any;
    companyId:any;
    ReturnCriteria:any;
    SalesReturnType:any;
    editable: boolean = false;
    PriceReadOnly:boolean = false;
    PackingQty:boolean = false;
    cheboxcheck:boolean=false;
    Id:number;
    showbutton:boolean=true;

  
    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<SalesInvoicePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        invoice_id:[''],
        sales_Invoice_Item_Dtls: this.fb.array([this.fb.group({
        item_code:'',
        item_name:'',
        hsn_code:'',
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
        discount_type:'',
        discount_rate:'',
        discount_amt:'',
        tax_code:'',
        tax_rate:'',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        checkbox:''
        })]),
      });

      this.party = data['party_id'];
      this.companyId = data['company_id'];
      this.date = data['date'];
      this.ReturnCriteria =data["ReturnCriteria"];
      this.SalesReturnType =data["SalesReturnType"];
      this.Id=data["id"];
    }

    get sales_Invoice_Item_Dtls(){{ return this.userForm.get('sales_Invoice_Item_Dtls') as FormArray;}}

    ngOnInit() 
    {
      this.status = false;
      this.company_name = localStorage.getItem("company_name");
      if(this.Id == 0)//on first time 
      {
          this.showbutton=true;
          //this.DropDownListService.getSalesInvoices("party="+this.party+"&invdate="+this.date+"&comp="+this.companyId).subscribe(data =>
          this.DropDownListService.getSalesInvoiceReturn("party="+this.party+"&invdate="+this.date+"&comp="+this.companyId).subscribe(data =>
          {
            this.salesInvoiceList  = data;
            this.status = true;
          });
      }
      else{
        this.showbutton=false;
        this.DropDownListService.getreturnapprovalsalesInvoice(this.Id).subscribe(salesInvoice=>
          {
            //salesInvoice
            // this.Service.getSalesInvItmDtls(invoice_id)
            this.salesInvoiceList  = salesInvoice;
//starts here 
            this._invoice_id = salesInvoice[0].invoice_id;
            this.status = false;
            while (this.sales_Invoice_Item_Dtls.length )
            this.sales_Invoice_Item_Dtls.removeAt(0);
            this.DropDownListService.getSalesInvItmDtls(salesInvoice[0]['invoice_id']).subscribe(data=>
            {
              for(let data1 of data)
              this.add();

              if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Goods Return Due To Rejection')
              {
              for(let k=0;k<this.sales_Invoice_Item_Dtls.length;k++)
              {
              
              this.sales_Invoice_Item_Dtls.at(k).patchValue({checkbox:true});
              this.sales_Invoice_Item_Dtls.at(k).get("checkbox").disable();
              this.sales_Invoice_Item_Dtls.at(k).get("price_based_on").disable();
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
                for(let i=0;i<this.sales_Invoice_Item_Dtls.length;i++)
                {
                  this.sales_Invoice_Item_Dtls.at(i).patchValue({checkbox:true});
                  this.sales_Invoice_Item_Dtls.at(i).get("checkbox").disable();
                this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").disable();
                }
              }

              else if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Acceptance of Lower Rate')
              {
                this.PackingQty = true;
                this.editable = true;
                this.PriceReadOnly =false;
                for(let i=0;i<this.sales_Invoice_Item_Dtls.length;i++)
                {
                  this.sales_Invoice_Item_Dtls.at(i).patchValue({checkbox:true});
                  this.sales_Invoice_Item_Dtls.at(i).get("checkbox").disable();
                this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").disable();
                }
              }

              else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Goods Return Due To Rejection')
              {
                this.PackingQty = false;
                this.editable = true;
                this.PriceReadOnly =true;
                for(let i=0;i<this.sales_Invoice_Item_Dtls.length;i++)
              {
                this.sales_Invoice_Item_Dtls.at(i).patchValue({checkbox:true});
                this.sales_Invoice_Item_Dtls.at(i).get("checkbox").disable();
                this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").disable();
              }
              }

            else
            {
              this.PackingQty = true;
              this.editable = true;
              this.PriceReadOnly =false;
              for(let m=0;m<this.sales_Invoice_Item_Dtls.length;m++)
              {
                this.sales_Invoice_Item_Dtls.at(m).patchValue({checkbox:true});
                this.sales_Invoice_Item_Dtls.at(m).get("checkbox").disable();
              this.sales_Invoice_Item_Dtls.at(m).get("price_based_on").enable();
              }
            }

              this.sales_Invoice_Item_Dtls.patchValue(data);
              this.status = true;  
            });


//ends here 

          })
      }

    }

    add()
    {
      this.sales_Invoice_Item_Dtls.push(this.fb.group({
        item_code:'',
        item_name:'',
        packing:'',
        hsn_code:'',
        packing_name:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        discount_type:'',
        discount_rate:'',
        discount_amt:'',
        tax_code:'',
        tax_rate:'',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        checkbox:'true'
      }));
    }

    check1(invoiceList:SalesInvoice)
    {
      this._invoice_id = invoiceList.invoice_id;
      this.status = false;
      while (this.sales_Invoice_Item_Dtls.length )
      this.sales_Invoice_Item_Dtls.removeAt(0);
      this.DropDownListService.getSalesInvItmDtls(this._invoice_id).subscribe(data=>
      {
        for(let data1 of data)
        this.add();

        if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Goods Return Due To Rejection')
        {
         for(let k=0;k<this.sales_Invoice_Item_Dtls.length;k++)
         {
         
         this.sales_Invoice_Item_Dtls.at(k).patchValue({checkbox:true});
         this.sales_Invoice_Item_Dtls.at(k).get("checkbox").disable();
         this.sales_Invoice_Item_Dtls.at(k).get("price_based_on").disable();
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
          for(let i=0;i<this.sales_Invoice_Item_Dtls.length;i++)
          {
           this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").disable();
          }
        }

        else if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Acceptance of Lower Rate')
        {
          this.PackingQty = true;
          this.editable = true;
          this.PriceReadOnly =false;
          for(let i=0;i<this.sales_Invoice_Item_Dtls.length;i++)
          {
           this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").disable();
          }
        }

        else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Goods Return Due To Rejection')
        {
          this.PackingQty = false;
          this.editable = true;
          this.PriceReadOnly =true;
          for(let i=0;i<this.sales_Invoice_Item_Dtls.length;i++)
         {
          this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").disable();
         }
        }

       else
       {
        this.PackingQty = true;
        this.editable = true;
        this.PriceReadOnly =false;
        for(let m=0;m<this.sales_Invoice_Item_Dtls.length;m++)
        {
        this.sales_Invoice_Item_Dtls.at(m).get("price_based_on").enable();
        }
      }

        this.sales_Invoice_Item_Dtls.patchValue(data);
        this.status = true;  
      });
    }

    _mrp:any;
    _priceBasedOn:any;
    _mat_weight:any;
    _taxrate:any;
    _netAmt:any;
    _item_qty:any;
    _packing_qty:any;
    _discount:any;
    _discountBasadOn:any;
    _taxAmt:any;
    amt:any;
    _totalAmt:any;
    Packing:any;
    itemId:any;
    capacity:any = [];
    empty_bag_wt:any = [];
    company_name:any;
    getPackingQty(packingQty, index)
    {
      
      this.Packing =  this.sales_Invoice_Item_Dtls.at(index).get("packing").value as FormControl;
      this.itemId =  this.sales_Invoice_Item_Dtls.at(index).get("item_code").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, this.Packing,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          //this.delivery_challan_Item_Dtls.at(index).patchValue({suom: data.uom1, quantity: this.capacity * parseInt(this.packingQty)});
          this.status = true;
        });

      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] * this._packing_qty;
     // this.sales_Invoice_Item_Dtls.at(index).patchValue({quantity: this._item_qty, 
     //   mat_wt: (Number(this._item_qty) - Number(this.empty_bag_wt[index])).toFixed(3)});
     this.sales_Invoice_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), 
        mat_wt: this._item_qty.toFixed(3)});
   
   
        this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
      this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    _total_amt:any
    discountAmt:any;
    GlobalTcs_rate:any;
   
//     calculateItemData(packingQty, ItemQty, price, matWt, PriceBasedOn, discount, discountBasedOn, taxrate, index)
//     {
//       alert(PriceBasedOn)
//       alert(this.amt)
//      // this.grandTotal = 0;
//       if(PriceBasedOn == "Packing")
//       {this.amt = price * packingQty}

//       if(PriceBasedOn == "item")
//       {this.amt = price * ItemQty}

//       if(PriceBasedOn == "0")
//       {this.amt = 0}   

//       if(discountBasedOn == "Uom")
//       {this.discountAmt = discount;}

//       if(discountBasedOn == "%")
//       {this.discountAmt =  this.amt * (discount / 100);}

//       if(discountBasedOn == "0")
//       {this.discountAmt = 0}

//       let netAmt = this.amt - this.discountAmt;
//       if(taxrate == 0)
//       {this._taxAmt = 0;} 
//       else
//       {this._taxAmt = (netAmt *(taxrate/100)).toFixed(2);}
//       this._totalAmt = (Number(this._taxAmt) + Number(netAmt)).toFixed(2);
//       this.sales_Invoice_Item_Dtls.at(index).patchValue({amount: this.amt, 
//         discount_amt:  this.discountAmt , tax_amt: this._taxAmt, 
//         total_amt: this._totalAmt});
      
//       for(let i=0; i<this.sales_Invoice_Item_Dtls.length; i++)
//       {
//         this.amt = this.sales_Invoice_Item_Dtls.at(i).get("amount").value as FormControl;
//         this.totalItem = this.totalItem + this.amt;
//         this.discountAmt = this.sales_Invoice_Item_Dtls.at(i).get("discount_amt").value as FormControl;
//         this.totalDiscount = this.totalDiscount + this.discountAmt;
//         this._taxAmt = this.sales_Invoice_Item_Dtls.at(i).get("tax_amt").value as FormControl;
//         this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;
//         this._total_amt = this.sales_Invoice_Item_Dtls.at(i).get("total_amt").value as FormControl;
//        // this.grandTotal = Number(this.grandTotal)  + Number(this._total_amt);
//  // this.userForm.patchValue({grand_total:this.grandTotal.toFixed(2)});
//         // this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
//         //   this.appCharges, this.adj1, this.adj2, this.tcsAmt)
//       }
//     }


calculateItemData(packingQty, ItemQty, price,matWt, PriceBasedOn, discount, discountBasedOn, taxrate, index)
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
  /* if(taxrate == 0)
  this._taxAmt = 0; 
  else 
  this._taxAmt = netAmt *(taxrate/100);
  this._totalAmt =Number(this._taxAmt)  + netAmt;
  this.sales_Invoice_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
    discount_amt:this.discountAmt.toFixed(2), net_amount: netAmt.toFixed(2), 
    taxable_amount:this.amt.toFixed(2), tax_amt: this._taxAmt.toFixed(2), 
    total_amt:this._totalAmt.toFixed(2)}); */
   
    this.DropDownListService.taxlistbycode(this.sales_Invoice_Item_Dtls.at(index).get("tax_code").value).subscribe(taxcode=>
      {

        let cgst_amt =  taxcode["cgst_act_val"];
        let sgst_amt = taxcode["sgst_act_val"];
        let igst_amt = taxcode["igst_act_val"];

        if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
        {
             let taxamt = 0;

             /* 
             this.sales_Invoice_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
             discount_amt:this.discountAmt.toFixed(2), net_amount: netAmt.toFixed(2), 
             taxable_amount:this.amt.toFixed(2), tax_amt: this._taxAmt.toFixed(2), 
             total_amt:this._totalAmt.toFixed(2)});
             */
                this.sales_Invoice_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
                  discount_amt:this.discountAmt.toFixed(2), net_amount: netAmt.toFixed(2),
                  taxable_amount:this.amt.toFixed(2), tax_amt: taxamt, 
                  total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
        }
        else if(cgst_amt == 0)
        {
            let taxamt =Number(netAmt *(this.sales_Invoice_Item_Dtls.at(index).get("tax_rate").value/100)).toFixed(2);
       
            this.sales_Invoice_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
              discount_amt:this.discountAmt.toFixed(2), net_amount: netAmt.toFixed(2),
              taxable_amount:this.amt.toFixed(2), tax_amt: taxamt, 
              total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
        }
        else
        {
            let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
            let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
            let taxamt = Number(csgt_final)+ Number(sgst_final);

            this.sales_Invoice_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
              discount_amt:this.discountAmt.toFixed(2), net_amount: netAmt.toFixed(2),
              taxable_amount:this.amt.toFixed(2), tax_amt: taxamt, 
              total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
            
        }
      });
 
}

    onChangePriceBasedOn(price_based_on, index)
    {
      this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
      this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    getPrice(price, index)
    {
      this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp =  price.target.value;
      this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

  
    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({invoice_id: this._invoice_id});
    //  this.userForm.patchValue(this.sales_Invoice_Item_Dtls.value);
     // this.dialogRef.close(this.userForm.getRawValue());  
        for(let k=0;k<this.sales_Invoice_Item_Dtls.length;k++)
        {
          if(this.sales_Invoice_Item_Dtls.at(k).get("checkbox").value == true || this.sales_Invoice_Item_Dtls.at(k).get("checkbox").value == 'true')
          {
            this.cheboxcheck = true;
          }
        }
      if(this.cheboxcheck == true)
      {
        this.dialogRef.close(this.userForm.getRawValue());
      }
      else
       {
        alert("Please tick on checkbox!!!!");
        }
      }

   
  
  }
