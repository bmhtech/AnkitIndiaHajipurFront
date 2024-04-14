import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';

@Component({
  selector: 'app-isssuestockitempopup',
  templateUrl: './isssuestockitempopup.component.html',
  styleUrls: ['./isssuestockitempopup.component.scss']
})
export class IsssuestockitempopupComponent implements OnInit {


   itemcode:any;
   packingcode:any;
   capacity:any;
   packinguom:any;
   itemuom:any;
   public userForm: FormGroup;
   _item_qty:any;
   _packing_qty:any;
   tolerance:any;
   issuetype:any;
   requisitionno:any;
   reqpackingqty:any;
   reqitemqty:any;
   Id:any;
   packqty:any;
   itemqty:any;
   
    constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<IsssuestockitempopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.itemcode=data.itemcode;
      this.packingcode=data.packingcode;
      this.capacity=data.capacity;
      this.packinguom=data.packinguom;
      this.itemuom=data.itemuom;
      this.tolerance=data.tolerance;
      this.issuetype=data.issuetype;
      this.requisitionno=data.requisitionno;
      this.reqpackingqty=data.reqpackingqty;
      this.reqitemqty=data.reqitemqty;
      this.Id=data.id;
      this.packqty=data.packqty;
      this.itemqty=data.itemqty;
     
      console.log(this.packqty + " / " +  this.itemqty )

