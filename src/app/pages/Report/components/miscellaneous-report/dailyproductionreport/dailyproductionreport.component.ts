import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Dailyproduction } from '../../../../../Models/Report/Dailyproduction';
import { Alert } from 'selenium-webdriver';
import { DailyproductionreportprintComponent } from '../dailyproductionreportprint/dailyproductionreportprint.component';

@Component({
  selector: 'app-dailyproductionreport',
  templateUrl: './dailyproductionreport.component.html',
  styleUrls: ['./dailyproductionreport.component.scss']
})
export class DailyproductionreportComponent implements OnInit {
 
  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Dailyproduction = new Dailyproduction();
  isHidden:any;
  dailyproductionlist:any = [];
  status = false;
  businesslists:any=[];
  itemList:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  dailyproductionsave:boolean=true;
  sl_no:number=1;
  shopfloorlist:any=[];
  six=0;
  eight=0;
  ten=0;
  twelve=0;
  forteen=0;
  sixteen=0;
  eighteen=0;
  twenty=0;
  twentytwo=0;
  zero=0;
  two=0;
  four=0;
  total=0;

  six_q:number=0;
  eight_q:number=0;
  ten_q:number=0;
  twelve_q:number=0;
  forteen_q:number=0;
  sixteen_q:number=0;
  eighteen_q:number=0;
  twenty_q:number=0;
  twentytwo_q:number=0;
  zero_q:number=0;
  two_q:number=0;
  four_q:number=0;
  total_q:number=0;
  

  sixqty=0;
  eightqty=0;
  tenqty=0;
  twelveqty=0;
  forteenqty=0;
  sixteenqty=0;
  eighteenqty=0;
  twentyqty=0;
  twentytwoqty=0;
  zeroqty=0;
  twoqty=0;
  fourqty=0;
  totalqty=0;

