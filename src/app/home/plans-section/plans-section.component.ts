import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/models/policy.model';

@Component({
  selector: 'app-plans-section',
  templateUrl: './plans-section.component.html',
  styleUrls: ['./plans-section.component.scss']
})
export class PlansSectionComponent implements OnInit {
  plans: Policy[] | undefined;


   constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
   this.getPolicies()
  }

  getPolicies(){
    this.policyService.getPolicies().subscribe({
      next: (data: Policy[]) => {
      this.plans = data.slice(0,3);
    },
    error: error =>{
    }
    })
  }

}
