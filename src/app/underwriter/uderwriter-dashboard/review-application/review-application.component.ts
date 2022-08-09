import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsService } from 'src/app/customer-details/customer-details.service';
import { ICustomerDetails } from 'src/app/customer-details/customer-details.model';
import { PurchaseService } from 'src/app/purchase.service';
import { Purchase } from 'src/models/purchase.model';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.scss']
})
export class ReviewApplicationComponent implements OnInit {

  purchasesPending: Purchase[] | undefined
  modalSuccess= false
  modalFailure = false
  modalReject = false
  customerDetails = {
    customer: {
      contactNo: '',
      custId: '',
      email: '',
      name: '',
      psw: '',
      role: '',
    },
    gender: '',
    dob: '',
    nationality: '',
    occupation: '',
    income: '',
    placeOfBirth: '',
    idProof: '',
    relationship: '',
    coName: '',
    street: '',
    locality: '',
    area: '',
    city: '',
    state: '',
    pincode: ''
  }


  constructor(private purchaseService: PurchaseService,
     private router: Router,
     private route: ActivatedRoute,
     private customerDetailsService: CustomerDetailsService,
     private loginService: LoginService) { }

  ngOnInit(): void {
    this.getAllPurchases()
    
  }

  getAllPurchases(){
    this.purchaseService.getAllPurchases().subscribe({
      next: data=>{
        this.purchasesPending = data
        this.purchasesPending = this.purchasesPending.filter(el => {
          
          return el.status == 'Pending'
        });
        
      }
    })
  }

  approve(id:number){
    this.purchaseService.getPurchase(id).subscribe({
      next: purchaseData=>{
        purchaseData.status = "Approved"
        this.purchaseService.updatePurchase(id,this.loginService.getUser().userId, purchaseData).subscribe({
          next: updatedData=>{
            this.modalSuccess = true
            this.getAllPurchases()
          }
        })
      }
    })
  }

  reject(id: number){
    this.purchaseService.deletePurchase(id).subscribe({
      next: ()=>{
        console.log('deleted');
        
        this.modalReject = true
        this.getAllPurchases()
      },
      error: ()=>{
        this.modalReject = true
        this.getAllPurchases()
      }
    })
  }

  showCustomerDetails(custId:number){
    this.customerDetailsService.getCustomerForCurrentCustomer(custId).subscribe({
      next: data=>{
        console.log(data);
        this.customerDetails = data;
      }
    })
  }

  showDetails(policyId:number){
    this.router.navigate(['/underwriter/dashboard/view-policy/'+policyId])
  }
}
