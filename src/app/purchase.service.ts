import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  getAllPurchases(): Observable<Purchase[]>{
    return this.http.get<Purchase[]>('/purchase/all-purchase');
  }

  getPurchaseOfCustomer(custId: number):  Observable<Purchase[]>{
    return this.http.get<Purchase[]>(`/purchase/of${custId}`);
  }

  getPurchase(purchaseId: number):  Observable<Purchase>{
    return this.http.get<Purchase>(`/purchase/${purchaseId}`);
  }

  updatePurchase(purchaseId: number, userId: number, purchase: Purchase):  Observable<Purchase>{
    return this.http.put<Purchase>(`/purchase/update/${purchaseId}/by/${userId}`, purchase);
  }

  deletePurchase(id: number){
    return this.http.delete(`/purchase/deleteP/${id}`);
  }
}
