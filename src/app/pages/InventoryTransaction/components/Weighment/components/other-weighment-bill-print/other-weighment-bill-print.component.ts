import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { apiconfig } from '../../../../../../Configuration/ApiConfig';

@Component({
  selector: 'app-other-weighment-bill-print',
  templateUrl: './other-weighment-bill-print.component.html',
  styleUrls: ['./other-weighment-bill-print.component.scss']
})
export class OtherWeighmentBillPrintComponent implements OnInit {
  
  public userForm1: FormGroup;
  ID:any;
  weighment_id:any;
  netweight:any;
  tareweight:any;
  taretime:any;
  taredate:any;
  grossweight:any;
  grossdate:any;
  grosstime:any;
  Businessunit:any;
  adviceno:any;
  tarebags:any;
  staticdate:any;
  packingbags:any;
  itemqty:any;
  trucknumber:any;
  itemname:any;
  rawmaterial:any;
  weighmentno:any;
  ref_no:any;
  ref_date:any;
  wgment_rs:any;
  wgment_charge:any;
  nopartyname:any;
  noitemname:any;
  partyaddress:any;
  partystate:any;
  partycity:any;
  partypincode:any;
  partyifsc:any;
  partyaccountname:any;
  fyear:any;
  partydistrict:any;
  weighmentuom:any;
  weighmentfor:boolean = false;
  businessunit11:any = [];
  companyname:any;
  company_name:any;
  cin_no:any;
  work_address:any;
  pin_no:any;
  state_name:any;
  city_name:any;
  businessunit12:any=[];
  invoicetype:any;
  nameswitch:boolean=true;
  firstbags:any;
  totalprice:any;
  weighBridgeLocation: any;
  images: string[] = [];
  cameraserial:any;
  imgURL: string = "";

  constructor(private fb: FormBuilder,private Service: Master,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private config: apiconfig,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<OtherWeighmentBillPrintComponent>, @Inject(MAT_DIALOG_DATA)data) 
  { 
    this.ID=data["alldata"];
    this.weighment_id=data["weighment_id"];
    this.companyname=data["company_name"];
    this.imgURL = config.url + "getKataImg/";
  }

