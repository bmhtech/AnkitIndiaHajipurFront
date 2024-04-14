import { Component, OnInit } from '@angular/core';
import { Purl1Selection} from '../../../../../../models/transaction/PurchaseTransaction/Purchase_l1_selection';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-l1-selection',
  templateUrl: './l1-selection.component.html',
  styleUrls: ['./l1-selection.component.scss']
})
export class L1SelectionComponent implements OnInit {

  submitted = false;
  public userForm:FormGroup;
  model: Purl1Selection = new Purl1Selection();
  listPurl1Selection: Purl1Selection[];
  isHidden = false;
  l1selectionsave:boolean = true;

  constructor(public fb:FormBuilder,private Service: PurchaseModuleServiceService, private DropDownListService: DropdownServiceService) {

    
    this.userForm=fb.group({
        
       l1_doc_no:[''],
       date:[''],
       username: [''],
       //supplier_id:[''],
       remarks:[''],
      pur_L1_Selection_Dtls: this.fb.array([this.fb.group({
        sl_no:'',
        pq_doc_no:'',
        item_code:'',
        item_name:'',
        vendor_code:'',
        vendor_name:'',
        price:'',
        req_date:'',
        qout_date:'',
        req_qty:'',
        qout_qty:'',
        amount:'',
        status:'',
        reason:'',
        remarks:''

      })])
    });


   }
  get l1_doc_no(){ return this.userForm.get("l1_doc_no") as FormControl }
  get date(){ return this.userForm.get("date") as FormControl }
  //get supplier_id(){ return this.userForm.get("supplier_id") as FormControl }
  get remarks(){ return this.userForm.get("remarks") as FormControl }

  get pur_L1_Selection_Dtls() {
    return this.userForm.get('pur_L1_Selection_Dtls') as FormArray;
  }
  
  status = false;
  ngOnInit() {

    //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.l1selectionsave=false;
    if(accessdata.includes('l1_selection.save'))
      {
        this.l1selectionsave = true;
      }
  
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});

    this.Service.getPurchaseL1Selection()
    .subscribe(
      data=>
      {
        this.listPurl1Selection  = data;
       
      }
    );
    this.status = true;
  }

  showList(s:string){
    
    if(this.l1selectionsave == true )//true exist  false not exist 
      {
        if(s=="add")
        {
         this.isHidden=true;
         console.log("add event: "+this.isHidden)
        }
      }
     
    
     if(s=="list")
    {
     this.isHidden=false;
     console.log("list event: "+this.isHidden)
    }
     }

  add() {
    this.pur_L1_Selection_Dtls.push(this.fb.group({
      sl_no:'',
      pq_doc_no:'',
      item_code:'',
      item_name:'',
      vendor_code:'',
      vendor_name:'',
      price:'',
      req_date:'',
      qout_date:'',
      req_qty:'',
      qout_qty:'',
      amount:'',
      status:'',
      reason:'',
      remarks:''
    
    
    }));
  }

  delete(index) {
    if(index)
    {
     this.pur_L1_Selection_Dtls.removeAt(index);
    }
   else
   {
    alert("can't delete all rows");
   }
  }


  send(){
    //console.log(this.userForm.value);
    this.userForm.patchValue({username: localStorage.getItem("username")});
    this.submitted = true;
    if(!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    } else {
      this.status = false;
      //alert(this.userForm.value);
      this.Service.createPurchaseL1Selection(this.userForm.value)
         .subscribe( data => {
          console.log(this.userForm.value);
         
           alert("New Purchase L1 Selection created successfully.");
           this.userForm.reset();
           this.status = true;
           //refresh List;
                          this.Service.getPurchaseL1Selection().subscribe(data=>{this.listPurl1Selection  = data; });
                          
         });
     
    }

  }

}


