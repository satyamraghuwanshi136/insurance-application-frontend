import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  sidebarAdminLinks: any[] = [
    ['/admin/dashboard/admin-home', 'Home'],
    ['/admin/dashboard/manage-policy', 'Manage Policy'],
    ['/admin/dashboard/manage-underwriter', 'Manage Underwriter'],
    ['/admin/dashboard/view-purchases', 'View Purchases'],
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
