import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-dailyitemwiseloadingreport',
  templateUrl: './dailyitemwiseloadingreport.component.html',
  styleUrls: ['./dailyitemwiseloadingreport.component.scss']
})
export class DailyitemwiseloadingreportComponent implements OnInit {
  
  public userForm:FormGroup;
  loadinglist:any = [];
 
  columnslist:any = [];
  status = false;
  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService)
   { 

    this.userForm=fb.group(
      {
        fromdate:[''],
        todate:['']
      });
  }

  get fromdate(){return this.userForm.get("fromdate") as FormControl};
  get todate(){return this.userForm.get("todate") as FormControl};

  ngOnInit() 
  {
    this.status=true;
  }


  search()
  {
  
    this.status=false;
    this.DropDownListService.getdailyloadingitemwise(this.userForm.get("fromdate").value,this.userForm.get("todate").value,localStorage.getItem("financial_year")).subscribe(data=>
      {
        
        this.loadinglist = data;


       
        for (const [key] of Object.entries(data[0])) {
          console.log(`${key}`);
          this.columnslist.push(`${key}`);
          
        }
        this.status=true;
      }); 
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Daily Loading Item Wise Report  From ' + this.userForm.get("fromdate").value +'to' + this.userForm.get("todate").value);
  }

}
