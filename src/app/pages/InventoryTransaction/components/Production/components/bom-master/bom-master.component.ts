import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Production_master } from '../../../../../../Models/ProductionModel/ProductionmasterModel';
import { MatDialog } from '@angular/material';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ScrapPackingListPopupComponent } from '../scrap-packing-list-popup/scrap-packing-list-popup.component';
import { Console } from 'console';

@Component({
  selector: 'app-bom-master',
  templateUrl: './bom-master.component.html',
  styleUrls: ['./bom-master.component.scss']
})
export class BomMasterComponent implements OnInit {

  submitted = false;
  model: Production_master = new Production_master();
  listProduction_master: Production_master[];
  public userForm:FormGroup;
  isHidden=false;
  chargesIdList:{};
  status = false;
  input_sl_no = 1;
  output_sl_no = 1;
  isRatio=false;
  processlist1:any = [];
  rationapplicablelist:any=[];
  bussiness_unit_list:any=[];
  prod_uomlist:any=[];
  company_name:any;
  seq_no:string;
  customUOMs:{};
  ShopFloorList:any=[];
  item_codes:any=[];
  item_codes1:any=[];
  _weighmentUom:any;
  packingItem:any=[];
  packingItem1:any=[];
  selectedPackingItem:any=[];
  productionlist:any=[];
  isPackingListReq:any=[];
  unita:any;
  prouom:any;
  isboth=false;
  ratioIn = false;
  ratioOut = false;
  bommastersave:boolean = true;
  bommasterupdate:boolean = true;
  itemGroup:any=[];
  deviationinput:boolean=false;
  deviationoutput:boolean=false;
  showratiodevboth:boolean=true;
  inputshiftreq:boolean=false;
  outputshiftreq:boolean=false;
  procs:any;
  Id:any;


  constructor(

    public fb:FormBuilder,
    public dialog: MatDialog,
    private Service : Master,
    private DropDownListService: DropdownServiceService) 
    {
        this.userForm=fb.group({
          id :[''],
          production_code: [''],
          production_id: [''],
          prod_desc: [''],
          prod_type: [''],
          entry_mode:[''],
          io_ratio : [''],
          prod_uom : [''],
          dev_percent : [''],
          prod_process : [''],
          ratio_applicable: [''],
          applicable_charges_id: [''],
          company_id: [''],
          fin_year: [''],
          business_unit: [''],
          shop_floor: [''],
          username: [''],
          outtotratio:[''],
          totratio:[''],
          

          bom_input_details: this.fb.array([this.fb.group({
            sl_no:this.input_sl_no,
            item:'',
            packing: '',
            packing_uom: '',
            item_uom: '',
            production_uom: '',
            con_factor: '',
            uom_basedon: '',
            ratio: '',
            deviation: '',
            packing_scrap: '',
            scrap_packing: '',
            shiftreq:''
           
        })]),

        bom_output_details: this.fb.array([this.fb.group({
            sl_no:this.output_sl_no,
            item:'',
            packing: '',
            packing_uom: '',
            item_uom: '',
            production_uom: '',
            con_factor: '',
            uom_basedon: '',
            shiftreq:'',
            ratio: '',
            deviation: '',
          })]),

         bom_resource_cost: this.fb.array([this.fb.group({
            charge_name:'',
            rate_cal_method:'',
            amount:'',
            tax_rate:'',
            tax_amt:'',
            gross_amt:''
           })])
        });
     }

    get production_code(){ return this.userForm.get("production_code") as FormControl }
    get production_id(){ return this.userForm.get("production_id") as FormControl }
    get prod_desc(){ return this.userForm.get("prod_desc") as FormControl }
    get prod_type(){ return this.userForm.get("prod_type") as FormControl }  
    get io_ratio(){ return this.userForm.get("io_ratio") as FormControl }
    get prod_uom(){ return this.userForm.get("prod_uom") as FormControl }
    get dev_percent(){ return this.userForm.get("dev_percent") as FormControl }
    get prod_process(){ return this.userForm.get("prod_process") as FormControl }
    get entry_mode(){ return this.userForm.get("entry_mode") as FormControl }
    get shop_floor(){ return this.userForm.get("shop_floor") as FormControl }
    get applicable_charges_id(){ return this.userForm.get("applicable_charges_id") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }
    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get outtotratio(){ return this.userForm.get("outtotratio") as FormControl }
    get totratio(){ return this.userForm.get("totratio") as FormControl }
    get bom_input_details() { return this.userForm.get('bom_input_details') as FormArray; }
    get bom_output_details() { return this.userForm.get('bom_output_details') as FormArray; }
    get bom_resource_cost() { return this.userForm.get('bom_resource_cost') as FormArray; }

