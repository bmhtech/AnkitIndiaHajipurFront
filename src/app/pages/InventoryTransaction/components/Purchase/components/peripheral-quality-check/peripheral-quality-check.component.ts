import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { PeripheralQualityCheck} from '../../../../../../models/transaction/PurchaseTransaction/peripheral-quality-check';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-peripheral-quality-check',
  templateUrl: './peripheral-quality-check.component.html',
  styleUrls: ['./peripheral-quality-check.component.scss']
})
export class PeripheralQualityCheckComponent implements OnInit {
  isHidden=false;
  peripheralqualitychecksave:boolean=true;

  constructor(private DropDownListService: DropdownServiceService) {     }
 
  showList(s:string){
    if(s=="add")
    {
     this.isHidden=true;
     console.log("add event: "+this.isHidden)
    }
     if(s=="list")
    {
     this.isHidden=false;
     console.log("list event: "+this.isHidden)
    }
     }


     status = false;
  ngOnInit() {
  //For User Role
  let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
  this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
  let accessdata=JSON.stringify(data);
  this.peripheralqualitychecksave=false;
  
  if(accessdata.includes('peripheral_quality_check.save'))
  {
   this.peripheralqualitychecksave = true;
  }


  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
  this.ngOnInit()});
  }

}
