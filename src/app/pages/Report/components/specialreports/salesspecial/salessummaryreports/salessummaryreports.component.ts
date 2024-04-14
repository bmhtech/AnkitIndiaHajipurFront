import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../.././../../../../service/dropdown-service.service';
import { ExcelService } from '../.././../../../../service/excel.service';
import { Master } from '../.././../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-salessummaryreports',
  templateUrl: './salessummaryreports.component.html',
  styleUrls: ['./salessummaryreports.component.scss']
})
export class SalessummaryreportsComponent implements OnInit {
  
  public userForm:FormGroup; 
  summarylist:any = [];
  item_codes:any = [];
  brokerNames:any = [];
  customerNames_List:any=[];
  status = false;
  item:boolean=false;
  broker:boolean=false;
  customer:boolean=false;
  businesslists:any=[];
  currentDate:any;
  BuUnit:any;
  catagoryname:any;
  is_select_all_unit:boolean;
  is_select_unit:any = [];
  buss_unit_data:any;
  buss_unit_data1:any;
  item_data = "";
  bagstotal:number=0;
  qtlstotal:number=0;
  avgbagstotal:number=0;
  avgqtlstotal:number=0;
  amounttotal:number=0;
  headingtop:any;
  company_name:any;

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  {
    this.userForm=fb.group(
      {
        catagory:[''],
        customer_name:[''],
        itemname:[''],
        brokername:[''],
        business_unit:[''],
        fromdate:[''],
        todate:[''],
        all_unit:['']
      });
   }

   get catagory(){return this.userForm.get("catagory") as FormControl};
   get customer_name(){return this.userForm.get("customer_name") as FormControl};
   get itemname(){return this.userForm.get("itemname") as FormControl};
   get brokername(){return this.userForm.get("brokername") as FormControl};
   get business_unit(){return this.userForm.get("business_unit") as FormControl};
   get fromdate(){return this.userForm.get("fromdate") as FormControl};
   get todate(){return this.userForm.get("todate") as FormControl};
   get all_unit(){ return this.userForm.get("all_unit") as FormControl }