    showList(s:string)
    {
      if(this.bommastersave == true  && this.bommasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
        // this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.bommastersave == true  && this.bommasterupdate == false)
      if(s=="add")
        {
          this.isHidden=true;
        // this.userForm.reset(this.ResetAllValues().value);
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
        production_code: [''],
        production_id: [''],
        prod_desc: [''],
        prod_type: [''],
        entry_mode:[''],
        io_ratio : [''],
        prod_uom : [''],
        dev_percent : [''],
        prod_process : [''],
        ratio_applicable: [''],
        applicable_charges_id: [''],
        company_id: [''],
        fin_year: [''],
        business_unit: [''],
        shop_floor: [''],
        username: [''],
        outtotratio:[''],
        totratio:[''],

        bom_input_details: this.fb.array([this.fb.group({
          sl_no:this.input_sl_no,
          item:'',
          packing: '',
          packing_uom: '',
          item_uom: '',
          production_uom: '',
          con_factor: '',
          uom_basedon: '',
          ratio: '',
          deviation: '',
          packing_scrap: '',
          scrap_packing: '',
          shiftreq:''
      })]),

      bom_output_details: this.fb.array([this.fb.group({
          sl_no:this.output_sl_no,
          item:'',
          packing: '',
          packing_uom: '',
          item_uom: '',
          production_uom: '',
          con_factor: '',
          uom_basedon: '',
          ratio: '',
          deviation: '',
          shiftreq:''
        })]),

       bom_resource_cost: this.fb.array([this.fb.group({
          charge_name:'',
          rate_cal_method:'',
          amount:'',
          tax_rate:'',
          tax_amt:'',
          gross_amt:''
         })])
      });
    }
    
