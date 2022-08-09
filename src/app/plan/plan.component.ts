import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Policy } from 'src/models/policy.model';
import { LoginService } from '../login.service';
import { PolicyService } from '../policy.service';
import { PlanClass } from './plan.model';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  type = ''
  userInfo: any
  plans: Policy[] | undefined;
  hasPlans = true
  hasError: string = '';

  constructor(private policyService: PolicyService,
     private loginService: LoginService,
     private route : ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    
    let userStr = localStorage.getItem('userInfo');
    
    if(userStr != null){
      this.userInfo =  JSON.parse(userStr)
      this.type =  this.userInfo.type;
    }
    
    if(this.loginService.isLoggedIn() && this.router.url != '/all-policy'){
      this.getPoliciesUser();
    }else{
      this.getPolicies();
    }
  }

  getPolicies(){
    this.policyService.getPolicies().subscribe({
      next: (data: Policy[]) => {
      this.plans = data;
      if(this.plans.length <= 0){
        this.hasPlans = false;
      }else{
        this.hasPlans = true;
      }
    },
    error: error =>{
      this.hasError = error;
    }
    })
  }

  getPoliciesUser(){
    
    this.policyService.getPolicyByUser(this.userInfo.age, this.userInfo.numberOfDependents, this.userInfo.income).subscribe({
      next: (data: Policy[]) => {
        console.log(data);
        
      this.plans = data.filter((el)=>{
        console.log(el.subtype + "---" + this.type);
        
        return el.subtype == this.type
      });
      if(this.plans.length <= 0){
        this.hasPlans = false;
      }else{
        this.hasPlans = true;
      }
    },
    error: error =>{
      this.hasError = error;
    }
    })
  }

  getPremium(policyId:number, age: number){
    return this.policyService.getPremiumForCustomer(policyId, age).subscribe({
      next: data =>{
        console.log(data);
      }
    })
  }

  getPolicyByType(type: string){
    this.policyService.getPolicyByType(type).subscribe({
      next: (data: Policy[]) => {
        this.plans = data
        if(this.plans.length <= 0){
          this.hasPlans = false;
        }else{
          this.hasPlans = true;
        }
      },
      error: error =>{
        this.hasError = error;
      }
    })


  }

  getPolicyBySubtype(type: string){
    this.policyService.getPolicyBySubtype(type).subscribe({
      next: (data: Policy[]) => {
        this.plans = data
        if(this.plans.length <= 0){
          this.hasPlans = false;
        }else{
          this.hasPlans = true;
        }
      },
      error: error =>{
        this.hasError = error;
      }
    })
  }

  onButtonGroupClick($event: { target: any; srcElement: any; }){
    let clickedElement = $event.target || $event.srcElement;

    if( clickedElement.nodeName === "BUTTON" ) {

      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }

      clickedElement.className += " active";
    }

  }

}
