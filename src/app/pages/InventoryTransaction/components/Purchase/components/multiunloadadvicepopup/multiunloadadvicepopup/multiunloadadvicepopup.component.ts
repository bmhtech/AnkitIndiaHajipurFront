import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';


import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


import { forkJoin } from 'rxjs';
import { PurchaseModuleServiceService } from '../../../../../../../service/purchase-module-service.service';

import { DropdownServiceService } from '../../../../../../../service/dropdown-service.service';



@Component({
  selector: 'app-multiunloadadvicepopup',
  templateUrl: './multiunloadadvicepopup.component.html',
  styleUrls: ['./multiunloadadvicepopup.component.scss']
})
export class MultiunloadadvicepopupComponent implements OnInit {
  
  public userForm1: FormGroup;
  ncList:{};
  list:{};
  description:String;
  unadvice_id :any;
  itemtype:boolean =false;
  businessUnit:any;
  supplier:any;
  purtype:any;
  pursubtype:any;
  orderdate:any;
Stringunloadadvice:any=[];
showsubmitbutton:boolean=true;
  mcheck : any;
  status:any;
  order_id:any;
  checkingpurchaseid='0';
  showsubmitbutton1:boolean=false;
    checkSubmit:any= [];
    Id:any;
    showbutton:boolean=true;
    staticArray:any = [];

