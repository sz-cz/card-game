import { TestBed } from '@angular/core/testing';

import { ResourcesFacade } from './resources.facade';

describe('ResourcesService', () => {
  let service: ResourcesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
