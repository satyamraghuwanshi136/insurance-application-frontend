import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Policy } from 'src/models/policy.model';
import { NomineeDetailsService } from '../nominee-details/nominee-details.service';
import { PolicyService } from '../policy.service';
import { INominee } from '../nominee-details/nominee.model'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyNowPolicyService } from './buy-now-policy.service';
import { LoginService } from '../login.service';
import { Family } from 'src/models/family.model';
import { FamilyService } from '../family.service';
@Component({
    selector: 'app-buy-now-policy',
    templateUrl: './buy-now-policy.component.html',
    styleUrls: ['./buy-now-policy.component.scss']
})
export class BuyNowPolicyComponent implements OnInit {
    policyId: number = 0;
    isAdmin: boolean = false;
    isBuying: boolean = false;
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

    nominees: any
    familyMembers: Family[] = []; 

    showModal = false;
    modalTitle = "";
    modalMsg = "";
    modalSuccess = false;
    premium: any


    purchaseForm: FormGroup = new FormGroup({
        nomineeId: new FormControl('', [Validators.required]),
        payCycle: new FormControl('', [Validators.required])
    })

    constructor(private router: Router,
                private route: ActivatedRoute, private policyService: 
                PolicyService, private buyNowService: BuyNowPolicyService, 
                private nomineeService: NomineeDetailsService,
                private loginService: LoginService,
                private familyService: FamilyService
                ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = params.get('id')
            this.policyId = Number(id)
        })

        this.policyService.getPolicyById(this.policyId).subscribe((data: Policy) => {
            this.policy = data;
        })

        this.nomineeService.getNomineeBuyCustomerId(this.loginService.getUser().customer.custId).subscribe({
            next: data=>{
                this.nominees = data
            }
        })

        let customerPremium = localStorage.getItem('premium');
        if(customerPremium != null){
            this.premium = customerPremium
        }

        this.getFamilyMembers();
        
        
    }

    getFamilyMembers(){
        let membersStr = localStorage.getItem('familyMembers');
        if(membersStr != null){
            this.familyMembers = JSON.parse(membersStr)
        }
    }

    removeMember(name: string){
        let membersStr = localStorage.getItem('familyMembers');
        if(membersStr != null){
            let membersData = JSON.parse(membersStr)
            membersData = membersData.filter((el: Family) => {
                return el.name != name;
            });
            localStorage.setItem('familyMembers', JSON.stringify(membersData));
            this.getFamilyMembers();
        }
    }

    purchase() {
        
        if(this.purchaseForm.value.payCycle == 'yearly'){
            this.premium = this.premium * 12
        }
        console.log(this.premium);

        const purchaseData = {
            ...this.purchaseForm.value,
            custId: this.loginService.getUser().customer.custId,
            policyId: this.policyId,
            premium: this.premium
        }
        this.isBuying = true
        this.buyNowService.purchasePolicy(purchaseData, purchaseData.custId,purchaseData.nomineeId, purchaseData.policyId).subscribe({
            next: data => {
                if(data.policy.subtype == 'family'){
                    console.log(data);
                    this.familyMembers.forEach(family =>{
                        this.familyService.addFamilyMember(purchaseData.custId, data.purchaseId, family).subscribe({
                            next: familyResponse =>{
                                console.log(familyResponse);
                            }
                        })
                        
                    })
                    localStorage.removeItem('familyMembers')
                }

                this.modalTitle = "Success";
                this.modalMsg = "Policy Purchased Successfully";
                this.modalSuccess = true;
                this.showModal = true;
            },
            error: error => {
                this.modalTitle = "Failure";
                this.modalMsg = error.message;
                this.modalSuccess = false;
                this.showModal = true;
            }
        })
    }
}
