import { TestBed } from '@angular/core/testing';

import { MaterialTypeServiceService } from './material-type-service.service';

describe('MaterialTypeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialTypeServiceService = TestBed.get(MaterialTypeServiceService);
    expect(service).toBeTruthy();
  });
});
