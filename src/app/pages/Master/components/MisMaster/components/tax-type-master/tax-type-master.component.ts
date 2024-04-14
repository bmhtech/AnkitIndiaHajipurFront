import { Component, OnInit } from '@angular/core';
import { taxType } from '../../../../../../models/InventoryModel/TaxType';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder, FormArray, } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-tax-type-master',
    templateUrl: './tax-type-master.component.html',
    styleUrls: ['./tax-type-master.component.scss']
  })

  export class TaxTypeMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: taxType = new taxType();
    bUnitCodes:{};
    Id: any;
    accLedgerNames:{};
    isHidden = false;
    company_name:any;
    status = true;
    listtaxType : taxType[];
    cgst_input = "0";
    cgst_output = "0";
    sgst_input = "0";
    sgst_output = "0";
    igst_input = "0";
    igst_out = "0";
    taxtypemastersave:boolean = true;
    taxtypemasterupdate:boolean = true;
    taxtypemasterdelete :boolean = true;
    taxtypemasterview:boolean=true;
    sqno:any;

    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({  
        id: [''],
        taxtype_name: [''],
        taxtype_code: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        gst_input_output_ledger_dtls: this.fb.array([this.fb.group({
          cgst_input_ledger :'',
          cgst_output_ledger :'',
          sgst_input_ledger :'',
          sgst_output_ledger :'',
          igst_input_ledger :'',
          igst_output_ledger :''
        })]),            
      }); 
    }
    add_gst()
    {
      this.gst_input_output_ledger_dtls.push(this.fb.group({
        cgst_input_ledger :'',
        cgst_output_ledger :'',
        sgst_input_ledger :'',
        sgst_output_ledger :'',
        igst_input_ledger :'',
        igst_output_ledger :''
      }));
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get taxtype_name(){ return this.userForm.get("taxtype_name") as FormControl }
    get taxtype_code(){ return this.userForm.get("taxtype_code") as FormControl }
    get gst_input_output_ledger_dtls() { return this.userForm.get('gst_input_output_ledger_dtls') as FormArray; }
   
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

     this.taxtypemastersave=false;
     this.taxtypemasterupdate=false;
     this.taxtypemasterdelete=false;
     this.taxtypemasterview=false;
   
        if(accessdata.includes('tax_type_master.save'))
           {
            this.taxtypemastersave = true;
           }
          if(accessdata.includes('tax_type_master.update'))
           { 
             this.taxtypemasterupdate=true;
           }
           if(accessdata.includes('tax_type_master.delete'))
           {
             this.taxtypemasterdelete=true;
           }
           if(accessdata.includes('tax_type_master.view'))
           {
             this.taxtypemasterview=true;
           }
     
      this.company_name = localStorage.getItem("company_name");
      this.Service.getTaxTypes().subscribe(data=>{this.listtaxType  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
     
      this.DropDownListService.ledgerNameList().subscribe(data=>{this.accLedgerNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});

      this.Service.getTaxTypeSequenceId().subscribe(data=>
        {
       
        //console.log("TUHIN HERE "+JSON.stringify(data));
        this.sqno=data["sequenceid"]
        //this.userForm.patchValue({taxtype_code:data["sequenceid"]});

      });
      this.gst_input_output_ledger_dtls.at(0).patchValue({ 
        cgst_input_ledger: '0', cgst_output_ledger: '0', sgst_input_ledger:'0',
        sgst_output_ledger: '0', igst_input_ledger: '0', igst_output_ledger: '0'
      });
      
      this.status=true;
    }

    showList(s:string)
    {
      if(this.taxtypemastersave == true  && this.taxtypemasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
      {
        this.isHidden=true;
      }
      }
      if(this.taxtypemastersave == true  && this.taxtypemasterupdate == false)
      {
        if(s=="add")
      {
        this.isHidden=true;
      }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.taxtypemastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
        this.cgst_input = "0";
        this.cgst_output = "0";
        this.sgst_input = "0";
        this.sgst_output = "0";
        this.igst_input = "0";
        this.igst_out = "0";

        this.Service.getTaxTypeSequenceId().subscribe(data=>
          {
         
          console.log("TUHIN HERE "+JSON.stringify(data));
  this.sqno=data["sequenceid"]
          //this.userForm.patchValue({taxtype_code:data["sequenceid"]});
  
        });
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        taxtype_name: [''],
        taxtype_code: [''],
        company_id: [''],
        fin_year: [''],

        gst_input_output_ledger_dtls: this.fb.array([this.fb.group({
          cgst_input_ledger :'',
          cgst_output_ledger :'',
          sgst_input_ledger :'',
          sgst_output_ledger :'',
          igst_input_ledger :'',
          igst_output_ledger :''
        })]),     
      }); 
    }
  
    onUpdate(id:any,taxcode,action)
    {
      if(action =='update')
      {
        this.taxtypemastersave=true;
      }
      else
      {
        this.taxtypemastersave=false;
      }
      //tuhin here // this.taxtypemastersave=true;
      this.isHidden = true;
      this.status = false;
      forkJoin(
      this.Service.retriveTaxType(id),
      this.Service.retriveTaxTypeGst(taxcode)

      ).subscribe(([data,gstdata])=>
      { 
        this.userForm.patchValue(data);
       
        let i =0;
          this.add_gst();    
          while(this.gst_input_output_ledger_dtls.length)
          this.gst_input_output_ledger_dtls.removeAt(0);        
          for(let data1 of gstdata)
          {
            console.log("dyn data:"+JSON.stringify(gstdata))
            this.add_gst();
            //this.gst_input_output_ledger_dtls.patchValue(gstdata);
            this.gst_input_output_ledger_dtls.at(i).patchValue({ 
              cgst_input_ledger: data1["cgst_input_ledger"], cgst_output_ledger: data1["cgst_output_ledger"], sgst_input_ledger:data1["sgst_input_ledger"],
              sgst_output_ledger: data1["sgst_output_ledger"], igst_input_ledger: data1["igst_input_ledger"], igst_output_ledger: data1["igst_output_ledger"]
            });
            i = i + 1;
          }

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
          this.DropDownListService.findTaxType('0').subscribe(data=>
          {
            this.listtaxType = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findTaxType(serchText).subscribe(data=>
          {
            this.listtaxType = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,taxtype_code)
    {
      this.status = false;
      if(confirm("Are you sure to delete this TaxType ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(taxtype_code,"taxTypeMaster").subscribe(checkBUData=> 
          {
          //alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteTaxType(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat TaxType:"+data.taxtype_name);
        
                if(data.taxtype_name=='' || data.taxtype_name==null)
                {
                  alert("Opps!!! Can't delete this TaxType !!!");
                }else{
                  alert("TaxType deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              }); 
           }
          else{
           alert("This TaxType is Already Used,Can not be Deleted!! ");
          }
         });
        
      }  
      this.status = true;
    }

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
        if(this.userForm.get("taxtype_code").value == '' || this.userForm.get("taxtype_code").value == null || this.userForm.get("taxtype_code").value == 0)
        {
          alert("Please Enter Tax Type Code")
          this.status=true;
        }
        else if(this.userForm.get("taxtype_name").value == '' || this.userForm.get("taxtype_name").value == null || this.userForm.get("taxtype_name").value == 0)
        {
          alert("Please Enter Tax Type Name")
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.status = false;
            this.Service.updateTaxType(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
            console.log(this.userForm.value);
            alert("Tax type Updated successfully."); 
            this.userForm.reset();
            //refresh List;
            this.ngOnInit();
            this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            //this.ngOnInit()
          });
          }

          else
            {
              this.status = false;
              this.Service.createTaxType(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("New Tax type created successfully."); 
              this.userForm.reset();
            //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
            }
        }
        
      }
    }

  }