    ngOnInit() 
    {
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"production_module";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.bommastersave = false;
    this.bommasterupdate = false;
    if(accessdata.includes('bom_master.save'))
    {
     this.bommastersave = true;
    }
   if(accessdata.includes('bom_master.update'))
    { 
      this.bommasterupdate=true;
    }
  
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    
        this.isRatio=false;
        this.company_name = localStorage.getItem("company_name");
       // this.userForm.patchValue({totratio:'0.00',outtotratio:'0.00'});
        // this.DropDownListService.getBMSequenceId(this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}); 
     // this.Service.findAllBom().subscribe(data=>{this.listProduction_master  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.Service.findAllBomList().subscribe(data=>{this.listProduction_master  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      // this.userForm.patchValue({business_unit:"0"});
     // this.bom_input_details.at(0).patchValue({item_qty:"0"});
      this.DropDownListService.getChargeMasterList().subscribe(data=>{this.chargesIdList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});     
      this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bussiness_unit_list = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});      
      this.DropDownListService.getWeighmentCustomUOM().subscribe(data=>{this.customUOMs = data;this.productionlist=data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      // this.DropDownListService.getItemThruSales().subscribe(data=>{this.item_codes=data});    
      this.status = true;


     }

     addInput() 
     {
       this.input_sl_no =this.input_sl_no +1;
       this.bom_input_details.push(this.fb.group({
        sl_no:this.input_sl_no,
        item:'',
        packing: '',
        packing_uom: '',
        item_uom: '',
        production_uom: '',
        con_factor: '',
        uom_basedon: '',
        ratio: '',
        deviation: '0',
        packing_scrap: '',
        scrap_packing: '',
        shiftreq:''
      }));   
     }  
 
     deleteInput(index) 
     {
       if(this.input_sl_no > 1)
       { 
         this.bom_input_details.removeAt(index);
         this.input_sl_no = this.input_sl_no - 1;
       }
       else
       {
         this.input_sl_no = 1;    
         alert("can't delete all rows");
         this.bom_input_details.at(0).patchValue({sl_no:  this.input_sl_no});
        
       } 
        for(let i=1; i<=this.input_sl_no; i++)
        this.bom_input_details.at(i-1).patchValue({sl_no: i});   
      }

       addOutput() 
        {
          this.output_sl_no =this.output_sl_no +1;
          this.bom_output_details.push(this.fb.group({
            sl_no:this.output_sl_no,	
            item:'',
            packing: '',
            packing_uom: '',
            item_uom: '',
            production_uom: '',
            con_factor: '',
            uom_basedon: '',
            ratio: '',
            deviation: '0',
            shiftreq:''
           }));   
        }  

      deleteOutput(index) 
        {
          if(this.output_sl_no > 1)
          { 
            this.bom_output_details.removeAt(index);
            this.output_sl_no = this.output_sl_no - 1;
          }
          else
          {
            this.output_sl_no = 1;    
            alert("can't delete all rows");
            this.bom_output_details.at(0).patchValue({sl_no:  this.output_sl_no});
          
          } 
          for(let i=1; i<=this.output_sl_no; i++)
          this.bom_output_details.at(i-1).patchValue({sl_no: i});   
        }

      onChangeEntryMode(aa:string)
      {
       // window.alert(aa);
        if(aa=='Both')
        {
            this.rationapplicablelist = ["-Select-","Yes","NO"];
            this.userForm.patchValue({ratio_applicable:"-Select-"});
            this.isboth=true;
            this.showratiodevboth=false;
            if(this.userForm.get("ratio_applicable").value == "Yes")
            {
              this.isRatio=true;
              this.isboth=true;
            }
            else
            {
              this.isRatio=false;
              this.isboth=false;
            }
        }
        else
        {

          if(aa=='Input')
          {
            this.inputshiftreq=true;
            this.outputshiftreq=false;
          }
          else
          {
            this.inputshiftreq=false;
            this.outputshiftreq=true;
          }
          this.rationapplicablelist = ["Yes"];
          this.userForm.patchValue({ratio_applicable:"Yes"});
          this.isRatio=true;
          this.isboth=false;
          this.showratiodevboth=true;
        }
       }
aa1:any

getprocesslist(values)
{
this.DropDownListService.getItemNameByGroup(this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value,values.toString()).subscribe(data=>
  {
   // console.log("data::"+JSON.stringify(data))
    this.item_codes1=data;
    this.item_codes=data;
  })
}


// Hideratio()
// {
//   this.DropDownListService.itemNameByGroupProduction(this.userForm.get("business_unit").value,this.userForm.get("item_group").value).subscribe(inputitem=>
//   {
//     this.item_codes1=inputitem;
//   })
// }

Hideratio(entryMode)
       {
         this.aa1= this.userForm.get("ratio_applicable").value as FormControl;

        if( this.aa1=='Yes')
        {
          
          if(entryMode=="Input")
            {
              this.ratioIn = false;
              this.ratioOut = true;
              this.userForm.patchValue({totratio:'0'})
            /*  forkJoin(
                this.DropDownListService.itemnameproduction('input',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value),
                this.DropDownListService.itemnameproduction('output',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value)
              ).subscribe(([inputitem,outputitem])=>
              {
                this.item_codes1=inputitem;
                this.item_codes=outputitem;
              })*/

            }
            else if(entryMode=="Output")
              {
                this.ratioIn = true;
                this.ratioOut = false;
                this.userForm.patchValue({outtotratio:'0'})
              /*  forkJoin(
                  this.DropDownListService.itemnameproduction('input',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value),
                  this.DropDownListService.itemnameproduction('output',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value)
                  ).subscribe(([inputitem,outputitem])=>
                  {
                    this.item_codes1=inputitem;
                    this.item_codes=outputitem;
                  })*/
    
              }
              else
                {
                  this.ratioIn = true;
                  this.ratioOut = true;
                  /*forkJoin(
                    this.DropDownListService.itemnameproduction('input',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value),
                    this.DropDownListService.itemnameproduction('output',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value)
                    ).subscribe(([inputitem,outputitem])=>
                    {
                      this.item_codes1=inputitem;
                      this.item_codes=outputitem;
                    })*/
                  
                }
    
        }
        else 
        {
         
          if(entryMode=="Both")
          {
            this.ratioIn = false;
            this.ratioOut = false;
           /* forkJoin(
              this.DropDownListService.itemnameproduction('input',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value),
              this.DropDownListService.itemnameproduction('output',this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value)
              ).subscribe(([inputitem,outputitem])=>
              {
                this.item_codes1=inputitem;
                this.item_codes=outputitem;
              })*/
            
          }
        }
        

       }



       entry_Mode:any;
  onChangeRatioType(aa:string)
  {
    this.entry_Mode= this.userForm.get("entry_mode").value as FormControl;
  
    //window.alert(aa);
    if(aa=='Yes')
    {
      this.isRatio=true;
      if(this.entry_Mode=="Input")
        {
          this.ratioIn = false;
          this.ratioOut = true;
        }
        else if(this.entry_Mode=="Output")
          {
            this.ratioIn = true;
            this.ratioOut = false;
          }
          else
            {
              this.ratioIn = true;
              this.ratioOut = true;
            }
        this.isboth=true;
    }
    else 
    {
      this.isRatio=false;
      if(this.entry_Mode=="Both")
      {
        this.ratioIn = false;
        this.ratioOut = false;
      }
      this.isboth=false;
    }
    
    

 
    
      // this.ratioIn = false;
   
  }
  onChangeProductionType(prodtype)
  {
   if(prodtype.length) 
   {
    if(prodtype=="Fixed")
    {
      this.deviationinput=true;
      this.deviationoutput=true;
      for(let i=0;i< this.bom_output_details.length;i++)
      {
        this.bom_output_details.at(i).patchValue({deviation:0});
      }
      for(let i=0;i< this.bom_input_details.length;i++)
      {
        this.bom_input_details.at(i).patchValue({deviation:0});
      }
    }
    else{
      this.deviationinput=false;
      this.deviationoutput=false;
    }
   }
  }
  add1() 
    {
      this.bom_resource_cost.push(this.fb.group({
        charge_name:'',
        rate_cal_method:'',
        amount:'',
        tax_rate: '',
        tax_amt: '',
		    gross_amt: '' }));
    }

  onChangeApplicableCharges(applicable_charges_id:string)
  {
    this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
    {
      let i =0;
      while(this.bom_resource_cost.length)
      { this.bom_resource_cost.removeAt(0);}
     
      for(let data1 of data)
      {
        this.add1();
        this.bom_resource_cost.at(i).patchValue({
          charge_name: data1.charge_name, rate_cal_method: data1.method,
          tax_rate: data1.tax_rate});
        i=i+1;
      }
    });
  }

  sf:any;
  onChangeBusinessUnit(s:string)
    {
      if(s!='0')
      {
        this.bunit=s;
        this.DropDownListService.getShopFloorThruBU(s).subscribe(data=>{this.ShopFloorList = data;});
       
      //  this.DropDownListService.getItemThruProcessed(s).subscribe(data=>{this.item_codes1=data;this.item_codes=data;});
      
      }

      this.sf=this.userForm.get("shop_floor").value;
       if(s!='0' && this.sf!=undefined  && this.Id ==0)
       {
         this.getSequenceId(s,this.sf,'create');
       }




    }

    bunit:any;
    onChangeShopfloor(s:string)
    {
      this.Id= this.userForm.get("id").value as FormControl;
     this.bunit=this.userForm.get("business_unit").value as FormControl;
      if(s!='0')
      {
        this.DropDownListService.getProcessThruBUShopFloorAll("bunit="+this.bunit+"&sfloor="+s+"&company="+this.company_name).subscribe(data=>{this.processlist1 = data;});
      }
      if(this.bunit!='0' && this.Id ==0)
      {
        this.getSequenceId(this.bunit,s,'create');
      }

      
    }




    capacity:any = [];
    ItemUom:any;
    ProductionUom:any;
    _item_qty:any;
    itemum:any;
    selectedItemName = [];
    selectedItemName1 = [];

    onChangeItemName(index, itemId)
    {
      this._weighmentUom=this.userForm.get("prod_uom").value as FormControl;
      this.itemum=this.bom_input_details.at(index).get("production_uom").value as FormControl;
      this.bom_input_details.at(index).patchValue({item: itemId});
      if(itemId.length)
      {
        this.status = false;
        this.bom_input_details.at(index).patchValue({item: itemId});
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
         
        ).subscribe(([data, data1, data2, data3])=>
        {
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          { 
            this.status = true;
            this.bom_input_details.at(index).patchValue({item_uom:data.description});
            this._item_qty=data.description; 
            if(this._weighmentUom == this.itemum)
            {
              //this.bom_input_details.at(index).patchValue({con_factor: 0});
            }
            else
            {
              if(this._weighmentUom != 0)
              {
                {
              
                  //this.bom_input_details.at(index).patchValue({con_factor: parseFloat(this.con_factor)});
                  
                } 
              }
            }
            this.ItemUom=this.bom_input_details.at(index).get("item_uom").value as FormControl;
      
            if(this.ItemUom ==this.Description)
            {
             this.bom_input_details.at(index).patchValue({con_factor:1})
            }
            else
            {
              this.bom_input_details.at(index).patchValue({con_factor:""})
      
            }
          });

          this.packingItem1[index] = data1;
          this.selectedItemName[index]=itemId;
          
     
          this.status = true;
        }); 
      }
    }



    _item_uom:any;
    cal_method:any;
    con_factor:any;
    Description:any;
    onChangeProdUom(wgmtUom)
    {
     
      if(wgmtUom.length && wgmtUom != "0")
      {
        this._weighmentUom = wgmtUom;

        this.prouom=wgmtUom;

         this.status = false;
        this.DropDownListService.getCustomUomById(this._weighmentUom).subscribe(data=>
        {
          this.Description= data.description;
          this.DropDownListService.getUomName(this._weighmentUom).subscribe(uomName=>
          {
            this._weighmentUom = uomName.description;
            if(this.ItemUom ==this.Description)
            {
            //need to be replaced changes by tuhin on 23-03-2022 bcz confac is not feting as in database on retrive
             //this.bom_input_details.at(0).patchValue({con_factor:1});
            }
            else
            {
              //need to be replaced changes by tuhin on 23-03-2022 bcz confac is not feting as in database on retrive
              //this.bom_input_details.at(0).patchValue({con_factor:null});    
            }

            if(this.ItemOutputUom ==this.Description)
            {
              //need to be replaced changes by tuhin on 23-03-2022 bcz confac is not feting as in database on retrive
             //this.bom_output_details.at(0).patchValue({con_factor:1});
            }
            else
            {
              //need to be replaced changes by tuhin on 23-03-2022 bcz confac is not feting as in database on retrive
              //this.bom_output_details.at(0).patchValue({con_factor:null});
            }
          
           // this.con_factor = data.uom_conv_fac;
            this.status = true;
            for(let i = 0; i<this.bom_input_details.length; i++)
            {
              this._item_uom = this.bom_input_details.at(i).get("item_uom").value as FormControl;
              if(this._item_uom == this._weighmentUom)
              { 
                //this.bom_input_details.at(i).patchValue({con_factor: 1});
              }
              else
              {
              
                //this.bom_input_details.at(i).patchValue({con_factor: parseFloat(this.con_factor)});
                
              }
            }
            this._item_uom='';
            this._weighmentUom='';
            this._weighmentUom = uomName.description;

            for(let j = 0; j<this.bom_output_details.length; j++)
            {
              this._item_uom = this.bom_output_details.at(j).get("item_uom").value as FormControl;
             
              if(this._item_uom == this._weighmentUom)
              { 
                this.bom_output_details.at(j).patchValue({con_factor: 1});
              }
              else
              {
              
                //this.bom_output_details.at(j).patchValue({con_factor: parseFloat(this.con_factor)});
                
              }
            }

          });
        })
      }

    
     
    }
    itemcode1:any;
    onChangePackingItem(index, packingId)
    {
      
      if(packingId != "0")
      {
        this.itemcode1=this.bom_input_details.at(index).get("item").value as FormControl;
        let check:boolean=true;
        for(let v=0;v<this.bom_input_details.length;v++)
        {
          //console.log(index+"actual item"+this.bom_input_details.at(index).get("item").value+"//"+packingId+"//"+this.bom_input_details.at(v).get("item").value+"//"+this.bom_input_details.at(v).get("packing").value)
           // if((this.bom_input_details.at(index).get("item").value && packingId) ==  (this.bom_input_details.at(v).get("item").value && this.bom_input_details.at(v).get("packing").value) )
           if(this.bom_input_details.at(index).get("item").value==this.bom_input_details.at(v).get("item").value && packingId==this.bom_input_details.at(v).get("packing").value && index!=v)
            {
             
               
                check=false;
              
          
            }

        }

    if(check == false)
    {

      window.alert("Duplicate Row");
      this.deleteInput(index);
      this.selectedItemName[index]='';
      this.status = true;
    }
    else
    {
        this.status = false;
     
       
        this.DropDownListService.getItemNameByIdNew(packingId,this.company_name).subscribe(data=>
          {
            this.bom_input_details.at(index).patchValue({packing_uom: data.mstock_unit_name});
            this.status = true;
          });

      }
    }
    }

    capacity1:any = [];
    _item_qty1:any;
    itemum1:any;
    onChangeItemNameoutput(index, itemId)
    {
     
      this.bom_output_details.at(index).patchValue({item: itemId});
      if(itemId.length)
      {
        this._weighmentUom=this.userForm.get("prod_uom").value;
        //this.itemum1=this.bom_input_details.at(index).get("production_uom").value;
        this.itemum1=this.bom_output_details.at(index).get("production_uom").value;
       
        this.status = false;
        this.bom_output_details.at(index).patchValue({item: itemId});
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
         
        ).subscribe(([data, data1, data2, data3])=>
        {
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          { 
            this.status = true;
            this.bom_output_details.at(index).patchValue({item_uom:data.description});
            this._item_qty1=data.description; 
            if(this._weighmentUom ==this.itemum1)
            {
             // this.bom_output_details.at(index).patchValue({con_factor: 0});
            }
            else
            {
              if(this._weighmentUom != 0)
              {
                {
              
                  //this.bom_output_details.at(index).patchValue({con_factor: parseFloat(this.con_factor)});
                  
                } 
              }
            }
            this.ItemOutputUom=this.bom_output_details.at(index).get("item_uom").value as FormControl;

            if(this.ItemOutputUom ==this.Description)
            {
             this.bom_output_details.at(index).patchValue({con_factor:1})
            }
            else
            {
              this.bom_output_details.at(index).patchValue({con_factor:null});   
            }
          });
//console.log("here "+JSON.stringify(data1))
          this.packingItem[index] = data1;
          this.selectedItemName1[index]=itemId;
          this.status = true;
        });
        
       
      }

     
    }
    ItemOutputUom:any;

