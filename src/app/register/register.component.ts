import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ICustomer } from './customer.model';
import { RegisterService } from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    isRegistering: boolean = false;
    errorMsg: string = "";
    modalSuccess: boolean = false;
    modalFailure: boolean = false;
    uniqueEmail = false

    registerForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
        contact: new FormControl('', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'), this.onChangeEmail.bind(this)]),
        password: new FormControl('', Validators.required),
    })

    constructor(private registerService: RegisterService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        
    }

    registerCustomer() {
        const data = this.registerForm.value;
        
        const customer: ICustomer = {
            name: data.name,
            email: data.email,
            psw: data.password,
            contactNo: data.contact
        }
        this.isRegistering = true;
        this.registerService
            .addCustomer(customer).subscribe({
                next: (data)=>{
                    this.modalSuccess = true;
                },
                error: error=>{
                    this.errorMsg = error.message;
                    this.modalFailure = true
                    console.log(this.errorMsg);
                }
        });
    }

    onChangeEmail(control: FormControl) {
        const email = (control.value.toString() || '').trim();
        
        if(email){
            this.registerService.getCustomer(email).subscribe({
                next: data =>{
                    // console.log(data);
                    if(data) this.uniqueEmail = true
                    else this.uniqueEmail = false
                },
                error: error=>{
                    
                }
            })
            
        }
    
        return email ? null : { 'uniqueEmail': true };
      }
      
}
