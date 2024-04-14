import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { Item_group_master } from '../../../../../../Models/ItemModel/ItemGrpMaster';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { areIterablesEqual } from '@angular/core/src/change_detection/change_detection_util';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-item-group-master',
    templateUrl: './ItemGroupMaster.component.html',
    styleUrls: ['./ItemGroupMaster.component.scss']
  })

  export class ItemGroupMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    public searchText : string;
    model:Item_group_master=new Item_group_master();
    listItem_group_master: Item_group_master[];
    itemGroups:any=[];
    Id: any;
    ledgerNames:any=[];
    company_name:any;
    isHidden=false;
    status = false;
    con_acc:any;
    groupstat:any;
    isAccountingChecked = false;
    seq_no: string;
    parentGroup:any;
    salesAcc: any;
    salesRetAss: any;
    purAcc: any;
    purRetAcc: any;
    stkTransSale: any;
    stkTransPurchase: any;
    //isValid=false;
    isValid:boolean=false;
    activeIsChecked:any;
    itemgroupsave:boolean=true;
    itemgroupupdate:boolean=true;
    itemgroupdelete:boolean=true;
    itemgroupview:boolean=true;
    action:any;
    groupname:any;

    normalactive:boolean=false;
    jobworkactive:boolean=false;
    grpServiceNames:any=[];

    @ViewChild('iCodeInput') _itemGrpCode: ElementRef;

    constructor(public fb:FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group
      ({
        id:[''],
        item_group_id:[''],
        item_group_code: [''],
        group_active: [''],
        group_name: [''],
        parent_group: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        main_group: [''],
        group_type:[''],
        
      
        item_group_master_sales_acc:this.fb.group({
          item_total :'',
          discount:'',
         // net_total :'',
         // total_bill_amt :'',
          adjplus :'',
          adjminus :'',
         // final_bill_amt :'' 
        }), 
 
        item_group_master_sales_retacc:this.fb.group({
          item_total :'',
          discount:'',
         // net_total :'',
          //total_bill_amt :'',
          adjplus :'',
          adjminus :'',
          //final_bill_amt :'' 
        }), 
  
        item_group_master_stk_trans_sale:this.fb.group({
          item_total :'',
          discount:'',
        //  net_total :'',
          //total_bill_amt :'',
          adjplus :'',
          adjminus :'',
          //final_bill_amt :'' 
        }), 

        item_group_master_pur_acc:this.fb.group({
          item_total_gl_ac :'',
          item_total_asset_gl_ac:'',
          discount_gl_ac : '',
        //  net_amt_gl_ac  :'',
          amt_after_deduction_gl_ac  :'',
          post_tax_amt_gl_ac  :'',
          payable_amt_gl_ac  :'',
          already_paid_gl_ac  :'',
          adjplus  :'',
          adjminus  :'',
          payable_party_gl_ac  :'',
          net_payable_party_gl_ac  :''
        }), 

        item_group_master_pur_retacc:this.fb.group({
          item_total_gl_ac :'',
          discount_gl_ac : '',
         // net_amt_gl_ac  :'',
          amt_after_deduction_gl_ac  :'',
          post_tax_amt_gl_ac  :'',
          payable_amt_gl_ac  :'',
          already_paid_gl_ac  :'',
          adjplus  :'',
          adjminus  :'',
          payable_party_gl_ac  :'',
          net_payable_party_gl_ac  :''
        }), 

        item_group_master_stk_trans_pur:this.fb.group({
          item_total_gl_ac :'',
          discount_gl_ac : '',
        //  net_amt_gl_ac  :'',
          amt_after_deduction_gl_ac  :'',
          post_tax_amt_gl_ac  :'',
          payable_amt_gl_ac  :'',
          already_paid_gl_ac  :'',
          adjplus  :'',
          adjminus  :'',
          payable_party_gl_ac  :'',
          net_payable_party_gl_ac  :''
        }), 
        item_group_jobwork_sales_acc:this.fb.group({
          jw_item_total :'',
          jw_item_array:'',
          jw_discount:'',
          jw_adjplus :'',
          jw_adjminus :''
        }),
        item_group_jobwork_sales_return_acc:this.fb.group({
          jw_sr_item_total :'',
          jw_sr_item_array:'',
          jw_sr_discount:'',
          jw_sr_adjplus :'',
          jw_sr_adjminus :''
        })
      });
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get item_group_id(){ return this.userForm.get("item_group_id") as FormControl }
    get item_group_code(){ return this.userForm.get("item_group_code") as FormControl }
    get group_active(){ return this.userForm.get("group_active") as FormControl }
    get group_name(){ return this.userForm.get("group_name") as FormControl }
    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get parent_group(){ return this.userForm.get("parent_group") as FormControl }
    get username(){ return this.userForm.get("username") as FormControl }
    get main_group(){ return this.userForm.get("main_group") as FormControl }
    get group_type(){ return this.userForm.get("group_type") as FormControl }

    get item_group_master_sales_acc() { return this.userForm.get('item_group_master_sales_acc') as FormGroup;}
    get item_group_master_pur_acc() { return this.userForm.get('item_group_master_pur_acc') as FormGroup;}
    get item_group_master_sales_retacc() { return this.userForm.get('item_group_master_sales_retacc') as FormGroup;}
    get item_group_master_pur_retacc() { return this.userForm.get('item_group_master_pur_retacc') as FormGroup;}
    get item_group_master_stk_trans_pur() { return this.userForm.get('item_group_master_stk_trans_pur') as FormGroup;}
    get item_group_master_stk_trans_sale() { return this.userForm.get('item_group_master_stk_trans_sale') as FormGroup;}
    get item_group_jobwork_sales_acc() { return this.userForm.get('item_group_jobwork_sales_acc') as FormGroup;}
    get item_group_jobwork_sales_return_acc() { return this.userForm.get('item_group_jobwork_sales_return_acc') as FormGroup;}



    ngOnInit()
    {
      this.action = 'save';
      //For User Role
      let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"item_master";
           this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
           let accessdata=JSON.stringify(data);
         
           this.itemgroupsave=false;
           this.itemgroupupdate=false;
           this.itemgroupdelete=false;
           this.itemgroupview = false;
           this.normalactive=false;
           this.jobworkactive=false;

           if(accessdata.includes('item_group.save'))
           {
            this.itemgroupsave=true;
           }
          if(accessdata.includes('item_group.update'))
           { 
            this.itemgroupupdate=true;
           }
           if(accessdata.includes('item_group.delete'))
           {
            this.itemgroupdelete=true;
           }
           if(accessdata.includes('item_group.view'))
           {
            this.itemgroupview=true;
           }

           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
           }); 
           
      this.groupname= '';
      this.activeIsChecked = true;
      this.company_name = localStorage.getItem("company_name");
      this.userForm.patchValue({parent_group: "0"});
  
      this.item_group_master_sales_acc.patchValue({
        item_total: "0",discount:"0",adjplus:"0",adjminus:"0"});
      
      this.item_group_master_sales_retacc.patchValue({
          item_total: "0",discount:"0",adjplus:"0",adjminus:"0"});

      this.item_group_master_stk_trans_sale.patchValue({
          item_total: "0",discount:"0",adjplus:"0",adjminus:"0"});

      this.item_group_master_pur_acc.patchValue({
            item_total_gl_ac: "0",item_total_asset_gl_ac:"0",discount_gl_ac:"0",amt_after_deduction_gl_ac:"0",post_tax_amt_gl_ac:"0",
            payable_amt_gl_ac:"0",already_paid_gl_ac:"0"  ,adjplus:"0",adjminus:"0",payable_party_gl_ac:"0",net_payable_party_gl_ac:"0"});

      this.item_group_master_pur_retacc.patchValue({
            item_total_gl_ac: "0",discount_gl_ac:"0",amt_after_deduction_gl_ac:"0",post_tax_amt_gl_ac:"0",
            payable_amt_gl_ac:"0",already_paid_gl_ac:"0"  ,adjplus:"0",adjminus:"0",payable_party_gl_ac:"0",net_payable_party_gl_ac:"0"});

      this.item_group_master_stk_trans_pur.patchValue({
           item_total_gl_ac: "0",discount_gl_ac:"0",amt_after_deduction_gl_ac:"0",post_tax_amt_gl_ac:"0",
           payable_amt_gl_ac:"0",already_paid_gl_ac:"0"  ,adjplus:"0",adjminus:"0",payable_party_gl_ac:"0",net_payable_party_gl_ac:"0"});

      this.item_group_jobwork_sales_acc.patchValue({
        jw_item_total: "0",jw_item_array:"0",jw_discount:"0",jw_adjplus:"0",jw_adjminus:"0"});

      this.item_group_jobwork_sales_return_acc.patchValue({
        jw_sr_item_total: "0",jw_sr_item_array:"0",jw_sr_discount:"0",jw_sr_adjplus:"0",jw_sr_adjminus:"0"});
          //  this.Service.getItemGroups(this.company_name).subscribe(data=>{this.listItem_group_master = data;});
          //  this.DropDownListService.getItemGroupSequenceId("prefix="+"IGM"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});
          //  this.DropDownListService.ledgerNameList().subscribe(data=>{this.ledgerNames = data;});
       forkJoin(
        this.DropDownListService.getItemGroupSequenceId("prefix="+"IGM"+"&company="+this.company_name),
        this.DropDownListService.itemGroupList(this.company_name),
        this.Service.getItemGroups(this.company_name),
        this.DropDownListService.ledgerNameList(),
        this.DropDownListService.getItemServiceList(this.company_name)
      
      ).subscribe(([Seq_No, ItemGoList, ItemGp, Ledger,grpservice])=>
        { 
          this.seq_no = Seq_No.sequenceid;
          this.itemGroups  = ItemGoList;
          this.listItem_group_master  = ItemGp;
          this.ledgerNames = Ledger;
          this.grpServiceNames=grpservice;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});
      
     this.status = true;
     }

    showList(s:string)
    {
      if(this.itemgroupsave == true  && this.itemgroupupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {        
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
          this.ngOnInit();
        }  
      }
      if(this.itemgroupsave == true  && this.itemgroupupdate == false)
      {
        if(s=="add")
        {        
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
          this.ngOnInit();
        }  
      }

      if(s=="add")
      {        
        this.isHidden=true;
      this.userForm.reset(this.ResetAllValues().value);
        this.ngOnInit();
  
      // this.item_group_master_sales_acc.patchValue({
      //   item_total: "0",discount:"0",net_total:"0",adjplus:"0",adjminus:"0",final_bill_amt:"0",total_bill_amt:"0"});
      
      // this.item_group_master_sales_retacc.patchValue({
      //     item_total: "0",discount:"0",net_total:"0",adjplus:"0",adjminus:"0",final_bill_amt:"0",total_bill_amt:"0"});

      // this.item_group_master_stk_trans_sale.patchValue({
      //     item_total: "0",discount:"0",net_total:"0",adjplus:"0",adjminus:"0",final_bill_amt:"0",total_bill_amt:"0"});

      // this.item_group_master_pur_acc.patchValue({
      //       item_total_gl_ac: "0",discount_gl_ac:"0",amt_after_deduction_gl_ac:"0",net_amt_gl_ac:"0",post_tax_amt_gl_ac:"0",
      //       payable_amt_gl_ac:"0",already_paid_gl_ac:"0"  ,adjplus:"0",adjminus:"0",payable_party_gl_ac:"0",net_payable_party_gl_ac:"0"});

      // this.item_group_master_pur_retacc.patchValue({
      //       item_total_gl_ac: "0",discount_gl_ac:"0",amt_after_deduction_gl_ac:"0",net_amt_gl_ac:"0",post_tax_amt_gl_ac:"0",
      //       payable_amt_gl_ac:"0",already_paid_gl_ac:"0"  ,adjplus:"0",adjminus:"0",payable_party_gl_ac:"0",net_payable_party_gl_ac:"0"});

      // this.item_group_master_stk_trans_pur.patchValue({
      //      item_total_gl_ac: "0",discount_gl_ac:"0",amt_after_deduction_gl_ac:"0",net_amt_gl_ac:"0",post_tax_amt_gl_ac:"0",
      //      payable_amt_gl_ac:"0",already_paid_gl_ac:"0"  ,adjplus:"0",adjminus:"0",payable_party_gl_ac:"0",net_payable_party_gl_ac:"0"});
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        
        // this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        item_group_id:[''],
        item_group_code: [''],
        group_active: [''],
        group_name: [''],
        parent_group: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        main_group: [''],
        group_type:[''],
      
        item_group_master_sales_acc:this.fb.group({
          item_total :'',
          discount:'',
         // net_total :'',
        // total_bill_amt :'',
          adjplus :'',
          adjminus :'',
         // final_bill_amt :'' 
        }), 

        
        item_group_master_sales_retacc:this.fb.group({
          item_total :'',
          discount:'',
        //  net_total :'',
          //total_bill_amt :'',
          adjplus :'',
          adjminus :'',
         // final_bill_amt :'' 
        }), 

        
        item_group_master_stk_trans_sale:this.fb.group({
          item_total :'',
          discount:'',
         // net_total :'',
         // total_bill_amt :'',
          adjplus :'',
          adjminus :'',
        //  final_bill_amt :'' 
        }), 

        item_group_master_pur_acc:this.fb.group({
          item_total_gl_ac :'',
          item_total_asset_gl_ac:'',
          discount_gl_ac : '',
         // net_amt_gl_ac  :'',
          amt_after_deduction_gl_ac  :'',
          post_tax_amt_gl_ac  :'',
          payable_amt_gl_ac  :'',
          already_paid_gl_ac  :'',
          adjplus  :'',
          adjminus  :'',
          payable_party_gl_ac  :'',
          net_payable_party_gl_ac  :''
        }), 

        item_group_master_pur_retacc:this.fb.group({
          item_total_gl_ac :'',
          discount_gl_ac : '',
       //   net_amt_gl_ac  :'',
          amt_after_deduction_gl_ac  :'',
          post_tax_amt_gl_ac  :'',
          payable_amt_gl_ac  :'',
          already_paid_gl_ac  :'',
          adjplus  :'',
          adjminus  :'',
          payable_party_gl_ac  :'',
          net_payable_party_gl_ac  :''
        }), 

        item_group_master_stk_trans_pur:this.fb.group({
          item_total_gl_ac :'',
          discount_gl_ac : '',
        //  net_amt_gl_ac  :'',
          amt_after_deduction_gl_ac  :'',
          post_tax_amt_gl_ac  :'',
          payable_amt_gl_ac  :'',
          already_paid_gl_ac  :'',
          adjplus  :'',
          adjminus  :'',
          payable_party_gl_ac  :'',
          net_payable_party_gl_ac  :''
        }), 
        item_group_jobwork_sales_acc:this.fb.group({
          jw_item_total :'',
          jw_item_array:'',
          jw_discount:'',
          jw_adjplus :'',
          jw_adjminus :''
        }),
        item_group_jobwork_sales_return_acc:this.fb.group({
          jw_sr_item_total :'',
          jw_sr_item_array:'',
          jw_sr_discount:'',
          jw_sr_adjplus :'',
          jw_sr_adjminus :'' 
        })
      });
    }

    // onChangeAccountingStatus(event)
    // {
    //   if(event.checked)
    //   {
    //     this.isAccountingChecked = true;
    //     this.ledgerNames = this.accountList;
    //   }
    //   else
    //   {
    //     this.isAccountingChecked = false;
    //      this.ledgerNames = [];
    //   }
    // }

    onUpdate(id:any,item_group_id:any,action)
    {
      this.itemgroupsave=true;
      this.status = false;
      this.isHidden = true;

       if(action == 'view')
       {this.action = 'view';}
       else
       {this.action = 'update'; }
      forkJoin(
        this.Service.retriveItemGroup(id)
      ).subscribe(([itemGrpdata])=>
        { 
         // alert(JSON.stringify(SalesAccData));
          this.userForm.patchValue({item_group_id:itemGrpdata["item_group_id"],
          item_group_code: itemGrpdata["item_group_code"], parent_group: itemGrpdata["parent_group"], main_group: itemGrpdata["main_group"],id: itemGrpdata["id"],group_name: itemGrpdata["group_name"]
          ,company_id: itemGrpdata["company_id"], username: itemGrpdata["username"],  fin_year: itemGrpdata["fin_year"], group_active: itemGrpdata["group_active"],group_type:itemGrpdata["group_type"]});
          console.log("otherInfoData: "+itemGrpdata["group_type"]);
        if(itemGrpdata["group_type"]=="Normal")
        {
          this.normalactive=true;
          this.jobworkactive=false;
      
            forkJoin(
              this.Service.getItemGroupSalesAcc(item_group_id),
              this.Service.getItemGroupPurAcc(item_group_id),
              this.Service.getItemGroupSalesRtnAcc(item_group_id),
              this.Service.getItemGroupPurRtnAcc(item_group_id),
              this.Service.getItemGroupStkTrnsPur(item_group_id),
              this.Service.getItemGroupStkTrnsSale(item_group_id)
            ).subscribe(([ SalesAccData, PurAccData,SalesRetAccData,PurRetAccData,
                          StkTransPurData,StkTransSaleData])=>
              { 

              this.item_group_master_sales_acc.patchValue(SalesAccData);   
              this.item_group_master_pur_acc.patchValue(PurAccData);
              this.item_group_master_sales_retacc.patchValue(SalesRetAccData);
              this.item_group_master_pur_retacc.patchValue(PurRetAccData);
              this.item_group_master_stk_trans_pur.patchValue(StkTransPurData);
              this.item_group_master_stk_trans_sale.patchValue(StkTransSaleData);

            this.status = true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
        }
        else if(itemGrpdata["group_type"]=="Job Work")
        {
          this.normalactive=false;
          this.jobworkactive=true;
        
          forkJoin(
            this.Service.getItemGroupJobworkSales(item_group_id),
            this.Service.getItemGroupJobworkSalesReturn(item_group_id)
          ).subscribe(([jobwork,jobworkreturn])=>
            { 

          this.item_group_jobwork_sales_acc.patchValue(jobwork);
          this.item_group_jobwork_sales_return_acc.patchValue(jobworkreturn);

          this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
        }
        else{
          this.normalactive=false;
          this.jobworkactive=false;
          this.status=true;
        }  
      });
    }

    chkItemGrpCodeStatus(event: any)
    {
        if(event.target.value!=null && event.target.value!='')
          {
            this.DropDownListService.chkItemGroupCodeStatus(event.target.value).subscribe(data=>
            {
              if(data.status=='EXIST')
              {
                alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
                this._itemGrpCode.nativeElement.focus(); 
                this.userForm.patchValue({item_group_code:null});  
                this.itemgroupsave=false;
              } else {
                this.itemgroupsave=true;
              }
            });
          }
    }
    getItemGroupjobwork(itemGroup:string)
    {
      if(itemGroup.length)
      {
        this.item_group_jobwork_sales_acc.patchValue({jw_item_total:itemGroup})
      }
    }
    getItemGroupjobwork1(itemGroup:string)
    {
      if(itemGroup.length)
      {
        this.item_group_jobwork_sales_return_acc.patchValue({jw_sr_item_total:itemGroup})
      }
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;  
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        if(this.userForm.get("group_type").value == null || this.userForm.get("group_type").value == "" || this.userForm.get("group_type").value ==0)
        {
          alert("Please Selevt Group Type !!!!  ");
          this.status=true;
        }
        else if(this.userForm.get("group_name").value == "" )
        {
          alert("Please Enter Item Group Name!!!!  ");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
              if(this.userForm.get("group_type").value=="Normal")
              {
                this.item_group_jobwork_sales_acc.removeControl('jw_item_total');
                this.item_group_jobwork_sales_return_acc.removeControl('jw_sr_item_total');
              }
              else
              {
                let jwarray:any=[];
                jwarray=this.item_group_jobwork_sales_acc.get("jw_item_total").value;
                
                let jwstring='';
              
                for(let i = 0; i < jwarray.length; i++)
                {
                  jwstring+=jwarray[i]+",";
                }
                //console.log(jwarray.length+"//"+jwarray+"///"+jwstring)
              // this.item_group_jobwork_sales_acc.patchValue({jw_item_array:jwstring.substring(0,jwstring.length-1)})
                this.item_group_jobwork_sales_acc.patchValue({jw_item_array:jwstring.substring(0,jwstring.length-1)})
                let jwsrarray:any=[];
                jwsrarray=this.item_group_jobwork_sales_return_acc.get("jw_sr_item_total").value;
                
                let jwsrstring="";
                for(let j= 0; j < jwsrarray.length; j++)
                {
                  jwsrstring+=jwsrarray[j]+",";
                }
                //this.item_group_jobwork_sales_return_acc.patchValue({jw_sr_item_array:jwsrstring.substring(0,jwsrstring.length-1)})
                this.item_group_jobwork_sales_return_acc.patchValue({jw_sr_item_array:jwsrstring.substring(0,jwsrstring.length-1)})
              }
              
               this.Service.updateItemGroup(this.userForm.getRawValue(),this.Id).subscribe(data => 
                {
                  console.log("Item Group: "+this.userForm.value);
                  alert("Item group master Updated successfully.");
                  this.status = true;
                  this.userForm.reset();
                  //refresh List;
                  this.ngOnInit();   
                  this.isHidden=false;                  
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Item group master Updation Unsuccessfull...");
                //this.ngOnInit()
              }); 
            } 
            else
            {
              if(this.userForm.get("group_type").value=="Normal")
              {
                this.item_group_jobwork_sales_acc.removeControl('jw_item_total');
                this.item_group_jobwork_sales_return_acc.removeControl('jw_sr_item_total');
              }
              else{
                  let jwarray:any=[];
                  jwarray=this.item_group_jobwork_sales_acc.get("jw_item_total").value;
                  
                  let jwstring="";
                
                  for(let i = 0; i < jwarray.length; i++)
                  {
                    jwstring+=jwarray[i]+",";
                  }
                  console.log(jwarray.length+"//"+jwarray+"///"+jwstring)
                  this.item_group_jobwork_sales_acc.patchValue({jw_item_array:jwstring.substring(0,jwstring.length-1)})

                  let jwsrarray:any=[];
                  jwsrarray=this.item_group_jobwork_sales_return_acc.get("jw_sr_item_total").value;
                  
                  let jwsrstring="";
                  for(let j= 0; j < jwsrarray.length; j++)
                  {
                    jwsrstring+=jwsrarray[j]+",";
                  }
                  this.item_group_jobwork_sales_return_acc.patchValue({jw_sr_item_array:jwsrstring.substring(0,jwsrstring.length-1)})
                }
              this.Service.createItemGroup(this.userForm.getRawValue()).subscribe(data => 
                  {
                    console.log("Item Group: "+this.userForm.value);
                    alert("Item group master created successfully.");
                    this.status = true;
                    this.userForm.reset();
                    //refresh List;
                    this.ngOnInit();   
                    this.isHidden=false;                  
                  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Item group master creation Unsuccessfull...");
                 // this.ngOnInit()
                 });
                }
        }
        } 
       }
       seleType(event)
       {
        if(event.value=="Normal")
        {
          this.normalactive=true;
          this.jobworkactive=false;
        }
        else if(event.value=="Job Work")
        {
          this.normalactive=false;
          this.jobworkactive=true;
        }
        else{
          this.normalactive=false;
          this.jobworkactive=false;
        }
        
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
             this.DropDownListService.findItemGroup('0',this.company_name).subscribe(data=>
             {
               this.listItem_group_master = data;
               this.status = true;
             });
           }
           else
           {
             this.DropDownListService.findItemGroup(serchText,this.company_name).subscribe(data=>
             {
               this.listItem_group_master = data;
               this.status = true;
             });     
           }
         }
       }

       onDelete(id:any)
       {
         this.status = false;
         if(confirm("Are you sure to delete this Item Group ?"))
         { 
          this.userForm.patchValue({username: localStorage.getItem("username")});        
          this.Service.deleteItemGroup(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              console.log("Cat id:"+data.item_group_id);
              if(data.item_group_id=='' || data.item_group_id==null)
              {
                alert("Opps!!! Can't delete this Item Group !!!");
              }else{
                alert("Item Group deleted successfully.");
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              }
              this.status = true;
              this.ngOnInit()
            });   
        }
        this.status = true;
       }

       focusOutFunctionGroupName(event: any)
       {
             this.DropDownListService.chkItemGroupStatus(event.target.value).subscribe(data=>
               {
                  this.groupstat = data.group_name;
                  if(this.groupstat=='EXIST')
                  {
                    window.alert(event.target.value +"  "+ "already exist please change" );
                    this.itemgroupsave=false;
                  }
                  else
                  {this.itemgroupsave=true}
               });
               this.groupstat='';       
       }
 

      //  onUpdate(id:any,item_group_id:any)
      //  {
      //    this.isHidden = true;
      //    this.status = false;
      //    this.Service.retriveItemGroup(id).subscribe(data=>
      //    {
      //      this.userForm.patchValue(data); 
      //      this.status = true;
      //    });
      //  }
  }
