import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnderwriterService } from 'src/app/underwriter.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-manage-underwriter',
  templateUrl: './manage-underwriter.component.html',
  styleUrls: ['./manage-underwriter.component.scss']
})
export class ManageUnderwriterComponent implements OnInit {

  underwriters: User[] | undefined;
  showDetails: User = {
    userId: 0,
    email: '',
    psw: '',
    role: ''
  };
  modalSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private underwriterService: UnderwriterService) { }

  ngOnInit(): void {
    this.getUnderwriters()
  }

  getUnderwriters(){
    this.underwriterService.getUnderwriters().subscribe(
    { next: (data: User[]) => {
      this.underwriters = data.filter(d=> d.role === 'underwriter')
      console.log(this.underwriters);
    }})
  }

  addUnderwriter(){
    this.router.navigate(['add-underwriter'], {relativeTo: this.route});
  }

  viewUnderwriter(id:number){
      this.underwriterService.getUnderwriterById(id).subscribe({
        next: (data: User) =>{
          this.showDetails = data;
        }
      })
  }

  updateUnderwriter(id:number){
    this.router.navigate(['add-underwriter/' + id], {relativeTo: this.route})
  }

  deleteUnderwriter(id:number){
    this.underwriterService.deleteUndereriterById(id).subscribe({
      next: data=>{
        this.getUnderwriters()
        this.modalSuccess = true;
      },
      error: error=>{
        this.modalSuccess = true;
        console.log(error);
      }
    })
  }
}
