import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-salesinvoice-miscellaneousreport',
  templateUrl: './salesinvoice-miscellaneousreport.component.html',
  styleUrls: ['./salesinvoice-miscellaneousreport.component.scss']
})
export class SalesinvoiceMiscellaneousreportComponent implements OnInit {

  public userForm:FormGroup; 
  misclist:any = [];
  status = false;
  businesslists:any = [];
  BuUnit:any;
  currentDate:any;
  company_name:any;
  brokerNames:any=[];
  customerNames_List:any=[];
  broker:boolean=false;
  customer:boolean=false;
  catagoryname:any;
  bagstotal:number=0;
  qtlstotal:number=0;
  avgbagstotal:number=0;
  avgqtlstotal:number=0;
  amounttotal:number=0;
  headingtop:any;
  company:any;

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  { 
    this.userForm=fb.group(
      {
        business_unit:[''],
        catagory:[''],
        fromdate:[''],
        todate:[''],
        customer_name:[''],
        brokername:['']
      });
  }
  get business_unit(){return this.userForm.get("business_unit") as FormControl};
  get catagory(){return this.userForm.get("catagory") as FormControl};
  get fromdate(){return this.userForm.get("fromdate") as FormControl};
  get todate(){return this.userForm.get("todate") as FormControl};
  get customer_name(){return this.userForm.get("customer_name") as FormControl};
   get brokername(){return this.userForm.get("brokername") as FormControl};
  
  ngOnInit() {
    this.status=true;
    this.company_name=localStorage.getItem("company_name");
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
      ).subscribe(([data,companydata])=>
          {
            this.businesslists= data;
            this.company=companydata.company_name;
          });
        this.BuUnit = "CBU00001";
  }
  onChangeCatagory(catagory)
  {
    if(catagory.length && catagory != "0")
      {
      this.status=false
      if(this.userForm.get("fromdate").value =='' ||this.userForm.get("fromdate").value ==null  || this.userForm.get("fromdate").value =='0' )
      {
        alert("Please Select From Date !!!!!!!");
        this.status=true;
      }
        if(catagory=='Brokerwise')
        {
          this.broker=true;
          this.customer=false;
          this.userForm.patchValue({customer_name:['0']});
          this.DropDownListService.salesInvoiceBrokerlist(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
            {
              this.brokerNames = data;
            });
            this.status=true;
        }
        else if(catagory=='Partywise')
        {
          this.customer=true;
          this.broker=false;
          this.userForm.patchValue({brokername:['0']});
          this.DropDownListService.salesInvoicePartylist(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
            {
              this.customerNames_List=data;
            });
            this.status=true;
        }
        else{
          this.customer=false
          this.broker=false;
          this.userForm.patchValue({customer_name:['0'],brokername:['0']});
          this.status=true;
        }
      }
      else{
        this.customer=false;
        this.broker=false;
        this.userForm.patchValue({customer_name:['0'],brokername:['0']});
        this.status=true;
      }
  }
  search()
  {
    let business_unit=this.userForm.get("business_unit").value;
    let catagory=this.userForm.get("catagory").value;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
    let brokername=this.userForm.get("brokername").value;
    let customer_name=this.userForm.get("customer_name").value;
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
    else if(catagory == 'Brokerwise' && (brokername == ''|| brokername == null || brokername == 0))
    {
      alert("Please Select Broker Name");
      this.status=true;
    }
    else if(catagory == 'Partywise' && (customer_name == ''|| customer_name == null || customer_name == 0))
    {
      alert("Please Select Customer Name");
      this.status=true;
    }
    else{
      if(catagory=='Brokerwise')
      {
        this.catagoryname=this.userForm.get("brokername").value;
      }
      if(catagory=='Partywise')
      {
        this.catagoryname=this.userForm.get("customer_name").value;
      }
    this.DropDownListService.getSalesInvoiceMiscList(catagory,fromdate,todate,business_unit,brokername,customer_name).subscribe(data=>
      {
        //console.log(" report1  :: "+JSON.stringify(data))
        this.misclist=data;

        data.forEach(element => {
          this.bagstotal+=Number(element["squantity"]);
          this.qtlstotal+=Number(element["quantity"]);
          this.avgbagstotal+=Number(element["bagsprice"]);
          this.avgqtlstotal+=Number(element["qtlsprice"]);
          this.amounttotal+=Number(element["amount"]);
        });
        this.avgbagstotal=this.avgbagstotal/data.length;
          this.avgqtlstotal=this.avgqtlstotal/data.length;
        if(catagory=='Brokerwise')
        {
          this.headingtop=('FG Sales Invoice Contract Brokerwise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
        if(catagory=='Partywise')
        {
          this.headingtop=('FG Sales Invoice Contract Partywise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
        if(catagory=='All')
        {
          this.headingtop=('FG Sales Invoice Contract All Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
        this.status=true;
 
      }, (error) => {this.status=true;
        alert("Data Not Found !!!")
        this.misclist=[];
      });
    }
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    let catagory=this.userForm.get("catagory").value;
    if(catagory=='Brokerwise')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Invoice Brokerwise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='Partywise')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Invoice Partywise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='All')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Invoice All Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
 }

}