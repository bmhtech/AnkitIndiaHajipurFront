import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemServiceMaster } from '../../../../../../Models/ItemModel/ItemServiceMaster';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-item-service-master',
  templateUrl: './item-service-master.component.html',
  styleUrls: ['./item-service-master.component.scss']
})
export class ItemServiceMasterComponent implements OnInit {

  public userForm:FormGroup;
  model:ItemServiceMaster=new ItemServiceMaster(); 
  Id: any;
  isHidden=false;
  status = false;
  submitted = false;
  seq_no: string;
  company_name:any;
  itemServicesave:boolean=true;
  financialYear:any;
  ledgerNames:any=[];
  listService:any=[];
  activeIsChecked:boolean=false;
  gstcodes:any=[];

  @ViewChild('iCodeInput') _itemCatCode: ElementRef;
  public fb1:FormBuilder;

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
  {
    this.userForm=fb.group({
      id:[''],
      service_id:[''],
      service_name:[''],
      gst_code:[''],
      description:[''],
      sac_code:[''],
      ac_ledger:[''],
      service_active:[''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }

  get id(){ return this.userForm.get("id") as FormControl }
  get service_id(){ return this.userForm.get("service_id") as FormControl }
  get service_name(){ return this.userForm.get("service_name") as FormControl }
  get gst_code(){ return this.userForm.get("gst_code") as FormControl }
  get description(){ return this.userForm.get("description") as FormControl }
  get sac_code(){ return this.userForm.get("sac_code") as FormControl }
  get ac_ledger(){ return this.userForm.get("ac_ledger") as FormControl }
  get service_active(){ return this.userForm.get("service_active") as FormControl }
  

  ngOnInit() {

    this.activeIsChecked = true;

    this.financialYear = localStorage.getItem("financial_year");
    this.company_name = localStorage.getItem("company_name");
    forkJoin(
      this.DropDownListService.getItemServiceSequenceId(this.company_name,this.financialYear),
      this.DropDownListService.ledgerNameListNew(),
      this.DropDownListService.getItemServiceList(this.company_name),
      this.DropDownListService.taxList(),
      )
     .subscribe(([seqgenerate,ledgerlist,servicelist,gst])=>
      {
        console.log("seqgenerate:"+JSON.stringify(servicelist))
          this.listService=servicelist;
          this.ledgerNames=ledgerlist;
          this.seq_no = seqgenerate["sequenceid"];
          this.gstcodes=gst;
      }); 
    this.status = true;
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
      this.itemServicesave=true;
      this.userForm.reset(this.ResetAllValues().value);
   
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id:[''],
      service_id:[''],
      service_name:[''],
      gst_code:[''],
      description:[''],
      sac_code:[''],
      ac_ledger:[''],
      service_active:[''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }

search(event)
  {
    let serchText = event.target.value;
    serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
    serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
    if(event.key == "Enter")
    {
      this.status = false;
      if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
      {
        this.DropDownListService.findItemServiceMaster(this.company_name,'0').subscribe(data=>
        {     
          this.listService = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findItemServiceMaster(this.company_name,serchText).subscribe(data=>
        {
          this.listService = data;
          this.status = true;
        });     
      }
    }
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
      this.status = false
      if(this.userForm.get("service_name").value == null || this.userForm.get("service_name").value == "" )
      {
        alert("Please Enter Item Service Name!!!!  ");
        this.status=true;
      }
      else if(this.userForm.get("gst_code").value == null || this.userForm.get("gst_code").value == 0 )
        {
          alert("Please Enter GST Code!!!!  ");
          this.status=true;
        }
      else if(this.userForm.get("description").value == null || this.userForm.get("description").value == 0 )
      {
        alert("Please Enter Description!!!!  ");
        this.status=true;
      }
      else if(this.userForm.get("sac_code").value == null || this.userForm.get("sac_code").value == 0 )
      {
        alert("Please Enter SAC Code!!!!  ");
        this.status=true;
      }
      else if(this.userForm.get("ac_ledger").value == null || this.userForm.get("ac_ledger").value == '' || this.userForm.get("ac_ledger").value == 0 )
      {
        alert("Please Select Account Ledger Name!!!!  ");
        this.status=true;
      }
      else{
      this.status = false;
        if(this.Id>0)
        {
          this.Service.updateItemServiceMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Item Service Master Updated successfully.");
            this.userForm.reset();
            this.ngOnInit();
            this.isHidden = false;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Can't Update Item Service Master,please try again....");
          this.ngOnInit()});
        }

        else
          {
            this.Service.createItemServiceMaster(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("New Item Service Master created successfully.");
              this.userForm.reset();
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Can't Create Item Service Master,please try again....");
            this.ngOnInit()});
          }
      }     
    }
  }

  onUpdate(id:any,action)
  {
    if(action =='update')
    {
      this.itemServicesave=true;
    }
    else
    {
      this.itemServicesave=false;
    }
    this.isHidden = true;
    this.status = false;
    this.DropDownListService.retriveItemServiceMaster(id).subscribe(data=>
    {
      this.userForm.patchValue(data); 
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Error in Retrive Item Service Master....");
    this.ngOnInit()});
  }

  onDelete(id:any)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Item Service ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      this.Service.deleteItemService(this.userForm.getRawValue(),id).subscribe(data=> 
      {
        console.log("Cat id:"+data.service_id);
        if(data.service_id=='')
        {
          alert("Opps!!! Can't delete this Item Service !!!");
        }else{
          alert("Item Service deleted successfully.");
        }
        this.status = true;
        this.ngOnInit()
      }); 
    }  
    this.status = true;
  }

  con_acc:any;
  groupstat1:any;
  onFocusoutCheckUnique(event: any)
  {
    let name = event.target.value;
    name=this.Service.replaceAllSpl(name,"&","ampersand");
    name=this.Service.replaceAllSpl(name,"/","backslash");
    if(name != "" && name != "0" && name != null){
      this.DropDownListService.chkItemServiceNameStatic(name).subscribe(data=>
        {
          this.groupstat1 = data.service_name;
          if(this.groupstat1=='EXIST')
          {
            window.alert(event.target.value +"  "+ "already exist please change" );
            this.itemServicesave = false;
          }
          else
          {
            this.itemServicesave = true;
          }
        });
        this.groupstat1='';
    }
  }


}
