import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ComponentRef } from '@angular/core';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { mockPerson1 } from '../../shared';

describe('CardComponent', () => {
  let component: CardComponent;
  let componentRef: ComponentRef<CardComponent>;
  let fixture: ComponentFixture<CardComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    el = fixture.debugElement;
    componentRef.setInput('properties', mockPerson1);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person properties', () => {
    const nameElement = fixture.debugElement.query(
      By.css('mat-card-title')
    ).nativeElement;
    expect(nameElement.textContent.trim()).toBe(mockPerson1.name);

    const birthYearCell = fixture.debugElement.queryAll(
      By.css('.card__table td')
    )[1].nativeElement;
    expect(birthYearCell.textContent.trim()).toBe(mockPerson1.birth_year);
  });

  it('should add "card--winner" class when isWinner is true', () => {
    componentRef.setInput('isWinner', true);
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(
      By.css('.card')
    ).nativeElement;
    expect(cardElement.classList)
      .withContext('Class not assigned')
      .toContain('card--winner');
  });

  it('should not have "card--winner" class when isWinner is false', () => {
    componentRef.setInput('isWinner', false);
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(
      By.css('.card')
    ).nativeElement;
    expect(cardElement.classList).not.toContain('card--winner');
  });
});
