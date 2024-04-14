import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductionTransaction } from '../../../../../../Models/ProductionModel/production-transaction';
import { MatDialog } from '@angular/material';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PackingListPopUpComponent } from '../../../SalesTransaction/components/packing-list-pop-up/packing-list-pop-up.component';
import { InputItemPopupComponent } from '../../components/input-item-popup/input-item-popup.component';
import { formatDate } from '@angular/common';
import { OutputItemPopupComponent } from '../../components/output-item-popup/output-item-popup.component';
import { data } from 'jquery';
import { Console } from 'console';

@Component({
  selector: 'app-production-transaction',
  templateUrl: './production-transaction.component.html',
  styleUrls: ['./production-transaction.component.scss']
})
export class ProductionTransactionComponent implements OnInit 

{

  submitted = false;
  model: ProductionTransaction = new ProductionTransaction();
  listProductionTransaction: ProductionTransaction[];
  public userForm:FormGroup;
  isHidden=false;
  status = false;
  Output = false;
  Input = false;
  input_sl_no = 1;
  currentDate:any;
  output_sl_no = 1;
  bunit:any;
  customUOMs:{};
  editable: boolean = false;
  editable1: boolean = false;
  editable2:boolean =false;
  editable12: boolean = false;
  action:any;
 // isRatio=false;
  //prod_processlist1:any = [];
  // rationapplicablelist:any=[];
  bussiness_unit_list:any=[];
  scrap_packing_list:any=[];
  prod_uomlist:any=[];
  company_name:any;
  seq_no:string;
  productionlist:any=[];
  packingItem:any=[];
  packingItem1:any=[];
  //customUOMs:{};
  ShopFloorList:any=[];
  item_codes:any=[];
  processlist:any=[];
  item_codes1:any=[];
  item_codestores:any=[];
 // _weighmentUom:any;
 // packingItem:any=[];
  selectedPackingItem:any=[];
 // isPackingListReq:any=[];
  productiontransactionregsave:boolean = true;
  productiontransactionregupdate:boolean =true;
  editableinput:boolean=true;
  editableoutput:boolean=true;
  productiontype:boolean=true;
  itemuom:any=[];
  packinguom:any=[];
  entrymode:boolean=true;
  entrymodeboth:boolean=false;
  inputratio:boolean=false;
  outputratio:boolean=false;
  inputdaviation:boolean=false;
  outputdaviation:boolean=false;
  variableinputpro:boolean=true;
  variableoutputpro:boolean=true;
  fixedinputpopup:boolean=true;
  variableinputpopup:boolean=true;
  Id:any;
  selectedItemNamestore= [];
  selectedPackingItemstore= [];
  packingItemstore= [];
  disabledropdown=true;
  
  inputshiftreq:any=[];
  inputshiftreqswtichuomitem:any=[];
  inputshiftreqswtichuompacking:any=[];
  outputshiftreqswtichuompacking:any=[];
  outputshiftreqswtichuomitem:any=[];
 
  inputtolerance:any=[];
  outputtolerance:any=[];

  outputshiftreq:any=[];
  capacityinput:any=[];
  capacityoutput:any=[];

  packingqtytotalqty:number=0;
  itemqtytotalqty:number=0;
  prodqtytotalqty:number=0;

  outpackingqtytotalqty:number=0;
  outitemqtytotalqty:number=0;
  outprodqtytotalqty:number=0;

  public userForm1:FormGroup;

  constructor(public fb:FormBuilder,
    public dialog: MatDialog,
    private Service : Master,
    private DropDownListService: DropdownServiceService)
     { 
      this.userForm=fb.group({
        id :[''],
        prod_trans_code: [''],
        prod_trans_id: [''],
        prod_trans_date: [''],
        prod_process:[''],
        prod_type:[''],
        prod_desc:[''],
        io_ratio:[''],
        dev_percent:[''],
        prod_shift_date:[''],
        entry_mode:[''],
        company_id: [''],
        fin_year: [''],
        business_unit: [''],
        prod_description:[''],
        shop_floor: [''],
        username: [''],

        production_transaction_input_details: this.fb.array([this.fb.group({
          sl_no:this.input_sl_no,
          item:'',
          packing: '',
          packing_uom: '',
          item_uom: '',
          production_uom: '',
          con_factor: '',
          item_qty: '0',
          packing_qty: '0',
          production_qty: '0',
          uom_basedon: '',
          ratio: '',
          deviation: '',
          scrap_packing:'',
          input_qty: '',
          deviation_production_qty:'',
          shiftreq:''

        /*  production_transaction_input_popup_details : this.fb.array([this.fb.group({
          checkbox:'',
          mainslno:'',
          shifttime:'',
          itemqty:'',
          packingqty:'',
          sl_no:'',
         })])*/
      })]),

      production_transaction_output_details: this.fb.array([this.fb.group({
          sl_no:this.output_sl_no,
          item:'',
          packing: '',
          packing_uom: '',
          item_uom: '',
          production_uom: '',
          item_qty: '0',
          packing_qty: '0',
          production_qty: '0',
          con_factor: '',
          uom_basedon: '',
          ratio: '',
          deviation: '',
          output_qty:'',
          deviation_production_qty:'',
          shiftreq:''
        })])

        ,
        storeconsumption_Item_Dtls: this.fb.array([this.fb.group({
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          packinguom:'',
          itemuom:'',
          openingitemqty:'',
          openingpackingqty:'',
          productionitemqty:'',
          productionpackingqty:'',
          closingitemqty:'',
          closingpackingqty:''
        })])
      });
      this.userForm1=fb.group(
        {
          business_unit1:[''],
          shop_floor1:[''],
          fromdate:[''],
          todate:['']
        });
   } 

   get business_unit1(){ return this.userForm.get("business_unit1") as FormControl }
   get shop_floor1(){ return this.userForm.get("shop_floor1") as FormControl }
   get fromdate(){ return this.userForm.get("fromdate") as FormControl }
   get todate(){ return this.userForm.get("todate") as FormControl }

   get id(){ return this.userForm.get("id") as FormControl }
   get prod_trans_id(){ return this.userForm.get("prod_trans_id") as FormControl }
   get prod_trans_code(){ return this.userForm.get("prod_trans_code") as FormControl }
   get prod_trans_date(){ return this.userForm.get("prod_trans_date") as FormControl }
   get prod_process(){ return this.userForm.get("prod_process") as FormControl }  
   get entry_mode(){ return this.userForm.get("entry_mode") as FormControl }
   get prod_shift_date(){ return this.userForm.get("prod_shift_date") as FormControl }
   
   get prod_description(){ return this.userForm.get("prod_description") as FormControl }
   get prod_desc(){ return this.userForm.get("prod_desc") as FormControl }
   get prod_type(){ return this.userForm.get("prod_type") as FormControl }
   get io_ratio(){ return this.userForm.get("io_ratio") as FormControl }
   get dev_percent(){ return this.userForm.get("dev_percent") as FormControl }
   get shop_floor(){ return this.userForm.get("shop_floor") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get production_transaction_input_details() { return this.userForm.get('production_transaction_input_details') as FormArray; }
   get production_transaction_output_details() { return this.userForm.get('production_transaction_output_details') as FormArray; }
   get storeconsumption_Item_Dtls() { return this.userForm.get('storeconsumption_Item_Dtls') as FormArray; }
   

   //get production_transaction_input_popup_details() { return this.production_transaction_input_details.get('production_transaction_input_popup_details') as FormArray; }
   ngOnInit()
   {
     //For User Role
     this.action = 'insert';
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"production_module";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.productiontransactionregsave = false;
    this.productiontransactionregupdate = false;
    if(accessdata.includes('production_transaction_reg.save'))
    {
     this.productiontransactionregsave = true;
    }
   if(accessdata.includes('production_transaction_reg.update'))
    { 
      this.productiontransactionregupdate=true;
    }
  
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});

   
    
