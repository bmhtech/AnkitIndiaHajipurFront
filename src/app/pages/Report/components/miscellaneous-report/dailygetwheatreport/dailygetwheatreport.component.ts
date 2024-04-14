import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ExcelService } from '../../../../../service/excel.service';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dailygetwheatreport',
  templateUrl: './dailygetwheatreport.component.html',
  styleUrls: ['./dailygetwheatreport.component.scss']
})
export class DailygetwheatreportComponent implements OnInit {

  public userForm:FormGroup; 
  public userForm1:FormGroup;
  public userForm2:FormGroup;
  public userForm3:FormGroup;
  inwardlist:any = [];
  otherkatalist:any=[];
  outwardlist:any=[];
  status = false;
  challanlist:any=[];
  kata:boolean=false;
  otherkata:boolean=false;
  salesShow:boolean=false;
  purchaseShow:boolean=false;
  partyList:any=[];
  supplierNames:any = [];
  jobworkwgtlist:any=[];
  partylist1:any=[];
  company_name:any;


  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService)
  {
        this.userForm=fb.group(
        {
          unloaddate:[''],
          unloadtodate:[''],
          wei_type:[''],
          order_type:[''],
          customer:[''],
          supplier:[''],
          party_name:['']
        });

        this.userForm1=fb.group(
          {
            fromdate:[''],
            todate:['']
          });
        this.userForm2=fb.group(
          {
            chfromdate:[''],
            chtodate:[''],
            trans_borne_by:['']
          });
        this.userForm3=fb.group(
          {
            loadfromdate:[''],
            load2date:[''],
            party:['']
          });
  }

  get unloaddate(){return this.userForm.get("unloaddate") as FormControl};
  get unloadtodate(){return this.userForm.get("unloadtodate") as FormControl};
  get wei_type(){return this.userForm.get("wei_type") as FormControl};
  get order_type(){return this.userForm.get("order_type") as FormControl};
  get customer(){return this.userForm.get("customer") as FormControl};
  get supplier(){return this.userForm.get("supplier") as FormControl};
  get party_name(){return this.userForm.get("party_name") as FormControl};

  get fromdate(){return this.userForm1.get("fromdate") as FormControl};
  get todate(){return this.userForm1.get("todate") as FormControl};
  get chfromdate(){return this.userForm2.get("chfromdate") as FormControl};
  get chtodate(){return this.userForm2.get("chtodate") as FormControl};
  get trans_borne_by(){return this.userForm2.get("trans_borne_by") as FormControl};

  get loadfromdate(){return this.userForm3.get("loadfromdate") as FormControl};
  get load2date(){return this.userForm3.get("load2date") as FormControl};
  get party(){return this.userForm3.get("party") as FormControl};
  
  ngOnInit() 
  {
    forkJoin(
    this.Service.getCustomerBussinessPartnerFastApi(localStorage.getItem("company_name")),
    this.DropDownListService.supplierNamesNewList(localStorage.getItem("company_name")),
    this.DropDownListService.getOtherPartyMasterList(localStorage.getItem("company_name")),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    ).subscribe(([customerlist,supplierlist,partydata,companydata])=>
      {
        this.partyList = customerlist;
        this.supplierNames = supplierlist;
        this.partylist1=partydata;
       // console.log(" True "+JSON.stringify(customerlist) );
       this.company_name=companydata.company_name;
        this.status = true;
      });
    this.status=true;
    this.kata=true;
    
  }

  weighmenttype()
  {
    if(this.userForm.get("wei_type").value=='Weighment')
    {
      this.kata=true;
      this.otherkata=false;
    }
    else if(this.userForm.get("wei_type").value=='Other')
    {
      this.kata=false;
      this.otherkata=true;
      this.salesShow=false;
      this.purchaseShow=false;
    }
    else{
      this.kata=false;
      this.otherkata=false;
    }
  }
 
  onChangeOrder(order)
  {
    if(order=="Sale")
    {
      this.salesShow=true;
      this.purchaseShow=false;
    }
    else if(order=="Purchase"){
      this.salesShow=false;
      this.purchaseShow=true;
    }
    else{
      this.salesShow=false;
      this.purchaseShow=false;
    }
  }

  search()
  {
    this.status=false;
    let customer=this.userForm.get("customer").value;
    let supplier=this.userForm.get("supplier").value;
    let unloaddate=this.userForm.get("unloaddate").value;
    let unloadtodate=this.userForm.get("unloadtodate").value;
    let order_type=this.userForm.get("order_type").value;
    let party_name=this.userForm.get("party_name").value;
    let party='';
    console.log("cust :"+customer+"//"+supplier)
    if(this.userForm.get("wei_type").value == '' || this.userForm.get("wei_type").value == null)
        {
          alert("Please Select Type");
          this.status=true;
        }

    else{
      if(this.userForm.get("wei_type").value=='Weighment')
        {
          if(this.userForm.get("order_type").value == '' || this.userForm.get("order_type").value == null)
          {
            alert("Please Select Order");
            this.status=true;
          }
          else
          {
            if((customer=='' || customer == null) && (supplier == '' || supplier == null))
            {
              //console.log("if part"+customer+"//"+supplier)
              //this.DropDownListService.getdailygatewheatinwardreport(this.userForm.get("unloaddate").value,this.userForm.get("unloadtodate").value).subscribe(data=>
              //this.DropDownListService.getdailygatewheatinwardreportnew(this.userForm.get("unloaddate").value,this.userForm.get("unloadtodate").value).subscribe(data=>
              this.DropDownListService.getdailygatewheatinwardreportnew2(unloaddate,unloadtodate,order_type).subscribe(data=>
                {
                  //console.log(" report  :: "+JSON.stringify(data))
                  this.inwardlist = data;
                  this.status=true;
                });
            }
            else
            {
              //console.log("else part"+customer+"//"+supplier)
              if(order_type == 'Purchase')
              {party=supplier;}
              else if(order_type == 'Sale')
              {party=customer;}
              else
              {party='';}

               this.DropDownListService.getdailygatewheatinwardreportnew2WithParty(unloaddate,unloadtodate,order_type,party).subscribe(data=>
                {
                  //console.log(" report1  :: "+JSON.stringify(data))
                  this.inwardlist = data;
                  this.status=true;
                }); 
            }
            
          }
          
        }
        else
        {
          if(party_name == '' || party_name == null)
          {
            this.DropDownListService.getOtherKataReport(this.userForm.get("unloaddate").value,this.userForm.get("unloadtodate").value).subscribe(data=>
              {
                //console.log(" report  :: "+JSON.stringify(data))
                this.otherkatalist = data;
                this.status=true;
              }); 
          }
          else
          {
            this.DropDownListService.getOtherKataWithPartyReport(this.userForm.get("unloaddate").value,this.userForm.get("unloadtodate").value,party_name).subscribe(data=>
              {
                //console.log(" report  :: "+JSON.stringify(data))
                this.otherkatalist = data;
                this.status=true;
              }); 
          }
          
        }
    
    }
  }
 
  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Daily Gate Wheat Inward Report as on ' + this.userForm.get("unloaddate").value);
 }
 exportAsXLSXOther():void 
  {
    let element = document.getElementById('otherkataexport'); 
    this.excelService.exportAsExcelFile(element, 'Other Weighment Report as on ' + this.userForm.get("unloaddate").value);
 }
 
 exportAsXLSX2():void 
 {
   let element = document.getElementById('dynamictable2'); 
   this.excelService.exportAsExcelFile(element, 'Daily Gate Wheat Outward Report  From ' + this.userForm1.get("fromdate").value +'to' + this.userForm1.get("todate").value);
}

  search1()
  {
    let fromdate=this.userForm1.get("fromdate").value;
    let todate=this.userForm1.get("todate").value;
    this.status=false;
    this.DropDownListService.getdailygatewheatOUTwardreport("fromdate="+fromdate+"&todate="+todate).subscribe(outwardlistdata=>
      {
        this.outwardlist = outwardlistdata;
        this.status=true;
      }); 
  }
  searchChallan()
  {
    let fromdate=this.userForm2.get("chfromdate").value;
    let todate=this.userForm2.get("chtodate").value;
    let trans_borne_by=this.userForm2.get("trans_borne_by").value;
    this.status=false;
    this.DropDownListService.getChallanPerTransportReport("fromdate="+fromdate+"&todate="+todate+"&transborneby="+trans_borne_by).subscribe(challandata=>
      {
        this.challanlist = challandata;
        this.status=true;
      }); 
  }

  exportAsXLSX3():void 
 {
   let element = document.getElementById('dynamictable3'); 
   this.excelService.exportAsExcelFile(element, 'Challan Transport Report  From ' + this.userForm2.get("chfromdate").value +'to' + this.userForm2.get("chtodate").value);
}

  search3()
  {
    this.status=false;
    let party:any;
    if(this.userForm3.get("loadfromdate").value == '' || this.userForm3.get("loadfromdate").value == null)
    {
      alert("Please Choose FromDate");
      this.status=true;
    }
    else if(this.userForm3.get("load2date").value == '' || this.userForm3.get("load2date").value == null)
    {
      alert("Please Choose ToDate");
      this.status=true;
    }
    else
    {
      if(this.userForm3.get("party").value =='' || this.userForm3.get("party").value == null)
      {
        party=0;
      }
      else{
        party=this.userForm3.get("party").value;
      }
      this.DropDownListService.getdailyjobworkwgtreport(this.userForm3.get("loadfromdate").value,this.userForm3.get("load2date").value,party).subscribe(data=>
        {
          console.log("Jobwork Wgt report  :: "+JSON.stringify(data))
          this.jobworkwgtlist = data;
          this.status=true;
        });
       
    }
  }
 
  exportAsXLSX1():void 
  {
    let element = document.getElementById('dynamictable1'); 
    this.excelService.exportAsExcelFile(element, 'Daily Jobwork Weighment Report from ' + this.userForm3.get("loadfromdate").value+' to ' + this.userForm3.get("load2date").value);
  }

}
