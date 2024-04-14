import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

import { forkJoin } from 'rxjs';
import { Wheatstackcardreport } from '../../../../../Models/Report/wheatstackcardreport';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WheatstackcardreportpopupComponent } from '../wheatstackcardreportpopup/wheatstackcardreportpopup.component';

@Component({
  selector: 'app-wheatstackcardreport',
  templateUrl: './wheatstackcardreport.component.html',
  styleUrls: ['./wheatstackcardreport.component.scss']
})
export class WheatstackcardreportComponent implements OnInit {

  public userForm:FormGroup;
  model: Wheatstackcardreport = new Wheatstackcardreport();
  isHidden:any;
  wheatstackcardlist:any = [];
  status = false;
  businesslists:any=[];
  company_name:any;
  BuUnit = "0";
  godown="0";
  close="0";
  Id:any;
  wheatsave:boolean=true;
  godownlist:any=[];

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
   { 

    this.userForm=fb.group({
      id:[''],
      business_unit:[''],
      godowncode:[''],     
      godownname:[''],
      stackno:[''],
      closed:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],
  

      wheatstackcardreportdetails: this.fb.array([this.fb.group({
        date:'',
        openingbags:'0',
        openingloosebags:'0',
        openingmt:'0',
        truckno:'',
        variety:'',
        origin:'',
        receiptbags:'0',
        receiptloosebags:'0',
        receiptmt:'0',
        issuebags:'0',
        issueloosebags:'0',
        issuemt:'0',
        closingbags:'0',
        closingloosebags:'0',
        closingmt:'0',
        savedstatus:'0'
      })])

    });

  }
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get id(){ return this.userForm.get("id") as FormControl }
  get godowncode(){ return this.userForm.get("godowncode") as FormControl }
  get godownname(){ return this.userForm.get("godownname") as FormControl }
  get stackno(){ return this.userForm.get("stackno") as FormControl } 
  get closed(){ return this.userForm.get("closed") as FormControl } 
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
  get wheatstackcardreportdetails() { return this.userForm.get('wheatstackcardreportdetails') as FormArray;}


  adddetails()
  {
    this.wheatstackcardreportdetails.push(this.fb.group({ 
      date:'',
      openingbags:'',
      openingloosebags:'',
      openingmt:'',
      truckno:'',
      variety:'',
      origin:'',
      receiptbags:'',
      receiptloosebags:'',
      receiptmt:'',
      issuebags:'',
      issueloosebags:'',
      issuemt:'',
      closingbags:'',
      closingloosebags:'',
      closingmt:'',
      savedstatus:'0'}));

      let bags=this.wheatstackcardreportdetails.at(this.wheatstackcardreportdetails.length-2).get("closingbags").value;
      let loosebags=this.wheatstackcardreportdetails.at(this.wheatstackcardreportdetails.length-2).get("closingloosebags").value;
      let mt=this.wheatstackcardreportdetails.at(this.wheatstackcardreportdetails.length-2).get("closingmt").value;

      this.wheatstackcardreportdetails.at(this.wheatstackcardreportdetails.length-1).patchValue({openingbags:bags,openingloosebags:loosebags,openingmt:mt,receiptbags:'0',receiptloosebags:'0',receiptmt:'0',issuebags:'0',issueloosebags:'0',issuemt:'0',closingbags:'0',closingloosebags:'0',closingmt:'0'});
  }

  adddetailsupdate()
  {
    this.wheatstackcardreportdetails.push(this.fb.group({ 
      date:'',
      openingbags:'',
      openingloosebags:'',
      openingmt:'',
      truckno:'',
      variety:'',
      origin:'',
      receiptbags:'',
      receiptloosebags:'',
      receiptmt:'',
      issuebags:'',
      issueloosebags:'',
      issuemt:'',
      closingbags:'',
      closingloosebags:'',
      closingmt:'',
      savedstatus:''}));
}

