import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { StarshipsService } from './starships.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mockStarship1, mockStarship2 } from '../../../shared';

describe('StarshipsService', () => {
  let service: StarshipsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const mockAvailableUids = ['uid1', 'uid2'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StarshipsService,
        {
          provide: HttpClient,
          useClass: class {
            get = jasmine
              .createSpy()
              .and.returnValue(of({ results: mockAvailableUids }));
          },
        },
      ],
    });
    service = TestBed.inject(StarshipsService);
    httpMock = TestBed.inject(HttpTestingController);

    service['availalbeUids$'].next(mockAvailableUids);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch two random starships', (done) => {
    const starship1 = { result: { properties: mockStarship1 } };
    const starship2 = { result: { properties: mockStarship2 } };

    service
      .getTwoRandomStarships()
      .subscribe(([starship1Properties, starship2Properties]) => {
        expect(starship1Properties.name).toBe('X-Wing');
        expect(starship2Properties.name).toBe('TIE Fighter');
        done();
      });

    const req1 = httpMock.expectOne(
      'https://www.swapi.tech/api/starships/uid1'
    );
    expect(req1.request.method).toBe('GET');
    req1.flush(starship1);

    const req2 = httpMock.expectOne(
      'https://www.swapi.tech/api/starships/uid2'
    );
    expect(req2.request.method).toBe('GET');
    req2.flush(starship2);

    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
