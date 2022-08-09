import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {

  customerBasicInfo = {
    name: '',
    email: '',
    phone: ''
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    const {name, email, contactNo} = this.loginService.getUser().customer;
    
    this.customerBasicInfo = {
      name: name,
      email: email,
      phone: contactNo
    }  
  }



}
