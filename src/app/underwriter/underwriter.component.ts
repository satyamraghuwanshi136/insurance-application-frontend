import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-underwriter',
  templateUrl: './underwriter.component.html',
  styleUrls: ['./underwriter.component.scss']
})
export class UnderwriterComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.router.url == '/underwriter/dashboard'){
      this.router.navigate(['./underwriter-home'], { relativeTo: this.route });
    }
  }

}
