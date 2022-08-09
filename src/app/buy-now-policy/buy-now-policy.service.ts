import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/models/purchase.model';
import { IPurchase } from '../purchase/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class BuyNowPolicyService {

  constructor(private http: HttpClient) { }

  purchasePolicy(purchase: Purchase, cid: number,nid: number, pid: number): Observable<Purchase> {
    return this.http.post<Purchase>(`/purchase/cId=${cid}/nId=${nid}/pId=${pid}`, purchase);
  }


}
