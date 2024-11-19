import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { StarshipsService } from './starships.service';
import { provideHttpClient } from '@angular/common/http';
import {
  STARSHIPS_URL,
  mockStarship1,
  mockStarship2,
  mockStarshipResp1,
  mockStarshipResp2,
} from '../../../shared';

describe('StarshipsService', () => {
  let service: StarshipsService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(StarshipsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve and return two random starships', () => {
    const mockUidList = ['3', '9', '15'];

    const mockTotalRecords = 3;
    const totalRecordsReq = httpTestingController.expectOne(
      `${STARSHIPS_URL}?page=1&limit=1`
    );
    totalRecordsReq.flush({ total_records: mockTotalRecords });

    const availableUidsReq = httpTestingController.expectOne(
      `${STARSHIPS_URL}?page=1&limit=${mockTotalRecords}`
    );
    availableUidsReq.flush({
      results: mockUidList.map((uid) => ({ uid })),
    });

    spyOn(Math, 'random').and.returnValues(0.1, 0.9); // Faking random to get first and last item from uid array

    service.getTwoRandomStarships().subscribe(([starship1, starship2]) => {
      expect(starship1.name).toBe(mockStarship1.name);
      expect(starship2.name).toBe(mockStarship2.name);
    });

    const req1 = httpTestingController.expectOne(STARSHIPS_URL + '3');
    req1.flush(mockStarshipResp1);

    const req2 = httpTestingController.expectOne(STARSHIPS_URL + '15');
    req2.flush(mockStarshipResp2);

    httpTestingController.verify();
  });
});