//onChangePackingItemoutput


itemcode21:any;
onChangePackingItemoutput(index, packingId)
{
 
  if(packingId != "0")
  {
    
    this.itemcode21=this.bom_output_details.at(index).get("item").value as FormControl;
    let check:boolean=true;
        for(let v=0;v<this.bom_output_details.length;v++)
        {
            if(this.bom_output_details.at(index).get("item").value==this.bom_output_details.at(v).get("item").value && packingId==this.bom_output_details.at(v).get("packing").value && index!=v)
            {
              
                check=false;
             
            }

        }

    if(check == false)
    {

      window.alert("Duplicate Row");
      this.deleteOutput(index);
      this.selectedItemName1[index]='';
      this.status = true;
    }
    else
    {
      this.status = false;
  /* this.DropDownListService.getItemPackUom(this.itemcode21, packingId,this.company_name).subscribe(data=>
    {
      this.bom_output_details.at(index).patchValue({packing_uom: data.uom1});
    });
    */
    this.DropDownListService.getItemNameByIdNew(packingId,this.company_name).subscribe(data=>
      {
        this.bom_output_details.at(index).patchValue({packing_uom: data.mstock_unit_name});
      });
    this.status = true;
  }
}
}


prodweight:any;
itemuom1:any;
onChangeproduominput(index,prod)
{
  this.prodweight=this.userForm.get("prod_uom").value as FormControl;
  //this.itemum1=this.bom_input_details.at(index).get("production_uom").value as FormControl;

  if(this.prodweight ==prod)
  {
    //this.bom_input_details.at(index).patchValue({con_factor: 0});
  }
  else
  {
    if(this.prodweight != '0' && prod!='0')
    {
      {
    
        //this.bom_input_details.at(index).patchValue({con_factor: parseFloat(this.con_factor)});
        
      } 
    }
  }
}


