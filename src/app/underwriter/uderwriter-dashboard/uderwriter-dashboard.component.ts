import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uderwriter-dashboard',
  templateUrl: './uderwriter-dashboard.component.html',
  styleUrls: ['./uderwriter-dashboard.component.scss']
})
export class UderwriterDashboardComponent implements OnInit {
  sidebarUderwriterLinks: any[] = [
    ['/underwriter/dashboard/underwriter-home', 'Home'],
    ['/underwriter/dashboard/review-application', 'Review Application'],
    ['/underwriter/dashboard/view-policy', 'View Policy'],
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
