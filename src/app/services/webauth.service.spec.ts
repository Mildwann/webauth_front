import { TestBed } from '@angular/core/testing';

import { WebauthService } from './webauth.service';

describe('WebauthService', () => {
  let service: WebauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