prodweight1:any;
itemuom11:any;
onChangeproduomoutput(index,prod)
{
  this.prodweight=this.userForm.get("prod_uom").value as FormControl;
  //this.itemum1=this.bom_output_details.at(index).get("production_uom").value as FormControl;

  if(this.prodweight ==prod)
  {
   // this.bom_output_details.at(index).patchValue({con_factor: 0});
  }
  else
  {
    if(this.prodweight !='0' && prod!='0')
    {
      {
    
        //this.bom_output_details.at(index).patchValue({con_factor: parseFloat(this.con_factor)});
        
      } 
    }
  }
}

onChangePackingReqList(packing_req, index)
{
  
  if(packing_req.target.value == "Yes")
  {
   
  this.isPackingListReq[index] = true;
  }
  else
  { 
    this.isPackingListReq[index] = "false";
    this.bom_input_details.at(index).patchValue({scrap_packing: "NA"});
  }
  
}


popup_data:any=[];
itemcode12:any;
 packingListPopUp(index)
 {
   this.itemcode12 = this.bom_input_details.at(index).get('item').value as FormControl;  
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.data = {index: index, item_id: this.itemcode12, popup_data: this.popup_data,pagecall:"production",bunit:this.userForm.get("business_unit").value};
   const dialogRef = this.dialog.open(ScrapPackingListPopupComponent, dialogConfig);
   dialogRef.afterClosed().subscribe( data => 
   {
    // console.log("before: "+ JSON.stringify (data));
     delete data['item_name'];
     this.popup_data =JSON.stringify(data);
     this.bom_input_details.at(index).patchValue({scrap_packing: data["item_id"]});
  // this.bom_input_details.at(index).patchValue({scrap_packing:this.popup_data});
   }); 
 }