  constructor( private fb: FormBuilder, private Service: PurchaseModuleServiceService, private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<MultiunloadadvicepopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {


 
      this.businessUnit = data["b_unit"];
      this.supplier=data["supp_id"];
      this.itemtype = data["item_type"];
      this.purtype=data["pur_type"];
      this.pursubtype=data["pur_subtype"];
      this.orderdate=data["order_date"];
      this.Id=data["id"];

      this.userForm1=fb.group
      ({
         unadviceid: [''],
         pur_orderid: [''],
         stringunloadadvice: [''],

         multiunloadadvice_details: this.fb.array([this.fb.group({ 
          checkbox: '',
          referance_id: '',
          unadviceno: '',
         weigmentno:'',
          item_subtypename: '',
          supp_name: '',
          unadviceid: '',
          total_qty_check: '',
          total_stock_qtycheck: '',
          total_mtwt_check: '',
          total_base_check: '',
         })]),
 
       
 
         grn_unload_item_list: this.fb.array([this.fb.group({
           checkbox: '',
           item_code: '',
           item_name:'',
           packing: '',
           packing_name: '',
           quantity:'',
           uom:'',
           s_qty: '',
           s_uom: '',
           mat_wt: '',
           wearhouse: '',
           wearhouse_name: '',
           rack: '',
           rack_name: '',
           base_qty: '' ,
           
        })]),
 
      });
  }

  get multiunloadadvice_details(){{ return this.userForm1.get('multiunloadadvice_details') as FormArray;}}
  get grn_unload_item_list(){{ return this.userForm1.get('grn_unload_item_list') as FormArray;}}


  add()
  {
    this.multiunloadadvice_details.push(this.fb.group({
      checkbox: 'true',
      referance_id: '',
      unadviceno: '',
      weigmentno:'',
      item_subtypename: '',
      supp_name: '',
      unadviceid: '',
      total_qty_check: '',
      total_stock_qtycheck: '',
      total_mtwt_check: '',
      total_base_check: '',
    }));

     
    }




  ngOnInit() {

    if(this.Id == 0)//on first time 
    {
      this.showbutton=true;
      this.status = false;

            if(this.itemtype == true)
            {
              let type="Item";
              let k:number=0; 
              console.log("ancsdghdahasdh :: "+this.businessUnit+" / " +  this.supplier+" / " + this.itemtype +" / " + this.purtype + " / " + this.pursubtype + " / " + this.orderdate);
              this.DropDownListService.getUnloadAdvRefPOwt2Argnew(this.businessUnit, this.supplier,type,this.purtype,this.pursubtype,this.orderdate).subscribe(data=>
                {
          
            console.log("dataview  :: " + JSON.stringify(data))
              while (this.multiunloadadvice_details.length )
                this.multiunloadadvice_details.removeAt(0);
              for(let v = 0;v<data.length;v++)
              {
              //console.log(" v :: " + v)
                this.add();
                this.multiunloadadvice_details.at(v).patchValue({checkbox:false,referance_id:data[v].pur_orderid,unadviceno:data[v].unadviceno,weigmentno:data[v].weighment_id,item_subtypename:data[v].item_subtypename,supp_name:data[v].supp_name,unadviceid:data[v].unadviceid,total_qty_check:'0',total_stock_qtycheck:'0',total_mtwt_check:'0',total_base_check:'0'});
                this.DropDownListService.checkmulticheck(data[v].pur_orderid).subscribe(data12=>
                  {
          
          console.log(" po multi check status  :: "+data12["madvice_sin_grn"])
                        if(data12.madvice_sin_grn == true)
                        {
                          console.log(data[v].weighment_id);
                        //  this.add(); 
                        //  this.multiunloadadvice_details.at(v).patchValue({checkbox:false,referance_id:data[v].pur_orderid,unadviceno:data[v].unadviceno,weigmentno:data[v].weighment_id,item_subtypename:data[v].item_subtypename,supp_name:data[v].supp_name,unadviceid:data[v].unadviceid,total_qty_check:'0',total_stock_qtycheck:'0',total_mtwt_check:'0',total_base_check:'0'});
                        }
                        else
                        {
                        
                        // this.multiunloadadvice_details.at(v).patchValue({checkbox:false,referance_id:data[v].pur_orderid,unadviceno:data[v].unadviceno,item_subtypename:data[v].item_subtypename,supp_name:data[v].supp_name,unadviceid:data[v].unadviceid,total_qty_check:'0',total_stock_qtycheck:'0',total_mtwt_check:'0',total_base_check:'0'});
                        }
          
          
                  }); 
              }
                
                
                
              
              
                // for(let loopdata of )
                  //this.list  = data;
                
                // console.log(JSON.stringify(data));
                  this.status = true;

                });
            }
            if(this.itemtype == false)
            {
              let k=0;
              let type="Service";
              this.DropDownListService.getUnloadAdvRefPOwt2Argnew(this.businessUnit, this.supplier,type,this.purtype,this.pursubtype,this.orderdate).subscribe(data=>
                {
                
                  while (this.multiunloadadvice_details.length )
                  this.multiunloadadvice_details.removeAt(0);
                    for(let v = 0;v<data.length;v++)
                    {
                      this.DropDownListService.checkmulticheck(data[v].pur_orderid).subscribe(data12=>
                        {
                
                
                              if(data12.madvice_sin_grn == 0)
                              {
                
                              }
                              else
                              {
                                this.add(); 
                                this.multiunloadadvice_details.at(v).patchValue({checkbox:false,referance_id:data[v].pur_orderid,unadviceno:data[v].unadviceno,item_subtypename:data[v].item_subtypename,supp_name:data[v].supp_name,unadviceid:data[v].unadviceid,total_qty_check:'0',total_stock_qtycheck:'0',total_mtwt_check:'0',total_base_check:'0'});
                          
                              }
                
                
                        }); 
                  // console.log(" v :: " + v  + JSON.stringify(data[v].pur_orderid))
                      //this.add();
                    // this.multiunloadadvice_details.at(v).patchValue({referance_id:data[v].pur_orderid,unadviceno:data[v].unadviceno,item_subtypename:data[v].unadviceno,supp_name:data[v].unadviceno,unadviceid:data[v].unadviceid});
                
                    }
                  this.status = true;
                });
            }
        }
        else
        {
            this.showbutton=false;
            this.status = false;
            forkJoin(
            this.Service.retrivePurchaseGRNMultipleUnloadAdvicePopup(this.Id),
            this.Service.retriveGRNItemFormultiple(this.Id)

            ).subscribe(([data,itemData])=>
              {
                console.log("chkdata12:"+JSON.stringify(itemData))
                while (this.multiunloadadvice_details.length )
                this.multiunloadadvice_details.removeAt(0);
                for(let v = 0;v<data.length;v++)
                {
                  this.add();
                  this.multiunloadadvice_details.at(v).patchValue({checkbox:true,referance_id:data[v].pur_orderid,unadviceno:data[v].unadviceno,weigmentno:data[v].weighment_id,item_subtypename:data[v].item_subtypename,supp_name:data[v].supp_name,unadviceid:data[v].unadviceid,total_qty_check:'0',total_stock_qtycheck:'0',total_mtwt_check:'0',total_base_check:'0'});
                }
                
                
                while (this.grn_unload_item_list.length )
                this.grn_unload_item_list.removeAt(0);
                this.add2();
                 for(let data1 of itemData)
                  {
                    this.grn_unload_item_list.patchValue(itemData);
                    this.grn_unload_item_list.at(0).patchValue({checkbox:true});
                  }
    
                  this.status = true;
                 
             });
              
        }
  
  }
  add2()
  {
    this.grn_unload_item_list.push(this.fb.group({
      checkbox: 'true',
      item_code: '',
      item_name:'',
      packing: '',
      packing_name: '',
      quantity:'',
      uom:'',
      s_qty: '',
      s_uom: '',
      mat_wt: '',
      wearhouse: '',
      wearhouse_name: '',
      rack: '',
      rack_name:'',
      base_qty: '',
    }));
    }
  

    
  //  check1(unloadCodeList:grn_unload_code_list)
  check1(index,event,control)
    {
     
      if(this.checkingpurchaseid == '0' )
      {
    
        this.checkingpurchaseid = this.multiunloadadvice_details.at(index).get("referance_id").value;
        this.unadvice_id =  this.multiunloadadvice_details.at(index).get("unadviceid").value as FormControl;
      }
      
      if(event.checked == true)
      {
        

console.log("let see :: "+  this.checkingpurchaseid);

                    
                      console.log( this.multiunloadadvice_details.at(index).get("referance_id").value +" // " + this.checkingpurchaseid);
                    if(this.checkingpurchaseid == this.multiunloadadvice_details.at(index).get("referance_id").value)
                    {
                         



                         this.Stringunloadadvice.push(this.multiunloadadvice_details.at(index).get("unadviceid").value);





                          console.log(" this.unadvice_id  "+   this.unadvice_id );
                          this.status = false;
                          let total_qty_check_amt:number=0;
                          let total_stock_qtycheck_amt:number=0;
                          let total_mtwt_check_amt:number=0;
                          let total_base_check_amt:number=0;

                          forkJoin(
                            this.DropDownListService.getUnloadItemList(this.multiunloadadvice_details.at(index).get("unadviceid").value),
                            this.DropDownListService.getUnloadDetails(this.multiunloadadvice_details.at(index).get("unadviceid").value)
                          ).subscribe(([itemData, unloadData])=>
                          {
                            console.log("itemData :: "+ JSON.stringify(itemData))
                          
                            this.order_id = unloadData["pur_orderid"]
                            while (this.grn_unload_item_list.length )
                            this.grn_unload_item_list.removeAt(0);
                          this.add2();
                            for(let i=0; i<itemData.length; i++)
                          {
                           
                            total_qty_check_amt+=Number(itemData[i].quantity);
                            total_stock_qtycheck_amt+=Number(itemData[i].s_qty);
                            total_mtwt_check_amt+=Number(itemData[i].mat_wt);
                            total_base_check_amt+=Number(itemData[i].base_qty);
                            
                            
                            // this.grn_unload_item_list.at(0).patchValue(itemData[i]);


                            this.grn_unload_item_list.at(0).patchValue({checkbox:true,item_name:itemData[0].item_name,packing_name:itemData[0].packing_name,uom:itemData[0].uom,s_uom:itemData[0].s_uom,wearhouse_name:itemData[0].wearhouse,rack_name:itemData[0].rack,base_qty:itemData[0].base_qty,packing:itemData[0].packing,item_code:itemData[0].item_code,wearhouse:itemData[0].wearhouse,rack:itemData[0].rack});

                          }
                            
                          
                    //hello add calculations
                    this.multiunloadadvice_details.at(index).patchValue({total_qty_check:total_qty_check_amt,total_stock_qtycheck:total_stock_qtycheck_amt,total_mtwt_check:total_mtwt_check_amt,total_base_check:total_base_check_amt});
                            var totalqty:number=0,total_stockqty:number=0,totalmtwt:number=0;
                        for(let b=0;b<this.multiunloadadvice_details.length;b++)
                        {

                            totalqty += Number(control[b].controls.total_qty_check.value);

                              total_stockqty += Number(control[b].controls.total_stock_qtycheck.value);
                          
                              totalmtwt +=Number(control[b].controls.total_mtwt_check.value);
                          
                          
                          
                      
                        }
                    
                        this.grn_unload_item_list.at(0).patchValue({quantity:totalqty,s_qty:total_stockqty,mat_wt:totalmtwt});
                    
                    this.status = true;
                    });


                    }
                    else 
                    {
                     
                      alert("Purchase order Number Should be same ");
                     event.checked =false;
                      this.multiunloadadvice_details.at(index).patchValue({checkbox:false});
                     
                   }

        
      
      
}//FIRST CHECKED TRUE ENDS
      if(event.checked == false)
      {
        this.Stringunloadadvice=[];
        this.multiunloadadvice_details.at(index).patchValue({total_qty_check:0,total_stock_qtycheck:0,total_mtwt_check:0,total_base_check:0});
        var totalqty:number=0,total_stockqty:number=0,totalmtwt:number=0;
        for(let b=0;b<this.multiunloadadvice_details.length;b++)
        {
          totalqty += Number(control[b].controls.total_qty_check.value);

                 total_stockqty += Number(control[b].controls.total_stock_qtycheck.value);
              
                 totalmtwt +=Number(control[b].controls.total_mtwt_check.value);
               
                    if(this.multiunloadadvice_details.at(b).get("checkbox").value == true)
                    {
                      this.Stringunloadadvice.push(this.multiunloadadvice_details.at(b).get("unadviceid").value);
                    }
               
        
         }
        this.grn_unload_item_list.at(0).patchValue({quantity:totalqty,s_qty:total_stockqty,mat_wt:totalmtwt});
       
      }
     console.log("this.Stringunloadadvice :: "+ this.Stringunloadadvice);
    }

    SendDataToDifferentComponenet()
    {
        this.userForm1.patchValue({unadviceid: this.unadvice_id, pur_orderid: this.checkingpurchaseid,stringunloadadvice:this.Stringunloadadvice});
        this.userForm1.patchValue(this.grn_unload_item_list.value)
       
        this.submitstatus();
      if(this.showsubmitbutton == true && this.showsubmitbutton1 == true)
      {
        //alert(JSON.stringify(this.userForm1.value));
        this.dialogRef.close(this.userForm1.value); 
      }
      else
      {
      alert("Please tick on checkbox!!!!");
      } 
    }


    submitstatus()
    {
      this.checkSubmit=[];
      for(let i=0;i<this.grn_unload_item_list.length;i++)
      {
        
        if(this.grn_unload_item_list.at(i).get("checkbox").value == true || this.grn_unload_item_list.at(i).get("checkbox").value == "true")
        {
             // this.showsubmitbutton=false;
             this.checkSubmit.push("true");
        }
      }
      if(this.checkSubmit.includes("true"))
      {
        //alert('hi');
        this.showsubmitbutton1=true;
        
      }
      
    }
  

}
