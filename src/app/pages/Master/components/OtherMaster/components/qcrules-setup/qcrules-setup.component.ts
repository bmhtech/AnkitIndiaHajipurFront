import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Qc_rules_setup } from '../../../../../../Models/OtherMaster/Qc_rules_setup';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService} from '../../../../../../service/dropdown-service.service'
import { forkJoin } from 'rxjs';
  @Component({
    selector: 'app-qcrules-setup',
    templateUrl: './qcrules-setup.component.html',
    styleUrls: ['./qcrules-setup.component.scss']
  })

  export class QCRulesSetupComponent implements OnInit 
  {
    submitted = false;
    basislist: {};
    public userForm:FormGroup;
    model: Qc_rules_setup = new Qc_rules_setup();
    listQc_rules_setup: Qc_rules_setup[];
    isHidden=false;
    Id:any;
    status = false;
    seq_no: String;
    qcrulessave:boolean=true;
    qcrulesupdate:boolean=true;
    qcrulesdelete:boolean=true;
    qcrulesview:boolean=true;

    constructor(public fb:FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({ 
        id:[''],
        qc_id:[''],
        qc_code: [''],
        qc_name: [''],
        remarks: [''],
        qc_active: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
     
        qc_rules_setup_dtls: this.fb.array([this.fb.group({
          qc_param:'',
          cal_basis:'',
          basis_amt_UoM:'',
          min:'',
          max:'',
          qty_chkbox:''})])
      });
    }

    get qc_id(){ return this.userForm.get("qc_id") as FormControl }
    get id(){ return this.userForm.get("id") as FormControl }
    get qc_code(){ return this.userForm.get("qc_code") as FormControl }
    get qc_name(){ return this.userForm.get("qc_name") as FormControl }
    get remarks(){ return this.userForm.get("remarks") as FormControl }
    get qc_active(){ return this.userForm.get("qc_active") as FormControl }
    get qc_rules_setup_dtls(){return this.userForm.get('qc_rules_setup_dtls') as FormArray;}
  
    ngOnInit() 
    {
      //For User Role
     let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     this.qcrulessave=false;
     this.qcrulesupdate=false;
     this.qcrulesdelete=false;
     this.qcrulesview=false;

     if(accessdata.includes('qcrules_setup.save'))
     {
      this.qcrulessave = true;
     }
     if(accessdata.includes('qcrules_setup.update'))
     {
      this.qcrulesupdate = true;
     }
     if(accessdata.includes('qcrules_setup.delete'))
     {
      this.qcrulesdelete = true;
     }
     if(accessdata.includes('qcrules_setup.view'))
     {
      this.qcrulesview = true;
     }

      this.DropDownListService.getSequenceId("QCR").subscribe(data=>{this.seq_no = data.sequenceid;});
      this.Service.getQc_rules_setup().subscribe(data=>{ this.listQc_rules_setup  = data;});
      this.basislist = ["%", "UOM"];
      this.status = true;
    }

    showList(s:string)
    {
      if(this.qcrulessave == true  && this.qcrulesupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
          this.DropDownListService.getSequenceId("QCR").subscribe(data=>{this.seq_no = data.sequenceid;});
        }
      }
      if(this.qcrulessave == true  && this.qcrulesupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
          this.DropDownListService.getSequenceId("QCR").subscribe(data=>{this.seq_no = data.sequenceid;});
        }
      }
      if(s=="list")
      {
        this.isHidden=false;
        this.qcrulessave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        qc_id:[''],
        qc_code: [''],
        qc_name: [''],
        remarks: [''],
        qc_active: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
     
        qc_rules_setup_dtls: this.fb.array([this.fb.group({
          qc_param:'',
          cal_basis:'',
          basis_amt_UoM:'',
          min:'',
          max:'',
          qty_chkbox:''})])
      });
    }

    add() 
    {
      this.qc_rules_setup_dtls.push(this.fb.group({
        qc_param:'',
        cal_basis:'',
        basis_amt_UoM:'',
        min:'',
        max:'',
        qty_chkbox:''}));
    }

    delete(index) 
    {
      if(index)
      {this.qc_rules_setup_dtls.removeAt(index);}
      else
      {alert("can't delete all rows");} 
    }

    onUpdate(id:any, qc_id:string,action)
    {
      console.log("enter : "+qc_id)
      if(action == 'update')
      {
        this.qcrulessave=true;
      }
      else
      {
        this.qcrulessave=false;
      }
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
    
      forkJoin(
        this.Service.retriveQcRuleSetup(id),
        this.Service.qcRuleSetupRetriveList(qc_id)
      ).subscribe(([QcData, QcRetriveList])=>
        {
          this.userForm.patchValue(QcData);
          //console.log("QcData: "+JSON.stringify(QcData));       
          console.log("Check QC: "+JSON.stringify(QcRetriveList))
        while (this.qc_rules_setup_dtls.length ) 
        {this.qc_rules_setup_dtls.removeAt(0);}
        for(let i=0;i<QcRetriveList.length;i++)
        {this.add();}
        
        this.qc_rules_setup_dtls.patchValue(QcRetriveList);
        this.status = true;
      });
     }

     search(event)
     {
       let serchText = event.target.value;
       if(event.key == "Enter")
       {
         this.status = false;
         if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
         {
           this.DropDownListService.findQcRulesSetup('0').subscribe(data=>
           {
             this.listQc_rules_setup = data;
             this.status = true;
           });
         }
         else
         {
           this.DropDownListService.findQcRulesSetup(serchText).subscribe(data=>
           {
             this.listQc_rules_setup = data;
             this.status = true;
           });  
           this.status = true;   
         }
       }
     }
   
     onDelete(id:any,qc_id)
     {
       this.status = false;
       if(confirm("Are you sure to delete this Qc rules Setup ?"))
       { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkQualityCheckUsage(qc_id).subscribe(checkQC=> 
          {
           // alert("bidhan here::"+checkQC.status);
            if(checkQC.status=='No')
            {
              this.Service.deleteQcRulesSetup(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  console.log("Cat id:"+data.qc_code);
          
                  if(data.qc_code=='' || data.qc_code==null)
                  {
                    alert("Opps!!! Can't delete this Qc rules Setup !!!");
                  }else{
                    alert("Qc rules Setup deleted successfully.");
                  }
                  this.status = true;
                  this.ngOnInit()
                }); 
            }
            else
            {
              alert("This Quality Check is Already Used,Can not be Deleted!! ");
            }
          });
       
       }  
       this.status = true;
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
        if(this.userForm.get("qc_name").value == '' || this.userForm.get("qc_name").value == null || this.userForm.get("qc_name").value == 0)
        {
          alert("Please Enter QC Name");
          this.status=true;
        }
        else
        {
          let qcparam = false;
          let calbasis = false;

          for(let p=0;p<this.qc_rules_setup_dtls.length;p++)
          {
            if(this.qc_rules_setup_dtls.at(p).get("qc_param").value == '' || this.qc_rules_setup_dtls.at(p).get("qc_param").value == null || this.qc_rules_setup_dtls.at(p).get("qc_param").value == 0)
            {
              qcparam=true;
            }
            if(this.qc_rules_setup_dtls.at(p).get("cal_basis").value == '' || this.qc_rules_setup_dtls.at(p).get("cal_basis").value == null || this.qc_rules_setup_dtls.at(p).get("cal_basis").value == 0)
            {
              calbasis=true;
            }
          }
          if(qcparam == true)
          {
            alert("Please Enter QC Parameter");
            this.status=true;
          }
          else if(calbasis == true)
          {
            alert("Please Select Calculation Basis");
            this.status=true;
          }
          else
          {
            if(this.Id>0)
              {
                this.Service.updateQcRuleSetup(this.userForm.getRawValue(), this.Id).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("QC_rules_setup Updated successfully.");
                  this.userForm.reset();
                  this.status = true;
                  //refresh dropdown list
                  this.ngOnInit();  
                  this.isHidden = false;
                  //Refresh Dynemic Table
                  while(this.qc_rules_setup_dtls.length)
                  this.qc_rules_setup_dtls.removeAt(0);
                  this.add();       
                }); 
              }
              else
              {
                this.status = false;
                this.Service.createQc_rules_setup(this.userForm.getRawValue()).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("New QC_rules_setup created successfully.");
                  this.userForm.reset();
                  this.status = true;
                  //refresh dropdown list
                  this.ngOnInit();  
                  this.isHidden = false;
                  //Refresh Dynemic Table
                  while(this.qc_rules_setup_dtls.length)
                  this.qc_rules_setup_dtls.removeAt(0);
                  this.add();       
                }); 
              }  
          }
        }


               
      }
    }

  }
