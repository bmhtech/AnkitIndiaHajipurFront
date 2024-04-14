import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-sales-order-print',
  templateUrl: './sales-order-print.component.html',
  styleUrls: ['./sales-order-print.component.scss']
})
export class SalesOrderPrintComponent implements OnInit {

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
  bunit:any;
  dist:any;
  pin:any;
  bu_address:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SalesOrderPrintComponent>, @Inject(MAT_DIALOG_DATA)data) {


      this.ID=data["alldata"];
      this.order_id=data["orderid"];
      this.companyname=data["company_name"];
      this.bunit=data["bunit"];
     
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
      this.DropDownListService.getnumtowordsaleorder(this.order_id),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.bunit)
      ).subscribe(([staticData,itemData,brokerData,partyData,termData,payAllList,compdetails,word,bunitdetails])=>
        {
          
          console.log("bunitdetails:"+JSON.stringify(bunitdetails))
          this.dist=bunitdetails.dist_name;
          this.bu_address=bunitdetails.mailing_address;
          this.pin=bunitdetails.pin_code;
          this.company_name=compdetails.company_name;
          this.cin_no=compdetails.tin_no;
          this.amountinwords=word['status'];
          this.DropDownListService.partynameListById(staticData["customer"]).subscribe((printData)=>
          { 
           // console.log("print:"+JSON.stringify(printData))
            this.partyname=printData["print_to_name"];
          });

          this.DropDownListService.getCBUdetailsById(staticData["business_unit"]).subscribe((cbudata)=>
          { 
           // console.log("cbudata:"+JSON.stringify(cbudata))
            this.businessUnit=cbudata.businessunit_name;
            this.work_address=cbudata.work_address;
            this.pin_no=cbudata.pin_code;
            this.state_name=cbudata.state_name;
            this.city_name=cbudata.city_name;
          });
    

          this.orderno=staticData["order_no"];
          this.orderdate=staticData["order_date"];
          this.delivery_date=staticData["delivery_date"];
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
              this.itemtotal+=item['total_amt'];
          }


          this.Service.custAddRetriveList(partyData[0]["p_code"]).subscribe(data=>
            {
              this.address=data["add1"]+","+data["city"]+","+data["state"]+"-"+data["pincode"]
            });
            
        });

  }

}
