import { TestBed } from '@angular/core/testing';

import { KaryawanService } from './karyawan.service';

describe('KaryawanService', () => {
  let service: KaryawanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaryawanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
