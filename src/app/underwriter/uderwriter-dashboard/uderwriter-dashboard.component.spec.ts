import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UderwriterDashboardComponent } from './uderwriter-dashboard.component';

describe('UderwriterDashboardComponent', () => {
  let component: UderwriterDashboardComponent;
  let fixture: ComponentFixture<UderwriterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UderwriterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UderwriterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
