import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { PurchaseService } from 'src/app/purchase.service';
import { Purchase } from 'src/models/purchase.model';

@Component({
  selector: 'app-customer-policies',
  templateUrl: './customer-policies.component.html',
  styleUrls: ['./customer-policies.component.scss']
})
export class CustomerPoliciesComponent implements OnInit {
  purchases: Purchase[] | undefined
  custId: any
  constructor(private purchaseService: PurchaseService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.custId = this.loginService.getUser().customer.custId;
    this.getPurchases();
  }

  getPurchases(){
    this.purchaseService.getPurchaseOfCustomer(this.custId).subscribe({
      next: data =>{
        this.purchases = data
        console.log(this.purchases);
        
      }
    })
  }

}
