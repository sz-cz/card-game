import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BoardComponent } from './board.component';
import { PeopleService, StarshipsService } from '../../core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { mockPerson1, mockPerson2 } from '../../shared';

describe('BoardComponent', () => {
  let fixture: ComponentFixture<BoardComponent>;
  let component: BoardComponent;
  let el: DebugElement;
  let peopleServiceMock: jasmine.SpyObj<PeopleService>;
  let starshipsServiceMock: jasmine.SpyObj<StarshipsService>;

  beforeEach(() => {
    peopleServiceMock = jasmine.createSpyObj('PeopleService', [
      'getRandomPeople',
    ]);
    starshipsServiceMock = jasmine.createSpyObj('StarshipsService', [
      'getRandomStarship',
    ]);

    TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: PeopleService, useValue: peopleServiceMock },
        { provide: StarshipsService, useValue: starshipsServiceMock },
      ],
    });

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display placeholder for each of two cards, if cards data is not fetched yet', () => {
    const placeholders = el.queryAll(By.css('.placeholder'));
    expect(placeholders.length).toEqual(2);
  });

  it('should not display cards placeholders, when cards data has already been fetched', () => {
    peopleServiceMock.getRandomPeople.and.returnValue(
      of([mockPerson1, mockPerson2])
    );

    component.drawCards();
    fixture.detectChanges();

    const placeholders = el.queryAll(By.css('.placeholder'));
    expect(placeholders.length)
      .withContext('Placeholders should not be rendered')
      .toEqual(0);

    const cards = el.queryAll(By.css('app-card'));
    expect(cards.length)
      .withContext('Card components should be rendered')
      .toEqual(2);
  });

  it('should update cardLeft and cardRight signals when drawCards is called', () => {
    peopleServiceMock.getRandomPeople.and.returnValue(
      of([mockPerson1, mockPerson2])
    );

    component.drawCards();

    expect(component.cardLeft()).toEqual(mockPerson1);
    expect(component.cardRight()).toEqual(mockPerson2);
  });
});
