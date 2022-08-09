import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowPolicyComponent } from './buy-now-policy.component';

describe('BuyNowPolicyComponent', () => {
  let component: BuyNowPolicyComponent;
  let fixture: ComponentFixture<BuyNowPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyNowPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNowPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
