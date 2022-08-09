import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './home/hero/hero.component';
import { PlansSectionComponent } from './home/plans-section/plans-section.component';
import { CtaSectionComponent } from './home/cta-section/cta-section.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-dashboard/admin-home/admin-home.component';
import { ManagePolicyComponent } from './admin/admin-dashboard/manage-policy/manage-policy.component';
import { ManageUnderwriterComponent } from './admin/admin-dashboard/manage-underwriter/manage-underwriter.component';
import { PlanComponent } from './plan/plan.component';
import { PlanItemComponent } from './plan/plan-item/plan-item.component';
import { ContactComponent } from './contact/contact.component';
import { UnderwriterComponent } from './underwriter/underwriter.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UderwriterDashboardComponent } from './underwriter/uderwriter-dashboard/uderwriter-dashboard.component';
import { UnderwriterHomeComponent } from './underwriter/uderwriter-dashboard/underwriter-home/underwriter-home.component';
import { ReviewApplicationComponent } from './underwriter/uderwriter-dashboard/review-application/review-application.component';
import { ViewPolicyComponent } from './underwriter/uderwriter-dashboard/view-policy/view-policy.component';
import { RegisterComponent } from './register/register.component'; // <--- JavaScript import from Angular
import { LoginComponent } from './login/login.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { UserRegisterationFormComponent } from './admin/user-registeration-form/user-registeration-form.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { APIInterceptor } from './Api-Interceptor';
import { CommonModule } from '@angular/common';
import { NomineeDetailsComponent } from './nominee-details/nominee-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerInformationComponent } from './customer/customer-information/customer-information.component';
import { CustomerPoliciesComponent } from './customer/customer-policies/customer-policies.component';
import { PlansFormComponent } from './plans-form/plans-form.component';
import { BuyNowPolicyComponent } from './buy-now-policy/buy-now-policy.component';
import { ViewPurchasesComponent } from './admin/admin-dashboard/view-purchases/view-purchases.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PolicyFormComponent,
    HeaderComponent,
    HomeComponent,
    HeroComponent,
    PlansSectionComponent,
    CtaSectionComponent,
    SidebarComponent,
    AdminComponent,
    AdminHomeComponent,
    ManagePolicyComponent,
    ManageUnderwriterComponent,
    PlanComponent,
    PlanItemComponent,
    ContactComponent,
    UnderwriterComponent,
    AdminDashboardComponent,
    UderwriterDashboardComponent,
    UnderwriterHomeComponent,
    ReviewApplicationComponent,
    ViewPolicyComponent,
    RegisterComponent,
    LoginComponent,
    PolicyDetailComponent,
    UserRegisterationFormComponent,
    PagenotfoundComponent,
    NomineeDetailsComponent,
    CustomerDetailsComponent,
    PurchaseComponent,
    CustomerComponent,
    CustomerInformationComponent,
    CustomerPoliciesComponent,
    PlansFormComponent,
    BuyNowPolicyComponent,
    ViewPurchasesComponent,
    FamilyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
