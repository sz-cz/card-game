import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PEOPLE_URL, PeopleService } from './people.service';
import { ScoreService } from '..';
import { mockPerson1, mockPerson2 } from '../../../shared';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpMock: HttpTestingController;
  let scoreServiceMock: jasmine.SpyObj<ScoreService>;

  beforeEach(() => {
    scoreServiceMock = jasmine.createSpyObj('ScoreService', ['compareMass']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: ScoreService, useValue: scoreServiceMock },
      ],
    });

    service = TestBed.inject(PeopleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch random people and call compareMass', (done) => {
    service.getRandomPeople().subscribe((result) => {
      expect(result).toEqual([mockPerson1, mockPerson2]);

      expect(scoreServiceMock.compareMass).toHaveBeenCalledWith('77', '55');
      done();
    });

    const req1 = httpMock.expectOne(`${PEOPLE_URL}randomUid1`);
    const req2 = httpMock.expectOne(`${PEOPLE_URL}randomUid2`);

    req1.flush(mockPerson1);
    req2.flush(mockPerson2);
  });
});
