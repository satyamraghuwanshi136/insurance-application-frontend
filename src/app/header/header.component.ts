import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedin = false
  isAdmin = false
  isUnderwriter = false
  isCustomer= false

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    
    
    this.isLoggedin = this.loginService.isLoggedIn();
    this.isAdmin = (this.loginService.getUserRole() == 'admin')
    this.isCustomer = (this.loginService.getUserRole() == 'normal')
    this.isUnderwriter = (this.loginService.getUserRole() == 'underwriter')
    

   
    
  }

  public logout(){
    this.loginService.logout();
    this.isLoggedin = false;
    this.router.navigate(['/login'])
  }


}
