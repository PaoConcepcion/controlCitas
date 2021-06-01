import { TestBed } from '@angular/core/testing';

import { CitasApiService } from './citas-api.service';

describe('CitasApiService', () => {
  let service: CitasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
