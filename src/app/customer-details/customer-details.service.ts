import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ICustomerDetails } from './customer-details.model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
	errorMsg: string="";
	constructor(private http: HttpClient) { }

	addCustomerDetails(customerDetails: ICustomerDetails, custId: number) {
		return this.http
					.post<ICustomerDetails>(`/custdetails/add/${custId}`, customerDetails, httpOptions)
					.pipe(
						catchError(error => {
							if (error.error instanceof ErrorEvent) {
								this.errorMsg = `Error: ${error.error.message}`;
							} else {
								this.errorMsg = `Error: ${error.message}`;
							}
							console.log(this.errorMsg);
							return throwError(()=> new Error(this.errorMsg));
						})
					);
	}

	getCustomerForCurrentCustomer(id: number){
		return this.http.get<any>('/custdetails/allDetails/'+id).pipe(
			catchError(error => {
				if (error.error instanceof ErrorEvent) {
					this.errorMsg = `Error: ${error.error.message}`;
				} else {
					this.errorMsg = `Error: ${error.message}`;
				}
				console.log(this.errorMsg);
				return throwError(()=> new Error(this.errorMsg));
			})
		);
	}
}