adddetailsreset()
{
  this.wheatstackcardreportdetails.push(this.fb.group({ 
    date:'',
    openingbags:'',
    openingloosebags:'',
    openingmt:'',
    truckno:'',
    variety:'',
    origin:'',
    receiptbags:'',
    receiptloosebags:'',
    receiptmt:'',
    issuebags:'',
    issueloosebags:'',
    issuemt:'',
    closingbags:'',
    closingloosebags:'',
    closingmt:'',
    savedstatus:'0'}));
}

  deletedetails(index) 
    {
      if(this.wheatstackcardreportdetails.at(index).get("savedstatus").value ==0 || this.wheatstackcardreportdetails.at(index).get("savedstatus").value =='0')
      {
        if(this.wheatstackcardreportdetails.length > 1)
        { 
          this.wheatstackcardreportdetails.removeAt(index);
        }
        else
        {
          alert("can't delete all rows");
          this.wheatstackcardreportdetails.reset();
        } 
      }
      else
      {
        alert("can't delete Saved rows");
      }
      
    }

  ngOnInit() 
  {
    this.company_name = localStorage.getItem("company_name");
    this.BuUnit = "0";
    this.godown="0";
    this.close="0";
    this.isHidden=false;
    this.status=true;
    this.wheatsave=true;

    let finyear =localStorage.getItem("financial_year");

    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getwheatstackcardlist(finyear),
      this.DropDownListService.getGodownMasterList(this.company_name)
      )
     .subscribe(([budata,wheatstacklist,godown])=>
      {
        //console.log("budata"+JSON.stringify(godown));
          this.businesslists=budata;
          this.wheatstackcardlist=wheatstacklist;
          this.godownlist=godown;
      });
  }

  
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      while (this.wheatstackcardreportdetails.length) 
      this.wheatstackcardreportdetails.removeAt(0);
      this.adddetailsreset();
      
    }
  }

  calstack(index)
  {
   
    let openingbags=this.wheatstackcardreportdetails.at(index).get("openingbags").value;
    let openingloosebags=this.wheatstackcardreportdetails.at(index).get("openingloosebags").value;
    let openingmt=this.wheatstackcardreportdetails.at(index).get("openingmt").value;
    let receiptbags=this.wheatstackcardreportdetails.at(index).get("receiptbags").value;
    let receiptloosebags=this.wheatstackcardreportdetails.at(index).get("receiptloosebags").value;
    let receiptmt=this.wheatstackcardreportdetails.at(index).get("receiptmt").value;
    let issuebags=this.wheatstackcardreportdetails.at(index).get("issuebags").value;
    let issueloosebags=this.wheatstackcardreportdetails.at(index).get("issueloosebags").value;
    let issuemt=this.wheatstackcardreportdetails.at(index).get("issuemt").value;

    let closing_totalbags=Number(openingbags)+Number(receiptbags)-Number(issuebags);
    let closing_totalloosebags=Number(openingloosebags)+Number(receiptloosebags)-Number(issueloosebags);
    let closing_totalmtbags=Number(openingmt)+Number(receiptmt)-Number(issuemt);

    this.wheatstackcardreportdetails.at(index).patchValue({closingbags:closing_totalbags.toFixed(3),closingloosebags:closing_totalloosebags.toFixed(3),closingmt:closing_totalmtbags.toFixed(3)});

  }

  send()
  {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;
      if(this.userForm.get("business_unit").value==0 || this.userForm.get("business_unit").value==null || this.userForm.get("business_unit").value=="")
      {
         alert("Please Select Business Unit Name");
         this.status=true;
      }
      else if(this.userForm.get("godowncode").value==0 || this.userForm.get("godowncode").value==null || this.userForm.get("godowncode").value=="")
      {
        alert("Please Select Godown Name");
        this.status=true;
      }
      else if(this.userForm.get("stackno").value==0 || this.userForm.get("stackno").value=="" || this.userForm.get("stackno").value==null)
      {
        alert("Please Enter Stack No.");
        this.status=true;
      }
      else if(this.userForm.get("closed").value==0 || this.userForm.get("closed").value==null || this.userForm.get("closed").value=="")
      {
        alert("Please Select Closed");
        this.status=true;
      }
      else
      {
        if(this.Id>0)
        {
          this.Service.updatewheatstackcard(this.userForm.getRawValue(), this.Id).subscribe( data => 
            {
              alert("Wheat Stack Card Report Updated successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Wheat Stack Card Report  !!! please Reload the page and try again....");
            }); 
        }
        else
        {
          this.Service.createwheatstackcard(this.userForm.getRawValue())
          .subscribe(data =>
          {
            alert("Wheat Stack Card Report Saved successfully.");
            this.userForm.reset();
            this.showList('list');
            this.ngOnInit();
            this.status=true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Wheat Stack Card Report !!! please Reload the page and try again....");
          });
        }
      }
      

  }
 
  onUpdate(id,action)
  { 
    this.isHidden=true;
      if(action == 'view')
      {
        this.wheatsave=false;
      }
      else
      {
        this.wheatsave=true;
      }
 

   
   
        forkJoin(
          this.DropDownListService.retrievewheatstackcard(id),
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          this.DropDownListService.getGodownMasterList(this.company_name)
          )
        .subscribe(([data,businessunit,godown])=>
          {
            this.businesslists=businessunit;
            this.godownlist=godown;

             this.userForm.patchValue(data);

             this.DropDownListService.retrievewheatstackcard_details(data['wheatstackid']).subscribe(details=>
              {
                let k=0;
                this.adddetailsupdate();
                while (this.wheatstackcardreportdetails.length) 
                this.wheatstackcardreportdetails.removeAt(0);
                for(let data1 of details)
                {   
                  this.adddetailsupdate();
                  this.wheatstackcardreportdetails.patchValue(details);
                  k++;
                }
                this.status = true;

              });

          });
  }
  
  onDelete(id)
  {
    if(confirm("Are you sure to delete this Wheat Stack Card Report List?"))
    { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deletewheatstackcard(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            alert("Wheat Stack Card Report Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.ngOnInit();
          });

    }
  }

  checkDate(index)
  {
    let dates=this.wheatstackcardreportdetails.at(index).get("date").value
    //console.log("chk:"+index+"//"+dates)
     let checkdate:boolean=false;
      for(let p=0;p<this.wheatstackcardreportdetails.length;p++)
      {
        if(this.wheatstackcardreportdetails.at(p).get("date").value==dates && p!=index) 
        {
          checkdate=true;
        }
      }
      if(checkdate ==true)
      {
      this.wheatstackcardreportdetails.at(index).patchValue({date:""});
      //console.log("here "+this.wheatstackcardreportdetails.at(index).get("date").value)
      alert("Same Date Can Not Be Put Here !!!!!");
      }
    }

  print(godownname,wheatstackid,stack)
  {
    
    
      
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {  };
    
    let dialogRef = this.dialog.open(WheatstackcardreportpopupComponent, {data: {alldata: godownname,wheatstackid:wheatstackid,stack:stack}, height: '80%',
    width: '80%'});
    dialogRef.afterClosed().subscribe( data => 
    {
    
    }); 

  }

}
