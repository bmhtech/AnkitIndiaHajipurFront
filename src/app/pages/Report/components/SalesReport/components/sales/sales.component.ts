import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesReport } from '../../../../../../Models/SalesTransaction/Sales-report';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  public userForm:FormGroup;
  model:SalesReport = new SalesReport();
  status = false;
  sales_reportlists:any=[];
  reportfieldslists:any=[];
  dropdownsettings;
  selected:any;
  listSalesRegistration:SalesReport[];
  Id:any;
  Concat_multi:any;


  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,) { 
    this.userForm=fb.group({
      reportfields:[''],
      sales_report:[''],
      reportname:[''],
      id: [''], 
      concat_multi:[''],
      company_id: [''],
      fin_year:[''],
      username:[''], 
    })
  }
  
  get id(){ return this.userForm.get("id") as FormControl }
  get reportfields(){return this.userForm.get("reportfields").value.toString()  as FormControl }
  get sales_report(){return this.userForm.get("sales_report") as FormControl }
  get reportname(){return this.userForm.get("reportname") as FormControl }
  get concat_multi(){ return this.userForm.get("concat_multi") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get username(){ return this.userForm.get("username") as FormControl }
 // company_name:any;//default comapany name

   ngOnInit() {
    this.status =true;
    
    forkJoin(
      this.DropDownListService.getSalesreport(),
     this.Service.getSalesRegisterList(),
     ).subscribe(([BuData,SalesRegisterList])=>
       {
       this.sales_reportlists = BuData
       this.listSalesRegistration=SalesRegisterList
       this.status = true; 
       });
    
  };

  onChangeGroup(event)
  {
   
  
   this.DropDownListService.getReportField(event)
   .subscribe(data=>
     {
       this.reportfieldslists  = data
       console.log("list"+this.reportfieldslists); 
       this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
   

  
     
  }
  
  
  
  send()
  {

    let Concat_multi =this.userForm.get("concat_multi").value; 
    this.Id= this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
    
    this.userForm.patchValue({reportfields:Concat_multi.toString()});

    
      if(this.Id>0)
      {

        this.status = false;
        this.Service.updateSalesRegMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
        {
          console.log("update check "+this.userForm.value+ " / " + this.Id);
         
          alert("New Sales Master Updated successfully.");
          this.userForm.reset();
          this.status = true;
          this.ngOnInit();
        
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});

      }
      else{


        this.Service.createSalesRegMaster(this.userForm.getRawValue()).subscribe(data => 
          {
            console.log("chechk send : "+this.userForm.value );
            alert("New Sales Master created successfully.");
            this.userForm.reset();
            this.status = true;
            this.ngOnInit();
            
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
      }






   
    
    }
   
    onUpdate(id:any)
    {
     
      this.status = false;
      this.Service.retriveSalesRegister(id).subscribe(data=>// this method  purpose is for fetching data from database 
      { 
        

        this.Concat_multi = data.reportfields.split(',');//in database it is store as a string to we are spliting it 
        
        this.userForm.patchValue({concat_multi:this.Concat_multi});//making data store in concat multi forgroup 
        this.DropDownListService.getReportField(data.sales_report).subscribe(data=>//for dropdown on change we need to pass data.salesreport
          {
            this.reportfieldslists  = data
            
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
        
        this.userForm.patchValue(data);  //here we are specifying all data into formgroup
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    
    
    }


  
}
  

