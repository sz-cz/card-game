import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { PeopleService } from './people.service';
import {
  PEOPLE_API_URL,
  mockPerson1,
  mockPerson2,
  mockPersonResp1,
  mockPersonResp2,
} from '../../../shared';
import { provideHttpClient } from '@angular/common/http';

describe('PeopleService', () => {
  let service: PeopleService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PeopleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve and return two random people', () => {
    const mockUidList = ['1', '23', '67', '90'];

    const mockTotalRecords = 4;
    const totalRecordsReq = httpTestingController.expectOne(
      `${PEOPLE_API_URL}?page=1&limit=1`
    );
    totalRecordsReq.flush({ total_records: mockTotalRecords });

    const availableUidsReq = httpTestingController.expectOne(
      `${PEOPLE_API_URL}?page=1&limit=${mockTotalRecords}`
    );
    availableUidsReq.flush({
      results: mockUidList.map((uid) => ({ uid })),
    });

    spyOn(Math, 'random').and.returnValues(0.1, 0.9); // Faking random to get first and last item from uid array

    service.getTwoRandomPeople().subscribe(([person1, person2]) => {
      expect(person1.name).toBe(mockPerson1.name);
      expect(person2.name).toBe(mockPerson2.name);
    });

    const req1 = httpTestingController.expectOne(
      PEOPLE_API_URL + mockUidList[0]
    );
    req1.flush(mockPersonResp1);

    const req2 = httpTestingController.expectOne(
      PEOPLE_API_URL + mockUidList[mockUidList.length - 1]
    );
    req2.flush(mockPersonResp2);

    httpTestingController.verify();
  });
});
