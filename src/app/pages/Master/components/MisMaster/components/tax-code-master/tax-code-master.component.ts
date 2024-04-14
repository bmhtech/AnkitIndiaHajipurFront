
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { TaxCode } from '../../../../../../Models/InventoryModel/TaxCode';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { fork } from 'cluster';

  @Component({
    selector: 'app-tax-code-master',
    templateUrl: './tax-code-master.component.html',
    styleUrls: ['./tax-code-master.component.scss']
  })

  export class TaxCodeMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: TaxCode = new TaxCode();
    listTaxCode:TaxCode[];
    isHidden = false;
    isCgstFieldContainData = false;
    isSgstFieldContainData = false;
    isIgstFieldContainData = false;
    tax_sl_no=1;
    sgst_actual_value:any;
    igst_actual_value:any;
    accLedgerNames:any=[];
    status = false;
    taxtypelist:any=[];
    taxcodemastersave:boolean=true;
    taxcodemasterupdate:boolean=true;
    taxcodemasterdelete:boolean=true;
    taxcodemasterview:boolean=true;
    ledgerNames:any=[];
  
    constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id: [''],
        tax_id: [''],
        tax_code:[''],
        tax_description:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
    
        tax_code_details: this.fb.array([this.fb.group({
          cess: ['',Validators.required],
          tax_id:[''],
          srno : this.tax_sl_no,
          tax_name:'',
          tax_rate:'',
          cgst:'',
          sgst:'',
          igst:'',
          cgst_act_val: [{ value: '', disabled: true }],
          sgst_act_val: [{ value: '', disabled: true }],
          igst_act_val: [{ value: '', disabled: true }],
          input_ledger:'',
          output_ledger:'',
          igst_output_ledger:'',
          igst_input_ledger:'',
          cgst_output_ledger:'',
          cgst_input_ledger:''
        })])
      });
    }
    get tax_id(){ return this.userForm.get("tax_id") as FormControl }
    get id(){ return this.userForm.get("id") as FormControl }
    get tax_code(){ return this.userForm.get("tax_code") as FormControl }
    get tax_description(){ return this.userForm.get("tax_description") as FormControl }
    get tax_code_details() {return this.userForm.get('tax_code_details') as FormArray;}

 
    ngOnInit()
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

     this.taxcodemastersave=false
     this.taxcodemasterupdate=false
     this.taxcodemasterdelete=false
     this.taxcodemasterview=false;

     if(accessdata.includes('tax_code_master.save'))
           {
            this.taxcodemastersave = true;
           }
          if(accessdata.includes('tax_code_master.update'))
           { 
             this.taxcodemasterupdate=true;
           }
           if(accessdata.includes('tax_code_master.delete'))
           {
             this.taxcodemasterdelete=true;
           }
           if(accessdata.includes('tax_code_master.view'))
           {
             this.taxcodemasterview=true;
           }
    
     
      this.Service.getTaxCode().subscribe(data=> 
      { 
        console.log("HERE WATCH ::"+JSON.stringify(data))
        this.listTaxCode = data; 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      this.DropDownListService.getDutiesTaxesLedger().subscribe(data=>{this.accLedgerNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});


      this.Service.getTaxTypes().subscribe(data=>
      {
        console.log("TAX CODE :: "+JSON.stringify(data))
        this.taxtypelist=data;
      });
        


     
    }

    taxRate:any;
    cgst_actual_value:any;
    calCgstActVal(event, index, data:string)
    {
      this.taxRate = this.tax_code_details.at(index).get('tax_rate').value as FormControl;
      if(data == 'cgstData')
      {
        this.isCgstFieldContainData = true;
        let cgst = parseInt(event.target.value);
        this.cgst_actual_value = parseInt(this.taxRate) * ( cgst/100);
        this.tax_code_details.at(index).patchValue({cgst_act_val: this.cgst_actual_value});
        this.tax_code_details.at(index).patchValue({sgst: (100 - cgst)});
        this.sgst_actual_value = parseInt(this.taxRate) * ((100-cgst)/100); 
        this.tax_code_details.at(index).patchValue({sgst_act_val:this.sgst_actual_value});
        this.tax_code_details.at(index).patchValue({igst:100});
        this.tax_code_details.at(index).patchValue({igst_act_val:parseInt(this.taxRate)}); 
        this.tax_code_details.at(index).get('sgst').disable({onlySelf: true});
        this.tax_code_details.at(index).get('igst').disable({onlySelf: true});
      }
      else if(data == 'sgstData')
      {
        this.isSgstFieldContainData = true;
        let sgst = parseInt(event.target.value);
        this.sgst_actual_value = parseInt(this.taxRate) * ( sgst/100);
        this.tax_code_details.at(index).patchValue({sgst_act_val: this.sgst_actual_value});
        this.tax_code_details.at(index).patchValue({cgst: (100 - sgst)});
        this.cgst_actual_value = parseInt(this.taxRate) * ((100-sgst)/100); 
        this.tax_code_details.at(index).patchValue({cgst_act_val:this.cgst_actual_value});
        this.tax_code_details.at(index).patchValue({igst:100});
        this.tax_code_details.at(index).patchValue({igst_act_val:parseInt(this.taxRate)});
        this.tax_code_details.at(index).get('cgst').disable({onlySelf: true});
        this.tax_code_details.at(index).get('igst').disable({onlySelf: true});
      }
      else if(data == 'igstData')
      {
        this.isIgstFieldContainData = true;
        let igst = parseInt(event.target.value);
        this.tax_code_details.at(index).patchValue({igst:100});
        this.tax_code_details.at(index).patchValue({igst_act_val:parseInt(this.taxRate)});
        this.tax_code_details.at(index).get('sgst').disable({onlySelf: true});
        this.tax_code_details.at(index).get('cgst').disable({onlySelf: true});
      } 
      else if(!data.length)
      {
        this.tax_code_details.at(index).get('sgst').enable();
        this.tax_code_details.at(index).get('cgst').enable();
        this.tax_code_details.at(index).get('igst').enable();
      }
    }

    showList(s:string)
    {
      if(this.taxcodemastersave == true  && this.taxcodemasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.taxcodemastersave == true  && this.taxcodemasterupdate == false)
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
        this.taxcodemastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
       
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        tax_id: [''],
        tax_code:[''],
        tax_description:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
    
        tax_code_details: this.fb.array([this.fb.group({
          cess: ['',Validators.required],
          srno : this.tax_sl_no,
          tax_id : '',
          tax_name:'',
          tax_rate:'',
          cgst:'',
          sgst:'',
          igst:'',
          cgst_act_val: [{ value: '', disabled: true }],
          sgst_act_val: [{ value: '', disabled: true }],
          igst_act_val: [{ value: '', disabled: true }],
          input_ledger:'',
          output_ledger:'',
          igst_output_ledger:'',
          igst_input_ledger:'',
          cgst_output_ledger:'',
          cgst_input_ledger:''
        })])
      });
    }

    add()
    {
      this.tax_sl_no =this.tax_sl_no +1;
      this.tax_code_details.push(this.fb.group({
        cess:'',
        srno:this.tax_sl_no,
        tax_id : '',
        tax_name:'',
        tax_rate:'',
        cgst:'',
        sgst:'',
        igst:'',
        cgst_act_val: [{ value: '', disabled: true }],
        sgst_act_val: [{ value: '', disabled: true }],
        igst_act_val: [{ value: '', disabled: true }],
        input_ledger:'',
        output_ledger:'',
        igst_output_ledger:'',
        igst_input_ledger:'',
        cgst_output_ledger:'',
        cgst_input_ledger:''
      }));
    }

    delete(index) 
    {
      if(this.tax_sl_no > 1)
      { 
        this.tax_code_details.removeAt(index);
        this.tax_sl_no = this.tax_sl_no - 1;
      }
      else
      {
        this.tax_sl_no = 1;
        alert("can't delete all rows");
        this.tax_code_details.reset();
        this.tax_code_details.at(0).patchValue({srno:  this.tax_sl_no});
      } 
      
      for(let i=1; i<=this.tax_sl_no; i++)
        this.tax_code_details.at(i-1).patchValue({srno: i});    
    }

    resetRecord(index)
    {
      this.tax_sl_no = 1;
      this.tax_code_details.at(index).reset();
      this.tax_code_details.at(0).patchValue({srno: this.tax_sl_no});
      this.tax_code_details.at(index).get('cgst').enable();
      this.tax_code_details.at(index).get('sgst').enable();
      this.tax_code_details.at(index).get('igst').enable();
    }

    SgstIp:any;
    onChangeSgstOp(event, index)
    {
      this.SgstIp = this.tax_code_details.at(index).get("input_ledger").value;
      if(event==this.SgstIp)
      {
        alert("SGST INPUT LEDGER, SGST OUTPUT LEDGER, CGST INPUT LEDGER, CGST OUTPUT LEDGER, IGST INPUT LEDGER and IGST OUTPUT LEDGER must be different");
        this.tax_code_details.at(index).patchValue({output_ledger:null});
      }
    }

    SgstOp:any;
    onChangeCgstIp(event, index)
    {
      this.SgstOp = this.tax_code_details.at(index).get("output_ledger").value;
      if(event==this.SgstIp ||event==this.SgstOp)
      {
        alert("SGST INPUT LEDGER, SGST OUTPUT LEDGER, CGST INPUT LEDGER, CGST OUTPUT LEDGER, IGST INPUT LEDGER and IGST OUTPUT LEDGER must be different");
        this.tax_code_details.at(index).patchValue({cgst_input_ledger:null});
      }
    }

    CgstIp:any;
    onChangeCgstOp(event, index)
    {
      this.CgstIp = this.tax_code_details.at(index).get("cgst_input_ledger").value;
      if(event==this.SgstIp || event==this.SgstOp || event== this.CgstIp)
      {
        alert("SGST INPUT LEDGER, SGST OUTPUT LEDGER, CGST INPUT LEDGER, CGST OUTPUT LEDGER, IGST INPUT LEDGER and IGST OUTPUT LEDGER must be different");
        this.tax_code_details.at(index).patchValue({cgst_output_ledger:null});
      }
    }

    CgstOp:any;
    onChangeIgstIp(event, index)
    {
      this.CgstOp = this.tax_code_details.at(index).get("cgst_output_ledger").value;
      if(event==this.SgstIp || event==this.SgstOp || event== this.CgstIp || event== this.CgstOp)
      {
        alert("SGST INPUT LEDGER, SGST OUTPUT LEDGER, CGST INPUT LEDGER, CGST OUTPUT LEDGER, IGST INPUT LEDGER and IGST OUTPUT LEDGER must be different");
        this.tax_code_details.at(index).patchValue({igst_input_ledger:null});
      }
    }

    IgstIp:any;
    onChangeIgstOp(event, index)
    {
      this.IgstIp = this.tax_code_details.at(index).get("igst_input_ledger").value;
      if(event==this.SgstIp || event==this.SgstOp || event== this.CgstIp || event== this.CgstOp || event==this.IgstIp)
      {
        alert("SGST INPUT LEDGER, SGST OUTPUT LEDGER, CGST INPUT LEDGER, CGST OUTPUT LEDGER, IGST INPUT LEDGER and IGST OUTPUT LEDGER must be different");
        this.tax_code_details.at(index).patchValue({igst_output_ledger:null});
      }
    }

    onUpdate(id:any, tax_id:string,action)
    {
      if(action=='update')
      {
        this.taxcodemastersave=true;
      }
      else
      {
        this.taxcodemastersave=false;
      }
     
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
      this.tax_sl_no = 0;
    
      forkJoin(
        this.Service.retriveTaxCode(id),
        this.Service.taxCodeDtlsRetriveList(tax_id),
        this.DropDownListService.ledgerNameList()
      ).subscribe(([TaxInfo, ChgsMatrixDtls,ledgerlist])=>
        {
          this.ledgerNames = ledgerlist;
          this.userForm.patchValue(TaxInfo);
          console.log("taxdetalis: "+JSON.stringify(TaxInfo));       
 
        while (this.tax_code_details.length ) 
        {this.tax_code_details.removeAt(0);}

        for(let i=0;i<ChgsMatrixDtls.length;i++)
        {
          this.add();
          
        }

        this.tax_code_details.patchValue(ChgsMatrixDtls);
        for(let i=0;i<ChgsMatrixDtls.length;i++)
        {
          this.selectedtaxName[i]=ChgsMatrixDtls[i]["tax_id"];
          this.tax_code_details.at(i).patchValue({tax_name:ChgsMatrixDtls[i]["tax_id"]});
         
        
        }

        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
     }

     search(event)
     {
       let serchText = event.target.value;
       if(event.key == "Enter")
       {
         this.status = false;
         if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
         {
           this.DropDownListService.findTaxCode('0').subscribe(data=>
           {
             this.listTaxCode = data;
             this.status = true;
           });
         }
         else
         {
           this.DropDownListService.findTaxCode(serchText).subscribe(data=>
           {
             this.listTaxCode = data;
             this.status = true;
           });     
         }
       }
     }
   
     onDelete(id:any,tax_id)
     {
       this.status = false;
       if(confirm("Are you sure to delete this TaxCode ?"))
       { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(tax_id,"taxCodeMaster").subscribe(checkBUData=> 
          {
          //alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteTaxCode(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat TaxCode:"+data.tax_code);
        
                if(data.tax_code=='' || data.tax_code==null)
                {
                  alert("Opps!!! Can't delete this TaxCode !!!");
                }else{
                  alert("TaxCode deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              }); 
           }
           else{
            alert("This TaxCode is Already Used,Can not be Deleted!! ");
           }
          });
        
       }  
       this.status = true;
     }
 

     Id:any;
    send()
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
     /*  
      //here starts
        if(this.userForm.get("tax_code").value == '' || this.userForm.get("tax_code").value == null || this.userForm.get("tax_code").value == 0)
        {
          alert("Please Enter Tax Code");
          this.status=true;
        }
        else if(this.userForm.get("tax_description").value == '' || this.userForm.get("tax_description").value == null || this.userForm.get("tax_description").value == 0)
        {
          alert("Please Enter Description");
          this.status=true;
        }
        else
        {
          let taxcodename = false;

          for(let i=0;i<this.tax_code_details.length;i++)
          {
            if(this.tax_code_details.at(i).get("tax_name").value == '' || this.tax_code_details.at(i).get("tax_name").value == 0 || this.tax_code_details.at(i).get("tax_name").value == null)
            {
              taxcodename = true;
            }
          }
          if(taxcodename == true)
          {
            alert("Please Enter Tax Name");
            this.status=true;
          }
          else
          {
*/
         //here ends   
            if(this.Id>0)
            {
            this.status = false;
            this.Service.updateTaxCode(this.userForm.getRawValue(),this.Id).subscribe(data => 
            {
              console.log(this.userForm.getRawValue());
              alert("TaxCode Updated successfully.");
              this.userForm.reset();
            //refresh List;
              this.ngOnInit(); 
              this.isHidden=false;
              //Refresh Dynemic table
              while(this.tax_code_details.length)
              this.tax_code_details.removeAt(0);
              this.add();     
              
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
            }

            else
            {
              this.status = false;
            this.Service.createTaxCode(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.getRawValue());
              alert("New TaxCode created successfully.");
              this.userForm.reset();
            //refresh List;
              this.ngOnInit(); 
              //Refresh Dynemic table
              while(this.tax_code_details.length)
              this.tax_code_details.removeAt(0);
              this.add();
                      
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
            }
          }
        //}
        
    //  }
    }


    //new work starts from here  

    selectedtaxName = [];
    onchangetaxName(pointIndex, event)
    {
        if(event == null  || event =='')
        {

        }
        else
        {
        // this.DropDownListService.getgstdetailsoftaxtype(event).subscribe(data=>

            forkJoin(
              this.DropDownListService.getgstdetailsoftaxtype(event),
              this.DropDownListService.ledgerNameList()
            ).subscribe(([data, ledgerlist])=>
              
            {
             // console.log(""+ JSON.stringify(ledgerlist));
              this.ledgerNames = ledgerlist;
              console.log("tuhin"+JSON.stringify(data))
              this.tax_code_details.at(pointIndex).patchValue({tax_id:event,input_ledger:data["sgst_input_ledger"],
                                                              output_ledger:data["sgst_output_ledger"],cgst_input_ledger:data["cgst_input_ledger"],
                                                              cgst_output_ledger:data["cgst_output_ledger"],igst_input_ledger:data["igst_input_ledger"],
                                                              igst_output_ledger:data["igst_output_ledger"]});
            console.log(this.tax_code_details.at(0).get("input_ledger").value)
            })
        }
     
      

    }
  }

