import { TestBed } from '@angular/core/testing';

import { PurchaseModuleServiceService } from './purchase-module-service.service';

describe('PurchaseModuleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseModuleServiceService = TestBed.get(PurchaseModuleServiceService);
    expect(service).toBeTruthy();
  });
});
