import { TestBed } from '@angular/core/testing';

import { TransformToCountriesService } from './transform-to-countries.service';

describe('TransformToCountriesService', () => {
  let service: TransformToCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformToCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
