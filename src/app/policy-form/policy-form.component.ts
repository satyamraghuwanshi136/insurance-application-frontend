import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Policy } from 'src/models/policy.model';
import { PolicyService } from '../policy.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { noWhitespaceValidator } from 'src/utils/noWhitespaceValidator';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit {
  policyId: number = 0;

  policy: Policy= {
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
  policyData: Policy = this.policy;
  policyForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    tenure: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    minIncome: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    subtype: new FormControl('family', [Validators.required]),
    basePremium: new FormControl('', [Validators.required]),
    numberOfDependent: new FormControl('', [Validators.required]),
    extraForAgeSlap: new FormControl('', [Validators.required]),
    extraForNotEligible: new FormControl(''),
    maxAge: new FormControl('', [Validators.required]),
    minAge: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required,  noWhitespaceValidator]),
  });

  showModal = false;
  modalTitle = "";
  modalMsg = "";
  modalSuccess = true;

  

  constructor(private location: Location, private policyService : PolicyService, private route: ActivatedRoute,
    private router: Router) {  }

  createPolicy() {
    if(this.policyId === 0){
      this.policyService.addPolicy(this.policyForm.value).subscribe({
        next: data =>{
          // console.log(data)
          this.modalTitle = "Success";
          this.modalMsg = data.name + " added successfully";
          this.modalSuccess = true;
          this.showModal = true;
        },
        error: error =>{
          this.modalTitle = "Failure";
          this.modalMsg = error.message;
          this.modalSuccess = false;
          this.showModal = true;
        }
      })
    }else{
      this.policyData = this.policyForm.value
      this.policyData['policyId'] = this.policyId
      this.policyService.updatePolicy(this.policyId,this.policyData).subscribe({
        next: data =>{
          // console.log(data)
          this.modalTitle = "Success";
          this.modalMsg = data.name + " updated successfully";
          this.modalSuccess = true;
          this.showModal = true;
        },
        error: error =>{
          this.modalTitle = "Failure";
          this.modalMsg = error.message;
          this.modalSuccess = false;
          this.showModal = true;
        }
      })
    }
    
    this.policyForm.reset();
    
  }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id = params.get('id')
      this.policyId = Number(id)
      if(this.policyId != 0){
        this.policyService.getPolicyById(this.policyId).subscribe(
          (data: Policy) => {
            this.policy = data;
            this.policyForm.patchValue(this.policy)
          }
        )
      }
    })
  }

}
