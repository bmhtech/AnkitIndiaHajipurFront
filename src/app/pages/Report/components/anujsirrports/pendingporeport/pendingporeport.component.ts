import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-pendingporeport',
  templateUrl: './pendingporeport.component.html',
  styleUrls: ['./pendingporeport.component.scss']
})
export class PendingporeportComponent implements OnInit {
  public userForm8:FormGroup;

  totaltruck:number=0;
  totalpending:number=0;
  totalqty:number=0;
  advwt:number=0;
  pendingwt:number=0;
  status = false;
  pendingSoudaList:any=[];
  pertruck:boolean=true;


  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private Service : Master) 
  {
    this.userForm8=fb.group(
      {
        pendingfromdate:[''],
        pendingtodate:[''],
        pendingcatagory:['']
      });
    
  }

  get pendingfromdate(){return this.userForm8.get("pendingfromdate") as FormControl};
   get pendingtodate(){return this.userForm8.get("pendingtodate") as FormControl};
   get pendingcatagory(){return this.userForm8.get("pendingcatagory") as FormControl};

  ngOnInit() {
  }

  searchpending()
      {
        let fromdate=this.userForm8.get("pendingfromdate").value;
        let todate=this.userForm8.get("pendingtodate").value;
        let catagory=this.userForm8.get("pendingcatagory").value;
        this.status=false;

        this.totaltruck=0;
        this.totalpending=0;
        this.totalqty=0;
        this.advwt=0;
        this.pendingwt=0;

        this.DropDownListService.getPendingSoudaReport(fromdate,todate,catagory).subscribe(pendingdata=>
          {
            //console.log("Pending Check ::  "+ JSON.stringify(pendingdata))
            this.pendingSoudaList = pendingdata;
            if(this.userForm8.get("pendingcatagory").value=="truck")
            {
              for(let data of pendingdata)
              {
                this.totaltruck+=Number(data["truck"])
                //console.log("CHECK  "+Number(data["item_qty"]))
                this.totalpending+=Number(data["pending"])              
              }
            }
            else
            {
              for(let data of pendingdata)
              {
                this.totalqty+=Number(data["total_qty"])
                this.advwt+=Number(data["adv_mat_wt"])
                this.pendingwt+=Number(data["pending"])              
              }
            }
            this.status=true;
          }); 
      }

      exportAsXLSX8():void 
      {
        let element = document.getElementById('dynamictable8'); 
        this.excelService.exportAsExcelFile(element, 'Pending Souda From ' + this.userForm8.get("pendingfromdate").value +' to ' + this.userForm8.get("pendingtodate").value);
      }

      onChangeCategory(event)
      {
        if(this.userForm8.get("pendingcatagory").value=="truck")
        {
          this.pertruck=true;
        }
        else
        {
          this.pertruck=false;
        }
      }
      myFiles:any=[];
      
      onFileSelected(e)
      {
        this.myFiles=[];
        this.myFiles.push(e.target.files[0]);//abc
        const frmData = new FormData();
        frmData.append("files", this.myFiles[0]);   

        this.Service.uploadstatemasterexcel(frmData).subscribe(upload=>
          {
            alert("sucess")
          })
      }
  
       
}
