import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';
import{apiconfig} from '../Configuration/ApiConfig';
import { Tokens } from '../Models/tokens';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  url:String;
  constructor(private _router: Router,
    private httpClient: HttpClient, config:apiconfig,private loginservice: AuthenticationService) {   
    this.url=config.url;}
  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    
    if (localStorage.getItem('username') && localStorage.getItem('JWT_TOKEN')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+localStorage.getItem('JWT_TOKEN')
        }
      })
    }

    return next.handle(req).pipe(catchError(err => {
     // alert("interceptor error: "+JSON.stringify(err)+", error status: "+err.status);
      console.log("interceptor error: "+JSON.stringify(err)+", error status: "+err.status);
      if (err.status === 401) {
         //Genrate params for token refreshing
        // console.log("error if jwt is invalid:"+err.error.message+".....");
          if (err.error.message == "Error -> Unauthorized") {
              //TODO: Token refreshing
            let params = {
              token:'Bearer',
              refreshToken:localStorage.getItem('JWT_TOKEN')
            };

            this.httpClient.post(this.url+"refreshToken", {
            username:localStorage.getItem('username'),
            token:'Bearer',
            refreshToken:localStorage.getItem('JWT_TOKEN') 
          }).pipe(
            catchError(e => throwError(new Error("oops SOMETHING BAD HAPPENED")))
          )
          .subscribe(
            (response:Tokens) => 
            this.setjwttoken(response) ,
            err => console.log("ERROR"),
          );
          }else {
            alert("Exception is occured");
           // localStorage.removeItem("JWT_TOKEN");
            //localStorage.removeItem("username");
            
              //Logout from account or do some other stuff
          }
      }
      return throwError(err);
  }));

  }



  private setjwttoken(tokens:Tokens)
  {
    //localStorage.getItem("username");
    localStorage.setItem("JWT_TOKEN",tokens.accessToken);
  }
  
}
