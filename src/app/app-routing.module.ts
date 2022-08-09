import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-dashboard/admin-home/admin-home.component';
import { ManagePolicyComponent } from './admin/admin-dashboard/manage-policy/manage-policy.component';
import { ManageUnderwriterComponent } from './admin/admin-dashboard/manage-underwriter/manage-underwriter.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PlanComponent } from './plan/plan.component';
import { LoginComponent } from './login/login.component';
import { UnderwriterComponent } from './underwriter/underwriter.component';
import { UnderwriterHomeComponent } from './underwriter/uderwriter-dashboard/underwriter-home/underwriter-home.component';
import { ReviewApplicationComponent } from './underwriter/uderwriter-dashboard/review-application/review-application.component';
import { ViewPolicyComponent } from './underwriter/uderwriter-dashboard/view-policy/view-policy.component';
import { RegisterComponent } from './register/register.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { NomineeDetailsComponent } from './nominee-details/nominee-details.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { UserRegisterationFormComponent } from './admin/user-registeration-form/user-registeration-form.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { AdminGuard } from './guards/admin.guard';
import { UnderwriterGuard } from './guards/underwriter.guard';
import { NormalGuard } from './guards/normal.guard';
import { PurchaseComponent } from './purchase/purchase.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerInformationComponent } from './customer/customer-information/customer-information.component';
import { CustomerPoliciesComponent } from './customer/customer-policies/customer-policies.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { BuyNowPolicyComponent } from './buy-now-policy/buy-now-policy.component';
import { ViewPurchasesComponent } from './admin/admin-dashboard/view-purchases/view-purchases.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';

const routes: Routes = [
  {path: 'policy', component: PlansFormComponent,data:{header:true},canActivate: [NormalGuard],},
  {path: 'policy/edit', component: PlansFormComponent,data:{header:true},canActivate: [NormalGuard],},
  {path: 'policy/:userId', component: PlanComponent,data:{header:true},canActivate: [NormalGuard],},
  {path: 'policy/:userId/:id', component: PolicyDetailComponent,data:{header:true}},
  {path: 'all-policy/:id', component: PolicyDetailComponent,data:{header:true}},
  {path: 'all-policy', component: PlanComponent,data:{header:true}},
  // {path: 'policy/:id', component: PolicyDetailComponent,data:{header:true}},
  {path: 'buyPolicy/:id', component: BuyNowPolicyComponent,data:{header:true},canActivate: [NormalGuard],},
  {path: 'home', component: HomeComponent,data:{header:true}},
  {path: 'contact', component: ContactComponent,data:{header:true}},
  {path: 'register', component: RegisterComponent,data:{header:true}},
  {path: 'customerDetails', component: CustomerDetailsComponent, data:{header:true}, canActivate: [NormalGuard],},
  {path: 'customer', component: CustomerComponent, data:{header:true}, canActivate: [NormalGuard],
    children: [
      {path: 'details', component: CustomerInformationComponent, data:{header:true}, },
      {path: 'policies', component: CustomerPoliciesComponent, data:{header:true}, }
    ]
  },
  {path: 'nomineeDetails', component: NomineeDetailsComponent, data:{header:true}},
  {path: 'familyDetails', component: FamilyDetailsComponent, data:{header:true}},
  {path: 'purchase', component: PurchaseComponent, data:{header:true}},
  {path: 'login', component: LoginComponent, data:{header:true}},
  {path: 'admin/login', component: LoginComponent, data:{header:false}},
  {path: 'admin/dashboard', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {path: 'admin-home', component: AdminHomeComponent},
      {path: 'manage-policy', component: ManagePolicyComponent},
      {path: 'manage-underwriter', component: ManageUnderwriterComponent},
      {path: 'view-purchases', component: ViewPurchasesComponent},
      {path: 'manage-underwriter/add-underwriter', component: UserRegisterationFormComponent},
      {path: 'manage-underwriter/add-underwriter/:id', component: UserRegisterationFormComponent},
      {path: 'manage-policy/add-policy', component: PolicyFormComponent},
      {path: 'manage-policy/add-policy/:id', component: PolicyFormComponent},
      {path: 'manage-policy/:id', component: PolicyDetailComponent, data:{header: false}},
    ], data:{header:false}
  },
  {path: 'underwriter/dashboard', component: UnderwriterComponent,canActivate: [UnderwriterGuard],
    children: [
      {path: 'underwriter-home', component: UnderwriterHomeComponent},
      {path: 'review-application', component: ReviewApplicationComponent},
      {path: 'view-policy', component: ViewPolicyComponent},
      {path: 'view-policy/:id', component: PolicyDetailComponent, data:{header: false}},
      {path: 'view-user', component: ManageUnderwriterComponent}
    ], data:{header:false}
  },
  {path: '', redirectTo: '/home', pathMatch: 'full', data:{header:true}},
    //Wild Card Route for 404 request
    { path: '**', pathMatch: 'full', 
        component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
