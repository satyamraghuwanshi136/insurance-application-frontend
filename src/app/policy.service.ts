import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Policy } from 'src/models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  policies: Policy[] | undefined;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Connect to the server or internet; please try again later.'));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getPolicies() {
    return this.http.get<Policy[]>('/policy').pipe(
      catchError(this.handleError)
    );
  }

  getPolicyById(id: number){
    return this.http.get<Policy>('/policy/' + id);
  }

  deletePolicyById(id: number){
    return this.http.delete('/delete/' + id);
  }

  addPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>('/addPolicy', policy);
  }

  updatePolicy(id: number, policy: Policy): Observable<Policy> {
    return this.http.put<Policy>('/policy/' + id, policy);
  }

  getPolicyByType(type: string){
    return this.http.get<Policy[]>('/policy/type/' + type).pipe(
      catchError(this.handleError)
    );;
  }

  getPolicyBySubtype(type: string){
    return this.http.get<Policy[]>('/policy/subtype/' + type).pipe(
      catchError(this.handleError)
    );;
  }

  getPolicyByUser(age: number, members: number, income: number){
    console.log(age + " "+members+" "+ income);
    
    return this.http.get<Policy[]>('/showPolicies/age=' + age + '/members=' + members + '/income=' + income).pipe(
      catchError(this.handleError)
    );;
  }

  getPremiumForCustomer(policyId: number, age: number){
    return this.http.get(`/calculate/policy/${policyId}/for/${age}`).pipe(
      catchError(this.handleError)
    );;
  }
}
