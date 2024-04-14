import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { InvoiceType } from '../../../../../../models/InventoryModel/invoice-type';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
  styleUrls: ['./invoice-type.component.scss']
})
export class InvoiceTypeComponent implements OnInit
 {
  isHidden=false;
  public userForm:FormGroup;
  model: InvoiceType = new InvoiceType();
  seq_no:string;

  financialYear:any;
  Id : any;
  submitted = false;
  listInvoiceType : InvoiceType[];
  status = false;
  invoicemastersave:boolean=true; 
  invoicemasterupdate:boolean=true;
  invoicemasterdelete:boolean=true;
  invoicemasterview:boolean=true;

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService)
  {
    this.userForm=fb.group({
      invtype_code: [''],
      id: [''],
      invtype_name: [''], 
      invtype_prefix: ['',Validators.required], 
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }
  get id(){ return this.userForm.get("id") as FormControl }
  get invtype_prefix(){ return this.userForm.get("invtype_prefix") as FormControl }
  get invtype_code(){ return this.userForm.get("invtype_code") as FormControl }
  get invtype_name(){ return this.userForm.get("invtype_name") as FormControl }

  ngOnInit() 
  {
    //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.invoicemastersave=false;
    this.invoicemasterupdate=false;
    this.invoicemasterdelete=false;
    this.invoicemasterview=false;
  
    if(accessdata.includes('invoice_type.save'))
    {
     this.invoicemastersave = true;
    }
   if(accessdata.includes('invoice_type.update'))
    { 
      this.invoicemasterupdate=true;
    }
    if(accessdata.includes('invoice_type.delete'))
    {
      this.invoicemasterdelete=true;
    }
    if(accessdata.includes('invoice_type.view'))
    {
      this.invoicemasterview=true;
    }
    
    this.financialYear = localStorage.getItem("financial_year");
    this.DropDownListService.getSequenceId("ITC").subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()}); 
    this.Service.getInvTypes().subscribe(data=>{this.listInvoiceType  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    this.status = true;
  }

  showList(s:string)
  {
    if(this.invoicemastersave == true  && this.invoicemasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
        }
      }
      if(this.invoicemastersave == true  && this.invoicemasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
        }
      }
    
    if(s=="list")
    {
      this.isHidden=false;
      this.invoicemastersave=true;
      this.userForm.reset(this.ResetAllValues().value);
      this.DropDownListService.getSequenceId("ITC").subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.userForm.patchValue({invtype_code:this.seq_no});
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      invtype_code: [''],
      id: [''],
      invtype_name: [''], 
      invtype_prefix: ['',Validators.required], 
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }

  search(event)
  {
    let serchText = event.target.value;
    if(event.key == "Enter")
    {
      this.status = false;
      if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
      {
        this.DropDownListService.findInvoiceType('0').subscribe(data=>
        {     
          this.listInvoiceType = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findInvoiceType(serchText).subscribe(data=>
        {
          this.listInvoiceType = data;
          this.status = true;
        });     
      }
    }
  }

  onDelete(id:any,invtype_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Invoice Type ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      this.DropDownListService.checkMisleniousDeletation(invtype_id,"invoiceTypeMaster").subscribe(checkBUData=> 
        {
       // alert("check::"+checkBUData.status)
         if(checkBUData.status=='No')
         {
          this.Service.deleteInvoiceType(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              console.log("Cat Invoice Type:"+data.invtype_name);
      
              if(data.invtype_name=='' || data.invtype_name==null)
              {
                alert("Opps!!! Can't delete this Invoice Type !!!");
              }else{
                alert("Invoice Type deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            });
         }
         else{
          alert("This Invoice Type is Already Used,Can not be Deleted!! ");
         }
        }); 
    }  
    this.status = true;
  }

  onUpdate(id:any,action)
  {
    if(action =='update')
    {
      this.invoicemastersave=true;
    }
    else
    {
      this.invoicemastersave=false;
    }
    //tuhin here //this.invoicemastersave=true;
    this.isHidden = true;
    this.status = false;
    this.Service.retriveInvType(id).subscribe(data=>
    {
      this.userForm.patchValue(data); 
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
    this.submitted = true;
    if(!this.userForm.valid) 
    {
      alert('Please fill all fields!')
      return false;
    } 
    else 
    {
      this.status = false;
      if(this.userForm.get("invtype_name").value == '' || this.userForm.get("invtype_name").value == null)
      {
        alert("Please Enter Invoice Type Name")
        this.status=true;
      }
      else
      {
        if(this.Id>0)
        {
          this.Service.updateInvType(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Invoice Type Updated successfully.");
            this.userForm.reset();
            //refresh List;
            this.ngOnInit();
            this.isHidden = false;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
        }

        else
          {
            this.Service.createInvType(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("New Invoice Type created successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
      }
      
    }
  }

}
