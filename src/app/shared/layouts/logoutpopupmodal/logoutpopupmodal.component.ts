import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutpopupmodal',
  templateUrl: './logoutpopupmodal.component.html',
  styleUrls: ['./logoutpopupmodal.component.scss']
})
export class LogoutpopupmodalComponent implements OnInit {

  constructor(private router: Router, private auth : AuthenticationService) 
  { 
    
  }

  status: boolean;
  logOut() {
    this.status = false;
    let username = this.auth.userLoginAs();
    localStorage.removeItem('username');
    localStorage.removeItem('company_name');
    localStorage.removeItem('financial_year');
    localStorage.removeItem('token');
    localStorage.removeItem('navItem');
    localStorage.removeItem('user_role');

    
  //  this.router.navigate(['login']);
  this.router.navigate(['/index.html']);
  
    
    }
  ngOnInit() {
  }

}
