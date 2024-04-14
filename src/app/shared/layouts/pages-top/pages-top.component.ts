import {AfterViewInit, Component, Input} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {MatDialog} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LogoutpopupmodalComponent } from '../logoutpopupmodal/logoutpopupmodal.component';

  @Component({
    selector: 'pages-top',
    templateUrl: './pages-top.component.html',
    styleUrls: ['./pages-top.component.scss'],
  })

  export class PagesTopComponent implements AfterViewInit 
  {
   // avatarImgSrc: string = 'assets/images/avatar.jpg';
    
    //userName: string = '';userPost: string = '';
    userName: string = 'ANKIT INDIA HAJIPUR'; userPost: string = 'India';
    //userName: string = 'Aayog Agro'; userPost: string = 'India';
    //userName: string = 'Aayogagro'; userPost: string = 'India';
    //userName: string = 'Indian';userPost: string = 'Spices';
    //userName: string = 'Meghana';userPost: string = 'Bidi';
    
    financialYear:any;
    name:any;
    sidebarToggle: boolean = true;
    tip = {ring: true, email: true};
  
    constructor(private _globalService: GlobalService, public dialog: MatDialog) 
    {
      this.financialYear = localStorage.getItem("financial_year");
      this.name = localStorage.getItem("username");
    }

    public _sidebarToggle() 
    {
      this._globalService.data$.subscribe(data => 
      {
       // console.log(" tuhin "+data.ev)
        if (data.ev === 'sidebarToggle') 
        {this.sidebarToggle = data.value;}
        },error => {console.log('Error: ' + error);
      });
      this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);
    }

    ngAfterViewInit(): void {
      this.sidebarToggle = window.innerWidth >= 970;
    }

    openDialog()
    {
      const dialogRef = this.dialog.open(LogoutpopupmodalComponent);
      dialogRef.afterClosed().subscribe(result => {});
    } 
  
  }