  ngOnInit() 
  {
    //console.log("tuhin "+this.ID);

    forkJoin(
      this.DropDownListService.unloadWeightmentRetrive(this.ID),
      this.DropDownListService.unloadWMDtlsRetriveList(this.weighment_id),
      this.DropDownListService.getCompanyDetails(this.companyname)
    ).subscribe(([data12, wgmntDtls,compdetails])=>
      {
        this.weighBridgeLocation=data12["weight_bridge_location"];
        console.log("weighBridgeLocation:: " + this.weighBridgeLocation);
        //console.log("Wgt Prt : : "+JSON.stringify(data12));
        this.company_name=compdetails.company_name;
        this.cin_no=compdetails.tin_no
        this.firstbags=data12.firstbags;

      this.netweight=Number(data12.net_weight).toFixed(3);
      this.tareweight=Number(data12.tare_weight).toFixed(3);

      
      if(data12.tw_time == "")
      {
        this.taretime="00:00";
      }
      else
      {
        this.taretime=data12.tw_time;
      }
      if(data12.tw_date == null)
      {
        this.taredate="00/00/0000";
      }
      else
      {
        this.taredate=this.datecalculator(data12.tw_date);
      }
      
      this.nopartyname=data12["nopartyname"];
      this.noitemname=data12["noitemname"];
      this.grossweight=Number(data12.gross_weight).toFixed(3);
      this.grossdate=this.datecalculator(data12.gw_date);
      this.grosstime=data12.gw_time;
      this.weighmentno=data12.wgment_no;
     
      this.adviceno=wgmntDtls[0].advice_no;

      this.tarebags=data12.tarebags;

      this.totalprice=data12.tarebags*data12["shifting_price"];
   
     
      this.trucknumber=data12.vehicle_no;
      this.ref_no=data12.ref_doc_no;
      
      /*if(data12["wgment_for"] == "Unloading")
      {
        this.staticdate=this.datecalculator(data12.gw_date);
      }
      if(data12["wgment_for"] == "Loading")
      {
        this.staticdate=this.datecalculator(data12.tw_date);
      }*/

      if(data12["wgment_for"] == "Unloading")
      {
        if(data12.weight1=='weight1' && (data12.weight2=='' || data12.weight2==null))
        {
          this.staticdate=this.datecalculator(data12.gw_date);
        }
        if(data12.weight1=='weight1' && data12.weight2=='weight2')
        {
          this.staticdate=this.datecalculator(data12.tw_date);
        }
      }
      
      if(data12["wgment_for"] == "Loading")
      {
         if(data12.weight1=='weight1' && (data12.weight2=='' || data12.weight2==null))
        {
          this.staticdate=this.datecalculator(data12.tw_date);
        }
        if(data12.weight1=='weight1' && data12.weight2=='weight2')
        {
          this.staticdate=this.datecalculator(data12.gw_date);
        }
      }
     
      this.wgment_rs=data12.wgment_rs;
      this.wgment_charge=data12.wgment_charge;
      if(data12["vehicle_ref_name"] == "Unload Advice")
      {
        if(data12.tw_date == null)
        {
          this.staticdate=this.datecalculator(data12.gw_date);
        }
        else
        {
          this.staticdate=this.datecalculator(data12.tw_date);
        }
        
        forkJoin(
          this.DropDownListService.getUnloadItemList(wgmntDtls[0].advice),
       
         this.DropDownListService.getUnloadadvanceListNew(wgmntDtls[0].advice)
          ).subscribe(([data31, unloadtable])=>
            {
              console.log(" uNLOAD tABLE  :: "+JSON.stringify(unloadtable))
              let quantity:number=0,bags:number=0;
              for(let itemDetails of data31)
              {
                quantity+=Number(itemDetails["quantity"]);
                bags+=Number(itemDetails["s_qty"]);
              }
            this.packingbags=bags;
           
            this.itemqty=quantity;
          
            
            if(Number(data31.length) == 1)
            {
              this.itemname=data31[0].item_name;
            }
            else
            {
              let itemnamesubstring:any;
              for(let itemitemNames of data31)
              {
                itemnamesubstring+=itemitemNames.item_name+',';
              }
              this.itemname=itemnamesubstring.substring(0,itemnamesubstring.length-1);
            }
            
            this.Businessunit=unloadtable.business_unitname;
            this.work_address=unloadtable.supp_ref_doc;
            this.pin_no=unloadtable.advice_type;
            this.state_name=unloadtable.supp_ref_docno;
            this.city_name=unloadtable.ula_date;

            


            this.fyear=unloadtable.fin_year;
             
                          forkJoin(
                            this.Service.getSuppBPAddr(unloadtable.busi_partner),
                            this.Service.getSuppBPAcc(unloadtable.busi_partner)
                          ).subscribe(([data41, accountsdetails])=>
                            {
                              this.partyaddress=data41.add1+ " " +data41.add2 + " " +data41.add3;
                              this.partystate=data41.state;
                              this.partydistrict=data41.district;
                              this.partycity=data41.city;
                              this.partypincode=data41.pincode;
                              this.partyaccountname=accountsdetails.acc_no;
                              this.partyifsc=accountsdetails.ifsc
                              
    
                            });
            this.rawmaterial=unloadtable.item_subtypename;
            });
           // console.log("tuhin here " + data12["wgment_for"])
        if(data12["wgment_for"] == "Sales Return")//
        {
         
          this.weighmentfor=false;
        }
        else
        {
          this.weighmentfor=true;
        }
      }
      if(data12["vehicle_ref_name"] == "Load Advice")
      {
        //this.staticdate=this.datecalculator(data12.gw_date);

        if(data12.gw_date == null)
        {
          this.staticdate=this.datecalculator(data12.tw_date);
        }
        else
        {
          this.staticdate=this.datecalculator(data12.gw_date);
        }

        this.businessunit11 = JSON.parse(localStorage.getItem("businessunit"));
        forkJoin(
          this.Service.loadingItemRetriveList(wgmntDtls[0].advice),
          this.DropDownListService.getLoadingDetails(wgmntDtls[0].advice)
          
         
          ).subscribe(([data31, loadtable])=>
            {
          //  console.log(" saleorderid :: "+ JSON.stringify(loadtable))
            //referance_id
              let quantity:number=0,bags:number=0;
              for(let itemDetails of data31)
              {
                quantity+=Number(itemDetails["quantity"]);
                bags+=Number(itemDetails["s_quantity"]);
              }
            this.packingbags=bags;
           // this.weighmentuom=data31[0].
            this.itemqty=quantity;
            this.itemname=data31[0].item_name;
            this.businessunit11.forEach(element => {
              if(element.businessunit_id == loadtable.b_unit)
              {
                this.Businessunit = element.businessunit_name;
//console.log("chk bunit"+element.businessunit_name)
                this.DropDownListService.getCBUdetails(element.businessunit_name).subscribe(cbudata=>
                {
                  this.work_address=cbudata.work_address;
                  this.pin_no=cbudata.pin_code;
                  this.state_name=cbudata.state_name;
                  this.city_name=cbudata.city_name;
                });
               
               
              }
              
            });
          //  console.log("unloadtable::"+JSON.stringify(loadtable))
           // this.suppliername=loadtable["customer_name"];     
            this.fyear=loadtable.fin_year;
             
                          forkJoin(
                            this.DropDownListService.getCustomerAddress(loadtable.bus_partner),
                            this.Service.custAccountRetriveList(loadtable.bus_partner),
                            this.DropDownListService.getSalesOrderDetails(loadtable["referance_id"])
                          ).subscribe(([data41, accountsdetails,saleorderdteials])=>
                            {
                              this.partyaddress=data41["add1"]+ " " +data41["add2"] + " " +data41["add3"];
                              this.partystate=data41["state"];
                              this.partydistrict=data41["district"];
                              this.partycity=data41["city"];
                              this.partypincode=data41["pincode"];
                              this.partyaccountname=accountsdetails.acc_no;
                              this.partyifsc=accountsdetails.ifsc;
                            //  console.log("hello here ::"+saleorderdteials["inv_type"])
                              if(saleorderdteials["inv_type"]=='INV00004')
                              {
                                
                                 this.invoicetype= "PACKING MATERIAL SALE";
                               //  console.log(" if :: "+this.invoicetype);
                              }
                              else
                              {
                               
                                this.invoicetype="FINISHED" ;
                               // console.log("else :: "+this.invoicetype);
                              }
                         //loadtable["referance_id"]
                            });
         
            });
        this.weighmentfor=false;
      }
      //console.log("weighmentfor " + this.weighmentfor)
      this.cameraserial = data12['wgment_id'];
      this.fetchAndSetImage();
    });
  }

  fetchAndSetImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result as string);
    };

    let imagename1 = this.cameraserial + '_1.jpg';
    let imagename2 = this.cameraserial + '_2.jpg';

    this.http
      //.get(this.imgURL+ imagename1, {
      .get(this.imgURL+this.weighBridgeLocation+"/"+ imagename1, {
        responseType: 'blob',
      })
      .subscribe((img) => {
        reader.readAsDataURL(img);
        this.images = [];
        this.sanitizer.bypassSecurityTrustUrl(
          this.images[0]
        );
        this.http
          //.get(this.imgURL + imagename2, {
          .get(this.imgURL+this.weighBridgeLocation+"/"+ imagename2, {
            responseType: 'blob',
          })
          .subscribe((img) => {
            console.log(img);
            reader.readAsDataURL(img);
            this.sanitizer.bypassSecurityTrustUrl(
              this.images[1]
            );
          });
      });

    return;
  }
  
  datecalculator(date)
  {

    let date1=date.split("-");
    return date = date1[2]+"/"+date1[1]+"/"+date1[0];
  }

 

}
