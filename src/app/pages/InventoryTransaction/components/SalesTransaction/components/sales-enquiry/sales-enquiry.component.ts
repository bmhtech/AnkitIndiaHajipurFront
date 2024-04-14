import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { SalesEnq, sales_Enquiry_Item_Dtls} from '../../../../../../Models/SalesTransaction/sales-enq';
import { SalesEnqCusPopUpComponent } from '../sales-enq-cus-pop-up/sales-enq-cus-pop-up.component';
import {MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { formatDate } from '@angular/common';
import { QcNormsPopUpComponent } from '../../components/qc-norms-pop-up/qc-norms-pop-up.component';
import {Observable, forkJoin} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';

  @Component({
    selector: 'app-sales-enquiry',
    templateUrl: './sales-enquiry.component.html',
    styleUrls: ['./sales-enquiry.component.scss']})

  export class SalesEnquiryComponent implements OnInit 
  {
    @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
    submitted = false;
    status = false;
    listSalesEnq: SalesEnq[];
    empNames:any = [];
    contNameList:any=[];
    seq_no:string;
    company_name:any
    item_codes:any = [];
    financialYear:any;
    selectedPartyName:any = [];
    selectedContactName = [];
    Id:any;
    deliveryDate:any;
    requiredDate:any;
    currentDate:any;
    bussiness_unit_list:any=[];
    enquiryType:any;
    public userForm:FormGroup;
    item_sl_no = 1; 
    party_sl_no = 1;
    model: SalesEnq = new SalesEnq();
    options: any = [];
    partyNameList:any = [];
    packingItem:any=[];
    selectedPartyModeOfEnq:any = [];
    selectedItemName:any = [];
    capacity:any = [];
    selectedPackingItem:any = [];
    empty_bag_wt:any = [];
    isHidden:any;
    action:any;
    salesenquirysave:boolean = true;
    salesenquiryupdate:boolean = true;
    salesenquiryview:boolean = true;
    
    constructor(public fb:FormBuilder,private Service:Master,public dialog: MatDialog,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group(
      {
        id:[""],
        enquiry_id: [""],
        enquiry_no: [""],
        enq_type: [""],
        enq_date:[""],
        mode_of_enq: [""],
        enq_status: [""],
        sales_person: [""],
        pre_closing:[""],
        app_deal_val: [""],
        referred_by:[""],
        remarks:[""],
        businessunit:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        sales_Enquiry_Docs: this.fb.array([this.fb.group({
          doc_name :''})]),

        sales_Enquiry_Party_Dtls: this.fb.array([this.fb.group({
          sl_no : this.party_sl_no, 
          p_code:'',
          cp_name:'',
          cp_contact:'',
          tcs_applicable:'',
          tcs_rate:'',
          mode_of_enq:''
        })]),

        sales_Enquiry_Item_Dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          quantity:'',
          uom: '',
          packing_item: '',
          packing_quantity: '',
          packing_uom: '',
          remarks:'',
          qc_norms:'',
          mat_wt:'',
          price: '',
          tax_code: '',
          tax_rate: '',
          })]),
      })

    }
    get id(){return this.userForm.get("id") as FormControl}
    get enquiry_id(){return this.userForm.get("enquiry_id") as FormControl}
    get enquiry_no(){return this.userForm.get("enquiry_no") as FormControl}
    get enq_date() { return this.userForm.get("enq_date") as FormControl }
    get enq_type() { return this.userForm.get("enq_type") as FormControl }
    get mode_of_enq() { return this.userForm.get("mode_of_enq") as FormControl }
    get enq_status() { return this.userForm.get("enq_status") as FormControl }
    get sales_person() { return this.userForm.get("sales_person") as FormControl }
    get pre_closing() { return this.userForm.get("pre_closing") as FormControl }
    get app_deal_val() { return this.userForm.get("app_deal_val") as FormControl }
    get referred_by() { return this.userForm.get("referred_by") as FormControl }
    get remarks() { return this.userForm.get("remarks") as FormControl }
    get businessunit() { return this.userForm.get("businessunit") as FormControl }
    get sales_Enquiry_Docs() { return this.userForm.get('sales_Enquiry_Docs') as FormArray; }
    get sales_Enquiry_Party_Dtls() { return this.userForm.get('sales_Enquiry_Party_Dtls') as FormArray; }
    get sales_Enquiry_Item_Dtls() { return this.userForm.get('sales_Enquiry_Item_Dtls') as FormArray; }

    enqTpes:{}
    ngOnInit() 
    {
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"sales_transaction";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.salesenquirysave=false;
    this.salesenquiryupdate = false;
    this.salesenquiryview = false;

    if(accessdata.includes('sales_enquiry.save'))
    {
     this.salesenquirysave = true;
    }
   if(accessdata.includes('sales_enquiry.update'))
    { 
      this.salesenquiryupdate=true;
    }
    if(accessdata.includes('sales_enquiry.view'))
    {
      this.salesenquiryview=true;
    }
  
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});

      this.status = false;
      this.company_name = localStorage.getItem("company_name");
      this.enqTpes=["FORMAL","INFORMAL"];
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.capacity = [];
      this.isHidden = false;
      this.empty_bag_wt = [];
      this.action = 'update';
      this.packingItem = [];
      this.selectedPartyModeOfEnq = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedPartyName = [];
      
      this.options=[ 
        {display: "EMAIL", value: "EMAIL"},
        {display: "FAX", value: "FAX"},
        {display: "IN PERSON", value: "IN PERSON"},
        {display: "TELEPHONE", value: "TELEPHONE"},
        {display: "WEBSITE", value: "WEBSITE"},  
        {display: "OTHER", value: "OTHER"}];
              
        forkJoin(
         
          this.DropDownListService.getCompanyBUMNCList(this.company_name),
         // this.DropDownListService.customerNameCodeList(this.company_name),
          this.DropDownListService.employeeNameList(this.company_name),
          this.Service.getSalesEnquiries(this.company_name),
         // ).subscribe(([companyBuData,  customerdata, employeeData, salesEnqData, ])=>
         ).subscribe(([companyBuData, employeeData, salesEnqData, ])=>
          {
            this.bussiness_unit_list = companyBuData;
            //this.partyNameList  = customerdata;
            this.empNames  = employeeData;
            this.listSalesEnq  = salesEnqData;
            this.userForm.patchValue({sales_person: "0",})
            this.sales_Enquiry_Item_Dtls.at(0).patchValue({packing_quantity: 0});
            this.sales_Enquiry_Party_Dtls.at(0).patchValue({p_code: "0"});
            this.selectedPartyName[0] = "0";
            this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()}); 
      }

    showList(s:string)
    {
      this.company_name = localStorage.getItem("company_name");
      if(this.salesenquirysave == true  && this.salesenquiryupdate == true)//true exist  false not exist 
      {
        if(s=="add")
         { 
           this.isHidden=true;
           this.DropDownListService.customerNameCodeList(this.company_name).subscribe(data=>
            {
              this.partyNameList= data;
            });
        }
      }
      if(this.salesenquirysave == true  && this.salesenquiryupdate == false)
      {
        if(s=="add")
          { 
            this.isHidden=true;
            this.DropDownListService.customerNameCodeList(this.company_name).subscribe(data=>
              {
                this.partyNameList= data;
              });
          }
      }
      
      if(s=="list")
      {
         this.isHidden  = false;
         this.userForm.reset();
         //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
         this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
         this.sales_Enquiry_Docs.reset();
         this.sales_Enquiry_Party_Dtls.reset();
         this.sales_Enquiry_Item_Dtls.reset();

         this.packingItem = [];
         this.selectedItemName = [];
         this.selectedPackingItem = [];
         this.item_sl_no = 0;

         while(this.sales_Enquiry_Item_Dtls.length)
         this.sales_Enquiry_Item_Dtls.removeAt(0);
         this.addItem();

         this.partyNameList = [];
         this.selectedPartyName = [];
         this.party_sl_no = 0;
         this.options = [];
         this.selectedPartyModeOfEnq = [];
         this.contNameList=[];


         while(this.sales_Enquiry_Party_Dtls.length)
         this.sales_Enquiry_Party_Dtls.removeAt(0);
         this.addParty();

         while(this.sales_Enquiry_Docs.length)
         this.sales_Enquiry_Docs.removeAt(0);
         this.addDocument();
      }
    }
  
    addItem() 
    {
      this.item_sl_no =this.item_sl_no +1;
      this.sales_Enquiry_Item_Dtls.push(this.fb.group({
        slno:this.item_sl_no,	
        item_code:'',
        quantity:'',
        uom: '',
        packing_item: '',
        packing_quantity: '',
        packing_uom: '',
        remarks:'',
        qc_norms:'',
        mat_wt:'',
        price: '',
        tax_code: '',
        tax_rate: '',}));   
      
      this.sales_Enquiry_Item_Dtls.at(this.item_sl_no-1).patchValue({packing_qty: 0});
    }  

   
    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.sales_Enquiry_Item_Dtls.removeAt(index);
        if(this.packingItem[index] != undefined)
        { 
          this.packingItem.splice(index, 1);
          this.selectedPackingItem.splice(index, 1);
        }
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";
        alert("can't delete all rows");
        this.sales_Enquiry_Item_Dtls.at(0).reset();
        this.sales_Enquiry_Item_Dtls.at(0).patchValue({slno:  this.item_sl_no});
        this.sales_Enquiry_Item_Dtls.at(0).patchValue({item_code: "0", packing_item: "0", packing_qty: 0});
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.sales_Enquiry_Item_Dtls.at(i-1).patchValue({slno: i});
      
    }

    addDocument() 
    {
      this.sales_Enquiry_Docs.push(this.fb.group({
        doc_name: ''}));
    }

    deleteDocument(index) 
    {
      if (index) 
      {this.sales_Enquiry_Docs.removeAt(index);}
      else 
      {
        alert("can't delete all rows");
        this.sales_Enquiry_Docs.reset();
      }
    }

    addParty()
    {
      this.party_sl_no  = this.party_sl_no+1;
      this.sales_Enquiry_Party_Dtls.push(this.fb.group({
        sl_no : this.party_sl_no,  
        p_code:'',
        cp_name:'',
        cp_contact:'',
        tcs_applicable:'',
        tcs_rate:'',
        mode_of_enq:''}));
      this.sales_Enquiry_Party_Dtls.at(this.party_sl_no - 1).patchValue({p_code: "0"});
      this.selectedPartyName[this.party_sl_no - 1] = "0";
    }

   deleteParty(index) 
    {
      if(this.party_sl_no > 1)
      { 
        this.sales_Enquiry_Party_Dtls.removeAt(index);
        this.party_sl_no = this.party_sl_no - 1;
      }
      else
      {
        this.party_sl_no = 1;
        alert("can't delete all rows");
        this.sales_Enquiry_Party_Dtls.reset();
        this.sales_Enquiry_Party_Dtls.at(0).patchValue({sl_no:  this.party_sl_no});
      } 
      
      for(let i=1; i<=this.party_sl_no; i++)
        this.sales_Enquiry_Party_Dtls.at(i-1).patchValue({sl_no: i});
      
    }

    onchangePartyModeOfEnq(modeOfEnq, index)
    {
      if(modeOfEnq.length)
      this.sales_Enquiry_Party_Dtls.at(index).patchValue({mode_of_enq: modeOfEnq})
    }

    onChangePartyName(cp_id:string, index)
    {
      this.contNameList[index] = [];
      this.sales_Enquiry_Party_Dtls.at(index).patchValue({tcs_rate: null,tcs_applicable: null, cp_contact: null});        
      if(cp_id.length)
      {
        this.status = false; 
        this.sales_Enquiry_Party_Dtls.at(index).patchValue({p_code: cp_id})
        forkJoin(
          this.DropDownListService.custAddDtlsRetriveList(cp_id,this.company_name),
          this.DropDownListService.custAccountRetriveList(cp_id,this.company_name)
        ).subscribe(([contactName, custAccData])=>
          {
            this.contNameList[index] = contactName;  
            this.sales_Enquiry_Party_Dtls.at(index).patchValue({tcs_rate: custAccData["tcs_rate"],tcs_applicable: custAccData["tcs_applicable"]});      
            this.status = true; 
          });
      }
    }

    onChangeEnquiryDate(enqDate)
    {
      this.currentDate = enqDate.target.value;
      if(this.enquiryType != "")
      {this.getEnquiryNo(this.currentDate, this.enquiryType)}
    }

    getEnquiryNo(enqDate, enqType)
    {
      this.status = false;
      this.DropDownListService.getSalesEnqSequenceId("ENQ/"+enqDate+"/"+enqType).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      });   
    }

    calItemQty(packing_qty, index)
    {
      let itemQty = this.capacity[index] * packing_qty.target.value;
      this.sales_Enquiry_Item_Dtls.at(index).patchValue({quantity: itemQty, mat_wt: itemQty});
    }

    onchangeItemName(index, itemId)
    {    
      if(itemId.length)
      {
        this.status = false;
        this.selectedPackingItem[index] = [];
        this.sales_Enquiry_Item_Dtls.at(index).patchValue({item_code: itemId})
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
          this.DropDownListService.getItemQCDetails(itemId,this.company_name)
        ).subscribe(([data, itemPack, packmatData, invData, qcdetails])=>
        {
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          {
            this.sales_Enquiry_Item_Dtls.at(index).patchValue({uom: data.description}); 
            this.status = true;
          });
          
          this.packingItem[index] = itemPack;
          this.sales_Enquiry_Item_Dtls.at(index).patchValue({price: packmatData["mrp"]});
          this.sales_Enquiry_Item_Dtls.at(index).patchValue({tax_code: invData[0].tax_code, tax_rate: invData[0].tax_rate});
          this.sales_Enquiry_Item_Dtls.at(index).patchValue({qc_norms:qcdetails[0].qc_code});
        });       
      }
    }

    itemId: any;
    packingQty:any;
    onchangePackingItem(index, packingId)
    {
      if(packingId.length)
      {
        this.status = false;
        this.selectedPackingItem[index] = packingId;
        this.sales_Enquiry_Item_Dtls.at(index).patchValue({packing_item: packingId})
        this.itemId =  this.sales_Enquiry_Item_Dtls.at(index).get("item_code").value as FormControl;
        this.packingQty = this.sales_Enquiry_Item_Dtls.at(index).get("packing_quantity").value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, packingId,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.sales_Enquiry_Item_Dtls.at(index).patchValue({packing_uom: data.uom1, quantity: this.capacity[index] * this.packingQty}); 
          this.status = true;
        });
      }
    }
 
    openDialog()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: 0};
      const dialogRef = this.dialog.open(SalesEnqCusPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      { 
        if(data != '' && data["cp_Id"] != "0")
        {
          let  j=0; 
          this.contNameList = [];
          this.selectedContactName = [];
          this.selectedPartyName = [];
          this.addParty()
          this.party_sl_no = 0;  
          while(this.sales_Enquiry_Party_Dtls.length)
          {this.sales_Enquiry_Party_Dtls.removeAt(0);}

          this.status = false;
          forkJoin(
            this.DropDownListService.custAddDtlsRetriveList(data["cp_Id"],this.company_name),
            this.DropDownListService.custAccountRetriveList(data["cp_Id"],this.company_name)
          ).subscribe(([contactName, custAccData])=>
            { 
              this.status = true;
              this.addParty();  
              this.contNameList[j] = contactName;
              this.selectedPartyName[j] = data["cp_Id"];
              this.selectedContactName[j] = data["contact_person"]
              this.sales_Enquiry_Party_Dtls.at(j).patchValue({p_code: data["cp_Id"], tcs_rate: custAccData["tcs_rate"],tcs_applicable: custAccData["tcs_applicable"]});        
              j = j + 1;      
            }); 
        }
      });
    }

    itemCode:any;
    showPopUp2(index)
    {
      this.itemCode = this.sales_Enquiry_Item_Dtls.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemCode};
      const dialogRef = this.dialog.open(QcNormsPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.sales_Enquiry_Item_Dtls.at(index).patchValue({qc_norms: data["qc_code"]});
      }); 
    }

    onChangeBuUnit(BuUnit)
    {  
     
       this.DropDownListService.getItemThruSalesThruBU(BuUnit,this.company_name).subscribe(data=>
          {this.item_codes = data;
            // this.status = true;
          }); 
    
    }

    partnerId:any;
    onchangeContactName(index, event)
    {
      this.sales_Enquiry_Party_Dtls.at(index).patchValue({cp_contact: null});
      if(event.target.value != "0")
      {
        this.status = false;
        this.partnerId = this.sales_Enquiry_Party_Dtls.at(index).get("p_code").value as FormControl;
        this.DropDownListService.custContactByName(this.partnerId, event.target.value,this.company_name).subscribe(data=>{
        this.sales_Enquiry_Party_Dtls.at(index).patchValue({cp_contact: data.mobile});  this.status = true; });
      }
    }

    enqType = "";
    onChangeEnquiryType(enquiry_type:string)
    {
      this.enquiryType = enquiry_type;
      this.getEnquiryNo(this.currentDate , enquiry_type)
      if(enquiry_type == "FORMAL")
      {this.enqType = "FORMAL";}
      else{this.enqType = "INFORMAL";}
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({
        company_id: localStorage.getItem("company_name"), fin_year:localStorage.getItem("financial_year"),
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
        if(this.Id>0)
        {
          this.Service.updateSalesEnquiries(this.userForm.getRawValue(),this.Id).subscribe( data => 
          {
            console.log(this.userForm.value);
            alert("Sales Enquiry is Updated Successfully...");
            this.userForm.reset();
            //Refresh Dynemic Table
            this.contNameList = [] ;
            this.packingItem = [];    
  
            this.item_sl_no = 0;
            while(this.sales_Enquiry_Item_Dtls.length)
            this.sales_Enquiry_Item_Dtls.removeAt(0);
            this.addItem();
  
            this.party_sl_no = 0; 
            while(this.sales_Enquiry_Party_Dtls.length)
            this.sales_Enquiry_Party_Dtls.removeAt(0);
            this.addParty();      
            
            while(this.sales_Enquiry_Docs.length)
            this.sales_Enquiry_Docs.removeAt(0);
            this.addDocument();

            this.ngOnInit();
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()}); 
        }
        else
        {
           console.log("sales Enq: "+JSON.stringify(this.userForm.value));
          this.Service.createSalesEnquiry(this.userForm.getRawValue()).subscribe( data => 
          {
            console.log(this.userForm.value);
            alert("Sales Enquiry is Created Successfully...");
            this.userForm.reset();
    
            //Refresh Dynemic Table
            this.contNameList = [] ;
            this.packingItem = [];    
  
            this.item_sl_no = 0;
            while(this.sales_Enquiry_Item_Dtls.length)
            this.sales_Enquiry_Item_Dtls.removeAt(0);
            this.addItem();
  
            this.party_sl_no = 0; 
            while(this.sales_Enquiry_Party_Dtls.length)
            this.sales_Enquiry_Party_Dtls.removeAt(0);
            this.addParty();      
            
            while(this.sales_Enquiry_Docs.length)
            this.sales_Enquiry_Docs.removeAt(0);
            this.addDocument(); 

            this.ngOnInit();
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()}); 
        }
      }
    }  

    onUpdate(id:any, enquiry_id:string, action)
    {
      this.company_name = localStorage.getItem("company_name");
      this.salesenquirysave = true;
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
      this.packingItem = []; 
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedPartyName = [];
      this.selectedPartyModeOfEnq = []; 
      this.contNameList = [];
      this.options=[ 
        {display: "EMAIL", value: "EMAIL"},
        {display: "FAX", value: "FAX"},
        {display: "IN PERSON", value: "IN PERSON"},
        {display: "TELEPHONE", value: "TELEPHONE"},
        {display: "WEBSITE", value: "WEBSITE"},  
        {display: "OTHER", value: "OTHER"}];

      if(action == 'view')
      {this.action = 'view';}
      else
      {this.action = 'update'; }

      forkJoin(
        this.Service.SalesEnquiriesRetrive(id),
        this.Service.getSalesEnqItemDtls(enquiry_id),
        this.Service.getSalesEnqPartyDtls(enquiry_id),
        this.Service.getSalesEnqDoc(enquiry_id),
        this.DropDownListService.customerNameCodeList(this.company_name)
      ).subscribe(([salesEnqdata, itemData, partyData,docData,partyDataList])=>
        {

         // onChangeBuUnit(BuUnit);
        this.onChangeBuUnit(salesEnqdata["businessunit"]);
        this.partyNameList  = partyDataList;
          console.log("item data:"+JSON.stringify(itemData))
          this.enquiryType = salesEnqdata["enq_type"];
          this.currentDate = salesEnqdata["enq_date"];
          this.userForm.patchValue(salesEnqdata);
          console.log("Enq: "+JSON.stringify(salesEnqdata));

          let k = 0;
          console.log("itemData: "+JSON.stringify(itemData));
          this.addItem();
          this.item_sl_no = 0;
          while (this.sales_Enquiry_Item_Dtls.length) 
          this.sales_Enquiry_Item_Dtls.removeAt(0);
          for(let data1 of itemData)
          {
            this.status = false;
             forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.addItem();  
                console.log(" data1 " + data1["item_code"])
                this.selectedItemName[k] = data1["item_code"];

                // this.selectedItemName[k] = data1["item_code"];
                this.selectedPackingItem[k] = data1["packing_item"];
                this.packingItem[k] = packingList;
                this.capacity[k] = capacityEmptyWt.capacity; 
                this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
                this.sales_Enquiry_Item_Dtls.at(k).patchValue(data1);
                k = k + 1;
                this.status = true;
              }); 
          }

          let i = 0;
          console.log("partyData: "+JSON.stringify(partyData));
          this.addParty();
          this.party_sl_no = 0;
          while (this.sales_Enquiry_Party_Dtls.length) 
          { this.sales_Enquiry_Party_Dtls.removeAt(0);}
          for(let data1 of partyData)
          { 
            this.status = false;
            this.DropDownListService.custAddDtlsRetriveList(data1["p_code"],this.company_name).subscribe(cName=>
            {
              this.addParty();
              this.selectedPartyName[i] = data1["p_code"];
              this.selectedPartyModeOfEnq[i] = data1["mode_of_enq"];
              this.contNameList[i]  = cName;
              this.sales_Enquiry_Party_Dtls.at(i).patchValue(data1);
              i= i + 1;
              this.status = true;
            });  
          }

          this.addDocument();
          while (this.sales_Enquiry_Docs.length) 
          {this.sales_Enquiry_Docs.removeAt(0);}
          for(let data1 of docData)
          { this.addDocument();}
          this.sales_Enquiry_Docs.patchValue(docData);
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()}); 
     }
  }
