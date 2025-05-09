import { Component, OnInit } from '@angular/core';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { StockTransferGrn} from '../../../../../../Models/StockTransfer/stock-transfer-grn';
import { Master } from '../../../../../../service/master.service';
import { StockQcPopupComponent } from '../stock-qc-popup/stock-qc-popup.component';
import { StockTaxPopupComponent } from '../stock-tax-popup/stock-tax-popup.component';
import { StockTransferGrnPrintPopUpComponent } from '../stock-transfer-grn-print-pop-up/stock-transfer-grn-print-pop-up.component';
import { StockTransferOrderPopupComponent } from '../stock-transfer-order-popup/stock-transfer-order-popup.component';

@Component({
  selector: 'app-stock-transfer-grn',
  templateUrl: './stock-transfer-grn.component.html',
  styleUrls: ['./stock-transfer-grn.component.scss']
})
export class StockTransferGrnComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: StockTransferGrn = new StockTransferGrn();
    listStockTransferGrn: StockTransferGrn[];
    isHidden = false;
    payTerms:any = [];
    item_sl_no = 1; 
    StkGrnId:any;
    packingItem:any=[];
    item_codes:any = [];
    trans_codes:any = [];
    chargesIdList:{};
    modeOfTransport:{};
    transRate:{};
    payModes:{};
    currentDate:any;
    bussiness_unit_list:any = [];
    itemtypes:any = [];
    vehicleList:any = [];
    company_name:any;
    status = false; 
    capacity:any = [];
    empty_bag_wt:any = [];
    empty_bag_wt_priceBasedOn:any = [];
    rcvPackQty:any;
    rcvMatWt:any;
    rcvItemQty:any;
    advPackQty:any;
    advMatWt:any;
    customUOMDyns:{};
    advItemQty:any
    pssdPackQty:any;
    pssdMatWt:any;
    pssdItemQty:any;
    price:any;
    based_on:any;
    discount:any;
    discountBasedOn:any;
    taxRate:any;
    transBrone:{};
    qcDeduction:any;
    financialYear:any;
    stocktransfergrnsave:boolean = true;
    stocktransfergrnupdate:boolean = true;
    stocktransfergrnview:boolean = true;
    selectedItemName = [];
    selectedPackingItem:any = [];
    newVehicleList:{};
    stocktransfergrndelete:boolean=true;
    stocktransfergrnprint:boolean=true;

    constructor(public fb:FormBuilder,private Service: Master,
      private dialog: MatDialog,private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({
        id: [''],
        stk_grn_id: [''],
        b_unit: [''],
        stk_grn_date: [''],
        stk_grn_no: [''],
        ref_type: [''],
        vehicle_id: [''],
        applicable_charges_id:[''],
        remarks: [''],
        reference_id:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        receipt_criteria: [''],
        reference_status:[''],
        rec_b_unit:[''],
        sale_inv_status:[''],
  
        stk_transfer_grn_bu_dtls: this.fb.group({
          businessunit_name:'',
          mobile_no: '',
          email_id: '',
          work_address: ''}),

         stk_transfer_grn_item_details: this.fb.array([this.fb.group({	
          slno:this.item_sl_no,
          adv_item_code:'',
          adv_item_name:'',
          adv_packing:'',
          adv_pack_qty:'',
          adv_pack_uom:'',
          adv_item_qty:'',
          adv_mat_wt:'',
          adv_item_uom:'',
          rcv_pack_qty:'',
          rcv_pack_uom:'',
          rcv_item_qty:'',
          rcv_mat_wt:'',
          rcv_item_uom:'',
          pssd_pack_qty:'',
          pssd_pack_uom:'',
          pssd_item_qty:'',
          pssd_mat_wt:'',
          pssd_item_uom:'',
          unit_rate: '',
          price_based_on: '',	
          amount: '', 
          discount:'',
          discount_based_on:'',
          discount_amt:'',
          net_amt:'',
          qc_deduction: '',
          net_amt_after_qc: '',
          tax_code: '',
          tax_rate:'',	
          tax_amt:'',
          gross_amt:'',
          qc_norms:'',
          warehouse:'',
          warehouse_name:'',	
          rack:'',
          rack_name:'',
          stack_uom:'',
          stack_qty:''})]),

         stk_transfer_grn_trans_info: this.fb.group({
          trans_borne_by:'',	
          mode_of_trans:'',	
          transporter_code:'',	
          transportation_rate:'', 
          payment_mode:'',
          payment_term:'',
          bank_name:'',
          cash_limit: '',
          acc_name:'',
          acc_no:'',
          branch:'',
          iban:'',
          bic_swift_code:''}),

        stk_transfer_grn_other_info: this.fb.group({
          pty_gross_wt: '',	
          pty_gross_uom: '',
          pty_tare_wt: '',
          pty_tare_uom: '',
          pty_net_wt: '',	
          pty_net_uom: '',
          pty_weigh_bridge_name: '',
          pty_weigh_slip_no: '',
          pty_weigh_date: '',
          own_gross_wt: '',
          own_gross_uom: '', 
          own_tare_wt: '',
          own_tare_uom: '',
          own_net_wt: '', 
          own_net_uom: '',		
          own_weigh_bridge_name: '',	
          own_weigh_slip_no: '',
          own_weigh_date: '',
          adv_freight_charge: '', 	
          freight_paid_amt: '',	
          dc_no: '',	
          dc_date: '',	
          cn_no: '',	
          cn_date: '',	
          arg_tax_dtl: '',	
          arg_tax_amt: '',	
          vehicle_id: '',	
          bill_amt: '',	
          checkpost_name: '', 	
          entry_date: '',
          remarks: ''}),

        stk_transfer_grn_docs: this.fb.array([this.fb.group({
          doc_name : ''})]),

        stk_transfer_grn_resource_cost: this.fb.array([this.fb.group({	
          charge_name:'',
          rate_cal_method:'',
          amount:'',
          tax_rate: '',
          tax_amt: '',
          gross_amt: ''})])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get stk_grn_id(){ return this.userForm.get("stk_grn_id") as FormControl }
    get b_unit(){ return this.userForm.get("b_unit") as FormControl }
    get rec_b_unit(){ return this.userForm.get("rec_b_unit") as FormControl }
    get sale_inv_status(){ return this.userForm.get("sale_inv_status") as FormControl }
    get receipt_criteria(){ return this.userForm.get("receipt_criteria") as FormControl }
    get ref_type(){ return this.userForm.get("ref_type") as FormControl }
    get reference_status(){ return this.userForm.get("reference_status") as FormControl }
    get stk_grn_date(){ return this.userForm.get("stk_grn_date") as FormControl }
    get stk_grn_no(){ return this.userForm.get("stk_grn_no") as FormControl }
    get vehicle_id(){ return this.userForm.get("vehicle_id") as FormControl }
    get applicable_charges_id() { return this.userForm.get("applicable_charges_id") as FormControl }
    get remarks(){ return this.userForm.get("remarks") as FormControl }
    get reference_id(){ return this.userForm.get("reference_id") as FormControl }
    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get stk_transfer_grn_bu_dtls() { return this.userForm.get('stk_transfer_grn_bu_dtls') as FormGroup;}
    get stk_transfer_grn_item_details() { return this.userForm.get('stk_transfer_grn_item_details') as FormArray;}
    get stk_transfer_grn_trans_info() { return this.userForm.get('stk_transfer_grn_trans_info') as FormGroup;}
    get stk_transfer_grn_other_info() { return this.userForm.get('stk_transfer_grn_other_info') as FormGroup;}
    get stk_transfer_grn_resource_cost() { return this.userForm.get('stk_transfer_grn_resource_cost') as FormArray;}
    get stk_transfer_grn_docs() { return this.userForm.get('stk_transfer_grn_docs') as FormArray;}
   
    ngOnInit() 
    {    
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
      
      this.stocktransfergrnsave = false;
      this.stocktransfergrnupdate = false;
      this.stocktransfergrnview = false;
      this.stocktransfergrndelete=false;
      this.stocktransfergrnprint=false;
      this.stockTranferArmy=false;

      if(accessdata.includes('stock_transfer_grn.save'))
      {
      this.stocktransfergrnsave = true;
      }
      if(accessdata.includes('stock_transfer_grn.view'))
      { 
        this.stocktransfergrnview=true;
      }
      if(accessdata.includes('stock_transfer_grn.delete'))
      { 
        this.stocktransfergrndelete=true;
      }
      if(accessdata.includes('stock_transfer_grn.print'))
      { 
        this.stocktransfergrnprint=true;
      }
  
      this.company_name = localStorage.getItem("company_name");
      this.financialYear = localStorage.getItem("financial_year");
      this.transBrone=["Own Account","party Account"];
      this.modeOfTransport=["By Road","By Train","By Ship","By Air","N/A"];
      this.transRate=["per UOM","per Truck"];
      this.userForm.patchValue({b_unit: "0"});
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate =  formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.payModes=["Cash","RTGS","DD","Cheque","NEFT"];
      this.status = true;
      forkJoin(     
        this.DropDownListService.customUOMList(),
        this.DropDownListService.payTermNameList(),
        this.DropDownListService.getChargeMasterList(),
        this.DropDownListService.custometrBusList( this.company_name),
        this.DropDownListService.itemTypeList(this.company_name),  
        //this.DropDownListService.itemNamesList(),
        this.DropDownListService.itemNamesNewList(),
        //this.DropDownListService.transporterNamesList(),
        this.DropDownListService.getTransporterMNCListFast(),
       // this.Service.getStkTranGrns("company="+this.company_name+"&finyear="+this.financialYear),
        this.DropDownListService.getStkTranGrnsFast(this.company_name,this.financialYear),
      ).subscribe(([customUOMData,paytermData,chargesMasterData, companyBUMNCList,
        itemTypeData,itemNameData, TransData,StkTransGrnList])=>
        {
          this.customUOMDyns  = customUOMData;
          this.payTerms = paytermData;
          this.payTerms = paytermData;
          this.chargesIdList  = chargesMasterData;
          this.bussiness_unit_list  = companyBUMNCList;           
          this.itemtypes  = itemTypeData;
          this.item_codes = itemNameData;
          this.trans_codes = TransData;
          this.listStockTransferGrn = StkTransGrnList;
          this.status=true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        });
    }

    showList(s:string)
    {
      if(this.stocktransfergrnsave == true  && this.stocktransfergrnupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {     
          this.isHidden=true;   
          this.DropDownListService.getVehiclesFromVehicleLoadUnload().subscribe(newVehicle=>{
            this.newVehicleList  = newVehicle.concat([{vehicle_id:'No Vehicle',vehicle_no:'No Vehicle'}]);
            }); 
          // this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.stocktransfergrnsave == true  && this.stocktransfergrnupdate == false)
      {
        if(s=="add")
        {     
          this.isHidden=true;     
          this.DropDownListService.getVehiclesFromVehicleLoadUnload().subscribe(newVehicle=>{
            this.newVehicleList  = newVehicle.concat([{vehicle_id:'No Vehicle',vehicle_no:'No Vehicle'}]);
            });   
          // this.userForm.reset(this.ResetAllValues().value);
        }
      }
      
      if(s=="list")
      {     
          this.userForm.reset(this.ResetAllValues().value);
        this.isHidden=false;   
        this.stocktransfergrnsave = true; 
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en'); 
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.newVehicleList=[].concat([{vehicle_id:'No Vehicle',vehicle_no:'No Vehicle'}]);
      }
    }

    stockTranferArmy:boolean = false;

    onChangeRefType(event){
      if(event.length){
        console.log("REFTYPE:: ",event);
        if(event=="Stock Transfer Order"){
          this.stockTranferArmy=true;
        }
        else{
          this.stockTranferArmy=false;
        }
        console.log("REFTYPE STATUS:: ",this.stockTranferArmy);
      }
    }

    reference_type:any;
    orderid:any;
    onClickShow()
    {
      this.reference_type=this.userForm.get("ref_type").value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.StkGrnId=this.userForm.get("id").value;
     // console.log("tuhin here12345stewtrw :: "+this.StkGrnId)
      if(this.StkGrnId == null || this.StkGrnId =='')
      {
        this.StkGrnId=0;
       // console.log("tuhin here12345 :: "+this.StkGrnId)
      }
      dialogConfig.data = {id:this.StkGrnId }; //from id
      if (this.reference_type=="Stock Transfer Order")
      {
        const dialogRef = this.dialog.open(StockTransferOrderPopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data =>
        {
          console.log(" STO DATA :: ",JSON.stringify(data));
          if(data["order_id"] != "0" && data["order_id"] != '' && data["order_id"] != undefined)
          {
            this.orderid=data.order_id;
            this.userForm.patchValue({reference_id:data["order_id"],reference_status:this.reference_type,referance_type:''});
                forkJoin(
                 // this.DropDownListService.getStkTransOrderItemDlts(data["order_id"]),
                  this.DropDownListService.getStockTransItemDltsArmy(data["order_id"]),
                  this.DropDownListService.getStkOrderVehicleNo(data["order_id"]),
                  this.DropDownListService.getstockOrderdetails(data["order_id"])
                ).subscribe(([itemData,TransData,stockchallan])=>
                  {
                    console.log(" STO ITEM :: ",JSON.stringify(itemData));
                    console.log(" STO VCH :: ",JSON.stringify(TransData));
                    console.log(" STO DTLS :: ",JSON.stringify(stockchallan));
                    this.userForm.patchValue({b_unit:stockchallan["business_unit"],rec_b_unit:stockchallan["delivery_business_unit"],
                      vehicle_id:stockchallan["shipment_mode"],receipt_criteria:stockchallan["passing_wt"]});
                    this.OnChangeStkDate(this.userForm.get("stk_grn_date").value,"save");
                      //starts here
                      let k = 0
                      this.item_sl_no = 0;
                      this.packingItem = [];
                      while(this.stk_transfer_grn_item_details.length)
                      {this.stk_transfer_grn_item_details.removeAt(0);}
                      for(let data1 of itemData)
                      {
                        this.status = false;
                        this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList=>
                        { 
                          this.status = true;
                          this.packingItem[k] = packingList;
                        
                          this.addItem();
                          this.stk_transfer_grn_item_details.at(k).patchValue({
                            adv_item_code: data1["item_code"], adv_item_name: data1["item_name"], adv_item_uom: data1["uom"], adv_item_qty: data1["st_rest_wt"],
                            adv_packing: data1["packing"], adv_pack_qty: data1["st_rest_bag"],  adv_pack_uom: data1["suom"], adv_mat_wt: data1["st_rest_wt"],
                            rcv_pack_uom: data1["suom"],rcv_pack_qty: data1["st_rest_bag"],rcv_mat_wt: data1["st_rest_wt"],
                            rcv_item_uom: data1["uom"],rcv_item_qty: data1["st_rest_wt"],
                            pssd_pack_uom: data1["suom"],pssd_pack_qty: data1["st_rest_bag"], pssd_mat_wt: data1["st_rest_wt"],
                            pssd_item_uom: data1["uom"],pssd_item_qty: data1["st_rest_wt"],
                            warehouse: data1["wearhouse"], unit_rate:data1["price"],price_based_on:data1["price_based_on"],
                            tax_code: data1["tax_id"],tax_rate: data1["tax_rate"],qc_norms: data1["acc_norms"]});

                            if(data1["price_based_on"]=="Item"){
                              this.stk_transfer_grn_item_details.at(k).patchValue({
                                amount:data1["st_rest_wt"]*data1["price"],
                                gross_amt:data1["st_rest_wt"]*data1["price"],
                                tax_amt:((data1["st_rest_wt"]*data1["price"])*data1["tax_rate"])/100,
                                net_amt:data1["st_rest_wt"]*data1["price"],
                                net_amt_after_qc: data1["st_rest_wt"]*data1["price"]
                              });
                            }
                            else{
                              this.stk_transfer_grn_item_details.at(k).patchValue({
                                amount:data1["st_rest_bag"]*data1["price"],
                                gross_amt:data1["st_rest_bag"]*data1["price"],
                                tax_amt:((data1["st_rest_bag"]*data1["price"])*data1["tax_rate"])/100,
                                net_amt:data1["st_rest_bag"]*data1["price"],
                                net_amt_after_qc: data1["st_rest_bag"]*data1["price"]
                              });
                            }

                          k = k + 1;       
                        })
                      }
                       
                      this.stk_transfer_grn_trans_info.patchValue({trans_borne_by:TransData["trans_borne_by"],transporter_code:TransData["transporter_name"],
                      mode_of_trans:TransData["mode_of_trans"]});
                 
                      //ends here  
                    this.status=true;
                  });

              /*//this.receiving_bu_status=true;
              this.packingItem = [];
              let  k=0;
              this.item_sl_no = 0;
              //this.grandTotal = 0;
              console.log("chk order no:"+data["order_no"])
              this.userForm.patchValue({grand_total: null}); 
              this.userForm.patchValue({reference_id: data["order_id"],delivery_business_unit:data["rcv_bu"]});

              while(this.stk_transfer_grn_item_details.length)
              this.stk_transfer_grn_item_details.removeAt(0); 
              this.stk_transfer_grn_item_details.reset();

              for(let data1 of data.StkTransferDetail)
              {
                if(data1.checkbox == true || data1.checkbox == 'true')
                {
                  this.status = false;
                  //this.stockId = data["order_id"];
                  //this.stockNo = data["order_no"];
                  this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList=>
                  {  
                    this.status = true;
                    this.packingItem[k] = packingList; 
                    this.addItem();
                    //  console.log("data1::"+JSON.stringify(data1)) 
                    this.stk_transfer_grn_item_details.at(k).patchValue(
                    {
                      item_code: data1.item_code, packing: data1.packing, suom: data1.suom, mat_wt: Number(data1.mat_wt).toFixed(2),
                      squantity: data1.squantity, uom: data1.uom, quantity: data1.quantity, price: data1.price,
                      price_based_on: data1.price_based_on, amount: data1.amount,
                      tax_code: data1.tax_id, tax_rate: data1.tax_rate, tax_amt: data1.tax_amt,
                      total_amt: data1.net_amt, acc_norms: data1.acc_norms
                    });
                    //this.grandTotal = this.grandTotal + data1.net_amt;
                    //this.userForm.patchValue({grand_total: this.grandTotal}); 
                    k = k + 1;              
                  }); 
                }
              }
              
              // this.DropDownListService.getStockTransDtls(this.stockId).subscribe(data=>
              forkJoin(
              this.DropDownListService.getStockTransDtls(data["order_id"]),
              this.DropDownListService.getStkTransTranInfo(data["order_id"])
              ).subscribe(([transData,transInfo])=>
              {
                //this.onChangeShipToAddId(transData.business_unit);
                  //this.onChangePayToAddId(transData.delivery_business_unit);
                  //this.stk_Transfer_Challan_Shipment_Dtls.patchValue({ship_addr: transData.business_unit, pay_addr: transData.delivery_business_unit}); 
                  this.userForm.patchValue({order_point:transData["order_point"],passing_wt:transData["passing_wt"],billing_req:transData["billing_req"],weighment_required:transData["weightment_req"],vehicle_type:transData["shipment_mode"]});

                  //this.onChangeTransporterName(transInfo.trans_code);
                  //this.stk_Transfer_Challan_Trans_Info.patchValue(transInfo);

              });

              /*this.DropDownListService.getStockTransDtls(data["order_id"]).subscribe(data=>
                { 
                  this.onChangeShipToAddId(data.business_unit);
                  this.onChangePayToAddId(data.delivery_business_unit);
                  this.stk_Transfer_Challan_Shipment_Dtls.patchValue({ship_addr: data.business_unit, pay_addr: data.delivery_business_unit}); 
                });

              this.DropDownListService.getStkTransTranInfo(this.stockId).subscribe(data=>
              { 
                this.onChangeTransporterName(data.trans_code);
                this.stk_Transfer_Challan_Trans_Info.patchValue(data)});
              */
          }
        });
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        stk_grn_id: [''],
        b_unit: [''],
        rec_b_unit: [''],
        ref_type: [''],
        stk_grn_date: [''],
        stk_grn_no: [''],
        vehicle_id: [''],
        applicable_charges_id:[''],
        remarks: [''],
        reference_id:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        receipt_criteria: [''],
        reference_status:[''],
        sale_inv_status:[''],

        stk_transfer_grn_bu_dtls: this.fb.group({
          businessunit_name:'',
          mobile_no: '',
          email_id: '',
          work_address: ''}),

          stk_transfer_grn_item_details: this.fb.array([this.fb.group({	
          slno:this. item_sl_no,
          adv_item_code:'',
          adv_item_name:'',
          adv_packing:'',
          adv_pack_qty:'',
          adv_pack_uom:'',
          adv_item_qty:'',
          adv_mat_wt:'',
          adv_item_uom:'',
          rcv_pack_qty:'',
          rcv_pack_uom:'',
          rcv_item_qty:'',
          rcv_mat_wt:'',
          rcv_item_uom:'',
          pssd_pack_qty:'',
          pssd_pack_uom:'',
          pssd_item_qty:'',
          pssd_mat_wt:'',
          pssd_item_uom:'',
          unit_rate: '',
          price_based_on: '',	
          amount: '', 
          discount:'',
          discount_based_on:'',
          discount_amt:'',
          net_amt:'',
          qc_deduction: '',
          net_amt_after_qc: '',
          tax_code: '',
          tax_rate:'',	
          tax_amt:'',
          gross_amt:'',
          qc_norms:'',
          warehouse_name:'',	
          warehouse:'',
          rack:'',
          rack_name:'',
          stack_uom:'',
          stack_qty:'',})]),

          stk_transfer_grn_trans_info: this.fb.group({
          trans_borne_by:'',	
          mode_of_trans:'',	
          transporter_code:'',	
          transportation_rate:'', 
          payment_mode:'',
          payment_term:'',
          bank_name:'',
          cash_limit: '',
          acc_name:'',
          acc_no:'',
          branch:'',
          iban:'',
          bic_swift_code:''}),

        stk_transfer_grn_other_info: this.fb.group({
          pty_gross_wt: '',	
          pty_gross_uom: '',
          pty_tare_wt: '',
          pty_tare_uom: '',
          pty_net_wt: '',	
          pty_net_uom: '',
          pty_weigh_bridge_name: '',
          pty_weigh_slip_no: '',
          pty_weigh_date: '',
          own_gross_wt: '',
          own_gross_uom: '', 
          own_tare_wt: '',
          own_tare_uom: '',
          own_net_wt: '', 
          own_net_uom: '',		
          own_weigh_bridge_name: '',	
          own_weigh_slip_no: '',
          own_weigh_date: '',
          adv_freight_charge: '', 	
          freight_paid_amt: '',	
          dc_no: '',	
          dc_date: '',	
          cn_no: '',	
          cn_date: '',	
          arg_tax_dtl: '',	
          arg_tax_amt: '',	
          vehicle_id: '',	
          bill_amt: '',	
          checkpost_name: '', 	
          entry_date: '',
          remarks: ''}),

        stk_transfer_grn_docs: this.fb.array([this.fb.group({
          doc_name : ''})]),

        stk_transfer_grn_resource_cost: this.fb.array([this.fb.group({	
          charge_name:'',
          rate_cal_method:'',
          amount:'',
          tax_rate: '',
          tax_amt: '',
          gross_amt: '',})])
      });
    }

    addItem() 
    {
      this. item_sl_no = this. item_sl_no + 1;
      this.stk_transfer_grn_item_details.push(this.fb.group({
        slno: this.item_sl_no,
        adv_item_code:'',
        adv_item_name:'',
        adv_packing:'',
        adv_pack_qty:'',
        adv_pack_uom:'',
        adv_item_qty:'',
        adv_mat_wt:'',
        adv_item_uom:'',
        rcv_pack_qty:'',
        rcv_pack_uom:'',
        rcv_item_qty:'',
        rcv_mat_wt:'',
        rcv_item_uom:'',
        pssd_pack_qty:'',
        pssd_pack_uom:'',
        pssd_item_qty:'',
        pssd_mat_wt:'',
        pssd_item_uom:'',
        unit_rate: '',
        price_based_on: '',	
        amount: '', 
        discount:'',
        discount_based_on:'',
        discount_amt:'',
        net_amt:'',
        qc_deduction: '',
        net_amt_after_qc: '',
        tax_code: '',
        tax_rate:'',	
        tax_amt:'',
        gross_amt:'',
        qc_norms:'',
        warehouse_name:'',	
        warehouse:'',
        rack:'',
        rack_name:'',
        stack_uom:'',
        stack_qty:''}));

     this.stk_transfer_grn_item_details.at(this.item_sl_no - 1).patchValue({adv_item_qty: 0, adv_pack_qty: 0, rcv_item_qty: 0,
        rcv_pack_qty: 0, pssd_item_qty: 0, pssd_pack_qty: 0, unit_rate: 0, price_based_on: '0',
        discount_based_on: '0', qc_deduction: 0, adv_mat_wt: 0, rcv_mat_wt: 0, pssd_mat_wt: 0, discount: 0});
    }

    deleteItem(index) 
    {
      if(this. item_sl_no > 1)
      { 
        this.stk_transfer_grn_item_details.removeAt(index);
        this.item_sl_no = this. item_sl_no - 1;
      }
      else
      {
        this. item_sl_no = 1;
        alert("can't delete all rows");
        this.stk_transfer_grn_item_details.reset();
        this.stk_transfer_grn_item_details.at(0).patchValue({slno:  this.item_sl_no});
      } 
      
      for(let i=1; i<=this. item_sl_no; i++)
        this.stk_transfer_grn_item_details.at(i-1).patchValue({slno: i});
      
    }

    add1() 
    {
      this.stk_transfer_grn_resource_cost.push(this.fb.group({
        charge_name:'',
        rate_cal_method:'',
        amount:'',
        tax_rate: '',
        tax_amt: '',
		    gross_amt: '' }));
    }
  
    addDocument() 
    {
      this.stk_transfer_grn_docs.push(this.fb.group({
        doc_name : ''}));
    }

    deleteDocument(index) 
    {
      if(index)
      {this.stk_transfer_grn_docs.removeAt(index);}
      else
      {
        alert("can't delete all rows");
        this.stk_transfer_grn_docs.reset();
      }
    }

    BU:any;
    OnChangeStkDate(StkGrnDate:any, operation)
    {
      this.BU= this.userForm.get("b_unit").value as FormControl;
      this.status = false;
      if(this.BU!= null && this.BU!="0" && this.BU!="" && this.BU!=undefined)
      {
        this.DropDownListService.getSTGRNSequenceId(this.currentDate + "/"+ this.BU).subscribe(data=>
        {
          this.seq_no = data.sequenceid;
          this.status = true;
        }); 

        this.DropDownListService.getUnloadAdvVehiThruBU("bunit="+this.BU+"&orderdate="+this.currentDate).subscribe(vehicleData=>
        {
          this.vehicleList = vehicleData; 
          this.status = true;
        }); 
      }   
    }

    warehouses:{};
    stackList:any=[];
    businessUnit:any;
    seq_no:string;
    Stk_Grn_Date:any;    
    onChangeBussinessUnit(buss_id:string, operation)
    {
      this.Stk_Grn_Date = this.userForm.get("stk_grn_date").value as FormControl;
      this.warehouses = []
      this.stackList = [];
      this.businessUnit = buss_id;
      if(buss_id != '0')
      {   
        this.status = false;
        forkJoin(
          this.DropDownListService.getWHListbyBUnit(buss_id),
          this.DropDownListService.getSTGRNSequenceId(this.Stk_Grn_Date +"/"+buss_id),
          this.DropDownListService.getUnloadAdvVehiThruBU("bunit="+buss_id+"&orderdate="+this.Stk_Grn_Date),
          this.DropDownListService.getCompanyBUAddress(buss_id)
        ).subscribe(([wearHouseData, seqdata,vehicleData, BUdata])=>
          {
            this.warehouses = wearHouseData;
            this.seq_no = seqdata.sequenceid;        
            this.status=true;
            this.vehicleList = vehicleData;   
            this.stk_transfer_grn_bu_dtls.patchValue(BUdata);     
          })
        this.DropDownListService.getWHListbyBUnit(buss_id).subscribe(data1=>{            
        });
      }
    }

    WeighmentId:any;
    onChangeVechileNo()
    { 
      if(this.userForm.get("vechile_id").value == "0" || this.userForm.get("vechile_id").value == "" || this.userForm.get("vechile_id").value == null)
      {

      }
      else
      {
          this.status = false;
          this.DropDownListService.getVehicleRefName(this.userForm.get("vechile_id").value).subscribe(refNameType=>
            {
              //Starts Here
              if(refNameType["ref_name_type"]=='Stock Transfer' && refNameType["ref_name"]=='Unload Advice'  && refNameType["weighment_status"]=='2')
              {

                forkJoin(
                  this.DropDownListService.getUnloadItemDtlsThruVehi(refNameType["vehicle_id"]),
                  this.DropDownListService.getUnloadAdvPartyWmThruVehi(refNameType["vehicle_id"]),
                  this.DropDownListService.getUnloadAdvThruVehi(refNameType["vehicle_id"]),
                  this.DropDownListService.getUnloadAdvTransInfoThruVehi(refNameType["vehicle_id"]),
                  this.DropDownListService.getWeighmentId(refNameType["weighment_id"]),
                  this.DropDownListService.getReceipt_criteria(refNameType["reference_id"],"unload"),
                  this.DropDownListService.getUnloadAdviceData(refNameType["reference_id"]),
                ).subscribe(([data,PartyData,ForWtmId,TransData,wmBags,receipt,unloadData])=>
                  {
                    this.userForm.patchValue({receipt_criteria:receipt["passing_wt"],reference_status:refNameType["ref_name_type"],
                    b_unit:unloadData["business_unit"],rec_b_unit:unloadData["busi_partner"]});
                    //Item Details
                    this.OnChangeStkDate(this.currentDate,"create");
                    let k = 0;
                    this.item_sl_no = 0;
                    this.packingItem = [];
                    while(this.stk_transfer_grn_item_details.length)
                    {this.stk_transfer_grn_item_details.removeAt(0);}
                    for(let data1 of data)
                    {
                      this.status = false;
                      forkJoin(
                      this.DropDownListService.getItemMasterPackMat(data1.item_code),
                      this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name),
                      this.DropDownListService.getChallanItemDlts(receipt["stk_challan_id"],data1["item_code"]),
                      ).subscribe(([packingList,capacityEmptyWt,challanItemDetails])=>
                      { 
                        this.status = true;
                        this.packingItem[k] = packingList;
                        this.empty_bag_wt_priceBasedOn[k]=capacityEmptyWt["empbagwt_based_on"];//UOM
                        this.capacity[k] = capacityEmptyWt["capacity"];//0.55
                        this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];//0.00665
                       // this.onChangeWarehouse(data1.wearhouse, k); 
                        this.addItem();
                        this.stk_transfer_grn_item_details.at(k).patchValue({
                          adv_item_code: data1["item_code"], adv_item_name: data1["item_name"],
                          adv_packing: data1["packing"],  adv_pack_qty: data1["s_qty"],  adv_pack_uom: data1["s_uom"],
                          adv_item_qty: data1["quantity"], adv_mat_wt: data1["mat_wt"], adv_item_uom: data1["uom"],
                          rcv_pack_uom: data1["s_uom"], rcv_item_uom: data1["uom"],
                          rcv_pack_qty: wmBags["tarebags"],rcv_item_qty: wmBags["net_weight"],
                          pssd_pack_uom: data1["s_uom"], pssd_item_uom: data1["uom"], warehouse: data1["wearhouse"], 
                          rack: data1["rack"], qc_norms: data1["qc_norms"],
                          unit_rate:challanItemDetails["price"],price_based_on:challanItemDetails["price_based_on"],
                          amount: challanItemDetails["amount"],net_amt: challanItemDetails["amount"],net_amt_after_qc: challanItemDetails["amount"],
                          tax_code: challanItemDetails["tax_code"],tax_rate: challanItemDetails["tax_rate"],tax_amt: challanItemDetails["amotax_amtunt"],
                          gross_amt: challanItemDetails["total_amt"]
                        
                        
                        });
                          this.getRcvPackingQtyautocalculate(this.stk_transfer_grn_item_details.at(k).get("rcv_pack_qty").value, k)
                        k = k + 1;       
                      })
                    }
      
                    this.stk_transfer_grn_other_info.patchValue({pty_gross_wt:PartyData["gross_wt"],pty_gross_uom:PartyData["uom1"],
                    pty_tare_wt:PartyData["tare_wt"],pty_tare_uom:PartyData["uom2"],pty_net_wt:PartyData["net_wt"],pty_net_uom:PartyData["uom3"],
                    pty_weigh_bridge_name:PartyData["wb_name"],pty_weigh_slip_no:PartyData["slip_no"],pty_weigh_date:PartyData["pw_date"]})
      
                    this.WeighmentId  = ForWtmId["weighment_id"];
                    this.userForm.patchValue({reference_id:ForWtmId["unadviceid"]});
      
                    this.DropDownListService.getUnloadWeightmentWt(this.WeighmentId).subscribe(data1=>
                      {      
                        this.stk_transfer_grn_other_info.patchValue({own_gross_wt: data1.gross_weight,
                          own_gross_uom: data1.tw_unit, own_tare_wt: data1.tare_weight, own_tare_uom: data1.tw_unit,
                          own_net_wt: data1.net_weight, own_net_uom: data1.tw_unit});
                      })
      
                      this.stk_transfer_grn_trans_info.patchValue({trans_borne_by:TransData["trans_borne_by"],transporter_code:TransData["transporter_name"],
                        mode_of_trans:TransData["mode_of_trans"],transportation_rate:TransData["transport_rate"],payment_mode:TransData["payment_mode"],cash_limit:TransData["cash_limit"],
                        payment_term:TransData["payment_terms"],bank_name:TransData["bank_name"],acc_name:TransData["account_name"],
                        acc_no:TransData["account_no"],branch:TransData["branch"],iban:TransData["iban"],bic_swift_code:TransData["bic_swift_code"]});
                   
                        this.status = true;
                  });
              }
              else if(refNameType["ref_name_type"]=='Goods Stock Transfer' && refNameType["ref_name"]=='Goods Stock Transfer')
              {
                this.userForm.patchValue({reference_id:refNameType["reference_id"],reference_status:refNameType["ref_name_type"]});
                forkJoin(
                  this.DropDownListService.getStkTransChallanItemDlts(refNameType["reference_id"]),
                  this.DropDownListService.getStkChallanVehicleNo(refNameType["reference_id"]),
                  this.DropDownListService.getstockchallandetails(refNameType["reference_id"])
                ).subscribe(([itemData,TransData,stockchallan])=>
                  {
                    this.userForm.patchValue({b_unit:stockchallan["business_unit"],rec_b_unit:stockchallan["delivery_business_unit"]});
                      //starts here
                      let k = 0
                      this.item_sl_no = 0;
                      this.packingItem = [];
                      while(this.stk_transfer_grn_item_details.length)
                      {this.stk_transfer_grn_item_details.removeAt(0);}
                      for(let data1 of itemData)
                      {
                        this.status = false;
                        this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList=>
                        { 
                          this.status = true;
                          this.packingItem[k] = packingList;
                        
                          this.addItem();
                          this.stk_transfer_grn_item_details.at(k).patchValue({
                            adv_item_code: data1["item_code"], adv_item_name: data1["item_name"], adv_item_uom: data1["uom"], adv_item_qty: data1["quantity"],
                            adv_packing: data1["packing"],  adv_pack_qty: data1["s_qty"],  adv_pack_uom: data1["s_uom"], adv_mat_wt: data1["mat_wt"],
                           
                            rcv_pack_uom: data1["s_uom"],rcv_pack_qty: data1["s_qty"],rcv_mat_wt: data1["mat_wt"],
                            rcv_item_uom: data1["uom"],rcv_item_qty: data1["quantity"],
                            pssd_pack_uom: data1["s_uom"],pssd_pack_qty: data1["s_qty"], pssd_mat_wt: data1["mat_wt"],
                            pssd_item_uom: data1["uom"],pssd_item_qty: data1["quantity"],
                            warehouse: data1["wearhouse"], unit_rate:data1["price"],price_based_on:data1["price_based_on"],
                            amount: data1["amount"],net_amt: data1["amount"],net_amt_after_qc: data1["amount"],
                            tax_code: data1["tax_code"],tax_rate: data1["tax_rate"],tax_amt: data1["amotax_amtunt"],
                            gross_amt: data1["total_amt"], qc_norms: data1["acc_norms"]});
                          k = k + 1;       
                        })
                      }
                       
                      this.stk_transfer_grn_trans_info.patchValue({trans_borne_by:TransData["trans_borne_by"],transporter_code:TransData["transporter_name"],
                      mode_of_trans:TransData["mode_of_trans"]});
                 
                      //ends here  
                    this.status=true;
                   });
              }
              else
              {
                this.status=true;
                alert("Please Select valid Vehicle Number!!");
              }
            //Ends Here
            });
           
      }
    }
