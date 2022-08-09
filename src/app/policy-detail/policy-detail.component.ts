import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Policy } from 'src/models/policy.model';
import { CustomerDetailsService } from '../customer-details/customer-details.service';
import { LoginService } from '../login.service';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss']
})
export class PolicyDetailComponent implements OnInit {
  header: boolean = false;
  isAdmin: boolean = false;
  policyId: number = 0;
  customerDetails: any
  customerId: any

  policy: Policy = {
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
  };

  constructor(private router: Router, private route: ActivatedRoute,
     private policyService: PolicyService, private location: Location,
     private customerDetailsService: CustomerDetailsService,
     private loginService: LoginService) { }

  ngOnInit(): void {
    if(this.loginService.getUser().customer){
      this.customerId = this.loginService.getUser().customer.custId
      this.getCustomerForCurrentCustomer(this.customerId);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id')
      this.policyId = Number(id)
    })

    this.policyService.getPolicyById(this.policyId).subscribe((data: Policy) => {
      this.policy = data;
    })

    this.route.data.subscribe(v => {
      this.header = v['header'];
      this.isAdmin = !v['header'];
    })
  }
  buyNow(planItem: Policy) {
    localStorage.setItem("planId", `${planItem.policyId}`);
    
    if(this.customerDetails.custId){
      this.router.navigate(['buyPolicy/'+localStorage.getItem('planId')])
    }else{
      this.router.navigate(['customerDetails']);
    }
  }

  goBack() {
    this.location.back();
  }

  getCustomerForCurrentCustomer(id: number){
    this.customerDetailsService.getCustomerForCurrentCustomer(id).subscribe({
      next: data => {
        this.customerDetails = data
      }
    })
  }

}
