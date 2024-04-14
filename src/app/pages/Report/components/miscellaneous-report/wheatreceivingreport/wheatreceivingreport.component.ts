import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Wheatreceiving } from '../../../../../Models/Report/Wheatreceiving';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { WheatreceivingreportprintpopupComponent } from '../wheatreceivingreportprintpopup/wheatreceivingreportprintpopup.component';

@Component({
  selector: 'app-wheatreceivingreport',
  templateUrl: './wheatreceivingreport.component.html',
  styleUrls: ['./wheatreceivingreport.component.scss']
})
export class WheatreceivingreportComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Wheatreceiving = new Wheatreceiving();
  isHidden:any;
  wheatreceivinglist:any = [];
  status = false;
  businesslists:any=[];
  employeelist:any=[];
  hublist:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  wheatreceivingsave:boolean=true;
  sl_no:number=1;
  sl_no1:number=1;
  sl_no2:number=1;
  itemList:any=[];

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      date:[''],
      wheatreceiveid:[''],
      business_unit:[''],
      createdby:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      wheatreceiving_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        truckno:'',
        hub:'',
        grade:'',
        sixtykgbags:'',
        sixtykgqty:'',
       
        total:'',
        stackno:''
      })]),
      wheat_issue_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no1,
        issue_grade:'',
        stack_no:'',
        issue_bags:'',
        issue_qty:''
      })]),

      wheatstock_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no2,
        stack:'',
        wheat_grade:'',
        openingbags:'',
        openingqty:'',
        openingloose:'',
        receiptbags:'',
        receiptqty:'',
        receiptloose:'',
        issuebags:'',
        issueqty:'',
        issueloose:'',
        closingbags:'',
        closingqty:'',
        closingloose:''
      })])

    });

    this.userForm1=fb.group(
      {
        fromdate:[''],
        todate:['']
      });
  }

   get id(){ return this.userForm.get("id") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get createdby(){ return this.userForm.get("createdby") as FormControl }
   
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get wheatstock_Dtls(){return this.userForm.get("wheatstock_Dtls") as FormArray};
   get wheatreceiving_Dtls(){return this.userForm.get("wheatreceiving_Dtls") as FormArray};
   get wheat_issue_Dtls(){return this.userForm.get("wheat_issue_Dtls") as FormArray};

   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.sl_no=1;
    this.sl_no1=1;
    this.sl_no2=1;

    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
     this.wheatreceivingsave=true;

   forkJoin(
    this.DropDownListService.getWheatReceivinglist(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getEmployeeNamenew(this.company_name),
    this.DropDownListService.getHubMasterList(this.company_name)
    )
   .subscribe(([wheatdata,budata,emplist,hubli])=>
    {
      //console.log("bunit:"+JSON.stringify(hubli));
        this.wheatreceivinglist = wheatdata;
        this.businesslists=budata;
        this.employeelist=emplist;
        this.hublist=hubli;
    });

  }
  
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.wheatreceivingsave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.ResetAllValues();
    }
  }
  ResetAllValues()
  {
  return this.userForm=this.fb.group({
  id:[''],
  date:[''],
  wheatreceiveid:[''],
  business_unit:[''],
  createdby:[''],
  company_id:[''],
  fin_year:[''],
  username:[''],

  wheatreceiving_Dtls: this.fb.array([this.fb.group({
    slno:this.sl_no,
    truckno:'',
    hub:'',
    grade:'',
    sixtykgbags:'',
    sixtykgqty:'',
   
    total:'',
    stackno:''
  })]),
  wheat_issue_Dtls: this.fb.array([this.fb.group({
    slno:this.sl_no1,
    issue_grade:'',
    stack_no:'',
    issue_bags:'',
    issue_qty:''
  })]),
  wheatstock_Dtls: this.fb.array([this.fb.group({
    slno:this.sl_no2,
    stack:'',
    wheat_grade:'',
    openingbags:'',
    openingqty:'',
    openingloose:'',
    receiptbags:'',
    receiptqty:'',
    receiptloose:'',
    issuebags:'',
    issueqty:'',
    issueloose:'',
    closingbags:'',
    closingqty:'',
    closingloose:''
  })])

});
}
  addItems()
  {
   this.sl_no =this.wheatreceiving_Dtls.length +1; 
    this.wheatreceiving_Dtls.push(this.fb.group({
      slno:this.sl_no,
      truckno:'',
        hub:'',
        grade:'',
        sixtykgbags:'',
        sixtykgqty:'',
     
        total:'',
        stackno:''}))
    }

  addItems1()
  {
    this.sl_no1 =this.wheat_issue_Dtls.length +1; 
    this.wheat_issue_Dtls.push(this.fb.group({
      slno:this.sl_no2,
      issue_grade:'',
      stack_no:'',
      issue_bags:'',
      issue_qty:''}))
    }

    addItems2()
    {
     this.sl_no2 =this.wheatstock_Dtls.length +1; 
      this.wheatstock_Dtls.push(this.fb.group({
        slno:this.sl_no2,
        stack:'',
        wheat_grade:'',
      openingbags:'',
      openingqty:'',
      openingloose:'',
      receiptbags:'',
      receiptqty:'',
      receiptloose:'',
      issuebags:'',
      issueqty:'',
      issueloose:'',
      closingbags:'',
      closingqty:'',
      closingloose:''}))
      }

    delete(index) 
    {
      if(index)
      {
        this.wheatreceiving_Dtls.removeAt(index);
        for( let i=0;i<=this.wheatreceiving_Dtls.length;i++)
        {
          this.wheatreceiving_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.wheatreceiving_Dtls.length>1)
        {
          this.wheatreceiving_Dtls.removeAt(index);
          for( let i=0;i<=this.wheatreceiving_Dtls.length;i++)
        {
          this.wheatreceiving_Dtls.at(i).patchValue({slno:i+1})
        }

        }
        else
        {
          alert("can't delete all rows");
        }} 
    }
    delete1(index) 
    {
      if(index)
      {
        this.wheat_issue_Dtls.removeAt(index);
        for( let i=0;i<=this.wheat_issue_Dtls.length;i++)
        {
          this.wheat_issue_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.wheat_issue_Dtls.length>1)
        {
          this.wheat_issue_Dtls.removeAt(index);
          for( let i=0;i<=this.wheat_issue_Dtls.length;i++)
        {
          this.wheat_issue_Dtls.at(i).patchValue({slno:i+1})
        }

        }
        else
        {
          alert("can't delete all rows");
        }} 
    }

    delete2(index) 
    {
      if(index)
      {
        this.wheatstock_Dtls.removeAt(index);
        for( let i=0;i<=this.wheatstock_Dtls.length;i++)
        {
          this.wheatstock_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.wheatstock_Dtls.length>1)
        {
          this.wheatstock_Dtls.removeAt(index);
          for( let i=0;i<=this.wheatstock_Dtls.length;i++)
        {
          this.wheatstock_Dtls.at(i).patchValue({slno:i+1})
        }

        }
        else
        {
          alert("can't delete all rows");
        }} 
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
        fin_year:localStorage.getItem("financial_year"), 
        username: localStorage.getItem("username")});
        this.status=false;
        
          if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == 0 || this.userForm.get("business_unit").value == null)
          {
            alert("Please Select Bussiness Unit Name")
            this.status=true;
          }
          else if(this.userForm.get("createdby").value == '' || this.userForm.get("createdby").value == null)
          {
            alert("Please Enter Created By")
            this.status=true;
          }
          else
          {
            if(this.Id>0)
            {
              this.Service.updatewheatreceiving(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Wheat Receiving Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Wheat Receiveing Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createwheatreceiving(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Wheat Receiving Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Wheat Receiveing Report !!! please Reload the page and try again....");
              });
            }
          }
          
        }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Wheat Receiving  Report List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deletewheatreceiving(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Wheat Receiving Report Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.ngOnInit();
                });
      
          }
        }
       
        onUpdate(id,action)
        {
          this.isHidden=true;
          if(action == "view")
          {
            this.wheatreceivingsave=false;
          }
          if(action == "update")
          {
            this.wheatreceivingsave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveWheatReceiving(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getEmployeeNamenew(this.company_name),
            this.DropDownListService.getHubMasterList(this.company_name)
            ).subscribe(([wheatreceiveList,bUnitData,empdata,hubli])=>
            {
              this.businesslists=bUnitData;
              this.employeelist=empdata;
              this.hublist=hubli;
              this.userForm.patchValue(wheatreceiveList);
              forkJoin(
                  this.DropDownListService.retriveWheatDetails(wheatreceiveList['wheatreceiveid']),
                  this.DropDownListService.retriveWheatIssueDetails(wheatreceiveList['wheatreceiveid']),
                 this.DropDownListService.getweatreceivingitemlist(wheatreceiveList['business_unit']),
                  this.DropDownListService.retrivewheatstock_Dtls(wheatreceiveList['wheatreceiveid'])
                  ).subscribe(([dynamicdetails,issueDetails,item_list,wheatstockDtls])=>  
                    {
                      this.selectedItemName = [];
                      this.selectedItemName1=[];
                      this.selectedItemName3=[];
                      this.itemList=item_list;
                      let k=0;
                      this.sl_no = 0;
                      while (this.wheatreceiving_Dtls.length) 
                      this.wheatreceiving_Dtls.removeAt(0);
                      for(let data1 of dynamicdetails)
                      {   
                        this.addItems();
                        this.selectedItemName[k] = data1["grade"];
                        this.wheatreceiving_Dtls.patchValue(dynamicdetails);
                        k++;
                      }

                      let f=0;
                      this.sl_no1 = 0;
                      while (this.wheat_issue_Dtls.length) 
                      this.wheat_issue_Dtls.removeAt(0);
                      for(let data2 of issueDetails)
                      {   
                        this.addItems1();
                        this.selectedItemName1[f] = data2["issue_grade"];
                        this.wheat_issue_Dtls.patchValue(issueDetails);
                        f++;
                      }
                      let g=0;
                      this.sl_no2 = 0;
                      while (this.wheatstock_Dtls.length) 
                      this.wheatstock_Dtls.removeAt(0);
                      for(let data3 of wheatstockDtls)
                      {   
                        this.addItems2();
                        this.selectedItemName3[g] = data3["wheat_grade"];
                        this.wheatstock_Dtls.patchValue(wheatstockDtls);
                        g++;
                      }
                      
                      this.status = true;
                    });
              
            
        
                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in power cut,please try again....");
             this.ngOnInit()}); 
        
      
      
        }
      
        search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searchWheatreceiving("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.wheatreceivinglist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Wheat Receiving Report Data Not Found !!!")
              this.wheatreceivinglist=[];
            })
        }
       
      
        
            selectedItemName = [];
            selectedItemName1=[];
            selectedItemName3=[];
            getitemname(businessunit_id)
            {
                if(businessunit_id.length)
                {
                    this.DropDownListService.getweatreceivingitemlist(businessunit_id).subscribe(data=>
                    {
                      this.itemList=data;
                    });        
                }
            }

            calstack(index)
            {
             
              let openingbags=this.wheatstock_Dtls.at(index).get("openingbags").value;
              let openingloosebags=this.wheatstock_Dtls.at(index).get("openingloose").value;
              let openingmt=this.wheatstock_Dtls.at(index).get("openingqty").value;
              let receiptbags=this.wheatstock_Dtls.at(index).get("receiptbags").value;
              let receiptloosebags=this.wheatstock_Dtls.at(index).get("receiptloose").value;
              let receiptmt=this.wheatstock_Dtls.at(index).get("receiptqty").value;
              let issuebags=this.wheatstock_Dtls.at(index).get("issuebags").value;
              let issueloosebags=this.wheatstock_Dtls.at(index).get("issueloose").value;
              let issuemt=this.wheatstock_Dtls.at(index).get("issueqty").value;
          
              let closing_totalbags=Number(openingbags)+Number(receiptbags)-Number(issuebags);
              let closing_totalloosebags=Number(openingloosebags)+Number(receiptloosebags)-Number(issueloosebags);
              let closing_totalmtbags=Number(openingmt)+Number(receiptmt)-Number(issuemt);
          
              this.wheatstock_Dtls.at(index).patchValue({closingbags:closing_totalbags,closingloose:closing_totalloosebags,closingqty:closing_totalmtbags.toFixed(3)});
          
            }
          
            print(wheatreceiveid)
            {
              const dialogConfig = new MatDialogConfig(); 
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = {  };
              
              let dialogRef = this.dialog.open(WheatreceivingreportprintpopupComponent, {data: {alldata: wheatreceiveid}, height: '80%',
              width: '80%'});
              dialogRef.afterClosed().subscribe( data => 
              {
              
              }); 
          
            }
          
            onchangeItemNamestock(index, itemId)
              {
                
                if(itemId.length && itemId != "0")
                {
                  this.wheatstock_Dtls.at(index).patchValue({wheat_grade: itemId});
                  let finyear =localStorage.getItem("financial_year");
                  this.DropDownListService.getopeningstockwheatrecieve(itemId,this.userForm.get("date").value,finyear).subscribe(data=>
                    {
                      this.wheatstock_Dtls.at(index).patchValue({openingbags:data["closingbags"],openingqty:data["closingqty"],openingloose:data["closingloose"]});
                      this.calstack(index);
                    }); 
                }
              }
          
              onchangeItemNamerecieve(index, itemId)
              {
                
                if(itemId.length && itemId != "0")
                {
                  this.wheatreceiving_Dtls.at(index).patchValue({grade: itemId});
                }
              }
          
              onchangeItemNameissue(index, itemId)
              {
                
                if(itemId.length && itemId != "0")
                {
                  this.wheat_issue_Dtls.at(index).patchValue({issue_grade: itemId});
                }
              }
          
}
