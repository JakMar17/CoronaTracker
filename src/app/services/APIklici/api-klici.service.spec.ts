import { TestBed } from '@angular/core/testing';

import { ApiKliciService } from './api-klici.service';

describe('ApiKliciService', () => {
  let service: ApiKliciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiKliciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
