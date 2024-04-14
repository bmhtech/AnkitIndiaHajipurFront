import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GatepassGateout } from '../../../../../../Models/Gatepass/GatepassGateout';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-gatepass-gateout',
  templateUrl: './gatepass-gateout.component.html',
  styleUrls: ['./gatepass-gateout.component.scss']
})
export class GatepassGateoutComponent implements OnInit {
//GatepassGateout

public userForm:FormGroup;
  model: GatepassGateout = new GatepassGateout();
  submitted = false;
  isHidden:any;
  Id:any;
  checklist_slno = 1;
  company_name:any;
  employeeNames:any = [];
  vechile_number:any;
  veh_nos:any = [];
  status = false;
  list_gateout: GatepassGateout[];
  action:any;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service:Master) 
  { 
    this.userForm=fb.group({
      id : [''],
      vechileid:[''],
      confirmed_by:[''],
      remarks:[''],
      reference_id:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],
      gatepass_confirmed_by:[''],

      gatepassGateout_details:this.fb.array([this.fb.group({
        sl_no : '', 
        checkbox:'',
        checklist_code:'',
        checkin:'',
        description:''})])
    });
  }

  get id() { return this.userForm.get("id") as FormControl;}
  get vechileid() { return this.userForm.get("vechileid") as FormControl;}  

  get reference_id() { return this.userForm.get("reference_id") as FormControl;}  
  get company_id() { return this.userForm.get("company_id") as FormControl;}  
  get fin_year() { return this.userForm.get("fin_year") as FormControl;}  
  get username() { return this.userForm.get("username") as FormControl;}  

  get vehicle_verification() { return this.userForm.get("vehicle_verification") as FormControl;} 
  get confirmed_by() { return this.userForm.get("confirmed_by") as FormControl;} 
  get remarks() { return this.userForm.get("remarks") as FormControl;} 
  get gatepass_confirmed_by() { return this.userForm.get("gatepass_confirmed_by") as FormControl;} 
  get gatepassGateout_details(){return this.userForm.get("gatepassGateout_details") as FormArray};


  addgatepass_checklist_out()
  {
   
    this.gatepassGateout_details.push(this.fb.group({
       sl_no : '', 
       checkbox:'',
       checklist_code:'',
       checkin:'',
       description:''
    }));
  }

  ngOnInit() {
    
    this.company_name = localStorage.getItem("company_name");
    this.isHidden = false;
    this.action='save';
    forkJoin(
      this.DropDownListService.getVehicleListgatepassout(),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.gatoutList()
    ).subscribe(([vehicleData,employeelist,gateoutlist])=>
      {
        console.log("tuhin :: " + JSON.stringify(vehicleData));
       this.veh_nos=vehicleData;
       this.employeeNames = employeelist;
       this.list_gateout=gateoutlist;
       this.status=true;

      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()}); 

  
  }
  
  showList(s:string)
    {
      
        if(s=="add")
        { this.isHidden=true;}

      if(s=="list")
      {
        this.isHidden=false;
        //this.action = 'update';
        this.userForm.reset();
       
      }
    }

  
  onChangeVechileNo()
  {
    let vehicle_id= this.userForm.get("vechileid").value;  
    this.DropDownListService.getVehicleListgatepassauth(vehicle_id).subscribe(data=>
    {
      console.log("tuhin :: " + JSON.stringify(data) );


      this.userForm.patchValue({confirmed_by:data["confirmed_by"],remarks:data["remarks"],reference_id:data["gp_go_auth_id"]});
      
     console.log("hi "+ this.userForm.get("reference_id").value)
      this.DropDownListService.getgatepassauthdetails(this.userForm.get("reference_id").value).subscribe(details=>
      {
        
        console.log("confirmed_by :: " + JSON.stringify(details) );
        while (this.gatepassGateout_details.length) 
        this.gatepassGateout_details.removeAt(0);
      
        for(let i=0;i<details.length;i++)
        {
          this.addgatepass_checklist_out()
          this.gatepassGateout_details.at(i).patchValue({sl_no:details[i]["sl_no"],
            checkbox:true,
            checklist_code:details[i]["checklist_code"],
            checkin:details[i]["checkin"],
            description:details[i]["description"]});
        }
      });

    });
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl;         
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
    this.submitted = true;
    this.status=false;

    if(this.userForm.get("vechileid").value =='' ||this.userForm.get("vechileid").value ==null  || this.userForm.get("vechileid").value =='0' )
    {
      alert("Please Select Vehicle Number !!!!!!!");
      this.status=true;
    }
    else
    {
          if(this.Id>0)
          {

          
          }
          else
          {
              this.Service.creategatepassGetout(this.userForm.getRawValue()).subscribe(data => 
              {
                
                alert("New Gate Pass Get Out has been created successfully.");
                
                this.userForm.reset(); 
                this.isHidden = false;
                this.DropDownListService.getVehicleListgatepassout().subscribe(vehicleData=>
                  {
                    this.veh_nos=vehicleData;
                  })
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
              alert("something error is occured in New Gate Pass Get Out !!! please Reload the page and  try again....");
              });    
            }
      }      
  }

  onUpdate(id, gp_go_id, action)
    {
      this.userForm.patchValue({id: id});	
      this.status = false;
      this.isHidden = true;
       if(action == 'view')
       {this.action = 'view';}
      
     
      forkJoin(
        this.DropDownListService.retriveGatepassGateOut(id),
        this.DropDownListService.retriveGatepassGateOutDetails(gp_go_id)
    
      ).subscribe(([gatepassGateout,gatepassGateoutDetails])=>
        {

          this.userForm.patchValue({id: gatepassGateout["id"],vechileid: gatepassGateout["vechileid"], confirmed_by: gatepassGateout["confirmed_by"],
          remarks: gatepassGateout["remarks"],gatepass_confirmed_by:gatepassGateout["gatepass_confirmed_by"]});

           console.log("itemData: "+  JSON.stringify(gatepassGateoutDetails));
          
       
              while (this.gatepassGateout_details.length) 
              this.gatepassGateout_details.removeAt(0);
            
              for(let i=0;i<gatepassGateoutDetails.length;i++)
              {
                this.addgatepass_checklist_out()
                this.gatepassGateout_details.at(i).patchValue({sl_no:gatepassGateoutDetails[i]["sl_no"],
                  checkbox:true,
                  checklist_code:gatepassGateoutDetails[i]["checklist_code"],
                  checkin:gatepassGateoutDetails[i]["checkin"],
                  description:gatepassGateoutDetails[i]["description"]});
              }

           

             this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});                              
        } 

}
