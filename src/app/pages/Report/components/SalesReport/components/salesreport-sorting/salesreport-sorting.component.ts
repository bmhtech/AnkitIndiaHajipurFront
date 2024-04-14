import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Sales2Report } from '../../../../../../Models/SalesTransaction/sales2';

import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-salesreport-sorting',
  templateUrl: './salesreport-sorting.component.html',
  styleUrls: ['./salesreport-sorting.component.scss']
})
export class SalesreportSortingComponent  {
	
    model:Sales2Report = new Sales2Report();
	public userForm:FormGroup;
	Concat_multi:any;
	status = false;
	reportnamelist:any=[];
	dynamicList:any=[];
	concat_json:any=[];
	concat_jsonsend:any=[];
	finalvalue:any=[];
	stringvalues:string;
	abc:any[];
	ReportName:any;

	//static tube:Array<string> = new Array<string>();//declaring new array list over here  
	private tube:Array<any>;
	target = [];
	message;
	//source = SalesreportSortingComponent.tube;
	source;
	key: string;
	display: string;
	private sourceStations: Array<String>;

	//static arraytype: string;
	
	constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,) { 
		this.userForm=fb.group({
	  
		  reportname:[''],
		  concat_multi:[''],
		  backend:[''],
		  dynamic:[''],
		  sortNumber:[''],
		  id: [''], 
		  fin_year:[''],
		  username:[''],
		  report_id:[''],
		  static_report:[''],
		  reporttype:[''],
		  reportlist:[''],
    
		})
		}
		get reportname(){return this.userForm.get("reportname").value.toString()  as FormControl }
		get fin_year(){ return this.userForm.get("fin_year") as FormControl }
		get username(){ return this.userForm.get("username") as FormControl }
		get sortNumber(){ return this.userForm.get("sortNumber") as FormControl }
		get static_report(){ return this.userForm.get("static_report") as FormControl }
		get reporttype(){ return this.userForm.get("reporttype") as FormControl }
		get reportlist(){ return this.userForm.get("reportlist") as FormControl }
	  
		ngOnInit() {
		  this.status =true;
		  this.key = 'dynamic';
		  this.display = 'backend'; 
		  this.source = this.sourceStations;


		  forkJoin(
			this.DropDownListService.getSalesRegDynamicList(),		  
		   ).subscribe(([BuData])=>
			 {
		//	 this.reportnamelist = BuData		 
			// console.log("list11"+this.reportnamelist.value);		
			 this.status = true; 
			 });	
	  
		};


	
	


	//compare(a:any, b:any) {
	//	const arr = SalesreportSortingComponent.tube;

	//	return arr.indexOf(a._id) - arr.indexOf(b._id);
	//}

	showMessage(e:any) {
		//this.message = { selectChange: e };
		//alert(this.target);
	}

	
//	reloadPage()
	//{
//		alert(" hello tuhin look here  "+this.target)
//	}
onChangeGroupReportType(event)
  {

    this.DropDownListService.reportTypeDropdownList(event)
    .subscribe(data=>
      {
        this.reportnamelist  = data
      
  
       
        this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
   }


  onChangeGroup(event)
   {
	//alert(event)
    this.DropDownListService.salesDynamicSort(event)
    .subscribe(data=>
      {  
	    this.dynamicList = data
		this.tube=data
        var sort=data.length;
        this.userForm.patchValue({sortNumber:sort});//for comparing values from insertered to update values
		let storejson = this.dynamicList;
		
		this.sourceStations = JSON.parse(JSON.stringify(this.tube));

		this.source = this.tube;

		

		// for(let i=0; i<storejson.length;i++)
		// {
		//   let insideloop=JSON.stringify(storejson[i]);//converting json values to a particular column to string 
		//   this.concat_json += insideloop+",";
	 
		// }
		// var str = this.concat_json;
		
		// SalesreportSortingComponent.arraytype=str.substr(0,str.length-1); //removing last " , " from string 
		
		// for(let i=0; i<SalesreportSortingComponent.arraytype.split(",").length;i++) // removing all (  " ) from strings 
		// {
        //     //adding values into arraylist
		// 	SalesreportSortingComponent.tube.push(SalesreportSortingComponent.arraytype.split(",")[i].replace("\"","").substring(0,SalesreportSortingComponent.arraytype.split(",")[i].replace("\"","").length-1))
		// }
		
		
		// console.log(" hello "+SalesreportSortingComponent.arraytype);
		this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
  }


 send()
 {
	
	this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
	fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});




	

	let selected = this.target;


	for(let i=0; i<selected.length;i++)
	{
	  let insideloop=JSON.stringify(selected[i].backend);
	 
	// console.log(" hey "+ insideloop); 
	  this.concat_jsonsend += insideloop.replace("\"","").substring(0,insideloop.replace("\"","").length-1)+",";
	  
	}
	//console.log(" hgogogog "+this.concat_jsonsend );

	this.userForm.patchValue({static_report:this.concat_jsonsend.substring(0,this.concat_jsonsend.length-1)});

	let ReportName=this.userForm.get("reportname").value;




	let total_output =  this.userForm.get("static_report").value.split(",");

	//console.log("dfgdf"+total_output.length)
	if(total_output.length == this.userForm.get("sortNumber").value)
	{

		  this.Service.updateSalesRegSorting(this.userForm.getRawValue(),ReportName).subscribe(data => 
		 	{
			 
		  	 alert("Sales Report List Sorted successfully.");
		  	 this.userForm.reset();
		  	 this.status = true;
		  	 this.ngOnInit();
			  
		     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
		     this.ngOnInit()});


	}
	else
	{
		alert("All Column Have to be Selected in Selected sorting list!!!!! ");
	}


 }





 

}