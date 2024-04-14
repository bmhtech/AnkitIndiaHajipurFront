import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { nongoodssrn } from '../../../../../../Models/JobWork/nongoodssrn';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { NongoodssrnpopupComponent } from '../nongoodssrnpopup/nongoodssrnpopup.component';

@Component({
  selector: 'app-nongoodssrn',
  templateUrl: './nongoodssrn.component.html',
  styleUrls: ['./nongoodssrn.component.scss']
})
export class NongoodssrnComponent implements OnInit {
  
  submitted = false;
  public userForm:FormGroup;
  model:nongoodssrn=new nongoodssrn();
  isHidden:any;
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  status = false;
  srnsave:boolean=true;
  Srnno:any;
  finyear:any;
  item_sl_no = 1;
  time_sl_no = 1;
  party_sl_no = 1;
  vehicle_id_new:any;
  listSRN:any=[];
  bussiness_unit_list:any=[];
  partylist:any=[];
  vehicleList:any=[];
  ervicesublist:any=[];
  servicelist:any=[];
  selectedItemName = [];
  timeList:any=[];
  approve:any=[];
  employeeNames:any=[];
  reasonList:any=[];
  basislist:any=[];
  ledgerNames:any=[];
  send_via_list:any=[];
  servicesublist:any=[];
  rowamount:any;
  nongoodsorderlist:any=[];
  

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog)  
  { 
    this.userForm=fb.group({
      id:[''],
      srnid:[''],
      srnno:[''],
      ordertype:[''],
      b_unit:[''],
      party:[''],
      srndate:[''],
      remarks:[''],
      orderid:[''],
      pan_no:[''],
      gst_no:[''],
      cin_no:[''],
      tan_no:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      nongoodssrn_item_details:this.fb.array([this.fb.group({
        slno:this.item_sl_no,
        service_types:'',
        services : '',
        account_code:'',
        amount:'',
        taxable_amount:'',
        discount : '',
        discount_basedon:'',
        discount_amount: '',
        net_amount : '',
        tax_code:'',
        tax_rate: '',
        tax_amount : '',
        total_amount:'',
          
        nonservicesrn_desc_details:this.fb.array([this.fb.group({
            slno:'',
            desc_name:'',
            bill_period:'',
            bill_on:'',
            amount_change:'',
            desc_qty:'',
            desc_uom:'',
            desc_price:'',
            desc_total:'',
            billing_from:'',
            billing_to:'',
            duedate:'',
            remarks:'',
            serviceno:''
          })]) 
      })]),

      nongoodssrn_time_service:this.fb.array([this.fb.group({
        slno:this.time_sl_no,
        description : ''})]),

      nongoodssrn_docs: this.fb.array([this.fb.group({
        doc_name: '' })]),

    });
  }
  get id(){ return this.userForm.get("id") as FormControl }
  get srnno(){ return this.userForm.get("serviceno") as FormControl }
  get ordertype(){ return this.userForm.get("ordertype") as FormControl }
  get b_unit(){ return this.userForm.get("b_unit") as FormControl }
  get party(){ return this.userForm.get("party") as FormControl }
  get srndate(){ return this.userForm.get("billdate") as FormControl }
  get vehicle_id(){ return this.userForm.get("vehicle_id") as FormControl }
  get remarks(){ return this.userForm.get("remarks") as FormControl }
  get orderid(){ return this.userForm.get("orderid") as FormControl }
  get pan_no(){ return this.userForm.get("pan_no") as FormControl }
  get gst_no(){ return this.userForm.get("gst_no") as FormControl }
  get cin_no(){ return this.userForm.get("cin_no") as FormControl }
  get tan_no(){ return this.userForm.get("tan_no") as FormControl }
 
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
  
  get nongoodssrn_item_details(){return this.userForm.get("nongoodssrn_item_details") as FormArray};
  get nonservicesrn_desc_details(){return (<FormArray>(<FormGroup>this.userForm.get('nonservicesrn_desc_details')).get('nonservicesrn_desc_details')).controls;};
  get nongoodssrn_time_service(){return this.userForm.get("nongoodssrn_time_service") as FormArray};
  get nongoodssrn_docs(){return this.userForm.get("nongoodssrn_docs") as FormArray};

  ngOnInit() {
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    this.finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
    this.srnsave=true;
    this.vehicle_id_new='0';
    
    forkJoin(
      this.DropDownListService.getSRNlist(this.finyear),
      this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
      this.DropDownListService.getSRNNo(this.finyear),
      this.DropDownListService.getServiceTypeList(),
      this.DropDownListService.getTermAsService(),
      //this.DropDownListService.getNonServiceOrderAllList(this.currentDate),

      )
      .subscribe(([srndata,budata,srnno,service,desclist])=>
       {
         //console.log("service:"+JSON.stringify(desclist));
           this.Srnno=srnno.sequenceid;
           this.listSRN = srndata;
           this.bussiness_unit_list=budata;
           this.servicesublist=service;
           this.timeList=desclist;
          // this.nongoodsorderlist=orderlist;
       });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.srnsave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.item_sl_no=0;
      this.DropDownListService.getSRNNo(this.finyear).subscribe(srnno=>
        {
        this.Srnno=srnno.sequenceid;
        });
    while(this.nongoodssrn_item_details.length)
        this.nongoodssrn_item_details.removeAt(0);
        this.add(); 
      this.userForm.reset();
       this.ResetAllValues();
    }
  }

  ResetAllValues()
  {
  return this.userForm=this.fb.group({
    id:[''],
    srnid:[''],
      srnno:[''],
      ordertype:[''],
      b_unit:[''],
      party:[''],
      srndate:[''],
      remarks:[''],
      orderid:[''],
      pan_no:[''],
      gst_no:[''],
      cin_no:[''],
      tan_no:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      nongoodssrn_item_details:this.fb.array([this.fb.group({
        slno:this.item_sl_no,
        service_types:'',
        services : '',
        account_code:'',
        amount:'',
        taxable_amount:'',
        discount : '',
        discount_basedon:'',
        discount_amount: '',
        net_amount : '',
        tax_code:'',
        tax_rate: '',
        tax_amount : '',
        total_amount:'',
          
        nonservicesrn_desc_details:this.fb.array([this.fb.group({
            slno:'',
            desc_name:'',
            bill_period:'',
            bill_on:'',
            amount_change:'',
            desc_qty:'',
            desc_uom:'',
            desc_price:'',
            desc_total:'',
            billing_from:'',
            billing_to:'',
            duedate:'',
            remarks:'',
            serviceno:''
          })]) 
      })]),

      nongoodssrn_time_service:this.fb.array([this.fb.group({
        slno:this.time_sl_no,
        description : ''})]),

      nongoodssrn_docs: this.fb.array([this.fb.group({
        doc_name: '' })]),

    });
}

  onChangeBuUnit(BuUnit:string)
  { 
    if(BuUnit!="0")
    {
    //  console.log("BuUnit:"+BuUnit)
        this.DropDownListService.getSupplierThruBUNew(BuUnit).subscribe(PartyData=>
        {
         // console.log("PartyData:"+JSON.stringify(PartyData))
          this.partylist = PartyData;
        });
        this.getServiceOrderList();
    }  
  }

  onChangeParty(party)
  {
      this.DropDownListService.getSupplierStatDtls(party).subscribe(data1=>
        {
          //console.log("Party:"+JSON.stringify(data1))
          this.userForm.patchValue({pan_no: data1["pan_no"], gst_no: data1["gst_no"], cin_no: data1["cin_no"],
                              tan_no: data1["tan_no"] });
        });
        this.getServiceOrderList();
    }

  getServiceOrderList()
  {
   let ordertype=this.userForm.get("ordertype").value;
   let bunit=this.userForm.get("b_unit").value;
   let party=this.userForm.get("party").value;
   let srndate=this.userForm.get("srndate").value;

   if(ordertype == '' || ordertype=='[object Object]' || ordertype == null)
    {
      alert("Please Select Order Type !!!!!")
    }
    else if(bunit == '' || bunit=='undefined' || bunit == null)
    {
        alert("Please Select Bussiness Unit Name !!!!!")
    }
    else if(party == '' || party=='[object Object]' || party == null)
    {
        alert("Please Select Party Name !!!!!")
    }
    else if(srndate == '' || srndate=='undefined' || srndate == null)
    {
        alert("Please Select SRN Date !!!!!")
    }
    else
    {
      //console.log("chk data:"+ordertype+"/"+bunit+"/"+party+"/"+srndate)
      this.DropDownListService.getNonServiceOrderAllList(ordertype,bunit,party,srndate).subscribe(orderlist=>
        {
         // console.log("orderlist:"+JSON.stringify(orderlist))
          this.nongoodsorderlist=orderlist;
        });
    }

  }
  onChangeServiceNo(serviceid)
  { 
      if(serviceid!="0")
      {
        forkJoin(
          this.DropDownListService.getServiceItemList(serviceid),
          this.DropDownListService.retriveNongoodsServiceTimeService(serviceid)
          ).subscribe(([itemdata,timedata])=>
          {
           // console.log("itemdata:"+JSON.stringify(itemdata))
          let l=0;
          this.item_sl_no = 0;
          while (this.nongoodssrn_item_details.length) 
          this.nongoodssrn_item_details.removeAt(0);
          for(let data of itemdata) 
          {   
              this.add(); 
              this.DropDownListService.getServiceList(data["service_types"]).subscribe(serlist=>
                {
                  this.selectedItemName[l] = data["service_types"];
                  this.servicelist[l] = serlist;
                  this.nongoodssrn_item_details.at(l).patchValue(data);
                  l++;
                });
            }

            let n=0;
            while (this.nongoodssrn_time_service.length) 
            this.nongoodssrn_time_service.removeAt(0);
            for(let dataa2 of timedata)
            {   
              this.addTime();
              this.nongoodssrn_time_service.at(n).patchValue(dataa2);
              n++;
            }
          });
      }  
    }

  
  onChangeServiceName(index,servicetype)
  {
   this.nongoodssrn_item_details.at(index).patchValue({service_types: servicetype});
    if(servicetype.length && servicetype !=null)
    {
      this.status = false;
      this.nongoodssrn_item_details.at(index).patchValue({item: servicetype});
       
      this.DropDownListService.getServiceList(servicetype).subscribe(serlist=>
      {
       // console.log("serlist:"+JSON.stringify(serlist))
        this.servicelist[index] = serlist;
        this.selectedItemName[index]=servicetype;
        this.status = true;
      }); 

    }
  }
  add()
  {
    this.item_sl_no =this.item_sl_no +1;
    this.nongoodssrn_item_details.push(this.fb.group({
        slno:this.item_sl_no,
        service_types:'',
        services : '',
        account_code:'',
        details:'',
        service_uom:'',
        service_quantity:'',
        price : '',
        amount:'',
        taxable_amount: '',
        discount : '',
        discount_basedon:'',
        discount_amount: '',
        net_amount : '',
        tax_code:'',
        tax_rate: '',
        tax_amount : '',
        total_amount:'',

        nonservicesrn_desc_details:this.fb.array([this.fb.group({
          slno:'',
          desc_name:'',
          bill_period:'',
          bill_on:'',
          amount_change:'',
          desc_qty:'',
          desc_uom:'',
          desc_price:'',
          desc_total:'',
          billing_from:'',
          billing_to:'',
          duedate:'',
          remarks:'',
          serviceno:''
        })])

     }));
  }
  addTime()
  {
    this.time_sl_no =this.time_sl_no +1;
    this.nongoodssrn_time_service.push(this.fb.group({
      slno:this.time_sl_no,
      description : ''
    }));
  }
 
  addDoc()
    {
      this.nongoodssrn_docs.push(this.fb.group({
        doc_name:''
      }))
    }

  timedelete(index) 
    {
      if(index)
      {
        this.nongoodssrn_time_service.removeAt(index);}
      else
      {
        if(this.nongoodssrn_time_service.length>1)
        {
          this.nongoodssrn_time_service.removeAt(index);
        }
        else
        {
          alert("can't delete all rows");
        }
      }
      for(let i=1; i<=this.nongoodssrn_time_service.length; i++)
      {
        this.nongoodssrn_time_service.at(i-1).patchValue({slno: i});
        this.time_sl_no=i;
      } 
    }

  detailsPopUp(index)
  {
    let ordertype1=this.userForm.get("ordertype").value;
    let orderid=this.userForm.get("orderid").value;
    let services = this.nongoodssrn_item_details.at(index).get('services').value;    
    let srndate1 = this.userForm.get('srndate').value;
    //srn date validation for not create in same date with same order no  
    if(ordertype1 == '' || ordertype1=='undefined' || ordertype1 == null)
    {
      alert("Please Select Order Type !!!!!")
    }
   
    else if(services == '' || services=='undefined' || services == null)
    {
        alert("Please Select Service Name !!!!!")
    }
    else if(srndate1 == '' || srndate1=='undefined' || srndate1 == null)
    {
        alert("Please Select SRN Date !!!!!")
    }
    else
    {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.Id= this.userForm.get("id").value;
        this.rowamount=this.nongoodssrn_item_details.at(index).get('amount').value; 
       
        if(this.Id == null || this.Id =='')
        {
          this.Id=0;
          this.rowamount=0
        }

        dialogConfig.data = {id: this.Id, services: services,ordertype:ordertype1,srndate:srndate1,rowamount:this.rowamount,orderid:orderid};
        const dialogRef = this.dialog.open(NongoodssrnpopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe( data => 
        {
           if(data != '')
              {
                //console.log("popupdata :: "+JSON.stringify(data))
                this.nongoodssrn_item_details.at(index).patchValue({amount:data['totalamt']});
               
                (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodssrn_item_details'])
                .controls[index]).controls['nonservicesrn_desc_details']).removeAt(0);

                for(let data1 of data.nonservicesrn_desc_details)
                {
                  this.addService(index, data1);
                }
              }
        });
    }
    
  }

  addService(userIndex: number, data?: any) {
    
    console.log('userIndex', userIndex, '-------', 'data', data);
  
    let fg = this.fb.group({
      slno:data.slno,
      desc_name:data.desc_name,
      bill_period:data.bill_period,
      bill_on:data.bill_on,
      amount_change:data.amount_change,
      desc_qty:data.desc_qty,
      desc_uom:data.desc_uom,
      desc_price:data.desc_price,
      desc_total:data.desc_total,
      billing_from:data.billing_from,
      billing_to:data.billing_to,
      duedate:data.duedate,
      remarks:data.remarks,
      serviceno:data.serviceno
    });
    
    (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodssrn_item_details'])
        .controls[userIndex]).controls['nonservicesrn_desc_details']).push(fg);

}
  onChangeDescription(index,event)
  {
    this.DropDownListService.getDescCode(event).subscribe(serCode=>
      {
       this.nongoodssrn_item_details.at(index).patchValue({account_code:serCode["service_acc_code"]});
      }); 
  }
  

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl; 
    this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
    fin_year:localStorage.getItem("financial_year"), 
    username: localStorage.getItem("username")});
    this.status=false;
    
    if(this.Id> 0)
    {
      this.Service.updateNongoodsrn(this.userForm.getRawValue(),this.Id)
            .subscribe(data =>
            {
              alert("Non Goods SRN Updated successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Non Goods Service !!! please Reload the page and try again....");
              });
    }
    else{
      this.Service.createnongoodsrn(this.userForm.getRawValue())
      .subscribe(data =>
      {
        alert("Non Goods SRN Creatd successfully.");
        this.userForm.reset();
        this.isHidden = false;
        this.showList('list');
        this.ngOnInit();
        this.status=true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Wheat Receiveing Report !!! please Reload the page and try again....");
      });
    }
    
  }

  onUpdate(id,srnid,b_unit,action)
    {
      this.isHidden=true;
      if(action == "view")
      {
        this.srnsave=false;
      }
      if(action == "update")
      {
        this.srnsave=true;
      }
      this.userForm.patchValue({id:id});
      forkJoin(
        this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
        this.DropDownListService.getServiceTypeList(),
        this.DropDownListService.getTermAsService(),
        this.DropDownListService.retriveNongoodsSrn(id),
        this.DropDownListService.retriveNongoodsSrnItem(srnid),
        this.DropDownListService.retriveNongoodsSrnTime(srnid),
        this.DropDownListService.retriveNongoodsSrnDocs(srnid),
  
        )
        .subscribe(([budata,service,desclist,srndata,itemdata,timedata,docdata])=>
         {
          this.bussiness_unit_list=budata;
          this.servicesublist=service;
          this.timeList=desclist;

          forkJoin(
          this.DropDownListService.getSupplierThruBUNew(srndata["b_unit"]),
          this.DropDownListService.getNonServiceOrderAllList(srndata["ordertype"],srndata["b_unit"],srndata["party"],srndata["srndate"])
          ).subscribe(([PartyData,orderlist])=>
            {
             // console.log("PartyData:"+JSON.stringify(PartyData))
              this.partylist = PartyData;
              this.nongoodsorderlist=orderlist;
            });
          

          this.userForm.patchValue({srnno:srndata["srnno"],ordertype:srndata["ordertype"],b_unit:srndata["b_unit"],party:srndata["party"],srndate:srndata["srndate"],
          remarks:srndata["remarks"],orderid:srndata["orderid"],pan_no:srndata["pan_no"],gst_no:srndata["gst_no"],
          cin_no:srndata["cin_no"],tan_no:srndata["tan_no"],app_chgs_id:srndata["app_chgs_id"]});
         

          let k=0;
          this.item_sl_no = 0;
          while (this.nongoodssrn_item_details.length) 
          this.nongoodssrn_item_details.removeAt(0);
          for(let data1 of itemdata)
          {  
            this.add();

            forkJoin(
            this.DropDownListService.getSrnItemDetailsSerList(srnid,data1["services"]),
            this.DropDownListService.getServiceList(data1["service_types"])
            ).subscribe(([itemdynamic,serlist])=>
              {
                this.selectedItemName[k] = data1["service_types"];
                this.servicelist[k] = serlist;
               
                this.nongoodssrn_item_details.at(k).patchValue({slno:data1["slno"],service_types:data1["service_types"],services:data1["services"],account_code:data1["account_code"]
                ,amount:data1["amount"],taxable_amount:data1["taxable_amount"],discount:data1["discount"],discount_basedon:data1["discount_basedon"],discount_amount:data1["discount_amount"],
                net_amount:data1["net_amount"],tax_code:data1["tax_code"],tax_rate:data1["tax_rate"],tax_amount:data1["tax_amount"],total_amount:data1["total_amount"]});

                
                while ((<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodssrn_item_details'])
                .controls[k]).controls['nonservicesrn_desc_details']).length)

                (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodssrn_item_details'])
                .controls[k]).controls['nonservicesrn_desc_details']).removeAt(0);

                for(let item of itemdynamic)
                {
                  this.addService(k, item);
                }

                k++;
              });
          }

          let l=0;
          this.time_sl_no = 0;
          while (this.nongoodssrn_time_service.length) 
          this.nongoodssrn_time_service.removeAt(0);
          for(let data3 of timedata)
          {   
            this.addTime();
            this.nongoodssrn_time_service.at(l).patchValue(data3);
            l++;
          }

          let p=0;
          while (this.nongoodssrn_docs.length) 
          this.nongoodssrn_docs.removeAt(0);
          for(let data4 of docdata)
          {   
            this.addDoc();
            this.nongoodssrn_docs.at(p).patchValue(data4);
            p++;
          }
         });
    }
    onDelete(id)
    {
      if(confirm("Are you sure to delete this Non Goods SRN List?"))
      { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.Service.deleteNongoodsrn(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Non Goods SRN Report Deleted successfully.");
              this.userForm.reset();
              this.status = true;
              this.ngOnInit();
            });
  
      }
    }

}
