import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { GatepassChecklist } from '../../../../../../Models/Gatepass/GatepassChecklist';

@Component({
  selector: 'app-gatepass-checklist',
  templateUrl: './gatepass-checklist.component.html',
  styleUrls: ['./gatepass-checklist.component.scss']
})
export class GatepassChecklistComponent implements OnInit {


  public userForm:FormGroup;
  submitted = false;
  GatepassChecklist: GatepassChecklist[];
  model: GatepassChecklist = new GatepassChecklist();
  Id:any;
  status:any;
  list_checklist: GatepassChecklist[];
  action:any;
  isHidden:any;

  constructor( public fb:FormBuilder,private Service:Master, 
    public dialog: MatDialog, private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        checkin: [''],
        description: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']
      });

     }
     get id(){return this.userForm.get("id") as FormControl}
     get checkin(){return this.userForm.get("checkin") as FormControl}
     get description(){return this.userForm.get("description") as FormControl}
     get company_id(){return this.userForm.get("company_id") as FormControl}
     get fin_year(){return this.userForm.get("fin_year") as FormControl}
     get username(){return this.userForm.get("username") as FormControl}

  ngOnInit() {
    this.isHidden = false;
    this.action='update';
    
    this.DropDownListService.gatepassCheckList().subscribe((chkList)=>
      {
        this.list_checklist=chkList;
        this.status=true;
      });

  }

  showList(s:string)
    {
        if(s=="add")
        { this.isHidden=true;}

      if(s=="list")
      {
        this.isHidden=false;
        this.action = 'update';
        this.userForm.reset();
      }
    }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl           
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
    this.submitted = true;
    this.status=false;

    if(this.userForm.get("checkin").value =='' ||this.userForm.get("checkin").value ==null  || this.userForm.get("checkin").value =='0' )
    {
      alert("Please Select Checkin !!!!!!!");
      this.status=true;
    }
    else if(this.userForm.get("description").value == '' ||this.userForm.get("description").value == null )
    {
      alert("Please Select Checkin !!!!!!!");
      this.status=true;
    }
    else
    {
          if(this.Id>0)
          {
            this.Service.updategatepassCheckList(this.userForm.getRawValue(), this.Id).subscribe( data => 
              {
               // console.log("check: "+JSON.stringify(this.userForm.getRawValue()));
                alert("Gate Pass Check Updated successfully.");
                this.userForm.reset();
                this.isHidden = false;
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Gate Pass Check List !!! please Reload the page and try again....");
              }); 
          }
          else
          {
            this.Service.creategatepasschecklist(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Gate Pass Check List has been created successfully.");
                this.userForm.reset();
                this.ngOnInit(); 
                this.status=true;         
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
              alert("something error is occured in New Gate Pass Check List !!! please Reload the page and  try again....");
              this.ngOnInit()});    
            }

          }
    }

    
  onUpdate(id, gp_id, action)
  {
    this.userForm.patchValue({id: id});	
    this.status = false;
    this.isHidden = true;
     if(action == 'view')
     {this.action = 'view';}
     if(action == 'update')
      {this.action = 'update';}
    
      this.DropDownListService.retriveGatepassChkList(id).subscribe((gatepassChkList)=>
      {

        this.userForm.patchValue({id: gatepassChkList["id"],checkin: gatepassChkList["checkin"], description: gatepassChkList["description"]});

           this.status = true;
       }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
       this.ngOnInit()});                              
      } 

      onDelete(id:any,gp_id)
      {
        this.status = false;
        if(confirm("Are you sure to delete this Check List?"))
        { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
         
          this.DropDownListService.checkGatePassCheckListUsage(gp_id).subscribe(checkgatePass=> 
            {
             ///let dataq=JSON.parse(checkItem);
             //alert("bidhan here::"+checkgatePass.status);
             if(checkgatePass.status=='No')
             {
              this.Service.deleteGatePassCheckList(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                //  console.log("Broker :"+data.broker_code);
                  if(data.checklist_code=='' || data.checklist_code==null)
                  {
                    alert("Opps!!! Can't delete this Gate Pass Check List !!!");
                  }else{
                    alert("Gate Pass Check List Deleted successfully.");
                  }
                  this.userForm.reset();
                  this.status = true;
                  this.isHidden = false;
                  this.ngOnInit();
                  this.showList("list");
                });
  
             }
             else{
              alert("This Gate Pass Check List is Already Used,Can not be Deleted!! ");
             }
            });  
        }  
        this.status = true;
      }
    
}
