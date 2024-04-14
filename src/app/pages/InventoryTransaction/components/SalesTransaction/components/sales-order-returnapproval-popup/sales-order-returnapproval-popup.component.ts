import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesOrder } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-sales-order-returnapproval-popup',
  templateUrl: './sales-order-returnapproval-popup.component.html',
  styleUrls: ['./sales-order-returnapproval-popup.component.scss']
})
export class SalesOrderReturnapprovalPopupComponent implements OnInit {

  public userForm:FormGroup;
  salesOrderList:{};
  check:any;
  _order_id = "0";
  status = false;
  party:any;
  date:any;
  companyId:any;
  ReturnCriteria:any;
  SalesReturnType:any;
  checkboxcheck:boolean=false;
  finaldeliverylist:any;
  Id:number;
  showbutton:boolean=true;
  parentmodel:any;


  

  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SalesOrderReturnapprovalPopupComponent>, @Inject(MAT_DIALOG_DATA)data) {
      this.userForm=fb.group(
      {
        order_id:[''],
        delivery_cid:[''],
        deliverychallan:this.fb.array([this.fb.group({
          challan_no:'',
          delivery_cid:'',
          challan_date:'',
          checkbox:''
        })]),


        sales_Order_Item_Dtls: this.fb.array([this.fb.group({
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
        tax_code:'',
        tax_rate:'',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        discount_amt:'',
        tolerance: '',
        checkbox:'',
        delivery_cid:''
        })]),
      });

      this.party = data['party_id'];
      this.companyId = data['company_id'];
      this.date = data['date'];
      this.ReturnCriteria =data["ReturnCriteria"];
      this.SalesReturnType =data["SalesReturnType"];
      this.Id=data["id"];
      this.parentmodel=data["parentmodel"];
    }
    
    get deliverychallan(){{ return this.userForm.get('deliverychallan') as FormArray;}}
    get sales_Order_Item_Dtls(){{ return this.userForm.get('sales_Order_Item_Dtls') as FormArray;}}
  
    company_name:any;
    ngOnInit() 
    {
      this.status = false;
      this.company_name = localStorage.getItem("company_name");

      if(this.Id == 0)//on first time 
      {
        this.showbutton=true;
        if(this.parentmodel=="ReturnApproval")
        {
          this.DropDownListService.getSalesOrderReturn("party="+this.party+"&invdate="+this.date+"&comp="+this.companyId).subscribe(data =>
            {
              this.salesOrderList  = data;
              this.status = true;
            });
        }
         else{
          this.DropDownListService.getSalesOrder("party="+this.party+"&invdate="+this.date+"&comp="+this.companyId).subscribe(data =>
          {
            this.salesOrderList  = data;
            this.status = true;
          });
        }
       }
       else
       {
       
             this.showbutton=false;
             this.DropDownListService.getreturnapprovalsalesorder(this.Id).subscribe(salesorder=>
              {
                console.log("chk data:"+salesorder[0]['customer_name'])
                this.salesOrderList  = salesorder;
                //salesorder
                this._order_id = salesorder[0]['order_id'];
                while (this.deliverychallan.length )
                this.deliverychallan.removeAt(0);
                this.DropDownListService.getDeliverychallanlist(salesorder[0]['order_id']).subscribe(challan=>
                  {
                    //console.log("bs partner:"+JSON.stringify(challan));
                    let u=0;
                    for(let data1 of challan)
                    this.addchallan();
                    this.deliverychallan.at(u).patchValue({checkbox:true});
                    this.deliverychallan.at(u).get("checkbox").disable();
                    u++;
                    this.deliverychallan.patchValue(challan);
                    
                   

                    let challan_list="";
                    for(let i=0;i<this.deliverychallan.length;i++)
                    {
                      challan_list+=this.deliverychallan.at(i).get("delivery_cid").value+",";
                    }
                    this.finaldeliverylist=challan_list.substring(0,challan_list.length-1);

                    this.DropDownListService.getdeliverchallanitemlist(this.finaldeliverylist).subscribe(deliveryitemdetails=>
                      {
                        
                        console.log("deliveryitemdetails"+JSON.stringify(deliveryitemdetails))
                            while (this.sales_Order_Item_Dtls.length ) 
                            this.sales_Order_Item_Dtls.removeAt(0);
                            
                            for(let data1 of deliveryitemdetails)
                            this.add();
          
                            if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                            {
                                for(let k=0;k<this.sales_Order_Item_Dtls.length;k++)
                                {
                                
                                this.sales_Order_Item_Dtls.at(k).patchValue({checkbox:true});
                                this.sales_Order_Item_Dtls.at(k).get("checkbox").disable();
                                this.sales_Order_Item_Dtls.at(k).get("price_based_on").disable();
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
                              for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
                              {
                                this.sales_Order_Item_Dtls.at(i).patchValue({checkbox:true});
                                this.sales_Order_Item_Dtls.at(i).get("checkbox").disable();
                                
                              this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
                              }
                            }
          
                            else if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Acceptance of Lower Rate')
                            {
                              this.PackingQty = true;
                              this.editable = true;
                              this.PriceReadOnly =false;
                              for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
                              {
                                this.sales_Order_Item_Dtls.at(i).patchValue({checkbox:true});
                                this.sales_Order_Item_Dtls.at(i).get("checkbox").disable();
                              this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
                              }
                            }
          
                            else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                            {
                              this.PackingQty = false;
                              this.editable = true;
                              this.PriceReadOnly =true;
                              for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
                            {
                              this.sales_Order_Item_Dtls.at(i).patchValue({checkbox:true});
                              this.sales_Order_Item_Dtls.at(i).get("checkbox").disable();
                              this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
                            }
                            }
          
                          else
                          {
                            this.PackingQty = true;
                            this.editable = true;
                            this.PriceReadOnly =false;
                            for(let m=0;m<this.sales_Order_Item_Dtls.length;m++)
                            {
                              this.sales_Order_Item_Dtls.at(m).patchValue({checkbox:true});
                              this.sales_Order_Item_Dtls.at(m).get("checkbox").disable();
                            this.sales_Order_Item_Dtls.at(m).get("price_based_on").enable();
                            }
                          }
          
                            this.sales_Order_Item_Dtls.patchValue(deliveryitemdetails);
                            this.status = true;  
                          
          
                      });
            
          
                  });



              })
       }
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
  
    add()
    {
      this.sales_Order_Item_Dtls.push(this.fb.group({
        item_code:'',
        item_name:'',
        packing:'',
        packing_name:'',
        quantity:'',
        uom:'',
        hsn_code:'',
        squantity:'',
        suom:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        discount_type:'',
        discount_rate:'',
        tax_code:'',
        tax_rate:'',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        discount_amt:'',
        tolerance: '',
        checkbox:'true',
        delivery_cid:''
      }));
    }
  
    editable: boolean = false;
    PriceReadOnly:boolean = false;
    PackingQty:boolean = false;
    
    
    check1(salesEnqList:SalesOrder)
    {
      this._order_id = salesEnqList.order_id;
      while (this.deliverychallan.length )
      this.deliverychallan.removeAt(0);
      this.status=false;
      this.DropDownListService.getDeliverychallanlist(this._order_id).subscribe(challan=>
        {
        //  console.log(JSON.stringify(challan));
          for(let data1 of challan)
          this.addchallan();
          this.deliverychallan.patchValue(challan);
          this.status=true;
        });
    }
    packqty: any = [];
    checkdeliverychallan(index)
    {
        this.finaldeliverylist="";
        let challan_list="";
        while (this.sales_Order_Item_Dtls.length )
        this.sales_Order_Item_Dtls.removeAt(0);
            for(let i=0;i<this.deliverychallan.length;i++)
            {
              if(this.deliverychallan.at(i).get("checkbox").value == true || this.deliverychallan.at(i).get("checkbox").value == 'true')
              {
                challan_list+=this.deliverychallan.at(i).get("delivery_cid").value+",";
              }
            }
       // console.log(challan_list);
             this.finaldeliverylist=challan_list.substring(0,challan_list.length-1);
             //this.DropDownListService.getdeliverchallanitemlist( this.finaldeliverylist).subscribe(deliveryitemdetails=>
             this.DropDownListService.getRestDlvChallanItemDtls( this.finaldeliverylist).subscribe(deliveryitemdetails=>
              {
                
                console.log("deliveryitemdetails"+JSON.stringify(deliveryitemdetails))
                this.packqty=deliveryitemdetails;
                    for(let data1 of deliveryitemdetails)
                    this.add();
  
                    if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                    {
                    for(let k=0;k<this.sales_Order_Item_Dtls.length;k++)
                    {
                    
                    this.sales_Order_Item_Dtls.at(k).patchValue({checkbox:true});
                    this.sales_Order_Item_Dtls.at(k).get("checkbox").disable();
                    this.sales_Order_Item_Dtls.at(k).get("price_based_on").disable();
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
                      for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
                      {
                      this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
                      }
                    }
  
                    else if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Acceptance of Lower Rate')
                    {
                      this.PackingQty = true;
                      this.editable = true;
                      this.PriceReadOnly =false;
                      for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
                      {
                      this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
                      }
                    }
  
                    else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Goods Return Due To Rejection')
                    {
                      this.PackingQty = false;
                      this.editable = true;
                      this.PriceReadOnly =true;
                      for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
                    {
                      this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
                    }
                    }
  
                  else
                  {
                    this.PackingQty = true;
                    this.editable = true;
                    this.PriceReadOnly =false;
                    for(let m=0;m<this.sales_Order_Item_Dtls.length;m++)
                    {
                    this.sales_Order_Item_Dtls.at(m).get("price_based_on").enable();
                    }
                  }
  
                    this.sales_Order_Item_Dtls.patchValue(deliveryitemdetails);
                    this.status = true;  
                  
  
              });


    }



    check12(salesEnqList:SalesOrder)
    {
      this._order_id = salesEnqList.order_id;
      this.status = false;
      while (this.sales_Order_Item_Dtls.length )
      this.sales_Order_Item_Dtls.removeAt(0);
      this.DropDownListService.getSalesOrdItemDtls(this._order_id).subscribe(data=>
      {
        for(let data1 of data)
        this.add();

        if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Goods Return Due To Rejection')
        {
         for(let k=0;k<this.sales_Order_Item_Dtls.length;k++)
         {
         
         this.sales_Order_Item_Dtls.at(k).patchValue({checkbox:true});
         this.sales_Order_Item_Dtls.at(k).get("checkbox").disable();
         this.sales_Order_Item_Dtls.at(k).get("price_based_on").disable();
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
          for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
          {
           this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
          }
        }

        else if(this.ReturnCriteria=='Full Return' && this.SalesReturnType=='Acceptance of Lower Rate')
        {
          this.PackingQty = true;
          this.editable = true;
          this.PriceReadOnly =false;
          for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
          {
           this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
          }
        }

        else if(this.ReturnCriteria=='Partial Return' && this.SalesReturnType=='Goods Return Due To Rejection')
        {
          this.PackingQty = false;
          this.editable = true;
          this.PriceReadOnly =true;
          for(let i=0;i<this.sales_Order_Item_Dtls.length;i++)
         {
          this.sales_Order_Item_Dtls.at(i).get("price_based_on").disable();
         }
        }

       else
       {
        this.PackingQty = true;
        this.editable = true;
        this.PriceReadOnly =false;
        for(let m=0;m<this.sales_Order_Item_Dtls.length;m++)
        {
        this.sales_Order_Item_Dtls.at(m).get("price_based_on").enable();
        }
      }

        this.sales_Order_Item_Dtls.patchValue(data);
        this.status = true;  
      });
    }

    _item_uom:any;
    cal_method:any;
    con_factor:any;

    _item_qty:any;
    _packing_qty:any;
    _mrp:any;
    _taxrate:any;
    _taxAmt:any;
    _totalAmt:any;
    _netAmt:any;
    _priceBasedOn:any;
    _discount:any;
    _discountBasadOn:any;
    discountAmt:any;
    capacity:any = [];
    _weighmentUom:any;
    itemId:any;
    Packing:any;
    getPackingQty(packingQty, index)
    {
      this.Packing =  this.sales_Order_Item_Dtls.at(index).get("packing").value as FormControl;
      this.itemId =  this.sales_Order_Item_Dtls.at(index).get("item_code").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId,this.Packing,this.company_name).subscribe(data=>
        {  
          this.status = true;  
          //console.log("empty bag wt: "+JSON.stringify(data)); 
          this.capacity[index] = data.capacity; 
          this._packing_qty = packingQty.target.value;
          this._item_qty = this.capacity[index] * packingQty.target.value;

          this.packqty.forEach(element => {
            if (element.item_code == this.sales_Order_Item_Dtls.at(index).get("item_code").value && element.packing == this.sales_Order_Item_Dtls.at(index).get("packing").value && element.squantity < this._packing_qty) {
              alert("Packing Qty Exceeds.. ");
              this._item_qty = this.capacity[index] * element.squantity;
             // console.log("if"+this._item_qty)
              this.sales_Order_Item_Dtls.at(index).patchValue({squantity:element.squantity,quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3)});
             }
             else{
              //console.log("else"+this._item_qty)
              this.sales_Order_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3)});
             }
          });
        });
      
      this._item_uom = this.sales_Order_Item_Dtls.at(index).get("uom").value as FormControl; this.sales_Order_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3)});

      this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
      this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   

      if(this._weighmentUom == this._item_uom)
      { this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: 0});}
      else 
      {
        if(this._weighmentUom != 0)
        {
          if(this.cal_method == "Multiply")
          this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
          if(this.cal_method == "Division")
          this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
        }
      }
    }

    amt:any;
    taxAmt:any;
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
      /*if(taxrate == 0)
      {this._taxAmt = 0;}  
      else
      {this._taxAmt = netAmt *(taxrate/100);}
      this._totalAmt = this._taxAmt + netAmt;
      this.sales_Order_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
        discount_amt: this.discountAmt.toFixed(2), tax_amt: this._taxAmt.toFixed(2), 
        total_amt: this._totalAmt.toFixed(2)});
        */

        this.DropDownListService.taxlistbycode(this.sales_Order_Item_Dtls.at(index).get("tax_code").value).subscribe(taxcode=>
          {
    
            let cgst_amt =  taxcode["cgst_act_val"];
            let sgst_amt = taxcode["sgst_act_val"];
            let igst_amt = taxcode["igst_act_val"];
    
            if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
            {
                 let taxamt = 0;

                 /* this.sales_Order_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
                discount_amt: this.discountAmt.toFixed(2), tax_amt: this._taxAmt.toFixed(2), 
                total_amt: this._totalAmt.toFixed(2)});

                 */
                    this.sales_Order_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
                      discount_amt:this.discountAmt.toFixed(2), 
                       tax_amt: taxamt, 
                      total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
            }
            else if(cgst_amt == 0)
            {
                let taxamt =Number(netAmt *(this.sales_Order_Item_Dtls.at(index).get("tax_rate").value/100)).toFixed(2);
           
                this.sales_Order_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
                  discount_amt:this.discountAmt.toFixed(2), 
                   tax_amt: taxamt, 
                  total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
            }
            else
            {
                let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
                let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
                let taxamt = Number(csgt_final)+ Number(sgst_final);

                this.sales_Order_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
                  discount_amt:this.discountAmt.toFixed(2), 
                   tax_amt: taxamt, 
                  total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
                
            }
          });
    }

    getPrice(price, index)
    {
      this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = price.target.value;
      this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  
    }

    onChangePriceBasedOn(price_based_on, index)
    {
      this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 
    }

    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({order_id: this._order_id,delivery_cid:this.finaldeliverylist});
     // this.userForm.patchValue(this.sales_Order_Item_Dtls.value);
      
      for(let j=0;j<this.sales_Order_Item_Dtls.length;j++)
      {
        if(this.sales_Order_Item_Dtls.at(j).get("checkbox").value==true || this.sales_Order_Item_Dtls.at(j).get("checkbox").value=='true')
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
