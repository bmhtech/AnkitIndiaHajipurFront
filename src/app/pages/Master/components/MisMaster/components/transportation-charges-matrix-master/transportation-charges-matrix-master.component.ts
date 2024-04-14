import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { TransportationChgsMatrix } from '../../../../../../Models/InventoryModel/TransportationChgsMatrix';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { TransportationpopupmodalComponent } from '../transportationpopupmodal/transportationpopupmodal.component';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-transportation-charges-matrix-master',
    templateUrl: './transportation-charges-matrix-master.component.html',
    styleUrls: ['./transportation-charges-matrix-master.component.scss']
  })

  export class TransportationChargesMatrixMasterComponent implements OnInit 
  {
    listTransportationChgsMatrix: TransportationChgsMatrix[];
    submitted = false;
    public userForm:FormGroup;
    Model: TransportationChgsMatrix = new TransportationChgsMatrix();
    bUnitCodes:{};
    areaList:{};
    Id: any;
    company_name:any;
    tdscode:any=[];
    uoms:{};
    veh_type:{};
    isHidden = false;
    status = false;
    transchargesmastersave:boolean=true;
    transchargesmasterupdate:boolean=true;
    transchargesmasterdelete:boolean=true;
    transchargesmasterview:boolean=true;
    seq_no:any;
    trans_sl_no = 1;
    translist:any=[];
    ledgerName:any=[];
    selectedTransacc = [];
    selectedTransName = [];

    constructor(public fb:FormBuilder, private Service: Master,
      private dialog: MatDialog, private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({ 
        id: [''],    
        tcm_id: [''],
        tcm_code: [''],
        tcm_description: [''],
        tcm_effectivedate: [''],
        tcm_active:[''],
        businessunit_code:[''] ,
        businessunit_name:[''],
        gst_pay_own_rev_charges:[''],
        trans_charges_appl:[''],
        trans_mode:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        transportation_area_list:this.fb.group({
          area_id: '',
          area_name: '',
          description: '',
        }),
   
        transportation_chgs_matrix_details: this.fb.array([this.fb.group({
          trans_charge_code :this.trans_sl_no,
          transportation_from :'',
          transportation_to:'',
          distance_in_km:'',
          vehicles_type:'',
          full_truck_load_rate:'',
          rate_uom:'',
          uom:'',
          tax_code:'',
          tax_rate:'',
          transportation_acc:'',
          // tds_code:'',
          // tds_acc:'',
          // tds_rate:'',
          transporter:'',
          transporter_array:'',
          allowed_shortage:'',
          deduction_basedon:''})])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get tcm_id(){ return this.userForm.get("tcm_id") as FormControl }
    get tcm_code(){ return this.userForm.get("tcm_code") as FormControl }
    get tcm_description(){ return this.userForm.get("tcm_description") as FormControl }
    get tcm_effectivedate(){ return this.userForm.get("tcm_effectivedate") as FormControl }
    get tcm_active(){ return this.userForm.get("tcm_active") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get gst_pay_own_rev_charges(){ return this.userForm.get("gst_pay_own_rev_charges") as FormControl }
    get trans_charges_appl(){ return this.userForm.get("trans_charges_appl") as FormControl }
    get trans_mode(){ return this.userForm.get("trans_mode") as FormControl }
    get transportation_chgs_matrix_details() {return this.userForm.get('transportation_chgs_matrix_details') as FormArray;}
 
    ngOnInit() 
    {
      //For User Role
      this.status=false;
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.transchargesmastersave=false;
     this.transchargesmasterupdate=false;
     this.transchargesmasterupdate=false;
     this.transchargesmasterview=false;
     
     if(accessdata.includes('transportation_charges.save'))
     {
      this.transchargesmastersave = true;
     }
    if(accessdata.includes('transportation_charges.update'))
     { 
       this.transchargesmasterupdate=true;
     }
     if(accessdata.includes('transportation_charges.delete'))
     {
       this.transchargesmasterupdate=true;
     }
     if(accessdata.includes('transportation_charges.view'))
     {
       this.transchargesmasterview=true;
     }
     
      this.company_name = localStorage.getItem("company_name");

      forkJoin(
        this.DropDownListService.getTCMId("prefix="+"TCM"+"&company="+this.company_name),
        this.DropDownListService.bUnitList(this.company_name),
        this.Service.getTransChgsMatrixs(),
        this.DropDownListService.areaList(),
        this.DropDownListService.tdsCode(),
        this.DropDownListService.getTransporterMNCListFast(),
        this.DropDownListService.getCustomUOMs("WUOM"),
        this.DropDownListService.vehicleCodeList(),
        this.DropDownListService.ledgerList(),

      ).subscribe(([seqdata,budata,listdata,areadata,tdsdata,transdata,uomdata,vehicledata,ledgerdata])=>
        {
          this.seq_no = seqdata.sequenceid;
          this.bUnitCodes = budata;
          this.listTransportationChgsMatrix  = listdata;
          this.areaList  = areadata;
          this.tdscode = tdsdata;
          this.translist = transdata;
          this.uoms = uomdata;
          this.veh_type = vehicledata;
          this.ledgerName = ledgerdata;

          let slno=this.seq_no+"/"+'1';
          console.log("slno:"+slno)
          this.transportation_chgs_matrix_details.at(0).patchValue({trans_charge_code:slno});

        });

      this.status = true;     
    }

    showList(s:string)
    {
      if(this.transchargesmastersave == true  && this.transchargesmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
      {
        this.isHidden=true;
        this.userForm.reset(this.ResetAllValues().value);

        this.trans_sl_no = 0;
        while(this.transportation_chgs_matrix_details.length)
        this.transportation_chgs_matrix_details.removeAt(0);
        this.add();
        let slno=this.seq_no+"/"+'1';
        //console.log("slno:"+slno)
        this.transportation_chgs_matrix_details.at(0).patchValue({trans_charge_code:slno});

      }
      }
      if(this.transchargesmastersave == true  && this.transchargesmasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);

          this.trans_sl_no = 0;
          while(this.transportation_chgs_matrix_details.length)
          this.transportation_chgs_matrix_details.removeAt(0);
          this.add();
          let slno=this.seq_no+"/"+'1';
          //console.log("slno:"+slno)
          this.transportation_chgs_matrix_details.at(0).patchValue({trans_charge_code:slno});

        }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.transchargesmastersave = true;
        this.userForm.reset(this.ResetAllValues().value);
        this.DropDownListService.getTCMId("prefix="+"TCM"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}); 
        this.trans_sl_no = 0;
        while(this.transportation_chgs_matrix_details.length)
        this.transportation_chgs_matrix_details.removeAt(0);
        this.add();
        let slno=this.seq_no+"/"+'1';
        //console.log("slno:"+slno)
        this.transportation_chgs_matrix_details.at(0).patchValue({trans_charge_code:slno});

      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],    
        tcm_id: [''],
        tcm_code: [''],
        tcm_description: [''],
        tcm_effectivedate: [''],
        tcm_active:[''],
        businessunit_code:[''] ,
        businessunit_name:[''],
        gst_pay_own_rev_charges:[''],
        trans_charges_appl:[''],
        trans_mode:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        transportation_area_list:this.fb.group({
          area_id: '',
          area_name: '',
          description: '',
        }),
   
        transportation_chgs_matrix_details: this.fb.array([this.fb.group({
          trans_charge_code :'',
          transportation_from :'',
          transportation_to:'',
          distance_in_km:'',
          vehicles_type:'',
          full_truck_load_rate:'',
          rate_uom:'',
          uom:'',
          tax_code:'',
          tax_rate:'',
          transportation_acc:'',
          // tds_code:'',
          // tds_acc:'',
          // tds_rate:'',
          transporter:'',
          transporter_array:'',
          allowed_shortage:'',
          deduction_basedon:''})])
      });
    }

  /*  onchangeTdsCode(event, index)
    {
      if(event.target.value !="0")
      {
        this.status = false;
        this.DropDownListService.tdsAccount(event.target.value).subscribe(data=>
        {
          this.transportation_chgs_matrix_details.at(index).patchValue({tds_rate: data.tds_rate});   
          this.status = true;
        });     
      }     
    }*/

   

    add() 
    {
      this.trans_sl_no =this.trans_sl_no + 1;
      this.transportation_chgs_matrix_details.push(this.fb.group({
        trans_charge_code :this.seq_no+"/"+this.trans_sl_no,
          transportation_from :'',
          transportation_to:'',
          distance_in_km:'',
          vehicles_type:'',
          full_truck_load_rate:'',
          rate_uom:'',
          uom:'',
          tax_code:'',
          tax_rate:'',
          transportation_acc:'',
          // tds_code:'',
          // tds_acc:'',
          // tds_rate:'',
          transporter:'',
          transporter_array:'',
          allowed_shortage:'',
          deduction_basedon:''}));
    }

    delete(index) 
    {
      if(this.trans_sl_no > 1)
      { 
        this.transportation_chgs_matrix_details.removeAt(index);
        this.trans_sl_no = this.trans_sl_no - 1;
        this.transportation_chgs_matrix_details.at(index).patchValue({trans_charge_code :this.seq_no+"/"+this.trans_sl_no}); 
      }
      else
      {
        this.trans_sl_no = 1;
        alert("can't delete all rows");
        this.transportation_chgs_matrix_details.reset();
        this.transportation_chgs_matrix_details.at(0).patchValue({trans_charge_code:this.seq_no+"/"+this.trans_sl_no});
      }
      for(let i=1; i<=this.trans_sl_no; i++)
        this.transportation_chgs_matrix_details.at(i-1).patchValue({trans_charge_code:this.seq_no+"/"+i});
    }

    showPopUp1(index)
    { 
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};
      const dialogRef = this.dialog.open(TransportationpopupmodalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {this.transportation_chgs_matrix_details.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});}); 
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findTransChgsMatrix('0').subscribe(data=>
          {
            this.listTransportationChgsMatrix = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findTransChgsMatrix(serchText).subscribe(data=>
          {
            this.listTransportationChgsMatrix = data;
            this.status = true;
          });     
        }
      }
    }

    onUpdate(id:any, tcm_id:string,action)
    {
      if(action=='Update')
      {
        this.transchargesmastersave=true;
      }
      else
      {
        this.transchargesmastersave=false;
      }
      this.selectedTransacc = [];
      this.selectedTransName = [];
      
      this.transchargesmastersave=true;
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
    
      forkJoin(
        this.Service.retriveTransChgsMatrix(id),
        this.Service.transChrgsMatRetriveList(tcm_id)
      ).subscribe(([TransportationDtls, ChgsMatrixDtls])=>
        {
          this.userForm.patchValue(TransportationDtls);
         // console.log("Transdetails: "+JSON.stringify(TransportationDtls));       
 
        let k = 0;
        while (this.transportation_chgs_matrix_details.length ) 
        {this.transportation_chgs_matrix_details.removeAt(0);}
        for(let data1 of ChgsMatrixDtls)
        {
          this.selectedTransacc[k] = data1["transportation_acc"];
          this.selectedTransName[k] = data1["transporter"];
          this.trans_sl_no = (ChgsMatrixDtls.length) - 1;
          this.add(); 
          this.transportation_chgs_matrix_details.patchValue(ChgsMatrixDtls);
          k = k + 1;
        }
        //this.transportation_chgs_matrix_details.patchValue(ChgsMatrixDtls);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
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
        this.status = false;
       if(this.userForm.get("tcm_description").value == '' || this.userForm.get("tcm_description").value == null || this.userForm.get("tcm_description").value == 0)
        {
          alert("Please Enter TCM Description");
          this.status=true;
        }
        else if(this.userForm.get("tcm_effectivedate").value == '' || this.userForm.get("tcm_effectivedate").value == null || this.userForm.get("tcm_effectivedate").value == 0)
        {
          alert("Please Enter TCM Effective Date");
          this.status=true;
        }
        else if(this.userForm.get("businessunit_code").value == '' || this.userForm.get("businessunit_code").value == null || this.userForm.get("businessunit_code").value == 0)
        {
          alert("Please Select Bussiness Unit Name");
          this.status=true;
        }
        else if(this.userForm.get("trans_mode").value == '' || this.userForm.get("trans_mode").value == null || this.userForm.get("trans_mode").value == 0)
        {
          alert("Please Enter Transportation Mode");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            let transporterarray:any=[];
            let transporterstring="";
            for(let k=0;k<this.transportation_chgs_matrix_details.length;k++)
            {
              transporterarray=this.transportation_chgs_matrix_details.at(k).get("transporter").value;

              for(let i = 0; i < transporterarray.length; i++)
              {
                transporterstring+=transporterarray[i]+",";
              }
              this.transportation_chgs_matrix_details.at(k).patchValue({transporter_array:transporterstring.substring(0,transporterstring.length-1)})
  
            }
            
            this.Service.updateTransChgsMatrix(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Transpotation charges matrix Updated successfully.");
              this.userForm.reset();
              this.ngOnInit();   
              this.isHidden = false;         
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
           this.ngOnInit()});
          } 
          else
            {
              for(let k=0;k<this.transportation_chgs_matrix_details.length;k++)
              {
                let transporterarray:any=[];
                let transporterstring="";
                transporterarray=this.transportation_chgs_matrix_details.at(k).get("transporter").value;
               
                for(let i = 0; i < transporterarray.length; i++)
                {
                  transporterstring+=transporterarray[i]+",";
                }
             //   console.log("send::"+transporterstring.substring(0,transporterstring.length-1))
                this.transportation_chgs_matrix_details.at(k).patchValue({transporter_array:transporterstring.substring(0,transporterstring.length-1)})
              }
              
             this.Service.createTransChgsMatrix(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Transpotation charges matrix created successfully.");
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

    onDelete(id:any,tcm_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Transportation Charges Matrix ?"))
      {
        this.userForm.patchValue({username: localStorage.getItem("username")}); 
        this.DropDownListService.checkMisleniousDeletation(tcm_id,"transportationChargeMatrixMaster").subscribe(checkBUData=> 
          {
         // alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.status = false;
            let transporterarray=["0"]
            this.transportation_chgs_matrix_details.at(0).patchValue({transporter:transporterarray});
            this.Service.deleteTransChgsMatrix(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat tcm_description:"+data.tcm_description);
        
                if(data.tcm_description=='' || data.tcm_description==null)
                {
                  alert("Opps!!! Can't delete this Transportation Charges Matrix !!!");
                }else{
                  alert("Transportation Charges Matrix deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Transportation Charges Matrix is Already Used,Can not be Deleted!! ");
           }
          }); 
      }  
      this.status = true;
    }

    getTrans(trans,index)
    {
      for(let i=0;i<trans.length;i++)
      {
        if(trans.length)
        {
          this.transportation_chgs_matrix_details.at(index).patchValue({transporter:trans})
         // console.log("transporter:"+this.transportation_chgs_matrix_details.at(index).get("transporter").value)
        }
      }
    }
    
    getTransacc(transacc,index)
    {
      //console.log("transacc:"+transacc)
        if(transacc.length)
        {
          this.transportation_chgs_matrix_details.at(index).patchValue({transportation_acc:transacc})
        }
    }
    
    // getTdsacc(trans,index)
    // {
    //     if(trans.length)
    //     {
    //       this.transportation_chgs_matrix_details.at(index).patchValue({tds_acc:trans})
    //     }
    // }

  }

