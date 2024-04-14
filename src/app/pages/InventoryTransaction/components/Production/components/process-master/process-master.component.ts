import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl ,FormArray} from '@angular/forms';
import { Process_master } from '../../../../../../Models/ProductionModel/process-master';
import { MatDialog } from '@angular/material';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import * as fileSaver from 'file-saver';

//import { toLocaleString } from 'moment';

@Component({
  selector: 'app-process-master',
  templateUrl: './process-master.component.html',
  styleUrls: ['./process-master.component.scss']
})
export class ProcessMasterComponent implements OnInit {

  submitted = false;
  public userForm:FormGroup;
  seq_no:string;
  NoOfShift:any;
  isHidden=false;
  status = false;
  Id : any;
  BuUnit:any;
  freq:any;
  isPeriod=false;
  isShift=false;
  isShiftno=false;
  isShifthrs=false;
  model: Process_master = new Process_master();
  listProcess_master: Process_master[];
  Processfrequency:any = [];
  bussiness_unit_list:any=[];
  ShopFloorList: any=[];
  company_name:any;
  isspecial=false;
  processmastersave:boolean = true;
  processmasterupdate:boolean = true;
  myFiles:any = [];
 file_name:string;
 itemGroups:any = [];

  constructor
  (
    public fb:FormBuilder,
    public dialog: MatDialog,
    private Service : Master,
    private DropDownListService: DropdownServiceService
  ) 
  
  {      
    this.userForm=fb.group({
      id :[''],
      process_no: [''],
      process_id:[''],
      business_unit: [''],
      shop_floor: [''],
      process_desc: [''],
      process_type: [''],
      process_freq: [''],
      perd_day: [''],
      process_mntnce: [''],
      process_type1:[''],
      shift_no: [''],
      shift_mntnce: [''],
      shift_start_time: [''],
      shift_end_time: [''],
      process_active: [''],
      company_id:[''],
      fin_year:[''],
      username:[''],
      tot_shift_hrs:[''],
      item_group:[''],
      itemgroup_array:[''],

      process_master_doc: this.fb.array([this.fb.group({
        doc_name:'',
        doc_pdf:'',
       // fetch_doc:''
       })]),
       
       process_master_doc_list: this.fb.array([this.fb.group({
        doc_name:'',
       doc_pdf:'',
       
       })]),

      process_master_shift_details: this.fb.array([this.fb.group({
        shiftno:this.input_sl_no })])
    }); 

  }

  get id(){ return this.userForm.get("id") as FormControl }
  get process_id(){ return this.userForm.get("process_id") as FormControl }
  get process_no(){ return this.userForm.get("process_no") as FormControl }
  get process_desc(){ return this.userForm.get("process_desc") as FormControl }
  get process_type(){ return this.userForm.get("process_type") as FormControl }
  get process_freq(){ return this.userForm.get("process_freq") as FormControl }
  get perd_day(){ return this.userForm.get("perd_day") as FormControl }
  get process_mntnce(){ return this.userForm.get("process_mntnce") as FormControl }
  get process_type1(){ return this.userForm.get("process_type1") as FormControl }
  get shift_no(){ return this.userForm.get("shift_no") as FormControl }
  get shift_mntnce(){ return this.userForm.get("shift_mntnce") as FormControl }
  get shift_start_time(){ return this.userForm.get("shift_start_time") as FormControl }
  get shift_end_time(){ return this.userForm.get("shift_end_time") as FormControl }
  get process_active(){ return this.userForm.get("process_active") as FormControl }
  get shop_floor(){ return this.userForm.get("shop_floor") as FormControl }
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get tot_shift_hrs(){ return this.userForm.get("tot_shift_hrs") as FormControl }
 get itemgroup_array(){ return this.userForm.get("itemgroup_array") as FormControl }
  get item_group(){ return this.userForm.get("item_group") as FormControl }

  get process_master_doc()
  {return this.userForm.get('process_master_doc') as FormArray;}

  
  get process_master_doc_list()
  {return this.userForm.get('process_master_doc_list') as FormArray;}

  get process_master_shift_details()
  {return this.userForm.get('process_master_shift_details') as FormArray;}
  

