import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoginService } from '../login.service';
import { NomineeDetailsService } from './nominee-details.service';

@Component({
  selector: 'app-nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.scss']
})
export class NomineeDetailsComponent implements OnInit {

  isCalling: boolean = false; 

  nomineeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    relationship: new FormControl('', Validators.required),
    idProof: new FormControl('', Validators.required),
  });
  errorMsg: any;

  constructor(private nomineeService: NomineeDetailsService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerNomineeDetails() {
    const data = {
      ...this.nomineeForm.value,
    }
    this.isCalling = true;
    console.log(data);
    this.nomineeService
            .addNominee(data,this.loginService.getUser().customer.custId)
            .pipe(
               catchError(error => {
                   this.errorMsg = error.message;
                   this.isCalling = true;
                   console.log(this.errorMsg);
                   return of([]);
               })
            )
            .subscribe((data)=>{
                const planId = localStorage.getItem('planId');
                if(planId == null) {
                  this.router.navigate(['/']);
                }else {
                  localStorage.removeItem('planId');
                  this.router.navigate([`/buyPolicy/${planId}`]);
                }
            });
  }

  next() {
    console.log("Next");
  }

}
