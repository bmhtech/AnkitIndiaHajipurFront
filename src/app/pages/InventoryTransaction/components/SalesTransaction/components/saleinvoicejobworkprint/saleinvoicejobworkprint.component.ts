import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { ExportAsService,ExportAsConfig,
  SupportedExtensions,
} from 'ngx-export-as';

@Component({
  selector: 'app-saleinvoicejobworkprint',
  templateUrl: './saleinvoicejobworkprint.component.html',
  styleUrls: ['./saleinvoicejobworkprint.component.scss']
})
export class SaleinvoicejobworkprintComponent implements OnInit {
  downloadAs: SupportedExtensions = 'docx';
  MainId:any;
  invoiceid:any;
  JobItem:any=[];
  JobPrice:any=[];
  PrintMode:any=[];

  invoiceno:any;
  invoicedate:any;
  deleveryno:any;
  delievrydate:any;
  brokername:any;
  vehicleno:any;
  partyname:any;
  address:any;
  district:any;
  gstinno:any;
  state:any;
  constactno:any;

  taxtotal:any;
  cgsttotal:any;
  sgsttotal:any;
  igsttotal:any;
  totalamount:any;
  amountinwords:any;
  roundoff:any;
  taxabletotal:any;

  remarks_asn:any;
  e_invoice_no:any;
  cust_ref_doc_date:any;
  cust_refdocno:any;

  gststat:boolean=true;
  gststatno:boolean=true;
  contactnoshow:boolean=false;
  paymentterm:any;
  imagepath:any;
  view_image:any;
  imagename:any;
  irnno: any;
  ack_date: any;
  totalitemqty:any;
  totalpackqty:any;
  amountinwordstax:any;
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

  public sactax:FormGroup;
  sacCode: any = [];
  item_sacwise_taxsumm1:any=[];
  gatepassShow:boolean=false;
  gatepass:any;
  