  showList(s:string)
  {
    if(this.processmastersave == true  && this.processmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.isPeriod=false;
          this.isShift=false;
          this.isShiftno=false;
          this.isShifthrs=false;
          this.userForm.reset(this.ResetAllValues().value);      
        }
      }
      if(this.processmastersave == true  && this.processmasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.isPeriod=false;
          this.isShift=false;
          this.isShiftno=false;
          this.isShifthrs=false;
          this.userForm.reset(this.ResetAllValues().value);      
        }
      }
    
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset(this.ResetAllValues().value);
      this.DropDownListService.getPMSequenceId(this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()}); 
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id :[''],
      process_no: [''],
      process_id:[''],
      business_unit: [''],
      shop_floor: [''],
      process_desc: [''],
      process_type: [''],
      process_freq: [''],
      perd_day: [''],
      process_mntnce: [''],
      process_type1:[''],
      shift_no: [''],
      shift_mntnce: [''],
      shift_start_time: [''],
      shift_end_time: [''],
      process_active: [''],
      company_id:[''],
      fin_year:[''],
      username:[''], 
      tot_shift_hrs:[''],
     item_group:[''],
     itemgroup_array:[''],
      process_master_doc: this.fb.array([this.fb.group({
        doc_name:'',
        doc_pdf:'' })]), 
        
        process_master_doc_list: this.fb.array([this.fb.group({
          doc_name:'',
         doc_pdf:'',
         
         })]),
  

      process_master_shift_details: this.fb.array([this.fb.group({
        shiftno:this.input_sl_no })]),
   
      });

  }

  ngOnInit() 
    {
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.processmastersave = false;
    this.processmasterupdate = false;

    if(accessdata.includes('process_master.save'))
    {
     this.processmastersave = true;
    }
   if(accessdata.includes('process_master.update'))
    { 
      this.processmasterupdate=true;
    }

   
    
      //this.userForm.patchValue({shift_start_time:new Date().getHours() + ':' + new Date().getMinutes()});

      this.company_name = localStorage.getItem("company_name");
     

      //this.Service.findAllProcess()
      this.Service.findAllProcessList()
      .subscribe(data=>{this.listProcess_master  = data;},
         (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.getPMSequenceId(this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      this.userForm.patchValue({business_unit:"0"});
      this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bussiness_unit_list = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   

      this.DropDownListService.itemGroupList(this.company_name).subscribe(data=>{this.itemGroups = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()}); 
      this.status = true;
    }

    time1:any;
    time:any;
    tothrs:any;
 
    meetingStartTimeFormControl:any;
    
    onChangeEvent(event)
    {

      this.tothrs=this.userForm.get("tot_shift_hrs").value;

      this.DropDownListService.getShiftEndtime(event.target.value,this.tothrs).subscribe(data=>
        {
          this.userForm.patchValue({shift_end_time:data["shift_end_time"]});
        });

     // http://139.99.83.253:8080/AnkitIndiaTest/AnkitIndia/getShiftTime/2020-10-27T11:34/360

    }

    _procs_shift:any;
      _procs_shift_no:any;
      _process_freq:any;
    onInputPeriodDays(event)
    {
     
      this.procs_shift_no = this.userForm.get("shift_no").value;
      this._process_freq=this.userForm.get("process_freq").value;
      this._procs_shift=this.userForm.get("process_mntnce").value;
      this. calculatetotalshifttime( this._process_freq,this.procs_shift_no,event.target.value,this._procs_shift);
    }


    
    _procs_period:any;
    _process_freq1:any;
    _process_maint:any;
    input_sl_no =1;

    onInputNoofShift(event)
    {
      this._procs_period = this.userForm.get("perd_day").value;
      this._process_freq1=this.userForm.get("process_freq").value;
      this._process_maint=this.userForm.get("process_mntnce").value;
    
     // window.alert(this._process_freq1+" , "+event.target.value+" , "+ this._procs_period+" , "+this._process_maint)
      //Periodic , 30 , 10 , Yes
      this. calculatetotalshifttime(this._process_freq1,event.target.value,this._procs_period,this._process_maint);

    }

    addDocument()
    {
      this.process_master_doc.push(this.fb.group({
      doc_name : '',
      doc_pdf : '' 
    }));
    }

    addDocumentlist()
    {
      this.process_master_doc_list.push(this.fb.group({
      doc_name : '',
      doc_pdf : '' 
    }));
    }

    deleteDocument(index)
    {
      if(index)
      { 
       
        this.process_master_doc.removeAt(index);
        this.myFiles.splice(index,1);
      }
      else
      {
        alert("can't delete all rows");
        this.process_master_doc.reset();

      }
    }

    deleteDocumentlist(index)
    {
     
       
        this.process_master_doc_list.removeAt(index);
        
     
    }
   


  onChangeProcesstype(processtype:string)
    {    
      if(processtype == 'Regular')
      {
          this.Processfrequency = ["Periodic","Daily"];
          this.isspecial=true;
      }
      else if(processtype == 'Special')
      {   
               
        this.userForm.patchValue({process_freq:"Not Applicable"});
        this.Processfrequency = ["Not Applicable"];
        this.isspecial=false;
      }
    }

    
    calculatetotalshifttime(processfreq,no_of_shifts,perioddays,shift)
    {
            
        if(processfreq=='Periodic')  
        {
          if(shift=='Yes')
          {

            if((24*perioddays)%no_of_shifts==0)
            {
              this.userForm.patchValue({tot_shift_hrs:((24*perioddays)/no_of_shifts).toFixed(0)});
            }
            else
            {
              window.alert("enter shiftime properly");
              this.userForm.patchValue({tot_shift_hrs:null,shift_no:null});
            }

          
          }
          else
          {
            this.userForm.patchValue({tot_shift_hrs:((24*perioddays)).toFixed(0)});
          }
        }
        else if(processfreq=='Daily')
        {
          if(shift=='Yes')
          {
            if(24%no_of_shifts==0)
            {
              this.userForm.patchValue({tot_shift_hrs:(24/no_of_shifts).toFixed(0)});
            }
            else
            {
              window.alert("enter shiftime properly");
              this.userForm.patchValue({tot_shift_hrs:null,shift_no:null});
            }
          
          }
          else
          {
            this.userForm.patchValue({tot_shift_hrs:(24).toFixed(0)});
          }
        }
        else
        {
          this.userForm.patchValue({tot_shift_hrs:'0'});
        }
          
      
    }

    tohr:any;
    onkeyupshiftmaintn(event)
    {
      this.tohr=this.userForm.get("tot_shift_hrs").value;
      if(this.tohr%event.target.value!=0)
      {
          window.alert("Please Change the value of Shift Maintainance");
          this.userForm.patchValue({shift_mntnce:null});
      }

    }

    procs_shift:any;
    procs_shift_no:any;
    period_days:any;
    onChangeProcessFrequency(processfrequency:string)
    {
      this.procs_shift=this.userForm.get("process_mntnce").value;
      this.procs_shift_no = this.userForm.get("shift_no").value;
      this.period_days=this.userForm.get("perd_day").value;

      if(processfrequency == 'Periodic')
      {
        this.isPeriod=true;
             
      }
      else
      {
        this.isPeriod=false;
        this.userForm.patchValue({perd_day:'1'});
      }

      this.calculatetotalshifttime(processfrequency,this.procs_shift_no,this.period_days, this.procs_shift);

  

    }

    onChangeBusinessUnit(event)
    {
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

    onChangeBusinessUnit1(BuUnit:string)
    {
      if(BuUnit.length && BuUnit != "0")
      {
        this.status = false;
        this.DropDownListService.getShopFloorThruBU(BuUnit).subscribe(data=>
        {
          this.ShopFloorList = data;
          this.status = true;
        });
      }
    }

      
    onChangeProcessShift(processshift:string)
    {
      this.freq=this.userForm.get("process_freq").value as FormControl;

      if(processshift == 'Yes')
      {
        if(this.freq=='Daily')
        {
         this.isShiftno=true;
         this.userForm.patchValue({perd_day:'1'});
        
        
        }
        else if(this.freq=='Periodic')
        {
          this.isShifthrs=true;
        }
        else
        {
          this.isShiftno=true;
        }

        this.isShift=true;

      }
      else
      {
        this.isShiftno=false;
        this.isShifthrs=false;
        this.isShift=false;
        this.userForm.patchValue({perd_day:'1',shift_no:'1',shift_mntnce:'1',tot_shift_hrs:'1'});
      }
    }

    Process_Freq:any;
    onUpdate(id:any, process_id:string, action)
    {
        this.processmastersave = true;
        this.isHidden = true;
        this.status = false;
        this.isPeriod = true;
        this.isShift = true;
        this.isspecial =true;

      forkJoin(
        this.Service.retriveProcess(id),
        this.Service.getProcessDocs(process_id),              
    
      ).subscribe(([data, DocData ])=>
        {
          console.log("see data:: "+JSON.stringify(data));
          this.Process_Freq = data["process_freq"];
          console.log("Details: "+  JSON.stringify(data));
          this.onChangeBusinessUnit1(data["business_unit"]);
          this.onChangeProcesstype(data["process_type"]); 
          this.onChangeProcessFrequency(this.Process_Freq); 
          this.onChangeProcessShift(data["process_mntnce"]);    
          this.userForm.patchValue(data);

             this.addDocument()
             while (this.process_master_doc.length)
             this.process_master_doc.removeAt(0);
             this.process_master_doc_list.removeAt(0);
             this.addDocument()
             for(let data1 of DocData)
             this.addDocumentlist();
             this.process_master_doc_list.patchValue(DocData);
            
             this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});                               
        } 

        // fetchpdf(pdf_files:string)
        // {
        //     alert(pdf_files);
        // }

    send()
    {
      this.NoOfShift= this.userForm.get("shift_no").value as FormControl;
      this.input_sl_no =this.input_sl_no+1;
 
      for(let i=1;i< this.NoOfShift;i++)
      {
        this.process_master_shift_details.push(this.fb.group({
          shiftno: i+1
        }));  
      }

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
        if(this.userForm.get("process_no").value == null || this.userForm.get("process_no").value == 0 || this.userForm.get("process_no").value =='')
        {
          alert("Please Enter Process No");
          this.status=true;
        }
        else if(this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
        {
          alert("Please Select Bussiness Unit");
          this.status=true;
        }
        else if(this.userForm.get("shop_floor").value == null || this.userForm.get("shop_floor").value == 0)
        {
          alert("Please Select Shop Floor");
          this.status=true;
        }
        else if(this.userForm.get("process_desc").value == null || this.userForm.get("process_desc").value == 0)
        {
          alert("Please Enter Process Name");
          this.status=true;
        }
        else if(this.userForm.get("process_type").value == null || this.userForm.get("process_type").value == 0)
        {
          alert("Please Select Process Type");
          this.status=true;
        }
        else if(this.userForm.get("process_freq").value == null || this.userForm.get("process_freq").value == 0)
        {
          alert("Please Select Process Frequency");
          this.status=true;
        }
        else if(this.userForm.get("process_freq").value == 'Periodic' && this.userForm.get("perd_day").value == null)
        {
          alert("Please Enter Periodic Days");
          this.status=true;
        }
        else if(this.userForm.get("process_type").value == 'Regular' && this.userForm.get("process_mntnce").value == null)
        {
          alert("Please Select Process Maintainance(in shift)");
          this.status=true;
        }
        else if(this.userForm.get("process_mntnce").value == 'Yes' && this.userForm.get("shift_no").value == null)
        {
          alert("Please Enter No. of Shift");
          this.status=true;
        }
        else if(this.userForm.get("process_mntnce").value == 'Yes' && this.userForm.get("shift_mntnce").value == null)
        {
          alert("Please Enter Shift Maintain(in hours)");
          this.status=true;
        }
        else if(this.userForm.get("process_mntnce").value == 'Yes' && this.userForm.get("shift_start_time").value == null)
        {
          alert("Please Enter Shift Start Time");
          this.status=true;
        }
        else if(this.userForm.get("process_mntnce").value == 'Yes' && this.userForm.get("shift_end_time").value == null)
        {
          alert("Please Enter Shift End Time");
          this.status=true;
        }
        else if(this.userForm.get("process_mntnce").value == 'Yes' && this.userForm.get("tot_shift_hrs").value == null)
        {
          alert("Please Enter Total Shift Hours");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {

            this.status = false;
            let itemgrouparray:any=[];
            itemgrouparray=this.userForm.get("item_group").value;
            
            let itemgroupstring="";
            for(let i = 0; i < itemgrouparray.length; i++)
            {
              itemgroupstring+=itemgrouparray[i]+",";
            }
            this.userForm.patchValue({itemgroup_array:itemgroupstring.substring(0,itemgroupstring.length-1)})


           // this.userForm.patchValue({process_no:this.seq_no});
           this.userForm.removeControl('process_master_doc_list');
          // alert(this.userForm.get("item_group").value)
            const InputData = this.userForm.getRawValue(); 
            console.log("input: "+JSON.stringify(InputData));
            const frmData = new FormData();
            console.log(" length "+this.myFiles.length);
            for (let i = 0; i < this.myFiles.length; i++) {  
             
              frmData.append("files", this.myFiles[i]);   
              console.log();
             if (i == 0) {  
              console.log(i+",files: "+this.myFiles[i])
             }  
           }  
           frmData.append("Input", JSON.stringify(InputData));
            
           
       
            console.log("Form data: "+frmData);



            this.Service.updateProcess(frmData).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Process Master updated successfully.");
              this.userForm.reset();
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
              let itemgrouparray:any=[];
              itemgrouparray=this.userForm.get("item_group").value;
              //console.log("itemgroup " + this.userForm.get("item_group").value)
              let itemgroupstring="";
              for(let i = 0; i < itemgrouparray.length; i++)
              {
                itemgroupstring+=itemgrouparray[i]+",";
              }
              this.userForm.patchValue({itemgroup_array:itemgroupstring.substring(0,itemgroupstring.length-1)})
              //console.log("itemgroup_array " + this.userForm.get("itemgroup_array").value)
              this.userForm.patchValue({process_no:this.seq_no});
              const InputData = this.userForm.getRawValue(); 
              console.log("input: "+JSON.stringify(InputData));
              const frmData = new FormData();
              console.log(" length "+this.myFiles.length);
              for (let i = 0; i < this.myFiles.length; i++) {  
               
                frmData.append("files", this.myFiles[i]);   
                console.log();
               if (i == 0) {  
                console.log(i+",files: "+this.myFiles[i])
               }  
             }  
             frmData.append("Input", JSON.stringify(InputData));
              
             
         
              console.log("Form data: "+frmData);
     
              this.Service.createProcess(frmData).subscribe(data => 
              {
              console.log(this.userForm.value);
              alert("Process Master created successfully.");
                this.userForm.reset();
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

    onFileSelected(e,i,tm)
    {
   
      this.myFiles.push(e.target.files[0]);//abc
  
      for(let v =0;v<this.myFiles.length; v++)//v hoache files array length
      {
      
        if(this.myFiles.length>tm.length)
        {
            if(v == i)//if size greater than 1
                {

                 this.myFiles[i]=e.target.files[0];
                  
                  this.myFiles.pop();

                }
        }
     
      }

     
    }

  

  deletepdfwithid(dataid,i){
    console.log("dataid " +JSON.stringify(dataid));//here getting id now procede delte process
  //  alert(JSON.stringify(dataid.id));
    this.Service.getdeletefileSystem(dataid).subscribe(data => 
      {
     
      alert("Pdf Has Been Deleted successfully.");
      //alert(" i " + i);
      //this.process_master_doc_list.removeAt(i);
      this.deleteDocumentlist(i);

     // this.loaddocumentlist(this.process_id.value)
        this.status = true;                 
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
     this.ngOnInit()}); 
  }
  deletepdf(i,tm)
  {
    var values=tm[i].controls.doc_pdf.value
    this.file_name=values.substring(23,tm[i].controls.doc_pdf.length);
    this.DropDownListService.getdocumentListwithfile(this.file_name)
    .subscribe(data=>
      {
        
        //console.log("data " +JSON.stringify(data));
      this.deletepdfwithid(data[0].id,i);
     
        this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});


  // alert(JSON.stringify(this.process_no.value)); 
     
    
  }

  viewpdf(i,tm) {
   
          var values=tm[i].controls.doc_pdf.value
         this.file_name=values.substring(23,tm[i].controls.doc_pdf.length);
        // alert(this.file_name);
          this.DropDownListService.downloadFileSystem(this.file_name).subscribe(response => {
      
              console.log("backend data"+response);
              var binaryData = [];
              binaryData.push(response.data);
              var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/*"}));
              var a = document.createElement('a');
              document.body.appendChild(a);
              a.setAttribute('style', 'display: none');
              a.setAttribute('target', 'blank');
              a.href = url;
              a.download = response.filename;
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove();
      
          }, error => {
      
              console.log(error);
          });
          
      }




    
   
    saveFile(data: any, filename?: string) {
      const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
      fileSaver.saveAs(blob, filename);
    }

    getItemGroupUom(itemGroup:string)
    {

      if(itemGroup.length)
      {
        this.userForm.patchValue({item_group:itemGroup})
      }
    }

    onDelete(id,item_group)
    {
      this.status=false;
      if(confirm("Are you sure to delete this Process Master ?"))
      {
        
        this.userForm.patchValue({username: localStorage.getItem("username"),item_group:item_group});
        console.log(id+"raw value:"+JSON.stringify(this.userForm.getRawValue()))
        this.Service.deleteProcessMaster(this.userForm.getRawValue(),id).subscribe(data=> 
          {
           
            alert("Process Master Deleted successfully.");
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