  sixper=0;
  eightper=0;
  tenper=0;
  twelveper=0;
  forteenper=0;
  sixteenper=0;
  eighteenper=0;
  twentyper=0;
  twentytwoper=0;
  zeroper=0;
  twoper=0;
  fourper=0;
  totalper=0;
  
  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      date:[''],
      dailyproductionid:[''],
      business_unit:[''],
      shopfloor:[''],
      remarks:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      dailyproduction_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        item_code:'',
        six_bag:'0',
        six_quantity:'0',
        six_percen:'0',
        eight_bag:'0',
        eight_quantity:'0',
        eight_percen:'0',
        ten_bag:'0',
        ten_quantity:'0',
        ten_percen:'0',
        twelve_bag:'0',
        twelve_quantity:'0',
        twelve_percen:'0',
        forteen_bag:'0',
        forteen_quantity:'0',
        forteen_percen:'0',
        sixteen_bag:'0',
        sixteen_quantity:'0',
        sixteen_percen:'0',
        eighteen_bag:'0',
        eighteen_quantity:'0',
        eighteen_percen:'0',
        twenty_bag:'0',
        twenty_quantity:'0',
        twenty_percen:'0',
        twentytwo_bag:'0',
        twentytwo_quantity:'0',
        twentytwo_percen:'0',
        zero_bag:'0',
        zero_quantity:'0',
        zero_percen:'0',
        two_bag:'0',
        two_quantity:'0',
        two_percen:'0',
        four_bag:'0',
        four_quantity:'0',
        four_percen:'0',
        total:'0',
        total_quantity:'0',
        total_percen:'0',
        capacity:'0'
      })]),
      dailyproduction_Dtls_One: this.fb.array([this.fb.group({
       
        six_bag_total:'',
        six_quantity_total:'',
        six_percen_total:'',
  
        eight_bag_total:'',
        eight_quantity_total:'',
        eight_percen_total:'',
  
        ten_bag_total:'',
        ten_quantity_total:'',
        ten_percen_total:'',
  
        twelve_bag_total:'',
        twelve_quantity_total:'',
        twelve_percen_total:'',
  
        forteen_bag_total:'',
        forteen_quantity_total:'',
        forteen_percen_total:'',
  
        sixteen_bag_total:'',
        sixteen_quantity_total:'',
        sixteen_percen_total:'',
  
        eighteen_bag_total:'',
        eighteen_quantity_total:'',
        eighteen_percen_total:'',
  
        twenty_bag_total:'',
        twenty_quantity_total:'',
        twenty_percen_total:'',
  
        twentytwo_bag_total:'',
        twentytwo_quantity_total:'',
        twentytwo_percen_total:'',
  
        zero_bag_total:'',
        zero_quantity_total:'',
        zero_percen_total:'',
  
        two_bag_total:'',
        two_quantity_total:'',
        two_percen_total:'',
  
        four_bag_total:'',
        four_quantity_total:'',
        four_percen_total:'',
  
        total_bag_total:'',
        total_quantity_total:'',
        total_percen_total:''
       
      })])
    });

    this.userForm1=fb.group(
      {
        fromdate:[''],
        todate:['']
      })
  }

  get id(){ return this.userForm.get("id") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get remarks(){ return this.userForm.get("remarks") as FormControl }
   get shopfloor(){ return this.userForm.get("shopfloor") as FormControl }
   
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }
   get dailyproduction_Dtls(){return this.userForm.get("dailyproduction_Dtls") as FormArray};
   get dailyproduction_Dtls_One(){return this.userForm.get("dailyproduction_Dtls_One") as FormArray};

   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

   selectedItemName = [];
   selectedItemName1 = [];


  ngOnInit() { 
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.sl_no=1;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
     this.dailyproductionsave=true;

     forkJoin(
      this.DropDownListService.getDailyproductionList(this.currentDate,finyear),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getItemCodeByTypeNew("FINISHED PRODUCTS")
      )
     .subscribe(([production,budata,ItemData])=>
      {
      //  console.log("bunit:"+JSON.stringify(ItemData));
          this.dailyproductionlist = production;
          this.businesslists=budata;
          this.itemList = ItemData;
          
          //this.addItems1();
         /* let k=0;
          this.sl_no = 0;
          while (this.dailyproduction_Dtls.length) 
          this.dailyproduction_Dtls.removeAt(0);
          for(let data1 of ItemData)
          {   
            this.addItems();
            this.selectedItemName[k] = data1["item_id"];
            this.dailyproduction_Dtls.at(k).patchValue({item_code: data1.item_id,six_bag:'0',six_percen:'0',eight_bag:'0',eight_percen:'0',ten_bag:'0',ten_percen:'0',
              twelve_bag:'0',twelve_percen:'0',forteen_bag:'0',forteen_percen:'0',sixteen_bag:'0',sixteen_percen:'0',eighteen_bag:'0',
              eighteen_percen:'0',twenty_bag:'0',twenty_percen:'0',twentytwo_bag:'0',twentytwo_percen:'0',twentyfour_percen:'0',
              zero_bag:'0',zero_percen:'0',two_bag:'0',two_percen:'0',four_bag:'0',four_percen:'0',total:'0'});
            k++;
          } */

      });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.dailyproductionsave=true;

    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.ResetAllValues();

      
    }
  }
  
  getShopfloorName(businessunit_id)
  {
      if(businessunit_id.length)
      {
        this.DropDownListService.getShopFloorThruBU(businessunit_id).subscribe(data=>
          {
            console.log("list:"+JSON.stringify(data));
            this.shopfloorlist=data;
          });        
      }
  }

  _six_bag:any;
  _eight_bag:any;
  _ten_bag:any;
  _twelve_bag:any;
  _forteen_bag:any;
  _sixteen_bag:any;
  _eighteen_bag:any;
  _twenty_bag:any;
  _twentytwo_bag:any;
  _zero_bag:any;
  _two_bag:any;
  _four_bag:any;

  _total_bag:any;
  _total_bag_q:number=0;

  _six_qty:any;
  _eight_qty:any;
  _ten_qty:any;
  _twelve_qty:any;
  _forteen_qty:any;
  _sixteen_qty:any;
  _eighteen_qty:any;
  _twenty_qty:any;
  _twentytwo_qty:any;
  _zero_qty:any;
  _two_qty:any;
  _four_qty:any;

  _total_qty:any;

  _six_percen:any;
  _eight_percen:any;
  _ten_percen:any;
  _twelve_percen:any;
  _forteen_percen:any;
  _sixteen_percen:any;
  _eighteen_percen:any;
  _twenty_percen:any;
  _twentytwo_percen:any;
  _zero_percen:any;
  _two_percen:any;
  _four_percen:any;
  _total_percen:any;

 


  _six_bag_total:any;
  _eight_bag_total:any;
  _ten_bag_total:any;
  _twelve_bag_total:any;
  _forteen_bag_total:any;
  _sixteen_bag_total:any;
  _eighteen_bag_total:any;
  _twenty_bag_total:any;
  _twentytwo_bag_total:any;
  _zero_bag_total:any;
  _two_bag_total:any;
  _four_bag_total:any;
  _total_bag_total:any;

  eight_quantity:any;
 

  m=0;

  getCalculation(values,index)
  {
    this._six_bag = this.dailyproduction_Dtls.at(index).get("six_bag").value as FormControl;
    this._eight_bag = this.dailyproduction_Dtls.at(index).get("eight_bag").value as FormControl;
    this._ten_bag = this.dailyproduction_Dtls.at(index).get("ten_bag").value as FormControl;
    this._twelve_bag = this.dailyproduction_Dtls.at(index).get("twelve_bag").value as FormControl;
    this._forteen_bag = this.dailyproduction_Dtls.at(index).get("forteen_bag").value as FormControl;
    this._sixteen_bag = this.dailyproduction_Dtls.at(index).get("sixteen_bag").value as FormControl;
    this._eighteen_bag = this.dailyproduction_Dtls.at(index).get("eighteen_bag").value as FormControl;
    this._twenty_bag = this.dailyproduction_Dtls.at(index).get("twenty_bag").value as FormControl;
    this._twentytwo_bag = this.dailyproduction_Dtls.at(index).get("twentytwo_bag").value as FormControl;
    this._zero_bag = this.dailyproduction_Dtls.at(index).get("zero_bag").value as FormControl;
    this._two_bag = this.dailyproduction_Dtls.at(index).get("two_bag").value as FormControl;
    this._four_bag = this.dailyproduction_Dtls.at(index).get("four_bag").value as FormControl;

    this._total_bag = this.dailyproduction_Dtls.at(index).get("total").value as FormControl;
    

    this._six_percen = this.dailyproduction_Dtls.at(index).get("six_percen").value as FormControl;
    this._eight_percen = this.dailyproduction_Dtls.at(index).get("eight_percen").value as FormControl;
    this._ten_percen = this.dailyproduction_Dtls.at(index).get("ten_percen").value as FormControl;
    this._twelve_percen = this.dailyproduction_Dtls.at(index).get("twelve_percen").value as FormControl;
    this._forteen_percen = this.dailyproduction_Dtls.at(index).get("forteen_percen").value as FormControl;
    this._sixteen_percen = this.dailyproduction_Dtls.at(index).get("sixteen_percen").value as FormControl;
    this._eighteen_percen = this.dailyproduction_Dtls.at(index).get("eighteen_percen").value as FormControl;
    this._twenty_percen = this.dailyproduction_Dtls.at(index).get("twenty_percen").value as FormControl;
    this._twentytwo_percen = this.dailyproduction_Dtls.at(index).get("twentytwo_percen").value as FormControl;
    this._zero_percen = this.dailyproduction_Dtls.at(index).get("zero_percen").value as FormControl;
    this._two_percen = this.dailyproduction_Dtls.at(index).get("two_percen").value as FormControl;
    this._four_percen = this.dailyproduction_Dtls.at(index).get("four_percen").value as FormControl;
    this._total_percen = this.dailyproduction_Dtls.at(index).get("total_percen").value as FormControl;

    let capacity =this.dailyproduction_Dtls.at(index).get("capacity").value as FormControl;

this.dailyproduction_Dtls.at(index).patchValue({six_quantity:(Number(this._six_bag)*Number(capacity)).toFixed(3),
                                              eight_quantity:(Number(this._eight_bag)*Number(capacity)).toFixed(3),
                                              ten_quantity:(Number(this._ten_bag)*Number(capacity)).toFixed(3),
                                              twelve_quantity:(Number(this._twelve_bag)*Number(capacity)).toFixed(3),
                                              forteen_quantity:(Number(this._forteen_bag)*Number(capacity)).toFixed(3),
                                              sixteen_quantity:(Number(this._sixteen_bag)*Number(capacity)).toFixed(3),
                                              eighteen_quantity:(Number(this._eighteen_bag)*Number(capacity)).toFixed(3),
                                              twenty_quantity:(Number(this._twenty_bag)*Number(capacity)).toFixed(3),
                                              twentytwo_quantity:(Number(this._twentytwo_bag)*Number(capacity)).toFixed(3),
                                              zero_quantity:(Number(this._zero_bag)*Number(capacity)).toFixed(3),
                                              two_quantity:(Number(this._two_bag)*Number(capacity)).toFixed(3),
                                              four_quantity:(Number(this._four_bag)*Number(capacity)).toFixed(3)

                                            })
    console.log("capacity"+ capacity)
    for(let i=0;i<this.dailyproduction_Dtls.length;i++)
    {
      
      
     //this._total_bag=Number(this._six_bag)+Number(this._eight_bag)+Number(this._ten_bag)+Number(this._twelve_bag)+Number(this._forteen_bag)+Number(this._sixteen_bag)+Number(this._eighteen_bag)+Number(this._eighteen_bag)+Number(this._twenty_bag)+Number(this._twentytwo_bag)+Number(this._zero_bag)+Number(this._two_bag)+Number(this._four_bag);
     this._total_bag=Number(this.dailyproduction_Dtls.at(i).get("six_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("eight_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("ten_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("twelve_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("forteen_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("sixteen_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("eighteen_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("twenty_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("twentytwo_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("zero_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("two_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("four_bag").value);


     this._total_bag_q=Number(this.dailyproduction_Dtls.at(i).get("six_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("eight_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("ten_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("twelve_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("forteen_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("sixteen_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("eighteen_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("twenty_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("twentytwo_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("zero_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("two_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("four_quantity").value);
     this.dailyproduction_Dtls.at(i).patchValue({total:this._total_bag,total_quantity:this._total_bag_q.toFixed(3)});

    }
    
    if(this.m==index)
    {
    
      this.six=0;
      this.eight=0;
      this.ten=0;
      this.twelve=0;
      this.forteen=0;
      this.sixteen=0;
      this.eighteen=0;
      this.twenty=0;
      this.twentytwo=0;
      this.zero=0;
      this.two=0;
      this.four=0;
      this.total=0;

      this.six_q=0;
      this.eight_q=0;
      this.ten_q=0;
      this.twelve_q=0;
      this.forteen_q=0;
      this.sixteen_q=0;
      this.eighteen_q=0;
      this.twenty_q=0;
      this.twentytwo_q=0;
      this.zero_q=0;
      this.two_q=0;
      this.four_q=0;
      this.total_q=0;

      this.sixper=0;
      this.eightper=0;
      this.tenper=0;
      this.twelveper=0;
      this.forteenper=0;
      this.sixteenper=0;
      this.eighteenper=0;
      this.twentyper=0;
      this.twentytwoper=0;
      this.zeroper=0;
      this.twoper=0;
      this.fourper=0;
      this.totalper=0;

      for(let j=0;j<=this.m;j++)
     {
      this.six=Number(this.six)+Number(this.dailyproduction_Dtls.at(j).get("six_bag").value as FormControl);
      this.eight=Number(this.eight)+Number(this.dailyproduction_Dtls.at(j).get("eight_bag").value as FormControl);
      this.ten=Number(this.ten)+Number(this.dailyproduction_Dtls.at(j).get("ten_bag").value as FormControl);
      this.twelve=Number(this.twelve)+Number(this.dailyproduction_Dtls.at(j).get("twelve_bag").value as FormControl);
      this.forteen=Number(this.forteen)+Number(this.dailyproduction_Dtls.at(j).get("forteen_bag").value as FormControl);
      this.sixteen=Number(this.sixteen)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_bag").value as FormControl);
      this.eighteen=Number(this.eighteen)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_bag").value as FormControl);
      this.twenty=Number(this.twenty)+Number(this.dailyproduction_Dtls.at(j).get("twenty_bag").value as FormControl);
      this.twentytwo=Number(this.twentytwo)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_bag").value as FormControl);
      this.zero=Number(this.zero)+Number(this.dailyproduction_Dtls.at(j).get("zero_bag").value as FormControl);
      this.two=Number(this.two)+Number(this.dailyproduction_Dtls.at(j).get("two_bag").value as FormControl);
      this.four=Number(this.four)+Number(this.dailyproduction_Dtls.at(j).get("four_bag").value as FormControl);
      this.total=Number(this.total)+Number(this.dailyproduction_Dtls.at(j).get("total").value as FormControl);

      //console.log("here "+this.eight_q+"//"+this.m)
     
      this.six_q=Number(this.six_q)+Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value as FormControl);
      this.eight_q=this.eight_q+Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value as FormControl);
    //  console.log("here 2"+this.eight_q+"//"+this.m)
      this.ten_q=Number(this.ten_q)+Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value as FormControl);
      this.twelve_q=Number(this.twelve_q)+Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value as FormControl);
      this.forteen_q=Number(this.forteen_q)+Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value as FormControl);
      this.sixteen_q=Number(this.sixteen_q)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value as FormControl);
      this.eighteen_q=Number(this.eighteen_q)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value as FormControl);
      this.twenty_q=Number(this.twenty_q)+Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value as FormControl);
      this.twentytwo_q=Number(this.twentytwo_q)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value as FormControl);
      this.zero_q=Number(this.zero_q)+Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value as FormControl);
      this.two_q=Number(this.two_q)+Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value as FormControl);
      this.four_q=Number(this.four_q)+Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value as FormControl);
      this.total_q=Number(this.total_q)+Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value as FormControl);






     } 

          for(let j=0;j<=this.m;j++)
          {
            if(this.six_q==0)
            this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/1;
            else
            this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/Number(this.six_q);
  
            if(this.eight_q==0)
            this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/1;
            else
            this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/this.eight_q;
          //  console.log(this._eight_percen +" // " + Number(this.eight_q) + " // " + this.dailyproduction_Dtls.at(j).get("eight_quantity").value)

            if(this.ten_q==0)
            this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/1;
            else
            this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/Number(this.ten_q);
  
            if(this.twelve_q==0)
            this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/1;
            else
            this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/Number(this.twelve_q);
  
            if(this.forteen_q==0)
            this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/1;
            else
            this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/Number(this.forteen_q);
  
            if(this.sixteen_q==0)
            this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/1;
            else
            this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/Number(this.sixteen_q);
            
            if(this.eighteen_q==0)
            this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/1;
            else
            this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/Number(this.eighteen_q);
  
            if(this.twenty_q==0)
            this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/1;
            else
            this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/Number(this.twenty_q);
            
            if(this.twentytwo_q==0)
            this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/1;
            else
            this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/Number(this.twentytwo_q);
  
            if(this.zero_q==0)
            this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/1;
            else
            this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/Number(this.zero_q);
  
            if(this.two_q==0)
            this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/1;
            else
            this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/Number(this.two_q);
  
            if(this.four_q==0)
            this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/1;
            else
            this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/Number(this.four_q);
  
            if(this.total_q==0)
            this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/1;
            else
            this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/Number(this.total_q);



            this.dailyproduction_Dtls.at(j).patchValue({six_percen:this._six_percen.toFixed(2),eight_percen:this._eight_percen.toFixed(2),ten_percen:this._ten_percen.toFixed(2),
            twelve_percen:this._twelve_percen.toFixed(2),forteen_percen:this._forteen_percen.toFixed(2),sixteen_percen:this._sixteen_percen.toFixed(2),eighteen_percen:this._eighteen_percen.toFixed(2),twenty_percen:this._twenty_percen.toFixed(2),
            twentytwo_percen:this._twentytwo_percen.toFixed(2),zero_percen:this._zero_percen.toFixed(2),two_percen:this._two_percen.toFixed(2),four_percen:this._four_percen.toFixed(2),total_percen:this._total_percen.toFixed(2)}); 
          }
      this.m++;
   }

   else
   {
    this.six=0;
    this.eight=0;
    this.ten=0;
    this.twelve=0;
    this.forteen=0;
    this.sixteen=0;
    this.eighteen=0;
    this.twenty=0;
    this.twentytwo=0;
    this.zero=0;
    this.two=0;
    this.four=0;
    this.total=0;


    this.six_q=0;
    this.eight_q=0;
    this.ten_q=0;
    this.twelve_q=0;
    this.forteen_q=0;
    this.sixteen_q=0;
    this.eighteen_q=0;
    this.twenty_q=0;
    this.twentytwo_q=0;
    this.zero_q=0;
    this.two_q=0;
    this.four_q=0;
    this.total_q=0;

    this.sixper=0;
    this.eightper=0;
    this.tenper=0;
    this.twelveper=0;
    this.forteenper=0;
    this.sixteenper=0;
    this.eighteenper=0;
    this.twentyper=0;
    this.twentytwoper=0;
    this.zeroper=0;
    this.twoper=0;
    this.fourper=0;
    this.totalper=0;

    for(let j=0;j<this.m;j++)
    {
      this.six=Number(this.six)+Number(this.dailyproduction_Dtls.at(j).get("six_bag").value as FormControl);
      this.eight=Number(this.eight)+Number(this.dailyproduction_Dtls.at(j).get("eight_bag").value as FormControl);
      this.ten=Number(this.ten)+Number(this.dailyproduction_Dtls.at(j).get("ten_bag").value as FormControl);
      this.twelve=Number(this.twelve)+Number(this.dailyproduction_Dtls.at(j).get("twelve_bag").value as FormControl);
      this.forteen=Number(this.forteen)+Number(this.dailyproduction_Dtls.at(j).get("forteen_bag").value as FormControl);
      this.sixteen=Number(this.sixteen)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_bag").value as FormControl);
      this.eighteen=Number(this.eighteen)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_bag").value as FormControl);
      this.twenty=Number(this.twenty)+Number(this.dailyproduction_Dtls.at(j).get("twenty_bag").value as FormControl);
      this.twentytwo=Number(this.twentytwo)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_bag").value as FormControl);
      this.zero=Number(this.zero)+Number(this.dailyproduction_Dtls.at(j).get("zero_bag").value as FormControl);
      this.two=Number(this.two)+Number(this.dailyproduction_Dtls.at(j).get("two_bag").value as FormControl);
      this.four=Number(this.four)+Number(this.dailyproduction_Dtls.at(j).get("four_bag").value as FormControl);
      this.total=Number(this.total)+Number(this.dailyproduction_Dtls.at(j).get("total").value as FormControl);
      
    //  console.log("here 3 "+this.eight_q+"//"+this.m)
      this.six_q=Number(this.six_q)+Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value as FormControl);
      this.eight_q=this.eight_q+Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value as FormControl);

    //  console.log("here 4 "+this.eight_q+"//"+this.m)

      this.ten_q=Number(this.ten_q)+Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value as FormControl);
      this.twelve_q=Number(this.twelve_q)+Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value as FormControl);
      this.forteen_q=Number(this.forteen_q)+Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value as FormControl);
      this.sixteen_q=Number(this.sixteen_q)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value as FormControl);
      this.eighteen_q=Number(this.eighteen_q)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value as FormControl);
      this.twenty_q=Number(this.twenty_q)+Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value as FormControl);
      this.twentytwo_q=Number(this.twentytwo_q)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value as FormControl);
      this.zero_q=Number(this.zero_q)+Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value as FormControl);
      this.two_q=Number(this.two_q)+Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value as FormControl);
      this.four_q=Number(this.four_q)+Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value as FormControl);
      this.total_q=Number(this.total_q)+Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value as FormControl);
    } 
    
        for(let j=0;j<this.m;j++)
        {
          if(this.six_q==0)
          this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/1;
          else
          this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/Number(this.six_q);

          if(this.eight_q==0)
          this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/1;
          else
          this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/this.eight_q;
         // console.log(this._eight_percen +" // " + Number(this.eight_q) + " // " + this.dailyproduction_Dtls.at(j).get("eight_quantity").value)

          if(this.ten_q==0)
          this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/1;
          else
          this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/Number(this.ten_q);

          if(this.twelve_q==0)
          this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/1;
          else
          this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/Number(this.twelve_q);

          if(this.forteen_q==0)
          this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/1;
          else
          this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/Number(this.forteen_q);

          if(this.sixteen_q==0)
          this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/1;
          else
          this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/Number(this.sixteen_q);
          
          if(this.eighteen_q==0)
          this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/1;
          else
          this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/Number(this.eighteen_q);

          if(this.twenty_q==0)
          this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/1;
          else
          this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/Number(this.twenty_q);
          
          if(this.twentytwo_q==0)
          this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/1;
          else
          this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/Number(this.twentytwo_q);

          if(this.zero_q==0)
          this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/1;
          else
          this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/Number(this.zero_q);

          if(this.two_q==0)
          this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/1;
          else
          this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/Number(this.two_q);

          if(this.four_q==0)
          this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/1;
          else
          this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/Number(this.four_q);

          if(this.total==0)
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total").value )*100)/1;
          else
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total").value )*100)/Number(this.total);
          
          if(this.total_q==0)
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/1;
          else
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/Number(this.total_q);

          this.dailyproduction_Dtls.at(j).patchValue({six_percen:this._six_percen.toFixed(2),eight_percen:this._eight_percen.toFixed(2),ten_percen:this._ten_percen.toFixed(2),
          twelve_percen:this._twelve_percen.toFixed(2),forteen_percen:this._forteen_percen.toFixed(2),sixteen_percen:this._sixteen_percen.toFixed(2),eighteen_percen:this._eighteen_percen.toFixed(2),twenty_percen:this._twenty_percen.toFixed(2),
          twentytwo_percen:this._twentytwo_percen.toFixed(2),zero_percen:this._zero_percen.toFixed(2),two_percen:this._two_percen.toFixed(2),four_percen:this._four_percen.toFixed(2),total_percen:this._total_percen.toFixed(2)});
        }
   }
   
    this.dailyproduction_Dtls_One.at(0).patchValue({six_bag_total:this.six,eight_bag_total:this.eight,ten_bag_total:this.ten,
      twelve_bag_total:this.twelve,forteen_bag_total:this.forteen,
      sixteen_bag_total:this.sixteen,eighteen_bag_total:this.eighteen,twenty_bag_total:this.twenty,twentytwo_bag_total:this.twentytwo,
      zero_bag_total:this.zero,
      two_bag_total:this.two,four_bag_total:this.four,total_bag_total:this.total,
      eight_quantity_total:this.eight_q.toFixed(3),
      ten_quantity_total:this.ten_q.toFixed(3),
      twelve_quantity_total:this.twelve_q.toFixed(3),
      forteen_quantity_total:this.forteen_q.toFixed(3),
      sixteen_quantity_total:this.sixteen_q.toFixed(3),
      eighteen_quantity_total:this.eighteen_q.toFixed(3),
      twenty_quantity_total:this.twenty_q.toFixed(3),
      twentytwo_quantity_total:this.twentytwo_q.toFixed(3),
      zero_quantity_total:this.zero_q.toFixed(3),
      two_quantity_total:this.two_q.toFixed(3),
      four_quantity_total:this.four_q.toFixed(3),
      six_quantity_total:this.six_q.toFixed(3),
      total_quantity_total:this.total_q.toFixed(3),
      
      six_percen_total:this.sixper,eight_percen_total:this.eightper,ten_percen_total:this.tenper,
      twelve_percen_total:this.twelveper,forteen_percen_total:this.forteenper,sixteen_percen_total:this.sixteenper,eighteen_percen_total:this.eighteenper,twenty_percen_total:this.twentyper,
      twentytwo_percen_total:this.twentytwoper,zero_percen_total:this.zeroper,two_percen_total:this.twoper,four_percen_total:this.fourper,total_percen_total:this.totalper});
   
  }
  
  looseCalculation(values,index)
  {
    this._six_bag = this.dailyproduction_Dtls.at(index).get("six_bag").value as FormControl;
    this._eight_bag = this.dailyproduction_Dtls.at(index).get("eight_bag").value as FormControl;
    this._ten_bag = this.dailyproduction_Dtls.at(index).get("ten_bag").value as FormControl;
    this._twelve_bag = this.dailyproduction_Dtls.at(index).get("twelve_bag").value as FormControl;
    this._forteen_bag = this.dailyproduction_Dtls.at(index).get("forteen_bag").value as FormControl;
    this._sixteen_bag = this.dailyproduction_Dtls.at(index).get("sixteen_bag").value as FormControl;
    this._eighteen_bag = this.dailyproduction_Dtls.at(index).get("eighteen_bag").value as FormControl;
    this._twenty_bag = this.dailyproduction_Dtls.at(index).get("twenty_bag").value as FormControl;
    this._twentytwo_bag = this.dailyproduction_Dtls.at(index).get("twentytwo_bag").value as FormControl;
    this._zero_bag = this.dailyproduction_Dtls.at(index).get("zero_bag").value as FormControl;
    this._two_bag = this.dailyproduction_Dtls.at(index).get("two_bag").value as FormControl;
    this._four_bag = this.dailyproduction_Dtls.at(index).get("four_bag").value as FormControl;

    this._total_bag = this.dailyproduction_Dtls.at(index).get("total").value as FormControl;
    

    this._six_percen = this.dailyproduction_Dtls.at(index).get("six_percen").value as FormControl;
    this._eight_percen = this.dailyproduction_Dtls.at(index).get("eight_percen").value as FormControl;
    this._ten_percen = this.dailyproduction_Dtls.at(index).get("ten_percen").value as FormControl;
    this._twelve_percen = this.dailyproduction_Dtls.at(index).get("twelve_percen").value as FormControl;
    this._forteen_percen = this.dailyproduction_Dtls.at(index).get("forteen_percen").value as FormControl;
    this._sixteen_percen = this.dailyproduction_Dtls.at(index).get("sixteen_percen").value as FormControl;
    this._eighteen_percen = this.dailyproduction_Dtls.at(index).get("eighteen_percen").value as FormControl;
    this._twenty_percen = this.dailyproduction_Dtls.at(index).get("twenty_percen").value as FormControl;
    this._twentytwo_percen = this.dailyproduction_Dtls.at(index).get("twentytwo_percen").value as FormControl;
    this._zero_percen = this.dailyproduction_Dtls.at(index).get("zero_percen").value as FormControl;
    this._two_percen = this.dailyproduction_Dtls.at(index).get("two_percen").value as FormControl;
    this._four_percen = this.dailyproduction_Dtls.at(index).get("four_percen").value as FormControl;
    this._total_percen = this.dailyproduction_Dtls.at(index).get("total_percen").value as FormControl;

    let capacity =this.dailyproduction_Dtls.at(index).get("capacity").value as FormControl;

/*this.dailyproduction_Dtls.at(index).patchValue({six_quantity:(Number(this._six_bag)*Number(capacity)).toFixed(3),
                                              eight_quantity:(Number(this._eight_bag)*Number(capacity)).toFixed(3),
                                              ten_quantity:(Number(this._ten_bag)*Number(capacity)).toFixed(3),
                                              twelve_quantity:(Number(this._twelve_bag)*Number(capacity)).toFixed(3),
                                              forteen_quantity:(Number(this._forteen_bag)*Number(capacity)).toFixed(3),
                                              sixteen_quantity:(Number(this._sixteen_bag)*Number(capacity)).toFixed(3),
                                              eighteen_quantity:(Number(this._eighteen_bag)*Number(capacity)).toFixed(3),
                                              twenty_quantity:(Number(this._twenty_bag)*Number(capacity)).toFixed(3),
                                              twentytwo_quantity:(Number(this._twentytwo_bag)*Number(capacity)).toFixed(3),
                                              zero_quantity:(Number(this._zero_bag)*Number(capacity)).toFixed(3),
                                              two_quantity:(Number(this._two_bag)*Number(capacity)).toFixed(3),
                                              four_quantity:(Number(this._four_bag)*Number(capacity)).toFixed(3)

                                            })*/
    this.dailyproduction_Dtls.at(index).patchValue({six_bag:'0',
      eight_bag:'0',ten_bag:'0',twelve_bag:'0',forteen_bag:'0',sixteen_bag:'0',eighteen_bag:'0',
      twenty_bag:'0',twentytwo_bag:'0',zero_bag:'0',two_bag:'0',four_bag:'0'})
                                            
   // console.log("capacity"+ capacity)
    for(let i=0;i<this.dailyproduction_Dtls.length;i++)
    {
      
      
     //this._total_bag=Number(this._six_bag)+Number(this._eight_bag)+Number(this._ten_bag)+Number(this._twelve_bag)+Number(this._forteen_bag)+Number(this._sixteen_bag)+Number(this._eighteen_bag)+Number(this._eighteen_bag)+Number(this._twenty_bag)+Number(this._twentytwo_bag)+Number(this._zero_bag)+Number(this._two_bag)+Number(this._four_bag);
     this._total_bag=Number(this.dailyproduction_Dtls.at(i).get("six_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("eight_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("ten_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("twelve_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("forteen_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("sixteen_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("eighteen_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("twenty_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("twentytwo_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("zero_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("two_bag").value)+
                      Number(this.dailyproduction_Dtls.at(i).get("four_bag").value);


     this._total_bag_q=Number(this.dailyproduction_Dtls.at(i).get("six_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("eight_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("ten_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("twelve_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("forteen_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("sixteen_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("eighteen_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("twenty_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("twentytwo_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("zero_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("two_quantity").value)+
                             Number(this.dailyproduction_Dtls.at(i).get("four_quantity").value);
     this.dailyproduction_Dtls.at(i).patchValue({total:this._total_bag,total_quantity:this._total_bag_q.toFixed(3)});

    }
    
    if(this.m==index)
    {
    
      this.six=0;
      this.eight=0;
      this.ten=0;
      this.twelve=0;
      this.forteen=0;
      this.sixteen=0;
      this.eighteen=0;
      this.twenty=0;
      this.twentytwo=0;
      this.zero=0;
      this.two=0;
      this.four=0;
      this.total=0;

      this.six_q=0;
      this.eight_q=0;
      this.ten_q=0;
      this.twelve_q=0;
      this.forteen_q=0;
      this.sixteen_q=0;
      this.eighteen_q=0;
      this.twenty_q=0;
      this.twentytwo_q=0;
      this.zero_q=0;
      this.two_q=0;
      this.four_q=0;
      this.total_q=0;

      this.sixper=0;
      this.eightper=0;
      this.tenper=0;
      this.twelveper=0;
      this.forteenper=0;
      this.sixteenper=0;
      this.eighteenper=0;
      this.twentyper=0;
      this.twentytwoper=0;
      this.zeroper=0;
      this.twoper=0;
      this.fourper=0;
      this.totalper=0;

      for(let j=0;j<=this.m;j++)
     {
      this.six=Number(this.six)+Number(this.dailyproduction_Dtls.at(j).get("six_bag").value as FormControl);
      this.eight=Number(this.eight)+Number(this.dailyproduction_Dtls.at(j).get("eight_bag").value as FormControl);
      this.ten=Number(this.ten)+Number(this.dailyproduction_Dtls.at(j).get("ten_bag").value as FormControl);
      this.twelve=Number(this.twelve)+Number(this.dailyproduction_Dtls.at(j).get("twelve_bag").value as FormControl);
      this.forteen=Number(this.forteen)+Number(this.dailyproduction_Dtls.at(j).get("forteen_bag").value as FormControl);
      this.sixteen=Number(this.sixteen)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_bag").value as FormControl);
      this.eighteen=Number(this.eighteen)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_bag").value as FormControl);
      this.twenty=Number(this.twenty)+Number(this.dailyproduction_Dtls.at(j).get("twenty_bag").value as FormControl);
      this.twentytwo=Number(this.twentytwo)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_bag").value as FormControl);
      this.zero=Number(this.zero)+Number(this.dailyproduction_Dtls.at(j).get("zero_bag").value as FormControl);
      this.two=Number(this.two)+Number(this.dailyproduction_Dtls.at(j).get("two_bag").value as FormControl);
      this.four=Number(this.four)+Number(this.dailyproduction_Dtls.at(j).get("four_bag").value as FormControl);
      this.total=Number(this.total)+Number(this.dailyproduction_Dtls.at(j).get("total").value as FormControl);

      //console.log("here "+this.eight_q+"//"+this.m)
     
      this.six_q=Number(this.six_q)+Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value as FormControl);
      this.eight_q=this.eight_q+Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value as FormControl);
    //  console.log("here 2"+this.eight_q+"//"+this.m)
      this.ten_q=Number(this.ten_q)+Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value as FormControl);
      this.twelve_q=Number(this.twelve_q)+Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value as FormControl);
      this.forteen_q=Number(this.forteen_q)+Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value as FormControl);
      this.sixteen_q=Number(this.sixteen_q)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value as FormControl);
      this.eighteen_q=Number(this.eighteen_q)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value as FormControl);
      this.twenty_q=Number(this.twenty_q)+Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value as FormControl);
      this.twentytwo_q=Number(this.twentytwo_q)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value as FormControl);
      this.zero_q=Number(this.zero_q)+Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value as FormControl);
      this.two_q=Number(this.two_q)+Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value as FormControl);
      this.four_q=Number(this.four_q)+Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value as FormControl);
      this.total_q=Number(this.total_q)+Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value as FormControl);






     } 

          for(let j=0;j<=this.m;j++)
          {
            if(this.six_q==0)
            this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/1;
            else
            this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/Number(this.six_q);
  
            if(this.eight_q==0)
            this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/1;
            else
            this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/this.eight_q;
          //  console.log(this._eight_percen +" // " + Number(this.eight_q) + " // " + this.dailyproduction_Dtls.at(j).get("eight_quantity").value)

            if(this.ten_q==0)
            this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/1;
            else
            this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/Number(this.ten_q);
  
            if(this.twelve_q==0)
            this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/1;
            else
            this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/Number(this.twelve_q);
  
            if(this.forteen_q==0)
            this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/1;
            else
            this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/Number(this.forteen_q);
  
            if(this.sixteen_q==0)
            this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/1;
            else
            this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/Number(this.sixteen_q);
            
            if(this.eighteen_q==0)
            this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/1;
            else
            this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/Number(this.eighteen_q);
  
            if(this.twenty_q==0)
            this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/1;
            else
            this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/Number(this.twenty_q);
            
            if(this.twentytwo_q==0)
            this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/1;
            else
            this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/Number(this.twentytwo_q);
  
            if(this.zero_q==0)
            this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/1;
            else
            this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/Number(this.zero_q);
  
            if(this.two_q==0)
            this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/1;
            else
            this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/Number(this.two_q);
  
            if(this.four_q==0)
            this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/1;
            else
            this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/Number(this.four_q);
  
            if(this.total_q==0)
            this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/1;
            else
            this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/Number(this.total_q);



            this.dailyproduction_Dtls.at(j).patchValue({six_percen:this._six_percen.toFixed(2),eight_percen:this._eight_percen.toFixed(2),ten_percen:this._ten_percen.toFixed(2),
            twelve_percen:this._twelve_percen.toFixed(2),forteen_percen:this._forteen_percen.toFixed(2),sixteen_percen:this._sixteen_percen.toFixed(2),eighteen_percen:this._eighteen_percen.toFixed(2),twenty_percen:this._twenty_percen.toFixed(2),
            twentytwo_percen:this._twentytwo_percen.toFixed(2),zero_percen:this._zero_percen.toFixed(2),two_percen:this._two_percen.toFixed(2),four_percen:this._four_percen.toFixed(2),total_percen:this._total_percen.toFixed(2)}); 
          }
      this.m++;
   }

   else
   {
    this.six=0;
    this.eight=0;
    this.ten=0;
    this.twelve=0;
    this.forteen=0;
    this.sixteen=0;
    this.eighteen=0;
    this.twenty=0;
    this.twentytwo=0;
    this.zero=0;
    this.two=0;
    this.four=0;
    this.total=0;


    this.six_q=0;
    this.eight_q=0;
    this.ten_q=0;
    this.twelve_q=0;
    this.forteen_q=0;
    this.sixteen_q=0;
    this.eighteen_q=0;
    this.twenty_q=0;
    this.twentytwo_q=0;
    this.zero_q=0;
    this.two_q=0;
    this.four_q=0;
    this.total_q=0;

    this.sixper=0;
    this.eightper=0;
    this.tenper=0;
    this.twelveper=0;
    this.forteenper=0;
    this.sixteenper=0;
    this.eighteenper=0;
    this.twentyper=0;
    this.twentytwoper=0;
    this.zeroper=0;
    this.twoper=0;
    this.fourper=0;
    this.totalper=0;

    for(let j=0;j<this.m;j++)
    {
      this.six=Number(this.six)+Number(this.dailyproduction_Dtls.at(j).get("six_bag").value as FormControl);
      this.eight=Number(this.eight)+Number(this.dailyproduction_Dtls.at(j).get("eight_bag").value as FormControl);
      this.ten=Number(this.ten)+Number(this.dailyproduction_Dtls.at(j).get("ten_bag").value as FormControl);
      this.twelve=Number(this.twelve)+Number(this.dailyproduction_Dtls.at(j).get("twelve_bag").value as FormControl);
      this.forteen=Number(this.forteen)+Number(this.dailyproduction_Dtls.at(j).get("forteen_bag").value as FormControl);
      this.sixteen=Number(this.sixteen)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_bag").value as FormControl);
      this.eighteen=Number(this.eighteen)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_bag").value as FormControl);
      this.twenty=Number(this.twenty)+Number(this.dailyproduction_Dtls.at(j).get("twenty_bag").value as FormControl);
      this.twentytwo=Number(this.twentytwo)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_bag").value as FormControl);
      this.zero=Number(this.zero)+Number(this.dailyproduction_Dtls.at(j).get("zero_bag").value as FormControl);
      this.two=Number(this.two)+Number(this.dailyproduction_Dtls.at(j).get("two_bag").value as FormControl);
      this.four=Number(this.four)+Number(this.dailyproduction_Dtls.at(j).get("four_bag").value as FormControl);
      this.total=Number(this.total)+Number(this.dailyproduction_Dtls.at(j).get("total").value as FormControl);
      
    //  console.log("here 3 "+this.eight_q+"//"+this.m)
      this.six_q=Number(this.six_q)+Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value as FormControl);
      this.eight_q=this.eight_q+Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value as FormControl);

    //  console.log("here 4 "+this.eight_q+"//"+this.m)

      this.ten_q=Number(this.ten_q)+Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value as FormControl);
      this.twelve_q=Number(this.twelve_q)+Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value as FormControl);
      this.forteen_q=Number(this.forteen_q)+Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value as FormControl);
      this.sixteen_q=Number(this.sixteen_q)+Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value as FormControl);
      this.eighteen_q=Number(this.eighteen_q)+Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value as FormControl);
      this.twenty_q=Number(this.twenty_q)+Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value as FormControl);
      this.twentytwo_q=Number(this.twentytwo_q)+Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value as FormControl);
      this.zero_q=Number(this.zero_q)+Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value as FormControl);
      this.two_q=Number(this.two_q)+Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value as FormControl);
      this.four_q=Number(this.four_q)+Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value as FormControl);
      this.total_q=Number(this.total_q)+Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value as FormControl);
    } 
    
        for(let j=0;j<this.m;j++)
        {
          if(this.six_q==0)
          this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/1;
          else
          this._six_percen = (Number(this.dailyproduction_Dtls.at(j).get("six_quantity").value )*100)/Number(this.six_q);

          if(this.eight_q==0)
          this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/1;
          else
          this._eight_percen = (Number(this.dailyproduction_Dtls.at(j).get("eight_quantity").value )*100)/this.eight_q;
         // console.log(this._eight_percen +" // " + Number(this.eight_q) + " // " + this.dailyproduction_Dtls.at(j).get("eight_quantity").value)

          if(this.ten_q==0)
          this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/1;
          else
          this._ten_percen = (Number(this.dailyproduction_Dtls.at(j).get("ten_quantity").value )*100)/Number(this.ten_q);

          if(this.twelve_q==0)
          this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/1;
          else
          this._twelve_percen = (Number(this.dailyproduction_Dtls.at(j).get("twelve_quantity").value )*100)/Number(this.twelve_q);

          if(this.forteen_q==0)
          this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/1;
          else
          this._forteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("forteen_quantity").value )*100)/Number(this.forteen_q);

          if(this.sixteen_q==0)
          this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/1;
          else
          this._sixteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("sixteen_quantity").value )*100)/Number(this.sixteen_q);
          
          if(this.eighteen_q==0)
          this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/1;
          else
          this._eighteen_percen = (Number(this.dailyproduction_Dtls.at(j).get("eighteen_quantity").value )*100)/Number(this.eighteen_q);

          if(this.twenty_q==0)
          this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/1;
          else
          this._twenty_percen = (Number(this.dailyproduction_Dtls.at(j).get("twenty_quantity").value )*100)/Number(this.twenty_q);
          
          if(this.twentytwo_q==0)
          this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/1;
          else
          this._twentytwo_percen = (Number(this.dailyproduction_Dtls.at(j).get("twentytwo_quantity").value )*100)/Number(this.twentytwo_q);

          if(this.zero_q==0)
          this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/1;
          else
          this._zero_percen = (Number(this.dailyproduction_Dtls.at(j).get("zero_quantity").value )*100)/Number(this.zero_q);

          if(this.two_q==0)
          this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/1;
          else
          this._two_percen = (Number(this.dailyproduction_Dtls.at(j).get("two_quantity").value )*100)/Number(this.two_q);

          if(this.four_q==0)
          this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/1;
          else
          this._four_percen = (Number(this.dailyproduction_Dtls.at(j).get("four_quantity").value )*100)/Number(this.four_q);

          if(this.total==0)
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total").value )*100)/1;
          else
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total").value )*100)/Number(this.total);
          
          if(this.total_q==0)
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/1;
          else
          this._total_percen = (Number(this.dailyproduction_Dtls.at(j).get("total_quantity").value )*100)/Number(this.total_q);

          this.dailyproduction_Dtls.at(j).patchValue({six_percen:this._six_percen.toFixed(2),eight_percen:this._eight_percen.toFixed(2),ten_percen:this._ten_percen.toFixed(2),
          twelve_percen:this._twelve_percen.toFixed(2),forteen_percen:this._forteen_percen.toFixed(2),sixteen_percen:this._sixteen_percen.toFixed(2),eighteen_percen:this._eighteen_percen.toFixed(2),twenty_percen:this._twenty_percen.toFixed(2),
          twentytwo_percen:this._twentytwo_percen.toFixed(2),zero_percen:this._zero_percen.toFixed(2),two_percen:this._two_percen.toFixed(2),four_percen:this._four_percen.toFixed(2),total_percen:this._total_percen.toFixed(2)});
        }
   }
   
    this.dailyproduction_Dtls_One.at(0).patchValue({six_bag_total:this.six,eight_bag_total:this.eight,ten_bag_total:this.ten,
      twelve_bag_total:this.twelve,forteen_bag_total:this.forteen,
      sixteen_bag_total:this.sixteen,eighteen_bag_total:this.eighteen,twenty_bag_total:this.twenty,twentytwo_bag_total:this.twentytwo,
      zero_bag_total:this.zero,
      two_bag_total:this.two,four_bag_total:this.four,total_bag_total:this.total,
      eight_quantity_total:this.eight_q.toFixed(3),
      ten_quantity_total:this.ten_q.toFixed(3),
      twelve_quantity_total:this.twelve_q.toFixed(3),
      forteen_quantity_total:this.forteen_q.toFixed(3),
      sixteen_quantity_total:this.sixteen_q.toFixed(3),
      eighteen_quantity_total:this.eighteen_q.toFixed(3),
      twenty_quantity_total:this.twenty_q.toFixed(3),
      twentytwo_quantity_total:this.twentytwo_q.toFixed(3),
      zero_quantity_total:this.zero_q.toFixed(3),
      two_quantity_total:this.two_q.toFixed(3),
      four_quantity_total:this.four_q.toFixed(3),
      six_quantity_total:this.six_q.toFixed(3),
      total_quantity_total:this.total_q.toFixed(3),
      
      six_percen_total:this.sixper,eight_percen_total:this.eightper,ten_percen_total:this.tenper,
      twelve_percen_total:this.twelveper,forteen_percen_total:this.forteenper,sixteen_percen_total:this.sixteenper,eighteen_percen_total:this.eighteenper,twenty_percen_total:this.twentyper,
      twentytwo_percen_total:this.twentytwoper,zero_percen_total:this.zeroper,two_percen_total:this.twoper,four_percen_total:this.fourper,total_percen_total:this.totalper});
   
  }

  ResetAllValues()
  {
  return this.userForm=this.fb.group({
  id:[''],
  date:[''],
  shopfloor:[''],
  remarks:[''],
  dailyproductionid:[''],
  business_unit:[''],
  company_id:[''],
  fin_year:[''],
  username:[''],

  dailyproduction_Dtls: this.fb.array([this.fb.group({
    slno:this.sl_no,
    item_code:'',
    six_bag:'0',
    six_quantity:'0',
    six_percen:'0',
    eight_bag:'0',
    eight_quantity:'0',
    eight_percen:'0',
    ten_bag:'0',
    ten_quantity:'0',
    ten_percen:'0',
    twelve_bag:'0',
    twelve_quantity:'0',
    twelve_percen:'0',
    forteen_bag:'0',
    forteen_quantity:'0',
    forteen_percen:'0',
    sixteen_bag:'0',
    sixteen_quantity:'0',
    sixteen_percen:'0',
    eighteen_bag:'0',
    eighteen_quantity:'0',
    eighteen_percen:'0',
    twenty_bag:'0',
    twenty_quantity:'0',
    twenty_percen:'0',
    twentytwo_bag:'0',
    twentytwo_quantity:'0',
    twentytwo_percen:'0',
    zero_bag:'0',
    zero_quantity:'0',
    zero_percen:'0',
    two_bag:'0',
    two_quantity:'0',
    two_percen:'0',
    four_bag:'0',
    four_quantity:'0',
    four_percen:'0',
    total:'0',
    total_quantity:'0',
    total_percen:'0',
    capacity:'0'
  })]),
  dailyproduction_Dtls_One: this.fb.array([this.fb.group({
   
    six_bag_total:'',
    six_quantity_total:'',
    six_percen_total:'',

    eight_bag_total:'',
    eight_quantity_total:'',
    eight_percen_total:'',

    ten_bag_total:'',
    ten_quantity_total:'',
    ten_percen_total:'',

    twelve_bag_total:'',
    twelve_quantity_total:'',
    twelve_percen_total:'',

    forteen_bag_total:'',
    forteen_quantity_total:'',
    forteen_percen_total:'',

    sixteen_bag_total:'',
    sixteen_quantity_total:'',
    sixteen_percen_total:'',

    eighteen_bag_total:'',
    eighteen_quantity_total:'',
    eighteen_percen_total:'',

    twenty_bag_total:'',
    twenty_quantity_total:'',
    twenty_percen_total:'',

    twentytwo_bag_total:'',
    twentytwo_quantity_total:'',
    twentytwo_percen_total:'',

    zero_bag_total:'',
    zero_quantity_total:'',
    zero_percen_total:'',

    two_bag_total:'',
    two_quantity_total:'',
    two_percen_total:'',

    four_bag_total:'',
    four_quantity_total:'',
    four_percen_total:'',

    total_bag_total:'',
    total_quantity_total:'',
    total_percen_total:''
  })])

});
}
  addItems()
  {
   this.sl_no =this.dailyproduction_Dtls.length +1; 
    this.dailyproduction_Dtls.push(this.fb.group({
        slno:this.sl_no,
        item_code:'',
        six_bag:'0',
        six_quantity:'0',
        six_percen:'0',
        eight_bag:'0',
        eight_quantity:'0',
        eight_percen:'0',
        ten_bag:'0',
        ten_quantity:'0',
        ten_percen:'0',
        twelve_bag:'0',
        twelve_quantity:'0',
        twelve_percen:'0',
        forteen_bag:'0',
        forteen_quantity:'0',
        forteen_percen:'0',
        sixteen_bag:'0',
        sixteen_quantity:'0',
        sixteen_percen:'0',
        eighteen_bag:'0',
        eighteen_quantity:'0',
        eighteen_percen:'0',
        twenty_bag:'0',
        twenty_quantity:'0',
        twenty_percen:'0',
        twentytwo_bag:'0',
        twentytwo_quantity:'0',
        twentytwo_percen:'0',
        zero_bag:'0',
        zero_quantity:'0',
        zero_percen:'0',
        two_bag:'0',
        two_quantity:'0',
        two_percen:'0',
        four_bag:'0',
        four_quantity:'0',
        four_percen:'0',
        total:'0',
        total_quantity:'0',
        total_percen:'0',
        capacity:'0'}))
    }

    addItems1()
    {
     this.sl_no =this.dailyproduction_Dtls_One.length +1; 
      this.dailyproduction_Dtls_One.push(this.fb.group({
          
        six_bag_total:'',
        six_quantity_total:'',
        six_percen_total:'',

        eight_bag_total:'',
        eight_quantity_total:'',
        eight_percen_total:'',

        ten_bag_total:'',
        ten_quantity_total:'',
        ten_percen_total:'',

        twelve_bag_total:'',
        twelve_quantity_total:'',
        twelve_percen_total:'',

        forteen_bag_total:'',
        forteen_quantity_total:'',
        forteen_percen_total:'',

        sixteen_bag_total:'',
        sixteen_quantity_total:'',
        sixteen_percen_total:'',

        eighteen_bag_total:'',
        eighteen_quantity_total:'',
        eighteen_percen_total:'',

        twenty_bag_total:'',
        twenty_quantity_total:'',
        twenty_percen_total:'',

        twentytwo_bag_total:'',
        twentytwo_quantity_total:'',
        twentytwo_percen_total:'',

        zero_bag_total:'',
        zero_quantity_total:'',
        zero_percen_total:'',

        two_bag_total:'',
        two_quantity_total:'',
        two_percen_total:'',

        four_bag_total:'',
        four_quantity_total:'',
        four_percen_total:'',

        total_bag_total:'',
        total_quantity_total:'',
        total_percen_total:''}))
      }
  

    delete(index) 
    {
      if(index)
      {
        this.dailyproduction_Dtls.removeAt(index);
        for( let i=0;i<=this.dailyproduction_Dtls.length;i++)
        {
          this.dailyproduction_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.dailyproduction_Dtls.length>1)
        {
          this.dailyproduction_Dtls.removeAt(index);
          for( let i=0;i<=this.dailyproduction_Dtls.length;i++)
        {
          this.dailyproduction_Dtls.at(i).patchValue({slno:i+1})
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
          alert("Please Select Bussiness Unit Name!")
          this.status=true;
        }
        else if(this.userForm.get("shopfloor").value == '' || this.userForm.get("shopfloor").value == 0 || this.userForm.get("shopfloor").value == null)
        {
          alert("Please Select Shop Floor Name!")
          this.status=true;
        }
        else
        {
            if(this.Id>0)
            {
              this.Service.updatedailyProduction(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Daily Production Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is Occured Daily Production Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createdailyProduction(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Daily Production Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is Occured Daily Production Report !!! please Reload the page and try again....");
              });
            }
          }
        }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Daily Production Report List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteDailyProduction(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Daily Production Report Deleted successfully.");
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
            this.dailyproductionsave=false;
          }
          if(action == "update")
          {
            this.dailyproductionsave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveDailyProduction(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
           
            ).subscribe(([productList,bUnitData])=>
            {
              
              this.businesslists=bUnitData;
              this.getShopfloorName(productList["business_unit"])
              this.userForm.patchValue(productList);
              

              forkJoin(
                  this.DropDownListService.retriveProductionDetails(productList['dailyproductionid']),
                  this.DropDownListService.getItemCodeByTypeNew("FINISHED PRODUCTS"),
                  this.DropDownListService.retriveProductionDetails1(productList['dailyproductionid']),
                 
                  ).subscribe(([dynamicdetails,ItemData,dynamicdetails1])=>  
                    {
                     // console.log("dynamicdetailsq:"+JSON.stringify(dynamicdetails))
                      this.selectedItemName = [];
                      this.selectedItemName1 = [];

                      this.itemList = ItemData;
                   
                      let k=0;
                      this.sl_no = 0;
                      while (this.dailyproduction_Dtls.length) 
                      this.dailyproduction_Dtls.removeAt(0);
                      for(let data1 of dynamicdetails)
                      {  
                        this.addItems();
                       // console.log("data1:::::"+data1["item_code"]) 
                       
                        
                        this.selectedItemName[k] = data1["item_code"];
                       
                        this.dailyproduction_Dtls.patchValue(dynamicdetails);
                      
                        k++;
                      }

                      for(let i=0;i<this.dailyproduction_Dtls.length;i++)
                      {
                        this.DropDownListService.getItemCapacity(this.dailyproduction_Dtls.at(i).get("item_code").value,localStorage.getItem("financial_year")).subscribe(itemcapacity=> 
                          {
                            console.log("dynamicdetails:"+JSON.stringify(itemcapacity))
                            console.log("itemcapacity:::::"+itemcapacity["capacity"]);
                            
                           this.dailyproduction_Dtls.at(i).patchValue({capacity:itemcapacity["capacity"]});
                          }); 
                      }
                      let f=0;
                      
                      while (this.dailyproduction_Dtls_One.length) 
                      this.dailyproduction_Dtls_One.removeAt(0);
                      for(let data1 of dynamicdetails1)
                      {   
                        
                        this.addItems1();
                        this.dailyproduction_Dtls_One.patchValue(dynamicdetails1);
                        k++;
                      }

                     

                      this.status = true;
                    });
                    this.userForm.patchValue({remarks:productList['remarks']});

                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is Occured  in Daily Production,please try again....");
             this.ngOnInit()
            
            });

             
        }
      
        search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searchDailyProduction("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.dailyproductionlist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Daily Production Report Data Not Found !!!")
              this.dailyproductionlist=[];
            })
        }

        print(productionid,date,bunit,remarks,shopfloor)
        {
          
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {  };
          
          let dialogRef = this.dialog.open(DailyproductionreportprintComponent, {data: {date: date,bunit:bunit,remarks:remarks,productionid:productionid,shopfloor:shopfloor}, height: '80%',
          width: '80%'});
          dialogRef.afterClosed().subscribe( data => 
          {
          
          }); 
      
        }

        onchangeItemName(index, itemId)
        {
          
          if(itemId.length && itemId != "0")
          {
            let checkitemalreadyexist:boolean=false;
           for(let p=0;p<this.dailyproduction_Dtls.length;p++)
           {
           
              
              if(this.dailyproduction_Dtls.at(p).get("item_code").value==itemId && p!=index) 
              {
                checkitemalreadyexist=true;
               
              }
             
           }
           if(checkitemalreadyexist ==true)
           {
            this.dailyproduction_Dtls.at(index).patchValue({item_code:"0"});
            //console.log("here "+this.dailyproduction_Dtls.at(index).get("item_code").value)
            this.selectedItemName[index]="0";
            alert("Item Name already exist !!!!!");
           }
           else
           {
            this.dailyproduction_Dtls.at(index).patchValue({item_code:itemId});
            forkJoin(
              this.DropDownListService.productionreportitembydata(itemId,this.userForm.get("date").value),
              this.DropDownListService.getItemCapacity(this.dailyproduction_Dtls.at(index).get("item_code").value,localStorage.getItem("financial_year"))
              ).subscribe(([data,itemcapacity])=>
               {
               this.dailyproduction_Dtls.at(index).patchValue({eight_bag:0,eight_percen:0,ten_bag:0,ten_percen:0,twelve_bag:0,twelve_percen:0,forteen_bag:0,
                forteen_percen:0,sixteen_bag:0,sixteen_percen:0,eighteen_bag:0,eighteen_percen:0,twenty_bag:0,twenty_percen:0,twentytwo_bag:0,twentytwo_percen:0,
                zero_bag:0,zero_percen:0,two_bag:0,two_percen:0,four_bag:0,four_percen:0,
                six_bag:0,six_percen:0,capacity:itemcapacity["capacity"]});
                this.getCalculation(itemId,index);
               });
           }
         // this.dailyproduction_Dtls.at(index).patchValue({item_code:itemId})
   
            
          }
        }

}
