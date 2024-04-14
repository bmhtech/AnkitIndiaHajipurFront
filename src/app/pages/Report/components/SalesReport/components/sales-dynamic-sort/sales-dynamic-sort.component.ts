import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Sales2Report } from '../../../../../../Models/SalesTransaction/sales2';

import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-sales-dynamic-sort',
  templateUrl: './sales-dynamic-sort.component.html',
  styleUrls: ['./sales-dynamic-sort.component.scss']
})
export class SalesDynamicSortComponent implements OnInit {
  model:Sales2Report = new Sales2Report();
  public userForm:FormGroup;
  Concat_multi:any;
  status = false;
  reportnamelist:any=[];
  dynamicList:any=[];
  sortlength:number;
  sort1:any=[];
 
  
  disabled = false;
  ShowFilter = false;
  limitSelection = false;

  selectedItems: any = [];
  dropdownSettings: any = {};
  selected: any;
ReportName:any;
//json work
  insideloop:any;
  concat_json:string;
  storejson:any;
storejasontoarray:any=[];
//jason work

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,) { 
  this.userForm=fb.group({

    reportname:[''],
    concat_multi:[''],
    backend:[''],
    dynamic:[''],
    sortNumber:[''],
    id: [''], 
    fin_year:[''],
    username:[''],
    report_id:[''],
    static_report:[''],
    reporttype:[''],
    
  })
  }

  get reportname(){return this.userForm.get("reportname").value.toString()  as FormControl }
  get backend(){return this.userForm.get("backend") as FormControl }
  get dynamic(){return this.userForm.get("dynamic") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
  get reporttype(){ return this.userForm.get("reporttype") as FormControl }
  ngOnInit() {

    this.status =true;
    
     forkJoin(
       this.DropDownListService.getSalesRegDynamicList(),
    
      ).subscribe(([BuData])=>
        {
       // this.reportnamelist = BuData
       
      // console.log("list11"+this.reportnamelist.value);
      
        this.status = true; 
        });
        this.dropdownSettings = {
         singleSelection: false,
         idField: 'backend',
         textField: 'dynamic',
         selectAllText: 'Select All',
         unSelectAllText: 'UnSelect All',
        itemsShowLimit: 100,
        allowSearchFilter: this.ShowFilter
     };

  };

  onChangeGroupReportType(event)
  {

    this.DropDownListService.reportTypeDropdownList(event)
    .subscribe(data=>
      {
        this.reportnamelist  = data
      
  
       
        this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
   }

  onChangeGroup(event)
  {
   
  
   this.DropDownListService.salesDynamicSort(event)
   .subscribe(data=>
     {
       this.dynamicList  = data
       console.log(this.dynamicList );
       var sort=data.length;
       this.userForm.patchValue({sortNumber:sort});
       
 
      
       this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
  }

  onItemSelect(item: any) {

    // if(this.concat_multi.length>0){
     //  this.deal.dealid=this.selected[0].id;
    // }
   //  console.log('onItemSelect', item);
 }

  send()
  {
 
      let selected = JSON.stringify(this.userForm.get("concat_multi").value);//convert jason to string 
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      let storejson =this.userForm.get("concat_multi").value;

       for(let i=0; i<storejson.length;i++)
      {
        let insideloop=JSON.stringify(storejson[i].backend);
        this.concat_json += insideloop+",";
      }
      var finaloutput =this.concat_json.replace("undefined","");
      let sort1=this.userForm.get("concat_multi").value.toString().split(",");
      var sort2=sort1.length;
  
      this.userForm.patchValue({backend:finaloutput});
  
      if(storejson.length==this.userForm.get("sortNumber").value)
      {  

       let  ReportName =this.userForm.get("reportname").value;
       this.Service.updateSalesRegSort(this.userForm.getRawValue(),ReportName).subscribe(data => 
        {
         
         alert("New Sales Invoice Dynamic List Sorted successfully.");
         this.userForm.reset();
         this.status = true;
         this.ngOnInit();
          
       }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
       this.ngOnInit()});
     } 
      else
     {
      alert("Please Check List All Values");
      this.dynamicList =[];
         this.userForm.reset();
         this.status = false;

       
            
         this.ngOnInit();
       
        
     }
    }

    


}
