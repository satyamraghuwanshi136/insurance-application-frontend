import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/purchase.service';
import { Purchase } from 'src/models/purchase.model';

@Component({
  selector: 'app-view-purchases',
  templateUrl: './view-purchases.component.html',
  styleUrls: ['./view-purchases.component.scss']
})
export class ViewPurchasesComponent implements OnInit {
  purchasesSuccessful: Purchase[] | undefined
  purchasesPending: Purchase[] | undefined
  


  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.getAllPurchases()
  }

  getAllPurchases(){
    this.purchaseService.getAllPurchases().subscribe({
      next: data=>{
        this.purchasesSuccessful = data
        this.purchasesSuccessful = this.purchasesSuccessful.filter(el => {
          return el.status != 'Pending'
        });

        this.purchasesPending = data
        this.purchasesPending = this.purchasesPending.filter(el => {
          return el.status == 'Pending'
        });
        
      }
    })
  }
}
