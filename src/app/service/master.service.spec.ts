import { TestBed } from '@angular/core/testing';

import { Master } from './master.service';

describe('DeptMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Master = TestBed.get(Master);
    expect(service).toBeTruthy();
  });
});
