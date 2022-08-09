import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sidebarLinks: any[] = [];

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  
  public logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

}
