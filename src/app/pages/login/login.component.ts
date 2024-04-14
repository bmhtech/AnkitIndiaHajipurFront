import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userForm:FormGroup;
  loginStatus=true;
  username='';
  password="";

  invalidLogin = false
 
  formBuilder: any;
  //returnUrl: any;
  route: any;
  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

    ngOnInit() {
      localStorage.setItem("loginstatus",'0');
      // get return url from route parameters or default to '/'
     // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

 
  status: boolean
  checkLogin() {
    this.status = false;
    (
     this.loginservice.authenticate(this.username, this.password).subscribe(
      success => {
          if(success)
          {
            this.router.navigate(['companyFinancial'])
           
            //new 
            //this.router.navigateByUrl(this.returnUrl);
            this.invalidLogin = true,
            this.status = true;
          }
          else
          {
            this.loginStatus=false;
            this.status = true;
          }
      
      },
      error => {
       
       this.loginStatus=false;
        this.invalidLogin = true
        this.status = true;
      }
    )
    );
    
    this.loginservice.isUserLoggedIn();
    
  }
}
