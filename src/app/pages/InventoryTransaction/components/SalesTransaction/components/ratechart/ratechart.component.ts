import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Ratechart } from '../../../../../../../../src/app/Models/SalesTransaction/rate-chart';
import { DropdownServiceService } from '../../../../../../../../src/app/service/dropdown-service.service';
import { Master } from '../../../../../../../../src/app/service/master.service';
import * as moment from 'moment';
import { ExcelService } from '../../../../../../service/excel.service';

@Component({
  selector: 'app-ratechart',
  templateUrl: './ratechart.component.html',
  styleUrls: ['./ratechart.component.scss']
})
export class RatechartComponent implements OnInit 
{
  public userForm:FormGroup;
  model: Ratechart = new Ratechart();
  isHidden=false;
  status=false;
  company_name:any;
  finYear:any;
  Id:any;
  seq_no:any;
  rate_sl_no = 1;
  item_codes:any=[];
  packingItem:any=[];
  packingUom:any=[];
  bussiness_unit_list:any=[];
  listrate:any = [];
  currentDate:any;
  BUnit = "0";
  validcurrentDate:any;
  ratechartsave:boolean = true;
  ratechartadd:boolean = true;
  ratechartexcel:boolean = false;
  ratechartprint:boolean = false;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService, private excelService:ExcelService) 
  { 
    this.userForm=fb.group({
      id:[''],
      rate_code:[''],
      b_unit:[''],
      date:[''],
      valid_date:[''],

      company_id:[''],
      fin_year:[''],
      username:[''],

      item_rate_dtls: this.fb.array([this.fb.group({
        sl_no:this.rate_sl_no,
        item_code:'',
        packing:'',
        item_uom:'',
        packing_uom:'',
        price_based_on:'',
        qty:'',
        qty_uom:'',
        rate:'',
        tolerance:'5',
        sales_status:''
      })])
    });
  }

        get id(){ return this.userForm.get("id") as FormControl}
        get rate_code(){ return this.userForm.get("rate_code") as FormControl }
        get b_unit(){ return this.userForm.get("b_unit") as FormControl}
        get date(){ return this.userForm.get("date") as FormControl}
        get valid_date(){ return this.userForm.get("valid_date") as FormControl}
        
        get company_id(){ return this.userForm.get("company_id") as FormControl}
        get fin_year(){ return this.userForm.get("fin_year") as FormControl}
        get username(){ return this.userForm.get("username") as FormControl}

        get item_rate_dtls(){return this.userForm.get('item_rate_dtls') as FormArray}

  ngOnInit() 
  {
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.company_name = localStorage.getItem("company_name");
    this.finYear = localStorage.getItem("financial_year");
    this.rate_sl_no = 1;
    this.BUnit = "0";
    this.isHidden=false;
    this.status=true;

    forkJoin(
      this.DropDownListService.getRSequenceId(this.finYear),
      this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
      this.DropDownListService.RateChartList(),
      )
     .subscribe(([slno,budata,rate])=>
      {
        console.log(JSON.stringify(rate));
          this.seq_no=slno.sequenceid;
          this.bussiness_unit_list=budata;
          this.listrate=rate;
      });
     
      this.item_codes=[];

      while (this.item_rate_dtls.length) 
      this.item_rate_dtls.removeAt(0);
      this.add();
  }

  showList(s:string)
  {
    if(s=="add")
    {
       this.isHidden=true;
       this.rate_sl_no=0;
       while(this.item_rate_dtls.length)
       this.item_rate_dtls.removeAt(0);
       this.add(); 
       this.selectedItemName=[];
       this.selectedPackingItem=[];
       this.userForm.reset(this.ResetAllValues().value);
       this.item_rate_dtls.at(0).patchValue({sln_no:this.rate_sl_no})
    }
    if(s=="list")
    { 
       this.isHidden=false;
       this.rate_sl_no=0;
       while(this.item_rate_dtls.length)
       
       this.item_rate_dtls.removeAt(0);
       this.add(); 
       this.userForm.reset(this.ResetAllValues().value);
       this.item_rate_dtls.at(0).patchValue({sln_no:this.rate_sl_no})
       this.DropDownListService.getRSequenceId(localStorage.getItem("financial_year")).subscribe(slno=>
        {
          this.seq_no = slno.sequenceid;
        })
       //this.ratechartsave=false;
       //this.ratechartadd=false;
    }  
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id:[''],
      rate_code:[''],
      b_unit:[''],
      date:[''],
      valid_date:[''],

      company_id:[''],
      fin_year:[''],
      username:[''],

      item_rate_dtls: this.fb.array([this.fb.group({
        sl_no:this.rate_sl_no,
        item_code:'',
        packing:'',
        item_uom:'',
        packing_uom:'',
        price_based_on:'',
        qty:'',
        qty_uom:'',
        rate:'',
        tolerance:'',
        sales_status:''
      })])
    });
  }

  onChangeDate(date)
  {
    this.status=false;
    
    this.DropDownListService.getRateChartDateVerify(date.target.value).subscribe(data=>
      {
        console
        if(data['status']=="YES")
        {
          alert("Selected Date is already exist in Rate Chart");
          this.userForm.patchValue({date:''});
          this.status=true;
        }
        
        if(data['status']=="NO")
        {
          let given_date = new Date(date.target.value);
          given_date.setDate(given_date.getDate() + 1);
          this.validcurrentDate =formatDate(new Date(given_date), 'yyyy-MM-ddTHH:mm', 'en');
    
          this.DropDownListService.getRateChartItemthdt(date.target.value).subscribe(itemdtls=>
            {
                    this.rate_sl_no = 0;
                    while (this.item_rate_dtls.length)
                    { this.item_rate_dtls.removeAt(0);}

                    let k:number=0;

                    if(itemdtls[0]["item_code"] == "No Data Found" )
                    {
                      this.selectedItemName=[];
                      this.packingItem=[];
                      this.selectedPackingItem=[];
                      this.add();
                      
                      this.status=true;
                    }
                    else
                    {
                      let k=0;
                      for(let item of itemdtls)
                      {
                        this.status=false;
                        this.add();
                        this.item_rate_dtls.patchValue(itemdtls)
                        //console.log("length"+itemdtls.length)
                        if(k==itemdtls.length)
                        this.status = true;
                      }

                      for(let v=0;v<this.item_rate_dtls.length;v++)
                      {
                        this.DropDownListService.getItemMasterPackMat(this.item_rate_dtls.at(v).get("item_code").value).subscribe(data1=>
                          {
                           
                            this.selectedItemName[v]=this.item_rate_dtls.at(v).get("item_code").value; 
                            this.packingItem[v] = data1;
                            this.selectedPackingItem[v] = this.item_rate_dtls.at(v).get("packing").value;
                           this.status=true;
                          });
                      }


                      /*for(let item of itemdtls)
                      {
                        this.DropDownListService.getItemMasterPackMat(item["item_code"]).subscribe(data1=>
                          {
                            console.log("hi"+itemdtls.length)
                            this.add();
                            this.selectedItemName[k]=item["item_code"]; 
                            this.packingItem[k] = data1;
                            this.selectedPackingItem[k] = item["packing"];
                            this.item_rate_dtls.at(k).patchValue(item); 
                             
                            k++;
                          });
                          this.status=true;
                      }
                      */
                    }

                    
            });
        
        }
      });
  }

  add() 
    {
      this.rate_sl_no =this.rate_sl_no +1;
      this.item_rate_dtls.push(this.fb.group({
        sl_no:this.rate_sl_no,
        item_code:'',
        packing:'',
        item_uom:'',
        packing_uom:'',
        price_based_on:'',
        qty:'',
        qty_uom:'',
        rate:'',
        tolerance:'5',
        sales_status:''}));
    }

  delete(index) 
    {
      if(this.rate_sl_no > 1)
      {
        this.item_rate_dtls.removeAt(index);
        this.selectedItemName.splice(index, 1);
        this.packingItem.splice(index, 1);
        this.selectedPackingItem.splice(index, 1);
        this.rate_sl_no = this.rate_sl_no - 1;
      }
      else
      {
        this.rate_sl_no = 1;
        this.item_rate_dtls.reset();
        
        this.item_rate_dtls.at(0).patchValue({sl_no:this.rate_sl_no});
        alert("Can't Delete All Rows");
      } 

      for(let i=1; i<=this.rate_sl_no; i++)
      this.item_rate_dtls.at(i-1).patchValue({sl_no: i});
    }

  selectedItemName = [];
  onChangeBUnit(BUnit:string)
    { 
      if(BUnit!="0")
      {
        this.DropDownListService.getFinishedItemlist(BUnit).subscribe(data=>
          {
            this.item_codes = data;
            console.log(JSON.stringify(data))
            this.status = true;
          });
      }  
    }
  
    onChangeItemName(index,itemId)
    {
          if(itemId.length)
          {
            this.DropDownListService.getItemMasterPackMat(itemId).subscribe(data1=>
              {
                this.item_codes.forEach(element=>
                  {
                      if(element.item_id == itemId)
                      {
                        this.selectedItemName[index]=itemId;
                        this.item_rate_dtls.at(index).patchValue({item_uom:element.mstock_unit_name,item_code:itemId});
                      }
                  })
                this.packingItem[index] = data1;
                console.log(JSON.stringify(data1))
              });
          }
          
    }
    selectedPackingItem:any=[];
   
    onChangePackingItem(index,packing)
    {
      if(packing.length)
      {
        this.DropDownListService.getPackingUom(packing).subscribe(uom=>
          {
            console.log(JSON.stringify(uom))
            this.selectedPackingItem[index]=packing;
            this.item_rate_dtls.at(index).patchValue({packing_uom:uom[0].mstock_unit_name,packing:packing});
          });
      }
    }

    onChangePriceBased(priceBased,index)
    {
      //alert("GGGGG : : "+index);
      if(priceBased=="Item")
      {
        this.item_rate_dtls.at(index).patchValue({qty_uom:"QTLS"});
      }
      else
      {
        this.item_rate_dtls.at(index).patchValue({qty_uom:"PCS"});
      }
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;
      if(this.Id>0)
      {
        this.Service.updateRateChart(this.userForm.getRawValue(), this.Id).subscribe(data=>
          {
          alert("Rate Details Updated");
          this.userForm.reset();
          this.status=true;
          this.ngOnInit();
          this.isHidden=false;
          this.showList("list");
          
          })
      }
      else{
        this.userForm.patchValue({rate_code:this.seq_no});
        this.Service.createRateChart(this.userForm.getRawValue()).subscribe(data=>
          {
            //console.log("IIII  "+JSON.stringify(data))
            alert("Rate Details Saved");
            this.userForm.reset();
            this.isHidden=false;
            this.ngOnInit();
            this.status=true;
            this.showList("list");
           
          })
      }
    }

    action:any;
    item_rate_dtlsList:any=[];

    onUpdate(id:any, rate_code:string,action,BUnit)
    {
      this.ratechartsave=true;
      this.ratechartadd=true;
      this.ratechartexcel=false;
      this.ratechartprint=false;
      this.userForm.patchValue({id: id});
      this.isHidden=true;
      this.status = false;
      if(action == 'view')
      {
        this.action = 'view';
        this.ratechartsave = false;
        this.ratechartadd = false;
        this.ratechartexcel = true;
        this.ratechartprint = true;
      }
      else
      {
        action = 'update'; 
      }

      forkJoin(
        this.Service.retriveRateChart(id),
        this.Service.rateRetriveList(rate_code),
        this.DropDownListService.getFinishedItemlist(BUnit)
      )
     .subscribe(([RateData, RateRetriveList,itemlist])=>
      {
       //console.log(" abcd " + JSON.stringify(RateRetriveList))
       this.item_rate_dtlsList=RateRetriveList;
        this.item_codes = itemlist;
        console.log(JSON.stringify(itemlist) )
        this.userForm.patchValue(RateData);

        this.add();
        this.rate_sl_no = 0;
        while (this.item_rate_dtls.length) 
        { this.item_rate_dtls.removeAt(0);}
        let k:number=0;
        for(let item of RateRetriveList)
        {
          this.DropDownListService.getItemMasterPackMat(item["item_code"]).subscribe(data1=>
          {
            this.status = false;
             this.add();
             this.selectedItemName[k]=item["item_code"];//each row selected item name   
             this.packingItem[k] = data1;//each row packing list
             this.selectedPackingItem[k] = item["packing"];//each row selected packing name 
             this.item_rate_dtls.at(k).patchValue(item); //set array value in respect to each row " item" ( item means each row of array)
             // RateRetriveList qwhole data // this.item_rate_dtls.patchValue(RateRetriveList) ;
               k++;
              // console.log("length:"+RateRetriveList.length)
               if(k==RateRetriveList.length)
               this.status = true;
            });
        }
        this.status = true;
        
      });
    }

    onDelete(id:any)
    {
      if(confirm("Are you sure to delete this Rate Chart ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        
            this.Service.DeleteRateChart(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Rate Chart Deleted Successfully.");
                this.userForm.reset();
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
                this.status = true;
              });
            }
    }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Rate Chart From ' + this.userForm.get("date").value +' To ' + this.userForm.get("valid_date").value);
  }
}
