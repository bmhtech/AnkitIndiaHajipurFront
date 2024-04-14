import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { ItemMaster,Uomdopdown,uom, Bussiness_Unit } from '../../../../../../Models/ItemModel/ItemMaster';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemMasterTaxCodeModalComponent } from '../item-master-tax-code-modal/item-master-tax-code-modal.component';
import { ItemmodalComponent } from '../itemmodal/itemmodal.component';
import { Itemmodal1Component } from '../itemmodal1/itemmodal1.component';
import { forkJoin } from 'rxjs';
import { ItemMasterList } from '../../../../../../Models/ItemModel/ItemMasterList';
import {Sort} from '@angular/material/sort';

  @Component({
    selector: 'app-items-master',
    templateUrl: './ItemsMaster.component.html',
    styleUrls: ['./ItemsMaster.component.scss']
  })

  export class ItemsMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    public userForm1:FormGroup;
    public searchText : string;
    model: ItemMaster = new ItemMaster();
    listItemMaster:any=[];
    itemGroups:any = [];
    itemtypes:any=[];
    options: any = [];
    con_acc:any;
    groupstat1:any;
    itemCatagories: {};
    employeeNames:any = [];
    reasonIdList:any = [];
    customUOMs: {};
    qc_descriptions:any=[];
    company_name:any;
    companyBusiness: {};
    taxCodes: {};
    isChecked1 = false;
    CustomUom: {};
    tax_name: any;
    tax_name1: any;
    mstock_unit1:any;
    item_uom: any;
    StaticCustomUOM: any;
    alternative_item: any;
    isHidden:any;
    staticItemName: any;
    itemCodes: {};
    inames: {};
    uomName: {};
    preferedVendor: {};
    bussiness_unit_list:any = [];
    Partial: string;
    p: string;
    bussiness_unit_data = "";
    uomname:any;
    status:any;
    activeIsChecked:any;
    _stat_sl_no = 1;
    qc_sl_no = 1;
    qcId = "0";
    qcCode = "0";
    _pack_mat_sl_no = 1;
    cls_item_slno=1;
    item_size_slno=1;
    seq_no: string;
    financialYear:any;
    selectedBusinessUnit:any = [];
    operation:any;
    is_select_all_unit:boolean;
    is_select_unit:any = [];
    buss_unit_data:any;
    buss_unit_data1:any;
    isValid=false;
    itemCodeReadOnly:boolean = true;
    itemmastersave:boolean = true;
    itemmasterupdate:boolean = true;
    itemmasterdelete:boolean = true;
    itemmasterview:boolean=true;
    action:any;
    hsncode:any;
    itemname:any;
    codeStatus:any;
    ledgerbankacc:any;
    itemmasterposting:boolean=true;
    stock_business_unit:any = [];
    itemnamelist:any=[];
    itemcodelist:any=[];
    listItemMasterall:any=[];
    classifieditem:boolean=false;
    classifieditemsize:boolean=false;
    proceeseditemshow:boolean=false;
    lockitemname:boolean=false;
    user_name:any;
    user_roles:any;
    usernamelock:boolean=false;
    packingItemList:any=[];
  //  Business_Unit:any;
    @ViewChild('iCodeInput') _itemCode: ElementRef;
    @ViewChild('iNameInput') _itemName: ElementRef;
    constructor(public fb:FormBuilder,
    private Service : Master,private DropDownListService: DropdownServiceService,
    public dialog: MatDialog) 
    {
      this.userForm=fb.group(
      {
        id:[''],
        item_id:[''],
        item_code:[''],
        hsn_code:[''],
        item_name:[''],
        item_active: [''],
        item_group:[''],
        sub_group:[''],
        item_type:[''],
        item_category:[''],
        alt_name:[''],
        mstock_unit:[''],
        standard_rate:[''],
        inventory_item:[''],
        sales_item:[''],
        purchase_item:[''],
        processed_item:[''],
        impurities_item:[''],
        qc_require:[''],
        all_unit:[''],
        item_unit:[''],
        mrp:[''],
        unit_type:[''],
        confirmed_by:[''],
        approval:[''],
        reason:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        chakki_prod: [''],
        roller_prod: [''],
        input_prod: [''],

        item_master_stat_infos: this.fb.array([this.fb.group({
          sl_no : this._stat_sl_no, 
          tax_code: '', 	
          tax_rate: '', 	
          eff_date: '', 	
          applicable: ''
          })]),
 
        item_master_inv_data1:this.fb.group({
          selling_unit: '', 
          purchase_unit:  '', 
          valuation_type:  '', 
          mrp:  '', 
          msp:  '', 
          min_inv_limit:  '', 
          eanno1:  '', 
          eanno2:  '', 
          tolerance:  '', 
          srno:  '', 
          catalog_no:  '',
          opening_stock:'', 
          std_lead_time:  '',  
          mng_by_batch:  '',
          mng_by_slno:'',}),

        item_master_inv_data2:this.fb.group({
          neg_inv_allow:  '', 
          manage_inv_wh:  '', 
          sales_qty:  '', 
          sales_uom:  '', 
          pur_qty:  '', 
          pur_uom:  '', 
          eoq_qty:  '', 
          eoq_uom:  '', 
          reorder_qty:  '', 
          reorder_uom:  ''}),

        item_master_other_info:this.fb.group({
          gen_name:  '', 
          self_life:  '', 
          exp_date:  '', 
          specific_desc:  '', 
          ser_item:  '', 
          non_store_item:  '', 
          stock_item:  ''}),

        item_master_pack_mat_tags:this.fb.array([this.fb.group({
          sl_no : this._pack_mat_sl_no, 
          capacity: '', 
          uom1: '', 
          empbagwt_based_on:'',
          empty_big_wt: '', 
          item_code:'', 
          item_name:'',
          tolerance: '',
          item_uom: this.mStockKeepingUnit})]),

        item_master_alternative_dtls:this.fb.array([this.fb.group({
          item_id_old:'',     
          hsn_code: '',
          item_name: '',
          item_group: '',
          item_category: '',
          mstock_unit: '',
          group_name:'',
          category_name:'',
          uom_name:'',
          addless:'Add',
          packing_cost:''})]),
          
        itmItem_master_qc_details:this.fb.array([this.fb.group({
          sl_no : this.qc_sl_no, 
          qc_code:'',
          qc_id:''})]),
          
          item_master_stock_details:this.fb.array([this.fb.group({
            businessunit:'',
            opening_stock: '0.00',
            uom:''
          })]),
          item_master_classification:this.fb.array([this.fb.group({
            sl_no : this.cls_item_slno,
            classified_item_name:''
          })]),
          item_master_size_weight:this.fb.array([this.fb.group({
            sl_no : this.item_size_slno,
            item_code:'',
            master_code:'',
            item_size:'',
            item_weight:'',
            weight_tolerance:''
          })])
      });
      this.userForm1=fb.group(
        {
          //itemname1:[''],
          //itemgroup:[''],
          //itemcategory:[''],
          itemtype1:[''],
        });

     
    }


    get item_id(){return this.userForm.get("item_id") as FormControl}
    get id(){return this.userForm.get("id") as FormControl}
    get item_code(){ return this.userForm.get("item_code") as FormControl }
    get hsn_code(){ return this.userForm.get("hsn_code") as FormControl }
    get mrp(){ return this.userForm.get("mrp") as FormControl }
    get unit_type(){ return this.userForm.get("unit_type") as FormControl }
    get item_name(){ return this.userForm.get("item_name") as FormControl }
    get item_active(){ return this.userForm.get("item_active") as FormControl }
    get item_group(){ return this.userForm.get("item_group") as FormControl }
    get sub_group(){ return this.userForm.get("sub_group") as FormControl }
    get item_category(){ return this.userForm.get("item_category") as FormControl }
    get item_type(){ return this.userForm.get("item_type") as FormControl }
    get alt_name(){ return this.userForm.get("alt_name") as FormControl }
    get mstock_unit(){ return this.userForm.get("mstock_unit") as FormControl }  
    get confirmed_by(){ return this.userForm.get("confirmed_by") as FormControl }
    get approval(){ return this.userForm.get("approval") as FormControl }
    get reason(){ return this.userForm.get("reason") as FormControl }
    get standard_rate(){ return this.userForm.get("standard_rate") as FormControl }
    get inventory_item(){ return this.userForm.get("inventory_item") as FormControl }
    get sales_item(){ return this.userForm.get("sales_item") as FormControl }
    get purchase_item(){ return this.userForm.get("purchase_item") as FormControl }
    get processed_item(){ return this.userForm.get("processed_item") as FormControl }
    get impurities_item(){ return this.userForm.get("impurities_item") as FormControl }
    get qc_require(){ return this.userForm.get("qc_require") as FormControl }
    get all_unit(){ return this.userForm.get("all_unit") as FormControl }
    get item_unit() { return this.userForm.get("item_unit") as FormControl}
    
    
    get chakki_prod(){ return this.userForm.get("chakki_prod") as FormControl }
    get roller_prod() { return this.userForm.get("roller_prod") as FormControl}
    get input_prod() { return this.userForm.get("input_prod") as FormControl}

    get item_master_alternative_dtls() {return this.userForm.get('item_master_alternative_dtls') as FormArray;}
    get item_master_stat_infos() { return this.userForm.get('item_master_stat_infos') as FormArray;}
    get item_master_inv_data1() { return this.userForm.get('item_master_inv_data1') as FormGroup;}
    get item_master_inv_data2() { return this.userForm.get('item_master_inv_data2') as FormGroup;}
    get item_master_other_info() { return this.userForm.get('item_master_other_info') as FormGroup;}
    get item_master_pack_mat_tags() { return this.userForm.get('item_master_pack_mat_tags') as FormArray;}
    get itmItem_master_qc_details() { return this.userForm.get('itmItem_master_qc_details') as FormArray;}
    get item_master_stock_details() { return this.userForm.get('item_master_stock_details') as FormArray;}
    get item_master_classification() { return this.userForm.get('item_master_classification') as FormArray;}
    get item_master_size_weight() { return this.userForm.get('item_master_size_weight') as FormArray;}
   // get itemname1(){ return this.userForm1.get("itemname1") as FormControl }
   // get itemgroup(){ return this.userForm1.get("itemgroup") as FormControl }
   // get itemcategory(){ return this.userForm1.get("itemcategory") as FormControl }
    get itemtype1(){ return this.userForm1.get("itemtype1") as FormControl }

    ngOnInit() 
    { 
      this.isHidden = false;
      this.action = 'save';
      this.hsncode='';
      this.classifieditem=false;
      this.classifieditemsize=false;
      //For User Role
      let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"item_master";
      this.company_name = localStorage.getItem("company_name");
      //this.Business_Unit=localStorage.getItem("businessunit");
      this.user_roles=localStorage.getItem("user_role");
      this.user_name = localStorage.getItem("username");
      console.log("user role:"+this.user_roles)
      if(this.user_roles == 'RL00001') 
      {
        this.usernamelock=true;
      }
      else
      {
        this.usernamelock=false;
      }
      forkJoin(
        //this.Service.getItems(this.company_name),
        
        this.DropDownListService.itemNamesNewList(),
        //this.DropDownListService.getRoleItemMaster(user_role)
        this.DropDownListService.itemTypeListFastAPI(this.company_name),
        //this.DropDownListService.itemGroupFastList(this.company_name),
        //this.DropDownListService.itemCatagoryList(this.company_name),
       
     // ).subscribe(([itemMasterData,itemtypesdata,itemGroupsData,itemCatagorieData])=>
     ).subscribe(([itemMasterData,itemtypesdata])=>
        {
          //console.log(JSON.stringify(itemMasterData))
          this.listItemMaster  = itemMasterData;
          this.listItemMasterall=itemMasterData;
          this.itemtypes=itemtypesdata;
          this.sortedData=itemMasterData;
          //this.itemGroups = itemGroupsData;
         // this.itemCatagories = itemCatagorieData;
          this.itemnamelist = itemMasterData;

          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()}); 

        let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
        this.itemmastersave = false;
        this.itemmasterupdate = false;
        this.itemmasterdelete = false;
        this.itemmasterview = false;
        this.itemmasterposting=false;
        this.lockitemname=false;
        if(accessdata.includes('item_master.save'))
             {
              this.itemmastersave = true;
             }
            if(accessdata.includes('item_master.update'))
             { 
               this.itemmasterupdate=true;
             }
             if(accessdata.includes('item_master.delete'))
             {
               this.itemmasterdelete=true;
             }
             if(accessdata.includes('item_master.view'))
             {
               this.itemmasterview=true;
             }
             if(accessdata.includes('item_master.posting'))
             {
               this.itemmasterposting=true;
             }
             this.activeIsChecked=true;
    }
    showList(s:string)
    {
      this.userForm.patchValue({reason:"0"});

      if(this.itemmastersave == true  && this.itemmasterupdate == true)//true exist  false not exist 
      {
        if(s == "add")
        { 
          this.isHidden = true;
          this.company_name = localStorage.getItem("company_name");
          forkJoin(
            this.DropDownListService.getItemSequenceId("prefix="+"ITM"+"&company="+this.company_name),
            this.DropDownListService.getSystemSettingsByComp("comp="+this.company_name),
            this.DropDownListService.itemGroupList(this.company_name),
            this.DropDownListService.itemCatagoryList(this.company_name),
            this.DropDownListService.ledgerList(),
            this.DropDownListService.getQcrulesNc(this.company_name)
            //this.DropDownListService.getCompanyBusinessUnits(this.company_name)
           ).subscribe(([seqId,settingData,itemGroupsData,itemCatagorieData,ledgerbank,qcList])=>
             {
              console.log("qcList::"+JSON.stringify(qcList))
              if(settingData["generator_status"] == "Yes")
                {
                  this.seq_no = seqId["sequenceid"];
                }
              else
                {this.itemCodeReadOnly=false;}
              this.itemGroups = itemGroupsData;
              this.itemCatagories = itemCatagorieData;
              this.ledgerbankacc=ledgerbank;
              this.qc_descriptions = qcList;
              let k = 0;
              for(let data1 of JSON.parse(localStorage.getItem("businessunit")))
              { 
                this.is_select_unit[k] = false;
                this.bussiness_unit_data = this.bussiness_unit_data + data1.businessunit_id + ",";
                k = k + 1;
              }
              this.bussiness_unit_list = JSON.parse(localStorage.getItem("businessunit"));
              //console.log("check here:"+JSON.stringify(localStorage.getItem("businessunit")));
              this.status = true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          //  this.proceeseditemshow=false;
        } 
      }
      if(this.itemmastersave == true  && this.itemmasterupdate == false)
      {
        if(s == "add")
        { 
          this.isHidden = true;
          this.company_name = localStorage.getItem("company_name");
          forkJoin(
            this.DropDownListService.getItemSequenceId("prefix="+"ITM"+"&company="+this.company_name),
            this.DropDownListService.getSystemSettingsByComp("comp="+this.company_name),
            this.DropDownListService.itemGroupList(this.company_name),
            this.DropDownListService.itemCatagoryList(this.company_name),
            //this.DropDownListService.getCompanyBusinessUnits(this.company_name)
            
           ).subscribe(([seqId,settingData,itemGroupsData,itemCatagorieData])=>
             {
              if(settingData["generator_status"] == "Yes")
                {
                  this.seq_no = seqId["sequenceid"];
                }
              else
                {this.itemCodeReadOnly=false;}
              this.itemGroups = itemGroupsData;
              this.itemCatagories = itemCatagorieData;
              let k = 0;
              for(let data1 of JSON.parse(localStorage.getItem("businessunit")))
              { 
                this.is_select_unit[k] = false;
                this.bussiness_unit_data = this.bussiness_unit_data + data1.businessunit_id + ",";
                k = k + 1;
              }
              this.bussiness_unit_list = JSON.parse(localStorage.getItem("businessunit"));
              //console.log("check here:"+JSON.stringify(localStorage.getItem("businessunit")));
              this.status = true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
            //this.proceeseditemshow=false;
        } 
      }

      if(s == "list")
      { 
        this.action='save';
        this.isHidden = false;
        this.lockitemname=false;  
        this.userForm.reset(); 
        this.ResetAllValues();
        this.activeIsChecked=true;
        this.bussiness_unit_data="";
        this.buss_unit_data="";

        
       // this.proceeseditemshow=false;
      }
    }
    ResetAllValues()
    {
      return this.userForm=this.fb.group(
          {
            id:[''],
            item_id:[''],
            item_code:[''],
            hsn_code:[''],
            item_name:[''],
            item_active: [''],
            item_group:[''],
            item_type:[''],
            item_category:[''],
            alt_name:[''],
            mstock_unit:[''],
            standard_rate:[''],
            inventory_item:[''],
            sales_item:[''],
            purchase_item:[''],
            processed_item:[''],
            impurities_item:[''],
            qc_require:[''],
            all_unit:[''],
            item_unit:[''],
            mrp:[''],
            unit_type:[''],
            confirmed_by:[''],
            approval:[''],
            reason:[''],
            company_id: [''],
            fin_year: [''],
            sub_group:[''],
            username: [''],
            chakki_prod: [''],
            roller_prod: [''],
            input_prod: [''],

            item_master_stat_infos: this.fb.array([this.fb.group({
              sl_no : this._stat_sl_no, 
              tax_code: '', 	
              tax_rate: '', 	
              eff_date: '', 	
              applicable: ''})]),
     
            item_master_inv_data1:this.fb.group({
              selling_unit: '', 
              purchase_unit:  '', 
              valuation_type:  '', 
              mrp:  '', 
              msp:  '', 
              min_inv_limit:  '', 
              eanno1:  '', 
              eanno2:  '', 
              tolerance:  '', 
              srno:  '', 
              catalog_no:  '', 
              opening_stock:'',
              std_lead_time:  '',  
              mng_by_batch:  '',
              mng_by_slno:'',}),
    
            item_master_inv_data2:this.fb.group({
              neg_inv_allow:  '', 
              manage_inv_wh:  '', 
              sales_qty:  '', 
              sales_uom:  '', 
              pur_qty:  '', 
              pur_uom:  '', 
              eoq_qty:  '', 
              eoq_uom:  '', 
              reorder_qty:  '', 
              reorder_uom:  ''}),
    
            item_master_other_info:this.fb.group({
              gen_name:  '', 
              self_life:  '', 
              exp_date:  '', 
              specific_desc:  '', 
              ser_item:  '', 
              non_store_item:  '', 
              stock_item:  ''}),
    
            item_master_pack_mat_tags:this.fb.array([this.fb.group({
              sl_no : this._pack_mat_sl_no, 
              capacity: '', 
              uom1: '', 
              empbagwt_based_on:'',
              empty_big_wt: '', 
              item_code:'', 
              item_name:'',
              tolerance: '',
              item_uom: this.mStockKeepingUnit})]),
    
            item_master_alternative_dtls:this.fb.array([this.fb.group({
              item_id_old:'',     
              hsn_code: '',
              item_name: '',
              item_group: '',
              item_category: '',
              mstock_unit: '',
              group_name:'',
              category_name:'',
              uom_name:'',
              addless:'',
              packing_cost:''})]),
              
            itmItem_master_qc_details:this.fb.array([this.fb.group({
              sl_no : this.qc_sl_no, 
              qc_code:'',
              qc_id:''})]),
              
            item_master_stock_details:this.fb.array([this.fb.group({
              businessunit:'',
              opening_stock: '',
              uom:''})]),

              item_master_classification:this.fb.array([this.fb.group({
                sl_no : this.cls_item_slno,
                classified_item_name:''
              })]),

              item_master_size_weight:this.fb.array([this.fb.group({
                sl_no : this.item_size_slno,
                item_code:'',
                master_code:'',
                item_size:'',
                item_weight:'',
                weight_tolerance:''
              })])
          });  
        
    }

    getIndexOfMatTab(event)
    {
      if(event.index == 4)
      {
        this.DropDownListService.supplierMAsterNCList().subscribe(preferedVendorData=>  {
          this.preferedVendor = preferedVendorData;
        });
       
      }
      if(event.index == 5)
      {
        this.DropDownListService.getItemCodeByPacking(this.company_name).subscribe(itemCodeData=>  {
          this.itemCodes = itemCodeData;
        }); 
      } 
      if(event.index == 6)
      {
        forkJoin(
          this.DropDownListService.employeeNamesList(this.company_name),
          this.DropDownListService.reasonList()
         ).subscribe(([employeeNames,reasonData])=>
           { 
            this.employeeNames = employeeNames;
            this.reasonIdList = reasonData;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
      } 
    }

    /*search(event)
    {
      let serchText = event.target.value;
      serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
      serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
      
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findItems(this.company_name,'0').subscribe(data=>
          {
            this.listItemMaster = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findItems(this.company_name,serchText).subscribe(data=>
          {
            this.listItemMaster = data;
            this.status = true;
          });     
        }
      }
    }*/

    add_Alternative_item()
    {
      this.item_master_alternative_dtls.push(this.fb.group({
        item_id_old:'',
        hsn_code: '',
        item_name: '',
        item_group: '',
        item_category: '',
        mstock_unit: '',
        group_name:'',
        category_name:'',
        uom_name:'',
        addless:'Add',
        packing_cost:'0'
      }));
    }

   

    mStockKeepingUnit="";
    onChangeMSKeepingUnit(msUnit: string)
    {
   
      if(msUnit.length != 0 && msUnit != "0")
      {
        this.status = false;
        this.item_master_inv_data1.patchValue({selling_unit: msUnit, purchase_unit: msUnit});
        this.item_master_inv_data2.patchValue({sales_uom:msUnit,reorder_uom:msUnit,pur_uom:msUnit,eoq_uom:msUnit});
        this.DropDownListService.getUomName(msUnit).subscribe(data=>
        { 
          this.mStockKeepingUnit = data.description;
          for(let i = 0; i<this.item_master_pack_mat_tags.length; i++)
     //changeson12-04-2022
          //    this.item_master_pack_mat_tags.at(i).patchValue({item_uom: this.mStockKeepingUnit});
          this.item_master_pack_mat_tags.at(i).patchValue({item_uom: this.mStockKeepingUnit,uom1:this.mStockKeepingUnit});
          this.status = true;
        });
      }

     
    }

    _itemGroup:any;
    getItemGroupUom(itemGroup:string)
    {
      let uomCode="";
      if(itemGroup.length)
      {
        this.status = false;
        while(this.item_master_alternative_dtls.length)
        this.item_master_alternative_dtls.removeAt(0);
        this.add_Alternative_item();
        this._itemGroup = itemGroup;
        this.DropDownListService.getItemGroupUom(itemGroup).subscribe(data=>
        {
          if(data.item_uom !='0' && data.item_uom!=undefined)
          {
            this.DropDownListService.getUomByIGroup(data.item_uom).subscribe(data=>{this.StaticCustomUOM  = data;});
          }
        });
        this.status = true;
      }    
    }

    check(event)
    {
      if(event == false)
      { 
        this.add_qc();
        this.qc_sl_no = 0;
        while(this.itmItem_master_qc_details.length)
        this.itmItem_master_qc_details.removeAt(0);
        this.add_qc();
        this.itmItem_master_qc_details.at(0).patchValue({qc_id: "0",qc_code: "0"});
      }
    }
   /* checkprocessed(event)
    {
      if(event == true)
      {
          this.proceeseditemshow=true;
      }
      else
      {
         this.userForm.patchValue({chakki_prod:0,roller_prod:0,input_prod:0})
         this.proceeseditemshow=false;
      }
    }
    */
    selectcredit(event)
    {
      let gotval=event.target.value;
      if(gotval=="yes")
      { this.isChecked1=true;}
      if(gotval=="no")
      { this.isChecked1=false;}
    }
   
    onChangeSelectAllUnit(event)
    {
      //alert(this.bussiness_unit_data)
      if(event)
      {
        this.is_select_all_unit = true;
        //alert("bidhan");
        console.log("here if ")
        for(let i = 0; i < this.is_select_unit.length; i++)
        {
        
        this.is_select_unit[i] = true;
        this.buss_unit_data = "";
        this.buss_unit_data1 = this.bussiness_unit_data;
       
        this.userForm.patchValue({item_unit: this.bussiness_unit_data.substring(0,this.bussiness_unit_data.length-1)});
        this.userForm.patchValue({all_unit: true});
        }
        this.stockbusinessunitlist(this.userForm.get("item_unit").value);

        let splitbuunit=(this.userForm.get("item_unit").value).split(",");
        console.log("length "+splitbuunit.length);
               
        
      }
      else
      {
        console.log("here else ")
        for(let i = 0; i < this.is_select_unit.length; i++)
        {
         this.is_select_unit[i] = false;
        }
        this.is_select_all_unit = false;

        this.stock_business_unit=[];

         while(this.item_master_stock_details.length) 
          this.item_master_stock_details.removeAt(0);
      }
    }

    onChangeUnit(event, list:Bussiness_Unit, index)
    {
      
      if(this.is_select_all_unit == true)
      {
        console.log("tuhin here if")
        if(event.checked)
        {
          console.log("tuhin here if if")
          this.is_select_unit[index] = false;
          this.buss_unit_data1 = this.buss_unit_data1 + list.businessunit_id+",";
          this.userForm.patchValue({item_unit:this.buss_unit_data1.substring(0,this.buss_unit_data1.length-1)});
          this.userForm.patchValue({all_unit: false})
        }
        else
        {
          console.log("tuhin here if else")
          this.is_select_unit[index] = false;
          this.buss_unit_data1 = this.buss_unit_data1.replace(list.businessunit_id+",", "");
          this.userForm.patchValue({item_unit:this.buss_unit_data1.substring(0,this.buss_unit_data1.length-1)});
          this.userForm.patchValue({all_unit: false});
          this.is_select_all_unit=false;
        }
      }
      else
      {
        console.log("tuhin here else")
        if(event.checked)
        {  
          console.log("tuhin here else if"+ this.buss_unit_data)
          this.is_select_unit[index] = true;

          console.log("busineess unuit :: "+list.businessunit_id);

          this.buss_unit_data = this.buss_unit_data + list.businessunit_id+",";
        
          this.userForm.patchValue({item_unit:this.buss_unit_data.substring(0,this.buss_unit_data.length-1)});
          this.userForm.patchValue({all_unit: false});
          let j:number=0;
          for(let i = 0; i < this.is_select_unit.length; i++)
          {
              if(this.is_select_unit[i]==true)
              {
                j++;
              }
          }
          if(j==7)
          {
            this.onChangeSelectAllUnit(event);
          }  
        }
        else
        {
         // console.log("tuhin here else else")
          this.is_select_unit[index] = false;
          this.buss_unit_data = this.buss_unit_data.replace(list.businessunit_id+",", "");
          this.userForm.patchValue({item_unit:this.buss_unit_data.substring(0,this.buss_unit_data.length-1)});
        }
      }  


        if((this.userForm.get("item_unit").value).includes("undefined"))
        {
          this.stockbusinessunitlist((this.userForm.get("item_unit").value).substring(9,(this.userForm.get("item_unit").value).length));
        }
        else
        {
          this.stockbusinessunitlist(this.userForm.get("item_unit").value);
        }
       

    }


    stockbusinessunitlist(itemunit)
    {
      while(this.item_master_stock_details.length) 
      this.item_master_stock_details.removeAt(0);
       console.log("here watch"+itemunit)
       if(itemunit.includes(","))
       {
            let splitbuunit=itemunit.split(",");

            let bu_stock:any=[];
            
            for(let i=0;i<splitbuunit.length;i++)
            {
                this.bussiness_unit_list.forEach(element => {
                      if(element.businessunit_id == splitbuunit[i])
                      {
                        bu_stock.push(element);
                      }
                });
                this.add_item_stock();
            }
          
            this.stock_business_unit=bu_stock;

       }
       else
       {
        let bu_stock:any=[];
       
            this.bussiness_unit_list.forEach(element => {
                  if(element.businessunit_id == itemunit)
                  {
                    bu_stock.push(element);
                  }
            });
        
        this.stock_business_unit=bu_stock;
        this.add_item_stock();
       }
      

    }

    onChangestockbusinessunit(index)
    {
      let current_bu=this.item_master_stock_details.at(index).get("businessunit").value;
      let dublicatestat:boolean=false; 
      for(let i=0;i<this.item_master_stock_details.length;i++)
      {   
          if(i==index)
          {}
          else
          {
            if(this.item_master_stock_details.at(i).get("businessunit").value == current_bu)
            {
              dublicatestat=true;
            }

          }
         
      }
      
      if(dublicatestat ==true)
      {
        alert("Business Unit Cant be Dublicate!!!");
        this.item_master_stock_details.at(index).patchValue({businessunit:""})
      }
      
    }

    add_item_stst() 
    {
      this._stat_sl_no =this._stat_sl_no +1;
      this.item_master_stat_infos.push(this.fb.group({
        sl_no : this._stat_sl_no, 
        tax_code: '', 	
        tax_rate: '',
        eff_date:'',
        applicable:''}));
    }

    delete_item_stst(index) 
    {
      if(this._stat_sl_no > 1)
      { 
        this.item_master_stat_infos.removeAt(index);
        this._stat_sl_no = this._stat_sl_no - 1;
      }
      else
      {
        this._stat_sl_no = 1;
        alert("can't delete all rows");
        this.item_master_stat_infos.reset();
        this.item_master_stat_infos.at(0).patchValue({sl_no:  this._stat_sl_no});
      } 
      
      for(let i=1; i<=this._stat_sl_no; i++)
        this.item_master_stat_infos.at(i-1).patchValue({sl_no: i});    
    }

    add_item_mat() 
    {
      this._pack_mat_sl_no =this._pack_mat_sl_no +1;
      this.item_master_pack_mat_tags.push(this.fb.group({
        sl_no : this._pack_mat_sl_no, 
        capacity: '', 
        uom1: this.mStockKeepingUnit,
        empbagwt_based_on:'',
        empty_big_wt: '', 
        item_code:'', 
        item_name:'',
        tolerance: '',
        item_uom: this.mStockKeepingUnit}));

        
    }

    delete_item_mat(index) 
    {
      if(this._pack_mat_sl_no > 1)
      { 
        this.item_master_pack_mat_tags.removeAt(index);
        this._pack_mat_sl_no = this._pack_mat_sl_no - 1;
      }
      else
      {
        this._pack_mat_sl_no = 1;
        alert("can't delete all rows");
        this.item_master_pack_mat_tags.reset();
        this.item_master_pack_mat_tags.at(0).patchValue({sl_no:  this._pack_mat_sl_no});
      } 
      
      for(let i=1; i<=this._pack_mat_sl_no; i++)
        this.item_master_pack_mat_tags.at(i-1).patchValue({sl_no: i});
      
    }
    
    add_classified_item() 
    {
      this.cls_item_slno =this.cls_item_slno +1;
      this.item_master_classification.push(this.fb.group({
        sl_no : this.cls_item_slno, 
        classified_item_name: '', 
        })); 
    }

    delete_classified_item(index) 
    {
      if(this.cls_item_slno > 1)
      { 
        this.item_master_classification.removeAt(index);
        this.cls_item_slno = this.cls_item_slno - 1;
      }
      else
      {
        this.cls_item_slno = 1;
        alert("can't delete all rows");
        this.item_master_classification.reset();
        this.item_master_classification.at(0).patchValue({sl_no:  this.cls_item_slno});
      } 
      
      for(let i=1; i<=this.cls_item_slno; i++)
        this.item_master_classification.at(i-1).patchValue({sl_no: i});
      
    }

    add_item_size() 
    {
      this.item_size_slno =this.item_size_slno +1;
      this.item_master_size_weight.push(this.fb.group({
        sl_no : this.item_size_slno, 
        item_code:'',
        master_code:'',
        item_size: '',
        item_weight:'',
        weight_tolerance:''
        })); 
    }

    delete_item_size(index) 
    {
      if(this.item_size_slno > 1)
      { 
        this.item_master_size_weight.removeAt(index);
        this.item_size_slno = this.item_size_slno - 1;
      }
      else
      {
        this.item_size_slno = 1;
        alert("can't delete all rows");
        this.item_master_size_weight.reset();
        this.item_master_size_weight.at(0).patchValue({sl_no:  this.item_size_slno});
      } 
      
      for(let i=1; i<=this.item_size_slno; i++)
        this.item_master_size_weight.at(i-1).patchValue({sl_no: i});
    }

    add_item_stock() 
    {
      this.item_master_stock_details.push(this.fb.group({
        businessunit: '', 
        opening_stock:'0.00',
        uom:''
       }));
    }

    add_qc() 
    {
      this.qc_sl_no = this.qc_sl_no + 1;
      this.itmItem_master_qc_details.push(this.fb.group({
        sl_no : this.qc_sl_no,
        qc_code:'',
        qc_id:''}));
    }

    delete_qc(index) 
    {
      if(this.qc_sl_no > 1)
      { 
        this.itmItem_master_qc_details.removeAt(index);
        this.qc_sl_no = this.qc_sl_no - 1;
      }
      else
      {
        this.qc_sl_no = 1;
        alert("can't delete all rows");
        this.itmItem_master_qc_details.reset();
        this.itmItem_master_qc_details.at(0).patchValue({sl_no:  this.qc_sl_no});
      } 
      
      for(let i=1; i<=this.qc_sl_no; i++)
        this.itmItem_master_qc_details.at(i-1).patchValue({sl_no: i});   
    }

    onchangeItemCode(index,event)
    {
      if(event)
      {
        this.status = false;
        this.DropDownListService.getItemNameById(event.target.value,this.company_name).subscribe(data=>
        {
          //console.log("datalist:"+JSON.stringify(data))
          this.item_master_pack_mat_tags.at(index).patchValue({item_name:data.item_name})
          this.mstock_unit1 = data.mstock_unit;
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>{
            this.uomname=data.description; 
         //changes on 12-04-2022
            //  this.item_master_pack_mat_tags.at(index).patchValue({uom1:data.description}); 
          });
          for (let h = 0; h < this.item_master_pack_mat_tags.length; h++) {
            if (this.item_master_pack_mat_tags.at(h).get("item_code").value == event.target.value && h != index) {
              window.alert("Duplicate Row");
              this.delete_item_mat(index);
            }
          }
          this.packingItemList.push({item_id:data.item_id,item_name:data.item_name});
         // console.log("packlist11:"+JSON.stringify(this.packingItemList))
        });
        this.status = true;
      }
      
    }
    
    onchangeItemCategory(item_type:string)
    {
      if(item_type.length)
      { 
        this.status = false;
        this.DropDownListService.getItemTypeNameByCode(item_type).subscribe(data=>
        {
          this.userForm.patchValue({item_type: data["item_name"]});
          if(data["item_name"]=='STORE PURCHASE')
          {
            this.classifieditem=true;
            this.classifieditemsize=false;
          }
          else if(data["item_name"]=='PACKING ITEMS')
          {
            this.classifieditemsize=true;
            this.classifieditem=false;
          }
          else{
            this.classifieditem=false;
            this.classifieditemsize=false;
          }
          this.status = true;
        });     
      }
    }

    OnChangeUnitType(UnitTpe:string)
    {
      this.DropDownListService.getCustomUOMs(UnitTpe).subscribe(data=>
        {
         this.customUOMs = data;
          this.status = true;
        });      
    }

    onChangeQcDec(index,event)
    {   
        if(event.target.value != '0')
        {  
          this.DropDownListService.getQCRuleSetupDtls(event.target.value).subscribe(data=>
          {
            this.itmItem_master_qc_details.at(index).patchValue({qc_code: data.qc_code});
          });
        }   
    }

    openDialog(event) 
    {
      if(event.target.value == "Partial")
      { 
        let dialogref=this.dialog.open(Itemmodal1Component);
        dialogref.afterClosed().subscribe(result => {});
      }
    }

    showPopUp1(index)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};
      const dialogRef = this.dialog.open(ItemMasterTaxCodeModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      { this.item_master_stat_infos.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});}); 
    }

    ItemId:any;
    itemcheck:any;
    openDialog1() 
    {
      //this.itemcodelist.
      /*alert("this.item_master_alternative_dtls.length: "+this.item_master_alternative_dtls.at(0).get('item_id_old').value)
      if(this.item_master_alternative_dtls.length>0)
      {
        for(let i = 0; i<this.item_master_alternative_dtls.length; i++)
        {
          this.itemcodelist.push(this.item_master_alternative_dtls.at(i).get('item_id_old').value);
        }
      }
      alert("this.itemlist: "+this.itemcodelist);*/
      this.ItemId= this.userForm.get("item_id").value as FormControl;
      this.itemcheck='';
        for(let i=0;i<this.item_master_alternative_dtls.length;i++)
        {
          this.itemcheck=this.itemcheck+this.item_master_alternative_dtls.at(i).get("item_id_old").value+",";
        }
       // alert(this.itemcheck= this.itemcheck.substring(0,this.itemcheck.length-1))
        // if(this.itemcheck)
        // {

        // }
        // else{this.itemcheck='NA'}
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {itemGroup: this.userForm.get("item_group").value as FormControl,ItemId:this.ItemId,itemcheck:this.itemcheck};

      const dialogRef = this.dialog.open(ItemmodalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        let i=0;
        while(this.item_master_alternative_dtls.length)
        this.item_master_alternative_dtls.removeAt(0);

        for(let data1 of data)
        {
          if(data1.checkbox == true)
          {
            this.add_Alternative_item();
            this.item_master_alternative_dtls.at(i).patchValue({
            item_id_old: data1["item_id"], hsn_code: data1["hsn_code"], item_name: data1["item_name"],
            item_group: data1["item_group"], item_category: data1["item_category"], mstock_unit:data1["mstock_unit"],
            group_name:data1["group_name"],category_name:data1["category_name"],uom_name:data1["uom_name"]
          });
            i = i+1;
          }
        }
      }); 
    }

    itemUnit:string;
    itemUnitArr:any = [];
    onUpdate(id:any,item_id:string,action)
    {
      this.lockitemname=true;
      this.status = false;
      this.isHidden = true;
      this.operation = "update";
      this.showList("add");
      this.selectedBusinessUnit = [];
      this.itemUnitArr = [];
      this.packingItemList = [];
      this.classifieditem=false;
      this.classifieditemsize=false;
      if(action == 'view')
      {
        this.action = 'view';
      }
      else 
      {this.action = 'update';
      this.itemmastersave= true;
     
      }
      
      this.Service.getItemMasterPackMatList(item_id,this.company_name).subscribe(packMatData=>
        {
          for(let data1 of packMatData)
          {
           this.packingItemList.push({item_id:data1.item_code,item_name:data1.item_name});
           //console.log("Pack list: "+JSON.stringify(this.packingItemList));
          }

      forkJoin(
        this.Service.retriveItemMaster(id),
        this.Service.getItemMasterInvData1(item_id,this.company_name),
        this.Service.retriveItemMasterInvData2(item_id,this.company_name),
        this.Service.retriveItemMasterOtherInfo(item_id,this.company_name),
        this.Service.retriveItemMasterStatInfo(item_id,this.company_name),
        this.Service.getItemMasterPackMatList(item_id,this.company_name),
        this.Service.retriveItemMasterAltDtls(item_id,this.company_name),
        this.Service.getItemQCDetails(item_id,this.company_name),
        this.Service.getItemstockDetails(item_id,this.company_name),
        this.DropDownListService.retriveClassifiedItem(item_id,this.company_name),
        this.DropDownListService.retriveItemSizeAndWeight(item_id,this.company_name),
      ).subscribe(([itemMasterData, inv1Data, inv2Data, otherInfoData, statInfoData,
          packMatData, altDtlsData, qcData,stockdata,itemClassified,sizeandweight])=>
        {
        /* if(itemMasterData["processed_item"]==1)
         {
            this.proceeseditemshow=true;
         }
         */
        

          this.itemUnit = itemMasterData["item_unit"];
          this.buss_unit_data1 = "";
         // this.stockbusinessunitlist(itemMasterData["item_unit"]);
          //console.log("boolean check ::   "+ itemMasterData["all_unit"] )
          if(this.itemUnit != null && itemMasterData["all_unit"] != true)
          {
           // this.is_select_all_unit = true;
            this.buss_unit_data1 = itemMasterData["item_unit"] + ",";
            this.buss_unit_data= itemMasterData["item_unit"]+ ",";
            this.itemUnitArr = this.itemUnit.split(','); 
          //  console.log("this.itemUnit"+this.itemUnit)
            this.bussiness_unit_list = JSON.parse(localStorage.getItem("businessunit"));  
            //alert("hi"+this.bussiness_unit_list.length)
            if(this.bussiness_unit_list.length == 1)
            {
                 this.is_select_all_unit=true;
            }
            else
            {
              for(let i = 0; i<this.bussiness_unit_list.length; i++)
              {
                for(let j = 0; j<this.itemUnitArr.length; j++)
                {   
                 // console.log(this.bussiness_unit_list[i].businessunit_id + " // " + this.itemUnitArr[j]);
                  if(this.bussiness_unit_list[i].businessunit_id == this.itemUnitArr[j])
                  {
                   // console.log(this.bussiness_unit_list[i].businessunit_id +  " // " + this.itemUnitArr[j])
                    this.is_select_unit[i] = true;
                    break;
                  }
                }
              }
            }
           
          }
          else if(itemMasterData["all_unit"] == true)
          {
            this.onChangeSelectAllUnit(true)
          }
    //console.log("end")
    this.stockbusinessunitlist(itemMasterData["item_unit"]);
          this.OnChangeUnitType(itemMasterData["unit_type"]);
         // this.OnChangeUnitType
          this.userForm.patchValue({id: itemMasterData["id"], item_id: itemMasterData["item_id"],
            item_code: itemMasterData["item_code"], company_id: itemMasterData["company_id"],unit_type:itemMasterData["unit_type"],
            item_name: itemMasterData["item_name"], item_active: itemMasterData["item_active"],
            item_group: itemMasterData["item_group"], item_type: itemMasterData["item_type"],reason:itemMasterData["reason"],
            item_category: itemMasterData["item_category"], alt_name: itemMasterData["alt_name"],approval:itemMasterData["approval"],
            mstock_unit: itemMasterData["mstock_unit"], standard_rate: itemMasterData["standard_rate"],confirmed_by:itemMasterData["confirmed_by"],
            hsn_code: itemMasterData["hsn_code"], inventory_item: itemMasterData["inventory_item"], sales_item: itemMasterData["sales_item"],
            purchase_item: itemMasterData["purchase_item"], processed_item: itemMasterData["processed_item"], impurities_item: itemMasterData["impurities_item"],
            qc_require: itemMasterData["qc_require"], all_unit: itemMasterData["all_unit"], item_unit: itemMasterData["item_unit"],sub_group: itemMasterData["sub_group"]});
          //console.log("itemMasterData: "+JSON.stringify(itemMasterData)); 

          this.item_master_inv_data1.patchValue(inv1Data);
         // console.log("inv1Data: "+inv1Data);

          this.item_master_inv_data2.patchValue(inv2Data);
          //console.log("inv2Data: "+inv2Data);

          this.item_master_other_info.patchValue(otherInfoData);
        //  console.log("otherInfoData: "+otherInfoData);

          this.add_item_stst();
          this._stat_sl_no = 0;
          while(this.item_master_stat_infos.length) 
          this.item_master_stat_infos.removeAt(0);
          for(let data1 of statInfoData)
          this.add_item_stst();
          this.item_master_stat_infos.patchValue(statInfoData);
         // console.log("statInfoData: "+statInfoData);

          this.add_item_mat();
          this._pack_mat_sl_no = 0;
          while(this.item_master_pack_mat_tags.length) 
          this.item_master_pack_mat_tags.removeAt(0);
          for(let data1 of packMatData)
          this.add_item_mat();
          this.item_master_pack_mat_tags.patchValue(packMatData);
          this.mStockKeepingUnit=packMatData[0]["item_uom"];
         //console.log("packMatData: "+packMatData);
        
        
         // console.log("altDtlsData: "+JSON.stringify(altDtlsData));
          let i =0;
          this.add_Alternative_item();    
          while(this.item_master_alternative_dtls.length)
          this.item_master_alternative_dtls.removeAt(0);        
          for(let data1 of altDtlsData)
          {
            this.add_Alternative_item();
            this.item_master_alternative_dtls.at(i).patchValue({ 
              item_id_old: data1["item_id_old"], hsn_code: data1["hsn_code"], item_name:data1["item_name"],
              item_group: data1["item_group"], item_category: data1["item_category"], mstock_unit: data1["mstock_unit"],
              group_name: data1["group_name"], category_name:data1["category_name"], uom_name:data1["uom_name"],
              addless:data1["addless"],packing_cost:data1["packing_cost"]
            });
            i = i + 1;
          }

          // this.add_qc();
          // while (this.itmItem_master_qc_details.length) 
          // this.itmItem_master_qc_details.removeAt(0);
          // for(let data1 of qcData)
          // this.add_qc();
          // this.itmItem_master_qc_details.patchValue(qcData);
          // console.log("qcData: "+JSON.stringify(qcData));

        //  console.log("qcData: "+JSON.stringify(qcData));
          let j =0;
          this.qc_sl_no = 0;
          this.add_qc();
          while(this.itmItem_master_qc_details.length)
          this.itmItem_master_qc_details.removeAt(0);
          for(let data1 of qcData)
          {
            this.add_qc();
            this.itmItem_master_qc_details.at(j).patchValue({ 
              sl_no: data1["sl_no"], qc_id: data1["qc_id"], qc_code:data1["qc_code"],
            });
            j = j + 1;
          }
          let tu=0;
          this.add_item_stock();
          while(this.item_master_stock_details.length)
          this.item_master_stock_details.removeAt(0);
          for(let data1 of stockdata)
          {
            this.add_item_stock();
            this.item_master_stock_details.patchValue(stockdata);
          }

        if(itemMasterData["item_type"]=='STORE PURCHASE')
        {
          this.classifieditem=true;
          this.add_classified_item();
          this.cls_item_slno=0;
          while(this.item_master_classification.length)
          this.item_master_classification.removeAt(0);
          for(let classdata of itemClassified)
          {
            this.add_classified_item();
            this.item_master_classification.patchValue(itemClassified);
          }
        }
        else{
          this.classifieditem=false;
        }

        if(itemMasterData["item_type"]=='PACKING ITEMS')
        {
         // console.log("size list: "+JSON.stringify(sizeandweight));
          this.classifieditemsize=true;
          this.add_item_size();
          this.item_size_slno = 0;
          while(this.item_master_size_weight.length)
          this.item_master_size_weight.removeAt(0);
        let v=0;
          for(let sizedata of sizeandweight)
          {
            this.add_item_size();
            this.item_master_size_weight.at(v).patchValue({sl_no: sizedata["sl_no"],item_code: sizedata["item_code"],master_code:sizedata["master_code"],
            item_size: sizedata["item_size"],item_weight: sizedata["item_weight"],weight_tolerance:sizedata["weight_tolerance"]});
            v=v+1;
          }
        }
        else{
          this.classifieditemsize=false;
        }

          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()}); 
      });
    }

    Id:any;
    Mrp:any;
    send()
    { 
     
      this.Id= this.userForm.get("id").value as FormControl;
      this.Mrp = this.item_master_inv_data1.get("mrp").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), mrp : this.Mrp,
      fin_year: localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      this.submitted = true;
      this.status = false;
     
      this.status =true;
      if(this.Id>0)
      {
      }
      else
      {
        let disturbbu=this.userForm.get("item_unit").value;
        if(disturbbu.includes("undefined"))
        {
          this.userForm.patchValue({item_unit:disturbbu.substring(9,disturbbu.length)})
        }
      //  alert("this " + this.userForm.get("item_unit").value);
        //console.log("chk bunit:"+ this.userForm.get("item_unit").value)
      }
      let finalout=this.userForm.get("item_unit").value;

      let splitvalue=finalout.split(",");
     // console.log("here "+splitvalue.length)
      let unlockhsn=true;
      
      if(this.userForm.get("item_category").value == "IC00011" )
      {
            unlockhsn=false;
      }



      if(unlockhsn==true && this.userForm.get("hsn_code").value == "" )
      {
        alert("Please Enter HSN Code!!!!  ");
        this.status=true;
      }
      else if(this.userForm.get("item_name").value == null || this.userForm.get("item_name").value == "" )
      {
        alert("Please Enter Item Name!!!!  ");
        this.status=true;
      }
      else if(this.userForm.get("item_unit").value=="" || this.userForm.get("item_unit").value == null)
      {
        alert("Please Check Business unit!!");
        this.status=true;
      }
      else if(this.userForm.get("item_group").value == null || this.userForm.get("item_group").value == 0 )
      {
        alert("Please Select Item Group!!!!  ");
        this.status=true;
      }
      // else if(this.userForm.get("sub_group").value == null || this.userForm.get("sub_group").value == 0 || this.userForm.get("sub_group").value == '' || this.userForm.get("sub_group").value == 'NA')
      // {
      //   alert("Please Select Item Ledger!!!!  ");
      //   this.status=true;
      // }
      else if(this.userForm.get("item_category").value == null || this.userForm.get("item_category").value == "" )
      {
        alert("Please Select Item Catagory!!!!  ");
        this.status=true;
      }
      else if(this.userForm.get("unit_type").value == null || this.userForm.get("unit_type").value == 0 )
      {
        alert("Please Select Unit Type!!!!  ");
        this.status=true;
      }
      else if(this.userForm.get("mstock_unit").value == null || this.userForm.get("mstock_unit").value == 0 )
      {
        alert("Please Select Master Stock Keeping Unit!!!!  ");
        this.status=true;
      }
      else{ 
          let statutory = false;
          let businessunit = false;
          let uom = false;
          let addlessstatus=false;
          let packingcoststatus=false;
          let alttitem=false;
          let classitem=false;
          let itemsize=false;
          let itemweight=false;
          let itemname=false;
          let mastercode=false;
          let itemtolerance = false;
          if(this.item_master_alternative_dtls.length>0)
          {
            alttitem=true;
          }

       if(alttitem == true)
       {

          for(let b=0;b<this.item_master_alternative_dtls.length;b++)
          {
              if(this.item_master_alternative_dtls.at(b).get("addless").value == null || this.item_master_alternative_dtls.at(b).get("addless").value == 0 || this.item_master_alternative_dtls.at(b).get("addless").value == 'NA')
              {
                addlessstatus = true; 
              }
              if(this.item_master_alternative_dtls.at(b).get("packing_cost").value == '' || this.item_master_alternative_dtls.at(b).get("packing_cost").value == null )
              {
                packingcoststatus = true; 
              }
          }
        }
        else 
        {
          addlessstatus = false; 
          packingcoststatus = false;
        }

        if(this.userForm.get("item_type").value == 'STORE PURCHASE'){
          for(let t=0;t<this.item_master_classification.length;t++)
          {
              if(this.item_master_classification.at(t).get("classified_item_name").value == '' || this.item_master_classification.at(t).get("classified_item_name").value == 0 || this.item_master_classification.at(t).get("classified_item_name").value == null)
              {
                classitem = true; 
              }
          }
        }else{classitem = false; }
        
      /*  if(this.userForm.get("item_type").value == 'PACKING ITEMS'){
          for(let t=0;t<this.item_master_size_weight.length;t++)
          {
            if(this.item_master_size_weight.at(t).get("item_code").value == '' || this.item_master_size_weight.at(t).get("item_code").value == 0 || this.item_master_size_weight.at(t).get("item_code").value == null)
            {
              itemname = true; 
            }
            if(this.item_master_size_weight.at(t).get("master_code").value == '' || this.item_master_size_weight.at(t).get("master_code").value == 0 || this.item_master_size_weight.at(t).get("master_code").value == null)
            {
              mastercode = true; 
            }
            if(this.item_master_size_weight.at(t).get("item_size").value == '' || this.item_master_size_weight.at(t).get("item_size").value == 0 || this.item_master_size_weight.at(t).get("item_size").value == null)
            {
              itemsize = true; 
            }
            if(this.item_master_size_weight.at(t).get("item_weight").value == '' || this.item_master_size_weight.at(t).get("item_weight").value == 0 || this.item_master_size_weight.at(t).get("item_weight").value == null)
            {
              itemweight = true; 
            }
            
            
          }
        }else{itemname=false;mastercode=false;itemsize = false;itemweight=false; }*/

          for(let b=0;b<this.item_master_stat_infos.length;b++)
          {
            if(this.item_master_stat_infos.at(b).get("tax_code").value == null || this.item_master_stat_infos.at(b).get("tax_code").value == '')
            {
              statutory = true; 
            }
          }
          //item_master_stock_details
          for(let b=0;b<this.item_master_stock_details.length;b++)
          {
            if(this.item_master_stock_details.at(b).get("businessunit").value == null || this.item_master_stock_details.at(b).get("businessunit").value == '')
            {
              businessunit = true; 
            }
            if(this.item_master_stock_details.at(b).get("uom").value == null || this.item_master_stock_details.at(b).get("uom").value == '')
            {
              uom = true; 
            }
          }
          /* if(addlessstatus ==true)
          {
           
            alert("Please Select Add/Less in Inventory Data 1 Tab!!!");
            this.status = true;
          }
          else if(packingcoststatus == true)
          {
            alert("Please Enter Packing Cost in Inventory Data 1 Tab!!!");
            this.status = true;
          } */
          if(statutory ==true)
          {
            alert("Please Enter Tax Code in Statutory Information Tab!!!");
            this.status = true;
          }
          else if(businessunit == true)
          {
            alert("Please Select  Business Unit  in Stock Tab!!!");
            this.status = true;
          }
          else if(uom == true)
          {
            alert("Please Select  uom  in Stock Tab!!!");
            this.status = true;
          }
          else if(this.userForm.get("confirmed_by").value == '' || this.userForm.get("confirmed_by").value == null || this.userForm.get("confirmed_by").value == 0)
          {
            alert("Please Select Confirmed By In Approval Tab");this.status = true;
          }
          else if(this.userForm.get("approval").value == '' || this.userForm.get("approval").value == null || this.userForm.get("approval").value == 0)
          {
            alert("Please Select Approved In Approval Tab");this.status = true;
          }
          else if(this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0)
          {
            alert("Please Select Reason In Approval Tab");this.status = true;
          }
          else if(this.userForm.get("item_type").value == 'STORE PURCHASE' && classitem == true)
          {
            alert("Please Enter Classified Item Name In Item Classification Tab");this.status = true;
          }
         /* else if(this.userForm.get("item_type").value == 'PACKING ITEMS' && itemname == true && this.item_master_pack_mat_tags.at(0).get("item_code").value.length!=0)
          {
            alert("Please Select Item Name In Item Size & Weight Tab");this.status = true;
          }
          else if(this.userForm.get("item_type").value == 'PACKING ITEMS' && mastercode == true && this.item_master_pack_mat_tags.at(0).get("item_code").value.length!=0)
          {
            alert("Please Enter Code In Item Size & Weight Tab");this.status = true;
          }
          else if(this.userForm.get("item_type").value == 'PACKING ITEMS' && itemsize == true && this.item_master_pack_mat_tags.at(0).get("item_code").value.length!=0)
          {
            alert("Please Enter Item Size In Item Size & Weight Tab");this.status = true;
          }
          else if(this.userForm.get("item_type").value == 'PACKING ITEMS' && itemweight == true && this.item_master_pack_mat_tags.at(0).get("item_code").value.length!=0)
          {
            alert("Please Enter Item Weight In Item Size & Weight Tab");this.status = true;
          }*/
         /* else if(this.userForm.get("item_type").value == 'PACKING ITEMS' && itemtolerance == true && this.item_master_pack_mat_tags.at(0).get("item_code").value.length!=0)
          {
            alert("Please Enter Tolerance In Item Size & Weight Tab");this.status = true;
          }*/
          else
              {
              if(this.Id>0)
              {
                this.status = false;
                this.Service.editItem(this.userForm.getRawValue(),this.Id).subscribe( data => 
                {
                //  console.log(this.model);
                  alert("Item Master Updated Successfully.");
                  
                  this.userForm.reset();
                  this.status = true;
                  this.isHidden = false;
                  this.ngOnInit();
                  this.showList("list");
                  this.status = true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Item master Updation Unsuccessfull...");
                //this.ngOnInit()
                });
              }
              else
              {
                this.status = false;
             this.Service.createItem(this.userForm.getRawValue()).subscribe( data => 
              {
              //  console.log(this.model);
                alert("New Item Master Created Successfully.");
                
                
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
                this.status = true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New item Master Creation Unsuccessful...");
              //this.ngOnInit()
             });
            }
      }
    } 
     
  }

  onDelete(id:any,itemid)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Item Master ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});

        this.DropDownListService.checkItemMasterUsage(itemid).subscribe(checkItem=> 
          {
           ///let dataq=JSON.parse(checkItem);
          // console.log("bidhan here::"+checkItem.status);
           if(checkItem.status=='No')
           {
            this.Service.deleteItemMaster(this.userForm.getRawValue(),id).subscribe(data=> 
              {
              //  console.log("Cat id:"+data.item_id);
                if(data.item_id=='' || data.item_id==null)
                {
                  alert("Opps!!! Can't delete this Item Master !!!");
                }else{
                  alert("Item Master Deleted successfully.");
                }
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
           }
           else{
            alert("This Item is Already Used,Can not be Deleted!! ");
           }
            
          });
       
      }  
      this.status = true;
  }

  onFocusoutCheckUnique(event: any)
  {
      if(event.target.value!=null && event.target.value!='')
        {
          this.DropDownListService.chkItemNameStat(event.target.value).subscribe(data=>
          {
            if(data.group_name=='EXIST')
            {
              //alert("Already Exist Name : "+event.target.value +" . Please Change !!!" );
              //this._itemName.nativeElement.focus();
              //this.userForm.patchValue({item_name:""});
             // this.itemmastersave=false;
             this.status=true;
            } else {
              //this.itemmastersave=true;
              this.status=true;
            }
          });
        }
  }

  chkItemCodeStatus(event: any)
  {
      if(event.target.value!=null && event.target.value!='')
        {
          this.DropDownListService.chkItemCodeStatus(event.target.value).subscribe(data=>
          {
            if(data.status=='EXIST')
            {
              alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
              this._itemCode.nativeElement.focus(); 
              this.userForm.patchValue({item_code:null});  
              this.itemmastersave=false;
            } else {
              this.itemmastersave=true;
            }
          });
        }
  }
  accountitemposting(id,action)
  {
    this.status = false;
    if(action=='Posting')
    {
      this.DropDownListService.accountitemposting(id).subscribe(data=>
        {
          console.log("export :: "+data["export"])
              if(data["export"] == 1)
              {
                alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
              }
              else
              {
                alert("Data Didn't Exported  !!!!!!!!!!!!! ");
              }
              
              this.ngOnInit();
          
              this.status = true;
  
        });
    }
    if(action=='Undo')
    {
      alert
      if(confirm("Are you sure to Posting Undo Of this Item ?"))
      {
        if(confirm("First Delete This Item Ledger From Tally!!!"))
        {
          this.DropDownListService.accountpostingUndoItemMaster(id).subscribe(data=>
            {
              if(data["export"] == 0)
              {
                alert("Account Posting Undo Sucessfully !!!!!!!!!!!!! ");
              }
              else
              {
                alert("Undo Unsucessfull  !!!!!!!!!!!!! ");
              }
              
              this.ngOnInit();
              this.isHidden = false;
              this.status = true;
            });
        }
        
      }
    }
  }

