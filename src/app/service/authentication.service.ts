import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map ,catchError, mapTo, tap} from 'rxjs/operators';
import{apiconfig} from '../Configuration/ApiConfig';
import { Tokens } from '../Models/tokens';
import { of, Observable } from 'rxjs';

export class User {
  constructor(
    public status: string,
  ) { }

}

export class JwtResponse{
  url:String;
  constructor(
    public jwttoken:string,config:apiconfig
     ) {

      this.url=config.url;
     }
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService { 
  url:String;
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  private loggedUser: string;

  constructor(private httpClient: HttpClient, config:apiconfig) {
    this.url=config.url;
  }

      authenticate(username, password): Observable<boolean>{
      
        var users= {"username": username, "password": password};

          return this.httpClient.post<any>( this.url+'signin',{username,password})
          .pipe(
            tap(tokens => this.doLoginUser(username, tokens)),
            mapTo(true),
            catchError(error => {
              //alert(error.error);
              alert("Invalid Username:- "+username+"  Password :- "+ password+" !!!!" )
              return of(false);
            })

        );
      }
  user:any;
  tokenString:any;
  isUserLoggedIn() 
  {
    this.user = localStorage.getItem("username");
    this.tokenString=localStorage.getItem(this.JWT_TOKEN);
    //alert(this.user+","+this.tokenString);
    console.log("Status: "+!(this.user === null && this.tokenString === null))
    return !(this.user === null && this.tokenString === null)
  }


  logout() {
    return this.httpClient.post<any>(this.url+`/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.httpClient.post<any>(this.url+`/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.accessToken);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
   // alert("after login local storage:"+username+"  ,  "+tokens.accessToken)
   
    localStorage.removeItem("username");
    localStorage.removeItem("JWT_TOKEN");
 //  console.log("after login local storage:"+username+"  ,  "+tokens.accessToken)
    localStorage.setItem("username", username);
    localStorage.setItem("JWT_TOKEN", tokens.accessToken); 
   // this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.accessToken);
   // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    //localStorage.removeItem(this.REFRESH_TOKEN);
  }
  
  authenticateCompany(company_name, financial_year,user_Role) 
  {
    localStorage.setItem('company_name',company_name);
    localStorage.setItem('financial_year',financial_year);
    //alert("user_role: "+user_Role);
    localStorage.setItem('user_role',user_Role);

    return true;
  }
  


  userLoginAs()
  { 
    return localStorage.getItem('username');
  }

  // getJwtToken() {
  //   return sessionStorage.getItem(this.JWT_TOKEN);
  // }

  // get isLoggedIn(): boolean {
  //   let authToken = sessionStorage.getItem(this.JWT_TOKEN);
  //   return (authToken !== null) ? true : false;
  // }
  
  
  // private getRefreshToken() {
  //   return sessionStorage.getItem(this.REFRESH_TOKEN);
  // }

  // private storeJwtToken(jwt: string) {
  //   sessionStorage.setItem(this.JWT_TOKEN, jwt);
  // }

  // private storeTokens(tokens: Tokens) {
  //   sessionStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  //   sessionStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  // }

  // private removeTokens() {
  //   sessionStorage.removeItem(this.JWT_TOKEN);
  //   sessionStorage.removeItem(this.REFRESH_TOKEN);
  // }

}