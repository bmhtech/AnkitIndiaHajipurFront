import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { ExportAsService,ExportAsConfig,
  SupportedExtensions
} from 'ngx-export-as';
@Component({
  selector: 'app-saleinvoicereviseprint',
  templateUrl: './saleinvoicereviseprint.component.html',
  styleUrls: ['./saleinvoicereviseprint.component.scss']
})
export class SaleinvoicereviseprintComponent implements OnInit {
  downloadAs: SupportedExtensions = 'docx';
  MainId: any;
  invoiceid: any;
  ItemAllData: any = [];
  PrintMode: any = [];
  invoiceno: any;
  invoicedate: any;
  deleveryno: any;
  delievrydate: any;
  brokername: any;
  vehicleno: any;
  partyname: any;
  address: any;
  district: any;
  pincode:any;
  gstinno: any;
  state: any;
  constactno: any;
  refchallanno: any;
  refchallandate: any;

  taxtotal: any;
  cgsttotal: any;
  sgsttotal: any;
  igsttotal: any;
  totalamount: any;
  qtlstotal: any;
  pcstotal: any;
  amountinwords: any;
  amountinwordstax: any;
  roundoff: any;
  taxabletotal: any;
  irnno: any;
  ack_date: any;
  cgst: any;
  sgst: any;
  igst: any;

  remarks_asn: any;
  e_invoice_no: any;
  cust_ref_doc_date: any;
  cust_refdocno: any;

  gststat: boolean = true;
  gststatno: boolean = true;
  einvoicetype: boolean = true;
  einvelse: boolean = true;
  waybillshow: boolean = false;
  imagepath: any;
  view_image: any;
  imageURL: string;
  imagename: any;
  billheading: any;
  public hsntax: FormGroup;
  HsnCode: any = [];
  item_hsnwise_taxsumm1: any = [];
  waybill: any;
  ewaybilldate: any;
  ewayvalidupto: any;
  distance: any;
  packingbasedon: any = [];
  taxshow: boolean = false;

  contactnoshow: boolean = false;
  itemdetailsvalueshow: boolean = false;
  ruleshow: boolean = false
  paymentterm: any;
  business_unit:any;
  company_state:any;
  company_name:any;
  cin_no:any;
  dist:any;
  bu_address:any;
  pin:any;
  gst_no:any;
  pan_no:any;
  email_id:any;
  phone_no:any;
  fssai_no:any;
  ho_address:any;
  address2:any;
  address3:any;
  gstShow: boolean = true;
  shipname: any;
  partyGroup: any;
 
