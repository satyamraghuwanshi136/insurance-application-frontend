import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { INominee } from './nominee.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class NomineeDetailsService {

    errorMsg: string = "";
    constructor(private http: HttpClient) { }

    addNominee(nominee: INominee, custId: number) {
        return this.http
            .post<INominee>(`/nominee/add/id=${custId}`, nominee, httpOptions)
            .pipe(
                catchError(error => {
                    if (error.error instanceof ErrorEvent) {
                        this.errorMsg = `Error: ${error.error.message}`;
                    } else {
                        this.errorMsg = `Error: ${error.message}`;
                    }
                    console.log(this.errorMsg);
                    return throwError(() => new Error(this.errorMsg));
                })
            );
    }

    getNomineeBuyCustomerId(custId: number) {
       return this.http.get<INominee>(`/nominee/custId=${custId}`).pipe(
        catchError(error => {
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = `Error: ${error.message}`;
            }
            console.log(this.errorMsg);
            return throwError(() => new Error(this.errorMsg));
        })
    );
    }

}
