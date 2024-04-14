import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { formatDate } from '@angular/common';
import { PurOrderMiscRepPopupComponent } from '../pur-order-misc-rep-popup/pur-order-misc-rep-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PurchaseordertrackdownpopupComponent } from '../purchaseordertrackdownpopup/purchaseordertrackdownpopup.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-purchaseordermiscleaneousreport',
  templateUrl: './purchaseordermiscleaneousreport.component.html',
  styleUrls: ['./purchaseordermiscleaneousreport.component.scss']
})
export class PurchaseordermiscleaneousreportComponent implements OnInit {
  public userForm:FormGroup;
  status = false;
  misclist:any = [];
  partyshow:boolean=false;
  brokershow:boolean=false;
  supplierNames:any = [];
  brokerNames:any = [];
  businesslists:any = [];
  currentDate:any;
  BuUnit:any;
  totaltruck:any=0;
  totalpackqty:any=0;
  totalitemqty:any=0;
  totalprice:any=0;
  headingtop:any;
  checkboxarray:any=[];
  checkboxarrayindex:any=[];
  company_name:any;


  constructor(public fb:FormBuilder,public dialog: MatDialog,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService)
   { 
    this.userForm=fb.group(
      {
        business_unit:[''],
        catagory:[''],
        fromdate:[''],
        todate:[''],
        supplier_name:[''],
        ven_code_name:[''],
        statustype:['']
      });

    }

   get business_unit(){return this.userForm.get("business_unit") as FormControl};
   get catagory(){return this.userForm.get("catagory") as FormControl};
   get fromdate(){return this.userForm.get("fromdate") as FormControl};
   get todate(){return this.userForm.get("todate") as FormControl};
   get supplier_name(){return this.userForm.get("supplier_name") as FormControl};
   get ven_code_name(){return this.userForm.get("ven_code_name") as FormControl};
   get statustype(){return this.userForm.get("statustype") as FormControl};

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

    dialogRef = this.dialog.open(PurOrderMiscRepPopupComponent, {data:{poid:this.checkboxarray,fromdate:fromdate,todate:todate,catagory:catagory } ,height: '80%',
    width: '80%' } );
    dialogRef.afterClosed().subscribe(data => 
    {

    });

  }
  
  openPopUptracking()
  {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
    let catagory=this.userForm.get("catagory").value;

    dialogConfig.data = { index: 0,};
    let dialogRef;

    dialogRef = this.dialog.open(PurchaseordertrackdownpopupComponent, {data:{poid:this.checkboxarray,fromdate:fromdate,todate:todate,catagory:catagory } ,height: '80%',
    width: '80%' } );
    dialogRef.afterClosed().subscribe(data => 
    {

    });
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
         // this.DropDownListService.supplierNamesNewList(localStorage.getItem("company_name")).subscribe(data=>
         this.DropDownListService.purchaseOrderSupplierNamesList(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
            {
              console.log("supplierNames:"+JSON.stringify(data))
              this.supplierNames=data;
            });
        }
        else if (type == 'Brokerwise')
        {
          this.partyshow=false;
          this.brokershow=true;
          this.userForm.patchValue({supplier_name:['0']});
          //this.DropDownListService.brokerNameList().subscribe(data=>
          this.DropDownListService.purchaseOrderBrokerNamesList(localStorage.getItem("company_name"),this.userForm.get("fromdate").value,this.userForm.get("todate").value,this.userForm.get("business_unit").value).subscribe(data=>
            {
              this.brokerNames = data;
            });
            
        }
        else if (type == 'All')
        {
          this.partyshow=false;
          this.brokershow=false;
          this.userForm.patchValue({supplier_name:['0'],ven_code_name:['0']})
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
    let statustype=this.userForm.get("statustype").value;
    this.totaltruck=0;
    this.totalpackqty=0;
    this.totalitemqty=0;
    this.totalprice=0;
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
      else if(this.userForm.get("statustype").value =='' ||this.userForm.get("statustype").value ==null  || this.userForm.get("statustype").value =='0' )
      {
        this.userForm.patchValue({statustype:'All'})
        this.status=true;
      }
    else{
      this.DropDownListService.getPurchaseordermiscreport(business_unit,catagory,fromdate,todate,supplier_name,ven_code_name,statustype).subscribe(data=>
      {
        this.checkboxarray=[];
      // console.log(" report1  :: "+JSON.stringify(data))
        this.misclist=data;
        // let k=0;
        data.forEach(element => {
            
              this.totaltruck+=Number(element.truck);
              this.totalpackqty+=Number(element.packingqty);
              this.totalitemqty+=Number(element.itemqty);
              this.totalprice+=Number(element.rate);
        });
        this.totalprice=this.totalprice/data.length;
       // console.log(this.totaltruck + " / " + this.totalpackqty + " / " + this.totalitemqty + " / " + this.totalprice)
      
       if(catagory=='Brokerwise')
       {
         this.headingtop=('RM Purchase Contract Brokerwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
       }
       if(catagory=='Partywise')
       {
         this.headingtop=('RM Purchase Contract Partywise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
       }
       if(catagory=='All')
       {
        this.headingtop=('RM Purchase Contract All As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
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
      this.excelService.exportAsExcelFile(element, 'RM Purchase Contract Brokerwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='Partywise')
    {
      this.excelService.exportAsExcelFile(element, 'RM Purchase Contract Partywise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
    if(catagory=='All')
    {
      this.excelService.exportAsExcelFile(element, 'RM Purchase Contract All As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
    }
 }
}
