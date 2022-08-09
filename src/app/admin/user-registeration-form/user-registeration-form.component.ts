import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { UnderwriterService } from 'src/app/underwriter.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-user-registeration-form',
  templateUrl: './user-registeration-form.component.html',
  styleUrls: ['./user-registeration-form.component.scss']
})
export class UserRegisterationFormComponent implements OnInit {
  userId: number = 0;
  user: User = {
    userId: 0,
    email: '',
    psw: '',
    role: ''
  };

  showModal = false;
  modalTitle = "";
  modalMsg = "";
  modalSuccess = true;
  
  userData: User = this.user;
  registerUserForm: FormGroup = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email],),
    psw: new FormControl('',  [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    role: new FormControl('underwriter',  [Validators.required])
  })

  constructor(private location: Location, private underwriterService: UnderwriterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id = params.get('id')
      this.userId = Number(id)
      if(this.userId != 0){
        this.underwriterService.getUnderwriterById(this.userId).subscribe(
          (data: User) => {
            this.user = data;
            this.registerUserForm.patchValue(this.user)
          }
        )
      }
    })
  }

  registerUser(){
    if(this.userId === 0){
      this.underwriterService.addUndereriter(this.registerUserForm.value).subscribe({
        next: data => {
          this.modalTitle = "Success";
          this.modalMsg = data.email + " added successfully";
          this.modalSuccess = true;
          this.showModal = true;
        },
        error: error =>{
          this.modalTitle = "Failure";
          this.modalMsg = error.message;
          this.modalSuccess = false;
          this.showModal = true;
        }
      })
    }else{
      this.userData = this.registerUserForm.value
      this.userData['userId'] = this.userId
      this.underwriterService.updateUnderwriter(this.userId, this.userData).subscribe({
        next: data => {
          this.modalTitle = "Success";
          this.modalMsg = data.email + " updated successfully";
          this.modalSuccess = true;
          this.showModal = true;
        },
        error: error =>{
          this.modalTitle = "Failure";
          this.modalMsg = error.message;
          this.modalSuccess = false;
          this.showModal = true;
        }
      })
    }
    this.registerUserForm.reset()
  }

  goBack(){
    this.location.back();
  }
}
