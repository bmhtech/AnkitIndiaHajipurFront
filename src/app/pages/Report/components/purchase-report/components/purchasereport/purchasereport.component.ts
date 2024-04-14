import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { PurchaseReport } from '../../../../../../Models/transaction/PurchaseTransaction/Purchase-report';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
@Component({
  selector: 'app-purchasereport',
  templateUrl: './purchasereport.component.html',
  styleUrls: ['./purchasereport.component.scss']
})
export class PurchasereportComponent implements OnInit {
  public userForm:FormGroup;
  model:PurchaseReport = new PurchaseReport();
 
  status = false;
  purchase_reportlists:any=[];
  reportfieldslists:any=[];
  listPurchaseRegistration:any=[];
  Id:any;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,) { 
    this.userForm=fb.group({
      reportfields:[''],
      reportname:[''],
      purchase_report:[''],
      concat_multi:[''],
      id: [''], 
      
      company_id: [''],
      fin_year:[''],
      username:[''], 
    })
  }
  get reportfields(){return this.userForm.get("reportfields").value.toString()  as FormControl }
  get purchase_report(){return this.userForm.get("purchase_report") as FormControl }
  get reportname(){return this.userForm.get("reportname") as FormControl }
  get concat_multi(){ return this.userForm.get("concat_multi") as FormControl }
  get id(){ return this.userForm.get("id") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get username(){ return this.userForm.get("username") as FormControl } 
  
  ngOnInit() {
    this.status =true;
    forkJoin(
      this.DropDownListService.getPurchasereport(),
      this.Service.getPurchaseRegisterList(),

     ).subscribe(([BuData,purschaselist])=>
       {
         
       this.purchase_reportlists = BuData
       this.listPurchaseRegistration =purschaselist
       this.status = true; 
       });
      
    

  }
  onItemSelect($event)
  {
    console.log('$event is',$event);
  }
  
  onChangeGroup(event)
  {
    
   this.DropDownListService.getReportFieldPurchase(event)
   .subscribe(data=>
     {
       this.reportfieldslists  = data 
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
    this.Service.createPurchaseRegMaster(this.userForm.getRawValue()).subscribe(data => 
      
      {
        console.log("chechk send : "+this.userForm.value);
        alert("New Purchase Master created successfully.");
        this.userForm.reset();
        this.status = true;
        this.ngOnInit();
        
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

}
