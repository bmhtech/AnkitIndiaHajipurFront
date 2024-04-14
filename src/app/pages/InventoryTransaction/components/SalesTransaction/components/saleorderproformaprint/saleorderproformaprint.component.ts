import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-saleorderproformaprint',
  templateUrl: './saleorderproformaprint.component.html',
  styleUrls: ['./saleorderproformaprint.component.scss']
})
export class SaleorderproformaprintComponent implements OnInit {

  ID:any;
  order_id:any;
  itemDetails:any=[];
  partyname:any;
  address:any;
  orderno:any;
  orderdate:any;
  broker:any;
  delivery_date:any;
  delivery_term:any;
  cust_refdocno:any;
  payment_term:any;
  companyname:any;
  company_name:any;
  cin_no:any;
  work_address:any;
  pin_no:any;
  state_name:any;
  city_name:any;
  businessUnit:any;
  itemtotal:number=0;
  amountinwords:any;
  totalamount:number=0;
  isgsttotal:number=0;
  sgsttotal:number=0;
  cgsttotal:number=0;
  discounttotal:number=0;
  statename:any;
  igst:boolean=false;
  cgst:boolean=false;
  discountstatus:boolean=false;
  amountotal:number=0;
  orderdatenew:any;
  gstno:any;
  pano:any;
  delivery_datenew:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SaleorderproformaprintComponent>, @Inject(MAT_DIALOG_DATA)data)
   {
    this.ID=data["alldata"];
    this.order_id=data["orderid"];
    this.companyname=data["company_name"];
   }

   ngOnInit() {
    
    forkJoin(
      this.Service.salesOrderRetrive(this.ID),
      this.Service.getSalesOrdItemDtls(this.order_id),
      this.Service.getSalesOrdBrokerDtls(this.order_id),
      this.Service.getSalesOrdPartyDtls(this.order_id),
      this.Service.getSalesOrdTermsCon(this.order_id), 
      this.DropDownListService.payTermNameList(),
      this.DropDownListService.getCompanyDetails(this.companyname),
      this.DropDownListService.getnumtowordsaleorder(this.order_id)
      ).subscribe(([staticData,itemData,brokerData,partyData,termData,payAllList,compdetails,word])=>
        {
          
         // console.log("staticData:"+JSON.stringify(staticData))
          this.company_name=compdetails.company_name;
          this.cin_no=compdetails.tin_no;
          this.amountinwords=word['status'];
          forkJoin(
          this.DropDownListService.partynameListById(staticData["customer"]),
          this.Service.custStatutoryRetriveList(staticData["customer"])
          )
          .subscribe(([printData,statinfo])=>
          { 
           // console.log("print:"+JSON.stringify(printData))
            this.partyname=printData["print_to_name"];
            this.gstno=statinfo["gst_no"];
            this.pano=statinfo["pan_no"];
          });
         
         
    
          
          
          this.DropDownListService.getCBUdetailsById(staticData["business_unit"])
          .subscribe((cbudata)=>
          { 
           // console.log("cbudata:"+JSON.stringify(cbudata))
            this.businessUnit=cbudata.businessunit_name;
            this.work_address=cbudata.work_address;
            this.pin_no=cbudata.pin_code;
            this.state_name=cbudata.state_name;
            this.city_name=cbudata.city_name;

            if(this.state_name=='BIHAR')
            {
              this.cgst=true;
            }
            else
            {
              this.igst=true;
            }
          //  this.igst=true;
           
            itemData.forEach(item => 
              {
                let tax_amtdivide=Number(item.tax_amt)/2;
              
               
                this.discounttotal+=Number(item.discount_amt);
               
                this.isgsttotal+=Number(item.tax_amt);
                this.sgsttotal+=Number(tax_amtdivide);
                this.cgsttotal+=Number(tax_amtdivide);
                console.log(item.total_amt)
                this.totalamount+=Number(item.total_amt); 
                this.itemtotal+=Number(item.amount);
                this.amountotal+=Number(item.amount)-Number(item.discount_amt);

                this.DropDownListService.getItemNameById(item.item_code,localStorage.getItem("company_name")).subscribe(data=>
                  {
                    console.log(data.item_group_name)
                    item.item_code=data.item_group_name;
                    item.inserted_by=data.hsn_code;
                  });
      
            });


          });
    

          this.orderno=staticData["order_no"];
          this.orderdate=staticData["order_date"];
          let datesplit=[];
          datesplit=this.orderdate.split('-');
          this.orderdatenew=datesplit[2]+'-'+datesplit[1]+'-'+datesplit[0];
          this.delivery_date=staticData["delivery_date"];
          
          let deliverydatesplit=[];
          deliverydatesplit=this.delivery_date.split('-');
          
          this.delivery_datenew=deliverydatesplit[2]+'-'+deliverydatesplit[1]+'-'+deliverydatesplit[0];

          this.delivery_term=staticData["delivery_term"];
          this.cust_refdocno=staticData["cust_refdocno"];
          payAllList.forEach(element => {
            if(element.payterm_id == termData["payment_term"])
            {
              this.payment_term = element.payterm_desc;
            }
            
          });
        

          this.broker=brokerData[0]["broker_name"];
          this.itemDetails=itemData;
          
           for(let item of itemData)
           {
         
          
          }


          this.Service.custAddRetriveList(partyData[0]["p_code"]).subscribe(data=>
            {
              this.address=data["add1"]+","+data["city"]+","+data["state"]+"-"+data["pincode"]
            });
            
           
            
        });

  }

}

