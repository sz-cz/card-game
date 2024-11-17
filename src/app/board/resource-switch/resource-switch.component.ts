import { Component, input, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ResourceType } from '../../shared';

@Component({
  selector: 'app-resource-switch',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './resource-switch.component.html',
  styleUrl: './resource-switch.component.sass',
})
export class ResourceSwitchComponent {
  resourceType = input.required<ResourceType>();
  valueChanged = output<ResourceType>();

  options = [
    {
      label: 'People',
      value: 'people',
    },
    {
      label: 'Starships',
      value: 'starships',
    },
  ];
}