      this.userForm=fb.group(
      {
        issuepopup_Item_Dtls: this.fb.array([this.fb.group({
          openingpackingqty:'',
          packinguom:'',
          openingitemqty:'',
          itemuom:'',
          requisitionpackingqty:'',
          requisitionitemqty:'',
          issuedpackingqty:'',
          issueditemqty:'',
          issuepackingqty:'',
          issueitemqty:'',
          toleranceqty:'0'
        })])
      })

   

    }
    get issuepopup_Item_Dtls(){return this.userForm.get("issuepopup_Item_Dtls") as FormArray};

    ngOnInit()
    {
      if(this.issuetype =="Open")
      {
        this.DropDownListService.getaayogstocks(this.itemcode).subscribe(data=>
          {
            this.issuepopup_Item_Dtls.at(0).patchValue({openingpackingqty:data["closingstock_packing"],
            packinguom:this.packinguom,
            openingitemqty:data["closingstock"],
            itemuom:this.itemuom,
            requisitionpackingqty:"0",
            requisitionitemqty:"0",
            issuedpackingqty:"0",
            issueditemqty:"0"})
          });
      }
      if(this.issuetype =="Issued")
      {
        forkJoin(
          this.DropDownListService.getaayogstocks(this.itemcode),
          this.DropDownListService.getrequistionstockrecordbyitem(this.itemcode,this.requisitionno,this.packingcode)
        
        ).subscribe(([data,requistionrecords])=>
          {
            this.issuepopup_Item_Dtls.at(0).patchValue({openingpackingqty:data["closingstock_packing"],
            packinguom:this.packinguom,
            openingitemqty:data["closingstock"],
            itemuom:this.itemuom,
            requisitionpackingqty:this.reqpackingqty,
            requisitionitemqty:this.reqitemqty,
            issuedpackingqty:requistionrecords["issuedpackingqty"],
            issueditemqty:requistionrecords["issueditemqty"]})


            if(this.Id>0)
            {
              let pack= this.issuepopup_Item_Dtls.at(0).get("issuedpackingqty").value;
              let item=this.issuepopup_Item_Dtls.at(0).get("issueditemqty").value;

              this.issuepopup_Item_Dtls.at(0).patchValue({issuedpackingqty:Number(pack) - Number(this.packqty),
              issueditemqty:Number(item) - Number(this.itemqty)});
            }
          });
      }

      
     
    }

    getItemQty(itemQty, index)
    {
      
        if(this.issuepopup_Item_Dtls.at(index).get("toleranceqty").value =="0" || this.issuepopup_Item_Dtls.at(index).get("toleranceqty").value ==0)//first time item qty
        {

        }
        else
        {
          this._item_qty=itemQty.target.value;
          let itemstatus:boolean=true,itemstatusmin:boolean=true;
          let minqty:number=(Number(this.issuepopup_Item_Dtls.at(index).get("toleranceqty").value) * ((100-Number(this.tolerance))/100));
          let maxqty:number=(Number(this.issuepopup_Item_Dtls.at(index).get("toleranceqty").value) * ((100+Number(this.tolerance))/100)) ;
        
          itemstatusmin=Number(this._item_qty) >=minqty;
          itemstatus= Number(this._item_qty) <= maxqty;

          if( itemstatus==true && itemstatusmin ==true)
          {

              if(this.issuetype =="Open")
              {

              }
              if(this.issuetype =="Issued")
              {
                 //let leftpacking=Number(this.reqpackingqty)-Number(this.issuepopup_Item_Dtls.at(index).get("issuedpackingqty").value);
                
                 let leftitem=(Number(this.reqitemqty)-Number(this.issuepopup_Item_Dtls.at(index).get("issueditemqty").value)).toFixed(3);
                 console.log(leftitem +" / " + this.reqitemqty + " / " +  this.issuepopup_Item_Dtls.at(index).get("issueditemqty").value)
                 let itemqtystatus:boolean=true,packingqtystatus:boolean=true;
                 
                 itemqtystatus=Number(leftitem)>=Number(this.issuepopup_Item_Dtls.at(index).get("issueitemqty").value)
                console.log(itemqtystatus + " / " + this.issuepopup_Item_Dtls.at(index).get("issueitemqty").value)
                if(itemqtystatus == true)
                {

                }
                else
                {
                  alert("Item Quantity must be lower than the differnce between requistion Qty and Issued Qty");
                  this.issuepopup_Item_Dtls.at(0).patchValue({
                  issuepackingqty:"0",
                  issueitemqty:"0"})
                }
                 
              }

          }
          else
          {
            alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty +" to " + maxqty.toFixed(3));
            this.issuepopup_Item_Dtls.at(index).patchValue({issueitemqty: Number(this.issuepopup_Item_Dtls.at(index).get("toleranceqty").value).toFixed(3)}); 
            this.issuepopup_Item_Dtls.at(index).patchValue({issuepackingqty: Math.round(this.issuepopup_Item_Dtls.at(index).get("toleranceqty").value/this.capacity)});

          }
        }
      
    }

    getPackingQty(packingQty, index)
    {
   
        this._packing_qty = packingQty.target.value;
        this._item_qty = this.capacity * this._packing_qty;

        if(this.issuetype =="Open")
        {
          this.issuepopup_Item_Dtls.at(index).patchValue({issueitemqty: Number(this._item_qty).toFixed(3),toleranceqty: Number(this._item_qty).toFixed(3),issuepackingqty:packingQty.target.value}); 
        }
        if(this.issuetype =="Issued")
        {

          let leftpacking=Number(this.reqpackingqty)-Number(this.issuepopup_Item_Dtls.at(index).get("issuedpackingqty").value);
          let packingqtystatus:boolean=true;
          packingqtystatus=Number(leftpacking)>=Number(this.issuepopup_Item_Dtls.at(index).get("issuepackingqty").value)
          if(packingqtystatus == true)
          {
            this.issuepopup_Item_Dtls.at(index).patchValue({issueitemqty: Number(this._item_qty).toFixed(3),toleranceqty: Number(this._item_qty).toFixed(3),issuepackingqty:packingQty.target.value}); 
          }
          else
          {
            alert("Packing Quantity must be lower than the differnce between requistion Packing Qty and Issued Packing Qty");
            this.issuepopup_Item_Dtls.at(0).patchValue({
            issuepackingqty:"0",
            issueitemqty:"0"})
          }
        }

       
      

    }
    send()
    {
     
      this.userForm.patchValue(this.issuepopup_Item_Dtls.value);
      this.dialogRef.close(this.userForm.value);  
      
    }
}
