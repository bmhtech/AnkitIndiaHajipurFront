import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Tds_master } from '../../../../../../Models/OtherMaster/Tds_master';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService} from '../../../../../../service/dropdown-service.service'
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-tdsmaster',
    templateUrl: './tdsmaster.component.html',
    styleUrls: ['./tdsmaster.component.scss']
  })

  export class TDSMasterComponent implements OnInit 
  {
    submitted = false;
    isHidden=false;
    Id:any;
    public userForm:FormGroup;
    model: Tds_master = new Tds_master();
    listTds_master: Tds_master[];
    status = false;
    qtdsmastersave:boolean=true;
    qtdsmasterupdate:boolean=true;
    qtdsmasterview:boolean=true;
    qtdsmasterdelete:boolean=true;
    ledgerNames:any=[];

    constructor( public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({   
      id:[''],
      tds_type: [''],
      tds_section: [''],
      tds_rate: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      tds_acc:['']});
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get tds_type(){ return this.userForm.get("tds_type") as FormControl }
    get tds_section(){ return this.userForm.get("tds_section") as FormControl }
    get tds_rate(){ return this.userForm.get("tds_rate") as FormControl }
    get tds_acc(){ return this.userForm.get("tds_acc") as FormControl }
     

    ngOnInit()
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    
     this.qtdsmastersave=false;
     this.qtdsmasterupdate=false;
     this.qtdsmasterview=false;
     this.qtdsmasterdelete=false;

     if(accessdata.includes('qtds_master.save'))
     {
      this.qtdsmastersave = true;
     }
     if(accessdata.includes('qtds_master.update'))
     {
      this.qtdsmasterupdate = true;
     }
     if(accessdata.includes('qtds_master.view'))
     {
      this.qtdsmasterview = true;
     }
     if(accessdata.includes('qtds_master.delete'))
     {
      this.qtdsmasterdelete = true;
     }

      forkJoin(
      this.Service.getTdsMaster(),
      this.DropDownListService.ledgerNameListNew()
      ).subscribe(([data,ledgerData])=> 
      { 
        this.listTds_master  = data;
        this.ledgerNames = ledgerData;
        this.status = true;
      });   
    }

    showList(s:string)
    {
      if(this.qtdsmastersave == true  && this.qtdsmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }  
      }
      if(this.qtdsmastersave == true  && this.qtdsmasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(s=="list")
      {
        this.isHidden=false;
        this.qtdsmastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''], 
        tds_type: [''],
        tds_section: [''],
        tds_rate: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        tds_acc:['']
      });
    }

  
    onUpdate(id:any,action)
    {
      if(action == 'update')
      {
        this.qtdsmastersave=true;
      }
      else
      {
        this.qtdsmastersave=false;
      }
      this.isHidden = true;
      this.status = false;
      this.Service.retriveTdsMaster(id).subscribe(data=>
      {
        this.userForm.patchValue(data); 
        this.status = true;
      });
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
        if(this.userForm.get("tds_type").value == '' || this.userForm.get("tds_type").value == null || this.userForm.get("tds_type").value == 0)
        {
          alert("Please Enter TDS Type");
          this.status=true;
        }
        else if(this.userForm.get("tds_section").value == '' || this.userForm.get("tds_section").value == null || this.userForm.get("tds_section").value == 0)
        {
          alert("Please Enter Section");
          this.status=true;
        }
        else 
        {
          if(this.Id>0)
          {
                this.status = false;
            this.Service.updateTdsMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("TDS Updated successfully.");
              this.userForm.reset();
                //refresh dropdown list
              this.ngOnInit();
              this.isHidden = false;
            });
          }
          else
            {
              this.status = false;
              this.Service.createTdsMaster(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New TDS created successfully.");
                this.userForm.reset();
                //refresh dropdown list
                this.ngOnInit();
                this.isHidden = false;
              });
            }
        }
        
        }
    }

    onDelete(id:any,tdscode)
    {
      this.status = false;

      if(confirm("Are you sure to delete this QTDS ?"))
      { 
       this.userForm.patchValue({username: localStorage.getItem("username")});

       this.DropDownListService.checkTdsMasterUsage(tdscode).subscribe(checkTDSData=> 
         {
          //alert("bidhan here::"+checkTDSData.status);
          if(checkTDSData.status=='No')
          {
            this.Service.deleteTDSMaster(this.userForm.getRawValue(),id).subscribe(data=> 
             {
               console.log("Cat id:"+data.tds_id);
       
               if(data.tds_id=='' || data.tds_id==null)
               {
                 alert("Opps!!! Can't delete this QTDS !!!");
               }else{
                 alert("QTDS deleted successfully.");
               }
               this.userForm.reset();
               this.status = true;
               this.isHidden = false;
               this.ngOnInit();
               this.showList("list");
             });
          }
          else{
           alert("This QTDS is Already Used,Can not be Deleted!! ");
          }
           
         });

      }  
      this.status = true;
    }


    getTdsacc(trans)
    {
        if(trans.length)
        {
          this.userForm.patchValue({tds_acc:trans})
        }
    }
  }




