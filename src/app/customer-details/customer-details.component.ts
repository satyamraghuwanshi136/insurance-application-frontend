import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoginService } from '../login.service';
import { ICustomerDetails } from './customer-details.model';
import { CustomerDetailsService } from './customer-details.service';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
    errorMsg: string = "";
    isCalling: boolean = false;
    nextEnable: boolean = false;

    customerDetails: ICustomerDetails = {
        gender: "",
        dob: "",
        nationality: "",
        occupation: "",
        income: "",
        placeOfBirth: "",
        idProof: "",
        relationship: "",
        coName: "",
        street: "",
        locality: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
    }

    customerForm: FormGroup = new FormGroup({
        gender: new FormControl('m', Validators.required),
        dob: new FormControl('', Validators.required),
        nationality: new FormControl('', Validators.required),
        occupation: new FormControl('', Validators.required),
        income: new FormControl('', Validators.required),
        placeOfBirth: new FormControl('', Validators.required),
        idProof: new FormControl('', Validators.required),
        relationship: new FormControl('', Validators.required),
        coName: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        locality: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required)
    })

    constructor(private router: Router, private route: ActivatedRoute,
        private customerDetailsService: CustomerDetailsService,
        private loginService: LoginService) {

    }

    ngOnInit(): void {
    }

    registerCustomerDetails() {
        const data = { 
            ...this.customerForm.value
        };
    
        this.isCalling = true;
        this.customerDetailsService
            .addCustomerDetails(data,this.loginService.getUser().customer.custId)
            .pipe(
                catchError(error => {
                    this.isCalling = false;
                    this.errorMsg = error.message;
                    console.log(this.errorMsg);
                    return of([]);
                })
            )
            .subscribe((data) => {
                this.isCalling = false;
                this.nextEnable = true;
                // this.router.navigate(['/login'], { relativeTo: this.route });
            });
        console.log(data);
    }

    next() {
        this.router.navigate(['/nomineeDetails'], { relativeTo: this.route });
        console.log("next");
    }
}
