import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ProdOutputDetails,Prod_output_details} from '../../../../../../Models/ProductionModel/prod-output-details';
import { forkJoin } from 'rxjs';
import { Master } from '../../../../../../service/master.service';
import { fork } from 'child_process';


@Component({
  selector: 'app-output-item-popup',
  templateUrl: './output-item-popup.component.html',
  styleUrls: ['./output-item-popup.component.scss']
})
export class OutputItemPopupComponent implements OnInit 
  {
    public userForm1:FormGroup;
    check:any;
    status = false;
    BUunit:any;
    Shoop_Floor:any;
    Rowindex:any;
    Prod_Trans_Date:any;
    Process:any;
    uom_basedon:any;
    item:any;
    process_mntnce:any;
    shift_no:any;
    shift_mntnce:any;
    perd_day:any;
    process_freq:any;
    capacity:any;
    Rowlength:number;
    shiftid:any;
    packingdis:boolean=true;
    id:any;
    packing:any;
    company_name:any;
    
    tolerance:any;
  
    constructor( private fb: FormBuilder, private Service : Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<OutputItemPopupComponent>, @Inject(MAT_DIALOG_DATA)data) 
      {
        this.status = false;
  
        this.userForm1=fb.group
        ({
          item: [''],
          pack: [''],

          prod_output_details: this.fb.array([this.fb.group({
            checkbox: '',
            shifttime:'',
            itemqty: '',
            packingqty: '',
            sl_no:'',
            })]),
          });
  
        this.Rowindex = data.index;
        this.BUunit = data.BUunit;
        this.Shoop_Floor = data.Shoop_Floor;
        this.Process = data.Process;
        this.company_name = data.company_name;
        this.Prod_Trans_Date = data.Prod_Trans_Date;
        this.uom_basedon = data.uom_basedon;
        this.item  = data.item;
        this.shiftid = data.shiftid;
        this.packing = data.packing;
        this.id=data.id;
        this.capacity =data.capacity;
        this.tolerance =data.tolerance;

        if(this.id>0)
        {
          forkJoin(
          this.DropDownListService.getOutputPopup(this.id,this.item)
        //  this.DropDownListService.getItemPackUom(this.item , this.packing,this.company_name )        
          //).subscribe(([data,InputitemData])=>
          ).subscribe(([data])=>
            {
              //this.capacity = InputitemData["capacity"];
              this.prod_output_details.removeAt(0);
              let k1=0;
              for(let data1 of data)
              {
                this.add();
                this.prod_output_details.at(k1).patchValue({sl_no:data1["sl_no"],shifttime:data1["shifttime"],itemqty:data1["itemqty"],packingqty:data1["packingqty"],checkbox:data1["checkbox"]});
                k1=k1+1;
              }
            });
        }
        else
        {
  
        forkJoin(
          
          this.DropDownListService.getProcessThruBUSFProDesc("bunit="+this.BUunit+"&sfloor="+this.Shoop_Floor+"&pdesc="+this.Process+"&company="+this.company_name),
         // this.DropDownListService.getItemPackUom(this.item , this.packing,this.company_name ),         
      
        //).subscribe(([ProcessData, InputitemData ])=>
        ).subscribe(([ProcessData ])=>
          {
  
            this.process_mntnce = ProcessData["process_mntnce"]; //yes or no
            this.shift_no = ProcessData["shift_no"];
            this.shift_mntnce = ProcessData["shift_mntnce"];
            this.perd_day = ProcessData["perd_day"];
            this.process_freq = ProcessData["process_freq"];       
           // this.capacity = InputitemData["capacity"];
           
           this.prod_output_details.removeAt(0);
           //console.log("process_mntnce  "+ this.process_mntnce);
           if( this.process_mntnce=="No")
           {
             this.DropDownListService.getProdTranShiftTimeShiftNo("bunit="+this.BUunit+"&sfloor="+this.Shoop_Floor+"&process="+this.Process+"&shiftid="+this.shiftid).subscribe(Shiftdata=>
              {
                  this.add();
                  this.prod_output_details.at(0).patchValue({sl_no:1,shifttime:Shiftdata[0]["shifttime"]});
               
              });
           }
           if( this.process_mntnce=="Yes")
           {
             console.log("perd_day : "+this.perd_day);
             console.log("shift_no : "+this.shift_no);
             console.log("shift_mntnce : "+this.shift_mntnce);
             this.DropDownListService.getProdTranShiftTime("bunit="+this.BUunit+"&sfloor="+this.Shoop_Floor+"&process="+this.Process+"&shiftid="+this.shiftid)
             .subscribe(Shiftdata=>
              {
                let hours=this.perd_day  * 24;
                console.log("hours : "+hours);
                let total_shift= hours / this.shift_no;
                console.log("total_shift : "+total_shift);
          
                this.Rowlength = total_shift /  this.shift_mntnce;
                console.log("Rowlength : "+this.Rowlength);
                //this.process_freq
   
                let shiftarray:any=[];
                shiftarray =Shiftdata;
               
                for(let i=0;i<this.Rowlength;i++)
                {
                  this.add();
                  this.prod_output_details.at(i).patchValue({sl_no:i+1, shifttime:shiftarray[i]["shifttime"],checkbox:"true"});
                }
              });
       
            }
             this.status = true;
           });   
           
          }
      }
  
      get prod_output_details(){{ return this.userForm1.get('prod_output_details') as FormArray;}}
  
      add()
      {
        this.prod_output_details.push(this.fb.group({
          checkbox: '',
          shifttime:'',
          itemqty: '',
          packingqty: '',
          sl_no:''
         }));
      }

      setOnItemQty(packingQty, index)
      {
          
          let itemqty = Number(packingQty.target.value)*Number(this.capacity)
          this.prod_output_details.at(index).patchValue({itemqty:itemqty.toFixed(3)});
        
         /*
         if(this.uom_basedon == "Packing_Uom")
          {
             let itemqty = Number(packingQty.target.value)*Number(this.capacity)
             this.prod_output_details.at(index).patchValue({itemqty:itemqty.toFixed(3)});
        
          }
          else
          {
            let itemstatusmin:boolean=false;
            let itemstatus:boolean=false;
            let defaultpackingqty = Math.round(Number(this.prod_output_details.at(index).get("itemqty").value)/Number(this.capacity));      
            let minqty:number=(Number(defaultpackingqty) * ((100-Number(this.tolerance))/100));
            let maxqty:number=(Number(defaultpackingqty) * ((100+Number(this.tolerance))/100));  
            itemstatusmin=Number(packingQty.target.value) >=minqty;
            itemstatus= Number(packingQty.target.value) <= maxqty;
            if( itemstatus==true && itemstatusmin ==true)
            {
            
            }
            else
            {
              alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
              this.prod_output_details.at(index).patchValue({packingqty:defaultpackingqty.toFixed(3)});
            
            }
            
          }
          
           */
      }

      packingsum1:any;
      itemsum1:any;
      setOnPackingQty(itemqty, index)
      {

        this.packingsum1=0;
        this.itemsum1=0;
        if(this.packing =="IM00021")//IM00021
        {
          this.prod_output_details.at(index).patchValue({packingqty:0});
        }
        else
        {
          let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacity));      
          this.prod_output_details.at(index).patchValue({packingqty:packingQty.toFixed(3)});

        }
      
        /*
        this.packingsum1=0;
        this.itemsum1=0;
        if(this.packing =="IM00021")//IM00021
        {
          this.prod_output_details.at(index).patchValue({packingqty:0});
        }
        else
        {
          if(this.uom_basedon == "Packing_Uom")
          {

              let itemstatusmin:boolean=false;
              let itemstatus:boolean=false;
              let defaultitemqty:number=Number(this.capacity)* Number(this.prod_output_details.at(index).get("packingqty").value);
              let minqty:number=(Number(defaultitemqty) * ((100-Number(this.tolerance))/100));
              let maxqty:number=(Number(defaultitemqty) * ((100+Number(this.tolerance))/100));
              itemstatusmin=Number(itemqty.target.value) >=minqty;
              itemstatus= Number(itemqty.target.value) <= maxqty;
              if( itemstatus==true && itemstatusmin ==true)
              {
              
              }
              else
              {
              alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
              this.prod_output_details.at(index).patchValue({itemqty:defaultitemqty.toFixed(3)});
              
              }
          }
          else
          {
            let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacity));      
            this.prod_output_details.at(index).patchValue({packingqty:packingQty.toFixed(3)});

          }
              


        }
        */
      }
     
  
  
    ngOnInit() 
    {
      if(this.uom_basedon=="Packing_Uom")
      {
        this.packingdis=false;
      }
    else{
        this.packingdis=true;
      }
      this.status=true;
    }
  
    SendDataToDifferentComponenet()
      {
let itemsum:number=0;
let packingsum:number=0;
        for(let i = 0; i<this.prod_output_details.length; i++)
        {
         
         itemsum += Number(this.prod_output_details.at(i).get("itemqty").value);
         packingsum += Number(this.prod_output_details.at(i).get("packingqty").value);
       
        }
        this.userForm1.patchValue({item:itemsum, pack:packingsum});
        this.userForm1.patchValue(this.prod_output_details.value);
         this.dialogRef.close(this.userForm1.getRawValue());
      } 
  
  }