  exportAsConfig: ExportAsConfig = {
    type: 'docx', // the type you want to download
    elementId: 'component1', // the id of html/table element
  };

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SaleinvoicejobworkprintComponent>, @Inject(MAT_DIALOG_DATA)data,
    private exportAsService: ExportAsService) 
    { 
      this.MainId=data["MainId"];
      this.invoiceid=data["invoiceid"];
      this.business_unit=data["business_unit"];
      this.PrintMode = data.PrintMode.split(',');

      this.sactax=fb.group(
        {
          item_sacwise_taxsumm: this.fb.array([this.fb.group({
            hsnsummary:'',
            hsntax_amt:'',
            sgst_hsn:'',
            sgstamt_hsn:'',
            cgst_hsn:'',
            cgstamt_hsn:'',
            igst_hsn:'',
            igstamt_hsn:''
          })]),
        });
    }
    get item_sacwise_taxsumm() { return this.sactax.get('item_sacwise_taxsumm') as FormArray;}

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
    
  ngOnInit()
  {
    forkJoin(
      this.DropDownListService.getJobWorkInvPrint(this.MainId),
      this.DropDownListService.getInvoiceJobItemDtls(this.invoiceid),
      this.DropDownListService.getInvoiceTServiceItem(this.invoiceid),
      this.DropDownListService.getnumtowordsaleinvoice(this.invoiceid),
      this.DropDownListService.getSalesInvPayDtls(this.invoiceid),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name")),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.business_unit),
      this.DropDownListService.getGatepassByChallan(this.invoiceid)
      ).subscribe(([jobdata,jobitem,jobprice,words,paymentdtls,compdetails,companystate,gatepassData])=>
        {
       // console.log("compdetails::"+JSON.stringify(compdetails))
       // console.log("companystate::"+JSON.stringify(companystate))
       // console.log("jobitem::"+JSON.stringify(jobitem))
       // console.log("jobprice::"+JSON.stringify(jobprice))
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
        //console.log("comp state:"+companystate["state_name"])

        if(gatepassData.ref_type==='GRN')
          {
           this.gatepassShow=true;
           this.gatepass=gatepassData.gatepass;
          }
        else{
          this.gatepassShow=false;
          this.gatepass="";
        }

        if(jobdata["state"] ==this.company_state)
        {
          this.gststat=true;
          this.gststatno=false;
        }
        else
        {
          this.gststat=false;
          this.gststatno=true;
        }
       
       if(jobdata["mobile"].length==0 || jobdata["mobile"].length=='')
        {
          this.contactnoshow=false;
          //console.log("If")
        }
        else{
          this.contactnoshow=true;
          //console.log("else")
        }
        if(paymentdtls["payment_term"]=='APT00001')
        {
          this.paymentterm = paymentdtls["payment_term"];
        }
        else{
          this.paymentterm = paymentdtls["days"]+" Days";
        }

        if (Number(jobdata["e_invoice_no"].length) == 15) {
          this.imagename=this.invoiceid+'.png';
          console.log("imagename:"+this.imagename)
          /* forkJoin(
            this.DropDownListService.geteinvoicedetails(this.invoiceid),
            this.DropDownListService.getEinvoiceImage(this.imagename)  
            ).subscribe(([einvoice,imagesource])=>
            {
              this.createImage(imagesource);
              this.irnno=einvoice["irn_no"];
              this.e_invoice_no=einvoice["ack_no"];
              this.ack_date=einvoice["ack_date"];
            }); */
            forkJoin(
              this.DropDownListService.geteinvoicedetails(this.invoiceid)
            ).subscribe(([einvoice]) => {
              console.log("Einvoice : " + JSON.stringify(einvoice))
              this.irnno = einvoice["irn_no"];
              this.e_invoice_no = einvoice["ack_no"];
              this.ack_date = einvoice["ack_date"];
              this.DropDownListService.getEinvoiceImage(this.imagename).subscribe(imagesource => {
                this.createImage(imagesource);
              });
  
            });
        }

        this.cust_refdocno=jobdata["cust_refdocno"];
        this.cust_ref_doc_date=jobdata["cust_ref_doc_date"];
        this.e_invoice_no=jobdata["e_invoice_no"];
        this.remarks_asn=jobdata["asn_no"];
        this.amountinwords=words['status'];
        this.invoiceno=jobdata["invoiceno"];
        this.invoicedate=jobdata["invoice_date"];
        this.deleveryno=jobdata["challan_no"];
        this.delievrydate=jobdata["challan_date"];
        this.brokername=jobdata["broker_name"];
        this.vehicleno=jobdata["vehicleno"];
        this.partyname=jobdata["partyname"];
        this.address=jobdata["paytodtls"];
        this.district=jobdata["district"];
        this.gstinno=jobdata["gst_no"];
        this.state=jobdata["state"];
        this.constactno=jobdata["mobile"];
        this.roundoff=jobdata["roundoff_amt"];

        this.JobItem=jobitem;
        this.JobPrice=jobprice;
        this.totalitemqty=0;
        this.totalpackqty=0;

        this.JobItem.forEach(element => {
          this.totalitemqty+=Number(element.item_qty);
          this.totalpackqty+=Number(element.pack_qty);
        });

        this.taxtotal=0;
        this.cgsttotal=0;
        this.sgsttotal=0;
        this.igsttotal=0;
        this.totalamount=0;
        this.taxabletotal=0;

        this.JobPrice.forEach(element => {
          this.sacCode.push(element.sac_code);
          this.taxtotal+=Number(element.tax_value);
          this.cgsttotal+=Number(element.cgst_amt);
          this.sgsttotal+=Number(element.sgst_amt);
          this.igsttotal+=Number(element.igst_amt);
          this.totalamount+=Number(element.tot_amount);

        });

        this.taxabletotal=Number(this.totalamount)+Number(this.roundoff);

        if(jobdata["tax_total"]>0)
        {
          this.DropDownListService.getnumtoword(jobdata["tax_total"]).subscribe(data=>
            {
              this.amountinwordstax=data["status"]
            })
        }
      
      //sac summary
      const distinctArrayHsnCode:any=[] = this.sacCode.filter((n, i) => this.sacCode.indexOf(n) === i);

      this.addSac();//new userform 
      while(this.item_sacwise_taxsumm.length)
      this.item_sacwise_taxsumm.removeAt(0);
      for (let j=0;j<distinctArrayHsnCode.length;j++)
      {
        let hsn_amt =0;
        let sgst_amt =0;
        let cgst_amt =0;
        let igst_amt =0;
        
          this.JobPrice.forEach(element => {

            if(element.sac_code==distinctArrayHsnCode[j])
            {
              hsn_amt+= Number(element.tax_value);
              cgst_amt+= Number(element.cgst_amt);
              sgst_amt += Number(element.sgst_amt);
              igst_amt += Number(element.igst_amt);
              console.log(hsn_amt+"//bb/"+element.tax_value)
            }
          });
          this.addSac();
           //console.log(hsn_amt+"hsn_code Loop :"+distinctArrayHsnCode[j]); // 1, "string", false
           //if (jobdata["state"] == "BIHAR") {
           if (jobdata["state"] == this.company_state) {
            this.item_sacwise_taxsumm.at(j).patchValue({hsnsummary:distinctArrayHsnCode[j],
              hsntax_amt:hsn_amt,
              sgst_hsn:jobprice[j]["sgst_tax"],
              sgstamt_hsn:sgst_amt,
              cgst_hsn:jobprice[j]["cgst_tax"],
              cgstamt_hsn:cgst_amt,
              igst_hsn:0,
              igstamt_hsn:0.00});
          }
          else {
            this.item_sacwise_taxsumm.at(j).patchValue({hsnsummary:distinctArrayHsnCode[j],
              hsntax_amt:hsn_amt,
              sgst_hsn:0,
              sgstamt_hsn:0.00,
              cgst_hsn:0,
              cgstamt_hsn:0.00,
              igst_hsn:jobprice[j]["igst_tax"],
              igstamt_hsn:igst_amt});
          }
         
          //console.log("value:"+this.item_hsnwise_taxsumm.at(j).get("hsnsummary").value)
          this.item_sacwise_taxsumm1.push(this.item_sacwise_taxsumm.at(j).value);
         
      }
    });
  }
  createImage(data: Blob)
  {
   // alert("enter create img"+data)
    this.view_image = data;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagepath = reader.result as string;
    }
    reader.readAsDataURL(data)
  }
  addSac()
   {
    this.item_sacwise_taxsumm.push(this.fb.group({
      hsnsummary:'',
      hsntax_amt:'',
      sgst_hsn:'',
      sgstamt_hsn:'',
      cgst_hsn:'',
      cgstamt_hsn:'',
      igst_hsn:'',
      igstamt_hsn:''
    }))
   }
}
