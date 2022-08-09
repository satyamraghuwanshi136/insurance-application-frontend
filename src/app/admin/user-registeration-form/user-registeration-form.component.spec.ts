import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterationFormComponent } from './user-registeration-form.component';

describe('UserRegisterationFormComponent', () => {
  let component: UserRegisterationFormComponent;
  let fixture: ComponentFixture<UserRegisterationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
