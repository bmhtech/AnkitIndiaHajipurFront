import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { Dailystockfinishgood } from '../../../../../Models/Report/dailystockfinishgood';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { DailystockfinishgoodpopupComponent } from '../dailystockfinishgoodpopup/dailystockfinishgoodpopup.component';

@Component({
  selector: 'app-dailystockfinishgood',
  templateUrl: './dailystockfinishgood.component.html',
  styleUrls: ['./dailystockfinishgood.component.scss']
})
export class DailystockfinishgoodComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Dailystockfinishgood = new Dailystockfinishgood();
  isHidden:any;
  dailyreportlist:any = [];
  status = false;
  businesslists:any=[];
  itemList:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  dailyfinishedgoodsave:boolean=true; 
  sl_no:number=1;
  employeelist:any=[];

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  {
    this.userForm=fb.group({
      id:[''],
      date:[''],
      dailystockid:[''],
      business_unit:[''],
      createdby:[''],
      approvedby:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],
      grandtotal:[''],

      dailystockfinishgood_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        item_code:'',
        itemname:'',
        openingstock:'0',
        production:'0',
        sale:'0',
        conversion:'0',
        closingstock:'0'
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
   get approvedby(){ return this.userForm.get("approvedby") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }
  get grandtotal(){ return this.userForm.get("grandtotal") as FormControl }
   get dailystockfinishgood_Dtls(){return this.userForm.get("dailystockfinishgood_Dtls") as FormArray};
   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

   
  ngOnInit() 
  {

   
    this.isHidden=false;
    this.status=true;
    this.sl_no=1;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
     this.dailyfinishedgoodsave=true;

   forkJoin(
    this.DropDownListService.getdailystockfinishedgoodslist(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getEmployeeNamenew(this.company_name),
    this.DropDownListService.getcheckdate(formatDate(new Date(), 'yyyy-MM-dd', 'en'),finyear)
    )
   .subscribe(([cutdata,budata,emplist,datastatus])=>
    {
     this.dailyreportlist = cutdata;
        this.businesslists=budata;
        this.employeelist=emplist;

        if(datastatus["status"] == "YES")
        {
             this.userForm.patchValue({date:''});
        }
        else
        {
          this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        }
    });

  }
  
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.dailyfinishedgoodsave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      while (this.dailystockfinishgood_Dtls.length) 
      this.dailystockfinishgood_Dtls.removeAt(0);
      this.addItems();
      this.selectedItemName=[];
    }
  }

  addItems()
  {
   this.sl_no =this.dailystockfinishgood_Dtls.length +1; 
    this.dailystockfinishgood_Dtls.push(this.fb.group({
      slno:this.sl_no,
      item_code:'',
       itemname:'',
       openingstock:'0',
       production:'0',
       sale:'0',
       conversion:'0',
       closingstock:'0'}))
    }

   onChangeBuUnit(BuUnit:string)
    {    
      if(BuUnit!="0")
       {
        this.DropDownListService.getItemThruSalesThruBU(this.userForm.get("business_unit").value,this.company_name).subscribe(data=>
          {
            this.itemList = data;
          });
        this.DropDownListService.getItemThruSalesThruBUanddDate(BuUnit,this.company_name,this.userForm.get("date").value,localStorage.getItem("financial_year")).subscribe(itemdata=>
          {
           // this.itemList = data;
           // console.log("itemdata " + JSON.stringify(itemdata))
           let k=0;
                //this.itemList = data;
                this.addItems();
                this.sl_no = 0;
                while (this.dailystockfinishgood_Dtls.length) 
                this.dailystockfinishgood_Dtls.removeAt(0);
                for(let data1 of itemdata)
                {   
                // console.log("open stock:"+data1["closingstock"])
                  this.selectedItemName[k] = data1["item_code"];
                  this.addItems();
                  this.dailystockfinishgood_Dtls.patchValue(itemdata); 
                  k++;
                }
             this.status = true;
           }); 
       } 
     }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl; 
    this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;
      if(this.userForm.get("business_unit").value =='' ||this.userForm.get("business_unit").value ==null  || this.userForm.get("business_unit").value =='0' )
      {
        alert("Please Select Bussiness Unit Name !!!!!!!");
        this.status=true;
      }
      else  if(this.userForm.get("createdby").value =='' ||this.userForm.get("createdby").value ==null  || this.userForm.get("createdby").value =='0' )
      {
        alert("Please Select Created By Name !!!!!!!");
        this.status=true;
      }
      else
      {
        if(this.Id>0)
        {

          this.Service.updatedailystockfinishedgoods(this.userForm.getRawValue(), this.Id).subscribe( data => 
            {
            
              alert("Daily Stock Finish Goods Updated successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Power Cut Report !!! please Reload the page and try again....");
            }); 


        }
        else
        {
          this.Service.createdailystockfinishedgoods(this.userForm.getRawValue())
          .subscribe(data =>
          {
            alert("Daily Stock Finish Goods Saved successfully.");
            this.userForm.reset();
            this.showList('list');
            this.ngOnInit();
            this.status=true;

          });
        }
      }
  }

  onDelete(id)
  {
    if(confirm("Are you sure to delete this Daily Stock Finish Goods  Report List?"))
    { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deletedailystockfinishedgoods(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            alert("Daily Stock Finish Goods Report Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.ngOnInit();
          });

    }
  }
  selectedItemName = [];
  onUpdate(id,action)
  {
    this.isHidden=true;
    if(action == "view")
    {
      this.dailyfinishedgoodsave=false;
    }
    if(action == "update")
    {
      this.dailyfinishedgoodsave=true;
    }

    forkJoin(
      this.DropDownListService.retrivedailystockfinishedgoods(id),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getEmployeeNamenew(this.company_name)
      ).subscribe(([dailystockList,bUnitData,emplist])=>
      {
        this.businesslists=bUnitData;
        this.userForm.patchValue(dailystockList);
        this.employeelist=emplist;

        forkJoin(
            this.DropDownListService.getItemThruSalesThruBU(dailystockList["business_unit"],this.company_name),
            this.DropDownListService.getdailystockfinishedgoodsdtlslist(dailystockList['dailystockid'])
            ).subscribe(([data,dynamicdetails])=>
              {
                let k=0;
                this.itemList = data;
                this.addItems();
                this.sl_no = 0;
                while (this.dailystockfinishgood_Dtls.length) 
                this.dailystockfinishgood_Dtls.removeAt(0);
                for(let data1 of dynamicdetails)
                {   
                  this.selectedItemName[k] = data1["item_code"];
                  this.addItems();
                  this.dailystockfinishgood_Dtls.patchValue(dynamicdetails);
                  k++;
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
    this.DropDownListService.searchdailystockfinishedgoods("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
      {
    
        this.dailyreportlist =data;
        this.status=true;

      }, (error) => {this.status=true;
        alert("Daily Stock Finish Goods Data Not Found !!!")
        this.dailyreportlist=[];
      })
  }
 
  

 delete(index) 
      {
        if(index)
        {
          this.dailystockfinishgood_Dtls.removeAt(index);
          for( let i=0;i<=this.dailystockfinishgood_Dtls.length;i++)
          {
            this.dailystockfinishgood_Dtls.at(i).patchValue({slno:i+1})
          }

        }
        else
        {
          if(this.dailystockfinishgood_Dtls.length>1)
          {
            this.dailystockfinishgood_Dtls.removeAt(index);
            for( let i=0;i<=this.dailystockfinishgood_Dtls.length;i++)
          {
            this.dailystockfinishgood_Dtls.at(i).patchValue({slno:i+1})
          }

          }
          else
          {
            alert("can't delete all rows");
          }} 
      }


      print(id,dailystockid,date)
      {
      
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {  };
        let comp=this.company_name;
        let dialogRef = this.dialog.open(DailystockfinishgoodpopupComponent, {data: {alldata: id,dailystockid:dailystockid,company_name:comp,date:date}, height: '80%',
        width: '80%'});
        dialogRef.afterClosed().subscribe( data => 
        {
        
        }); 

      }

      onchangeItemName(index, itemId)
      {
        
          if(itemId.length && itemId != "0")
          {
            
              if(this.dailystockfinishgood_Dtls.length ==1)
              {
                this.dailystockfinishgood_Dtls.at(index).patchValue({item_code:itemId});
                let finyear =localStorage.getItem("financial_year");
                this.DropDownListService.getdailystockfinishedgoodopeningstock(itemId,this.userForm.get("date").value,finyear).subscribe(data=>
                {
                  this.dailystockfinishgood_Dtls.at(index).patchValue({openingstock:data["closingstock"]});
                }); 

              }
              else
              {
                  let itemrepeatstatus=false;

                  for(let i=0;i<this.dailystockfinishgood_Dtls.length;i++)
                  {
                   // console.log(" check " + index + " // "+ i);
                            if((this.dailystockfinishgood_Dtls.at(i).get("item_code").value == itemId) && (index != i))
                            {
                              itemrepeatstatus=true;
                            }

                  }
                 // console.log(" check here " + itemrepeatstatus);
                  if(itemrepeatstatus == true)
                  {
                   // console.log(" here true ")
                    this.selectedItemName[index]="0";
                  }
                  else
                  {

                    this.dailystockfinishgood_Dtls.at(index).patchValue({item_code:itemId});
                    let finyear =localStorage.getItem("financial_year");
                    this.DropDownListService.getdailystockfinishedgoodopeningstock(itemId,this.userForm.get("date").value,finyear).subscribe(data=>
                    {
                      console.log("Chkdata::"+JSON.stringify(data))
                      this.dailystockfinishgood_Dtls.at(index).patchValue({openingstock:data["closingstock"]});
                    }); 
                  }
              }
          }
      }

    calstock(index)
    {
      let openingstock=this.dailystockfinishgood_Dtls.at(index).get("openingstock").value;
      let production=this.dailystockfinishgood_Dtls.at(index).get("production").value;
      let conversion=this.dailystockfinishgood_Dtls.at(index).get("sale").value;
      let sale=this.dailystockfinishgood_Dtls.at(index).get("conversion").value;

      let closing=Number(openingstock)+Number(production)-Number(conversion)-Number(sale);
      this.dailystockfinishgood_Dtls.at(index).patchValue({closingstock:closing});

      let totalamount=0;
      for(let i=0;i<this.dailystockfinishgood_Dtls.length;i++)
      {
        totalamount+=Number(this.dailystockfinishgood_Dtls.at(i).get("closingstock").value);
      }
      this.userForm.patchValue({grandtotal:totalamount});
    }

    onChangedate(date)
    {
      let finyear =localStorage.getItem("financial_year");
      this.DropDownListService.getcheckdate(date.target.value,finyear).subscribe(data=>
      {
        console.log("data : "+ JSON.stringify(data))
        if(data["status"] == "YES")
        {
             this.userForm.patchValue({date:''});
        }
        
      }); 
    }
      
}
