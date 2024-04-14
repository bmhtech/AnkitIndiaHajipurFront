import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HostListener } from '@angular/core';
import { data } from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'content-top',
  templateUrl: './content-top.component.html',
  styleUrls: ['./content-top.component.scss']
})
export class ContentTopComponent {
  routeTitle;
  routeTitle1:any;
 
  
  constructor(public _globalService: GlobalService,private router: Router) {
    
    this.getRouteTitle();
   
  }

  private getRouteTitle() {
    /* this._globalService.isActived$.subscribe(isActived => {
      this.routeTitle = isActived.title;
    }, error => {
      console.log('Error: ' + error);
    }); */
    
    this._globalService.data$.subscribe(data => {
      
      if(localStorage.getItem("user_role") == null || localStorage.getItem("user_role") == "null")
      {
       this.router.navigate(['/index.html']);
      }
      else
      {
        if (data.ev === 'isActived') {
          localStorage.setItem("loginstatus",'1');
          this.routeTitle = data.value.title;
          console.log("this.routeTitle: tuhin 2 "+this.routeTitle);
          this.routeTitle1=this.routeTitle1+"-"+this.routeTitle;
        }
      
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  returnHome() {
    //    this._globalService._isActived({ title: 'Dashboard' });
    this._globalService.dataBusChanged('isActived', { title: 'Dashboard' });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    const myArray = this.routeTitle1.split("-");
    if(myArray[myArray.length-2]==='undefined')
    {
      this._globalService.dataBusChanged('isActived', { title: '' });
    }
    else
    this._globalService.dataBusChanged('isActived', { title: ''+myArray[myArray.length-2] });

    this.routeTitle1='';
    for(var i=0;i<=myArray.length-2;i++)
    this.routeTitle1=this.routeTitle1+"-"+myArray[i];

    console.log('Back button pressed: '+this.routeTitle1);
  }
 
  ngAfterViewInit(): void 
  {
    /*console.log("first"+localStorage.getItem("loginstatus"))
    if(localStorage.getItem("loginstatus") =="1")
    {
      if(this.routeTitle == null || this.routeTitle=="" || this.routeTitle=="undefined" )
      {
        this.router.navigate(['/index.html']);
        console.log("this.routeTitle: tuhin /"+this.routeTitle+"/");
        localStorage.setItem("loginstatus",'0');
        localStorage.removeItem('username');
        localStorage.removeItem('company_name');
        localStorage.removeItem('financial_year');
        localStorage.removeItem('token');
        localStorage.removeItem('navItem');
        localStorage.removeItem('user_role');
        console.log("sencound"+localStorage.getItem("loginstatus"))
      }
    }
   if(localStorage.getItem("user_role") == null || localStorage.getItem("user_role") == "null")
   {
    this.router.navigate(['/index.html']);
   }
    console.log(localStorage.getItem("user_role"))
    */
  
  }

  
}