  ngOnInit() {
    this.status=true;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(localStorage.getItem("company_name")),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
     // this.DropDownListService.newcustomerList(localStorage.getItem("company_name")),
      //this.DropDownListService.brokerCodeList(),
      //this.DropDownListService.salesItemNamesList(localStorage.getItem("company_name"),this.userForm.get("business_unit").value)
    ).subscribe(([bunit,companydata])=>
      {
       // console.log("data:"+JSON.stringify(broker))
       this.businesslists=bunit;
       // this.customerNames_List=customer;
       // this.brokerNames=broker;
        //this.item_codes=item;
        this.company_name=companydata.company_name;
     
      this.BuUnit = 'CBU00001';

     
    });
  }

  

  onChangeCatagory(catagory)
  {
    if(catagory.length && catagory != "0")
      {
      this.status=false;
      if(this.userForm.get("fromdate").value =='' ||this.userForm.get("fromdate").value ==null  || this.userForm.get("fromdate").value =='0' )
      {
        alert("Please Select From Date !!!!!!!");
        this.status=true;
      }
        if(catagory=='Itemwise')
        {
          this.item=true;
          this.customer=false;
          this.broker=false;
          this.userForm.patchValue({brokername:['0'],customer_name:['0']});
          this.DropDownListService.salesOrderFinishedItemlist(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value)
          .subscribe(item=>
            {
              //console.log("data:"+JSON.stringify(item))
              this.item_codes = item;
            });
          this.status=true;
        }
        else if(catagory=='Brokerwise')
        {
          this.broker=true;
          this.customer=false;
          this.item=false;
          this.userForm.patchValue({itemname:['0'],customer_name:['0']});
          this.DropDownListService.salesOrderBrokerlist(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value)
          .subscribe(broker=>
            {
              //console.log("broker:"+JSON.stringify(broker))
              this.brokerNames=broker;
            });
          this.status=true;
        }
        else if(catagory=='Partywise')
        {
          this.customer=true;
          this.item=false;
          this.broker=false;
          this.userForm.patchValue({itemname:['0'],brokername:['0']});
          this.DropDownListService.salesOrderPartylist(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value)
          .subscribe(customer=>
            {
              //console.log("customer:"+JSON.stringify(customer))
              this.customerNames_List=customer;
            });
          this.status=true;
        }
        else{
          this.customer=false;
          this.item=false;
          this.broker=false;
          this.userForm.patchValue({itemname:['0'],brokername:['0'],customer_name:['0']});
          this.status=true;
        }
      }
      else{
        this.customer=false;
        this.item=false;
        this.broker=false;
        this.userForm.patchValue({itemname:['0'],brokername:['0'],customer_name:['0']});
        this.status=true;
      }
  }

  search()
  {
    let business_unit=this.userForm.get("business_unit").value;
    let catagory=this.userForm.get("catagory").value;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;

    this.status = false;
    this.bagstotal=0;
    this.qtlstotal=0;
    this.avgbagstotal=0;
    this.avgqtlstotal=0;
    this.amounttotal=0;

    if(business_unit == '' || business_unit == null || business_unit == 0)
    {
      alert("Please Select Bussiness Unit Name");
      this.status=true;
    }
    else if(fromdate == '' || fromdate == null || fromdate == 0)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else if(todate == '' || todate == null || todate == 0)
    {
      alert("Please Select To Date");
      this.status=true;
    }
    else if(catagory == '' || catagory == null || catagory == 0)
    {
      alert("Please Select Catagory");
      this.status=true;
    }
    else if(catagory == 'Brokerwise' && (this.userForm.get("brokername").value == ''|| this.userForm.get("brokername").value == null || this.userForm.get("brokername").value == 0))
    {
      alert("Please Select Broker Name");
      this.status=true;
    }
    else if(catagory == 'Partywise' && (this.userForm.get("customer_name").value == ''|| this.userForm.get("customer_name").value == null || this.userForm.get("customer_name").value == 0))
    {
      alert("Please Select Customer Name");
      this.status=true;
    }
    else if(catagory == 'Itemwise' && (this.userForm.get("itemname").value == ''|| this.userForm.get("itemname").value == null || this.userForm.get("itemname").value == 0))
    {
      alert("Please Select Item Name");
      this.status=true;
    }
    else{
      if(catagory=='Itemwise')
      {
        this.catagoryname=this.userForm.get("itemname").value;
      }
      if(catagory=='Brokerwise')
      {
        this.catagoryname=this.userForm.get("brokername").value;
      }
      if(catagory=='Partywise')
      {
        this.catagoryname=this.userForm.get("customer_name").value;
      }
      this.DropDownListService.getSalesOrderSummaryCatagorywiseList(catagory,this.catagoryname,fromdate,todate,business_unit).subscribe(data=>
        {
        //  console.log(" report1  :: "+JSON.stringify(data))
        this.summarylist=data;
        
        data.forEach(element => {
          this.bagstotal+=Number(element["squantity"]);
          this.qtlstotal+=Number(element["quantity"]);
          this.avgbagstotal+=Number(element["bagsprice"]);
          this.avgqtlstotal+=Number(element["qtlsprice"]);
          this.amounttotal+=Number(element["amount"]);
        });
        this.avgbagstotal=this.avgbagstotal/data.length;
        this.avgqtlstotal=this.avgqtlstotal/data.length;
        if(catagory=='Itemwise')
        {
          this.headingtop=('FG Sales Order Contract Summary Itemwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
        if(catagory=='Brokerwise')
        {
          this.headingtop=('FG Sales Order Contract Summary Brokerwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
        if(catagory=='Partywise')
        {
          this.headingtop=('FG Sales Order Contract Summary Partywise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
          this.status=true;
  
        }, (error) => {this.status=true;
          alert("Data Not Found !!!")
          this.summarylist=[];
        });
    }  
  }


  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    let catagory=this.userForm.get("catagory").value;
    if(catagory=='Itemwise')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Order Contract Summary Itemwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='Brokerwise')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Order Contract Summary Brokerwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='Partywise')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Order Contract Summary Partywise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    
 }

}
