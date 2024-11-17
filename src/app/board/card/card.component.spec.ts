import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, signal, ComponentRef } from '@angular/core';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { PersonProperties } from '../../shared';

const mockProperties: PersonProperties = {
  name: 'John Doe',
  birth_year: '1990',
  gender: 'male',
  height: '180',
  mass: '75',
  hair_color: 'brown',
  skin_color: 'fair',
  eye_color: 'blue',
  created: '',
  edited: '',
  homeworld: '',
  url: '',
};

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
    componentRef.setInput('properties', mockProperties);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person properties', () => {
    const nameElement = fixture.debugElement.query(
      By.css('mat-card-title')
    ).nativeElement;
    expect(nameElement.textContent.trim()).toBe(mockProperties.name);

    const birthYearCell = fixture.debugElement.queryAll(
      By.css('.card__table td')
    )[1].nativeElement;
    expect(birthYearCell.textContent.trim()).toBe(mockProperties.birth_year);
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
