import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BoardComponent } from './board.component';
import { ResourcesFacade, ScoreService } from '../../core';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ResourceType, mockPerson1, mockPerson2 } from '../../shared';

describe('BoardComponent', () => {
  let fixture: ComponentFixture<BoardComponent>;
  let component: BoardComponent;
  let el: DebugElement;
  let resourcesFacadeMock: jasmine.SpyObj<ResourcesFacade>;
  let scoreServiceMock: jasmine.SpyObj<ScoreService>;

  beforeEach(() => {
    resourcesFacadeMock = jasmine.createSpyObj('ResourcesFacade', [
      'drawResourcesAndDetermineWinner',
      'currentResourceType$',
    ]);
    scoreServiceMock = jasmine.createSpyObj('ScoreService', ['currentWinner$']);

    const currentResourceTypeSubject = new BehaviorSubject<ResourceType>(
      ResourceType.People
    );
    Object.defineProperty(resourcesFacadeMock, 'currentResourceType$', {
      get: () => currentResourceTypeSubject.asObservable(),
    });

    scoreServiceMock.currentWinner$ = new BehaviorSubject<
      'left' | 'right' | undefined
    >(undefined);

    TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        { provide: ResourcesFacade, useValue: resourcesFacadeMock },
        { provide: ScoreService, useValue: scoreServiceMock },
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
    resourcesFacadeMock.drawResourcesAndDetermineWinner.and.returnValue(
      of([mockPerson1, mockPerson2])
    );

    component.drawCards();
    fixture.detectChanges();

    const placeholders = el.queryAll(By.css('.placeholder'));
    expect(placeholders.length).toEqual(0);

    const cards = el.queryAll(By.css('app-card'));
    expect(cards.length).toEqual(2);
  });

  it('should update cardLeft and cardRight signals when drawCards is called', () => {
    resourcesFacadeMock.drawResourcesAndDetermineWinner.and.returnValue(
      of([mockPerson1, mockPerson2])
    );

    component.drawCards();

    expect(component.cardLeft()).toEqual(mockPerson1);
    expect(component.cardRight()).toEqual(mockPerson2);
  });
});
