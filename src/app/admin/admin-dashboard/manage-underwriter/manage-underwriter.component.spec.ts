import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUnderwriterComponent } from './manage-underwriter.component';

describe('ManageUnderwriterComponent', () => {
  let component: ManageUnderwriterComponent;
  let fixture: ComponentFixture<ManageUnderwriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUnderwriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUnderwriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