//starts here
getRcvPackingQtyautocalculate(rcv_packing_qty, index)
{

  this.rcvPackQty = rcv_packing_qty;//250

  if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
  { 
  
    this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value - (this.empty_bag_wt[index] * this.rcvPackQty);
  }
  else{

   this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value - (this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value * this.empty_bag_wt[index])/100;
  }

  this.stk_transfer_grn_item_details.at(index).patchValue({rcv_item_qty: this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value, rcv_mat_wt: (Math.round(this.rcvMatWt * 1000)/1000).toFixed(3)}); 
 
 
 let Receipt_criteria = this.userForm.get("receipt_criteria").value;
 
 console.log("tuhin here  " + Receipt_criteria)
 if(Receipt_criteria == 'Supplied WT')
 {
  this.stk_transfer_grn_item_details.at(index).patchValue({pssd_pack_qty:this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value,pssd_pack_uom:this.stk_transfer_grn_item_details.at(index).get("adv_pack_uom").value,pssd_item_qty:this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value,pssd_mat_wt:this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value})
 }
 if(Receipt_criteria == 'Receiving WT')
 {
  this.stk_transfer_grn_item_details.at(index).patchValue({pssd_pack_qty: this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value,pssd_pack_uom:this.stk_transfer_grn_item_details.at(index).get("rcv_pack_uom").value,pssd_item_qty: this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value,pssd_mat_wt:this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value})
 }
 if(Receipt_criteria == 'Lower of Both')
 {


   let recievingmaterial:number= this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value
   let advancematerial:number =   this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value

  console.log("check data::"+recievingmaterial+"/"+advancematerial)
    if(advancematerial>=recievingmaterial)
    {
     
     console.log("rec")
     this.stk_transfer_grn_item_details.at(index).patchValue({pssd_pack_qty:this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value,pssd_pack_uom:this.stk_transfer_grn_item_details.at(index).get("rcv_pack_uom").value,pssd_item_qty:this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value,pssd_mat_wt:this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value})


    }
    if(advancematerial<=recievingmaterial)
    {
      console.log("adv")
      this.stk_transfer_grn_item_details.at(index).patchValue({pssd_pack_qty:this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value,pssd_pack_uom:this.stk_transfer_grn_item_details.at(index).get("adv_pack_uom").value,pssd_item_qty:this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value,pssd_mat_wt:this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value})
      //advancematerial
    }



 }
 
 
 
 
  this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
  this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
  this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
  this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
  this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
  this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
  this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
  this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
  this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
  this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
  this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
  this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

  this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
    this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
}
//ends here
    itemId: any;
    onchangePackingItem(index, event)
    {
      if(event.target.value != '0')
      {
        this.itemId =  this.stk_transfer_grn_item_details.at(index).get("adv_item_code").value as FormControl; 
        this.status = false;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;
          this.stk_transfer_grn_item_details.at(index).patchValue({adv_pack_uom: data.uom1, rcv_pack_uom: data.uom1, pssd_pack_uom: data.uom1}); 
          this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
          this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
          this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
          this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
          this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
          this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
          this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
          this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
          this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
          this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
          this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
          this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
          this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
          this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
          this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

          this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
            this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
          this.status = true;
        });  
      }
    }
    getRcvMatQty(rcv_mat_qty, index)
    {
      this.rcvMatWt = rcv_mat_qty.target.value;
      this.ItemId =  this.stk_transfer_grn_item_details.at(index).get("adv_item_code").value as FormControl; 
      this.Pack = this.stk_transfer_grn_item_details.at(index).get('adv_packing').value as FormControl;  

      if(this.reference_type=="Stock Transfer Order"){
        this.DropDownListService.getStkTransferGrnRestQty(this.orderid,this.ItemId,this.Pack).subscribe(restdata=>
        {
          if(restdata.rest_wt<this.rcvMatWt)
          {
            alert("Rest Mat. Qty is Less than Mat. Qty,Please check!");
            this.stk_transfer_grn_item_details.at(index).patchValue({rcv_pack_qty: 0,rcv_item_qty: 0,rcv_mat_wt: 0});    
            this.rcvMatWt=0;
          }
          else{
           
          }
        });
      }
    }

    getRcvItemQty(rcv_item_qty, index)
    {
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = rcv_item_qty.target.value;

      this.ItemId =  this.stk_transfer_grn_item_details.at(index).get("adv_item_code").value as FormControl; 
      this.Pack = this.stk_transfer_grn_item_details.at(index).get('adv_packing').value as FormControl;  

      if(this.reference_type=="Stock Transfer Order"){
        this.DropDownListService.getStkTransferGrnRestQty(this.orderid,this.ItemId,this.Pack).subscribe(restdata=>
        {
          if(restdata.rest_wt<this.rcvItemQty)
          {
            alert("Rest Item Qty is Less than Item Qty,Please check!");
            this.stk_transfer_grn_item_details.at(index).patchValue({rcv_pack_qty: 0,rcv_item_qty: 0,rcv_mat_wt: 0});    
            this.rcvMatWt=0;
          }
          else{
            if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
              { this.rcvMatWt = this.rcvItemQty - (this.Empty_bagWt[index] * this.rcvPackQty);}
              else{this.rcvMatWt = this.rcvItemQty - (this.rcvItemQty * this.Empty_bagWt[index])/100;}   
          }
        });
      }
      else{
        if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
          { this.rcvMatWt = this.rcvItemQty - (this.Empty_bagWt[index] * this.rcvPackQty);}
          else{this.rcvMatWt = this.rcvItemQty - (this.rcvItemQty * this.Empty_bagWt[index])/100;}
      }
      

      this.stk_transfer_grn_item_details.at(index).patchValue({rcv_mat_wt: (Math.round(this.rcvMatWt * 1000)/1000).toFixed(3)}); 
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getPssdPackingQty(pssd_packing_qty, index)
    {
      this.ItemId =  this.stk_transfer_grn_item_details.at(index).get("adv_item_code").value as FormControl; 
      this.Pack = this.stk_transfer_grn_item_details.at(index).get('adv_packing').value as FormControl;  

      this.pssdPackQty = pssd_packing_qty.target.value;
      this.pssdItemQty = this.Capacity[index] * this.pssdPackQty;

      this.DropDownListService.getItemPackUom(this.ItemId,this.Pack,this.company_name).subscribe(data=>
        {
         this.Capacity[index] = data.capacity;
         this.Empty_bagWt[index] = data.empty_big_wt;
        }); 

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pssdMatWt = this.pssdItemQty - (this.Empty_bagWt[index] * this.pssdPackQty);}
      else{this.pssdMatWt = this.pssdItemQty - (this.pssdItemQty * this.Empty_bagWt[index])/100;}

      this.stk_transfer_grn_item_details.at(index).patchValue({pssd_item_qty: this.pssdItemQty, pssd_mat_wt: (Math.round(this.pssdMatWt * 1000)/1000).toFixed(3)}); 
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getPssdItemQty(pssd_item_qty, index)
    {
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = pssd_item_qty.target.value;

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pssdMatWt = this.pssdItemQty - (this.Empty_bagWt[index] * this.pssdPackQty);}
      else{this.pssdMatWt = this.pssdItemQty - (this.pssdItemQty * this.Empty_bagWt[index])/100;}

      this.stk_transfer_grn_item_details.at(index).patchValue({pssd_mat_wt: (Math.round(this.pssdMatWt * 1000)/1000).toFixed(3)}); 
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getUnitRate(rate, index)
    {
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = rate.target.value;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getPriceBasedOn(price_based_on, index)
    {
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = price_based_on.target.value;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getdiscount(event, index)
    {
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = event.target.value;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getDiscountBasedOn(event, index)
    {
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = event;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getqcDeduction(event, index)
    {
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = event.target.value;

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }
    ItemId:any;
    Pack:any;
    Capacity:any=[];
    Empty_bagWt:any=[];
    getRcvPackingQty(rcv_packing_qty, index)
    {
      this.ItemId =  this.stk_transfer_grn_item_details.at(index).get("adv_item_code").value as FormControl; 
      this.Pack = this.stk_transfer_grn_item_details.at(index).get('adv_packing').value as FormControl;  

      this.DropDownListService.getItemPackUom(this.ItemId,this.Pack,this.company_name).subscribe(data=>
        {this.Capacity[index] = data.capacity;
          this.Empty_bagWt[index] = data.empty_big_wt;
        }); 

      this.rcvPackQty = rcv_packing_qty.target.value;
      this.rcvItemQty = this.Capacity[index] * this.rcvPackQty;
     
      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.rcvMatWt = this.rcvItemQty - (this.Empty_bagWt[index] * this.rcvPackQty);}
      else{this.rcvMatWt = this.rcvItemQty - (this.rcvItemQty * this.Empty_bagWt[index])/100;}

      if(this.reference_type=="Stock Transfer Order"){
        this.DropDownListService.getStkTransferGrnRestQty(this.orderid,this.ItemId,this.Pack).subscribe(restdata=>
        {
          console.log("rest bag:",restdata.rest_bag,":pack qty:",this.rcvPackQty)
          if(restdata.rest_bag<this.rcvPackQty)
          {
            alert("Rest Bag is Less than Packing Qty,Please check!");
            this.stk_transfer_grn_item_details.at(index).patchValue({rcv_pack_qty: 0,rcv_item_qty: 0,rcv_mat_wt: 0});    
          }
          else{
            this.stk_transfer_grn_item_details.at(index).patchValue({rcv_item_qty: this.rcvItemQty, 
              rcv_mat_wt: (Math.round(this.rcvMatWt * 1000)/1000).toFixed(3),adv_pack_qty:this.rcvPackQty,
              adv_item_qty:this.rcvItemQty,adv_mat_wt:(Math.round(this.rcvMatWt * 1000)/1000).toFixed(3),
              pssd_pack_qty:this.rcvPackQty,pssd_item_qty:this.rcvItemQty,pssd_mat_wt:(Math.round(this.rcvMatWt * 1000)/1000).toFixed(3)});    
          }
        });
       
      }
      else{
        this.stk_transfer_grn_item_details.at(index).patchValue({rcv_item_qty: this.rcvItemQty, rcv_mat_wt: (Math.round(this.rcvMatWt * 1000)/1000).toFixed(3)}); 
      }
      
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.stk_transfer_grn_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.stk_transfer_grn_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    getAdvItemQty(item_qty, index)
    {
      this.advPackQty = this.stk_transfer_grn_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = item_qty.target.value;

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.advMatWt = this.advItemQty - (this.Empty_bagWt[index] * this.advPackQty);}
      else{this.advMatWt = this.advItemQty - (this.advItemQty * this.Empty_bagWt[index])/100;}

      this.stk_transfer_grn_item_details.at(index).patchValue({adv_mat_wt: (Math.round(this.advMatWt * 1000)/1000).toFixed(0)}); 
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }
    ItemId1:any;
    Pack1:any;
    getAdvPackingQty(packing_qty, index)
    {
      this.ItemId1 = this.stk_transfer_grn_item_details.at(index).get("adv_item_code").value as FormControl;
      this.Pack1 = this.stk_transfer_grn_item_details.at(index).get("adv_packing").value as FormControl;
      this.DropDownListService.getItemPackUom(this.ItemId1,this.Pack1,this.company_name).subscribe(data=>
        {this.Capacity[index] = data.capacity;
         this.Empty_bagWt[index] = data.empty_big_wt;
        }); 

      this.advPackQty = packing_qty.target.value;
      this.advItemQty = this.Capacity[index] * this.advPackQty;
      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.advMatWt = this.advItemQty - (this.Empty_bagWt[index] * this.advPackQty);}
      else{this.advMatWt = this.advItemQty - (this.advItemQty * this.Empty_bagWt[index])/100;}

      this.stk_transfer_grn_item_details.at(index).patchValue({adv_item_qty: this.advItemQty, adv_mat_wt: (Math.round(this.advMatWt * 1000)/1000).toFixed(3)}); 
      this.rcvPackQty = this.stk_transfer_grn_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.stk_transfer_grn_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.stk_transfer_grn_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.stk_transfer_grn_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.stk_transfer_grn_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.stk_transfer_grn_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.stk_transfer_grn_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.stk_transfer_grn_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.stk_transfer_grn_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.stk_transfer_grn_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = this.stk_transfer_grn_item_details.at(index).get("tax_rate").value as FormControl;
      this.qcDeduction = this.stk_transfer_grn_item_details.at(index).get("qc_deduction").value as FormControl; 

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty, 
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    }

    amt:any;
    discountAmt:any;
    taxAmt:any;
    totalAmt:any;
    calculateItemData(advPackQty, advItemQty, advmatWt, rcvPackQty, rcvItemQty, rcvmatWt, pssdPackQty, 
      pssdItemQty, pssdmatWt, price, PriceBasedOn, discount, discountBasedOn, taxrate, qcDeduction, index)
    {
      if(PriceBasedOn == "Packing")
      {this.amt = price * pssdPackQty}

      if(PriceBasedOn == "Item")
      {this.amt = price * pssdItemQty}

      // if(PriceBasedOn == "Without Packing")
      // {this.amt = price * pssdmatWt}

      if(PriceBasedOn == "0")
      {this.amt = 0}    

      if(discountBasedOn == "Uom")
      {this.discountAmt = discount;}

      if(discountBasedOn == "%")
      {this.discountAmt =  this.amt * (discount / 100);}

      if(discountBasedOn == "0")
      {this.discountAmt = 0}

      let netAmt = this.amt - this.discountAmt;
      if(taxrate == 0)
      { this.taxAmt = 0;} 
      else {this.taxAmt = netAmt *(taxrate/100);}

      this.totalAmt = this.taxAmt + netAmt;
      this.stk_transfer_grn_item_details.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2), 
        discount_amt:  (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: Math.round(netAmt - qcDeduction).toFixed(2),
        net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: (Math.round(this.taxAmt * 100) / 100).toFixed(2), 
        total_amt: (Math.round(this.totalAmt * 100) / 100).toFixed(2), gross_amt: Math.round(netAmt + this.taxAmt - qcDeduction).toFixed(2)});
    }

    onChangeWarehouse(event, index)
    {
      this.status = false;
      this.DropDownListService.getBinDescByWarehouse(event).subscribe(data1=>
      {      
        console.log("stackListData: "+JSON.stringify(data1))  
        this.status=true; 
        this.stackList[index] = data1;
      });     
    }

    onChangeApplicableCharges(applicable_charges_id:string)
    {
      this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
      {
        let i =0;
        while(this.stk_transfer_grn_resource_cost.length)
        { this.stk_transfer_grn_resource_cost.removeAt(0);}
        for(let data1 of data)
        {
          this.add1();
          this.stk_transfer_grn_resource_cost.at(i).patchValue({
            charge_name: data1.charge_name, rate_cal_method: data1.method,
            tax_rate: data1.tax_rate});
          i=i+1;
        }
      });
    }

    onchangeItemName(index, event)
    {
      if(event.target.value != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemNameById(event.target.value,this.company_name),
          this.DropDownListService.getItemMasterPackMat(event.target.value)
        ).subscribe(([itemNameData, packingItemData])=>
        {      
          this.stk_transfer_grn_item_details.at(index).patchValue({adv_item_name: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.stk_transfer_grn_item_details.at(index).patchValue({adv_item_uom: data.description,
              rcv_item_uom: data.description, pssd_item_uom: data.description}); 
            this.status = true;
          });
        });
      }
    }

    showPopUp2(index)
    {
      this.itemId = this.stk_transfer_grn_item_details.at(index).get('adv_item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemId};
      const dialogRef = this.dialog.open(StockQcPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.stk_transfer_grn_item_details.at(index).patchValue({qc_norms: data["qc_code"],});
      }); 
    }

    showPopUp1(index)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};

      const dialogRef = this.dialog.open(StockTaxPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        this.stk_transfer_grn_item_details.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});
      }); 
    }


    send()
    {
      //this.StkGrnId= this.userForm.get("id").value as FormControl
      this.userForm.patchValue({ 
        company_id: this.company_name, fin_year: localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        if(this.userForm.get("b_unit").value == null || this.userForm.get("b_unit").value == 0)
        {
          alert("Please Select Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("vehicle_id").value == null || this.userForm.get("vehicle_id").value == 0)
        {
          alert("Please Select Velicle Number");
          this.status=true;
        }
        else
        {
          let itemcheck = false;
          let packingcheck = false;
          let advitemquantity = false;
          let advpackingquantity = false;
          let rcvitemquantity = false;
          let rcvpackingquantity = false;
          let pssditemquantity = false;
          let pssdpackingquantity = false;
          let price = false;
          let pricebasedon = false;

          for(let b=0;b<this.stk_transfer_grn_item_details.length;b++)
          {
            if(this.stk_transfer_grn_item_details.at(b).get("adv_item_code").value == null || this.stk_transfer_grn_item_details.at(b).get("adv_item_code").value == 0)
            {
               itemcheck = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("adv_packing").value == null || this.stk_transfer_grn_item_details.at(b).get("adv_packing").value == 0)
            {
               packingcheck = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("adv_item_qty").value == null || this.stk_transfer_grn_item_details.at(b).get("adv_item_qty").value == 0)
            {
              advitemquantity = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("adv_pack_qty").value == null || this.stk_transfer_grn_item_details.at(b).get("adv_pack_qty").value == 0)
            {
              advpackingquantity = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("rcv_item_qty").value == null || this.stk_transfer_grn_item_details.at(b).get("rcv_item_qty").value == 0)
            {
              rcvitemquantity = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("rcv_pack_qty").value == null || this.stk_transfer_grn_item_details.at(b).get("rcv_pack_qty").value == 0)
            {
              rcvpackingquantity = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("pssd_item_qty").value == null || this.stk_transfer_grn_item_details.at(b).get("pssd_item_qty").value == 0)
            {
              pssditemquantity = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("pssd_pack_qty").value == null || this.stk_transfer_grn_item_details.at(b).get("pssd_pack_qty").value == 0)
            {
              pssdpackingquantity = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("unit_rate").value == null || this.stk_transfer_grn_item_details.at(b).get("unit_rate").value == 0)
            {
               price = true;
            }
            if(this.stk_transfer_grn_item_details.at(b).get("price_based_on").value == null || this.stk_transfer_grn_item_details.at(b).get("price_based_on").value == 0)
            {
               pricebasedon = true;
            }
          }

          if(itemcheck == true)
          {
            alert("Please Select ADV ITEM NAME in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(packingcheck == true)
          {
            alert("Please Select ADV PACKING ITEM in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(advpackingquantity == true)
          {
            alert("Please Enter ADV PACKING QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(advitemquantity == true)
          {
            alert("Please Enter ADV ITEM QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(rcvpackingquantity == true)
          {
            alert("Please Enter RCV PACKING QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(rcvitemquantity == true)
          {
            alert("Please Enter RCV ITEM QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(pssdpackingquantity == true)
          {
            alert("Please Enter PSSD PACKING QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(pssditemquantity == true)
          {
            alert("Please Enter PSSD ITEM QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(price == true)
          {
            alert("Please Enter UNIT RATE in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(pricebasedon == true)
          {
            alert("Please Select PRICE BASED ON in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
          }
          else
          {
            // if(this.StkGrnId>0)
          //   {
          //     this.status = false;
          //     this.Service.updateStkTransGrn(this.userForm.getRawValue(), this.StkGrnId).subscribe( data => 
          //     {
          //       console.log(this.userForm.value);
          //       alert("Stock Transfer GRN Updated successfully.");
          //       this.userForm.reset();
          //       this.status = true;
          //       this.ngOnInit();
          //       this.isHidden=false;
              
          //       this.packingItem = [];  
          //       this.item_sl_no = 0;
          //       while(this. stk_transfer_grn_item_details.length)
          //       this. stk_transfer_grn_item_details.removeAt(0);
          //       this.addItem(); 
      
          //       while(this.stk_transfer_grn_resource_cost.length)
          //       this.stk_transfer_grn_resource_cost.removeAt(0);
          //       this.add1();
      
          //       while(this.stk_transfer_grn_docs.length)
          //       this.stk_transfer_grn_docs.removeAt(0);
          //       this.addDocument();
          //     });
          //   }

          this.Service.createStkTranGrn(this.userForm.getRawValue()).subscribe( data => 
            {
              //console.log(this.userForm.value);
              alert("New Stock Transfer GRN created successfully.");
              this.userForm.reset();
              this.status = true;
              this.ngOnInit();
              this.isHidden=false;
          
              this.packingItem = [];  
              this.item_sl_no = 0;
              while(this.stk_transfer_grn_item_details.length)
              this.stk_transfer_grn_item_details.removeAt(0);
              this.addItem(); 
    
              while(this.stk_transfer_grn_resource_cost.length)
              this.stk_transfer_grn_resource_cost.removeAt(0);
              this.add1();
    
              while(this.stk_transfer_grn_docs.length)
              this.stk_transfer_grn_docs.removeAt(0);
              this.addDocument();
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            //this.ngOnInit()
              });  
            }
        }
             
       
        }
    }

    onUpdate(id:any, stk_grn_id:string,action)
    {

      this.userForm.patchValue({id: id});
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.newVehicleList=[].concat([{vehicle_id:'No Vehicle',vehicle_no:'No Vehicle'}]);
       if(action == 'view')
       {
        this.stocktransfergrnsave = false;
      }
      
      
      forkJoin(
        this.Service.retriveStkTransGRN(id),
        this.Service.StkTransGRNItemRetriveList(stk_grn_id),      
        this.Service.StkTransGRNOtherInfoRetriveList(stk_grn_id),
        this.Service.StkTransGRNTransInfoRetriveList(stk_grn_id),
        this.Service.StkTransGRNBUDtlsRetriveList(stk_grn_id),
        this.Service.StkTransGRNResourceCostDtlsRetriveList(stk_grn_id),
        this.Service.getStockTransGRNDoc(stk_grn_id),
        this.DropDownListService.getVehiclenoall()
      ).subscribe(([StkTransGRNData, itemData,otherInfoData,transInfoData,bUData,ResourceCostdata,DocData,vehicleAllData])=>
        {
          //this.userForm.patchValue(StkTransGRNData[0]);
          this.onChangeRefType(StkTransGRNData["ref_type"]);
          this.reference_type=StkTransGRNData["ref_type"];
          console.log("vehicle:"+JSON.stringify(vehicleAllData));
          console.log("StkTransGRNData:"+JSON.stringify(StkTransGRNData));
          this.newVehicleList=vehicleAllData.concat([{vehicle_id:'No Vehicle',vehicle_no:'No Vehicle'}]);
          this.userForm.patchValue({id:StkTransGRNData["id"],stk_grn_id:StkTransGRNData["stk_grn_id"],
          b_unit:StkTransGRNData["b_unit"],stk_grn_date:StkTransGRNData["stk_grn_date"],ref_type:StkTransGRNData["ref_type"],
          stk_grn_no:StkTransGRNData["stk_grn_no"],vehicle_id:StkTransGRNData["vehicle_id"],
          applicable_charges_id:StkTransGRNData["applicable_charges_id"],remarks:StkTransGRNData["remarks"],
          reference_id:StkTransGRNData["reference_id"],company_id:StkTransGRNData["company_id"],
          fin_year:StkTransGRNData["fin_year"],username:StkTransGRNData["username"],
          receipt_criteria:StkTransGRNData["receipt_criteria"],rec_b_unit:StkTransGRNData["rec_b_unit"],
          sale_inv_status:StkTransGRNData["sale_inv_status"]});

         // this.OnChangeStkDate(StkTransGRNData["stk_grn_date"], 'create');

          let k = 0;
          this.addItem();
          this.item_sl_no = 0;
          while (this.stk_transfer_grn_item_details.length) 
          { this.stk_transfer_grn_item_details.removeAt(0);}

          console.log(JSON.stringify(itemData));
          for(let data1 of itemData)
          { 
           
            this.addItem();
            
            this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"])
            .subscribe((packingList)=>
              {

                
                this.selectedPackingItem[k] = data1["adv_packing"];
                this.selectedItemName[k] = data1["adv_item_code"];
                this.packingItem[k] = packingList; 

                this.stk_transfer_grn_item_details.at(k).patchValue(data1);
                k = k + 1;
              });

           


           
          }

          this.stk_transfer_grn_other_info.patchValue(otherInfoData);
          this.stk_transfer_grn_trans_info.patchValue(transInfoData);
          this.stk_transfer_grn_bu_dtls.patchValue(bUData);

            while (this.stk_transfer_grn_resource_cost.length) 
            this.stk_transfer_grn_resource_cost.removeAt(0);
            for(let data1 of ResourceCostdata) 
            this.add1();
            this.stk_transfer_grn_resource_cost.patchValue(ResourceCostdata);

            
            this.addDocument();
            while (this.stk_transfer_grn_docs.length) 
            this.stk_transfer_grn_docs.removeAt(0);
            for(let data1 of DocData)
            this.addDocument();
            this.stk_transfer_grn_docs.patchValue(DocData);
            this.status = true;
          
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()
        });  
                                   
        }

        onDelete(id:any)
        {
          this.status = false;
          if(confirm("Are you sure to delete this Stock Transfer GRN ?"))
          { 
            //normal delete process is done but checking usage in different table is pending
            this.userForm.patchValue({username: localStorage.getItem("username")});
            //console.log("user name"+this.userForm.get("username").value)
            this.DropDownListService.checkStockGRNUsage(id).subscribe(checkGRN=> 
              {
               ///let dataq=JSON.parse(checkItem);
               //alert("bidhan here::"+checkGRN.status);
               if(checkGRN.status=='No')
               {
                this.Service.deleteStocktransferGRN(this.userForm.getRawValue(),id).subscribe(data=> 
                  {        
                    alert("Stock Transfer GRN Deleted successfully.");
                    this.userForm.reset();
                    this.status = true;
                    this.isHidden = false;
                    this.ngOnInit();
                    this.showList("list");
                   
                  });
                }
               else
               {
                alert("Current Vehicle Number is Already Used in Weighment or Stock Challan ");
                
               }
              });
          } 
          this.status = true; 
        }

        onclickprint(id,grn_id,bu_unit,reference_status,reference_id)
        {
    
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = { index: 0,};
              let dialogref;
            
            dialogref=this.dialog.open(StockTransferGrnPrintPopUpComponent, {data:{id: id,grn_id:grn_id,bu_unit:bu_unit,reference_status:reference_status,reference_id:reference_id} } );
            dialogref.afterClosed().subscribe(data =>
            { 
    
    
    
              
            });
    
        }
        onClickSalesInvoice(id, stk_grn_id,ref_type,stk_grn_date,b_unit) 
        {
          console.log("/id/ ",id,"/stk_grn_id/ ",stk_grn_id,"/ref_type/ ",ref_type,"/stk_grn_date/",stk_grn_date);
          if(ref_type=='Stock Transfer Order')
            {
              window.open("#/pages/invTrans/salestransaction/SalesInvoice");
              localStorage.setItem("svalue",'Hello');
              localStorage.setItem("stkgrnid",stk_grn_id);
              localStorage.setItem("stkreftypr",ref_type);
              localStorage.setItem("stkgrndate",stk_grn_date);
              localStorage.setItem("stkbunit",b_unit);
            }
        }

  }
