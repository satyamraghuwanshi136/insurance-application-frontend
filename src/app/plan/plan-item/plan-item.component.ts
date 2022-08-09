import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsService } from 'src/app/customer-details/customer-details.service';
import { LoginService } from 'src/app/login.service';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/models/policy.model';
import { PlanClass } from '../plan.model';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.scss']
})
export class PlanItemComponent implements OnInit {
  @Input() plan: Policy = {
    policyId: 0,
    name: '',
    tenure: 0,
    amount: 0,
    type: '',
    subtype: '',
    basePremium: 0,
    minIncome: 0,
    numberOfDependent: 0,
    extraForAgeSlap: 0,
    extraForNotEligible: '',
    maxAge: 0,
    minAge: 0,
    description: ''
  }

  premium: any
  age: any
  customerDetails: any
  customerId: any

  constructor(private router: Router,
     private route: ActivatedRoute,
      private customerDetailsService: CustomerDetailsService,
      private loginService: LoginService,
      private policyService: PolicyService) { }

  ngOnInit(): void {
    this.customerId = this.loginService.getUser().customer.custId
    this.getCustomerForCurrentCustomer(this.customerId);
    let userStr = localStorage.getItem('userInfo');
    if(userStr != null){
      this.age = JSON.parse(userStr).age
    }
    this.getPremium(this.plan.policyId, this.age);

  }

  buyNow(planItem: Policy) {
    
    localStorage.setItem("planId", `${planItem.policyId}`);
    localStorage.setItem("premium", `${this.premium}`);
    console.log(this.customerDetails);
    
    if(this.customerDetails.custId){
      this.router.navigate(['buyPolicy/'+localStorage.getItem('planId')])
    }else{
      this.router.navigate(['customerDetails']);
    }
    
  }
  getPremium(policyId:number, age: number){
    this.policyService.getPremiumForCustomer(policyId, age).subscribe({
      next: data =>{
        this.premium = data
        this.premium = Math.floor(this.premium/12)
      }
    })
  }
  showDetails(planItem:Policy){
    localStorage.setItem("premium", `${this.premium}`);
    this.router.navigate([planItem.policyId], {relativeTo: this.route})
  }

  getCustomerForCurrentCustomer(id: number){
    this.customerDetailsService.getCustomerForCurrentCustomer(id).subscribe({
      next: data => {
        this.customerDetails = data
      }
    })
  }

  
}
