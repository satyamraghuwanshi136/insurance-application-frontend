import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ICustomer } from './customer.model';
import { catchError, Observable, of, pipe, throwError } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};


@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	errorMsg: string="";
	constructor(private http: HttpClient) { }

	addCustomer(customer: ICustomer) {
		return this.http
					.post<ICustomer>('/customer', customer, httpOptions)
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

	getCustomer(email: string): Observable<ICustomer>{
		return this.http.get<ICustomer>(`/customer/by/${email}`);
	}

}
