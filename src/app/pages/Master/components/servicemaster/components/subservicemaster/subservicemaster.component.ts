import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Servicemaster } from '../../../../../../../../src/app/Models/ServiceMaster/servicemaster';
import { DropdownServiceService } from '../../../../../../../../src/app/service/dropdown-service.service';
import { Master } from '../../../../../../../../src/app/service/master.service';
import { ServicetaxcodepopupComponent } from '../../servicetaxcodepopup/servicetaxcodepopup.component';

@Component({
  selector: 'app-subservicemaster',
  templateUrl: './subservicemaster.component.html',
  styleUrls: ['./subservicemaster.component.scss']
})
export class SubservicemasterComponent implements OnInit {
  public userForm:FormGroup;
  model: Servicemaster = new Servicemaster();
  typeslist:any = [];
  listservicemaster:any = [];
  customUOMs:any=[];
  basislist:any=[];
  servicesublist:any=[];
  ledgerName:{};
  isHidden=false;
  company_name:any;
  finYear:any;
  Id:any;
  seq_no:any;
  service_sl_no = 1;
  status = false;
  addbuttonuse:boolean=false;
  checkitemtype:boolean=false;
  sertype:any;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,public dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      service_category:[''],
      service_no:[''],
      service_acc_code:[''],
      service_group:[''],
      service_type:[''],
      service_subtype:[''],
      service_ac:[''],
      description:[''],
      tax_name:[''],
      tax_id:[''],
      tax_rate:[''],
      service_item_type:[''],
      remarks:[''],

      company_id:[''],
      fin_year:[''],
      username:[''],

