import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-specialproductionreport',
  templateUrl: './specialproductionreport.component.html',
  styleUrls: ['./specialproductionreport.component.scss']
})
export class SpecialproductionreportComponent implements OnInit {

  public userForm:FormGroup;
  status = false;
  bussiness_unit_list:any = [];
  ShopFloorList:any = [];
  prodoutputlist:any = [];
  prodinputlist:any = [];
  currentDate:any;
  SFloor:any;
  inputitemqty:number=0;
  inputpackingqty:number=0;
  outputitemqty:number=0;
  outputpackingqty:number=0;
  shopfloorname:any;
  fromdate1:any;
  todate1:any;

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService) 
  {
    this.userForm=fb.group(
      {
        business_unit:[''],
        shop_floor:[''],
        fromdate:[''],
        todate:['']
      });
  }

  get business_unit(){return this.userForm.get("business_unit") as FormControl};
  get shop_floor(){return this.userForm.get("shop_floor") as FormControl};
  get fromdate(){return this.userForm.get("fromdate") as FormControl};
  get todate(){return this.userForm.get("todate") as FormControl};

  ngOnInit()
  {
    
    this.status=true;
    this.DropDownListService.getcompanyBUMNCListnew(localStorage.getItem("company_name")).subscribe
    (data=>
      {
        this.bussiness_unit_list = data;
        this.status=true;
      });
  }

  onChangeBusinessUnit(event)
  {
    this.SFloor = this.userForm.get("shop_floor").value as FormControl;
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

  search()
  {
    let business_unit= this.userForm.get("business_unit").value;
    let shop_floor=this.userForm.get("shop_floor").value;
    this.fromdate1=this.userForm.get("fromdate").value;
    this.todate1=this.userForm.get("todate").value;

    this.inputitemqty=0;
    this.inputpackingqty=0;
    this.outputitemqty=0;
    this.outputpackingqty=0;

    forkJoin(
      this.DropDownListService.getspecialProdInputReport(business_unit,shop_floor,this.fromdate1,this.todate1),
      this.DropDownListService.getspecialProdOutputReport(business_unit,shop_floor,this.fromdate1,this.todate1),
    ).subscribe(([InputReport,OutputReport])=>
    {
      console.log("Input :: "+JSON.stringify(InputReport))
      console.log("Output :: "+JSON.stringify(OutputReport))

      this.prodinputlist=InputReport;
      this.prodoutputlist=OutputReport;
      
      for(let data of InputReport)
      {
        this.inputitemqty+=Number(data["item_qty"])
        console.log("CHECK  "+Number(data["item_qty"]))
        this.inputpackingqty+=Number(data["packing_qty"])
        this.shopfloorname=data["shop_floorname"]
      }

      for(let data of OutputReport)
      {
        this.outputitemqty+=Number(data["item_qty"])
        this.outputpackingqty+=Number(data["packing_qty"])
      }
    });
  }


}
