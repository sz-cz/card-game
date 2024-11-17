import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScoreService } from '../../core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;
  let el: DebugElement;
  let scoreServiceMock: jasmine.SpyObj<ScoreService>;
  let leftPlayerScoreSubject: BehaviorSubject<number>;
  let rightPlayerScoreSubject: BehaviorSubject<number>;

  beforeEach(() => {
    leftPlayerScoreSubject = new BehaviorSubject(0);
    rightPlayerScoreSubject = new BehaviorSubject(0);

    scoreServiceMock = jasmine.createSpyObj('ScoreService', [], {
      leftPlayerScore$: leftPlayerScoreSubject.asObservable(),
      rightPlayerScore$: rightPlayerScoreSubject.asObservable(),
    });

    TestBed.configureTestingModule({
      providers: [{ provide: ScoreService, useValue: scoreServiceMock }],
      imports: [AsyncPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges(); // Początkowa detekcja zmian
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial scores as 0:0', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const counterElement = el.query(By.css('.counter')).nativeElement;
    expect(counterElement.textContent.trim()).toBe('0 : 0');
  }));

  it('should update player scores when values change', fakeAsync(() => {
    leftPlayerScoreSubject.next(1);
    rightPlayerScoreSubject.next(2);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const counterElement = fixture.debugElement.query(
      By.css('.counter')
    ).nativeElement;
    expect(counterElement.textContent.trim()).toBe('1 : 2');
  }));
});
