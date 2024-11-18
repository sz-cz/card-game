import { TestBed } from '@angular/core/testing';

import { ResourcesBaseService } from './resources-base.service';

describe('ResourcesBaseService', () => {
  let service: ResourcesBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
