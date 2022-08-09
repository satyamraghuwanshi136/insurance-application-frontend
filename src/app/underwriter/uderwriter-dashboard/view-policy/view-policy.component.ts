import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/models/policy.model';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent implements OnInit {

  policies: Policy[] | undefined;
  hasError: string = '';

  constructor(private policyService: PolicyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPolicies()
  }

  getPolicies(){
    this.policyService.getPolicies().subscribe(
    { next: (data: Policy[]) => {
      this.policies = data
      console.log(this.policies);
    }, 
    error: error =>{
      this.hasError = error;
      console.log("hhhh>>>"+ this.hasError);
    }})
  }

  
  showDetails(policyId:number){
    this.router.navigate([policyId], {relativeTo: this.route})
  }

  getPolicyByType(type: string){
    this.policyService.getPolicyByType(type).subscribe({
      next: (data: Policy[]) => {
        this.policies = data
      },
      error: error =>{
        this.hasError = error;
      }
    })

    
  }

  getPolicyBySubtype(type: string){
    this.policyService.getPolicyBySubtype(type).subscribe({
      next: (data: Policy[]) => {
        this.policies = data
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