io_ratio1:any;
onUpdate(id:any, production_id:string, action,business_unit,shop_floor)
    {
      if(action == 'view')
      {
        this.bommastersave = false;
      }
      else
      {
        this.bommastersave = true;
      }
      
      this.userForm.patchValue({id: id});	
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      this.packingItem1 = [];
     
      forkJoin(
        this.Service.retriveBom(id),
        this.Service.getBomInputDetails(production_id),         
        this.Service.getBomOutputDetails(production_id),
        this.Service.getBomResourceCost(production_id),
       // this.DropDownListService.getShopFloorThruBU(business_unit),
       // this.DropDownListService.getProcessThruBUShopFloorAll("bunit="+business_unit+"&sfloor="+shop_floor+"&company="+this.company_name)
      ).subscribe(([Bomdata, InputitemData,Outputitemdata,ResourceCostData ])=>
        {
         // console.log("BOMDATA:"+JSON.stringify(Bomdata))
          
          this.onChangeBusinessUnit(Bomdata["business_unit"] );
          this.userForm.patchValue({business_unit: Bomdata["business_unit"]});
         // this.onChangeShopfloor(Bomdata["shop_floor"]);
          this.onChangeProdUom(Bomdata["prod_uom"]);
          this.onChangeEntryMode(Bomdata["entry_mode"]);
         // this.Hideratio(Bomdata["entry_mode"]);
         //this.onChangeProcess(Bomdata["prod_process"]);
          this.onChangeRatioType(Bomdata["ratio_applicable"]);
          this.userForm.patchValue({prod_process: Bomdata["prod_process"]});
          this.unita=Bomdata["prod_process"].split(',');
     
          this.io_ratio1=Bomdata["io_ratio"];
          this.DropDownListService.getProcessThruBUShopFloorAll("bunit="+Bomdata["business_unit"]+"&sfloor="+Bomdata["shop_floor"]+"&company="+this.company_name).subscribe(data=>{this.processlist1 = data;});
          this.userForm.patchValue({id: Bomdata["id"],production_code: Bomdata["production_code"], production_id: Bomdata["production_id"],
          shop_floor: Bomdata["shop_floor"], prod_desc: Bomdata["prod_desc"],
          prod_type: Bomdata["prod_type"], entry_mode: Bomdata["entry_mode"],outtotratio:Bomdata["outtotratio"],
          prod_uom: Bomdata["prod_uom"],dev_percent: Bomdata["dev_percent"],totratio:Bomdata["totratio"],
          ratio_applicable: Bomdata["ratio_applicable"],applicable_charges_id: Bomdata["applicable_charges_id"], company_id: Bomdata["company_id"],
          fin_year: Bomdata["fin_year"],username: Bomdata["username"]});
         //   console.log("Bomdata Details: "+  JSON.stringify(Bomdata));
          
            this.DropDownListService.getItemNameByGroup(this.userForm.get("business_unit").value,this.userForm.get("shop_floor").value,Bomdata["prod_process"].split(',').toString()).subscribe(data=>
            {
              //console.log("dataITEM::"+JSON.stringify(data))
              this.item_codes1=data;
              this.item_codes=data;
            });
            this.selectedItemName = [];
            this.selectedItemName1 = [];
           console.log("InputitemData: "+  JSON.stringify(InputitemData));
           //let k = 0;  
           this.addInput()
           this.input_sl_no = 0;
           while (this.bom_input_details.length) 
           this.bom_input_details.removeAt(0);
           for(let data1 of InputitemData)
           {
            this.addInput();
           }
           this.bom_input_details.patchValue(InputitemData);
          
           for( let k=0;k<this.bom_input_details.length;k++)
           {
            this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(this.bom_input_details.get(""+k).value["item"]),
               this.DropDownListService.getItemPackUom(this.bom_input_details.get(""+k).value["item"], this.bom_input_details.get(""+k)["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                 this.status = true;
                 
                
                 this.packingItem1[k] = packingList;  
                 this.capacity[k] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                 this.selectedItemName[k] = this.bom_input_details.get(""+k)["item"];
                
               });

               
           }
           
           /*for(let data1 of InputitemData)
           { 
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(data1["item"]),
               this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                 this.status = true;
                 this.addInput();
                 console.log("k  " + k + " / " + data1["sl_no"] )
                 this.packingItem1[k] = packingList;  
                 this.capacity[k] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                console.log(JSON.stringify(data1))
                 this.bom_input_details.at(k).patchValue(data1);
                 this.selectedItemName[k] = data1["item"];
                 k = k + 1;
               });
             }
            */

             
             //console.log("Outputitemdata: "+  JSON.stringify(Outputitemdata));
          // let i = 0;  
           this.addOutput()
           this.output_sl_no = 0;
           while (this.bom_output_details.length) 
           this.bom_output_details.removeAt(0);
           for(let data1 of Outputitemdata)
           {
            this.addOutput();
           }
           this.bom_output_details.patchValue(Outputitemdata);
           
           
           for(let j=0;j<this.bom_output_details.length;j++)
           { 
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(this.bom_output_details.get(""+j).value["item"]),
               this.DropDownListService.getItemPackUom(this.bom_output_details.get(""+j).value["item"], this.bom_output_details.get(""+j).value["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                 this.status = true;
                 //this.addOutput();
                 this.packingItem[j] = packingList;  
                 this.capacity[j] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                 this.bom_output_details.at(j).patchValue(this.bom_output_details.get(""+j).value);
                 this.selectedItemName1[j] = this.bom_output_details.get(""+j).value["item"];
                // this.selectedItemName1[i] = Outputitemdata[i]["item"];
                 
                 
               });
              
             }
          /* for(let data1 of Outputitemdata)
           { 
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(data1["item"]),
               this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                console.log("i  " + i + " / " + data1["sl_no"] )
                 this.status = true;
                 this.addOutput();
                 this.packingItem[i] = packingList;  
                 this.capacity[i] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                 this.bom_output_details.at(i).patchValue(data1);
                 this.selectedItemName1[i] = data1["item"];
                 i = i + 1;
               });
             }
*/
             this.add1()
             while (this.bom_resource_cost.length)
             this.bom_resource_cost.removeAt(0);
             for(let data1 of ResourceCostData)
             this.add1();
             this.bom_resource_cost.patchValue(ResourceCostData);
           //  console.log("ResourceCostData: "+JSON.stringify(ResourceCostData));

            
             this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});                                 
        } 

        sum:any;
        ratiocal(index,event)
        {
         
          this.sum=0;
         
            for(let i = 0; i<this.bom_input_details.length; i++)
            {
              this.sum=(((this.sum*100)/100)+((this.bom_input_details.at(i).get("ratio").value)*100/100)).toFixed(2);
              //window.alert(this.sum);
            }
            if(this.sum<=100)
            {
             this.userForm.patchValue({totratio:this.sum});
            }
            else
              {
                alert("Total Ratio is must not exceed 100");           
                
                this.bom_input_details.at(index).patchValue({ratio:null});
              
                if(this.bom_input_details.length == 1)
                {
                  this.userForm.patchValue({totratio:null});
                }
                else
                {
                  this.sum=0;
         
                  for(let i = 0; i<this.bom_input_details.length; i++)
                  {
                    this.sum=(((this.sum*100)/100)+((this.bom_input_details.at(i).get("ratio").value)*100/100)).toFixed(2);
                    //window.alert(this.sum);
                  }
                  if(this.sum<=100)
                  {
                   this.userForm.patchValue({totratio:this.sum});
                  }
                }
              }
        }

        sum1:any;
        ratiocal1(event,index)
        {
         
          this.sum1=0;
          for(let j = 0; j<this.bom_output_details.length; j++)
          {
            
            this.sum1=(((this.sum1*100)/100)+((this.bom_output_details.at(j).get("ratio").value)*100/100)).toFixed(2);
           // console.log("this.sum1 :: "+ this.sum1)
            
          }
          if(this.sum1<=100)
            {
             this.userForm.patchValue({outtotratio:this.sum1});
            }

          else
            {
              alert("Total Ratio is must not exceed 100");           
                
              this.bom_output_details.at(index).patchValue({ratio:0});
              //this.bom_output_details.at(index).patchValue({ratio:0});
            //  console.log(" ratio :: "+ this.bom_output_details.at(index).get("ratio").value)
              if(this.bom_output_details.length == 1)
              {
                this.userForm.patchValue({outtotratio:0});
              }
              else
              {
                this.sum1=0;
       
                for(let i = 0; i<this.bom_input_details.length; i++)
                {
                  this.sum1=(((this.sum1*100)/100)+((this.bom_output_details.at(i).get("ratio").value)*100/100)).toFixed(2);
                 
                }
                if(this.sum1<=100)
                {
                 this.userForm.patchValue({outtotratio:this.sum1});
                }
              }
            }
        }

        getSequenceId(bunit,shpflor,operation)
        {

          if(bunit!='0' && shpflor!=undefined && operation == 'create')
          {  
//console.log("bunit"+bunit+"//"+shpflor+""+this.company_name)
          this.DropDownListService.getBMSequenceId(bunit,shpflor,this.company_name).subscribe(data=>
            {
             // console.log("seq no::"+JSON.stringify(data))
              this.seq_no = data.sequenceid;}); 
          }
        }

        ondeviationpercent(event)
        {
          if(event.target.value>100)
          {
            window.alert("Deviation Percentage should not be greater than 100 !!!")
            this.userForm.patchValue({dev_percent:null});
          }
        }

        



