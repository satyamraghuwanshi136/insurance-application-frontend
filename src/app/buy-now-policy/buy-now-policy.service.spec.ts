import { TestBed } from '@angular/core/testing';

import { BuyNowPolicyService } from './buy-now-policy.service';

describe('BuyNowPolicyService', () => {
  let service: BuyNowPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyNowPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
