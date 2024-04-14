import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { LoadingWeightment } from '../../../../../../Models/Weightment/loading-weightment';
import { formatDate } from '@angular/common';

  @Component({
    selector: 'app-loading-weighment',
    templateUrl: './loading-weighment.component.html',
    styleUrls: ['./loading-weighment.component.scss']})

  export class LoadingWeighmentComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: LoadingWeightment = new LoadingWeightment();
    listLoadingWeightment: LoadingWeightment[];
    customList:any = [];
    vehicleTypeList:any = [];
    currentDate:any;
    seq_no:any;
    status = false;
    srl = 1;

    constructor(public fb:FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group(
      {
        wgment_no: [''],
        weight: [''],
        wgment_date: [''],
        wgment_for: [''],
        ref_doc_no: [''],
        ref_doc_date: [''],
        veh_no: [''], 
        veh_type:[''], 
        customer:[''],
        gross_weight: [''],
        gw_unit: [''],
        gw_date: [''],
        gw_time: [''],
        gw_remarks: [''], 
        tare_weight:[''],
        tw_unit:[''],
        tw_date: [''],
        tw_time: [''],
        tw_remarks: [''],
        net_weight: [''],
        nw_unit: [''],
        digital_weight: [''],
        wgment_charge: [''],
        wgment_rs: [''],

        wm_loading_wgmnt_dtls: this.fb.array([this.fb.group({
          sl_no: this.srl,
          customer:'',
          advice:'',
          wgment_date:''})])
      });
    }

    get wgment_no(){return this.userForm.get("wgment_no") as FormControl}
    get weight(){ return this.userForm.get("weight") as FormControl }
    get wgment_date(){return this.userForm.get("wgment_date") as FormControl}
    get wgment_for(){ return this.userForm.get("wgment_for") as FormControl }
    get ref_doc_no(){ return this.userForm.get("ref_doc_no") as FormControl }
    get ref_doc_date(){ return this.userForm.get("ref_doc_date") as FormControl }
    get veh_no(){ return this.userForm.get("veh_no") as FormControl }
    get veh_type(){ return this.userForm.get("veh_type") as FormControl }
    get customer(){ return this.userForm.get("customer") as FormControl }
    get gross_weight(){ return this.userForm.get("gross_weight") as FormControl }
    get gw_date(){ return this.userForm.get("gw_date") as FormControl }
    get gw_time(){ return this.userForm.get("gw_time") as FormControl }
    get gw_remarks(){ return this.userForm.get("gw_remarks") as FormControl }
    get tare_weight(){ return this.userForm.get("tare_weight") as FormControl}
    get tw_unit(){ return this.userForm.get("tw_unit") as FormControl }
    get tw_date(){ return this.userForm.get("tw_date") as FormControl }
    get tw_time(){ return this.userForm.get("tw_time") as FormControl }
    get tw_remarks(){ return this.userForm.get("tw_remarks") as FormControl }
    get net_weight(){ return this.userForm.get("net_weight") as FormControl }
    get nw_unit(){ return this.userForm.get("nw_unit") as FormControl }
    get digital_weight(){ return this.userForm.get("digital_weight") as FormControl }
    get wgment_charge(){ return this.userForm.get("wgment_charge") as FormControl }
    get wgment_rs(){ return this.userForm.get("wgment_rs") as FormControl }
    get wm_loading_wgmnt_dtls(){ return this.userForm.get('wm_loading_wgmnt_dtls') as FormArray;}

    
    ngOnInit() 
    {
      this.DropDownListService.vehicleCodeList().subscribe(data=>{this.vehicleTypeList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      this.DropDownListService.getSequenceId("LWT").subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.DropDownListService.customUOMList().subscribe(data=>{this.customList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      this.Service.getLoadingWtmnts().subscribe(data=>{this.listLoadingWeightment  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      this.status = true;
    }

    add() 
    {
      this.srl = this.srl + 1;
      this.wm_loading_wgmnt_dtls.push(this.fb.group({
        sl_no: this.srl,
        customer:'',
        advice:'',
        wgment_date:''}));
    }

    delete(index) 
    {
      if(this.srl > 1)
      { 
        this.wm_loading_wgmnt_dtls.removeAt(index);
        this.srl = this.srl - 1;
      }
      else
      {
        this.srl = 1;
        alert("can't delete all rows");
        this.wm_loading_wgmnt_dtls.reset();
        this.wm_loading_wgmnt_dtls.at(0).patchValue({sl_no:  this.srl});
      } 
      
      for(let i=1; i<=this.srl; i++)
        this.wm_loading_wgmnt_dtls.at(i-1).patchValue({sl_no: i});
    }

    isHidden = false;
    showList(s:string)
    {
      if(s=="add")
      {this.isHidden=true;}

      if(s=="list")
      {this.isHidden=false;}
    }

    send()
    {
      this.submitted = true;

      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        this.Service.createLoadingWtmnt(this.userForm.value).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New Acc_acceptance_norms created successfully.");
          this.userForm.reset();
          this.status = true;
          //refresh List;
          this.DropDownListService.vehicleCodeList().subscribe(data=>{this.vehicleTypeList  = data;});
          this.DropDownListService.getSequenceId("LWT").subscribe(data=>{this.seq_no = data.sequenceid;});
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.DropDownListService.customUOMList().subscribe(data=>{this.customList = data;});
          this.Service.getLoadingWtmnts().subscribe(data=>{this.listLoadingWeightment  = data;});  
          //Refresh Dynemic Table
          this.srl = 0;
          while(this.wm_loading_wgmnt_dtls.length) 
          this.wm_loading_wgmnt_dtls.removeAt(0);
          this.add();              
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});      
      }
    }  

  }
