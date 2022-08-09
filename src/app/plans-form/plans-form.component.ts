import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerDetailsService } from '../customer-details/customer-details.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.scss']
})
export class PlansFormComponent implements OnInit {
  userData: any
  edit = this.router.url == '/policy/edit'
  userInfo: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    dob: new FormControl('', [Validators.required]),
    age: new FormControl(),
    gender: new FormControl('male',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    numberOfDependents: new FormControl('', [Validators.required]),
    income: new FormControl('', [Validators.required])
  })
  currentCustomerId: any
  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute, private customerDetailService: CustomerDetailsService) { }

  ngOnInit(): void {
    let userStr = localStorage.getItem('userInfo');
    
    
    if(this.edit){
      this.router.navigate(['/policy/edit']);
    }
    if(userStr != null && !this.edit){
      this.router.navigate(['/policy/' + this.loginService.getUser().customer.custId])
    }
    this.currentCustomerId = this.loginService.getUser().customer.custId;
    this.getCurrentCustomerDetail()
    
    if(userStr != null){
      this.userData =  JSON.parse(userStr)
    }

    this.userInfo.patchValue({
      name: this.loginService.getUser().customer['name'],
    })
    
    this.userInfo.patchValue({
      ...this.userData
    })
    
    
  }

  onSubmit(){
    this.userInfo.patchValue({
      age: this.calculateAge(this.userInfo.value['dob'])
    })
    
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo.value));
    this.router.navigate(['/policy/' + this.loginService.getUser().customer.custId]);
  }

  //calculate age
  public calculateAge(birthdate: Date){
    var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  getCurrentCustomerDetail(){
    this.customerDetailService.getCustomerForCurrentCustomer(this.currentCustomerId).subscribe({
      next: data=>{
        
        if(data.custId != null){
          this.userInfo.patchValue({
            dob: new Date(data.dob).toLocaleDateString('en-CA'),
            income: data.income,
          })
        }
      }
    });
  }
}
