import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-purchasebillmiscleaneousreport',
  templateUrl: './purchasebillmiscleaneousreport.component.html',
  styleUrls: ['./purchasebillmiscleaneousreport.component.scss']
})
export class PurchasebillmiscleaneousreportComponent implements OnInit {
  public userForm:FormGroup;
  status = false;
  misclist:any = [];
  GrnList:any = [];
  AdviceList:any = [];
  PoList:any = [];

  partyshow:boolean=false;
  brokershow:boolean=false;
  supplierNames:any = [];
  brokerNames:any = [];
  businesslists:any = [];
  currentDate:any;
  BuUnit:any;
  totalgrosswt:number=0;
  totalnetwt:number=0;
  avgrate:number=0;
  totalamt:number=0;
  totaldeduction:number=0;
  totalnetamt:number=0;
  headingtop:any;

  postatus:boolean=false;
  advicestatus:boolean=false;
  grnstatus:boolean=false;
  purbillstatus:boolean=false;
  company_name:any;

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService)
   { 
    this.userForm=fb.group(
      {
        business_unit:[''],
        catagory:[''],
        fromdate:[''],
        todate:[''],
        supplier_name:[''],
        ven_code_name:['']
      });

    }

   get business_unit(){return this.userForm.get("business_unit") as FormControl};
   get catagory(){return this.userForm.get("catagory") as FormControl};
   get fromdate(){return this.userForm.get("fromdate") as FormControl};
   get todate(){return this.userForm.get("todate") as FormControl};
   get supplier_name(){return this.userForm.get("supplier_name") as FormControl};
   get ven_code_name(){return this.userForm.get("ven_code_name") as FormControl};


  ngOnInit()
  {
      this.status=true; 
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(localStorage.getItem("company_name")),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
        ).subscribe(([data,companydata])=>
      {
        this.company_name=companydata.company_name;
        this.businesslists=data;
      });
      this.BuUnit="CBU00001";
      this.purbillstatus=true;
  }
  onChangetype(type)
  {
      if(type.length)
      {
        if(this.userForm.get("fromdate").value =='' ||this.userForm.get("fromdate").value ==null  || this.userForm.get("fromdate").value =='0' )
        {
          alert("Please Select From Date !!!!!!!");
          this.status=true;
        }
        if(type == 'Partywise')
        {
          this.partyshow=true;
          this.brokershow=false;
          this.userForm.patchValue({ven_code_name:['0']});
          this.DropDownListService.purchaseBillSupplierNamesList(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
            {
             // console.log("supplierNames:"+JSON.stringify(data))
              this.supplierNames=data;
            });
        }
        else if (type == 'Brokerwise')
        {
          this.partyshow=false;
          this.brokershow=true;
          this.userForm.patchValue({supplier_name:['0']});
          this.DropDownListService.purchaseBillBrokerNamesList(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
            {
             // console.log("brokerNames:"+JSON.stringify(data))
              this.brokerNames = data;
            });
            
        }
        else if (type == 'All')
        {
          this.partyshow=false;
          this.brokershow=false;
          this.userForm.patchValue({supplier_name:['0'],ven_code_name:['0']});
        }

      }

  }

  search()
  {
    this.status=false;
    let business_unit= this.userForm.get("business_unit").value;
    let catagory=this.userForm.get("catagory").value;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
    let supplier_name=this.userForm.get("supplier_name").value;
    let ven_code_name=this.userForm.get("ven_code_name").value;
    this.totalgrosswt=0;
    this.totalnetwt=0;
    this.avgrate=0;
    this.totalamt=0;
    this.totaldeduction=0;
    this.totalnetamt=0;
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
    else if(catagory == 'Partywise' && (this.userForm.get("supplier_name").value =='' ||this.userForm.get("supplier_name").value ==null  || this.userForm.get("supplier_name").value =='0' ))
      {
        alert("Please Select Supplier Name !!!!!!!");
        this.status=true;
      }
    else if(catagory == 'Brokerwise' && (this.userForm.get("ven_code_name").value =='' ||this.userForm.get("ven_code_name").value ==null  || this.userForm.get("ven_code_name").value =='0' ))
      {
        alert("Please Select Broker Name !!!!!!!");
        this.status=true;
      }
    else{
        this.DropDownListService.getPurchaseBillmiscreport(business_unit,catagory,fromdate,todate,supplier_name,ven_code_name).subscribe(data=>
        {
          //console.log(" report1  :: "+JSON.stringify(data))
            this.misclist=data;
            data.forEach(element => {
              this.totalgrosswt+=Number(element["grwt"]);
              this.totalnetwt+=Number(element["netwt"]);
              this.avgrate+=Number(element["rate"]);
              this.totalamt+=Number(element["amount"]);
              this.totaldeduction+=Number(element["discount"]);
              this.totalnetamt+=Number(element["netamount"]);
            });
            this.avgrate=this.avgrate/data.length;

            if(catagory=='Brokerwise')
            {
              this.headingtop=('RM Purchase Bill Contract Brokerwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
            }
            if(catagory=='Partywise')
            {
              this.headingtop=('RM Purchase Bill Contract Partywise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
            }
            if(catagory=='All')
            {
             this.headingtop=('RM Purchase Bill Contract All As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
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
        this.excelService.exportAsExcelFile(element, 'RM Purchase Bill Contract Brokerwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
      }
      if(catagory=='Partywise')
      {
        this.excelService.exportAsExcelFile(element, 'RM Purchase Bill Contract Partywise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
      }
      if(catagory=='All')
      {
        this.excelService.exportAsExcelFile(element, 'RM Purchase Bill Contract All As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
      }
   }


   grnshow(referance_id)
   {
      this.DropDownListService.getGrnDetailsThroughGrnId(referance_id).subscribe(data=>
      {
        this.GrnList=data;
        this.grnstatus =true

        this.postatus=false;
        this.advicestatus=false;
       
        this.purbillstatus=false;
      })
   }

   Adviceshow(referance_id)
   {
      this.DropDownListService.getUnloadDetailsThroughUnloadId(referance_id).subscribe(data=>
      {
        this.AdviceList=data;
        this.advicestatus=true;

        this.postatus=false;
       
        this.grnstatus=false;
        this.purbillstatus=false;
        
      })
   }

   PurchaseOrdershow(referance_id)
   {
      this.DropDownListService.getPurOrderDetailsThroughOrderId(referance_id).subscribe(data=>
      {
        this.PoList=data;
        this.postatus=true;

        
        this.advicestatus=false;
        this.grnstatus=false;
        this.purbillstatus=false;
        
      })
   }

    grndetails(grn_id,id)
    {
      window.open("#/pages/invTrans/purchase/grn");
    
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",grn_id);
      localStorage.setItem("saction",'view');
    }

    Unloaddetails(unadviceid,id)
    {
      window.open("#/pages/invTrans/weighment/unloadAdvice");
     
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",unadviceid);
      localStorage.setItem("saction",'view');
    }

    podetailsdetails(pur_orderid,id)
    {
      window.open("#/pages/invTrans/purchase/purchase-order");
     
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",pur_orderid);
      localStorage.setItem("saction",'view');
    }

    PurBillpopup(pur_bill_id,id)
    {
  
      window.open("#/pages/invTrans/purchase/purchase-bill");
     
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",pur_bill_id);
      localStorage.setItem("saction",'view');
    }


    Back()
    {
      if(this.grnstatus ==true)
      {
        this.postatus=false;
        this.advicestatus=false;
        this.grnstatus=false;
        this.purbillstatus=true;
      }
      if(this.advicestatus== true)
      {
        this.postatus=false;
        this.advicestatus=false;
        this.grnstatus=true;
        this.purbillstatus=false;
      }
      if(this.postatus == true)
      {
        this.postatus=false;
        this.advicestatus=true;
        this.grnstatus=false;
        this.purbillstatus=false;
      }



    }
}