      service_masterdtls: this.fb.array([this.fb.group({
        sl_no:this.service_sl_no,
        service_name:'',
        remarks_a:''
      })])
    });

  }

        get id(){ return this.userForm.get("id") as FormControl}
        get service_category(){ return this.userForm.get("service_category") as FormControl }
        get service_no(){ return this.userForm.get("service_no") as FormControl}
        get service_acc_code(){ return this.userForm.get("service_acc_code") as FormControl}
        get service_group(){ return this.userForm.get("service_group") as FormControl}
        get service_type(){ return this.userForm.get("service_type") as FormControl}
        get service_subtype(){ return this.userForm.get("service_subtype") as FormControl}
        get service_ac(){ return this.userForm.get("service_ac") as FormControl}
        get description(){ return this.userForm.get("description") as FormControl}
        get tax_name(){ return this.userForm.get("tax_name") as FormControl}
        get tax_id(){ return this.userForm.get("tax_id") as FormControl}
        get tax_rate(){ return this.userForm.get("tax_rate") as FormControl}
        get service_item_type(){ return this.userForm.get("service_item_type") as FormControl}
        get remarks(){ return this.userForm.get("remarks") as FormControl}
        
        get company_id(){ return this.userForm.get("company_id") as FormControl}
        get fin_year(){ return this.userForm.get("fin_year") as FormControl}
        get username(){ return this.userForm.get("username") as FormControl}

        get service_masterdtls(){return this.userForm.get('service_masterdtls') as FormArray}

  ngOnInit() 
  {
    this.company_name = localStorage.getItem("company_name");
    this.finYear = localStorage.getItem("financial_year");
    this.service_sl_no = 1;
    this.status=true;
    this.isHidden=false;
    this.addbuttonuse=false;
    this.checkitemtype=true;
    this.sertype="Non-Goods";
    this.userForm.patchValue({service_category:true});

    forkJoin(
    this.DropDownListService.getSSequenceId(this.finYear),
    this.DropDownListService.ledgerList(),
    this.DropDownListService.getServiceTypeList(),
    this.DropDownListService.getServiceMasterList(this.finYear)
    ).subscribe(([data,ledherdata,serviceType,listData])=>{
      this.seq_no = data.sequenceid;
      this.ledgerName = ledherdata;
      this.servicesublist=serviceType;
      this.listservicemaster=listData;
    });

    
    
    while (this.service_masterdtls.length) 
    this.service_masterdtls.removeAt(0);
    this.add();
    
  }

  onChangeBilling(event)
    { 
      this.DropDownListService.getWeighmentCustomUOM()
        .subscribe(data=>{
      this.customUOMs  = data;
    });
    }

  showList(s:string)
  {
    if(s=="add")
    {
       this.isHidden=true;
       this.service_sl_no=0;
       while(this.service_masterdtls.length)
        this.service_masterdtls.removeAt(0);
        this.add(); 
        this.service_masterdtls.at(0).patchValue({sln_no:this.service_sl_no})
        this.sertype="Non-Goods";
    }
    if(s=="list")
    { 
       this.isHidden=false;
       while(this.service_masterdtls.length)
       this.service_masterdtls.removeAt(0);
       this.add(); 
       this.service_sl_no=0;
       this.userForm.reset();
       this.service_masterdtls.at(0).patchValue({sln_no:this.service_sl_no})
       this.sertype="Non-Goods";
       this.DropDownListService.getSSequenceId(this.finYear).subscribe(data=>
        {
          this.seq_no = data.sequenceid;
        })
    }  
  }

  delete(index) 
    {
      if(this.service_sl_no > 1)
      {
        this.service_masterdtls.removeAt(index);
        this.service_sl_no = this.service_sl_no - 1;
      }
      else
      {
        this.service_sl_no = 1;
        this.service_masterdtls.reset();
        this.service_masterdtls.at(0).patchValue({sl_no:  this.service_sl_no});
        alert("Can't Delete All Rows");
      } 

      for(let i=1; i<=this.service_sl_no; i++)
      this.service_masterdtls.at(i-1).patchValue({sl_no: i});
    }

  add() 
    {
      this.service_sl_no =this.service_sl_no +1;
      this.service_masterdtls.push(this.fb.group({
        sl_no:this.service_sl_no,
        service_name:'',
        remarks_a:''}));
    }

    onChangeOrderFor(checked)
    {
      this.userForm.patchValue({service_category:checked});
    }

    onChangeItemType(itemtype)
    {
      if(itemtype=="Single")
      {
        this.addbuttonuse=false;
        this.checkitemtype=true;
        this.service_sl_no = 0;
        while (this.service_masterdtls.length) 
        this.service_masterdtls.removeAt(0);
        this.add();
        this.service_masterdtls.at(0).patchValue({service_name:this.userForm.get("description").value})
      }
      else{
        this.addbuttonuse=true;
        this.checkitemtype=false;
        this.service_masterdtls.at(0).patchValue({service_name:''})
      }
    }

    taxcodePopup()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {};
      const dialogRef = this.dialog.open(ServicetaxcodepopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      { this.userForm.patchValue({tax_name: data["tax_name"],tax_id: data["tax_id"], tax_rate: data["tax_rate"]});}); 
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
          this.Service.updateServiceMaster(this.userForm.getRawValue(), this.Id).subscribe(data=>
            {
            alert("Service Master is Updated Sucessfully");
            this.status=true;
            this.ngOnInit();
            this.isHidden=false;
            this.showList("list");
            })
        }
        else{
          this.userForm.patchValue({service_no:this.seq_no});
          this.Service.createServiceMaster(this.userForm.getRawValue()).subscribe(data=>
            {
              alert("Service Master is Created Sucessfully")
              this.status=true;
              this.ngOnInit();
              this.isHidden=false;
              this.showList("list");
            })
        }
    }

    onUpdate(id:any, service_no:string)
    {
      this.userForm.patchValue({id: id});
      this.isHidden=true;
      forkJoin(
        this.Service.retriveServiceMaster(id),
        this.Service.serviceMasterRetriveList(service_no)
      )
     .subscribe(([ServiceData, ServiceRetriveList])=>
      {
        this.userForm.patchValue(ServiceData);


        if(ServiceData["service_item_type"]=="Single")
        {
           this.checkitemtype=true;
        }
        else
        {
          this.checkitemtype=false;
        }
        while (this.service_masterdtls.length ) 
        {
          this.service_masterdtls.removeAt(0);
        }
        for(let i=0;i<ServiceRetriveList.length;i++)
        {
          this.add();
        }
        this.service_masterdtls.patchValue(ServiceRetriveList);
        this.status = true;
      });
    }

  onDelete(id:any,service_no)
  {
       this.status = false;

    if(confirm("Are you sure to delete this Service ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        
        this.DropDownListService.checkServiceMasterUsage(service_no).subscribe(checkService=> 
          {
           if(checkService.status=='No')
           {
            this.Service.DeleteService(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Service Deleted Successfully.");
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
            }
            else
            {
             alert("This Service is Already Used, Can not be Deleted!! ");
            }
          });
      }
    this.status=true;   
  }

}