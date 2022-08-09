import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Family } from 'src/models/family.model';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient) { }

  addFamilyMember(custId: number, purchaseId: number, familyMember: Family): Observable<Family>{
    return this.http.post<Family>(`/family/add/cust=${custId}/purchase=${purchaseId}`, familyMember);
  }
}
