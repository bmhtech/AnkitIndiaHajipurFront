import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ProdInputDetails, prod_input_details } from '../../../../../../Models/ProductionModel/prod-input-details';
import { forkJoin } from 'rxjs';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-input-item-popup',
  templateUrl: './input-item-popup.component.html',
  styleUrls: ['./input-item-popup.component.scss']
})
export class InputItemPopupComponent implements OnInit 
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
    private dialogRef: MatDialogRef<InputItemPopupComponent>, @Inject(MAT_DIALOG_DATA)data) 
    {
      this.status = false;

      this.userForm1=fb.group
      ({
        item: [''],
        pack: [''],

        prod_input_details: this.fb.array([this.fb.group({
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
      this.packing = data.packing;
      this.shiftid = data.shiftid;
      this.CompanyName = localStorage.getItem("company_name");
      this.tolerance=data.tolerance;
      this.capacity = data.capacity;
      this.id=data.id;
      
      if(this.id>0)
      {
        forkJoin(
        this.DropDownListService.getInputPopup(this.id,this.item),
       // this.DropDownListService.getItemPackUom(this.item,this.packing,this.CompanyName)   
       // ).subscribe(([data,InputitemData])=>
       ).subscribe(([data])=>
          {
            //this.capacity = InputitemData["capacity"];

            this.prod_input_details.removeAt(0);
            let k1=0;
            for(let data1 of data)
            {
              this.add();
              this.prod_input_details.at(k1).patchValue({sl_no:data1["sl_no"],shifttime:data1["shifttime"],itemqty:data1["itemqty"],packingqty:data1["packingqty"],checkbox:data1["checkbox"]});
              k1=k1+1;
            }
          });
      }
      else
      {
        forkJoin(
          this.DropDownListService.getProcessThruBUSFProDesc("bunit="+this.BUunit+"&sfloor="+this.Shoop_Floor+"&pdesc="+this.Process+"&company="+this.company_name),
          //this.DropDownListService.getItemPackUom(this.item,this.packing,this.CompanyName),         
      
       // ).subscribe(([ProcessData, InputitemData ])=>
       ).subscribe(([ProcessData])=>
          {
  
            this.process_mntnce = ProcessData["process_mntnce"]; //shift yes or no
            this.shift_no = ProcessData["shift_no"];
            this.shift_mntnce = ProcessData["shift_mntnce"];
            this.perd_day = ProcessData["perd_day"];
            this.process_freq = ProcessData["process_freq"];       
            //this.capacity = InputitemData["capacity"];
           
            this.prod_input_details.removeAt(0);
          // console.log("process_mntnce  "+ this.process_mntnce);
           if( this.process_mntnce=="No")
           {
            this.DropDownListService.getProdTranShiftTimeShiftNo("bunit="+this.BUunit+"&sfloor="+this.Shoop_Floor+"&process="+this.Process+"&shiftid="+this.shiftid).subscribe(Shiftdata=>
              { 
               
                  this.add();
                  this.prod_input_details.at(0).patchValue({sl_no:1,shifttime:Shiftdata[0]["shifttime"]});
               
              });
           }
           if( this.process_mntnce=="Yes")
           {
             
             this.DropDownListService.getProdTranShiftTime("bunit="+this.BUunit+"&sfloor="+this.Shoop_Floor+"&process="+this.Process+"&shiftid="+this.shiftid).subscribe(Shiftdata=>
              { 
                let hours=this.perd_day  * 24;
                console.log("hours : "+hours);
                let total_shift= hours / this.shift_no;
                //console.log("total_shift : "+total_shift);
          
                this.Rowlength = total_shift /  this.shift_mntnce;
               // console.log("Rowlength : "+this.Rowlength);
              
                let shiftarray:any=[];
                shiftarray =Shiftdata;
     
                for(let i=0;i<this.Rowlength;i++)
                {
                  this.add();
                  this.prod_input_details.at(i).patchValue({sl_no:i+1,shifttime:shiftarray[i]["shifttime"],checkbox:"true"});
                  
                }
              });
       
           }
             this.status = true;
           }); 
      }
       
         

    }

    get prod_input_details(){{ return this.userForm1.get('prod_input_details') as FormArray;}}

    add()
    {
      this.prod_input_details.push(this.fb.group({
        checkbox: '',
        shifttime:'',
        itemqty: '',
        packingqty: '',
        sl_no:''
       }));
    }

    packingsum:any;
    itemsum:any;
    itemQty:any;
    pack:any;
    

    setOnItemQty(packingQty, index)
    {
 /*     
      this.packingsum=0;
      this.itemsum=0;
     // console.log("packingQty;"+packingQty+"index"+index+" capacity:"+this.capacity)
      this.pack=packingQty.target.value
      let itemqty = Number(packingQty.target.value)*Number(this.capacity);

     // let itemqty = this.itemQty*this.capacity;
      this.prod_input_details.at(index).patchValue({itemqty:itemqty.toFixed(3)});
*/
     


            if(this.uom_basedon == "Packing_Uom")
            {
              this.pack=packingQty.target.value
              let itemqty = Number(packingQty.target.value)*Number(this.capacity);
              
              this.prod_input_details.at(index).patchValue({itemqty:itemqty.toFixed(3)});

              
            }
            else
            {
           
      

             
              let itemstatusmin:boolean=false;
              let itemstatus:boolean=false;
              let defaultpackingqty = Math.round(Number(this.prod_input_details.at(index).get("itemqty").value)/Number(this.capacity));      
              let minqty:number=(Number(defaultpackingqty) * ((100-Number(this.tolerance))/100));
              let maxqty:number=(Number(defaultpackingqty) * ((100+Number(this.tolerance))/100));  
              itemstatusmin=Number(packingQty.target.value) >=minqty;
              itemstatus= Number(packingQty.target.value) <= maxqty;

              console.log("check here packingqty " + defaultpackingqty + " / "+ minqty + " / " + maxqty)
              if( itemstatus==true && itemstatusmin ==true)
              {
                
              }
              else
              {
                alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
                this.prod_input_details.at(index).patchValue({packingqty:defaultpackingqty.toFixed(3)});
                
              }
            }
            
      

     
    }
    packingsum1:any;
    itemsum1:any;
    setOnPackingQty(itemqty, index)//itemqty
      {
      
      /*  this.packingsum1=0;
        this.itemsum1=0;
       // console.log("itemqty;"+itemqty+"index"+index+" capacity:"+this.capacity)

        if(this.packing =="IM00021")//IM00021
        {
          this.prod_input_details.at(index).patchValue({packingqty:0});
        }
        else
        {
          let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacity));      
          this.prod_input_details.at(index).patchValue({packingqty:packingQty.toFixed(3)});
        }
        */
       // console.log("capacity pack::"+this.capacity)
        
       
        this.packingsum1=0;
        this.itemsum1=0;
       // console.log("itemqty;"+itemqty+"index"+index+" capacity:"+this.capacity)

        if(this.packing =="IM00021")//IM00021
        {
          this.prod_input_details.at(index).patchValue({packingqty:0});
        }
        else
        {
          if(this.uom_basedon == "Packing_Uom")
          {
            let itemstatusmin:boolean=false;
            let itemstatus:boolean=false;
            let defaultitemqty:number=Number(this.capacity)* Number(this.prod_input_details.at(index).get("packingqty").value);
            let minqty:number=(Number(defaultitemqty) * ((100-Number(this.tolerance))/100));
            let maxqty:number=(Number(defaultitemqty) * ((100+Number(this.tolerance))/100));
            itemstatusmin=Number(itemqty.target.value) >=minqty;
            itemstatus= Number(itemqty.target.value) <= maxqty;
            console.log("check here itemqty " + defaultitemqty + " / "+ minqty + " / " + maxqty)
            if( itemstatus==true && itemstatusmin ==true)
            {
            }
            else
            {
              alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) +" to " + maxqty.toFixed(3));
              this.prod_input_details.at(index).patchValue({itemqty:defaultitemqty.toFixed(3)});
             
            }

          }
          else
          {
            
            let packingQty = Math.round(Number(itemqty.target.value)/Number(this.capacity));      
            this.prod_input_details.at(index).patchValue({packingqty:packingQty.toFixed(3)});
          }
               

        }



       
      }  

    CompanyName:any;
  ngOnInit() 
  {
    
    console.log(" uom :: "+this.uom_basedon + " / " + this.capacity)
    this.status=true;
    this.CompanyName = localStorage.getItem("company_name");
    if(this.uom_basedon=="Packing_Uom")
    {
      this.packingdis=false;
    }
  else{
      this.packingdis=true;
    }
    console.log("this.packingdis:"+this.packingdis)
  }

  SendDataToDifferentComponenet()
    {
      this.itemsum=0;
      this.packingsum=0;
      for(let i = 0; i<this.prod_input_details.length; i++)
      {
       
       this.itemsum += Number(this.prod_input_details.at(i).get("itemqty").value);
       this.packingsum += Number(this.prod_input_details.at(i).get("packingqty").value);
    // console.log("item::"+this.prod_input_details.at(i).get("itemqty").value)
      }

      this.userForm1.patchValue({item: this.itemsum, pack:this.packingsum});
      this.userForm1.patchValue(this.prod_input_details.value);
      //.userForm1.patchValue(this.prod_input_details.value);
    
       this.dialogRef.close(this.userForm1.getRawValue());
    } 

}
