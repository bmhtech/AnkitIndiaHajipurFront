import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { GatePass } from '../../../../../../Models/SalesTransaction/gate-pass';

@Component({
  selector: 'app-gatepass',
  templateUrl: './gatepass.component.html',
  styleUrls: ['./gatepass.component.scss']
})
export class GatepassComponent implements OnInit {
  isHidden = false;
  public userForm:FormGroup;
  model:GatePass=new GatePass();
  listGatePass: GatePass[];
  submitted = false;
  status1:boolean;
  packingItem:any=[];
  advive_nos:{};
  item_codes:{};
  status3 = false;
  trans_codes:{};
  driver_names:{};
  slNo = 1;
  doc_slno = 1;
  
  currentDate:any;
  gatepasssave:boolean = true;
  
  constructor(public fb:FormBuilder, public dialog: MatDialog,
    private Service : Master,private DropDownListService: DropdownServiceService) 
    { 
          this.userForm=fb.group({
            
            challan_date: [''],
            advive_no:[''],
            status:[''],
            narration:[''],
            trans_name:[''],
            driver_name:[''],
            truck_no:[''],
            company_id: [''],
            fin_year: [''],
            username: [''],

            gate_Pass_Item_Dtls: this.fb.array([this.fb.group({
              sl_no:this.slNo,
              item_name:'',
              pack_mat:'',
              pack_qty:'',
              pack_uom: '',
              item_qty:'',
              item_uom:''})]),  

              gate_pass_Docs: this.fb.array([this.fb.group({
                sl_no:this.doc_slno,
                doc_no:'',
                doc_name:'',
                doc_date:'',
                applicable: '',
                checked:'',
                        
              })]), 
          });
    }
    
    
        get challan_date(){ return this.userForm.get("challan_date") as FormControl }
        get advive_no(){return this.userForm.get("advive_no") as FormControl};
        get status(){return this.userForm.get("status") as FormControl};
        get narration(){return this.userForm.get("narration") as FormControl};
        get trans_name(){return this.userForm.get("trans_name") as FormControl};
        get driver_name(){return this.userForm.get("driver_name") as FormControl};
        get truck_no(){return this.userForm.get("truck_no") as FormControl};
        get gate_Pass_Item_Dtls(){return this.userForm.get("gate_Pass_Item_Dtls") as FormArray};
        get gate_pass_Docs(){return this.userForm.get("gate_pass_Docs") as FormArray};
        

    showList(s:string){
      
      if(this.gatepasssave == true)
      {
        if(s=="add")
          {
            this.isHidden=true;
         }
      }
      if(s=="list")
      {
          this.isHidden=false;
      }
     }

     add3()
     {
       this.slNo = this.slNo+1;
       this.gate_Pass_Item_Dtls.push(this.fb.group({
        sl_no:this.slNo,
        item_name:'',
        pack_mat:'',
        pack_qty:'',
        pack_uom: '',
        item_qty:'',
        item_uom:''}));
     }

     delete3(index) 
    {
      if(this.slNo > 1)
      { 
        this.gate_Pass_Item_Dtls.removeAt(index);
        this.slNo = this.slNo - 1;
      }
      else
      {
        this.slNo = 1;
        alert("can't delete all rows");
        this.gate_Pass_Item_Dtls.reset();
        this.gate_Pass_Item_Dtls.at(0).patchValue({sl_no:  this.slNo});
      } 
      
      for(let i=1; i<=this.slNo; i++)
        this.gate_Pass_Item_Dtls.at(i-1).patchValue({sl_no: i});
      
    }

    DocAdd()
    {
      this.doc_slno=this.doc_slno+1;
      this.gate_pass_Docs.push(this.fb.group({
        sl_no : this.doc_slno,  
        doc_no:'',
        doc_name:'',
        doc_date:'',
        applicable: '',
        checked:'', }))
    }

