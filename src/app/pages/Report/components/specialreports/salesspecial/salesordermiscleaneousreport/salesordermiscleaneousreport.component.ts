import { Component, OnInit } from '@angular/core';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SalesOrderMiscRepPopUpComponent } from '../sales-order-misc-rep-pop-up/sales-order-misc-rep-pop-up.component';

@Component({
  selector: 'app-salesordermiscleaneousreport',
  templateUrl: './salesordermiscleaneousreport.component.html',
  styleUrls: ['./salesordermiscleaneousreport.component.scss']
})
export class SalesordermiscleaneousreportComponent implements OnInit {
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
  checkboxarray:any=[];
  checkboxarrayindex:any=[];
  company:any;

  constructor(public fb:FormBuilder,public dialog: MatDialog,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  { 
    this.userForm=fb.group(
      {
        business_unit:[''],
        catagory:[''],
        customer_name:[''],
        brokername:[''],
        fromdate:[''],
        todate:['']
      });
  }
  get business_unit(){return this.userForm.get("business_unit") as FormControl};
  get catagory(){return this.userForm.get("catagory") as FormControl};
  get customer_name(){return this.userForm.get("customer_name") as FormControl};
   get brokername(){return this.userForm.get("brokername") as FormControl};
  get fromdate(){return this.userForm.get("fromdate") as FormControl};
  get todate(){return this.userForm.get("todate") as FormControl};
  
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
      //    this.customerNames_List=customer;
        //  this.brokerNames=broker;
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
          //this.DropDownListService.brokerCodeList().subscribe(data=>
          this.DropDownListService.salesOrderBrokerlist(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
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
          //this.DropDownListService.newcustomerList(localStorage.getItem("company_name")).subscribe(data=>
          this.DropDownListService.salesOrderPartylist(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
            {
              this.customerNames_List=data;
            });
            this.status=true;
        }
        else{
          this.customer=false
          this.broker=false;
          this.userForm.patchValue({customer_name:['0'],brokername:['0']})
          this.status=true;
        }
      }
      else{
        this.customer=false;
        this.broker=false;
        this.userForm.patchValue({customer_name:['0'],brokername:['0']})
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
    this.DropDownListService.getSalesOrderMiscList(catagory,fromdate,todate,business_unit,brokername,customer_name).subscribe(data=>
      {
        console.log(" report1  :: "+JSON.stringify(data))
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
          this.headingtop=('FG Sales Order Contract Brokerwise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
        if(catagory=='Partywise')
        {
          this.headingtop=('FG Sales Order Contract Partywise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
        }
        if(catagory=='All')
        {
          this.headingtop=('FG Sales Order Contract All Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
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
      this.excelService.exportAsExcelFile(element, 'FG Sales Order Contract Brokerwise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='Partywise')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Order Contract Partywise Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='All')
    {
      this.excelService.exportAsExcelFile(element, 'FG Sales Order Contract All Misc. As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    
 }

 clickCheckBox(event,index,poid)
 {
   
   if(event.target.checked)
   {
     this.checkboxarray.push(poid);
     this.checkboxarrayindex.push(index);
     console.log("if::"+this.checkboxarray+" index::"+index+" // "+this.checkboxarrayindex);
   }
   else
   {
     console.log("index::"+index)
     this.checkboxarray.splice(this.checkboxarrayindex.indexOf(index),1);
     this.checkboxarrayindex.splice(this.checkboxarrayindex.indexOf(index),1);
     console.log("else::"+this.checkboxarray+" // "+this.checkboxarrayindex);
   }
 
 }

 openPopUp()
 {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   let fromdate=this.userForm.get("fromdate").value;
   let todate=this.userForm.get("todate").value;
   let catagory=this.userForm.get("catagory").value;

   dialogConfig.data = { index: 0,};
   let dialogRef;

   dialogRef = this.dialog.open(SalesOrderMiscRepPopUpComponent, {data:{soid:this.checkboxarray,fromdate:fromdate,todate:todate,catagory:catagory } ,height: '80%',
   width: '80%' } );
   dialogRef.afterClosed().subscribe(data => 
   {

   });

 }
 
 

}
