import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Production_planning , Production_Planning_shop_floor_dtls} from '../../../../../../Models/ProductionModel/ProductionPlanningModel';
import { FormControl,FormArray } from '@angular/forms';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { PeriodicDatePopupComponent } from '../../components/periodic-date-popup/periodic-date-popup.component';
import { SpecialDatePopupComponent } from '../../components/special-date-popup/special-date-popup.component';

@Component({
  selector: 'app-production-planning',
  templateUrl: './production-planning.component.html',
  styleUrls: ['./production-planning.component.scss']
})
export class ProductionPlanningComponent implements OnInit {

  submitted = false;
  model: Production_planning = new Production_planning();
  model1: Production_Planning_shop_floor_dtls = new Production_Planning_shop_floor_dtls();
  listProduction_planning: Production_planning[];
  public userForm:FormGroup;
  isHidden=false;
  isHide=false;
  isHideSend=false;
  shop_floor_sl_no = 1; 
  special_shop_floor_sl_no = 1; 
  isPackingListReq:any = [];
  status = false;
  isRatio=false;
  processlist:any = [];
  ProductionList:any = [];
  SpecialProductionList:any = [];
  rationapplicablelist:any=[];
  bussiness_unit_list:any=[];
  company_name:any;
  seq_no:any;
  isActive=false;
  isActive1=false;
  isActive2=false;
  datelist:any=[];
  prod_idset:any;
  prod_idset1:any;
  prod_codeset:any;
  isHide1=false;
  editable: boolean = false;
  productionplanningsave:boolean = true;
  productionplanningupdate:boolean = true;
  ShopFloorspecial:any = [];

  constructor(
    public fb:FormBuilder,
    public dialog: MatDialog,
    private Service : Master,
    private DropDownListService: DropdownServiceService) 
    { 
    this.userForm=fb.group({
      id :[''],
      prod_plan_code: [''],   
      prod_plan_id:[''],
      business_unit: [''],
      pred_from: [''],
      pred_to:[''],
      company_id:[''],
      fin_year:[''],
      prod_plan_desc:[''],
      username:[''],

      production_planning_shop_floor_dtls: this.fb.array([this.fb.group({
        sl_no:this.shop_floor_sl_no,
        shop_floor:'',
        active:'',
        process:'',
        production:'',
        process_date:'',
        shift:'',
        //hidden
        prod_plan_id:'',
        ppd_id:'',

        
        
    })]),

    production_planning_special_dtls: this.fb.array([this.fb.group({
      sl_no:this.special_shop_floor_sl_no,
      shop_floor:'',
      active:'',
      process:'',
      production:'',
      process_date:'',
      prod_plan_id:'',
      pps_id:''
     
  })]),
    
  });
}

 get id(){ return this.userForm.get("id") as FormControl }
 get prod_plan_code(){ return this.userForm.get("prod_plan_code") as FormControl }
 get prod_plan_id(){ return this.userForm.get("prod_plan_id") as FormControl }
 get business_unit(){ return this.userForm.get("business_unit") as FormControl }
 get pred_from(){ return this.userForm.get("pred_from") as FormControl }   get payterm_active(){ return this.userForm.get("payterm_active") as FormControl }
 get pred_to(){ return this.userForm.get("pred_to") as FormControl }
 get prod_plan_desc(){ return this.userForm.get("prod_plan_desc") as FormControl }
 get company_id(){ return this.userForm.get("company_id") as FormControl }
 get fin_year(){ return this.userForm.get("fin_year") as FormControl }
 get username(){ return this.userForm.get("username") as FormControl }
 get production_planning_shop_floor_dtls() { return this.userForm.get('production_planning_shop_floor_dtls') as FormArray; }
 get production_planning_special_dtls() { return this.userForm.get('production_planning_special_dtls') as FormArray; }

 ngOnInit() 
  {
    //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"production_module";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.productionplanningsave = false;
    this.productionplanningupdate = false;
    if(accessdata.includes('production_planning.save'))
    {
     this.productionplanningsave = true;
    }
   if(accessdata.includes('production_planning.update'))
    { 
      this.productionplanningupdate=true;
    }
  
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    
    this.company_name = localStorage.getItem("company_name");
    this.isPackingListReq[0] = "false";
    this.Service.findAllProdPlanning().subscribe(data=>{
      console.log("plan list:"+JSON.stringify(data))
      this.listProduction_planning  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    //this.DropDownListService.getSequenceId("PP").subscribe(data=>{this.seq_no = data.sequenceid;});  
   // this.userForm.patchValue({business_unit:"0"});
   this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bussiness_unit_list = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
   this.ngOnInit()});      
    this.status = true;
  }