send(value1:any)
{

  this.procs=value1;
  this.userForm.patchValue({prod_process:this.procs.toString()});
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
      alert("Please Select Business Unit");
      this.status=true;
    }
    else if(this.userForm.get("shop_floor").value == null || this.userForm.get("shop_floor").value == 0)
    {
      alert("Please Select Shop Floor");
      this.status=true;
    }
    else if(this.userForm.get("prod_process").value == null || this.userForm.get("prod_process").value == 0)
    {
      alert("Please Select Process");
      this.status=true;
    }
    else if(this.userForm.get("prod_desc").value == null || this.userForm.get("prod_desc").value == 0)
    {
      alert("Please Enter BOM Name");
      this.status=true;
    }
    else if(this.userForm.get("prod_type").value == null || this.userForm.get("prod_type").value == 0)
    {
      alert("Please Select Production Type");
      this.status=true;
    }
    else if(this.userForm.get("entry_mode").value == null || this.userForm.get("entry_mode").value == 0)
    {
      alert("Please Select Entry Mode");
      this.status=true;
    }
    else if(this.userForm.get("ratio_applicable").value == null || this.userForm.get("ratio_applicable").value == 0)
    {
      alert("Please Select Ratio Applicable");
      this.status=true;
    }
    else if(this.userForm.get("entry_mode").value != 'Both' && this.userForm.get("io_ratio").value == null)
    {
      alert("Please Enter Input to Output Ration");
      this.status=true;
    }
    else if(this.userForm.get("prod_uom").value == null || this.userForm.get("prod_uom").value == 0)
    {
      alert("Please Select Production UOM ");
      this.status=true;
    }
    else if(this.userForm.get("entry_mode").value != 'Both' && this.userForm.get("dev_percent").value == null)
    {
      alert("Please Enter Deviation Percentage");
      this.status=true;
    }
    else
    {
          let itemcheck = false;
          let packingcheck = false;
          let parckinguom = false;
          let itemuom = false;
          let opitemcheck = false;
          let oppackingcheck = false;
          let opparckinguom = false;
          let opitemuom = false;

          for(let b=0;b<this.bom_input_details.length;b++)
          {
            if(this.bom_input_details.at(b).get("item").value == null || this.bom_input_details.at(b).get("item").value == 0)
            {
              itemcheck = true;
            }
            if(this.bom_input_details.at(b).get("packing").value == null || this.bom_input_details.at(b).get("packing").value == 0)
            {
              packingcheck = true;
            }
            if(this.bom_input_details.at(b).get("packing_uom").value == null || this.bom_input_details.at(b).get("packing_uom").value == 0)
            {
              parckinguom = true;
            }
            if(this.bom_input_details.at(b).get("item_uom").value == null || this.bom_input_details.at(b).get("item_uom").value == 0)
            {
              itemuom = true;
            }
          }

          for(let b=0;b<this.bom_output_details.length;b++)
          {
            if(this.bom_output_details.at(b).get("item").value == null || this.bom_output_details.at(b).get("item").value == 0)
            {
              opitemcheck = true;
            }
            if(this.bom_output_details.at(b).get("packing").value == null || this.bom_output_details.at(b).get("packing").value == 0)
            {
              oppackingcheck = true;
            }
            if(this.bom_output_details.at(b).get("packing_uom").value == null || this.bom_output_details.at(b).get("packing_uom").value == 0)
            {
              opparckinguom = true;
            }
            if(this.bom_output_details.at(b).get("item_uom").value == null || this.bom_output_details.at(b).get("item_uom").value == 0)
            {
              opitemuom = true;
            }
          }

          if(itemcheck == true)
          {
            alert("Please Select ITEM in Input Details Tab!!!");this.status = true;
          }
          else if(packingcheck == true)
          {
            alert("Please Select PACKING in Input Details Tab!!!");this.status = true;
          }
          else if(parckinguom == true)
          {
            alert("Please Enter PACKING UOM in Input Details Tab!!!");this.status = true;
          }
          else if(itemuom == true)
          {
            alert("Please Enter ITEM UOM in Input Details Tab!!!");this.status = true;
          }
          else if(opitemcheck == true)
          {
            alert("Please Select ITEM in Output Details Tab!!!");this.status = true;
          }
          else if(oppackingcheck == true)
          {
            alert("Please Select PACKING in Output Details Tab!!!");this.status = true;
          }
          else if(opparckinguom == true)
          {
            alert("Please Enter PACKING UOM in Output Details Tab!!!");this.status = true;
          }
          else if(opitemuom == true)
          {
            alert("Please Enter ITEM UOM in Output Details Tab!!!");this.status = true;
          }
          else
          {
            let rationpercentage:boolean=false;

            if(this.userForm.get("entry_mode").value =='Input' && this.userForm.get("ratio_applicable").value=='Yes')
            {
              if(Number(this.userForm.get("outtotratio").value)==100)
              {
                   rationpercentage=true;
              }
            }
            else if(this.userForm.get("entry_mode").value=='Output' && this.userForm.get("ratio_applicable").value=='Yes')
            {
              if(Number(this.userForm.get("totratio").value)==100)
              {
                rationpercentage=true;
              }
            }
            else if(this.userForm.get("entry_mode").value=='Both')
            {
              // if(Number(this.userForm.get("totratio").value)==100 && Number(this.userForm.get("outtotratio").value)==100)
              // {
                rationpercentage=true;
             // }
            }
            if(rationpercentage == true)
            {
              if(this.Id>0)
              {
                this.status = false;
                this.Service.updateBom(this.userForm.getRawValue(), this.Id).subscribe(data => 
                {
                  //console.log(this.userForm.value);
                  alert("BOM Master updated successfully.");
                  this.userForm.reset();
                  //refresh List;
                  this.ngOnInit(); 
                  this.showList("list");
                  this.isHidden = false ;     
                  this.status = true;                
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                this.ngOnInit()});   
              }
              else
                {
                  this.status = false;
                  this.userForm.patchValue({production_code:this.seq_no});
                  this.Service.createBom(this.userForm.getRawValue()).subscribe(data => 
                  {
                  //  console.log(this.userForm.value);
                    alert("BOM Master created successfully.");
                    this.userForm.reset();
                    //refresh List;
                    this.ngOnInit();
                    this.showList("list");   
                    this.isHidden = false;    
                    this.status = true;                 
                  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                  this.ngOnInit()});   
                }
            }
            else
            {
              alert("Ratio Must me equal to 100 !!!!!!");
              this.status=true;
            }

           
          }
      
    }
    
  }
}

onDelete(id)
{
  this.status=false;
  if(confirm("Are you sure to delete this BOM Master?"))
  {
    this.userForm.patchValue({username: localStorage.getItem("username")});
   
        this.Service.deleteBomMaster(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            alert("BOM Master Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });  
    }
    this.status=true;
  }
}












