import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSwitchComponent } from './resource-switch.component';

describe('ResourceSwitchComponent', () => {
  let component: ResourceSwitchComponent;
  let fixture: ComponentFixture<ResourceSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
