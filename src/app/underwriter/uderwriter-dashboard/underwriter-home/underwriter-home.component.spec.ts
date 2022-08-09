import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwriterHomeComponent } from './underwriter-home.component';

describe('UnderwriterHomeComponent', () => {
  let component: UnderwriterHomeComponent;
  let fixture: ComponentFixture<UnderwriterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderwriterHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwriterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
