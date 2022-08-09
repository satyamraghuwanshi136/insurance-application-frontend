import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public getCurrentUser(){
    return this.http.get('/current-user');
  }

  public generateToken(loginData: any){
    return this.http.post('/generate-token', loginData);
  }

  //Login User
  public loginUser(token: string){
    localStorage.setItem('token', token);
    this.loginStatusSubject.next(true);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  // Logout
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("token");
  }

  //set user
  public setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr)
    }else{
      this.logout()
      return null
    }
  }

  // get user role
  public getUserRole(){
    let user = this.getUser();
    if(user != null)
      return user.authorities[0].authority;
    
    return null
  }


}
