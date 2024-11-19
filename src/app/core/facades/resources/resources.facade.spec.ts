import { TestBed } from '@angular/core/testing';

import { ResourcesFacade } from './resources.facade';
import { PeopleService, ScoreService, StarshipsService } from '../..';
import {
  PersonPropertiesTuple,
  ResourceType,
  StarshipPropertiesTuple,
  mockPerson1,
  mockPerson2,
  mockStarship1,
  mockStarship2,
} from '../../../shared';
import { of } from 'rxjs';

describe('ResourcesFacade', () => {
  let service: ResourcesFacade;
  let mockPeopleService: jasmine.SpyObj<PeopleService>;
  let mockStarshipsService: jasmine.SpyObj<StarshipsService>;
  let mockScoreService: jasmine.SpyObj<ScoreService>;

  beforeEach(() => {
    mockPeopleService = jasmine.createSpyObj<PeopleService>('PeopleService', [
      'getTwoRandomPeople',
    ]);
    mockStarshipsService = jasmine.createSpyObj<StarshipsService>(
      'StarshipsService',
      ['getTwoRandomStarships']
    );
    mockScoreService = jasmine.createSpyObj<ScoreService>('ScoreService', [
      'determineWinner',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: PeopleService, useValue: mockPeopleService },
        { provide: StarshipsService, useValue: mockStarshipsService },
      ],
    });
    service = TestBed.inject(ResourcesFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default resource type as People', () => {
    service.currentResourceType$.subscribe((type) => {
      expect(type).toBe(ResourceType.People);
    });
  });

  it('should update currentResourceType$ when setResourceType is called', () => {
    service.setResourceType(ResourceType.Starships);

    service.currentResourceType$.subscribe((type) => {
      expect(type).toBe(ResourceType.Starships);
    });
  });

  it('should call getTwoRandomPeople and determine the winner for people', () => {
    const mockPeopleResponse: PersonPropertiesTuple = [
      mockPerson1,
      mockPerson2,
    ];
    mockPeopleService.getTwoRandomPeople.and.returnValue(
      of(mockPeopleResponse)
    );

    service.setResourceType(ResourceType.People);
    service.drawResourcesAndDetermineWinner().subscribe((result) => {
      expect(result).toEqual(mockPeopleResponse);
    });
  });

  it('should call getTwoRandomStarships and determine the winner for starships', () => {
    const mockStarshipsResponse: StarshipPropertiesTuple = [
      mockStarship1,
      mockStarship2,
    ];
    mockStarshipsService.getTwoRandomStarships.and.returnValue(
      of(mockStarshipsResponse)
    );

    service.setResourceType(ResourceType.Starships);

    service.drawResourcesAndDetermineWinner().subscribe((result) => {
      expect(result).toEqual(mockStarshipsResponse);
    });
  });
});