  exportAsConfig: ExportAsConfig = {
    type: 'docx', // the type you want to download
    elementId: 'component1', // the id of html/table element
  };

  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService, public dialog: MatDialog,
    private dialogRef: MatDialogRef<SaleinvoicereviseprintComponent>, @Inject(MAT_DIALOG_DATA) data,
    private exportAsService: ExportAsService) {
    this.MainId = data["MainId"];
    this.invoiceid = data["InvoiceId"];
    this.PrintMode = data.PrintMode.split(',');
    console.log(this.MainId + " print size " + this.PrintMode.length)
    this.business_unit=data["business_unit"];
    
    this.hsntax = fb.group(
      {
        item_hsnwise_taxsumm: this.fb.array([this.fb.group({
          hsnsummary: '',
          hsntax_amt: '',
          sgst_hsn: '',
          sgstamt_hsn: '',
          cgst_hsn: '',
          cgstamt_hsn: '',
          igst_hsn: '',
          igstamt_hsn: ''
        })]),
      });
  }

  get item_hsnwise_taxsumm() { return this.hsntax.get('item_hsnwise_taxsumm') as FormArray; }

  export() {
    this.exportAsConfig.type = this.downloadAs;
    // download the file using old school javascript method
    this.exportAsService
      .save(this.exportAsConfig, this.invoiceno);
      
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe((content) => {
      console.log(content);
    });
  }
  
  ngOnInit() {
    forkJoin(
      this.DropDownListService.getJobWorkInvPrint(this.MainId),
      //this.Service.getSalesInvItmDtls(this.invoiceid),
      this.Service.getSalesInvItmDtlswtAltName(this.invoiceid),
      this.DropDownListService.getnumtowordsaleinvoice(this.invoiceid),
      this.Service.getInvTaxSum(this.invoiceid),
      this.DropDownListService.getSalesInvPayDtls(this.invoiceid),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name")),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.business_unit)
    ).subscribe(([Details, Itemdata, words, taxsum, paymentdtls,compdetails,companystate]) => {
      console.log("Details:" + JSON.stringify(Details));
      this.cgst = Number(taxsum[0]['tax_rate']) / 2
      this.sgst = Number(taxsum[0]['tax_rate']) / 2
      this.igst = taxsum[0]['tax_rate']
      this.company_name=compdetails.company_name;
      this.cin_no=compdetails.tin_no;
      this.ho_address=compdetails.company_address;
      this.company_state=companystate["state_name"];
      this.dist=companystate["dist_name"];
      this.bu_address=companystate["mailing_address"];
      this.pin=companystate["pin_code"];
      this.gst_no=companystate["gstin_no"];
      this.pan_no=companystate["pan_no"];
      this.email_id=companystate["website_name"];
      this.phone_no=companystate["work_phoneno"];
      this.fssai_no=companystate["fssai_no"];
      // console.log("state " + this.gststat)
      /*if (Details["state"] == "BIHAR") {
        this.gststat = true;
        this.gststatno = false;
      }
      else {
       
        this.gststat = false;
        this.gststatno = true;
      }*/
      //console.log("mobile:"+Details["mobile"].length);

      if (paymentdtls["payment_term"] == 'APT00001') {
        this.paymentterm = paymentdtls["payment_term"];
      }
      else {
        this.paymentterm = paymentdtls["days"] + " Days";
      }

      if (Details["mobile"].length == 0 || Details["mobile"].length == '') {
        this.contactnoshow = false;
        //console.log("If")
      }
      else {
        this.contactnoshow = true;
        //console.log("else")
      }
      if (Details["invoice_type"] == 'INV00002' || Details["invoice_type"] == 'INV00004' || Details["invoice_type"] == 'INV00005') {
        this.billheading = 'Tax Invoice';
        this.ruleshow = false;
        this.itemdetailsvalueshow = true;
        // if (Details["state"] == "BIHAR") {
        if (Details["state"] == this.company_state) {
          this.gststat = true;
          this.gststatno = false;
        }
        else {

          this.gststat = false;
          this.gststatno = true;
        }
      }
      if (Details["invoice_type"] == 'INV00001') {
        this.billheading = 'Bill Of Supply';
        this.ruleshow = true;
        this.itemdetailsvalueshow = false;
        this.gststat = false;
        this.gststatno = false;
      }

      this.waybill = Details["waybill"];

      console.log("waybill " + this.waybill)
      if (Details["e_invoice_no"] == null || Details["e_invoice_no"] == '') {

        this.einvoicetype = false;
        this.einvelse = true;
        console.log("length:" + Details["waybill"].length + "//" + Details["invoice_type"])
        //if (Details["waybill"].length && Details["create_ewaybill_wo_invoice"]===true && (Details["invoice_type"] == 'INV00001' || Details["invoice_type"] == 'INV00002' || Details["invoice_type"] == 'INV00004')) {
          if (Details["waybill"].length && (Details["invoice_type"] == 'INV00002' || Details["invoice_type"] == 'INV00004')) {
          this.waybillshow = true;
          this.DropDownListService.geteinvoicedetails(this.invoiceid).subscribe(eWayDtls=>{
            this.ewaybilldate = eWayDtls["eway_bill_date"];
            this.ewayvalidupto = eWayDtls["eway_valid_upto"];
            //this.distance = eWayDtls["distance"];
          });
        }
        if(Details["invoice_type"] == 'INV00005')
        {
          this.e_invoice_no = Details["e_invoice_no"];
        }
      }
      else {

        if (Number(Details["e_invoice_no"].length) == 15) {

          this.einvoicetype = true;
          this.einvelse = false;
          if(Details["invoice_type"] == 'INV00002' || Details["invoice_type"] == 'INV00004')
          {
            if (Details.e_invoice_no.length) {
            this.imagename = this.invoiceid + '.png';
            console.log("imagename:" + this.imagename)
            }
            else {
              this.imagename = 'noimage.png';
              console.log("imagename11:" + this.imagename)
            }

          /* forkJoin(
            this.DropDownListService.geteinvoicedetails(this.invoiceid),
            this.DropDownListService.getEinvoiceImage(this.imagename)  
            ).subscribe(([einvoice,imagesource])=>
            {
              console.log("Einvoice : "+JSON.stringify(einvoice))
              this.irnno=einvoice["irn_no"];
              this.e_invoice_no=einvoice["ack_no"];
              this.ack_date=einvoice["ack_date"];
              this.createImage(imagesource);
            }); */
          forkJoin(
            this.DropDownListService.geteinvoicedetails(this.invoiceid)
          ).subscribe(([einvoice]) => {
            console.log("Einvoice : " + JSON.stringify(einvoice))
            this.irnno = einvoice["irn_no"];
            this.e_invoice_no = einvoice["ack_no"];
            this.ack_date = einvoice["ack_date"];
            this.ewaybilldate = einvoice["eway_bill_date"];
            this.ewayvalidupto = einvoice["eway_valid_upto"];
            //this.distance = einvoice["distance"];
            this.DropDownListService.getEinvoiceImage(this.imagename).subscribe(imagesource => {
              this.createImage(imagesource);
            });

          });
          }
          if(Details["invoice_type"] == 'INV00005')
          {
            this.e_invoice_no = Details["e_invoice_no"];
          }
        }
        else {
          this.einvoicetype = false;
          this.einvelse = true;
        }
      }
      console.log("e einvelse:" + this.einvelse)
      //for einvoice qr code image
      /*this.cust_refdocno = Details["salesorderno"];
      this.cust_ref_doc_date = Details["refchallandate"];*/
      this.cust_refdocno = Details["cust_refdocno"];
      this.cust_ref_doc_date = Details["cust_ref_doc_date"];
      // this.e_invoice_no = Details["e_invoice_no"];
      this.remarks_asn = Details["asn_no"];
      this.amountinwords = words['status'];
      this.invoiceno = Details["invoiceno"];
      this.invoicedate = Details["invoice_date"];
      this.deleveryno = Details["challan_no"];
      this.delievrydate = Details["challan_date"];
      this.brokername = Details["broker_name"];
      this.vehicleno = Details["vehicleno"];
      if(Details["invoice_type"] == 'INV00005')
      {
        this.shipname = "";
        this.gstShow = false;
      }
      else
      {
        this.shipname = Details["partyname"];
        this.gstShow = true;
      }
      this.partyname = Details["partyname"];
      //this.address = Details["paytodtls"];
      this.address = Details["add1"];
      this.address2 = Details["add2"];
      this.address3 = Details["add3"];
      this.district = Details["district"];
      //this.gstinno = Details["gst_no"];
      this.state = Details["state"];
      this.pincode = Details["pincode"];
      this.constactno = Details["mobile"];
      this.roundoff = Details["roundoff_amt"];
      this.refchallanno = Details["refchallanno"];
      this.refchallandate = Details["refchallandate"];

      this.DropDownListService.partynameListById(Details["party"]).subscribe((custGrp)=>
      { 
        console.log("partyGroup print:"+JSON.stringify(custGrp));
        this.partyGroup = custGrp["group_type"];
      });

      if (Details["gst_no"] == null || Details["gst_no"] == '') {
        this.gstinno = "URP";
      }
      else {
        this.gstinno = Details["gst_no"];
      }

      this.ItemAllData = Itemdata;
      this.taxtotal = 0;
      this.cgsttotal = 0;
      this.sgsttotal = 0;
      this.igsttotal = 0;
      this.totalamount = 0;
      this.taxabletotal = 0;
      this.qtlstotal = 0;
      this.pcstotal = 0;
      let tax_amt: number = Details["tax_total"];

      console.log("tax total::" + Details["tax_total"])
      let v = 0;
      this.ItemAllData.forEach(element => {
       // this.HsnCode.push(element.hsn_code);
       this.HsnCode.push(element.hsnm_code); //hard code for party 'itc' 10019910,others normal
        this.taxtotal += Number(element.amount);
        this.cgsttotal += Number(element.cgstamt);
        this.sgsttotal += Number(element.sgstamt);
        this.igsttotal += Number(element.igstamt);
        this.totalamount += Number(element.total_amt);
        this.qtlstotal += Number(element.quantity);
        this.pcstotal += Number(element.squantity);

        if (element.price_based_on == "Packing") {
          this.packingbasedon[v] = true;
        }
        else {
          this.packingbasedon[v] = false;
        }


      });
      this.taxabletotal = Number(this.totalamount) + Number(this.roundoff);
      console.log("tax_amt " + tax_amt)
      if (tax_amt > 0) {
        this.taxshow = true
        this.DropDownListService.getnumtoword(tax_amt).subscribe(data => {
          this.amountinwordstax = data["status"]
        })
      }


      //hsn summary
      const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);

      this.addItemGrpHsn();//new userform 
      while (this.item_hsnwise_taxsumm.length)
        this.item_hsnwise_taxsumm.removeAt(0);
      for (let j = 0; j < distinctArrayHsnCode.length; j++) {
        let hsn_amt = 0;
        let sgst_amt = 0;
        let cgst_amt = 0;
        let igst_amt = 0;

        this.ItemAllData.forEach(element => {

          if (element.hsn_code == distinctArrayHsnCode[j]) {
            hsn_amt += Number(element.amount);
            cgst_amt += Number(element.cgstamt);
            sgst_amt += Number(element.sgstamt);
            igst_amt += Number(element.igstamt);
          }
        });
        this.addItemGrpHsn();
        //console.log("hsn_code Loop :" + distinctArrayHsnCode[j]); // 1, "string", false
        // if (Details["state"] == "BIHAR") {
        if (Details["state"] == this.company_state) {
          this.item_hsnwise_taxsumm.at(j).patchValue({
            hsnsummary: distinctArrayHsnCode[j],
            hsntax_amt: hsn_amt,
            sgst_hsn: this.sgst,
            sgstamt_hsn: sgst_amt,
            cgst_hsn: this.cgst,
            cgstamt_hsn: cgst_amt,
            igst_hsn: 0,
            igstamt_hsn: 0.00
          });
        }
        else {
          this.item_hsnwise_taxsumm.at(j).patchValue({
            hsnsummary: distinctArrayHsnCode[j],
            hsntax_amt: hsn_amt,
            sgst_hsn: 0,
            sgstamt_hsn: 0.00,
            cgst_hsn: 0,
            cgstamt_hsn: 0.00,
            igst_hsn: this.igst,
            igstamt_hsn: igst_amt
          });
        }

        //console.log("value:"+this.item_hsnwise_taxsumm.at(j).get("hsnsummary").value)
        this.item_hsnwise_taxsumm1.push(this.item_hsnwise_taxsumm.at(j).value);

      }
    });
  }
  createImage(data: Blob) {
    // alert("enter create img"+data)
    this.view_image = data;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagepath = reader.result as string;
    }
    reader.readAsDataURL(data)
  }

  addItemGrpHsn() {
    this.item_hsnwise_taxsumm.push(this.fb.group({
      hsnsummary: '',
      hsntax_amt: '',
      sgst_hsn: '',
      sgstamt_hsn: '',
      cgst_hsn: '',
      cgstamt_hsn: '',
      igst_hsn: '',
      igstamt_hsn: ''
    }))
  }

  
}