  showList(s:string)
    {
      if(this.productionplanningsave == true  && this.productionplanningupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.productionplanningsave == true  && this.productionplanningupdate == false)
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
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id :[''],
        prod_plan_code: [''],   
        prod_plan_id:[''],
        business_unit: [''],
        pred_from: [''],
        pred_to:[''],
        company_id:[''],
        fin_year:[''],
        prod_plan_desc:[''],
        username:[''],

     production_planning_shop_floor_dtls: this.fb.array([this.fb.group({
        sl_no:this.shop_floor_sl_no,
        shop_floor:'',
        active:'',
        process:'',
        production:'',
        process_date:'',
        shift:'',
        prod_plan_id:'',
        ppd_id:'',
      
       })]),

        production_planning_special_dtls: this.fb.array([this.fb.group({
          sl_no:this.special_shop_floor_sl_no,
          shop_floor:'',
          active:'',
          process:'',
          production:'',
          process_date:'',
          prod_plan_id:'',
          pps_id:''
          })]),
      });
    }

    add() 
    {
      this.shop_floor_sl_no =this.shop_floor_sl_no +1;
      this.production_planning_shop_floor_dtls.push(this.fb.group({
        sl_no:this.shop_floor_sl_no,	
        shop_floor:'',
        active:'',
        process:'',
        production:'',
        process_date:'',
        shift:'',
        prod_plan_id:this.prod_idset,
        ppd_id:'',
       
      })); 

    }  

    delete(index) 
    {
      if(this.shop_floor_sl_no > 1)
      { 
        this.production_planning_shop_floor_dtls.removeAt(index);
        this.shop_floor_sl_no = this.shop_floor_sl_no - 1;
      }
      else
      {
        this.shop_floor_sl_no = 1;    
        alert("can't delete all rows");
        this.production_planning_shop_floor_dtls.at(0).patchValue({sl_no:  this.shop_floor_sl_no});
       
      } 
       for(let i=1; i<=this.shop_floor_sl_no; i++)
       this.production_planning_shop_floor_dtls.at(i-1).patchValue({sl_no: i});   
     }


     add1() 
     {
       this.special_shop_floor_sl_no =this.special_shop_floor_sl_no +1;
       this.production_planning_special_dtls.push(this.fb.group({
         sl_no:this.special_shop_floor_sl_no,	
         shop_floor:'',
         active:'',
         process:'',
         production:'',
         process_date:'',
         prod_plan_id:this.prod_idset1,
         pps_id:''
        }));   
     }  
 
     delete1(index) 
     {
       if(this.special_shop_floor_sl_no > 1)
       { 
         this.production_planning_special_dtls.removeAt(index);
         this.special_shop_floor_sl_no = this.special_shop_floor_sl_no - 1;
       }
       else
       {
         this.special_shop_floor_sl_no = 1;    
         alert("can't delete all rows");
         this.production_planning_special_dtls.at(0).patchValue({sl_no:  this.special_shop_floor_sl_no});
        
       } 
        for(let i=1; i<=this.special_shop_floor_sl_no; i++)
        this.production_planning_special_dtls.at(i-1).patchValue({sl_no: i});   
      }

  check(event:string,index)
  {
    if(event=='A')
    {
     this.isActive=true;
    // window.alert(event);
     
    }
   if(event=='B'){
      this.isActive=false;
    }
  }

  check1(event:string,index)
  {
    if(event=='A')
    {
     this.isActive1=true;
    // window.alert(event);
     
    }
   if(event=='B'){
      this.isActive1=false;
    }
  }

  businessUnit:any;
  ShopFloor:{};
  onChangeBussinessUnit(buss_id:String, operation)
    {
      this.ShopFloor = []
      this.processList = [];  
      this.SpecialprocessList = [];
      this.businessUnit = buss_id;
      if(buss_id != '0')
      {
       
        this.status = false;
        forkJoin(
          //this.DropDownListService.getShopFloorThruBU(buss_id),
          this.DropDownListService.getShopFloorThruBUregular(buss_id),
          this.DropDownListService.getShopFloorspecialThruBU(buss_id)
        ).subscribe(([ShopFloorData,speclial])=>
          {
            this.ShopFloor = ShopFloorData; 
            this.ShopFloorspecial=speclial;
            //ShopFloorspecial
            this.status=true;
          });

         this.DropDownListService.getPPSequenceId(buss_id,this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}); 
      }
    }

    onChangeBussinessUnit1(buss_id:String, operation)
    {
      this.ShopFloor = []
      this.processList = [];  
      this.SpecialprocessList = [];
      this.businessUnit = buss_id;
      if(buss_id != '0')
      {
       
        this.status = false;
        forkJoin(
          //this.DropDownListService.getShopFloorThruBU(buss_id),
          this.DropDownListService.getShopFloorThruBUregular(buss_id),
          this.DropDownListService.getShopFloorspecialThruBU(buss_id)
        ).subscribe(([ShopFloorData,speclial])=>
          {
            this.ShopFloor = ShopFloorData; 
            this.ShopFloorspecial=speclial;
            //ShopFloorspecial
            this.status=true;
          });

         //this.DropDownListService.getPPSequenceId(buss_id,this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}); 
      }
    }


    Procss:any;
    Production:any;
    b_unit:any;
    processList:any=[];
    SpecialprocessList:any=[];
    onChangeShopFloor(event, index)
    {this.Procss = this.production_planning_shop_floor_dtls.at(index).get("process").value as FormControl;
    this.Production = this.production_planning_shop_floor_dtls.at(index).get("production").value as FormControl; 
    this.b_unit = this.userForm.get("business_unit").value as FormControl;
      this.company_name = localStorage.getItem("company_name");
      this.status = false;
      this.DropDownListService.getProcessThruBUShopFloor("bunit="+this.b_unit+"&sfloor="+event+
      "&company="+this.company_name).subscribe(data=>
      {
        this.processList[index] = data;
        this.status = true;
      });  
      // alert(event+"index :"+index+ "process :"+this.Procss +"Production :"+this.Production);
      if(event !='0')
      {
        this.checkUniqueProduction(index, event, this.Procss, this.Production);
      }
      // this.DropDownListService.getProcessThruBUShopFloorSpl("bunit="+this.b_unit+"&sfloor="+event+
      // "&company="+this.company_name).subscribe(data=>
      // {
      //   this.SpecialprocessList[index] = data;
      // });  
    }

    onChangeShopFloor1(S_floor:string,index)
    {this.Procss = this.production_planning_shop_floor_dtls.at(index).get("process").value as FormControl;
    this.Production = this.production_planning_shop_floor_dtls.at(index).get("production").value as FormControl; 
    this.b_unit = this.userForm.get("business_unit").value as FormControl;
      this.company_name = localStorage.getItem("company_name");
      this.status = false;
      this.DropDownListService.getProcessThruBUShopFloor("bunit="+this.b_unit+"&sfloor="+S_floor+
      "&company="+this.company_name).subscribe(data=>
      {
        this.processList[index] = data;
        this.status = true;
      });  
      // alert(event+"index :"+index+ "process :"+this.Procss +"Production :"+this.Production);
      if(S_floor !='0')
      {
        this.checkUniqueProduction(index, S_floor, this.Procss, this.Production);
      }
      // this.DropDownListService.getProcessThruBUShopFloorSpl("bunit="+this.b_unit+"&sfloor="+event+
      // "&company="+this.company_name).subscribe(data=>
      // {
      //   this.SpecialprocessList[index] = data;
      // });  
    }

    onChangeSpecialShopFloor(event, index)
    {
      this.b_unit = this.userForm.get("business_unit").value as FormControl;
      this.company_name = localStorage.getItem("company_name");
      this.status = false; 

      this.DropDownListService.getProcessThruBUShopFloorSpl("bunit="+this.b_unit+"&sfloor="+event+
      "&company="+this.company_name).subscribe(data=>
      {
        this.SpecialprocessList[index] = data;
        this.status = true;
      });  
    }

    Produc:any;
    Shoop_Floor:any;
    onChangeProcess(event, index)
    { 
      this.Produc = this.production_planning_shop_floor_dtls.at(index).get("production").value as FormControl; 
      this.b_unit = this.userForm.get("business_unit").value as FormControl;
      this.Shoop_Floor = this.production_planning_shop_floor_dtls.at(index).get("shop_floor").value as FormControl;
      this.company_name = localStorage.getItem("company_name");
      this.status = false;
      if(this.b_unit && this.Shoop_Floor && this.company_name && event !='0')
      {
        this.DropDownListService.getBomThruProcess("bunit="+this.b_unit+"&sfloor="+this.Shoop_Floor+
        "&process="+event+"&company="+this.company_name).subscribe(data=>
        {
          this.ProductionList[index] = data;
          this.status = true;
        });
      }  
      if(event !='0')
      {
        this.checkUniqueProduction(index,  this.Shoop_Floor, event, this.Produc);
      } 
  }


  onChangeProcess1(Process:string,ShoopFloor:string ,index)
    { 
      this.Produc = this.production_planning_shop_floor_dtls.at(index).get("production").value as FormControl; 
      this.b_unit = this.userForm.get("business_unit").value as FormControl;
      //this.Shoop_Floor = this.production_planning_shop_floor_dtls.at(index).get("shop_floor").value;
      this.company_name = localStorage.getItem("company_name");
      this.status = false;
       console.log(this.b_unit + " // " +  ShoopFloor + " // " + Process +" // " +this.company_name )
      this.DropDownListService.getBomThruProcess("bunit="+this.b_unit+"&sfloor="+ShoopFloor+
      "&process="+Process+"&company="+this.company_name).subscribe(data=>
      {
        console.log("check tuhin " + JSON.stringify(data))
        this.ProductionList[index] = data;
        this.status = true;
      });
    
     
      //this.checkUniqueProduction(index,  this.Shoop_Floor, Process, this.Produc);
      
  }

   ShopFlor:any;
   Procs:any;
    onChangeProduction(event, index)
      {
        this.ShopFlor = this.production_planning_shop_floor_dtls.at(index).get("shop_floor").value as FormControl; 
        this.Procs = this.production_planning_shop_floor_dtls.at(index).get("process").value as FormControl; 
        if(event !='0')
         {
          this.checkUniqueProduction(index,  this.ShopFlor, this.Procs, event);
         }
      }

    onChangeSpecialProcess(event, index)
    { 
      this.b_unit = this.userForm.get("business_unit").value as FormControl;
      this.Shoop_Floor = this.production_planning_special_dtls.at(index).get("shop_floor").value as FormControl;
      this.company_name = localStorage.getItem("company_name");
      this.status = false;
      if(this.b_unit && this.Shoop_Floor && this.company_name && event !='0')
      {
      this.DropDownListService.getBomThruProcess("bunit="+this.b_unit+"&sfloor="+this.Shoop_Floor+
      "&process="+event+"&company="+this.company_name).subscribe(data=>
      {
        this.SpecialProductionList[index] = data;
        this.status = true;
      });
    }    
    }

    onChangeSpecialProcess1(Proc,ShoopFloor ,index)
    { 
      this.b_unit = this.userForm.get("business_unit").value as FormControl;
      
      this.company_name = localStorage.getItem("company_name");
    
      this.DropDownListService.getBomThruProcess("bunit="+this.b_unit+"&sfloor="+ShoopFloor+
      "&process="+Proc+"&company="+this.company_name).subscribe(data=>
      {
        this.SpecialProductionList[index] = data;
        this.status = true;
      });
       
    }

    // showDate(index) 
    // {
    
    //     let dialogref=this.dialog.open(PeriodicDatePopupComponent);
    //     dialogref.afterClosed().subscribe(result => {});
    // }

    popup_data:any=[];
    popup_data1:any=[];
    Process:any;
    Prod_P_Id:any;
    Ppd_Id:any; ppd_id
    
    showDate(index)
    {

      this.Id= this.userForm.get("id").value as FormControl;
      this.Prod_P_Id= this.userForm.get("prod_plan_id").value as FormControl;
      this.Ppd_Id= this.production_planning_shop_floor_dtls.at(index).get("ppd_id").value as FormControl;

      // if(this.Id>0)
      // {
        this.startDate=this.userForm.get("pred_from").value as FormControl; 
        this.stopDate=this.userForm.get("pred_to").value as FormControl;
        let company_name = localStorage.getItem("company_name");
        let BUunit = this.userForm.get("business_unit").value as FormControl;
        let Shoop_Floor = this.production_planning_shop_floor_dtls.at(index).get("shop_floor").value as FormControl;
        let _Production = this.production_planning_shop_floor_dtls.at(index).get("production").value as FormControl;
        let Process = this.production_planning_shop_floor_dtls.at(index).get("process").value as FormControl;
        let Con_value = this.production_planning_shop_floor_dtls.at(index).get("process_date").value as FormControl;
        let updt =this.updt;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {index: index,StopDate: this.stopDate ,StartDate: this.startDate,Con_value:Con_value,_Production:_Production,updt:updt,Ppd_Id:this.Ppd_Id,
                             BUunit:BUunit,Shoop_Floor:Shoop_Floor,Process:Process,company_name:company_name, Id:this.Id, Prod_P_Id: this.Prod_P_Id};
        const dialogRef = this.dialog.open(PeriodicDatePopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe( data => 
        {
  
           this.popup_data = data;

           if(data['popupstatus']=='saving')
           {
            
            console.log("before: "+ JSON.stringify (data));
            delete data['popupstatus'];
            let StrJsonData =JSON.stringify(data);
            console.log("after: "+StrJsonData);
            this.production_planning_shop_floor_dtls.at(index).patchValue({process_date:StrJsonData});
            this.UpdateIsRow(index);
           }
           else{
           
           }
           
        }); 
        //alert("Update");

    //  }
    //   else
    //     {
    //   this.startDate=this.userForm.get("pred_from").value as FormControl; 
    //   this.stopDate=this.userForm.get("pred_to").value as FormControl;
    //   let company_name = localStorage.getItem("company_name");
    //   let BUunit = this.userForm.get("business_unit").value as FormControl;
    //   let Shoop_Floor = this.production_planning_shop_floor_dtls.at(index).get("shop_floor").value as FormControl;
    //   let Process = this.production_planning_shop_floor_dtls.at(index).get("process").value as FormControl;
    
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = true;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.data = {index: index,StopDate: this.stopDate ,StartDate: this.startDate,
    //                        BUunit:BUunit,Shoop_Floor:Shoop_Floor,Process:Process,company_name:company_name};
    //   const dialogRef = this.dialog.open(PeriodicDatePopupComponent, dialogConfig);
    //   dialogRef.afterClosed().subscribe( data => 
    //   {

    //      this.popup_data = data;
         
    //      let StrJsonData =JSON.stringify(data);
    //      this.production_planning_shop_floor_dtls.at(index).patchValue({process_date:StrJsonData});
        
    //     //this.production_planning_shop_floor_dtls
    //      console.log("After closed"+JSON.stringify(data));
    //     // this.UpdateIsRow1(index);
    //   }); 
    // }
    }

    // Pps_Id:any;
    // showDate1(index)
    // {
    //   this.Pps_Id= this.production_planning_special_dtls.at(index).get("pps_id").value as FormControl;
    //   this.Id= this.userForm.get("id").value as FormControl;
    //   this.Prod_P_Id= this.userForm.get("prod_plan_id").value as FormControl;

    //   // if(this.Id>0)
    //   // {
    //   let updt =this.updt;
    //   this.startDate=this.userForm.get("pred_from").value as FormControl; 
    //   this.stopDate=this.userForm.get("pred_to").value as FormControl;
    //   let company_name = localStorage.getItem("company_name");
    //   let BUunit = this.userForm.get("business_unit").value as FormControl;
    //   let Shoop_Floor = this.production_planning_special_dtls.at(index).get("shop_floor").value as FormControl;
    //   let Process = this.production_planning_special_dtls.at(index).get("process").value as FormControl;
    //   let Con_value = this.production_planning_special_dtls.at(index).get("process_date").value as FormControl;

    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = true;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.data = {index: index,StopDate: this.stopDate ,StartDate: this.startDate,Id:this.Id, Prod_P_Id: this.Prod_P_Id,Pps_Id:this.Pps_Id,
    //                        BUunit:BUunit,Shoop_Floor:Shoop_Floor,Process:Process,company_name:company_name,Con_value:Con_value,updt:updt};
    //   const dialogRef = this.dialog.open(SpecialDatePopupComponent, dialogConfig);
    //   dialogRef.afterClosed().subscribe( data => 
    //   {

    //      this.popup_data1 = data;

    //      if(data['popupstatus']=='saving')
    //      {

    //       delete data['popupstatus'];
    //       let StrJsonData =JSON.stringify(data);
    //       this.production_planning_special_dtls.at(index).patchValue({process_date:StrJsonData});
    //       console.log("After closed"+JSON.stringify(data));
    //       this.UpdateIsRow1(index);

    //     }
    //     else
    //       {
          
    //       }
    //   }); 
    // // }
    // }




    days:any
  startDate:any;
  stopDate:any;
  dateArray:any=[];
  currentDate:any;
  splittedCompamyName :any;
 // rationapplicablelist:any=[];

 finyear:any;splittedYear=[];
 startingDate:any;
 endingDate:any;
  onChangeIndentDate()
  {
    this.finyear=localStorage.getItem("financial_year");
    var splittedYear = this.finyear.split("-", 2);
    this.startingDate = splittedYear[0]+"-04-01";this.endingDate=splittedYear[1]+"-03-31";
    //alert("Starting Year: "+this.startingDate +" Ending Year: "+this.endingDate);

   // window.alert(event.target.value);
   this.startDate=this.userForm.get("pred_from").value as FormControl; 
   this.stopDate=this.userForm.get("pred_to").value as FormControl; 
   //this.stopDate=event.target.value;
    if(this.startDate <= this.endingDate && this.startDate>=this.startingDate)
    {

      if(this.stopDate< this.startDate)
        {
          alert("Please choose Period properly");
          this.userForm.patchValue({pred_to:null});
        }
    }
    else
    {
      alert("Please choose Period From between "+this.finyear+" financial year!!!");//correct properly
      this.userForm.patchValue({pred_from:null});
    }

    if(this.stopDate <= this.endingDate && this.stopDate>=this.startingDate)
    {
      if(this.stopDate< this.startDate)
        {
          alert("Please choose Period properly");
          this.userForm.patchValue({pred_from:null});
        }
    }
    else
    {
      alert("Please choose Period To between "+this.finyear+" financial year!!!");//correct properly
      this.userForm.patchValue({pred_to:null});
    }

   this.datelist=[];
   this.dateArray=[];
    
     this.currentDate = moment(this.startDate);
    this.stopDate = moment(this.stopDate);
    while (this.currentDate <= this.stopDate) {
        this.dateArray.push( moment(this.currentDate).format('DD-MM-YYYY') )
       this.currentDate = moment(this.currentDate).add(1, 'days');
    }
    this.datelist=this.dateArray;
console.log("hello"+this.startDate)
   this.DropDownListService.checkdaterangeupdate(this.startDate).subscribe(data=>
      {
          if(Number(data["id"])>0)
          {
            this.onUpdate(data["id"],data["prod_plan_id"],"update");
          }
          else
          {
           // while (this.production_planning_shop_floor_dtls.length)
           // this.production_planning_shop_floor_dtls.removeAt(0);
           // this.add1();
          }

      });
   


  }

  isChecked1 = false;
  isChecked = false;
  updt="insert";
  onUpdate(id:any, prod_plan_id:string, action)
  {
    this.productionplanningsave=true;
    this.isHide = true;
    this.processList=[];
    this.userForm.patchValue({id: id});	
    this.status = false;
    this.isActive=true;
    this.isActive1=true;
    this.isHidden = true;
    this.updt="update";

   // this.packingItem = [];
   
    forkJoin(
      this.Service.retriveProdPlanning(id),
      this.Service.getProdPlanFloorDtls(prod_plan_id),   
      this.Service.getProdPlanSpecialDtls(prod_plan_id),         
  
    ).subscribe(([ProPlanData,ShoopFloorDtls, SpecialData])=>
      {
    
       
        // this.onChangeIndentDate();
        this.userForm.patchValue({id: ProPlanData["id"],prod_plan_code: ProPlanData["prod_plan_code"], prod_plan_id: ProPlanData["prod_plan_id"],
        business_unit: ProPlanData["business_unit"],pred_from: ProPlanData["pred_from"], pred_to: ProPlanData["pred_to"],
        prod_plan_desc: ProPlanData["prod_plan_desc"], company_id: ProPlanData["company_id"], fin_year: ProPlanData["fin_year"],
        username: ProPlanData["username"]});
          console.log("ProPlanData Details: "+  JSON.stringify(ProPlanData));
          this.onChangeBussinessUnit1(ProPlanData["business_unit"],'update');

        this.add();
        this.shop_floor_sl_no = 0; 
        while (this.production_planning_shop_floor_dtls.length)
        this.production_planning_shop_floor_dtls.removeAt(0);
        this.check('A',0);
        let i=0;
        for(let data1 of ShoopFloorDtls)
        {
      
          this.add();
          this.onChangeShopFloor1(data1["shop_floor"], i);

          this.onChangeProcess1(data1["process"],data1["shop_floor"], i);
          this.prod_idset = ProPlanData["prod_plan_id"];
          this.production_planning_shop_floor_dtls.at(i).patchValue(data1);
          i++;
          console.log("ShoopFloorDtls: "+JSON.stringify(data1));
        }

        
        console.log("this.prod_idset: "+this.prod_idset)
        this.prod_idset1  = ProPlanData["prod_plan_id"];
        this.add1();
        this.special_shop_floor_sl_no = 0;
        while (this.production_planning_special_dtls.length)
        this.production_planning_special_dtls.removeAt(0);
        this.check('A',0);
        let k =0;
        for(let data1 of SpecialData)
        {
          this.add1();
          this.onChangeSpecialShopFloor(data1["shop_floor"], k);
          this.onChangeSpecialProcess1(data1["process"], data1["shop_floor"],k);
          //this.prod_idset1 = data1["prod_plan_id"];
          this.prod_idset1  = ProPlanData["prod_plan_id"];
         this.production_planning_special_dtls.at(k).patchValue(data1);
         k++;
          console.log("SpecialData: "+JSON.stringify(data1));
        }
            this.isChecked1 = true;
            this.isChecked = true;
            
           this.status = true;

       }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
       this.ngOnInit()});                            
      }

      Ppl_Id:any;
      SlNo:any;
      UpdateIsRow(index)
        {
          this.status = false;

       
          const JsonValueofRow = (<FormArray>this.userForm.get('production_planning_shop_floor_dtls')).at(index);
         
          if(this.updt=="insert")
          {
            console.log("JsonValueofRowrr"+JSON.stringify(JsonValueofRow.value));
          this.Service.createProdPlanningRegular(JsonValueofRow.value).subscribe(data => 
          {
            this.status = true;
            alert("Current Process is Saved successfully."); 

            this.isHidden = false;
            this.showList("list");
            this.Service.findAllProdPlanning().subscribe(data=>{this.listProduction_planning  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});

          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});   
        }

        else if(this.updt=="update")
        {
          

         
           this.Ppl_Id = this.production_planning_shop_floor_dtls.at(index).get("prod_plan_id").value as FormControl;
           this.SlNo = this.production_planning_shop_floor_dtls.at(index).get("sl_no").value as FormControl;
         
          
          this.Service.updateProdPlanningRegular(JsonValueofRow.value,this.Ppl_Id,this.SlNo).subscribe(data => 
            {
              console.log(this.userForm.value);
              this.status = true;   
              alert("Current Process updated successfully.");
              // this.userForm.reset();
              //refresh List;
             
              this.isHidden = false;
              this.showList("list");  
              this.Service.findAllProdPlanning().subscribe(data=>{this.listProduction_planning  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});

            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});     
          }

        }


        UpdateIsRow1(index)
        {
          this.status = false;

        // const group=this.fb.group({
        //   sl_no:this.production_planning_shop_floor_dtls.at(index).get("sl_no").value ,
        //   shop_floor:this.production_planning_shop_floor_dtls.at(index).get("shop_floor").value,
        //   active:this.production_planning_shop_floor_dtls.at(index).get("active").value,
        //   process:this.production_planning_shop_floor_dtls.at(index).get("process").value,
        //   production:this.production_planning_shop_floor_dtls.at(index).get("production").value,
        //   process_date:this.production_planning_shop_floor_dtls.at(index).get("process_date").value,
        //   shift:this.production_planning_shop_floor_dtls.at(index).get("shift").value,
        //   prod_id:this.production_planning_shop_floor_dtls.at(index).get("prod_id").value,
        //   prod_code:this.production_planning_shop_floor_dtls.at(index).get("prod_code").value
        //   });
          const JsonValueofRow = (<FormArray>this.userForm.get('production_planning_special_dtls')).at(index);;
         
          if(this.updt=="insert")
          {
          console.log("JsonValueofRow: "+JsonValueofRow.value);
          this.Service.createProdPlanningSpl(JsonValueofRow.value).subscribe(data => 
          {
            this.status = true;
            alert("Current Process is Saved successfully."); 
              
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});   
         }

        else if(this.updt=="update")
        {
           this.Ppl_Id = this.production_planning_special_dtls.at(index).get("prod_plan_id").value as FormControl;
           this.SlNo = this.production_planning_special_dtls.at(index).get("sl_no").value as FormControl;
         
          this.Service.updateProdPlanningSpl(JsonValueofRow.value,this.Ppl_Id,this.SlNo).subscribe(data => 
            {
              console.log(this.userForm.value);
              this.status = true;   
              alert("Current Process updated successfully.");
              // this.userForm.reset();
              //refresh List;
            
             // this.isHidden = false ;     
                           
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});     
          }

        }
       
      

  Id:any;
  Prod_Plan_id:any;
  send(id:any, value:any)
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
      if(this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
      {
        alert("Please Select Bussiness Unit Name");
        this.status=true;
      }
      else if(this.userForm.get("prod_plan_desc").value == null || this.userForm.get("prod_plan_desc").value == 0)
      {
        alert("Please Enter Description Name");
        this.status=true;
      }
      else if(this.userForm.get("pred_from").value == null || this.userForm.get("pred_from").value == 0)
      {
        alert("Please Select Period From");
        this.status=true;
      }
      else if(this.userForm.get("pred_to").value == null || this.userForm.get("pred_to").value == 0)
      {
        alert("Please Select Period To");
        this.status=true;
      }
      else
      {
        if(this.Id>0)
        {
          this.status = false;
          this.Service.updateProdPlanning(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Production Planning updated successfully.");
            // this.userForm.reset();
            //refresh List;
            this.ngOnInit(); 
           // this.isHidden = false ;     
            this.status = true;                
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});   
        }
        else
          {
            this.status = false;
           // this.userForm.patchValue({prod_plan_code:this.seq_no});
            this.Service.createProdPlanning(this.userForm.getRawValue()).subscribe(data => 
            {

              console.log("First time save"+JSON.stringify(data));
              alert("Production Planning created successfully."); 
              this.userForm.reset();

              this.userForm.patchValue({id:data["id"],prod_plan_id:data["prod_plan_id"],
              prod_plan_code:data["prod_plan_code"],business_unit:data["business_unit"],business_unitname:data["business_unitname"],
              pred_from:data["pred_from"],pred_to:data["pred_to"],prod_plan_desc:data["prod_plan_desc"],company_id:data["company_id"],
              fin_year:data["fin_year"],username:data["username"]}); 

             this.production_planning_shop_floor_dtls.at(0).patchValue({sl_no:this.shop_floor_sl_no});
             this.production_planning_special_dtls.at(0).patchValue({sl_no:this.special_shop_floor_sl_no});

            this.prod_idset = data["prod_plan_id"];
            this.prod_idset1 = data["prod_plan_id"];

              this.status = true;   
              this.isHide = true;  
              this. isActive2=true;
              this. isHide1=true;
              this.editable = true;
                           
            }, (error) => {
              this.status=true;
              console.log("ERROR get: "+JSON.stringify(error));
              alert("something error is occured please try again....");
           // this.ngOnInit()
          });    
           
          }
      } 
    }
  }

  checkUniqueProduction(index,ShoopFloor,Procss,Production)
        {
          // this.ShoopFloor = this.production_planning_shop_floor_dtls.at(index).get("shop_floor").value as FormControl;
          // this.Procss = this.production_planning_shop_floor_dtls.at(index).get("process").value as FormControl;
          // this.Production = this.production_planning_shop_floor_dtls.at(index).get("production").value as FormControl;

          if(ShoopFloor !='0' && Procss !=null && Production !=null)
            {
              for(let i=0; i<this.production_planning_shop_floor_dtls.length;i++)
              {
                if(ShoopFloor ==this.production_planning_shop_floor_dtls.at(i).get("shop_floor").value && 
                 Procss == this.production_planning_shop_floor_dtls.at(i).get("process").value &&
                 Production == this.production_planning_shop_floor_dtls.at(i).get("production").value &&
                 i <index )
                  {
                    window.alert("Duplicate Row");
                    this.delete(index);
                  }
              }
            }
       
        }

        onDelete(id)
        {
          this.status=false;
          if(confirm("Are you sure to delete this Production Planning ?"))
          {
            
            this.userForm.patchValue({username: localStorage.getItem("username")});
            console.log(id+"raw value:"+JSON.stringify(this.userForm.getRawValue()))
            this.Service.deleteProductionPlanning(this.userForm.getRawValue(),id).subscribe(data=> 
              {
               
                alert("Production Planning Deleted successfully.");
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
            }  
        this.status=true;
      }

  // onChangeFindDate(event)
  // {
  //   this.startDate=this.userForm.get("pred_from").value as FormControl; 
  //   this.stopDate=this.userForm.get("pred_to").value as FormControl;
  //   console.log(this.startDate+','+this.stopDate);
  //   let a = moment(this.startDate);
  //   let b = moment(this.stopDate);
  //   console.log(a +','+b);
  //    this.days = b.diff(a, 'days');
  // }


}
