import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../service/master.service';
import { PlatformLocation, LocationStrategy  } from '@angular/common';
import { DropdownServiceService } from '../../service/dropdown-service.service';
import { forkJoin, timer } from 'rxjs';

@Component({
  selector: 'app-company-financial',
  templateUrl: './company-financial.component.html',
  styleUrls: ['./company-financial.component.scss']
})
export class CompanyFinancialComponent implements OnInit 
{
  public userForm:FormGroup;
  listCompany:{};
  UserList:any = [];
  company_name='';
  user_name='';
  User_Role="";
  financial_year="";
  invalidSubmit = false;
  submitStatus = false;
  formBuilder: any;
  route: any;
  status: boolean;
  RoleList:any=[];
  url:string;
  svalue='';
  sid='';
  sno='';
  saction='';
  FinyearList:any=[];


  finyearlock:boolean=false;

  constructor(private Service: Master, private router: Router,
    private loginservice: AuthenticationService,  private location: PlatformLocation,private DropDownListService: DropdownServiceService) 
  {
    history.pushState(null, null, null);
    location.onPopState(() => 
    {
      this.url = JSON.stringify(window.location);
      if(this.url.includes("companyFinancial"))
      history.pushState(null, null, null);});
    }

    
  ngOnInit() 
  {
    this.svalue='false';
    this.user_name = localStorage.getItem("username");
   //  this.financial_year="2023-2024";
    forkJoin(
      this.DropDownListService.getRolesThruUserId("user="+this.user_name),
      this.DropDownListService.getfinyearlist()
      ).subscribe(([data,finyearlist])=>
      {

        this.RoleList = data;
        this.User_Role=data[0]["role_id"];
        this.OnchangeRole(data[0]["role_id"]);
        if( this.user_name == 'JITESH' || this.user_name == 'ANUJ' || this.user_name == 'RADHIKA' || this.user_name == 'KHUSBOO' || this.user_name == 'superaayog' || this.user_name == 'Ashaw' || this.user_name == 'Nidhi')
        {
          this.finyearlock=true;
          this.FinyearList=finyearlist;
         // this.financial_year="2023-2024";
          let allfin:any=[];
           allfin=finyearlist;
           allfin.forEach(element => {
            if(element.year_active)
            {
              this.financial_year=element.finyear;
            }
           });
         
        }
        else
        {
          this.finyearlock=false;
           let allfin:any=[];
           allfin=finyearlist;
           allfin.forEach(element => {
            if(element.year_active)
            {
              this.FinyearList.push(element);
              this.financial_year=element.finyear;
            }
            
           });

          //this.FinyearList=finyearlist;
          //this.financial_year="2023-2024";
        }


      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});


    this.status = false; 
    this.Service.getCompanies().subscribe(data=>
    {
      this.listCompany  = data; 
      this.company_name="CM00001";
     // console.log(JSON.stringify(data))
      this.status = true; 
    }),
    (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit();}
    
  }


  user_role="";
  username="";
  menu="";
  OnchangeRole(Role:String)
  {

    this.user_role=localStorage.getItem("user_role");
    this.username=localStorage.getItem("username");
    this.DropDownListService.getUserRoles("user="+this.username+"&role="+Role).subscribe(data=>{
      //this.RoleList = data;
      //console.log("get data: "+JSON.stringify(data));
      if(data)
      {
        this.menu=data["roleaccessjson"];
       
        this.menu=this.menu.replace('{\"MENU_ITEM\":','');
        
         this.menu=this.menu.substring(0,this.menu.length-1);
      localStorage.setItem("navItem",this.menu);
        //MENU_ITEM=JSON.parse(this.menu);
       // console.log(JSON.stringify(MENU_ITEM)+"get nav item: "+JSON.stringify(JSON.parse(this.menu)));
       // this.getNodePath(MENU_ITEM);
      }
    }, (error) => {console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    });

  }
  businessunitlist:any=[];
  submit()
  {
    this.status = false;
    timer(10000).subscribe
    (x=>
    {
      if(this.loginservice.authenticateCompany(this.company_name, this.financial_year,this.User_Role) == true)
      {
        forkJoin(
          this.DropDownListService.getCompanyBusinessUnits(this.company_name),
          this.DropDownListService.ledgerList(),
          this.DropDownListService.countryList(),
          this.DropDownListService.stateListByCountry("INDIA"),
          this.DropDownListService.designationList(),
          this.DropDownListService.getUserroleAccessperrole(this.User_Role),
          this.DropDownListService.getUomList(),
          this.DropDownListService.getCurrentDate()
          
        ).subscribe(([budata,ledgerdata,countrydata,statedata,designationdata,useraccessdata, uomdata, currentDate ])=>
        {
          localStorage.setItem("businessunit",JSON.stringify(budata));
          localStorage.setItem("ledgername",JSON.stringify(ledgerdata));
          localStorage.setItem("countryname",JSON.stringify(countrydata));
          localStorage.setItem("statename",JSON.stringify(statedata));
          localStorage.setItem("designationname",JSON.stringify(designationdata));
          localStorage.setItem("useraccessname",JSON.stringify(useraccessdata));
          localStorage.setItem("ALLUOM",JSON.stringify(uomdata));
          localStorage.setItem("CurrentDate",currentDate["cur_date"]);
          //console.log("Enter :: "+ JSON.stringify(currentDate));
          //console.log("GGGGG :: "+localStorage.getItem("CurrentDate"));
         

          let finsplit:any=[];
          finsplit=this.financial_year.split("-");
      
          localStorage.setItem("startfinancialdate",finsplit[0]+"-04-01");
          localStorage.setItem("endfinancialdate",finsplit[1]+"-03-31");

          //console.log("finyear tuhin :: "+this.financial_year)
          //console.log(JSON.stringify(useraccessdata))
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
       });

        this.router.navigate(['pages/index']);
        this.status = true;
      }
    }
    )  
  }
}


