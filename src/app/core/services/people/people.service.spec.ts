import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { PEOPLE_API_URL, PeopleService } from './people.service';
import { ScoreService } from '..';
import { mockPerson1, mockPerson2 } from '../../../shared';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpMock: HttpTestingController;
  let scoreServiceMock: jasmine.SpyObj<ScoreService>;

  beforeEach(() => {
    scoreServiceMock = jasmine.createSpyObj('ScoreService', ['compareMass']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ScoreService, useValue: scoreServiceMock }],
    });

    service = TestBed.inject(PeopleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and initialize with request for total records', () => {
    expect(service).toBeTruthy();
    httpMock.expectOne('https://www.swapi.tech/api/people/?page=1&limit=1');
  });

  it('should fetch random people', (done) => {
    service.getTwoRandomPeople().subscribe((result) => {
      expect(result).toEqual([mockPerson1, mockPerson2]);
      done();
    });

    const req1 = httpMock.expectOne(`${PEOPLE_API_URL}randomUid1`);
    const req2 = httpMock.expectOne(`${PEOPLE_API_URL}randomUid2`);

    req1.flush(mockPerson1);
    req2.flush(mockPerson2);
  });
});
