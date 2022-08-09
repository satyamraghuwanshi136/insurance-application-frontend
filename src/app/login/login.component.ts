import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { noWhitespaceValidator } from 'src/utils/noWhitespaceValidator';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isCustomer: boolean = false;
  userError = false
  user = {
    username: "",
    password: ""
  };

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required, noWhitespaceValidator, Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, noWhitespaceValidator
    ])
  })

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) {
    this.isCustomer = router.url === '/login';
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    this.loginService.generateToken(this.loginForm.value).subscribe({
      next: (data: any)=>{
        this.userError = false;
        
        // login
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe({
          next: (user: any)=>{
            console.log(user);
            
            this.loginService.setUser(user);
            
            if(this.loginService.getUserRole() == 'admin'){
              this.router.navigate(['/admin/dashboard'], { relativeTo: this.route });
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole() == 'underwriter'){
              this.router.navigate(['/underwriter/dashboard'], { relativeTo: this.route });
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole() == 'normal'){
              // this.router.navigate(['/'], { relativeTo: this.route });
              window.location.href = '/'
              this.loginService.loginStatusSubject.next(true);
            }else{
              this.loginService.logout();
            }

          }
        })
      },
      error: error =>{
        this.userError = true;
      }
    })
    // if (this.isCustomer)
    //   this.router.navigate(['/'], { relativeTo: this.route });
    // else
    //   this.router.navigate(['/admin/dashboard'], { relativeTo: this.route });
  }

}