    DocDelete(index) 
    {
      if(this.doc_slno > 1)
      { 
        this.gate_pass_Docs.removeAt(index);
        this.doc_slno = this.doc_slno - 1;
      }
      else
      {
        this.doc_slno = 1;
        alert("can't delete all rows");
        this.gate_pass_Docs.reset();
        this.gate_pass_Docs.at(0).patchValue({sl_no:  this.doc_slno});
      } 
      
      for(let i=1; i<=this.doc_slno; i++)
        this.gate_pass_Docs.at(i-1).patchValue({sl_no: i});
      
    }

      getAdvicedlts(advice_no:String)
            {
              this.status1 = false;
              if(advice_no)
              {
                this.DropDownListService.TransInfoRetriveList(advice_no).subscribe(data=>
                {
                  this.userForm.patchValue({
                    trans_name:data["transporter_name"]
                    }); 
                });
              //DriverName
                this.DropDownListService.loadingAdviceVehicle(advice_no).subscribe(data=>
                  {
                    this.userForm.patchValue({
                      truck_no:data["veh_no"]
                      }); 
                  });

                  this.DropDownListService.DriverName(advice_no).subscribe(data=>
                    {
                      this.userForm.patchValue({
                        driver_name:data["driver_name"]
                        }); 
                    });

                  this.DropDownListService.loadingItemRetriveList(advice_no).subscribe(data=>
                    {
                      let i =0;
                      while(this.gate_Pass_Item_Dtls.length)
                      { this.gate_Pass_Item_Dtls.removeAt(0);}
                     // this.isChecked4 = true;
                      for(let data1 of data)
                      {
                        this.add3()

                        this.gate_Pass_Item_Dtls.at(i).patchValue({item_name: data1.item_code, 
                          pack_mat:data1.packing,
                          pack_qty:data1.quantity,pack_uom:data1.uom,
                          item_qty:data1.s_quantity,
                          item_uom:data1.s_uom,});
                        i=i+1;
                      }
                    }); 
                    this.status1 = true;} 
             }   

            //  onChangeItemName(index,event)
            //  {
            //    if(event)
            //    {
            //      this.status1 = false;
            //      this.DropDownListService.getItemNameById(event.target.value).subscribe(data=>
            //      {                                          
            //        this.DropDownListService.getItemMasterPackMat(event.target.value).subscribe(data1=>{   
            //         this.packingItem[index] = data1; });       
            //      });
            //      this.status1 = true;
            //    }}
             
      ngOnInit() 
    {
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"sales_transaction";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
  
    this.gatepasssave = false;

    if(accessdata.includes('gate_pass.save'))
        {
          this.gatepasssave = true;
        }

    }, (error) => {this.status3=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});

         this.DropDownListService.itemNamesList().subscribe(data=>{this.item_codes = data;}, (error) => {this.status1=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});    
          this.DropDownListService.getDriverList().subscribe(data=>{this.driver_names = data;}, (error) => {this.status1=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    
          this.DropDownListService.transporterNamesList().subscribe(data=>{this.trans_codes = data;}, (error) => {this.status1=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    
          this.Service.getGatePasses().subscribe(data=>{this.listGatePass  = data;}, (error) => {this.status1=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.DropDownListService.getLoadingAdviceList().subscribe(data=>{this.advive_nos  = data;}, (error) => {this.status1=true;console.log("ERROR get: "+JSON.stringify(error));
          this.ngOnInit()});    
          this.status1=true;
    }


  send(){
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"), fin_year:localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")}); 
    this.submitted = true;
    if(!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    } else {
      this.status1 = false;
      this.Service.createGatePass(this.userForm.value)
         .subscribe( data => {
          console.log(this.userForm.value);
           alert("New Gate-pass created successfully.");
           this.userForm.reset();
          //refresh List;
          this.DropDownListService.itemNamesList().subscribe(data=>{this.item_codes = data;});
          this.DropDownListService.getDriverList().subscribe(data=>{this.driver_names = data;}); 
          this.DropDownListService.transporterNamesList().subscribe(data=>{this.trans_codes = data;});  
             this.DropDownListService.getLoadingAdviceList().subscribe(data=>{this.advive_nos  = data;});
             this.Service.getGatePasses().subscribe(data=>{this.listGatePass  = data; });
             this.status1 = true;          
         }, (error) => {this.status1=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});    
     
    }
  
  }

}
