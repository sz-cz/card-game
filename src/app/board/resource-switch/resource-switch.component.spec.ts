import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceSwitchComponent } from './resource-switch.component';
import { ResourcesFacade } from '../../core';
import { ResourceType, UI_TEXTS } from '../../shared';
import { of } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

describe('ResourceSwitchComponent', () => {
  let component: ResourceSwitchComponent;
  let fixture: ComponentFixture<ResourceSwitchComponent>;
  let mockResourcesFacade: jasmine.SpyObj<ResourcesFacade>;

  beforeEach(async () => {
    mockResourcesFacade = jasmine.createSpyObj<ResourcesFacade>(
      'ResourcesFacade',
      ['setResourceType'],
      { currentResourceType$: of(ResourceType.People) }
    );

    await TestBed.configureTestingModule({
      imports: [ResourceSwitchComponent, MatButtonToggleModule],
      providers: [{ provide: ResourcesFacade, useValue: mockResourcesFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the component', () => {
    const toggleButtons =
      fixture.nativeElement.querySelectorAll('mat-button-toggle');

    expect(toggleButtons.length).toBe(2);
    expect(toggleButtons[0].textContent.trim()).toBe(UI_TEXTS.people);
    expect(toggleButtons[1].textContent.trim()).toBe(UI_TEXTS.starships);
  });

  it('should set the initial value of the toggle group based on the resource type', () => {
    const toggleGroup = fixture.nativeElement.querySelector(
      'mat-button-toggle-group'
    );

    expect(toggleGroup.getAttribute('ng-reflect-value')).toBe(
      ResourceType.People
    );
  });

  it('should call the handling method when the toggle group changes', () => {
    spyOn(component, 'handleResourceTypeChanged');
    const toggleGroup = fixture.nativeElement.querySelector(
      'mat-button-toggle-group'
    );

    toggleGroup.dispatchEvent(new Event('change'));

    expect(component.handleResourceTypeChanged).toHaveBeenCalled();
  });

  it('should call `setResourceType` in facade when `handleResourceTypeChanged` is invoked', () => {
    const newType = ResourceType.Starships;

    component.handleResourceTypeChanged(newType);

    expect(mockResourcesFacade.setResourceType).toHaveBeenCalledOnceWith(
      newType
    );
  });
});
