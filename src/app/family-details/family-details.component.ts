import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Family } from 'src/models/family.model';
import { LoginService } from '../login.service';
import { NomineeDetailsService } from '../nominee-details/nominee-details.service';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.scss']
})
export class FamilyDetailsComponent implements OnInit {
  isCalling: boolean = false; 
  familyMembers: Family[] = []; 
  
  familyForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    relationship: new FormControl('', Validators.required),
    idProof: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]),
  });
  errorMsg: any;

  constructor(private nomineeService: NomineeDetailsService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerFamilyDetails() {
    this.familyMembers.push(this.familyForm.value);
    let membersStr = localStorage.getItem('familyMembers');

    if(membersStr == null){
      localStorage.setItem('familyMembers', JSON.stringify([this.familyForm.value]));
    }else{
      let membersData = JSON.parse(membersStr);
      membersData.push(this.familyForm.value);
      localStorage.setItem('familyMembers', JSON.stringify(membersData));
    }
    console.log(this.familyMembers);
    window.location.reload()
    
  }



}