search()
 {
   //let itemname1=this.userForm1.get("itemname1").value;
   //let itemgroup=this.userForm1.get("itemgroup").value;
  // let itemcategory=this.userForm1.get("itemcategory").value;
   let itemtype1=this.userForm1.get("itemtype1").value;
  // let finyear =localStorage.getItem("financial_year");
   this.company_name = localStorage.getItem("company_name");
 
   this.status=false;
   if(itemtype1 == '' || itemtype1 == null || itemtype1 == 0)
   {
     alert("Please Select Item Name");
     this.status=true;
   }
   else
   {
    this.DropDownListService.searchItemData("itemtype1="+itemtype1+"&company_name="+this.company_name).subscribe(data=>
      {
        console.log("here data comses " + JSON.stringify(data))
        this.listItemMaster =data;
        this.sortedData=data;
        this.listItemMasterall=data;
        this.status=true;
 
      }, (error) => {this.status=true;
        alert("Item Master Not Found !!!")
        this.listItemMaster=[];
      });
   }
   
 }

 sortedData: ItemMasterList[];
 searchItem(event)
 {
   if(event.key == "Enter")
   {
     //this.listItemMaster=this.listItemMasterall.filter((item) => 
     this.sortedData=this.listItemMasterall.filter((item) => 

     (item.item_name.toLowerCase().includes((event.target.value).toLowerCase())) 
     || ((item.item_group_name.toLowerCase().includes((event.target.value).toLowerCase()))) 
     || ((item.item_category_name.toLowerCase().includes((event.target.value).toLowerCase()))) 
     || ((item.mstock_unit_name.toLowerCase().includes((event.target.value).toLowerCase()))) 
     
     )
   
   
   }
 }

 sortData(sort: Sort) {
  console.log(sort)
   const data = this.listItemMaster.slice();
   if (!sort.active || sort.direction === '') {
     this.sortedData = data;
     return;
   }

   this.sortedData = data.sort((a, b) => {
     const isAsc = sort.direction === 'asc';
     switch (sort.active) {
        case 'item_code':
         return compare(a.item_code, b.item_code, isAsc);
      
        case 'hsn_code':
         return compare(a.hsn_code, b.hsn_code, isAsc);
       
        case 'item_name':
         return compare(a.item_name, b.item_name, isAsc);
       
        case 'item_group_name':
         return compare(a.item_group_name, b.item_group_name, isAsc);
       
        case 'item_category_name':
         return compare(a.item_category_name, b.item_category_name, isAsc);
         
        case 'mstock_unit_name':
         return compare(a.mstock_unit_name, b.mstock_unit_name, isAsc);
       
        case 'item_type':
         return compare(a.item_type, b.item_type, isAsc);
         
        case 'item_active':
         return compare(a.item_active, b.item_active, isAsc);

        default:
         return 0;
     }
   });
 }

}
  
function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }