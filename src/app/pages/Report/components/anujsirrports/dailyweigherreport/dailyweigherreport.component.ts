import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { Dailyweigher } from '../../../../../Models/Report/Dailyweigher';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DailyweigherreportpopupComponent } from '../dailyweigherreportpopup/dailyweigherreportpopup.component';

@Component({
  selector: 'app-dailyweigherreport',
  templateUrl: './dailyweigherreport.component.html',
  styleUrls: ['./dailyweigherreport.component.scss']
})
export class DailyweigherreportComponent implements OnInit {
  
  model: Dailyweigher = new Dailyweigher();
  itemList:any = [];
  packingItem:any = [];
  selectedItemName:any = [];
  selectedPackingItem:any = [];
  bussiness_unit_list:any = [];
  company_name:any;
  capacity:any = [];
  empty_bag_wt:any = [];
  empty_bag_wt_priceBasedOn:any = [];
  public userForm:FormGroup;
  isHidden:any;
  item_sl_no = 1; 
  status = false;
  Id:any;
  dailyweigherlist:any = [];
  currentDate:any;
  action:any;
  dailyweighersave:boolean=true;
  wghdate:any=[];
  machineName:any=[];
  bags:any;
  kgs:any;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,public dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id: [''],
      dwg_id: [''],
      b_unit: [''],
      machine: [''],
      oacumwt: [''],
      cacumwt: [''],
      oacumpcs: [''],
      cacumpcs: [''],
      totalbags: [''],
      totalkgs: [''],
      differencebags: [''],
      differencekgs: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      weigherdate:[''],
      
      dailyweigher_Dtls:this.fb.array([this.fb.group({
        slno: this.item_sl_no,
        item_code: '',
        packing_item: '',	
        bags: '',	
        kgs: ''
      })]),

    });


  }

  get id(){ return this.userForm.get("id") as FormControl }
  get dwg_id(){ return this.userForm.get("dwg_id") as FormControl }
  get b_unit(){ return this.userForm.get("b_unit") as FormControl }
  get machine(){ return this.userForm.get("machine") as FormControl }
  get oacumwt(){ return this.userForm.get("oacumwt") as FormControl }
  get cacumwt(){ return this.userForm.get("cacumwt") as FormControl }
  get oacumpcs(){ return this.userForm.get("oacumpcs") as FormControl }
  get cacumpcs(){ return this.userForm.get("cacumpcs") as FormControl }
  get totalbags(){ return this.userForm.get("totalbags") as FormControl }
  get totalkgs(){ return this.userForm.get("totalkgs") as FormControl }
  get differencebags(){ return this.userForm.get("differencebags") as FormControl }
  get differencekgs(){ return this.userForm.get("differencekgs") as FormControl }
  
  get weigherdate(){ return this.userForm.get("weigherdate") as FormControl }

  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }

  get dailyweigher_Dtls() { return this.userForm.get('dailyweigher_Dtls') as FormArray;}
  
  ngOnInit() 
  {
    this.company_name = localStorage.getItem("company_name");
    this.isHidden=false;

    forkJoin( 
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getDailyweigherList()
      ).subscribe(([bUnitData,dailyweigher])=>
      {
        this.bussiness_unit_list=bUnitData;
        this.dailyweigherlist=dailyweigher;
        //console.log("CHECK DATA :: "+dailyweigher[1]["weigherdate"]);
        let i=0;
        for( i=0;i<dailyweigher.length;i++)
        {
        this.wghdate[i] = dailyweigher[i]["weigherdate"];
        this.machineName[i]=dailyweigher[i]["machine"];
        }
       // alert(this.wghdate);
      });
      this.item_sl_no = 0;
      this.status = true;
      this.action = 'update';
      
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.item_sl_no = 1;
      this.dailyweighersave = true;
      this.action='update';
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.packingItem=[];
      this.capacity=[];
      this.empty_bag_wt=[];
      this.empty_bag_wt_priceBasedOn=[];
      this.selectedItemName=[];
      this.item_sl_no = 0;
      while(this.dailyweigher_Dtls.length)
      this.dailyweigher_Dtls.removeAt(0);
      this.addItems();
    }
  }

  onChangeBussinessUnit(b_unit)
  {
    this.DropDownListService.getFinishedItemlist(b_unit).subscribe(data=>
      {
              this.itemList=data;
      });
  }

  onchangeItemName(index,itemId)
  {
    if(itemId.length && itemId != "0")
    {
     
        this.DropDownListService.getItemMasterPackMat(itemId).subscribe(packingItemData=>
        {   
          this.selectedItemName[index]=itemId;
          this.packingItem[index] = packingItemData;
          this.dailyweigher_Dtls.at(index).patchValue({item_code:itemId});
        });
    }
  }

  onchangePackingItem(index, event)
  {
    if(event.target.value != '0')
    {
      forkJoin(
        this.DropDownListService.getItemPackUom(this.dailyweigher_Dtls.at(index).get("item_code").value, event.target.value,this.company_name)
        )
        .subscribe(([data])=>
        {  
        
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;
          this.dailyweigher_Dtls.at(index).patchValue({packing_item:event.target.value});
        });
    }
  }
  
  getkgs(packingQty, index)
  {
      console.log(this.capacity[index] + " // " + packingQty.target.value);
     
      let kgs =Number(this.capacity[index] * packingQty.target.value)
      this.dailyweigher_Dtls.at(index).patchValue({kgs:Number(kgs)*100});
      this.calculation();
  }

  calculation()
  {
     let totalbags=0,totalkgs=0,diffbags=0,diffkgs=0;
    for(let i=0;i<this.dailyweigher_Dtls.length;i++)
    {
      totalbags+=Number(this.dailyweigher_Dtls.at(i).get("bags").value)
      totalkgs+=Number(this.dailyweigher_Dtls.at(i).get("kgs").value)
    }
    
    //diffbags=totalbags-(Number(this.userForm.get("oacumwt").value)+Number(this.userForm.get("cacumwt").value));
    //diffkgs=totalkgs-(Number(this.userForm.get("oacumpcs").value)+Number(this.userForm.get("cacumpcs").value));
    
    diffkgs=(Number(this.userForm.get("cacumwt").value)-Number(this.userForm.get("oacumwt").value));
    diffbags=(Number(this.userForm.get("cacumpcs").value)-Number(this.userForm.get("oacumpcs").value));
    
    this.bags=Number(diffbags)-Number(totalbags);
    this.kgs=Number(diffkgs)-Number(totalkgs);


   this.userForm.patchValue({differencebags:diffbags,differencekgs:diffkgs,totalbags:totalbags,totalkgs:totalkgs}) 
  }

    addItems()
    {
      this.item_sl_no =this.item_sl_no +1;
      this.dailyweigher_Dtls.push(this.fb.group({
        slno: this.item_sl_no,
        item_code: '',
        packing_item: '',	
        bags: '',	
        kgs: ''}))
    }


    delete(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.dailyweigher_Dtls.removeAt(index);
        if(this.packingItem[index] != undefined)
        { 
          this.packingItem.splice(index, 1);
          this.selectedPackingItem.splice(index, 1);
          this.capacity.splice(index, 1);
      
        }
        this.item_sl_no = this.item_sl_no - 1;
       
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";
        this.dailyweigher_Dtls.reset();
        this.dailyweigher_Dtls.at(0).patchValue({slno:  this.item_sl_no});
         this.dailyweigher_Dtls.at(0).patchValue({slno: '0',
          item_code: '0',
          packing_item: '0',	
          bags: '0',	
          kgs: '0'
      });
      
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.dailyweigher_Dtls.at(i-1).patchValue({slno: i});
      
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({
        company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
        this.status = false;
      if(this.Id>0)
      {

        this.Service.updateDailyweigher(this.userForm.getRawValue(),this.Id).subscribe( data => 
          {
            alert("Daily Weigher Updated successfully.");
            this.status = true;
            this.ngOnInit();
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
       
         }); 

      }
      else
      {
        this.Service.createDailyweigher(this.userForm.getRawValue()).subscribe( data => 
          {
            alert("New Daily Weigher created successfully.");
            this.status = true;
            this.ngOnInit();
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
       
         });   
      }
       
    }


    onUpdate(id:any, dwg_id:string,b_unit, action)
    {
      this.isHidden=true;
      if(action == 'view')
      {this.action = 'view';
      this.dailyweighersave = false;}
      else
      {this.action = 'update';}


      forkJoin(
        this.Service.retriveDailyweigher(id),
        this.Service.retriveDailyweigherDetails(dwg_id),
        this.DropDownListService.getFinishedItemlist(b_unit)
        ).subscribe(([weigher, weigherdetails,itemlist])=>
        {

                    this.itemList=itemlist;
                    

        this.bags=Number(weigher["differencebags"])-Number(weigher["totalbags"]);
        this.kgs=Number(weigher["differencekgs"])-Number(weigher["totalkgs"]);

          this.userForm.patchValue(weigher);
          console.log(JSON.stringify(weigherdetails))
          let k:number = 0;  
          this.addItems()
          this.item_sl_no = 0;
          while (this.dailyweigher_Dtls.length) 
          this.dailyweigher_Dtls.removeAt(0);
          for(let data1 of weigherdetails)
          { 
            //this.status = false;
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
              
                this.packingItem[k] = packingList; 
                this.capacity[k] = capacityEmptyWt["capacity"];
                this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                this.empty_bag_wt_priceBasedOn[k] =capacityEmptyWt["empbagwt_based_on"];
                this.addItems()
                this.dailyweigher_Dtls.at(k).patchValue(data1);
                this.selectedItemName[k]=data1["item_code"];
                this.status=true;
                k = k + 1;
              });
            }

        });
    }


    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Daily Weigher ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteDailyweigher(this.userForm.getRawValue(),id).subscribe(data=> 
        {
            alert("Daily Weigher Deleted successfully.");
         
          this.status = true;
          this.ngOnInit();
         
        }); 
      }  
      this.status = true;
    }

    openPopUp(index)
    {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //let weigherdate=this.userForm.get("weigherdate").value;
    //let machine=this.userForm.get("machine").value;

    //alert(index)

    dialogConfig.data = { index: 0,};
    let dialogRef;

    dialogRef = this.dialog.open(DailyweigherreportpopupComponent, {data:{weigherdate:this.wghdate[index],machine:this.machineName[index]} ,height: '80%',
    width: '80%' } );
    dialogRef.afterClosed().subscribe(data => 
    {

    });

    }
}