    this.company_name = localStorage.getItem("company_name");
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    //this.Service.findAllProdTrans().subscribe(data=>
    this.Service.findAllProdTransfast(formatDate(new Date(), 'dd-MM-yyyy', 'en')).subscribe(data=>
      {
        console.log("list data::"+JSON.stringify(data))
        this.listProductionTransaction  = data;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    //this.DropDownListService.getItemThruType1("ITMFIXED02").subscribe(data=>{this.scrap_packing_list = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.DropDownListService.getItemThruType3("ITMT00006").subscribe(data=>{
      console.log("data:::::"+JSON.stringify(data))
      this.scrap_packing_list = data;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});     
    //this.DropDownListService.getPTSequenceId(this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});  
    this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name).subscribe(data=>{this.bussiness_unit_list = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});     
    this.DropDownListService.getStandardCustomUOM(this.company_name).subscribe(data=>{this.customUOMs = data;this.productionlist=data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});  

    if(localStorage.getItem("svalue")=='true')
    {
      //alert(localStorage.getItem("sid")+"//"+localStorage.getItem("sno")+"//"+localStorage.getItem("saction"));
      this.onUpdate(localStorage.getItem("sid"),localStorage.getItem("sno"),localStorage.getItem("saction"));
    }
    this.status = true;
  }

   showList(s:string)
   {
    if(this.productiontransactionregsave == true  && this.productiontransactionregupdate == true)//true exist  false not exist 
    {
      if(s=="add")
     {
       this.isHidden=true;
       this.userForm.reset(this.ResetAllValues().value);
     }
    }
    if(this.productiontransactionregsave == true  && this.productiontransactionregupdate == false)
    {
      if(s=="add")
     {
       this.isHidden=true;
       this.userForm.reset(this.ResetAllValues().value);
     }
    }
     
     if(s=="list")
     {
      this.userForm.patchValue({indent_date: this.currentDate}); 
       this.isHidden=false;
       this.userForm.reset(this.ResetAllValues().value);
     }
   }

   ResetAllValues()
   {
     return this.userForm=this.fb.group({
        id :[''],
        prod_trans_code: [''],
        prod_trans_id: [''],
        prod_trans_date: [''],
        prod_process:[''],
        prod_type:[''],
        prod_desc:[''],
        entry_mode:[''],
        prod_shift_date:[''],
        io_ratio:[''],
        dev_percent:[''],
        company_id: [''],
        fin_year: [''],
        business_unit: [''],
        prod_description:[''],
        shop_floor: [''],
        username: [''],

       production_transaction_input_details: this.fb.array([this.fb.group({
         sl_no:this.input_sl_no,
         item:'',
         packing: '',
         packing_uom: '',
         item_uom: '',
         production_uom: '',
         con_factor: '',
         item_qty: '0',
         packing_qty: '0',
         production_qty: '0',
         uom_basedon: '',
         ratio: '',
         deviation: '',
         scrap_packing:'',
         input_qty: '',
         deviation_production_qty:'',
         shiftreq:''

       /*  production_transaction_input_popup_details : this.fb.array([this.fb.group({
          checkbox:'',
          mainslno:'',
          shifttime:'',
          itemqty:'',
          packingqty:'',
          sl_no:'',
         })])*/
     })]),

     production_transaction_output_details: this.fb.array([this.fb.group({
         sl_no:this.output_sl_no,
         item:'',
         packing: '',
         packing_uom: '',
         item_uom: '',
         production_uom: '',
         con_factor: '',
         item_qty: '0',
         packing_qty: '0',
         production_qty: '0',
         uom_basedon: '',
         ratio: '',
         deviation: '',
         output_qty: '',
         deviation_production_qty:'',
         shiftreq:''
       })])
       ,

       storeconsumption_Item_Dtls: this.fb.array([this.fb.group({
        item_code:'',
        item_name:'',
        packing_item:'',
        packing:'',
        packinguom:'',
        itemuom:'',
        openingitemqty:'',
        openingpackingqty:'',
        productionitemqty:'',
        productionpackingqty:'',
        closingitemqty:'',
        closingpackingqty:''
      })])
     });
   }

   addInput() 
   {
     this.input_sl_no =this.input_sl_no +1;
     this.production_transaction_input_details.push(this.fb.group({
      sl_no:this.input_sl_no,
      item:'',
      packing: '',
      packing_uom: '',
      item_uom: '',
      production_uom: '',
      item_qty: '',
      packing_qty: '',
      production_qty: '',
      con_factor: '',
      uom_basedon: '',
      ratio: '',
      deviation: '',
      scrap_packing:'',
      input_qty: '',
      deviation_production_qty:'',
      shiftreq:''
     
     }));   
   }  

   addstoreconsuption() 
   {
    
    this.storeconsumption_Item_Dtls.push(this.fb.group({
      item_code:'',
      item_name:'',
      packing_item:'',
      packing:'',
      packinguom:'',
      itemuom:'',
      openingitemqty:'',
      openingpackingqty:'',
      productionitemqty:'',
      productionpackingqty:'',
      closingitemqty:'',
      closingpackingqty:''
     
     })); 
   }


   deleteInput(index) 
   {
     if(this.input_sl_no > 1)
     { 
       this.production_transaction_input_details.removeAt(index);
       this.input_sl_no = this.input_sl_no - 1;
     }
     else
     {
       this.input_sl_no = 1;    
       alert("can't delete all rows");
       this.production_transaction_input_details.at(0).patchValue({sl_no:  this.input_sl_no});
      
     } 
      for(let i=1; i<=this.input_sl_no; i++)
      this.production_transaction_input_details.at(i-1).patchValue({sl_no: i});   
    }

     addOutput() 
      {
        this.output_sl_no =this.output_sl_no +1;
        this.production_transaction_output_details.push(this.fb.group({
          sl_no:this.output_sl_no,	
          item:'',
          packing: '',
          packing_uom: '',
          item_uom: '',
          production_uom: '',
          con_factor: '',
          uom_basedon: '',
          item_qty: '0',
          packing_qty: '0',
          production_qty: '0',
          ratio: '',
          deviation: '',
          output_qty:'',
          deviation_production_qty:'',
          shiftreq:''
         }));   
      }  

    deleteOutput(index) 
      {
        if(this.output_sl_no > 1)
        { 
          this.production_transaction_output_details.removeAt(index);
          this.output_sl_no = this.output_sl_no - 1;
        }
        else
        {
          this.output_sl_no = 1;    
          alert("can't delete all rows");
          this.production_transaction_output_details.at(0).patchValue({sl_no:  this.output_sl_no});
        
        } 
        for(let i=1; i<=this.output_sl_no; i++)
        this.production_transaction_output_details.at(i-1).patchValue({sl_no: i});   
      }

      onChangeBusinessUnit(event)
      {
        this.SFloor = this.userForm.get("shop_floor").value as FormControl;
        if(event.length && event != "0")
        {
          this.status = false;
          this.DropDownListService.getShopFloorThruBU(event).subscribe(data=>
          {
            this.ShopFloorList = data;
            this.status = true;
          });
        }
      }

      // onChangeProductionType(event)
      // {
      //   for(let i=0; i<this.production_transaction_input_details.length;i++)
      //   {
      //     if(event=='Variable')
      //       {
      //         window.alert("Duplicate Row");
      //         this.deleteInput(0);
      //       }
      //   }
      // }

        checkUniqueItem(index,packingcode)
        {
          this.status = false;
           if(packingcode !='0' && packingcode !=null && packingcode!='')
            {
              for(let i=0; i<this.production_transaction_input_details.length;i++)
              {
                if(packingcode ==this.production_transaction_input_details.at(i).get("packing").value &&
                 i <index )
                  {
                    window.alert("Duplicate Row");
                    this.deleteInput(index);
                    this.status = true;
                  }
              }
            }
        }

        checkUniqueItemOutput(index,itemcode)
        {
          this.status = false;
           if(itemcode !='0' && itemcode !=null && itemcode!='')
            {
              for(let i=0; i<this.production_transaction_output_details.length;i++)
              {
                if(itemcode ==this.production_transaction_output_details.at(i).get("item").value &&
                 i <index )
                  {
                    window.alert("Duplicate Row");
                    this.deleteOutput(index);
                    this.status = true;
                  }
              }
            }
        }

      SFloor:any;
      Prod_date:any;
      b_unit:any;
      Process:any;
      prod:any;
      onChangeShopFloor(event)
      {
        this.Prod_date = this.userForm.get("prod_trans_date").value as FormControl;
        this.SFloor = this.userForm.get("shop_floor").value as FormControl;
        this.b_unit = this.userForm.get("business_unit").value as FormControl;
        this.Process = this.userForm.get("prod_process").value as FormControl;
        this.company_name = localStorage.getItem("company_name");
        if(event.length && event != "0")
        {
          this.status = false;
          forkJoin
          (
            this.DropDownListService.getProdPlanShiftDtls("businessunit="+this.b_unit+"&shopfl="+event+"&tdate="+this.Prod_date),
            this.DropDownListService.getStoreconsumptiontransaction(event),
            this.DropDownListService.getItemThruPurchasenew()
          )
          .subscribe(([data,storeconsuption,itemdata])=>
          {
            console.log("store data:"+JSON.stringify(storeconsuption))
            this.processlist = data;
            this.item_codestores=itemdata;
            this.status = true;
            this.addstoreconsuption();
            let v=0;
            while (this.storeconsumption_Item_Dtls.length) 
            this.storeconsumption_Item_Dtls.removeAt(0);
            for(let data1 of storeconsuption)
            { 
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]).subscribe(packingList=>
              {
                this.addstoreconsuption();
                this.packingItemstore[v] = packingList;  
                this.selectedItemNamestore[v]=data1.item_code;
                this.selectedPackingItemstore[v]=data1["packing"];
                this.storeconsumption_Item_Dtls.at(v).patchValue({ item_code:data1["item_code"],
                item_name:data1["item_name"],
                packing_item:data1["packing_item"],
                packing:data1["packing"],
                packinguom:data1["packinguom"],
                itemuom:data1["itemuom"],
                openingitemqty:data1["openingitemqty"],
                openingpackingqty:data1["openingpackingqty"],
                productionitemqty:'0',
                productionpackingqty:'0',
                closingitemqty:'0',
                closingpackingqty:'0'})
                v++;
              });
             
            }

          });
          if(event!=0 && this.b_unit!=0)
          {
            this.DropDownListService.getPTSequenceId("prefix=PT"+"&businessunit="+this.b_unit+"&sfloor="+event+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}); 
          }

        }
      }
      
      production:any;
      Prod_Type:any;
      Entry_Type:any;
      Proc_Id:any;
      onChangeProcess(event)
      {
       
        //this.Prod_Type = this.userForm.get("prod_type").value as FormControl;
        this.Prod_date = this.userForm.get("prod_trans_date").value as FormControl;
        this.SFloor = this.userForm.get("shop_floor").value as FormControl;
        this.b_unit = this.userForm.get("business_unit").value as FormControl;

       // this.Process = this.userForm.get("process").value as FormControl;
        this.company_name = localStorage.getItem("company_name");
        
        if(event.length && event != "0")
        {
          this.status = false;
          
          this.DropDownListService.getProdPlanShiftDetails("shiftid="+event).subscribe(data=>
          {
            console.log("getProdPlanShiftDetails:  "+JSON.stringify(data));
            this.Proc_Id= data["process"];
            // this.ProductionList = data;
            this.userForm.patchValue({prod_description: data["production_desc"],prod_desc: data["production"],prod_shift_date: data["production_date"]});
            this.status = true;

            this.DropDownListService.getBomDetails("bunit="+this.b_unit+"&sfloor="+this.SFloor+
            "&bomid="+data["production"]+"&company="+this.company_name).subscribe(data1=>
            {
              this.Prod_Type = data1["prod_type"];
              this.Entry_Type = data1["entry_mode"];
              console.log("data1:"+JSON.stringify(data1))
              this.userForm.patchValue({prod_type: data1["prod_type"],entry_mode:data1["entry_mode"],io_ratio:data1["io_ratio"],dev_percent:data1["dev_percent"]});
              //if entry mode is output then hide ratio in input details tab
              //if entry mode is input then hide ratio in output details tab
              //if production type is variable then daviation will show 
              //if production type is fixed then daviation will hidden 
             
              
              if(data1["prod_type"]=="Fixed")
              {
                this.inputdaviation=false;
                this.outputdaviation=false;
                if(data1["entry_mode"]=="Input")
                {
                  this.inputratio=false;
                  this.outputratio=true;
                  this.entrymode=true;
                  this.productiontype=true;
                  this. fixedinputpopup=true; 
                  this.entrymodeboth=false;
                }
                else if(data1["entry_mode"]=="Output")
                {
                  this.inputratio=true;
                  this.outputratio=false;
                  this.entrymode=false;
                  this.productiontype=false;
                  this. fixedinputpopup=false;
                  this.entrymodeboth=false;
                }
                else{
                  this.inputratio=true;
                  this.outputratio=true;
                  this.entrymode=false;
                  this.productiontype=false;
                  this. fixedinputpopup=true; 
                  this.entrymodeboth=true;
                }
              }
              else   //variable
              {
                if(data1["entry_mode"]=="Input")
                {
                  this.inputdaviation=false;
                  this.outputdaviation=true;
                  this.inputratio=false;
                  this.outputratio=true;
                  this.entrymode=true;//means show popup outpop
                  this.variableinputpro=true;
                  this.variableoutputpro=false;
                  this.productiontype=true;
                  this.variableinputpopup=true; //showing input popup
                  this.entrymodeboth=false;
                }
                else if(data1["entry_mode"]=="Output")
                {
                  this.outputdaviation=false;
                  this.inputdaviation=true;
                  this.inputratio=true;
                  this.outputratio=false;
                  this.entrymode=false;//means no popup output
                  this.variableinputpro=false;
                  this.variableoutputpro=true;
                  this.productiontype=false;
                  this.variableinputpopup=false;//showing no input popup
                  this.entrymodeboth=false;
                }
                else{
                  this.outputdaviation=true;
                  this.inputdaviation=true;
                  this.inputratio=true;
                  this.outputratio=true;
                  this.entrymode=false; //means show popup
                  this.productiontype=false;
                  this.variableinputpopup=true; //showing input popup
                  this.entrymodeboth=true;
                }
              }
              
                //this.entrymodeboth=true;
              
              this.status = true;
             // this.onChangeEntryMode(data1["entry_mode"]);

              this.Service.getBomInputDetails(data["production"]).subscribe(bomdata=>{this.item_codes1=bomdata;});
              this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
            
              if(this.Prod_Type=="Fixed")
              {
              
              forkJoin(
              
                //this.Service.getBomInputDetails(data["production"]),
                this.Service.getBomInputDetailsNew(data["production"]),
                this.Service.getBomOutputDetails(data["production"]),   
              ).subscribe(([InputitemData,Outputitemdata])=>
                {  
                          
                  // console.log("InputitemData: "+  JSON.stringify(InputitemData));
                   let k = 0;  
                   this.addInput()
                   this.input_sl_no = 0;
                   while (this.production_transaction_input_details.length) 
                   this.production_transaction_input_details.removeAt(0);

                   for(let data1 of InputitemData)
                   {
                    this.addInput();
                   }
                   this.production_transaction_input_details.patchValue(InputitemData);

                   console.log("InputitemData in bom: "+JSON.stringify(InputitemData));

                   /*for( let k=0;k<this.production_transaction_input_details.length;k++)
                    {
                      this.status = false;
                      forkJoin(
                      this.DropDownListService.getItemMasterPackMat(this.production_transaction_input_details.get(""+k).value["item"]),
                      this.DropDownListService.getItemPackUom(this.production_transaction_input_details.get(""+k).value["item"], this.production_transaction_input_details.get(""+k)["packing"],this.company_name)
                      ).subscribe(([packingList, capacityEmptyWt])=>
                      {
                        this.status = true;
                 
                
                        this.packingItem1[k] = packingList;  
                        this.capacity[k] = capacityEmptyWt["capacity"];
                        // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                        this.selectedItemName[k] = this.production_transaction_input_details.get(""+k)["item"];

                        if(data1["shiftreq"] == "Yes")
                         {
                          this.inputshiftreq[k]=true;
                          this.inputshiftreqswtichuompacking[k]=true;
                          this.inputshiftreqswtichuomitem[k]=true;

                         }
                         else
                         {
                          this.inputshiftreq[k]=false;
                          if(data1["uom_basedon"]=="Packing_Uom" )//true means  item entry // false emans packing entry // shift must be  no
                          {
                            this.inputshiftreqswtichuompacking[k]=false;
                            this.inputshiftreqswtichuomitem[k]=true;
                          }
                          else
                          {
                           this.inputshiftreqswtichuompacking[k]=true;
                           this.inputshiftreqswtichuomitem[k]=false;
                          }
                         
                         }

                        
                         
                         this.selectedItemName[k]=this.production_transaction_input_details.get(""+k)["item"];;
                         if(data1["uom_basedon"]=='Packing_Uom')
                         {
                          this.itemuom[k]=false;
                          this.packinguom[k]=true;
                         }
                         else{
                          this.itemuom[k]=true;
                          this.packinguom[k]=false;
                         }

                        
                
                      });

               
                    }*/

                  
                   for(let data1 of InputitemData)
                   { 
                     this.status = false;
                     forkJoin(
                       this.DropDownListService.getItemMasterPackMat(data1["item"]),
                       this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
                    
                     ).subscribe(([packingList, capacityEmptyWt])=>
                       {
                         this.status = true;
                         //this.addInput();
                         this.packingItem1[k] = packingList;  
                         this.capacityinput[k] =capacityEmptyWt["capacity"];
                         this.inputtolerance[k]=capacityEmptyWt["tolerance"];
                         this.production_transaction_input_details.at(k).patchValue(data1);
                         this.getItemQtypopupshiftno(k);
//start                        
                         if(data1["shiftreq"] == "Yes")
                         {
                          this.inputshiftreq[k]=true;
                          this.inputshiftreqswtichuompacking[k]=true;
                          this.inputshiftreqswtichuomitem[k]=true;

                         }
                         else
                         {
                          this.inputshiftreq[k]=false;
                          if(data1["uom_basedon"]=="Packing_Uom" )//true means  item entry // false emans packing entry // shift must be  no
                          {
                            this.inputshiftreqswtichuompacking[k]=false;
                            this.inputshiftreqswtichuomitem[k]=true;
                          }
                          else
                          {
                           this.inputshiftreqswtichuompacking[k]=true;
                           this.inputshiftreqswtichuomitem[k]=false;
                          }
                         
                         }

                        
                         
                         this.selectedItemName[k]=data1.item;
                         if(data1["uom_basedon"]=='Packing_Uom')
                         {
                          this.itemuom[k]=false;
                          this.packinguom[k]=true;
                         }
                         else{
                          this.itemuom[k]=true;
                          this.packinguom[k]=false;
                         }
                         k = k + 1;
                       });                   
                     }
               
                    // console.log("Outputitemdata: "+  JSON.stringify(Outputitemdata));
                   let i = 0;  
                   this.addOutput()
                   this.outputshiftreq=[];
                   this.output_sl_no = 0;
                   while (this.production_transaction_output_details.length) 
                   this.production_transaction_output_details.removeAt(0);

                   for(let data1 of Outputitemdata)
                   {
                    this.addOutput();
                   }
                   this.production_transaction_output_details.patchValue(Outputitemdata);

                   this.outputshiftreq=[];

                   for(let j=0;j<this.production_transaction_output_details.length;j++)
           { 
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(this.production_transaction_output_details.get(""+j).value["item"]),
               this.DropDownListService.getItemPackUom(this.production_transaction_output_details.get(""+j).value["item"], this.production_transaction_output_details.get(""+j).value["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                 this.status = true;
                 //this.addOutput();
                 this.packingItem[j] = packingList;  
                 //this.capacity[j] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                 this.production_transaction_output_details.at(j).patchValue(this.production_transaction_output_details.get(""+j).value);

                        if(this.production_transaction_output_details.get(""+j).value["shiftreq"] == "Yes")
                         {
                          this.outputshiftreq[j]=true;
                          this.outputshiftreqswtichuompacking[j]=true;
                          this.outputshiftreqswtichuomitem[j]=true;
                         }
                         else
                         {
                          this.outputshiftreq[j]=false;
                          if(data1["uom_basedon"]=="Packing_Uom" )//true means  item entry // false emans packing entry // shift must be  no
                          {
                            this.outputshiftreqswtichuompacking[j]=false;
                            this.outputshiftreqswtichuomitem[j]=true;
                          }
                          else
                          {
                           this.outputshiftreqswtichuompacking[j]=true;
                           this.outputshiftreqswtichuomitem[j]=false;
                          }
                          
                         }
                 this.selectedItemName1[j] = this.production_transaction_output_details.get(""+j).value["item"];
                // this.selectedItemName1[i] = Outputitemdata[i]["item"];
                 
                 
               });
              
             }
                   
                   
                   /*for(let data1 of Outputitemdata)
                   { 
                    
                     this.status = false;
                     forkJoin(
                       this.DropDownListService.getItemMasterPackMat(data1["item"]),
                       this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
                     ).subscribe(([packingList, capacityEmptyWt])=>
                       {
                         this.status = true;
                         //this.addOutput();
                         this.packingItem[i] = packingList;  
                         this.capacityoutput[i] =capacityEmptyWt["capacity"];
                         this.outputtolerance[i]=capacityEmptyWt["tolerance"];
                         this.production_transaction_output_details.at(i).patchValue(data1);
                        console.log("avijit sir  index:: tuhin  " +k+" / "+data1["shiftreq"])
                         if(data1["shiftreq"] == "Yes")
                         {
                          this.outputshiftreq[i]=true;
                          this.outputshiftreqswtichuompacking[i]=true;
                          this.outputshiftreqswtichuomitem[i]=true;
                         }
                         else
                         {
                          this.outputshiftreq[i]=false;
                          if(data1["uom_basedon"]=="Packing_Uom" )//true means  item entry // false emans packing entry // shift must be  no
                          {
                            this.outputshiftreqswtichuompacking[i]=false;
                            this.outputshiftreqswtichuomitem[i]=true;
                          }
                          else
                          {
                           this.outputshiftreqswtichuompacking[i]=true;
                           this.outputshiftreqswtichuomitem[i]=false;
                          }
                          
                         }

                         this.selectedItemName1[i]=data1.item;
                         i = i + 1;
                       });
                     }*/
                     this.status = true;           
                 });   
                }
                
                else
                {
                 // this.productiontype=false;
                    if(this.Entry_Type=="Input")
                      {
                        
                        this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
                        this.editable2 = true;

                        forkJoin(
              
                           
                          this.Service.getBomOutputDetails(data["production"])   
                        ).subscribe(([Outputitemdata])=>
                          {  
         
                                              
                               console.log("Outputitemdata: "+  JSON.stringify(Outputitemdata));
                             let i = 0;  
                             this.addOutput()
                             this.output_sl_no = 0;
                             while (this.production_transaction_output_details.length) 
                             this.production_transaction_output_details.removeAt(0);
                             for(let data1 of Outputitemdata)
                             { 
                               this.status = false;
                               forkJoin(
                                 this.DropDownListService.getItemMasterPackMat(data1["item"]),
                                 this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
                               ).subscribe(([packingList, capacityEmptyWt])=>
                                 {
                                   this.status = true;
                                   this.addOutput();
                                   this.selectedItemName1[i]=data1["item"];
                                   this.packingItem[i] = packingList; 
                                   this.capacityoutput[i] =capacityEmptyWt["capacity"]; 
                                   this.outputtolerance[i]=capacityEmptyWt["tolerance"];
                                   this.production_transaction_output_details.at(i).patchValue(data1);
                                   
                                   i = i + 1;
                                 });
                               }
                               this.status = true;   
                                       
                           });   


                           this.Input=true;



                      }
                      else if(this.Entry_Type=="Output")
                        {
                          
                          this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});

                          
                          this.editable12 = true;

                          forkJoin(
              
                            this.Service.getBomInputDetails(data["production"])  
                          ).subscribe(([InputitemData])=>
                            {  
                                      
                               console.log("InputitemData: "+  JSON.stringify(InputitemData));
                               let k = 0;  
                               this.addInput()
                               this.input_sl_no = 0;
                               while (this.production_transaction_input_details.length) 
                               this.production_transaction_input_details.removeAt(0);
                               for(let data1 of InputitemData)
                               { 
                                 this.status = false;
                                 forkJoin(
                                   this.DropDownListService.getItemMasterPackMat(data1["item"]),
                                   this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
                                 ).subscribe(([packingList, capacityEmptyWt])=>
                                   {
                                   // console.log("data1: "+  JSON.stringify(data1));
                                    //console.log("InputitemData: "+  JSON.stringify(InputitemData));
                                     this.status = true;
                                     this.addInput();
                                     this.packingItem1[k] = packingList;  
                                     this.capacityinput[k] =capacityEmptyWt["capacity"];
                                     this.inputtolerance[k]=capacityEmptyWt["tolerance"];
                                     //console.log("data1: "+  data1.item);
                                     this.production_transaction_input_details.at(k).patchValue({sl_no:data1.sl_no,item:data1.item,packing:data1.packing,packing_uom:data1.packing_uom,item_uom:data1.item_uom,production_uom:data1.production_uom,con_factor:data1.con_factor,uom_basedon:data1.uom_basedon,ratio:data1.ratio,deviation:data1.deviation,scrap_packing:data1.scrap_packing});
                                     this.selectedItemName[k]=data1.item;
                                     k = k + 1;
                                   });                   
                                 }
                             }); 
                             this.Output = true;
                        }
                        else if(this.Entry_Type=="Both")
                          {
                            this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});

                            this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
                            this.Input = true;
                            this.Output = true;
                           
                          }

                }
             }); 
            });  
         }
      }
   
      Production_Id:any;
      selectedItemName = [];
      selectedItemName1 = [];
      onChangeItemName(index, event)
      {
       // console.log("length:"+event)
       this.production_transaction_input_details.at(index).patchValue({item: event});
        this.Production_Id = this.userForm.get("prod_desc").value;
        if(event.length && event !=null)
        {
          this.status = false;
          this.production_transaction_input_details.at(index).patchValue({item: event});
          forkJoin(
           // this.DropDownListService.getBomInputDtls(this.Production_Id,event), 
            this.DropDownListService.getItemMasterPackMat(event),
            this.DropDownListService.getItemThruType3("ITMT00006"),
       //   ).subscribe(([InputData, data,scrapdata])=>
       ).subscribe(([ data,scrapdata])=>
          {
           // console.log("scrap item:"+JSON.stringify(scrapdata))
            this.scrap_packing_list= scrapdata;
         
           
            //this.production_transaction_input_details.at(index).patchValue(InputData);

            //console.log("bom data:: "+JSON.stringify(bomdata));
          //  console.log("bom data:: "+InputData['uom_basedon']);

            let k = 0;           
              
              
//console.log(this.production_transaction_input_details.at(0).get("scrap_packing").value)
            this.packingItem1[index] = data;
            this.selectedItemName[index]=event;
            this.status = true;
          }); 

          
        }
      }



      onChangePackingName(index, event)
      {
        console.log("Print Event: "+event);
        this.Production_Id = this.userForm.get("prod_desc").value;
        let item= this.production_transaction_input_details.at(index).get("item").value;
        if(event != "0" && event !=null)
        {
            let check:boolean=true;
            for(let v=0;v<this.production_transaction_input_details.length;v++)
            {
              if(this.production_transaction_input_details.at(index).get("item").value==this.production_transaction_input_details.at(v).get("item").value && event==this.production_transaction_input_details.at(v).get("packing").value && index!=v)
                {
                    check=false;
                }

            }

        if(check == false)
        {

          window.alert("Input Duplicate Row");
          this.deleteInput(index);
          this.selectedItemName[index]='';
          this.status = true;

                    
          this.capacityinput.slice(index, 1);
          this.inputshiftreq.slice(index, 1);
          this.inputshiftreqswtichuomitem.slice(index, 1);
          this.inputshiftreqswtichuompacking.slice(index, 1);


        }
        else
        {
          this.status = false;
          console.log("item"+item+"//"+event)
          forkJoin(
            this.DropDownListService.getBomInputDtls(this.Production_Id,item,event), 
            this.DropDownListService.getItemPackUom(item, event,this.company_name)
          ).subscribe(([InputData,capacityEmptyWt])=>
          {

            console.log("input item:"+JSON.stringify(InputData))
           this.capacityinput[index]=capacityEmptyWt["capacity"];
           this.inputtolerance[index]=capacityEmptyWt["tolerance"];
            //this.production_transaction_input_details.at(index).patchValue(InputData);
            this.production_transaction_input_details.at(index).patchValue({item:InputData.item,packing:InputData.packing,packing_uom:InputData.packing_uom,item_uom:InputData.item_uom,production_uom:InputData.production_uom,con_factor:InputData.con_factor,uom_basedon:InputData.uom_basedon,ratio:InputData.ratio,deviation:InputData.deviation,scrap_packing:InputData.scrap_packing});        

            //console.log("bom data:: "+JSON.stringify(bomdata));
          //  console.log("bom data:: "+InputData['uom_basedon']);


            if(InputData['uom_basedon']=='Item_Uom')
            {
              this.editableinput=true;
              this.editableoutput=false;
            }
            else
            {
              this.editableinput=false;
              this.editableoutput=true;
            }
            if(InputData["uom_basedon"]=='Packing_Uom')
            {
              this.editableoutput=true;
              this.editableinput=false;
            }
            else
            {
              this.editableoutput=false;
              this.editableinput=true;
            }

            
            console.log(" check tuhin test  input "+ InputData["shiftreq"])          
            //console.log("check tuhin "+ InputData[0])  

            
            this.production_transaction_input_details.at(index).patchValue({scrap_packing:InputData["scrap_packing"]});
            if(InputData["shiftreq"] =="Yes")
            {
              console.log(" here index "+ index +" / ")
              this.inputshiftreq[index]=true;
              this.inputshiftreqswtichuompacking[index]=true;
              this.inputshiftreqswtichuomitem[index]=true;
            }
            else
            {
              
              this.inputshiftreq[index]=false;
              if(InputData["uom_basedon"]=="Packing_Uom")//true means  item entry // false emans packing entry
              {
                this.inputshiftreqswtichuompacking[index]=false;
                this.inputshiftreqswtichuomitem[index]=true;
              }
              else
              {
               this.inputshiftreqswtichuompacking[index]=true;
               this.inputshiftreqswtichuomitem[index]=false;
              }
            }
            console.log("index "+ this.inputshiftreq[index] +"/"+  this.inputshiftreqswtichuompacking[index] + " / " + this.inputshiftreqswtichuomitem[index])

//let k=0;
              /*for(let data1 of InputData)
               {
                console.log("check tuhin "+ k +' / '+InputData[k])  
                this.production_transaction_input_details.at(k).patchValue({scrap_packing:data1["scrap_packing"]});
                this.capacityinput[k] =capacityEmptyWt["capacity"];
                this.inputtolerance[k]=capacityEmptyWt["tolerance"];
                if(InputData["shiftreq"] =="Yes")
                {
                  this.inputshiftreq[k]=true;
                  this.inputshiftreqswtichuompacking[k]=true;
                  this.inputshiftreqswtichuomitem[k]=true;
                }
                else
                {
                  
                  this.inputshiftreq[k]=false;
                  if(InputData["uom_basedon"]=="Packing_Uom")//true means  item entry // false emans packing entry
                  {
                    this.inputshiftreqswtichuompacking[k]=false;
                    this.inputshiftreqswtichuomitem[k]=true;
                  }
                  else
                  {
                   this.inputshiftreqswtichuompacking[k]=true;
                   this.inputshiftreqswtichuomitem[k]=false;
                  }
                }
               

                 k=k+1;
               }*/
            
            this.status = true;
          }); 

        //  this.checkUniqueItem(index,event);
        }
        }
          
      }


      Production_Id1:any;
    onChangeItemNameoutput(index, event)
    {
      
      this.Production_Id1 = this.userForm.get("prod_desc").value;
      if(event.length && event !=null)
      {
        this.status = false;
        this.production_transaction_output_details.at(index).patchValue({item: event});
        forkJoin(   
          //this.DropDownListService.getBomOutputDtls(this.Production_Id1,event),  
          this.DropDownListService.getItemMasterPackMat(event),       
       // ).subscribe(([OutputData,data1])=>
       ).subscribe(([data1])=>
        {
          this.packingItem[index] = data1;
          //this.production_transaction_output_details.at(index).patchValue(OutputData); 
          this.selectedItemName1[index]=event;       
          this.status = true;
        }); 
       // this.checkUniqueItemOutput(index,event);      
      }
    }

    onChangePackingNameoutput(index, event)
    {
      this.Production_Id1 = this.userForm.get("prod_desc").value;
     let item= this.production_transaction_output_details.at(index).get("item").value;
      if(event != "0" && event !=null)
      {
        let check:boolean=true;
            for(let v=0;v<this.production_transaction_output_details.length;v++)
            {
                if(this.production_transaction_output_details.at(index).get("item").value==this.production_transaction_output_details.at(v).get("item").value && event==this.production_transaction_output_details.at(v).get("packing").value && index!=v)
                {
                    check=false;
                }

            }

        if(check == false)
        {

          window.alert("Output Duplicate Row");
          this.deleteOutput(index);
          this.selectedItemName1[index]='';  
          this.status = true;

                    
          this.outputshiftreqswtichuompacking.slice(index, 1);
          this.outputshiftreqswtichuomitem.slice(index, 1);
          this.outputshiftreq.slice(index, 1);
          this.capacityoutput.slice(index, 1);
        }
        else
        {
        this.status = false;
        forkJoin(   
          this.DropDownListService.getBomOutputDtls(this.Production_Id1,item,event),
          this.DropDownListService.getItemPackUom(item,event,this.company_name)
        ).subscribe(([OutputData,capacityEmptyWt])=>
        {
          this.capacityoutput[index] =capacityEmptyWt["capacity"];
          this.outputtolerance[index]=capacityEmptyWt["tolerance"];

          //console.log("OutputData:"+JSON.stringify(OutputData))
          this.production_transaction_output_details.at(index).patchValue({item:OutputData.item,packing:OutputData.packing,packing_uom:OutputData.packing_uom,item_uom:OutputData.item_uom,production_uom:OutputData.production_uom,con_factor:OutputData.con_factor,uom_basedon:OutputData.uom_basedon,ratio:OutputData.ratio,deviation:OutputData.deviation});        
          console.log("avijit sir  index:: " +index+" / "+OutputData["shiftreq"])
          if(OutputData["shiftreq"] =="Yes")
          {
            this.outputshiftreq[index]=true;
            this.outputshiftreqswtichuompacking[index]=true;
            this.outputshiftreqswtichuomitem[index]=true;
          }
          else
          {
            this.outputshiftreq[index]=false;
            if(OutputData["uom_basedon"]=="Packing_Uom" )//true means  item entry // false emans packing entry // shift must be  no
            {
              this.outputshiftreqswtichuompacking[index]=false;
              this.outputshiftreqswtichuomitem[index]=true;
            }
            else
            {
              this.outputshiftreqswtichuompacking[index]=true;
              this.outputshiftreqswtichuomitem[index]=false;
            }
          }

          this.status = true;
        }); 
      }
            
      }
    }
      
      
      getItemQtyoutputpopup(index)
      {
        let totalinputitem=0;
        this.itemId=this.production_transaction_output_details.at(index).get("item").value as FormControl;
        this.packingId=this.production_transaction_output_details.at(index).get("packing").value as FormControl;
        this.con_fac=this.production_transaction_output_details.at(index).get("con_factor").value as FormControl;
       let packing_qty=this.production_transaction_output_details.at(index).get("packing_qty").value as FormControl;
      let item_qty=this.production_transaction_output_details.at(index).get("item_qty").value as FormControl;
        
      this.outpackingqtytotalqty=0;
      this.outitemqtytotalqty=0;
      this.outprodqtytotalqty=0;
        
        this.pro_qty= Number(item_qty) * this.con_fac;
        this.production_transaction_output_details.at(index).patchValue({production_qty: Number(this.pro_qty).toFixed(3)}); 
  
        for(let p=0;p<this.production_transaction_output_details.length;p++)
        {
          totalinputitem=Number(totalinputitem)+Number(this.production_transaction_output_details.at(p).get("production_qty").value);
          this.outpackingqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("packing_qty").value);
          this.outitemqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("item_qty").value);
          this.outprodqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("production_qty").value);
        }

        console.log("Check value: "+this.outpackingqtytotalqty)


        if(this.userForm.get("entry_mode").value =='Both')
        {
          
          
        }
        else
        {
       
          this.ioratiototal=(Number(totalinputitem)*100/Number(this.userForm.get("io_ratio").value));
          for(let q=0;q<this.production_transaction_input_details.length;q++)
          {
            this.outitemId=this.production_transaction_input_details.at(q).get("item").value as FormControl;
            this.outpackingId=this.production_transaction_input_details.at(q).get("packing").value as FormControl;
            this.DropDownListService.getItemPackUom(this.outitemId, this.outpackingId,this.company_name).subscribe((capacitydata)=>
            {  
             
            this.out_production=Number(this.ioratiototal)*Number(this.production_transaction_input_details.at(q).get("ratio").value)/100;
          
            this.outitemqty=Number(this.out_production)/Number(this.production_transaction_input_details.at(q).get("con_factor").value);
         
            this.outpacking=Math.round(Number(this.outitemqty)/Number(capacitydata["capacity"]));
            if(this.production_transaction_input_details.at(q).get("packing").value=="IM00021")
            {
              this.production_transaction_input_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:0,deviation_production_qty: Number(this.out_production).toFixed(3)}); 


              for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
              {
                if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(q).get("item").value) 
                && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(q).get("packing").value))
                {
                  this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(q).get("production_qty").value,
                    productionpackingqty:this.production_transaction_input_details.at(q).get("packing_qty").value,
                    closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(q).get("packing_qty").value),
                    closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(q).get("production_qty").value)})
                }
              }
            }
            else
            {
              this.production_transaction_input_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:this.outpacking,deviation_production_qty: Number(this.out_production).toFixed(3)}); 

              for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
              {
                if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(q).get("item").value) 
                && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(q).get("packing").value))
                {
                  this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(q).get("production_qty").value,
                    productionpackingqty:this.production_transaction_input_details.at(q).get("packing_qty").value,
                    closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(q).get("packing_qty").value),
                    closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(q).get("production_qty").value)})
                }
              }
            }
           
          });
          }
        }
        
        // if(this.production_transaction_output_details.at(index).get("packing").value=="IM00021")
        //   {
        //    console.log("enter101"+this.production_transaction_output_details.at(index).get("packing").value)
        //    this.production_transaction_output_details.at(index).patchValue({packing_qty:'0'});
        //   }
        //   if(this.production_transaction_input_details.at(index).get("packing").value=="IM00021")
        //   {
        //    console.log("enter122"+this.production_transaction_input_details.at(index).get("packing").value)
        //    this.production_transaction_input_details.at(index).patchValue({packing_qty:'0'});
        //   }
        
      }

      showpopup1(index) 
      {

        let BUunit = this.userForm.get("business_unit").value as FormControl;
        let Prod_Trans_Date = this.userForm.get("prod_trans_date").value as FormControl;
        let Shoop_Floor = this.userForm.get("shop_floor").value as FormControl;
        let shiftid = this.userForm.get("prod_process").value as FormControl;
        let Process = this.Proc_Id;
        let company_name = localStorage.getItem("company_name");
        let uom_basedon = this.production_transaction_output_details.at(index).get("uom_basedon").value as FormControl;
        let item = this.production_transaction_output_details.at(index).get("item").value as FormControl;
        let packing = this.production_transaction_output_details.at(index).get("packing").value as FormControl;
        this.Id= this.userForm.get("id").value as FormControl;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {index: index,BUunit:BUunit,Prod_Trans_Date:Prod_Trans_Date,Shoop_Floor:Shoop_Floor,shiftid:shiftid,
                            Process:Process,company_name:company_name, uom_basedon:uom_basedon, item: item, packing: packing,id:this.Id,
                            capacity:this.capacityoutput[index],tolerance:this.outputtolerance[index]};
       
                            const dialogRef = this.dialog.open(OutputItemPopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe( data => 
        {console.log("//"+data["item"]+"//"+data["pack"])
          this.production_transaction_output_details.at(index).patchValue({item_qty:data["item"].toFixed(3)});
          this.production_transaction_output_details.at(index).patchValue({packing_qty:data["pack"],production_qty:0});
         
          delete data['item'];
          delete data['pack'];
          
          this.popup_data = data;
          let StrJsonData =JSON.stringify(data);
          this.production_transaction_output_details.at(index).patchValue({output_qty:StrJsonData});
         // console.log("After closed1"+JSON.stringify(data));
         // console.log("enter output"+this.production_transaction_output_details.at(index).get("packing").value)
         // console.log("enter1 input"+this.production_transaction_input_details.at(index).get("packing").value)
      
      
          this.getItemQtyoutputpopup(index);
        });
       
      }

      popup_data:any=[];
      showpopup(index) 
      {
        let BUunit = this.userForm.get("business_unit").value as FormControl;
        let shiftid = this.userForm.get("prod_process").value as FormControl;
        let Prod_Trans_Date = this.userForm.get("prod_trans_date").value as FormControl;
        let Shoop_Floor = this.userForm.get("shop_floor").value as FormControl;
        let Process = this.Proc_Id;
        let company_name = localStorage.getItem("company_name");
        let uom_basedon = this.production_transaction_input_details.at(index).get("uom_basedon").value as FormControl;
        let item = this.production_transaction_input_details.at(index).get("item").value as FormControl;
        let packing = this.production_transaction_input_details.at(index).get("packing").value as FormControl;
        this.Id= this.userForm.get("id").value as FormControl;
        console.log("uom_basedon:"+uom_basedon+"item::"+item+"packing:"+packing)

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {index: index,BUunit:BUunit,Prod_Trans_Date:Prod_Trans_Date,Shoop_Floor:Shoop_Floor,
                            Process:Process,company_name:company_name, uom_basedon:uom_basedon, item: item, packing: packing,
                            shiftid:shiftid,id:this.Id,capacity:this.capacityinput[index],tolerance:this.inputtolerance[index]};
        const dialogRef = this.dialog.open(InputItemPopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe( data => 
        {
          this.popup_data = data;
          console.log("pack:"+data["pack"]+"// item:"+data["item"]);
          this.production_transaction_input_details.at(index).patchValue({item_qty:data["item"].toFixed(3)});
          this.production_transaction_input_details.at(index).patchValue({packing_qty:data["pack"],production_qty:0});
          delete data['item'];
          delete data['pack'];
          let StrJsonData =JSON.stringify(data);
          this.production_transaction_input_details.at(index).patchValue({input_qty:StrJsonData});
          
          this.getItemQtypopup(index);
        });
      }

      onUpdate(id:any, prod_trans_id:string,action)
    {
      if(action == 'view')
      {this.productiontransactionregsave = false;}
      else
      {this.productiontransactionregsave = true;
        this.action = 'update';}
      
      this.userForm.patchValue({id: id});	
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      this.packingItem1 = [];
     
      forkJoin(
        this.Service.retriveProdTrans(id),
        this.Service.getProdTranInputDetails(prod_trans_id),         
        this.Service.getProdTranOutputDetails(prod_trans_id),
        this.DropDownListService.getItemThruType3("ITMT00006")
       
    
      ).subscribe(([ProdTransData, InputitemData,Outputitemdata,scrapdata])=>
        {
          console.log("InputitemData"+JSON.stringify(InputitemData))
          //console.log("Outputitemdata"+JSON.stringify(Outputitemdata))
         // console.log(""+ProdTransData["prod_process"] + " // " + ProdTransData["ProdTransData"] )
         this.selectedItemName = [];
         this.selectedItemName1 = [];

          this.scrap_packing_list= scrapdata;
          this.userForm.patchValue({id: ProdTransData["id"],prod_trans_code: ProdTransData["prod_trans_code"], prod_trans_id: ProdTransData["prod_trans_id"],
          prod_trans_date: ProdTransData["prod_trans_date"], business_unit: ProdTransData["business_unit"],
          shop_floor: ProdTransData["shop_floor"], prod_process: ProdTransData["prod_process"],

          prod_desc: ProdTransData["prod_desc"],prod_type: ProdTransData["prod_type"],

          prod_description: ProdTransData["prod_description"],entry_mode: ProdTransData["entry_mode"], company_id: ProdTransData["company_id"],
          fin_year: ProdTransData["fin_year"],username: ProdTransData["username"],prod_shift_date:ProdTransData["prod_shift_date"],io_ratio:ProdTransData["io_ratio"],dev_percent:ProdTransData["dev_percent"]});
            console.log("ProdTransData Details: "+  JSON.stringify(ProdTransData));
            
          this.onChangeBusinessUnit(ProdTransData["business_unit"] );
          this.userForm.patchValue({business_unit: ProdTransData["business_unit"]});
          this.onChangeShopFloor(ProdTransData["shop_floor"]);
         // this.onChangeProcess(ProdTransData["prod_process"]);
//console.log(ProdTransData["prod_type"] + " // " + ProdTransData["entry_mode"])
         if(ProdTransData["prod_type"]=="Fixed")
              {
                this.inputdaviation=false;
                this.outputdaviation=false;
                if(ProdTransData["entry_mode"]=="Input")
                {
                  this.DropDownListService.getProdPlanShiftDetails("shiftid="+ProdTransData["prod_process"]).subscribe(data=>
                  {
                    this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
                    this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
                  });
                 
                  this.inputratio=false;
                  this.outputratio=true;
                  this.entrymode=true;
                  this.productiontype=true;
                  this. fixedinputpopup=true; 
                  this.entrymodeboth=false;
                }
                else if(ProdTransData["entry_mode"]=="Output")
                {
                  this.DropDownListService.getProdPlanShiftDetails("shiftid="+ProdTransData["prod_process"]).subscribe(data=>
                  {
                      this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
                      this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
                  });
                  this.inputratio=true;
                  this.outputratio=false;
                  this.entrymode=false;
                  this.productiontype=false;
                  this.fixedinputpopup=false;
                  this.entrymodeboth=false;
                }
                else{
                  this.inputratio=true;
                  this.outputratio=true;
                  this.entrymode=false;
                  this.productiontype=false;
                  this.fixedinputpopup=true; 
                  this.entrymodeboth=true;
                  this.DropDownListService.getProdPlanShiftDetails("shiftid="+ProdTransData["prod_process"]).subscribe(data=>
                  {
                    this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data;});
                    this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
                  });
                }
              }
              else   //variable
              {
                if(ProdTransData["entry_mode"]=="Input")
                {
                  this.DropDownListService.getProdPlanShiftDetails("shiftid="+ProdTransData["prod_process"]).subscribe(data=>
                    {
                      this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
                      this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
                    });
                  this.inputdaviation=false;
                  this.outputdaviation=true;
                  this.inputratio=false;
                  this.outputratio=true;
                  this.entrymode=true;//means show popup outpop
                  this.variableinputpro=true;
                  this.variableoutputpro=false;
                  this.productiontype=true;
                  this.variableinputpopup=true; //showing input popup
                  this.entrymodeboth=false;
                }
                else if(ProdTransData["entry_mode"]=="Output")
                {
                  this.DropDownListService.getProdPlanShiftDetails("shiftid="+ProdTransData["prod_process"]).subscribe(data=>
                  {
                    this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
                    this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
                  });
                  this.outputdaviation=false;
                  this.inputdaviation=true;
                  this.inputratio=true;
                  this.outputratio=false;
                  this.entrymode=false;//means no popup output
                  this.variableinputpro=false;
                  this.variableoutputpro=true;
                  this.productiontype=false;
                  this.variableinputpopup=false;//showing no input popup
                  this.entrymodeboth=false;
                }
                else{
                  this.outputdaviation=true;
                  this.inputdaviation=true;
                  this.inputratio=true;
                  this.outputratio=true;
                  this.entrymode=false; //means show popup
                  this.productiontype=false;
                  this.variableinputpopup=true; //showing input popup
                  this.entrymodeboth=true;
                  this.Input=true;
                  this.Output=true;
                  this.DropDownListService.getProdPlanShiftDetails("shiftid="+ProdTransData["prod_process"]).subscribe(data=>
                  {
                    console.log("data: "+JSON.stringify(data));
                    this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data; });
                    this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
                  });
                }
              }
/*
              if(this.Entry_Type=="Input")
              {
               this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
              }
               else if(this.Entry_Type=="Output")
              {
               this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
              }
              else if(this.Entry_Type=="Both")
              {
                this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
                this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
              }
         
*/
        
           console.log("InputitemData: "+  JSON.stringify(InputitemData));
           console.log("productiontype: "+this.productiontype+" // entrymodeboth: "+this.entrymodeboth);
           console.log("this.item_codes1: "+this.item_codes1)
           
           let k = 0;  
           this.addInput()
           this.input_sl_no = 0;
           while (this.production_transaction_input_details.length) 
           this.production_transaction_input_details.removeAt(0);
           
           for(let data1 of InputitemData)
           {
            this.addInput();
            
                       
           }
           this.production_transaction_input_details.patchValue(InputitemData);

           console.log("please check: "+this.production_transaction_input_details.get(""+0).value["item"])

           /*for(let k=0;k<this.production_transaction_input_details.length;k++)
           { 
            
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(this.production_transaction_input_details.get(""+k).value["item"]),
               this.DropDownListService.getItemPackUom(this.production_transaction_input_details.get(""+k).value["item"], this.production_transaction_input_details.get(""+k)["packing"],this.company_name)
               ).subscribe(([packingList, capacityEmptyWt])=>
               {
                //alert('Avi');
                this.status = true;
                // this.addInput();
                 this.packingItem1[k] = packingList;  
                 //this.capacity[k] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                //this.capacityinput[k] =capacityEmptyWt["capacity"];
                this.inputtolerance[k]=capacityEmptyWt["tolerance"];
                //alert('Avi');
                 //this.production_transaction_input_details.at(k).patchValue(data1);
                 //alert("input list per loop "+this.production_transaction_input_details.get(""+k)["item"]);

                 this.selectedItemName[k] = this.production_transaction_input_details.get(""+k).value["item"];

                 console.log("input list per loop "+this.production_transaction_input_details.get(""+k).value["item"]);
                 
                 this.getItemQtypopupshiftno(k);
                 
                 this.onChangePackingNamenew(k,this.production_transaction_input_details.get(""+k).value["packing"]);
                
                for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
                {
                  if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(k).get("item").value) 
                  && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(k).get("packing").value))
                  {
                    let opening_item=this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value;
                    let opening_packing=this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value;
                    
                    this.storeconsumption_Item_Dtls.at(v).patchValue({openingpackingqty:Number(opening_packing)+Number(this.production_transaction_input_details.at(k).get("packing_qty").value),
                      openingitemqty:Number(opening_item)+Number(this.production_transaction_input_details.at(k).get("production_qty").value),
                      productionpackingqty:'0',
                      productionitemqty:'0'})
                  }
                }



                 //k = k + 1;
               });
             }*/ 

             /*for(let k=0;k<this.production_transaction_input_details.length;k++)
             {
              this.getItemQtypopupshiftno(k);
                 
              this.onChangePackingNamenew(k,this.production_transaction_input_details.get(""+k)["packing"]);
             }*/

           
           for(let data1 of InputitemData)
           { 
            
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(data1["item"]),
               this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                //alert('Avi');
                this.status = true;
                // this.addInput();
                 this.packingItem1[k] = packingList;  
                // this.capacity[k] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                this.capacityinput[k] =capacityEmptyWt["capacity"];
                this.inputtolerance[k]=capacityEmptyWt["tolerance"];
                //alert('Avi');
                 this.production_transaction_input_details.at(k).patchValue(data1);
                console.log("input list per loop "+JSON.stringify(this.production_transaction_input_details.at(k).value))

                this.getItemQtypopupshiftno(k);
                 
                 this.onChangePackingNamenew(k,data1["packing"]);

                this.selectedItemName[k] = data1["item"];
                 
                
                for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
                {
                  if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(k).get("item").value) 
                  && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(k).get("packing").value))
                  {
                    let opening_item=this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value;
                    let opening_packing=this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value;
                    
                    this.storeconsumption_Item_Dtls.at(v).patchValue({openingpackingqty:Number(opening_packing)+Number(this.production_transaction_input_details.at(k).get("packing_qty").value),
                      openingitemqty:Number(opening_item)+Number(this.production_transaction_input_details.at(k).get("production_qty").value),
                      productionpackingqty:'0',
                      productionitemqty:'0'})
                  }
                }



                 k = k + 1;
               });
             }
       
            // console.log("Outputitemdata: "+  JSON.stringify(Outputitemdata));
           let i = 0;  
           this.addOutput()
           this.output_sl_no = 0;
           while (this.production_transaction_output_details.length) 
           this.production_transaction_output_details.removeAt(0);

           for(let data1 of Outputitemdata)
           {
            this.addOutput();
           }
           this.production_transaction_output_details.patchValue(Outputitemdata);

           for(let j=0;j<this.production_transaction_output_details.length;j++)
           { 
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(this.production_transaction_output_details.get(""+j).value["item"]),
               this.DropDownListService.getItemPackUom(this.production_transaction_output_details.get(""+j).value["item"], this.production_transaction_output_details.get(""+j).value["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                 this.status = true;
                 //this.addOutput();
                 this.packingItem[j] = packingList;  
                 console.log(j+" cap " + capacityEmptyWt["capacity"]+" // " + this.production_transaction_output_details.get(""+j).value["item"])
                 //this.capacity[j] = capacityEmptyWt["capacity"];
                 this.outputtolerance[j]=capacityEmptyWt["tolerance"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                // this.production_transaction_output_details.at(j).patchValue(this.production_transaction_output_details.get(""+j).value);
                 
                 this.selectedItemName1[j] = this.production_transaction_output_details.get(""+j).value["item"];

                 console.log("this.selectedItemName1[j]: "+this.selectedItemName1[j]);
                 this.getItemQtyshiftnooutputpopupnew(j);
                 this.onChangePackingNameoutput(j,this.production_transaction_output_details.get(""+j).value["packing"]);

                 // this.selectedItemName1[i] = Outputitemdata[i]["item"];
                 
                 
               });
              
             }

           /*for(let data1 of Outputitemdata)
           { 
           // console.log("Outputitemdata check: "+  JSON.stringify(data1));
             this.status = false;
             forkJoin(
               this.DropDownListService.getItemMasterPackMat(data1["item"]),
               this.DropDownListService.getItemPackUom(data1["item"], data1["packing"],this.company_name)
             ).subscribe(([packingList, capacityEmptyWt])=>
               {
                 this.status = true;
                 //this.addOutput();
                 this.packingItem[i] = packingList;  
                // this.capacity[i] = capacityEmptyWt["capacity"];
                // this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                this.capacityoutput[i] =capacityEmptyWt["capacity"];
                this.outputtolerance[i]=capacityEmptyWt["tolerance"];
                 this.production_transaction_output_details.at(i).patchValue(data1);
                 
                 //this.getItemQtyshiftnooutputpopup(i);
                 this.getItemQtyshiftnooutputpopupnew(i);
                 this.onChangePackingNameoutputnew(i,data1["packing"]);
                 this.selectedItemName1[i] = data1["item"];
                 i = i + 1;
               });
             }*/
           
             this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});   
         
         if(localStorage.getItem("svalue")=='true')
          {
            localStorage.setItem("svalue",'false');
          }
        } 

      
      send(value:any)
      {
        this.Id= this.userForm.get("id").value as FormControl;
        this.userForm.patchValue({company_id: localStorage.getItem("company_name"),fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
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
            alert("Please Select Bussiness Unit");
            this.status=true;
          }
          else if(this.userForm.get("shop_floor").value == null || this.userForm.get("shop_floor").value == 0)
          {
            alert("Please Select Shop Floor");
            this.status=true;
          }
          else if(this.userForm.get("prod_process").value == null || this.userForm.get("prod_process").value == 0)
          {
            alert("Please Select Shift Id");
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
          else
          {
            let itemcheck = false;
            let packingcheck = false;
            let parckingqty = false;
            let itemqty = false;
            let opitemcheck = false;
            let oppackingcheck = false;
            let opparckingqty = false;
            let opitemqty = false;
            let storeclosingitem = false;
            let storeclosingpacking = false;

            let totalinputproductionqty:number=0;
            let totaloutputproductionqty:number=0;

            for(let b=0;b<this.production_transaction_input_details.length;b++)
            {
              if(this.production_transaction_input_details.at(b).get("item").value == null || this.production_transaction_input_details.at(b).get("item").value == 0)
              {
                itemcheck = true;
              }
              if(this.production_transaction_input_details.at(b).get("packing").value == null || this.production_transaction_input_details.at(b).get("packing").value == 0)
              {
                packingcheck = true;
              }
              if(this.production_transaction_input_details.at(b).get("packing_qty").value == null )
              {
                parckingqty = true;
              }
              if(this.production_transaction_input_details.at(b).get("item_qty").value == null )
              {
                itemqty = true;
              }

              totalinputproductionqty+=Number(this.production_transaction_input_details.at(b).get("production_qty").value)
            }

            for(let b=0;b<this.production_transaction_output_details.length;b++)
            {
              if(this.production_transaction_output_details.at(b).get("item").value == null || this.production_transaction_output_details.at(b).get("item").value == 0)
              {
                opitemcheck = true;
              }
              if(this.production_transaction_output_details.at(b).get("packing").value == null || this.production_transaction_output_details.at(b).get("packing").value == 0)
              {
                oppackingcheck = true;
              }
              if(this.production_transaction_output_details.at(b).get("packing_qty").value == null )
              {
                opparckingqty = true;
              }
              if(this.production_transaction_output_details.at(b).get("item_qty").value == null )
              {
                opitemqty = true;
              }

              totaloutputproductionqty+=Number(this.production_transaction_output_details.at(b).get("production_qty").value)
            }

            for(let z=0;z<this.storeconsumption_Item_Dtls.length;z++)
            {
              if(this.storeconsumption_Item_Dtls.at(z).get("closingitemqty").value<0 )
              {
                storeclosingitem=true;
              }
              if(this.storeconsumption_Item_Dtls.at(z).get("closingpackingqty").value<0)
              {
                storeclosingpacking=true;
              }
            }
           
            if(storeclosingitem == true)
            {
              alert("Store Closing Item Qty cannot be in negative value  in Store Consumption Tab!!!");this.status = true;
            }
            else if(storeclosingpacking == true)
            {
              alert("Store Closing Packing Qty cannot be in negative value  in Store Consumption Tab!!!");this.status = true;
            }
            else 
             {


              if(this.userForm.get("entry_mode").value =="Both")
              {
                
                let dev_percent = this.userForm.get("dev_percent").value
                
              

                console.log("dev_percent: "+dev_percent);
                
                let original:number=0; 
                //let originalfig:number=0;
                
                original=(totalinputproductionqty*Number(this.userForm.get("io_ratio").value))/100;
                console.log(" check " + dev_percent +  " / " + original + " / " + totalinputproductionqty )
                
                 let minnew:boolean=true;
                 let maxnew:boolean=true;
                 
                 let max=(Number(original)*(100+Number(dev_percent))/100).toFixed(3);
                 let min=(Number(original)*(100-Number(dev_percent))/100).toFixed(3);

                 //originalfig=totaloutputproductionqty;
                 //console.log("Original Fig.: "+originalfig.toFixed(3)+" // totaloutputproductionqty: "+totaloutputproductionqty);
                
                 minnew=Number(totaloutputproductionqty.toFixed(3)) >=Number(min);
                 maxnew=Number(totaloutputproductionqty.toFixed(3)) <= Number(max);
                
                 console.log(" check 1" + max +  " / " + min + " / " + minnew +" / " + maxnew )
           
                // console.log("max:"+max+"min"+min)
                 if( minnew==true && maxnew ==true)
                 {
                  //alert("save sucesss")
                  this.status=true;
                  if(this.Id>0)
                  {
                    this.status = false;
                    console.log("update value::"+JSON.stringify(this.userForm.getRawValue()))
                    this.Service.updateProdTrans(this.userForm.getRawValue(), this.Id).subscribe(data => 
                    {
                      console.log(this.userForm.value);
                      alert("Production Transaction updated successfully.");
                      this.userForm.reset(this.ResetAllValues().value);
                      //refresh List;
                      this.ngOnInit(); 
                      this.isHidden = false ;     
                      this.status = true;                
                    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                    this.ngOnInit()});   
                  }
                  else
                    {
                      this.status = false;
                      this.userForm.patchValue({prod_trans_code:this.seq_no});
                      console.log("send value::"+JSON.stringify(this.userForm.getRawValue()))
                      this.Service.createProdTrans(this.userForm.getRawValue()).subscribe(data => 
                      {
                        console.log(this.userForm.value);
                        alert("Production Transaction created successfully.");
                        this.userForm.reset(this.ResetAllValues().value);
                        //refresh List;
                        this.ngOnInit();   
                        this.isHidden = false;    
                        this.status = true;                 
                      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                      this.ngOnInit()});   
                    }
                 }
                 else
                 {
                   
                  alert("Extends Daviation Percentage Value,Please Put Correct Amount with in output "+min+" And "+max);
                  this.status=true;
                 }
               
              }
              else
              {
               // alert("save sucesss")
                //  this.status=true;

               if(this.Id>0)
                {
                  this.status = false;
                  this.Service.updateProdTrans(this.userForm.getRawValue(), this.Id).subscribe(data => 
                  {
                    console.log(this.userForm.value);
                    alert("Production Transaction updated successfully.");
                    this.userForm.reset(this.ResetAllValues().value);
                    //refresh List;
                    this.ngOnInit(); 
                    this.isHidden = false ;     
                    this.status = true;                
                  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                  this.ngOnInit()});   
                }
                else
                  {
                    this.status = false;
                    this.userForm.patchValue({prod_trans_code:this.seq_no});
                    console.log("send value::"+JSON.stringify(this.userForm.getRawValue()))
                    this.Service.createProdTrans(this.userForm.getRawValue()).subscribe(data => 
                    {
                      console.log(this.userForm.value);
                      alert("Production Transaction created successfully.");
                      this.userForm.reset(this.ResetAllValues().value);
                      //refresh List;
                      this.ngOnInit();   
                      this.isHidden = false;    
                      this.status = true;                 
                    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                    this.ngOnInit()});   
                  }
              }
    

             
            }
        }
      }
    }
    _packing_qty:Number=0;
    _item_qty:Number=0;
    capacity:any;
    itemId:any;
    packingId:any;
    pro_qty:any;
    con_fac:any;
    ioratiototal:any;
    out_production:any;
    outcapacity:any;
    outitemId:any;
    outpackingId:any;
    outitemqty:any;
    outpacking:any;

    getPackingQty(packingQty, index)
    {
      this.itemId=this.production_transaction_input_details.at(index).get("item").value as FormControl;
      this.packingId=this.production_transaction_input_details.at(index).get("packing").value as FormControl;
      this.con_fac=this.production_transaction_input_details.at(index).get("con_factor").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, this.packingId,this.company_name).subscribe((data)=>
      {  
      
      this._packing_qty = packingQty.target.value;
      //console.log("data check1111 "+this._packing_qty+"capacity"+ data["capacity"])
      this._item_qty =  data["capacity"] * Number(this._packing_qty);
      //console.log("data item "+this._item_qty)
      this.pro_qty= Number(this._item_qty) * this.con_fac;
    this.production_transaction_input_details.at(index).patchValue({item_qty: Number(this._item_qty).toFixed(3),production_qty: Number(this.pro_qty).toFixed(3)}); 
    });
    }

   getItemQty(itemQty, index)
    {
      let totalinputitem=0;
      this.itemId=this.production_transaction_input_details.at(index).get("item").value as FormControl;
      this.packingId=this.production_transaction_input_details.at(index).get("packing").value as FormControl;
      this.con_fac=this.production_transaction_input_details.at(index).get("con_factor").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, this.packingId,this.company_name).subscribe((data)=>
      {  
        this.capacity=data["capacity"];
      });
      this._item_qty = itemQty.target.value;
      this.pro_qty= Number(this._item_qty) * this.con_fac;
      this.production_transaction_input_details.at(index).patchValue({packing_qty: Math.round(Number(this._item_qty) / Number(this.capacity)),production_qty: Number(this.pro_qty).toFixed(3)}); 

      for(let p=0;p<this.production_transaction_input_details.length;p++)
      {
        totalinputitem=Number(totalinputitem)+Number(this.production_transaction_input_details.at(p).get("production_qty").value);
      }
      this.ioratiototal=(Number(totalinputitem)*Number(this.userForm.get("io_ratio").value))/100;
      
      

      for(let q=0;q<this.production_transaction_output_details.length;q++)
      {
        this.outitemId=this.production_transaction_output_details.at(q).get("item").value as FormControl;
        this.outpackingId=this.production_transaction_output_details.at(q).get("packing").value as FormControl;
        this.DropDownListService.getItemPackUom(this.outitemId, this.outpackingId,this.company_name).subscribe((capacitydata)=>
        {  
          //console.log("capacity:"+data["capacity"])
          //this.outcapacity=data["capacity"];
          //});
        this.out_production=Number(this.ioratiototal)*Number(this.production_transaction_output_details.at(q).get("ratio").value)/100;
        //console.log("this.out_production"+this.out_production+"//"+Number(this.production_transaction_output_details.at(q).get("con_factor").value));
        this.outitemqty=Number(this.out_production)/Number(this.production_transaction_output_details.at(q).get("con_factor").value);
        //console.log("this.outitemqty:"+this.outitemqty)
        this.outpacking=Math.round(Number(this.outitemqty)/Number(capacitydata["capacity"]));
        //console.log("this.outitemqty:"+this.outitemqty+"//"+this.outcapacity+"//"+this.outpacking)
        this.production_transaction_output_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:this.outpacking}); 
      });
      }

         
   
    }

    getItemQtypopup(index)
    {
      let totalinputitem=0;
      this.itemId=this.production_transaction_input_details.at(index).get("item").value as FormControl;
      this.packingId=this.production_transaction_input_details.at(index).get("packing").value as FormControl;
      this.con_fac=this.production_transaction_input_details.at(index).get("con_factor").value as FormControl;
     let packing_qty=this.production_transaction_input_details.at(index).get("packing_qty").value as FormControl;
    let item_qty=this.production_transaction_input_details.at(index).get("item_qty").value as FormControl;
      
    this.packingqtytotalqty=0;
    this.itemqtytotalqty=0;
    this.prodqtytotalqty=0;

      this.pro_qty= Number(item_qty) * this.con_fac;
      this.production_transaction_input_details.at(index).patchValue({production_qty: Number(this.pro_qty).toFixed(3)}); 

      for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
      {
        if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(index).get("item").value) 
        && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(index).get("packing").value))
        {
          this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(index).get("production_qty").value,
            productionpackingqty:this.production_transaction_input_details.at(index).get("packing_qty").value,
            closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(index).get("packing_qty").value),
            closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(index).get("production_qty").value)})
        }
      }

      for(let p=0;p<this.production_transaction_input_details.length;p++)
      {
        totalinputitem=Number(totalinputitem)+Number(this.production_transaction_input_details.at(p).get("production_qty").value);
        this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(p).get("packing_qty").value)
        this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(p).get("item_qty").value)
        this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(p).get("production_qty").value)
      }
      if(this.userForm.get("entry_mode").value =='Both')
      {
        
      }
      else{
        this.ioratiototal=(Number(totalinputitem)*Number(this.userForm.get("io_ratio").value))/100;
     
        for(let q=0;q<this.production_transaction_output_details.length;q++)
        {
          this.outitemId=this.production_transaction_output_details.at(q).get("item").value as FormControl;
          this.outpackingId=this.production_transaction_output_details.at(q).get("packing").value as FormControl;
          this.DropDownListService.getItemPackUom(this.outitemId, this.outpackingId,this.company_name).subscribe((capacitydata)=>
          {  
            
          this.out_production=Number(this.ioratiototal)*Number(this.production_transaction_output_details.at(q).get("ratio").value)/100;
         
          this.outitemqty=Number(this.out_production)/Number(this.production_transaction_output_details.at(q).get("con_factor").value);
        
          this.outpacking=Math.round(Number(this.outitemqty)/Number(capacitydata["capacity"]));
         
          this.production_transaction_output_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:this.outpacking,deviation_production_qty: Number(this.out_production).toFixed(3)}); 
        });
        }
      }

    }
    onChangeEntryMode(entrymode)
    {
      console.log("entry mode:"+entrymode)
      
    }
    onInputDeviation(index,proQty)
    {
     let minnew:boolean=true;
     let maxnew:boolean=true;
      let pro_qty=proQty.target.value;
      let original=this.production_transaction_input_details.at(index).get("deviation_production_qty").value;
      let deviation=this.production_transaction_input_details.at(index).get("deviation").value;
     
      let production_qty=this.production_transaction_input_details.at(index).get("production_qty").value;

      let max=(Number(original)*(100+Number(deviation))/100).toFixed(3);
      let min=(Number(original)*(100-Number(deviation))/100).toFixed(3);
      minnew=Number(production_qty) >=Number(min);
      maxnew= Number(production_qty) <= Number(max);

     // console.log("max:"+max+"min"+min)
      if( minnew==true && maxnew ==true)
      {
        
      }
      else{
        alert("Extends Daviation Percentage Value,Please Put Correct Amount with in "+min+" And "+max);
        //this.production_transaction_input_details.at(index).patchValue({production_qty:original});
        this.production_transaction_input_details.at(index).patchValue({production_qty:0});
      }
    }

    onOutputDeviation(index,proQty)
    {
     let minnew:boolean=true;
     let maxnew:boolean=true;
      let pro_qty=proQty.target.value;
      let original=this.production_transaction_output_details.at(index).get("deviation_production_qty").value;
      let deviation=this.production_transaction_output_details.at(index).get("deviation").value;
     // console.log("deviation:"+deviation+"//"+original)
      let production_qty=this.production_transaction_output_details.at(index).get("production_qty").value;

      let max=(Number(original)*(100+Number(deviation))/100).toFixed(3);
      let min=(Number(original)*(100-Number(deviation))/100).toFixed(3);
      minnew=Number(production_qty) >=Number(min);
      maxnew= Number(production_qty) <= Number(max);

      //console.log("max:"+max+"min"+min)
      if( minnew==true && maxnew ==true)
      {
        
      }
      else{
        alert("Extends Daviation Percentage Value,Please Put Correct Amount with in "+min+" And "+max);
        //this.production_transaction_output_details.at(index).patchValue({production_qty:original});
        this.production_transaction_output_details.at(index).patchValue({production_qty:0});
      }
    }
    
    onDelete(id)
    {
      this.status=false;
      if(confirm("Are you sure to delete this Production Transaction(Regular) ?"))
      {
        this.userForm.patchValue({username: localStorage.getItem("username")});
       
            this.Service.deleteProdTransReg(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Production Transaction(Regular) Deleted successfully.");
                this.userForm.reset(this.ResetAllValues().value);
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
           
    }
    this.status=true;
  }

  storeconsumptionboth(index,event)
  {
    for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
    {
      if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(index).get("item").value) 
      && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(index).get("packing").value))
      {
        this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:event,
          productionpackingqty:this.production_transaction_input_details.at(index).get("packing_qty").value,
          closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(index).get("packing_qty").value),
          closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(event)})
      }
    }
  }


  itemcalforshiftno(packingQty,index)
  {
    
    if(this.inputshiftreqswtichuomitem[index]==false)//based on item this.inputshiftreqswtichuomitem[k]=false;
    {
     
             let itemstatusmin:boolean=false;
             let itemstatus:boolean=false;
             let defaultpackingqty = Math.round(Number(this.production_transaction_input_details.at(index).get("item_qty").value)/Number(this.capacityinput[index]));      
             let minqty:number=(Number(defaultpackingqty) * ((100-Number(this.inputtolerance[index]))/100));
             let maxqty:number=(Number(defaultpackingqty) * ((100+Number(this.inputtolerance[index]))/100));  
             itemstatusmin=Number(packingQty.target.value) >=minqty;
             itemstatus= Number(packingQty.target.value) <= maxqty;

             console.log("check here packingqty " + defaultpackingqty + " / "+ minqty + " / " + maxqty)
             if( itemstatus==true && itemstatusmin ==true)
             {
              this.getItemQtypopupshiftno(index);
             }
             else
             {
               alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
               this.production_transaction_input_details.at(index).patchValue({packing_qty:defaultpackingqty.toFixed(3)});
               this.getItemQtypopupshiftno(index);
             }
           
    }
    else//original
    {
      let itemqty = Number(packingQty.target.value)*Number(this.capacityinput[index]);
      this.production_transaction_input_details.at(index).patchValue({item_qty:itemqty.toFixed(3)});
      this.getItemQtypopupshiftno(index);
      

    }
   /* console.log("packing: "+this.inputshiftreqswtichuompacking[index])
    let itemqty = Number(packingQty.target.value)*Number(this.capacityinput[index]);
    console.log(" capacity " + this.capacityinput[index]+"//"+"Packing qty:"+packingQty.target.value+"//"+"Item qty: "+itemqty);
    this.production_transaction_input_details.at(index).patchValue({item_qty:itemqty.toFixed(3)});
    this.getItemQtypopupshiftno(index);
    */
  }
  packingcalforshiftno(itemqty,index)
  {
       if(this.inputshiftreqswtichuompacking[index]==false)//based on packingthis.inputshiftreqswtichuompacking[k]=false;
      {
              if( this.production_transaction_input_details.at(index).get("packing").value =="IM00021")//IM00021//DAFAULT
              {
                this.production_transaction_input_details.at(index).patchValue({packing_qty:0});
              }
              else
              {
                let itemstatusmin:boolean=false;
                let itemstatus:boolean=false;
                let defaultitemqty:number=Number(this.capacityinput[index])* Number(this.production_transaction_input_details.at(index).get("packing_qty").value);
                let minqty:number=(Number(defaultitemqty) * ((100-Number(this.inputtolerance[index]))/100));
                let maxqty:number=(Number(defaultitemqty) * ((100+Number(this.inputtolerance[index]))/100));
                itemstatusmin=Number(itemqty.target.value) >=minqty;
                itemstatus= Number(itemqty.target.value) <= maxqty;
                console.log("check here itemqty " + defaultitemqty + " / "+ minqty + " / " + maxqty)
                if( itemstatus==true && itemstatusmin ==true)
                {
                  this.getItemQtypopupshiftno(index);
                }
                else
                {
                  alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
                  this.production_transaction_input_details.at(index).patchValue({item_qty:defaultitemqty.toFixed(3)});
                  this.getItemQtypopupshiftno(index);
                }
              }
      }
      else//original
      {
        if( this.production_transaction_input_details.at(index).get("packing").value =="IM00021")//IM00021//DAFAULT
        {
          this.production_transaction_input_details.at(index).patchValue({packing_qty:0});
        }
        else
        {
          let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacityinput[index]));      
          this.production_transaction_input_details.at(index).patchValue({packing_qty:packingQty.toFixed(3)});
        }
        this.getItemQtypopupshiftno(index);
      }

    

    /*
    if( this.production_transaction_input_details.at(index).get("packing").value =="IM00021")//IM00021//DAFAULT
    {
      this.production_transaction_input_details.at(index).patchValue({packing_qty:0});
    }
    else
    {
      let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacityinput[index]));      
      this.production_transaction_input_details.at(index).patchValue({packing_qty:packingQty.toFixed(3)});
    }
    this.getItemQtypopupshiftno(index);
  */  
  }

  itemcaloutputforshiftno(packingQty,index)
  {

    if(this.outputshiftreqswtichuomitem[index]==false)//based on item this.inputshiftreqswtichuomitem[k]=false;
    {
     
             let itemstatusmin:boolean=false;
             let itemstatus:boolean=false;
             let defaultpackingqty = Math.round(Number(this.production_transaction_output_details.at(index).get("item_qty").value)/Number(this.capacityoutput[index]));      
             let minqty:number=(Number(defaultpackingqty) * ((100-Number(this.outputtolerance[index]))/100));
             let maxqty:number=(Number(defaultpackingqty) * ((100+Number(this.outputtolerance[index]))/100));  
             itemstatusmin=Number(packingQty.target.value) >=minqty;
             itemstatus= Number(packingQty.target.value) <= maxqty;
             if( itemstatus==true && itemstatusmin ==true)
             {
             // this.getItemQtypopupshiftno(index);
             }
             else
             {
               alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
               this.production_transaction_output_details.at(index).patchValue({packing_qty:defaultpackingqty.toFixed(3)});
              
             }
           
    }
    else
    {
      let itemqty = Number(packingQty.target.value)*Number(this.capacityoutput[index]);
      this.production_transaction_output_details.at(index).patchValue({item_qty:itemqty.toFixed(3)});
    
    }

    this.getItemQtyshiftnooutputpopup(index)
   /* console.log(" output get packing")
    let itemqty = Number(packingQty.target.value)*Number(this.capacityoutput[index]);
    this.production_transaction_output_details.at(index).patchValue({item_qty:itemqty.toFixed(3)});
    this.getItemQtyshiftnooutputpopup(index)
    */
  }
  packingcaloutputforshiftno(itemqty,index)
  {
    if(this.outputshiftreqswtichuompacking[index]==false)//based on packingthis.inputshiftreqswtichuompacking[k]=false;
    {
            if( this.production_transaction_output_details.at(index).get("packing").value =="IM00021")//IM00021//DAFAULT
            {
              this.production_transaction_output_details.at(index).patchValue({packing_qty:0});
            }
            else
            {
              let itemstatusmin:boolean=false;
              let itemstatus:boolean=false;
              let defaultitemqty:number=Number(this.capacityoutput[index])* Number(this.production_transaction_output_details.at(index).get("packing_qty").value);
              let minqty:number=(Number(defaultitemqty) * ((100-Number(this.outputtolerance[index]))/100));
              let maxqty:number=(Number(defaultitemqty) * ((100+Number(this.outputtolerance[index]))/100));
              itemstatusmin=Number(itemqty.target.value) >=minqty;
              itemstatus= Number(itemqty.target.value) <= maxqty;
              if( itemstatus==true && itemstatusmin ==true)
              {
                
              }
              else
              {
                alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
                this.production_transaction_output_details.at(index).patchValue({item_qty:defaultitemqty.toFixed(3)});
                
              }
            }
    }
    else
    {
      if( this.production_transaction_output_details.at(index).get("packing").value =="IM00021")//IM00021//DAFAULT
      {
        this.production_transaction_output_details.at(index).patchValue({packing_qty:0});
      }
      else
      {
        let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacityoutput[index]));      
        this.production_transaction_output_details.at(index).patchValue({packing_qty:packingQty.toFixed(3)});
      }
    }
   /* if( this.production_transaction_output_details.at(index).get("packing").value =="IM00021")//IM00021//DAFAULT
    {
      this.production_transaction_output_details.at(index).patchValue({packing_qty:0});
    }
    else
    {
      let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacityoutput[index]));      
      this.production_transaction_output_details.at(index).patchValue({packing_qty:packingQty.toFixed(3)});
    }
    */
    this.getItemQtyshiftnooutputpopup(index)
  }

  getItemQtypopupshiftno(index)
  {
    console.log(" hi tuhin input ")
    let totalinputitem=0;
    this.itemId=this.production_transaction_input_details.at(index).get("item").value as FormControl;
    this.packingId=this.production_transaction_input_details.at(index).get("packing").value as FormControl;
    this.con_fac=this.production_transaction_input_details.at(index).get("con_factor").value as FormControl;
    let packing_qty=this.production_transaction_input_details.at(index).get("packing_qty").value as FormControl;
    let item_qty=this.production_transaction_input_details.at(index).get("item_qty").value as FormControl;
    
  
    
    this.pro_qty= Number(item_qty) * this.con_fac;
    this.production_transaction_input_details.at(index).patchValue({production_qty: Number(this.pro_qty).toFixed(3)}); 

    for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
    {
      if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(index).get("item").value) 
      && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(index).get("packing").value))
      {
        this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(index).get("production_qty").value,
          productionpackingqty:this.production_transaction_input_details.at(index).get("packing_qty").value,
          closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(index).get("packing_qty").value),
          closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(index).get("production_qty").value)})
      }
    }

    this.packingqtytotalqty=0;
    this.itemqtytotalqty=0;
    this.prodqtytotalqty=0;

    for(let p=0;p<this.production_transaction_input_details.length;p++)
    {
      totalinputitem=Number(totalinputitem)+Number(this.production_transaction_input_details.at(p).get("production_qty").value);
      this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(p).get("packing_qty").value);
      this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(p).get("item_qty").value);
      this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(p).get("production_qty").value);
    }

    this.packingqtytotalqty=Number(this.packingqtytotalqty.toFixed(3));
    
    console.log (" test check Avijit: "+ this.packingqtytotalqty.toFixed(3));

    if(this.userForm.get("entry_mode").value =='Both')
    {
      this.outpackingqtytotalqty=0;
      this.outitemqtytotalqty=0;
      this.outprodqtytotalqty=0;
      for(let q=0;q<this.production_transaction_output_details.length;q++)
      {
        
       
        this.outpackingqtytotalqty+=Number(this.production_transaction_output_details.at(q).get("packing_qty").value);
        this.outitemqtytotalqty+=Number(this.production_transaction_output_details.at(q).get("item_qty").value);
        this.outprodqtytotalqty+=Number(this.production_transaction_output_details.at(q).get("production_qty").value);

      }

      
    }
    else{
      console.log(" io ratio tuhin here "+this.userForm.get("io_ratio").value)
      this.ioratiototal=(Number(totalinputitem)*Number(this.userForm.get("io_ratio").value))/100;
      this.outpackingqtytotalqty=0;
      this.outitemqtytotalqty=0;
      this.outprodqtytotalqty=0;

      for(let q=0;q<this.production_transaction_output_details.length;q++)
      {
        this.outitemId=this.production_transaction_output_details.at(q).get("item").value as FormControl;
        this.outpackingId=this.production_transaction_output_details.at(q).get("packing").value as FormControl;
      //  this.DropDownListService.getItemPackUom(this.outitemId, this.outpackingId,this.company_name).subscribe((capacitydata)=>
      //  {  
          
        this.out_production=Number(this.ioratiototal)*Number(this.production_transaction_output_details.at(q).get("ratio").value)/100;
       
        this.outitemqty=Number(this.out_production)/Number(this.production_transaction_output_details.at(q).get("con_factor").value);
      
        this.outpacking=Math.round(Number(this.outitemqty)/Number(this.capacityoutput[q]));
       
        this.production_transaction_output_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3)
          ,item_qty:Number(this.outitemqty).toFixed(3),packing_qty:this.outpacking,deviation_production_qty: Number(this.out_production).toFixed(3)}); 

        this.outpackingqtytotalqty+=Number(this.outpacking);
        this.outitemqtytotalqty+=Number(this.outitemqty);
        this.outprodqtytotalqty+=Number(this.out_production);

     // });
      }
    }

  }

  getItemQtyshiftnooutputpopup(index)
  {
    console.log(" hi tuhin output ")
    let totalinputitem=0;
    this.itemId=this.production_transaction_output_details.at(index).get("item").value as FormControl;
    this.packingId=this.production_transaction_output_details.at(index).get("packing").value as FormControl;
    this.con_fac=this.production_transaction_output_details.at(index).get("con_factor").value as FormControl;
    let packing_qty=this.production_transaction_output_details.at(index).get("packing_qty").value as FormControl;
    let item_qty=this.production_transaction_output_details.at(index).get("item_qty").value as FormControl;
    
  
    this.outpackingqtytotalqty=0;
    this.outitemqtytotalqty=0;
    this.outprodqtytotalqty=0;

    this.packingqtytotalqty=0;
    this.itemqtytotalqty=0;
    this.prodqtytotalqty=0;



    this.pro_qty= Number(item_qty) * this.con_fac;
    this.production_transaction_output_details.at(index).patchValue({production_qty: Number(this.pro_qty).toFixed(3)}); 

    for(let p=0;p<this.production_transaction_output_details.length;p++)
    {
      totalinputitem=Number(totalinputitem)+Number(this.production_transaction_output_details.at(p).get("production_qty").value);
      this.outpackingqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("packing_qty").value);
      this.outitemqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("item_qty").value);
      this.outprodqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("production_qty").value);
    }
    if(this.userForm.get("entry_mode").value =='Both')
    {
      for(let q=0;q<this.production_transaction_input_details.length;q++)
      {
        this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("packing_qty").value);
        this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("item_qty").value);
        this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("production_qty").value);
      }
    }
    else
    {
   
      this.ioratiototal=(Number(totalinputitem)*100/Number(this.userForm.get("io_ratio").value));
      for(let q=0;q<this.production_transaction_input_details.length;q++)
      {
        this.outitemId=this.production_transaction_input_details.at(q).get("item").value as FormControl;
        this.outpackingId=this.production_transaction_input_details.at(q).get("packing").value as FormControl;
       // this.DropDownListService.getItemPackUom(this.outitemId, this.outpackingId,this.company_name).subscribe((capacitydata)=>
      //  {  
         
        this.out_production=Number(this.ioratiototal)*Number(this.production_transaction_input_details.at(q).get("ratio").value)/100;
      
        this.outitemqty=Number(this.out_production)/Number(this.production_transaction_input_details.at(q).get("con_factor").value);
     
        this.outpacking=Math.round(Number(this.outitemqty)/Number(this.capacityinput[q]));
        if(this.production_transaction_input_details.at(q).get("packing").value=="IM00021")
        {
          this.production_transaction_input_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:0,deviation_production_qty: Number(this.out_production).toFixed(3)}); 


          for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
          {
            if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(q).get("item").value) 
            && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(q).get("packing").value))
            {
              this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(q).get("production_qty").value,
                productionpackingqty:this.production_transaction_input_details.at(q).get("packing_qty").value,
                closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(q).get("packing_qty").value),
                closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(q).get("production_qty").value)})
            }
          }

          this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("packing_qty").value);
          this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("item_qty").value);
          this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("production_qty").value);
        }
        else
        {

         
          this.production_transaction_input_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:this.outpacking,deviation_production_qty: Number(this.out_production).toFixed(3)}); 

          for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
          {
            if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(q).get("item").value) 
            && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(q).get("packing").value))
            {
              this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(q).get("production_qty").value,
                productionpackingqty:this.production_transaction_input_details.at(q).get("packing_qty").value,
                closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(q).get("packing_qty").value),
                closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(q).get("production_qty").value)})
            }
          }
          this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("packing_qty").value);
          this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("item_qty").value);
          this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("production_qty").value);
        }
       
    //  });

    
      }
      console.log(" check here plz prod "+ this.prodqtytotalqty)
    }
   
    
  }

  getItemQtyshiftnooutputpopupnew(index)
  {
    console.log(" hi tuhin output ")
    /*let totalinputitem=0;
    this.itemId=this.production_transaction_output_details.at(index).get("item").value as FormControl;
    this.packingId=this.production_transaction_output_details.at(index).get("packing").value as FormControl;
    this.con_fac=this.production_transaction_output_details.at(index).get("con_factor").value as FormControl;
    let packing_qty=this.production_transaction_output_details.at(index).get("packing_qty").value as FormControl;
    let item_qty=this.production_transaction_output_details.at(index).get("item_qty").value as FormControl;*/
    
  
    this.outpackingqtytotalqty=0;
    this.outitemqtytotalqty=0;
    this.outprodqtytotalqty=0;

    /*this.packingqtytotalqty=0;
    this.itemqtytotalqty=0;
    this.prodqtytotalqty=0;*/



    //this.pro_qty= Number(item_qty) * this.con_fac;
    //this.production_transaction_output_details.at(index).patchValue({production_qty: Number(this.pro_qty).toFixed(3)}); 

    for(let p=0;p<this.production_transaction_output_details.length;p++)
    {
      //totalinputitem=Number(totalinputitem)+Number(this.production_transaction_output_details.at(p).get("production_qty").value);
      this.outpackingqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("packing_qty").value);
      this.outitemqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("item_qty").value);
      this.outprodqtytotalqty+=Number(this.production_transaction_output_details.at(p).get("production_qty").value);
    }
    /*if(this.userForm.get("entry_mode").value =='Both')
    {
      for(let q=0;q<this.production_transaction_input_details.length;q++)
      {
        this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("packing_qty").value);
        this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("item_qty").value);
        this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("production_qty").value);
      }
    }
    else
    {
   
      this.ioratiototal=(Number(totalinputitem)*100/Number(this.userForm.get("io_ratio").value));
      for(let q=0;q<this.production_transaction_input_details.length;q++)
      {
        this.outitemId=this.production_transaction_input_details.at(q).get("item").value as FormControl;
        this.outpackingId=this.production_transaction_input_details.at(q).get("packing").value as FormControl;
       // this.DropDownListService.getItemPackUom(this.outitemId, this.outpackingId,this.company_name).subscribe((capacitydata)=>
      //  {  
         
        this.out_production=Number(this.ioratiototal)*Number(this.production_transaction_input_details.at(q).get("ratio").value)/100;
      
        this.outitemqty=Number(this.out_production)/Number(this.production_transaction_input_details.at(q).get("con_factor").value);
     
        this.outpacking=Math.round(Number(this.outitemqty)/Number(this.capacityinput[q]));
        if(this.production_transaction_input_details.at(q).get("packing").value=="IM00021")
        {
          this.production_transaction_input_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:0,deviation_production_qty: Number(this.out_production).toFixed(3)}); 


          for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
          {
            if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(q).get("item").value) 
            && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(q).get("packing").value))
            {
              this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(q).get("production_qty").value,
                productionpackingqty:this.production_transaction_input_details.at(q).get("packing_qty").value,
                closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(q).get("packing_qty").value),
                closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(q).get("production_qty").value)})
            }
          }

          this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("packing_qty").value);
          this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("item_qty").value);
          this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("production_qty").value);
        }
        else
        {

         
          this.production_transaction_input_details.at(q).patchValue({production_qty: Number(this.out_production).toFixed(3),item_qty:Number(this.outitemqty).toFixed(3),packing_qty:this.outpacking,deviation_production_qty: Number(this.out_production).toFixed(3)}); 

          for(let v=0;v<this.storeconsumption_Item_Dtls.length;v++)
          {
            if((this.storeconsumption_Item_Dtls.at(v).get("item_code").value ==  this.production_transaction_input_details.at(q).get("item").value) 
            && (this.storeconsumption_Item_Dtls.at(v).get("packing").value ==  this.production_transaction_input_details.at(q).get("packing").value))
            {
              this.storeconsumption_Item_Dtls.at(v).patchValue({productionitemqty:this.production_transaction_input_details.at(q).get("production_qty").value,
                productionpackingqty:this.production_transaction_input_details.at(q).get("packing_qty").value,
                closingpackingqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingpackingqty").value) - Number(this.production_transaction_input_details.at(q).get("packing_qty").value),
                closingitemqty:Number(this.storeconsumption_Item_Dtls.at(v).get("openingitemqty").value) - Number(this.production_transaction_input_details.at(q).get("production_qty").value)})
            }
          }
          this.packingqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("packing_qty").value);
          this.itemqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("item_qty").value);
          this.prodqtytotalqty+=Number(this.production_transaction_input_details.at(q).get("production_qty").value);
        }
       
    //  });

    
      }
      console.log(" check here plz prod "+ this.prodqtytotalqty)
    }*/
   
    
  }

  onChangePackingNamenew(index, event)
  {
    console.log("Print Event: "+event);
    this.Production_Id = this.userForm.get("prod_desc").value;
    let item= this.production_transaction_input_details.at(index).get("item").value;
    if(event != "0" && event !=null)
    {
        
      this.status = false;
      console.log("item"+item+"//"+event)
      forkJoin(
        this.DropDownListService.getBomInputDtls(this.Production_Id,item,event), 
        this.DropDownListService.getItemPackUom(item, event,this.company_name)
      ).subscribe(([InputData,capacityEmptyWt])=>
      {

        console.log("input item:"+JSON.stringify(InputData))
       this.capacityinput[index]=capacityEmptyWt["capacity"];
       this.inputtolerance[index]=capacityEmptyWt["tolerance"];
        //this.production_transaction_input_details.at(index).patchValue(InputData);
        this.production_transaction_input_details.at(index).patchValue({item:InputData.item,packing:InputData.packing,packing_uom:InputData.packing_uom,item_uom:InputData.item_uom,production_uom:InputData.production_uom,con_factor:InputData.con_factor,uom_basedon:InputData.uom_basedon,ratio:InputData.ratio,deviation:InputData.deviation,scrap_packing:InputData.scrap_packing});        

        //console.log("bom data:: "+JSON.stringify(bomdata));
      //  console.log("bom data:: "+InputData['uom_basedon']);


        if(InputData['uom_basedon']=='Item_Uom')
        {
          this.editableinput=true;
          this.editableoutput=false;
        }
        else
        {
          this.editableinput=false;
          this.editableoutput=true;
        }
        if(InputData["uom_basedon"]=='Packing_Uom')
        {
          this.editableoutput=true;
          this.editableinput=false;
        }
        else
        {
          this.editableoutput=false;
          this.editableinput=true;
        }

        
        console.log(" check tuhin test  input "+ InputData["shiftreq"])          
        //console.log("check tuhin "+ InputData[0])  

        
        this.production_transaction_input_details.at(index).patchValue({scrap_packing:InputData["scrap_packing"]});
        if(InputData["shiftreq"] =="Yes")
        {
          console.log(" here index "+ index +" / ")
          this.inputshiftreq[index]=true;
          this.inputshiftreqswtichuompacking[index]=true;
          this.inputshiftreqswtichuomitem[index]=true;
        }
        else
        {
          
          this.inputshiftreq[index]=false;
          if(InputData["uom_basedon"]=="Packing_Uom")//true means  item entry // false emans packing entry
          {
            this.inputshiftreqswtichuompacking[index]=false;
            this.inputshiftreqswtichuomitem[index]=true;
          }
          else
          {
           this.inputshiftreqswtichuompacking[index]=true;
           this.inputshiftreqswtichuomitem[index]=false;
          }
        }
        console.log("index "+ this.inputshiftreq[index] +"/"+  this.inputshiftreqswtichuompacking[index] + " / " + this.inputshiftreqswtichuomitem[index])

//let k=0;
          /*for(let data1 of InputData)
           {
            console.log("check tuhin "+ k +' / '+InputData[k])  
            this.production_transaction_input_details.at(k).patchValue({scrap_packing:data1["scrap_packing"]});
            this.capacityinput[k] =capacityEmptyWt["capacity"];
            this.inputtolerance[k]=capacityEmptyWt["tolerance"];
            if(InputData["shiftreq"] =="Yes")
            {
              this.inputshiftreq[k]=true;
              this.inputshiftreqswtichuompacking[k]=true;
              this.inputshiftreqswtichuomitem[k]=true;
            }
            else
            {
              
              this.inputshiftreq[k]=false;
              if(InputData["uom_basedon"]=="Packing_Uom")//true means  item entry // false emans packing entry
              {
                this.inputshiftreqswtichuompacking[k]=false;
                this.inputshiftreqswtichuomitem[k]=true;
              }
              else
              {
               this.inputshiftreqswtichuompacking[k]=true;
               this.inputshiftreqswtichuomitem[k]=false;
              }
            }
           

             k=k+1;
           }*/
        
        this.status = true;
      }); 

    //  this.checkUniqueItem(index,event);
    //}
    }
      
  }

  onChangePackingNameoutputnew(index, event)
  {
    this.Production_Id1 = this.userForm.get("prod_desc").value;
   let item= this.production_transaction_output_details.at(index).get("item").value;
    if(event != "0" && event !=null)
    {
      
      this.status = false;
      forkJoin(   
        this.DropDownListService.getBomOutputDtls(this.Production_Id1,item,event),
        this.DropDownListService.getItemPackUom(item,event,this.company_name)
      ).subscribe(([OutputData,capacityEmptyWt])=>
      {
        this.capacityoutput[index] =capacityEmptyWt["capacity"];
        this.outputtolerance[index]=capacityEmptyWt["tolerance"];

        //console.log("OutputData:"+JSON.stringify(OutputData))
        this.production_transaction_output_details.at(index).patchValue({item:OutputData.item,packing:OutputData.packing,packing_uom:OutputData.packing_uom,item_uom:OutputData.item_uom,production_uom:OutputData.production_uom,con_factor:OutputData.con_factor,uom_basedon:OutputData.uom_basedon,ratio:OutputData.ratio,deviation:OutputData.deviation});        
        console.log("avijit sir  index:: " +index+" / "+OutputData["shiftreq"])
        if(OutputData["shiftreq"] =="Yes")
        {
          this.outputshiftreq[index]=true;
          this.outputshiftreqswtichuompacking[index]=true;
          this.outputshiftreqswtichuomitem[index]=true;
        }
        else
        {
          this.outputshiftreq[index]=false;
          if(OutputData["uom_basedon"]=="Packing_Uom" )//true means  item entry // false emans packing entry // shift must be  no
          {
            this.outputshiftreqswtichuompacking[index]=false;
            this.outputshiftreqswtichuomitem[index]=true;
          }
          else
          {
            this.outputshiftreqswtichuompacking[index]=true;
            this.outputshiftreqswtichuomitem[index]=false;
          }
        }

        this.status = true;
      }); 
    //}
          
    }
  }

  search()
  {
    let b_unit_name=this.userForm1.get("business_unit1").value;
    let shop_floor1=this.userForm1.get("shop_floor1").value;
    let fromdate=this.userForm1.get("fromdate").value;
    let todate=this.userForm1.get("todate").value;
    
    this.status=false;
    if(b_unit_name == '' || b_unit_name == null || b_unit_name == 0)
    {
      alert("Please Select Bussiness Unit Name");
      this.status=true;
    }
    else if(shop_floor1 == '' || shop_floor1 == null || shop_floor1 == 0)
    {
      alert("Please Select Shop Floor Name");
      this.status=true;
    }
    else if(fromdate == '' || fromdate == null || fromdate == 0)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else if(todate == '' || todate == null || todate == 0)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else
    {
      this.DropDownListService.searchProductionTransaction("business_unit1="+b_unit_name+"&shop_floor1="+shop_floor1+"&fromdate="+fromdate+"&todate="+todate).subscribe(data=>
        {
          //console.log("Check Data of Search: " + JSON.stringify(data))
          this.listProductionTransaction =data;
          this.status=true;
   
        },
         (error) => 
         {this.status=true;
          alert("Production Transaction Not Found !!!")
          this.listProductionTransaction=[];
        });
    }
    
  }

  accountpostingproductionreg(id)
  { 
    this.status=false;
    this.DropDownListService.accountpostingproductionreg(id).subscribe(data=>
      {
         // console.log("data "+JSON.stringify(data["response"]))
      
         if(data["export"] == 1)
         {
           alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
         }
         else
         {
           let responsestring=data["response"];
 
           let split=responsestring.split("LINEERROR>");
          //console.log("array "+split[1] );
           let mssg=split[1];
           let finalmssg=mssg.toString().substring(13,mssg.length-24);
          // console.log("finalmssg " + finalmssg)
 
           alert("Data Didn't Exported  !!!!!!!!!!!!! " + finalmssg + " LEDGER missing");
         }
         
         this.ngOnInit();
        // this.isHidden = false;
         this.status = true;

      });
  }

}
